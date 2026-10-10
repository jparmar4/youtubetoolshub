import Link from "next/link";
import { Metadata } from "next";
import { getToolsByCategory } from "@/config/tools";
import { siteConfig } from "@/config/site";
import { getToolListSchema, getBreadcrumbSchema, getFAQSchema, getGlobalAlternates } from "@/lib/seo";
import GoogleAd from "@/components/ads/GoogleAd";
import AffiliateBanner from "@/components/ads/AffiliateBanner";
import GeoAeoHead from "@/components/seo/GeoAeoHead";
import { GEO_AEO_PRESETS } from "@/config/geo-aeo";
import { AD_SLOTS } from "@/lib/adsense";

export const metadata: Metadata = {
    title: "YouTube Thumbnail Tools - HD Downloader & AI Generator 2026",
    description: "The ultimate YouTube thumbnail toolkit for 2026. Download HD thumbnails, generate AI images, optimize text hooks, and get pro-level prompts for Midjourney & DALL-E. Free tools!",
    keywords: ["youtube thumbnail tools", "thumbnail downloader hd", "ai thumbnail generator", "thumbnail text ideas", "thumbnail psychology 2026", "midjourney prompts for youtube"],
    openGraph: {
        title: "4 Free YouTube Thumbnail Tools | AI Generators & HD Downloaders",
        description: "Everything you need to create, download, and optimize viral YouTube thumbnails in 2026. Boost your click-through rate with AI-powered tools.",
        type: "website",
        url: `${siteConfig.url}/tools/thumbnail-tools`,
    },
    alternates: getGlobalAlternates("/tools/thumbnail-tools"),
};

