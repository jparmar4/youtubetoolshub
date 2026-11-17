
import { NextResponse } from "next/server";
import { extractVideoId } from "@/lib/utils";
import { enforceRateLimit, getRequestIp } from "@/lib/rate-limit";
import {
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

        const parsedBody = await req.json().catch(() => null);
        if (!parsedBody) {
            return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
        }
        const { url } = parsedBody;

        // Rate limiting: 10 requests/hour per IP (each call makes up to 20 YouTube API calls)
        const ip = getRequestIp((req as { headers: Headers }).headers);
        const rl = enforceRateLimit(`comment-picker:${ip}`, 10, 60 * 60 * 1000);
        if (!rl.allowed) {
            return NextResponse.json(
                { error: "Too many requests. Please try again later." },
                { status: 429, headers: { "Retry-After": String(rl.retryAfterSeconds) } }
            );
        }

        if (!url) {
            return NextResponse.json(
                { error: "Please enter a video URL" },
                { status: 400 }
            );
        }

        const videoId = extractVideoId(url);
        if (!videoId) {
            return NextResponse.json(
                { error: "Invalid YouTube URL" },
                { status: 400 }
            );
        }

        if (getConfiguredYouTubeApiKeys().length === 0) {
            return NextResponse.json(
                { error: "Server configuration error" },
                { status: 500 }
            );
        }

        type CommentThreadsPage = {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            items?: any[];
            nextPageToken?: string;
        };

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const allComments: any[] = [];
        let nextPageToken: string | null = "";
        const maxComments = 2000; // Safety limit
        let fetchedCount = 0;

        // Fetch comments with automatic multi-key rotation on 403 quotaExceeded
        while (nextPageToken !== null && fetchedCount < maxComments) {
            const pageTokenQuery: string = nextPageToken || "";
            const apiRes: YouTubeApiResponse<CommentThreadsPage> =
                await fetchYouTubeApiWithRotation<CommentThreadsPage>(
                    `commentThreads?part=snippet&videoId=${encodeURIComponent(videoId)}&maxResults=100&order=relevance&pageToken=${encodeURIComponent(pageTokenQuery)}`,
                    { revalidate: 300 },
                );

            if (!apiRes.ok) {
                const rawErr = apiRes.rawError as { error?: { errors?: Array<{ reason?: string }> } } | undefined;
                if (rawErr?.error?.errors?.[0]?.reason === "commentsDisabled") {
                    return NextResponse.json(
                        { error: "Comments are disabled for this video." },
                        { status: 400 }
                    );
                }
                return NextResponse.json(
                    { error: "YouTube API error" },
                    { status: apiRes.status }
                );
            }
            const data: CommentThreadsPage = apiRes.data;

            if (Array.isArray(data.items)) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const comments = data.items.map((item: any) => ({
                    id: item.id,
                    text: item.snippet.topLevelComment.snippet.textDisplay,
                    authorDisplayName: item.snippet.topLevelComment.snippet.authorDisplayName,
                    authorProfileImageUrl: item.snippet.topLevelComment.snippet.authorProfileImageUrl,
                    authorChannelUrl: item.snippet.topLevelComment.snippet.authorChannelUrl,
                    publishedAt: item.snippet.topLevelComment.snippet.publishedAt,
                    likeCount: item.snippet.topLevelComment.snippet.likeCount,
                }));
                allComments.push(...comments);
                fetchedCount += comments.length;
            }

            nextPageToken = data.nextPageToken || null;
        }

        return NextResponse.json({
            comments: allComments,
            count: allComments.length,
            hasMore: nextPageToken !== null, // To indicate if we hit the limit
        });

    } catch (error) {
        console.error("Comment Picker API error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
