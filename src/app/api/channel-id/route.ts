import { NextResponse } from "next/server";
import { extractVideoId } from "@/lib/utils";
import { enforceRateLimit, getRequestIp } from "@/lib/rate-limit";

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

    const apiKey = process.env.YOUTUBE_API_KEY;
    if (!apiKey) {
        return NextResponse.json(
            { error: "Server configuration error: API key missing" },
            { status: 500 }
        );
    }

    const searchPart = "snippet";
    const channelPart = "snippet,statistics,contentDetails";
    const searchType = "channel";
    let usedSearch = true;
    let apiUrl = `https://www.googleapis.com/youtube/v3/search?part=${searchPart}&q=${encodeURIComponent(query)}&type=${searchType}&key=${apiKey}`;

    // Resolve channel ID / handle / custom URL into direct channels lookup where possible
    try {
        if (/^@[\w.-]+$/.test(query)) {
            apiUrl = `https://www.googleapis.com/youtube/v3/channels?part=${channelPart}&forHandle=${encodeURIComponent(query)}&key=${apiKey}`;
            usedSearch = false;
        } else if (/^UC[\w-]{20,}$/.test(query)) {
            apiUrl = `https://www.googleapis.com/youtube/v3/channels?part=${channelPart}&id=${encodeURIComponent(query)}&key=${apiKey}`;
            usedSearch = false;
        } else if (query.includes("youtube.com") || query.includes("youtu.be")) {
            const withProtocol = /^https?:\/\//i.test(query) ? query : `https://${query}`;
            const urlObj = new URL(withProtocol);
            const pathSegments = urlObj.pathname.split("/").filter(Boolean);
            if (pathSegments[0] === "channel" && pathSegments[1]) {
                apiUrl = `https://www.googleapis.com/youtube/v3/channels?part=${channelPart}&id=${encodeURIComponent(pathSegments[1])}&key=${apiKey}`;
                usedSearch = false;
            } else if (pathSegments[0]?.startsWith("@")) {
                apiUrl = `https://www.googleapis.com/youtube/v3/channels?part=${channelPart}&forHandle=${encodeURIComponent(pathSegments[0])}&key=${apiKey}`;
                usedSearch = false;
            } else if (pathSegments[0] === "c" || pathSegments[0] === "user") {
                const q = pathSegments[1] || query;
                apiUrl = `https://www.googleapis.com/youtube/v3/search?part=${searchPart}&q=${encodeURIComponent(q)}&type=${searchType}&key=${apiKey}`;
                usedSearch = true;
            }
        }
    } catch {
        // ignore invalid url and treat as search string
    }

    // Check if input is a video URL (e.g. youtu.be/VIDEO_ID or youtube.com/watch?v=...)
    const videoId = extractVideoId(query);
    if (videoId) {
        const videoResponse = await fetch(
            `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${encodeURIComponent(videoId)}&key=${apiKey}`
        );
        const videoData = await videoResponse.json();

        if (!videoResponse.ok || videoData.error) {
            return NextResponse.json(
                { error: "YouTube API error" },
                { status: videoResponse.ok ? 400 : videoResponse.status }
            );
        }

        if (videoData.items && videoData.items.length > 0) {
            const channelId = videoData.items[0].snippet?.channelId;
            if (channelId) {
                apiUrl = `https://www.googleapis.com/youtube/v3/channels?part=${channelPart}&id=${encodeURIComponent(channelId)}&key=${apiKey}`;
                usedSearch = false;
            }
        }
    }

    const response = await fetch(apiUrl);
    const data = await response.json();

    if (!response.ok || data.error) {
        return NextResponse.json(
            { error: "YouTube API error" },
            { status: response.ok ? 400 : response.status }
        );
    }

    if (!data.items || data.items.length === 0) {
        return NextResponse.json(
            { error: "No channel found" },
            { status: 404 }
        );
    }

    let channelDetails = data.items[0];

    // If /search was used, fetch full channel snippet + statistics + contentDetails by resolved channel ID
    if (usedSearch || !channelDetails.statistics) {
        const rawId = channelDetails.id?.channelId || channelDetails.id;
        const finalId = typeof rawId === "string" ? rawId : rawId?.channelId;

        if (!finalId) {
            return NextResponse.json(
                { error: "Could not resolve channel ID" },
                { status: 404 }
            );
        }

        const detailsResponse = await fetch(
            `https://www.googleapis.com/youtube/v3/channels?part=${channelPart}&id=${encodeURIComponent(finalId)}&key=${apiKey}`
        );
        const detailsData = await detailsResponse.json();

        if (!detailsResponse.ok || detailsData.error) {
            return NextResponse.json(
                { error: "YouTube API error" },
                { status: detailsResponse.ok ? 400 : detailsResponse.status }
            );
        }

        if (!detailsData.items || detailsData.items.length === 0) {
            return NextResponse.json(
                { error: "Channel details not found" },
                { status: 404 }
            );
        }

        channelDetails = detailsData.items[0];
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
