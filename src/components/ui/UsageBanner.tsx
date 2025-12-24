"use client";

import { useState } from "react";
import Link from "next/link";
import { FaCrown, FaBolt, FaImage, FaTimes } from "react-icons/fa";
import { useUsage } from "@/hooks/useUsage";

interface UsageBannerProps {
    type?: "ai" | "image" | "both";
    compact?: boolean;
    toolSlug?: string;
}

export default function UsageBanner({ type = "both", compact = false, toolSlug }: UsageBannerProps) {
    const { getStats, summary, loading } = useUsage();
    const [dismissed, setDismissed] = useState(false);

    if (loading || dismissed) return null;
    if (summary.isPro) return null;

    // Handle single tool stats view
    if (toolSlug) {
        const stats = getStats(toolSlug);
        const remaining = stats.remaining === 'Unlimited' ? Infinity : stats.remaining;

        // Safety check for number
        if (typeof remaining !== 'number') return null;

        const isLow = remaining <= 0; // Show warning when 0 left
        const isWarning = isLow;

        // If compact view for single tool
        if (compact) {
            return (
                <div className={`inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full ${isWarning
                    ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                    }`}>
                    <span className="flex items-center gap-1">
                        <FaBolt className="w-3 h-3" />
                        {stats.remaining}/{stats.limit}
                    </span>
                </div>
            );
        }

        // Full banner for single tool
        return (
            <div className={`relative rounded-xl p-4 mb-6 ${isWarning
                ? "bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border border-red-200 dark:border-red-800"
                : "bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700"
                }`}>
                <button
                    onClick={() => setDismissed(true)}
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                    <FaTimes className="w-3 h-3" />
                </button>

                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-4">
                        <div className="flex items-center gap-2">
                            <div className={`p-2 rounded-lg ${isLow ? 'bg-red-100 dark:bg-red-900/30' : 'bg-blue-100 dark:bg-blue-900/30'}`}>
                                <FaBolt className={`w-4 h-4 ${isLow ? 'text-red-600' : 'text-blue-600'}`} />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                    Daily Credits
                                </p>
                                <p className={`text-xs ${isLow ? 'text-red-600 dark:text-red-400' : 'text-gray-500 dark:text-gray-400'}`}>
                                    {stats.used}/{stats.limit} used today
                                </p>
                            </div>
                        </div>
                    </div>

                    {isWarning && (
                        <Link
                            href="/pricing"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-600 to-orange-500 text-white text-sm font-medium rounded-lg hover:from-red-700 hover:to-orange-600 transition-all shadow-lg shadow-red-500/25"
                        >
                            <FaCrown className="w-4 h-4" />
                            Upgrade to Pro
                        </Link>
                    )}
                </div>
            </div>
        );
    }

    // Default Summary View (Legacy/Dashboard)
    const showAi = type === "ai" || type === "both";
    const showImage = type === "image" || type === "both";

    const totalLow = typeof summary.aiRemaining === "number" && summary.aiRemaining <= 2;
    const imageLow = typeof summary.imageRemaining === "number" && summary.imageRemaining <= 0;
    const isWarning = totalLow || imageLow;

    if (compact) {
        return (
            <div className={`inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full ${isWarning
                ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300"
                : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                }`}>
                {showAi && (
                    <span className="flex items-center gap-1">
                        <FaBolt className="w-3 h-3" />
                        {summary.aiRemaining}/{summary.aiLimit}
                    </span>
                )}
                {showAi && showImage && <span>•</span>}
                {showImage && (
                    <span className="flex items-center gap-1">
                        <FaImage className="w-3 h-3" />
                        {summary.imageRemaining}/{summary.imageLimit}
                    </span>
                )}
            </div>
        );
    }

    return (
        <div className={`relative rounded-xl p-4 mb-6 ${isWarning
            ? "bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border border-yellow-200 dark:border-yellow-800"
            : "bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700"
            }`}>
            <button
                onClick={() => setDismissed(true)}
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
                <FaTimes className="w-3 h-3" />
            </button>

            <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-4">
                    {showAi && (
                        <div className="flex items-center gap-2">
                            <div className={`p-2 rounded-lg ${totalLow ? 'bg-yellow-100 dark:bg-yellow-900/30' : 'bg-blue-100 dark:bg-blue-900/30'}`}>
                                <FaBolt className={`w-4 h-4 ${totalLow ? 'text-yellow-600' : 'text-blue-600'}`} />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                    Daily Uses
                                </p>
                                <p className={`text-xs ${totalLow ? 'text-yellow-600 dark:text-yellow-400' : 'text-gray-500 dark:text-gray-400'}`}>
                                    {summary.aiUsed}/{summary.aiLimit} used today
                                </p>
                            </div>
                        </div>
                    )}

                    {showImage && (
                        <div className="flex items-center gap-2">
                            <div className={`p-2 rounded-lg ${imageLow ? 'bg-red-100 dark:bg-red-900/30' : 'bg-purple-100 dark:bg-purple-900/30'}`}>
                                <FaImage className={`w-4 h-4 ${imageLow ? 'text-red-600' : 'text-purple-600'}`} />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                    Image
                                </p>
                                <p className={`text-xs ${imageLow ? 'text-red-600 dark:text-red-400' : 'text-gray-500 dark:text-gray-400'}`}>
                                    {summary.imageUsed}/{summary.imageLimit} used
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {isWarning && (
                    <Link
                        href="/pricing"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-600 to-orange-500 text-white text-sm font-medium rounded-lg hover:from-red-700 hover:to-orange-600 transition-all shadow-lg shadow-red-500/25"
                    >
                        <FaCrown className="w-4 h-4" />
                        Upgrade to Pro
                    </Link>
                )}
            </div>
        </div>
    );
}
