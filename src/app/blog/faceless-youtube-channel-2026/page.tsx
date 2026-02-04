import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { getArticleSchema, getBreadcrumbSchema } from "@/lib/seo";
import Link from "next/link";
import { FaEyeSlash, FaRobot, FaDollarSign, FaRocket, FaTools, FaCheck } from "react-icons/fa";

export const metadata: Metadata = {
    title: "How to Start a Faceless YouTube Channel in 2026 | Complete Guide",
    description: "Learn how to start a faceless YouTube channel in 2026. No camera needed! Use AI voiceovers, stock footage, and screen recordings to build a profitable channel.",
    keywords: ["faceless youtube channel", "youtube without showing face", "faceless youtube", "no face youtube channel", "youtube automation channel"],
    openGraph: {
        title: "How to Start a Faceless YouTube Channel 2026",
        description: "No camera needed! AI voiceovers, stock footage and screen recordings.",
        url: `${siteConfig.url}/blog/faceless-youtube-channel-2026`,
        images: [`${siteConfig.url}/images/blog/faceless-youtube-channel-2026.png`],
    },
    twitter: {
        card: "summary_large_image",
        title: "Faceless YouTube Channel Guide 2026",
        description: "Build a profitable channel without showing your face",
        images: [`${siteConfig.url}/images/blog/faceless-youtube-channel-2026.png`],
    },
    alternates: {
        canonical: "/blog/faceless-youtube-channel-2026",
        languages: {
            "en": "/blog/faceless-youtube-channel-2026",
            "x-default": "/blog/faceless-youtube-channel-2026",
        },
    },
};

const nicheIdeas = [
    { niche: "Top 10 Lists", cpm: "$4-8", difficulty: "Easy" },
    { niche: "History & Documentaries", cpm: "$6-12", difficulty: "Medium" },
    { niche: "Finance & Investing", cpm: "$15-35", difficulty: "Medium" },
    { niche: "Tech Tutorials", cpm: "$8-15", difficulty: "Easy" },
    { niche: "Meditation & Sleep", cpm: "$5-10", difficulty: "Easy" },
    { niche: "Scary Stories", cpm: "$4-8", difficulty: "Easy" },
];

const tools = [
    { category: "AI Voiceover", tools: ["ElevenLabs", "Murf.ai", "Play.ht"] },
    { category: "Stock Footage", tools: ["Pexels", "Pixabay", "Storyblocks"] },
    { category: "Video Editing", tools: ["CapCut", "DaVinci Resolve", "Premiere Pro"] },
    { category: "Scripting", tools: ["ChatGPT", "Claude", "Jasper"] },
];

const steps = [
    { step: 1, title: "Choose Your Niche", desc: "Pick a topic you can create 100+ videos about." },
    { step: 2, title: "Research & Script", desc: "Use ChatGPT to help write engaging scripts." },
    { step: 3, title: "Generate AI Voiceover", desc: "Use ElevenLabs or Murf for realistic AI voices." },
    { step: 4, title: "Gather Footage", desc: "Download free stock from Pexels or Pixabay." },
    { step: 5, title: "Edit & Publish", desc: "Use CapCut or DaVinci Resolve. Upload consistently." },
];

const relatedTools = [
    {
        name: "Script Generator",
        description: "Generate video scripts with AI.",
        link: "/tools/youtube-script-generator",
    },
    {
        name: "Title Generator",
        description: "Create click-worthy titles.",
        link: "/tools/youtube-title-generator",
    },
    {
        name: "Earnings Calculator",
        description: "Estimate your channel revenue.",
        link: "/tools/youtube-earnings-calculator",
    },
];

