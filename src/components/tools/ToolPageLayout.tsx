import { ReactNode } from "react";
import AdPlaceholder from "@/components/ui/AdPlaceholder";
import { getFAQSchema, getHowToSchema, getSoftwareApplicationSchema, getBreadcrumbSchema } from "@/lib/seo";
import { siteConfig } from "@/config/site";

interface ToolPageLayoutProps {
    title: string;
    description: string;
    slug?: string; // Optional - will be generated from title if not provided
    children: ReactNode;
    faq?: { question: string; answer: string }[];
    howTo?: string[];
    seoContent?: string;
}

export default function ToolPageLayout({
    title,
    description,
    slug,
    children,
    faq = [],
    howTo = [],
    seoContent,
}: ToolPageLayoutProps) {
    // Generate slug from title if not provided
    const toolSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    // Generate structured data for SEO
    const toolSchema = getSoftwareApplicationSchema({
        name: title,
        description: description,
        url: `${siteConfig.url}/tools/${toolSlug}`,
        category: "YouTube Tools",
    });

    const breadcrumbSchema = getBreadcrumbSchema([
        { name: "Home", url: siteConfig.url },
        { name: "Tools", url: `${siteConfig.url}/tools` },
        { name: title, url: `${siteConfig.url}/tools/${toolSlug}` },
    ]);

    const faqSchema = faq.length > 0 ? getFAQSchema(faq) : null;

    const howToSchema = howTo.length > 0 ? getHowToSchema({
        name: `How to Use ${title}`,
        description: description,
        steps: howTo.map((step, i) => ({
            name: `Step ${i + 1}`,
            text: step,
        })),
        totalTime: "PT3M",
    }) : null;

    return (
        <>
            {/* JSON-LD Structured Data for SEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(toolSchema),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(breadcrumbSchema),
                }}
            />
            {faqSchema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(faqSchema),
                    }}
                />
            )}
            {howToSchema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(howToSchema),
                    }}
                />
            )}

            <div className="min-h-screen py-12 bg-gray-50 dark:bg-gray-900">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="text-center mb-10">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            {title}
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            {description}
                        </p>
                    </div>

                    {/* Tool Content */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8 mb-8">
                        {children}
                    </div>

                    {/* Ad Placeholder */}
                    <div className="mb-8">
                        <AdPlaceholder size="inline" />
                    </div>

                    {/* How to Use Section */}
                    {howTo.length > 0 && (
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8 mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                How to Use This Tool
                            </h2>
                            <ol className="space-y-4">
                                {howTo.map((step, i) => (
                                    <li key={i} className="flex gap-4">
                                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 flex items-center justify-center font-bold text-sm">
                                            {i + 1}
                                        </span>
                                        <span className="text-gray-600 dark:text-gray-300 pt-1">
                                            {step}
                                        </span>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    )}

                    {/* SEO Content */}
                    {seoContent && (
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8 mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                About This Tool
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                {seoContent}
                            </p>
                        </div>
                    )}

                    {/* Ad Placeholder - Sidebar alternative */}
                    <div className="mb-8">
                        <AdPlaceholder size="banner" />
                    </div>

                    {/* FAQ Section */}
                    {faq.length > 0 && (
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                Frequently Asked Questions
                            </h2>
                            <div className="space-y-6">
                                {faq.map((item, i) => (
                                    <div key={i} className="border-b border-gray-100 dark:border-gray-700 pb-6 last:border-0 last:pb-0">
                                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                                            {item.question}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-400">
                                            {item.answer}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
