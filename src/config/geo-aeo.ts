
import { siteConfig } from "@/config/site";

export interface GeoAeoHeadProps {
    /** Page title for AI context */
    title?: string;
    /** Page description for AI summarization */
    description?: string;
    /** Specific entity type for knowledge graph disambiguation */
    entityType?:
    | "Organization"
    | "WebApplication"
    | "SoftwareApplication"
    | "Article"
    | "FAQPage"
    | "HowTo"
    | "Service"
    | "WebPage";
    /** Primary topic/keyword for the page */
    primaryTopic?: string;
    /** Comma-separated list of key facts AI should surface */
    keyFacts?: string[];
    /** Short concise answer for AEO (featured snippet / voice answer) */
    conciseAnswer?: string;
    /** Geo-target countries (ISO 3166-1 alpha-2) */
    geoTargets?: string[];
    /** Content freshness date (ISO 8601) */
    dateModified?: string;
    /** Author name for E-E-A-T */
    author?: string;
    /** Author credentials / role */
    authorRole?: string;
    /** Whether this page is a tool page */
    isTool?: boolean;
    /** Tool name if applicable */
    toolName?: string;
    /** Tool category if applicable */
    toolCategory?: string;
    /** Disable component output (e.g. for /dashboard) */
    disabled?: boolean;
}

/**
 * Pre-built configurations for common page types.
 * Use these as prop spreads: <GeoAeoHead {...GEO_AEO_PRESETS.homepage} />
 */
