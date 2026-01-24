"use client";

import {
    mockCompetitorData,
    mockAIResponses,
    mockActionItems,
    mockQuickWins,
    mockBrandStrength,
    mockContentIdeas
} from "@/lib/ai-visibility-data";
import GapAnalysis from "@/components/dashboard/ai-visibility/GapAnalysis";
import AIQuotes from "@/components/dashboard/ai-visibility/AIQuotes";
import ActionItems from "@/components/dashboard/ai-visibility/ActionItems";
import QuickWins from "@/components/dashboard/ai-visibility/QuickWins";
import BrandStrengthComponent from "@/components/dashboard/ai-visibility/BrandStrength";
import ContentStrategy from "@/components/dashboard/ai-visibility/ContentStrategy";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

export default function AIVisibilityPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-28 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="mb-8">
                    <Link
                        href="/dashboard"
                        className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-purple-600 mb-4 transition-colors"
                    >
                        <FaArrowLeft /> Back to Dashboard
                    </Link>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">AI Visibility Dashboard</h1>
                    <p className="text-slate-500 mt-1">Track and improve how AI engines perceive your brand.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    {/* Top Row: Gap Analysis & AI Quotes */}
                    <GapAnalysis data={mockCompetitorData} />
                    <AIQuotes quotes={mockAIResponses} />
                </div>

                {/* Middle Row: Priority Actions */}
                <div className="mb-8">
                    <ActionItems items={mockActionItems} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    {/* Bottom Row: Quick Wins & Brand Strength */}
                    <QuickWins wins={mockQuickWins} />
                    <BrandStrengthComponent data={mockBrandStrength} />
                </div>

                {/* Footer: Content Strategy */}
                <ContentStrategy ideas={mockContentIdeas} />

            </div>
        </div>
    );
}
