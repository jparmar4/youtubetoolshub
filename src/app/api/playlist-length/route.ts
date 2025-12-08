
import { NextResponse } from "next/server";
import { parseDuration } from "@/lib/utils";

export async function POST(req: Request) {
    try {
        const { query } = await req.json();

        if (!query) {
            return NextResponse.json(
                { error: "Please enter a playlist URL" },
                { status: 400 }
            );
        }

        const apiKey = process.env.YOUTUBE_API_KEY;

        if (!apiKey) {
            return NextResponse.json(
                { error: "Server configuration error" },
                { status: 500 }
            );
        }

        // Extract playlist ID
        let playlistId = query;
        const urlParams = new URL(query).searchParams;
        if (urlParams.has("list")) {
            playlistId = urlParams.get("list")!;
        }

        if (!playlistId) {
            return NextResponse.json(
                { error: "Invalid playlist URL" },
                { status: 400 }
            );
        }

        let totalSeconds = 0;
        let videoCount = 0;
        let nextPageToken: string | null = "";
        const maxVideos = 500; // Safety limit
        let fetchedVideos = 0;

        // Fetch playlist details (title, thumbnail)
        const playlistResponse = await fetch(
            `https://www.googleapis.com/youtube/v3/playlists?part=snippet&id=${playlistId}&key=${apiKey}`
        );
        const playlistData = await playlistResponse.json();

        if (!playlistData.items || playlistData.items.length === 0) {
            return NextResponse.json(
                { error: "Playlist not found or private" },
                { status: 404 }
            );
        }

        const playlistInfo = {
            title: playlistData.items[0].snippet.title,
            thumbnail: playlistData.items[0].snippet.thumbnails?.medium?.url || playlistData.items[0].snippet.thumbnails?.default?.url,
            channelTitle: playlistData.items[0].snippet.channelTitle,
        };

        // Fetch videos
        while (nextPageToken !== null && fetchedVideos < maxVideos) {
            const itemsUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&maxResults=50&playlistId=${playlistId}&key=${apiKey}&pageToken=${nextPageToken || ""}`;
            const itemsResponse = await fetch(itemsUrl);
            const itemsData = await itemsResponse.json();

            if (itemsData.error) {
                return NextResponse.json(
                    { error: itemsData.error.message },
                    { status: 400 }
                );
            }

            const videoIds = itemsData.items.map((item: any) => item.contentDetails.videoId);
            if (videoIds.length === 0) break;

            // Fetch video durations
            const videosUrl = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videoIds.join(",")}&key=${apiKey}`;
            const videosResponse = await fetch(videosUrl);
            const videosData = await videosResponse.json();

            if (videosData.items) {
                videosData.items.forEach((video: any) => {
                    totalSeconds += parseDuration(video.contentDetails.duration);
                    videoCount++;
                });
            }

            fetchedVideos += videoIds.length;
            nextPageToken = itemsData.nextPageToken || null;
        }

        return NextResponse.json({
            playlistInfo,
            videoCount,
            totalSeconds,
            averageSeconds: videoCount > 0 ? Math.round(totalSeconds / videoCount) : 0,
        });

    } catch (error) {
        console.error("Playlist API error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
