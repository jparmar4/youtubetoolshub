import { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { FaExclamationTriangle, FaInfoCircle, FaLink, FaTools, FaBalanceScale, FaEnvelope } from "react-icons/fa";

export const metadata: Metadata = {
    title: "Disclaimer",
    description: "Disclaimer for YouTube Tools Hub - Important information about our tools, content accuracy, and limitations.",
};

const highlights = [
    { icon: FaInfoCircle, title: "Educational Purpose", description: "Our tools are designed to help and educate content creators" },
    { icon: FaTools, title: "As-Is Service", description: "Tools are provided without warranties of any kind" },
    { icon: FaLink, title: "Third-Party Links", description: "We're not responsible for external linked content" },
    { icon: FaBalanceScale, title: "Fair Use", description: "Use our tools in compliance with YouTube's terms" },
];

export default function DisclaimerPage() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative overflow-hidden hero-gradient-light dark:hero-gradient py-16 lg:py-20">
                <div className="absolute inset-0 bg-dots opacity-20" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-4xl mx-auto">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-white mb-6 shadow-lg">
                            <FaExclamationTriangle className="w-8 h-8" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                            Disclaimer
                        </h1>
                    </div>
                </div>
            </section>

            {/* Highlights */}
            <section className="py-12 bg-white dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {highlights.map((item, i) => (
                            <div key={i} className="flex items-start gap-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
                                <div className="w-10 h-10 flex-shrink-0 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
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
                    <div className="space-y-12">
                        {/* General Disclaimer */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                General Disclaimer
                            </h2>
                            <div className="space-y-4 text-gray-600 dark:text-gray-400">
                                <p>
                                    The information and tools provided by {siteConfig.name} (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;)
                                    on our website are for general informational and educational purposes only. All information
                                    and tools are provided in good faith; however, we make no representation or warranty of any
                                    kind, express or implied, regarding the accuracy, adequacy, validity, reliability,
                                    availability, or completeness of any information or tools on our site.
                                </p>
                                <p>
                                    Under no circumstance shall we have any liability to you for any loss or damage of any kind
                                    incurred as a result of the use of our website or tools, or reliance on any information
                                    provided on our website. Your use of our website and tools, and your reliance on any
                                    information on our website, is solely at your own risk.
                                </p>
                            </div>
                        </div>

                        {/* No Affiliation */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                YouTube & Third-Party Affiliation
                            </h2>
                            <div className="space-y-4 text-gray-600 dark:text-gray-400">
                                <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                                    <p className="font-medium text-amber-800 dark:text-amber-200">
                                        <FaExclamationTriangle className="inline mr-2" />
                                        {siteConfig.name} is NOT affiliated with, endorsed by, or sponsored by YouTube,
                                        Google, or any of their subsidiaries or affiliates.
                                    </p>
                                </div>
                                <p>
                                    YouTube™ is a trademark of Google LLC. All YouTube-related trademarks, service marks,
                                    trade names, product names, and logos appearing on our website are the property of their
                                    respective owners. Any references to YouTube or its services are for informational purposes
                                    only and do not imply any partnership or endorsement.
                                </p>
                            </div>
                        </div>

                        {/* Tool Accuracy */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                Tool Accuracy & Results
                            </h2>
                            <div className="space-y-4 text-gray-600 dark:text-gray-400">
                                <p>
                                    Our AI-powered tools and calculators provide estimates and suggestions based on algorithms
                                    and available data. These results are intended to be helpful starting points and should not
                                    be considered as guarantees of performance, earnings, or success.
                                </p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>
                                        <strong>Earnings Calculator:</strong> Estimated earnings are based on industry averages
                                        and may vary significantly based on your niche, audience demographics, ad types, and
                                        other factors.
                                    </li>
                                    <li>
                                        <strong>AI-Generated Content:</strong> Titles, descriptions, tags, and other AI-generated
                                        content should be reviewed and edited before use. We do not guarantee that generated
                                        content is unique, accurate, or suitable for your specific needs.
                                    </li>
                                    <li>
                                        <strong>SEO Tools:</strong> SEO suggestions are based on general best practices and may
                                        not reflect YouTube&apos;s current algorithm or policies.
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* External Links */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                External Links
                            </h2>
                            <div className="space-y-4 text-gray-600 dark:text-gray-400">
                                <p>
                                    Our website may contain links to external websites that are not operated by us. If you click
                                    on a third-party link, you will be directed to that third party&apos;s site. We strongly advise
                                    you to review the privacy policy and terms of service of every site you visit.
                                </p>
                                <p>
                                    We have no control over and assume no responsibility for the content, privacy policies, or
                                    practices of any third-party sites or services. Linking to external sites does not
                                    constitute an endorsement of their content.
                                </p>
                            </div>
                        </div>

                        {/* Copyright & Fair Use */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                Copyright & Fair Use
                            </h2>
                            <div className="space-y-4 text-gray-600 dark:text-gray-400">
                                <p>
                                    Some of our tools, such as the Thumbnail Downloader, allow you to access publicly available
                                    content from YouTube. Users are responsible for ensuring their use of downloaded content
                                    complies with:
                                </p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>YouTube&apos;s Terms of Service</li>
                                    <li>Applicable copyright laws</li>
                                    <li>Fair use guidelines</li>
                                    <li>Content creator&apos;s rights</li>
                                </ul>
                                <p>
                                    Downloading thumbnails or other content should only be done for legitimate purposes such as
                                    personal reference, research, or with explicit permission from the content owner. We are
                                    not responsible for any copyright infringement committed by users of our tools.
                                </p>
                            </div>
                        </div>

                        {/* Professional Advice */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                Not Professional Advice
                            </h2>
                            <div className="space-y-4 text-gray-600 dark:text-gray-400">
                                <p>
                                    The content on our website, including blog posts, tool outputs, and any other materials,
                                    is not intended to be a substitute for professional advice. This includes but is not
                                    limited to:
                                </p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Financial or tax advice regarding YouTube earnings</li>
                                    <li>Legal advice regarding copyright, trademarks, or contracts</li>
                                    <li>Business consulting or marketing strategy</li>
                                </ul>
                                <p>
                                    Always consult with qualified professionals for advice specific to your situation.
                                </p>
                            </div>
                        </div>

                        {/* Changes to Disclaimer */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                Changes to This Disclaimer
                            </h2>
                            <div className="space-y-4 text-gray-600 dark:text-gray-400">
                                <p>
                                    We reserve the right to modify or replace this disclaimer at any time. Any changes will
                                    be effective immediately upon posting on this page. Your continued use of our website
                                    after any modifications indicates your acceptance of the updated disclaimer.
                                </p>
                            </div>
                        </div>

                        {/* Contact */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                                <FaEnvelope className="text-blue-500" />
                                Questions?
                            </h2>
                            <div className="space-y-4 text-gray-600 dark:text-gray-400">
                                <p>
                                    If you have any questions about this disclaimer, please contact us:
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Link
                                        href="/contact"
                                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium transition-colors"
                                    >
                                        Contact Us
                                    </Link>
                                    <a
                                        href={`mailto:${siteConfig.contact.email}`}
                                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-xl font-medium transition-colors"
                                    >
                                        <FaEnvelope />
                                        {siteConfig.contact.email}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Related Links */}
                    <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            Related Pages
                        </h3>
                        <div className="flex flex-wrap gap-4">
                            <Link
                                href="/privacy-policy"
                                className="text-red-500 hover:text-red-600 font-medium"
                            >
                                Privacy Policy →
                            </Link>
                            <Link
                                href="/terms-of-use"
                                className="text-red-500 hover:text-red-600 font-medium"
                            >
                                Terms of Use →
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
