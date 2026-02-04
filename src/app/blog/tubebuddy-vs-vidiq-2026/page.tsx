import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { getArticleSchema, getBreadcrumbSchema } from "@/lib/seo";
import Link from "next/link";
import Image from "next/image";
import { FaCheck, FaTimes, FaCrown, FaChartLine, FaSearch, FaTags, FaDollarSign, FaStar, FaYoutube } from "react-icons/fa";

export const metadata: Metadata = {
    title: "TubeBuddy vs VidIQ 2026: Which YouTube Tool is Better? [Honest Comparison]",
    description: "TubeBuddy vs VidIQ detailed comparison 2026. We tested both YouTube SEO tools for 6 months. See features, pricing, pros & cons to pick the best tool for your channel.",
    keywords: [
        "tubebuddy vs vidiq",
        "vidiq vs tubebuddy",
        "tubebuddy or vidiq",
        "best youtube seo tool",
        "youtube keyword tool",
        "tubebuddy review",
        "vidiq review",
        "youtube optimization tools",
        "tubebuddy vs vidiq 2026",
        "youtube growth tools"
    ],
    openGraph: {
        title: "TubeBuddy vs VidIQ 2026: Ultimate Comparison",
        description: "We tested both YouTube SEO tools. See the honest comparison with features, pricing & which is best for you.",
        url: `${siteConfig.url}/blog/tubebuddy-vs-vidiq-2026`,
        images: [`${siteConfig.url}/images/blog/best-youtube-seo-tools-2026.png`],
        type: "article",
    },
    twitter: {
        card: "summary_large_image",
        title: "TubeBuddy vs VidIQ 2026: Which is Better?",
        description: "Honest comparison after 6 months of testing both tools",
        images: [`${siteConfig.url}/images/blog/best-youtube-seo-tools-2026.png`],
    },
    alternates: {
        canonical: "/blog/tubebuddy-vs-vidiq-2026",
        languages: {
            "en-US": "/blog/tubebuddy-vs-vidiq-2026",
            "en-GB": "/blog/tubebuddy-vs-vidiq-2026",
            "x-default": "/blog/tubebuddy-vs-vidiq-2026",
        },
    },
};

const comparisonData = [
    { feature: "Keyword Research", tubebuddy: 4, vidiq: 5, winner: "vidiq", notes: "VidIQ's keyword tool is more powerful" },
    { feature: "Tag Suggestions", tubebuddy: 5, vidiq: 4, winner: "tubebuddy", notes: "TubeBuddy's tag explorer is excellent" },
    { feature: "Competitor Analysis", tubebuddy: 4, vidiq: 5, winner: "vidiq", notes: "VidIQ shows more competitor data" },
    { feature: "Thumbnail A/B Testing", tubebuddy: 5, vidiq: 3, winner: "tubebuddy", notes: "TubeBuddy has native A/B testing" },
    { feature: "Bulk Processing", tubebuddy: 5, vidiq: 3, winner: "tubebuddy", notes: "TubeBuddy excels at bulk tasks" },
    { feature: "AI Features", tubebuddy: 4, vidiq: 5, winner: "vidiq", notes: "VidIQ has better AI tools" },
    { feature: "Browser Extension", tubebuddy: 5, vidiq: 5, winner: "tie", notes: "Both have excellent extensions" },
    { feature: "Free Plan Value", tubebuddy: 4, vidiq: 5, winner: "vidiq", notes: "VidIQ's free plan has more features" },
];

const pricingData = {
    tubebuddy: [
        { plan: "Free", price: "$0", features: ["Basic keyword research", "Limited tag suggestions", "Basic SEO studio"] },
        { plan: "Pro", price: "$4.99/mo", features: ["Keyword explorer", "Tag lists", "Best time to publish", "A/B testing (limited)"] },
        { plan: "Star", price: "$19.99/mo", features: ["All Pro features", "Unlimited A/B tests", "Bulk processing", "Comment filters"] },
        { plan: "Legend", price: "$49.99/mo", features: ["All Star features", "Priority support", "Brand alerts", "Competitor scorecard"] },
    ],
    vidiq: [
        { plan: "Free", price: "$0", features: ["Basic analytics", "3 keyword searches/day", "Channel audit"] },
        { plan: "Pro", price: "$7.50/mo", features: ["Unlimited keywords", "Competitor tracking", "Trend alerts", "AI coach"] },
        { plan: "Boost", price: "$39/mo", features: ["All Pro features", "Keyword translation", "YouTube coaching", "Priority support"] },
        { plan: "Max", price: "$79/mo", features: ["All Boost features", "Dedicated manager", "Custom reports", "Team features"] },
    ]
};

