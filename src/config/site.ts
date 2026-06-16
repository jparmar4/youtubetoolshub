// Site Configuration - All branding and settings in one place

export const siteConfig = {
  // Branding
  name: "YouTube Tools Hub",
  tagline: "Free YouTube Growth & AI Tools Suite 2026",
  description:
    "YouTube Tools Hub is a free suite of 27+ creator tools for YouTube channel growth, SEO, and planning. Calculate earnings, generate title ideas, download HD thumbnails, and improve your creator workflow with no signup required.",

  // URLs
  url: "https://www.youtubetoolshub.com",
  language: "en",
  locale: "en_US",
  globalMarkets: [
    "United States",
    "United Kingdom",
    "Canada",
    "Australia",
    "India",
    "Germany",
    "France",
    "Netherlands",
    "Singapore",
    "United Arab Emirates",
    "Brazil",
    "Mexico",
    "South Africa",
    "Nigeria",
    "Worldwide",
  ],

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
      {
        name: "Telegram",
        href: "https://t.me/youtubetoolshub",
        icon: "telegram",
      },
      {
        name: "Facebook",
        href: "https://www.facebook.com/profile.php?id=61585430621256",
        icon: "facebook",
      },
      {
        name: "X (Twitter)",
        href: "https://x.com/ytoolshub",
        icon: "twitter",
      },
      {
        name: "Pinterest",
        href: "https://pinterest.com/youtubetoolshub",
        icon: "pinterest",
      },
    ],
    resources: [
      { name: "YT Tools Hub vs TubeBuddy", href: "/tools/vs/tubebuddy" },
      { name: "YT Tools Hub vs VidIQ", href: "/tools/vs/vidiq" },
      { name: "Why Choose Us", href: "/blog/why-youtube-tools-hub" },
      { name: "Link to Us", href: "/resources/link-to-us" },
      {
        name: "YouTube Algorithm Guide 2026",
        href: "/resources/youtube-algorithm-guide",
      },
      {
        name: "YouTube Monetization Guide",
        href: "/resources/youtube-monetization-guide",
      },
      { name: "YouTube CPM Rates 2026", href: "/resources/youtube-cpm-rates" },
    ],
  },

  // SEO Defaults
  seo: {
    titleTemplate: "%s | YouTube Tools Hub - Free AI Tools 2026",
    defaultTitle:
      "YouTube Tools Hub - 27+ Free YouTube Tools for Creators | Earnings Calculator & Thumbnails",
    defaultDescription:
      "Grow your YouTube channel with 27+ free creator tools: thumbnail generator, earnings calculator, SEO optimizer, tag extractor, channel audit, and more. No signup required.",
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
      "youtube algorithm optimization tools",

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
      "youtube channel name generator ai",

      // AEO / GEO / AI Search Targeting Keywords
      "best free youtube tools 2026",
      "free tubebuddy alternative",
      "free vidiq alternative",
      "youtube thumbnail downloader hd",
      "youtube cpm calculator by country",
      "youtube channel audit tool free",
      "ai youtube thumbnail generator free",
      "youtube tag extractor online free",
      "youtube content calendar generator",
      "youtube video ideas generator ai",
      "youtube intro script generator",
      "youtube comment picker giveaway",
      "youtube playlist length calculator",
      "youtube channel id finder",
      "youtube engagement rate calculator",
      "free youtube tools worldwide",
      "youtube tools for creators globally",
      "youtube earnings calculator india",
      "youtube earnings calculator uk",
      "youtube earnings calculator canada",
      "youtube earnings calculator australia",
      "youtube seo tools for international creators",
      "global youtube cpm calculator",
    ],
    alternates: {},
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: "YouTube Tools Hub",
    },
    indexNow: {
      key: "01d46652569c40eaa19149073834de57",
      url: "https://www.youtubetoolshub.com",
    },
  },

  // Contact
  contact: {
    email: "support@youtubetoolshub.com",
  },
};

export type SiteConfig = typeof siteConfig;
