import Link from "next/link";
import { Metadata } from "next";
import { getToolsByCategory } from "@/config/tools";
import { siteConfig } from "@/config/site";
import { getToolListSchema } from "@/lib/seo";

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
    alternates: {
        canonical: "/tools/thumbnail-tools",
    },
};

export default function ThumbnailToolsHub() {
    const thumbnailTools = getToolsByCategory("thumbnail-media");

    const toolListSchema = getToolListSchema(
        thumbnailTools.map((tool) => ({
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
                        <span className="text-slate-900 font-medium font-outfit">Thumbnail Tools</span>
                    </nav>

                    {/* Header */}
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight font-outfit">
                            YouTube Thumbnail Tools 2026
                        </h1>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                            Create, download, and optimize thumbnails that stop the scroll. Our 2026 AI-powered toolkit helps you master the "packaging" of your video for maximum CTR.
                        </p>
                    </div>

                    {/* Quick Strategy Guide */}
                    <div className="summary glass-premium rounded-2xl p-8 border-l-4 border-purple-500 mb-12 shadow-sm">
                        <h2 className="text-xl font-bold text-purple-600 mb-4 flex items-center gap-2">
                            🚀 The 2026 Click-Through Rate Blueprint
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6 text-slate-700">
                            <ul className="space-y-3">
                                <li className="flex items-start gap-2">
                                    <span className="text-green-500 font-bold">✓</span>
                                    <span><strong>AI Integration:</strong> Use AI to generate unique faces and backgrounds that don't look like generic stock photos.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-500 font-bold">✓</span>
                                    <span><strong>High-Energy Faces:</strong> Use our AI generator for exaggerated, high-quality emotional expressions.</span>
                                </li>
                            </ul>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-2">
                                    <span className="text-green-500 font-bold">✓</span>
                                    <span><strong>Color Theory:</strong> Prioritize high-contrast palettes (Red/White or Yellow/Black) optimized for dark mode users.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-500 font-bold">✓</span>
                                    <span><strong>Mobile-First Design:</strong> 80% of views are on mobile. Keep text under 3 words for readability.</span>
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
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform duration-500">
                                        <tool.icon className="w-8 h-8" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <h3 className="text-2xl font-bold text-slate-900 group-hover:text-purple-600 transition-colors font-outfit">
                                                {tool.name}
                                            </h3>
                                            {tool.isAI && (
                                                <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-600 text-[10px] font-bold uppercase tracking-wider">AI</span>
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

                    {/* Deep Dive Content - E-E-A-T Optimized */}
                    <div className="grid lg:grid-cols-3 gap-8 mb-12">
                        <div className="lg:col-span-2 space-y-8">
                            <div className="glass-premium rounded-3xl p-10 shadow-sm">
                                <h2 className="text-3xl font-bold text-slate-900 mb-6 font-outfit">
                                    Thumbnail Psychology: Why It Matters in 2026
                                </h2>
                                <div className="prose prose-lg max-w-none text-slate-600">
                                    <p className="mb-4">
                                        In 2026, the YouTube algorithm is smarter but the human brain remains the same. Your thumbnail isn't just a picture; it's a <strong>psychological bridge</strong> between a viewer's curiosity and your video's value.
                                    </p>
                                    <p className="mb-4">
                                        Our suite of tools is designed to help you master the three pillars of thumbnail success:
                                    </p>
                                    <ul className="space-y-4">
                                        <li><strong>1. The Curiosity Gap:</strong> Use our AI Text Generator to create hooks that tell a segment of a story but leave the "How" for the video.</li>
                                        <li><strong>2. Visual Hierarchy:</strong> Analyze top-performing competitors with our Downloader to see where they place their focal points (typically the 'Emotional Center' of the frame).</li>
                                        <li><strong>3. Brand Consistency:</strong> Use our AI Image tools to generate custom assets that give your channel a unique "visual fingerprint" that viewers recognize instantly in their feed.</li>
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
                                    "Small tweaks in lighting can increase CTR by 2-5% overnight."
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Final CTA */}
                    <div className="text-center">
                        <Link
                            href="/tools"
                            className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full font-bold text-lg transition-all shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-1"
                        >
                            Explore Growth & SEO Tools
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
