import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { getArticleSchema, getBreadcrumbSchema } from "@/lib/seo";
import Link from "next/link";
import Image from "next/image";
import { FaPlay, FaLightbulb, FaFire, FaTrophy, FaHeart, FaLaugh, FaBookOpen, FaRocket } from "react-icons/fa";

export const metadata: Metadata = {
    title: "100 YouTube Shorts Ideas That Go Viral in 2026 | Every Niche",
    description: "Get 100 viral YouTube Shorts ideas for 2026. Ideas for gaming, beauty, fitness, finance, comedy, education & more. Start creating today with these proven concepts.",
    keywords: [
        "youtube shorts ideas",
        "viral shorts ideas",
        "short video ideas",
        "youtube shorts content ideas",
        "shorts video ideas",
        "what to post on youtube shorts",
        "youtube shorts ideas 2026",
        "tiktok video ideas",
        "viral video ideas",
        "short form content ideas"
    ],
    openGraph: {
        title: "100 YouTube Shorts Ideas That Go Viral 2026",
        description: "Viral Shorts ideas for every niche. Gaming, beauty, fitness, finance, comedy & more.",
        url: `${siteConfig.url}/blog/youtube-shorts-ideas-2026`,
        images: [`${siteConfig.url}/images/blog/youtube-shorts-ideas-2026.png`],
        type: "article",
    },
    alternates: {
        canonical: "/blog/youtube-shorts-ideas-2026",
    },
};

const ideasByCategory = [
    {
        category: "🎮 Gaming",
        icon: FaPlay,
        color: "purple",
        ideas: [
            "Best gaming moments compilation",
            "Game tips in 60 seconds",
            "Rage quit reactions",
            "Before vs after gaming skills",
            "Unpopular gaming opinions",
            "Speed run attempts",
            "Easter eggs you missed",
            "Rating games by their soundtrack",
            "What $1 vs $1000 gaming setup looks like",
            "Explain a game plot badly"
        ]
    },
    {
        category: "💄 Beauty & Fashion",
        icon: FaHeart,
        color: "pink",
        ideas: [
            "Get ready with me (GRWM)",
            "Before and after makeup transformation",
            "Testing viral beauty hacks",
            "Outfit of the day (OOTD)",
            "Celebrity makeup recreation",
            "Skincare routine speed run",
            "Rating celebrity outfits",
            "Thrift haul try-on",
            "5-minute makeup challenge",
            "Building outfit from one color"
        ]
    },
    {
        category: "💪 Fitness & Health",
        icon: FaTrophy,
        color: "green",
        ideas: [
            "30-second workout you can do anywhere",
            "What I eat in a day",
            "Gym fails compilation",
            "Before and after fitness transformation",
            "Quick healthy recipe",
            "Form check: common mistakes",
            "Morning routine for productivity",
            "Stretches for back pain",
            "Workout motivation clips",
            "Healthy meal prep in 60 seconds"
        ]
    },
    {
        category: "💰 Finance & Business",
        icon: FaRocket,
        color: "blue",
        ideas: [
            "Money saving tip of the day",
            "Side hustle ideas that work",
            "Investing 101 in 60 seconds",
            "How I made $X this month",
            "Budget shopping hacks",
            "Financial mistakes to avoid",
            "Credit score tips",
            "Passive income ideas",
            "Day in my life as [profession]",
            "Business idea validation"
        ]
    },
    {
        category: "😂 Comedy & Entertainment",
        icon: FaLaugh,
        color: "yellow",
        ideas: [
            "Expectation vs reality",
            "Things only [group] understand",
            "POV: [relatable situation]",
            "When your mom/dad says...",
            "Types of people at [place]",
            "If [app/thing] was a person",
            "Reacting to my old photos/videos",
            "Pranking my friend/family",
            "Awkward situations compilation",
            "Unpopular opinions"
        ]
    },
    {
        category: "📚 Education & How-To",
        icon: FaBookOpen,
        color: "indigo",
        ideas: [
            "Things they don't teach in school",
            "Quick study tips",
            "Life hacks that actually work",
            "History facts in 60 seconds",
            "Science experiment at home",
            "Language learning tip",
            "Psychology facts about humans",
            "How to [skill] for beginners",
            "Book summary in 60 seconds",
            "Career advice nobody gives you"
        ]
    },
    {
        category: "🍳 Food & Cooking",
        icon: FaFire,
        color: "orange",
        ideas: [
            "Recipe in 60 seconds",
            "Rating fast food secret menu items",
            "Trying viral food trends",
            "What I eat in a day",
            "Restaurant vs homemade",
            "Cooking challenge",
            "Food from different countries",
            "Budget meal ideas",
            "Satisfying cooking videos",
            "Kitchen hacks you need"
        ]
    },
    {
        category: "🎵 Music & Dance",
        icon: FaHeart,
        color: "red",
        ideas: [
            "Dance tutorial breakdown",
            "Singing cover clips",
            "Beat drop transitions",
            "Learning viral dances",
            "Music production in 60 seconds",
            "Song recommendations",
            "Rating popular songs",
            "Instrument covers",
            "Behind the scenes: making a beat",
            "Duet challenges"
        ]
    },
    {
        category: "🐾 Pets & Animals",
        icon: FaHeart,
        color: "amber",
        ideas: [
            "Cute pet moments",
            "Pet fails compilation",
            "Day in the life of my pet",
            "Pet reacts to [thing]",
            "Training tips in 60 seconds",
            "Pet transformation videos",
            "Animals being derpy",
            "Pet vs vacuum cleaner",
            "Introducing pets to new things",
            "Pet costume ideas"
        ]
    },
    {
        category: "✈️ Travel & Lifestyle",
        icon: FaRocket,
        color: "cyan",
        ideas: [
            "Hidden gems in [city]",
            "Travel hacks you need",
            "Best views from around the world",
            "A day in [city] in 60 seconds",
            "Hotel room tour",
            "Packing hacks",
            "Things to do in [destination]",
            "Travel fails",
            "Best street food locations",
            "Sunrise/sunset timelapse"
        ]
    }
];

