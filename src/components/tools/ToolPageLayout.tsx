import { ReactNode } from "react";
import AdPlaceholder from "@/components/ui/AdPlaceholder";
import { getFAQSchema, getHowToSchema, getSoftwareApplicationSchema, getBreadcrumbSchema } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import MotionWrapper from "@/components/ui/MotionWrapper";
import ToolHistory from "./ToolHistory";

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

            <div className="w-full">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-10 animate-fade-in-up">
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            {title}
                        </h1>
                        <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                            {description}
                        </p>
                    </div>

                    {/* Tool Content */}
                    <div className="glass-premium rounded-2xl shadow-lg p-6 md:p-8 mb-8 animate-fade-in-up delay-100">
                        <MotionWrapper>
                            {children}
                        </MotionWrapper>
                    </div>

                    {/* Ad Placeholder */}
                    <div className="mb-8">
                        <AdPlaceholder size="inline" />
                    </div>

                    {/* How to Use Section */}
                    {howTo.length > 0 && (
                        <div className="glass-premium rounded-2xl shadow-lg p-6 md:p-8 mb-8 animate-fade-in-up delay-200">
                            <h2 className="text-2xl font-bold text-white mb-6">
                                How to Use This Tool
                            </h2>
                            <ol className="space-y-4">
                                {howTo.map((step, i) => (
                                    <li key={i} className="flex gap-4">
                                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-pink-100 dark:bg-pink-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-sm border border-pink-200 dark:border-pink-800">
                                            {i + 1}
                                        </span>
                                        <span className="text-slate-600 dark:text-slate-300 pt-1">
                                            {step}
                                        </span>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    )}

                    {/* SEO Content */}
                    {seoContent && (
                        <div className="glass-premium rounded-2xl shadow-lg p-6 md:p-8 mb-8 animate-fade-in-up delay-300">
                            <h2 className="text-2xl font-bold text-white mb-4">
                                About This Tool
                            </h2>
                            <div className="prose prose-lg dark:prose-invert max-w-none text-slate-300">
                                <p className="leading-relaxed">{seoContent}</p>
                            </div>
                        </div>
                    )}

                    {/* Ad Placeholder - Sidebar alternative */}
                    <div className="mb-8">
                        <AdPlaceholder size="banner" />
                    </div>

                    {/* FAQ Section */}
                    {faq.length > 0 && (
                        <div className="glass-premium rounded-2xl shadow-lg p-6 md:p-8 animate-fade-in-up delay-300">
                            <h2 className="text-2xl font-bold text-white mb-6">
                                Frequently Asked Questions
                            </h2>
                            <div className="space-y-6">
                                {faq.map((item, i) => (
                                    <div key={i} className="border-b border-pink-100 dark:border-pink-900/30 pb-6 last:border-b-0 last:pb-0">
                                        <h3 className="font-semibold text-white mb-2">
                                            {item.question}
                                        </h3>
                                        <p className="text-slate-400">
                                            {item.answer}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Recent History Section */}
                    <div className="mt-8">
                        <ToolHistory toolSlug={toolSlug} />
                    </div>
                </div>
            </div>
        </>
    );
}
