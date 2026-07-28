import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

/** App / thin / private paths — never crawl or index in search */
const PRIVATE_DISALLOW = [
  "/api/",
  "/search",
  "/sign-in",
  "/dashboard",
  "/history",
  "/upgrade",
  "/auth/",
] as const;

const DEFAULT_DISALLOW = [
  ...PRIVATE_DISALLOW,
  "/_next/data/",
  "/cdn-cgi/",
] as const;

type RobotsRule = {
  userAgent: string | string[];
  allow?: string | string[];
  disallow?: string | string[];
};

/** Full site access except private paths (most major crawlers) */
function allowAllPrivateDisallow(userAgent: string | string[]): RobotsRule {
  return {
    userAgent,
    allow: "/",
    disallow: [...PRIVATE_DISALLOW],
  };
}

export default function robots(): MetadataRoute.Robots {
  const baseUrl = siteConfig.url;

  return {
    rules: [
      // ─── Default: All well-behaved crawlers ───
      {
        userAgent: "*",
        allow: [
          "/",
          "/tools/",
          "/blog/",
          "/about",
          "/contact",
          "/faq",
          "/resources/",
          "/pricing",
          "/privacy-policy",
          "/terms-of-use",
          "/disclaimer",
          "/refund-policy",
          "/llms.txt",
          "/llms-full.txt",
          "/.well-known/",
          // Structured AI context only (other /api/* JSON is noindex + disallowed)
          "/api/ai-context",
          "/api-docs",
          "/atom.xml",
          "/feed.xml",
          "/feed",
        ],
        disallow: [...DEFAULT_DISALLOW],
      },

      // ─── Google (Core Search + AI Overviews / SGE) ───
      allowAllPrivateDisallow("Googlebot"),
      {
        userAgent: "Googlebot-Image",
        allow: ["/images/", "/og-image.png", "/_next/image"],
        disallow: ["/api/"],
      },
      allowAllPrivateDisallow("Google-Extended"),
      allowAllPrivateDisallow("GoogleOther"),

      // ─── Bing / Microsoft Copilot ───
      allowAllPrivateDisallow("Bingbot"),
      allowAllPrivateDisallow("BingPreview"),
      allowAllPrivateDisallow("MicrosoftPreview"),

      // ─── OpenAI / ChatGPT / SearchGPT ───
      {
        userAgent: "GPTBot",
        allow: [
          "/",
          "/tools/",
          "/blog/",
          "/about",
          "/faq",
          "/resources/",
          "/llms.txt",
          "/llms-full.txt",
          "/.well-known/",
          "/api/ai-context",
          "/atom.xml",
        ],
        disallow: [...PRIVATE_DISALLOW],
      },
      {
        userAgent: "ChatGPT-User",
        allow: [
          "/",
          "/tools/",
          "/blog/",
          "/about",
          "/faq",
          "/resources/",
          "/llms.txt",
          "/llms-full.txt",
          "/.well-known/",
          "/api/ai-context",
          "/atom.xml",
        ],
        disallow: [...PRIVATE_DISALLOW],
      },
      {
        userAgent: "OAI-SearchBot",
        allow: "/",
        disallow: [...PRIVATE_DISALLOW],
      },

      // ─── Anthropic / Claude ───
      {
        userAgent: "ClaudeBot",
        allow: [
          "/",
          "/tools/",
          "/blog/",
          "/about",
          "/faq",
          "/resources/",
          "/llms.txt",
          "/llms-full.txt",
          "/.well-known/",
          "/api/ai-context",
          "/atom.xml",
        ],
        disallow: [...PRIVATE_DISALLOW],
      },
      {
        userAgent: "Claude-Web",
        allow: "/",
        disallow: [...PRIVATE_DISALLOW],
      },
      {
        userAgent: "anthropic-ai",
        allow: "/",
        disallow: [...PRIVATE_DISALLOW],
      },

      // ─── Perplexity AI ───
      {
        userAgent: "PerplexityBot",
        allow: [
          "/",
          "/tools/",
          "/blog/",
          "/about",
          "/faq",
          "/resources/",
          "/llms.txt",
          "/llms-full.txt",
          "/.well-known/",
          "/api/ai-context",
          "/atom.xml",
        ],
        disallow: [...PRIVATE_DISALLOW],
      },

      // ─── Meta AI ───
      {
        userAgent: "meta-externalagent",
        allow: "/",
        disallow: [...PRIVATE_DISALLOW],
      },
      {
        userAgent: "FacebookBot",
        allow: "/",
        disallow: [...PRIVATE_DISALLOW],
      },
      {
        userAgent: "meta-ai",
        allow: "/",
        disallow: [...PRIVATE_DISALLOW],
      },

      // ─── Apple (Siri / Apple Intelligence / Applebot) ───
      {
        userAgent: "Applebot",
        allow: "/",
        disallow: [...PRIVATE_DISALLOW],
      },
      {
        userAgent: "Applebot-Extended",
        allow: "/",
        disallow: [...PRIVATE_DISALLOW],
      },

      // ─── You.com AI ───
      {
        userAgent: "YouBot",
        allow: "/",
        disallow: [...PRIVATE_DISALLOW],
      },

      // ─── Cohere AI ───
      {
        userAgent: "cohere-ai",
        allow: "/",
        disallow: [...PRIVATE_DISALLOW],
      },

      // ─── Google Gemini / Vertex AI ───
      {
        userAgent: "Google-CloudVertexBot",
        allow: "/",
        disallow: [...PRIVATE_DISALLOW],
      },
      {
        userAgent: "GoogleOther-Image",
        allow: ["/images/", "/og-image.png", "/_next/image"],
        disallow: ["/api/"],
      },

      // ─── xAI / Grok ───
      {
        userAgent: "xAI-Grok",
        allow: [
          "/",
          "/tools/",
          "/blog/",
          "/about",
          "/faq",
          "/resources/",
          "/llms.txt",
          "/llms-full.txt",
          "/.well-known/",
          "/api/ai-context",
          "/atom.xml",
        ],
        disallow: [...PRIVATE_DISALLOW],
      },
      {
        userAgent: "Grok",
        allow: "/",
        disallow: [...PRIVATE_DISALLOW],
      },

      // ─── DeepSeek AI ───
      {
        userAgent: "DeepSeekBot",
        allow: [
          "/",
          "/tools/",
          "/blog/",
          "/about",
          "/faq",
          "/resources/",
          "/llms.txt",
          "/llms-full.txt",
          "/.well-known/",
          "/api/ai-context",
          "/atom.xml",
        ],
        disallow: [...PRIVATE_DISALLOW],
      },

      // ─── Mistral AI ───
      {
        userAgent: "MistralBot",
        allow: [
          "/",
          "/tools/",
          "/blog/",
          "/about",
          "/faq",
          "/resources/",
          "/llms.txt",
          "/llms-full.txt",
          "/.well-known/",
          "/api/ai-context",
          "/atom.xml",
        ],
        disallow: [...PRIVATE_DISALLOW],
      },

      // ─── Brave Search ───
      {
        userAgent: "BraveBot",
        allow: "/",
        disallow: [...PRIVATE_DISALLOW],
      },

      // ─── Amazon / Alexa AI ───
      {
        userAgent: "Amazonbot",
        allow: "/",
        disallow: [...PRIVATE_DISALLOW],
      },

      // ─── AI2 (Allen Institute for AI) ───
      {
        userAgent: "Ai2Bot",
        allow: [
          "/",
          "/tools/",
          "/blog/",
          "/about",
          "/faq",
          "/resources/",
          "/llms.txt",
          "/llms-full.txt",
          "/.well-known/",
          "/api/ai-context",
          "/atom.xml",
        ],
        disallow: [...PRIVATE_DISALLOW],
      },
      {
        userAgent: "AI2Bot-Dolma",
        allow: [
          "/",
          "/tools/",
          "/blog/",
          "/about",
          "/faq",
          "/resources/",
          "/llms.txt",
          "/llms-full.txt",
        ],
        disallow: [...PRIVATE_DISALLOW],
      },

      // ─── Google Gemini / AI Mode ───
      {
        userAgent: "Gemini-Web",
        allow: "/",
        disallow: [...PRIVATE_DISALLOW],
      },

      // ─── AI21 Labs (Jamba / J2) ───
      {
        userAgent: "AI21Bot",
        allow: [
          "/",
          "/tools/",
          "/blog/",
          "/about",
          "/faq",
          "/resources/",
          "/llms.txt",
          "/llms-full.txt",
          "/.well-known/",
          "/api/ai-context",
        ],
        disallow: [...PRIVATE_DISALLOW],
      },

      // ─── WriteSonic / Chatsonic ───
      {
        userAgent: "WriteSonicBot",
        allow: "/",
        disallow: [...PRIVATE_DISALLOW],
      },

      // ─── Semrush AI / AI-powered crawlers ───
      {
        userAgent: "SemrushBot-AI",
        allow: "/",
        disallow: [...PRIVATE_DISALLOW],
      },

      // ─── Neeva / Snowflake AI ───
      {
        userAgent: "NeevaBot",
        allow: "/",
        disallow: [...PRIVATE_DISALLOW],
      },

      // ─── Webz.io (AI data feed) ───
      {
        userAgent: "webz.io",
        allow: [
          "/",
          "/tools/",
          "/blog/",
          "/about",
          "/faq",
          "/llms.txt",
          "/llms-full.txt",
        ],
        disallow: [...PRIVATE_DISALLOW],
      },

      // ─── Common Crawl (feeds many AI training datasets) ───
      {
        userAgent: "CCBot",
        allow: [
          "/",
          "/tools/",
          "/blog/",
          "/about",
          "/faq",
          "/resources/",
          "/llms.txt",
          "/llms-full.txt",
          "/.well-known/",
          "/api/ai-context",
          "/atom.xml",
        ],
        disallow: [...PRIVATE_DISALLOW],
      },

      // ─── Yandex (Russia / international search) ───
      {
        userAgent: "YandexBot",
        allow: "/",
        disallow: [...PRIVATE_DISALLOW],
      },

      // ─── DuckDuckGo (popular in US/EU Tier 1 markets) ───
      {
        userAgent: "DuckDuckBot",
        allow: "/",
        disallow: [...PRIVATE_DISALLOW],
      },

      // ─── Baidu (China) ───
      {
        userAgent: "Baiduspider",
        allow: "/",
        disallow: [...PRIVATE_DISALLOW],
      },

      // ─── Social Media Preview Crawlers ───
      {
        userAgent: [
          "Slackbot",
          "TelegramBot",
          "WhatsApp",
          "LinkedInBot",
          "Twitterbot",
          "Discordbot",
          "PinterestBot",
          "Pinterestbot",
        ],
        allow: "/",
        disallow: [...PRIVATE_DISALLOW],
      },

      // ─── SEO / Site Audit Tools ───
      {
        userAgent: [
          "AhrefsBot",
          "SemrushBot",
          "MJ12bot",
          "DotBot",
          "Screaming Frog SEO Spider",
          "rogerbot",
          "SiteAuditBot",
        ],
        allow: "/",
        disallow: [...PRIVATE_DISALLOW],
      },

      // ─── Exa AI (neural search) ───
      {
        userAgent: "ExaBot",
        allow: [
          "/",
          "/tools/",
          "/blog/",
          "/about",
          "/faq",
          "/resources/",
          "/llms.txt",
          "/llms-full.txt",
          "/api/ai-context",
        ],
        disallow: [...PRIVATE_DISALLOW],
      },

      // ─── Nvidia / AI Research crawlers ───
      {
        userAgent: "NvidiaBot",
        allow: "/",
        disallow: [...PRIVATE_DISALLOW],
      },

      // ─── Block known bad / resource-heavy bots ───
      {
        userAgent: [
          "SemrushBot-SA",
          "MegaIndex",
          "BLEXBot",
          "DataForSeoBot",
          "Bytespider",
          "PetalBot",
          "ZoominfoBot",
          "GPTBot-Legacy",
        ],
        disallow: "/",
      },
    ],

    // ─── Sitemaps ───
    sitemap: [
      `${baseUrl}/sitemap.xml`,
      `${baseUrl}/sitemap-index.xml`,
      `${baseUrl}/sitemap-images.xml`,
      `${baseUrl}/sitemap-news.xml`,
    ],

    // ─── Host directive (canonical domain) ───
    host: baseUrl,
  };
}
