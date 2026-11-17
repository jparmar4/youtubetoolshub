import { NextResponse } from "next/server";
import { parseDuration } from "@/lib/utils";
import { enforceRateLimit, getRequestIp } from "@/lib/rate-limit";
import {
    VIDEO_METADATA_REVALIDATE_SECONDS,
    fetchYouTubeApiWithRotation,
    getConfiguredYouTubeApiKeys,
    type YouTubeApiResponse,
} from "@/lib/youtubeApiClient";
import { verifyOrigin } from "@/lib/verifyOrigin";

export async function POST(req: Request) {
    try {
        const originCheck = verifyOrigin(req);
        if (!originCheck.allowed) {
            return originCheck.response;
        }

        const ip = getRequestIp(req.headers);
        const rl = enforceRateLimit(`playlist-length:${ip}`, 20, 60 * 60 * 1000);
        if (!rl.allowed) {
            return NextResponse.json(
                { error: "Too many requests. Please try again later." },
                { status: 429, headers: { "Retry-After": String(rl.retryAfterSeconds) } },
            );
        }

        const parsedBody = await req.json().catch(() => null);
        if (!parsedBody) {
            return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
        }
        const rawQuery = parsedBody.query ?? parsedBody.url;
        const query = typeof rawQuery === "string" ? rawQuery.trim() : "";

        if (!query) {
            return NextResponse.json(
                { error: "Please enter a playlist URL" },
                { status: 400 }
            );
        }

        if (getConfiguredYouTubeApiKeys().length === 0) {
            return NextResponse.json(
                { error: "Server configuration error" },
                { status: 500 }
            );
        }

        // Extract playlist ID — handle both full URLs and raw IDs
        let playlistId = query;
        try {
            const urlParams = new URL(query).searchParams;
            if (urlParams.has("list")) {
                playlistId = urlParams.get("list")!;
            }
        } catch {
            // Not a valid URL — treat `query` as a raw playlist ID
        }

        if (!playlistId) {
            return NextResponse.json(
                { error: "Invalid playlist URL" },
                { status: 400 }
            );
        }

        // Validate playlist ID format (YouTube playlist IDs start with PL, FL, RD, UU, etc.)
        if (!/^[A-Za-z0-9_-]{10,50}$/.test(playlistId)) {
            return NextResponse.json(
                { error: "Invalid playlist ID format" },
                { status: 400 }
            );
        }

        let totalSeconds = 0;
        let videoCount = 0;
        let nextPageToken: string | null = "";
        const maxVideos = 500; // Safety limit
        let fetchedVideos = 0;

        // Fetch playlist details (title, thumbnail)
        const playlistRes = await fetchYouTubeApiWithRotation<{
            items?: Array<{
                snippet: {
                    title: string;
                    channelTitle: string;
                    thumbnails?: { medium?: { url?: string }; default?: { url?: string } };
                };
            }>;
        }>(`playlists?part=snippet&id=${encodeURIComponent(playlistId)}`, {
            revalidate: VIDEO_METADATA_REVALIDATE_SECONDS,
        });

        if (!playlistRes.ok) {
            return NextResponse.json(
                { error: "YouTube API error" },
                { status: playlistRes.status }
            );
        }
        const playlistData = playlistRes.data;

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

        type PlaylistItemsPage = {
            items?: Array<{ contentDetails?: { videoId?: string } }>;
            nextPageToken?: string;
        };

        // Fetch videos
        while (nextPageToken !== null && fetchedVideos < maxVideos) {
            const pageTokenQuery: string = nextPageToken || "";
            const itemsRes: YouTubeApiResponse<PlaylistItemsPage> =
                await fetchYouTubeApiWithRotation<PlaylistItemsPage>(
                    `playlistItems?part=contentDetails&maxResults=50&playlistId=${encodeURIComponent(playlistId)}&pageToken=${encodeURIComponent(pageTokenQuery)}`,
                    { revalidate: VIDEO_METADATA_REVALIDATE_SECONDS },
                );

            if (!itemsRes.ok) {
                return NextResponse.json(
                    { error: "YouTube API error" },
                    { status: itemsRes.status }
                );
            }
            const itemsData: PlaylistItemsPage = itemsRes.data;

            const videoIds = (itemsData.items || [])
                .map((item) => item.contentDetails?.videoId)
                .filter((id): id is string => typeof id === "string" && id.length > 0);
            if (videoIds.length === 0) break;

            // Fetch video durations
            const videosRes = await fetchYouTubeApiWithRotation<{
                items?: Array<{ contentDetails?: { duration?: string } }>;
            }>(`videos?part=contentDetails&id=${videoIds.join(",")}`, {
                revalidate: VIDEO_METADATA_REVALIDATE_SECONDS,
            });

            if (!videosRes.ok) {
                return NextResponse.json(
                    { error: "YouTube API error" },
                    { status: videosRes.status }
                );
            }
            const videosData = videosRes.data;

            if (Array.isArray(videosData.items)) {
                videosData.items.forEach((video) => {
                    const duration = video.contentDetails?.duration;
                    if (duration) {
                        totalSeconds += parseDuration(duration);
                    }
                    videoCount++;
                });
            }

            fetchedVideos += videoIds.length;
            nextPageToken = itemsData.nextPageToken || null;
        }

        return NextResponse.json(
            {
                playlistInfo,
                videoCount,
                totalSeconds,
                averageSeconds: videoCount > 0 ? Math.round(totalSeconds / videoCount) : 0,
            },
            {
                headers: {
                    "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400",
                },
            }
        );

    } catch (error) {
        console.error("Playlist API error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
