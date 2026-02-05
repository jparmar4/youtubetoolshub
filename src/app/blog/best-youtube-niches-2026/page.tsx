import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { getArticleSchema, getBreadcrumbSchema } from "@/lib/seo";
import Link from "next/link";
import Image from "next/image";
import { FaRocket, FaDollarSign, FaChartLine, FaStar } from "react-icons/fa";

export const metadata: Metadata = {
    title: "50 Best YouTube Niches for Beginners 2026 | High CPM ($25-$50)",
    description: "Discover the 50 best YouTube niches for beginners in 2026 with CPM rates up to $50. Complete guide to profitable niches targeting tier 1 countries (US, UK, Canada, Australia) for maximum ad revenue and Google AdSense earnings.",
    keywords: ["best youtube niches", "best youtube niches for beginners", "best youtube niches 2026", "high cpm youtube niches", "profitable youtube niches", "youtube niche ideas", "tier 1 youtube traffic"],
    openGraph: {
        title: "50 Best YouTube Niches for Beginners 2026 | High CPM",
        description: "Finance $25-$50 CPM, Legal $20-$55, Tech $18-$40. Target tier 1 traffic for maximum AdSense revenue!",
        url: `${siteConfig.url}/blog/best-youtube-niches-2026`,
        images: [`${siteConfig.url}/images/blog/best-youtube-niches-2026-hero.png`],
    },
    twitter: {
        card: "summary_large_image",
        title: "50 Best YouTube Niches for Beginners 2026 | High CPM",
        description: "Finance $25-$50 CPM, Legal $20-$55, Tech $18-$40. Target tier 1 traffic!",
        images: [`${siteConfig.url}/images/blog/best-youtube-niches-2026-hero.png`],
    },
    alternates: {
        canonical: "/blog/best-youtube-niches-2026",
        languages: {
            "en": "/blog/best-youtube-niches-2026",
            "x-default": "/blog/best-youtube-niches-2026",
        },
    },
};

const topNiches = [
    {
        name: "Personal Finance & Investing",
        cpm: "$25-$50",
        difficulty: "Medium",
        icon: <FaDollarSign className="text-green-500" />,
    },
    {
        name: "Legal Services & Insurance",
        cpm: "$20-$55",
        difficulty: "Medium-High",
        icon: <FaDollarSign className="text-emerald-500" />,
    },
    {
        name: "Business & Entrepreneurship",
        cpm: "$20-$45",
        difficulty: "Medium",
        icon: <FaChartLine className="text-blue-500" />,
    },
    {
        name: "Technology & SaaS",
        cpm: "$18-$40",
        difficulty: "Easy-Medium",
        icon: <FaRocket className="text-purple-500" />,
    },
];

const nicheCategories = [
    {
        tier: "Ultra-High CPM",
        range: "$20-$55",
        color: "from-amber-600 to-orange-600",
        niches: ["Personal Finance", "Legal Services", "Business", "Technology", "Real Estate", "Cryptocurrency", "Online Education", "Marketing & SEO"],
    },
    {
        tier: "High CPM",
        range: "$12-$20",
        color: "from-green-600 to-emerald-600",
        niches: ["Career Development", "Health & Wellness", "E-commerce", "Productivity", "Luxury Lifestyle", "Self-Improvement", "AI & Machine Learning"],
    },
    {
        tier: "Medium CPM",
        range: "$8-$15",
        color: "from-blue-600 to-indigo-600",
        niches: ["Home Improvement", "Automotive", "Photography", "Cooking", "Travel", "Parenting", "Gardening", "Fitness"],
    },
    {
        tier: "Growing Niches",
        range: "$5-$12",
        color: "from-purple-600 to-pink-600",
        niches: ["Sustainability", "Remote Work", "Side Hustles", "Minimalism", "Book Reviews", "Language Learning", "Pet Care"],
    },
];

