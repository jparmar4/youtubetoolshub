// Site Configuration - All branding and settings in one place

export const siteConfig = {
  // Branding
  name: "YouTube Tools Hub",
  tagline: "The World's #1 Suite of Free YouTube Growth & AI Tools 2026",
  description: "🔥 Trusted by 50,000+ creators. YouTube Tools Hub is the definitive free suite for channel automation, SEO, and growth. Calculate earnings, generate viral titles, download HD thumbnails, and optimize your channel for the 2026 algorithm instantly.",

  // URLs
  url: "https://www.youtubetoolshub.com",

  // Colors (used as CSS variables)
  // Colors (used as CSS variables)
  colors: {
    primary: "#a855f7", // Purple 500
    primaryDark: "#7e22ce", // Purple 700
    secondary: "#0f0518", // Deep Violet
    accent: "#e879f9", // Fuchsia 400
    success: "#34d399",
    warning: "#fbbf24",
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
    resources: [
      { name: "YT Tools Hub vs TubeBuddy", href: "/tools/vs/tubebuddy" },
      { name: "YT Tools Hub vs VidIQ", href: "/tools/vs/vidiq" },
      { name: "Why Choose Us", href: "/blog/why-youtube-tools-hub" },
    ],
  },

  // SEO Defaults
  seo: {
    titleTemplate: "%s | YouTube Tools Hub",
    defaultTitle: "YouTube Tools Hub – #1 Free AI Tools for Thumbnail Generation & Growth (2026)",
    defaultDescription: "🚀 Start Now with the world's most advanced YouTube Tools Hub. Get 15+ free AI tools: HD thumbnail generator, viral title optimizer, ROI calculator & growth suite. 100% free.",
    keywords: [
      // High-CPC Core Keywords (Finance/Business Intent)
      "youtube monetization calculator 2026",
      "youtube earnings estimator tool",
      "youtube cpm rates by country 2026",
      "youtube revenue calculator usa",
      "how much youtube pays per view",
      "youtube adsense earnings calculator",
      "youtube sponsorship rates finder",
      "youtube creator income estimator",
      "youtube revenue per view calculator",

      // High-CPC Business/Software Keywords
      "youtube automation software free",
      "best youtube marketing tools 2026",
      "youtube seo software free",
      "professional youtube growth tools",
      "youtube analytics dashboard free",
      "youtube growth software for creators",
      "ai youtube optimization tool",
      "youtube business tools suite",
      "youtube competition analysis free",

      // High-CPC Creator Professional Keywords
      "youtube channel management tools",
      "youtube content strategy tools",
      "youtube thumbnail design online free",
      "youtube title optimizer ai",
      "youtube tag research tool free",
      "video marketing automation software",
      "youtube subscriber growth tools",

      // US-Targeted High Intent Keywords
      "best youtube tools usa 2026",
      "youtube creator toolkit america",
      "free youtube tools for professionals",
      "youtube monetization guide usa",
      "youtube partner program calculator",
      "youtube tax calculator for creators",

      // Long-tail High-CPC Keywords
      "how to make money on youtube 2026",
      "youtube faceless channel income guide",
      "youtube shorts monetization rates 2026",
      "youtube studio alternatives free",
      "ai tools for youtube creators no sign up",
      "youtube growth strategy tools 2026",
      "youtube algorithm hack tools",

      // Premium Advertiser Trigger Keywords
      "youtube business account setup",
      "youtube channel investment advice",
      "youtube creator economy tools",
      "professional content creation suite",
      "video marketing roi calculator",
      "youtube advertising cost estimator",

      // AI Specific High-Value Keywords
      "ai youtube video summarizer free",
      "youtube script generator ai free",
      "ai youtube description generator",
      "free ai tools for youtubers 2026",
      "youtube channel name generator ai"
    ],
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: "YouTube Tools Hub",
    },
    indexNow: {
      key: process.env.INDEXNOW_KEY || "01d46652569c40eaa19149073834de57",
      url: "https://www.youtubetoolshub.com",
    },
  },

  // Contact
  contact: {
    email: "support@youtubetoolshub.com",
  },
};

export type SiteConfig = typeof siteConfig;
