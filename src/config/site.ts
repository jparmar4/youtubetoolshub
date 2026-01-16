// Site Configuration - All branding and settings in one place

export const siteConfig = {
  // Branding
  name: "YouTube Tools Hub",
  tagline: "All-in-One YouTube Automation Tools – Free & Fast",
  description: "Free YouTube tools for creators: thumbnail downloader, title generator, tag extractor, earnings calculator, and more. Boost your channel growth with AI-powered automation.",

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
  },

  // SEO Defaults
  seo: {
    titleTemplate: "%s | YouTube Tools Hub",
    defaultTitle: "YouTube Tools Hub – 15+ FREE AI Tools for Creators ✓ No Signup",
    defaultDescription: "🚀 Grow your YouTube channel FAST with 15+ free AI tools. Download HD thumbnails, generate viral titles & optimize tags instantly. Zero signup. 100% free.",
    keywords: [
      // High-CPC Core Keywords (Finance/Business Intent)
      "youtube monetization calculator",
      "youtube earnings estimator",
      "youtube cpm rates by country",
      "youtube revenue calculator usa",
      "how much youtube pays per view",
      "youtube adsense earnings",
      "youtube sponsorship rates",
      "youtube creator income",

      // High-CPC Business/Software Keywords
      "youtube automation software",
      "best youtube marketing tools",
      "youtube seo software free",
      "professional youtube tools",
      "youtube analytics dashboard",
      "youtube growth software",
      "ai youtube optimization",
      "youtube business tools",

      // High-CPC Creator Professional Keywords
      "youtube channel management tools",
      "youtube content strategy tools",
      "youtube thumbnail design software",
      "youtube title optimizer",
      "youtube tag research tool",
      "video marketing automation",

      // US-Targeted High Intent Keywords
      "best youtube tools usa 2026",
      "youtube creator toolkit america",
      "free youtube tools for professionals",
      "youtube monetization guide usa",
      "youtube partner program calculator",

      // Long-tail High-CPC Keywords
      "how to make money on youtube 2026",
      "youtube faceless channel income",
      "youtube shorts monetization rates",
      "youtube studio alternatives free",
      "ai tools for youtube creators",
      "youtube growth strategy tools",

      // Premium Advertiser Trigger Keywords
      "youtube business account setup",
      "youtube channel investment",
      "youtube creator economy tools",
      "professional content creation",
      "video marketing roi calculator"
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
