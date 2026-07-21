import { siteConfig } from "@/config/site";
import { tools } from "@/config/tools";
import { citableFacts, DATA_LAST_REVIEWED, speakableAnswers } from "@/lib/seo-data";

export const dynamic = "force-static";
export const revalidate = 86400;

export async function GET() {
    const baseUrl = siteConfig.url;

    const knowledgeGraph = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Organization",
                "@id": `${baseUrl}/#organization`,
                name: siteConfig.name,
                url: baseUrl,
                logo: {
                    "@type": "ImageObject",
                    "@id": `${baseUrl}/#logo`,
                    url: `${baseUrl}/og-image.png`,
                    contentUrl: `${baseUrl}/og-image.png`,
                    width: 1200,
                    height: 630,
                    caption: siteConfig.name,
                },
                image: `${baseUrl}/og-image.png`,
                description: siteConfig.description,
                email: siteConfig.contact.email,
                foundingDate: "2025",
                slogan: "Free AI-Powered YouTube Tools for Every Creator",
                sameAs: siteConfig.footerLinks.social.map((s) => s.href),
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
                    "YouTube Earnings Calculator",
                    "YouTube Partner Program",
                ],
            },
            {
                "@type": "Person",
                "@id": `${baseUrl}/#editorial`,
                name: siteConfig.editorial.name,
                jobTitle: siteConfig.editorial.jobTitle,
                description: siteConfig.editorial.description,
                url: siteConfig.editorial.url,
                worksFor: { "@id": `${baseUrl}/#organization` },
            },
            {
                "@type": "Dataset",
                "@id": `${baseUrl}/resources/youtube-cpm-rates#dataset`,
                name: "YouTube CPM and RPM Rates by Country (2026)",
                description:
                    "Industry planning estimates of YouTube CPM and RPM for 50+ countries plus niche context.",
                url: `${baseUrl}/resources/youtube-cpm-rates`,
                creator: { "@id": `${baseUrl}/#organization` },
                dateModified: DATA_LAST_REVIEWED,
                isAccessibleForFree: true,
                keywords: "YouTube CPM, YouTube RPM, AdSense, creator earnings",
                abstract: speakableAnswers.howMuchYoutubePays,
                citation: citableFacts.preferredCitation,
            },
            {
                "@type": "WebApplication",
                "@id": `${baseUrl}/#webapp`,
                name: siteConfig.name,
                url: baseUrl,
                description: siteConfig.description,
                applicationCategory: "UtilityApplication",
                applicationSubCategory: "YouTube Creator Tools",
                operatingSystem: "Any (Web-based)",
                isAccessibleForFree: true,
                offers: {
                    "@type": "Offer",
                    price: "0",
                    priceCurrency: "USD",
                    availability: "https://schema.org/InStock",
                },
                featureList: tools.map((t) => t.name).join(", "),
                author: {
                    "@type": "Organization",
                    "@id": `${baseUrl}/#organization`,
                },
            },
            {
                "@type": "WebSite",
                "@id": `${baseUrl}/#website`,
                url: baseUrl,
                name: siteConfig.name,
                description: siteConfig.description,
                publisher: {
                    "@type": "Organization",
                    "@id": `${baseUrl}/#organization`,
                },
                potentialAction: {
                    "@type": "SearchAction",
                    target: {
                        "@type": "EntryPoint",
                        urlTemplate: `${baseUrl}/search?q={search_term_string}`,
                    },
                    "query-input": "required name=search_term_string",
                },
                inLanguage: "en",
            },
        ],
    };

    return new Response(JSON.stringify(knowledgeGraph, null, 2), {
        headers: {
            "Content-Type": "application/ld+json; charset=utf-8",
            "Cache-Control": "public, max-age=86400, stale-while-revalidate=3600",
            "Access-Control-Allow-Origin": "*",
        },
    });
}
