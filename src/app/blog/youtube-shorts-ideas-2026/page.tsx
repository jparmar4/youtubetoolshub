import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { getArticleSchema, getBreadcrumbSchema } from "@/lib/seo";
import Link from "next/link";
import { FaLightbulb, FaPlay, FaRocket, FaTools } from "react-icons/fa";

export const metadata: Metadata = {
    title: "100 YouTube Shorts Ideas That Go Viral in 2026 | Every Niche",
    description: "Get 100 viral YouTube Shorts ideas for 2026. Ideas for gaming, beauty, fitness, finance, comedy, education and more. Start creating today with these proven concepts.",
    keywords: ["youtube shorts ideas", "viral shorts ideas", "short video ideas", "youtube shorts content ideas", "what to post on youtube shorts"],
    openGraph: {
        title: "100 YouTube Shorts Ideas That Go Viral 2026",
        description: "Viral Shorts ideas for every niche. Gaming, beauty, fitness, finance, comedy and more.",
        url: `${siteConfig.url}/blog/youtube-shorts-ideas-2026`,
        images: [`${siteConfig.url}/images/blog/youtube-shorts-ideas-2026.png`],
    },
    twitter: {
        card: "summary_large_image",
        title: "100 YouTube Shorts Ideas 2026",
        description: "Viral Shorts ideas for every niche",
        images: [`${siteConfig.url}/images/blog/youtube-shorts-ideas-2026.png`],
    },
    alternates: {
        canonical: "/blog/youtube-shorts-ideas-2026",
        languages: {
            "en": "/blog/youtube-shorts-ideas-2026",
            "x-default": "/blog/youtube-shorts-ideas-2026",
        },
    },
};

const ideasByNiche = [
    {
        niche: "Gaming",
        ideas: ["Best gaming moments", "60-second tips", "Rage quit reactions", "Before vs after skills", "Speed run attempts"],
    },
    {
        niche: "Beauty & Fashion",
        ideas: ["GRWM videos", "Makeup transformations", "Testing viral hacks", "Outfit of the day", "5-min makeup challenge"],
    },
    {
        niche: "Fitness & Health",
        ideas: ["30-second workouts", "What I eat in a day", "Gym fails", "Before/after transformations", "Quick healthy recipes"],
    },
    {
        niche: "Finance & Business",
        ideas: ["Money saving tips", "Side hustle ideas", "Investing 101", "Budget shopping hacks", "Passive income ideas"],
    },
    {
        niche: "Comedy",
        ideas: ["Expectation vs reality", "POV skits", "Types of people at...", "Awkward situations", "Unpopular opinions"],
    },
    {
        niche: "Education",
        ideas: ["Things school didn't teach", "Quick study tips", "Life hacks", "History in 60 seconds", "Psychology facts"],
    },
    {
        niche: "Food & Cooking",
        ideas: ["Recipe in 60 seconds", "Rating fast food items", "Trying viral trends", "Restaurant vs homemade", "Kitchen hacks"],
    },
    {
        niche: "Travel & Lifestyle",
        ideas: ["Hidden gems in cities", "Travel hacks", "Best views worldwide", "Hotel room tours", "Packing tips"],
    },
];

const viralTips = [
    {
        title: "Hook in First 1-2 Seconds",
        description: "Start with action, a question, or something surprising. Viewers decide in the first second whether to keep watching.",
        icon: <FaPlay className="text-red-500" />,
    },
    {
        title: "Keep It Under 30 Seconds",
        description: "Shorter Shorts have higher completion rates. The algorithm rewards videos that people watch until the end.",
        icon: <FaLightbulb className="text-yellow-500" />,
    },
    {
        title: "Create Loop-Worthy Content",
        description: "End your video in a way that makes viewers want to watch again. Loops dramatically increase watch time.",
        icon: <FaRocket className="text-purple-500" />,
    },
];

const shortsTools = [
    {
        name: "Title Generator",
        description: "Create viral Shorts titles that get clicks.",
        link: "/tools/youtube-title-generator",
    },
    {
        name: "Tag Generator",
        description: "Generate hashtags to boost discoverability.",
        link: "/tools/youtube-tag-generator",
    },
    {
        name: "Trend Analyzer",
        description: "Find what's trending for your next Shorts.",
        link: "/tools/youtube-trend-analyzer",
    },
];

