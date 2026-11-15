import "server-only";

type RateLimitEntry = { count: number; resetAt: number };

const entries = new Map<string, RateLimitEntry>();
const MAX_ENTRIES = 10_000;

/** Prune expired entries to prevent unbounded memory growth. */
function pruneExpiredEntries(now: number): void {
  // Cap deletions per call to avoid blocking the event loop
  let deleted = 0;
  for (const [key, entry] of entries) {
    if (entry.resetAt <= now) {
      entries.delete(key);
      if (++deleted >= 100) break;
    }
  }
}

/**
 * Lightweight process-local protection for public API routes. Replace this
 * with a shared store when the app runs on multiple server instances.
 */
export function enforceRateLimit(
  key: string,
  limit: number,
  windowMs: number,
): { allowed: boolean; retryAfterSeconds: number } {
  const now = Date.now();

  // Periodically clean up expired entries
  if (entries.size > 50) {
    pruneExpiredEntries(now);
  }

  const current = entries.get(key);

  if (!current || current.resetAt <= now) {
    // A public endpoint can receive unbounded unique keys (for example from a
    // botnet). Keep this process-local safeguard from becoming the memory leak.
    if (!current && entries.size >= MAX_ENTRIES) {
      const oldestKey = entries.keys().next().value;
      if (oldestKey) entries.delete(oldestKey);
    }
    entries.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfterSeconds: 0 };
  }
  if (current.count >= limit) {
    return { allowed: false, retryAfterSeconds: Math.max(1, Math.ceil((current.resetAt - now) / 1000)) };
  }

  current.count += 1;
  return { allowed: true, retryAfterSeconds: 0 };
}

export function getRequestIp(headers: Headers): string {
  // Prefer Cloudflare verified client IP, then local proxy x-real-ip, then XFF.
  const cfIp = headers.get("cf-connecting-ip")?.trim();
  if (cfIp) return cfIp;

  const realIp = headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;

  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    const parts = forwarded.split(",").map((p) => p.trim()).filter(Boolean);
    if (parts.length > 0) return parts[0];
  }

  // Fallback per-client fingerprint so missing proxy headers never bucket all users into "unknown"
  const ua = headers.get("user-agent") || "";
  const lang = headers.get("accept-language") || "";
  let hash = 2166136261;
  const sig = `${ua}|${lang}`;
  for (let i = 0; i < sig.length; i++) {
    hash ^= sig.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return `anon-${(hash >>> 0).toString(36)}`;
}

/**
 * Detect major search engine, AdSense, Google Discover, and AI answer-engine crawlers.
 * Crawlers should not receive 429 rate limits which GSC flags as "Blocked due to other 4xx issue".
 */
export function isSearchEngineBot(userAgent: string | null): boolean {
  if (!userAgent) return false;
  const ua = userAgent.toLowerCase();
  return (
    ua.includes("googlebot") ||
    ua.includes("mediapartners-google") ||
    ua.includes("adsbot-google") ||
    ua.includes("apis-google") ||
    ua.includes("feedfetcher-google") ||
    ua.includes("google-read-aloud") ||
    ua.includes("google-inspectiontool") ||
    ua.includes("storebot-google") ||
    ua.includes("googleother") ||
    ua.includes("google-extended") ||
    ua.includes("google-cloudvertexbot") ||
    ua.includes("bingbot") ||
    ua.includes("bingpreview") ||
    ua.includes("microsoftpreview") ||
    ua.includes("msnbot") ||
    ua.includes("slurp") ||
    ua.includes("duckduckbot") ||
    ua.includes("duckassistbot") ||
    ua.includes("baiduspider") ||
    ua.includes("yandexbot") ||
    ua.includes("bravebot") ||
    ua.includes("ecosia") ||
    ua.includes("qwantify") ||
    ua.includes("seznambot") ||
    ua.includes("yeti") ||
    ua.includes("naverbot") ||
    ua.includes("mojeekbot") ||
    ua.includes("applebot") ||
    ua.includes("gptbot") ||
    ua.includes("chatgpt-user") ||
    ua.includes("oai-searchbot") ||
    ua.includes("chatgpt-agent") ||
    ua.includes("claudebot") ||
    ua.includes("claude-web") ||
    ua.includes("claude-user") ||
    ua.includes("claude-searchbot") ||
    ua.includes("anthropic-ai") ||
    ua.includes("perplexitybot") ||
    ua.includes("perplexity-user") ||
    ua.includes("meta-externalagent") ||
    ua.includes("meta-externalfetcher") ||
    ua.includes("facebot") ||
    ua.includes("facebookexternalhit") ||
    ua.includes("facebookbot") ||
    ua.includes("twitterbot") ||
    ua.includes("linkedinbot") ||
    ua.includes("deepseekbot") ||
    ua.includes("mistralbot") ||
    ua.includes("mistralai") ||
    ua.includes("youbot") ||
    ua.includes("cohere-ai") ||
    ua.includes("amazonbot")
  );
}
