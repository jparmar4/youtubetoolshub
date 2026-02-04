import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { getArticleSchema, getBreadcrumbSchema } from "@/lib/seo";
import Link from "next/link";
import Image from "next/image";
import { FaDollarSign, FaChartLine, FaGlobeAmericas, FaYoutube, FaTrophy, FaLightbulb, FaRocket, FaCrown } from "react-icons/fa";

export const metadata: Metadata = {
    title: "Best YouTube Niches for High CPM in 2026 | Earn $20-$50 Per 1000 Views",
    description: "Discover the most profitable YouTube niches with the highest CPM rates in 2026. Finance, tech, and business niches paying $20-$50 CPM. Complete guide with tier 1 country strategies.",
    keywords: [
        "high cpm youtube niches",
        "best youtube niches 2026",
        "highest paying youtube niches",
        "youtube cpm rates",
        "profitable youtube niches",
        "youtube niche ideas",
        "best niches for youtube",
        "high rpm youtube",
        "youtube monetization niches",
        "top paying youtube categories"
    ],
    openGraph: {
        title: "Best YouTube Niches for High CPM in 2026 | $20-$50 CPM",
        description: "The most profitable YouTube niches with highest CPM rates. Finance, tech & business niches paying $20-$50 per 1000 views.",
        url: `${siteConfig.url}/blog/high-cpm-youtube-niches-2026`,
        images: [`${siteConfig.url}/images/blog/most-profitable-youtube-niches-2026.png`],
        type: "article",
    },
    twitter: {
        card: "summary_large_image",
        title: "Best YouTube Niches for High CPM in 2026",
        description: "Discover niches paying $20-$50 CPM",
        images: [`${siteConfig.url}/images/blog/most-profitable-youtube-niches-2026.png`],
    },
    alternates: {
        canonical: "/blog/high-cpm-youtube-niches-2026",
        languages: {
            "en-US": "/blog/high-cpm-youtube-niches-2026",
            "en-GB": "/blog/high-cpm-youtube-niches-2026",
            "x-default": "/blog/high-cpm-youtube-niches-2026",
        },
    },
};

const niches = [
    {
        rank: 1,
        name: "Personal Finance & Investing",
        cpm: "$25-$50",
        description: "Highest paying niche on YouTube. Covers investing, budgeting, credit cards, and wealth building.",
        examples: ["Graham Stephan", "Andrei Jikh", "Dave Ramsey"],
        whyHighCPM: "Financial services advertisers (banks, brokerages, fintech) pay premium rates",
        icon: <FaDollarSign className="text-green-500" />,
    },
    {
        rank: 2,
        name: "Business & Entrepreneurship",
        cpm: "$20-$45",
        description: "Covers startups, side hustles, ecommerce, and business strategy for aspiring entrepreneurs.",
        examples: ["Alex Hormozi", "My First Million", "Pat Flynn"],
        whyHighCPM: "B2B software, courses, and business services have huge ad budgets",
        icon: <FaRocket className="text-purple-500" />,
    },
    {
        rank: 3,
        name: "Technology & Software",
        cpm: "$18-$40",
        description: "Tech reviews, tutorials, AI tools, and software comparisons attract tech-savvy audiences.",
        examples: ["MKBHD", "Linus Tech Tips", "Fireship"],
        whyHighCPM: "Tech companies spend heavily on YouTube advertising",
        icon: <FaLightbulb className="text-blue-500" />,
    },
    {
        rank: 4,
        name: "Real Estate",
        cpm: "$15-$35",
        description: "Property investing, house flipping, rental income, and real estate agent content.",
        examples: ["Graham Stephan", "Meet Kevin", "BiggerPockets"],
        whyHighCPM: "Real estate agents and mortgage companies are major advertisers",
        icon: <FaChartLine className="text-orange-500" />,
    },
    {
        rank: 5,
        name: "Legal & Insurance",
        cpm: "$20-$55",
        description: "Legal advice, insurance comparisons, and law firm marketing content.",
        examples: ["Legal Eagle", "Attorney Tom"],
        whyHighCPM: "Lawyers and insurance companies pay top dollar for leads",
        icon: <FaCrown className="text-yellow-500" />,
    },
    {
        rank: 6,
        name: "Health & Medical",
        cpm: "$12-$30",
        description: "Medical information, health tips, fitness science, and wellness content.",
        examples: ["Doctor Mike", "Dr. Berg", "Jeff Nippard"],
        whyHighCPM: "Healthcare and pharmaceutical advertisers with large budgets",
        icon: <FaTrophy className="text-red-500" />,
    },
    {
        rank: 7,
        name: "B2B & Marketing",
        cpm: "$15-$35",
        description: "Digital marketing, SEO, social media strategy, and agency growth content.",
        examples: ["Neil Patel", "Gary Vee", "HubSpot"],
        whyHighCPM: "Marketing software companies compete for professional audiences",
        icon: <FaGlobeAmericas className="text-indigo-500" />,
    },
    {
        rank: 8,
        name: "Career & Education",
        cpm: "$10-$25",
        description: "Career advice, skill development, online courses, and professional growth.",
        examples: ["Ali Abdaal", "Thomas Frank", "Coursera"],
        whyHighCPM: "EdTech and course creators are aggressive advertisers",
        icon: <FaYoutube className="text-cyan-500" />,
    },
];

