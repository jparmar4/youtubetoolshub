
import { NextResponse } from "next/server";
import { extractVideoId } from "@/lib/utils";

// Use Edge runtime for faster cold starts and lower CPU usage
export const runtime = "edge";

export async function POST(req: Request) {
    try {
        const { query } = await req.json();

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

        // 1. Try to find by handle (if starts with @)
        // 1. Try to find by handle (if starts with @)
        const searchPart = "snippet,id";
        const searchType = "channel";
        let apiUrl = `https://www.googleapis.com/youtube/v3/search?part=${searchPart}&q=${encodeURIComponent(query)}&type=${searchType}&key=${apiKey}`;

        // If it looks like a channel ID (UC...) we can use channels endpoint directly?
        // Actually search is safer as it handles handles, names, etc.
        // But for exact channel ID lookup, channels endpoint is better.
        // Let's stick to search for flexibility, as it handles handles well.

        // If it's a full URL, try to extract the useful part
        try {
            if (query.includes('youtube.com/')) {
                const urlObj = new URL(query);
                const pathSegments = urlObj.pathname.split('/').filter(Boolean);
                if (pathSegments[0] === 'channel') {
                    // specific channel ID
                    apiUrl = `https://www.googleapis.com/youtube/v3/channels?part=${searchPart}&id=${pathSegments[1]}&key=${apiKey}`;
                } else if (pathSegments[0] === 'c' || pathSegments[0] === 'user' || pathSegments[0].startsWith('@')) {
                    // handle or custom url -> use search
                    apiUrl = `https://www.googleapis.com/youtube/v3/search?part=${searchPart}&q=${encodeURIComponent(query)}&type=${searchType}&key=${apiKey}`;
                }
            }
        } catch {
            // ignore invalid url and treat as string
        }

        // 2. Check if it's a video URL (e.g. youtu.be/VIDEO_ID)
        const videoId = extractVideoId(query);
        if (videoId) {
            const videoResponse = await fetch(
                `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`
            );
            const videoData = await videoResponse.json();

            if (videoData.items && videoData.items.length > 0) {
                // Found the video, use its channel ID
                const channelId = videoData.items[0].snippet.channelId;
                apiUrl = `https://www.googleapis.com/youtube/v3/channels?part=${searchPart}&id=${channelId}&key=${apiKey}`;
            }
        }

        const response = await fetch(apiUrl);
        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json(
                { error: data.error?.message || "YouTube API error" },
                { status: response.status }
            );
        }

        if (!data.items || data.items.length === 0) {
            return NextResponse.json(
                { error: "No channel found" },
                { status: 404 }
            );
        }

        const item = data.items[0];

        // If we used search, we only get basic info. We might want to fetch full channel details with the ID we found
        // to get proper statistics or high res snippet.
        const channelId = item.id?.channelId || item.id; // search returns id object, channels returns string id (actually inside id property for both usually? let's check) -- search: id: { kind: "youtube#channel", channelId: "UC..." }, channels: id: "UC..."

        const finalId = typeof channelId === 'string' ? channelId : channelId.channelId;

        if (!finalId) {
            return NextResponse.json(
                { error: "Could not resolve channel ID" },
                { status: 404 }
            );
        }

        const detailsResponse = await fetch(
            `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics,contentDetails&id=${finalId}&key=${apiKey}`
        );
        const detailsData = await detailsResponse.json();

        if (!detailsData.items || detailsData.items.length === 0) {
            return NextResponse.json(
                { error: "Channel details not found" },
                { status: 404 }
            );
        }

        const channelDetails = detailsData.items[0];

        return NextResponse.json(
            {
                id: channelDetails.id,
                title: channelDetails.snippet.title,
                description: channelDetails.snippet.description,
                customUrl: channelDetails.snippet.customUrl,
                publishedAt: channelDetails.snippet.publishedAt,
                thumbnails: channelDetails.snippet.thumbnails,
                statistics: channelDetails.statistics,
            },
            {
                headers: {
                    "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400",
                },
            }
        );

    } catch (error) {
        console.error("Channel ID API error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