export default function FacelessYouTubeChannelPage() {
    const articleSchema = getArticleSchema({
        title: metadata.title as string,
        description: metadata.description as string,
        url: `${siteConfig.url}/blog/faceless-youtube-channel-2026`,
        imageUrl: `${siteConfig.url}/images/blog/faceless-youtube-channel-2026.png`,
        datePublished: "2026-02-04",
        dateModified: "2026-02-04",
        author: siteConfig.name,
    });

    const breadcrumbSchema = getBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Blog", url: "/blog" },
        { name: "Faceless Channel", url: "/blog/faceless-youtube-channel-2026" },
    ]);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />

            <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 pb-24">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 text-sm font-bold mb-6">
                            <FaEyeSlash className="text-lg" />
                            No Camera Required
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-8 leading-tight">
                            How to Start a<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Faceless YouTube Channel</span>
                        </h1>
                        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
                            Build a profitable channel without showing your face using AI voiceovers, stock footage, and automation.
                        </p>
                    </div>

                    {/* Key Stats */}
                    <div className="grid md:grid-cols-4 gap-4 mb-16">
                        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 text-center border border-slate-100 dark:border-slate-800">
                            <div className="text-2xl font-bold text-purple-600 mb-1">$0-50</div>
                            <div className="text-sm text-slate-600 dark:text-slate-400">Startup Cost/mo</div>
                        </div>
                        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 text-center border border-slate-100 dark:border-slate-800">
                            <div className="text-2xl font-bold text-pink-600 mb-1">No Camera</div>
                            <div className="text-sm text-slate-600 dark:text-slate-400">Required</div>
                        </div>
                        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 text-center border border-slate-100 dark:border-slate-800">
                            <div className="text-2xl font-bold text-indigo-600 mb-1">$4-35</div>
                            <div className="text-sm text-slate-600 dark:text-slate-400">CPM Range</div>
                        </div>
                        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 text-center border border-slate-100 dark:border-slate-800">
                            <div className="text-2xl font-bold text-blue-600 mb-1">100%</div>
                            <div className="text-sm text-slate-600 dark:text-slate-400">Anonymous</div>
                        </div>
                    </div>

                    {/* Niche Table */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Best Faceless Niches</h2>
                        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden">
                            <table className="w-full">
                                <thead className="bg-slate-50 dark:bg-slate-800">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">Niche</th>
                                        <th className="px-6 py-4 text-center text-sm font-semibold text-slate-900 dark:text-white">CPM</th>
                                        <th className="px-6 py-4 text-center text-sm font-semibold text-slate-900 dark:text-white">Difficulty</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                    {nicheIdeas.map((niche, index) => (
                                        <tr key={index}>
                                            <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{niche.niche}</td>
                                            <td className="px-6 py-4 text-center text-green-600 font-bold">{niche.cpm}</td>
                                            <td className="px-6 py-4 text-center">
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${niche.difficulty === 'Easy' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300'}`}>
                                                    {niche.difficulty}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Tools */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Essential Tools</h2>
                        <div className="grid md:grid-cols-4 gap-4">
                            {tools.map((category, index) => (
                                <div key={index} className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-100 dark:border-slate-800">
                                    <h3 className="font-bold text-slate-900 dark:text-white mb-3">{category.category}</h3>
                                    <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                                        {category.tools.map((tool, i) => (
                                            <li key={i} className="flex items-center gap-2">
                                                <FaCheck className="text-green-500 text-xs" /> {tool}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Steps */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Step-by-Step Process</h2>
                        <div className="space-y-4">
                            {steps.map((step, index) => (
                                <div key={index} className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-100 dark:border-slate-800 flex items-start gap-4">
                                    <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                                        {step.step}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-900 dark:text-white">{step.title}</h3>
                                        <p className="text-slate-600 dark:text-slate-400 text-sm">{step.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Related Tools */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Helpful Tools</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            {relatedTools.map((tool, index) => (
                                <div key={index} className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 hover:shadow-lg transition-shadow">
                                    <div className="flex items-center gap-3 mb-4">
                                        <FaTools className="text-purple-500 text-xl" />
                                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                                            {tool.name}
                                        </h3>
                                    </div>
                                    <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                                        {tool.description}
                                    </p>
                                    <Link
                                        href={tool.link}
                                        className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium"
                                    >
                                        Try Free
                                        <FaRocket className="text-sm" />
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-12 text-center text-white">
                        <h2 className="text-3xl font-bold mb-4">Learn YouTube Automation</h2>
                        <p className="text-purple-100 text-lg mb-8 max-w-2xl mx-auto">
                            Take your faceless channel to the next level with our complete automation guide.
                        </p>
                        <Link
                            href="/blog/youtube-automation-complete-guide-2026"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-600 rounded-xl font-bold hover:bg-slate-100 transition-colors"
                        >
                            <FaRobot className="text-xl" />
                            Automation Guide
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
