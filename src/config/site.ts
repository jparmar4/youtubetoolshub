// Site Configuration - All branding and settings in one place

export const siteConfig = {
  // Branding
  name: "YouTube Tools Hub",
  tagline: "All-in-One YouTube Automation Tools – Free & Fast",
  description: "Free YouTube tools for creators: thumbnail downloader, title generator, tag extractor, earnings calculator, and more. Boost your channel growth with AI-powered automation.",

  // URLs
  url: "https://www.youtubetoolshub.com",

  // Colors (used as CSS variables)
  colors: {
    primary: "#db2777", // Pink 600
    primaryDark: "#be185d", // Pink 700
    secondary: "#0f172a", // Slate 900
    accent: "#f472b6", // Pink 400
    success: "#22c55e",
    warning: "#eab308",
    error: "#ef4444",
  },

  // Navigation
  nav: [
    { name: "Home", href: "/" },
    { name: "Tools", href: "/tools" },
    { name: "Blog", href: "/blog" },
    { name: "Pricing", href: "/pricing" },
    { name: "About", href: "/about" },
  ],

  // Footer Links
  footerLinks: {
    legal: [
      { name: "Privacy Policy", href: "/privacy-policy" },
      { name: "Terms of Use", href: "/terms-of-use" },
      { name: "Refund Policy", href: "/refund-policy" },
      { name: "Disclaimer", href: "/disclaimer" },
      { name: "Contact", href: "/contact" },
    ],
    social: [
      { name: "Telegram", href: "https://t.me/youtubetoolshub", icon: "telegram" },
      { name: "Facebook", href: "https://www.facebook.com/profile.php?id=61585430621256", icon: "facebook" },
    ],
  },

  // SEO Defaults
  seo: {
    titleTemplate: "%s | YouTube Tools Hub",
    defaultTitle: "YouTube Tools Hub - Free YouTube Automation & SEO Tools",
    defaultDescription: "Boost your YouTube growth with our free AI-powered tools. Thumbnail downloader, title generator, earnings calculator, and tags extractor. No signup required.",
    keywords: [
      // Core English Keywords
      "youtube tools",
      "youtube thumbnail downloader",
      "youtube seo tools free",
      "youtube title generator",
      "youtube tag extractor",
      "youtube automation tools",
      "youtube earnings calculator",
      "youtube channel growth",
      "ai content generator for youtube",
      "free youtube analytics",
      "video marketing tools",
      "content creator toolkit",

      // Long-tail AEO Queries (Answer Engine Optimization)
      "how to grow youtube channel 2026",
      "best free youtube tools for small channels",
      "youtube monetization requirements calculator",
      "ai tool for youtube video ideas",
      "generate viral youtube titles free",
      "download youtube thumbnail high quality 4k",

      // Global/Multilingual Intent (GEO)
      "descargar miniatuaras youtube", // Spanish
      "ferramentas youtube gratis", // Portuguese
      "youtube seo optimierung", // German
      "outils youtube gratuit", // French
      "youtube tag generator hindi",
      "free youtube tools usa",
      "youtube growth tools uk",
      "youtube analytics australia",
      "canada youtube creator tools"
    ],
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: "YouTube Tools Hub",
    },
  },

  // Contact
  contact: {
    email: "support@youtubetoolshub.com",
  },
};

export type SiteConfig = typeof siteConfig;