export default function YouTubeShortsIdeasPage() {
    const articleSchema = getArticleSchema({
        title: metadata.title as string,
        description: metadata.description as string,
        url: `${siteConfig.url}/blog/youtube-shorts-ideas-2026`,
        imageUrl: `${siteConfig.url}/images/blog/youtube-shorts-ideas-2026.png`,
        datePublished: "2026-02-04",
        dateModified: "2026-02-04",
        author: siteConfig.name,
    });

    const breadcrumbSchema = getBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Blog", url: "/blog" },
        { name: "Shorts Ideas", url: "/blog/youtube-shorts-ideas-2026" },
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
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-300 text-sm font-bold mb-6">
                            <FaLightbulb className="text-lg" />
                            Content Ideas 2026
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-8 leading-tight">
                            100 YouTube Shorts Ideas<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">That Go Viral</span>
                        </h1>
                        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
                            Never run out of content ideas. Proven Shorts concepts across 8 niches to start creating today.
                        </p>
                    </div>

                    {/* Key Stats */}
                    <div className="grid md:grid-cols-4 gap-4 mb-16">
                        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 text-center border border-slate-100 dark:border-slate-800">
                            <div className="text-2xl font-bold text-red-600 mb-1">100</div>
                            <div className="text-sm text-slate-600 dark:text-slate-400">Video Ideas</div>
                        </div>
                        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 text-center border border-slate-100 dark:border-slate-800">
                            <div className="text-2xl font-bold text-orange-600 mb-1">8</div>
                            <div className="text-sm text-slate-600 dark:text-slate-400">Niches Covered</div>
                        </div>
                        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 text-center border border-slate-100 dark:border-slate-800">
                            <div className="text-2xl font-bold text-yellow-600 mb-1">60s</div>
                            <div className="text-sm text-slate-600 dark:text-slate-400">Max Length</div>
                        </div>
                        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 text-center border border-slate-100 dark:border-slate-800">
                            <div className="text-2xl font-bold text-green-600 mb-1">1-3x</div>
                            <div className="text-sm text-slate-600 dark:text-slate-400">Post Daily</div>
                        </div>
                    </div>

                    {/* Ideas by Niche */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Ideas by Niche</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {ideasByNiche.map((category, index) => (
                                <div key={index} className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800">
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">{category.niche}</h3>
                                    <ul className="space-y-2">
                                        {category.ideas.map((idea, i) => (
                                            <li key={i} className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                                                <span className="w-6 h-6 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 text-xs font-bold">
                                                    {i + 1}
                                                </span>
                                                {idea}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Viral Tips */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Tips for Viral Shorts</h2>
                        <div className="grid gap-6">
                            {viralTips.map((tip, index) => (
                                <div key={index} className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800">
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                                            {tip.icon}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                                                {tip.title}
                                            </h3>
                                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                                {tip.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Tools */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Shorts Creator Tools</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            {shortsTools.map((tool, index) => (
                                <div key={index} className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 hover:shadow-lg transition-shadow">
                                    <div className="flex items-center gap-3 mb-4">
                                        <FaTools className="text-red-500 text-xl" />
                                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                                            {tool.name}
                                        </h3>
                                    </div>
                                    <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                                        {tool.description}
                                    </p>
                                    <Link
                                        href={tool.link}
                                        className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 font-medium"
                                    >
                                        Try Free
                                        <FaRocket className="text-sm" />
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-3xl p-12 text-center text-white">
                        <h2 className="text-3xl font-bold mb-4">Ready to Monetize Your Shorts?</h2>
                        <p className="text-red-100 text-lg mb-8 max-w-2xl mx-auto">
                            Learn how to make money from YouTube Shorts in 2026.
                        </p>
                        <Link
                            href="/blog/youtube-shorts-monetization-2026"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-red-600 rounded-xl font-bold hover:bg-slate-100 transition-colors"
                        >
                            <FaPlay className="text-xl" />
                            Shorts Monetization Guide
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
