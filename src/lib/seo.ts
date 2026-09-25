// JSON-LD Structured Data for SEO
import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { DATA_LAST_REVIEWED } from "@/lib/seo-data";

/** Shared robots metadata for app UI / thin pages that must stay out of Google index */
export const noIndexRobots: NonNullable<Metadata["robots"]> = {
  index: false,
  follow: true,
  googleBot: {
    index: false,
    follow: true,
    noimageindex: true,
  },
};

// Organization Schema with enhanced E-E-A-T signals
export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    alternateName: "YT Tools Hub",
    url: siteConfig.url,
    logo: {
      "@type": "ImageObject",
      "@id": `${siteConfig.url}/#logo`,
      url: `${siteConfig.url}/og-image.png`,
      contentUrl: `${siteConfig.url}/og-image.png`,
      width: 1200,
      height: 630,
      caption: siteConfig.name,
    },
    image: `${siteConfig.url}/og-image.png`,
    description: siteConfig.description,
    slogan: "Free AI-Powered YouTube Tools for Every Creator",
    foundingDate: "2025",
    // Contact information
    contactPoint: [
      {
        "@type": "ContactPoint",
        email: siteConfig.contact.email,
        contactType: "customer service",
        availableLanguage: ["English"],
        responseTime: "PT24H", // 24 hours
      },
      {
        "@type": "ContactPoint",
        email: siteConfig.contact.email,
        contactType: "technical support",
        availableLanguage: ["English"],
        responseTime: "PT24H",
      },
    ],
    // Social profiles for entity disambiguation
    sameAs: siteConfig.footerLinks.social.map((link) => link.href),
    // Editorial policy page — E-E-A-T trust signal for search + AI engines
    publishingPrinciples: `${siteConfig.url}/blog/why-youtube-tools-hub`,
    // Knowledge domain for E-E-A-T
    knowsAbout: [
      {
        "@type": "Thing",
        name: "YouTube",
        sameAs: "https://en.wikipedia.org/wiki/YouTube",
      },
      {
        "@type": "Thing",
        name: "YouTube Monetization",
        sameAs: "https://en.wikipedia.org/wiki/YouTube_monetization",
      },
      {
        "@type": "Thing",
        name: "Search Engine Optimization",
        sameAs: "https://en.wikipedia.org/wiki/Search_engine_optimization",
      },
      "YouTube SEO",
      "YouTube Thumbnails",
      "YouTube Analytics",
      "YouTube Monetization",
      "YouTube CPM Rates",
      "YouTube RPM Rates",
      "AI Content Generation",
      "Video Marketing",
      "Content Creator Tools",
      "YouTube Algorithm Optimization",
      "YouTube Shorts Optimization",
      "YouTube Partner Program",
      "YouTube Tag Optimization",
      "YouTube Title Optimization",
      "YouTube Description Writing",
      "YouTube Channel Growth",
      "YouTube Earnings Calculator",
      "YouTube Thumbnail Design",
      "YouTube Keyword Research",
    ],
    // Geographic focus
    areaServed: siteConfig.globalMarkets.map((market) => ({
      "@type": market === "Worldwide" ? "AdministrativeArea" : "Country",
      name: market,
    })),
    availableLanguage: ["English"],
    // Brand information
    brand: {
      "@type": "Brand",
      name: siteConfig.name,
      logo: `${siteConfig.url}/og-image.png`,
    },
  };
}

