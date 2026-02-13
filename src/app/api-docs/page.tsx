import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import Link from "next/link";
import {
    FaCode,
    FaPlug,
    FaBook,
    FaRobot,
    FaExternalLinkAlt,
    FaArrowRight,
} from "react-icons/fa";

const baseUrl = siteConfig.url;

export const metadata: Metadata = {
    title: "API Documentation – YouTube Tools Hub Developer Resources",
    description:
        "Explore the YouTube Tools Hub public API. Access tool listings, FAQs, AI context data, and OpenAPI specification. Free endpoints for developers and AI systems.",
    keywords: [
        "youtube tools hub api",
        "youtube tools api docs",
        "youtube seo api",
        "free youtube api tools",
        "openapi youtube tools",
        "ai plugin youtube",
    ],
    alternates: {
        canonical: "/api-docs",
    },
    openGraph: {
        title: "API Documentation – YouTube Tools Hub",
        description:
            "Public API endpoints for developers and AI systems. Access tool listings, FAQs, and structured data.",
        type: "website",
        url: `${baseUrl}/api-docs`,
        images: [`${baseUrl}/og-image.png`],
    },
};

const endpoints = [
    {
        method: "GET",
        path: "/api/ai-context",
        summary: "Structured entity data for AI systems",
        description:
            "Returns comprehensive structured data about the organization, tools, FAQs, blog posts, and trust signals. Designed specifically for AI crawlers and knowledge graph builders.",
        response: '{ _meta, entity, trust_signals, tools, faqs, blog_index, ... }',
    },
    {
        method: "GET",
        path: "/api/tools",
        summary: "List all available tools",
        description:
            "Returns metadata for all 21+ tools including names, descriptions, categories, AI-powered status, keywords, and ratings.",
        response: '{ _meta, categories, tools: [{ slug, name, ... }] }',
    },
    {
        method: "GET",
        path: "/api/tools/{slug}",
        summary: "Get detailed tool information",
        description:
            "Returns complete details for a specific tool including content sections, how-to steps, and FAQs.",
        response: '{ slug, name, description, content_sections, how_to, faqs, ... }',
    },
    {
        method: "GET",
        path: "/api/faqs",
        summary: "Get frequently asked questions",
        description:
            "Returns general site FAQs and tool-specific FAQs grouped by tool.",
        response: '{ _meta, general: [...], by_tool: [{ tool_name, faqs }] }',
    },
    {
        method: "GET",
        path: "/api/extract-tags",
        summary: "Extract tags from a YouTube video",
        description:
            "Extracts hidden meta tags from any YouTube video URL. Requires a video URL query parameter.",
        response: '{ tags: [...], title, channel, ... }',
    },
    {
        method: "GET",
        path: "/api/channel-id",
        summary: "Find a YouTube channel ID",
        description:
            "Resolves a YouTube channel URL or handle to its unique channel ID.",
        response: '{ channel_id, title, ... }',
    },
    {
        method: "GET",
        path: "/api/trending",
        summary: "Get trending YouTube videos",
        description:
            "Returns currently trending YouTube videos by region and category.",
        response: '{ videos: [{ title, views, channel, ... }] }',
    },
];

const aiResources = [
    {
        name: "AI Plugin Manifest",
        path: "/.well-known/ai-plugin.json",
        description: "OpenAI-compatible plugin manifest with schema v1",
        icon: <FaPlug className="text-purple-500" />,
    },
    {
        name: "OpenAPI Specification",
        path: "/.well-known/openapi.yaml",
        description: "Full OpenAPI 3.0 spec with all endpoint definitions",
        icon: <FaCode className="text-blue-500" />,
    },
    {
        name: "AI Crawler Guidance",
        path: "/.well-known/ai.txt",
        description: "Comprehensive AI crawler permissions and entity data",
        icon: <FaRobot className="text-emerald-500" />,
    },
    {
        name: "LLMs Context (Short)",
        path: "/llms.txt",
        description: "Concise site overview for large language models",
        icon: <FaBook className="text-orange-500" />,
    },
    {
        name: "LLMs Context (Full)",
        path: "/llms-full.txt",
        description: "Detailed site context for AI training and indexing",
        icon: <FaBook className="text-red-500" />,
    },
];

