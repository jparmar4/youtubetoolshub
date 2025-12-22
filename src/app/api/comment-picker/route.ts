
import { NextResponse } from "next/server";
import { extractVideoId } from "@/lib/utils";

export async function POST(req: Request) {
    try {
        const { url } = await req.json();

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

        const apiKey = process.env.YOUTUBE_API_KEY;

        if (!apiKey) {
            return NextResponse.json(
                { error: "Server configuration error" },
                { status: 500 }
            );
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let allComments: any[] = [];
        let nextPageToken: string | null = "";
        const maxComments = 2000; // Safety limit
        let fetchedCount = 0;

        // Fetch comments
        while (nextPageToken !== null && fetchedCount < maxComments) {
            const apiUrl: string = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&maxResults=100&order=relevance&key=${apiKey}&pageToken=${nextPageToken || ""}`;

            const response = await fetch(apiUrl);
            const data = await response.json();

            if (data.error) {
                // specific check for disabled comments
                if (data.error.errors?.[0]?.reason === 'commentsDisabled') {
                    return NextResponse.json(
                        { error: "Comments are disabled for this video." },
                        { status: 400 }
                    );
                }
                return NextResponse.json(
                    { error: data.error.message },
                    { status: 400 }
                );
            }

            if (data.items) {
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
                allComments = [...allComments, ...comments];
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
