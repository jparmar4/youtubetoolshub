import { NextRequest, NextResponse } from "next/server";
import { verifyOrigin } from "@/lib/verifyOrigin";
import { enforceRateLimit, getRequestIp } from "@/lib/rate-limit";
import { extractVideoId, parseDuration, safeJSONParse } from "@/lib/utils";
import { generateAIText } from "@/lib/ai";
import {
  VIDEO_METADATA_REVALIDATE_SECONDS,
  fetchVideoMetadataWithFallback,
  fetchYouTubeApiWithRotation,
  getConfiguredYouTubeApiKeys,
} from "@/lib/youtubeApiClient";

export interface TranscriptLineItem {
  start: string;
  seconds: number;
  text: string;
}

function formatTimestamp(totalSeconds: number): string {
  const clean = Math.max(0, Math.floor(totalSeconds));
  const h = Math.floor(clean / 3600);
  const m = Math.floor((clean % 3600) / 60);
  const s = clean % 60;
  if (h > 0) {
    return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  }
  return `${m}:${String(s).padStart(2, "0")}`;
}

function decodeHtmlEntities(input: string): string {
  return input
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, num) => String.fromCharCode(Number(num)))
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function parseTimedtextJson3(jsonText: string): TranscriptLineItem[] {
  const parsed = safeJSONParse<{
    events?: Array<{
      tStartMs?: number;
      segs?: Array<{ utf8?: string }>;
    }>;
  }>(jsonText, {});
  if (!Array.isArray(parsed.events)) return [];

  const lines: TranscriptLineItem[] = [];
  for (const ev of parsed.events) {
    if (!Array.isArray(ev.segs)) continue;
    const text = ev.segs
      .map((s) => (typeof s.utf8 === "string" ? s.utf8 : ""))
      .join("")
      .replace(/\s+/g, " ")
      .trim();
    if (!text || text === "\n") continue;
    const seconds = Math.floor((ev.tStartMs || 0) / 1000);
    lines.push({
      start: formatTimestamp(seconds),
      seconds,
      text: decodeHtmlEntities(text),
    });
  }
  return lines;
}

function parseTimedtextXml(xml: string): TranscriptLineItem[] {
  const matches = [
    ...xml.matchAll(/<text\s+[^>]*start="([\d.]+)"[^>]*>([\s\S]*?)<\/text>/gi),
  ];
  return matches
    .map((m) => {
      const seconds = Math.floor(Number.parseFloat(m[1]) || 0);
      const text = decodeHtmlEntities(m[2] || "");
      return {
        start: formatTimestamp(seconds),
        seconds,
        text,
      };
    })
    .filter((l) => l.text.length > 0);
}

function isAllowedTimedtextUrl(rawUrl: string): boolean {
  try {
    const parsed = new URL(rawUrl);
    if (parsed.protocol !== "https:") return false;
    return (
      parsed.hostname === "www.youtube.com" ||
      parsed.hostname === "youtube.com" ||
      parsed.hostname === "video.google.com"
    );
  } catch {
    return false;
  }
}

async function fetchPublicYouTubeCaptions(
  videoId: string,
): Promise<TranscriptLineItem[] | null> {
  try {
    const watchResp = await fetch(
      `https://www.youtube.com/watch?v=${encodeURIComponent(videoId)}`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
          "Accept-Language": "en-US,en;q=0.9",
        },
        signal: AbortSignal.timeout(8_000),
      },
    );
    if (!watchResp.ok) return null;
    const html = await watchResp.text();

    const tracksMatch = html.match(/"captionTracks":(\[[\s\S]*?\])/);
    if (!tracksMatch) return null;

    const tracks = safeJSONParse<
      Array<{ baseUrl?: string; languageCode?: string; kind?: string }>
    >(tracksMatch[1], []);
    if (!Array.isArray(tracks) || tracks.length === 0) return null;

    // Prefer manual English -> auto English -> first available track
    const preferred =
      tracks.find((t) => t.languageCode === "en" && t.kind !== "asr") ||
      tracks.find((t) => t.languageCode?.startsWith("en")) ||
      tracks[0];

    if (!preferred?.baseUrl || !isAllowedTimedtextUrl(preferred.baseUrl)) {
      return null;
    }

    const json3Url = preferred.baseUrl.includes("fmt=")
      ? preferred.baseUrl
      : `${preferred.baseUrl}&fmt=json3`;

    const capResp = await fetch(json3Url, {
      signal: AbortSignal.timeout(8_000),
    });
    if (capResp.ok) {
      const capText = await capResp.text();
      if (capText.trim().startsWith("{")) {
        const jsonLines = parseTimedtextJson3(capText);
        if (jsonLines.length >= 3) return jsonLines;
      } else {
        const xmlLines = parseTimedtextXml(capText);
        if (xmlLines.length >= 3) return xmlLines;
      }
    }

    // Retry raw XML endpoint if json3 failed
    const rawResp = await fetch(preferred.baseUrl, {
      signal: AbortSignal.timeout(8_000),
    });
    if (rawResp.ok) {
      const xml = await rawResp.text();
      const xmlLines = parseTimedtextXml(xml);
      if (xmlLines.length >= 3) return xmlLines;
    }

    return null;
  } catch {
    return null;
  }
}

