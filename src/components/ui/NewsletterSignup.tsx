"use client";

import { useState } from "react";
import { FaEnvelope, FaCheck, FaSpinner } from "react-icons/fa";

export default function NewsletterSignup() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus("loading");

        // Simulate API call - replace with actual newsletter service
        await new Promise(resolve => setTimeout(resolve, 1000));

        setStatus("success");
        setEmail("");

        // Reset after 3 seconds
        setTimeout(() => setStatus("idle"), 3000);
    };

    return (
        <div className="glass-premium rounded-2xl p-8 text-center">
            <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400">
                <FaEnvelope className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">
                YouTube Tips in Your Inbox
            </h3>
            <p className="text-slate-600 mb-6 text-sm">
                Get weekly tips, tool updates, and growth strategies. No spam, unsubscribe anytime.
            </p>

            {status === "success" ? (
                <div className="flex items-center justify-center gap-2 text-emerald-600">
                    <FaCheck className="w-5 h-5" />
                    <span>Thanks for subscribing!</span>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="flex-1 px-4 py-3 rounded-lg bg-white border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-500 transition-colors"
                        required
                        disabled={status === "loading"}
                    />
                    <button
                        type="submit"
                        disabled={status === "loading"}
                        className="px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-600/50 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                        {status === "loading" ? (
                            <>
                                <FaSpinner className="w-4 h-4 animate-spin" />
                                <span>Subscribing...</span>
                            </>
                        ) : (
                            <span>Subscribe</span>
                        )}
                    </button>
                </form>
            )}
        </div>
    );
}