export default function APIDocsPage() {
    const techArticleSchema = {
        "@context": "https://schema.org",
        "@type": "TechArticle",
        headline: "YouTube Tools Hub API Documentation",
        description:
            "Complete API reference for YouTube Tools Hub public endpoints, OpenAPI spec, and AI plugin integration.",
        url: `${baseUrl}/api-docs`,
        author: {
            "@type": "Organization",
            name: siteConfig.name,
        },
        publisher: {
            "@type": "Organization",
            name: siteConfig.name,
        },
        dateModified: new Date().toISOString(),
        inLanguage: "en",
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(techArticleSchema),
                }}
            />

            <div className="min-h-screen pt-32 pb-24 relative overflow-hidden">
                <div className="nebula-bg" />

                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-bold mb-6">
                            <FaCode className="w-4 h-4" />
                            Developer Resources
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 font-outfit tracking-tighter">
                            API{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
                                Documentation
                            </span>
                        </h1>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto font-outfit">
                            Free, public API endpoints for developers and AI systems. No
                            authentication required for read-only access.
                        </p>
                    </div>

                    {/* AI Resources */}
                    <section className="mb-20">
                        <h2 className="text-3xl font-black text-slate-900 mb-8 font-outfit">
                            AI &amp; Machine-Readable Resources
                        </h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            {aiResources.map((res) => (
                                <a
                                    key={res.path}
                                    href={`${baseUrl}${res.path}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="glass-premium rounded-2xl p-6 border-white/40 hover:border-purple-500/30 hover:shadow-xl transition-all duration-300 group flex items-start gap-4"
                                >
                                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/60 shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                                        {res.icon}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="font-bold text-slate-900 font-outfit">
                                                {res.name}
                                            </h3>
                                            <FaExternalLinkAlt className="w-3 h-3 text-slate-400" />
                                        </div>
                                        <p className="text-sm text-slate-500 mb-2">
                                            {res.description}
                                        </p>
                                        <code className="text-xs bg-slate-100 px-2 py-1 rounded text-purple-700 font-mono">
                                            {res.path}
                                        </code>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </section>

                    {/* API Endpoints */}
                    <section className="mb-20">
                        <h2 className="text-3xl font-black text-slate-900 mb-8 font-outfit">
                            Public API Endpoints
                        </h2>
                        <div className="space-y-6">
                            {endpoints.map((ep) => (
                                <div
                                    key={ep.path}
                                    className="glass-premium rounded-2xl p-8 border-white/40 hover:border-purple-500/20 transition-all"
                                >
                                    <div className="flex flex-wrap items-center gap-3 mb-3">
                                        <span className="px-3 py-1 rounded-lg bg-emerald-100 text-emerald-800 font-mono font-bold text-sm">
                                            {ep.method}
                                        </span>
                                        <code className="text-lg font-mono text-slate-800 font-semibold">
                                            {ep.path}
                                        </code>
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 font-outfit mb-2">
                                        {ep.summary}
                                    </h3>
                                    <p className="text-slate-600 mb-4">{ep.description}</p>
                                    <div className="bg-slate-900 rounded-xl p-4 overflow-x-auto">
                                        <p className="text-xs text-slate-500 mb-1 font-mono">
                      // Response shape
                                        </p>
                                        <code className="text-sm text-emerald-400 font-mono">
                                            {ep.response}
                                        </code>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Usage Notes */}
                    <section className="mb-20">
                        <h2 className="text-3xl font-black text-slate-900 mb-8 font-outfit">
                            Usage Notes
                        </h2>
                        <div className="glass-premium rounded-2xl p-8 border-white/40">
                            <div className="space-y-4 text-slate-700 font-outfit">
                                <div className="flex items-start gap-3">
                                    <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                                        1
                                    </span>
                                    <p>
                                        <strong>No authentication required</strong> for public
                                        endpoints. AI context, tools listing, and FAQs are freely
                                        accessible.
                                    </p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                                        2
                                    </span>
                                    <p>
                                        <strong>Rate limiting</strong> applies to tool-execution
                                        endpoints (extract-tags, channel-id, etc.) at the
                                        Vercel Edge Network level.
                                    </p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                                        3
                                    </span>
                                    <p>
                                        <strong>Caching</strong>: Static endpoints are cached for 1
                                        hour server-side and support{" "}
                                        <code className="text-purple-700">
                                            stale-while-revalidate
                                        </code>{" "}
                                        for optimal performance.
                                    </p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                                        4
                                    </span>
                                    <p>
                                        <strong>CORS enabled</strong>: All endpoints return{" "}
                                        <code className="text-purple-700">
                                            Access-Control-Allow-Origin: *
                                        </code>{" "}
                                        for cross-origin access.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* CTA */}
                    <div className="relative group overflow-hidden rounded-[3rem] p-1 shadow-2xl">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 bg-[length:200%_auto] animate-gradient" />
                        <div className="relative bg-slate-900 rounded-[2.9rem] p-12 text-center text-white">
                            <h2 className="text-4xl font-black mb-4 font-outfit tracking-tight">
                                Ready to integrate?
                            </h2>
                            <p className="text-slate-400 text-xl mb-10 max-w-xl mx-auto font-outfit">
                                Start using the API or explore our OpenAPI specification for
                                full endpoint details.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6 justify-center">
                                <a
                                    href={`${baseUrl}/.well-known/openapi.yaml`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-10 py-5 bg-white text-slate-900 rounded-full font-black text-lg hover:bg-slate-100 transition-all flex items-center justify-center gap-2"
                                >
                                    OpenAPI Spec
                                    <FaExternalLinkAlt className="w-4 h-4" />
                                </a>
                                <Link
                                    href="/tools"
                                    className="px-10 py-5 bg-white/10 text-white border border-white/20 rounded-full font-black text-lg hover:bg-white/20 transition-all backdrop-blur-md flex items-center justify-center gap-2"
                                >
                                    Explore Tools
                                    <FaArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
