import { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { FaShieldAlt, FaLock, FaCookie, FaUserShield, FaDatabase, FaEnvelope, FaExclamationTriangle, FaCheckCircle } from "react-icons/fa";

export const metadata: Metadata = {
    title: "Privacy Policy",
    description: "Privacy Policy for YouTube Tools Hub - Learn how we handle your data and protect your privacy.",
};

const highlights = [
    { icon: FaShieldAlt, title: "No Data Storage", description: "Tool inputs are processed in real-time and never stored" },
    { icon: FaLock, title: "SSL Encrypted", description: "All connections are secured with industry-standard encryption" },
    { icon: FaCookie, title: "Minimal Cookies", description: "Only essential cookies for site functionality" },
    { icon: FaUserShield, title: "GDPR Compliant", description: "We respect your data rights and privacy laws" },
];

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative overflow-hidden hero-gradient-light dark:hero-gradient py-16 lg:py-20">
                <div className="absolute inset-0 bg-dots opacity-20" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-4xl mx-auto">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-500 text-white mb-6 shadow-lg">
                            <FaShieldAlt className="w-8 h-8" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                            Privacy Policy
                        </h1>
                    </div>
                </div>
            </section>

            {/* Privacy Highlights */}
            <section className="py-12 bg-white dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {highlights.map((item, i) => (
                            <div key={i} className="flex items-start gap-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
                                <div className="w-10 h-10 flex-shrink-0 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
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

                        {/* Introduction */}
                        <div>
                            <h2 className="flex items-center gap-3 text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                <FaCheckCircle className="text-green-500" />
                                Introduction
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                Welcome to {siteConfig.name}. We respect your privacy and are committed to protecting
                                your personal data. This privacy policy explains how we handle information when you
                                use our website and tools. We believe in transparency and want you to understand
                                exactly how your data is used.
                            </p>
                        </div>

                        {/* Information We Collect */}
                        <div>
                            <h2 className="flex items-center gap-3 text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                <FaDatabase className="text-blue-500" />
                                Information We Collect
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                                We collect minimal information to provide our services:
                            </p>
                            <div className="space-y-4">
                                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border-l-4 border-blue-500">
                                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Usage Data</h4>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                                        Basic analytics about how you use our tools (page views, tool usage counts). This helps us improve our service.
                                    </p>
                                </div>
                                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border-l-4 border-green-500">
                                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Tool Inputs</h4>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                                        Data you enter into our tools is processed in real-time and is <strong>not stored</strong> on our servers.
                                    </p>
                                </div>
                                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border-l-4 border-yellow-500">
                                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Cookies</h4>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                                        We use essential cookies for site functionality and optional analytics cookies with your consent.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* How We Use Your Information */}
                        <div>
                            <h2 className="flex items-center gap-3 text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                <FaUserShield className="text-purple-500" />
                                How We Use Your Information
                            </h2>
                            <ul className="space-y-3">
                                {[
                                    "To provide and maintain our tools and services",
                                    "To improve user experience and optimize our website",
                                    "To analyze usage patterns and trends",
                                    "To display relevant advertisements",
                                    "To respond to your inquiries and provide support"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-gray-600 dark:text-gray-300">
                                        <FaCheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Data Security */}
                        <div>
                            <h2 className="flex items-center gap-3 text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                <FaLock className="text-emerald-500" />
                                Data Security
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                We implement appropriate security measures to protect your information, including
                                SSL encryption for all connections. However, no method of transmission over the
                                Internet is 100% secure, and we cannot guarantee absolute security.
                            </p>
                        </div>

                        {/* Third-Party Services */}
                        <div>
                            <h2 className="flex items-center gap-3 text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                <FaExclamationTriangle className="text-orange-500" />
                                Third-Party Services
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                We may use third-party services for analytics (such as Google Analytics) and advertising.
                                These services may collect information about your visit according to their own privacy policies.
                                We recommend reviewing their privacy policies for more information.
                            </p>
                        </div>

                        {/* Your Rights */}
                        <div>
                            <h2 className="flex items-center gap-3 text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                <FaUserShield className="text-indigo-500" />
                                Your Rights
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                                Depending on your location, you may have the following rights:
                            </p>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {[
                                    { title: "Access", desc: "Request access to your personal data" },
                                    { title: "Correction", desc: "Request correction of inaccurate data" },
                                    { title: "Deletion", desc: "Request deletion of your data" },
                                    { title: "Portability", desc: "Request transfer of your data" },
                                ].map((right, i) => (
                                    <div key={i} className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                                        <h4 className="font-semibold text-indigo-700 dark:text-indigo-300 mb-1">{right.title}</h4>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm">{right.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Contact */}
                        <div className="p-6 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-xl">
                            <h2 className="flex items-center gap-3 text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                <FaEnvelope className="text-red-500" />
                                Contact Us
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300">
                                If you have questions about this Privacy Policy or wish to exercise your rights, please contact us at{" "}
                                <Link href={`mailto:${siteConfig.contact.email}`} className="text-red-500 hover:underline font-medium">
                                    {siteConfig.contact.email}
                                </Link>
                            </p>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
}
