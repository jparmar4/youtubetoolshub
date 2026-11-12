import Link from "next/link";
import { Metadata } from "next";
import { ToolCard } from "@/components/ui/Card";
import { getToolsByCategory } from "@/config/tools";
import { siteConfig } from "@/config/site";
import { combineSchemasToGraph, getToolListSchema, getBreadcrumbSchema, getFAQSchema, getGlobalAlternates } from "@/lib/seo";
import AdSlot from "@/components/ads/AdSlot";
import AffiliateBanner from "@/components/ads/AffiliateBanner";
import GeoAeoHead from "@/components/seo/GeoAeoHead";
import Breadcrumb from "@/components/ui/Breadcrumb";
import FaqAccordion from "@/components/ui/FaqAccordion";
import { GEO_AEO_PRESETS } from "@/config/geo-aeo";
import { AD_SLOTS } from "@/lib/adsense";
import { FaLightbulb } from "react-icons/fa";

const thumbnailTools = getToolsByCategory("thumbnail-media");

export const metadata: Metadata = {
    title: {
        absolute: "Free YouTube Thumbnail Tools — 4K Downloader & AI Studio",
    },
    description: "The ultimate YouTube thumbnail toolkit for 2026. Download HD thumbnails, generate AI images, optimize text hooks, and get pro-level prompts for Midjourney & DALL-E. Free tools!",
    keywords: ["youtube thumbnail tools", "thumbnail downloader hd", "ai thumbnail generator", "thumbnail text ideas", "thumbnail psychology 2026", "midjourney prompts for youtube"],
    openGraph: {
        title: `${thumbnailTools.length} Free YouTube Thumbnail Tools | AI Generators & HD Downloaders`,
        description: "Everything you need to create, download, and optimize viral YouTube thumbnails in 2026. Boost your click-through rate with AI-powered tools.",
        type: "website",
        url: `${siteConfig.url}/tools/thumbnail-tools`,
    },
    alternates: getGlobalAlternates("/tools/thumbnail-tools"),
};

const thumbnailFaqs = [
    {
        question: "How do I download YouTube thumbnails in full HD resolution?",
        answer: "Paste any YouTube video or Shorts URL into our YouTube Thumbnail Downloader. It immediately fetches all available resolution streams from YouTube's CDN (including 1080p MaxResDefault and HD 720p) with a single-click direct download button. No browser extensions or registration required.",
    },
    {
        question: "What is the recommended YouTube thumbnail size and aspect ratio in 2026?",
        answer: "The recommended YouTube thumbnail dimensions are 1280 x 720 pixels (minimum width of 640 pixels) with a 16:9 aspect ratio. Supported formats include JPG, PNG, and WebP, with a file size under 2 MB. Ensure your subject and text stay clear on small mobile screens.",
    },
    {
        question: "How do thumbnails affect video Click-Through Rate (CTR) and views?",
        answer: "Thumbnails are the primary visual hook on the YouTube homepage and Suggested feed. A well-designed thumbnail with high contrast, clear emotional focal points, and complementary title hooks can raise your CTR from 2-4% to 8-12%, signaling strong viewer interest to the YouTube recommendation algorithm.",
    },
    {
        question: "Can I generate AI YouTube thumbnails for free?",
        answer: "Yes. Our AI Thumbnail Prompt Generator crafts optimized, photorealistic prompts tailored for Midjourney, DALL-E 3, and Stable Diffusion, while the AI Thumbnail Generator creates ready-to-use concept drafts directly in your browser without requiring design software.",
    },
];

