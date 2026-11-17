/**
 * Lightweight edge-compatible process-local IP rate limiter.
 * Default limit for AI generation endpoints: 20 requests per 10 minutes per IP.
 */

export const AI_IP_WINDOW_MS = 10 * 60 * 1000;
export const AI_IP_MAX_REQUESTS = 20;

interface RateLimitBucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, RateLimitBucket>();
const MAX_BUCKETS = 10_000;

function pruneExpired(now: number): void {
  let removed = 0;
  for (const [key, entry] of buckets) {
    if (entry.resetAt <= now) {
      buckets.delete(key);
      if (++removed >= 100) break;
    }
  }
}

export function extractClientIp(headers: Headers): string {
  const cfIp = headers.get("cf-connecting-ip")?.trim();
  if (cfIp) return cfIp;

  const realIp = headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;

  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }

  // Deterministic lightweight FNV-1a fallback fingerprint when reverse-proxy headers are absent
  const sig = `${headers.get("user-agent") || ""}|${headers.get("accept-language") || ""}`;
  let hash = 2166136261;
  for (let i = 0; i < sig.length; i++) {
    hash ^= sig.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return `anon-${(hash >>> 0).toString(36)}`;
}

export interface RateLimitDecision {
  allowed: boolean;
  remaining: number;
  limit: number;
  retryAfterSeconds: number;
  resetAt: number;
}

export function checkSlidingWindowLimit(
  key: string,
  limit = AI_IP_MAX_REQUESTS,
  windowMs = AI_IP_WINDOW_MS,
): RateLimitDecision {
  const now = Date.now();
  if (buckets.size > 50) {
    pruneExpired(now);
  }

  const current = buckets.get(key);
  if (!current || current.resetAt <= now) {
    if (!current && buckets.size >= MAX_BUCKETS) {
      const oldestKey = buckets.keys().next().value;
      if (oldestKey) buckets.delete(oldestKey);
    }
    const resetAt = now + windowMs;
    buckets.set(key, { count: 1, resetAt });
    return {
      allowed: true,
      remaining: Math.max(0, limit - 1),
      limit,
      retryAfterSeconds: 0,
      resetAt,
    };
  }

  if (current.count >= limit) {
    return {
      allowed: false,
      remaining: 0,
      limit,
      retryAfterSeconds: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
      resetAt: current.resetAt,
    };
  }

  current.count += 1;
  return {
    allowed: true,
    remaining: Math.max(0, limit - current.count),
    limit,
    retryAfterSeconds: 0,
    resetAt: current.resetAt,
  };
}

export function checkAiIpRateLimit(
  headers: Headers,
  scope = "ai",
  limit = AI_IP_MAX_REQUESTS,
  windowMs = AI_IP_WINDOW_MS,
): RateLimitDecision {
  const ip = extractClientIp(headers);
  return checkSlidingWindowLimit(`${scope}:ip:${ip}`, limit, windowMs);
}

export function createRateLimitJsonResponse(
  decision: RateLimitDecision,
  message = "Too many AI requests from this IP. Limit is 20 requests per 10 minutes.",
): Response {
  return new Response(
    JSON.stringify({
      error: message,
      code: "IP_RATE_LIMITED",
      retryAfterSeconds: decision.retryAfterSeconds,
    }),
    {
      status: 429,
      headers: {
        "Content-Type": "application/json",
        "Retry-After": String(decision.retryAfterSeconds),
        "X-RateLimit-Limit": String(decision.limit),
        "X-RateLimit-Remaining": String(decision.remaining),
      },
    },
  );
}
