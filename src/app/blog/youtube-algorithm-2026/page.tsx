import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { getArticleSchema } from "@/lib/seo";
import Link from "next/link";
import Image from "next/image";
import { FaYoutube, FaBrain, FaChartLine, FaClock, FaThumbsUp, FaPlay, FaSearch, FaUsers, FaLightbulb } from "react-icons/fa";

export const metadata: Metadata = {
    title: "How the YouTube Algorithm Works in 2026 | Complete Guide",
    description: "Understand how the YouTube algorithm works in 2026. Learn the ranking factors, watch time signals, and strategies to get your videos recommended to more viewers.",
    keywords: [
        "youtube algorithm",
        "youtube algorithm explained",
        "how youtube algorithm works",
        "youtube algorithm 2026",
        "youtube recommendation algorithm",
        "youtube ranking factors",
        "how to beat youtube algorithm",
        "youtube algorithm tips",
        "youtube algorithm secrets",
        "youtube suggested videos"
    ],
    openGraph: {
        title: "How the YouTube Algorithm Works 2026",
        description: "Complete breakdown of ranking factors, watch time signals & strategies to get recommended.",
        url: `${siteConfig.url}/blog/youtube-algorithm-2026`,
        images: [`${siteConfig.url}/images/blog/youtube-algorithm-2026.png`],
        type: "article",
    },
    alternates: {
        canonical: "/blog/youtube-algorithm-2026",
    },
};

const rankingFactors = [
    { factor: "Watch Time", weight: "Very High", icon: FaClock, description: "Total minutes watched is the #1 factor" },
    { factor: "Click-Through Rate", weight: "High", icon: FaPlay, description: "% of impressions that become views" },
    { factor: "Average View Duration", weight: "High", icon: FaChartLine, description: "How long viewers watch before leaving" },
    { factor: "Session Time", weight: "High", icon: FaYoutube, description: "Does your video keep people on YouTube?" },
    { factor: "Engagement", weight: "Medium", icon: FaThumbsUp, description: "Likes, comments, shares, saves" },
    { factor: "Relevance", weight: "Medium", icon: FaSearch, description: "Keywords, title, description match" },
];

const myths = [
    { myth: "Posting frequency matters most", truth: "Quality and consistency matter more than posting daily" },
    { myth: "Tags are super important", truth: "Tags have minimal impact; title and description matter more" },
    { myth: "You need to reply to all comments in 1 hour", truth: "Engagement helps but timing isn't critical" },
    { myth: "Dislikes hurt your video", truth: "Dislikes count as engagement and can help reach" },
];

