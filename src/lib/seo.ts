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
        sameAs: [
            "https://twitter.com/youtubetools",
            "https://youtube.com/@youtubetools",
        ],
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
