import "server-only";

type RateLimitEntry = { count: number; resetAt: number };

const entries = new Map<string, RateLimitEntry>();

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
  const forwarded = headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || headers.get("x-real-ip") || "unknown";
}
