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
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative overflow-hidden hero-gradient-light dark:hero-gradient py-16 lg:py-20">
                <div className="absolute inset-0 bg-dots opacity-20" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-4xl mx-auto">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-400 to-indigo-500 text-white mb-6 shadow-lg">
                            <FaFileContract className="w-8 h-8" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                            Terms of Use
                        </h1>
                    </div>
                </div>
            </section>

            {/* Quick Summary */}
            <section className="py-8 bg-white dark:bg-gray-900">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-200 dark:border-blue-800">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 flex-shrink-0 rounded-lg bg-blue-500 flex items-center justify-center text-white">
                                <FaHandshake className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">Quick Summary</h3>
                                <p className="text-blue-800 dark:text-blue-200 text-sm">
                                    By using {siteConfig.name}, you agree to use our free tools responsibly and legally.
                                    Our tools are provided &quot;as is&quot; for your convenience. You own any content you create using our tools.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="py-12 bg-gray-50 dark:bg-gray-800/50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 md:p-12 space-y-10">

                        {/* Acceptance */}
                        <div>
                            <h2 className="flex items-center gap-3 text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                <FaCheckCircle className="text-green-500" />
                                Acceptance of Terms
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                By accessing and using {siteConfig.name}, you accept and agree to be bound by these
                                Terms of Use. If you do not agree to these terms, please do not use our services.
                                These terms apply to all visitors, users, and others who access or use the Service.
                            </p>
                        </div>

                        {/* Use of Services */}
                        <div>
                            <h2 className="flex items-center gap-3 text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                <FaHandshake className="text-blue-500" />
                                Use of Services
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                                You agree to use our tools and services only for lawful purposes and in accordance
                                with these terms.
                            </p>

                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Allowed */}
                                <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                                    <h4 className="flex items-center gap-2 font-semibold text-green-700 dark:text-green-300 mb-4">
                                        <FaCheckCircle className="w-5 h-5" />
                                        You CAN
                                    </h4>
                                    <ul className="space-y-3 text-green-700 dark:text-green-300 text-sm">
                                        <li className="flex items-start gap-2">
                                            <FaCheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                            <span>Use tools for personal and commercial projects</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <FaCheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                            <span>Share content you create with our tools</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <FaCheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                            <span>Recommend our tools to other creators</span>
                                        </li>
                                    </ul>
                                </div>

                                {/* Not Allowed */}
                                <div className="p-6 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800">
                                    <h4 className="flex items-center gap-2 font-semibold text-red-700 dark:text-red-300 mb-4">
                                        <FaTimesCircle className="w-5 h-5" />
                                        You CANNOT
                                    </h4>
                                    <ul className="space-y-3 text-red-700 dark:text-red-300 text-sm">
                                        <li className="flex items-start gap-2">
                                            <FaTimesCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                            <span>Use services for illegal activities</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <FaTimesCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                            <span>Attempt to hack or disrupt our systems</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <FaTimesCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                            <span>Use automated bots excessively</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Intellectual Property */}
                        <div>
                            <h2 className="flex items-center gap-3 text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                <FaGavel className="text-purple-500" />
                                Intellectual Property
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                The content, features, and functionality of {siteConfig.name} are owned by us and
                                are protected by copyright, trademark, and other intellectual property laws.
                                <strong className="text-gray-900 dark:text-white"> You retain full ownership of any content you create using our tools.</strong>
                            </p>
                        </div>

                        {/* AI-Generated Content */}
                        <div>
                            <h2 className="flex items-center gap-3 text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                <FaBrain className="text-indigo-500" />
                                AI-Generated Content
                            </h2>
                            <div className="p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-200 dark:border-indigo-800 mb-4">
                                <p className="text-indigo-800 dark:text-indigo-200 text-sm">
                                    <strong>Important:</strong> Content generated by our AI tools is provided for informational and creative purposes only.
                                </p>
                            </div>
                            <ul className="space-y-3">
                                {[
                                    "You are responsible for reviewing AI-generated content before using it",
                                    "We do not guarantee the accuracy or appropriateness of AI outputs",
                                    "AI suggestions should be used as a starting point, not final content",
                                    "Always verify facts and claims in AI-generated content"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-gray-600 dark:text-gray-300">
                                        <FaExclamationTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Disclaimer */}
                        <div>
                            <h2 className="flex items-center gap-3 text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                <FaExclamationTriangle className="text-yellow-500" />
                                Disclaimer of Warranties
                            </h2>
                            <div className="p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800">
                                <p className="text-yellow-800 dark:text-yellow-200 leading-relaxed">
                                    Our services are provided <strong>&quot;as is&quot;</strong> and <strong>&quot;as available&quot;</strong> without
                                    warranties of any kind, either express or implied. We do not guarantee that our services
                                    will be uninterrupted, secure, or error-free. We reserve the right to modify or
                                    discontinue services at any time.
                                </p>
                            </div>
                        </div>

                        {/* Limitation of Liability */}
                        <div>
                            <h2 className="flex items-center gap-3 text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                <FaGavel className="text-gray-500" />
                                Limitation of Liability
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                To the fullest extent permitted by law, {siteConfig.name} shall not be liable for any
                                indirect, incidental, special, consequential, or punitive damages arising from your
                                use of our services, including but not limited to loss of profits, data, or other
                                intangible losses.
                            </p>
                        </div>

                        {/* Changes */}
                        <div>
                            <h2 className="flex items-center gap-3 text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                <FaFileContract className="text-blue-500" />
                                Changes to Terms
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                We reserve the right to modify these terms at any time. We will notify users of
                                significant changes by posting a notice on our website. Your continued use of the
                                Service after changes constitutes acceptance of the new terms.
                            </p>
                        </div>

                        {/* Contact */}
                        <div className="p-6 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-xl">
                            <h2 className="flex items-center gap-3 text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                <FaEnvelope className="text-red-500" />
                                Questions?
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300">
                                For questions about these Terms of Use, contact us at{" "}
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
