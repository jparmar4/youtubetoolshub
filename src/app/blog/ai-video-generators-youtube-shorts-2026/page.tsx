import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { getArticleSchema, getBreadcrumbSchema } from "@/lib/seo";
import Link from "next/link";
import { FaRobot, FaVideo, FaDollarSign, FaRocket, FaTools, FaCheck } from "react-icons/fa";

export const metadata: Metadata = {
    title: "Best AI Video Generators for YouTube Shorts 2026 | Free & Paid Tools",
    description: "Discover the best AI video generators for YouTube Shorts in 2026. Create Shorts in minutes with Synthesia, Pictory, InVideo, and free alternatives.",
    keywords: ["ai video generator", "ai video maker", "youtube shorts generator", "ai shorts maker", "text to video ai"],
    openGraph: {
        title: "Best AI Video Generators for YouTube Shorts 2026",
        description: "Create Shorts in minutes with AI. Compare the best free and paid tools.",
        url: `${siteConfig.url}/blog/ai-video-generators-youtube-shorts-2026`,
        images: [`${siteConfig.url}/images/blog/ai-video-generators.png`],
    },
    twitter: {
        card: "summary_large_image",
        title: "AI Video Generators for Shorts 2026",
        description: "Create YouTube Shorts with AI in minutes",
        images: [`${siteConfig.url}/images/blog/ai-video-generators.png`],
    },
    alternates: {
        canonical: "/blog/ai-video-generators-youtube-shorts-2026",
        languages: {
            "en": "/blog/ai-video-generators-youtube-shorts-2026",
            "x-default": "/blog/ai-video-generators-youtube-shorts-2026",
        },
    },
};

const videoGenerators = [
    {
        name: "Synthesia",
        price: "$22+/mo",
        rating: "9/10",
        features: ["AI Avatars", "140+ languages", "Pro quality"],
    },
    {
        name: "Pictory",
        price: "$19+/mo",
        rating: "8/10",
        features: ["Script to video", "Blog to video", "Auto-captions"],
    },
    {
        name: "InVideo",
        price: "Free/$15+/mo",
        rating: "8/10",
        features: ["5000+ templates", "iStock library", "AI script"],
    },
    {
        name: "FlexClip",
        price: "Free/$9.99+/mo",
        rating: "7/10",
        features: ["Easy editing", "Stock media", "AI tools"],
    },
    {
        name: "Canva Video",
        price: "Free/$12.99/mo",
        rating: "8/10",
        features: ["Templates", "Brand kit", "Easy to use"],
    },
];

const useCases = [
    {
        title: "Faceless Channels",
        description: "Create entire Shorts without camera or voiceover. Perfect for automation channels.",
        icon: <FaRobot className="text-purple-500" />,
    },
    {
        title: "Content Repurposing",
        description: "Turn blog posts and long videos into viral Shorts automatically.",
        icon: <FaVideo className="text-blue-500" />,
    },
    {
        title: "Bulk Production",
        description: "Create 10-50 Shorts per day for maximum growth and exposure.",
        icon: <FaDollarSign className="text-green-500" />,
    },
];

const relatedTools = [
    {
        name: "Script Generator",
        description: "Generate AI scripts for your Shorts.",
        link: "/tools/youtube-script-generator",
    },
    {
        name: "Title Generator",
        description: "Create viral titles for your AI videos.",
        link: "/tools/youtube-title-generator",
    },
    {
        name: "Trend Analyzer",
        description: "Find trending topics for AI videos.",
        link: "/tools/youtube-trend-analyzer",
    },
];

export default function AIVideoGeneratorsPage() {
    const articleSchema = getArticleSchema({
        title: metadata.title as string,
        description: metadata.description as string,
        url: `${siteConfig.url}/blog/ai-video-generators-youtube-shorts-2026`,
        imageUrl: `${siteConfig.url}/images/blog/ai-video-generators.png`,
        datePublished: "2026-02-01",
        dateModified: "2026-02-01",
        author: siteConfig.name,
    });

    const breadcrumbSchema = getBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Blog", url: "/blog" },
        { name: "AI Video Generators", url: "/blog/ai-video-generators-youtube-shorts-2026" },
    ]);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />

            <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 pb-24">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 text-sm font-bold mb-6">
                            <FaRobot className="text-lg" />
                            AI Tools Guide 2026
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-8 leading-tight">
                            Best AI Video Generators<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">for YouTube Shorts</span>
                        </h1>
                        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
                            Create professional YouTube Shorts in minutes with AI. No filming or editing skills required.
                        </p>
                    </div>

                    {/* Key Stats */}
                    <div className="grid md:grid-cols-3 gap-6 mb-16">
                        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 text-center border border-slate-100 dark:border-slate-800">
                            <div className="text-3xl font-bold text-purple-600 mb-2">2-5 min</div>
                            <div className="text-slate-600 dark:text-slate-400">Create a Short</div>
                        </div>
                        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 text-center border border-slate-100 dark:border-slate-800">
                            <div className="text-3xl font-bold text-pink-600 mb-2">$0-22</div>
                            <div className="text-slate-600 dark:text-slate-400">Monthly cost range</div>
                        </div>
                        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 text-center border border-slate-100 dark:border-slate-800">
                            <div className="text-3xl font-bold text-green-600 mb-2">50+</div>
                            <div className="text-slate-600 dark:text-slate-400">Shorts per day possible</div>
                        </div>
                    </div>

                    {/* Tools Comparison */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Top AI Video Generators</h2>
                        <div className="space-y-4">
                            {videoGenerators.map((tool, index) => (
                                <div key={index} className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div>
                                            <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{tool.name}</h3>
                                            <div className="flex items-center gap-4 mt-2">
                                                <span className={tool.price.startsWith("Free") ? "text-green-600 font-bold" : "text-slate-600 dark:text-slate-400"}>
                                                    {tool.price}
                                                </span>
                                                <span className="text-purple-600 font-bold">{tool.rating}</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {tool.features.map((feature, i) => (
                                                <span key={i} className="inline-flex items-center gap-1 px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-sm text-slate-700 dark:text-slate-300">
                                                    <FaCheck className="text-green-500 text-xs" /> {feature}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Use Cases */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Use Cases for AI Video</h2>
                        <div className="grid gap-6">
                            {useCases.map((useCase, index) => (
                                <div key={index} className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800">
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                                            {useCase.icon}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                                                {useCase.title}
                                            </h3>
                                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                                {useCase.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Our Tools */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Helpful AI Tools</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            {relatedTools.map((tool, index) => (
                                <div key={index} className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 hover:shadow-lg transition-shadow">
                                    <div className="flex items-center gap-3 mb-4">
                                        <FaTools className="text-purple-500 text-xl" />
                                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                                            {tool.name}
                                        </h3>
                                    </div>
                                    <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                                        {tool.description}
                                    </p>
                                    <Link
                                        href={tool.link}
                                        className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium"
                                    >
                                        Try Free
                                        <FaRocket className="text-sm" />
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-12 text-center text-white">
                        <h2 className="text-3xl font-bold mb-4">Start Creating AI Shorts</h2>
                        <p className="text-purple-100 text-lg mb-8 max-w-2xl mx-auto">
                            Learn how to build a faceless channel using AI video generators.
                        </p>
                        <Link
                            href="/blog/faceless-youtube-channel-2026"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-600 rounded-xl font-bold hover:bg-slate-100 transition-colors"
                        >
                            <FaVideo className="text-xl" />
                            Faceless Channel Guide
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
