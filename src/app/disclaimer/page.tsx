import { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import LegalPageShell from "@/components/layout/LegalPageShell";
import { FaExclamationTriangle, FaInfoCircle, FaLink, FaTools, FaBalanceScale, FaEnvelope } from "react-icons/fa";

export const metadata: Metadata = {
    title: "Disclaimer",
    description: "Disclaimer for YouTube Tools Hub - Important information about our tools, content accuracy, and limitations.",
    alternates: {
        canonical: "/disclaimer",

    },
};

const highlights = [
    { icon: FaInfoCircle, title: "Educational Purpose", description: "Our tools are designed to help and educate content creators" },
    { icon: FaTools, title: "As-Is Service", description: "Tools are provided without warranties of any kind" },
    { icon: FaLink, title: "Third-Party Links", description: "We're not responsible for external linked content" },
    { icon: FaBalanceScale, title: "Fair Use", description: "Use our tools in compliance with YouTube's terms" },
];

export default function DisclaimerPage() {
    return (
        <LegalPageShell
            accent="amber"
            title="Disclaimer"
            icon={<FaExclamationTriangle className="w-8 h-8" />}
            highlights={
                <section className="py-10 bg-white border-b border-slate-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {highlights.map((item, i) => (
                                <div key={i} className="card-3d flex items-start gap-4 p-6 rounded-2xl">
                                    <div className="w-10 h-10 flex-shrink-0 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700">
                                        <item.icon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-900 mb-1">{item.title}</h3>
                                        <p className="text-slate-600 text-sm">{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            }
        >

            <div className="space-y-8">
                {/* General Disclaimer */}
                <div className="card-3d rounded-2xl p-6 sm:p-8">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4 font-outfit">
                        General Disclaimer
                    </h2>
                    <div className="space-y-4 text-slate-600 leading-relaxed">
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
                <div className="card-3d rounded-2xl p-6 sm:p-8">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4 font-outfit">
                        YouTube &amp; Third-Party Affiliation
                    </h2>
                    <div className="space-y-4 text-slate-600 leading-relaxed">
                        <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
                            <p className="font-medium text-amber-900">
                                <FaExclamationTriangle className="inline mr-2 text-amber-600" />
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
                <div className="card-3d rounded-2xl p-6 sm:p-8">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4 font-outfit">
                        Tool Accuracy &amp; Results
                    </h2>
                    <div className="space-y-4 text-slate-600 leading-relaxed">
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
                <div className="card-3d rounded-2xl p-6 sm:p-8">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4 font-outfit">
                        External Links
                    </h2>
                    <div className="space-y-4 text-slate-600 leading-relaxed">
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
                <div className="card-3d rounded-2xl p-6 sm:p-8">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4 font-outfit">
                        Copyright &amp; Fair Use
                    </h2>
                    <div className="space-y-4 text-slate-600 leading-relaxed">
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
                <div className="card-3d rounded-2xl p-6 sm:p-8">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4 font-outfit">
                        Not Professional Advice
                    </h2>
                    <div className="space-y-4 text-slate-600 leading-relaxed">
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
                <div className="card-3d rounded-2xl p-6 sm:p-8">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4 font-outfit">
                        Changes to This Disclaimer
                    </h2>
                    <div className="space-y-4 text-slate-600 leading-relaxed">
                        <p>
                            We reserve the right to modify or replace this disclaimer at any time. Any changes will
                            be effective immediately upon posting on this page. Your continued use of our website
                            after any modifications indicates your acceptance of the updated disclaimer.
                        </p>
                    </div>
                </div>

                {/* Contact */}
                <div className="card-3d rounded-2xl p-6 sm:p-8">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3 font-outfit">
                        <FaEnvelope className="text-purple-600" />
                        Questions?
                    </h2>
                    <div className="space-y-4 text-slate-600">
                        <p>
                            If you have any questions about this disclaimer, please contact us:
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                href="/contact"
                                className="btn-3d-primary inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold"
                            >
                                Contact Us
                            </Link>
                            <a
                                href={`mailto:${siteConfig.contact.email}`}
                                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-900 rounded-xl font-semibold transition-colors"
                            >
                                <FaEnvelope className="text-purple-600" />
                                {siteConfig.contact.email}
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Related Links */}
            <div className="mt-10 pt-8 border-t border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-4 font-outfit">
                    Related Pages
                </h3>
                <div className="flex flex-wrap gap-6">
                    <Link
                        href="/privacy-policy"
                        className="text-purple-600 hover:text-purple-700 font-bold hover:underline"
                    >
                        Privacy Policy →
                    </Link>
                    <Link
                        href="/terms-of-use"
                        className="text-purple-600 hover:text-purple-700 font-bold hover:underline"
                    >
                        Terms of Use →
                    </Link>
                </div>
            </div>

        </LegalPageShell>
    );
}
