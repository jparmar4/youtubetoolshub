import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { getArticleSchema, getBreadcrumbSchema } from "@/lib/seo";
import Link from "next/link";
import { FaImage, FaRobot, FaChartLine, FaRocket, FaTools, FaCheck } from "react-icons/fa";

export const metadata: Metadata = {
    title: "Best AI Thumbnail Generators for YouTube 2026 | Free & Paid Tools",
    description: "Discover the best AI thumbnail generators for YouTube in 2026. Compare Canva, Adobe Firefly, Midjourney, and free alternatives to create click-worthy thumbnails.",
    keywords: ["ai thumbnail generator", "youtube thumbnail maker", "ai thumbnail maker", "youtube thumbnail generator", "best thumbnail tools"],
    openGraph: {
        title: "Best AI Thumbnail Generators for YouTube 2026",
        description: "Create click-worthy thumbnails with AI. Compare the best free and paid tools.",
        url: `${siteConfig.url}/blog/ai-thumbnail-generators-youtube-2026`,
        images: [`${siteConfig.url}/images/blog/ai-thumbnail-generators.png`],
    },
    twitter: {
        card: "summary_large_image",
        title: "Best AI Thumbnail Generators for YouTube 2026",
        description: "Create click-worthy thumbnails with AI tools",
        images: [`${siteConfig.url}/images/blog/ai-thumbnail-generators.png`],
    },
    alternates: {
        canonical: "/blog/ai-thumbnail-generators-youtube-2026",
        languages: {
            "en": "/blog/ai-thumbnail-generators-youtube-2026",
            "x-default": "/blog/ai-thumbnail-generators-youtube-2026",
        },
    },
};

const thumbnailTools = [
    {
        name: "YouTube Tools Hub AI",
        price: "Free",
        rating: "9/10",
        features: ["Custom prompts", "YouTube optimized", "No watermark"],
    },
    {
        name: "Canva AI",
        price: "Free/$12.99/mo",
        rating: "9/10",
        features: ["Templates", "Magic Design", "Brand kit"],
    },
    {
        name: "Adobe Firefly",
        price: "$4.99+/mo",
        rating: "8/10",
        features: ["Pro quality", "Text effects", "Adobe integration"],
    },
    {
        name: "Midjourney",
        price: "$10+/mo",
        rating: "9/10",
        features: ["Artistic styles", "High quality", "Unique looks"],
    },
    {
        name: "DALL-E 3",
        price: "$20/mo (ChatGPT+)",
        rating: "8/10",
        features: ["Easy prompts", "Good quality", "Fast generation"],
    },
];

const thumbnailTips = [
    {
        title: "Use High Contrast Colors",
        description: "Red, yellow, and white stand out in YouTube feeds. Avoid muted colors that blend into backgrounds.",
        icon: <FaImage className="text-red-500" />,
    },
    {
        title: "Add Expressive Faces",
        description: "Thumbnails with surprised, happy, or shocked faces get 27% higher CTR than those without faces.",
        icon: <FaChartLine className="text-blue-500" />,
    },
    {
        title: "Keep Text Under 3 Words",
        description: "Short, punchy text is readable on mobile. Use large fonts and high contrast outlines.",
        icon: <FaRobot className="text-purple-500" />,
    },
];

const ourTools = [
    {
        name: "AI Thumbnail Generator",
        description: "Create custom thumbnails with AI prompts optimized for YouTube.",
        link: "/tools/youtube-ai-thumbnail-generator",
    },
    {
        name: "Thumbnail Downloader",
        description: "Download competitor thumbnails for inspiration and analysis.",
        link: "/tools/youtube-thumbnail-downloader",
    },
    {
        name: "Title Generator",
        description: "Generate titles that match your thumbnail for higher CTR.",
        link: "/tools/youtube-title-generator",
    },
];

