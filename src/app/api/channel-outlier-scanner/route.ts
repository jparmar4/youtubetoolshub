import { NextResponse } from "next/server";
import { enforceRateLimit, getRequestIp } from "@/lib/rate-limit";
import { verifyOrigin } from "@/lib/verifyOrigin";
import { extractVideoId, parseDuration } from "@/lib/utils";
import {
  CHANNEL_STATS_REVALIDATE_SECONDS,
  executeWithYouTubeKeyRotation,
  getConfiguredYouTubeApiKeys,
  isQuotaExceededError,
} from "@/lib/youtubeApiClient";

export interface ScannedChannelVideo {
  id: string;
  title: string;
  publishedAt: string;
  thumbnail: string;
  views: number;
  likes: number;
  comments: number;
  durationSeconds: number | null;
  durationFormatted: string;
  isShort: boolean;
  url: string;
}

export interface ChannelScanResult {
  channel: {
    id: string;
    title: string;
    handle: string;
    avatar: string;
    subscribers: number | null;
    totalViews: number | null;
    totalVideos: number | null;
    uploadsPlaylistId: string;
  };
  videos: ScannedChannelVideo[];
  dataSource: "youtube-api" | "rss-fallback";
  quotaUnitsEstimated: number;
  note?: string;
}

function decodeXmlEntities(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#(\d+);/g, (_, num) => {
      const code = Number(num);
      return Number.isFinite(code) ? String.fromCodePoint(code) : "";
    });
}

function formatDurationClock(totalSeconds: number | null): string {
  if (totalSeconds === null || totalSeconds <= 0) return "RSS";
  const hrs = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  return hrs > 0 ? `${hrs}:${pad(mins)}:${pad(secs)}` : `${mins}:${pad(secs)}`;
}

type ChannelTarget =
  | { kind: "id"; value: string }
  | { kind: "handle"; value: string }
  | { kind: "video"; value: string }
  | { kind: "legacy-path"; path: string; fallbackHandle: string };

function parseChannelInput(raw: string): ChannelTarget | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;

  if (/^UC[A-Za-z0-9_-]{20,30}$/.test(trimmed)) {
    return { kind: "id", value: trimmed };
  }

  if (/^@[A-Za-z0-9_.-]{1,64}$/.test(trimmed)) {
    return { kind: "handle", value: trimmed };
  }

  const videoId = extractVideoId(trimmed);
  if (videoId && (trimmed.includes("watch") || trimmed.includes("youtu.be") || trimmed.includes("/shorts/"))) {
    return { kind: "video", value: videoId };
  }

  if (trimmed.includes("youtube.com")) {
    try {
      const withProto = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
      const u = new URL(withProto);
      const host = u.hostname.replace(/^www\./i, "").toLowerCase();
      if (host !== "youtube.com" && host !== "m.youtube.com") {
        return null;
      }
      const segments = u.pathname.split("/").filter(Boolean);
      if (segments[0]?.startsWith("@")) {
        return { kind: "handle", value: segments[0] };
      }
      if (segments[0] === "channel" && segments[1] && /^UC[A-Za-z0-9_-]{20,30}$/.test(segments[1])) {
        return { kind: "id", value: segments[1] };
      }
      if ((segments[0] === "c" || segments[0] === "user") && segments[1]) {
        return {
          kind: "legacy-path",
          path: `/${segments[0]}/${segments[1]}`,
          fallbackHandle: `@${segments[1]}`,
        };
      }
      if (segments[0] && /^[A-Za-z0-9_.-]{2,64}$/.test(segments[0])) {
        return {
          kind: "legacy-path",
          path: `/${segments[0]}`,
          fallbackHandle: `@${segments[0]}`,
        };
      }
    } catch {
      return null;
    }
  }

  // Treat bare single token without spaces as handle lookup
  if (/^[A-Za-z0-9_.-]{2,64}$/.test(trimmed)) {
    return { kind: "handle", value: `@${trimmed}` };
  }

  return null;
}