// Website Schema with graph linking for entity understanding
export function getWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: siteConfig.name,
    alternateName: "YT Tools Hub",
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: "en",
    availableLanguage: ["English"],
    // Link to organization entity
    publisher: {
      "@id": `${siteConfig.url}/#organization`,
    },
    // Site navigation structure for AI understanding
    mainEntity: {
      "@type": "ItemList",
      itemListElement: [
        {
          "@type": "SiteNavigationElement",
          position: 1,
          name: "Home",
          url: siteConfig.url,
        },
        {
          "@type": "SiteNavigationElement",
          position: 2,
          name: "Tools",
          url: `${siteConfig.url}/tools`,
        },
        {
          "@type": "SiteNavigationElement",
          position: 3,
          name: "Blog",
          url: `${siteConfig.url}/blog`,
        },
        {
          "@type": "SiteNavigationElement",
          position: 4,
          name: "Pricing",
          url: `${siteConfig.url}/pricing`,
        },
        {
          "@type": "SiteNavigationElement",
          position: 5,
          name: "About",
          url: `${siteConfig.url}/about`,
        },
        {
          "@type": "SiteNavigationElement",
          position: 6,
          name: "FAQ",
          url: `${siteConfig.url}/faq`,
        },
      ],
    },
    // Do not expose SearchAction: /search is noindex + robots-disallowed.
    // A sitelinks searchbox pointing at a blocked URL hurts indexing.
    // Content information
    genre: ["YouTube Tools", "Video Marketing", "SEO Tools", "Creator Economy"],
    // Audience
    audience: {
      "@type": "Audience",
      audienceType: ["YouTube Creators", "Video Marketers", "Content Creators"],
      geographicArea: {
        "@type": "AdministrativeArea",
        name: "Global",
      },
    },
  };
}

// Breadcrumb Schema
export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => {
      const absoluteUrl = item.url.startsWith("http")
        ? item.url
        : `${siteConfig.url}${item.url.startsWith("/") ? "" : "/"}${item.url}`;
      return {
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: absoluteUrl,
      };
    }),
  };
}

// Article/Blog Post Schema
export function getArticleSchema(article: {
  title: string;
  description: string;
  author: string;
  datePublished: string;
  url: string;
  keywords?: string[];
  imageUrl?: string;
  imageWidth?: number;
  imageHeight?: number;
  dateModified?: string;
  section?: string;
  inLanguage?: string;
  authorRole?: string;
  /** Author page (or profile) URL — anchors the Person node to a real page. */
  authorUrl?: string;
  /** @id for the author Person node so every post strengthens one entity. */
  authorId?: string;
  /** Entity edges: tool/asset nodes this article covers. */
  mentions?: { "@id": string; name: string }[];
}) {
  const imageUrl = article.imageUrl
    ? article.imageUrl.startsWith("http")
      ? article.imageUrl
      : `${siteConfig.url}${article.imageUrl}`
    : `${siteConfig.url}/og-image.png`;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${article.url}#article`,
    headline: article.title,
    description: article.description,
    author: {
      "@type": "Person",
      name: article.author,
      ...(article.authorId ? { "@id": article.authorId } : {}),
      ...(article.authorUrl ? { url: article.authorUrl } : {}),
      ...(article.authorRole ? { jobTitle: article.authorRole } : {}),
      worksFor: {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.name,
      },
    },
    publisher: {
      "@type": "Organization",
      "@id": `${siteConfig.url}/#organization`,
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/og-image.png`,
        width: 1200,
        height: 630,
      },
    },
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": article.url,
    },
    isAccessibleForFree: true,
    publishingPrinciples: `${siteConfig.url}/blog/why-youtube-tools-hub`,
    keywords: article.keywords?.join(", "),
    image: [
      imageUrl,
      {
        "@type": "ImageObject",
        url: imageUrl,
        // Declared dims must come from the real file (image-dimensions.json);
        // a guessed 1200x675 against a 640x640 file is a rich-results error.
        ...(article.imageWidth && article.imageHeight
          ? { width: article.imageWidth, height: article.imageHeight }
          : {}),
      },
    ],
    about: {
      "@type": "Thing",
      name: "YouTube",
      sameAs: [
        "https://en.wikipedia.org/wiki/YouTube",
        "https://www.wikidata.org/wiki/Q866",
      ],
    },
    ...(article.mentions && article.mentions.length > 0
      ? { mentions: article.mentions }
      : {}),
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", ".summary", "[data-speakable]"],
    },
    articleSection: article.section,
    inLanguage: article.inLanguage || "en",
    isPartOf: {
      "@type": "Blog",
      "@id": `${siteConfig.url}/blog#blog`,
      name: `${siteConfig.name} Blog`,
      url: `${siteConfig.url}/blog`,
    },
  };
}

