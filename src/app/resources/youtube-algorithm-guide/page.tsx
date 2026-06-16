import { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { getFAQSchema, getHowToSchema, getBreadcrumbSchema } from "@/lib/seo";
import Breadcrumb from "@/components/ui/Breadcrumb";
import HorizontalAd from "@/components/ads/HorizontalAd";
import MultiplexAd from "@/components/ads/MultiplexAd";
import InArticleAd from "@/components/ads/InArticleAd";
import {
    FaSearch,
    FaEye,
    FaClock,
    FaThumbsUp,
    FaShareAlt,
    FaComment,
    FaPlayCircle,
    FaChartLine,
    FaLightbulb,
    FaBolt,
    FaCheckCircle,
    FaArrowRight,
    FaYoutube,
    FaFireAlt,
    FaStar,
} from "react-icons/fa";

export const metadata: Metadata = {
    title: "YouTube Algorithm Guide 2026 — How It Works & Ranking Factors",
    description:
        "Complete guide to the YouTube algorithm in 2026. Learn the 7 key ranking factors (CTR, Watch Time, Engagement), how recommendations work, YouTube SEO best practices, and proven strategies to get more views.",
    keywords: [
        "youtube algorithm 2026",
        "how does youtube algorithm work",
        "youtube ranking factors 2026",
        "youtube seo 2026",
        "youtube recommendations algorithm",
        "youtube algorithm explained",
        "how to beat youtube algorithm",
        "youtube watch time algorithm",
        "youtube ctr ranking factor",
        "youtube engagement algorithm",
        "youtube shorts algorithm 2026",
        "youtube search algorithm",
        "youtube suggested videos algorithm",
        "how to rank on youtube 2026",
        "youtube homepage algorithm",
        "youtube algorithm tips",
        "youtube algorithm update 2026",
        "grow youtube channel algorithm",
    ],
    alternates: {
        canonical: `${siteConfig.url}/resources/youtube-algorithm-guide`,
    },
    openGraph: {
        title: "YouTube Algorithm Guide 2026 — How It Works & Ranking Factors",
        description:
            "Master the YouTube algorithm in 2026. The 7 ranking factors, recommendation system breakdown, and proven SEO strategies to grow your channel.",
        url: `${siteConfig.url}/resources/youtube-algorithm-guide`,
        images: [{ url: `${siteConfig.url}/og-image.png`, width: 1200, height: 630 }],
    },
    twitter: {
        card: "summary_large_image",
        title: "YouTube Algorithm Guide 2026 — How It Works & Ranking Factors",
        description:
            "Master the YouTube algorithm in 2026. Learn all 7 ranking factors and how to optimize your videos for maximum reach.",
        images: [`${siteConfig.url}/og-image.png`],
    },
};

const pageFAQs = [
    {
        question: "How does the YouTube algorithm work in 2026?",
        answer:
            "The YouTube algorithm in 2026 uses machine learning to match each viewer with videos they are most likely to watch and enjoy. It evaluates two primary signals: performance signals (CTR, watch time, likes, comments, shares) and satisfaction signals (post-watch surveys, likes, dislikes, 'Not interested' clicks). The algorithm prioritizes videos that keep viewers on YouTube longer — known as session time — rather than just maximizing views on a single video.",
    },
    {
        question: "What is the most important YouTube ranking factor in 2026?",
        answer:
            "Click-Through Rate (CTR) and Average View Duration (AVD) together are the most important ranking factors. CTR determines whether viewers choose to click your video when shown in search or recommendations. AVD (what percentage of your video people watch) tells YouTube whether viewers are satisfied. A video with a 7%+ CTR and 50%+ AVD will typically outrank competitors with better thumbnail designs but lower retention.",
    },
    {
        question: "How long does it take for the YouTube algorithm to pick up a new video?",
        answer:
            "YouTube typically evaluates a new video within the first 24–48 hours using your existing subscriber base as a test audience. If early performance signals (CTR, watch time, engagement) are strong, the algorithm begins distributing the video to broader audiences within 2–7 days. Channels with larger, more engaged subscriber bases see faster initial distribution. Posting at peak audience hours (typically 2–4 PM EST or when your analytics show peak activity) improves early signal quality.",
    },
    {
        question: "Does posting frequency affect the YouTube algorithm?",
        answer:
            "Yes, but consistency matters more than volume. The YouTube algorithm rewards channels that upload on a predictable schedule because it can reliably serve fresh content to your subscribers. Most successful channels post 1–3 times per week for long-form content, or daily for YouTube Shorts. Sudden drops in upload frequency can reduce recommendation distribution. Use the YouTube Trend Helper tool to plan content batches and maintain consistent publishing.",
    },
    {
        question: "What is the difference between YouTube Search algorithm and Suggested Videos algorithm?",
        answer:
            "YouTube Search ranks videos using keyword relevance (title, description, tags, closed captions) plus performance signals. It rewards keyword-optimized metadata. The Suggested Videos algorithm is personalization-driven — it looks at what the current viewer has watched before and recommends videos with similar topics or from the same channel. For Search, optimize your title and description. For Suggested, focus on retention, engagement, and creating series-style content that encourages binge-watching.",
    },
    {
        question: "How does the YouTube Shorts algorithm differ from long-form?",
        answer:
            "The YouTube Shorts algorithm prioritizes loop rate (whether viewers re-watch your Short), swipe-away rate, and likes relative to views. Unlike long-form which rewards watch time in minutes, Shorts rewards completing the full video (even if it's 30 seconds). Shorts are primarily distributed on the Shorts feed and have their own discovery system separate from the main recommendation algorithm. A viral Short does not automatically boost your long-form video performance.",
    },
    {
        question: "Do YouTube tags still matter for the algorithm in 2026?",
        answer:
            "Tags play a secondary role in 2026 compared to 2020. YouTube's algorithm now primarily reads your video title, description, spoken words (auto-captions), and on-screen text to understand your video's topic. However, tags still help with synonym matching and can improve your ranking for misspellings or alternative keyword phrasings. Add 5–10 highly relevant tags using the YouTube Tag Generator, starting with your exact target keyword, then variations.",
    },
    {
        question: "How does watch time affect YouTube recommendations?",
        answer:
            "Watch time is a core ranking signal — YouTube wants to maximize total time viewers spend on its platform. Videos that retain a high percentage of viewers (50%+ average view duration) and lead to additional video watches in the same session rank highest. Long-form videos (10–20 minutes) with strong retention naturally accumulate more total watch-time minutes than shorter videos, giving them a compounding algorithm advantage over time.",
    },
];

const howToSchema = getHowToSchema({
    name: "How to Optimize for the YouTube Algorithm in 2026",
    description:
        "A step-by-step guide to optimizing your YouTube videos and channel to rank higher in search, get recommended more, and grow your audience through the algorithm.",
    totalTime: "PT7D",
    steps: [
        {
            name: "Research high-demand, low-competition keywords",
            text: "Use the YouTube Title Generator and Tag Generator to identify keywords with high search volume and moderate competition. Target keywords with clear viewer intent — tutorials, reviews, comparisons, and 'best of' lists consistently perform well in search. Include your primary keyword naturally in the first 60 characters of your title.",
        },
        {
            name: "Design a high-CTR thumbnail",
            text: "Your thumbnail is your most important algorithm lever. Use high-contrast colors, readable 3–5 word text overlays, close-up faces with emotional expressions, and a clear visual that creates curiosity. A/B test thumbnails using YouTube Studio's built-in test feature. Aim for a CTR of 5–10% for established channels, or 3–6% for newer ones.",
        },
        {
            name: "Hook viewers in the first 30 seconds",
            text: "The first 30 seconds determine whether viewers stay or leave. Start with a bold statement, surprising statistic, or preview of the most compelling part of your video. Avoid long intros or logos. Use the YouTube Description Generator to craft opening lines that match the promise of your thumbnail and title.",
        },
        {
            name: "Optimize video metadata for search and suggested",
            text: "Write a 200–350 word description with your target keyword in the first two sentences, natural keyword variations throughout, and 3–5 timestamped chapters. Add 8–12 relevant tags using the YouTube Tag Generator. Include closed captions either by uploading an SRT file or editing YouTube's auto-generated captions for accuracy.",
        },
        {
            name: "Boost engagement in the first 24 hours",
            text: "Publish to your most engaged audience segments first. Share the video in community posts, email newsletters, and social media to drive early views and engagement. Respond to every comment within the first 6 hours — this signals to the algorithm that your video is generating active conversation, which boosts recommendation distribution.",
        },
        {
            name: "Build watch-time chains with playlists and end screens",
            text: "Group related videos into playlists to encourage session-time viewing. Add end screens at the 20-second mark pointing to your most relevant follow-up video. Cards during key moments can redirect viewers about to drop off. Every additional video a viewer watches from your channel in a session compounds your algorithm authority.",
        },
    ],
});

const faqSchema = getFAQSchema(pageFAQs);

const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: siteConfig.url },
    { name: "Resources", url: `${siteConfig.url}/resources` },
    { name: "YouTube Algorithm Guide 2026", url: `${siteConfig.url}/resources/youtube-algorithm-guide` },
]);

