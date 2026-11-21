import { NextRequest, NextResponse } from "next/server";
import { verifyOrigin } from "@/lib/verifyOrigin";
import { enforceRateLimit, getRequestIp } from "@/lib/rate-limit";
import { extractVideoId, parseDuration } from "@/lib/utils";
import {
  VIDEO_METADATA_REVALIDATE_SECONDS,
  fetchVideoMetadataWithFallback,
  fetchYouTubeApiWithRotation,
  getConfiguredYouTubeApiKeys,
} from "@/lib/youtubeApiClient";
import {
  extractDescriptionChapters,
  formatTimestamp,
  type TranscriptLineItem,
} from "@/lib/youtubeCaptions";

export type ViewerQuestionIntent =
  | "Tutorial Request"
  | "Tool / Setup"
  | "Troubleshooting"
  | "Audience Question";

export interface MinedViewerQuestion {
  text: string;
  author: string;
  likes: number;
  intent: ViewerQuestionIntent;
}

export interface VideoXRayResponse {
  success: true;
  videoId: string;
  source: "youtube-api" | "public-fallback";
  video: {
    title: string;
    channelTitle: string;
    channelId: string | null;
    publishedAt: string | null;
    daysSincePublished: number | null;
    durationSeconds: number;
    durationFormatted: string;
    views: number | null;
    likes: number | null;
    commentsCount: number | null;
    viewsPerDay: number | null;
    likeRatePct: number | null;
    engagementRatePct: number | null;
    tags: string[];
    tagCharsUsed: number;
    descriptionLength: number;
    descriptionLinkCount: number;
    chapters: TranscriptLineItem[];
    hasZeroStartChapter: boolean;
  };
  packaging: {
    score: number;
    titleLength: number;
    titleStatus: "optimal" | "long" | "short";
    mobilePreview: string;
    checks: Array<{
      id: string;
      label: string;
      passed: boolean;
      detail: string;
      points: number;
    }>;
  };
  revenueBand: {
    globalMin: number;
    globalMax: number;
    tier1Min: number;
    tier1Max: number;
  } | null;
  comments: {
    status: "ok" | "disabled" | "api-unavailable";
    scannedCount: number;
    questions: MinedViewerQuestion[];
    topThemes: Array<{ topic: string; count: number }>;
  };
}

const QUESTION_TRIGGER_RE =
  /\?|\b(how do|how to|how can|what is|what are|what software|what mic|what camera|which one|which tool|can you|could you|please make|make a video|tutorial on|video on|why does|why is|does this work|where can i|is it worth|anyone know)\b/i;

const TUTORIAL_REQUEST_RE =
  /\b(please make|make a video|tutorial on|video on|can you cover|could you show|part 2|follow[- ]?up|next video)\b/i;

const TOOL_SETUP_RE =
  /\b(what mic|what camera|what software|what app|what tool|what editor|which plugin|what lens|link to|setup|gear|preset|template|font)\b/i;

const TROUBLESHOOT_RE =
  /\b(error|not working|doesn't work|doesnt work|failed|issue|problem|fix|stuck|help|can't|cannot|why does it)\b/i;

const COMMENT_STOPWORDS = new Set([
  "this", "that", "with", "from", "have", "your", "just", "like", "what", "when",
  "where", "which", "about", "there", "their", "they", "them", "would", "could",
  "should", "really", "very", "more", "some", "been", "were", "will", "into",
  "than", "then", "also", "only", "even", "much", "make", "made", "does", "dont",
  "didn", "video", "videos", "channel", "youtube", "thank", "thanks", "great",
  "awesome", "love", "good", "best", "nice", "please", "want", "need", "know",
  "watching", "watch", "here", "still", "because", "going", "think", "actually",
  "using", "used", "work", "works", "super", "ever", "never", "always", "every",
]);

function classifyQuestionIntent(text: string): ViewerQuestionIntent {
  if (TUTORIAL_REQUEST_RE.test(text)) return "Tutorial Request";
  if (TOOL_SETUP_RE.test(text)) return "Tool / Setup";
  if (TROUBLESHOOT_RE.test(text)) return "Troubleshooting";
  return "Audience Question";
}

