import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable React Strict Mode for better development
  reactStrictMode: true,

  // Optimize images
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },

  // Enable compression
  compress: true,

  // Optimize production builds
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  // Experimental features for better performance
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ["react-icons", "lucide-react", "framer-motion"],
  },

  // Headers for caching, security, SEO, and AI crawler optimization
  async headers() {
    return [
      // ─── Static assets: aggressive immutable caching (1 year) ───
      {
        source: "/:path*.(svg|jpg|jpeg|png|webp|avif|ico|woff|woff2|ttf|eot)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
          {
            key: "Expires",
            value: new Date(Date.now() + 31536000000).toUTCString(),
          },
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
        ],
      },

      // ─── JS/CSS bundles: long cache with revalidation ───
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },

      // ─── Global security + SEO headers (all routes) ───
      {
        source: "/:path*",
        headers: [
          // DNS & connection optimization
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          // Prevent MIME-type sniffing attacks
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          // Prevent clickjacking (allow only same-origin framing)
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          // XSS protection (legacy browsers)
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          // HSTS: Force HTTPS for 1 year (critical for SEO trust signal)
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
          // Referrer Policy: Send full URL on same-origin, origin-only cross-origin
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          // Permissions Policy: Disable unused browser APIs for security score
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), interest-cohort=(), browsing-topics=()",
          },
          // Cross-Origin policies for embedding security
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin-allow-popups",
          },
          {
            key: "Cross-Origin-Resource-Policy",
            value: "cross-origin",
          },
          // Content-Security-Policy: Balanced for AdSense + Analytics + Clarity
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://pagead2.googlesyndication.com https://adservice.google.com https://www.clarity.ms https://tpc.googlesyndication.com https://ep1.adtrafficquality.google https://ep2.adtrafficquality.google",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "img-src 'self' data: blob: https: http:",
              "font-src 'self' https://fonts.gstatic.com",
              "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://pagead2.googlesyndication.com https://www.clarity.ms https://*.clarity.ms https://ep1.adtrafficquality.google https://ep2.adtrafficquality.google https://*.googleapis.com",
              "frame-src 'self' https://googleads.g.doubleclick.net https://tpc.googlesyndication.com https://www.google.com https://ep1.adtrafficquality.google https://ep2.adtrafficquality.google",
              "frame-ancestors 'self'",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "upgrade-insecure-requests",
            ].join("; "),
          },
        ],
      },

      // ─── AI Plugin JSON: OpenAI discovery protocol ───
      {
        source: "/.well-known/ai-plugin.json",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=3600, s-maxage=7200, stale-while-revalidate=43200",
          },
          {
            key: "Content-Type",
            value: "application/json; charset=utf-8",
          },
          {
            key: "X-Robots-Tag",
            value: "index, follow, noarchive",
          },
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
        ],
      },

      // ─── Security.txt: RFC 9116 trust signal ───
      {
        source: "/.well-known/security.txt",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800",
          },
          {
            key: "Content-Type",
            value: "text/plain; charset=utf-8",
          },
        ],
      },

      // ─── Atom Feed: preferred by many AI crawlers ───
      {
        source: "/atom.xml",
        headers: [
          {
            key: "Cache-Control",
            value: "public, s-maxage=1200, stale-while-revalidate=600",
          },
          {
            key: "Content-Type",
            value: "application/atom+xml; charset=utf-8",
          },
          {
            key: "X-Robots-Tag",
            value: "index, follow, noarchive",
          },
        ],
      },

      // ─── AI Context API: structured entity data for AI systems ───
      {
        source: "/api/ai-context",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=3600, s-maxage=7200, stale-while-revalidate=43200",
          },
          {
            key: "X-Robots-Tag",
            value: "index, follow, noarchive",
          },
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
        ],
      },

      // ─── Sitemap: moderate caching, frequent revalidation ───
      {
        source: "/sitemap.xml",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=3600, s-maxage=7200, stale-while-revalidate=86400",
          },
          {
            key: "Content-Type",
            value: "application/xml; charset=utf-8",
          },
        ],
      },
      {
        source: "/sitemap_index.xml",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=3600, s-maxage=7200, stale-while-revalidate=86400",
          },
          {
            key: "Content-Type",
            value: "application/xml; charset=utf-8",
          },
        ],
      },

      // ─── Robots.txt: moderate caching ───
      {
        source: "/robots.txt",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=3600, s-maxage=7200, stale-while-revalidate=86400",
          },
          {
            key: "X-Robots-Tag",
            value: "index, follow",
          },
        ],
      },

      // ─── AI Crawler Discovery Files: cache but allow frequent updates ───
      {
        source: "/llms.txt",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=3600, s-maxage=7200, stale-while-revalidate=43200",
          },
          {
            key: "Content-Type",
            value: "text/plain; charset=utf-8",
          },
          {
            key: "X-Robots-Tag",
            value: "index, follow, noarchive",
          },
        ],
      },
      {
        source: "/llms-full.txt",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=3600, s-maxage=7200, stale-while-revalidate=43200",
          },
          {
            key: "Content-Type",
            value: "text/plain; charset=utf-8",
          },
          {
            key: "X-Robots-Tag",
            value: "index, follow, noarchive",
          },
        ],
      },
      {
        source: "/.well-known/ai.txt",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=3600, s-maxage=7200, stale-while-revalidate=43200",
          },
          {
            key: "Content-Type",
            value: "text/plain; charset=utf-8",
          },
          {
            key: "X-Robots-Tag",
            value: "index, follow, noarchive",
          },
        ],
      },
      {
        source: "/.well-known/authors.txt",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800",
          },
          {
            key: "Content-Type",
            value: "text/plain; charset=utf-8",
          },
        ],
      },

      // ─── .well-known directory: general catch-all for AI discovery ───
      {
        source: "/.well-known/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          {
            key: "X-Robots-Tag",
            value: "index, follow, noarchive",
          },
        ],
      },

      // ─── RSS/Atom Feed: cache with stale-while-revalidate ───
      {
        source: "/feed.xml",
        headers: [
          {
            key: "Cache-Control",
            value: "public, s-maxage=1200, stale-while-revalidate=600",
          },
          {
            key: "Content-Type",
            value: "application/xml; charset=utf-8",
          },
        ],
      },

      // ─── Ads.txt: long cache (changes rarely) ───
      {
        source: "/ads.txt",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, s-maxage=86400",
          },
          {
            key: "Content-Type",
            value: "text/plain; charset=utf-8",
          },
        ],
      },

      // ─── IndexNow verification key file ───
      {
        source: "/01d46652569c40eaa19149073834de57.txt",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400",
          },
          {
            key: "Content-Type",
            value: "text/plain; charset=utf-8",
          },
        ],
      },

      // ─── Authors.txt at root (alias) ───
      {
        source: "/authors.txt",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800",
          },
          {
            key: "Content-Type",
            value: "text/plain; charset=utf-8",
          },
          {
            key: "X-Robots-Tag",
            value: "index, follow",
          },
        ],
      },

      // ─── Tool pages: moderate caching for fresh content + good perf ───
      {
        source: "/tools/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, s-maxage=3600, stale-while-revalidate=86400",
          },
        ],
      },

      // ─── Blog pages: cache with daily revalidation ───
      {
        source: "/blog/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, s-maxage=7200, stale-while-revalidate=86400",
          },
        ],
      },
    ];
  },

  // Powered by header removal for security
  poweredByHeader: false,
};

export default nextConfig;
