// Site Configuration - All branding and settings in one place

export const siteConfig = {
  // Branding
  name: "YouTube Tools Hub",
  tagline: "Free YouTube Growth & AI Tools Suite 2026",
  description:
    "Free YouTube creator tools: download thumbnails, draft titles and tags, and estimate AdSense earnings by country. No signup required.",

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
    { name: "Tools", href: "/tools" },
    { name: "Pricing", href: "/pricing" },
    { name: "Thumbnail", href: "/tools/youtube-thumbnail-downloader" },
    { name: "Earnings", href: "/tools/youtube-earnings-calculator" },
    { name: "Blog", href: "/blog" },
    { name: "CPM Rates", href: "/resources/youtube-cpm-rates" },
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
      { name: "Creator Statistics", href: "/resources/youtube-creator-statistics" },
      { name: "YouTube SEO Blog", href: "/blog" },
      { name: "FAQ", href: "/faq" },
    ],
  },

  // SEO Defaults
  seo: {
    // Keep brand suffix short so SERP titles stay ~50–60 chars with page titles
    titleTemplate: "%s | YouTube Tools Hub",
    defaultTitle:
      "Free YouTube Tools — Thumbnail Downloader, Tags & Earnings Calculator",
    defaultDescription:
      "Free YouTube tools to download HD thumbnails, generate titles and tags, and estimate AdSense earnings by country. No signup required.",
    alternates: {},
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

  /** Editorial entity for Person schema / E-E-A-T (invisible + JSON-LD) */
  editorial: {
    name: "YouTube Tools Hub Editorial Team",
    jobTitle: "Creator Growth Research Editors",
    description:
      "Editorial team researching YouTube monetization, CPM/RPM benchmarks, SEO, and free creator tooling. Publishes data tables, calculators, and practical workflows for creators worldwide.",
    url: "https://www.youtubetoolshub.com/about",
  },
};

export type SiteConfig = typeof siteConfig;
