import Link from "next/link";
import { Metadata } from "next";
import { ToolCard } from "@/components/ui/Card";
import { getToolsByCategory } from "@/config/tools";
import { siteConfig } from "@/config/site";
import { combineSchemasToGraph, getToolListSchema, getBreadcrumbSchema, getFAQSchema, getGlobalAlternates } from "@/lib/seo";
import { FaRocket, FaArrowRight, FaBrain } from "react-icons/fa";
import AdSlot from "@/components/ads/AdSlot";
import AffiliateBanner from "@/components/ads/AffiliateBanner";
import GeoAeoHead from "@/components/seo/GeoAeoHead";
import Breadcrumb from "@/components/ui/Breadcrumb";
import FaqAccordion from "@/components/ui/FaqAccordion";
import { GEO_AEO_PRESETS } from "@/config/geo-aeo";
import { AD_SLOTS } from "@/lib/adsense";

export const metadata: Metadata = {
    title: {
        absolute: "Free YouTube Channel Growth & Analytics Tools (2026)",
    },
    description: "Scale your YouTube channel with AI-powered research tools. Generate viral video ideas, find trending topics, and plan your content calendar. Free growth suite for 2026.",
    keywords: ["youtube growth tools", "video ideas generator", "youtube trend finder", "content calendar planner", "channel strategy 2026", "viral content ideas", "youtube algorithm tools"],
    openGraph: {
        title: "AI YouTube Growth & Strategy Suite 2026",
        description: "Research and planning tools to help you review channel ideas, workflows, and public creator signals.",
        type: "website",
        url: `${siteConfig.url}/tools/channel-tools`,
    },
    alternates: getGlobalAlternates("/tools/channel-tools"),
};

const channelFaqs = [
    {
        question: "How do YouTube research tools help accelerate channel growth?",
        answer: "Channel research tools identify underserved video topics, rising search queries, and content gaps that high-growth creators use to capture new viewers. By analyzing topic clusters and audience search intent before filming, creators produce videos with significantly higher recommendation velocity.",
    },
    {
        question: "How often should I publish videos to trigger the 2026 YouTube algorithm?",
        answer: "Consistency and viewer satisfaction outweigh raw frequency. Publishing 1-2 thoroughly researched, high-retention videos weekly paired with regular Community Posts builds stronger algorithmic momentum than daily low-retention uploads. Use our Content Calendar Generator to plan predictable upload schedules.",
    },
    {
        question: "Can AI video idea generators help prevent creator burnout?",
        answer: "Yes. AI idea generators remove the cognitive load of brainstorming from scratch by generating curated lists of topic hooks, angles, and curiosity gaps tailored to your specific niche. This allows creators to focus their energy on scriptwriting, storytelling, and high-quality production.",
    },
    {
        question: "What is the best way to choose a profitable YouTube niche in 2026?",
        answer: "The most profitable YouTube niches balance high advertiser demand (CPMs above $15-$30 such as Tech, Finance, B2B SaaS) with personal domain authority and audience search intent. Use our Niche Finder and Trend Helper to validate niche interest before launching.",
    },
];

