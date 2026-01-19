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
}) {
    return {
        "@context": "https://schema.org",
        "@type": "Article",
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
        dateModified: article.datePublished,
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": article.url,
        },
        keywords: article.keywords?.join(", "),
    };
}

// Software Application Schema (for tools)
export function getSoftwareApplicationSchema(tool: {
    name: string;
    description: string;
    url: string;
    category: string;
}) {
    return {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: tool.name,
        description: tool.description,
        url: tool.url,
        applicationCategory: tool.category === "utility-fun" ? "UtilityApplication" : "MultimediaApplication",
        applicationSubCategory: "YouTube Tools",
        operatingSystem: "Web Browser",
        offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
        },
        aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.8",
            ratingCount: "1250",
            bestRating: "5",
            worstRating: "1",
        },
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
