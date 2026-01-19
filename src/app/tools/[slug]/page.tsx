import { Suspense } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getToolBySlug, tools } from "@/config/tools";
import { getBreadcrumbSchema, getSoftwareApplicationSchema, getFAQSchema, getHowToSchema, getSpeakableSchema } from "@/lib/seo";
import { siteConfig } from "@/config/site";


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
        },
        alternates: {
            canonical: `/tools/${tool.slug}`,
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
        category: "UtilityApplication", // or MultimediaApplication
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

            <div className="min-h-screen py-20 relative overflow-hidden">
                <div className="nebula-bg" />
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 pb-12">
                    {/* Visual Breadcrumbs */}
                    <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8" aria-label="Breadcrumb">
                        <Link href="/" className="hover:text-purple-600 transition-colors">
                            Home
                        </Link>
                        <span>/</span>
                        <Link href="/tools" className="hover:text-purple-600 transition-colors">
                            Tools
                        </Link>
                        <span>/</span>
                        <span className="text-slate-900 font-medium">{tool.name}</span>
                    </nav>

                    <Suspense fallback={<div className="min-h-[400px] flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500" /></div>}>
                        <ToolComponent />
                    </Suspense>

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
                            <div key={idx} className="glass-premium rounded-2xl p-8 shadow-sm">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                    {section.title}
                                </h2>
                                <p className="text-slate-600 leading-relaxed text-lg">
                                    {section.content}
                                </p>
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
            </div>

        </>
    );
}