function parseDescriptionIntoLines(
  description: string,
  videoTitle: string,
  channelTitle: string,
): TranscriptLineItem[] {
  const tsRegex = /(?:^|\s)(\d{1,2}:\d{2}(?::\d{2})?)\s+([^\n]+)/g;
  const parsed: TranscriptLineItem[] = [];
  let match: RegExpExecArray | null;

  while ((match = tsRegex.exec(description)) !== null && parsed.length < 18) {
    const start = match[1];
    const parts = start.split(":").map((n) => Number.parseInt(n, 10) || 0);
    const seconds =
      parts.length === 3
        ? parts[0] * 3600 + parts[1] * 60 + parts[2]
        : parts[0] * 60 + parts[1];
    const cleanText = match[2].replace(/https?:\/\/\S+/g, "").trim();
    if (cleanText.length > 3) {
      parsed.push({ start, seconds, text: cleanText });
    }
  }

  if (parsed.length >= 3) return parsed;

  const sentences = description
    .replace(/https?:\/\/\S+/g, "")
    .split(/[\n.!?]+/)
    .map((s) => s.trim())
    .filter((s) => s.length >= 16)
    .slice(0, 12);

  if (sentences.length >= 2) {
    return sentences.map((text, idx) => {
      const seconds = idx * 20;
      return { start: formatTimestamp(seconds), seconds, text };
    });
  }

  return [
    {
      start: "0:00",
      seconds: 0,
      text: `${videoTitle || "This video"}${channelTitle ? ` by ${channelTitle}` : ""} opens with the core premise of the topic.`,
    },
    {
      start: "0:30",
      seconds: 30,
      text: "Public caption tracks were not directly exposed by YouTube for automated extraction, so review the video chapters and metadata summary.",
    },
  ];
}

async function generateMetadataTranscriptLines(meta: {
  title: string;
  channelTitle: string;
  duration: string;
  description: string;
  tags: string[];
}): Promise<TranscriptLineItem[] | null> {
  try {
    const prompt = `Create a structured 14-line timestamped spoken-style outline and key-moment transcript breakdown specifically for this real YouTube video:
- Title: "${meta.title}"
- Channel: "${meta.channelTitle}"
- Duration: "${meta.duration}"
- Tags: ${meta.tags.slice(0, 12).join(", ") || "N/A"}
- Description excerpt: """${meta.description.slice(0, 900)}"""

Return ONLY a valid JSON array of 14 objects with exact fields:
[
  { "start": "0:00", "seconds": 0, "text": "Concise, realistic spoken segment matching this exact video topic..." }
]
Rules:
- Keep lines strictly grounded in the provided title, description, tags, and channel topic.
- Space timestamps realistically across the video's duration.
- No markdown fences.`;

    const raw = await generateAIText(prompt, {
      temperature: 0.4,
      maxTokens: 1600,
    });
    const arrMatch = raw.match(/\[[\s\S]*\]/);
    const candidate = arrMatch ? arrMatch[0] : raw;
    const parsed = safeJSONParse<unknown[]>(candidate, []);
    if (!Array.isArray(parsed) || parsed.length === 0) return null;

    const cleanLines: TranscriptLineItem[] = parsed
      .map((entry, idx) => {
        const obj =
          typeof entry === "object" && entry !== null
            ? (entry as Record<string, unknown>)
            : {};
        const secondsRaw = Number(obj.seconds);
        const seconds = Number.isFinite(secondsRaw) ? Math.max(0, Math.round(secondsRaw)) : idx * 30;
        const start =
          typeof obj.start === "string" && /^\d{1,2}:\d{2}(:\d{2})?$/.test(obj.start.trim())
            ? obj.start.trim()
            : formatTimestamp(seconds);
        const text = typeof obj.text === "string" ? obj.text.trim() : "";
        return { start, seconds, text };
      })
      .filter((item) => item.text.length > 0)
      .slice(0, 16);

    return cleanLines.length >= 3 ? cleanLines : null;
  } catch {
    return null;
  }
}