export default function AIThumbnailGeneratorsPage() {
    const articleSchema = getArticleSchema({
        title: metadata.title as string,
        description: metadata.description as string,
        url: `${siteConfig.url}/blog/ai-thumbnail-generators-youtube-2026`,
        imageUrl: `${siteConfig.url}/images/blog/ai-thumbnail-generators.png`,
        datePublished: "2026-02-01",
        dateModified: "2026-02-01",
        author: siteConfig.name,
    });

    const breadcrumbSchema = getBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Blog", url: "/blog" },
        { name: "AI Thumbnail Generators", url: "/blog/ai-thumbnail-generators-youtube-2026" },
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
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 text-sm font-bold mb-6">
                            <FaRobot className="text-lg" />
                            AI Tools Guide 2026
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-8 leading-tight">
                            Best AI Thumbnail<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">Generators for YouTube</span>
                        </h1>
                        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
                            Create professional, click-worthy thumbnails in seconds with AI-powered tools.
                        </p>
                    </div>

                    {/* Key Stats */}
                    <div className="grid md:grid-cols-3 gap-6 mb-16">
                        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 text-center border border-slate-100 dark:border-slate-800">
                            <div className="text-3xl font-bold text-purple-600 mb-2">90%</div>
                            <div className="text-slate-600 dark:text-slate-400">of top videos use custom thumbnails</div>
                        </div>
                        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 text-center border border-slate-100 dark:border-slate-800">
                            <div className="text-3xl font-bold text-indigo-600 mb-2">2-3x</div>
                            <div className="text-slate-600 dark:text-slate-400">higher CTR with good thumbnails</div>
                        </div>
                        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 text-center border border-slate-100 dark:border-slate-800">
                            <div className="text-3xl font-bold text-green-600 mb-2">30 sec</div>
                            <div className="text-slate-600 dark:text-slate-400">to generate AI thumbnail</div>
                        </div>
                    </div>

                    {/* Tools Comparison */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Top AI Thumbnail Tools</h2>
                        <div className="space-y-4">
                            {thumbnailTools.map((tool, index) => (
                                <div key={index} className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div>
                                            <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{tool.name}</h3>
                                            <div className="flex items-center gap-4 mt-2">
                                                <span className={tool.price === "Free" ? "text-green-600 font-bold" : "text-slate-600 dark:text-slate-400"}>
                                                    {tool.price}
                                                </span>
                                                <span className="text-purple-600 font-bold">{tool.rating}</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {tool.features.map((feature, i) => (
                                                <span key={i} className="inline-flex items-center gap-1 px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-sm text-slate-700 dark:text-slate-300">
                                                    <FaCheck className="text-green-500 text-xs" /> {feature}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Thumbnail Tips */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Thumbnail Best Practices</h2>
                        <div className="grid gap-6">
                            {thumbnailTips.map((tip, index) => (
                                <div key={index} className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800">
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                                            {tip.icon}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                                                {tip.title}
                                            </h3>
                                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                                {tip.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Our Tools */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Our Free Thumbnail Tools</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            {ourTools.map((tool, index) => (
                                <div key={index} className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 hover:shadow-lg transition-shadow">
                                    <div className="flex items-center gap-3 mb-4">
                                        <FaTools className="text-purple-500 text-xl" />
                                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                                            {tool.name}
                                        </h3>
                                    </div>
                                    <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                                        {tool.description}
                                    </p>
                                    <Link
                                        href={tool.link}
                                        className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium"
                                    >
                                        Try Free
                                        <FaRocket className="text-sm" />
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-12 text-center text-white">
                        <h2 className="text-3xl font-bold mb-4">Create Your AI Thumbnail</h2>
                        <p className="text-purple-100 text-lg mb-8 max-w-2xl mx-auto">
                            Generate professional thumbnails in seconds with our free AI tool.
                        </p>
                        <Link
                            href="/tools/youtube-ai-thumbnail-generator"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-600 rounded-xl font-bold hover:bg-slate-100 transition-colors"
                        >
                            <FaImage className="text-xl" />
                            Generate Thumbnail
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
