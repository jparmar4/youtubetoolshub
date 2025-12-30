import { Metadata } from "next";
import { ToolCard } from "@/components/ui/Card";
import { tools, toolCategories, getToolsByCategory } from "@/config/tools";

export const metadata: Metadata = {
    title: "All YouTube Tools",
    description: "Browse all 16+ free YouTube tools: thumbnail downloader, title generator, tag extractor, earnings calculator, and more AI-powered automation tools.",
    alternates: {
        canonical: "/tools",
    },
};

export default function ToolsPage() {
    return (
        <div className="min-h-screen py-20 relative overflow-hidden">
            <div className="nebula-bg" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <div className="text-center mb-16 animate-fade-in-up">
                    <span className="inline-block py-1 px-3 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-6 backdrop-blur-sm">
                        Professional Suite
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        All YouTube Tools
                    </h1>
                    <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
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
                                <div className="mb-8 border-l-4 border-indigo-500 pl-4">
                                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                                        {category.name}
                                    </h2>
                                    <p className="text-slate-400">
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
                                            className="glass-premium hover:-translate-y-1 transition-all duration-300"
                                        />
                                    ))}
                                </div>
                            </section>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
