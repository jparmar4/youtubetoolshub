import { siteConfig } from "@/config/site";

// ============================================================
// GeoAeoHead - Comprehensive GEO/AEO Optimization Component
// ============================================================
// SERVER COMPONENT — JSON-LD is injected at render time so all
// crawlers (Google, Bing, GPTBot, ClaudeBot, PerplexityBot, etc.)
// see the structured data in the initial HTTP response.
//
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
    "YouTube Tools Hub is a free suite of 27+ creator tools for YouTube content creators, offering thumbnail tools, SEO metadata generation, earnings calculation, and channel growth utilities.",
  competitors: ["TubeBuddy", "VidIQ", "Social Blade"],
  differentiators: [
    "Core tools are free to use",
    "27+ creator tools",
    "No browser extension needed",
    "AI-assisted thumbnail generation and channel workflow checklist",
    "Country-specific CPM data for 50+ regions",
    "Works directly in the browser",
  ],
  trustSignals: [
    "HTTPS secure",
    "No private YouTube login required for core tools",
    "Public contact and policy pages",
  ],
};

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
    softwareVersion: "3.0",
    releaseNotes:
      "27+ creator tools for YouTube creators.",
    featureList: [
      "YouTube Thumbnail Downloader with available thumbnail resolutions",
      "AI-assisted title idea generator",
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
      "Suite of 27+ creator tools for YouTube content creators including thumbnail utilities, SEO helpers, earnings calculators, and channel workflow tools.",
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
 * GeoAeoHead Component — SERVER COMPONENT
 *
 * JSON-LD is server-rendered so all crawlers see it in the initial HTML response.
 * Pass `pathname` from the parent server page (replaces the old usePathname() hook).
 *
 * Usage:
 *   <GeoAeoHead {...GEO_AEO_PRESETS.toolPage(tool.name, tool.desc, tool.cat)} pathname={`/tools/${tool.slug}`} />
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
  pathname,
}: GeoAeoHeadProps & { pathname: string }) {
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
  const today = new Date().toISOString();

  // Build the page-specific JSON-LD for AI answer context
  const pageContextSchema = {
    "@context": "https://schema.org",
    "@type": entityType,
    "@id": `${pageUrl}#${entityType.toLowerCase()}`,
    name: title || BRAND_SIGNALS.name,
    url: pageUrl,
    description: description || BRAND_SIGNALS.fullDescription,
    inLanguage: "en",
    datePublished: "2025-01-01",
    dateModified: dateModified || today,
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
