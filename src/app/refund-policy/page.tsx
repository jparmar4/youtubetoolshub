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
    alternates: {
        canonical: "/refund-policy",
    },
};

const highlights = [
    { icon: FaCreditCard, title: "Secure Payments", description: "All payments processed securely via Razorpay" },
    { icon: FaCalendarAlt, title: "Cancel Anytime", description: "No lock-in, cancel your subscription anytime" },
    { icon: FaHandshake, title: "Fair Policy", description: "Transparent refund terms for your peace of mind" },
    { icon: FaUndo, title: "7-Day Window", description: "Billing error claims within 7 days of charge" },
];

export default function RefundPolicyPage() {
    return (
        <div className="min-h-screen bg-slate-50 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-1/4 w-full h-[500px] bg-fuchsia-200/20 blur-[100px] rounded-full pointer-events-none" />

            {/* Hero Section */}
            <section className="relative pt-24 pb-12 lg:pt-32 lg:pb-16">
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-4xl mx-auto">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-fuchsia-600 to-purple-600 text-white mb-8 shadow-2xl shadow-fuchsia-900/10 transform rotate-3 hover:rotate-6 transition-transform duration-300">
                            <FaUndo className="w-9 h-9" />
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">
                            Refund Policy
                        </h1>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                            Thank you for subscribing to {siteConfig.name}. Please read our cancellation and refund terms.
                        </p>
                    </div>
                </div>
            </section>

            {/* Policy Highlights */}
            <section className="py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {highlights.map((item, i) => (
                            <div key={i} className="flex flex-col items-center text-center p-6 bg-white rounded-2xl border border-slate-100 shadow-xl shadow-purple-900/5 hover:shadow-purple-900/10 transition-shadow">
                                <div className="w-12 h-12 flex-shrink-0 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600 mb-4">
                                    <item.icon className="w-6 h-6" />
                                </div>
                                <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                                <p className="text-slate-500 text-sm leading-relaxed">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="py-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8 md:p-14 space-y-12 relative overflow-hidden">

                        {/* Decorative top border */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-fuchsia-500 via-purple-500 to-indigo-500" />

                        {/* 1. Subscription Payments */}
                        <div>
                            <h2 className="flex items-center gap-3 text-2xl font-bold text-slate-900 mb-6">
                                <span className="p-2 rounded-lg bg-blue-100/50 text-blue-600">
                                    <FaCreditCard className="w-5 h-5" />
                                </span>
                                1. Subscription Payments
                            </h2>
                            <p className="text-slate-600 leading-relaxed text-lg">
                                All subscription charges are billed automatically based on your selected plan using{" "}
                                <strong className="text-slate-900 bg-slate-100 px-2 py-0.5 rounded">Razorpay</strong>, our trusted payment
                                gateway. Payments are processed securely with industry-standard encryption.
                            </p>
                        </div>

                        {/* 2. Refunds */}
                        <div>
                            <h2 className="flex items-center gap-3 text-2xl font-bold text-slate-900 mb-6">
                                <span className="p-2 rounded-lg bg-amber-100/50 text-amber-600">
                                    <FaUndo className="w-5 h-5" />
                                </span>
                                2. Refund Policy
                            </h2>
                            <div className="p-6 bg-amber-50 rounded-2xl border border-amber-100 mb-6">
                                <div className="flex items-start gap-4">
                                    <FaExclamationTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-1" />
                                    <p className="text-amber-900/80 leading-relaxed">
                                        Since our product is a <strong>digital service with immediate access</strong>, we generally do not
                                        offer refunds after payment is completed.
                                    </p>
                                </div>
                            </div>
                            <p className="text-slate-600 mb-6 text-lg">
                                However, in rare cases of valid billing errors, refunds may be approved at our discretion within
                                <strong className="text-slate-900"> 7 days</strong> of the charge:
                            </p>
                            <div className="grid sm:grid-cols-3 gap-4">
                                {[
                                    { title: "Duplicate Charges", desc: "Charged twice for the same period" },
                                    { title: "Failed Access", desc: "Unable to access paid features" },
                                    { title: "Accidental Purchase", desc: "Unintended subscription (unused)" },
                                ].map((item, i) => (
                                    <div key={i} className="p-5 bg-slate-50 rounded-2xl border border-slate-100 hover:border-green-200 hover:bg-green-50/30 transition-colors">
                                        <FaCheckCircle className="w-5 h-5 text-green-500 mb-3" />
                                        <h4 className="font-bold text-slate-900 text-sm mb-1">{item.title}</h4>
                                        <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 3. Subscription Cancellation */}
                        <div>
                            <h2 className="flex items-center gap-3 text-2xl font-bold text-slate-900 mb-6">
                                <span className="p-2 rounded-lg bg-purple-100/50 text-purple-600">
                                    <FaCalendarAlt className="w-5 h-5" />
                                </span>
                                3. Subscription Cancellation
                            </h2>
                            <p className="text-slate-600 mb-6 text-lg">
                                You may cancel your subscription anytime through:
                            </p>
                            <div className="space-y-4 mb-8">
                                <div className="flex items-center gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100">
                                    <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-purple-600/30">1</div>
                                    <p className="text-slate-700 font-medium">
                                        The <strong>Razorpay subscription cancel link</strong> (sent to your email)
                                    </p>
                                </div>
                                <div className="flex items-center gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100">
                                    <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-purple-600/30">2</div>
                                    <p className="text-slate-700 font-medium">
                                        Contacting our <strong>support team</strong> via email
                                    </p>
                                </div>
                            </div>

                            <div className="p-6 bg-blue-50/50 rounded-2xl border border-blue-100">
                                <h4 className="font-bold text-blue-900 mb-3">After Cancellation:</h4>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-3 text-blue-800">
                                        <FaCheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0 text-blue-500" />
                                        <span>You will continue to have access until the current billing period ends</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-blue-800">
                                        <FaCheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0 text-blue-500" />
                                        <span>No future payments will be charged</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* 4. No Partial Refunds */}
                        <div>
                            <h2 className="flex items-center gap-3 text-2xl font-bold text-slate-900 mb-6">
                                <span className="p-2 rounded-lg bg-rose-100/50 text-rose-600">
                                    <FaBan className="w-5 h-5" />
                                </span>
                                4. No Partial Refunds
                            </h2>
                            <p className="text-slate-600 mb-6 text-lg">
                                We do not provide refunds for the following:
                            </p>
                            <div className="p-6 bg-rose-50 rounded-2xl border border-rose-100">
                                <ul className="space-y-4">
                                    {[
                                        "Partial billing periods",
                                        "Non-usage of service",
                                        "User-initiated cancellations mid-cycle",
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-rose-700 font-medium">
                                            <FaTimesCircle className="w-5 h-5 flex-shrink-0" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* 5. Contact */}
                        <div className="p-8 bg-gradient-to-br from-slate-50 to-purple-50/50 rounded-3xl border border-slate-100 text-center sm:text-left">
                            <h2 className="flex items-center justify-center sm:justify-start gap-3 text-2xl font-bold text-slate-900 mb-4">
                                <span className="p-2 rounded-lg bg-purple-100 text-purple-600">
                                    <FaEnvelope className="w-5 h-5" />
                                </span>
                                5. Contact for Refund Queries
                            </h2>
                            <p className="text-slate-600 mb-6 text-lg">
                                If you have any questions about refunds or cancellations, we're here to help:
                            </p>
                            <Link
                                href={`mailto:${siteConfig.contact.email}`}
                                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white font-bold rounded-xl hover:from-purple-700 hover:to-fuchsia-700 transition-all shadow-xl shadow-purple-600/30 hover:shadow-purple-600/40 hover:-translate-y-1"
                            >
                                <FaEnvelope className="w-4 h-4" />
                                {siteConfig.contact.email}
                            </Link>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
}
