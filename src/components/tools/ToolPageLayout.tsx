"use client";

import { ReactNode } from "react";

// Dynamic import to avoid loading history + framer-motion until below-fold hydration
import dynamic from "next/dynamic";
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

    return (
        <div className="w-full">
            <div className="max-w-6xl mx-auto">
                {/* Header — use H1 only when parent page does not supply one */}
                {!hideHeader && (
                    <div className="text-center mb-10 animate-fade-in-up">
                        <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 font-outfit tracking-tight">
                            {title}
                        </h1>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            {description}
                        </p>
                    </div>
                )}

                {/* Tool Content — flush inside parent .studio-console-3d when hideHeader is true */}
                <div
                    className={
                        hideHeader
                            ? "animate-fade-in-up"
                            : "studio-console-3d rounded-3xl p-6 md:p-8 mb-8 animate-fade-in-up"
                    }
                    aria-live="polite"
                >
                    {children}
                </div>

                {/* Recent History Section */}
                <div className="mt-8 pt-6 border-t border-slate-200/70">
                    <ToolHistory toolSlug={toolSlug} />
                </div>
            </div>
        </div>
    );
}
