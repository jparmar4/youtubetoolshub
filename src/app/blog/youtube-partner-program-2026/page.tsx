import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { getArticleSchema, getBreadcrumbSchema } from "@/lib/seo";
import Link from "next/link";
import Image from "next/image";
import { FaYoutube, FaCheck, FaTimes, FaDollarSign, FaClock, FaUsers, FaShieldAlt, FaRocket, FaQuestionCircle } from "react-icons/fa";

export const metadata: Metadata = {
    title: "YouTube Partner Program Requirements 2026: Complete Eligibility Guide",
    description: "YouTube Partner Program requirements 2026. Need 1,000 subscribers + 4,000 watch hours OR 10M Shorts views. Complete guide to YPP eligibility, application, and monetization.",
    keywords: [
        "youtube partner program",
        "youtube partner program requirements",
        "ypp requirements",
        "youtube monetization requirements",
        "how to get monetized on youtube",
        "youtube partner program 2026",
        "youtube monetization eligibility",
        "4000 watch hours",
        "1000 subscribers youtube",
        "youtube partner requirements"
    ],
    openGraph: {
        title: "YouTube Partner Program Requirements 2026",
        description: "Complete guide: 1,000 subs + 4,000 watch hours OR 10M Shorts views. Everything you need to know.",
        url: `${siteConfig.url}/blog/youtube-partner-program-2026`,
        images: [`${siteConfig.url}/images/blog/youtube-partner-program-2026.png`],
        type: "article",
    },
    alternates: {
        canonical: "/blog/youtube-partner-program-2026",
    },
};

const requirements = [
    { icon: FaUsers, title: "1,000 Subscribers", description: "Active subscriber count on your channel", required: true },
    { icon: FaClock, title: "4,000 Watch Hours", description: "Public watch time in the last 12 months", required: true, alt: "OR" },
    { icon: FaYoutube, title: "10M Shorts Views", description: "Public Shorts views in last 90 days", required: true },
    { icon: FaShieldAlt, title: "No Active Strikes", description: "No community guidelines violations", required: true },
    { icon: FaCheck, title: "2-Step Verification", description: "Enabled on your Google account", required: true },
    { icon: FaDollarSign, title: "AdSense Account", description: "Linked to your YouTube channel", required: true },
];

const timeline = [
    { step: 1, title: "Meet Requirements", time: "Varies", description: "Reach 1K subs + 4K hours or 10M Shorts views" },
    { step: 2, title: "Apply in YouTube Studio", time: "5 mins", description: "Go to Monetization > Apply Now" },
    { step: 3, title: "Review Period", time: "~1 month", description: "YouTube reviews your channel for policy compliance" },
    { step: 4, title: "Set Up AdSense", time: "10 mins", description: "Link or create your AdSense account" },
    { step: 5, title: "Start Earning", time: "Immediate", description: "Ads enabled on eligible content" },
];

