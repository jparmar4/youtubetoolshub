"use client";

import { ReactNode } from "react";

// Dynamic import to avoid loading framer-motion / history UI on every tool paint
import dynamic from "next/dynamic";
const MotionWrapper = dynamic(() => import("@/components/ui/MotionWrapper"), { ssr: false });
const ToolHistory = dynamic(() => import("./ToolHistory"), { ssr: false });
import { useToolContext } from "./ToolContext";

interface ToolPageLayoutProps {
    title: string;
    description: string;
    slug?: string; // Optional - will be generated from title if not provided
    children: ReactNode;
    /** @deprecated Parent tool page renders the canonical FAQ set from seoFaqs. */
    faq?: { question: string; answer: string }[];
    howTo?: string[];
    seoContent?: string;
}

export default function ToolPageLayout({
    title,
    description,
    slug,
    children,
}: ToolPageLayoutProps) {
    // Generate slug from title if not provided
    const toolSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const { hideHeader } = useToolContext();
    // Definition blocks / long-form SEO copy live on the parent tool page
    // so crawlers only see one definition + key-facts block per URL.
    // FAQ also lives on the parent page (seoFaqs) — do not render a second copy here.

    return (
        <>
            <div className="w-full">
                <div className="max-w-6xl mx-auto">
                    {/* Header — use H1 only when parent page does not supply one */}
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

                    {/* Tool Content */}
                    <div
                        className="glass-premium rounded-2xl shadow-lg border border-slate-200 p-6 md:p-8 mb-8 animate-fade-in-up delay-100 bg-white/50"
                        aria-live="polite"
                    >
                        <MotionWrapper>
                            {children}
                        </MotionWrapper>
                    </div>

                    {/* Recent History Section */}
                    <div className="mt-8">
                        <ToolHistory toolSlug={toolSlug} />
                    </div>
                </div>
            </div>
        </>
    );
}
