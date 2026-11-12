import Link from "next/link";
import { Metadata } from "next";
import { ToolCard } from "@/components/ui/Card";
import { getToolsByCategory } from "@/config/tools";
import { siteConfig } from "@/config/site";
import { combineSchemasToGraph, getToolListSchema, getBreadcrumbSchema, getFAQSchema, getGlobalAlternates } from "@/lib/seo";
import AdSlot from "@/components/ads/AdSlot";
import AffiliateBanner from "@/components/ads/AffiliateBanner";
import InternationalPayoutCallout from "@/components/ads/InternationalPayoutCallout";
import Tier1ComparisonMatrix from "@/components/tools/Tier1ComparisonMatrix";
import GeoAeoHead from "@/components/seo/GeoAeoHead";
import Breadcrumb from "@/components/ui/Breadcrumb";
import FaqAccordion from "@/components/ui/FaqAccordion";
import { GEO_AEO_PRESETS } from "@/config/geo-aeo";
import { AD_SLOTS } from "@/lib/adsense";
import { countryCPMData } from "@/lib/cpm-data";
import { FaDollarSign, FaChartBar } from "react-icons/fa";

const analyticsTools = getToolsByCategory("analytics-earnings");

export const metadata: Metadata = {
    title: `YouTube Analytics, Revenue & Tax Calculators — ${analyticsTools.length} Free Tools (2026)`,
    description: `${analyticsTools.length} free YouTube analytics, revenue, sponsorship, channel valuation, S-Corp tax, and AdSense banking calculators for Tier-1 and global creators in 2026.`,
    keywords: ["youtube earnings calculator", "youtube sponsorship calculator", "youtube channel valuation calculator", "youtube llc vs s corp calculator", "engagement rate benchmarks 2026", "youtube monetization tools", "cpm by niche 2026", "youtube roi calculator"],
    openGraph: {
        title: `${analyticsTools.length} Free YouTube Analytics, Revenue & Tax Calculators | ROI 2026`,
        description: "Calculate your YouTube AdSense income, sponsorship rates, channel net worth, S-Corp tax savings, and engagement depth with our 2026 suite.",
        type: "website",
        url: `${siteConfig.url}/tools/analytics-tools`,
    },
    alternates: getGlobalAlternates("/tools/analytics-tools"),
};

