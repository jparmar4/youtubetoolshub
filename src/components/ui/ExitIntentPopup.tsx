"use client";

import { useState, useEffect, useCallback } from "react";
import { FaTimes, FaRocket, FaEnvelope, FaSpinner, FaCheck } from "react-icons/fa";
import Link from "next/link";

export default function ExitIntentPopup() {
    const [isVisible, setIsVisible] = useState(false);
    const [hasShown, setHasShown] = useState(() => {
        if (typeof window === "undefined") return false;

        try {
            return sessionStorage.getItem("exitPopupShown") === "true";
        } catch {
            return false;
        }
    });
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

    const handleMouseLeave = useCallback((e: MouseEvent) => {
        if (e.clientY <= 5 && !hasShown) {
            setIsVisible(true);
            setHasShown(true);
            try {
                sessionStorage.setItem("exitPopupShown", "true");
            } catch { /* ignore */ }
        }
    }, [hasShown]);

    useEffect(() => {
        if (hasShown) return;

        const timer = setTimeout(() => {
            document.addEventListener("mouseleave", handleMouseLeave);
        }, 5000);

        return () => {
            clearTimeout(timer);
            document.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [handleMouseLeave, hasShown]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        setStatus("loading");
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: "Newsletter Subscriber",
                    email,
                    subject: "Newsletter Signup",
                    message: "Subscribed via exit-intent popup.",
                }),
            });
            if (!res.ok) throw new Error("Failed");
            setStatus("success");
            setTimeout(() => setIsVisible(false), 2000);
        } catch {
            setStatus("idle");
        }
    };

    const handleClose = () => {
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]"
                onClick={handleClose}
                style={{ animation: "fadeIn 0.3s ease" }}
            />

            {/* Modal */}
            <div
                className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
                style={{ animation: "fadeIn 0.3s ease" }}
            >
                <div
                    className="relative w-full max-w-lg bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Close button */}
                    <button
                        onClick={handleClose}
                        className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors z-10"
                        aria-label="Close popup"
                    >
                        <FaTimes className="w-5 h-5" />
                    </button>

                    {/* Gradient header */}
                    <div className="bg-gradient-to-br from-purple-600 via-fuchsia-600 to-pink-500 px-8 py-10 text-center">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                            <FaRocket className="w-8 h-8 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">
                            Wait! Don&apos;t Leave Empty-Handed
                        </h2>
                        <p className="text-purple-100 text-sm">
                            Get our free YouTube growth cheatsheet + weekly tips
                        </p>
                    </div>

                    {/* Content */}
                    <div className="px-8 py-8">
                        {status === "success" ? (
                            <div className="text-center py-4">
                                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                                    <FaCheck className="w-6 h-6 text-emerald-600" />
                                </div>
                                <p className="text-lg font-semibold text-slate-900 dark:text-white">You&apos;re in!</p>
                                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Check your inbox for the cheatsheet.</p>
                            </div>
                        ) : (
                            <>
                                <div className="space-y-3 mb-6">
                                    <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                                        <span className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 flex items-center justify-center text-xs font-bold flex-shrink-0">✓</span>
                                        <span>27 free creator YouTube tools</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                                        <span className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 flex items-center justify-center text-xs font-bold flex-shrink-0">✓</span>
                                        <span>Weekly growth tips and algorithm updates</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                                        <span className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 flex items-center justify-center text-xs font-bold flex-shrink-0">✓</span>
                                        <span>No spam, unsubscribe anytime</span>
                                    </div>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-3">
                                    <div className="relative">
                                        <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Enter your email"
                                            className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                                            required
                                            disabled={status === "loading"}
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={status === "loading"}
                                        className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 disabled:opacity-50 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-purple-500/25"
                                    >
                                        {status === "loading" ? (
                                            <><FaSpinner className="w-4 h-4 animate-spin" /> Subscribing...</>
                                        ) : (
                                            "Get Free Cheatsheet"
                                        )}
                                    </button>
                                </form>

                                <div className="mt-4 text-center">
                                    <Link
                                        href="/tools"
                                        className="text-sm text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 font-medium transition-colors"
                                        onClick={handleClose}
                                    >
                                        Or explore our free tools →
                                    </Link>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>


        </>
    );
}
