import { NextRequest, NextResponse } from "next/server";

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
    const { searchParams } = new URL(req.url);
    const region = searchParams.get("region") || "us";
    const category = searchParams.get("category"); // Optional category filter

    const apiKey = process.env.YOUTUBE_API_KEY;

    if (!apiKey) {
        return NextResponse.json({
            success: false,
            demo: true,
            videos: [],
            message: "YouTube API key not configured"
        });
    }

    const regionCode = REGION_CODES[region.toLowerCase()] || "US";

    try {
        // Fetch trending videos
        let url = `https://www.googleapis.com/youtube/v3/videos?` +
            `part=snippet,statistics&chart=mostPopular&regionCode=${regionCode}&maxResults=20&key=${apiKey}`;

        // Add category if specified (e.g., 10 = Music, 20 = Gaming, 24 = Entertainment)
        if (category) {
            url += `&videoCategoryId=${category}`;
        }

        const response = await fetch(url, { next: { revalidate: 1800 } }); // Cache 30 min

        if (!response.ok) {
            const errorData = await response.json();
            console.error("YouTube API error:", errorData);
            throw new Error(errorData.error?.message || "YouTube API request failed");
        }

        const data = await response.json();

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

        return NextResponse.json({
            success: true,
            region: regionCode,
            videos: videos,
            count: videos.length
        });

    } catch (error) {
        console.error("Trending fetch error:", error);
        return NextResponse.json(
            {
                error: error instanceof Error ? error.message : "Failed to fetch trending videos",
                success: false
            },
            { status: 500 }
        );
    }
}
