import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { getArticleSchema, getBreadcrumbSchema } from "@/lib/seo";
import Link from "next/link";
import { FaRobot, FaChartLine, FaLightbulb, FaRocket, FaTools, FaDollarSign } from "react-icons/fa";

export const metadata: Metadata = {
    title: "YouTube Automation Complete Guide 2026: Build a Passive Income Channel",
    description: "Learn YouTube automation in 2026. Complete guide to building faceless channels, outsourcing content, and creating passive income with AI tools and virtual assistants.",
    keywords: ["youtube automation", "youtube automation channel", "faceless youtube channel", "passive income youtube", "youtube outsourcing"],
    openGraph: {
        title: "YouTube Automation Complete Guide 2026",
        description: "Build a passive income YouTube channel with automation and AI tools",
        url: `${siteConfig.url}/blog/youtube-automation-complete-guide-2026`,
        images: [`${siteConfig.url}/images/blog/automation-guide.png`],
    },
    twitter: {
        card: "summary_large_image",
        title: "YouTube Automation Complete Guide 2026",
        description: "Build a passive income YouTube channel with automation",
        images: [`${siteConfig.url}/images/blog/automation-guide.png`],
    },
    alternates: {
        canonical: "/blog/youtube-automation-complete-guide-2026",
        languages: {
            "en": "/blog/youtube-automation-complete-guide-2026",
            "x-default": "/blog/youtube-automation-complete-guide-2026",
        },
    },
};

const automationStrategies = [
    {
        title: "AI Content Generation",
        description: "Use ChatGPT for scripts, ElevenLabs for voiceovers, and AI video tools for editing. Cut production time by 80% while maintaining quality.",
        icon: <FaRobot className="text-purple-500" />,
    },
    {
        title: "Outsource to Virtual Assistants",
        description: "Hire VAs on Fiverr or Upwork for $5-15/video. They handle editing, thumbnails, and uploads while you focus on strategy.",
        icon: <FaChartLine className="text-blue-500" />,
    },
    {
        title: "Batch Content Production",
        description: "Create 4-8 videos in one session, schedule uploads, and let YouTube's algorithm work while you rest. Top automation channels post 1-2 videos daily.",
        icon: <FaLightbulb className="text-yellow-500" />,
    },
];

const automationTools = [
    {
        name: "AI Script Generator",
        description: "Generate engaging video scripts in seconds using AI technology.",
        link: "/tools/youtube-script-generator",
    },
    {
        name: "Title Generator",
        description: "Create click-worthy titles optimized for search and discovery.",
        link: "/tools/youtube-title-generator",
    },
    {
        name: "Earnings Calculator",
        description: "Estimate potential revenue from your automation channel.",
        link: "/tools/youtube-earnings-calculator",
    },
];

export default function YouTubeAutomationGuidePage() {
    const articleSchema = getArticleSchema({
        title: metadata.title as string,
        description: metadata.description as string,
        url: `${siteConfig.url}/blog/youtube-automation-complete-guide-2026`,
        imageUrl: `${siteConfig.url}/images/blog/automation-guide.png`,
        datePublished: "2026-02-01",
        dateModified: "2026-02-01",
        author: siteConfig.name,
    });

    const breadcrumbSchema = getBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Blog", url: "/blog" },
        { name: "YouTube Automation Guide", url: "/blog/youtube-automation-complete-guide-2026" },
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
                            Automation Masterclass 2026
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-8 leading-tight">
                            YouTube <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">Automation</span><br />
                            Complete Guide
                        </h1>
                        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
                            Build a passive income YouTube channel using AI tools, virtual assistants, and proven automation workflows.
                        </p>
                    </div>

                    {/* Key Statistics */}
                    <div className="grid md:grid-cols-3 gap-6 mb-16">
                        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 text-center border border-slate-100 dark:border-slate-800">
                            <div className="text-3xl font-bold text-purple-600 mb-2">$5-15</div>
                            <div className="text-slate-600 dark:text-slate-400">Cost per video (outsourced)</div>
                        </div>
                        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 text-center border border-slate-100 dark:border-slate-800">
                            <div className="text-3xl font-bold text-indigo-600 mb-2">80%</div>
                            <div className="text-slate-600 dark:text-slate-400">Time saved with AI tools</div>
                        </div>
                        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 text-center border border-slate-100 dark:border-slate-800">
                            <div className="text-3xl font-bold text-green-600 mb-2">$5K-50K</div>
                            <div className="text-slate-600 dark:text-slate-400">Monthly potential earnings</div>
                        </div>
                    </div>

                    {/* Strategies */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Automation Strategies</h2>
                        <div className="grid gap-6">
                            {automationStrategies.map((strategy, index) => (
                                <div key={index} className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800">
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                                            {strategy.icon}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                                                {strategy.title}
                                            </h3>
                                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                                {strategy.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Tools Section */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Automation Tools</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            {automationTools.map((tool, index) => (
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
                                        Try Now
                                        <FaRocket className="text-sm" />
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-12 text-center text-white">
                        <h2 className="text-3xl font-bold mb-4">Start Your Automation Journey</h2>
                        <p className="text-purple-100 text-lg mb-8 max-w-2xl mx-auto">
                            Use our AI-powered tools to create content faster and build your passive income channel.
                        </p>
                        <Link
                            href="/tools/youtube-script-generator"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-600 rounded-xl font-bold hover:bg-slate-100 transition-colors"
                        >
                            <FaDollarSign className="text-xl" />
                            Generate Your First Script
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
