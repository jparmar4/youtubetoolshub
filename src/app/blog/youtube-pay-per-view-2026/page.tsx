import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { getArticleSchema, getBreadcrumbSchema } from "@/lib/seo";
import Link from "next/link";
import Image from "next/image";
import { FaDollarSign, FaGlobeAmericas, FaYoutube, FaChartLine, FaCalculator, FaQuestionCircle } from "react-icons/fa";

export const metadata: Metadata = {
    title: "How Much Does YouTube Pay Per View in 2026? | Real Earnings Data",
    description: "Discover how much YouTube pays per view in 2026. Average rates: $0.01-$0.05 per view, $3-$5 RPM. Real data from creators with tier 1 country breakdowns and CPM rates.",
    keywords: [
        "youtube pay per view",
        "how much does youtube pay",
        "youtube earnings per view",
        "youtube money per view",
        "youtube payment per view",
        "how much youtube pays",
        "youtube revenue per view",
        "youtube income per view",
        "youtube cpm rates",
        "youtube rpm 2026"
    ],
    openGraph: {
        title: "How Much Does YouTube Pay Per View in 2026?",
        description: "Real YouTube earnings data: $0.01-$0.05 per view, $3-$5 RPM. Complete breakdown by country and niche.",
        url: `${siteConfig.url}/blog/youtube-pay-per-view-2026`,
        images: [`${siteConfig.url}/images/blog/youtube-payment-breakdown-2026.png`],
        type: "article",
    },
    twitter: {
        card: "summary_large_image",
        title: "How Much Does YouTube Pay Per View in 2026?",
        description: "Real earnings data: $0.01-$0.05 per view",
        images: [`${siteConfig.url}/images/blog/youtube-payment-breakdown-2026.png`],
    },
    alternates: {
        canonical: "/blog/youtube-pay-per-view-2026",
        languages: {
            "en-US": "/blog/youtube-pay-per-view-2026",
            "en-GB": "/blog/youtube-pay-per-view-2026",
            "x-default": "/blog/youtube-pay-per-view-2026",
        },
    },
};

const earningsTable = [
    { views: "1,000", lowEarnings: "$1-$2", avgEarnings: "$3-$5", highEarnings: "$10-$30" },
    { views: "10,000", lowEarnings: "$10-$20", avgEarnings: "$30-$50", highEarnings: "$100-$300" },
    { views: "100,000", lowEarnings: "$100-$200", avgEarnings: "$300-$500", highEarnings: "$1,000-$3,000" },
    { views: "1,000,000", lowEarnings: "$1,000-$2,000", avgEarnings: "$3,000-$5,000", highEarnings: "$10,000-$30,000" },
];

const countryRates = [
    { country: "United States", flag: "🇺🇸", cpm: "$15-$40", perView: "$0.015-$0.04" },
    { country: "United Kingdom", flag: "🇬🇧", cpm: "$12-$30", perView: "$0.012-$0.03" },
    { country: "Australia", flag: "🇦🇺", cpm: "$12-$28", perView: "$0.012-$0.028" },
    { country: "Canada", flag: "🇨🇦", cpm: "$10-$25", perView: "$0.01-$0.025" },
    { country: "Germany", flag: "🇩🇪", cpm: "$10-$22", perView: "$0.01-$0.022" },
    { country: "India", flag: "🇮🇳", cpm: "$0.50-$2", perView: "$0.0005-$0.002" },
    { country: "Brazil", flag: "🇧🇷", cpm: "$1-$4", perView: "$0.001-$0.004" },
    { country: "Philippines", flag: "🇵🇭", cpm: "$0.30-$1", perView: "$0.0003-$0.001" },
];

const nicheRates = [
    { niche: "Finance & Investing", cpm: "$25-$50", color: "green" },
    { niche: "Business", cpm: "$20-$45", color: "emerald" },
    { niche: "Technology", cpm: "$18-$40", color: "blue" },
    { niche: "Real Estate", cpm: "$15-$35", color: "purple" },
    { niche: "Health", cpm: "$10-$25", color: "red" },
    { niche: "Education", cpm: "$8-$20", color: "orange" },
    { niche: "Gaming", cpm: "$2-$5", color: "slate" },
    { niche: "Entertainment", cpm: "$2-$4", color: "slate" },
];

