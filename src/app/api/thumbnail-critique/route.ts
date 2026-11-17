import { NextResponse } from "next/server";
import {
  AIConfigurationError,
  generateAIVisionAnalysis,
  prompts,
} from "@/lib/ai";
import {
  checkAIGlobalRateLimit,
  checkAIToolDailyLimit,
} from "@/lib/ai-rate-limit";
import { checkAiIpRateLimit, createRateLimitJsonResponse } from "@/lib/rateLimit";
import { verifyOrigin } from "@/lib/verifyOrigin";
import { extractVideoId, safeJSONParse } from "@/lib/utils";

const MAX_BODY_BYTES = 1_800_000;
const MAX_DATA_URL_CHARS = 1_400_000;
const DATA_URL_REGEX = /^data:image\/(png|jpeg|jpg|webp);base64,[A-Za-z0-9+/=]+$/i;

export interface ThumbnailCritiqueResult {
  overallScore: number;
  mobileReadability: number;
  detectedTextWords: number;
  redundancyAlert: boolean;
  redundancyExplanation: string;
  whatWorks: string[];
  highImpactFixes: string[];
}

async function fetchYouTubeThumbnailAsDataUrl(videoId: string): Promise<string | null> {
  const candidates = [
    `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
    `https://img.youtube.com/vi/${videoId}/sddefault.jpg`,
    `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
  ];

  for (const url of candidates) {
    try {
      const resp = await fetch(url, {
        redirect: "error",
        signal: AbortSignal.timeout(8_000),
      });
      if (!resp.ok) continue;
      const contentType = (resp.headers.get("content-type") || "").toLowerCase();
      if (!contentType.startsWith("image/")) continue;
      const buf = await resp.arrayBuffer();
      if (buf.byteLength < 1_000 || buf.byteLength > 1_200_000) continue;
      const mime = contentType.split(";")[0].trim() || "image/jpeg";
      const base64 = Buffer.from(buf).toString("base64");
      return `data:${mime};base64,${base64}`;
    } catch {
      // Try lower resolution fallback
    }
  }

  return null;
}

function clampScore(value: unknown, fallback = 70): number {
  const n = Number(value);
  if (!Number.isFinite(n)) return fallback;
  return Math.max(0, Math.min(100, Math.round(n)));
}

function normalizeStringList(value: unknown, fallback: string[]): string[] {
  if (!Array.isArray(value)) return fallback;
  const cleaned = value
    .filter((entry): entry is string => typeof entry === "string" && entry.trim().length > 0)
    .map((entry) => entry.trim())
    .slice(0, 4);
  return cleaned.length > 0 ? cleaned : fallback;
}

function parseCritiqueResponse(raw: string): ThumbnailCritiqueResult {
  const objMatch = raw.match(/\{[\s\S]*\}/);
  const candidate = objMatch ? objMatch[0] : raw;
  const parsed = safeJSONParse<Record<string, unknown>>(candidate, {});

  const detectedWordsRaw = Number(parsed.detectedTextWords);
  const detectedTextWords = Number.isFinite(detectedWordsRaw)
    ? Math.max(0, Math.min(50, Math.round(detectedWordsRaw)))
    : 0;

  return {
    overallScore: clampScore(parsed.overallScore, 72),
    mobileReadability: clampScore(parsed.mobileReadability, 70),
    detectedTextWords,
    redundancyAlert: Boolean(parsed.redundancyAlert),
    redundancyExplanation:
      typeof parsed.redundancyExplanation === "string" && parsed.redundancyExplanation.trim()
        ? parsed.redundancyExplanation.trim()
        : "Ensure your thumbnail triggers curiosity or emotion rather than repeating the exact video title words.",
    whatWorks: normalizeStringList(parsed.whatWorks, [
      "Clear visual anchor establishes the topic quickly at desktop scale.",
      "Framing separates primary subject silhouette from secondary elements.",
    ]).slice(0, 3),
    highImpactFixes: normalizeStringList(parsed.highImpactFixes, [
      "Keep on-thumbnail text strictly to 2–4 large bold words for 168px mobile legibility.",
      "Boost foreground-to-background contrast around the main focal point.",
      "Avoid placing text or key facial details inside the bottom-right duration badge corner.",
    ]).slice(0, 3),
  };
}

export async function POST(request: Request) {
  try {
    const originCheck = verifyOrigin(request);
    if (!originCheck.allowed) {
      return originCheck.response;
    }

    const ipRate = checkAiIpRateLimit(request.headers, "ai-thumbnail-critique");
    if (!ipRate.allowed) {
      return createRateLimitJsonResponse(ipRate);
    }

    const rawBody = await request.text();
    if (rawBody.length > MAX_BODY_BYTES) {
      return NextResponse.json(
        { error: "Image payload too large. Resize image to max 1024px wide and retry." },
        { status: 413 },
      );
    }

    const globalLimit = await checkAIGlobalRateLimit(request.headers);
    if (!globalLimit.allowed) {
      return globalLimit.response;
    }

    let body: {
      imageDataUrl?: unknown;
      videoUrl?: unknown;
      videoTitle?: unknown;
    };
    try {
      body = JSON.parse(rawBody);
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const videoTitle =
      typeof body.videoTitle === "string" ? body.videoTitle.trim().slice(0, 200) : "";

    let imageDataUrl =
      typeof body.imageDataUrl === "string" ? body.imageDataUrl.trim() : "";

    if (imageDataUrl) {
      if (imageDataUrl.length > MAX_DATA_URL_CHARS || !DATA_URL_REGEX.test(imageDataUrl)) {
        return NextResponse.json(
          { error: "Unsupported or oversized image format. Use PNG, JPG, or WebP." },
          { status: 400 },
        );
      }
    } else if (typeof body.videoUrl === "string" && body.videoUrl.trim()) {
      const videoId = extractVideoId(body.videoUrl.trim());
      if (!videoId) {
        return NextResponse.json(
          { error: "Invalid YouTube video URL or 11-character video ID." },
          { status: 400 },
        );
      }
      const fetchedDataUrl = await fetchYouTubeThumbnailAsDataUrl(videoId);
      if (!fetchedDataUrl) {
        return NextResponse.json(
          { error: "Could not load thumbnail for that YouTube video URL." },
          { status: 404 },
        );
      }
      imageDataUrl = fetchedDataUrl;
    } else {
      return NextResponse.json(
        { error: "Upload a thumbnail image or provide a YouTube video URL." },
        { status: 400 },
      );
    }

    const perToolLimit = checkAIToolDailyLimit(
      globalLimit.context,
      "thumbnail-critique",
    );
    if (!perToolLimit.allowed) {
      return perToolLimit.response;
    }

    const rawAiText = await generateAIVisionAnalysis(
      prompts.thumbnailCritique(videoTitle),
      imageDataUrl,
      { temperature: 0.4, maxTokens: 1200 },
    );

    const critique = parseCritiqueResponse(rawAiText);

    return NextResponse.json(
      { critique },
      {
        headers: {
          "Cache-Control": "private, no-store",
        },
      },
    );
  } catch (error) {
    console.error("Thumbnail critique error:", error);
    if (error instanceof AIConfigurationError) {
      return NextResponse.json(
        { error: "AI vision critique is temporarily unavailable." },
        { status: 503 },
      );
    }
    return NextResponse.json(
      { error: "Failed to critique thumbnail. Please try again." },
      { status: 500 },
    );
  }
}
