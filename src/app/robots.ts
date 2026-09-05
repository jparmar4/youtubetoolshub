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
 */
const DISALLOW = [
  "/api/",
  "/search",
  "/sign-in",
  "/dashboard",
  "/history",
  "/upgrade",
  "/auth/",
  "/_next/data/",
  "/cdn-cgi/",
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
          "PerplexityBot",
          "ClaudeBot",
          "anthropic-ai",
          "Google-Extended",
          "Applebot-Extended",
          "cohere-ai",
        ],
        allow: "/",
        disallow: [...DISALLOW],
      },
      {
        userAgent: [
          "SemrushBot-SA",
          "MegaIndex",
          "BLEXBot",
          "DataForSeoBot",
          "Bytespider",
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