function mineComments(
  rawComments: Array<{ text: string; author: string; likes: number }>,
): {
  questions: MinedViewerQuestion[];
  topThemes: Array<{ topic: string; count: number }>;
} {
  const seenKeys = new Set<string>();
  const questions: MinedViewerQuestion[] = [];
  const wordCounts = new Map<string, number>();

  for (const item of rawComments) {
    const cleaned = item.text
      .replace(/https?:\/\/\S+/g, "")
      .replace(/\s+/g, " ")
      .trim();
    if (cleaned.length < 14) continue;

    // Extract recurring theme keywords across all scanned comments
    const tokens = cleaned
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, " ")
      .split(/\s+/)
      .filter((w) => w.length >= 4 && !COMMENT_STOPWORDS.has(w) && !/^\d+$/.test(w));
    const uniqueInComment = new Set(tokens);
    for (const token of uniqueInComment) {
      wordCounts.set(token, (wordCounts.get(token) || 0) + 1);
    }

    // Filter high-signal viewer questions & content requests
    if (cleaned.length > 280) continue;
    if (!QUESTION_TRIGGER_RE.test(cleaned)) continue;

    const dedupeKey = cleaned.toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 48);
    if (!dedupeKey || seenKeys.has(dedupeKey)) continue;
    seenKeys.add(dedupeKey);

    questions.push({
      text: cleaned,
      author: item.author || "Viewer",
      likes: item.likes,
      intent: classifyQuestionIntent(cleaned),
    });
  }

  questions.sort((a, b) => b.likes - a.likes || a.text.length - b.text.length);

  const topThemes = [...wordCounts.entries()]
    .filter(([, count]) => count >= 2)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12)
    .map(([topic, count]) => ({ topic, count }));

  return {
    questions: questions.slice(0, 15),
    topThemes,
  };
}

function buildPackagingAudit(params: {
  title: string;
  tags: string[];
  tagCharsUsed: number;
  descriptionLength: number;
  chapters: TranscriptLineItem[];
  hasZeroStartChapter: boolean;
  engagementRatePct: number | null;
}): VideoXRayResponse["packaging"] {
  const titleLength = params.title.trim().length;
  const titleStatus: "optimal" | "long" | "short" =
    titleLength >= 30 && titleLength <= 60
      ? "optimal"
      : titleLength > 60
        ? "long"
        : "short";

  const mobilePreview =
    titleLength > 55 ? `${params.title.slice(0, 52).trimEnd()}...` : params.title;

  const checks = [
    {
      id: "title-length",
      label: "Mobile-Safe Title Length",
      passed: titleLength >= 30 && titleLength <= 65,
      detail:
        titleLength <= 65 && titleLength >= 30
          ? `${titleLength} chars — fits cleanly before mobile truncation (~55–65 chars).`
          : titleLength > 65
            ? `${titleLength} chars — truncates on mobile search/home feeds after ~55 chars.`
            : `${titleLength} chars — short title; room to add high-intent search context.`,
      points: titleLength >= 30 && titleLength <= 65 ? 20 : 10,
    },
    {
      id: "chapters",
      label: "Google Key Moments Chapters",
      passed: params.hasZeroStartChapter && params.chapters.length >= 3,
      detail:
        params.hasZeroStartChapter && params.chapters.length >= 3
          ? `${params.chapters.length} valid timestamps starting at 0:00 (Key Moments eligible).`
          : "Missing 3+ description chapters starting at 0:00 — opportunity to capture Google SERP Key Moments.",
      points: params.hasZeroStartChapter && params.chapters.length >= 3 ? 20 : 0,
    },
    {
      id: "description",
      label: "Semantic Description Depth",
      passed: params.descriptionLength >= 250,
      detail:
        params.descriptionLength >= 250
          ? `${params.descriptionLength.toLocaleString()} chars of crawlable context in description.`
          : `${params.descriptionLength} chars — thin description leaves semantic search context unused.`,
      points: params.descriptionLength >= 250 ? 20 : params.descriptionLength >= 80 ? 10 : 0,
    },
    {
      id: "tags",
      label: "Backend Tag Coverage",
      passed: params.tags.length >= 5,
      detail:
        params.tags.length >= 5
          ? `${params.tags.length} tags (${params.tagCharsUsed}/500 char budget used).`
          : params.tags.length > 0
            ? `Only ${params.tags.length} tags (${params.tagCharsUsed}/500 chars) — room for entity/typo variants.`
            : "0 backend tags exposed (either omitted by creator or unavailable via public fallback).",
      points: params.tags.length >= 5 ? 20 : params.tags.length > 0 ? 10 : 0,
    },
    {
      id: "engagement",
      label: "Viewer Engagement Signal",
      passed:
        params.engagementRatePct !== null ? params.engagementRatePct >= 2.0 : true,
      detail:
        params.engagementRatePct !== null
          ? `${params.engagementRatePct.toFixed(2)}% (likes + comments per 100 views; 2%+ is strong).`
          : "Public view/like counters unavailable in fallback mode.",
      points:
        params.engagementRatePct === null
          ? 12
          : params.engagementRatePct >= 3.0
            ? 20
            : params.engagementRatePct >= 1.5
              ? 14
              : 8,
    },
  ];

  const score = Math.min(
    100,
    checks.reduce((sum, c) => sum + c.points, 0),
  );

  return {
    score,
    titleLength,
    titleStatus,
    mobilePreview,
    checks,
  };
}

