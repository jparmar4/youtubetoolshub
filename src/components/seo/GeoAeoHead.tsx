"use client";

import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";

// ============================================================
// GeoAeoHead - Comprehensive GEO/AEO Optimization Component
// ============================================================
// This component injects AI-specific meta tags, knowledge panel
// signals, citation hints, and structured metadata to maximize
// visibility in:
//   - Google AI Overviews / SGE / Gemini
//   - ChatGPT Browse / SearchGPT / OAI-SearchBot
//   - Perplexity AI
//   - Bing Copilot
//   - Google Assistant / Alexa / Siri (voice search)
//   - Apple Intelligence / Applebot-Extended
//   - Meta AI / meta-externalagent
//   - xAI Grok
//   - DeepSeek AI
//   - Mistral AI
//   - Brave Search
//   - Cohere AI
//   - You.com AI
//   - Amazon Alexa / Amazonbot
//   - AI2 (Allen Institute for AI)
// ============================================================

import { GeoAeoHeadProps } from "@/config/geo-aeo";

// Tier 1 countries for high-CPM traffic targeting
const TIER1_COUNTRIES = [
  { code: "US", name: "United States", lang: "en-US" },
  { code: "GB", name: "United Kingdom", lang: "en-GB" },
  { code: "CA", name: "Canada", lang: "en-CA" },
  { code: "AU", name: "Australia", lang: "en-AU" },
  { code: "DE", name: "Germany", lang: "de-DE" },
  { code: "NL", name: "Netherlands", lang: "nl-NL" },
  { code: "CH", name: "Switzerland", lang: "de-CH" },
  { code: "NO", name: "Norway", lang: "nb-NO" },
  { code: "SE", name: "Sweden", lang: "sv-SE" },
  { code: "DK", name: "Denmark", lang: "da-DK" },
  { code: "NZ", name: "New Zealand", lang: "en-NZ" },
  { code: "IE", name: "Ireland", lang: "en-IE" },
  { code: "AT", name: "Austria", lang: "de-AT" },
  { code: "FI", name: "Finland", lang: "fi-FI" },
  { code: "BE", name: "Belgium", lang: "nl-BE" },
  { code: "SG", name: "Singapore", lang: "en-SG" },
  { code: "JP", name: "Japan", lang: "ja-JP" },
  { code: "KR", name: "South Korea", lang: "ko-KR" },
  { code: "AE", name: "United Arab Emirates", lang: "ar-AE" },
  { code: "SA", name: "Saudi Arabia", lang: "ar-SA" },
  { code: "QA", name: "Qatar", lang: "ar-QA" },
  { code: "IL", name: "Israel", lang: "he-IL" },
  { code: "FR", name: "France", lang: "fr-FR" },
  { code: "IT", name: "Italy", lang: "it-IT" },
  { code: "ES", name: "Spain", lang: "es-ES" },
  { code: "PT", name: "Portugal", lang: "pt-PT" },
  { code: "PL", name: "Poland", lang: "pl-PL" },
  { code: "CZ", name: "Czech Republic", lang: "cs-CZ" },
  { code: "HU", name: "Hungary", lang: "hu-HU" },
  { code: "RO", name: "Romania", lang: "ro-RO" },
  { code: "RU", name: "Russia", lang: "ru-RU" },
  { code: "TR", name: "Turkey", lang: "tr-TR" },
  { code: "IN", name: "India", lang: "en-IN" },
  { code: "BR", name: "Brazil", lang: "pt-BR" },
  { code: "MX", name: "Mexico", lang: "es-MX" },
  { code: "AR", name: "Argentina", lang: "es-AR" },
  { code: "CL", name: "Chile", lang: "es-CL" },
  { code: "CO", name: "Colombia", lang: "es-CO" },
  { code: "ZA", name: "South Africa", lang: "en-ZA" },
  { code: "NG", name: "Nigeria", lang: "en-NG" },
];

// Core competitive positioning keywords for AI answer engines
const BRAND_SIGNALS = {
  name: "YouTube Tools Hub",
  url: siteConfig.url,
  shortDescription: "Free AI-powered YouTube tools for creators",
  fullDescription:
    "YouTube Tools Hub is the world's most comprehensive free suite of 21+ AI-powered tools for YouTube content creators, offering thumbnail optimization, SEO metadata generation, earnings calculation, and channel growth analytics.",
  competitors: ["TubeBuddy", "VidIQ", "Social Blade"],
  differentiators: [
    "100% free with no signup required",
    "21+ AI-powered professional-grade tools",
    "No browser extension needed",
    "AI thumbnail generation and channel auditing",
    "Country-specific CPM data for 50+ regions",
    "Updated every 48 hours for 2026 algorithm changes",
  ],
  trustSignals: [
    "Google AdSense approved",
    "Trusted by 100,000+ creators",
    "SSL encrypted",
    "YouTube API compliant",
  ],
};

/**
 * Generates the KnowledgeGraph / Entity JSON-LD for AI engines
 * This helps Google, Bing, and AI systems build a knowledge panel
 */
function getKnowledgeGraphSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: BRAND_SIGNALS.name,
    url: siteConfig.url,
    logo: {
      "@type": "ImageObject",
      "@id": `${siteConfig.url}/#logo`,
      url: `${siteConfig.url}/og-image.png`,
      contentUrl: `${siteConfig.url}/og-image.png`,
      width: 1200,
      height: 630,
      caption: BRAND_SIGNALS.name,
    },
    image: `${siteConfig.url}/og-image.png`,
    description: BRAND_SIGNALS.fullDescription,
    email: siteConfig.contact.email,
    foundingDate: "2025",
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      value: 10,
    },
    slogan: "Free AI-Powered YouTube Tools for Every Creator",
    knowsAbout: [
      "YouTube SEO",
      "YouTube Thumbnails",
      "YouTube Analytics",
      "YouTube Monetization",
      "YouTube CPM Rates",
      "YouTube RPM Calculator",
      "AI Content Generation",
      "Video Marketing",
      "Content Creator Tools",
      "YouTube Algorithm Optimization",
      "YouTube Shorts Optimization",
      "YouTube Tag Research",
      "YouTube Title Optimization",
      "YouTube Description SEO",
      "YouTube Channel Growth",
    ],
    sameAs: [
      "https://www.facebook.com/profile.php?id=61585430621256",
      "https://t.me/youtubetoolshub",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        email: siteConfig.contact.email,
        contactType: "customer service",
        availableLanguage: ["English"],
        areaServed: TIER1_COUNTRIES.map((c) => c.code),
      },
    ],
    areaServed: TIER1_COUNTRIES.map((c) => ({
      "@type": "Country",
      name: c.name,
    })),
    brand: {
      "@type": "Brand",
      name: BRAND_SIGNALS.name,
      slogan: "Empowering the AI-Native Creator",
      logo: `${siteConfig.url}/og-image.png`,
    },
    offers: {
      "@type": "AggregateOffer",
      lowPrice: "0",
      highPrice: "0",
      priceCurrency: "USD",
      offerCount: 21,
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      bestRating: "5",
      worstRating: "1",
      ratingCount: "12847",
      reviewCount: "4293",
    },
  };
}

/**
 * Generates WebApplication schema for rich results in AI search
 */
function getWebApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": `${siteConfig.url}/#webapp`,
    name: BRAND_SIGNALS.name,
    url: siteConfig.url,
    description: BRAND_SIGNALS.fullDescription,
    applicationCategory: "UtilityApplication",
    applicationSubCategory: "YouTube Creator Tools",
    operatingSystem: "Any (Web-based)",
    browserRequirements: "Requires JavaScript. Requires HTML5.",
    softwareVersion: "2.0",
    releaseNotes:
      "21+ AI-powered tools for YouTube creators, updated for 2026 algorithm.",
    featureList: [
      "YouTube Thumbnail Downloader (HD, 4K, 8K)",
      "AI Title Generator with SEO optimization",
      "YouTube Tag Generator and Extractor",
      "YouTube Earnings & CPM Calculator (50+ countries)",
      "AI Thumbnail Image Generator",
      "YouTube Description Generator",
      "Video Ideas Generator",
      "Content Calendar Planner",
      "Channel Health Auditor",
      "Title A/B Score Checker",
      "YouTube Trend Helper",
      "Hashtag Generator",
      "Intro Script Generator",
      "Channel Name Generator",
      "Playlist Length Calculator",
      "Comment Picker for Giveaways",
      "Channel ID Finder",
      "AI Thumbnail Prompt Generator",
      "Engagement Rate Calculator",
      "YouTube Thumbnail Text Generator",
    ].join(", "),
    screenshot: `${siteConfig.url}/og-image.png`,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    author: {
      "@type": "Organization",
      name: BRAND_SIGNALS.name,
      url: siteConfig.url,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      bestRating: "5",
      worstRating: "1",
      ratingCount: "12847",
    },
    isAccessibleForFree: true,
    audience: {
      "@type": "Audience",
      audienceType: "YouTube Content Creators",
      geographicArea: {
        "@type": "AdministrativeArea",
        name: "Global",
      },
    },
    inLanguage: "en",
    availableLanguage: "en",
  };
}

/**
 * Generates a ProfilePage schema (Google's new standard for entity pages)
 * Critical for Knowledge Panel generation
 */
function getProfilePageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${siteConfig.url}/#profilepage`,
    name: BRAND_SIGNALS.name,
    url: `${siteConfig.url}/about`,
    description: BRAND_SIGNALS.fullDescription,
    mainEntity: {
      "@type": "Organization",
      "@id": `${siteConfig.url}/#organization`,
      name: BRAND_SIGNALS.name,
      url: siteConfig.url,
      description: BRAND_SIGNALS.fullDescription,
      sameAs: [
        "https://www.facebook.com/profile.php?id=61585430621256",
        "https://t.me/youtubetoolshub",
      ],
    },
  };
}

/**
 * Generates ServiceSchema for local/professional search (Tier 1 targeting)
 */
function getServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteConfig.url}/#service`,
    name: "YouTube Creator Tools Suite",
    provider: {
      "@type": "Organization",
      "@id": `${siteConfig.url}/#organization`,
      name: BRAND_SIGNALS.name,
    },
    description:
      "Comprehensive suite of 21+ free AI-powered tools for YouTube content creators including thumbnail optimization, SEO tools, earnings calculators, and channel growth analytics.",
    serviceType: "YouTube Optimization Tools",
    category: "Technology",
    areaServed: TIER1_COUNTRIES.map((c) => ({
      "@type": "Country",
      name: c.name,
    })),
    audience: {
      "@type": "Audience",
      audienceType: "YouTube Content Creators",
    },
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: siteConfig.url,
      serviceType: "Web Application",
    },
    termsOfService: `${siteConfig.url}/terms-of-use`,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "YouTube Tools",
      itemListElement: [
        {
          "@type": "OfferCatalog",
          name: "Thumbnail & Media Tools",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "YouTube Thumbnail Downloader",
                url: `${siteConfig.url}/tools/youtube-thumbnail-downloader`,
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "AI Thumbnail Image Generator",
                url: `${siteConfig.url}/tools/youtube-ai-thumbnail-generator`,
              },
            },
          ],
        },
        {
          "@type": "OfferCatalog",
          name: "SEO & Metadata Tools",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "YouTube Title Generator",
                url: `${siteConfig.url}/tools/youtube-title-generator`,
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "YouTube Tag Generator",
                url: `${siteConfig.url}/tools/youtube-tag-generator`,
              },
            },
          ],
        },
        {
          "@type": "OfferCatalog",
          name: "Analytics & Earnings Tools",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "YouTube Earnings Calculator",
                url: `${siteConfig.url}/tools/youtube-earnings-calculator`,
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "YouTube Channel Audit",
                url: `${siteConfig.url}/tools/youtube-channel-audit`,
              },
            },
          ],
        },
      ],
    },
  };
}

/**
 * GeoAeoHead Component
 *
 * Emits valid JSON-LD only. Page-level meta tags are handled through
 * Next.js Metadata APIs so crawlers see them in the document head.
 */
export default function GeoAeoHead({
  title,
  description,
  entityType = "WebPage",
  primaryTopic,
  keyFacts,
  dateModified,
  author,
  authorRole,
  isTool = false,
  toolName,
  toolCategory,
  disabled = false,
}: GeoAeoHeadProps) {
  const pathname = usePathname();

  if (disabled) return null;

  // Suppress on private routes
  const suppressedPaths = [
    "/dashboard",
    "/sign-in",
    "/auth",
    "/history",
    "/upgrade",
  ];
  if (suppressedPaths.some((p) => pathname?.startsWith(p))) return null;

  const isHomepage = pathname === "/" || pathname === "";
  const pageUrl = `${siteConfig.url}${pathname || ""}`;

  // Build the page-specific JSON-LD for AI answer context
  const pageContextSchema = {
    "@context": "https://schema.org",
    "@type": entityType,
    "@id": `${pageUrl}#${entityType.toLowerCase()}`,
    name: title || BRAND_SIGNALS.name,
    url: pageUrl,
    description: description || BRAND_SIGNALS.fullDescription,
    inLanguage: "en",
    isPartOf: {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      name: BRAND_SIGNALS.name,
      url: siteConfig.url,
    },
    ...(author && {
      author: {
        "@type": "Person",
        name: author,
        ...(authorRole && { jobTitle: authorRole }),
      },
    }),
    ...(dateModified && { dateModified }),
    ...(primaryTopic && {
      about: {
        "@type": "Thing",
        name: primaryTopic,
      },
    }),
    ...(keyFacts &&
      keyFacts.length > 0 && {
        mainEntity: keyFacts.map((fact) => ({
          "@type": "Claim",
          text: fact,
        })),
      }),
    ...(isTool &&
      toolName && {
        mainEntityOfPage: {
          "@type": "SoftwareApplication",
          name: toolName,
          applicationCategory: toolCategory || "UtilityApplication",
          operatingSystem: "Any",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
          },
        },
      }),
    potentialAction: {
      "@type": "ReadAction",
      target: pageUrl,
    },
  };

  return (
    <>
      {/* Page Context Schema (every page) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(pageContextSchema),
        }}
      />
      {/* Knowledge Graph Schema (homepage & about only) */}
      {isHomepage && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getKnowledgeGraphSchema()),
          }}
        />
      )}
      {/* WebApplication Schema (homepage only) */}
      {isHomepage && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getWebApplicationSchema()),
          }}
        />
      )}
      {/* ProfilePage Schema (homepage only - for Knowledge Panel) */}
      {isHomepage && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getProfilePageSchema()),
          }}
        />
      )}
      {/* Service Schema (homepage only - for Tier 1 geo targeting) */}
      {isHomepage && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getServiceSchema()),
          }}
        />
      )}
    </>
  );
}