const thumbnailFaqs = [
    {
        question: "How do I download YouTube thumbnails in full HD and 4K?",
        answer: "Paste any YouTube video or Shorts URL into our YouTube Thumbnail Downloader. It immediately fetches all available resolution streams from YouTube's CDN (including 1080p MaxResDefault and HD) with a single-click direct download button. No browser extensions or registration required.",
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
    const thumbnailTools = getToolsByCategory("thumbnail-media");

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
                    "Download HD and 4K thumbnails, generate AI thumbnail concepts, craft text hooks, and optimize video packaging for maximum Click-Through Rate.",
                    thumbnailTools.length,
                    [
                        "Direct 1080p and 4K thumbnail downloads",
                        "AI prompt generator for Midjourney & DALL-E",
                        "100% free with no browser extension required",
                        "Designed for practical creator workflows",
                    ]
                )}
                pathname="/tools/thumbnail-tools"
            />

            {/* JSON-LD Schemas */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(toolListSchema),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(breadcrumbSchema),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(faqSchema),
                }}
            />

            <div className="min-h-screen py-16 lg:py-20 relative overflow-hidden">
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
                        <span className="text-slate-900 font-medium font-outfit">Thumbnail Tools</span>
                    </nav>

                    {/* Header */}
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-bold uppercase tracking-wider mb-4">
                            4 Free Media Tools
                        </div>
                        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight font-outfit">
                            YouTube Thumbnail Tools 2026
                        </h1>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed summary" data-speakable>
                            Create, download, and optimize thumbnails that stop the scroll. Our 2026 AI-powered toolkit helps you master the &ldquo;packaging&rdquo; of your video for maximum CTR.
                        </p>
                    </div>

                    {/* Top Leaderboard Ad for High Viewability */}
                    <div className="mb-12 rounded-2xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-2 min-h-[90px] flex flex-col items-center justify-center">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 text-center">Advertisement</p>
                        <GoogleAd slot={AD_SLOTS.HEADER} lazy={false} responsive className="w-full text-center" />
                    </div>

                    {/* Quick Strategy Guide */}
                    <div className="summary glass-premium rounded-2xl p-8 border-l-4 border-purple-500 mb-12 shadow-sm">
                        <h2 className="text-xl font-bold text-purple-600 mb-4 flex items-center gap-2 font-outfit">
                            💡 The 2026 3-Second Packaging Rule
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6 text-slate-700">
                            <ul className="space-y-3">
                                <li className="flex items-start gap-2">
                                    <span className="text-green-500 font-bold">✓</span>
                                    <span><strong>High Contrast &amp; Clean Edges:</strong> Over 70% of viewers scroll on mobile. High contrast ensures your focal subject stands out even at 150px thumbnail widths.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-500 font-bold">✓</span>
                                    <span><strong>Under 4 Words:</strong> Avoid repeating the title. Use the thumbnail text to create curiosity or highlight the emotional climax.</span>
                                </li>
                            </ul>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-2">
                                    <span className="text-green-500 font-bold">✓</span>
                                    <span><strong>The 8K Downloader Advantage:</strong> Study competitors&apos; high-resolution assets to inspect framing, color grading, and facial expressions.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-500 font-bold">✓</span>
                                    <span><strong>Prompt Engineering:</strong> Generate hyper-specific background assets with AI prompts to elevate production value without expensive studios.</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Tools Grid */}
                    <div className="grid md:grid-cols-2 gap-8 mb-16">
                        {thumbnailTools.map((tool) => (
                            <Link
                                key={tool.slug}
                                href={`/tools/${tool.slug}`}
                                className="group glass-premium rounded-2xl p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-white/20"
                            >
                                <div className="flex items-start gap-5">
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform duration-500">
                                        <tool.icon className="w-8 h-8" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <h3 className="text-2xl font-bold text-slate-900 group-hover:text-purple-600 transition-colors font-outfit">
                                                {tool.name}
                                            </h3>
                                            {tool.isAI && (
                                                <span className="px-2 py-0.5 rounded-full bg-pink-100 text-pink-600 text-[10px] font-bold uppercase tracking-wider">AI</span>
                                            )}
                                        </div>
                                        <p className="text-slate-600 leading-relaxed text-lg">
                                            {tool.description}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Pro Tool Recommendation */}
                    <div className="my-8">
                        <AffiliateBanner toolId="tubebuddy" variant="inArticle" />
                    </div>

                    {/* Ad placement */}
                    <div className="my-8" aria-hidden="true">
                        <GoogleAd slot="7688425196" />
                    </div>

                    {/* Deep Dive Content - E-E-A-T Optimized */}
                    <div className="grid lg:grid-cols-3 gap-8 mb-12">
                        <div className="lg:col-span-2 space-y-8">
                            <div className="glass-premium rounded-3xl p-10 shadow-sm">
                                <h2 className="text-3xl font-bold text-slate-900 mb-6 font-outfit">
                                    Thumbnail Psychology: Why It Matters in 2026
                                </h2>
                                <div className="prose prose-lg max-w-none text-slate-600">
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
                            <div className="glass-premium rounded-3xl p-8 bg-gradient-to-b from-slate-900 to-slate-800 text-white border-0 shadow-2xl">
                                <h3 className="text-xl font-bold mb-4">Pro Tip: 8K Downloader</h3>
                                <p className="text-slate-300 mb-6 leading-relaxed">
                                    Using our HD Downloader to study 4K and 8K thumbnails allows you to see the micro-adjustments top creators (like MrBeast or Peter McKinnon) make to their contrast and saturation—details invisible at lower resolutions.
                                </p>
                                <div className="p-4 rounded-xl bg-white/5 border border-white/10 italic text-sm text-slate-400">
                                    &ldquo;Small tweaks in lighting can increase CTR by 2-5% overnight.&rdquo;
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* AEO / FAQ Section */}
                    <div className="glass-premium rounded-3xl p-8 sm:p-10 shadow-sm mb-12" data-speakable>
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6 font-outfit">
                            Frequently Asked Questions About YouTube Thumbnails
                        </h2>
                        <div className="space-y-6">
                            {thumbnailFaqs.map((faq, idx) => (
                                <div key={idx} className="border-b border-slate-200/80 pb-5 last:border-0 last:pb-0">
                                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                                        {faq.question}
                                    </h3>
                                    <p className="text-slate-600 leading-relaxed">
                                        {faq.answer}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Final CTA */}
                    <div className="text-center">
                        <Link
                            href="/tools"
                            className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full font-bold text-lg transition-all shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-1"
                        >
                            Explore Growth &amp; SEO Tools
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