export default function YouTubePayPerViewPage() {
    const articleSchema = getArticleSchema({
        title: metadata.title as string,
        description: metadata.description as string,
        url: `${siteConfig.url}/blog/youtube-pay-per-view-2026`,
        imageUrl: `${siteConfig.url}/images/blog/youtube-payment-breakdown-2026.png`,
        datePublished: "2026-02-04",
        dateModified: "2026-02-04",
        author: siteConfig.name,
    });

    const breadcrumbSchema = getBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Blog", url: "/blog" },
        { name: "YouTube Pay Per View", url: "/blog/youtube-pay-per-view-2026" },
    ]);

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "How much does YouTube pay per 1000 views?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "YouTube pays an average of $3-$5 per 1000 views (RPM) in 2026. This varies significantly by niche and audience location: Finance channels earn $10-$30 per 1000 views, while gaming channels earn $1-$3. US viewers generate 5-10x more revenue than viewers from developing countries."
                }
            },
            {
                "@type": "Question",
                "name": "How much does YouTube pay per view?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "YouTube pays approximately $0.01-$0.05 per view on average. High-CPM niches like finance can earn $0.03-$0.05 per view, while entertainment content typically earns $0.002-$0.005 per view. The exact amount depends on your niche, audience location, and advertiser demand."
                }
            },
            {
                "@type": "Question",
                "name": "How much money is 1 million views on YouTube?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "1 million YouTube views typically earns $3,000-$5,000 on average. High-CPM niches (finance, business, tech) can earn $10,000-$30,000 per million views, while low-CPM content (gaming, vlogs) earns $1,000-$2,000. Targeting tier 1 countries significantly increases earnings."
                }
            },
            {
                "@type": "Question",
                "name": "What is the difference between CPM and RPM?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "CPM (Cost Per Mille) is what advertisers pay per 1000 ad impressions. RPM (Revenue Per Mille) is what creators actually earn per 1000 views after YouTube's 45% cut. RPM is typically 40-60% lower than CPM. For example, a $10 CPM results in approximately $4-$6 RPM."
                }
            }
        ]
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

            <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 pb-24">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-300 text-sm font-bold mb-6">
                            <FaYoutube className="text-lg" />
                            YouTube Earnings Guide 2026
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-8 leading-tight">
                            How Much Does YouTube<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">Pay Per View?</span>
                        </h1>
                        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
                            Real earnings data from 2026. Average: $0.01-$0.05 per view, $3-$5 RPM. Complete breakdown by country and niche.
                        </p>
                    </div>

                    {/* Quick Answer Stats */}
                    <div className="grid md:grid-cols-4 gap-4 mb-16">
                        <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-5 text-white text-center">
                            <div className="text-2xl font-bold mb-1">$0.01-$0.05</div>
                            <div className="text-red-100 text-sm">Per View (Avg)</div>
                        </div>
                        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-5 text-white text-center">
                            <div className="text-2xl font-bold mb-1">$3-$5</div>
                            <div className="text-orange-100 text-sm">RPM Average</div>
                        </div>
                        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-5 text-white text-center">
                            <div className="text-2xl font-bold mb-1">$3K-$5K</div>
                            <div className="text-green-100 text-sm">Per 1M Views</div>
                        </div>
                        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-5 text-white text-center">
                            <div className="text-2xl font-bold mb-1">55%</div>
                            <div className="text-blue-100 text-sm">Creator Share</div>
                        </div>
                    </div>

                    {/* Featured Image */}
                    <div className="mb-16 rounded-3xl overflow-hidden shadow-2xl">
                        <Image
                            src="/images/blog/youtube-payment-breakdown-2026.png"
                            alt="How much YouTube pays per view in 2026 - earnings breakdown chart"
                            width={1200}
                            height={630}
                            className="w-full h-auto"
                            priority
                        />
                    </div>

                    {/* Quick Answer */}
                    <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border-2 border-red-200 dark:border-red-800 rounded-3xl p-8 mb-16">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                            <FaDollarSign className="text-red-500" />
                            Quick Answer: YouTube Pay Rates 2026
                        </h2>
                        <div className="text-lg text-slate-700 dark:text-slate-300 space-y-3">
                            <p><strong>Per View:</strong> $0.01-$0.05 (varies by niche/country)</p>
                            <p><strong>Per 1,000 Views (RPM):</strong> $3-$5 average, $10-$30 for finance</p>
                            <p><strong>Per 1 Million Views:</strong> $3,000-$5,000 average, up to $30,000 for premium niches</p>
                            <p><strong>YouTube&apos;s Cut:</strong> 45% of ad revenue (creators keep 55%)</p>
                        </div>
                    </div>

                    {/* Earnings Table */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">
                            YouTube Earnings by View Count
                        </h2>
                        <div className="overflow-x-auto">
                            <table className="w-full bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
                                <thead className="bg-gradient-to-r from-red-600 to-orange-600 text-white">
                                    <tr>
                                        <th className="px-6 py-4 text-left font-semibold">Views</th>
                                        <th className="px-6 py-4 text-center font-semibold">Low CPM Niche</th>
                                        <th className="px-6 py-4 text-center font-semibold">Average</th>
                                        <th className="px-6 py-4 text-center font-semibold">High CPM Niche</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                                    {earningsTable.map((row, index) => (
                                        <tr key={index} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                                            <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">{row.views}</td>
                                            <td className="px-6 py-4 text-center text-slate-600 dark:text-slate-400">{row.lowEarnings}</td>
                                            <td className="px-6 py-4 text-center text-green-600 dark:text-green-400 font-semibold">{row.avgEarnings}</td>
                                            <td className="px-6 py-4 text-center text-emerald-600 dark:text-emerald-400 font-bold">{row.highEarnings}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Country Breakdown */}
                    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 md:p-10 mb-16 text-white">
                        <h2 className="text-3xl font-bold mb-8 text-center flex items-center justify-center gap-3">
                            <FaGlobeAmericas className="text-blue-400" />
                            YouTube Pay Rates by Country
                        </h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            {countryRates.map((item, index) => (
                                <div key={index} className="bg-white/10 rounded-xl p-4 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <span className="text-2xl">{item.flag}</span>
                                        <span className="font-medium">{item.country}</span>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-green-400 font-bold">{item.cpm} CPM</div>
                                        <div className="text-slate-400 text-sm">{item.perView}/view</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Niche Rates */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">
                            CPM Rates by Niche
                        </h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            {nicheRates.map((item, index) => (
                                <div key={index} className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                                    <span className="font-medium text-slate-900 dark:text-white">{item.niche}</span>
                                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${item.color === 'green' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' :
                                            item.color === 'emerald' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' :
                                                item.color === 'blue' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' :
                                                    item.color === 'purple' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300' :
                                                        item.color === 'red' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' :
                                                            item.color === 'orange' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300' :
                                                                'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                                        }`}>
                                        {item.cpm}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CPM vs RPM */}
                    <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-3xl p-8 mb-16">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                            <FaQuestionCircle className="text-blue-500" />
                            CPM vs RPM: What&apos;s the Difference?
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">CPM (Cost Per Mille)</h3>
                                <p className="text-slate-600 dark:text-slate-400">What advertisers pay per 1000 ad impressions. Not all views have ads, so this is higher than what you earn.</p>
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">RPM (Revenue Per Mille)</h3>
                                <p className="text-slate-600 dark:text-slate-400">What YOU earn per 1000 views after YouTube&apos;s 45% cut. This is your actual take-home rate.</p>
                            </div>
                        </div>
                        <div className="mt-4 p-4 bg-white dark:bg-slate-800 rounded-xl">
                            <p className="text-center text-slate-700 dark:text-slate-300">
                                <strong>Example:</strong> $10 CPM → ~$4-$6 RPM (your actual earnings)
                            </p>
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
                                    How much does YouTube pay per 1000 views?
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400">
                                    YouTube pays an average of $3-$5 per 1000 views (RPM). Finance channels earn $10-$30 per 1000 views, while gaming channels earn $1-$3. US viewers generate 5-10x more revenue than developing countries.
                                </p>
                            </div>
                            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                                    How much money is 1 million views on YouTube?
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400">
                                    1 million YouTube views typically earns $3,000-$5,000 on average. High-CPM niches (finance, business) can earn $10,000-$30,000, while low-CPM content earns $1,000-$2,000. Tier 1 country targeting significantly increases earnings.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-3xl p-12 text-center text-white">
                        <h2 className="text-3xl font-bold mb-6">Calculate Your YouTube Earnings</h2>
                        <p className="text-red-100 text-lg mb-8 max-w-2xl mx-auto">
                            Use our free calculator to estimate your potential YouTube revenue based on your niche and audience location.
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <Link
                                href="/tools/youtube-money-calculator"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-red-600 rounded-xl font-bold hover:bg-slate-100 transition-colors"
                            >
                                <FaCalculator />
                                Earnings Calculator
                            </Link>
                            <Link
                                href="/blog/high-cpm-youtube-niches-2026"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-orange-600 rounded-xl font-bold hover:bg-slate-100 transition-colors"
                            >
                                <FaChartLine />
                                High CPM Niches
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
