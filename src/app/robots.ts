import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

/**
 * Keep robots.txt small and unambiguous.
 * Over-specific per-bot rules previously confused crawlers and wasted crawl budget
 * on thin template URLs (tool×niche, tool×tool comparisons).
 *
 * Deliberately NOT disallowed: /tools/compare/ and /tools/<slug>/<niche>.
 * Those URLs now 308 to their canonical parent. A robots Disallow would stop
 * Googlebot from ever fetching them again, so the redirect would never be seen
 * and the ~550 thin URLs would stay in the index indefinitely. Let Google crawl
 * them, read the redirect, and drop them; only then is a Disallow safe.
 *
 * Deliberately NOT disallowed: /search. It carries a noindex (page metadata +
 * X-Robots-Tag) that Google must be able to fetch to honor — Disallow would
 * hide the noindex and leave the URL in the index indefinitely.
 *
 * AI structured-data endpoints (/api/ai-context, /api/tools, /api/faqs) are
 * explicitly Allowed for AI answer-engine crawlers below. An explicit Allow of
 * a sub-path overrides the generic "/api/" Disallow per the REP, so AI systems
 * can fetch our knowledge graph while private/action APIs stay blocked.
 */
const DISALLOW = [
  "/api/",
  "/sign-in",
  "/dashboard",
  "/history",
  "/upgrade",
  "/auth/",
  "/_next/data/",
  "/cdn-cgi/",
] as const;

/** Public structured-data endpoints AI answer engines should always fetch. */
const AI_API_ALLOW = [
  "/api/ai-context",
  "/api/tools",
  "/api/faqs",
] as const;

export default function robots(): MetadataRoute.Robots {
  const baseUrl = siteConfig.url;

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [...DISALLOW],
      },
      {
        userAgent: [
          "OAI-SearchBot",
          "ChatGPT-User",
          "GPTBot",
          "ChatGPT-Agent",
          "PerplexityBot",
          // Perplexity-User / Claude-User / Claude-SearchBot are the
          // answer-time retrieval agents — without an explicit Allow they'd
          // fall through to the "*" group and lose /api/ai-context access.
          "Perplexity-User",
          "ClaudeBot",
          "Claude-Web",
          "Claude-User",
          "Claude-SearchBot",
          "anthropic-ai",
          "Google-Extended",
          "GoogleOther",
          // GoogleOther variants: separate tokens for image/video research
          // crawls — without explicit Allows they lose the AI API exceptions.
          "GoogleOther-Image",
          "GoogleOther-Video",
          "Google-CloudVertexBot",
          "Bingbot",
          "BingPreview",
          "MicrosoftPreview",
          "meta-externalagent",
          // Meta's second indexer token used for AI model grounding
          "meta-externalfetcher",
          "FacebookBot",
          "Applebot",
          "Applebot-Extended",
          "Amazonbot",
          "YouBot",
          "CCBot",
          "DeepSeekBot",
          "MistralAI",
          // Le Chat's answer-time fetch agent (distinct from MistralAI trainer)
          "MistralAI-User",
          "BraveBot",
          "cohere-ai",
          "DuckAssistBot",
          "ImagesiftBot",
          "Diffbot",
          "omgili",
          "omgilibot",
          // TikTok's search index crawler — TikTok search surfaces web results
          "TikTokSpider",
          "Bytespider",
        ],
        allow: ["/", ...AI_API_ALLOW],
        disallow: [...DISALLOW],
      },
      {
        userAgent: [
          "SemrushBot-SA",
          "MegaIndex",
          "BLEXBot",
          "DataForSeoBot",
          "PetalBot",
          "ZoominfoBot",
        ],
        disallow: "/",
      },
    ],
    sitemap: [
      `${baseUrl}/sitemap.xml`,
      `${baseUrl}/sitemap-images.xml`,
      `${baseUrl}/sitemap-news.xml`,
      `${baseUrl}/sitemap-index.xml`,
    ],
    host: baseUrl,
  };
}
