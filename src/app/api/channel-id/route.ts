import { NextResponse } from "next/server";
import { extractVideoId } from "@/lib/utils";
import { enforceRateLimit, getRequestIp } from "@/lib/rate-limit";
import { verifyOrigin } from "@/lib/verifyOrigin";
import {
    CHANNEL_STATS_REVALIDATE_SECONDS,
    VIDEO_METADATA_REVALIDATE_SECONDS,
    fetchYouTubeApiWithRotation,
    getConfiguredYouTubeApiKeys,
} from "@/lib/youtubeApiClient";

interface ChannelLookupResponse {
    items?: Array<{
        id?: string | { channelId?: string };
        snippet?: {
            title?: string;
            description?: string;
            customUrl?: string;
            publishedAt?: string;
            thumbnails?: Record<string, unknown>;
            channelId?: string;
        };
        statistics?: Record<string, unknown>;
    }>;
}

async function resolveChannelByQuery(rawQuery: unknown, headers: Headers) {
    const ip = getRequestIp(headers);
    const rl = enforceRateLimit(`channel-id:${ip}`, 30, 60 * 60 * 1000);
    if (!rl.allowed) {
        return NextResponse.json(
            { error: "Too many requests. Please try again later." },
            { status: 429, headers: { "Retry-After": String(rl.retryAfterSeconds) } },
        );
    }

    const query = typeof rawQuery === "string" ? rawQuery.trim() : "";
    if (!query) {
        return NextResponse.json(
            { error: "Please enter a channel URL or handle" },
            { status: 400 }
        );
    }

    if (getConfiguredYouTubeApiKeys().length === 0) {
        return NextResponse.json(
            { error: "Server configuration error: API key missing" },
            { status: 500 }
        );
    }

    const searchPart = "snippet";
    const channelPart = "snippet,statistics,contentDetails";
    const searchType = "channel";
    let usedSearch = true;
    let endpoint = `search?part=${searchPart}&q=${encodeURIComponent(query)}&type=${searchType}`;

    // Resolve channel ID / handle / custom URL into direct channels lookup where possible
    try {
        if (/^@[\w.-]+$/.test(query)) {
            endpoint = `channels?part=${channelPart}&forHandle=${encodeURIComponent(query)}`;
            usedSearch = false;
        } else if (/^UC[\w-]{20,}$/.test(query)) {
            endpoint = `channels?part=${channelPart}&id=${encodeURIComponent(query)}`;
            usedSearch = false;
        } else if (query.includes("youtube.com") || query.includes("youtu.be")) {
            const withProtocol = /^https?:\/\//i.test(query) ? query : `https://${query}`;
            const urlObj = new URL(withProtocol);
            const pathSegments = urlObj.pathname.split("/").filter(Boolean);
            if (pathSegments[0] === "channel" && pathSegments[1]) {
                endpoint = `channels?part=${channelPart}&id=${encodeURIComponent(pathSegments[1])}`;
                usedSearch = false;
            } else if (pathSegments[0]?.startsWith("@")) {
                endpoint = `channels?part=${channelPart}&forHandle=${encodeURIComponent(pathSegments[0])}`;
                usedSearch = false;
            } else if (pathSegments[0] === "c" || pathSegments[0] === "user") {
                const q = pathSegments[1] || query;
                endpoint = `search?part=${searchPart}&q=${encodeURIComponent(q)}&type=${searchType}`;
                usedSearch = true;
            }
        }
    } catch {
        // ignore invalid url and treat as search string
    }

    // Check if input is a video URL (e.g. youtu.be/VIDEO_ID or youtube.com/watch?v=...)
    const videoId = extractVideoId(query);
    if (videoId) {
        const videoRes = await fetchYouTubeApiWithRotation<ChannelLookupResponse>(
            `videos?part=snippet&id=${encodeURIComponent(videoId)}`,
            { revalidate: VIDEO_METADATA_REVALIDATE_SECONDS },
        );

        if (!videoRes.ok) {
            return NextResponse.json(
                { error: "YouTube API error" },
                { status: videoRes.status }
            );
        }

        const resolvedChannelId = videoRes.data.items?.[0]?.snippet?.channelId;
        if (resolvedChannelId) {
            endpoint = `channels?part=${channelPart}&id=${encodeURIComponent(resolvedChannelId)}`;
            usedSearch = false;
        }
    }

    const chRes = await fetchYouTubeApiWithRotation<ChannelLookupResponse>(endpoint, {
        revalidate: CHANNEL_STATS_REVALIDATE_SECONDS,
    });

    if (!chRes.ok) {
        return NextResponse.json(
            { error: "YouTube API error" },
            { status: chRes.status }
        );
    }

    const data = chRes.data;

    if (!data.items || data.items.length === 0) {
        return NextResponse.json(
            { error: "No channel found" },
            { status: 404 }
        );
    }

    let channelDetails = data.items[0];

    // If /search was used, fetch full channel snippet + statistics + contentDetails by resolved channel ID
    if (usedSearch || !channelDetails.statistics) {
        const rawId =
            typeof channelDetails.id === "object" && channelDetails.id !== null
                ? channelDetails.id.channelId
                : channelDetails.id;
        const finalId = typeof rawId === "string" ? rawId : undefined;

        if (!finalId) {
            return NextResponse.json(
                { error: "Could not resolve channel ID" },
                { status: 404 }
            );
        }

        const detailsRes = await fetchYouTubeApiWithRotation<ChannelLookupResponse>(
            `channels?part=${channelPart}&id=${encodeURIComponent(finalId)}`,
            { revalidate: CHANNEL_STATS_REVALIDATE_SECONDS },
        );

        if (!detailsRes.ok) {
            return NextResponse.json(
                { error: "YouTube API error" },
                { status: detailsRes.status }
            );
        }

        if (!detailsRes.data.items || detailsRes.data.items.length === 0) {
            return NextResponse.json(
                { error: "Channel details not found" },
                { status: 404 }
            );
        }

        channelDetails = detailsRes.data.items[0];
    }

    return NextResponse.json(
        {
            id: channelDetails.id,
            title: channelDetails.snippet?.title || "",
            description: channelDetails.snippet?.description || "",
            customUrl: channelDetails.snippet?.customUrl || "",
            publishedAt: channelDetails.snippet?.publishedAt || "",
            thumbnails: channelDetails.snippet?.thumbnails || {},
            statistics: channelDetails.statistics || {},
        },
        {
            headers: {
                "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400",
            },
        }
    );
}

export async function GET(req: Request) {
    const originCheck = verifyOrigin(req);
    if (!originCheck.allowed) {
        return originCheck.response;
    }

    try {
        const { searchParams } = new URL(req.url);
        const rawQuery = searchParams.get("query") ?? searchParams.get("url");
        return await resolveChannelByQuery(rawQuery, req.headers);
    } catch (error) {
        console.error("Channel ID API error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function POST(req: Request) {
    const originCheck = verifyOrigin(req);
    if (!originCheck.allowed) {
        return originCheck.response;
    }

    try {
        const parsedBody = await req.json().catch(() => null);
        if (!parsedBody) {
            return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
        }
        const rawQuery = parsedBody.query ?? parsedBody.url;
        return await resolveChannelByQuery(rawQuery, req.headers);
    } catch (error) {
        console.error("Channel ID API error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
