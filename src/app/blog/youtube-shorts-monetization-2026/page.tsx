import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { getArticleSchema, getBreadcrumbSchema } from "@/lib/seo";
import Link from "next/link";
import Image from "next/image";
import { FaDollarSign, FaYoutube, FaCheck, FaClock, FaChartLine, FaQuestionCircle, FaPlay, FaCoins } from "react-icons/fa";

export const metadata: Metadata = {
    title: "YouTube Shorts Monetization 2026: Complete Guide to Earning Money",
    description: "Learn how YouTube Shorts monetization works in 2026. RPM rates, eligibility requirements, ad revenue sharing, and strategies to maximize your Shorts earnings.",
    keywords: [
        "youtube shorts monetization",
        "youtube shorts money",
        "how to monetize youtube shorts",
        "youtube shorts revenue",
        "youtube shorts rpm",
        "shorts fund",
        "youtube shorts ads",
        "youtube shorts earnings",
        "monetize shorts",
        "shorts ad revenue sharing"
    ],
    openGraph: {
        title: "YouTube Shorts Monetization 2026: Complete Guide",
        description: "How to monetize YouTube Shorts, RPM rates, eligibility & strategies to maximize earnings.",
        url: `${siteConfig.url}/blog/youtube-shorts-monetization-2026`,
        images: [`${siteConfig.url}/images/blog/youtube-shorts-monetization-2026.png`],
        type: "article",
    },
    alternates: {
        canonical: "/blog/youtube-shorts-monetization-2026",
    },
};

const requirements = [
    { requirement: "Subscribers", value: "1,000", icon: "👥" },
    { requirement: "Watch Hours (Long-form)", value: "4,000 hours", icon: "⏱️" },
    { requirement: "OR Shorts Views", value: "10 million (90 days)", icon: "📱" },
    { requirement: "Policy Compliance", value: "No strikes", icon: "✅" },
    { requirement: "2-Step Verification", value: "Enabled", icon: "🔐" },
];

const rpmComparison = [
    { type: "Long-form Videos", rpm: "$2-$10+", note: "Higher CPM, fewer ads per view" },
    { type: "YouTube Shorts", rpm: "$0.03-$0.10", note: "Lower per view, but higher volume" },
    { type: "Shorts (High CPM Niche)", rpm: "$0.10-$0.20", note: "Finance, business content" },
];

const earningsTable = [
    { views: "10,000", lowEnd: "$3", highEnd: "$20" },
    { views: "100,000", lowEnd: "$30", highEnd: "$200" },
    { views: "1,000,000", lowEnd: "$300", highEnd: "$2,000" },
    { views: "10,000,000", lowEnd: "$3,000", highEnd: "$20,000" },
];

