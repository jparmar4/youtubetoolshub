"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaCrown, FaChartBar, FaRocket, FaFire, FaLightbulb, FaMagic, FaImage, FaYoutube, FaArrowRight } from "react-icons/fa";
import { useUsage } from "@/hooks/useUsage";
import { tools } from "@/config/tools";
import Link from "next/link";
import Image from "next/image";

interface TrendingVideo {
    id: string;
    title: string;
    channel: string;
    views: string;
    tags: string[];
}

export default function DashboardPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const { summary: usage, loading: usageLoading } = useUsage();

    // Trending State
    const [trendingVideos, setTrendingVideos] = useState<TrendingVideo[]>([]);
    const [trendingLoading, setTrendingLoading] = useState(true);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/sign-in");
        }
    }, [status, router]);

    useEffect(() => {
        const fetchTrending = async () => {
            try {
                const res = await fetch('/api/trending?region=us');
                const data = await res.json();
                if (data.success && data.videos) {
                    setTrendingVideos(data.videos.slice(0, 5));
                }
            } catch (e) {
                console.error("Failed to fetch trending:", e);
            } finally {
                setTrendingLoading(false);
            }
        };

        if (status === "authenticated") {
            fetchTrending();
        }
    }, [status]);

    if (status === "loading" || usageLoading) {
        return (
            <div className="min-h-screen pt-24 flex justify-center">
                <div className="animate-pulse">Loading Dashboard...</div>
            </div>
        );
    }

    const usagePercent = (used: number, limit: number | string) => {
        if (limit === 'Unlimited') return 0;
        // @ts-ignore
        return Math.min(100, (used / limit) * 100);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-white dark:from-gray-900 dark:to-gray-950 pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header Section */}
                <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 mb-12 border border-white/50 dark:border-gray-700 shadow-sm">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex items-center gap-6">
                            {session?.user?.image ? (
                                <Image
                                    src={session.user.image}
                                    alt={session.user.name || "User"}
                                    width={80}
                                    height={80}
                                    className="rounded-full border-4 border-white dark:border-gray-700 shadow-md"
                                />
                            ) : (
                                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white text-3xl font-bold border-4 border-white dark:border-gray-700 shadow-md">
                                    {session?.user?.name?.[0] || "U"}
                                </div>
                            )}
                            <div>
                                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                                    Welcome back, {session?.user?.name?.split(" ")[0]}!
                                </h1>
                                <p className="text-gray-600 dark:text-gray-300 flex items-center gap-3">
                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-bold shadow-sm ${usage?.isPro ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}>
                                        {usage?.isPro ? <FaCrown /> : null}
                                        {usage?.isPro ? 'PRO Plan' : 'Free Plan'}
                                    </span>
                                    <span className="text-gray-400">•</span>
                                    <span>Member since 2025</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column - Stats & Quick Tools */}
                    <div className="lg:col-span-1 space-y-8">
                        {/* Usage Stats Card */}
                        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                                <FaChartBar className="text-red-500" />
                                Daily Usage
                            </h2>

                            <div className="space-y-6">
                                <div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-gray-600 dark:text-gray-400">AI Text Generations</span>
                                        <span className="font-semibold text-gray-900 dark:text-white">{usage?.aiUsed} / {usage?.aiLimit}</span>
                                    </div>
                                    <div className="h-3 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-red-500 to-orange-500 transition-all duration-500"
                                            style={{ width: `${usagePercent(usage?.aiUsed || 0, usage?.aiLimit || 1)}%` }}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-gray-600 dark:text-gray-400">Image Generations</span>
                                        <span className="font-semibold text-gray-900 dark:text-white">{usage?.imageUsed} / {usage?.imageLimit}</span>
                                    </div>
                                    <div className="h-3 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
                                            style={{ width: `${usagePercent(usage?.imageUsed || 0, usage?.imageLimit || 1)}%` }}
                                        />
                                    </div>
                                </div>
                            </div>

                            {!usage?.isPro && (
                                <Link
                                    href="/pricing"
                                    className="mt-8 block w-full py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold rounded-xl text-center hover:scale-[1.02] transition-transform shadow-lg"
                                >
                                    Upgrade to PRO
                                </Link>
                            )}
                        </div>

                        {/* Quick Access Tools */}
                        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <FaRocket className="text-blue-500" />
                                Quick Tools
                            </h2>
                            <div className="space-y-3">
                                {tools.filter(t => ['youtube-title-generator', 'youtube-thumbnail-generator', 'youtube-video-ideas-generator', 'youtube-channel-audit'].includes(t.slug)).map(tool => (
                                    <Link
                                        key={tool.slug}
                                        href={`/tools/${tool.slug}`}
                                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group"
                                    >
                                        <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 group-hover:bg-white group-hover:text-red-500 group-hover:shadow-sm transition-all">
                                            <tool.icon />
                                        </div>
                                        <div>
                                            <div className="font-semibold text-gray-900 dark:text-white text-sm">{tool.name}</div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[180px]">{tool.shortDescription}</div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Workflow & Trending */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Hero Card - Smart Workflow */}
                        <div className="relative overflow-hidden bg-gradient-to-br from-red-600 to-orange-600 rounded-3xl p-8 text-white shadow-xl">
                            <div className="absolute top-0 right-0 p-8 opacity-10">
                                <FaYoutube className="text-9xl transform rotate-12" />
                            </div>
                            <div className="relative z-10">
                                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm font-bold mb-4 border border-white/20">
                                    <FaRocket className="text-yellow-300" />
                                    <span>AI Workflow Chain</span>
                                </div>
                                <h2 className="text-3xl font-bold mb-3">Create Your Next Viral Video</h2>
                                <p className="text-red-100 mb-8 max-w-lg text-lg">
                                    Follow our proven 4-step AI workflow to generate ideas, titles, descriptions, and thumbnails in one continuous flow.
                                </p>

                                <div className="flex flex-wrap items-center gap-4 mb-8">
                                    <div className="flex items-center gap-2 bg-black/20 rounded-lg px-3 py-2 border border-white/10">
                                        <FaLightbulb className="text-yellow-300" /> <span className="text-sm font-medium">Idea</span>
                                    </div>
                                    <FaArrowRight className="text-white/40" />
                                    <div className="flex items-center gap-2 bg-black/20 rounded-lg px-3 py-2 border border-white/10">
                                        <FaMagic className="text-blue-300" /> <span className="text-sm font-medium">Title</span>
                                    </div>
                                    <FaArrowRight className="text-white/40" />
                                    <div className="flex items-center gap-2 bg-black/20 rounded-lg px-3 py-2 border border-white/10">
                                        <FaImage className="text-purple-300" /> <span className="text-sm font-medium">Thumb</span>
                                    </div>
                                </div>

                                <Link
                                    href="/tools/youtube-video-ideas-generator"
                                    className="inline-flex items-center gap-2 bg-white text-red-600 px-8 py-3.5 rounded-xl font-bold hover:bg-red-50 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                >
                                    Start the Chain <FaArrowRight />
                                </Link>
                            </div>
                        </div>

                        {/* Trending Section */}
                        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                    <FaFire className="text-orange-500" />
                                    Trending Now (US)
                                </h2>
                                <span className="text-xs font-medium text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">Live Data</span>
                            </div>

                            {trendingLoading ? (
                                <div className="space-y-4">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="animate-pulse flex items-start gap-4">
                                            <div className="w-16 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                                            <div className="flex-1 space-y-2">
                                                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                                                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : trendingVideos.length > 0 ? (
                                <div className="space-y-6">
                                    {trendingVideos.map((video, index) => (
                                        <Link
                                            key={video.id}
                                            href={`/tools/youtube-video-ideas-generator?topic=${encodeURIComponent(video.title)}`}
                                            className="group flex items-start gap-4 p-4 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors border border-transparent hover:border-gray-100 dark:hover:border-gray-600"
                                        >
                                            <div className="flex-shrink-0 font-mono text-2xl font-bold text-gray-300 dark:text-gray-600 group-hover:text-red-500 transition-colors w-8">
                                                {index + 1}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2 group-hover:text-red-500 transition-colors">
                                                    {video.title}
                                                </h3>
                                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                                    {video.channel} • {parseInt(video.views).toLocaleString()} views
                                                </p>
                                                {video.tags && video.tags.length > 0 && (
                                                    <div className="flex flex-wrap gap-2 mt-3">
                                                        {video.tags.slice(0, 3).map(tag => (
                                                            <span key={tag} className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded">
                                                                #{tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-shrink-0 self-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <FaMagic className="text-gray-400 group-hover:text-red-500" />
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12 text-gray-500">
                                    <p>No trending videos available right now.</p>
                                </div>
                            )}
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}
