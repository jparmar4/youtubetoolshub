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
            { text: "2 uses per day (1 image)", included: true, highlight: false },
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
        gradient: "from-emerald-600 to-orange-500",
        isPaid: true,
    },
];

const comparison = [
    { feature: "Total Uses", free: "2 per day (excl. images)", pro: "Unlimited" },
    { feature: "Image Generations", free: "1 per day", pro: "Unlimited" },
    { feature: "All YouTube Tools", free: "✓", pro: "✓" },
    { feature: "Export & Download", free: "✓", pro: "✓" },
    { feature: "Priority Processing", free: "—", pro: "✓" },
    { feature: "Ad-Free Experience", free: "—", pro: "✓" },
    { feature: "Priority Support", free: "—", pro: "✓" },
];

export default function PricingClient() {
    const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

    return (
        <div className="min-h-screen py-12 bg-gray-50 dark:bg-gray-900">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                        Simple, Honest Pricing
                    </h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
                        Start free, upgrade when you need more. No hidden fees, cancel anytime.
                    </p>

                    {/* Billing Toggle */}
                    <div className="inline-flex items-center bg-white rounded-xl p-1 shadow-md border border-slate-100">
                        <button
                            onClick={() => setBillingCycle("monthly")}
                            className={`px-6 py-2 rounded-lg font-medium transition-all ${billingCycle === "monthly"
                                ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-sm"
                                : "text-slate-600 hover:text-slate-900"
                                }`}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => setBillingCycle("yearly")}
                            className={`px-6 py-2 rounded-lg font-medium transition-all ${billingCycle === "yearly"
                                ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-sm"
                                : "text-slate-600 hover:text-slate-900"
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
                        const isPro = plan.name === "Pro";
                        // Override gradient relative to old plan for safety, but we can just force it if we want
                        const gradient = isPro ? "from-purple-600 to-fuchsia-600 shadow-purple-500/30" : "from-slate-700 to-slate-800";

                        return (
                            <div
                                key={plan.name}
                                className={`
                                    relative bg-white rounded-2xl overflow-hidden
                                    ${plan.popular
                                        ? "ring-2 ring-purple-500 shadow-xl shadow-purple-500/20"
                                        : "border border-slate-200 shadow-lg"
                                    }
                                `}
                            >
                                {/* Header */}
                                <div className={`bg-gradient-to-r ${gradient} p-8 text-white`}>
                                    {plan.popular && (
                                        <span className="absolute top-6 right-6 bg-white text-purple-700 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                                            Most Popular
                                        </span>
                                    )}
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="p-3 bg-white/20 rounded-xl">
                                            <Icon className="w-6 h-6" />
                                        </div>
                                        <h2 className="text-3xl font-bold">{plan.name}</h2>
                                    </div>
                                    <div className="flex items-baseline gap-1 mt-6">
                                        <span className="text-5xl font-bold">
                                            {plan.isPaid
                                                ? billingCycle === "yearly"
                                                    ? plan.yearlyPrice
                                                    : plan.price
                                                : plan.price}
                                        </span>
                                        <span className="text-white/80 text-lg font-medium">
                                            {plan.isPaid
                                                ? billingCycle === "yearly"
                                                    ? "/year"
                                                    : plan.period
                                                : plan.period}
                                        </span>
                                    </div>
                                    {plan.isPaid && (
                                        <p className="text-sm text-white/70 mt-2 font-medium">
                                            {billingCycle === "yearly"
                                                ? `${plan.yearlyPriceUSD}/year (Save 17%)`
                                                : `${plan.priceUSD}/month`}
                                        </p>
                                    )}
                                    <p className="text-white/90 mt-4 font-medium">{plan.description}</p>
                                </div>

                                {/* Features */}
                                <div className="p-8">
                                    <ul className="space-y-4 mb-8">
                                        {plan.features.map((feature, i) => (
                                            <li key={i} className="flex items-start gap-3">
                                                {feature.included ? (
                                                    <span className={`flex-shrink-0 w-5 h-5 mt-0.5 rounded-full flex items-center justify-center ${feature.highlight ? 'bg-purple-600' : 'bg-purple-100'}`}>
                                                        {feature.highlight ? (
                                                            <FaCheck className="w-3 h-3 text-white" />
                                                        ) : (
                                                            <FaCheck className="w-3 h-3 text-purple-600" />
                                                        )}
                                                    </span>
                                                ) : (
                                                    <span className="flex-shrink-0 w-5 h-5 mt-0.5 rounded-full bg-slate-100 flex items-center justify-center">
                                                        <FaTimes className="w-3 h-3 text-slate-400" />
                                                    </span>
                                                )}
                                                <span className={`text-base leading-tight ${feature.included ? 'text-slate-700' : 'text-slate-400'} ${feature.highlight ? 'font-semibold' : ''}`}>
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
                                            className="block w-full py-4 px-6 rounded-xl font-bold text-center transition-all bg-slate-100 hover:bg-slate-200 text-slate-900"
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
                <div className="max-w-4xl mx-auto mb-20">
                    <h2 className="text-3xl font-bold text-slate-900 text-center mb-10">
                        Compare Plans
                    </h2>
                    <div className="bg-white rounded-2xl shadow-xl shadow-purple-900/5 overflow-hidden border border-slate-100">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-slate-100 bg-slate-50/50">
                                    <th className="text-left py-5 px-8 font-bold text-slate-900">Feature</th>
                                    <th className="text-center py-5 px-8 font-bold text-slate-900">Free</th>
                                    <th className="text-center py-5 px-8 font-bold text-purple-600">
                                        <span className="inline-flex items-center gap-2">
                                            <FaCrown />
                                            Pro
                                        </span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {comparison.map((row, i) => (
                                    <tr key={i} className={i !== comparison.length - 1 ? "border-b border-slate-50" : ""}>
                                        <td className="py-5 px-8 text-slate-700 font-medium text-sm md:text-base">
                                            {row.feature}
                                        </td>
                                        <td className="py-5 px-8 text-center text-slate-500 text-sm md:text-base">
                                            {row.free}
                                        </td>
                                        <td className="py-5 px-8 text-center text-sm md:text-base">
                                            {row.pro === "Unlimited" ? (
                                                <span className="inline-flex items-center gap-1.5 text-purple-600 font-bold bg-purple-50 px-3 py-1 rounded-full">
                                                    <FaInfinity className="w-3 h-3" />
                                                    Unlimited
                                                </span>
                                            ) : (
                                                <span className={row.pro === "✓" ? "text-purple-600 font-bold text-lg" : "text-slate-500"}>
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
                    <h2 className="text-2xl font-bold text-slate-900 text-center mb-8">
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
                                a: "Each time you use one of our AI-powered tools (title generator, description writer, tag generator, etc.), it counts as one generation. Free users get 2 generations per day."
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
                            <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
                                <h3 className="font-semibold text-slate-900 mb-2">
                                    {faq.q}
                                </h3>
                                <p className="text-slate-600 text-sm">
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