export default function ThumbnailToolsHub() {
    const toolListSchema = getToolListSchema(
        thumbnailTools.map((tool) => ({
            name: tool.name,
            url: `${siteConfig.url}/tools/${tool.slug}`,
            description: tool.description,
        }))
    );

    const breadcrumbSchema = getBreadcrumbSchema([
        { name: "Home", url: siteConfig.url },
        { name: "Tools", url: `${siteConfig.url}/tools` },
        { name: "Thumbnail Tools", url: `${siteConfig.url}/tools/thumbnail-tools` },
    ]);

    const faqSchema = getFAQSchema(thumbnailFaqs);

    return (
        <>
            {/* GEO / AEO signals for AI Answer Engines */}
            <GeoAeoHead
                {...GEO_AEO_PRESETS.categoryPage(
                    "YouTube Thumbnail & Media Tools",
                    "Download HD and full-resolution thumbnails, generate AI thumbnail concepts, craft text hooks, and optimize video packaging for maximum Click-Through Rate.",
                    thumbnailTools.length,
                    [
                        "Direct 1080p MaxRes and HD 720p thumbnail downloads",
                        "AI prompt generator for Midjourney & DALL-E",
                        "100% free with no browser extension required",
                        "Designed for practical creator workflows",
                    ]
                )}
                pathname="/tools/thumbnail-tools"
            />

            {/* JSON-LD Schema (@graph) */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(
                        combineSchemasToGraph(toolListSchema, breadcrumbSchema, faqSchema)
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
                            { name: "Thumbnail Tools" },
                        ]}
                        className="mb-8"
                    />

                    {/* Header */}
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-bold uppercase tracking-wider mb-4">
                            {thumbnailTools.length} Free Thumbnail &amp; Media Tools
                        </div>
                        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-5 tracking-tight font-outfit">
                            YouTube Thumbnail Tools 2026
                        </h1>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed summary" data-speakable>
                            Create, download, and optimize thumbnails that stop the scroll. Our 2026 AI-powered toolkit helps you master the &ldquo;packaging&rdquo; of your video for maximum CTR.
                        </p>
                    </div>

                    {/* Top Leaderboard Ad for High Viewability */}
                    <AdSlot slot={AD_SLOTS.HEADER} preset="leaderboard" className="mb-12" />

                    {/* Quick Strategy Guide */}
                    <div className="summary card-3d rounded-2xl p-8 border-l-4 border-l-purple-500 mb-12">
                        <h2 className="text-xl font-bold text-purple-700 mb-4 flex items-center gap-2 font-outfit">
                            <FaLightbulb className="w-5 h-5" />
                            <span>The 2026 3-Second Packaging Rule</span>
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6 text-slate-700">
                            <ul className="space-y-3">
                                <li className="flex items-start gap-2">
                                    <span className="text-emerald-600 font-bold">✓</span>
                                    <span><strong>High Contrast &amp; Clean Edges:</strong> Over 70% of viewers scroll on mobile. High contrast ensures your focal subject stands out even at 150px thumbnail widths.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-emerald-600 font-bold">✓</span>
                                    <span><strong>Under 4 Words:</strong> Avoid repeating the title. Use the thumbnail text to create curiosity or highlight the emotional climax.</span>
                                </li>
                            </ul>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-2">
                                    <span className="text-emerald-600 font-bold">✓</span>
                                    <span><strong>HD &amp; Full-Resolution Analysis:</strong> Study competitors&apos; high-resolution assets to inspect framing, color grading, and facial expressions.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-emerald-600 font-bold">✓</span>
                                    <span><strong>Prompt Engineering:</strong> Generate hyper-specific background assets with AI prompts to elevate production value without expensive studios.</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Tools Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7 mb-16">
                        {thumbnailTools.map((tool) => (
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

                    {/* Pro Tool Recommendation */}
                    <div className="my-8">
                        <AffiliateBanner toolId="tubebuddy" variant="inArticle" />
                    </div>

                    {/* Ad placement */}
                    <AdSlot slot="6023554962" preset="in-article" className="my-8" />

                    {/* Deep Dive Content - E-E-A-T Optimized */}
                    <div className="grid lg:grid-cols-3 gap-8 mb-12">
                        <div className="lg:col-span-2 space-y-8">
                            <div className="card-3d rounded-3xl p-8 sm:p-10">
                                <h2 className="text-3xl font-bold text-slate-900 mb-6 font-outfit">
                                    Thumbnail Psychology: Why It Matters in 2026
                                </h2>
                                <div className="article-prose max-w-none text-slate-600">
                                    <p className="mb-4">
                                        In 2026, the YouTube algorithm is smarter but the human brain remains the same. Your thumbnail isn&apos;t just a picture; it&apos;s a <strong>psychological bridge</strong> between a viewer&apos;s curiosity and your video&apos;s value.
                                    </p>
                                    <p className="mb-4">
                                        Our suite of tools is designed to help you master the three pillars of thumbnail success:
                                    </p>
                                    <ul className="space-y-4">
                                        <li><strong>1. The Curiosity Gap:</strong> Use our AI Text Generator to create hooks that tell a segment of a story but leave the &ldquo;How&rdquo; for the video.</li>
                                        <li><strong>2. Visual Hierarchy:</strong> Analyze top-performing competitors with our Downloader to see where they place their focal points (typically the &apos;Emotional Center&apos; of the frame).</li>
                                        <li><strong>3. Brand Consistency:</strong> Use our AI Image tools to generate custom assets that give your channel a unique &ldquo;visual fingerprint&rdquo; that viewers recognize instantly in their feed.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-1">
                            <div className="rounded-3xl p-8 bg-gradient-to-b from-slate-900 to-slate-800 text-white shadow-xl">
                                <h3 className="text-xl font-bold mb-4">Pro Tip: Full-Resolution Inspection</h3>
                                <p className="text-slate-300 mb-6 leading-relaxed">
                                    Using our HD Downloader to inspect full-resolution MaxRes (1280×720) thumbnails allows you to study the micro-adjustments top creators make to contrast, framing, and saturation—details easy to miss at small preview sizes.
                                </p>
                                <div className="p-4 rounded-xl bg-white/10 border border-white/15 italic text-sm text-slate-200">
                                    &ldquo;Small tweaks in lighting and contrast can noticeably lift click-through rate.&rdquo;
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* AEO / FAQ Section */}
                    <section className="mb-12" data-speakable>
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6 font-outfit">
                            Frequently Asked Questions About YouTube Thumbnails
                        </h2>
                        <FaqAccordion items={thumbnailFaqs} headingLevel="h3" />
                    </section>

                    {/* Final CTA */}
                    <div className="text-center">
                        <Link
                            href="/tools"
                            className="btn-3d-primary inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-base sm:text-lg"
                        >
                            Explore Growth &amp; SEO Tools
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