export default function TubeBuddyVsVidIQPage() {
    const articleSchema = getArticleSchema({
        title: metadata.title as string,
        description: metadata.description as string,
        url: `${siteConfig.url}/blog/tubebuddy-vs-vidiq-2026`,
        imageUrl: `${siteConfig.url}/images/blog/best-youtube-seo-tools-2026.png`,
        datePublished: "2026-02-04",
        dateModified: "2026-02-04",
        author: siteConfig.name,
    });

    const breadcrumbSchema = getBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Blog", url: "/blog" },
        { name: "TubeBuddy vs VidIQ", url: "/blog/tubebuddy-vs-vidiq-2026" },
    ]);

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "Is TubeBuddy or VidIQ better for YouTube?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Both are excellent tools, but they excel in different areas. TubeBuddy is better for A/B thumbnail testing, bulk processing, and workflow automation. VidIQ is better for keyword research, competitor analysis, and AI-powered features. For beginners, VidIQ's free plan offers more value. For serious creators focused on optimization, TubeBuddy's testing features are more powerful."
                }
            },
            {
                "@type": "Question",
                "name": "Can I use TubeBuddy and VidIQ together?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, you can use both tools together! Many successful creators use VidIQ for keyword research and competitor analysis, while using TubeBuddy for A/B testing and bulk processing. The free versions of both can be installed simultaneously without conflicts."
                }
            },
            {
                "@type": "Question",
                "name": "Is TubeBuddy safe and approved by YouTube?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, TubeBuddy is 100% YouTube certified and safe to use. It's the only tool officially certified by YouTube. VidIQ is also a trusted YouTube partner. Both tools comply with YouTube's Terms of Service and will not harm your channel."
                }
            },
            {
                "@type": "Question",
                "name": "Which is cheaper, TubeBuddy or VidIQ?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "TubeBuddy's paid plans start at $4.99/month (Pro), while VidIQ starts at $7.50/month (Pro). However, VidIQ's free plan includes more features. For budget-conscious creators, TubeBuddy Pro is more affordable, but VidIQ Free might be enough for beginners."
                }
            }
        ]
    };

    const productSchema = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "TubeBuddy vs VidIQ Comparison",
        "description": "Comprehensive comparison of the two leading YouTube optimization tools",
        "review": {
            "@type": "Review",
            "reviewRating": {
                "@type": "Rating",
                "ratingValue": "4.5",
                "bestRating": "5"
            },
            "author": {
                "@type": "Organization",
                "name": siteConfig.name
            }
        }
    };

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
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
            />

            <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 pb-24">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 text-sm font-bold mb-6">
                            <FaYoutube className="text-lg" />
                            Tool Comparison 2026
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-8 leading-tight">
                            <span className="text-orange-500">TubeBuddy</span> vs <span className="text-green-500">VidIQ</span><br />
                            Which is Better?
                        </h1>
                        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
                            We tested both YouTube SEO tools for 6 months. Here&apos;s our honest comparison with features, pricing, and which is best for your channel.
                        </p>
                    </div>

                    {/* Quick Verdict */}
                    <div className="grid md:grid-cols-2 gap-6 mb-16">
                        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white">
                            <div className="flex items-center gap-3 mb-4">
                                <FaCrown className="text-yellow-300 text-2xl" />
                                <h3 className="text-xl font-bold">Choose TubeBuddy If...</h3>
                            </div>
                            <ul className="space-y-2">
                                <li className="flex items-center gap-2"><FaCheck /> You want A/B thumbnail testing</li>
                                <li className="flex items-center gap-2"><FaCheck /> You need bulk processing tools</li>
                                <li className="flex items-center gap-2"><FaCheck /> You&apos;re on a tight budget ($4.99/mo)</li>
                                <li className="flex items-center gap-2"><FaCheck /> You want YouTube-certified tools</li>
                            </ul>
                        </div>
                        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white">
                            <div className="flex items-center gap-3 mb-4">
                                <FaCrown className="text-yellow-300 text-2xl" />
                                <h3 className="text-xl font-bold">Choose VidIQ If...</h3>
                            </div>
                            <ul className="space-y-2">
                                <li className="flex items-center gap-2"><FaCheck /> You want better keyword research</li>
                                <li className="flex items-center gap-2"><FaCheck /> You need competitor analysis</li>
                                <li className="flex items-center gap-2"><FaCheck /> You want AI-powered features</li>
                                <li className="flex items-center gap-2"><FaCheck /> You want a stronger free plan</li>
                            </ul>
                        </div>
                    </div>

                    {/* Featured Image */}
                    <div className="mb-16 rounded-3xl overflow-hidden shadow-2xl">
                        <Image
                            src="/images/blog/best-youtube-seo-tools-2026.png"
                            alt="TubeBuddy vs VidIQ comparison 2026 - feature breakdown"
                            width={1200}
                            height={630}
                            className="w-full h-auto"
                            priority
                        />
                    </div>

                    {/* Quick Answer */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-3xl p-8 mb-16">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                            <FaStar className="text-yellow-500" />
                            Quick Verdict: TubeBuddy vs VidIQ
                        </h2>
                        <div className="text-lg text-slate-700 dark:text-slate-300 space-y-3">
                            <p><strong>🏆 Best Overall:</strong> It&apos;s a tie - they excel in different areas</p>
                            <p><strong>🔍 Best for Keyword Research:</strong> VidIQ (more comprehensive data)</p>
                            <p><strong>🎨 Best for A/B Testing:</strong> TubeBuddy (native thumbnail testing)</p>
                            <p><strong>💰 Best Free Plan:</strong> VidIQ (more free features)</p>
                            <p><strong>💵 Most Affordable Paid:</strong> TubeBuddy Pro ($4.99/mo)</p>
                        </div>
                    </div>

                    {/* Feature Comparison Table */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">
                            Feature-by-Feature Comparison
                        </h2>
                        <div className="overflow-x-auto">
                            <table className="w-full bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
                                <thead className="bg-gradient-to-r from-slate-800 to-slate-700 text-white">
                                    <tr>
                                        <th className="px-6 py-4 text-left font-semibold">Feature</th>
                                        <th className="px-6 py-4 text-center font-semibold text-orange-300">TubeBuddy</th>
                                        <th className="px-6 py-4 text-center font-semibold text-green-300">VidIQ</th>
                                        <th className="px-6 py-4 text-center font-semibold">Winner</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                                    {comparisonData.map((row, index) => (
                                        <tr key={index} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                                            <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{row.feature}</td>
                                            <td className="px-6 py-4 text-center">
                                                <div className="flex justify-center gap-1">
                                                    {[...Array(5)].map((_, i) => (
                                                        <FaStar key={i} className={i < row.tubebuddy ? "text-orange-400" : "text-slate-300"} />
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <div className="flex justify-center gap-1">
                                                    {[...Array(5)].map((_, i) => (
                                                        <FaStar key={i} className={i < row.vidiq ? "text-green-400" : "text-slate-300"} />
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className={`px-3 py-1 rounded-full text-sm font-bold ${row.winner === 'tubebuddy' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300' :
                                                        row.winner === 'vidiq' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' :
                                                            'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                                                    }`}>
                                                    {row.winner === 'tie' ? 'Tie' : row.winner === 'tubebuddy' ? 'TubeBuddy' : 'VidIQ'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Pricing Comparison */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">
                            Pricing Comparison
                        </h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            {/* TubeBuddy Pricing */}
                            <div className="bg-white dark:bg-slate-900 rounded-2xl border-2 border-orange-200 dark:border-orange-800 overflow-hidden">
                                <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-4">
                                    <h3 className="text-xl font-bold text-white text-center">TubeBuddy Pricing</h3>
                                </div>
                                <div className="p-6 space-y-4">
                                    {pricingData.tubebuddy.map((plan, index) => (
                                        <div key={index} className="border-b border-slate-200 dark:border-slate-800 pb-4 last:border-0">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="font-bold text-slate-900 dark:text-white">{plan.plan}</span>
                                                <span className="text-orange-600 dark:text-orange-400 font-bold">{plan.price}</span>
                                            </div>
                                            <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                                                {plan.features.map((f, i) => (
                                                    <li key={i} className="flex items-center gap-2">
                                                        <FaCheck className="text-orange-500 text-xs" /> {f}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* VidIQ Pricing */}
                            <div className="bg-white dark:bg-slate-900 rounded-2xl border-2 border-green-200 dark:border-green-800 overflow-hidden">
                                <div className="bg-gradient-to-r from-green-500 to-green-600 px-6 py-4">
                                    <h3 className="text-xl font-bold text-white text-center">VidIQ Pricing</h3>
                                </div>
                                <div className="p-6 space-y-4">
                                    {pricingData.vidiq.map((plan, index) => (
                                        <div key={index} className="border-b border-slate-200 dark:border-slate-800 pb-4 last:border-0">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="font-bold text-slate-900 dark:text-white">{plan.plan}</span>
                                                <span className="text-green-600 dark:text-green-400 font-bold">{plan.price}</span>
                                            </div>
                                            <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                                                {plan.features.map((f, i) => (
                                                    <li key={i} className="flex items-center gap-2">
                                                        <FaCheck className="text-green-500 text-xs" /> {f}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Pros and Cons */}
                    <div className="grid md:grid-cols-2 gap-8 mb-16">
                        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
                            <h3 className="text-xl font-bold text-orange-600 dark:text-orange-400 mb-4">TubeBuddy Pros & Cons</h3>
                            <div className="space-y-4">
                                <div>
                                    <p className="font-semibold text-green-600 mb-2">✅ Pros</p>
                                    <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                                        <li>• Only YouTube-certified tool</li>
                                        <li>• Built-in A/B thumbnail testing</li>
                                        <li>• Excellent bulk processing</li>
                                        <li>• More affordable paid plans</li>
                                    </ul>
                                </div>
                                <div>
                                    <p className="font-semibold text-red-600 mb-2">❌ Cons</p>
                                    <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                                        <li>• Weaker keyword research</li>
                                        <li>• Less AI features</li>
                                        <li>• Limited free plan</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
                            <h3 className="text-xl font-bold text-green-600 dark:text-green-400 mb-4">VidIQ Pros & Cons</h3>
                            <div className="space-y-4">
                                <div>
                                    <p className="font-semibold text-green-600 mb-2">✅ Pros</p>
                                    <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                                        <li>• Superior keyword research</li>
                                        <li>• Better competitor analysis</li>
                                        <li>• Strong AI features & coaching</li>
                                        <li>• More generous free plan</li>
                                    </ul>
                                </div>
                                <div>
                                    <p className="font-semibold text-red-600 mb-2">❌ Cons</p>
                                    <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                                        <li>• No native A/B testing</li>
                                        <li>• Limited bulk processing</li>
                                        <li>• Higher paid plan prices</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* FAQ Section */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">
                            Frequently Asked Questions
                        </h2>
                        <div className="space-y-6">
                            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                                    Is TubeBuddy or VidIQ better for YouTube?
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400">
                                    Both are excellent tools. TubeBuddy is better for A/B testing and bulk processing. VidIQ is better for keyword research and AI features. Many creators use both together for maximum results.
                                </p>
                            </div>
                            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                                    Can I use TubeBuddy and VidIQ together?
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400">
                                    Yes! Many successful creators use both. Use VidIQ for keyword research and competitor analysis, and TubeBuddy for A/B testing and automation. Both free versions work together without conflicts.
                                </p>
                            </div>
                            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                                    Is TubeBuddy safe and approved by YouTube?
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400">
                                    Yes, TubeBuddy is the only YouTube-certified tool. VidIQ is also a trusted YouTube partner. Both comply with YouTube&apos;s Terms of Service and are completely safe to use.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 text-center text-white">
                        <h2 className="text-3xl font-bold mb-6">Try Our Free YouTube SEO Tools</h2>
                        <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
                            Before paying for TubeBuddy or VidIQ, try our free tools to optimize your YouTube videos.
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <Link
                                href="/tools/youtube-tag-generator"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-xl font-bold hover:bg-slate-100 transition-colors"
                            >
                                <FaTags />
                                Free Tag Generator
                            </Link>
                            <Link
                                href="/tools/youtube-title-generator"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-indigo-600 rounded-xl font-bold hover:bg-slate-100 transition-colors"
                            >
                                <FaSearch />
                                Free Title Generator
                            </Link>
                        </div>
                    </div>

                    {/* Author & Date */}
                    <div className="text-center text-slate-600 dark:text-slate-400 mt-12">
                        <p className="mb-2">
                            <strong>Published:</strong> February 4, 2026 | <strong>Last Updated:</strong> February 4, 2026
                        </p>
                        <p>Written by the {siteConfig.name} team</p>
                    </div>
                </div>
            </div>
        </>
    );
}
