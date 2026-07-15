import { Suspense } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getToolBySlug, tools } from "@/config/tools";
import { getBreadcrumbSchema, getSoftwareApplicationSchema, getFAQSchema, getHowToSchema, getSpeakableSchema, getGlobalAlternates } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { niches, programmaticTools } from "@/config/programmatic";
import { countryCPMData } from "@/lib/cpm-data";
import MultiplexAd from "@/components/ads/MultiplexAd";
import BlogSidebar from "@/components/blog/BlogSidebar";
import Breadcrumb from "@/components/ui/Breadcrumb";
import GeoAeoHead from "@/components/seo/GeoAeoHead";
import { GEO_AEO_PRESETS } from "@/config/geo-aeo";
import ShareButtons from "@/components/ui/ShareButtons";
import NewsletterSignup from "@/components/ui/NewsletterSignup";
import { getAllBlogPosts } from "@/config/blog";
import {
    getPriorityTools,
    getRelatedBlogHintsForTool,
    getRelatedToolsForPost,
} from "@/lib/related-tools";


// Import all tool components
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
import ChannelAudit from "@/components/tools/ChannelAudit";
import SubscriberCountChecker from "@/components/tools/SubscriberCountChecker";
import VideoDownloadOptionsGuide from "@/components/tools/VideoDownloadOptionsGuide";
import TimestampGenerator from "@/components/tools/TimestampGenerator";
import ShortsScriptPlanner from "@/components/tools/ShortsScriptPlanner";
import BannerLogoMaker from "@/components/tools/BannerLogoMaker";
import NicheFinderQuiz from "@/components/tools/NicheFinderQuiz";

// Map slugs to components
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
    "youtube-channel-audit": ChannelAudit,
    "youtube-subscriber-count-checker": SubscriberCountChecker,
    "youtube-video-download-options": VideoDownloadOptionsGuide,
    "youtube-timestamp-generator": TimestampGenerator,
    "youtube-shorts-script-planner": ShortsScriptPlanner,
    "youtube-banner-logo-maker": BannerLogoMaker,
    "youtube-niche-finder-quiz": NicheFinderQuiz,
};

// Generate static params for all tools (dedicated routes own their own pages)
export function generateStaticParams() {
    return tools
        .filter((tool) => tool.slug !== "youtube-earnings-calculator")
        .map((tool) => ({
            slug: tool.slug,
        }));
}

// Generate metadata for each tool page
export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const tool = getToolBySlug(slug);

    if (!tool) {
        return {
            title: "Tool Not Found",
        };
    }

    return {
        title: tool.seoTitle || tool.name,
        description: tool.seoDescription || tool.description,
        keywords: tool.keywords,
        openGraph: {
            title: `${tool.seoTitle || tool.name} | YouTube Tools Hub`,
            description: tool.seoDescription || tool.description,
            type: "website",
            url: `${siteConfig.url}/tools/${tool.slug}`,
            images: [
                {
                    url: `${siteConfig.url}/og-image.png`,
                    width: 1200,
                    height: 630,
                    alt: tool.name,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: tool.seoTitle || tool.name,
            description: tool.seoDescription || tool.description,
            images: [`${siteConfig.url}/og-image.png`],
        },
        alternates: getGlobalAlternates(`/tools/${tool.slug}`),
        other: {
            "primaryTopic": tool.name,
            "abstract": tool.seoDescription || tool.description,
            "key-facts": [
                `${tool.name} is free to use`,
                tool.isAI ? "Uses AI-assisted generation" : "Runs as a focused creator utility",
                `Category: ${tool.category}`,
                "Designed to help YouTube creators complete a specific workflow"
            ].join(", "),
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-image-preview': 'large',
                'max-snippet': -1,
                'max-video-preview': -1,
            },
        },
    };
}

