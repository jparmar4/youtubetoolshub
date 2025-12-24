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
    primary: "#FF0000", // YouTube Red
    primaryDark: "#CC0000",
    secondary: "#1a1a2e",
    accent: "#FF4136",
    success: "#28a745",
    warning: "#ffc107",
    error: "#dc3545",
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
      { name: "Twitter", href: "https://twitter.com", icon: "twitter" },
      { name: "YouTube", href: "https://youtube.com", icon: "youtube" },
      { name: "Instagram", href: "https://instagram.com", icon: "instagram" },
    ],
  },

  // SEO Defaults
  seo: {
    titleTemplate: "%s | YouTube Tools Hub",
    defaultTitle: "YouTube Tools Hub - Free YouTube Automation Tools",
    defaultDescription: "Free YouTube tools for creators: thumbnail downloader, title generator, tag extractor, earnings calculator, and more.",
    keywords: ["youtube tools", "thumbnail downloader", "youtube seo", "title generator", "tag generator", "youtube automation"],
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
