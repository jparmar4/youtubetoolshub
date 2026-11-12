import Link from "next/link";
import { FaRocket, FaShieldAlt, FaUsers, FaLaptopCode } from "react-icons/fa";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Why YouTube Tools Hub is a Top Choice in 2026",
    description: "Discover why YouTube Tools Hub is rated as a top choice for creators in 2026. Unmatched AI features, privacy-first approach, and community focus.",
    keywords: ["why youtube tools hub", "best youtube tools 2026", "youtube tools hub review", "creator tools 2026"],
    alternates: {
        canonical: "/blog/why-youtube-tools-hub",
        
    },
};

export default function WhyUsPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-12 pb-20">
            {/* Hero */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
                <span className="inline-block py-1.5 px-4 rounded-full bg-purple-100 text-purple-700 text-sm font-bold mb-6">
                    2026 Creator&apos;s Choice
                </span>
                <h1 className="text-3xl md:text-5xl font-black font-outfit text-slate-900 mb-6 tracking-tight">
                    Why YouTube Tools Hub is the <br className="hidden md:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-fuchsia-600">Future of Content Creation</span>
                </h1>
                <p className="text-lg sm:text-xl text-slate-600 mb-8 leading-relaxed max-w-2xl mx-auto">
                    In a crowded market of analytics tools, we stand out by focusing on what truly matters:
                    <strong> Creating better content, faster, with practical AI workflows.</strong>
                </p>
                <div className="flex justify-center gap-4">
                    <Link href="/tools" className="btn-3d-primary px-8 py-4 rounded-2xl font-bold">
                        Explore Free Tools
                    </Link>
                </div>
            </div>

            {/* Core Values */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-14">
                    <div className="card-3d p-8 rounded-3xl">
                        <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6">
                            <FaRocket className="text-3xl" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-4 font-outfit">Innovation First</h3>
                        <p className="text-slate-600 leading-relaxed">
                            Built with modern browser-first utilities and structured AI generation workflows. This means smarter suggestions, more natural script drafting, and faster title packaging for your channel.
                        </p>
                    </div>
                    <div className="card-3d p-8 rounded-3xl">
                        <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-700 mb-6">
                            <FaShieldAlt className="text-3xl" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-4 font-outfit">Privacy &amp; Security</h3>
                        <p className="text-slate-600 leading-relaxed">
                            We believe your channel data belongs to you. Unlike heavy extensions that inject tracking across tabs, our browser tools operate with strict data minimization policies. Your strategies remain yours.
                        </p>
                    </div>
                    <div className="card-3d p-8 rounded-3xl">
                        <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600 mb-6">
                            <FaUsers className="text-3xl" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-4 font-outfit">Community Driven</h3>
                        <p className="text-slate-600 leading-relaxed">
                            Our roadmap is shaped by creators asking for specific planning, SEO, and revenue calculators. We refine utilities continually based on real workflow feedback.
                        </p>
                    </div>
                    <div className="card-3d p-8 rounded-3xl">
                        <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 mb-6">
                            <FaLaptopCode className="text-3xl" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-4 font-outfit">Developer Friendly</h3>
                        <p className="text-slate-600 leading-relaxed">
                            We provide public API documentation and transparent methodology notes. Technical creators can inspect schemas and integrate insights into custom workflows.
                        </p>
                    </div>
                </div>

                {/* Testimonial Placeholder (for Structure) */}
                <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-center text-white mb-12 relative overflow-hidden">
                    <div className="absolute inset-0 uhd-dark-grid opacity-30 pointer-events-none" />
                    <blockquote className="relative z-10 max-w-3xl mx-auto">
                        <p className="text-2xl md:text-3xl font-serif italic mb-8">
                            &quot;The difference between YouTube Tools Hub and the rest is that it actually helps me make the video, not just look at numbers after I&apos;ve posted it.&quot;
                        </p>
                        <footer className="font-bold text-slate-300">
                            — Creator Workflow Feedback, 2026
                        </footer>
                    </blockquote>
                </div>
            </div>
        </div>
    );
}
