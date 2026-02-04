import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { getArticleSchema, getBreadcrumbSchema } from "@/lib/seo";
import Link from "next/link";
import Image from "next/image";
import { FaSearch, FaYoutube, FaChartLine, FaStar, FaCheck, FaDollarSign, FaRocket, FaLightbulb } from "react-icons/fa";

export const metadata: Metadata = {
    title: "10 Best Free YouTube Keyword Research Tools in 2026 | Complete Guide",
    description: "Discover the best free YouTube keyword research tools in 2026. Find high-volume, low-competition keywords to rank your videos. Includes VidIQ, TubeBuddy, Ahrefs free, and more.",
    keywords: [
        "youtube keyword research",
        "youtube keyword tool",
        "free youtube keyword research",
        "youtube seo tools",
        "youtube keyword finder",
        "find youtube keywords",
        "youtube keyword research free",
        "best youtube keyword tool",
        "youtube search keywords",
        "keyword research for youtube"
    ],
    openGraph: {
        title: "10 Best Free YouTube Keyword Research Tools 2026",
        description: "Find high-volume, low-competition keywords with these free tools. Rank higher and get more views.",
        url: `${siteConfig.url}/blog/youtube-keyword-research-tools-2026`,
        images: [`${siteConfig.url}/images/blog/best-youtube-seo-tools-2026.png`],
        type: "article",
    },
    alternates: {
        canonical: "/blog/youtube-keyword-research-tools-2026",
    },
};

const tools = [
    {
        rank: 1,
        name: "YouTube Search Autocomplete",
        price: "Free",
        rating: 5,
        description: "The most underrated keyword research method. Type your topic into YouTube search and see what autocomplete suggests. These are real searches people make.",
        pros: ["100% free", "Shows real user searches", "Always up-to-date"],
        cons: ["No search volume data", "Manual process"],
        bestFor: "Quick keyword ideas",
    },
    {
        rank: 2,
        name: "VidIQ Free",
        price: "Free (3 searches/day)",
        rating: 5,
        description: "VidIQ's free plan includes keyword research with search volume, competition scores, and related keywords. Best free option for beginners.",
        pros: ["Shows search volume", "Competition score", "Related keywords"],
        cons: ["Limited to 3 searches/day", "Some features locked"],
        bestFor: "Beginners & small channels",
    },
    {
        rank: 3,
        name: "TubeBuddy Free",
        price: "Free",
        rating: 4,
        description: "TubeBuddy's Keyword Explorer shows weighted scores based on search volume and competition. The free version is limited but useful.",
        pros: ["Keyword score system", "YouTube certified", "Browser extension"],
        cons: ["Very limited free searches", "Basic data only"],
        bestFor: "Quick keyword validation",
    },
    {
        rank: 4,
        name: "Google Trends",
        price: "Free",
        rating: 4,
        description: "Compare keyword popularity over time and find trending topics. Filter by YouTube specifically to see what's gaining traction.",
        pros: ["Trend analysis", "Compare keywords", "YouTube filter"],
        cons: ["No exact volume", "Relative data only"],
        bestFor: "Trending topic research",
    },
    {
        rank: 5,
        name: "Ahrefs Free YouTube Tool",
        price: "Free",
        rating: 4,
        description: "Ahrefs offers a free YouTube keyword tool with search volume and keyword difficulty. Limited but provides professional-grade data.",
        pros: ["Accurate search volume", "Keyword difficulty", "Related terms"],
        cons: ["Limited free searches", "Requires account"],
        bestFor: "Professional keyword data",
    },
    {
        rank: 6,
        name: "Keyword Tool.io",
        price: "Free (limited)",
        rating: 4,
        description: "Generates hundreds of keyword ideas from YouTube autocomplete. Free version shows keywords but not search volume.",
        pros: ["Tons of keyword ideas", "Export options", "Easy to use"],
        cons: ["No volume in free", "Paid for full data"],
        bestFor: "Bulk keyword ideas",
    },
    {
        rank: 7,
        name: "YouTube Analytics (for existing channels)",
        price: "Free",
        rating: 5,
        description: "Your own YouTube Analytics shows exactly what keywords people used to find your videos. The best data for optimizing existing content.",
        pros: ["Real search data", "Your actual keywords", "Free"],
        cons: ["Need existing videos", "Only your channel"],
        bestFor: "Optimizing existing content",
    },
    {
        rank: 8,
        name: "AnswerThePublic",
        price: "Free (limited)",
        rating: 3,
        description: "Shows questions people ask about your topic. Great for finding question-based video ideas that rank well.",
        pros: ["Question keywords", "Visual reports", "Content ideas"],
        cons: ["Limited free searches", "Not YouTube specific"],
        bestFor: "Question-based content",
    },
];

