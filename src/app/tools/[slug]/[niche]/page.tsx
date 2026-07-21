import { Suspense } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getToolBySlug, tools } from "@/config/tools";
import { niches, getNicheContent, programmaticTools } from "@/config/programmatic";
import { siteConfig } from "@/config/site";
import { getBreadcrumbSchema, getSoftwareApplicationSchema, getFAQSchema, getSpeakableSchema } from "@/lib/seo";
import GeoAeoHead from "@/components/seo/GeoAeoHead";
import { GEO_AEO_PRESETS } from "@/config/geo-aeo";
import { ToolContextProvider } from "@/components/tools/ToolContext";

// Import all tool components (reusing the main page imports)
// Note: In a real app we might want to move the component mapping to a shared file
import ThumbnailDownloader from "@/components/tools/ThumbnailDownloader";
import ThumbnailGenerator from "@/components/tools/ThumbnailGenerator";
import AIThumbnailGenerator from "@/components/tools/AIThumbnailGenerator";
import AIThumbnailPromptGenerator from "@/components/tools/AIThumbnailPromptGenerator";
import TitleGenerator from "@/components/tools/TitleGenerator";
import DescriptionGenerator from "@/components/tools/DescriptionGenerator";
import TagGenerator from "@/components/tools/TagGenerator";
import TagExtractor from "@/components/tools/TagExtractor";
import VideoIdeasGenerator from "@/components/tools/VideoIdeasGenerator";
import TrendHelper from "@/components/tools/TrendHelper";
import ContentCalendarGenerator from "@/components/tools/ContentCalendarGenerator";
import EarningsCalculator from "@/components/tools/EarningsCalculator";
import EngagementCalculator from "@/components/tools/EngagementCalculator";
import TitleABTester from "@/components/tools/TitleABTester";
import ChannelNameGenerator from "@/components/tools/ChannelNameGenerator";
import HashtagGenerator from "@/components/tools/HashtagGenerator";
import IntroScriptGenerator from "@/components/tools/IntroScriptGenerator";
import ChannelIdFinder from "@/components/tools/ChannelIdFinder";
import PlaylistLengthCalculator from "@/components/tools/PlaylistLengthCalculator";
import CommentPicker from "@/components/tools/CommentPicker";
import BlogSidebar from "@/components/blog/BlogSidebar";
import HorizontalAd from "@/components/ads/HorizontalAd";
import { getPriorityTools, getRelatedToolsForPost } from "@/lib/related-tools";

const toolComponents: Record<string, React.ComponentType> = {
    "youtube-thumbnail-downloader": ThumbnailDownloader,
    "youtube-thumbnail-generator": ThumbnailGenerator,
    "youtube-ai-thumbnail-generator": AIThumbnailGenerator,
    "youtube-ai-thumbnail-prompt": AIThumbnailPromptGenerator,
    "youtube-title-generator": TitleGenerator,
    "youtube-description-generator": DescriptionGenerator,
    "youtube-tag-generator": TagGenerator,
    "youtube-tag-extractor": TagExtractor,
    "youtube-video-ideas-generator": VideoIdeasGenerator,
    "youtube-trend-helper": TrendHelper,
    "youtube-content-calendar-generator": ContentCalendarGenerator,
    "youtube-earnings-calculator": EarningsCalculator,
    "youtube-engagement-rate-calculator": EngagementCalculator,
    "youtube-title-ab-tester": TitleABTester,
    "youtube-channel-name-generator": ChannelNameGenerator,
    "youtube-hashtag-generator": HashtagGenerator,
    "youtube-intro-script-generator": IntroScriptGenerator,
    "youtube-channel-id-finder": ChannelIdFinder,
    "youtube-playlist-length-calculator": PlaylistLengthCalculator,
    "youtube-comment-picker": CommentPicker,
};

/** Only prebuilt niche×tool URLs are valid — blocks thin soft-404s */
export const dynamicParams = false;

