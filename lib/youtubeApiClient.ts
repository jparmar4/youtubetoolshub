/**
 * Shared YouTube Data API v3 Quota Shield, Caching & Multi-Key Rotation Client.
 *
 * - Reads comma-separated keys from `YOUTUBE_API_KEYS` (and falls back to `YOUTUBE_API_KEY`).
 * - Automatically rotates to the next configured key on HTTP 403 `quotaExceeded` / rate errors.
 * - Uses Next.js server cache (`revalidate: 86400` for video metadata, `21600` for channel stats).
 * - Falls back gracefully to public oEmbed / RSS XML data when keys are missing or exhausted.
 */

export const VIDEO_METADATA_REVALIDATE_SECONDS = 86_400; // 24 hours
export const CHANNEL_STATS_REVALIDATE_SECONDS = 21_600; // 6 hours

const QUOTA_COOLDOWN_MS = 60 * 60 * 1000; // 1 hour cooldown per exhausted key
const exhaustedUntilByKey = new Map<string, number>();

export function getConfiguredYouTubeApiKeys(): string[] {
  const rawList = [
    process.env.YOUTUBE_API_KEYS || "",
    process.env.YOUTUBE_API_KEY || "",
  ]
    .join(",")
    .split(",")
    .map((k) => k.trim())
    .filter(Boolean);

  return [...new Set(rawList)];
}

export function getAvailableYouTubeApiKeys(): string[] {
  const now = Date.now();
  const keys = getConfiguredYouTubeApiKeys();
  const active = keys.filter((key) => {
    const blockedUntil = exhaustedUntilByKey.get(key) || 0;
    return blockedUntil <= now;
  });
  // If every key is in cooldown, return all keys as final fallback retry list
  return active.length > 0 ? active : keys;
}

export function isQuotaExceededError(status: number, errorPayload: unknown): boolean {
  if (status !== 403 && status !== 429) return false;
  if (!errorPayload || typeof errorPayload !== "object") {
    return status === 403;
  }
  const obj = errorPayload as {
    error?: {
      message?: string;
      errors?: Array<{ reason?: string }>;
    };
  };
  const reasons = (obj.error?.errors || []).map((e) => (e.reason || "").toLowerCase());
  if (
    reasons.some(
      (r) =>
        r.includes("quota") ||
        r.includes("dailylimit") ||
        r.includes("ratelimit"),
    )
  ) {
    return true;
  }
  const msg = (obj.error?.message || "").toLowerCase();
  return msg.includes("quota") || msg.includes("limit exceeded");
}

export function markYouTubeKeyExhausted(apiKey: string): void {
  exhaustedUntilByKey.set(apiKey, Date.now() + QUOTA_COOLDOWN_MS);
}

export interface YouTubeFetchOptions {
  revalidate?: number;
  timeoutMs?: number;
}

export type YouTubeApiResponse<T> =
  | { ok: true; data: T; apiKeyUsed: string }
  | {
      ok: false;
      status: number;
      error: string;
      quotaExhausted: boolean;
      rawError?: unknown;
    };

/**
 * Executes a single YouTube Data API v3 GET request with multi-key rotation & caching.
 * Pass endpoint path & params WITHOUT `&key=` (e.g., `videos?part=snippet&id=abc`).
 */
export async function fetchYouTubeApiWithRotation<T = Record<string, unknown>>(
  endpointAndQuery: string,
  options: YouTubeFetchOptions = {},
): Promise<YouTubeApiResponse<T>> {
  const keys = getAvailableYouTubeApiKeys();
  if (keys.length === 0) {
    return {
      ok: false,
      status: 503,
      error: "No YouTube API keys configured",
      quotaExhausted: false,
    };
  }

  const revalidate = options.revalidate ?? VIDEO_METADATA_REVALIDATE_SECONDS;
  const timeoutMs = options.timeoutMs ?? 8_000;
  const separator = endpointAndQuery.includes("?") ? "&" : "?";

  let lastStatus = 500;
  let lastError = "YouTube API request failed";
  let lastRaw: unknown = null;
  let sawQuota = false;

  for (const apiKey of keys) {
    const url = `https://www.googleapis.com/youtube/v3/${endpointAndQuery}${separator}key=${encodeURIComponent(apiKey)}`;
    try {
      const resp = await fetch(url, {
        next: { revalidate },
        signal: AbortSignal.timeout(timeoutMs),
      });
      const json = await resp.json().catch(() => ({}));

      if (resp.ok && !(json as { error?: unknown })?.error) {
        return { ok: true, data: json as T, apiKeyUsed: apiKey };
      }

      lastStatus = resp.ok ? 400 : resp.status;
      lastRaw = json;
      const errMsg =
        (json as { error?: { message?: string } })?.error?.message ||
        `YouTube API error (${resp.status})`;
      lastError = errMsg;

      if (isQuotaExceededError(resp.status, json)) {
        sawQuota = true;
        markYouTubeKeyExhausted(apiKey);
        continue; // rotate cleanly to the next configured key
      }

      // Non-quota client error (e.g., 400 invalid ID / commentsDisabled) should not rotate keys
      return {
        ok: false,
        status: lastStatus,
        error: lastError,
        quotaExhausted: false,
        rawError: lastRaw,
      };
    } catch (err) {
      lastStatus = 502;
      lastError = err instanceof Error ? err.message : "Network error calling YouTube API";
    }
  }

  return {
    ok: false,
    status: lastStatus,
    error: lastError,
    quotaExhausted: sawQuota,
    rawError: lastRaw,
  };
}

