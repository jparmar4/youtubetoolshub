import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getToolBySlug, tools } from "@/config/tools";
import { niches, getNicheContent, programmaticTools } from "@/config/programmatic";
import { siteConfig } from "@/config/site";
import { getBreadcrumbSchema, getSoftwareApplicationSchema, getFAQSchema, getHowToSchema } from "@/lib/seo";

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
        title: `${tool.name} for ${niche.name} Channels (2025) | Free Tool`,
        description: nicheContent.description,
        keywords: [...tool.keywords, ...niche.keywords, `${tool.name} for ${niche.name}`],
        openGraph: {
            title: `${tool.name} for ${niche.name} - Boost Your Views`,
            description: nicheContent.description,
            type: "website",
        },
        alternates: {
            canonical: `/tools/${tool.slug}/${niche.id}`,
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

    // Merge niche FAQs with generic tool FAQs
    const combinedFaqs = [
        ...(tool.faqs || []),
        {
            question: `Is this ${tool.name} good for ${niche.name} channels?`,
            answer: `Yes! This tool is specifically optimized to generate results relevant to the ${niche.name} niche, helping you rank for ${niche.examples[0]} and related topics.`
        }
    ];

    const breadcrumbSchema = getBreadcrumbSchema([
        { name: "Home", url: siteConfig.url },
        { name: "Tools", url: `${siteConfig.url}/tools` },
        { name: tool.name, url: `${siteConfig.url}/tools/${tool.slug}` },
        { name: `For ${niche.name}`, url: `${siteConfig.url}/tools/${tool.slug}/${niche.id}` },
    ]);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(breadcrumbSchema),
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
                        <div className="bg-red-50 dark:bg-red-900/10 border-b border-red-100 dark:border-red-900/30 rounded-2xl overflow-hidden">
                            <div className="py-8 px-4 sm:px-6 text-center">
                                <span className="inline-block px-3 py-1 rounded-full bg-red-100 text-red-600 text-sm font-medium mb-4">
                                    Specialized Tool for {niche.name}
                                </span>
                                <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
                                    {nicheContent.title}
                                </h1>
                                <p className="mt-4 text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                                    {nicheContent.description}
                                </p>
                            </div>
                        </div>

                        <ToolComponent />

                        <HorizontalAd />

                        {/* Niche Specific Content */}
                        <div className="space-y-8">
                            {nicheContent.content.map((section, idx) => (
                                <div key={idx} className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                        {section.title}
                                    </h2>
                                    <div className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
                                        <p>{section.content}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Generic Tool Content (Reused) */}
                        {tool.content && (
                            <div className="space-y-8 opacity-90">
                                {tool.content.map((section, idx) => (
                                    <div key={`generic-${idx}`} className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-8">
                                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                                            {section.title}
                                        </h2>
                                        <p className="text-gray-600 dark:text-gray-400">{section.content}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Sidebar Column */}
                    <div className="max-lg:hidden lg:col-span-1 pt-10">
                        <BlogSidebar />
                    </div>
                </div>
            </div>
        </>
    );
}
