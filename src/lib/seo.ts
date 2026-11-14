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

/** Combine multiple schema objects into a single `@graph` JSON-LD payload. */
export function combineSchemasToGraph(
  ...schemas: Array<Record<string, unknown> | null | undefined>
) {
  return {
    "@context": "https://schema.org",
    "@graph": schemas
      .filter((s): s is Record<string, unknown> => Boolean(s))
      .map((item) =>
        Object.fromEntries(Object.entries(item).filter(([k]) => k !== "@context")),
      ),
  };
}

// Organization Schema with E-E-A-T signals
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
      width: 1200,
      height: 630,
    },
    description: siteConfig.description,
    foundingDate: "2025",
    email: siteConfig.contact.email,
    telephone: siteConfig.contact.telephone,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.contact.address.streetAddress,
      addressLocality: siteConfig.contact.address.addressLocality,
      addressRegion: siteConfig.contact.address.addressRegion,
      postalCode: siteConfig.contact.address.postalCode,
      addressCountry: siteConfig.contact.address.addressCountry,
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: siteConfig.contact.email,
      telephone: siteConfig.contact.telephone,
      contactType: "customer support",
      availableLanguage: "English",
    },
    sameAs: siteConfig.footerLinks.social.map((link) => link.href),
    publishingPrinciples: `${siteConfig.url}/blog/why-youtube-tools-hub`,
    knowsAbout: [
      "YouTube SEO",
      "YouTube Thumbnails",
      "YouTube Monetization",
      "YouTube CPM & RPM Rates",
      "YouTube Analytics",
      "AI Content Generation",
    ],
    areaServed: "Worldwide",
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
    publisher: {
      "@id": `${siteConfig.url}/#organization`,
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
  imageAlt?: string;
  secondaryImageUrl?: string;
  secondaryImageWidth?: number;
  secondaryImageHeight?: number;
  secondaryImageAlt?: string;
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

  const primaryImageObject = {
    "@type": "ImageObject",
    url: imageUrl,
    ...(article.imageWidth && article.imageHeight
      ? { width: article.imageWidth, height: article.imageHeight }
      : {}),
    caption: article.imageAlt || article.title,
    representativeOfPage: true,
  };

  const secondaryImageUrlResolved = article.secondaryImageUrl
    ? article.secondaryImageUrl.startsWith("http")
      ? article.secondaryImageUrl
      : `${siteConfig.url}${article.secondaryImageUrl}`
    : undefined;

  const secondaryImageObject = secondaryImageUrlResolved
    ? {
        "@type": "ImageObject",
        url: secondaryImageUrlResolved,
        ...(article.secondaryImageWidth && article.secondaryImageHeight
          ? {
              width: article.secondaryImageWidth,
              height: article.secondaryImageHeight,
            }
          : {}),
        caption: article.secondaryImageAlt || article.title,
        representativeOfPage: false,
      }
    : null;

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
      worksFor: { "@id": `${siteConfig.url}/#organization` },
    },
    publisher: { "@id": `${siteConfig.url}/#organization` },
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": article.url,
    },
    isAccessibleForFree: true,
    publishingPrinciples: `${siteConfig.url}/blog/why-youtube-tools-hub`,
    keywords: article.keywords?.join(", "),
    image: secondaryImageObject
      ? [primaryImageObject, secondaryImageObject]
      : primaryImageObject,
    about: {
      "@type": "Thing",
      name: "YouTube",
      sameAs: "https://www.wikidata.org/wiki/Q866",
    },
    ...(article.mentions && article.mentions.length > 0
      ? { mentions: article.mentions }
      : {}),
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "[data-speakable]"],
    },
    articleSection: article.section,
    inLanguage: article.inLanguage || "en",
    isPartOf: {
      "@type": "Blog",
      "@id": `${siteConfig.url}/blog#blog`,
      name: `${siteConfig.name} Blog`,
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
    isPartOf: { "@id": `${siteConfig.url}/#website` },
    hasDefinedTerm: terms.map((term) => ({
      "@type": "DefinedTerm",
      name: term.name,
      description: term.description,
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
    isPartOf: { "@id": `${siteConfig.url}/#website` },
    publisher: { "@id": `${siteConfig.url}/#organization` },
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
    worksFor: { "@id": `${siteConfig.url}/#organization` },
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
      "YouTube CPM and RPM rate dataset across 50+ countries, covering Tier-1 averages, niche ranges, and creator revenue benchmarks.",
    url: options?.url ?? `${siteConfig.url}/resources/youtube-cpm-rates`,
    creator: { "@id": `${siteConfig.url}/#organization` },
    publisher: { "@id": `${siteConfig.url}/#organization` },
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
    spatialCoverage: "Global",
    keywords: [
      "YouTube CPM",
      "YouTube RPM",
      "YouTube AdSense rates",
      "YouTube monetization",
      "CPM by country",
    ],
    variableMeasured: ["CPM (USD)", "RPM (USD)", "Country ISO"],
    about: [
      { "@type": "Thing", name: "YouTube Monetization" },
      { "@type": "Thing", name: "AdSense Revenue" },
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
    operatingSystem: "Any",
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
    author: { "@id": `${siteConfig.url}/#organization` },
    publisher: { "@id": `${siteConfig.url}/#organization` },
  };
}

/** Absolute URL for a site path ("" or "/" → homepage). */
export function absoluteUrl(path: string): string {
  if (path.startsWith("http")) return path;
  if (!path || path === "/") return siteConfig.url;
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Per-page canonical + self-referencing hreflang for global English traffic.
 * Single-language site: all English variants point to the same canonical URL.
 * This signals to Google that one URL serves US/UK/IN/AU/CA English queries
 * without creating thin duplicate locale URLs. Never point alternates at
 * the homepage from inner URLs.
 */
export function getGlobalAlternates(path: string) {
  const url = absoluteUrl(path);
  return {
    canonical: url,
    languages: {
      en: url,
      "en-US": url,
      "en-GB": url,
      "en-AU": url,
      "en-CA": url,
      "en-NZ": url,
      "en-IE": url,
      "en-SG": url,
      "en-IN": url,
      "en-DE": url,
      "en-CH": url,
      "en-NL": url,
      "en-SE": url,
      "en-AE": url,
      "en-ZA": url,
      "en-PH": url,
      "en-MY": url,
      "x-default": url,
    },
  };
}
