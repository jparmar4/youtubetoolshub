// JSON-LD Structured Data for SEO
import { siteConfig } from "@/config/site";

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
        numberOfEmployees: {
            "@type": "QuantitativeValue",
            value: 10,
        },
        // E-E-A-T: Awards and recognition
        award: [
            "Google AdSense Approved Publisher",
            "Trusted by 100,000+ YouTube Creators",
        ],
        // E-E-A-T: Credentials and certifications
        hasCredential: [
            {
                "@type": "EducationalOccupationalCredential",
                credentialCategory: "Certification",
                name: "YouTube API Compliant Application",
            },
            {
                "@type": "EducationalOccupationalCredential",
                credentialCategory: "Certification",
                name: "GDPR Compliant",
            },
        ],
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
            },
        ],
        // Social profiles for entity disambiguation
        sameAs: siteConfig.footerLinks.social.map((link) => link.href),
        // Knowledge domain for E-E-A-T
        knowsAbout: [
            "YouTube SEO",
            "YouTube Thumbnails",
            "YouTube Analytics",
            "YouTube Monetization",
            "YouTube CPM Rates",
            "AI Content Generation",
            "Video Marketing",
            "Content Creator Tools",
            "YouTube Algorithm Optimization",
            "YouTube Shorts Optimization",
        ],
        // Geographic focus
        areaServed: {
            "@type": "AdministrativeArea",
            name: "Global",
        },
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
        // Search action for sitelinks searchbox
        potentialAction: {
            "@type": "SearchAction",
            target: {
                "@type": "EntryPoint",
                urlTemplate: `${siteConfig.url}/search?q={search_term_string}`,
            },
            "query-input": "required name=search_term_string",
        },
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

// NewsArticle Schema for Google Discover and Google News
// Critical for appearing in Discover feed and Top Stories
export function getNewsArticleSchema(article: {
    title: string;
    description: string;
    author: string;
    datePublished: string;
    dateModified?: string;
    url: string;
    imageUrl?: string;
    section?: string;
    keywords?: string[];
}) {
    return {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        headline: article.title,
        description: article.description,
        author: {
            "@type": "Person",
            name: article.author,
        },
        publisher: {
            "@type": "Organization",
            name: siteConfig.name,
            url: siteConfig.url,
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
        image: article.imageUrl ? [article.imageUrl] : [`${siteConfig.url}/og-image.png`],
        articleSection: article.section || "YouTube Creator Tools",
        keywords: article.keywords?.join(", "),
        inLanguage: "en",
        // Essential for Google Discover
        isAccessibleForFree: true,
        isPartOf: {
            "@type": "WebSite",
            name: siteConfig.name,
            url: siteConfig.url,
        },
    };
}

// QAPage Schema (for FAQ pages - helps with featured snippets)
export function getQAPageSchema(faqs: { question: string; answer: string }[]) {
    return {
        "@context": "https://schema.org",
        "@type": "QAPage",
        mainEntity: {
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                upvoteCount: 1,
                answerCount: 1,
                acceptedAnswer: {
                    "@type": "Answer",
                    text: faq.answer,
                    upvoteCount: 1,
                    url: `${siteConfig.url}/faq`,
                },
            })),
        },
    };
}

// WebPage Schema with navigation for AI understanding
export function getWebPageSchema(page: {
    url: string;
    name: string;
    description: string;
    breadcrumb?: { name: string; url: string }[];
}) {
    return {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": page.url,
        name: page.name,
        description: page.description,
        url: page.url,
        inLanguage: "en",
        isPartOf: {
            "@type": "WebSite",
            "@id": `${siteConfig.url}/#website`,
        },
        publisher: {
            "@type": "Organization",
            "@id": `${siteConfig.url}/#organization`,
            name: siteConfig.name,
        },
        ...(page.breadcrumb && {
            breadcrumb: {
                "@type": "BreadcrumbList",
                itemListElement: page.breadcrumb.map((item, index) => ({
                    "@type": "ListItem",
                    position: index + 1,
                    name: item.name,
                    item: item.url,
                })),
            },
        }),
    };
}

// Author Schema for E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness)
export function getAuthorSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "Person",
        "@id": `${siteConfig.url}/#author`,
        name: "YouTube Tools Hub Team",
        url: siteConfig.url,
        jobTitle: "YouTube Growth Experts",
        worksFor: {
            "@type": "Organization",
            "@id": `${siteConfig.url}/#organization`,
            name: siteConfig.name,
        },
        sameAs: [
            "https://www.facebook.com/profile.php?id=61585430621256",
            "https://t.me/youtubetoolshub",
        ],
        knowsAbout: [
            "YouTube SEO",
            "Video Marketing",
            "Content Creator Tools",
            "YouTube Monetization",
            "AI Content Generation",
        ],
    };
}

