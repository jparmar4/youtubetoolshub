import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { getArticleSchema, getBreadcrumbSchema } from "@/lib/seo";
import Link from "next/link";
import { FaYoutube, FaCheck, FaDollarSign, FaClock, FaUsers, FaRocket, FaTools } from "react-icons/fa";

export const metadata: Metadata = {
    title: "YouTube Partner Program Requirements 2026: Complete Eligibility Guide",
    description: "YouTube Partner Program requirements 2026. Need 1,000 subscribers + 4,000 watch hours OR 10M Shorts views. Complete guide to YPP eligibility and monetization.",
    keywords: ["youtube partner program", "youtube partner program requirements", "ypp requirements", "youtube monetization requirements", "how to get monetized on youtube"],
    openGraph: {
        title: "YouTube Partner Program Requirements 2026",
        description: "Complete guide: 1,000 subs + 4,000 watch hours OR 10M Shorts views",
        url: `${siteConfig.url}/blog/youtube-partner-program-2026`,
        images: [`${siteConfig.url}/images/blog/youtube-partner-program-2026.png`],
    },
    twitter: {
        card: "summary_large_image",
        title: "YouTube Partner Program Requirements 2026",
        description: "Complete guide to YPP eligibility",
        images: [`${siteConfig.url}/images/blog/youtube-partner-program-2026.png`],
    },
    alternates: {
        canonical: "/blog/youtube-partner-program-2026",
        languages: {
            "en": "/blog/youtube-partner-program-2026",
            "x-default": "/blog/youtube-partner-program-2026",
        },
    },
};

const requirements = [
    { title: "1,000 Subscribers", description: "Active subscriber count on your channel", icon: <FaUsers className="text-red-500" /> },
    { title: "4,000 Watch Hours", description: "Public watch time in the last 12 months", icon: <FaClock className="text-blue-500" /> },
    { title: "OR 10M Shorts Views", description: "Public Shorts views in last 90 days", icon: <FaYoutube className="text-purple-500" /> },
    { title: "No Active Strikes", description: "No community guidelines violations", icon: <FaCheck className="text-green-500" /> },
];

const timeline = [
    { step: 1, title: "Meet Requirements", time: "Varies" },
    { step: 2, title: "Apply in YouTube Studio", time: "5 mins" },
    { step: 3, title: "Review Period", time: "~1 month" },
    { step: 4, title: "Set Up AdSense", time: "10 mins" },
    { step: 5, title: "Start Earning", time: "Immediate" },
];

const benefits = [
    "Ad Revenue (45-55% share)",
    "Channel Memberships",
    "Super Chat & Stickers",
    "Super Thanks",
    "YouTube Premium Revenue",
    "Merchandise Shelf",
];

const relatedTools = [
    {
        name: "Earnings Calculator",
        description: "Estimate your potential YouTube earnings.",
        link: "/tools/youtube-earnings-calculator",
    },
    {
        name: "Channel Audit",
        description: "Check your YPP eligibility progress.",
        link: "/tools/youtube-channel-audit",
    },
    {
        name: "Subscriber Counter",
        description: "Track your subscriber growth in real-time.",
        link: "/tools/youtube-subscriber-counter",
    },
];

export default function YouTubePartnerProgramPage() {
    const articleSchema = getArticleSchema({
        title: metadata.title as string,
        description: metadata.description as string,
        url: `${siteConfig.url}/blog/youtube-partner-program-2026`,
        imageUrl: `${siteConfig.url}/images/blog/youtube-partner-program-2026.png`,
        datePublished: "2026-02-04",
        dateModified: "2026-02-04",
        author: siteConfig.name,
    });

    const breadcrumbSchema = getBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Blog", url: "/blog" },
        { name: "Partner Program", url: "/blog/youtube-partner-program-2026" },
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
                            <FaYoutube className="text-lg" />
                            YPP Guide 2026
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-8 leading-tight">
                            YouTube Partner Program<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">Requirements 2026</span>
                        </h1>
                        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
                            Everything you need to know about YouTube monetization eligibility and the application process.
                        </p>
                    </div>

                    {/* Key Stats */}
                    <div className="grid md:grid-cols-3 gap-6 mb-16">
                        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 text-center border border-slate-100 dark:border-slate-800">
                            <div className="text-3xl font-bold text-red-600 mb-2">1,000</div>
                            <div className="text-slate-600 dark:text-slate-400">Subscribers needed</div>
                        </div>
                        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 text-center border border-slate-100 dark:border-slate-800">
                            <div className="text-3xl font-bold text-orange-600 mb-2">4,000</div>
                            <div className="text-slate-600 dark:text-slate-400">Watch hours (12 mo)</div>
                        </div>
                        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 text-center border border-slate-100 dark:border-slate-800">
                            <div className="text-3xl font-bold text-purple-600 mb-2">~1 mo</div>
                            <div className="text-slate-600 dark:text-slate-400">Review time</div>
                        </div>
                    </div>

                    {/* Requirements */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">YPP Requirements</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {requirements.map((req, index) => (
                                <div key={index} className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800">
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                                            {req.icon}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">
                                                {req.title}
                                            </h3>
                                            <p className="text-slate-600 dark:text-slate-400 text-sm">
                                                {req.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Timeline */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Application Timeline</h2>
                        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden">
                            <div className="divide-y divide-slate-100 dark:divide-slate-800">
                                {timeline.map((step, index) => (
                                    <div key={index} className="flex items-center justify-between p-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center font-bold text-sm">
                                                {step.step}
                                            </div>
                                            <span className="font-medium text-slate-900 dark:text-white">{step.title}</span>
                                        </div>
                                        <span className="text-orange-600 font-bold text-sm">{step.time}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Benefits */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">YPP Benefits</h2>
                        <div className="grid md:grid-cols-3 gap-4">
                            {benefits.map((benefit, index) => (
                                <div key={index} className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-100 dark:border-slate-800 flex items-center gap-3">
                                    <FaCheck className="text-green-500 flex-shrink-0" />
                                    <span className="text-slate-700 dark:text-slate-300 text-sm">{benefit}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Tools */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Helpful Tools</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            {relatedTools.map((tool, index) => (
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
                                        Try Now
                                        <FaRocket className="text-sm" />
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-3xl p-12 text-center text-white">
                        <h2 className="text-3xl font-bold mb-4">Ready to Grow Your Channel?</h2>
                        <p className="text-red-100 text-lg mb-8 max-w-2xl mx-auto">
                            Learn how to reach 1,000 subscribers faster with our proven strategies.
                        </p>
                        <Link
                            href="/blog/get-1000-subscribers-youtube-fast-2026"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-red-600 rounded-xl font-bold hover:bg-slate-100 transition-colors"
                        >
                            <FaUsers className="text-xl" />
                            Get 1K Subscribers
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
