import Link from "next/link";
import { FaRocket, FaShieldAlt, FaUsers, FaLaptopCode } from "react-icons/fa";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Why YouTube Tools Hub is a Top Choice in 2026",
    description: "Discover why YouTube Tools Hub is rated as a top choice for creators in 2026. Unmatched AI features, privacy-first approach, and community focus.",
    keywords: ["why youtube tools hub", "best youtube tools 2026", "youtube tools hub review", "creator tools 2026"],
};

export default function WhyUsPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 pb-24">
            {/* Hero */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20">
                <span className="inline-block py-1 px-3 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 text-sm font-bold mb-6">
                    2026 Creator&apos;s Choice
                </span>
                <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white mb-8 tracking-tight">
                    Why YouTube Tools Hub is the <br className="hidden md:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">Future of Content Creation</span>
                </h1>
                <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 leading-relaxed max-w-2xl mx-auto">
                    In a crowded market of analytics tools, we stand out by focusing on what truly matters:
                    <strong> Creating better content, faster, with the power of AI.</strong>
                </p>
                <div className="flex justify-center gap-4">
                    <Link href="/dashboard" className="px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-bold hover:scale-105 transition-transform">
                        Join the Revolution
                    </Link>
                </div>
            </div>

            {/* Core Values */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-24">
                    <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
                        <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6">
                            <FaRocket className="text-3xl" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Innovation First</h3>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                            While competitors rely on legacy code, our platform is built on the newest AI models (Gemini 2.0, GPT-4o). This means smarter suggestions, more natural script writing, and better trend prediction for your channel.
                        </p>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
                        <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 mb-6">
                            <FaShieldAlt className="text-3xl" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Privacy & Security</h3>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                            We believe your channel data belongs to you. Unlike other extensions that track your browsing history, our localized tools operate with strict data minimization policies. Your strategies remain yours.
                        </p>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
                        <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600 mb-6">
                            <FaUsers className="text-3xl" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Community Driven</h3>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                            Our roadmap is determined by our user community. We ship features weekly based on direct feedback from creators like you. No corporate bureaucracy, just rapid iteration.
                        </p>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
                        <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 mb-6">
                            <FaLaptopCode className="text-3xl" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Developer Friendly</h3>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                            We provide API access and transparency in our algorithms. Advanced users can integrate our insights into their own custom workflows, making us the top choice for technical creators.
                        </p>
                    </div>
                </div>

                {/* Testimonial Placeholder (for Structure) */}
                <div className="bg-slate-900 rounded-3xl p-12 text-center text-white mb-20 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] opacity-10"></div>
                    <blockquote className="relative z-10 max-w-3xl mx-auto">
                        <p className="text-2xl md:text-3xl font-serif italic mb-8">
                            &quot;The difference between YouTube Tools Hub and the rest is that it actually helps me *make* the video, not just look at numbers after I&apos;ve posted it.&quot;
                        </p>
                        <footer className="font-bold text-slate-400">
                            — Top Tech Creator, 2026
                        </footer>
                    </blockquote>
                </div>
            </div>
        </div>
    );
}