async function resolveChannelViaPublicHtml(target: ChannelTarget): Promise<{
  id: string;
  title: string;
  handle: string;
  avatar: string;
} | null> {
  if (target.kind === "id") {
    return { id: target.value, title: "", handle: "", avatar: "" };
  }

  let fetchUrl = "";
  if (target.kind === "handle") {
    fetchUrl = `https://www.youtube.com/${encodeURIComponent(target.value)}`;
  } else if (target.kind === "video") {
    fetchUrl = `https://www.youtube.com/watch?v=${encodeURIComponent(target.value)}`;
  } else {
    fetchUrl = `https://www.youtube.com${target.path}`;
  }

  const resp = await fetch(fetchUrl, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
      "Accept-Language": "en-US,en;q=0.9",
    },
    redirect: "follow",
    signal: AbortSignal.timeout(8_000),
  });

  if (!resp.ok) return null;
  const html = await resp.text();

  const channelIdMatch =
    html.match(/"channelId"\s*:\s*"(UC[A-Za-z0-9_-]{20,30})"/) ||
    html.match(/<meta\s+itemprop="identifier"\s+content="(UC[A-Za-z0-9_-]{20,30})"/i) ||
    html.match(/<link\s+rel="canonical"\s+href="https:\/\/www\.youtube\.com\/channel\/(UC[A-Za-z0-9_-]{20,30})"/i) ||
    html.match(/"externalId"\s*:\s*"(UC[A-Za-z0-9_-]{20,30})"/) ||
    html.match(/"browseId"\s*:\s*"(UC[A-Za-z0-9_-]{20,30})"/);

  const id = channelIdMatch?.[1];
  if (!id) return null;

  const titleMatch = html.match(/<meta\s+property="og:title"\s+content="([^"]+)"/i);
  const imageMatch = html.match(/<meta\s+property="og:image"\s+content="([^"]+)"/i);
  const handleMatch = html.match(/https:\/\/www\.youtube\.com\/(@[A-Za-z0-9_.-]+)/);

  return {
    id,
    title: titleMatch?.[1] ? decodeXmlEntities(titleMatch[1]) : "",
    handle:
      target.kind === "handle"
        ? target.value
        : handleMatch?.[1] || "",
    avatar: imageMatch?.[1] || "",
  };
}

