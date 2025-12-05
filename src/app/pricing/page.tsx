import { Metadata } from "next";
import Link from "next/link";
import { FaCheck, FaTimes, FaCrown, FaRocket, FaInfinity } from "react-icons/fa";

export const metadata: Metadata = {
    title: "Pricing - Free & Pro Plans",
    description: "Choose your plan. Free tier includes 5 AI generations per day. Pro unlocks unlimited generations and premium features.",
};

const plans = [
    {
        name: "Free",
        price: "$0",
        period: "forever",
        description: "Perfect for trying out our tools",
        icon: FaRocket,
        features: [
            { text: "5 total uses per day (shared)", included: true, highlight: false },
            { text: "1 image generation (from 5)", included: true, highlight: false },
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
    },
    {
        name: "Pro",
        price: "$9",
        period: "/month",
        yearlyPrice: "$86",
        description: "For serious content creators",
        icon: FaCrown,
        features: [
            { text: "Unlimited AI generations", included: true, highlight: true },
            { text: "10 image generations per day", included: true, highlight: true },
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
    },
];

const comparison = [
    { feature: "Total Uses (per day)", free: "5 (shared)", pro: "Unlimited" },
    { feature: "Image Generations (per day)", free: "1 (from 5)", pro: "10" },
    { feature: "All YouTube Tools", free: "✓", pro: "✓" },
    { feature: "Export & Download", free: "✓", pro: "✓" },
    { feature: "Priority Processing", free: "—", pro: "✓" },
    { feature: "Ad-Free Experience", free: "—", pro: "✓" },
    { feature: "Priority Support", free: "—", pro: "✓" },
];

export default function PricingPage() {
    return (
        <div className="min-h-screen py-12 bg-gray-50 dark:bg-gray-900">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        Simple, Honest Pricing
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Start free, upgrade when you need more. No hidden fees, cancel anytime.
                    </p>
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
                                        <span className="text-4xl font-bold">{plan.price}</span>
                                        <span className="text-white/80">{plan.period}</span>
                                    </div>
                                    {plan.yearlyPrice && (
                                        <p className="text-sm text-white/70 mt-1">
                                            or {plan.yearlyPrice}/year (save 20%)
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

                                    <Link
                                        href={plan.href}
                                        className={`block w-full py-3 px-6 rounded-xl font-medium text-center transition-all ${plan.popular
                                            ? "bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white shadow-lg shadow-red-500/25"
                                            : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white"
                                            }`}
                                    >
                                        {plan.cta}
                                    </Link>
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
                                q: "What counts as an AI generation?",
                                a: "Each time you use one of our AI-powered tools (title generator, description writer, tag generator, etc.), it counts as one generation. Free users get 5 per day."
                            },
                            {
                                q: "What about image generations?",
                                a: "Image generations are for our thumbnail prompt generator and similar tools. Free users get 1 per day, Pro users get 10 per day."
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
                                q: "Is there a free trial for Pro?",
                                a: "The Free plan is essentially a trial - you can use all tools with daily limits. Upgrade to Pro when you need more."
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
