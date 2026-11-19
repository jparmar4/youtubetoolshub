import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Comprehensive search engine, AdSense, Google Discover, and AI answer-engine crawlers
const BOT_USER_AGENTS = [
  // Google Search, Google Discover, AdSense & Ads Quality crawlers
  // CRITICAL: Mediapartners-Google (AdSense contextual crawler) and FeedFetcher-Google
  // (Google Discover / News feeds) do NOT contain "googlebot" in their UA strings.
  "googlebot",
  "mediapartners-google",
  "adsbot-google",
  "adsbot-google-mobile",
  "apis-google",
  "feedfetcher-google",
  "google-read-aloud",
  "google-inspectiontool",
  "storebot-google",
  "google-safety",
  "googleproducer",
  "google-site-verification",
  // Global Search Engines (Tier 1 & Tier 2 markets)
  "bingbot",
  "yandexbot",
  "yandexmobilebot",
  "duckduckbot",
  "slurp", // Yahoo
  "baiduspider",
  "bravebot",
  "ecosia",
  "qwantify", // Qwant (France / EU)
  "seznambot", // Seznam (Czechia / Central Europe)
  "yeti", // Naver (South Korea)
  "naverbot",
  "mojeekbot", // Mojeek (UK / Europe)
  "coccocbot", // CocCoc
  "sogou",
  // OpenAI / ChatGPT / SearchGPT
  "gptbot",
  "chatgpt-user",
  "oai-searchbot",
  "chatgpt-agent",
  // Anthropic / Claude
  "claudebot",
  "claude-web",
  "claude-user",
  "claude-searchbot",
  "anthropic-ai",
  // Google Gemini / Vertex AI / Research
  "google-extended",
  "googleother",
  "googleother-image",
  "googleother-video",
  "google-cloudvertexbot",
  // Perplexity AI (indexer + live answer-time fetcher)
  "perplexitybot",
  "perplexity-user",
  // Meta AI
  "meta-externalagent",
  "meta-externalfetcher",
  "facebookexternalhit",
  "facebookbot",
  "facebot",
  "meta-ai",
  // Apple / Siri / Apple Intelligence / Spotlight
  "applebot",
  "applebot-extended",
  // xAI / Grok
  "xai-grok",
  "grok",
  // DeepSeek AI
  "deepseekbot",
  // Mistral AI / Le Chat
  "mistralbot",
  "mistralai",
  "mistralai-user",
  // Amazon / Alexa / Rufus
  "amazonbot",
  "ia_archiver", // Alexa legacy
  // Microsoft / Bing Copilot
  "msnbot",
  "bingpreview",
  "microsoftpreview",
  // DuckDuckGo AI Assist
  "duckassistbot",
  // You.com / Phind / Timpi / Cohere / AI2 / Diffbot
  "youbot",
  "phindbot",
  "timpibot",
  "cohere-ai",
  "cohere-training-data-crawler",
  "ai2bot",
  "ai2bot-dolma",
  "diffbot",
  "imagesiftbot",
  "omgili",
  "omgilibot",
  // TikTok Search / ByteDance
  "tiktokspider",
  "bytespider",
  // Common Crawl (feeds AI models)
  "ccbot",
  // Neeva / Snowflake
  "neevabot",
  // Social media & rich-preview crawlers (Discover / shares)
  "twitterbot",
  "linkedinbot",
  "slackbot",
  "telegrambot",
  "whatsapp",
  "discordbot",
  "pinterestbot",
  "redditbot",
  // SEO & verification tools
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

// Scripting/scraping client signatures — keep real security scanners & SEO
// scrapers blocked while allowing headless browser agents (HeadlessChrome,
// Playwright, Puppeteer) used by WebMCP & AI agent-readiness evaluators
// (governed by per-IP rate limits below instead of hard 403s).
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

/** Client IP behind Cloudflare / local reverse proxy.
 *  Checks `cf-connecting-ip` first (set by Cloudflare edge), then `x-real-ip`
 *  (set by LiteSpeed/nginx), then the first public `x-forwarded-for` entry.
 *  If all IP headers are missing, falls back to a lightweight per-client hash
 *  so unrelated visitors never collide into a single global "unknown" bucket. */
function getClientIp(request: NextRequest): string {
  const cfIp = request.headers.get("cf-connecting-ip")?.trim();
  if (cfIp) return cfIp;

  const realIp = request.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;

  const xff = request.headers.get("x-forwarded-for");
  if (xff) {
    const parts = xff
      .split(",")
      .map((p) => p.trim())
      .filter(Boolean);
    if (parts.length > 0) return parts[0];
  }

  // Fallback fingerprint so missing proxy headers never cause a global 429
  const ua = request.headers.get("user-agent") || "";
  const lang = request.headers.get("accept-language") || "";
  let hash = 2166136261;
  const sig = `${ua}|${lang}`;
  for (let i = 0; i < sig.length; i++) {
    hash ^= sig.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return `anon-${(hash >>> 0).toString(36)}`;
}

const RATE_LIMITS = {
  apiMutation: 30, // POST/PATCH per minute per IP (tool actions, calculators, auth)
  apiRead: 240, // GET /api/* per minute (markdown-for-agents, feeds, lookups)
  page: 600, // HTML + RSC requests per minute per IP — generous for multi-tab human browsing
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
  //    search crawlers bypass rate limiting for HTML page GETs only —
  //    never for /api/* (their UA string is client-controlled).
  const isApiPath = pathname.startsWith("/api");
  const isWebhookPath = pathname.startsWith("/api/webhooks/");
  const isStaticAssetPath = /\.(?:webp|png|jpe?g|gif|svg|ico|avif|woff2?|ttf|eot|css|js|map|xml|txt|json|webmanifest)$/i.test(pathname);
  const isMutation = !["GET", "HEAD", "OPTIONS"].includes(request.method);
  const isPublicDiscoveryApi =
    !isMutation &&
    (pathname === "/api/markdown" ||
      pathname === "/api/ai-context" ||
      pathname === "/api/tools" ||
      pathname === "/api/faqs" ||
      pathname === "/api/mcp" ||
      pathname === "/api/health");
  const isPublicDiscoveryFile =
    !isMutation &&
    (pathname === "/robots.txt" ||
      pathname === "/ads.txt" ||
      pathname === "/llms.txt" ||
      pathname === "/llms-full.txt" ||
      pathname === "/index.md" ||
      pathname.endsWith(".md") ||
      pathname === "/knowledge-graph.jsonld" ||
      pathname === "/feed.xml" ||
      pathname === "/atom.xml" ||
      pathname.startsWith("/.well-known/") ||
      /^\/sitemap[-_a-z0-9]*\.xml$/i.test(pathname));
  const isPublicMcpEndpoint = pathname === "/api/mcp";
  const isRouterPrefetch =
    request.headers.get("next-router-prefetch") === "1" ||
    request.headers.get("purpose") === "prefetch";
  // Payment webhooks authenticate via HMAC signature; Razorpay retry
  // deliveries must never be 403'd by a UA heuristic or 429'd by bursts.
  const skipMitigation = isWebhookPath || isRouterPrefetch;

  // 1a. Known scripting/scraping clients get a hard 403 on interactive pages
  //     and private APIs, while standard machine-discovery files & public MCP/
  //     Markdown APIs remain reachable for CLI/HTTP AI agents (still rate-limited).
  if (
    !skipMitigation &&
    !isPublicDiscoveryApi &&
    !isPublicDiscoveryFile &&
    !isPublicMcpEndpoint &&
    !isSearchBot(userAgent) &&
    isAbusiveBot(userAgent)
  ) {
    console.warn(
      `[proxy] blocked abusive UA: ip=${getClientIp(request)} path=${pathname} ua=${userAgent?.slice(0, 120)}`,
    );
    return new NextResponse("Forbidden", { status: 403 });
  }

  // 1b. Empty user agents are almost always scripted — allow only a trickle,
  // then still continue through canonical & locale redirects below.
  // Skip internal image-optimizer & static binary fetches so pages with many
  // icons (e.g. /tools directory) never self-throttle on loopback.
  if (!skipMitigation && !isStaticAssetPath && !isPublicDiscoveryApi && !userAgent) {
    if (!rateLimit(`empty-ua:${getClientIp(request)}`, 20)) {
      return new NextResponse("Too Many Requests", {
        status: 429,
        headers: { "Retry-After": "60" },
      });
    }
  } else if (
    !skipMitigation &&
    !isStaticAssetPath &&
    (!isSearchBot(userAgent) || (isApiPath && !isPublicDiscoveryApi))
  ) {
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
  const legacyLocales = ["en", "es", "hi", "pt", "de", "fr", "it", "nl", "pl", "ru", "ja", "ko", "ar", "id", "tr", "vi", "th", "zh"];
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
      pathname.startsWith("/research") ||
      pathname.startsWith("/alternatives") ||
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