export default function ChannelToolsHub() {
    const growthTools = getToolsByCategory("channel-growth");

    const toolListSchema = getToolListSchema(
        growthTools.map((tool) => ({
            name: tool.name,
            url: `${siteConfig.url}/tools/${tool.slug}`,
            description: tool.description,
        }))
    );

    const breadcrumbSchema = getBreadcrumbSchema([
        { name: "Home", url: siteConfig.url },
        { name: "Tools", url: `${siteConfig.url}/tools` },
        { name: "Channel Growth", url: `${siteConfig.url}/tools/channel-tools` },
    ]);

    const faqSchema = getFAQSchema(channelFaqs);

    return (
        <>
            {/* GEO / AEO signals for AI Answer Engines */}
            <GeoAeoHead
                {...GEO_AEO_PRESETS.categoryPage(
                    "YouTube Channel Research & Growth Tools",
                    "Research trending topics, generate viral video ideas, and organize content calendars with AI-assisted YouTube growth tools.",
                    growthTools.length,
                    [
                        "AI viral video ideas generator based on viewer curiosity gaps",
                        "Real-time trend helper for rising topical search velocity",
                        "Multi-week content calendar generator for reliable release schedules",
                        "100% free with no browser extension or YouTube credentials required",
                    ]
                )}
                pathname="/tools/channel-tools"
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
                            { name: "Channel Growth" },
                        ]}
                        className="mb-8"
                    />

                    {/* Header */}
                    <div className="text-center mb-10">
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-700 text-xs font-black uppercase tracking-[0.15em] mb-4">
                            <FaBrain className="w-3 h-3" />
                            Growth Intelligence · {growthTools.length} Free Tools
                        </span>
                        <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-5 tracking-tight font-outfit">
                            Master the <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-rose-600">Algorithm</span>
                        </h1>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-outfit font-medium summary" data-speakable>
                            Stop guessing, start growing. In 2026, the algorithm favors creators who use data-driven strategies. Our growth suite provides the AI-powered research tools needed to win the attention economy.
                        </p>
                    </div>

                    {/* Top Leaderboard Ad */}
                    <AdSlot slot={AD_SLOTS.HEADER} preset="leaderboard" className="mb-12" />

                    {/* Growth Strategy Checklist */}
                    <div className="card-3d rounded-3xl p-8 sm:p-10 border-l-4 border-l-orange-500 mb-12">
                        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-6 font-outfit flex items-center gap-3">
                            <FaRocket className="text-orange-500" />
                            The 2026 Rapid Growth Blueprint
                        </h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">✓</div>
                                    <p className="text-slate-700 font-outfit"><strong>Viral Topic Discovery:</strong> Use the Trend Helper to find rising interests before they reach the mainstream.</p>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">✓</div>
                                    <p className="text-slate-700 font-outfit"><strong>Engagement Loops:</strong> Plan your community posts and polls using the Content Calendar for consistent channel activity.</p>
                                </li>
                            </ul>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">✓</div>
                                    <p className="text-slate-700 font-outfit"><strong>Niche Authority:</strong> Generate video ideas that reinforce your &ldquo;Topic Cluster&rdquo; to improve your semantic ranking.</p>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">✓</div>
                                    <p className="text-slate-700 font-outfit"><strong>Retention Modeling:</strong> Design your video hooks around proven curiosity gaps generated by our AI idea engine.</p>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Tools Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7 mb-14">
                        {growthTools.map((tool) => (
                            <ToolCard
                                key={tool.slug}
                                title={tool.name}
                                description={tool.shortDescription || tool.description}
                                href={`/tools/${tool.slug}`}
                                isAI={tool.isAI}
                                category={tool.category}
                            />
                        ))}
                    </div>

                    {/* Pro Creator Growth Recommendation */}
                    <div className="my-8">
                        <AffiliateBanner toolId="tubebuddy" variant="inArticle" />
                    </div>

                    {/* Mid Ad placement */}
                    <AdSlot slot="7688425196" preset="leaderboard" lazy className="my-8" />

                    {/* Authority Guide Section */}
                    <div className="max-w-4xl mx-auto mb-12">
                        <div className="card-3d rounded-3xl p-8 sm:p-10 border-t-4 border-t-rose-500/30">
                            <h2 className="text-3xl font-black text-slate-900 mb-5 font-outfit tracking-tight">
                                Why Strategy Beats &ldquo;Luck&rdquo; in 2026
                            </h2>
                            <div className="article-prose max-w-none text-slate-600 font-outfit">
                                <p className="mb-4">
                                    The 2026 YouTube algorithm is powered by deep neural networks that analyze <strong>Human Satisfaction Metrics</strong>. It&apos;s no longer just about clicks—it&apos;s about &ldquo;Value Delivered.&rdquo;
                                </p>
                                <p>
                                    Our growth tools help you align with this shift by providing insights into high-satisfaction topics and trending interests. By planning your content strategically, you ensure that every upload contributes to your long-term authority and channel health.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* AEO / FAQ Section */}
                    <section className="mb-12" data-speakable>
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6 font-outfit">
                            Frequently Asked Questions About YouTube Channel Growth
                        </h2>
                        <FaqAccordion items={channelFaqs} headingLevel="h3" />
                    </section>

                    {/* Final CTA */}
                    <div className="text-center">
                        <Link
                            href="/tools"
                            className="btn-3d-primary inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-base sm:text-lg group"
                        >
                            <span>View All Tools</span>
                            <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