export default function YouTubeShortsIdeasPage() {
    const articleSchema = getArticleSchema({
        title: metadata.title as string,
        description: metadata.description as string,
        url: `${siteConfig.url}/blog/youtube-shorts-ideas-2026`,
        imageUrl: `${siteConfig.url}/images/blog/youtube-shorts-ideas-2026.png`,
        datePublished: "2026-02-04",
        dateModified: "2026-02-04",
        author: siteConfig.name,
    });

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "What are good ideas for YouTube Shorts?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Good YouTube Shorts ideas include: tutorials and how-tos (60-second tips), before/after transformations, reaction videos, day-in-the-life clips, POV skits, product reviews, quick recipes, workout demos, gaming highlights, and trending challenge participation. The best Shorts are entertaining, educational, or relatable within the first 2 seconds."
                }
            },
            {
                "@type": "Question",
                "name": "What type of Shorts go viral?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Shorts that go viral typically have: a strong hook in the first second, high watch-time (viewers watch until the end), shareability factor, trending audio or topics, emotional appeal (funny, surprising, satisfying), and original concepts. Educational content explaining things simply and relatable comedy sketches tend to perform well."
                }
            },
            {
                "@type": "Question",
                "name": "How often should I post YouTube Shorts?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "For optimal growth, post 1-3 YouTube Shorts per day. Consistency is more important than frequency - it's better to post 1 quality Short daily than 7 mediocre ones once a week. The YouTube algorithm favors channels that post regularly, and more Shorts means more chances to go viral."
                }
            }
        ]
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

            <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 pb-24">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-300 text-sm font-bold mb-6">
                            <FaLightbulb className="text-lg" />
                            Content Ideas 2026
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-8 leading-tight">
                            100 YouTube Shorts Ideas<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">That Go Viral</span>
                        </h1>
                        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
                            Never run out of content ideas. 100 proven Shorts concepts across 10 niches. Start creating today.
                        </p>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid md:grid-cols-4 gap-4 mb-16">
                        <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-5 text-white text-center">
                            <div className="text-3xl font-bold mb-1">100</div>
                            <div className="text-red-100 text-sm">Video Ideas</div>
                        </div>
                        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-5 text-white text-center">
                            <div className="text-3xl font-bold mb-1">10</div>
                            <div className="text-orange-100 text-sm">Niches Covered</div>
                        </div>
                        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl p-5 text-white text-center">
                            <div className="text-3xl font-bold mb-1">60s</div>
                            <div className="text-yellow-100 text-sm">Max Length</div>
                        </div>
                        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-5 text-white text-center">
                            <div className="text-3xl font-bold mb-1">1-3x</div>
                            <div className="text-green-100 text-sm">Post Daily</div>
                        </div>
                    </div>

                    {/* Pro Tips */}
                    <div className="mb-8">
                        <Image
                            src="/images/blog/youtube-shorts-ideas-2026-viral.png"
                            alt="Viral YouTube Shorts Concept Art and Strategy"
                            width={1200}
                            height={675}
                            className="w-full rounded-xl border border-slate-200 dark:border-slate-800"
                        />
                    </div>
                    <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border-2 border-red-200 dark:border-red-800 rounded-3xl p-8 mb-16">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                            <FaFire className="text-red-500" />
                            Tips for Viral Shorts
                        </h2>
                        <div className="grid md:grid-cols-2 gap-4 text-slate-700 dark:text-slate-300">
                            <p>🎯 Hook viewers in the first 1-2 seconds</p>
                            <p>⏱️ Keep it under 30 seconds for best retention</p>
                            <p>🔊 Use trending audio when relevant</p>
                            <p>📝 Add text overlays for silent viewers</p>
                            <p>🔁 Create loop-worthy endings</p>
                            <p>📱 Film vertically in 9:16 ratio</p>
                        </div>
                    </div>

                    {/* Ideas by Category */}
                    <div className="space-y-12 mb-16">
                        {ideasByCategory.map((cat, catIndex) => (
                            <div key={catIndex} className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800">
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">{cat.category}</h2>
                                <div className="grid md:grid-cols-2 gap-3">
                                    {cat.ideas.map((idea, ideaIndex) => (
                                        <div key={ideaIndex} className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                                            <span className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 text-sm font-bold">
                                                {catIndex * 10 + ideaIndex + 1}
                                            </span>
                                            <span className="text-slate-700 dark:text-slate-300">{idea}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* FAQ */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">FAQ</h2>
                        <div className="space-y-6">
                            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">What are good ideas for YouTube Shorts?</h3>
                                <p className="text-slate-600 dark:text-slate-400">Tutorials, transformations, reactions, day-in-the-life, POV skits, quick recipes, gaming highlights, and trending challenges all perform well on Shorts.</p>
                            </div>
                            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">How often should I post Shorts?</h3>
                                <p className="text-slate-600 dark:text-slate-400">Post 1-3 Shorts daily for optimal growth. Consistency matters more than frequency - 1 quality Short daily beats 7 mediocre ones weekly.</p>
                            </div>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-3xl p-12 text-center text-white">
                        <h2 className="text-3xl font-bold mb-6">Ready to Monetize Your Shorts?</h2>
                        <p className="text-red-100 text-lg mb-8">Learn how to make money from YouTube Shorts in 2026.</p>
                        <Link href="/blog/youtube-shorts-monetization-2026" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-red-600 rounded-xl font-bold hover:bg-slate-100 transition-colors">
                            <FaPlay /> Shorts Monetization Guide
                        </Link>
                    </div>

                    <div className="text-center text-slate-600 dark:text-slate-400 mt-12">
                        <p><strong>Published:</strong> February 4, 2026 | Written by {siteConfig.name}</p>
                    </div>
                </div>
            </div>
        </>
    );
}
