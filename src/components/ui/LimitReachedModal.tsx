"use client";

import { useEffect } from "react";
import Link from "next/link";
import { FaCrown, FaLock, FaTimes } from "react-icons/fa";
import { getToolMetaBySlug } from "@/config/tool-meta";
import { getToolLimit } from "@/lib/usage";

import { useUsage } from "@/hooks/useUsage";

interface LimitReachedModalProps {
    isOpen: boolean;
    onClose: () => void;
    toolSlug: string | null;
}

export default function LimitReachedModal({ isOpen, onClose, toolSlug }: LimitReachedModalProps) {
    const { isPro } = useUsage();

    useEffect(() => {
        if (!isOpen) return;
        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") onClose();
        }
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);

    if (!isOpen || !toolSlug) return null;

    const tool = getToolMetaBySlug(toolSlug);
    const limit = getToolLimit(toolSlug, isPro);
    const toolName = tool?.name || "Tool";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="limit-reached-title">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative glass-premium border border-slate-200 rounded-2xl shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in-95 duration-200">
                <button
                    onClick={onClose}
                    aria-label="Close dialog"
                    className="absolute top-4 right-4 p-2.5 min-w-11 min-h-11 flex items-center justify-center text-slate-600 hover:text-slate-900 transition-colors rounded-lg"
                >
                    <FaTimes className="w-5 h-5" />
                </button>

                {/* Icon */}
                <div className="flex justify-center mb-4">
                    <div className="p-4 bg-red-50 rounded-full border border-red-100">
                        <FaLock className="w-8 h-8 text-red-500" />
                    </div>
                </div>

                {/* Content */}
                <div className="text-center mb-6">
                    <h3 id="limit-reached-title" className="text-xl font-bold text-slate-900 mb-2">
                        {toolName} Limit Reached
                    </h3>
                    <p className="text-slate-600">
                        You&apos;ve reached the free limit of {limit} uses per day for this tool.
                    </p>
                    <p className="text-sm text-slate-500 mt-2">
                        Limits reset daily, or upgrade now for unlimited access.
                    </p>
                </div>

                {/* Pro Benefits */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-6">
                    <div className="flex items-center gap-2 mb-3">
                        <FaCrown className="text-yellow-500" />
                        <span className="font-semibold text-slate-900">Pro Benefits</span>
                    </div>
                    <ul className="space-y-2 text-sm text-slate-600 text-left">
                        <li>✓ Unlimited usage for all tools</li>
                        <li>✓ Unlimited image generations</li>
                        <li>✓ Ad-free experience</li>
                        <li>✓ Priority processing</li>
                    </ul>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-3">
                    <Link
                        href="/pricing"
                        className="flex items-center justify-center gap-2 w-full py-3 px-6 bg-gradient-to-r from-red-600 to-orange-600 text-white font-medium rounded-xl hover:from-red-500 hover:to-orange-500 transition-all shadow-lg shadow-red-900/20"
                    >
                        <FaCrown />
                        Upgrade to Pro — ₹799/mo
                    </Link>
                    <button
                        onClick={onClose}
                        className="w-full py-3 px-6 text-slate-500 hover:text-slate-900 transition-colors hover:bg-slate-50 rounded-xl"
                    >
                        Maybe later
                    </button>
                </div>
            </div>
        </div>
    );
}
