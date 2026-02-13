import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

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
          "/api/ai-context",
          "/api/tools",
          "/api/faqs",
          "/api-docs",
          "/atom.xml",
        ],
        disallow: [
          "/api/",
          "/sign-in",
          "/dashboard",
          "/history",
          "/upgrade",
          "/auth/",
          "/_next/static/chunks/",
          "/_next/data/",
          "/cdn-cgi/",
        ],
      },

      // ─── Google (Core Search + AI Overviews / SGE) ───
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: [
          "/api/",
          "/sign-in",
          "/dashboard",
          "/history",
          "/upgrade",
          "/auth/",
        ],
      },
      {
        userAgent: "Googlebot-Image",
        allow: ["/images/", "/og-image.png", "/_next/image"],
        disallow: ["/api/"],
      },
      {
        userAgent: "Google-Extended",
        allow: "/",
        disallow: [
          "/api/",
          "/sign-in",
          "/dashboard",
          "/history",
          "/upgrade",
          "/auth/",
        ],
      },
      {
        userAgent: "GoogleOther",
        allow: "/",
        disallow: [
          "/api/",
          "/sign-in",
          "/dashboard",
          "/history",
          "/upgrade",
          "/auth/",
        ],
      },

      // ─── Bing / Microsoft Copilot ───
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: [
          "/api/",
          "/sign-in",
          "/dashboard",
          "/history",
          "/upgrade",
          "/auth/",
        ],
      },
      {
        userAgent: "BingPreview",
        allow: "/",
        disallow: ["/api/", "/sign-in"],
      },
      {
        userAgent: "MicrosoftPreview",
        allow: "/",
        disallow: ["/api/", "/sign-in"],
      },

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
        disallow: [
          "/api/",
          "/sign-in",
          "/dashboard",
          "/history",
          "/upgrade",
          "/auth/",
        ],
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
        disallow: [
          "/api/",
          "/sign-in",
          "/dashboard",
          "/history",
          "/upgrade",
          "/auth/",
        ],
      },
      {
        userAgent: "OAI-SearchBot",
        allow: "/",
        disallow: [
          "/api/",
          "/sign-in",
          "/dashboard",
          "/history",
          "/upgrade",
          "/auth/",
        ],
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
        disallow: [
          "/api/",
          "/sign-in",
          "/dashboard",
          "/history",
          "/upgrade",
          "/auth/",
        ],
      },
      {
        userAgent: "Claude-Web",
        allow: "/",
        disallow: [
          "/api/",
          "/sign-in",
          "/dashboard",
          "/history",
          "/upgrade",
          "/auth/",
        ],
      },
      {
        userAgent: "anthropic-ai",
        allow: "/",
        disallow: [
          "/api/",
          "/sign-in",
          "/dashboard",
          "/history",
          "/upgrade",
          "/auth/",
        ],
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
        disallow: [
          "/api/",
          "/sign-in",
          "/dashboard",
          "/history",
          "/upgrade",
          "/auth/",
        ],
      },

      // ─── Meta AI ───
      {
        userAgent: "meta-externalagent",
        allow: "/",
        disallow: [
          "/api/",
          "/sign-in",
          "/dashboard",
          "/history",
          "/upgrade",
          "/auth/",
        ],
      },
      {
        userAgent: "FacebookBot",
        allow: "/",
        disallow: [
          "/api/",
          "/sign-in",
          "/dashboard",
          "/history",
          "/upgrade",
          "/auth/",
        ],
      },
      {
        userAgent: "meta-ai",
        allow: "/",
        disallow: [
          "/api/",
          "/sign-in",
          "/dashboard",
          "/history",
          "/upgrade",
          "/auth/",
        ],
      },

      // ─── Apple (Siri / Apple Intelligence / Applebot) ───
      {
        userAgent: "Applebot",
        allow: "/",
        disallow: [
          "/api/",
          "/sign-in",
          "/dashboard",
          "/history",
          "/upgrade",
          "/auth/",
        ],
      },
      {
        userAgent: "Applebot-Extended",
        allow: "/",
        disallow: [
          "/api/",
          "/sign-in",
          "/dashboard",
          "/history",
          "/upgrade",
          "/auth/",
        ],
      },

      // ─── You.com AI ───
      {
        userAgent: "YouBot",
        allow: "/",
        disallow: [
          "/api/",
          "/sign-in",
          "/dashboard",
          "/history",
          "/upgrade",
          "/auth/",
        ],
      },

      // ─── Cohere AI ───
      {
        userAgent: "cohere-ai",
        allow: "/",
        disallow: [
          "/api/",
          "/sign-in",
          "/dashboard",
          "/history",
          "/upgrade",
          "/auth/",
        ],
      },

      // ─── Google Gemini / Vertex AI ───
      {
        userAgent: "Google-CloudVertexBot",
        allow: "/",
        disallow: [
          "/api/",
          "/sign-in",
          "/dashboard",
          "/history",
          "/upgrade",
          "/auth/",
        ],
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
        disallow: [
          "/api/",
          "/sign-in",
          "/dashboard",
          "/history",
          "/upgrade",
          "/auth/",
        ],
      },
      {
        userAgent: "Grok",
        allow: "/",
        disallow: [
          "/api/",
          "/sign-in",
          "/dashboard",
          "/history",
          "/upgrade",
          "/auth/",
        ],
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
        disallow: [
          "/api/",
          "/sign-in",
          "/dashboard",
          "/history",
          "/upgrade",
          "/auth/",
        ],
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
        disallow: [
          "/api/",
          "/sign-in",
          "/dashboard",
          "/history",
          "/upgrade",
          "/auth/",
        ],
      },

      // ─── Brave Search ───
      {
        userAgent: "BraveBot",
        allow: "/",
        disallow: [
          "/api/",
          "/sign-in",
          "/dashboard",
          "/history",
          "/upgrade",
          "/auth/",
        ],
      },

      // ─── Amazon / Alexa AI ───
      {
        userAgent: "Amazonbot",
        allow: "/",
        disallow: [
          "/api/",
          "/sign-in",
          "/dashboard",
          "/history",
          "/upgrade",
          "/auth/",
        ],
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
        disallow: [
          "/api/",
          "/sign-in",
          "/dashboard",
          "/history",
          "/upgrade",
          "/auth/",
        ],
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
        disallow: [
          "/api/",
          "/sign-in",
          "/dashboard",
          "/history",
          "/upgrade",
          "/auth/",
        ],
      },

      // ─── Neeva / Snowflake AI ───
      {
        userAgent: "NeevaBot",
        allow: "/",
        disallow: [
          "/api/",
          "/sign-in",
          "/dashboard",
          "/history",
          "/upgrade",
          "/auth/",
        ],
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
        disallow: [
          "/api/",
          "/sign-in",
          "/dashboard",
          "/history",
          "/upgrade",
          "/auth/",
        ],
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
        disallow: [
          "/api/",
          "/sign-in",
          "/dashboard",
          "/history",
          "/upgrade",
          "/auth/",
        ],
      },

      // ─── Yandex (Russia / international search) ───
      {
        userAgent: "YandexBot",
        allow: "/",
        disallow: [
          "/api/",
          "/sign-in",
          "/dashboard",
          "/history",
          "/upgrade",
          "/auth/",
        ],
      },

      // ─── DuckDuckGo (popular in US/EU Tier 1 markets) ───
      {
        userAgent: "DuckDuckBot",
        allow: "/",
        disallow: [
          "/api/",
          "/sign-in",
          "/dashboard",
          "/history",
          "/upgrade",
          "/auth/",
        ],
      },

      // ─── Baidu (China) ───
      {
        userAgent: "Baiduspider",
        allow: "/",
        disallow: [
          "/api/",
          "/sign-in",
          "/dashboard",
          "/history",
          "/upgrade",
          "/auth/",
        ],
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
        disallow: [
          "/api/",
          "/sign-in",
          "/dashboard",
          "/history",
          "/upgrade",
          "/auth/",
        ],
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
        disallow: [
          "/api/",
          "/sign-in",
          "/dashboard",
          "/history",
          "/upgrade",
          "/auth/",
        ],
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
      `${baseUrl}/sitemap_index.xml`,
      `${baseUrl}/llms.txt`,
    ],

    // ─── Host directive (canonical domain) ───
    host: baseUrl,
  };
}
