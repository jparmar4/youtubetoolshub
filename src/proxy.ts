import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Common search engine bot user agents
const BOT_USER_AGENTS = [
  // Search engines
  "googlebot",
  "bingbot",
  "yandexbot",
  "duckduckbot",
  "slurp", // Yahoo
  "baiduspider",
  "bravebot",
  // OpenAI / ChatGPT / SearchGPT
  "gptbot",
  "chatgpt-user",
  "oai-searchbot",
  // Anthropic / Claude
  "claudebot",
  "claude-web",
  "anthropic-ai",
  // Google Gemini / Vertex AI
  "google-extended",
  "googleother",
  "google-cloudvertexbot",
  // Perplexity AI
  "perplexitybot",
  // Meta AI
  "meta-externalagent",
  "facebookexternalhit",
  "facebookbot",
  "meta-ai",
  // Apple / Siri / Apple Intelligence
  "applebot",
  "applebot-extended",
  // xAI / Grok
  "xai-grok",
  "grok",
  // DeepSeek AI
  "deepseekbot",
  // Mistral AI
  "mistralbot",
  // Amazon / Alexa
  "amazonbot",
  "ia_archiver", // Alexa legacy
  // Microsoft / Bing Copilot
  "msnbot",
  "bingpreview",
  "microsoftpreview",
  // You.com AI
  "youbot",
  // Cohere AI
  "cohere-ai",
  // AI2 (Allen Institute for AI)
  "ai2bot",
  "ai2bot-dolma",
  // Common Crawl (feeds AI training)
  "ccbot",
  // Neeva / Snowflake
  "neevabot",
  // Social media crawlers
  "twitterbot",
  "linkedinbot",
  "slackbot",
  "telegrambot",
  "whatsapp",
  "discordbot",
  // SEO tools
  "semrushbot",
  "ahrefsbot",
  "rogerbot",
  "dotbot",
];

function isSearchBot(userAgent: string | null): boolean {
  if (!userAgent) return false;
  const lowerUA = userAgent.toLowerCase();
  return BOT_USER_AGENTS.some((bot) => lowerUA.includes(bot));
}

/* ==========================================================================
   BOT MITIGATION — abusive UA blocking + per-IP rate limiting
   Protects AdSense from invalid-traffic patterns (high page views with
   little/no ad fill, scripted clicks) and shields tool APIs from scrapers.
   Verified search crawlers (allowlist above) bypass rate limiting entirely.
   ========================================================================== */

// Scripting/scraping client signatures — no real visitor sends these.
const ABUSIVE_UA_PATTERNS = [
  "curl/",
  "wget",
  "python-requests",
  "python-urllib",
  "python-httpx",
  "aiohttp",
  "scrapy",
  "go-http-client",
  "java/",
  "okhttp",
  "apache-httpclient",
  "libwww-perl",
  "headlesschrome",
  "puppeteer",
  "playwright",
  "phantomjs",
  "selenium",
  "masscan",
  "nikto",
  "zgrab",
  "nmap!",
  "dataforseo",
  "megaindex",
  "serpstatbot",
];

function isAbusiveBot(userAgent: string | null): boolean {
  if (!userAgent) return false; // empty UA handled separately below
  const lowerUA = userAgent.toLowerCase();
  return ABUSIVE_UA_PATTERNS.some((pattern) => lowerUA.includes(pattern));
}

// Fixed-window per-IP counters. Single-instance standalone deploy on
// Hostinger, so an in-memory Map is sufficient (resets on restart — fine:
// limits are generous for humans, hostile only to scripts).
const rateBuckets = new Map<string, { count: number; resetAt: number }>();

function pruneRateBuckets(now: number) {
  if (rateBuckets.size < 5000) return;
  for (const [key, bucket] of rateBuckets) {
    if (bucket.resetAt <= now) rateBuckets.delete(key);
  }
}

