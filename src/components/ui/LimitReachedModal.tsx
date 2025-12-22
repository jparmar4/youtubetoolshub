"use client";

import Link from "next/link";
import { FaCrown, FaLock, FaTimes } from "react-icons/fa";
import { getToolBySlug } from "@/config/tools";
import { getToolLimit } from "@/lib/usage";

interface LimitReachedModalProps {
    isOpen: boolean;
    onClose: () => void;
    toolSlug: string | null;
}

export default function LimitReachedModal({ isOpen, onClose, toolSlug }: LimitReachedModalProps) {
    if (!isOpen || !toolSlug) return null;

    const tool = getToolBySlug(toolSlug);
    const limit = getToolLimit(toolSlug);
    const toolName = tool?.name || "Tool";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in-95 duration-200">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                    <FaTimes className="w-5 h-5" />
                </button>

                {/* Icon */}
                <div className="flex justify-center mb-4">
                    <div className="p-4 bg-red-100 dark:bg-red-900/30 rounded-full">
                        <FaLock className="w-8 h-8 text-red-500" />
                    </div>
                </div>

                {/* Content */}
                <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {toolName} Limit Reached
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                        You&apos;ve reached the free limit of {limit} uses per day for this tool.
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                        Limits reset daily, or upgrade now for unlimited access.
                    </p>
                </div>

                {/* Pro Benefits */}
                <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-xl p-4 mb-6">
                    <div className="flex items-center gap-2 mb-3">
                        <FaCrown className="text-yellow-500" />
                        <span className="font-semibold text-gray-900 dark:text-white">Pro Benefits</span>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400 text-left">
                        <li>✓ Unlimited usage for all tools</li>
                        <li>✓ 150 image generations per month</li>
                        <li>✓ Ad-free experience</li>
                        <li>✓ Priority processing</li>
                    </ul>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-3">
                    <Link
                        href="/pricing"
                        className="flex items-center justify-center gap-2 w-full py-3 px-6 bg-gradient-to-r from-red-600 to-orange-500 text-white font-medium rounded-xl hover:from-red-700 hover:to-orange-600 transition-all shadow-lg shadow-red-500/25"
                    >
                        <FaCrown />
                        Upgrade to Pro - $9/mo
                    </Link>
                    <button
                        onClick={onClose}
                        className="w-full py-3 px-6 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                        Maybe later
                    </button>
                </div>
            </div>
        </div>
    );
}