// Software Application Schema (for tools)
export function getSoftwareApplicationSchema(tool: {
  name: string;
  description: string;
  url: string;
  category: string;
  rating?: {
    ratingValue: string;
    ratingCount: string;
    bestRating?: string;
    worstRating?: string;
  };
  datePublished?: string;
  dateModified?: string;
}) {
  const applicationCategory =
    tool.category === "thumbnail-media"
      ? "MultimediaApplication"
      : "UtilityApplication";

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${tool.url}#software`,
    name: tool.name,
    description: tool.description,
    url: tool.url,
    applicationCategory: applicationCategory, // Ensure this maps to a valid schema.org category
    operatingSystem: "Any", // Required field
    ...(tool.datePublished ? { datePublished: tool.datePublished } : {}),
    // Never claim a new modification date just because the page was rendered.
    ...(tool.dateModified ? { dateModified: tool.dateModified } : {}),
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    // Never emit AggregateRating unless ratings are collected from real users.
    // Invented ratingCount values are a spam-policy violation and can demote the site.
  };
}

// DefinedTermSet Schema — glossary definitions for AI answer engines
export function getDefinedTermSetSchema(terms: {
  name: string;
  description: string;
  url?: string;
}[]) {
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    "@id": `${siteConfig.url}/resources/youtube-glossary#termset`,
    name: "YouTube Creator Glossary",
    description:
      "Definitions of YouTube creator, monetization, and analytics terms, written as direct answers for quick reference.",
    url: `${siteConfig.url}/resources/youtube-glossary`,
    inLanguage: "en",
    isPartOf: {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      name: siteConfig.name,
      url: siteConfig.url,
    },
    hasDefinedTerm: terms.map((term) => ({
      "@type": "DefinedTerm",
      name: term.name,
      description: term.description,
      inDefinedTermSet: { "@id": `${siteConfig.url}/resources/youtube-glossary#termset` },
      ...(term.url ? { url: term.url } : {}),
    })),
  };
}

// FAQ Schema
export function getFAQSchema(faqs: { question: string; answer: string }[]) {  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

// HowTo Schema (for tool guides)
export function getHowToSchema(howTo: {
  name: string;
  description: string;
  steps: { name: string; text: string }[];
  totalTime?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: howTo.name,
    description: howTo.description,
    totalTime: howTo.totalTime || "PT5M",
    step: howTo.steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };
}

// ItemList Schema for tool listings (helps AI understand tool collection)
export function getToolListSchema(
  tools: { name: string; url: string; description: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "YouTube Creator Tools",
    description:
      "Complete collection of free AI-powered tools for YouTube content creators",
    numberOfItems: tools.length,
    itemListElement: tools.map((tool, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: tool.name,
      url: tool.url,
      description: tool.description,
    })),
  };
}

// VideoObject Schema for YouTube video tutorials
export function getVideoObjectSchema(video: {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  duration: string;
  contentUrl?: string;
  embedUrl?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: video.name,
    description: video.description,
    thumbnailUrl: video.thumbnailUrl,
    uploadDate: video.uploadDate,
    duration: video.duration,
    contentUrl: video.contentUrl,
    embedUrl: video.embedUrl,
  };
}

// CollectionPage Schema for blog index and category pages
export function getCollectionPageSchema(collection: {
  name: string;
  description: string;
  url: string;
  items: {
    name: string;
    url: string;
    datePublished?: string;
    image?: string;
  }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: collection.name,
    description: collection.description,
    url: collection.url,
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: collection.items.length,
      itemListElement: collection.items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: item.url,
        name: item.name,
        ...(item.image && { image: item.image }),
        ...(item.datePublished && { datePublished: item.datePublished }),
      })),
    },
  };
}