async function fetchXmlFallback(
  channelInfo: { id: string; title: string; handle: string; avatar: string },
  note: string,
): Promise<ChannelScanResult> {
  const feedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${encodeURIComponent(channelInfo.id)}`;
  const feedResp = await fetch(feedUrl, {
    headers: { Accept: "application/xml, text/xml" },
    signal: AbortSignal.timeout(8_000),
  });

  if (!feedResp.ok) {
    throw new Error(`Public YouTube RSS feed unavailable (${feedResp.status})`);
  }

  const xml = await feedResp.text();
  const feedTitleMatch = xml.match(/<feed[\s\S]*?<title>([\s\S]*?)<\/title>/i);
  const channelTitle =
    channelInfo.title ||
    (feedTitleMatch?.[1] ? decodeXmlEntities(feedTitleMatch[1].trim()) : channelInfo.id);

  const entries = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/gi)];
  const videos: ScannedChannelVideo[] = [];

  for (const match of entries) {
    const entryXml = match[1];
    const videoId = entryXml.match(/<yt:videoId>([^<]+)<\/yt:videoId>/i)?.[1]?.trim();
    if (!videoId) continue;

    const rawTitle = entryXml.match(/<title>([\s\S]*?)<\/title>/i)?.[1] || "";
    const title = decodeXmlEntities(rawTitle.trim()) || "Untitled Video";
    const publishedAt =
      entryXml.match(/<published>([^<]+)<\/published>/i)?.[1]?.trim() || "";
    const linkHref =
      entryXml.match(/<link[^>]+href="([^"]+)"/i)?.[1]?.trim() ||
      `https://www.youtube.com/watch?v=${videoId}`;
    const thumbnail =
      entryXml.match(/<media:thumbnail[^>]+url="([^"]+)"/i)?.[1]?.trim() ||
      `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
    const viewsRaw =
      entryXml.match(/<media:statistics[^>]+views="(\d+)"/i)?.[1] || "0";
    const views = Number.parseInt(viewsRaw, 10) || 0;

    const isShort =
      linkHref.includes("/shorts/") || /#shorts?\b/i.test(title);

    videos.push({
      id: videoId,
      title,
      publishedAt,
      thumbnail,
      views,
      likes: 0,
      comments: 0,
      durationSeconds: null,
      durationFormatted: isShort ? "Short" : "Video",
      isShort,
      url: linkHref,
    });
  }

  const uploadsPlaylistId = channelInfo.id.startsWith("UC")
    ? `UU${channelInfo.id.slice(2)}`
    : channelInfo.id;

  return {
    channel: {
      id: channelInfo.id,
      title: channelTitle,
      handle: channelInfo.handle || channelInfo.id,
      avatar: channelInfo.avatar,
      subscribers: null,
      totalViews: null,
      totalVideos: videos.length,
      uploadsPlaylistId,
    },
    videos,
    dataSource: "rss-fallback",
    quotaUnitsEstimated: 0,
    note,
  };
}

async function fetchViaYouTubeDataApi(
  target: ChannelTarget,
  apiKey: string,
): Promise<ChannelScanResult> {
  let quotaUnits = 0;
  const channelPart = "snippet,statistics,contentDetails";
  let channelUrl = "";

  if (target.kind === "id") {
    channelUrl = `https://www.googleapis.com/youtube/v3/channels?part=${channelPart}&id=${encodeURIComponent(target.value)}&key=${apiKey}`;
  } else if (target.kind === "handle") {
    channelUrl = `https://www.googleapis.com/youtube/v3/channels?part=${channelPart}&forHandle=${encodeURIComponent(target.value)}&key=${apiKey}`;
  } else if (target.kind === "video") {
    quotaUnits += 1;
    const videoRes = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${encodeURIComponent(target.value)}&key=${apiKey}`,
      { signal: AbortSignal.timeout(8_000) },
    );
    const videoJson = await videoRes.json();
    const channelId = videoJson?.items?.[0]?.snippet?.channelId;
    if (!videoRes.ok || videoJson?.error || !channelId) {
      throw new Error(videoJson?.error?.message || "Video lookup failed");
    }
    channelUrl = `https://www.googleapis.com/youtube/v3/channels?part=${channelPart}&id=${encodeURIComponent(channelId)}&key=${apiKey}`;
  } else {
    // Try quota-cheap forHandle (1 unit) before falling back
    channelUrl = `https://www.googleapis.com/youtube/v3/channels?part=${channelPart}&forHandle=${encodeURIComponent(target.fallbackHandle)}&key=${apiKey}`;
  }

  quotaUnits += 1;
  const chResp = await fetch(channelUrl, {
    next: { revalidate: CHANNEL_STATS_REVALIDATE_SECONDS },
    signal: AbortSignal.timeout(8_000),
  });
  const chJson = await chResp.json();
  if (!chResp.ok || chJson?.error) {
    const errMsg = chJson?.error?.message || `YouTube channels error (${chResp.status})`;
    if (isQuotaExceededError(chResp.status, chJson)) {
      throw new Error(`quotaExceeded: ${errMsg}`);
    }
    throw new Error(errMsg);
  }

  let chItem = chJson?.items?.[0];
  if (!chItem && target.kind === "legacy-path") {
    const resolved = await resolveChannelViaPublicHtml(target);
    if (resolved?.id) {
      quotaUnits += 1;
      const retryResp = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?part=${channelPart}&id=${encodeURIComponent(resolved.id)}&key=${apiKey}`,
        {
          next: { revalidate: CHANNEL_STATS_REVALIDATE_SECONDS },
          signal: AbortSignal.timeout(8_000),
        },
      );
      const retryJson = await retryResp.json();
      if (!retryResp.ok || retryJson?.error) {
        const errMsg = retryJson?.error?.message || "Channel details lookup failed";
        if (isQuotaExceededError(retryResp.status, retryJson)) {
          throw new Error(`quotaExceeded: ${errMsg}`);
        }
        throw new Error(errMsg);
      }
      chItem = retryJson?.items?.[0];
    }
  }

  if (!chItem) {
    throw new Error("NOT_FOUND");
  }

  const channelId: string = chItem.id;
  // Convert UC -> UU directly when uploads playlist ID is absent (saves search quota)
  const uploadsPlaylistId: string =
    chItem.contentDetails?.relatedPlaylists?.uploads ||
    (channelId.startsWith("UC") ? `UU${channelId.slice(2)}` : channelId);

  quotaUnits += 1;
  const plResp = await fetch(
    `https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&playlistId=${encodeURIComponent(uploadsPlaylistId)}&maxResults=50&key=${apiKey}`,
    {
      next: { revalidate: CHANNEL_STATS_REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(8_000),
    },
  );
  const plJson = await plResp.json();
  if (!plResp.ok || plJson?.error) {
    const errMsg = plJson?.error?.message || `YouTube playlist error (${plResp.status})`;
    if (isQuotaExceededError(plResp.status, plJson)) {
      throw new Error(`quotaExceeded: ${errMsg}`);
    }
    throw new Error(errMsg);
  }

  const videoIds: string[] = (plJson?.items || [])
    .map((item: { contentDetails?: { videoId?: string } }) => item?.contentDetails?.videoId)
    .filter((id: unknown): id is string => typeof id === "string" && id.length > 0)
    .slice(0, 50);

  let videos: ScannedChannelVideo[] = [];
  if (videoIds.length > 0) {
    quotaUnits += 1;
    const statsResp = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${encodeURIComponent(videoIds.join(","))}&key=${apiKey}`,
      {
        next: { revalidate: CHANNEL_STATS_REVALIDATE_SECONDS },
        signal: AbortSignal.timeout(8_000),
      },
    );
    const statsJson = await statsResp.json();
    if (!statsResp.ok || statsJson?.error) {
      const errMsg = statsJson?.error?.message || `YouTube videos error (${statsResp.status})`;
      if (isQuotaExceededError(statsResp.status, statsJson)) {
        throw new Error(`quotaExceeded: ${errMsg}`);
      }
      throw new Error(errMsg);
    }

    videos = (statsJson?.items || []).map(
      (item: {
        id: string;
        snippet?: {
          title?: string;
          publishedAt?: string;
          thumbnails?: { high?: { url?: string }; medium?: { url?: string }; default?: { url?: string } };
        };
        statistics?: { viewCount?: string; likeCount?: string; commentCount?: string };
        contentDetails?: { duration?: string };
      }) => {
        const title = item.snippet?.title || "Untitled Video";
        const durationSec = item.contentDetails?.duration
          ? parseDuration(item.contentDetails.duration)
          : null;
        const isShort =
          (durationSec !== null && durationSec > 0 && durationSec <= 60) ||
          /#shorts?\b/i.test(title);
        const thumbnail =
          item.snippet?.thumbnails?.high?.url ||
          item.snippet?.thumbnails?.medium?.url ||
          item.snippet?.thumbnails?.default?.url ||
          `https://i.ytimg.com/vi/${item.id}/hqdefault.jpg`;

        return {
          id: item.id,
          title,
          publishedAt: item.snippet?.publishedAt || "",
          thumbnail,
          views: Number.parseInt(item.statistics?.viewCount || "0", 10) || 0,
          likes: Number.parseInt(item.statistics?.likeCount || "0", 10) || 0,
          comments: Number.parseInt(item.statistics?.commentCount || "0", 10) || 0,
          durationSeconds: durationSec,
          durationFormatted: formatDurationClock(durationSec),
          isShort,
          url: `https://www.youtube.com/watch?v=${item.id}`,
        };
      },
    );
  }

  return {
    channel: {
      id: channelId,
      title: chItem.snippet?.title || channelId,
      handle: chItem.snippet?.customUrl || (target.kind === "handle" ? target.value : channelId),
      avatar:
        chItem.snippet?.thumbnails?.high?.url ||
        chItem.snippet?.thumbnails?.medium?.url ||
        chItem.snippet?.thumbnails?.default?.url ||
        "",
      subscribers: chItem.statistics?.subscriberCount
        ? Number.parseInt(chItem.statistics.subscriberCount, 10)
        : null,
      totalViews: chItem.statistics?.viewCount
        ? Number.parseInt(chItem.statistics.viewCount, 10)
        : null,
      totalVideos: chItem.statistics?.videoCount
        ? Number.parseInt(chItem.statistics.videoCount, 10)
        : videos.length,
      uploadsPlaylistId,
    },
    videos,
    dataSource: "youtube-api",
    quotaUnitsEstimated: quotaUnits,
  };
}