const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "YouTube Algorithm Guide 2026 — How It Works & Ranking Factors",
    description:
        "Complete guide to the YouTube algorithm in 2026: 7 key ranking factors, recommendation system breakdown, Shorts vs long-form differences, and proven SEO optimization strategies.",
    url: `${siteConfig.url}/resources/youtube-algorithm-guide`,
    image: `${siteConfig.url}/og-image.png`,
    author: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    datePublished: "2026-01-01",
    dateModified: new Date().toISOString().split("T")[0],
    mainEntityOfPage: { "@type": "WebPage", "@id": `${siteConfig.url}/resources/youtube-algorithm-guide` },
};

const rankingFactors = [
    {
        icon: FaEye,
        name: "Click-Through Rate (CTR)",
        weight: "Critical",
        color: "from-purple-500 to-purple-700",
        description:
            "The percentage of impressions that result in a click. A 5–10% CTR is strong. Driven by thumbnail quality, title intrigue, and relevance to viewer intent.",
        tips: ["Use high-contrast thumbnails with faces", "Write curiosity-gap titles", "Test multiple thumbnails with YouTube A/B testing"],
    },
    {
        icon: FaClock,
        name: "Average View Duration",
        weight: "Critical",
        color: "from-blue-500 to-blue-700",
        description:
            "What percentage of your video viewers watch on average. 50%+ AVD is excellent. This is YouTube's primary satisfaction proxy — it proves viewers got what they came for.",
        tips: ["Open with a hook in the first 30 seconds", "Use pattern interrupts every 60–90 seconds", "Tease upcoming content to prevent drop-off"],
    },
    {
        icon: FaThumbsUp,
        name: "Engagement Rate",
        weight: "High",
        color: "from-emerald-500 to-emerald-700",
        description:
            "Likes, comments, shares, and saves as a percentage of views. Engagement signals viewer satisfaction and triggers broader recommendation distribution.",
        tips: ["Ask one specific question at the end", "Pin a comment to start discussion", "Use polls in Community tab after upload"],
    },
    {
        icon: FaPlayCircle,
        name: "Upload Consistency",
        weight: "High",
        color: "from-orange-500 to-orange-700",
        description:
            "Regular uploads on a predictable schedule keep your channel in YouTube's active recommendation pool. Channels that go quiet lose distribution momentum quickly.",
        tips: ["Batch film 2–3 videos at once", "Use YouTube Trend Helper to plan a content calendar", "Schedule uploads at peak audience hours"],
    },
    {
        icon: FaBolt,
        name: "Shorts Velocity",
        weight: "Medium",
        color: "from-yellow-500 to-yellow-700",
        description:
            "How quickly your Shorts accumulate views in the first 4 hours determines feed distribution. Loop rate (re-watches) is the #1 Shorts ranking signal.",
        tips: ["End Shorts mid-sentence to force re-watch", "Use trending audio from Shorts library", "Post Shorts at 7–9 AM or 7–9 PM local time"],
    },
    {
        icon: FaComment,
        name: "Comment Activity",
        weight: "Medium",
        color: "from-pink-500 to-pink-700",
        description:
            "Active comment sections indicate a video is generating real conversation. YouTube's algorithm treats high comment counts as a quality signal for broader push.",
        tips: ["Reply to every comment in first 6 hours", "Ask controversial but civil questions", "Pin a comment with a follow-up question"],
    },
    {
        icon: FaShareAlt,
        name: "External Shares & Traffic",
        weight: "Supporting",
        color: "from-cyan-500 to-cyan-700",
        description:
            "When viewers share your video outside YouTube (social media, forums, blogs), it sends a high-quality external authority signal to the algorithm.",
        tips: ["Add a share CTA at emotional high points", "Create share-worthy stats graphics for socials", "Embed videos in relevant blog articles"],
    },
];

