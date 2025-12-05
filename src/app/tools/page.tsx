import { Metadata } from "next";
import { ToolCard } from "@/components/ui/Card";
import { tools, toolCategories, getToolsByCategory } from "@/config/tools";

export const metadata: Metadata = {
    title: "All YouTube Tools",
    description: "Browse all 16+ free YouTube tools: thumbnail downloader, title generator, tag extractor, earnings calculator, and more AI-powered automation tools.",
};

export default function ToolsPage() {
    return (
        <div className="min-h-screen py-12 bg-gray-50 dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        All YouTube Tools
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        {tools.length} free tools to help you grow your YouTube channel.
                        From thumbnails to SEO, we&apos;ve got you covered.
                    </p>
                </div>

                {/* Tools by Category */}
                <div className="space-y-16">
                    {toolCategories.map((category) => {
                        const categoryTools = getToolsByCategory(category.id);
                        return (
                            <section key={category.id}>
                                <div className="mb-6">
                                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                        {category.name}
                                    </h2>
                                    <p className="text-gray-600 dark:text-gray-400">
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
