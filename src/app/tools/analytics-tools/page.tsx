import Link from "next/link";
import { Metadata } from "next";
import { FaDollarSign, FaChartBar, FaBalanceScale } from "react-icons/fa";
import { siteConfig } from "@/config/site";
import { getToolListSchema } from "@/lib/seo";

export const metadata: Metadata = {
    title: "YouTube Analytics & Earnings Tools - Calculate Revenue & Engagement",
    description: "Free YouTube analytics tools to calculate earnings, measure engagement, and optimize monetization. Track RPM, CPM, engagement rates, and more.",
    keywords: ["youtube analytics tools", "earnings calculator", "engagement calculator", "youtube revenue", "cpm calculator", "youtube monetization"],
    openGraph: {
        title: "3 Free YouTube Analytics Tools | Earnings & Engagement Calculators",
        description: "Calculate your YouTube earnings potential, measure engagement rates, and optimize your monetization strategy with AI-powered analytics.",
        type: "website",
    },
    alternates: {
        canonical: "/tools/analytics-tools",
    },
};

const analyticsTools = [
    {
        slug: "youtube-earnings-calculator",
        name: "YouTube Earnings Calculator",
        description: "Estimate your YouTube earnings based on views and RPM. Calculate monthly and yearly revenue potential.",
        icon: FaDollarSign,
    },
    {
        slug: "youtube-engagement-rate-calculator",
        name: "Engagement Rate Calculator",
        description: "Calculate your YouTube video's engagement rate. Measure how actively your audience interacts with content.",
        icon: FaChartBar,
    },
    {
        slug: "youtube-title-ab-tester",
        name: "Title A/B Score Checker",
        description: "Compare two titles and get AI scoring for click-through potential, clarity, and emotional appeal.",
        icon: FaBalanceScale,
    },
];

export default function AnalyticsToolsHub() {
    const toolListSchema = getToolListSchema(
        analyticsTools.map((tool) => ({
            name: tool.name,
            url: `${siteConfig.url}/tools/${tool.slug}`,
            description: tool.description,
        }))
    );

    return (
        <>
            {/* JSON-LD Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(toolListSchema),
                }}
            />

            <div className="min-h-screen py-20 relative overflow-hidden">
                <div className="nebula-bg" />
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Breadcrumbs */}
                    <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8" aria-label="Breadcrumb">
                        <Link href="/" className="hover:text-purple-600 transition-colors">
                            Home
                        </Link>
                        <span>/</span>
                        <Link href="/tools" className="hover:text-purple-600 transition-colors">
                            Tools
                        </Link>
                        <span>/</span>
                        <span className="text-slate-900 font-medium">Analytics Tools</span>
                    </nav>

                    {/* Header */}
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
                            YouTube Analytics & Earnings Tools
                        </h1>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                            Data-driven tools to calculate your earnings potential, measure audience engagement,
                            and optimize your monetization strategy.
                        </p>
                    </div>

                    {/* Quick Summary */}
                    <div className="summary glass-premium rounded-2xl p-6 border-l-4 border-purple-500 mb-12">
                        <h2 className="text-lg font-bold text-purple-600 mb-2">⚡ What You&apos;ll Discover</h2>
                        <ul className="text-slate-700 text-lg space-y-2">
                            <li>✓ Estimate your monthly and yearly YouTube revenue by niche</li>
                            <li>✓ Calculate engagement rates to prove audience quality to sponsors</li>
                            <li>✓ Test title variations to predict which gets higher CTR</li>
                            <li>✓ Understand your RPM and CPM across different content types</li>
                        </ul>
                    </div>

                    {/* Tools Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                        {analyticsTools.map((tool) => (
                            <Link
                                key={tool.slug}
                                href={`/tools/${tool.slug}`}
                                className="group glass-premium rounded-2xl p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
                            >
                                <div className="flex flex-col items-center text-center">
                                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 to-fuchsia-600 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform mb-4">
                                        <tool.icon className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-purple-600 transition-colors">
                                        {tool.name}
                                    </h3>
                                    <p className="text-slate-600 leading-relaxed">
                                        {tool.description}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Why Analytics Matter - Content Section */}
                    <div className="glass-premium rounded-2xl p-8 mb-12">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">
                            Why YouTube Analytics Matter for Monetization
                        </h2>
                        <div className="prose prose-lg max-w-none">
                            <p className="text-slate-600 leading-relaxed mb-4">
                                Understanding your metrics is the difference between a hobby and a business. In 2026, <strong>top creators track 3 key metrics</strong> religiously:
                            </p>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">1. RPM (Revenue Per Mille)</h3>
                            <p className="text-slate-600 leading-relaxed mb-4">
                                Your actual earnings per 1,000 views after YouTube&apos;s cut. Finance niches earn $40+ RPM while gaming earns $2-5 RPM. <strong>Niche selection is everything.</strong>
                            </p>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">2. Engagement Rate</h3>
                            <p className="text-slate-600 leading-relaxed mb-4">
                                Likes, comments, and shares per view. An engagement rate above <strong>10% is excellent</strong> and proves to brands that your audience cares. This metric can 2x your sponsorship rates.
                            </p>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">3. Click-Through Rate (CTR)</h3>
                            <p className="text-slate-600 leading-relaxed">
                                The percentage of people who click your video after seeing the thumbnail. A/B testing titles can improve CTR by <strong>50-200%</strong>, directly multiplying your views without changing your content.
                            </p>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="text-center">
                        <Link
                            href="/tools"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-xl"
                        >
                            Explore All Tools
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
