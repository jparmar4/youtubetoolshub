// JSON-LD Structured Data for SEO
import { siteConfig } from "@/config/site";

// Organization Schema
export function getOrganizationSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: siteConfig.name,
        url: siteConfig.url,
        logo: `${siteConfig.url}/icon.svg`,
        description: siteConfig.description,
        contactPoint: {
            "@type": "ContactPoint",
            email: siteConfig.contact.email,
            contactType: "customer service",
        },
        sameAs: siteConfig.footerLinks.social.map((link) => link.href),
    };
}

// Website Schema
export function getWebsiteSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: siteConfig.name,
        url: siteConfig.url,
        description: siteConfig.description,
        potentialAction: {
            "@type": "SearchAction",
            target: {
                "@type": "EntryPoint",
                urlTemplate: `${siteConfig.url}/tools?q={search_term_string}`,
            },
            "query-input": "required name=search_term_string",
        },
    };
}

// Breadcrumb Schema
export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
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
    dateModified?: string;
    section?: string;
    inLanguage?: string;
}) {
    return {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: article.title,
        description: article.description,
        author: {
            "@type": "Person",
            name: article.author,
        },
        publisher: {
            "@type": "Organization",
            name: siteConfig.name,
            logo: {
                "@type": "ImageObject",
                url: `${siteConfig.url}/icon.svg`,
            },
        },
        datePublished: article.datePublished,
        dateModified: article.dateModified || article.datePublished,
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": article.url,
        },
        keywords: article.keywords?.join(", "),
        image: article.imageUrl ? [article.imageUrl] : undefined,
        articleSection: article.section,
        inLanguage: article.inLanguage || "en",
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
}) {
    const applicationCategory = tool.category === "thumbnail-media" ? "MultimediaApplication" : "UtilityApplication";

    return {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: tool.name,
        description: tool.description,
        url: tool.url,
        applicationCategory: applicationCategory, // Ensure this maps to a valid schema.org category
        operatingSystem: "Any", // Required field
        offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
        },
        ...(tool.rating
            ? {
                aggregateRating: {
                    "@type": "AggregateRating",
                    ratingValue: tool.rating.ratingValue,
                    ratingCount: tool.rating.ratingCount,
                    bestRating: tool.rating.bestRating || "5",
                    worstRating: tool.rating.worstRating || "1",
                },
            }
            : {}),
    };
}

// FAQ Schema
export function getFAQSchema(faqs: { question: string; answer: string }[]) {
    return {
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

// Local Business Schema (optional, for credibility)
export function getLocalBusinessSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        name: siteConfig.name,
        description: siteConfig.description,
        url: siteConfig.url,
        priceRange: "Free",
        address: {
            "@type": "PostalAddress",
            addressCountry: "US",
        },
    };
}

// Speakable Schema for Voice Search (AEO - Google Assistant, Alexa, Siri)
export function getSpeakableSchema(page: {
    url: string;
    headline: string;
    summary: string;
    cssSelectors?: string[];
}) {
    return {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": page.url,
        name: page.headline,
        speakable: {
            "@type": "SpeakableSpecification",
            cssSelector: page.cssSelectors || ["h1", "h2", ".summary", ".key-facts"],
        },
        url: page.url,
        description: page.summary,
        isPartOf: {
            "@type": "WebSite",
            name: siteConfig.name,
            url: siteConfig.url,
        },
    };
}

// ItemList Schema for tool listings (helps AI understand tool collection)
export function getToolListSchema(tools: { name: string; url: string; description: string }[]) {
    return {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "YouTube Creator Tools",
        description: "Complete collection of free AI-powered tools for YouTube content creators",
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

// DefinedTerm Schema for key concepts (helps AI understand terminology)
export function getDefinedTermSchema(term: {
    name: string;
    description: string;
    url: string;
}) {
    return {
        "@context": "https://schema.org",
        "@type": "DefinedTerm",
        name: term.name,
        description: term.description,
        url: term.url,
        inDefinedTermSet: {
            "@type": "DefinedTermSet",
            name: "YouTube Creator Terms",
            url: `${siteConfig.url}/glossary`,
        },
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

// Review Schema for tool ratings
export function getReviewSchema(review: {
    itemReviewed: string;
    reviewRating: {
        ratingValue: string;
        bestRating: string;
        worstRating: string;
    };
    author: {
        "@type": string;
        name: string;
    };
    reviewBody?: string;
    datePublished?: string;
}) {
    return {
        "@context": "https://schema.org",
        "@type": "Review",
        itemReviewed: {
            "@type": "SoftwareApplication",
            name: review.itemReviewed,
        },
        reviewRating: {
            "@type": "Rating",
            ratingValue: review.reviewRating.ratingValue,
            bestRating: review.reviewRating.bestRating || "5",
            worstRating: review.reviewRating.worstRating || "1",
        },
        author: {
            "@type": review.author["@type"] || "Person",
            name: review.author.name,
        },
        reviewBody: review.reviewBody,
        datePublished: review.datePublished,
    };
}

// AggregateRating Schema for overall tool ratings
export function getAggregateRatingSchema(rating: {
    itemReviewed: string;
    ratingValue: string;
    ratingCount: string;
    bestRating?: string;
    worstRating?: string;
}) {
    return {
        "@context": "https://schema.org",
        "@type": "AggregateRating",
        itemReviewed: {
            "@type": "SoftwareApplication",
            name: rating.itemReviewed,
        },
        ratingValue: rating.ratingValue,
        ratingCount: rating.ratingCount,
        bestRating: rating.bestRating || "5",
        worstRating: rating.worstRating || "1",
    };
}

// CollectionPage Schema for blog index and category pages
export function getCollectionPageSchema(collection: {
    name: string;
    description: string;
    url: string;
    items: { name: string; url: string; datePublished?: string; image?: string }[];
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