export default function YouTubeShortsMonetizationPage() {
    const articleSchema = getArticleSchema({
        title: metadata.title as string,
        description: metadata.description as string,
        url: `${siteConfig.url}/blog/youtube-shorts-monetization-2026`,
        imageUrl: `${siteConfig.url}/images/blog/youtube-shorts-monetization-2026.png`,
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
                "name": "How much does YouTube Shorts pay per 1000 views?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "YouTube Shorts pays approximately $0.03-$0.10 per 1000 views (RPM) on average. This is significantly lower than long-form content, but Shorts can generate millions of views quickly. High-CPM niches like finance may earn $0.10-$0.20 per 1000 views. Earnings vary based on audience location and advertiser demand."
                }
            },
            {
                "@type": "Question",
                "name": "How do I monetize YouTube Shorts?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "To monetize YouTube Shorts, you need to: 1) Join the YouTube Partner Program with either 4,000 watch hours + 1,000 subscribers OR 10 million Shorts views in 90 days + 1,000 subscribers. 2) Accept the Shorts monetization terms in YouTube Studio. 3) Your Shorts will then display ads between videos and you'll earn a share of the revenue from the Shorts ad pool."
                }
            },
            {
                "@type": "Question",
                "name": "Is the YouTube Shorts Fund still available in 2026?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The original YouTube Shorts Fund ($100M bonus program) ended in early 2023. It was replaced by the Shorts ad revenue sharing model, where creators earn 45% of ad revenue attributed to their Shorts. This is now the primary way to monetize Shorts and is available to all YouTube Partner Program members."
                }
            },
            {
                "@type": "Question",
                "name": "How much can you make from YouTube Shorts?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "YouTube Shorts earnings vary widely. 1 million Shorts views typically earns $300-$2,000. Top Shorts creators with 10+ million monthly views can earn $3,000-$20,000+ from Shorts alone. The key is volume - Shorts pay less per view but can generate massive view counts quickly."
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
                            <FaPlay className="text-lg" />
                            Shorts Monetization 2026
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-8 leading-tight">
                            YouTube Shorts<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-pink-600">Monetization Guide</span>
                        </h1>
                        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
                            Everything you need to know about making money from YouTube Shorts in 2026. RPM rates, requirements, and strategies.
                        </p>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid md:grid-cols-4 gap-4 mb-16">
                        <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-5 text-white text-center">
                            <div className="text-2xl font-bold mb-1">$0.03-$0.10</div>
                            <div className="text-red-100 text-sm">RPM per 1K Views</div>
                        </div>
                        <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl p-5 text-white text-center">
                            <div className="text-2xl font-bold mb-1">45%</div>
                            <div className="text-pink-100 text-sm">Creator Revenue Share</div>
                        </div>
                        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-5 text-white text-center">
                            <div className="text-2xl font-bold mb-1">10M Views</div>
                            <div className="text-purple-100 text-sm">OR 4K Watch Hours</div>
                        </div>
                        <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl p-5 text-white text-center">
                            <div className="text-2xl font-bold mb-1">1,000</div>
                            <div className="text-indigo-100 text-sm">Subscribers Required</div>
                        </div>
                    </div>

                    {/* Quick Answer */}
                    <div className="bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 border-2 border-red-200 dark:border-red-800 rounded-3xl p-8 mb-16">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                            <FaDollarSign className="text-red-500" />
                            Quick Answer: Shorts Monetization
                        </h2>
                        <div className="text-lg text-slate-700 dark:text-slate-300 space-y-3">
                            <p><strong>💰 How much?</strong> $0.03-$0.10 per 1,000 views ($300-$2,000 per 1M views)</p>
                            <p><strong>📋 Requirements:</strong> 1,000 subs + (4K watch hours OR 10M Shorts views in 90 days)</p>
                            <p><strong>💵 Revenue Share:</strong> Creators get 45% of Shorts ad revenue</p>
                            <p><strong>🎯 Best Strategy:</strong> High volume + high CPM niches (finance, business, tech)</p>
                        </div>
                    </div>

                    {/* Requirements */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">
                            YouTube Shorts Monetization Requirements
                        </h2>
                        <div className="grid md:grid-cols-5 gap-4">
                            {requirements.map((req, index) => (
                                <div key={index} className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 text-center">
                                    <div className="text-3xl mb-2">{req.icon}</div>
                                    <div className="font-bold text-slate-900 dark:text-white mb-1">{req.value}</div>
                                    <div className="text-sm text-slate-600 dark:text-slate-400">{req.requirement}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RPM Comparison */}
                    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 text-white mb-16">
                        <h2 className="text-2xl font-bold mb-6 text-center">Shorts vs Long-Form: RPM Comparison</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-slate-700">
                                        <th className="text-left py-3 px-4">Content Type</th>
                                        <th className="text-center py-3 px-4">RPM (per 1K views)</th>
                                        <th className="text-left py-3 px-4">Notes</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rpmComparison.map((row, index) => (
                                        <tr key={index} className="border-b border-slate-700/50">
                                            <td className="py-3 px-4 font-medium">{row.type}</td>
                                            <td className="py-3 px-4 text-center text-green-400 font-bold">{row.rpm}</td>
                                            <td className="py-3 px-4 text-slate-400 text-sm">{row.note}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Earnings Table */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">
                            YouTube Shorts Earnings Calculator
                        </h2>
                        <div className="overflow-x-auto">
                            <table className="w-full bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
                                <thead className="bg-gradient-to-r from-red-600 to-pink-600 text-white">
                                    <tr>
                                        <th className="px-6 py-4 text-left">Shorts Views</th>
                                        <th className="px-6 py-4 text-center">Low Estimate</th>
                                        <th className="px-6 py-4 text-center">High Estimate</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                                    {earningsTable.map((row, index) => (
                                        <tr key={index} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                                            <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">{row.views}</td>
                                            <td className="px-6 py-4 text-center text-slate-600 dark:text-slate-400">{row.lowEnd}</td>
                                            <td className="px-6 py-4 text-center text-green-600 dark:text-green-400 font-bold">{row.highEnd}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* How It Works */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">
                            How Shorts Monetization Works
                        </h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
                                <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-4 text-red-600 text-xl font-bold">1</div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Ads Run Between Shorts</h3>
                                <p className="text-slate-600 dark:text-slate-400 text-sm">Video ads play between Shorts in the feed. Revenue is pooled from all ads shown during Shorts sessions.</p>
                            </div>
                            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
                                <div className="w-12 h-12 rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center mb-4 text-pink-600 text-xl font-bold">2</div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Revenue Pool Divided</h3>
                                <p className="text-slate-600 dark:text-slate-400 text-sm">The ad revenue pool is divided based on views. If your Shorts got 1% of views, you get 1% of the pool.</p>
                            </div>
                            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
                                <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4 text-purple-600 text-xl font-bold">3</div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">45% to Creators</h3>
                                <p className="text-slate-600 dark:text-slate-400 text-sm">YouTube keeps 55% for platform costs. You receive 45% of revenue attributed to your Shorts views.</p>
                            </div>
                        </div>
                    </div>

                    {/* Tips */}
                    <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-3xl p-8 mb-16">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                            <FaChartLine className="text-blue-500" />
                            Tips to Maximize Shorts Earnings
                        </h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="flex items-start gap-3"><FaCheck className="text-green-500 mt-1" /><span className="text-slate-700 dark:text-slate-300">Target tier 1 countries (US, UK, CA, AU) for higher RPM</span></div>
                            <div className="flex items-start gap-3"><FaCheck className="text-green-500 mt-1" /><span className="text-slate-700 dark:text-slate-300">Create high-CPM niche content (finance, business, tech)</span></div>
                            <div className="flex items-start gap-3"><FaCheck className="text-green-500 mt-1" /><span className="text-slate-700 dark:text-slate-300">Post 1-3 Shorts daily for maximum volume</span></div>
                            <div className="flex items-start gap-3"><FaCheck className="text-green-500 mt-1" /><span className="text-slate-700 dark:text-slate-300">Use Shorts to drive traffic to long-form videos</span></div>
                        </div>
                    </div>

                    {/* FAQ */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">FAQ</h2>
                        <div className="space-y-6">
                            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">How much does YouTube Shorts pay per 1000 views?</h3>
                                <p className="text-slate-600 dark:text-slate-400">YouTube Shorts pays approximately $0.03-$0.10 per 1000 views. High-CPM niches like finance can earn $0.10-$0.20 per 1000 views.</p>
                            </div>
                            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Is the YouTube Shorts Fund still available?</h3>
                                <p className="text-slate-600 dark:text-slate-400">The original Shorts Fund ended in 2023. It was replaced by the ad revenue sharing model where creators earn 45% of Shorts ad revenue.</p>
                            </div>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="bg-gradient-to-r from-red-600 to-pink-600 rounded-3xl p-12 text-center text-white">
                        <h2 className="text-3xl font-bold mb-6">Calculate Your YouTube Earnings</h2>
                        <p className="text-red-100 text-lg mb-8">Use our free calculator to estimate your Shorts and long-form revenue.</p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <Link href="/tools/youtube-money-calculator" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-red-600 rounded-xl font-bold hover:bg-slate-100 transition-colors">
                                <FaCoins /> Money Calculator
                            </Link>
                            <Link href="/blog/youtube-shorts-ideas-2026" className="inline-flex items-center gap-2 px-8 py-4 bg-white/20 text-white rounded-xl font-bold hover:bg-white/30 transition-colors">
                                <FaPlay /> 100 Shorts Ideas
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
