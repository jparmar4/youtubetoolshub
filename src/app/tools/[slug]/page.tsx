import { Suspense } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getToolBySlug, tools } from "@/config/tools";
import { getBreadcrumbSchema, getSoftwareApplicationSchema, getFAQSchema, getHowToSchema, getSpeakableSchema } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { niches, programmaticTools } from "@/config/programmatic";
import { countryCPMData } from "@/lib/cpm-data";
import MultiplexAd from "@/components/ads/MultiplexAd";
import HorizontalAd from "@/components/ads/HorizontalAd";
import InArticleAd from "@/components/ads/InArticleAd";
import BlogSidebar from "@/components/blog/BlogSidebar";
import Breadcrumb from "@/components/ui/Breadcrumb";


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
};

// Generate static params for all tools
export function generateStaticParams() {
    return tools.map((tool) => ({
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
        alternates: {
            canonical: `/tools/${tool.slug}`,
            languages: {
                'en': `/tools/${tool.slug}`,
                'x-default': `/tools/${tool.slug}`,
            },
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

    // Generate JSON-LD Structured Data
    const toolSchema = getSoftwareApplicationSchema({
        name: tool.name,
        description: tool.description,
        url: `${siteConfig.url}/tools/${tool.slug}`,
        category: tool.category,
        rating: tool.rating, // Include rating for rich snippets
    });

    const breadcrumbSchema = getBreadcrumbSchema([
        { name: "Home", url: siteConfig.url },
        { name: "Tools", url: `${siteConfig.url}/tools` },
        { name: tool.name, url: `${siteConfig.url}/tools/${tool.slug}` },
    ]);

    return (
        <>
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

                            {/* Horizontal Ad after tool usage */}
                            <HorizontalAd />

                            {/* TL;DR Summary for AI Extraction */}
                            <div className="summary glass-premium rounded-2xl p-6 border-l-4 border-purple-500">
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
                                        <span><strong>Price:</strong> 100% Free, no signup required</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-green-500 font-bold">✓</span>
                                        <span><strong>Category:</strong> YouTube Creator Tools</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-green-500 font-bold">✓</span>
                                        <span><strong>AI-Powered:</strong> {tool.isAI ? "Yes - uses advanced AI" : "No - instant utility tool"}</span>
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
                                        {/* Insert Ad between sections */}
                                        {idx < (tool.content?.length || 0) - 1 && idx % 2 === 0 && (
                                            <InArticleAd />
                                        )}
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
                        </div>

                        {/* Sidebar Column */}
                        <div className="max-lg:hidden lg:col-span-1 pt-20">
                            <BlogSidebar />
                        </div>
                    </div>

                    {/* Multiplex Ad */}
                    <div className="animate-fade-in-up delay-300 mt-12">
                        <MultiplexAd />
                    </div>
                </div>
            </div>

        </>
    );
}
