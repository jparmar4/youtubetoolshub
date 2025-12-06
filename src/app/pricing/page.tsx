"use client";

import { useState } from "react";
import Link from "next/link";
import { FaCheck, FaTimes, FaCrown, FaRocket, FaInfinity } from "react-icons/fa";
import PaymentButton from "@/components/payment/PaymentButton";

const plans = [
    {
        name: "Free",
        price: "₹0",
        priceUSD: "$0",
        period: "forever",
        description: "Perfect for trying out our tools",
        icon: FaRocket,
        features: [
            { text: "10 uses per day (incl. images)", included: true, highlight: false },
            { text: "All 16+ YouTube tools", included: true, highlight: false },
            { text: "Copy to clipboard", included: true, highlight: false },
            { text: "CSV exports", included: true, highlight: false },
            { text: "Unlimited generations", included: false, highlight: false },
            { text: "Priority AI processing", included: false, highlight: false },
            { text: "Ad-free experience", included: false, highlight: false },
        ],
        cta: "Start Free",
        href: "/tools",
        popular: false,
        gradient: "from-gray-600 to-gray-700",
        isPaid: false,
    },
    {
        name: "Pro",
        price: "₹499",
        priceUSD: "$6",
        period: "/month",
        yearlyPrice: "₹4,999",
        yearlyPriceUSD: "$59",
        description: "For serious content creators",
        icon: FaCrown,
        features: [
            { text: "Unlimited AI generations", included: true, highlight: true },
            { text: "Unlimited image generations", included: true, highlight: true },
            { text: "All 16+ YouTube tools", included: true, highlight: false },
            { text: "Copy to clipboard", included: true, highlight: false },
            { text: "CSV exports", included: true, highlight: false },
            { text: "Priority AI processing", included: true, highlight: false },
            { text: "Ad-free experience", included: true, highlight: true },
            { text: "Priority support", included: true, highlight: false },
        ],
        cta: "Upgrade to Pro",
        href: "/sign-in?plan=pro",
        popular: true,
        gradient: "from-red-600 to-orange-500",
        isPaid: true,
    },
];

const comparison = [
    { feature: "Total Uses (per day)", free: "10 (incl. images)", pro: "Unlimited" },
    { feature: "Image Generations", free: "From 10 daily", pro: "Unlimited" },
    { feature: "All YouTube Tools", free: "✓", pro: "✓" },
    { feature: "Export & Download", free: "✓", pro: "✓" },
    { feature: "Priority Processing", free: "—", pro: "✓" },
    { feature: "Ad-Free Experience", free: "—", pro: "✓" },
    { feature: "Priority Support", free: "—", pro: "✓" },
];

