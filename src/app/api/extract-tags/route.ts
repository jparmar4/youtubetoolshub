import { NextRequest, NextResponse } from "next/server";

/**
 * YouTube Tag Extractor API
 * 
 * Uses YouTube Data API v3 to fetch video tags/keywords
 * Configure YOUTUBE_API_KEY in your .env.local file
 * 
 * Get API key at: https://console.developers.google.com/
 */

// Use Edge runtime for faster cold starts and lower CPU usage
export const runtime = "edge";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const videoId = searchParams.get("videoId");

    if (!videoId) {
        return NextResponse.json(
            { error: "Video ID is required" },
            { status: 400 }
        );
    }

    const apiKey = process.env.YOUTUBE_API_KEY;

    if (!apiKey) {
        return NextResponse.json({
            success: false,
            demo: true,
            tags: [],
            message: "YouTube API key not configured. Add YOUTUBE_API_KEY to .env.local"
        });
    }

    try {
        // Call YouTube Data API v3
        const response = await fetch(
            `https://www.googleapis.com/youtube/v3/videos?` +
            `part=snippet&id=${videoId}&key=${apiKey}`,
            { next: { revalidate: 3600 } } // Cache for 1 hour
        );

        if (!response.ok) {
            const errorData = await response.json();
            console.error("YouTube API error:", errorData);
            throw new Error(errorData.error?.message || "YouTube API request failed");
        }

        const data = await response.json();

        if (!data.items || data.items.length === 0) {
            return NextResponse.json({
                success: true,
                tags: [],
                videoTitle: null,
                message: "Video not found or is private"
            });
        }

        const video = data.items[0];
        const snippet = video.snippet;

        // Extract tags (may be undefined if video has no tags)
        const tags = snippet.tags || [];

        return NextResponse.json(
            {
                success: true,
                tags: tags,
                videoTitle: snippet.title,
                channelTitle: snippet.channelTitle,
                description: snippet.description?.substring(0, 300),
                publishedAt: snippet.publishedAt
            },
            {
                headers: {
                    "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400",
                },
            }
        );

    } catch (error) {
        console.error("Tag extraction error:", error);
        return NextResponse.json(
            {
                error: error instanceof Error ? error.message : "Failed to extract tags",
                success: false
            },
            { status: 500 }
        );
    }
}