async function handleScan(rawQuery: unknown, headers: Headers) {
  const ip = getRequestIp(headers);
  const rl = enforceRateLimit(`channel-outlier:${ip}`, 30, 60 * 60 * 1000);
  if (!rl.allowed) {
    return NextResponse.json(
      { error: "Too many scan requests. Please try again shortly." },
      { status: 429, headers: { "Retry-After": String(rl.retryAfterSeconds) } },
    );
  }

  const query = typeof rawQuery === "string" ? rawQuery.trim() : "";
  if (!query) {
    return NextResponse.json(
      { error: "Enter a YouTube @handle or channel URL to scan." },
      { status: 400 },
    );
  }

  const target = parseChannelInput(query);
  if (!target) {
    return NextResponse.json(
      { error: "Invalid channel @handle or YouTube URL format." },
      { status: 400 },
    );
  }

  const configuredKeys = getConfiguredYouTubeApiKeys();
  if (configuredKeys.length > 0) {
    try {
      const apiResult = await executeWithYouTubeKeyRotation((rotatedKey) =>
        fetchViaYouTubeDataApi(target, rotatedKey),
      );
      return NextResponse.json(apiResult, {
        headers: {
          "Cache-Control": "s-maxage=1800, stale-while-revalidate=3600",
        },
      });
    } catch (apiErr) {
      if (apiErr instanceof Error && apiErr.message === "NOT_FOUND") {
        return NextResponse.json(
          { error: "No public YouTube channel found matching that @handle or URL." },
          { status: 404 },
        );
      }
      console.warn(
        "[ChannelOutlierScanner] Data API keys failed or quota exceeded, falling back to public XML feed:",
        apiErr instanceof Error ? apiErr.message : apiErr,
      );
    }
  }

  // Fallback: resolve UC... channel ID from public YouTube page + read public Atom RSS feed
  try {
    const resolvedChannel = await resolveChannelViaPublicHtml(target);
    if (!resolvedChannel) {
      return NextResponse.json(
        { error: "Could not resolve a public YouTube channel from that handle or URL." },
        { status: 404 },
      );
    }

    const fallbackNote = configuredKeys.length > 0
      ? "YouTube Data API quota limit or transient error encountered — showing latest 15 uploads from public RSS XML feed."
      : "Public RSS XML fallback active (YouTube Data API keys not configured) — showing latest 15 uploads and live public view counts.";

    const rssResult = await fetchXmlFallback(resolvedChannel, fallbackNote);
    return NextResponse.json(rssResult, {
      headers: {
        "Cache-Control": "s-maxage=1800, stale-while-revalidate=3600",
      },
    });
  } catch (fallbackErr) {
    console.error("[ChannelOutlierScanner] XML fallback failed:", fallbackErr);
    return NextResponse.json(
      { error: "Could not load channel uploads right now. Verify the @handle and try again." },
      { status: 502 },
    );
  }
}

export async function GET(req: Request) {
  const originCheck = verifyOrigin(req);
  if (!originCheck.allowed) {
    return originCheck.response;
  }

  const { searchParams } = new URL(req.url);
  const rawQuery = searchParams.get("handle") ?? searchParams.get("query") ?? searchParams.get("url");
  return handleScan(rawQuery, req.headers);
}

export async function POST(req: Request) {
  const originCheck = verifyOrigin(req);
  if (!originCheck.allowed) {
    return originCheck.response;
  }

  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
  const obj = body as Record<string, unknown>;
  return handleScan(obj.handle ?? obj.query ?? obj.url, req.headers);
}
