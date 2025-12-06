"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { FaCrown, FaCheck, FaArrowLeft, FaShieldAlt, FaCreditCard } from "react-icons/fa";
import PaymentButton from "@/components/payment/PaymentButton";

function UpgradeContent() {
    const searchParams = useSearchParams();
    const plan = (searchParams.get("plan") as "monthly" | "yearly") || "monthly";

    const planDetails = {
        monthly: {
            price: "₹499",
            priceUSD: "$6",
            period: "/month",
            save: null,
        },
        yearly: {
            price: "₹4,999",
            priceUSD: "$59",
            period: "/year",
            save: "Save 17%",
        },
    };

    const currentPlan = planDetails[plan];

    const features = [
        "Unlimited AI generations",
        "10 image generations per day",
        "All 16+ YouTube tools",
        "Priority AI processing",
        "Ad-free experience",
        "Priority support",
        "Cancel anytime",
    ];

    return (
        <div className="min-h-screen py-12 bg-gray-50 dark:bg-gray-900">
            <div className="max-w-lg mx-auto px-4">
                {/* Back Link */}
                <Link
                    href="/pricing"
                    className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-red-500 mb-6"
                >
                    <FaArrowLeft className="w-4 h-4" />
                    Back to Pricing
                </Link>

                {/* Upgrade Card */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-red-600 to-orange-500 p-6 text-white text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-4">
                            <FaCrown className="w-8 h-8" />
                        </div>
                        <h1 className="text-2xl font-bold mb-2">Upgrade to Pro</h1>
                        <div className="flex items-center justify-center gap-2">
                            <span className="text-4xl font-bold">{currentPlan.price}</span>
                            <span className="text-white/80">{currentPlan.period}</span>
                        </div>
                        <p className="text-white/70 text-sm mt-1">{currentPlan.priceUSD}{currentPlan.period}</p>
                        {currentPlan.save && (
                            <span className="inline-block mt-2 bg-green-500 text-white text-sm font-medium px-3 py-1 rounded-full">
                                {currentPlan.save}
                            </span>
                        )}
                    </div>

                    {/* Plan Toggle */}
                    <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-xl p-1">
                            <Link
                                href="/upgrade?plan=monthly"
                                className={`flex-1 py-2 px-4 rounded-lg text-center font-medium transition-all ${plan === "monthly"
                                    ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow"
                                    : "text-gray-600 dark:text-gray-400"
                                    }`}
                            >
                                Monthly
                            </Link>
                            <Link
                                href="/upgrade?plan=yearly"
                                className={`flex-1 py-2 px-4 rounded-lg text-center font-medium transition-all ${plan === "yearly"
                                    ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow"
                                    : "text-gray-600 dark:text-gray-400"
                                    }`}
                            >
                                Yearly
                                <span className="ml-1 text-xs text-green-500">-17%</span>
                            </Link>
                        </div>
                    </div>

                    {/* Features */}
                    <div className="p-6">
                        <h2 className="font-semibold text-gray-900 dark:text-white mb-4">
                            What&apos;s included:
                        </h2>
                        <ul className="space-y-3 mb-6">
                            {features.map((feature, i) => (
                                <li key={i} className="flex items-center gap-3">
                                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                                        <FaCheck className="w-3 h-3 text-white" />
                                    </span>
                                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                                </li>
                            ))}
                        </ul>

                        {/* Payment Button */}
                        <PaymentButton plan={plan} className="w-full text-lg py-4" />

                        {/* Security Badge */}
                        <div className="flex items-center justify-center gap-4 mt-6 text-gray-500 dark:text-gray-400 text-sm">
                            <div className="flex items-center gap-1">
                                <FaShieldAlt className="w-4 h-4" />
                                <span>Secure Payment</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <FaCreditCard className="w-4 h-4" />
                                <span>Powered by Razorpay</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Payment Methods */}
                <div className="mt-6 text-center">
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">
                        We accept all major payment methods
                    </p>
                    <div className="flex items-center justify-center gap-4 text-gray-400">
                        <span className="text-xs">Visa</span>
                        <span className="text-xs">Mastercard</span>
                        <span className="text-xs">UPI</span>
                        <span className="text-xs">Paytm</span>
                        <span className="text-xs">GPay</span>
                        <span className="text-xs">Net Banking</span>
                    </div>
                </div>

                {/* Guarantee */}
                <div className="mt-6 bg-green-50 dark:bg-green-900/20 rounded-xl p-4 text-center">
                    <p className="text-green-700 dark:text-green-400 text-sm">
                        <strong>7-Day Money-Back Guarantee</strong> — Not satisfied? Get a full refund, no questions asked.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function UpgradePage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen py-12 bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
                <div className="animate-pulse">Loading...</div>
            </div>
        }>
            <UpgradeContent />
        </Suspense>
    );
}