// Person Schema for author pages
export function getPersonSchema(author: {
  name: string;
  url: string;
  /** Stable node id (e.g. `${siteUrl}/blog/author/slug#person`). */
  id?: string;
  jobTitle?: string;
  description?: string;
  sameAs?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    ...(author.id ? { "@id": author.id } : {}),
    name: author.name,
    url: author.url,
    jobTitle: author.jobTitle || "Creator Growth Expert",
    description: author.description,
    sameAs: author.sameAs,
    worksFor: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}

// Dataset Schema for CPM Data (unique data asset for AI citations)
export function getDatasetSchema(options?: {
  name?: string;
  description?: string;
  url?: string;
  dateModified?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: options?.name ?? "YouTube CPM and RPM Rates by Country (2026)",
    description:
      options?.description ??
      "Comprehensive dataset of YouTube CPM (Cost Per Mille) and RPM (Revenue Per Mille) rates for 50+ countries. Data is updated monthly based on real-world creator earnings and advertising rates. Includes Tier 1 country averages, niche-specific rates, and historical trends.",
    url: options?.url ?? `${siteConfig.url}/resources/youtube-cpm-rates`,
    creator: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    datePublished: "2025-01-01",
    // Track the CPM dataset refresh cycle, not a hardcoded past date.
    dateModified: options?.dateModified ?? DATA_LAST_REVIEWED,
    license: `${siteConfig.url}/terms-of-use`,
    distribution: [
      {
        "@type": "DataDownload",
        name: "YouTube CPM Data JSON",
        encodingFormat: "application/json",
        contentUrl: `${siteConfig.url}/api/ai-context`,
      },
      {
        "@type": "DataDownload",
        name: "YouTube Earnings Calculator",
        encodingFormat: "text/html",
        contentUrl: `${siteConfig.url}/tools/youtube-earnings-calculator`,
      },
    ],
    temporalCoverage: "2025-01-01/2026-12-31",
    spatialCoverage: {
      "@type": "Place",
      name: "Global",
      geo: {
        "@type": "GeoShape",
        name: "Worldwide",
      },
    },
    keywords: [
      "YouTube CPM",
      "YouTube RPM",
      "YouTube AdSense rates",
      "YouTube monetization",
      "YouTube earnings",
      "creator earnings",
      "YouTube revenue",
      "CPM by country",
      "YouTube advertising rates",
    ],
    variableMeasured: [
      {
        "@type": "PropertyValue",
        name: "CPM (Cost Per Mille)",
        description: "Cost per 1,000 ad impressions",
        unitText: "USD",
      },
      {
        "@type": "PropertyValue",
        name: "RPM (Revenue Per Mille)",
        description: "Revenue per 1,000 video views",
        unitText: "USD",
      },
      {
        "@type": "PropertyValue",
        name: "Country",
        description: "ISO 3166-1 alpha-2 country code",
      },
    ],
    about: [
      {
        "@type": "Thing",
        name: "YouTube Monetization",
      },
      {
        "@type": "Thing",
        name: "AdSense Revenue",
      },
    ],
  };
}

// MainEntity Schema for Homepage (helps AI understand primary content)
export function getMainEntitySchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": `${siteConfig.url}/#webapp`,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any (Web-based)",
    browserRequirements: "Requires JavaScript. Requires HTML5.",
    softwareVersion: "3.0",
    isAccessibleForFree: true,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    featureList: [
      "YouTube Thumbnail Downloader",
      "AI Title Generator",
      "YouTube Tag Generator",
      "YouTube Earnings Calculator",
      "AI Thumbnail Generator",
      "YouTube Channel Audit",
      "YouTube Description Generator",
      "YouTube Tag Extractor",
      "YouTube Hashtag Generator",
      "YouTube Video Ideas Generator",
    ].join(", "),
    screenshot: `${siteConfig.url}/og-image.png`,
    author: {
      "@type": "Organization",
      "@id": `${siteConfig.url}/#organization`,
    },
    publisher: {
      "@type": "Organization",
      "@id": `${siteConfig.url}/#organization`,
    },
  };
}

/** Absolute URL for a site path ("" or "/" → homepage). */
export function absoluteUrl(path: string): string {
  if (path.startsWith("http")) return path;
  if (!path || path === "/") return siteConfig.url;
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Per-page canonical + self-referencing hreflang.
 * Never point language alternates at the homepage from inner URLs.
 */
export function getGlobalAlternates(path: string) {
  const url = absoluteUrl(path);
  return {
    canonical: url,
    languages: {
      en: url,
      "x-default": url,
    },
  };
}