async function handleVideoXRay(rawInput: string, req: NextRequest) {
  const videoId = extractVideoId(rawInput);
  if (!videoId) {
    return NextResponse.json(
      { success: false, error: "Invalid YouTube URL or 11-character video ID." },
      { status: 400 },
    );
  }

  const ip = getRequestIp(req.headers);
  const rl = enforceRateLimit(`video-xray:${ip}`, 30, 60 * 60 * 1000);
  if (!rl.allowed) {
    return NextResponse.json(
      { success: false, error: "Too many X-Ray requests. Please try again later." },
      { status: 429, headers: { "Retry-After": String(rl.retryAfterSeconds) } },
    );
  }

  const hasApiKeys = getConfiguredYouTubeApiKeys().length > 0;

  const [videoApiRes, commentsApiRes] = await Promise.all([
    hasApiKeys
      ? fetchYouTubeApiWithRotation<{
          items?: Array<{
            snippet?: {
              title?: string;
              channelTitle?: string;
              channelId?: string;
              publishedAt?: string;
              description?: string;
              tags?: string[];
            };
            statistics?: {
              viewCount?: string;
              likeCount?: string;
              commentCount?: string;
            };
            contentDetails?: {
              duration?: string;
            };
          }>;
        }>(
          `videos?part=snippet,statistics,contentDetails&id=${encodeURIComponent(videoId)}`,
          { revalidate: VIDEO_METADATA_REVALIDATE_SECONDS },
        )
      : Promise.resolve(null),
    hasApiKeys
      ? fetchYouTubeApiWithRotation<{
          items?: Array<{
            snippet?: {
              topLevelComment?: {
                snippet?: {
                  textDisplay?: string;
                  textOriginal?: string;
                  authorDisplayName?: string;
                  likeCount?: number;
                };
              };
            };
          }>;
        }>(
          `commentThreads?part=snippet&videoId=${encodeURIComponent(videoId)}&maxResults=100&order=relevance&textFormat=plainText`,
          { revalidate: 3600 },
        )
      : Promise.resolve(null),
  ]);

  let source: "youtube-api" | "public-fallback" = "youtube-api";
  let title = "";
  let channelTitle = "";
  let channelId: string | null = null;
  let publishedAt: string | null = null;
  let description = "";
  let tags: string[] = [];
  let durationSeconds = 0;
  let views: number | null = null;
  let likes: number | null = null;
  let commentsCount: number | null = null;

  if (videoApiRes?.ok && videoApiRes.data.items && videoApiRes.data.items.length > 0) {
    const item = videoApiRes.data.items[0];
    title = item.snippet?.title || `YouTube Video (${videoId})`;
    channelTitle = item.snippet?.channelTitle || "YouTube Creator";
    channelId = item.snippet?.channelId || null;
    publishedAt = item.snippet?.publishedAt || null;
    description = item.snippet?.description || "";
    tags = Array.isArray(item.snippet?.tags) ? item.snippet.tags : [];
    durationSeconds = parseDuration(item.contentDetails?.duration || "");

    const parsedViews = Number.parseInt(item.statistics?.viewCount || "", 10);
    const parsedLikes = Number.parseInt(item.statistics?.likeCount || "", 10);
    const parsedComments = Number.parseInt(item.statistics?.commentCount || "", 10);
    views = Number.isFinite(parsedViews) ? parsedViews : null;
    likes = Number.isFinite(parsedLikes) ? parsedLikes : null;
    commentsCount = Number.isFinite(parsedComments) ? parsedComments : null;
  } else {
    source = "public-fallback";
    const fallbackMeta = await fetchVideoMetadataWithFallback(videoId);
    if (!fallbackMeta) {
      return NextResponse.json(
        {
          success: false,
          error: "Video not found, private, or unavailable. Check the URL and try again.",
        },
        { status: 404 },
      );
    }
    title = fallbackMeta.title || `YouTube Video (${videoId})`;
    channelTitle = fallbackMeta.channelTitle || "YouTube Creator";
    description = fallbackMeta.description || "";
    tags = Array.isArray(fallbackMeta.tags) ? fallbackMeta.tags : [];
  }

  const daysSincePublished = publishedAt
    ? Math.max(1, Math.floor((Date.now() - new Date(publishedAt).getTime()) / (1000 * 60 * 60 * 24)))
    : null;
  const viewsPerDay =
    views !== null && daysSincePublished !== null
      ? Math.round(views / daysSincePublished)
      : null;
  const likeRatePct =
    views && views > 0 && likes !== null ? Number(((likes / views) * 100).toFixed(2)) : null;
  const engagementRatePct =
    views && views > 0 && (likes !== null || commentsCount !== null)
      ? Number(((((likes || 0) + (commentsCount || 0)) / views) * 100).toFixed(2))
      : null;

  const tagCharsUsed = tags.join(",").length;
  const descriptionLinkCount = (description.match(/https?:\/\/\S+/g) || []).length;
  const chapters = extractDescriptionChapters(description);
  const hasZeroStartChapter = chapters.some((c) => c.seconds === 0);

  const packaging = buildPackagingAudit({
    title,
    tags,
    tagCharsUsed,
    descriptionLength: description.length,
    chapters,
    hasZeroStartChapter,
    engagementRatePct,
  });

  const revenueBand =
    views !== null && views > 0
      ? {
          globalMin: Math.round((views / 1000) * 1.5),
          globalMax: Math.round((views / 1000) * 4.0),
          tier1Min: Math.round((views / 1000) * 5.0),
          tier1Max: Math.round((views / 1000) * 12.0),
        }
      : null;

  // Mine Comment Questions & Pain Points
  let commentsStatus: "ok" | "disabled" | "api-unavailable" = "api-unavailable";
  let scannedCount = 0;
  let mined: {
    questions: MinedViewerQuestion[];
    topThemes: Array<{ topic: string; count: number }>;
  } = { questions: [], topThemes: [] };

  if (commentsApiRes?.ok) {
    commentsStatus = "ok";
    const rawItems = (commentsApiRes.data.items || [])
      .map((entry) => {
        const s = entry.snippet?.topLevelComment?.snippet;
        return {
          text: s?.textOriginal || s?.textDisplay || "",
          author: s?.authorDisplayName || "Viewer",
          likes: typeof s?.likeCount === "number" ? s.likeCount : 0,
        };
      })
      .filter((c) => c.text.trim().length > 0);
    scannedCount = rawItems.length;
    mined = mineComments(rawItems);
  } else if (commentsApiRes && !commentsApiRes.ok) {
    const errLower = (commentsApiRes.error || "").toLowerCase();
    if (errLower.includes("disabled") || commentsApiRes.status === 403) {
      commentsStatus = commentsApiRes.quotaExhausted ? "api-unavailable" : "disabled";
    }
  }

  const payload: VideoXRayResponse = {
    success: true,
    videoId,
    source,
    video: {
      title,
      channelTitle,
      channelId,
      publishedAt,
      daysSincePublished,
      durationSeconds,
      durationFormatted: durationSeconds > 0 ? formatTimestamp(durationSeconds) : "N/A",
      views,
      likes,
      commentsCount,
      viewsPerDay,
      likeRatePct,
      engagementRatePct,
      tags,
      tagCharsUsed,
      descriptionLength: description.length,
      descriptionLinkCount,
      chapters,
      hasZeroStartChapter,
    },
    packaging,
    revenueBand,
    comments: {
      status: commentsStatus,
      scannedCount,
      questions: mined.questions,
      topThemes: mined.topThemes,
    },
  };

  return NextResponse.json(payload, {
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}

export async function GET(req: NextRequest) {
  const originCheck = verifyOrigin(req);
  if (!originCheck.allowed) return originCheck.response;

  const { searchParams } = new URL(req.url);
  const raw =
    searchParams.get("v") ||
    searchParams.get("videoId") ||
    searchParams.get("url") ||
    "";

  if (!raw.trim()) {
    return NextResponse.json(
      { success: false, error: "Provide a YouTube URL or video ID (?v=...)." },
      { status: 400 },
    );
  }

  return handleVideoXRay(raw.trim(), req);
}

export async function POST(req: NextRequest) {
  const originCheck = verifyOrigin(req);
  if (!originCheck.allowed) return originCheck.response;

  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json(
      { success: false, error: "Invalid JSON body." },
      { status: 400 },
    );
  }

  const obj = body as Record<string, unknown>;
  const raw =
    (typeof obj.videoId === "string" && obj.videoId) ||
    (typeof obj.url === "string" && obj.url) ||
    (typeof obj.v === "string" && obj.v) ||
    "";

  if (!raw.trim()) {
    return NextResponse.json(
      { success: false, error: "Please provide a valid YouTube URL or 11-character video ID." },
      { status: 400 },
    );
  }

  return handleVideoXRay(raw.trim(), req);
}
