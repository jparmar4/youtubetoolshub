import { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { FaShieldAlt, FaLock, FaCookie, FaUserShield, FaDatabase, FaEnvelope, FaExclamationTriangle, FaCheckCircle, FaFlagUsa } from "react-icons/fa";

export const metadata: Metadata = {
    title: "Privacy Policy",
    description: "Privacy Policy for YouTube Tools Hub - Learn how we handle your data and protect your privacy.",
    alternates: {
        canonical: "/privacy-policy",
        languages: {
            "en": "/privacy-policy",
            "x-default": "/privacy-policy",
        },
    },
};

const highlights = [
    { icon: FaShieldAlt, title: "No Data Storage", description: "Tool inputs are processed in real-time and never stored" },
    { icon: FaLock, title: "SSL Encrypted", description: "All connections are secured with industry-standard encryption" },
    { icon: FaCookie, title: "Minimal Cookies", description: "Only essential cookies for site functionality" },
    { icon: FaUserShield, title: "GDPR Compliant", description: "We respect your data rights and privacy laws" },
];

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-slate-50 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-purple-200/20 blur-[100px] rounded-full pointer-events-none" />

            {/* Hero Section */}
            <section className="relative pt-24 pb-12 lg:pt-32 lg:pb-16">
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-4xl mx-auto">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-purple-600 to-fuchsia-600 text-white mb-8 shadow-2xl shadow-purple-900/10 transform rotate-3 hover:rotate-6 transition-transform duration-300">
                            <FaShieldAlt className="w-10 h-10" />
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">
                            Privacy Policy
                        </h1>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                            How we handle your data, protect your privacy, and ensure transparency.
                        </p>
                    </div>
                </div>
            </section>

            {/* Privacy Highlights */}
            <section className="py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {highlights.map((item, i) => (
                            <div key={i} className="flex flex-col items-center text-center p-6 bg-white rounded-2xl border border-slate-100 shadow-xl shadow-purple-900/5 hover:shadow-purple-900/10 transition-shadow">
                                <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600 mb-4">
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
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-fuchsia-500 to-indigo-500" />

                        {/* Introduction */}
                        <div>
                            <h2 className="flex items-center gap-3 text-2xl font-bold text-slate-900 mb-6">
                                <span className="p-2 rounded-lg bg-green-100/50 text-green-600">
                                    <FaCheckCircle className="w-5 h-5" />
                                </span>
                                Introduction
                            </h2>
                            <p className="text-slate-600 leading-relaxed text-lg">
                                Welcome to {siteConfig.name}. We respect your privacy and are committed to protecting
                                your personal data. This privacy policy explains how we handle information when you
                                use our website and tools. We believe in transparency and want you to understand
                                exactly how your data is used.
                            </p>
                        </div>

                        {/* Information We Collect */}
                        <div>
                            <h2 className="flex items-center gap-3 text-2xl font-bold text-slate-900 mb-6">
                                <span className="p-2 rounded-lg bg-blue-100/50 text-blue-600">
                                    <FaDatabase className="w-5 h-5" />
                                </span>
                                Information We Collect
                            </h2>
                            <p className="text-slate-600 mb-6 text-lg">
                                We collect minimal information to provide our services:
                            </p>
                            <div className="space-y-4">
                                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 transition-colors hover:border-blue-200 hover:bg-blue-50/30">
                                    <h4 className="font-bold text-slate-900 mb-2">Usage Data</h4>
                                    <p className="text-slate-600">
                                        Basic analytics about how you use our tools (page views, tool usage counts). This helps us improve our service.
                                    </p>
                                </div>
                                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 transition-colors hover:border-green-200 hover:bg-green-50/30">
                                    <h4 className="font-bold text-slate-900 mb-2">Tool Inputs</h4>
                                    <p className="text-slate-600">
                                        Data you enter into our tools is processed in real-time and is <strong>not stored</strong> on our servers.
                                    </p>
                                </div>
                                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 transition-colors hover:border-amber-200 hover:bg-amber-50/30">
                                    <h4 className="font-bold text-slate-900 mb-2">Cookies</h4>
                                    <p className="text-slate-600">
                                        We use essential cookies for site functionality and optional analytics cookies with your consent.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* How We Use Your Information */}
                        <div>
                            <h2 className="flex items-center gap-3 text-2xl font-bold text-slate-900 mb-6">
                                <span className="p-2 rounded-lg bg-purple-100/50 text-purple-600">
                                    <FaUserShield className="w-5 h-5" />
                                </span>
                                How We Use Your Information
                            </h2>
                            <ul className="space-y-4">
                                {[
                                    "To provide and maintain our tools and services",
                                    "To improve user experience and optimize our website",
                                    "To analyze usage patterns and trends",
                                    "To display relevant advertisements",
                                    "To respond to your inquiries and provide support"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-4 text-slate-600 bg-slate-50 p-4 rounded-xl">
                                        <FaCheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Data Security */}
                        <div>
                            <h2 className="flex items-center gap-3 text-2xl font-bold text-slate-900 mb-6">
                                <span className="p-2 rounded-lg bg-emerald-100/50 text-emerald-600">
                                    <FaLock className="w-5 h-5" />
                                </span>
                                Data Security
                            </h2>
                            <p className="text-slate-600 leading-relaxed text-lg">
                                We implement appropriate security measures to protect your information, including
                                SSL encryption for all connections. However, no method of transmission over the
                                Internet is 100% secure, and we cannot guarantee absolute security.
                            </p>
                        </div>

                        {/* Third-Party Services */}
                        <div>
                            <h2 className="flex items-center gap-3 text-2xl font-bold text-slate-900 mb-6">
                                <span className="p-2 rounded-lg bg-orange-100/50 text-orange-600">
                                    <FaExclamationTriangle className="w-5 h-5" />
                                </span>
                                Third-Party Services
                            </h2>
                            <p className="text-slate-600 leading-relaxed text-lg">
                                We may use third-party services for analytics (such as Google Analytics) and advertising.
                                These services may collect information about your visit according to their own privacy policies.
                                We recommend reviewing their privacy policies for more information.
                            </p>
                        </div>

                        {/* Your Rights */}
                        <div>
                            <h2 className="flex items-center gap-3 text-2xl font-bold text-slate-900 mb-6">
                                <span className="p-2 rounded-lg bg-indigo-100/50 text-indigo-600">
                                    <FaUserShield className="w-5 h-5" />
                                </span>
                                Your Rights
                            </h2>
                            <p className="text-slate-600 mb-6 leading-relaxed text-lg">
                                Depending on your location, you may have the following rights:
                            </p>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {[
                                    { title: "Access", desc: "Request access to your personal data" },
                                    { title: "Correction", desc: "Request correction of inaccurate data" },
                                    { title: "Deletion", desc: "Request deletion of your data" },
                                    { title: "Portability", desc: "Request transfer of your data" },
                                ].map((right, i) => (
                                    <div key={i} className="p-5 bg-slate-50 rounded-xl border border-slate-100">
                                        <h4 className="font-bold text-indigo-700 mb-1">{right.title}</h4>
                                        <p className="text-slate-600 text-sm">{right.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>


                        {/* US State Privacy Rights */}
                        <div>
                            <h2 className="flex items-center gap-3 text-2xl font-bold text-slate-900 mb-6">
                                <span className="p-2 rounded-lg bg-red-100/50 text-red-600">
                                    <FaFlagUsa className="w-5 h-5" />
                                </span>
                                US State Privacy Rights
                            </h2>
                            <p className="text-slate-600 mb-6 leading-relaxed text-lg">
                                If you are a resident of certain US states (including California, Virginia, Colorado, Connecticut, Utah, Indiana, Kentucky, and Rhode Island), you may have additional rights regarding your personal data, such as:
                            </p>
                            <ul className="space-y-4">
                                {[
                                    "Right to know what personal data is being collected",
                                    "Right to access your personal data",
                                    "Right to correct inaccurate personal data",
                                    "Right to delete your personal data",
                                    "Right to opt-out of the sale or sharing of your personal data"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-4 text-slate-600 bg-slate-50 p-4 rounded-xl">
                                        <FaCheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact */}
                        <div className="p-8 bg-gradient-to-br from-slate-50 to-purple-50/50 rounded-3xl border border-slate-100">
                            <h2 className="flex items-center gap-3 text-2xl font-bold text-slate-900 mb-4">
                                <span className="p-2 rounded-lg bg-purple-100 text-purple-600">
                                    <FaEnvelope className="w-5 h-5" />
                                </span>
                                Contact Us
                            </h2>
                            <p className="text-slate-600 text-lg">
                                If you have questions about this Privacy Policy or wish to exercise your rights, please contact us at{" "}
                                <Link href={`mailto:${siteConfig.contact.email}`} className="text-purple-600 hover:text-purple-700 font-bold hover:underline">
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
