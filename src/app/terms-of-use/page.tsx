
import { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { FaFileContract, FaCheckCircle, FaTimesCircle, FaBrain, FaExclamationTriangle, FaGavel, FaEnvelope, FaHandshake } from "react-icons/fa";

export const metadata: Metadata = {
    title: "Terms of Use",
    description: "Terms of Use for YouTube Tools Hub - Please read before using our services.",
    alternates: {
        canonical: "/terms-of-use",
    },
};

export default function TermsOfUsePage() {
    return (
        <div className="min-h-screen bg-slate-50 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 right-1/4 w-full h-[500px] bg-indigo-200/20 blur-[100px] rounded-full pointer-events-none" />

            {/* Hero Section */}
            <section className="relative pt-24 pb-12 lg:pt-32 lg:pb-16">
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-4xl mx-auto">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white mb-8 shadow-2xl shadow-indigo-900/10 transform -rotate-3 hover:rotate-0 transition-transform duration-300">
                            <FaFileContract className="w-10 h-10" />
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">
                            Terms of Use
                        </h1>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                            Please read these terms carefully before using our services.
                        </p>
                    </div>
                </div>
            </section>

            {/* Quick Summary */}
            <section className="py-8">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="p-8 bg-white rounded-2xl border border-indigo-100 shadow-xl shadow-indigo-900/5 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500" />
                        <div className="flex items-start gap-6">
                            <div className="w-12 h-12 flex-shrink-0 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                                <FaHandshake className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-indigo-900 mb-2">Quick Summary</h3>
                                <p className="text-indigo-700/80 leading-relaxed">
                                    By using {siteConfig.name}, you agree to use our free tools responsibly and legally.
                                    Our tools are provided &quot;as is&quot; for your convenience. You own any content you create using our tools.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="py-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8 md:p-14 space-y-12">

                        {/* Acceptance */}
                        <div>
                            <h2 className="flex items-center gap-3 text-2xl font-bold text-slate-900 mb-6">
                                <span className="p-2 rounded-lg bg-green-100/50 text-green-600">
                                    <FaCheckCircle className="w-5 h-5" />
                                </span>
                                Acceptance of Terms
                            </h2>
                            <p className="text-slate-600 leading-relaxed text-lg">
                                By accessing and using {siteConfig.name}, you accept and agree to be bound by these
                                Terms of Use. If you do not agree to these terms, please do not use our services.
                                These terms apply to all visitors, users, and others who access or use the Service.
                            </p>
                        </div>

                        {/* Use of Services */}
                        <div>
                            <h2 className="flex items-center gap-3 text-2xl font-bold text-slate-900 mb-6">
                                <span className="p-2 rounded-lg bg-blue-100/50 text-blue-600">
                                    <FaHandshake className="w-5 h-5" />
                                </span>
                                Use of Services
                            </h2>
                            <p className="text-slate-600 mb-8 leading-relaxed text-lg">
                                You agree to use our tools and services only for lawful purposes and in accordance
                                with these terms.
                            </p>

                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Allowed */}
                                <div className="p-8 bg-emerald-50/50 rounded-2xl border border-emerald-100/60 transition-colors hover:border-emerald-200 hover:bg-emerald-50">
                                    <h4 className="flex items-center gap-2 font-bold text-emerald-800 mb-4 text-lg">
                                        <FaCheckCircle className="w-5 h-5" />
                                        You CAN
                                    </h4>
                                    <ul className="space-y-4 text-emerald-700">
                                        <li className="flex items-start gap-3">
                                            <FaCheckCircle className="w-4 h-4 mt-1 flex-shrink-0 opacity-60" />
                                            <span>Use tools for personal and commercial projects</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <FaCheckCircle className="w-4 h-4 mt-1 flex-shrink-0 opacity-60" />
                                            <span>Share content you create with our tools</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <FaCheckCircle className="w-4 h-4 mt-1 flex-shrink-0 opacity-60" />
                                            <span>Recommend our tools to other creators</span>
                                        </li>
                                    </ul>
                                </div>

                                {/* Not Allowed */}
                                <div className="p-8 bg-rose-50/50 rounded-2xl border border-rose-100/60 transition-colors hover:border-rose-200 hover:bg-rose-50">
                                    <h4 className="flex items-center gap-2 font-bold text-rose-800 mb-4 text-lg">
                                        <FaTimesCircle className="w-5 h-5" />
                                        You CANNOT
                                    </h4>
                                    <ul className="space-y-4 text-rose-700">
                                        <li className="flex items-start gap-3">
                                            <FaTimesCircle className="w-4 h-4 mt-1 flex-shrink-0 opacity-60" />
                                            <span>Use services for illegal activities</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <FaTimesCircle className="w-4 h-4 mt-1 flex-shrink-0 opacity-60" />
                                            <span>Attempt to hack or disrupt our systems</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <FaTimesCircle className="w-4 h-4 mt-1 flex-shrink-0 opacity-60" />
                                            <span>Use automated bots excessively</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Intellectual Property */}
                        <div>
                            <h2 className="flex items-center gap-3 text-2xl font-bold text-slate-900 mb-6">
                                <span className="p-2 rounded-lg bg-purple-100/50 text-purple-600">
                                    <FaGavel className="w-5 h-5" />
                                </span>
                                Intellectual Property
                            </h2>
                            <p className="text-slate-600 leading-relaxed text-lg">
                                The content, features, and functionality of {siteConfig.name} are owned by us and
                                are protected by copyright, trademark, and other intellectual property laws.
                                <strong className="text-slate-900 bg-purple-50 px-2 py-1 rounded"> You retain full ownership of any content you create using our tools.</strong>
                            </p>
                        </div>

                        {/* AI-Generated Content */}
                        <div>
                            <h2 className="flex items-center gap-3 text-2xl font-bold text-slate-900 mb-6">
                                <span className="p-2 rounded-lg bg-indigo-100/50 text-indigo-600">
                                    <FaBrain className="w-5 h-5" />
                                </span>
                                AI-Generated Content
                            </h2>
                            <div className="p-6 bg-indigo-50 rounded-2xl border border-indigo-100 mb-6">
                                <p className="text-indigo-800 font-medium">
                                    <strong>Important:</strong> Content generated by our AI tools is provided for informational and creative purposes only.
                                </p>
                            </div>
                            <ul className="space-y-4">
                                {[
                                    "You are responsible for reviewing AI-generated content before using it",
                                    "We do not guarantee the accuracy or appropriateness of AI outputs",
                                    "AI suggestions should be used as a starting point, not final content",
                                    "Always verify facts and claims in AI-generated content"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-4 text-slate-600 bg-slate-50 p-4 rounded-xl">
                                        <FaExclamationTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Disclaimer */}
                        <div>
                            <h2 className="flex items-center gap-3 text-2xl font-bold text-slate-900 mb-6">
                                <span className="p-2 rounded-lg bg-amber-100/50 text-amber-600">
                                    <FaExclamationTriangle className="w-5 h-5" />
                                </span>
                                Disclaimer of Warranties
                            </h2>
                            <div className="p-8 bg-amber-50/50 rounded-2xl border border-amber-100">
                                <p className="text-amber-900/80 leading-relaxed text-lg italic">
                                    &quot;Our services are provided <strong>&quot;as is&quot;</strong> and <strong>&quot;as available&quot;</strong> without
                                    warranties of any kind, either express or implied. We do not guarantee that our services
                                    will be uninterrupted, secure, or error-free. We reserve the right to modify or
                                    discontinue services at any time.&quot;
                                </p>
                            </div>
                        </div>

                        {/* Limitation of Liability */}
                        <div>
                            <h2 className="flex items-center gap-3 text-2xl font-bold text-slate-900 mb-6">
                                <span className="p-2 rounded-lg bg-slate-100 text-slate-600">
                                    <FaGavel className="w-5 h-5" />
                                </span>
                                Limitation of Liability
                            </h2>
                            <p className="text-slate-600 leading-relaxed text-lg">
                                To the fullest extent permitted by law, {siteConfig.name} shall not be liable for any
                                indirect, incidental, special, consequential, or punitive damages arising from your
                                use of our services, including but not limited to loss of profits, data, or other
                                intangible losses.
                            </p>
                        </div>

                        {/* Changes */}
                        <div>
                            <h2 className="flex items-center gap-3 text-2xl font-bold text-slate-900 mb-6">
                                <span className="p-2 rounded-lg bg-fuchsia-100/50 text-fuchsia-600">
                                    <FaFileContract className="w-5 h-5" />
                                </span>
                                Changes to Terms
                            </h2>
                            <p className="text-slate-600 leading-relaxed text-lg">
                                We reserve the right to modify these terms at any time. We will notify users of
                                significant changes by posting a notice on our website. Your continued use of the
                                Service after changes constitutes acceptance of the new terms.
                            </p>
                        </div>

                        {/* Contact */}
                        <div className="p-8 bg-gradient-to-br from-slate-50 to-purple-50/50 rounded-3xl border border-slate-100">
                            <h2 className="flex items-center gap-3 text-2xl font-bold text-slate-900 mb-4">
                                <span className="p-2 rounded-lg bg-purple-100 text-purple-600">
                                    <FaEnvelope className="w-5 h-5" />
                                </span>
                                Questions?
                            </h2>
                            <p className="text-slate-600 text-lg">
                                For questions about these Terms of Use, contact us at{" "}
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
