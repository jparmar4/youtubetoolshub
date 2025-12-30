"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { FaCrown, FaCheck, FaRocket } from "react-icons/fa";
import confetti from "canvas-confetti";

function SuccessContent() {
    const searchParams = useSearchParams();
    const paymentId = searchParams.get("payment_id");

    useEffect(() => {
        // Fire confetti
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ["#DC2626", "#F97316", "#FBBF24"],
        });
    }, []);

    return (
        <div className="min-h-screen py-12 bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
            <div className="max-w-md w-full mx-auto px-4 text-center">
                {/* Success Icon */}
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mb-6 shadow-lg shadow-green-500/30">
                    <FaCheck className="w-10 h-10 text-white" />
                </div>

                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    Welcome to Pro! 🎉
                </h1>

                <p className="text-gray-600 dark:text-gray-400 mb-8">
                    Your payment was successful. You now have unlimited access to all YouTube tools!
                </p>

                {/* Pro Badge */}
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-orange-500 text-white px-6 py-3 rounded-full mb-8">
                    <FaCrown className="w-5 h-5" />
                    <span className="font-bold">Pro Member</span>
                </div>

                {/* What's Unlocked */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8 text-left">
                    <h2 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <FaRocket className="text-red-500" />
                        What&apos;s now unlocked:
                    </h2>
                    <ul className="space-y-3">
                        {[
                            "Unlimited AI generations",
                            "Unlimited image generations",
                            "Priority AI processing",
                            "Ad-free experience",
                            "Priority support",
                        ].map((feature, i) => (
                            <li key={i} className="flex items-center gap-3">
                                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                                    <FaCheck className="w-3 h-3 text-white" />
                                </span>
                                <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {paymentId && (
                    <p className="text-xs text-gray-400 mb-6">
                        Payment ID: {paymentId}
                    </p>
                )}

                {/* CTA */}
                <Link
                    href="/tools"
                    className="inline-flex items-center justify-center gap-2 w-full py-4 px-6 bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white rounded-xl font-medium text-lg shadow-lg shadow-red-500/25 transition-all"
                >
                    <FaRocket className="w-5 h-5" />
                    Start Using Pro Tools
                </Link>

                <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                    A confirmation email has been sent to your inbox.
                </p>
            </div>
        </div>
    );
}

export default function UpgradeSuccessPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen py-12 bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
                <div className="animate-pulse">Loading...</div>
            </div>
        }>
            <SuccessContent />
        </Suspense>
    );
}