export default function YouTubeAlgorithmGuidePage() {
    return (
        <>
            {/* Structured Data */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

            <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">

                {/* Hero */}
                <section className="relative overflow-hidden py-20 bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(168,85,247,0.15),transparent_60%)]" />
                    <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                        <Breadcrumb
                            items={[
                                { name: "Home", href: "/" },
                                { name: "Resources", href: "/resources" },
                                { name: "YouTube Algorithm Guide 2026" },
                            ]}
                            className="mb-8 text-slate-400 [&_a]:text-slate-400 [&_a:hover]:text-white"
                        />
                        <div className="text-center">
                            <span className="inline-block px-4 py-1.5 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-bold uppercase tracking-widest mb-6">
                                Updated for 2026 · Complete Ranking Guide
                            </span>
                            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-tight">
                                YouTube Algorithm<br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                                    Guide 2026
                                </span>
                            </h1>
                            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8">
                                Exactly how the YouTube algorithm ranks, recommends, and distributes videos in 2026 — plus the 7 ranking factors you must optimize to grow your channel.
                            </p>
                            {/* Quick-answer box for AEO featured snippet */}
                            <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-left">
                                <p className="text-xs font-bold uppercase tracking-widest text-purple-300 mb-2">⚡ Quick Answer</p>
                                <p className="text-white font-medium leading-relaxed">
                                    The YouTube algorithm in 2026 ranks videos using <strong>CTR</strong>, <strong>Average View Duration</strong>, <strong>engagement rate</strong>, and <strong>session time</strong>. It serves videos via three systems: <strong>Search</strong> (keyword-driven), <strong>Suggested Videos</strong> (personalization-driven), and <strong>Homepage</strong> (interest-model-driven). The single biggest lever is a high CTR thumbnail combined with strong first-30-second retention.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">

                    {/* Key Stats */}
                    <section aria-label="YouTube Algorithm key statistics">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { label: "Ideal CTR", value: "5–10%", sub: "For established channels", color: "from-purple-500 to-purple-700" },
                                { label: "Target AVD", value: "50%+", sub: "Average View Duration", color: "from-blue-500 to-blue-700" },
                                { label: "Ranking Factors", value: "7 Core", sub: "Analyzed by algorithm", color: "from-emerald-500 to-emerald-700" },
                                { label: "Algorithm Systems", value: "3", sub: "Search, Suggested, Home", color: "from-pink-500 to-pink-700" },
                            ].map((stat) => (
                                <div key={stat.label} className={`bg-gradient-to-br ${stat.color} rounded-2xl p-5 text-white text-center shadow-lg`}>
                                    <div className="text-3xl font-black mb-1">{stat.value}</div>
                                    <div className="text-sm font-bold opacity-90">{stat.label}</div>
                                    <div className="text-xs opacity-70 mt-1">{stat.sub}</div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Section 1: What is the YouTube Algorithm */}
                    <section className="glass-premium rounded-3xl p-8 md:p-12 shadow-sm border border-white/60">
                        <h2 className="text-3xl font-black text-slate-900 mb-4 font-outfit">What is the YouTube Algorithm in 2026?</h2>
                        <p className="text-slate-600 text-lg leading-relaxed mb-6">
                            The <strong>YouTube algorithm</strong> is a set of machine learning systems that decide which videos to show each of the 2.5+ billion monthly logged-in YouTube users. It is not a single algorithm — it is a collection of interconnected models operating across different surfaces: Search, Suggested Videos, the Homepage, the Shorts feed, and Trending.
                        </p>
                        <p className="text-slate-600 leading-relaxed mb-6">
                            YouTube&apos;s internal documentation (confirmed through Google Research papers) shows that the algorithm optimizes for two main outcomes: <strong>predicted watch time</strong> and <strong>viewer satisfaction</strong>. A video that gets 10 million views but triggers mass &quot;not interested&quot; feedback will be down-ranked. A video with 50,000 views but 65% average view duration and thousands of positive comments gets pushed to a wider audience.
                        </p>
                        <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                            <p className="text-xs font-bold uppercase tracking-widest text-purple-600 mb-3">The Algorithm&apos;s Core Loop</p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-slate-700">
                                <div className="bg-white rounded-lg p-4 border border-slate-200">
                                    <div className="font-bold text-slate-900 mb-1">1. Candidate Generation</div>
                                    <p>From millions of videos, the algorithm selects hundreds of candidates likely relevant to this viewer based on watch history and channel affinity.</p>
                                </div>
                                <div className="bg-white rounded-lg p-4 border border-slate-200">
                                    <div className="font-bold text-slate-900 mb-1">2. Ranking</div>
                                    <p>Candidates are scored using engagement signals (CTR, AVD, likes) and satisfaction signals (surveys, post-watch behavior). Top scorers are shown.</p>
                                </div>
                                <div className="bg-white rounded-lg p-4 border border-slate-200">
                                    <div className="font-bold text-slate-900 mb-1">3. Post-Watch Feedback</div>
                                    <p>After viewing, new signals (likes, dislikes, shares, &quot;not interested&quot; clicks, survey responses) update the model for future recommendations.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <HorizontalAd />

                    {/* Section 2: 7 Key Ranking Factors */}
                    <section>
                        <div className="mb-8">
                            <span className="inline-block px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-bold uppercase tracking-widest mb-3">Core Ranking Signals</span>
                            <h2 className="text-3xl font-black text-slate-900 font-outfit">The 7 Key YouTube Ranking Factors in 2026</h2>
                            <p className="text-slate-500 mt-2 text-lg">Master these signals to rank higher in search, appear in suggested videos, and dominate your niche.</p>
                        </div>
                        <div className="space-y-6">
                            {rankingFactors.map((factor, index) => {
                                const Icon = factor.icon;
                                return (
                                    <div key={factor.name} className="glass-premium rounded-2xl p-6 border border-white/60 shadow-sm">
                                        <div className="flex items-start gap-5">
                                            <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${factor.color} flex items-center justify-center shadow-md`}>
                                                <Icon className="text-white text-xl" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h3 className="text-xl font-black text-slate-900">
                                                        {index + 1}. {factor.name}
                                                    </h3>
                                                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold text-white bg-gradient-to-r ${factor.color}`}>
                                                        {factor.weight}
                                                    </span>
                                                </div>
                                                <p className="text-slate-600 leading-relaxed mb-4">{factor.description}</p>
                                                <ul className="space-y-1">
                                                    {factor.tips.map((tip) => (
                                                        <li key={tip} className="flex items-start gap-2 text-sm text-slate-600">
                                                            <FaCheckCircle className="text-emerald-500 mt-0.5 flex-shrink-0" />
                                                            <span>{tip}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    <InArticleAd />

                    {/* Section 3: How YouTube Recommends Videos */}
                    <section>
                        <div className="mb-8">
                            <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest mb-3">Recommendation Systems</span>
                            <h2 className="text-3xl font-black text-slate-900 font-outfit">How YouTube Recommends Videos: 3 Systems Explained</h2>
                            <p className="text-slate-500 mt-2 text-lg">Each surface on YouTube has a different algorithm. Optimize for all three to maximize total reach.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                {
                                    title: "Homepage Algorithm",
                                    icon: FaYoutube,
                                    color: "border-purple-200 bg-purple-50",
                                    titleColor: "text-purple-700",
                                    points: [
                                        "Personalization-first: based on watch history and search history",
                                        "Rewards channels with strong subscriber engagement",
                                        "Fresh uploads get a short homepage push to subscribers",
                                        "Videos must have strong CTR to earn extended homepage distribution",
                                        "Channel authority (overall subscriber satisfaction) matters here",
                                    ],
                                    optimization: "Notify subscribers within the first hour of publishing. Encourage subscribers to click the bell icon.",
                                },
                                {
                                    title: "Search Algorithm",
                                    icon: FaSearch,
                                    color: "border-blue-200 bg-blue-50",
                                    titleColor: "text-blue-700",
                                    points: [
                                        "Keyword relevance is the primary ranking input",
                                        "Title, description, auto-captions, and tags all contribute",
                                        "Watch time and CTR from search results refine rankings",
                                        "Fresh content gets a temporary freshness boost",
                                        "Niche-specific channels rank faster than general channels",
                                    ],
                                    optimization: "Use your exact target keyword in the first 60 characters of your title. Repeat it naturally in the first two sentences of your description.",
                                },
                                {
                                    title: "Suggested Videos Algorithm",
                                    icon: FaChartLine,
                                    color: "border-emerald-200 bg-emerald-50",
                                    titleColor: "text-emerald-700",
                                    points: [
                                        "Most powerful discovery channel — often drives 40–60% of views",
                                        "Shows videos similar to what the viewer just watched",
                                        "Also shows content from channels the viewer watches often",
                                        "Rewards series, playlists, and content clusters",
                                        "End screens and cards directly feed the suggested system",
                                    ],
                                    optimization: "Create topically related videos in clusters. Link them via playlists and end screens to build a suggested video chain.",
                                },
                            ].map((system) => {
                                const Icon = system.icon;
                                return (
                                    <div key={system.title} className={`rounded-2xl p-6 border ${system.color}`}>
                                        <div className="flex items-center gap-3 mb-4">
                                            <Icon className={`text-2xl ${system.titleColor}`} />
                                            <h3 className={`text-xl font-black ${system.titleColor}`}>{system.title}</h3>
                                        </div>
                                        <ul className="space-y-2 mb-4">
                                            {system.points.map((point) => (
                                                <li key={point} className="flex items-start gap-2 text-sm text-slate-600">
                                                    <FaCheckCircle className="text-emerald-500 mt-0.5 flex-shrink-0" />
                                                    <span>{point}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="bg-white rounded-xl p-3 border border-white/80">
                                            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Optimization Tip</p>
                                            <p className="text-sm text-slate-700">{system.optimization}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    {/* Section 4: YouTube SEO Best Practices */}
                    <section className="glass-premium rounded-3xl p-8 md:p-12 shadow-sm border border-white/60">
                        <div className="mb-8">
                            <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-widest mb-3">YouTube SEO 2026</span>
                            <h2 className="text-3xl font-black text-slate-900 font-outfit">YouTube SEO Best Practices: Title, Description, Tags & Thumbnails</h2>
                        </div>
                        <div className="space-y-8">
                            {/* Title */}
                            <div>
                                <h3 className="text-xl font-black text-slate-900 mb-3 flex items-center gap-2">
                                    <span className="w-8 h-8 rounded-lg bg-purple-600 text-white flex items-center justify-center text-sm font-black">1</span>
                                    Video Title Optimization
                                </h3>
                                <p className="text-slate-600 leading-relaxed mb-3">
                                    Your title serves two masters: the search algorithm and human viewers. Place your <strong>primary keyword within the first 60 characters</strong>, then add a hook or value proposition. Avoid clickbait that doesn&apos;t match the video — high bounce rate from mis-matched titles tanks your rankings within days.
                                </p>
                                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 font-mono text-sm">
                                    <div className="text-slate-500 mb-1">// Title formula that works:</div>
                                    <div className="text-purple-700 font-bold">[Primary Keyword]: [Value/Benefit] [Year]</div>
                                    <div className="text-slate-500 mt-2">Example: &quot;YouTube Algorithm 2026: 7 Ranking Factors That Actually Matter&quot;</div>
                                </div>
                                <div className="mt-3">
                                    <Link href="/tools/youtube-title-generator" className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-semibold text-sm transition-colors">
                                        <FaArrowRight className="text-xs" /> Generate optimized YouTube titles free →
                                    </Link>
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <h3 className="text-xl font-black text-slate-900 mb-3 flex items-center gap-2">
                                    <span className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center text-sm font-black">2</span>
                                    Video Description Optimization
                                </h3>
                                <p className="text-slate-600 leading-relaxed mb-3">
                                    Write descriptions of <strong>200–350 words</strong> minimum. The first 125 characters appear in search results — make this a compelling keyword-rich sentence. Include natural keyword variations, timestamped chapters (hugely benefits Search ranking), links to related videos, and a call-to-action.
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                                    {[
                                        "Include target keyword in first sentence",
                                        "Add 3–5 timestamped chapters for jump links",
                                        "Link to 2–3 related videos on your channel",
                                        "Include secondary keywords naturally (no stuffing)",
                                        "Add social media links and relevant resources",
                                        "End with a subscribe CTA",
                                    ].map((tip) => (
                                        <div key={tip} className="flex items-start gap-2 bg-white rounded-lg p-3 border border-slate-200">
                                            <FaCheckCircle className="text-emerald-500 mt-0.5 flex-shrink-0" />
                                            <span className="text-slate-600">{tip}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-3">
                                    <Link href="/tools/youtube-description-generator" className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-semibold text-sm transition-colors">
                                        <FaArrowRight className="text-xs" /> Generate SEO-optimized descriptions free →
                                    </Link>
                                </div>
                            </div>

                            {/* Tags */}
                            <div>
                                <h3 className="text-xl font-black text-slate-900 mb-3 flex items-center gap-2">
                                    <span className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center text-sm font-black">3</span>
                                    Tags Strategy for 2026
                                </h3>
                                <p className="text-slate-600 leading-relaxed mb-3">
                                    Tags are a secondary ranking signal in 2026, but they still help with synonym matching and alternative keyword phrasings. <strong>Add 8–12 tags</strong>: start with your exact target keyword, then 3–4 keyword variations, then 2–3 broad niche tags, then 1–2 branded tags.
                                </p>
                                <Link href="/tools/youtube-tag-generator" className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-semibold text-sm transition-colors">
                                    <FaArrowRight className="text-xs" /> Generate the right tags for any video →
                                </Link>
                            </div>

                            {/* Thumbnails */}
                            <div>
                                <h3 className="text-xl font-black text-slate-900 mb-3 flex items-center gap-2">
                                    <span className="w-8 h-8 rounded-lg bg-pink-600 text-white flex items-center justify-center text-sm font-black">4</span>
                                    Thumbnail Best Practices
                                </h3>
                                <p className="text-slate-600 leading-relaxed mb-3">
                                    Thumbnails drive CTR — the most critical ranking signal. Your thumbnail and title must form a promise that the video fulfills. Viewers who feel deceived will close the video within 10 seconds, destroying your AVD and triggering a ranking penalty.
                                </p>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                                    {[
                                        { tip: "Use faces with strong emotions", why: "+35% average CTR boost" },
                                        { tip: "Maximum 4 words of text overlay", why: "Readable at mobile thumbnail size" },
                                        { tip: "High contrast colors (yellow, red, white)", why: "Stands out in dark-themed feed" },
                                        { tip: "1280×720px, under 2MB, JPG/PNG", why: "YouTube recommended spec" },
                                        { tip: "Consistent brand style across videos", why: "Builds channel recognition" },
                                        { tip: "Arrow or pointing gestures toward text", why: "Directs viewer attention" },
                                    ].map((item) => (
                                        <div key={item.tip} className="bg-slate-50 rounded-lg p-3 border border-slate-200">
                                            <div className="font-semibold text-slate-800 mb-1">{item.tip}</div>
                                            <div className="text-xs text-slate-500">{item.why}</div>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-3">
                                    <Link href="/tools/youtube-thumbnail-downloader" className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-semibold text-sm transition-colors">
                                        <FaArrowRight className="text-xs" /> Download competitor thumbnails for inspiration →
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>

                    <HorizontalAd />

                    {/* Section 5: Shorts vs Long-Form */}
                    <section>
                        <div className="mb-8">
                            <span className="inline-block px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-bold uppercase tracking-widest mb-3">Algorithm Differences</span>
                            <h2 className="text-3xl font-black text-slate-900 font-outfit">YouTube Shorts vs Long-Form: Algorithm Differences</h2>
                            <p className="text-slate-500 mt-2 text-lg">These two formats are scored by completely different systems. Understanding both is essential for channel growth in 2026.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                                <div className="bg-gradient-to-r from-purple-600 to-purple-800 p-5 text-white">
                                    <div className="flex items-center gap-3">
                                        <FaPlayCircle className="text-2xl" />
                                        <div>
                                            <h3 className="text-xl font-black">Long-Form Videos</h3>
                                            <p className="text-purple-200 text-sm">8–20+ minutes</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white p-5 space-y-3">
                                    {[
                                        { signal: "Primary Signal", value: "Average View Duration (minutes watched)" },
                                        { signal: "Secondary Signal", value: "Session time — do viewers watch more after?" },
                                        { signal: "CTR Benchmark", value: "5–10% is strong" },
                                        { signal: "Ideal Length", value: "10–20 minutes for max mid-roll ad revenue" },
                                        { signal: "Upload Frequency", value: "1–3 per week recommended" },
                                        { signal: "Discovery", value: "Search + Suggested Videos (60–70% of views)" },
                                        { signal: "Compounding Value", value: "High — evergreen search traffic builds over time" },
                                    ].map((row) => (
                                        <div key={row.signal} className="flex justify-between text-sm border-b border-slate-100 pb-2">
                                            <span className="text-slate-500 font-medium">{row.signal}</span>
                                            <span className="text-slate-800 font-semibold text-right max-w-[60%]">{row.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                                <div className="bg-gradient-to-r from-pink-600 to-rose-700 p-5 text-white">
                                    <div className="flex items-center gap-3">
                                        <FaBolt className="text-2xl" />
                                        <div>
                                            <h3 className="text-xl font-black">YouTube Shorts</h3>
                                            <p className="text-pink-200 text-sm">Under 3 minutes</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white p-5 space-y-3">
                                    {[
                                        { signal: "Primary Signal", value: "Loop rate (re-watches) + swipe-away rate" },
                                        { signal: "Secondary Signal", value: "Likes relative to views (engagement rate)" },
                                        { signal: "Ideal Length", value: "15–45 seconds for max loop rate" },
                                        { signal: "Upload Frequency", value: "Daily or near-daily recommended" },
                                        { signal: "Discovery", value: "Shorts feed (viral potential, but ephemeral)" },
                                        { signal: "Monetization", value: "Lower RPM, but Shorts ads fund since 2023" },
                                        { signal: "Compounding Value", value: "Low — Shorts traffic rarely converts to subscribers" },
                                    ].map((row) => (
                                        <div key={row.signal} className="flex justify-between text-sm border-b border-slate-100 pb-2">
                                            <span className="text-slate-500 font-medium">{row.signal}</span>
                                            <span className="text-slate-800 font-semibold text-right max-w-[60%]">{row.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 bg-amber-50 rounded-2xl p-6 border border-amber-200">
                            <div className="flex items-start gap-3">
                                <FaLightbulb className="text-amber-500 text-xl flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-bold text-amber-900 mb-1">Strategic Recommendation for 2026</p>
                                    <p className="text-amber-800 text-sm leading-relaxed">
                                        Use <strong>Shorts as a top-of-funnel awareness tool</strong> (post clips from long-form videos) and <strong>long-form as your monetization and SEO engine</strong>. Do not let Shorts eat your long-form production time. The highest-earning channels in 2026 prioritize 10–15 minute long-form videos in high-CPM niches.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 6: Watch Time and Session Time */}
                    <section className="glass-premium rounded-3xl p-8 md:p-12 shadow-sm border border-white/60">
                        <div className="mb-6">
                            <span className="inline-block px-3 py-1 rounded-full bg-cyan-100 text-cyan-700 text-xs font-bold uppercase tracking-widest mb-3">Retention Strategies</span>
                            <h2 className="text-3xl font-black text-slate-900 font-outfit">How to Optimize Watch Time and Session Time</h2>
                            <p className="text-slate-500 mt-2 text-lg">Watch time is the fuel of the algorithm. These tactics keep viewers watching longer — and watching more of your videos.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-lg font-black text-slate-900 mb-4">Individual Video Retention</h3>
                                <div className="space-y-3">
                                    {[
                                        { tactic: "Open Loop Hook", desc: "Start with an unanswered question or shocking statement that only gets resolved later in the video." },
                                        { tactic: "Pattern Interrupts", desc: "Change camera angle, music, or pacing every 60–90 seconds to prevent mental fatigue." },
                                        { tactic: "'Coming Up Next' Teases", desc: "Verbally preview what&apos;s coming at natural drop-off points (end of each section)." },
                                        { tactic: "B-Roll Variety", desc: "Cut to supporting footage, graphics, or screen recordings frequently during talking-head segments." },
                                        { tactic: "Chapter Markers", desc: "Add chapters in the description — viewers who know the structure are more likely to finish." },
                                    ].map((item) => (
                                        <div key={item.tactic} className="bg-white rounded-xl p-4 border border-slate-200">
                                            <div className="font-bold text-slate-900 text-sm mb-1">{item.tactic}</div>
                                            <div className="text-slate-500 text-sm">{item.desc}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-black text-slate-900 mb-4">Session Time (Cross-Video)</h3>
                                <div className="space-y-3">
                                    {[
                                        { tactic: "End Screen Videos", desc: "At the 20-second mark, add 2 end screen video cards pointing to your most relevant follow-up content." },
                                        { tactic: "Strategic Playlists", desc: "Auto-play enabled playlists keep viewers in your content ecosystem. Create 5–10 video topic clusters." },
                                        { tactic: "In-Video Cards", desc: "Add cards at retention drop-off points (visible in YouTube Studio analytics) pointing to related content." },
                                        { tactic: "Comment Engagement", desc: "Pin a comment asking a question. Active comment sections increase return visit rates." },
                                        { tactic: "Content Series", desc: "Multi-part series create binge-watching behavior — the most powerful session time multiplier." },
                                    ].map((item) => (
                                        <div key={item.tactic} className="bg-white rounded-xl p-4 border border-slate-200">
                                            <div className="font-bold text-slate-900 text-sm mb-1">{item.tactic}</div>
                                            <div className="text-slate-500 text-sm">{item.desc}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 7: CPM Impact */}
                    <section className="bg-gradient-to-br from-purple-950 to-slate-900 rounded-3xl p-8 md:p-12 text-white">
                        <div className="mb-6">
                            <span className="inline-block px-3 py-1 rounded-full bg-purple-500/30 border border-purple-400/30 text-purple-300 text-xs font-bold uppercase tracking-widest mb-3">Revenue Impact</span>
                            <h2 className="text-3xl font-black text-white font-outfit">How Algorithm Optimization Affects Your CPM and Earnings</h2>
                        </div>
                        <p className="text-slate-300 text-lg leading-relaxed mb-8">
                            Algorithm optimization does not just get you more views — it directly increases your <strong>CPM and RPM</strong>. When the algorithm distributes your video to high-intent, high-purchasing-power audiences (US, UK, Canada) instead of lower-CPM markets, your earnings per 1,000 views can increase 3–10×.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            {[
                                {
                                    scenario: "Unoptimized Channel",
                                    views: "100,000 views/month",
                                    cpm: "$1.80 avg CPM",
                                    revenue: "~$99/month",
                                    color: "bg-slate-700/50 border-slate-600",
                                },
                                {
                                    scenario: "SEO-Optimized Channel",
                                    views: "100,000 views/month",
                                    cpm: "$6.50 avg CPM",
                                    revenue: "~$357/month",
                                    color: "bg-purple-800/50 border-purple-600",
                                },
                                {
                                    scenario: "Algorithm + Niche Optimized",
                                    views: "100,000 views/month",
                                    cpm: "$14.00 avg CPM",
                                    revenue: "~$770/month",
                                    color: "bg-emerald-800/50 border-emerald-600",
                                },
                            ].map((s) => (
                                <div key={s.scenario} className={`rounded-xl p-5 border ${s.color}`}>
                                    <div className="font-bold text-white mb-3">{s.scenario}</div>
                                    <div className="text-slate-300 text-sm mb-1">{s.views}</div>
                                    <div className="text-slate-300 text-sm mb-1">{s.cpm}</div>
                                    <div className="text-2xl font-black text-emerald-400 mt-2">{s.revenue}</div>
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                href="/tools/youtube-earnings-calculator"
                                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-purple-500 hover:bg-purple-400 text-white font-bold transition-colors"
                            >
                                <FaChartLine /> Calculate Your Potential Earnings
                            </Link>
                            <Link
                                href="/tools/youtube-trend-helper"
                                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold transition-colors border border-white/20"
                            >
                                <FaFireAlt /> Find Trending Topics in Your Niche
                            </Link>
                        </div>
                    </section>

                    <MultiplexAd />

                    {/* Section 8: Tools CTA */}
                    <section>
                        <div className="mb-8 text-center">
                            <h2 className="text-3xl font-black text-slate-900 font-outfit">Free YouTube SEO Tools to Beat the Algorithm</h2>
                            <p className="text-slate-500 mt-2 text-lg">Use these tools to implement every strategy in this guide — all free, no signup required.</p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {[
                                {
                                    href: "/tools/youtube-title-generator",
                                    icon: FaSearch,
                                    name: "YouTube Title Generator",
                                    desc: "Generate keyword-rich, high-CTR titles that rank in search.",
                                    color: "from-purple-500 to-purple-700",
                                },
                                {
                                    href: "/tools/youtube-tag-generator",
                                    icon: FaStar,
                                    name: "YouTube Tag Generator",
                                    desc: "Find the right tags to boost your video's search ranking.",
                                    color: "from-blue-500 to-blue-700",
                                },
                                {
                                    href: "/tools/youtube-description-generator",
                                    icon: FaLightbulb,
                                    name: "Description Generator",
                                    desc: "Create SEO-optimized descriptions with keyword density.",
                                    color: "from-emerald-500 to-emerald-700",
                                },
                                {
                                    href: "/tools/youtube-trend-helper",
                                    icon: FaFireAlt,
                                    name: "Trend Helper",
                                    desc: "Discover trending topics in your niche before they peak.",
                                    color: "from-orange-500 to-orange-700",
                                },
                                {
                                    href: "/tools/youtube-thumbnail-downloader",
                                    icon: FaEye,
                                    name: "Thumbnail Downloader",
                                    desc: "Download competitor thumbnails for design inspiration.",
                                    color: "from-pink-500 to-pink-700",
                                },
                                {
                                    href: "/tools/youtube-earnings-calculator",
                                    icon: FaChartLine,
                                    name: "Earnings Calculator",
                                    desc: "Estimate your monthly AdSense revenue by country and niche.",
                                    color: "from-cyan-500 to-cyan-700",
                                },
                            ].map((tool) => {
                                const Icon = tool.icon;
                                return (
                                    <Link
                                        key={tool.href}
                                        href={tool.href}
                                        className="group block glass-premium rounded-2xl p-6 border border-white/60 hover:border-purple-200 hover:shadow-lg transition-all duration-200"
                                    >
                                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform`}>
                                            <Icon className="text-white text-lg" />
                                        </div>
                                        <h3 className="font-bold text-slate-900 mb-1 group-hover:text-purple-700 transition-colors">{tool.name}</h3>
                                        <p className="text-sm text-slate-500">{tool.desc}</p>
                                        <div className="mt-3 text-xs text-purple-600 font-semibold flex items-center gap-1">
                                            Use for free <FaArrowRight className="text-xs" />
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </section>

                    {/* Section 9: FAQ */}
                    <section>
                        <div className="mb-8">
                            <span className="inline-block px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-widest mb-3">Common Questions</span>
                            <h2 className="text-3xl font-black text-slate-900 font-outfit">YouTube Algorithm FAQ 2026</h2>
                        </div>
                        <div className="space-y-4">
                            {pageFAQs.map((faq, index) => (
                                <div key={index} className="glass-premium rounded-2xl p-6 border border-white/60 shadow-sm">
                                    <h3 className="text-lg font-black text-slate-900 mb-3 flex items-start gap-3">
                                        <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-purple-600 text-white flex items-center justify-center text-sm font-black">
                                            {index + 1}
                                        </span>
                                        {faq.question}
                                    </h3>
                                    <p className="text-slate-600 leading-relaxed pl-10">{faq.answer}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Final CTA */}
                    <section className="text-center glass-premium rounded-3xl p-10 border border-purple-100 shadow-sm">
                        <FaYoutube className="text-5xl text-red-500 mx-auto mb-4" />
                        <h2 className="text-3xl font-black text-slate-900 mb-4 font-outfit">Ready to Beat the YouTube Algorithm?</h2>
                        <p className="text-slate-500 text-lg max-w-2xl mx-auto mb-8">
                            Use our free suite of YouTube SEO tools to implement every strategy on this page. Optimize your titles, tags, descriptions, and track your earnings — all in one place.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Link
                                href="/tools/youtube-title-generator"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-500 hover:to-purple-700 text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-200"
                            >
                                <FaSearch /> Start with Title Generator
                            </Link>
                            <Link
                                href="/tools/youtube-earnings-calculator"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white border-2 border-purple-200 hover:border-purple-400 text-purple-700 font-bold text-lg transition-all duration-200"
                            >
                                <FaChartLine /> Calculate Your Earnings
                            </Link>
                        </div>
                    </section>

                </div>
            </div>
        </>
    );
}