export default function YouTubeKeywordToolsPage() {
    const articleSchema = getArticleSchema({
        title: metadata.title as string,
        description: metadata.description as string,
        url: `${siteConfig.url}/blog/youtube-keyword-research-tools-2026`,
        imageUrl: `${siteConfig.url}/images/blog/best-youtube-seo-tools-2026.png`,
        datePublished: "2026-02-04",
        dateModified: "2026-02-04",
        author: siteConfig.name,
    });

    const breadcrumbSchema = getBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Blog", url: "/blog" },
        { name: "YouTube Keyword Tools", url: "/blog/youtube-keyword-research-tools-2026" },
    ]);

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "What is the best free YouTube keyword research tool?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "VidIQ Free is the best free YouTube keyword research tool for most creators. It provides search volume, competition scores, and related keywords with 3 free searches per day. For unlimited free research, YouTube's autocomplete feature combined with Google Trends is highly effective."
                }
            },
            {
                "@type": "Question",
                "name": "How do I find keywords for YouTube videos?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "To find YouTube keywords: 1) Use YouTube autocomplete by typing your topic and noting suggestions, 2) Use VidIQ or TubeBuddy's free keyword tools, 3) Check YouTube Analytics for keywords driving traffic to your videos, 4) Use Google Trends filtered by YouTube, 5) Analyze competitor video tags using browser extensions."
                }
            },
            {
                "@type": "Question",
                "name": "Is there a free version of TubeBuddy or VidIQ?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, both TubeBuddy and VidIQ offer free versions. VidIQ Free includes 3 keyword searches per day, basic analytics, and channel audit tools. TubeBuddy Free offers limited keyword explorer access and basic SEO features. VidIQ's free plan is generally more generous for keyword research."
                }
            }
        ]
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

            <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 pb-24">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-300 text-sm font-bold mb-6">
                            <FaSearch className="text-lg" />
                            Free SEO Tools 2026
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-8 leading-tight">
                            Best <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-600">Free YouTube</span><br />
                            Keyword Research Tools
                        </h1>
                        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
                            Find high-volume, low-competition keywords without spending a dime. 10 tools to help you rank higher in 2026.
                        </p>
                    </div>

                    {/* Quick Answer */}
                    <div className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 border-2 border-green-200 dark:border-green-800 rounded-3xl p-8 mb-16">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                            <FaLightbulb className="text-green-500" />
                            Quick Answer: Best Free Keyword Tools
                        </h2>
                        <div className="text-lg text-slate-700 dark:text-slate-300 space-y-2">
                            <p><strong>🥇 Best Overall Free:</strong> VidIQ Free (3 searches/day with volume data)</p>
                            <p><strong>🔍 Best for Ideas:</strong> YouTube Autocomplete (unlimited, real searches)</p>
                            <p><strong>📈 Best for Trends:</strong> Google Trends (free, YouTube filter)</p>
                            <p><strong>📊 Best for Data:</strong> Ahrefs Free Tool (professional-grade)</p>
                        </div>
                    </div>

                    {/* Tools List */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-10 text-center">
                            Top 8 Free YouTube Keyword Tools
                        </h2>
                        <div className="space-y-6">
                            {tools.map((tool, index) => (
                                <div key={index} className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-lg">
                                    <div className="flex flex-col md:flex-row gap-6">
                                        <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center text-white text-xl font-bold">
                                            #{tool.rank}
                                        </div>
                                        <div className="flex-grow">
                                            <div className="flex flex-wrap items-center gap-3 mb-2">
                                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{tool.name}</h3>
                                                <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-bold">{tool.price}</span>
                                                <div className="flex gap-0.5">
                                                    {[...Array(5)].map((_, i) => (
                                                        <FaStar key={i} className={i < tool.rating ? "text-yellow-400" : "text-slate-300"} />
                                                    ))}
                                                </div>
                                            </div>
                                            <p className="text-slate-600 dark:text-slate-400 mb-4">{tool.description}</p>
                                            <div className="grid md:grid-cols-3 gap-4 text-sm">
                                                <div>
                                                    <p className="font-semibold text-green-600 mb-1">✅ Pros</p>
                                                    <ul className="text-slate-600 dark:text-slate-400 space-y-1">
                                                        {tool.pros.map((pro, i) => <li key={i}>• {pro}</li>)}
                                                    </ul>
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-red-600 mb-1">❌ Cons</p>
                                                    <ul className="text-slate-600 dark:text-slate-400 space-y-1">
                                                        {tool.cons.map((con, i) => <li key={i}>• {con}</li>)}
                                                    </ul>
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-blue-600 mb-1">🎯 Best For</p>
                                                    <p className="text-slate-600 dark:text-slate-400">{tool.bestFor}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* How to Do Keyword Research */}
                    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 md:p-10 mb-16 text-white">
                        <h2 className="text-3xl font-bold mb-8 text-center">How to Do YouTube Keyword Research</h2>
                        <div className="grid md:grid-cols-4 gap-6">
                            <div className="text-center">
                                <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
                                <h3 className="font-bold mb-2">Brainstorm Topics</h3>
                                <p className="text-sm text-slate-400">List 10-20 topics your audience cares about</p>
                            </div>
                            <div className="text-center">
                                <div className="w-12 h-12 rounded-full bg-teal-500 flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
                                <h3 className="font-bold mb-2">Use Autocomplete</h3>
                                <p className="text-sm text-slate-400">Type topics into YouTube search for ideas</p>
                            </div>
                            <div className="text-center">
                                <div className="w-12 h-12 rounded-full bg-cyan-500 flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
                                <h3 className="font-bold mb-2">Check Volume</h3>
                                <p className="text-sm text-slate-400">Use VidIQ/TubeBuddy to verify search volume</p>
                            </div>
                            <div className="text-center">
                                <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center mx-auto mb-4 text-xl font-bold">4</div>
                                <h3 className="font-bold mb-2">Analyze Competition</h3>
                                <p className="text-sm text-slate-400">Look for low competition opportunities</p>
                            </div>
                        </div>
                    </div>

                    {/* FAQ */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">FAQ</h2>
                        <div className="space-y-6">
                            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">What is the best free YouTube keyword tool?</h3>
                                <p className="text-slate-600 dark:text-slate-400">VidIQ Free is the best overall, offering 3 keyword searches per day with search volume and competition data. For unlimited research, combine YouTube autocomplete with Google Trends.</p>
                            </div>
                            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">How do I find keywords for YouTube?</h3>
                                <p className="text-slate-600 dark:text-slate-400">Start with YouTube autocomplete, use VidIQ/TubeBuddy free tools for volume data, check Google Trends for trending topics, and analyze competitor tags with browser extensions.</p>
                            </div>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-3xl p-12 text-center text-white">
                        <h2 className="text-3xl font-bold mb-6">Try Our Free YouTube Tools</h2>
                        <p className="text-green-100 text-lg mb-8">Generate optimized titles, tags, and descriptions for free.</p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <Link href="/tools/youtube-tag-generator" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-green-600 rounded-xl font-bold hover:bg-slate-100 transition-colors">
                                <FaRocket /> Tag Generator
                            </Link>
                            <Link href="/tools/youtube-title-generator" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-teal-600 rounded-xl font-bold hover:bg-slate-100 transition-colors">
                                <FaChartLine /> Title Generator
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