/**
 * Runs a multi-call workflow callback with automatic key rotation when any step hits 403 quotaExceeded.
 */
export async function executeWithYouTubeKeyRotation<T>(
  runner: (apiKey: string) => Promise<T>,
): Promise<T> {
  const keys = getAvailableYouTubeApiKeys();
  if (keys.length === 0) {
    throw new Error("NO_YOUTUBE_KEYS");
  }

  let lastError: unknown = null;
  for (const apiKey of keys) {
    try {
      return await runner(apiKey);
    } catch (err) {
      lastError = err;
      const msg = err instanceof Error ? err.message.toLowerCase() : String(err).toLowerCase();
      if (msg.includes("quota") || msg.includes("403") || msg.includes("limit exceeded")) {
        markYouTubeKeyExhausted(apiKey);
        continue;
      }
      throw err;
    }
  }

  throw lastError instanceof Error ? lastError : new Error("All YouTube API keys exhausted");
}

export interface VideoMetadataSummary {
  videoId: string;
  title: string;
  channelTitle: string;
  publishedAt: string | null;
  description: string;
  tags: string[];
  thumbnail: string;
  views: number | null;
  source: "youtube-api" | "oembed-fallback";
}

export async function fetchVideoMetadataWithFallback(
  videoId: string,
): Promise<VideoMetadataSummary | null> {
  const apiRes = await fetchYouTubeApiWithRotation<{
    items?: Array<{
      id?: string;
      snippet?: {
        title?: string;
        channelTitle?: string;
        publishedAt?: string;
        description?: string;
        tags?: string[];
        thumbnails?: {
          maxres?: { url?: string };
          high?: { url?: string };
          medium?: { url?: string };
        };
      };
      statistics?: {
        viewCount?: string;
      };
    }>;
  }>(`videos?part=snippet,statistics&id=${encodeURIComponent(videoId)}`, {
    revalidate: VIDEO_METADATA_REVALIDATE_SECONDS,
  });

  if (apiRes.ok && apiRes.data.items && apiRes.data.items.length > 0) {
    const item = apiRes.data.items[0];
    const snippet = item.snippet || {};
    return {
      videoId,
      title: snippet.title || "",
      channelTitle: snippet.channelTitle || "",
      publishedAt: snippet.publishedAt || null,
      description: snippet.description || "",
      tags: Array.isArray(snippet.tags) ? snippet.tags : [],
      thumbnail:
        snippet.thumbnails?.maxres?.url ||
        snippet.thumbnails?.high?.url ||
        snippet.thumbnails?.medium?.url ||
        `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
      views: item.statistics?.viewCount ? Number.parseInt(item.statistics.viewCount, 10) : null,
      source: "youtube-api",
    };
  }

  // Graceful fallback to public YouTube oEmbed metadata (cached 24h)
  try {
    const oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(
      `https://www.youtube.com/watch?v=${videoId}`,
    )}&format=json`;
    const resp = await fetch(oembedUrl, {
      next: { revalidate: VIDEO_METADATA_REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(8_000),
    });
    if (!resp.ok) return null;
    const data = (await resp.json()) as {
      title?: string;
      author_name?: string;
      thumbnail_url?: string;
    };
    return {
      videoId,
      title: data.title || "",
      channelTitle: data.author_name || "",
      publishedAt: null,
      description: "",
      tags: [],
      thumbnail: data.thumbnail_url || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
      views: null,
      source: "oembed-fallback",
    };
  } catch {
    return null;
  }
}

export interface ChannelFeedFallbackResult {
  channelId: string;
  channelTitle: string;
  entries: Array<{
    videoId: string;
    title: string;
    publishedAt: string;
    url: string;
    thumbnail: string;
    views: number;
  }>;
}

export async function fetchChannelRssFeed(
  channelId: string,
): Promise<ChannelFeedFallbackResult | null> {
  try {
    const feedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${encodeURIComponent(channelId)}`;
    const resp = await fetch(feedUrl, {
      headers: { Accept: "application/xml, text/xml" },
      next: { revalidate: CHANNEL_STATS_REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(8_000),
    });
    if (!resp.ok) return null;
    const xml = await resp.text();
    const titleMatch = xml.match(/<feed[\s\S]*?<title>([\s\S]*?)<\/title>/i);
    const rawEntries = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/gi)];
    const entries = rawEntries
      .map((match) => {
        const chunk = match[1];
        const videoId = chunk.match(/<yt:videoId>([^<]+)<\/yt:videoId>/i)?.[1]?.trim();
        if (!videoId) return null;
        return {
          videoId,
          title: (chunk.match(/<title>([\s\S]*?)<\/title>/i)?.[1] || "").trim(),
          publishedAt: (chunk.match(/<published>([^<]+)<\/published>/i)?.[1] || "").trim(),
          url:
            chunk.match(/<link[^>]+href="([^"]+)"/i)?.[1]?.trim() ||
            `https://www.youtube.com/watch?v=${videoId}`,
          thumbnail:
            chunk.match(/<media:thumbnail[^>]+url="([^"]+)"/i)?.[1]?.trim() ||
            `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
          views:
            Number.parseInt(
              chunk.match(/<media:statistics[^>]+views="(\d+)"/i)?.[1] || "0",
              10,
            ) || 0,
        };
      })
      .filter((e): e is NonNullable<typeof e> => Boolean(e));

    return {
      channelId,
      channelTitle: (titleMatch?.[1] || channelId).trim(),
      entries,
    };
  } catch {
    return null;
  }
}