export default function BestYouTubeNichesPage() {
    const articleSchema = getArticleSchema({
        title: metadata.title as string,
        description: metadata.description as string,
        url: `${siteConfig.url}/blog/best-youtube-niches-2026`,
        imageUrl: `${siteConfig.url}/images/blog/best-youtube-niches-2026-hero.png`,
        datePublished: "2026-02-05",
        dateModified: "2026-02-05",
        author: "Alex Rivera",
    });

    const breadcrumbSchema = getBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Blog", url: "/blog" },
        { name: "Best YouTube Niches 2026", url: "/blog/best-youtube-niches-2026" },
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
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 text-purple-600 dark:text-purple-300 text-sm font-bold mb-6">
                            <FaStar className="text-lg" />
                            50 Best YouTube Niches 2026
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-8 leading-tight">
                            Best YouTube Niches for <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Beginners 2026</span>
                        </h1>
                        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed mb-8">
                            Comprehensive guide to the most profitable YouTube niches with CPM rates up to $50. Target tier 1 countries for maximum Google AdSense revenue.
                        </p>


                        {/* Hero Image */}
                        <div className="w-full rounded-3xl overflow-hidden mb-8 shadow-2xl">
                            <Image
                                src="/images/blog/best-youtube-niches-2026-hero.png"
                                alt="50 Best YouTube Niches for Beginners 2026 - High CPM niche comparison chart showing tier 1 revenue potential"
                                width={1920}
                                height={1080}
                                className="w-full h-auto"
                                priority
                            />
                        </div>
                    </div>
                </div>

                {/* Key Statistics */}
                <div className="grid md:grid-cols-4 gap-6 mb-16">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 text-center border border-slate-100 dark:border-slate-800">
                        <div className="text-3xl font-bold text-purple-600 mb-2">$25-50</div>
                        <div className="text-slate-600 dark:text-slate-400">Top CPM Range</div>
                    </div>
                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 text-center border border-slate-100 dark:border-slate-800">
                        <div className="text-3xl font-bold text-blue-600 mb-2">50</div>
                        <div className="text-slate-600 dark:text-slate-400">Niches Covered</div>
                    </div>
                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 text-center border border-slate-100 dark:border-slate-800">
                        <div className="text-3xl font-bold text-green-600 mb-2">4</div>
                        <div className="text-slate-600 dark:text-slate-400">CPM Tiers</div>
                    </div>
                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 text-center border border-slate-100 dark:border-slate-800">
                        <div className="text-3xl font-bold text-emerald-600 mb-2">Tier 1</div>
                        <div className="text-slate-600 dark:text-slate-400">Traffic Optimized</div>
                    </div>
                </div>

                {/* Top Niches Highlight */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Top 4 Highest CPM Niches</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {topNiches.map((niche, index) => (
                            <div key={index} className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800">
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                                        {niche.icon}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                                            {niche.name}
                                        </h3>
                                        <div className="flex items-center gap-4 text-sm">
                                            <span className="text-green-600 dark:text-green-400 font-bold">{niche.cpm} CPM</span>
                                            <span className="text-slate-500 dark:text-slate-400">• {niche.difficulty}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Niche Categories */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">All 50 Niches by CPM Tier</h2>
                    <div className="space-y-6">
                        {nicheCategories.map((category, index) => (
                            <div key={index} className={`bg-gradient-to-r ${category.color} rounded-2xl p-8 text-white`}>
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <h3 className="text-2xl font-bold mb-1">{category.tier}</h3>
                                        <p className="text-white/80">CPM Range: {category.range}</p>
                                    </div>
                                    <div className="text-3xl font-bold">{category.niches.length}</div>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {category.niches.map((niche, i) => (
                                        <div key={i} className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 text-center font-medium">
                                            {niche}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Revenue Comparison Section */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Tier 1 Country Revenue Comparison</h2>
                    <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-100 dark:border-slate-800">
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Finance Niche (100K views)</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-slate-600 dark:text-slate-400">🇺🇸 United States</span>
                                        <span className="text-2xl font-bold text-green-600">$5,500</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-slate-600 dark:text-slate-400">🇬🇧 United Kingdom</span>
                                        <span className="text-2xl font-bold text-green-600">$5,000</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-slate-600 dark:text-slate-400">🇨🇦 Canada</span>
                                        <span className="text-2xl font-bold text-green-600">$4,500</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-slate-600 dark:text-slate-400">🇦🇺 Australia</span>
                                        <span className="text-2xl font-bold text-green-600">$4,800</span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Gaming Niche (100K views)</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-slate-600 dark:text-slate-400">🇺🇸 United States</span>
                                        <span className="text-2xl font-bold text-orange-600">$500</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-slate-600 dark:text-slate-400">🇬🇧 United Kingdom</span>
                                        <span className="text-2xl font-bold text-orange-600">$400</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-slate-600 dark:text-slate-400">🇨🇦 Canada</span>
                                        <span className="text-2xl font-bold text-orange-600">$350</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-slate-600 dark:text-slate-400">🇦🇺 Australia</span>
                                        <span className="text-2xl font-bold text-orange-600">$400</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-8 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                            <p className="text-center text-green-600 dark:text-green-400 font-semibold">
                                💡 Finance niche earns 10-14x more than gaming with the same views!
                            </p>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-12 text-center text-white mb-16">
                    <h2 className="text-3xl font-bold mb-4">Ready to Start Your High-CPM YouTube Channel?</h2>
                    <p className="text-purple-100 text-lg mb-8 max-w-2xl mx-auto">
                        Use our free YouTube tools to optimize your content for maximum revenue and faster growth.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link
                            href="/tools/youtube-title-generator"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-purple-600 rounded-xl font-bold hover:bg-slate-100 transition-colors"
                        >
                            <FaRocket />
                            Title Generator
                        </Link>
                        <Link
                            href="/tools/youtube-tag-generator"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 border-2 border-white text-white rounded-xl font-bold hover:bg-white/20 transition-colors"
                        >
                            Tag Generator
                        </Link>
                        <Link
                            href="/tools/youtube-earnings-calculator"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 border-2 border-white text-white rounded-xl font-bold hover:bg-white/20 transition-colors"
                        >
                            <FaDollarSign />
                            Earnings Calculator
                        </Link>
                    </div>
                </div>

                {/* Back to Blog */}
                <div className="text-center">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-semibold"
                    >
                        ← Back to Blog
                    </Link>
                </div>
            </div>
        </>
    );
}