export default function PricingPage() {
    const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

    return (
        <div className="min-h-screen py-12 bg-gray-50 dark:bg-gray-900">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        Simple, Honest Pricing
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
                        Start free, upgrade when you need more. No hidden fees, cancel anytime.
                    </p>

                    {/* Billing Toggle */}
                    <div className="inline-flex items-center bg-white dark:bg-gray-800 rounded-xl p-1 shadow-md">
                        <button
                            onClick={() => setBillingCycle("monthly")}
                            className={`px-6 py-2 rounded-lg font-medium transition-all ${billingCycle === "monthly"
                                ? "bg-gradient-to-r from-red-600 to-orange-500 text-white"
                                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                                }`}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => setBillingCycle("yearly")}
                            className={`px-6 py-2 rounded-lg font-medium transition-all ${billingCycle === "yearly"
                                ? "bg-gradient-to-r from-red-600 to-orange-500 text-white"
                                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                                }`}
                        >
                            Yearly
                            <span className="ml-2 text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">
                                Save 17%
                            </span>
                        </button>
                    </div>
                </div>

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
                    {plans.map((plan) => {
                        const Icon = plan.icon;
                        return (
                            <div
                                key={plan.name}
                                className={`
                                    relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden
                                    ${plan.popular
                                        ? "ring-2 ring-red-500 shadow-xl shadow-red-500/10"
                                        : "border border-gray-200 dark:border-gray-700 shadow-lg"
                                    }
                                `}
                            >
                                {/* Header */}
                                <div className={`bg-gradient-to-r ${plan.gradient} p-6 text-white`}>
                                    {plan.popular && (
                                        <span className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full">
                                            Most Popular
                                        </span>
                                    )}
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="p-2 bg-white/20 rounded-lg">
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        <h2 className="text-2xl font-bold">{plan.name}</h2>
                                    </div>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-4xl font-bold">
                                            {plan.isPaid
                                                ? billingCycle === "yearly"
                                                    ? plan.yearlyPrice
                                                    : plan.price
                                                : plan.price}
                                        </span>
                                        <span className="text-white/80">
                                            {plan.isPaid
                                                ? billingCycle === "yearly"
                                                    ? "/year"
                                                    : plan.period
                                                : plan.period}
                                        </span>
                                    </div>
                                    {plan.isPaid && (
                                        <p className="text-sm text-white/70 mt-1">
                                            {billingCycle === "yearly"
                                                ? `${plan.yearlyPriceUSD}/year`
                                                : `${plan.priceUSD}/month`}
                                        </p>
                                    )}
                                    <p className="text-white/80 mt-2 text-sm">{plan.description}</p>
                                </div>

                                {/* Features */}
                                <div className="p-6">
                                    <ul className="space-y-3 mb-6">
                                        {plan.features.map((feature, i) => (
                                            <li key={i} className="flex items-center gap-3">
                                                {feature.included ? (
                                                    <span className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${feature.highlight ? 'bg-green-500' : 'bg-green-100 dark:bg-green-900/30'}`}>
                                                        {feature.highlight ? (
                                                            <FaCheck className="w-3 h-3 text-white" />
                                                        ) : (
                                                            <FaCheck className="w-3 h-3 text-green-600 dark:text-green-400" />
                                                        )}
                                                    </span>
                                                ) : (
                                                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                                                        <FaTimes className="w-3 h-3 text-gray-400" />
                                                    </span>
                                                )}
                                                <span className={`text-sm ${feature.included ? 'text-gray-700 dark:text-gray-200' : 'text-gray-400'} ${feature.highlight ? 'font-medium' : ''}`}>
                                                    {feature.text}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>

                                    {plan.isPaid ? (
                                        <PaymentButton
                                            plan={billingCycle}
                                            className="w-full"
                                        />
                                    ) : (
                                        <Link
                                            href={plan.href}
                                            className="block w-full py-3 px-6 rounded-xl font-medium text-center transition-all bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white"
                                        >
                                            {plan.cta}
                                        </Link>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Comparison Table */}
                <div className="max-w-3xl mx-auto mb-16">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
                        Compare Plans
                    </h2>
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200 dark:border-gray-700">
                                    <th className="text-left py-4 px-6 font-medium text-gray-600 dark:text-gray-400">Feature</th>
                                    <th className="text-center py-4 px-6 font-medium text-gray-600 dark:text-gray-400">Free</th>
                                    <th className="text-center py-4 px-6 font-medium text-gray-600 dark:text-gray-400">
                                        <span className="inline-flex items-center gap-1">
                                            <FaCrown className="text-yellow-500" />
                                            Pro
                                        </span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {comparison.map((row, i) => (
                                    <tr key={i} className={i !== comparison.length - 1 ? "border-b border-gray-100 dark:border-gray-700/50" : ""}>
                                        <td className="py-4 px-6 text-gray-700 dark:text-gray-300 text-sm">
                                            {row.feature}
                                        </td>
                                        <td className="py-4 px-6 text-center text-gray-600 dark:text-gray-400 text-sm">
                                            {row.free}
                                        </td>
                                        <td className="py-4 px-6 text-center text-sm">
                                            {row.pro === "Unlimited" ? (
                                                <span className="inline-flex items-center gap-1 text-green-600 dark:text-green-400 font-medium">
                                                    <FaInfinity className="w-4 h-4" />
                                                    Unlimited
                                                </span>
                                            ) : (
                                                <span className={row.pro === "✓" ? "text-green-600 dark:text-green-400" : "text-gray-600 dark:text-gray-400"}>
                                                    {row.pro}
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-4">
                        {[
                            {
                                q: "What payment methods do you accept?",
                                a: "We accept all major credit/debit cards (Visa, Mastercard, Amex), UPI, Paytm, Google Pay, and net banking via Razorpay."
                            },
                            {
                                q: "What counts as an AI generation?",
                                a: "Each time you use one of our AI-powered tools (title generator, description writer, tag generator, etc.), it counts as one generation. Free users get 5 per day."
                            },
                            {
                                q: "When do my daily limits reset?",
                                a: "Your usage limits reset every 24 hours from your first generation of the day."
                            },
                            {
                                q: "Can I cancel my Pro subscription?",
                                a: "Yes! You can cancel anytime. You'll keep Pro access until the end of your billing period."
                            },
                            {
                                q: "Is there a refund policy?",
                                a: "Yes, we offer a 7-day money-back guarantee if you're not satisfied with Pro."
                            },
                        ].map((faq, i) => (
                            <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                                    {faq.q}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">
                                    {faq.a}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
