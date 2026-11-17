import { NextResponse } from "next/server";

const PRODUCTION_ALLOWED_HOSTS = new Set([
  "youtubetoolshub.com",
  "www.youtubetoolshub.com",
]);

const DEV_ALLOWED_HOSTS = new Set(["localhost", "127.0.0.1", "::1", "[::1]"]);

function getDynamicConfiguredHost(): string | null {
  const configured =
    process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || "";
  if (!configured) return null;
  try {
    return new URL(configured).hostname.toLowerCase();
  } catch {
    return null;
  }
}

export function isAllowedOriginUrl(parsedUrl: URL): boolean {
  const hostname = parsedUrl.hostname.toLowerCase();
  const isDev = process.env.NODE_ENV !== "production";

  // Production hosts always require HTTPS (except local dev)
  if (PRODUCTION_ALLOWED_HOSTS.has(hostname)) {
    return isDev
      ? parsedUrl.protocol === "https:" || parsedUrl.protocol === "http:"
      : parsedUrl.protocol === "https:";
  }

  const configuredHost = getDynamicConfiguredHost();
  if (configuredHost && hostname === configuredHost) {
    return isDev
      ? parsedUrl.protocol === "https:" || parsedUrl.protocol === "http:"
      : parsedUrl.protocol === "https:";
  }

  if (isDev && DEV_ALLOWED_HOSTS.has(hostname)) {
    return parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:";
  }

  return false;
}

export function extractHeaders(
  input: Request | Headers | { headers: Headers },
): Headers {
  if (input instanceof Headers) return input;
  return input.headers;
}

export function createForbiddenOriginResponse(
  message = "Forbidden: requests to this endpoint must originate from youtubetoolshub.com.",
): NextResponse {
  return NextResponse.json(
    { success: false, error: message },
    {
      status: 403,
      headers: {
        "Cache-Control": "no-store",
        "X-Robots-Tag": "noindex, nofollow",
      },
    },
  );
}

export type OriginVerificationResult =
  | { allowed: true; origin: string; source: "origin" | "referer" }
  | { allowed: false; reason: string; response: NextResponse };

/**
 * Verifies that an incoming `/api/*` request originates from `youtubetoolshub.com`
 * (or `localhost` / loopback in non-production environments), returning an HTTP 403
 * JSON response for external scrapers, bots, or cross-origin API abuse.
 */
export function verifyOrigin(
  input: Request | Headers | { headers: Headers },
): OriginVerificationResult {
  const headers = extractHeaders(input);
  const originHeader = headers.get("origin")?.trim();

  // If the browser or client supplied an Origin header, enforce strictly on it
  if (originHeader) {
    if (originHeader.toLowerCase() === "null") {
      return {
        allowed: false,
        reason: "Null origin rejected",
        response: createForbiddenOriginResponse(),
      };
    }

    try {
      const parsed = new URL(originHeader);
      if (isAllowedOriginUrl(parsed)) {
        return { allowed: true, origin: parsed.origin, source: "origin" };
      }
      return {
        allowed: false,
        reason: `Disallowed Origin host: ${parsed.hostname}`,
        response: createForbiddenOriginResponse(),
      };
    } catch {
      return {
        allowed: false,
        reason: "Malformed Origin header",
        response: createForbiddenOriginResponse(),
      };
    }
  }

  // Fallback to Referer for same-origin GET navigation / fetch / download requests
  const refererHeader = headers.get("referer")?.trim();
  if (refererHeader) {
    try {
      const parsed = new URL(refererHeader);
      if (isAllowedOriginUrl(parsed)) {
        return { allowed: true, origin: parsed.origin, source: "referer" };
      }
      return {
        allowed: false,
        reason: `Disallowed Referer host: ${parsed.hostname}`,
        response: createForbiddenOriginResponse(),
      };
    } catch {
      return {
        allowed: false,
        reason: "Malformed Referer header",
        response: createForbiddenOriginResponse(),
      };
    }
  }

  // Headerless external callers (curl, Python scrapers, remote scripts)
  return {
    allowed: false,
    reason: "Missing Origin and Referer headers",
    response: createForbiddenOriginResponse(),
  };
}
