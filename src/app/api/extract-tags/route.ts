import { NextRequest, NextResponse } from "next/server";
import { enforceRateLimit, getRequestIp } from "@/lib/rate-limit";
import { verifyOrigin } from "@/lib/verifyOrigin";
import { extractVideoId } from "@/lib/utils";
import {
  VIDEO_METADATA_REVALIDATE_SECONDS,
  fetchVideoMetadataWithFallback,
  fetchYouTubeApiWithRotation,
  getConfiguredYouTubeApiKeys,
} from "@/lib/youtubeApiClient";

/**
 * YouTube Tag Extractor API
 *
 * Supports:
 * - GET  ?videoId=XXXXXXXXXXX
 * - POST { videoId } or { videoUrl }
 *
 * Uses YouTube Data API v3. Configure YOUTUBE_API_KEY in .env.local.
 */

function jsonError(message: string, status: number, extra: Record<string, unknown> = {}) {
  return NextResponse.json({ success: false, error: message, ...extra }, { status });
}

async function extractTagsForVideoId(videoId: string, req: NextRequest) {
  if (!/^[A-Za-z0-9_-]{11}$/.test(videoId)) {
    return jsonError("Invalid video ID format", 400);
  }

  const ip = getRequestIp(req.headers);
  const rl = enforceRateLimit(`extract-tags:${ip}`, 30, 60 * 60 * 1000);
  if (!rl.allowed) {
    return NextResponse.json(
      { success: false, error: "Too many requests. Please try again later." },
      { status: 429, headers: { "Retry-After": String(rl.retryAfterSeconds) } },
    );
  }

  const keys = getConfiguredYouTubeApiKeys();

  try {
    const apiRes = keys.length
      ? await fetchYouTubeApiWithRotation<{
          items?: Array<{
            snippet?: {
              title?: string;
              channelTitle?: string;
              publishedAt?: string;
              description?: string;
              tags?: string[];
            };
          }>;
        }>(`videos?part=snippet&id=${encodeURIComponent(videoId)}`, {
          revalidate: VIDEO_METADATA_REVALIDATE_SECONDS,
        })
      : { ok: false as const, status: 503, error: "No API keys configured", quotaExhausted: false };

    if (!apiRes.ok) {
      // Graceful oEmbed public fallback so video metadata still resolves cleanly
      const oembedFallback = await fetchVideoMetadataWithFallback(videoId);
      if (oembedFallback) {
        return NextResponse.json({
          success: true,
          fallback: true,
          tags: [],
          videoTitle: oembedFallback.title,
          channelTitle: oembedFallback.channelTitle,
          videoInfo: {
            videoTitle: oembedFallback.title,
            channelTitle: oembedFallback.channelTitle,
            publishedAt: null,
          },
          message:
            keys.length === 0
              ? "Public oEmbed fallback active (YouTube Data API keys not configured)."
              : "YouTube Data API quota exceeded — showing public oEmbed metadata.",
        });
      }

      if (keys.length === 0) {
        return NextResponse.json({
          success: false,
          demo: true,
          isDemo: true,
          tags: [],
          videoInfo: null,
          message:
            "YouTube API keys not configured. Add YOUTUBE_API_KEYS or YOUTUBE_API_KEY in environment variables.",
          error: "YouTube API key not configured on the server.",
        });
      }

      throw new Error(apiRes.error || "YouTube API request failed");
    }

    const data = apiRes.data;

    if (!data.items || data.items.length === 0) {
      return NextResponse.json({
        success: true,
        tags: [],
        videoTitle: null,
        videoInfo: null,
        message: "Video not found or is private",
      });
    }

    const snippet = data.items[0].snippet || {};
    const tags: string[] = snippet.tags || [];
    const videoInfo = {
      videoTitle: snippet.title as string,
      channelTitle: snippet.channelTitle as string,
      publishedAt: snippet.publishedAt as string,
    };

    return NextResponse.json(
      {
        success: true,
        tags,
        videoTitle: snippet.title,
        channelTitle: snippet.channelTitle,
        description: snippet.description?.substring(0, 300),
        publishedAt: snippet.publishedAt,
        // Client components expect videoInfo object
        videoInfo,
      },
      {
        headers: {
          "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400",
        },
      },
    );
  } catch (error) {
    console.error("Tag extraction error:", error);
    // Generic message: raw error text can leak upstream API/DB details.
    return NextResponse.json(
      { success: false, error: "Failed to extract tags. Please try again." },
      { status: 500 },
    );
  }
}

export async function GET(req: NextRequest) {
  const originCheck = verifyOrigin(req);
  if (!originCheck.allowed) {
    return originCheck.response;
  }

  const { searchParams } = new URL(req.url);
  const videoId = searchParams.get("videoId");
  const videoUrl = searchParams.get("videoUrl") || searchParams.get("url");

  const resolved =
    videoId || (videoUrl ? extractVideoId(videoUrl) : null);

  if (!resolved) {
    return jsonError("Video ID or valid YouTube URL is required", 400);
  }

  return extractTagsForVideoId(resolved, req);
}

export async function POST(req: NextRequest) {
  const originCheck = verifyOrigin(req);
  if (!originCheck.allowed) {
    return originCheck.response;
  }

  try {
    const body = await req.json().catch(() => ({}));
    const videoId =
      (typeof body.videoId === "string" && body.videoId) ||
      (typeof body.videoUrl === "string" && extractVideoId(body.videoUrl)) ||
      (typeof body.url === "string" && extractVideoId(body.url)) ||
      null;

    if (!videoId) {
      return jsonError(
        "Please provide a valid YouTube video URL or 11-character video ID",
        400,
      );
    }

    return extractTagsForVideoId(videoId, req);
  } catch (error) {
    console.error("Tag extraction POST error:", error);
    return jsonError("Invalid request body", 400);
  }
}