const benefits = [
    "Ad Revenue (45-55% share)",
    "Channel Memberships",
    "Super Chat & Super Stickers",
    "Super Thanks",
    "YouTube Premium Revenue",
    "Merchandise Shelf",
    "YouTube Shopping",
    "Creator Support"
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

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "What are the YouTube Partner Program requirements in 2026?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "In 2026, YouTube Partner Program requirements are: 1,000 subscribers PLUS either 4,000 public watch hours in the last 12 months OR 10 million public Shorts views in the last 90 days. You also need no active community guidelines strikes, 2-step verification enabled, and a linked AdSense account."
                }
            },
            {
                "@type": "Question",
                "name": "How long does YouTube Partner Program approval take?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "YouTube Partner Program approval typically takes about 1 month on average. However, it can range from 2 weeks to 2+ months depending on application volume and channel review complexity. YouTube manually reviews each channel for policy compliance before approval."
                }
            },
            {
                "@type": "Question",
                "name": "Can you get monetized with just YouTube Shorts?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes! Since 2023, you can qualify for the YouTube Partner Program with 10 million public Shorts views in 90 days + 1,000 subscribers, instead of the traditional 4,000 watch hours requirement. This allows Shorts-only creators to monetize their content."
                }
            },
            {
                "@type": "Question",
                "name": "How much money do you need to make before YouTube pays you?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "YouTube has a $100 minimum payment threshold. Once your AdSense account reaches $100 in earnings, you'll receive payment in the following month (around the 21st). You can choose payment methods like direct deposit, wire transfer, or check depending on your country."
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
                            <FaYoutube className="text-lg" />
                            YPP Guide 2026
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-8 leading-tight">
                            YouTube Partner Program<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">Requirements 2026</span>
                        </h1>
                        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
                            Everything you need to know about YouTube monetization eligibility, application process, and earning potential.
                        </p>
                    </div>

                    {/* Quick Answer */}
                    <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border-2 border-red-200 dark:border-red-800 rounded-3xl p-8 mb-16">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                            <FaDollarSign className="text-red-500" />
                            Quick Answer: YPP Requirements 2026
                        </h2>
                        <div className="text-lg text-slate-700 dark:text-slate-300 space-y-3">
                            <p><strong>👥 Subscribers:</strong> 1,000 minimum</p>
                            <p><strong>⏱️ Watch Hours:</strong> 4,000 public hours (last 12 months)</p>
                            <p><strong>📱 OR Shorts Views:</strong> 10 million (last 90 days)</p>
                            <p><strong>✅ Compliance:</strong> No strikes, 2FA enabled, AdSense linked</p>
                            <p><strong>⏳ Review Time:</strong> ~1 month average</p>
                        </div>
                    </div>

                    {/* Requirements Grid */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">
                            All Requirements Checklist
                        </h2>
                        <div className="mb-8">
                            <Image
                                src="/images/blog/youtube-partner-program-2026-checklist.png"
                                alt="YouTube Partner Program Requirements Checklist Infographic"
                                width={1200}
                                height={675}
                                className="w-full rounded-xl border border-slate-200 dark:border-slate-800"
                            />
                        </div>
                        <div className="grid md:grid-cols-3 gap-4">
                            {requirements.map((req, index) => (
                                <div key={index} className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 relative">
                                    {req.alt && (
                                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                                            {req.alt}
                                        </div>
                                    )}
                                    <req.icon className="text-3xl text-red-600 mb-4" />
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{req.title}</h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">{req.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Timeline */}
                    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 text-white mb-16">
                        <h2 className="text-2xl font-bold mb-8 text-center">Application Timeline</h2>
                        <div className="space-y-4">
                            {timeline.map((step, index) => (
                                <div key={index} className="flex items-center gap-4 bg-white/10 rounded-xl p-4">
                                    <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center font-bold flex-shrink-0">
                                        {step.step}
                                    </div>
                                    <div className="flex-grow">
                                        <div className="font-bold">{step.title}</div>
                                        <div className="text-sm text-slate-400">{step.description}</div>
                                    </div>
                                    <div className="text-orange-400 font-bold text-sm">{step.time}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Benefits */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">
                            YPP Benefits & Revenue Streams
                        </h2>
                        <div className="grid md:grid-cols-4 gap-4">
                            {benefits.map((benefit, index) => (
                                <div key={index} className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 flex items-center gap-3">
                                    <FaCheck className="text-green-500 flex-shrink-0" />
                                    <span className="text-slate-700 dark:text-slate-300 text-sm">{benefit}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* FAQ */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">FAQ</h2>
                        <div className="space-y-6">
                            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">How long does YPP approval take?</h3>
                                <p className="text-slate-600 dark:text-slate-400">Typically about 1 month, but can range from 2 weeks to 2+ months depending on volume and review complexity.</p>
                            </div>
                            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Can I get monetized with only Shorts?</h3>
                                <p className="text-slate-600 dark:text-slate-400">Yes! 10 million Shorts views in 90 days + 1,000 subscribers qualifies you instead of the 4,000 watch hours requirement.</p>
                            </div>
                            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">What&apos;s the minimum payout threshold?</h3>
                                <p className="text-slate-600 dark:text-slate-400">$100 minimum. Once your AdSense reaches $100, you&apos;ll be paid around the 21st of the following month.</p>
                            </div>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-3xl p-12 text-center text-white">
                        <h2 className="text-3xl font-bold mb-6">Ready to Grow Your Channel?</h2>
                        <p className="text-red-100 text-lg mb-8">Learn how to reach 1,000 subscribers and 4,000 watch hours faster.</p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <Link href="/blog/get-1000-subscribers-youtube-fast-2026" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-red-600 rounded-xl font-bold hover:bg-slate-100 transition-colors">
                                <FaUsers /> Get 1K Subscribers
                            </Link>
                            <Link href="/blog/youtube-shorts-monetization-2026" className="inline-flex items-center gap-2 px-8 py-4 bg-white/20 text-white rounded-xl font-bold hover:bg-white/30 transition-colors">
                                <FaRocket /> Shorts Monetization
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
