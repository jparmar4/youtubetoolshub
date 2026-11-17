import { NextResponse } from "next/server";

const PRODUCTION_ALLOWED_HOSTS = new Set([
  "youtubetoolshub.com",
  "www.youtubetoolshub.com",
]);

const LOOPBACK_HOSTS = new Set(["localhost", "127.0.0.1", "::1", "[::1]"]);

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

function getRequestHostname(headers: Headers): string | null {
  const rawHost = (
    headers.get("x-forwarded-host") ||
    headers.get("host") ||
    ""
  )
    .split(",")[0]
    .trim()
    .toLowerCase();
  if (!rawHost) return null;
  if (rawHost.startsWith("[")) {
    const endBracket = rawHost.indexOf("]");
    return endBracket >= 0 ? rawHost.slice(0, endBracket + 1) : rawHost;
  }
  return rawHost.split(":")[0] || null;
}

function isLoopbackHost(hostname: string | null): boolean {
  if (!hostname) return false;
  return LOOPBACK_HOSTS.has(hostname.toLowerCase());
}

export function isAllowedOriginUrl(
  parsedUrl: URL,
  requestHeaders?: Headers,
): boolean {
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

  // Allow loopback origins in dev OR when the incoming HTTP request itself is served
  // on a loopback host (e.g., local `npm start` / `server.js` standalone testing).
  if (
    isLoopbackHost(hostname) &&
    (isDev || (requestHeaders ? isLoopbackHost(getRequestHostname(requestHeaders)) : false))
  ) {
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
  | { allowed: true; origin: string; source: "origin" | "referer" | "sec-fetch-site" }
  | { allowed: false; reason: string; response: NextResponse };

/**
 * Verifies that an incoming `/api/*` request originates from `youtubetoolshub.com`
 * (or `localhost` / loopback in dev or loopback-hosted standalone servers), returning
 * an HTTP 403 JSON response for external scrapers, bots, or cross-origin API abuse.
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
      if (isAllowedOriginUrl(parsed, headers)) {
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
      if (isAllowedOriginUrl(parsed, headers)) {
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

  // Browsers with strict Referrer-Policy / privacy extensions may omit Referer on
  // same-origin GET requests, while browser Fetch Metadata sets Sec-Fetch-Site: same-origin
  // (a forbidden header name that cross-origin scripts cannot forge in a browser).
  const secFetchSite = headers.get("sec-fetch-site")?.trim().toLowerCase();
  if (secFetchSite === "same-origin") {
    const reqHost = getRequestHostname(headers);
    if (
      (reqHost && PRODUCTION_ALLOWED_HOSTS.has(reqHost)) ||
      (reqHost && reqHost === getDynamicConfiguredHost()) ||
      isLoopbackHost(reqHost)
    ) {
      return {
        allowed: true,
        origin: isLoopbackHost(reqHost) ? `http://${reqHost}` : `https://${reqHost}`,
        source: "sec-fetch-site",
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