export default async function ToolPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const tool = getToolBySlug(slug);

    if (!tool) {
        notFound();
    }

    const ToolComponent = toolComponents[slug];

    if (!ToolComponent) {
        notFound();
    }

    // Get up to 5 related tools in the same category
    let relatedTools = tools.filter((t) => t.category === tool.category && t.slug !== tool.slug);
    if (relatedTools.length < 5) {
        const extraTools = tools.filter((t) => t.slug !== tool.slug && !relatedTools.some((r) => r.slug === t.slug));
        relatedTools = [...relatedTools, ...extraTools];
    }
    relatedTools = relatedTools.slice(0, 5);

    const relatedGuides = getRelatedBlogHintsForTool(
        tool,
        getAllBlogPosts().map((p) => ({
            slug: p.slug,
            title: p.title,
            category: p.category,
            keywords: p.keywords,
        })),
        4,
    );
    const sidebarTools = getRelatedToolsForPost(
        {
            title: tool.name,
            keywords: tool.keywords,
            category: tool.category,
            slug: tool.slug,
        },
        5,
    ).filter((t) => t.slug !== tool.slug);

    // Generate JSON-LD Structured Data
    const toolSchema = getSoftwareApplicationSchema({
        name: tool.name,
        description: tool.description,
        url: `${siteConfig.url}/tools/${tool.slug}`,
        category: tool.category,
    });

    const breadcrumbSchema = getBreadcrumbSchema([
        { name: "Home", url: siteConfig.url },
        { name: "Tools", url: `${siteConfig.url}/tools` },
        { name: tool.name, url: `${siteConfig.url}/tools/${tool.slug}` },
    ]);

    return (
        <>
            {/* AI Search & GEO/AEO Optimization Signals */}
            <GeoAeoHead
                {...GEO_AEO_PRESETS.toolPage(
                    tool.name,
                    tool.seoDescription || tool.description,
                    tool.category
                )}
                pathname={`/tools/${tool.slug}`}
            />

            {/* JSON-LD Structured Data */}
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
            {tool.faqs && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(getFAQSchema(tool.faqs)),
                    }}
                />
            )}
            {tool.howTo && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(getHowToSchema(tool.howTo)),
                    }}
                />
            )}
            {/* Speakable Schema for Voice Search (Google Assistant, Alexa, Siri) */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(getSpeakableSchema({
                        url: `${siteConfig.url}/tools/${tool.slug}`,
                        headline: tool.name,
                        summary: tool.description,
                        cssSelectors: ["h1", "h2", ".key-facts", ".summary"],
                    })),
                }}
            />

            <div className="min-h-screen py-12 lg:py-20 relative overflow-hidden">
                <div className="nebula-bg" />
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">

                    {/* Breadcrumb Navigation */}
                    <div className="mb-8">
                        <Breadcrumb
                            items={[
                                { name: "Home", href: "/" },
                                { name: "Tools", href: "/tools" },
                                { name: tool.name }
                            ]}
                        />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Column */}
                        <div className="lg:col-span-2 space-y-12">
                            <Suspense fallback={<div className="min-h-[400px] flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500" /></div>}>
                                <ToolComponent />
                            </Suspense>

                            {/* Share This Tool */}
                            <div className="glass-premium rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                                <p className="text-slate-700 font-medium">Found this tool helpful? Share it with fellow creators!</p>
                                <ShareButtons
                                    url={`${siteConfig.url}/tools/${tool.slug}`}
                                    title={`${tool.name} - Free YouTube Tool`}
                                    description={tool.shortDescription}
                                />
                            </div>

                            {/* Internal Linking for Programmatic Tools */}
                            {programmaticTools.includes(tool.slug) && (
                                <div className="glass-premium rounded-2xl p-8 border border-purple-100 dark:border-purple-900/30">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                                        <span className="text-purple-500">✨</span>
                                        Specialized Versions
                                    </h3>
                                    <p className="text-slate-600 dark:text-gray-400 mb-6">
                                        Using a specific niche? Try our optimized versions of this tool:
                                    </p>
                                    <div className="flex flex-wrap gap-3">
                                        {niches.map((niche) => (
                                            <Link
                                                key={niche.id}
                                                href={`/tools/${tool.slug}/${niche.id}`}
                                                className="px-4 py-2 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-lg text-sm font-medium hover:border-purple-500 hover:text-purple-600 transition-colors"
                                            >
                                                {niche.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Internal Linking for Earnings Calculator (Countries) */}
                            {tool.slug === "youtube-earnings-calculator" && (
                                <div className="glass-premium rounded-2xl p-8 border border-green-100 dark:border-green-900/30">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                                        <span className="text-green-500">🌍</span>
                                        Browse by Country
                                    </h3>
                                    <div className="flex flex-wrap gap-3">
                                        {countryCPMData.slice(0, 12).map((country) => (
                                            <Link
                                                key={country.slug}
                                                href={`/tools/youtube-earnings-calculator/${country.slug}`}
                                                className="px-4 py-2 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-lg text-sm font-medium hover:border-green-500 hover:text-green-600 transition-colors"
                                            >
                                                {country.flag} {country.name}
                                            </Link>
                                        ))}
                                        <Link
                                            href="/tools/youtube-earnings-calculator"
                                            className="px-4 py-2 bg-green-50 text-green-700 rounded-lg text-sm font-medium hover:bg-green-100 transition-colors"
                                        >
                                            View All Countries
                                        </Link>
                                    </div>
                                </div>
                            )}

                            {/* AEO definition + TL;DR for featured snippets / AI citations */}
                            {tool.definitionBlock && (
                                <div
                                    className="summary glass-premium rounded-2xl p-6 border-l-4 border-fuchsia-500"
                                    data-speakable
                                >
                                    <h2 className="text-lg font-bold text-fuchsia-600 mb-2">
                                        {tool.definitionBlock.title}
                                    </h2>
                                    <p className="text-slate-700 text-lg leading-relaxed">
                                        {tool.definitionBlock.text}
                                    </p>
                                </div>
                            )}
                            <div
                                className="summary glass-premium rounded-2xl p-6 border-l-4 border-purple-500"
                                data-speakable
                            >
                                <h2 className="text-lg font-bold text-purple-600 mb-2 flex items-center gap-2">
                                    ⚡ Quick Summary
                                </h2>
                                <p className="text-slate-700 text-lg leading-relaxed">
                                    {tool.description}
                                </p>
                            </div>

                            {/* Key Facts for AI Extraction - Bullet format is optimal for LLMs */}
                            <div className="key-facts glass-premium rounded-2xl p-8 shadow-sm">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                    📊 Key Facts
                                </h2>
                                <ul className="space-y-4 text-lg text-slate-600">
                                    <li className="flex items-start gap-3">
                                        <span className="text-green-500 font-bold">✓</span>
                                        <span><strong>Tool:</strong> {tool.name}</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-green-500 font-bold">✓</span>
                                        <span><strong>Price:</strong> Free to use</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-green-500 font-bold">✓</span>
                                        <span><strong>Category:</strong> YouTube Creator Tools</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-green-500 font-bold">✓</span>
                                        <span><strong>AI-Assisted:</strong> {tool.isAI ? "Yes - uses AI-assisted generation" : "No - browser utility tool"}</span>
                                    </li>
                                    {tool.howTo && (
                                        <li className="flex items-start gap-3">
                                            <span className="text-green-500 font-bold">✓</span>
                                            <span><strong>Time Required:</strong> {tool.howTo.totalTime === "PT1M" ? "Under 1 minute" : "2-5 minutes"}</span>
                                        </li>
                                    )}
                                </ul>
                            </div>

                            {/* Tool Content & AEO Section */}
                            <div className="space-y-12 animate-fade-in-up delay-100">
                                {tool.content?.map((section, idx) => (
                                    <div key={idx}>
                                        <div className="glass-premium rounded-2xl p-8 shadow-sm">
                                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                                {section.title}
                                            </h2>
                                            <p className="text-slate-600 leading-relaxed text-lg">
                                                {section.content}
                                            </p>
                                        </div>
                                    </div>
                                ))}

                                {/* How To Section */}
                                {tool.howTo && (
                                    <div className="glass-premium rounded-2xl p-8 shadow-sm">
                                        <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                            {tool.howTo.name}
                                        </h2>
                                        <p className="text-slate-600 mb-8 text-lg">
                                            {tool.howTo.description}
                                        </p>
                                        <div className="space-y-8">
                                            {tool.howTo.steps.map((step, idx) => (
                                                <div key={idx} className="flex gap-6">
                                                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-xl">
                                                        {idx + 1}
                                                    </div>
                                                    <div>
                                                        <h3 className="font-semibold text-xl text-gray-900 mb-2">
                                                            {step.name}
                                                        </h3>
                                                        <p className="text-slate-600 text-lg">
                                                            {step.text}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                            {/* FAQ Section */}
                            {tool.faqs && (
                                <div className="glass-premium rounded-2xl p-8 shadow-sm animate-fade-in-up delay-200">
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                        Frequently Asked Questions
                                    </h2>
                                    <div className="space-y-4">
                                        {tool.faqs.map((faq, idx) => (
                                            <div key={idx} className="border-b border-pink-100 dark:border-pink-900/30 last:border-0 pb-4 last:pb-0">
                                                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                                                    {faq.question}
                                                </h3>
                                                <p className="text-slate-600 dark:text-slate-300">
                                                    {faq.answer}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Related guides — tool → blog internal links */}
                            {relatedGuides.length > 0 && (
                                <div className="glass-premium rounded-2xl p-8 shadow-sm border border-slate-100">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                        Related free guides
                                    </h2>
                                    <p className="text-slate-600 mb-6">
                                        Deep-dive articles that pair well with this tool.
                                    </p>
                                    <ul className="space-y-3">
                                        {relatedGuides.map((guide) => (
                                            <li key={guide.slug}>
                                                <Link
                                                    href={`/blog/${guide.slug}`}
                                                    className="group flex items-start justify-between gap-3 rounded-xl border border-slate-100 bg-white px-4 py-3 hover:border-purple-300 hover:shadow-sm transition-all"
                                                >
                                                    <span>
                                                        <span className="text-xs font-bold uppercase tracking-wide text-purple-600">
                                                            {guide.category}
                                                        </span>
                                                        <span className="block font-semibold text-slate-800 group-hover:text-purple-700">
                                                            {guide.title}
                                                        </span>
                                                    </span>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Newsletter CTA */}
                            <div className="my-8">
                                <NewsletterSignup />
                            </div>

                            {/* Related Tools */}
                            <div className="glass-premium rounded-2xl p-6 border border-purple-100 dark:border-purple-900/30 mt-8">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                    <span className="text-purple-500">🔗</span>
                                    Related Tools
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {relatedTools.map((t) => {
                                        const Icon = t.icon;
                                        return (
                                            <Link
                                                key={t.slug}
                                                href={`/tools/${t.slug}`}
                                                className="flex items-center gap-3 p-2 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 text-slate-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-all"
                                            >
                                                <span className="w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center text-purple-500">
                                                    <Icon />
                                                </span>
                                                <span className="font-medium text-sm">{t.name}</span>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar Column */}
                        <div className="max-lg:hidden lg:col-span-1 space-y-8 pt-20">
                            <BlogSidebar
                                relatedTools={sidebarTools}
                                popularTools={getPriorityTools(6)}
                            />
                        </div>
                    </div>
                    {/* Keep the result workflow useful: one discovery unit at the end only. */}
                    <div className="animate-fade-in-up delay-300 mt-12">
                        <MultiplexAd />
                    </div>
                </div>
            </div>

        </>
    );
}
