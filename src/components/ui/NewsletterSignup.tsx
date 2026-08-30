"use client";

import { useState } from "react";
import { FaEnvelope, FaCheck, FaSpinner } from "react-icons/fa";

export default function NewsletterSignup() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus("loading");
        setMessage("");

        try {
            const res = await fetch("/api/newsletter", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (res.ok) {
                setStatus("success");
                setMessage(data.message || "Thanks for subscribing!");
                setEmail("");
            } else {
                setStatus("error");
                setMessage(data.error || "Something went wrong.");
            }
        } catch {
            setStatus("error");
            setMessage("Network error. Please try again.");
        }

        // Reset after 5 seconds
        setTimeout(() => setStatus("idle"), 5000);
    };

    return (
        <div className="glass-premium rounded-3xl p-8 md:p-10 text-center border border-purple-100 dark:border-slate-800 shadow-md">
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-500/20 to-fuchsia-500/20 flex items-center justify-center text-purple-600 dark:text-purple-400 shadow-inner">
                <FaEnvelope className="w-6 h-6" />
            </div>
            <span className="inline-block bg-purple-100 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full mb-3 border border-purple-200 dark:border-purple-800">
                Free Creator Resource
            </span>
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-2">
                Get the 2026 YouTube SEO & High-CPM Matrix
            </h3>
            <p className="text-slate-600 dark:text-slate-300 mb-6 text-sm max-w-lg mx-auto leading-relaxed">
                Join thousands of creators getting our breakdown of <strong>$20–$50 CPM niches</strong>, viral title formulas, and weekly algorithm updates.
            </p>

            {status === "success" ? (
                <div className="flex items-center justify-center gap-2 text-emerald-600 font-semibold py-2">
                    <FaCheck className="w-5 h-5" />
                    <span>{message || "Thanks for subscribing! Check your inbox for the matrix."}</span>
                </div>
            ) : status === "error" ? (
                <div className="space-y-3">
                    <p className="text-red-500 text-sm font-medium">{message || "Something went wrong."}</p>
                    <button onClick={() => setStatus("idle")} className="text-purple-600 hover:underline text-sm font-medium">Try again</button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your creator email"
                        className="flex-1 px-4 py-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-sm"
                        required
                        disabled={status === "loading"}
                    />
                    <button
                        type="submit"
                        disabled={status === "loading"}
                        className="px-6 py-3.5 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 disabled:opacity-50 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-md shadow-purple-500/20 text-sm hover:scale-[1.01]"
                    >
                        {status === "loading" ? (
                            <>
                                <FaSpinner className="w-4 h-4 animate-spin" />
                                <span>Sending...</span>
                            </>
                        ) : (
                            <span>Get Free Matrix →</span>
                        )}
                    </button>
                </form>
            )}
        </div>
    );
}