async function handleTranscriptRequest(rawVideoIdOrUrl: string, req: NextRequest) {
  const videoId = extractVideoId(rawVideoIdOrUrl);
  if (!videoId) {
    return NextResponse.json(
      { success: false, error: "Invalid YouTube URL or 11-character video ID." },
      { status: 400 },
    );
  }

  const ip = getRequestIp(req.headers);
  const rl = enforceRateLimit(`transcript:${ip}`, 30, 60 * 60 * 1000);
  if (!rl.allowed) {
    return NextResponse.json(
      { success: false, error: "Too many requests. Please try again later." },
      { status: 429, headers: { "Retry-After": String(rl.retryAfterSeconds) } },
    );
  }

  // 1. Fetch authentic video metadata (YouTube Data API v3 + oEmbed fallback)
  let title = `YouTube Video (${videoId})`;
  let channelTitle = "YouTube Creator";
  let durationFormatted = "10:00";
  let description = "";
  let tags: string[] = [];

  if (getConfiguredYouTubeApiKeys().length > 0) {
    const apiRes = await fetchYouTubeApiWithRotation<{
      items?: Array<{
        snippet?: {
          title?: string;
          channelTitle?: string;
          description?: string;
          tags?: string[];
        };
        contentDetails?: {
          duration?: string;
        };
      }>;
    }>(`videos?part=snippet,contentDetails&id=${encodeURIComponent(videoId)}`, {
      revalidate: VIDEO_METADATA_REVALIDATE_SECONDS,
    });

    if (apiRes.ok && apiRes.data.items && apiRes.data.items.length > 0) {
      const item = apiRes.data.items[0];
      title = item.snippet?.title || title;
      channelTitle = item.snippet?.channelTitle || channelTitle;
      description = item.snippet?.description || "";
      tags = Array.isArray(item.snippet?.tags) ? item.snippet.tags : [];
      const durSec = parseDuration(item.contentDetails?.duration || "");
      if (durSec > 0) durationFormatted = formatTimestamp(durSec);
    }
  }

  if (!description && title === `YouTube Video (${videoId})`) {
    const fallbackMeta = await fetchVideoMetadataWithFallback(videoId);
    if (fallbackMeta) {
      if (fallbackMeta.title) title = fallbackMeta.title;
      if (fallbackMeta.channelTitle) channelTitle = fallbackMeta.channelTitle;
      if (fallbackMeta.description) description = fallbackMeta.description;
      if (fallbackMeta.tags.length > 0) tags = fallbackMeta.tags;
    }
  }

  // 2. Try live YouTube timedtext captions
  const liveCaptions = await fetchPublicYouTubeCaptions(videoId);
  if (liveCaptions && liveCaptions.length > 0) {
    const totalSec = liveCaptions[liveCaptions.length - 1]?.seconds || 0;
    if (durationFormatted === "10:00" && totalSec > 0) {
      durationFormatted = formatTimestamp(totalSec);
    }
    return NextResponse.json({
      success: true,
      videoId,
      title,
      channel: channelTitle,
      duration: durationFormatted,
      source: "youtube-captions",
      lines: liveCaptions,
    });
  }

  // 3. Generate timestamped spoken breakdown grounded in the video's real metadata
  const aiLines = await generateMetadataTranscriptLines({
    title,
    channelTitle,
    duration: durationFormatted,
    description,
    tags,
  });
  if (aiLines && aiLines.length > 0) {
    return NextResponse.json({
      success: true,
      videoId,
      title,
      channel: channelTitle,
      duration: durationFormatted,
      source: "ai-metadata",
      lines: aiLines,
    });
  }

  // 4. Clean description-based fallback
  const descLines = parseDescriptionIntoLines(description, title, channelTitle);
  return NextResponse.json({
    success: true,
    videoId,
    title,
    channel: channelTitle,
    duration: durationFormatted,
    source: "description-fallback",
    lines: descLines,
  });
}

export async function GET(req: NextRequest) {
  const originCheck = verifyOrigin(req);
  if (!originCheck.allowed) return originCheck.response;

  const { searchParams } = new URL(req.url);
  const raw =
    searchParams.get("videoId") ||
    searchParams.get("url") ||
    searchParams.get("v") ||
    "";

  if (!raw.trim()) {
    return NextResponse.json(
      { success: false, error: "Provide a YouTube URL or videoId query parameter." },
      { status: 400 },
    );
  }

  return handleTranscriptRequest(raw.trim(), req);
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
    (typeof obj.videoUrl === "string" && obj.videoUrl) ||
    "";

  if (!raw.trim()) {
    return NextResponse.json(
      { success: false, error: "Please provide a valid YouTube URL or 11-character video ID." },
      { status: 400 },
    );
  }

  return handleTranscriptRequest(raw.trim(), req);
}
