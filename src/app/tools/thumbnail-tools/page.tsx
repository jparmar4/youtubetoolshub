import Link from "next/link";
import { Metadata } from "next";
import { FaImage, FaMagic, FaRocket } from "react-icons/fa";
import { siteConfig } from "@/config/site";
import { getToolListSchema } from "@/lib/seo";

export const metadata: Metadata = {
    title: "Thumbnail Tools - Download, Generate & Optimize YouTube Thumbnails",
    description: "Complete suite of free YouTube thumbnail tools. Download HD thumbnails, generate AI images, create text overlays, and get Midjourney prompts. 4 powerful tools in one place.",
    keywords: ["youtube thumbnail tools", "thumbnail downloader", "ai thumbnail generator", "thumbnail maker", "youtube thumbnail creator"],
    openGraph: {
        title: "4 Free YouTube Thumbnail Tools | Download, Generate & Optimize",
        description: "Download HD thumbnails, generate AI images, create viral text, and get pro-level Midjourney prompts. Everything you need for click-worthy thumbnails.",
        type: "website",
    },
    alternates: {
        canonical: "/tools/thumbnail-tools",
    },
};

const thumbnailTools = [
    {
        slug: "youtube-thumbnail-downloader",
        name: "YouTube Thumbnail Downloader",
        description: "Download high-quality thumbnails from any YouTube video in HD, 4K, and 8K resolutions.",
        icon: FaImage,
    },
    {
        slug: "youtube-thumbnail-generator",
        name: "YouTube Thumbnail Text Generator",
        description: "Generate catchy thumbnail text ideas using AI with psychological triggers and color suggestions.",
        icon: FaMagic,
    },
    {
        slug: "youtube-ai-thumbnail-generator",
        name: "AI Thumbnail Image Generator",
        description: "Create stunning custom thumbnail images with AI in seconds. Just describe what you want.",
        icon: FaImage,
    },
    {
        slug: "youtube-ai-thumbnail-prompt",
        name: "AI Thumbnail Prompt Generator",
        description: "Generate professional AI prompts for Midjourney, DALL-E, and Stable Diffusion thumbnail creation.",
        icon: FaRocket,
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
                        <span className="text-slate-900 font-medium">Thumbnail Tools</span>
                    </nav>

                    {/* Header */}
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
                            YouTube Thumbnail Tools
                        </h1>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                            Everything you need to create, download, and optimize viral YouTube thumbnails.
                            4 powerful AI tools to boost your click-through rate.
                        </p>
                    </div>

                    {/* Quick Summary */}
                    <div className="summary glass-premium rounded-2xl p-6 border-l-4 border-purple-500 mb-12">
                        <h2 className="text-lg font-bold text-purple-600 mb-2">⚡ What You Can Do</h2>
                        <ul className="text-slate-700 text-lg space-y-2">
                            <li>✓ Download any YouTube thumbnail in multiple resolutions (SD to 8K)</li>
                            <li>✓ Generate AI-powered thumbnail text with psychological hooks</li>
                            <li>✓ Create custom thumbnail images using AI generators</li>
                            <li>✓ Get professional prompts for Midjourney, DALL-E, and Stable Diffusion</li>
                        </ul>
                    </div>

                    {/* Tools Grid */}
                    <div className="grid md:grid-cols-2 gap-8 mb-16">
                        {thumbnailTools.map((tool) => (
                            <Link
                                key={tool.slug}
                                href={`/tools/${tool.slug}`}
                                className="group glass-premium rounded-2xl p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-fuchsia-600 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                                        <tool.icon className="w-7 h-7" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-purple-600 transition-colors">
                                            {tool.name}
                                        </h3>
                                        <p className="text-slate-600 leading-relaxed">
                                            {tool.description}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Why Thumbnails Matter - SEO Content */}
                    <div className="glass-premium rounded-2xl p-8 mb-12">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">
                            Why YouTube Thumbnails Matter in 2026
                        </h2>
                        <div className="prose prose-lg max-w-none">
                            <p className="text-slate-600 leading-relaxed mb-4">
                                Your thumbnail is the first thing viewers see. Studies show that <strong>90% of top-performing videos</strong> use custom thumbnails, and they can increase your click-through rate by up to <strong>300%</strong>.
                            </p>
                            <p className="text-slate-600 leading-relaxed mb-4">
                                In the age of AI, creating professional thumbnails has never been easier. Our suite of tools helps you:
                            </p>
                            <ul className="text-slate-600 space-y-2 mb-4">
                                <li><strong>Analyze competitors</strong> by downloading their thumbnails</li>
                                <li><strong>Generate viral text</strong> that triggers curiosity and emotion</li>
                                <li><strong>Create unique images</strong> that don't exist in stock libraries</li>
                                <li><strong>Maintain consistency</strong> across your channel's branding</li>
                            </ul>
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