const analyticsFaqs = [
    {
        question: "How is YouTube ad revenue (CPM & RPM) calculated?",
        answer: "Ad revenue depends on Playback-Based CPM (what advertisers pay per 1,000 views) and RPM (Revenue Per Mille, the creator's actual net take-home per 1,000 views after YouTube's 45% revenue split). High-intent niches such as Finance, B2B SaaS, and Real Estate in Tier-1 countries command CPMs exceeding $30-$50.",
    },
    {
        question: "What is a good engagement rate on YouTube in 2026?",
        answer: "A healthy YouTube engagement rate generally ranges between 3.5% and 7.0%, calculated by dividing total interactions (likes, comments, shares, playlist saves) by total views. Creators with engagement rates above 8% frequently experience higher viral recommendation rates and command premium sponsorship rates.",
    },
    {
        question: "How can A/B testing video titles improve views?",
        answer: "A/B testing titles uncovers which psychological hooks (intrigue, quantifiable benefit, question, or bold claim) trigger the highest Click-Through Rate (CTR) for your specific target audience. A 2% improvement in CTR often leads to a 200%+ increase in algorithmic recommendations.",
    },
    {
        question: "How can creators predict sponsorship earnings?",
        answer: "Sponsorship value is modeled primarily on reliable 30-day average view counts, audience geography (percentage of viewers in US, UK, CA, AU), and niche commercial intent. Standard sponsorship CPMs range from $20 to $60 per 1,000 expected views.",
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

    const breadcrumbSchema = getBreadcrumbSchema([
        { name: "Home", url: siteConfig.url },
        { name: "Tools", url: `${siteConfig.url}/tools` },
        { name: "Analytics Tools", url: `${siteConfig.url}/tools/analytics-tools` },
    ]);

    const faqSchema = getFAQSchema(analyticsFaqs);

    return (
        <>
            {/* GEO / AEO signals for AI Answer Engines */}
            <GeoAeoHead
                {...GEO_AEO_PRESETS.categoryPage(
                    "YouTube Analytics & Earnings Tools",
                    "Calculate potential ad revenue, evaluate engagement metrics, and forecast growth with free YouTube creator analytics calculators.",
                    analyticsTools.length,
                    [
                        `Dynamic YouTube earnings and RPM calculator across ${countryCPMData.length} countries`,
                        "Audience engagement rate and benchmark diagnostic tool",
                        "Title A/B prediction engine for higher CTR",
                        "100% free with no account or API keys required",
                    ]
                )}
                pathname="/tools/analytics-tools"
            />

            {/* JSON-LD Schemas */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(
                        combineSchemasToGraph(toolListSchema, breadcrumbSchema, faqSchema),
                    ),
                }}
            />

            <div className="min-h-screen py-10 sm:py-14 relative overflow-hidden">
                <div className="nebula-bg" />
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Breadcrumb
                        items={[
                            { name: "Home", href: "/" },
                            { name: "Tools", href: "/tools" },
                            { name: "Analytics Tools" },
                        ]}
                        className="mb-8"
                    />

                    {/* Header */}
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-4">
                            {analyticsTools.length} Free Analytics &amp; Revenue Calculators
                        </div>
                        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-5 tracking-tight font-outfit">
                            Analytics, Revenue &amp; Tax Hub 2026
                        </h1>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed summary" data-speakable>
                            Turn your data into a sustainable media business. Our {analyticsTools.length}-tool analytics suite helps you model Tier-1 AdSense RPM, price brand sponsorships, value your channel, and optimize LLC vs S-Corp creator taxes.
                        </p>
                    </div>

                    {/* Top Leaderboard Ad */}
                    <AdSlot slot={AD_SLOTS.HEADER} preset="leaderboard" className="mb-12" />

                    {/* Revenue & Growth Strategy */}
                    <div className="summary card-3d rounded-2xl p-8 border-l-4 border-l-emerald-500 mb-12">
                        <h2 className="text-xl font-bold text-emerald-700 mb-4 flex items-center gap-2 font-outfit">
                            <FaDollarSign className="w-5 h-5" />
                            <span>The 2026 Monetization Blueprint</span>
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6 text-slate-700">
                            <ul className="space-y-3">
                                <li className="flex items-start gap-2">
                                    <span className="text-emerald-600 font-bold">✓</span>
                                    <span><strong>CPM Maximization:</strong> Learn which high-intent niches (Finance, SaaS, Real Estate) currently yield $35+ CPMs.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-emerald-600 font-bold">✓</span>
                                    <span><strong>Engagement Velocity:</strong> Measure how fast your community responds to new uploads to trigger &lsquo;Suggested Video&rsquo; loops.</span>
                                </li>
                            </ul>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-2">
                                    <span className="text-emerald-600 font-bold">✓</span>
                                    <span><strong>Title A/B Prediction:</strong> Use AI to compare CTR potential before you upload, saving your video from a poor launch.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-emerald-600 font-bold">✓</span>
                                    <span><strong>Sponsorship Value:</strong> Use your engagement rate to negotiate higher rates with brand sponsors.</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Tools Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7 mb-16">
                        {analyticsTools.map((tool) => (
                            <ToolCard
                                key={tool.slug}
                                title={tool.name}
                                description={tool.description}
                                href={`/tools/${tool.slug}`}
                                isAI={tool.isAI}
                                category={tool.category}
                            />
                        ))}
                    </div>

                    {/* Pro Creator Growth Recommendation */}
                    <div className="my-8">
                        <AffiliateBanner toolId="vidiq" variant="inArticle" />
                    </div>

                    {/* Tier-1 CPM & Tax Comparison Matrix */}
                    <div className="my-10">
                        <Tier1ComparisonMatrix />
                    </div>

                    {/* International Banking & Payout Optimization */}
                    <div className="my-8">
                        <InternationalPayoutCallout />
                    </div>

                    {/* Mid Ad placement */}
                    <AdSlot slot="7336636636" preset="in-article" className="my-8" />

                    {/* Deep Dive Content */}
                    <div className="grid lg:grid-cols-3 gap-8 mb-12">
                        <div className="lg:col-span-2 space-y-8">
                            <div className="card-3d rounded-3xl p-8 sm:p-10">
                                <h2 className="text-3xl font-bold text-slate-900 mb-6 font-outfit">
                                    Why Data Trumps Luck in 2026
                                </h2>
                                <div className="article-prose max-w-none text-slate-600">
                                    <p className="mb-4">
                                        The 2026 YouTube landscape is no longer about guessing. It&apos;s about <strong>mathematical predictability</strong>. Our analytics tools provide you with the raw data needed to treat your channel like a high-growth startup:
                                    </p>
                                    <ul className="space-y-4">
                                        <li><strong>Monetization Forecasting:</strong> Our Earnings Calculator factors in current regional CPM variance and niche advertiser demand to provide realistic revenue roadmaps.</li>
                                        <li><strong>Audience Depth Analysis:</strong> We analyze the intensity of your engagement—measuring whether your audience are passive viewers or active participants who trigger the recommendation algorithm.</li>
                                        <li><strong>Algorithmic Alignment:</strong> We help you track which key variables (such as CTR and viewer retention) are currently favored by YouTube&apos;s neural network.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-1">
                            <div className="rounded-3xl p-8 bg-gradient-to-b from-emerald-900 to-teal-900 text-white shadow-xl">
                                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                    <FaChartBar className="w-5 h-5 text-emerald-300" />
                                    <span>Mastery Tip</span>
                                </h3>
                                <p className="text-emerald-100 mb-6 leading-relaxed">
                                    A high view count is a vanity metric. A high <strong>Engagement-to-Earnings Ratio</strong> is a sanity metric. Focus on building a community that clicks, comments, and contributes to your business.
                                </p>
                                <div className="p-4 rounded-xl bg-white/10 border border-white/15 italic text-sm text-emerald-100">
                                    &ldquo;Profitability doesn&apos;t require millions of views—it requires the right high-intent viewers.&rdquo;
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* AEO / FAQ Section */}
                    <section className="mb-12" data-speakable>
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6 font-outfit">
                            Frequently Asked Questions About YouTube Analytics &amp; Earnings
                        </h2>
                        <FaqAccordion items={analyticsFaqs} headingLevel="h3" />
                    </section>

                    {/* Bottom Multiplex Ad */}
                    <AdSlot slot={AD_SLOTS.MULTIPLEX} preset="multiplex" label="Sponsored Recommendations" className="mb-12" />

                    {/* Final CTA */}
                    <div className="text-center">
                        <Link
                            href="/tools"
                            className="btn-3d-primary inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-base sm:text-lg"
                        >
                            Explore All Growth Tools
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