function rateLimit(key: string, limit: number, windowMs = 60_000): boolean {
  const now = Date.now();
  pruneRateBuckets(now);
  const bucket = rateBuckets.get(key);
  if (!bucket || bucket.resetAt <= now) {
    rateBuckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (bucket.count >= limit) return false;
  bucket.count += 1;
  return true;
}

/** Client IP behind the local reverse proxy (Hostinger panel sets X-Real-IP /
 *  X-Forwarded-For). Never trust a self-supplied value blindly — we only take
 *  the FIRST proxy-added entry, which the origin proxy controls. */
function getClientIp(request: NextRequest): string {
  return (
    request.headers.get("x-real-ip") ||
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown"
  );
}

const RATE_LIMITS = {
  apiMutation: 10, // POST/PATCH per minute per IP (tool actions, auth, orders)
  apiRead: 120, // GET /api/* per minute (markdown-for-agents, feeds, lookups)
  page: 180, // HTML pages per minute per IP — far above human browsing
} as const;


/** Paths that must never appear in Google Search (app UI / thin search results) */
const NOINDEX_PREFIXES = [
  "/search",
  "/sign-in",
  "/dashboard",
  "/history",
  "/upgrade",
  "/auth",
];

function isNoIndexPath(pathname: string): boolean {
  return NOINDEX_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

function withOptionalNoIndex(
  response: NextResponse,
  pathname: string,
): NextResponse {
  if (isNoIndexPath(pathname)) {
    // follow allowed so link equity can still pass from app/search UI
    response.headers.set("X-Robots-Tag", "noindex, follow");
  }
  return response;
}

export default async function middleware(request: NextRequest) {
  const userAgent = request.headers.get("user-agent");
  const pathname = request.nextUrl.pathname;
  const host = request.headers.get("host");

  // 1. Bot mitigation — blocks scraping clients and caps per-IP request
  //    rates (AdSense invalid-traffic + API-abuse protection). Verified
  //    search crawlers bypass rate limiting entirely.
  const isApiPath = pathname.startsWith("/api");
  const isMutation = !["GET", "HEAD", "OPTIONS"].includes(request.method);

  // 1a. Known scripting/scraping clients get a hard 403 (never real visitors).
  if (isAbusiveBot(userAgent)) {
    console.warn(
      `[proxy] blocked abusive UA: ip=${getClientIp(request)} path=${pathname} ua=${userAgent?.slice(0, 120)}`,
    );
    return new NextResponse("Forbidden", { status: 403 });
  }

  // 1b. Empty user agents are almost always scripted — allow only a trickle.
  if (!userAgent) {
    if (!rateLimit(`empty-ua:${getClientIp(request)}`, 10)) {
      return new NextResponse("Too Many Requests", {
        status: 429,
        headers: { "Retry-After": "60" },
      });
    }
    return withOptionalNoIndex(NextResponse.next(), pathname);
  }

  // 1c. Per-IP fixed-window rate limits.
  if (!isSearchBot(userAgent)) {
    const ip = getClientIp(request);
    if (isApiPath) {
      const limit = isMutation ? RATE_LIMITS.apiMutation : RATE_LIMITS.apiRead;
      if (!rateLimit(`api:${ip}`, limit)) {
        console.warn(`[proxy] rate-limited api: ip=${ip} method=${request.method} path=${pathname}`);
        return new NextResponse(
          JSON.stringify({ error: "Too many requests. Please slow down." }),
          {
            status: 429,
            headers: {
              "Content-Type": "application/json",
              "Retry-After": "60",
            },
          },
        );
      }
    } else if (!rateLimit(`page:${ip}`, RATE_LIMITS.page)) {
      console.warn(`[proxy] rate-limited page: ip=${ip} path=${pathname}`);
      return new NextResponse("Too Many Requests", {
        status: 429,
        headers: { "Retry-After": "60" },
      });
    }
  }

  // 0. Redirect non-www to www (SEO Canonicalization)
  if (host === "youtubetoolshub.com" || host?.startsWith("youtubetoolshub.com:")) {
    return NextResponse.redirect(
      `https://www.youtubetoolshub.com${pathname}${request.nextUrl.search}`,
      301
    );
  }

  // 0.1 Redirect locale-prefixed URLs to a single canonical URL
  // This prevents duplicate indexing like /en/blog/... and /blog/... (cannibalization)
  // Global strategy (2026-09-29): single English canonical + hreflang en-US/GB/IN/AU/CA
  // + 54 country calculator pages. Only remove a locale from this list when a fully
  // translated page tree exists for it — otherwise it creates thin duplicates.
  const legacyLocales = ["en", "es", "hi", "pt"];
  for (const locale of legacyLocales) {
    if (pathname === `/${locale}` || pathname === `/${locale}/`) {
      // Fixed origin — never derive Location from the request Host header.
      const dest = new URL("/", "https://www.youtubetoolshub.com");
      dest.search = request.nextUrl.search;
      return NextResponse.redirect(dest, 308);
    }
    if (pathname.startsWith(`/${locale}/`)) {
      const dest = new URL(
        pathname.replace(`/${locale}`, "") || "/",
        "https://www.youtubetoolshub.com",
      );
      dest.search = request.nextUrl.search;
      return NextResponse.redirect(dest, 308);
    }
  }

  // 0.2 Normalize trailing slashes (remove trailing slash to prevent duplicates)
  // Skip for root path "/" which should not have trailing slash stripped
  if (pathname !== "/" && pathname.endsWith("/")) {
    const dest = new URL(
      pathname.slice(0, -1),
      "https://www.youtubetoolshub.com",
    );
    dest.search = request.nextUrl.search;
    return NextResponse.redirect(dest, 308);
  }

  // 0.3 Content Negotiation for AI Agents (Markdown for Agents / Token-budget efficiency)
  const acceptHeader = (request.headers.get("accept") || "").toLowerCase();
  const wantsMarkdown =
    acceptHeader.includes("text/markdown") ||
    acceptHeader.includes("text/x-markdown");

  if (pathname.endsWith(".md")) {
    const cleanPath = pathname === "/index.md" ? "/" : pathname.slice(0, -3);
    const dest = new URL(
      `/api/markdown?path=${encodeURIComponent(cleanPath)}`,
      request.url,
    );
    return NextResponse.rewrite(dest);
  }

  if (
    wantsMarkdown &&
    (pathname === "/" ||
      pathname.startsWith("/tools") ||
      pathname.startsWith("/blog") ||
      pathname.startsWith("/resources") ||
      pathname === "/youtube-transcript-downloader" ||
      pathname === "/pricing" ||
      pathname === "/contact" ||
      pathname === "/faq" ||
      pathname === "/about")
  ) {
    const dest = new URL(
      `/api/markdown?path=${encodeURIComponent(pathname)}`,
      request.url,
    );
    return NextResponse.rewrite(dest);
  }

  // 1. Allow search bots unrestricted access (SEO) — still attach noindex on private paths
  if (isSearchBot(userAgent)) {
    return withOptionalNoIndex(NextResponse.next(), pathname);
  }

  // 2. Auth Protection for Tools
  // Protect /tools/* routes if they require auth
  // Previously: const isToolPage = i18n.locales.some(locale => pathname.startsWith(`/${locale}/tools/`));
  // New: Check for /tools/
  // 2. Auth Protection for Tools (DISABLED for Growth)
  // We want to allow unrestricted access to likely tools to boost traffic and ad revenue
  /*
    const isToolPage = pathname.startsWith("/tools/");

    if (isToolPage) {
        const session = await auth();
        const isLoggedIn = !!session?.user;

        if (!isLoggedIn) {
            // Redirect to sign-in
            const signInUrl = new URL("/sign-in", request.url);
            signInUrl.searchParams.set("callbackUrl", pathname);
            return NextResponse.redirect(signInUrl);
        }
    }
    */

  return withOptionalNoIndex(NextResponse.next(), pathname);
}

export const config = {
  matcher: [
    /*
     * Match everything except Next internals so the apex→www 301 also covers
     * sitemaps, feeds, ads.txt, .well-known files, images — AND /api routes,
     * which are now rate-limited and abusive-UA-filtered by the bot-mitigation
     * layer above (they previously had zero protection).
     */
    "/((?!_next/static|_next/image|_next/data|favicon\\.ico).*)",
  ],
};
