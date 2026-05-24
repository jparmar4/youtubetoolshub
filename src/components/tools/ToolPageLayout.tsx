"use client";

import { ReactNode } from "react";

// Dynamic import to avoid loading framer-motion on server
import dynamic from "next/dynamic";
const MotionWrapper = dynamic(() => import("@/components/ui/MotionWrapper"), { ssr: false });
import ToolHistory from "./ToolHistory";
import { useToolContext } from "./ToolContext";
import { getToolBySlug } from "@/config/tools";

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
}: ToolPageLayoutProps) {
    // Generate slug from title if not provided
    const toolSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const { hideHeader } = useToolContext();
    const tool = getToolBySlug(toolSlug);
    const definitionBlock = tool?.definitionBlock;

    return (
        <>
            <div className="w-full">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    {!hideHeader && (
                        <div className="text-center mb-10 animate-fade-in-up">
                            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                                {title}
                            </h1>
                            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                                {description}
                            </p>
                        </div>
                    )}

                    {/* Definition Block for Featured Snippets / AI Overviews */}
                    {!hideHeader && definitionBlock && (
                        <div className="max-w-2xl mx-auto text-left glass-premium p-6 rounded-2xl border-l-4 border-purple-500 bg-purple-50/20 dark:bg-purple-950/10 mb-10 animate-fade-in-up">
                            <h2 className="text-xl font-bold text-purple-700 dark:text-purple-400 mb-3">
                                {definitionBlock.title}
                            </h2>
                            <p className="text-slate-700 dark:text-slate-300 text-base leading-relaxed">
                                {definitionBlock.text}
                            </p>
                        </div>
                    )}

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
