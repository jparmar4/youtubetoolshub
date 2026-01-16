import { ReactNode } from "react";

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

    return (
        <>
            <div className="w-full">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-10 animate-fade-in-up">
                        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                            {title}
                        </h1>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            {description}
                        </p>
                    </div>

                    {/* Tool Content */}
                    <div className="glass-premium rounded-2xl shadow-lg border border-slate-200 p-6 md:p-8 mb-8 animate-fade-in-up delay-100 bg-white/50">
                        <MotionWrapper>
                            {children}
                        </MotionWrapper>
                    </div>



                    {/* FAQ Section */}
                    {faq.length > 0 && (
                        <div className="glass-premium rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 animate-fade-in-up delay-300 bg-white/50">
                            <h2 className="text-2xl font-bold text-slate-900 mb-6">
                                Frequently Asked Questions
                            </h2>
                            <div className="space-y-6">
                                {faq.map((item, i) => (
                                    <div key={i} className="border-b border-slate-200 pb-6 last:border-b-0 last:pb-0">
                                        <h3 className="font-semibold text-slate-900 mb-2">
                                            {item.question}
                                        </h3>
                                        <p className="text-slate-600">
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