export async function generateStaticParams() {
    const params: { slug: string; niche: string }[] = [];

    // Only generate pages for tools that support programmatic SEO
    const supportedTools = tools.filter(tool => programmaticTools.includes(tool.slug));

    for (const tool of supportedTools) {
        for (const niche of niches) {
            params.push({
                slug: tool.slug,
                niche: niche.id
            });
        }
    }

    return params;
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string; niche: string }>;
}): Promise<Metadata> {
    const { slug, niche: nicheId } = await params;
    const tool = getToolBySlug(slug);
    const niche = niches.find(n => n.id === nicheId);

    if (!tool || !niche || !programmaticTools.includes(slug)) {
        return { title: "Page Not Found" };
    }

    const nicheContent = getNicheContent(tool.name, niche);

    return {
        title: `${tool.name} for ${niche.name} Channels | Free Tool`,
        description: nicheContent.description,
        keywords: [...tool.keywords, ...niche.keywords, `${tool.name} for ${niche.name}`],
        openGraph: {
            title: `${tool.name} for ${niche.name} Channels`,
            description: nicheContent.description,
            type: "website",
            url: `${siteConfig.url}/tools/${tool.slug}/${niche.id}`,
            images: [
                {
                    url: `${siteConfig.url}/og-image.png`,
                    width: 1200,
                    height: 630,
                    alt: `${tool.name} for ${niche.name}`,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: `${tool.name} for ${niche.name} Channels | Free Tool`,
            description: nicheContent.description,
            images: [`${siteConfig.url}/og-image.png`],
        },
        // Self-canonical long-tail niche landing pages (unique niche copy + tool)
        alternates: {
            canonical: `${siteConfig.url}/tools/${tool.slug}/${niche.id}`,
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                "max-image-preview": "large",
                "max-snippet": -1,
                "max-video-preview": -1,
            },
        },
        other: {
            primaryTopic: `${tool.name} for ${niche.name}`,
            abstract: nicheContent.description,
            "key-facts": [
                `Free ${tool.name} tailored for ${niche.name} channels`,
                `Keywords: ${niche.keywords.slice(0, 3).join(", ")}`,
                "No signup required",
                tool.isAI
                    ? "Uses AI-assisted generation"
                    : "Browser-based creator utility",
            ].join(", "),
        },
    };
}

export default async function ProgrammaticToolPage({
    params,
}: {
    params: Promise<{ slug: string; niche: string }>;
}) {
    const { slug, niche: nicheId } = await params;
    const tool = getToolBySlug(slug);
    const niche = niches.find(n => n.id === nicheId);

    if (!tool || !niche || !programmaticTools.includes(slug)) {
        notFound();
    }

    const ToolComponent = toolComponents[slug];
    const nicheContent = getNicheContent(tool.name, niche);

    const toolSchema = getSoftwareApplicationSchema({
        name: `${tool.name} for ${niche.name}`,
        description: nicheContent.description,
        url: `${siteConfig.url}/tools/${tool.slug}/${niche.id}`,
        category: tool.category,
    });

    // Niche FAQs first (unique), then a few generic tool FAQs
    const combinedFaqs = [
        ...(nicheContent.faqs || []),
        {
            question: `Is this ${tool.name} good for ${niche.name} channels?`,
            answer: `Yes. This free tool gives ${niche.name} creators a niche-specific starting point for topics like ${niche.examples[0]} and ${niche.examples[1] || niche.examples[0]}. Always review drafts before publishing.`,
        },
        ...(tool.faqs || []).slice(0, 3),
    ];

    const breadcrumbSchema = getBreadcrumbSchema([
        { name: "Home", url: siteConfig.url },
        { name: "Tools", url: `${siteConfig.url}/tools` },
        { name: tool.name, url: `${siteConfig.url}/tools/${tool.slug}` },
        { name: `For ${niche.name}`, url: `${siteConfig.url}/tools/${tool.slug}/${niche.id}` },
    ]);

    const speakableSchema = getSpeakableSchema({
        url: `${siteConfig.url}/tools/${tool.slug}/${niche.id}`,
        headline: nicheContent.title,
        summary: nicheContent.description,
        cssSelectors: ["h1", ".summary", "[data-speakable]"],
    });

    return (
        <>
            {/* AI Search & GEO/AEO Optimization Signals */}
            <GeoAeoHead
                {...GEO_AEO_PRESETS.nichePage(
                    tool.name,
                    niche.name,
                    nicheContent.description
                )}
                pathname={`/tools/${tool.slug}/${niche.id}`}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(toolSchema),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(breadcrumbSchema),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(speakableSchema),
                }}
            />
            {combinedFaqs.length > 0 && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(getFAQSchema(combinedFaqs)),
                    }}
                />
            )}

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Column */}
                    <div className="lg:col-span-2 space-y-12">
                        {/* Header Section */}
                        <div className="bg-purple-50 border border-purple-100 rounded-2xl overflow-hidden">
                            <div className="py-8 px-4 sm:px-6 text-center">
                                <span className="inline-block px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-4">
                                    Free {niche.name} tool
                                </span>
                                <h1
                                    className="text-3xl font-extrabold text-gray-900 sm:text-4xl"
                                    data-speakable
                                >
                                    {nicheContent.title}
                                </h1>
                                <p
                                    className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto summary"
                                    data-speakable
                                >
                                    {nicheContent.description}
                                </p>
                            </div>
                        </div>

                        <ToolContextProvider value={{ hideHeader: true }}>
                            <Suspense fallback={<div className="min-h-[250px] flex items-center justify-center bg-white rounded-2xl border border-purple-100 p-8"><p className="text-gray-400 font-medium">Loading generator...</p></div>}>
                                <ToolComponent />
                            </Suspense>
                        </ToolContextProvider>

                        <HorizontalAd />

                        {/* Niche-specific unique content (primary for long-tail SEO / Helpful Content) */}
                        <article className="space-y-8">
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-purple-100">
                                <p className="text-sm font-bold uppercase tracking-wide text-purple-600 mb-2">
                                    {niche.name} guide
                                </p>
                                <p className="text-gray-700 leading-relaxed summary" data-speakable>
                                    {nicheContent.description} Built for creators covering{" "}
                                    {niche.description}.
                                </p>
                            </div>
                            {nicheContent.content.map((section, idx) => (
                                <section
                                    key={idx}
                                    className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
                                >
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                        {section.title}
                                    </h2>
                                    <p className="text-gray-600 leading-relaxed text-lg">
                                        {section.content}
                                    </p>
                                </section>
                            ))}
                            <p className="text-gray-600 leading-relaxed">
                                Related free tools:{" "}
                                <Link href={`/tools/${tool.slug}`} className="text-purple-600 font-semibold hover:underline">
                                    main {tool.name}
                                </Link>
                                {" · "}
                                <Link href="/tools" className="text-purple-600 font-semibold hover:underline">
                                    all free YouTube tools
                                </Link>
                                {" · "}
                                <Link href="/resources/youtube-algorithm-guide" className="text-purple-600 font-semibold hover:underline">
                                    algorithm guide
                                </Link>
                                .
                            </p>
                        </article>

                        {/* FAQ for AEO */}
                        {combinedFaqs.length > 0 && (
                            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                    {niche.name} FAQ
                                </h2>
                                <div className="space-y-6">
                                    {combinedFaqs.slice(0, 6).map((faq, i) => (
                                        <div key={i}>
                                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                                {faq.question}
                                            </h3>
                                            <p className="text-gray-600 leading-relaxed">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Related niches internal links */}
                        <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">
                                More niches for {tool.name}
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {niches
                                    .filter((n) => n.id !== niche.id)
                                    .slice(0, 12)
                                    .map((n) => (
                                        <Link
                                            key={n.id}
                                            href={`/tools/${tool.slug}/${n.id}`}
                                            className="px-3 py-1.5 text-sm rounded-lg bg-white border border-slate-200 text-slate-700 hover:border-purple-400 hover:text-purple-700"
                                        >
                                            {n.name}
                                        </Link>
                                    ))}
                                <Link
                                    href={`/tools/${tool.slug}`}
                                    className="px-3 py-1.5 text-sm rounded-lg bg-purple-600 text-white hover:bg-purple-700"
                                >
                                    All-purpose tool
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Column */}
                    <div className="max-lg:hidden lg:col-span-1 pt-10">
                        <BlogSidebar
                            relatedTools={getRelatedToolsForPost(
                                {
                                    title: `${tool.name} ${niche.name}`,
                                    keywords: niche.keywords,
                                    category: niche.name,
                                    slug: tool.slug,
                                },
                                5,
                            )}
                            popularTools={getPriorityTools(6)}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