const lowCPMNiches = [
    { name: "Gaming", cpm: "$2-$5", reason: "Young audience, low purchasing power" },
    { name: "Entertainment/Vlogs", cpm: "$2-$4", reason: "Broad audience, less targeted" },
    { name: "Music", cpm: "$1-$3", reason: "High skip rates, passive viewing" },
    { name: "Pets/Animals", cpm: "$3-$6", reason: "Limited advertiser demand" },
    { name: "Kids Content", cpm: "$1-$3", reason: "COPPA restrictions limit ads" },
];

export default function HighCPMNichesPage() {
    const articleSchema = getArticleSchema({
        title: metadata.title as string,
        description: metadata.description as string,
        url: `${siteConfig.url}/blog/high-cpm-youtube-niches-2026`,
        imageUrl: `${siteConfig.url}/images/blog/most-profitable-youtube-niches-2026.png`,
        datePublished: "2026-02-04",
        dateModified: "2026-02-04",
        author: siteConfig.name,
    });

    const breadcrumbSchema = getBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Blog", url: "/blog" },
        { name: "High CPM YouTube Niches", url: "/blog/high-cpm-youtube-niches-2026" },
    ]);

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "What are the highest paying YouTube niches in 2026?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The highest paying YouTube niches in 2026 are: 1) Personal Finance ($25-$50 CPM), 2) Legal & Insurance ($20-$55 CPM), 3) Business & Entrepreneurship ($20-$45 CPM), 4) Technology ($18-$40 CPM), and 5) Real Estate ($15-$35 CPM). These niches attract premium advertisers willing to pay top rates."
                }
            },
            {
                "@type": "Question",
                "name": "What is a good CPM on YouTube?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "A good CPM on YouTube varies by niche: $15-$30+ is excellent, $8-$15 is good, $4-$8 is average, and below $4 is low. The global YouTube average is around $3-$5 CPM. Finance, business, and tech channels typically earn 3-10x higher than entertainment or gaming channels."
                }
            },
            {
                "@type": "Question",
                "name": "Which countries have the highest YouTube CPM?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The highest CPM countries are: United States ($15-$40), United Kingdom ($12-$30), Australia ($12-$28), Canada ($10-$25), and Germany ($10-$22). Targeting these 'Tier 1' countries can increase your revenue by 300-500% compared to global audiences."
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
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-300 text-sm font-bold mb-6">
                            <FaDollarSign className="text-lg" />
                            Monetization Guide 2026
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-8 leading-tight">
                            Best YouTube Niches for<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">High CPM</span> in 2026
                        </h1>
                        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
                            Discover the most profitable YouTube niches paying $20-$50 per 1000 views. Target tier 1 countries and maximize your revenue.
                        </p>
                    </div>

                    {/* Key Stats */}
                    <div className="grid md:grid-cols-4 gap-4 mb-16">
                        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-5 text-white text-center">
                            <div className="text-3xl font-bold mb-1">$50</div>
                            <div className="text-green-100 text-sm">Max CPM (Finance)</div>
                        </div>
                        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-5 text-white text-center">
                            <div className="text-3xl font-bold mb-1">10x</div>
                            <div className="text-emerald-100 text-sm">vs Gaming CPM</div>
                        </div>
                        <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl p-5 text-white text-center">
                            <div className="text-3xl font-bold mb-1">USA</div>
                            <div className="text-teal-100 text-sm">Best CPM Country</div>
                        </div>
                        <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-2xl p-5 text-white text-center">
                            <div className="text-3xl font-bold mb-1">8</div>
                            <div className="text-cyan-100 text-sm">Top Niches Ranked</div>
                        </div>
                    </div>

                    {/* Featured Image */}
                    <div className="mb-16 rounded-3xl overflow-hidden shadow-2xl">
                        <Image
                            src="/images/blog/most-profitable-youtube-niches-2026.png"
                            alt="Best YouTube niches for high CPM in 2026 - revenue comparison chart"
                            width={1200}
                            height={630}
                            className="w-full h-auto"
                            priority
                        />
                    </div>

                    {/* Quick Answer */}
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-200 dark:border-green-800 rounded-3xl p-8 mb-16">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                            <FaDollarSign className="text-green-500" />
                            Quick Answer: Highest CPM Niches
                        </h2>
                        <div className="text-lg text-slate-700 dark:text-slate-300 space-y-2">
                            <p><strong>🥇 #1 Personal Finance:</strong> $25-$50 CPM</p>
                            <p><strong>🥈 #2 Legal & Insurance:</strong> $20-$55 CPM</p>
                            <p><strong>🥉 #3 Business & Entrepreneurship:</strong> $20-$45 CPM</p>
                            <p><strong>4. Technology & Software:</strong> $18-$40 CPM</p>
                            <p><strong>5. Real Estate:</strong> $15-$35 CPM</p>
                        </div>
                    </div>

                    {/* Niche Breakdown */}
                    <div className="mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-10 text-center">
                            Top 8 High CPM YouTube Niches
                        </h2>
                        <div className="space-y-6">
                            {niches.map((niche, index) => (
                                <div
                                    key={index}
                                    className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-lg"
                                >
                                    <div className="flex flex-col md:flex-row gap-6">
                                        <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white text-xl font-bold">
                                            #{niche.rank}
                                        </div>
                                        <div className="flex-grow">
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className="text-2xl">{niche.icon}</span>
                                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                                                    {niche.name}
                                                </h3>
                                                <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-bold">
                                                    {niche.cpm} CPM
                                                </span>
                                            </div>
                                            <p className="text-slate-600 dark:text-slate-400 mb-3">
                                                {niche.description}
                                            </p>
                                            <div className="grid md:grid-cols-2 gap-4 text-sm">
                                                <div>
                                                    <span className="text-slate-500 dark:text-slate-500">Top Channels: </span>
                                                    <span className="text-slate-700 dark:text-slate-300">{niche.examples.join(", ")}</span>
                                                </div>
                                                <div>
                                                    <span className="text-slate-500 dark:text-slate-500">Why High CPM: </span>
                                                    <span className="text-slate-700 dark:text-slate-300">{niche.whyHighCPM}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Low CPM Warning */}
                    <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-3xl p-8 mb-16">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                            ⚠️ Low CPM Niches to Avoid (Unless You Love the Content)
                        </h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            {lowCPMNiches.map((niche, index) => (
                                <div key={index} className="flex items-center justify-between p-3 bg-white dark:bg-slate-800 rounded-xl">
                                    <span className="font-medium text-slate-900 dark:text-white">{niche.name}</span>
                                    <span className="text-red-600 dark:text-red-400 font-semibold">{niche.cpm}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Tier 1 Countries */}
                    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 md:p-10 mb-16 text-white">
                        <h2 className="text-3xl font-bold mb-8 text-center flex items-center justify-center gap-3">
                            <FaGlobeAmericas className="text-blue-400" />
                            Target Tier 1 Countries for Maximum CPM
                        </h2>
                        <div className="grid md:grid-cols-4 gap-4">
                            <div className="bg-white/10 rounded-xl p-4 text-center">
                                <div className="text-2xl mb-2">🇺🇸</div>
                                <div className="font-bold">United States</div>
                                <div className="text-green-400 font-semibold">$15-$40 CPM</div>
                            </div>
                            <div className="bg-white/10 rounded-xl p-4 text-center">
                                <div className="text-2xl mb-2">🇬🇧</div>
                                <div className="font-bold">United Kingdom</div>
                                <div className="text-green-400 font-semibold">$12-$30 CPM</div>
                            </div>
                            <div className="bg-white/10 rounded-xl p-4 text-center">
                                <div className="text-2xl mb-2">🇦🇺</div>
                                <div className="font-bold">Australia</div>
                                <div className="text-green-400 font-semibold">$12-$28 CPM</div>
                            </div>
                            <div className="bg-white/10 rounded-xl p-4 text-center">
                                <div className="text-2xl mb-2">🇨🇦</div>
                                <div className="font-bold">Canada</div>
                                <div className="text-green-400 font-semibold">$10-$25 CPM</div>
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
                                    What are the highest paying YouTube niches?
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400">
                                    Personal Finance ($25-$50 CPM), Legal & Insurance ($20-$55 CPM), and Business ($20-$45 CPM) are the highest paying niches. These attract premium advertisers from financial services, law firms, and B2B software companies.
                                </p>
                            </div>
                            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                                    What is a good CPM on YouTube?
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400">
                                    A good CPM varies by niche: $15-$30+ is excellent, $8-$15 is good, $4-$8 is average. The global average is $3-$5 CPM. High-value niches targeting US audiences can earn 5-10x higher than entertainment or gaming content.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl p-12 text-center text-white">
                        <h2 className="text-3xl font-bold mb-6">Ready to Enter a High CPM Niche?</h2>
                        <p className="text-green-100 text-lg mb-8 max-w-2xl mx-auto">
                            Use our free tools to research keywords and optimize your content for maximum CPM and revenue.
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <Link
                                href="/tools/youtube-title-generator"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-green-600 rounded-xl font-bold hover:bg-slate-100 transition-colors"
                            >
                                <FaRocket />
                                Title Generator
                            </Link>
                            <Link
                                href="/tools/youtube-tag-generator"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-emerald-600 rounded-xl font-bold hover:bg-slate-100 transition-colors"
                            >
                                <FaChartLine />
                                Tag Generator
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
