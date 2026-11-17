import { NextRequest, NextResponse } from "next/server";
import { enforceRateLimit, getRequestIp } from "@/lib/rate-limit";
import { fetchYouTubeApiWithRotation, getConfiguredYouTubeApiKeys } from "@/lib/youtubeApiClient";
import { verifyOrigin } from "@/lib/verifyOrigin";

/**
 * YouTube Trending Videos API
 *
 * Fetches real trending videos from YouTube using YouTube Data API v3
 * Configure YOUTUBE_API_KEY in your .env.local file
 */

// Region codes for YouTube API (ISO 3166-1 alpha-2)
const REGION_CODES: Record<string, string> = {
    // Americas
    us: "US", ca: "CA", mx: "MX", br: "BR", ar: "AR", co: "CO", cl: "CL", pe: "PE",
    // Europe
    gb: "GB", uk: "GB", de: "DE", fr: "FR", es: "ES", it: "IT", nl: "NL", pl: "PL",
    se: "SE", no: "NO", dk: "DK", fi: "FI", be: "BE", at: "AT", ch: "CH", pt: "PT",
    ie: "IE", gr: "GR", cz: "CZ", ro: "RO", hu: "HU", ua: "UA", ru: "RU", tr: "TR",
    // Asia
    in: "IN", jp: "JP", kr: "KR", cn: "CN", tw: "TW", hk: "HK", sg: "SG", my: "MY",
    th: "TH", vn: "VN", ph: "PH", id: "ID", pk: "PK", bd: "BD",
    // Middle East
    ae: "AE", sa: "SA", il: "IL", eg: "EG",
    // Africa
    za: "ZA", ng: "NG", ke: "KE", ma: "MA",
    // Oceania
    au: "AU", nz: "NZ",
};

export async function GET(req: NextRequest) {
    const originCheck = verifyOrigin(req);
    if (!originCheck.allowed) {
        return originCheck.response;
    }

    const ip = getRequestIp(req.headers);
    const rl = enforceRateLimit(`trending:${ip}`, 40, 60 * 60 * 1000);
    if (!rl.allowed) {
        return NextResponse.json(
            { success: false, error: "Too many requests. Please try again later." },
            { status: 429, headers: { "Retry-After": String(rl.retryAfterSeconds) } },
        );
    }

    const { searchParams } = new URL(req.url);
    const region = searchParams.get("region") || "us";
    const category = searchParams.get("category"); // Optional category filter

    // Numeric allowlist — prevents query-param injection into the upstream URL.
    if (category !== null && category !== "" && !/^\d{1,2}$/.test(category)) {
        return NextResponse.json(
            { success: false, error: "Invalid category" },
            { status: 400 },
        );
    }

    const keys = getConfiguredYouTubeApiKeys();

    if (keys.length === 0) {
        return NextResponse.json({
            success: false,
            demo: true,
            videos: [],
            message: "YouTube API key not configured"
        });
    }

    const regionKey = region.toLowerCase();
    const regionCode = Object.hasOwn(REGION_CODES, regionKey)
        ? REGION_CODES[regionKey]
        : "US";

    try {
        // Fetch trending videos with multi-key quota rotation
        let endpoint = `videos?part=snippet,statistics&chart=mostPopular&regionCode=${regionCode}&maxResults=20`;
        if (category) {
            endpoint += `&videoCategoryId=${category}`;
        }

        const apiRes = await fetchYouTubeApiWithRotation<{
            items?: Array<{
                id: string;
                snippet: {
                    title: string;
                    channelTitle: string;
                    publishedAt: string;
                    categoryId?: string;
                    tags?: string[];
                };
                statistics?: {
                    viewCount?: string;
                };
            }>;
        }>(endpoint, { revalidate: 1800 });

        if (!apiRes.ok) {
            throw new Error(apiRes.error || "YouTube API request failed");
        }

        const data = apiRes.data;

        if (!data.items || data.items.length === 0) {
            return NextResponse.json({
                success: true,
                videos: [],
                message: "No trending videos found"
            });
        }

        // Extract relevant info from videos
        const videos = data.items.map((item: {
            id: string;
            snippet: {
                title: string;
                channelTitle: string;
                publishedAt: string;
                categoryId?: string;
                tags?: string[];
            };
            statistics?: {
                viewCount?: string;
            };
        }) => ({
            id: item.id,
            title: item.snippet.title,
            channel: item.snippet.channelTitle,
            publishedAt: item.snippet.publishedAt,
            views: item.statistics?.viewCount || "0",
            tags: item.snippet.tags?.slice(0, 10) || []
        }));

        return NextResponse.json(
            {
                success: true,
                region: regionCode,
                videos: videos,
                count: videos.length
            },
            {
                headers: {
                    "Cache-Control": "s-maxage=1800, stale-while-revalidate=3600",
                },
            }
        );

    } catch (error) {
        console.error("Trending fetch error:", error);
        // Generic message: raw error text can leak upstream API details.
        return NextResponse.json(
            { error: "Failed to fetch trending videos. Please try again later.", success: false },
            { status: 500 }
        );
    }
}