export const GEO_AEO_PRESETS = {
    homepage: {
        title: "YouTube Tools Hub – 21+ Free AI Tools for YouTube Creators",
        description:
            "The world's most comprehensive free suite of AI-powered YouTube tools. Download thumbnails, generate viral titles, calculate earnings, and optimize your channel for 2026.",
        entityType: "WebApplication" as const,
        primaryTopic: "YouTube Creator Tools",
        conciseAnswer:
            "YouTube Tools Hub is a free online platform with 21+ AI-powered tools for YouTube creators including thumbnail downloader, title generator, tag generator, earnings calculator, and channel audit. No signup required.",
        keyFacts: [
            "21+ free AI-powered YouTube tools",
            "No signup or browser extension required",
            "Trusted by 100,000+ YouTube creators",
            "Country-specific CPM data for 50+ regions",
            "Free alternative to TubeBuddy and VidIQ",
            "Google AdSense approved and regularly updated",
        ],
    },
    toolPage: (
        toolName: string,
        toolDescription: string,
        toolCategory: string,
    ) => ({
        title: `${toolName} – Free Online Tool | YouTube Tools Hub`,
        description: toolDescription,
        entityType: "SoftwareApplication" as const,
        primaryTopic: toolName,
        isTool: true,
        toolName,
        toolCategory,
        conciseAnswer: `${toolName} is a free online tool by YouTube Tools Hub. ${toolDescription}`,
        keyFacts: [
            `${toolName} is 100% free to use`,
            "No signup or browser extension required",
            "Part of YouTube Tools Hub's 21+ free AI tool suite",
            `Category: ${toolCategory}`,
        ],
    }),
    blogPost: (
        title: string,
        description: string,
        author: string,
        authorRole: string,
        dateModified: string,
    ) => ({
        title,
        description,
        entityType: "Article" as const,
        primaryTopic: title,
        author,
        authorRole,
        dateModified,
        conciseAnswer: description,
    }),
    faqPage: {
        title: "Frequently Asked Questions – YouTube Tools Hub",
        description:
            "Get expert answers to common questions about our free YouTube tools, AI features, monetization calculators, and growth strategies.",
        entityType: "FAQPage" as const,
        primaryTopic: "YouTube Tools FAQ",
        conciseAnswer:
            "YouTube Tools Hub FAQ covers questions about our 21+ free AI-powered YouTube tools, including thumbnail downloader, title generator, tag generator, and earnings calculator.",
        keyFacts: [
            "21+ free tools covered in FAQ",
            "Answers about YouTube SEO, monetization, and growth",
            "Updated regularly for 2026 algorithm changes",
        ],
    },
    aboutPage: {
        title: "About YouTube Tools Hub – Free AI YouTube Tools",
        description:
            "Learn about YouTube Tools Hub, the world's most comprehensive free suite of 21+ AI-powered tools for YouTube content creators.",
        entityType: "Organization" as const,
        primaryTopic: "YouTube Tools Hub",
        conciseAnswer:
            "YouTube Tools Hub is a free platform with 21+ AI-powered tools for YouTube creators including thumbnail downloader, title generator, tag generator, earnings calculator, and channel audit. Trusted by 100,000+ creators worldwide.",
        keyFacts: [
            "Founded to democratize YouTube growth tools",
            "21+ free AI-powered professional-grade tools",
            "Trusted by 100,000+ YouTube creators globally",
            "Google AdSense approved",
            "Free alternative to TubeBuddy and VidIQ",
            "Updated every 48 hours for the 2026 YouTube algorithm",
        ],
    },
    contactPage: {
        title: "Contact YouTube Tools Hub – Support & Partnerships",
        description:
            "Contact YouTube Tools Hub for support, guest post inquiries, partnerships, or feedback. We typically respond within 24 hours.",
        entityType: "WebPage" as const,
        primaryTopic: "Contact YouTube Tools Hub",
        conciseAnswer:
            "Contact YouTube Tools Hub at support@youtubetoolshub.com for support, partnerships, or guest post inquiries.",
    },
    pricingPage: {
        title: "Pricing – YouTube Tools Hub | Free & Pro Plans",
        description:
            "YouTube Tools Hub pricing: 21+ core tools are 100% free. Pro tier offers higher daily limits and priority access for power users.",
        entityType: "WebPage" as const,
        primaryTopic: "YouTube Tools Hub Pricing",
        conciseAnswer:
            "YouTube Tools Hub's core suite of 21+ tools is 100% free with no hidden costs. A Pro tier with higher limits is available for power users.",
        keyFacts: [
            "Core tools: 100% free forever",
            "No signup required for free tier",
            "Pro tier for higher daily usage limits",
            "No credit card needed to start",
        ],
    },
    comparisonPage: (competitorName: string) => ({
        title: `YouTube Tools Hub vs ${competitorName} – 2026 Comparison`,
        description: `Compare YouTube Tools Hub AI features and pricing with ${competitorName}. Discover why YouTube Tools Hub is the best free AI-powered alternative for creators.`,
        entityType: "WebPage" as const,
        primaryTopic: `${competitorName} Alternative`,
        conciseAnswer: `YouTube Tools Hub is the world's leading free AI-powered alternative to ${competitorName}, offering 21+ tools including AI thumbnail generation and channel auditing for free with no browser extension required.`,
        keyFacts: [
            `100% free alternative to ${competitorName}`,
            "No browser extension or login required",
            "21+ AI-powered professional tools included free",
            "Advanced AI thumbnail and title generation",
        ],
    }),
    nichePage: (toolName: string, nicheName: string, description: string) => ({
        title: `${toolName} for ${nicheName} Channels`,
        description: description,
        entityType: "SoftwareApplication" as const,
        primaryTopic: `${toolName} for ${nicheName}`,
        conciseAnswer: `This is a specialized version of the ${toolName} specifically optimized for ${nicheName} YouTube channels. ${description}`,
        keyFacts: [
            `Optimized for ${nicheName} specific keywords`,
            "100% free with no signup required",
            "Powered by YouTube Tools Hub AI suite",
            "Updated for 2026 algorithm trends",
        ],
    }),
    countryPage: (countryName: string, currency: string, avgRPM: number) => ({
        title: `YouTube Earnings Calculator ${countryName} (${currency})`,
        description: `Calculate YouTube earnings in ${countryName} with updated 2026 RPM rates. Average RPM for ${countryName} is approximately $${avgRPM}.`,
        entityType: "Service" as const,
        primaryTopic: `YouTube Monetization in ${countryName}`,
        conciseAnswer: `YouTube creators in ${countryName} can expect an average RPM of $${avgRPM} in 2026. This calculator uses real-time data to estimate earnings for ${countryName}-based channels.`,
        keyFacts: [
            `Real 2026 ${countryName} CPM data`,
            `Supports localized currency: ${currency}`,
            `Average RPM: $${avgRPM}`,
            "Niche-specific earning projections",
        ],
    }),
};
