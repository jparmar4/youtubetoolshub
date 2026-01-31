import { Metadata } from "next";
import { ToolCard } from "@/components/ui/Card";
import InFeedAd from "@/components/ads/InFeedAd";
import { tools, toolCategories, getToolsByCategory } from "@/config/tools";
import { getToolListSchema, getBreadcrumbSchema } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
    title: "Professional YouTube Marketing & Monetization Tools 2026 | Free AI Suite",
    description: "🔥 16+ FREE professional YouTube tools for US creators. CPM calculator, revenue estimator, AI thumbnail generator, SEO optimizer. Trusted by 50K+ professional content creators.",
    keywords: [
        "youtube marketing tools",
        "professional youtube software",
        "youtube monetization calculator",
        "youtube cpm optimizer",
        "youtube revenue tools",
        "youtube business automation",
        "ai content creator tools",
        "youtube analytics software",
        "video marketing tools usa"
    ],
    alternates: {
        canonical: "/tools",
        languages: {
            "en": "/tools",
            "x-default": "/tools",
        },
    },
};

export default function ToolsPage() {
    // Generate JSON-LD schemas
    const toolListSchema = getToolListSchema(
        tools.map((tool) => ({
            name: tool.name,
            url: `${siteConfig.url}/tools/${tool.slug}`,
            description: tool.shortDescription,
        }))
    );

    const breadcrumbSchema = getBreadcrumbSchema([
        { name: "Home", url: siteConfig.url },
        { name: "Tools", url: `${siteConfig.url}/tools` },
    ]);

    return (
        <>
            {/* JSON-LD Structured Data for SEO */}
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

            <div className="min-h-screen py-20 relative overflow-hidden bg-slate-50">
                {/* Background Decorations */}
                <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-purple-100/50 to-transparent -z-10" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    {/* Header */}
                    <div className="text-center mb-16 animate-fade-in-up">
                        <span className="inline-block py-1 px-3 rounded-full bg-purple-100 border border-purple-200 text-purple-700 text-sm font-medium mb-6 backdrop-blur-sm">
                            Professional Suite
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                            All YouTube Tools
                        </h1>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                            {tools.length} free tools to help you grow your YouTube channel.
                            From thumbnails to SEO, we&apos;ve got you covered.
                        </p>
                    </div>

                    {/* Tools by Category */}
                    <div className="space-y-20">
                        {toolCategories.map((category) => {
                            const categoryTools = getToolsByCategory(category.id);
                            return (
                                <section key={category.id} className="animate-fade-in-up delay-100">
                                    <div className="mb-8 border-l-4 border-purple-500 pl-4 bg-white/50 p-4 rounded-r-xl">
                                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
                                            {category.name}
                                        </h2>
                                        <p className="text-slate-600">
                                            {category.description}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {categoryTools.map((tool) => (
                                            <ToolCard
                                                key={tool.slug}
                                                icon={<tool.icon />}
                                                title={tool.name}
                                                description={tool.shortDescription}
                                                href={`/tools/${tool.slug}`}
                                                isAI={tool.isAI}
                                                className="hover:-translate-y-1 transition-all duration-300"
                                            />
                                        ))}
                                    </div>
                                </section>

                            );
                        })}
                        {/* In-Feed Ad after lists */}
                        <div className="max-w-3xl mx-auto">
                            <InFeedAd />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
