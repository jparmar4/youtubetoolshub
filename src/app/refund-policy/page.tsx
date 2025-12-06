import { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import {
    FaUndo,
    FaCheckCircle,
    FaTimesCircle,
    FaCreditCard,
    FaCalendarAlt,
    FaEnvelope,
    FaExclamationTriangle,
    FaHandshake,
    FaBan,
} from "react-icons/fa";

export const metadata: Metadata = {
    title: "Refund & Cancellation Policy",
    description: "Refund and Cancellation Policy for YouTube Tools Hub subscriptions. Learn about our refund terms, cancellation process, and billing policies.",
};

const highlights = [
    { icon: FaCreditCard, title: "Secure Payments", description: "All payments processed securely via Razorpay" },
    { icon: FaCalendarAlt, title: "Cancel Anytime", description: "No lock-in, cancel your subscription anytime" },
    { icon: FaHandshake, title: "Fair Policy", description: "Transparent refund terms for your peace of mind" },
    { icon: FaUndo, title: "7-Day Window", description: "Billing error claims within 7 days of charge" },
];

export default function RefundPolicyPage() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative overflow-hidden hero-gradient-light dark:hero-gradient py-16 lg:py-20">
                <div className="absolute inset-0 bg-dots opacity-20" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-4xl mx-auto">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-400 to-red-500 text-white mb-6 shadow-lg">
                            <FaUndo className="w-8 h-8" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                            Refund & Cancellation Policy
                        </h1>
                        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                            Thank you for subscribing to {siteConfig.name}
                        </p>
                    </div>
                </div>
            </section>

            {/* Policy Highlights */}
            <section className="py-12 bg-white dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {highlights.map((item, i) => (
                            <div key={i} className="flex items-start gap-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
                                <div className="w-10 h-10 flex-shrink-0 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400">
                                    <item.icon className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{item.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="py-12 bg-gray-50 dark:bg-gray-800/50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 md:p-12 space-y-10">

                        {/* 1. Subscription Payments */}
                        <div>
                            <h2 className="flex items-center gap-3 text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                <FaCreditCard className="text-blue-500" />
                                1. Subscription Payments
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                All subscription charges are billed automatically based on your selected plan using{" "}
                                <strong className="text-gray-900 dark:text-white">Razorpay</strong>, our trusted payment
                                gateway. Payments are processed securely with industry-standard encryption.
                            </p>
                        </div>

                        {/* 2. Refunds */}
                        <div>
                            <h2 className="flex items-center gap-3 text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                <FaUndo className="text-orange-500" />
                                2. Refund Policy
                            </h2>
                            <div className="p-6 bg-orange-50 dark:bg-orange-900/20 rounded-xl border border-orange-200 dark:border-orange-800 mb-6">
                                <div className="flex items-start gap-3">
                                    <FaExclamationTriangle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                                    <p className="text-orange-800 dark:text-orange-200">
                                        Since our product is a <strong>digital service with immediate access</strong>, we do not
                                        offer refunds after payment is completed.
                                    </p>
                                </div>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                                However, in rare cases of valid billing errors, refunds may be approved at our discretion within
                                <strong className="text-gray-900 dark:text-white"> 7 days</strong> of the charge:
                            </p>
                            <div className="grid sm:grid-cols-3 gap-4">
                                {[
                                    { title: "Duplicate Charges", desc: "Charged twice for the same period" },
                                    { title: "Failed Access", desc: "Unable to access paid features" },
                                    { title: "Accidental Purchase", desc: "Unintended subscription" },
                                ].map((item, i) => (
                                    <div key={i} className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                                        <FaCheckCircle className="w-5 h-5 text-green-500 mb-2" />
                                        <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">{item.title}</h4>
                                        <p className="text-gray-600 dark:text-gray-400 text-xs">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 3. Subscription Cancellation */}
                        <div>
                            <h2 className="flex items-center gap-3 text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                <FaCalendarAlt className="text-purple-500" />
                                3. Subscription Cancellation
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300 mb-6">
                                You may cancel your subscription anytime through:
                            </p>
                            <div className="space-y-4 mb-6">
                                <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                                    <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold text-sm">1</div>
                                    <p className="text-gray-700 dark:text-gray-300">
                                        The <strong>Razorpay subscription cancel link</strong> (sent to your email)
                                    </p>
                                </div>
                                <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                                    <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold text-sm">2</div>
                                    <p className="text-gray-700 dark:text-gray-300">
                                        Contacting our <strong>support team</strong> via email
                                    </p>
                                </div>
                            </div>

                            <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                                <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-3">After Cancellation:</h4>
                                <ul className="space-y-2">
                                    <li className="flex items-start gap-3 text-blue-800 dark:text-blue-200">
                                        <FaCheckCircle className="w-4 h-4 mt-1 flex-shrink-0" />
                                        <span>You will continue to have access until the current billing period ends</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-blue-800 dark:text-blue-200">
                                        <FaCheckCircle className="w-4 h-4 mt-1 flex-shrink-0" />
                                        <span>No future payments will be charged</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* 4. No Partial Refunds */}
                        <div>
                            <h2 className="flex items-center gap-3 text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                <FaBan className="text-red-500" />
                                4. No Partial Refunds
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                                We do not provide refunds for the following:
                            </p>
                            <div className="p-6 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800">
                                <ul className="space-y-3">
                                    {[
                                        "Partial billing periods",
                                        "Non-usage of service",
                                        "User-initiated cancellations mid-cycle",
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-red-700 dark:text-red-300">
                                            <FaTimesCircle className="w-4 h-4 flex-shrink-0" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* 5. Contact */}
                        <div className="p-6 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-xl">
                            <h2 className="flex items-center gap-3 text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                <FaEnvelope className="text-red-500" />
                                5. Contact for Refund Queries
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                                If you have any questions about refunds or cancellations, please contact us:
                            </p>
                            <Link
                                href={`mailto:${siteConfig.contact.email}`}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-orange-500 text-white font-medium rounded-xl hover:from-red-700 hover:to-orange-600 transition-all shadow-lg hover:shadow-xl"
                            >
                                <FaEnvelope className="w-4 h-4" />
                                {siteConfig.contact.email}
                            </Link>
                        </div>

                        {/* Last Updated */}
                        <div className="text-center pt-6 border-t border-gray-200 dark:border-gray-700">
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Last updated: December 2024
                            </p>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
}