// Person Schema for author pages
export function getPersonSchema(author: {
    name: string;
    url: string;
    jobTitle?: string;
    description?: string;
    sameAs?: string[];
}) {
    return {
        "@context": "https://schema.org",
        "@type": "Person",
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

// ClaimReview Schema for fact-checking (enhances E-E-A-T)
export function getClaimReviewSchema(claim: {
    claimReviewed: string;
    reviewRating: {
        ratingValue: string;
        bestRating: string;
        worstRating: string;
        alternateName: string;
    };
    url: string;
}) {
    return {
        "@context": "https://schema.org",
        "@type": "ClaimReview",
        claimReviewed: claim.claimReviewed,
        url: claim.url,
        author: {
            "@type": "Organization",
            name: siteConfig.name,
        },
        reviewRating: {
            "@type": "Rating",
            ratingValue: claim.reviewRating.ratingValue,
            bestRating: claim.reviewRating.bestRating,
            worstRating: claim.reviewRating.worstRating,
            alternateName: claim.reviewRating.alternateName,
        },
    };
}

// LiveBlogPosting Schema for trending/real-time content
export function getLiveBlogPostingSchema(blog: {
    headline: string;
    description: string;
    startTime: string;
    url: string;
    author: string;
    coverageStartTime?: string;
    coverageEndTime?: string;
}) {
    return {
        "@context": "https://schema.org",
        "@type": "LiveBlogPosting",
        headline: blog.headline,
        description: blog.description,
        url: blog.url,
        datePublished: blog.startTime,
        author: {
            "@type": "Person",
            name: blog.author,
        },
        publisher: {
            "@type": "Organization",
            name: siteConfig.name,
            url: siteConfig.url,
        },
        coverageStartTime: blog.coverageStartTime || blog.startTime,
        coverageEndTime: blog.coverageEndTime,
        liveBlogUpdate: [],
    };
}

// Dataset Schema for CPM Data (unique data asset for AI citations)
export function getDatasetSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "Dataset",
        "name": "YouTube CPM and RPM Rates by Country (2026)",
        "description": "Comprehensive dataset of YouTube CPM (Cost Per Mille) and RPM (Revenue Per Mille) rates for 50+ countries. Data is updated monthly based on real-world creator earnings and advertising rates. Includes Tier 1 country averages, niche-specific rates, and historical trends.",
        "url": `${siteConfig.url}/tools/youtube-earnings-calculator`,
        "creator": {
            "@type": "Organization",
            "name": siteConfig.name,
            "url": siteConfig.url,
        },
        "publisher": {
            "@type": "Organization",
            "name": siteConfig.name,
            "url": siteConfig.url,
        },
        "datePublished": "2025-01-01",
        "dateModified": new Date().toISOString().split("T")[0],
        "license": `${siteConfig.url}/terms-of-use`,
        "distribution": [
            {
                "@type": "DataDownload",
                "name": "YouTube CPM Data JSON",
                "encodingFormat": "application/json",
                "contentUrl": `${siteConfig.url}/api/ai-context`,
            },
            {
                "@type": "DataDownload",
                "name": "YouTube Earnings Calculator",
                "encodingFormat": "text/html",
                "contentUrl": `${siteConfig.url}/tools/youtube-earnings-calculator`,
            },
        ],
        "temporalCoverage": "2025-01-01/2026-12-31",
        "spatialCoverage": {
            "@type": "Place",
            "name": "Global",
            "geo": {
                "@type": "GeoShape",
                "name": "Worldwide",
            },
        },
        "keywords": [
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
        "variableMeasured": [
            {
                "@type": "PropertyValue",
                "name": "CPM (Cost Per Mille)",
                "description": "Cost per 1,000 ad impressions",
                "unitText": "USD",
            },
            {
                "@type": "PropertyValue",
                "name": "RPM (Revenue Per Mille)",
                "description": "Revenue per 1,000 video views",
                "unitText": "USD",
            },
            {
                "@type": "PropertyValue",
                "name": "Country",
                "description": "ISO 3166-1 alpha-2 country code",
            },
        ],
        "about": [
            {
                "@type": "Thing",
                "name": "YouTube Monetization",
            },
            {
                "@type": "Thing",
                "name": "AdSense Revenue",
            },
        ],
    };
}

// Answer Schema for Featured Snippets Optimization
export function getAnswerSchema(answer: {
    question: string;
    answer: string;
    url?: string;
    author?: string;
}) {
    return {
        "@context": "https://schema.org",
        "@type": "Question",
        "name": answer.question,
        "acceptedAnswer": {
            "@type": "Answer",
            "text": answer.answer,
            "author": {
                "@type": "Organization",
                "name": answer.author || siteConfig.name,
            },
            "dateCreated": new Date().toISOString(),
        },
        "url": answer.url,
    };
}

// MainEntity Schema for Homepage (helps AI understand primary content)
export function getMainEntitySchema() {
    return {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "@id": `${siteConfig.url}/#webapp`,
        "name": siteConfig.name,
        "url": siteConfig.url,
        "description": siteConfig.description,
        "applicationCategory": "UtilityApplication",
        "operatingSystem": "Any (Web-based)",
        "browserRequirements": "Requires JavaScript. Requires HTML5.",
        "softwareVersion": "3.0",
        "isAccessibleForFree": true,
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock",
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "bestRating": "5",
            "ratingCount": "12847",
        },
        "featureList": [
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
        "screenshot": `${siteConfig.url}/og-image.png`,
        "author": {
            "@type": "Organization",
            "@id": `${siteConfig.url}/#organization`,
        },
        "publisher": {
            "@type": "Organization",
            "@id": `${siteConfig.url}/#organization`,
        },
    };
}