export default function YouTubeAlgorithmPage() {
    const articleSchema = getArticleSchema({
        title: metadata.title as string,
        description: metadata.description as string,
        url: `${siteConfig.url}/blog/youtube-algorithm-2026`,
        imageUrl: `${siteConfig.url}/images/blog/youtube-algorithm-2026.png`,
        datePublished: "2026-02-04",
        dateModified: "2026-02-04",
        author: siteConfig.name,
    });

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "How does the YouTube algorithm work?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The YouTube algorithm uses machine learning to match videos with viewers likely to watch them. Key factors include: watch time (most important), click-through rate (CTR), average view duration, session time, and engagement (likes, comments, shares). The algorithm has different systems for Search, Suggested Videos, and Home page."
                }
            },
            {
                "@type": "Question",
                "name": "What is the most important YouTube ranking factor?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Watch time (total minutes watched) is the most important YouTube ranking factor. It indicates that viewers find your content valuable enough to keep watching. Other critical factors are click-through rate (CTR) and average view duration. The algorithm prioritizes videos that keep people watching YouTube longer."
                }
            },
            {
                "@type": "Question",
                "name": "How do I get my YouTube videos recommended?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "To get recommended: 1) Create compelling thumbnails with 10%+ CTR, 2) Hook viewers in the first 30 seconds, 3) Maximize average view duration (aim for 50%+), 4) Encourage engagement through calls-to-action, 5) Maintain consistent posting schedule, 6) Create content in topics your audience watches."
                }
            }
        ]
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

            <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 pb-24">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-300 text-sm font-bold mb-6">
                            <FaBrain className="text-lg" />
                            Algorithm Deep Dive
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-8 leading-tight">
                            How the YouTube Algorithm<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">Actually Works</span>
                        </h1>
                        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
                            The complete breakdown of ranking factors, recommendation systems, and strategies to get more views.
                        </p>
                    </div>

                    {/* Quick Answer */}
                    <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border-2 border-red-200 dark:border-red-800 rounded-3xl p-8 mb-16">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                            <FaLightbulb className="text-red-500" />
                            Quick Answer: The Algorithm in 60 Seconds
                        </h2>
                        <div className="text-lg text-slate-700 dark:text-slate-300 space-y-3">
                            <p><strong>🎯 Goal:</strong> Match viewers with videos they&apos;ll watch and enjoy</p>
                            <p><strong>📊 #1 Factor:</strong> Watch time (total minutes watched)</p>
                            <p><strong>📈 #2 Factor:</strong> Click-through rate (thumbnail + title appeal)</p>
                            <p><strong>⏱️ #3 Factor:</strong> Average view duration (% of video watched)</p>
                            <p><strong>🔄 Feedback Loop:</strong> Higher engagement → more recommendations → more views</p>
                        </div>
                    </div>

                    {/* Ranking Factors */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">
                            YouTube Ranking Factors (2026)
                        </h2>
                        <div className="mb-8">
                            <Image
                                src="/images/blog/youtube-algorithm-2026-ranking-factors.png"
                                alt="YouTube Algorithm Ranking Factors Pyramid"
                                width={1200}
                                height={675}
                                className="w-full rounded-xl border border-slate-200 dark:border-slate-800"
                            />
                        </div>
                        <div className="grid md:grid-cols-3 gap-4">
                            {rankingFactors.map((factor, index) => (
                                <div key={index} className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
                                    <factor.icon className="text-3xl text-red-600 mb-4" />
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">{factor.factor}</h3>
                                    <span className={`inline-block px-2 py-1 rounded text-xs font-bold mb-2 ${factor.weight === 'Very High' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' :
                                        factor.weight === 'High' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300' :
                                            'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300'
                                        }`}>
                                        {factor.weight}
                                    </span>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">{factor.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* How Recommendations Work */}
                    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 text-white mb-16">
                        <h2 className="text-2xl font-bold mb-8 text-center">3 Algorithm Systems</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="bg-white/10 rounded-xl p-6">
                                <FaSearch className="text-3xl text-blue-400 mb-4" />
                                <h3 className="font-bold text-lg mb-2">YouTube Search</h3>
                                <p className="text-sm text-slate-300">Keywords in title, description, and speech matter. Optimizes for relevance + engagement.</p>
                            </div>
                            <div className="bg-white/10 rounded-xl p-6">
                                <FaYoutube className="text-3xl text-red-400 mb-4" />
                                <h3 className="font-bold text-lg mb-2">Suggested Videos</h3>
                                <p className="text-sm text-slate-300">Videos related to what viewer just watched. Watch time and relevance are key.</p>
                            </div>
                            <div className="bg-white/10 rounded-xl p-6">
                                <FaUsers className="text-3xl text-green-400 mb-4" />
                                <h3 className="font-bold text-lg mb-2">Home Page</h3>
                                <p className="text-sm text-slate-300">Personalized based on watch history and engagement patterns. Most competitive placement.</p>
                            </div>
                        </div>
                    </div>

                    {/* Myths */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">
                            Algorithm Myths vs Reality
                        </h2>
                        <div className="space-y-4">
                            {myths.map((item, index) => (
                                <div key={index} className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800">
                                    <div className="flex items-start gap-4">
                                        <span className="text-red-500 text-xl">❌</span>
                                        <div className="flex-grow">
                                            <p className="font-bold text-slate-900 dark:text-white line-through opacity-60">{item.myth}</p>
                                            <p className="text-green-600 dark:text-green-400 flex items-center gap-2 mt-1">
                                                <span className="text-green-500">✓</span> {item.truth}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Tips */}
                    <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-3xl p-8 mb-16">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">
                            7 Actionable Tips to Work With the Algorithm
                        </h2>
                        <div className="grid md:grid-cols-2 gap-4 text-slate-700 dark:text-slate-300">
                            <p>🎨 Create thumbnails with 10%+ CTR (test with A/B tools)</p>
                            <p>🎣 Hook viewers in the first 5-30 seconds</p>
                            <p>⏱️ Aim for 50%+ average view duration</p>
                            <p>💬 End with strong CTAs for engagement</p>
                            <p>📅 Post consistently (quality &gt; quantity)</p>
                            <p>🔗 Create content series to boost session time</p>
                            <p>📊 Analyze YouTube Analytics weekly</p>
                        </div>
                    </div>

                    {/* FAQ */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">FAQ</h2>
                        <div className="space-y-6">
                            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">What&apos;s the most important ranking factor?</h3>
                                <p className="text-slate-600 dark:text-slate-400">Watch time (total minutes watched) is the #1 factor. It shows YouTube that viewers find your content valuable.</p>
                            </div>
                            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">How do I get more suggested video placements?</h3>
                                <p className="text-slate-600 dark:text-slate-400">Create content similar to popular videos in your niche, maximize watch time, and build series that keep viewers watching.</p>
                            </div>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-3xl p-12 text-center text-white">
                        <h2 className="text-3xl font-bold mb-6">Optimize Your Videos for the Algorithm</h2>
                        <p className="text-red-100 text-lg mb-8">Use our free tools to improve your titles, descriptions, and tags.</p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <Link href="/tools/youtube-title-generator" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-red-600 rounded-xl font-bold hover:bg-slate-100 transition-colors">
                                <FaChartLine /> Title Generator
                            </Link>
                            <Link href="/blog/youtube-seo-strategies-2026" className="inline-flex items-center gap-2 px-8 py-4 bg-white/20 text-white rounded-xl font-bold hover:bg-white/30 transition-colors">
                                <FaSearch /> SEO Strategies
                            </Link>
                        </div>
                    </div>

                    <div className="text-center text-slate-600 dark:text-slate-400 mt-12">
                        <p><strong>Published:</strong> February 4, 2026 | Written by {siteConfig.name}</p>
                    </div>
                </div>
            </div>
        </>
    );
}
