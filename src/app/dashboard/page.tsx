"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaCrown, FaChartBar, FaRocket, FaFire, FaLightbulb, FaMagic, FaImage, FaYoutube, FaArrowRight, FaHistory, FaClock, FaCheckCircle, FaStar } from "react-icons/fa";
import { useUsage } from "@/hooks/useUsage";
import { tools } from "@/config/tools";
import Link from "next/link";
import Image from "next/image";
import { Card, ToolCard } from "@/components/ui/Card";
import { getSavedItems, SavedItem } from "@/lib/dashboard";
import { formatDistanceToNow } from "date-fns";

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

    // State
    const [trendingVideos, setTrendingVideos] = useState<TrendingVideo[]>([]);
    const [trendingLoading, setTrendingLoading] = useState(true);
    const [history, setHistory] = useState<SavedItem[]>([]);
    const [historyLoading, setHistoryLoading] = useState(true);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/sign-in");
        }
    }, [status, router]);

    useEffect(() => {
        const fetchData = async () => {
            if (status !== "authenticated") return;

            // Fetch Trending
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

            // Fetch History
            try {
                const items = await getSavedItems();
                setHistory(items.slice(0, 5));
            } catch (e) {
                console.error("Failed to fetch history:", e);
            } finally {
                setHistoryLoading(false);
            }
        };

        fetchData();
    }, [status]);

    if (status === "loading" || usageLoading) {
        return (
            <div className="min-h-screen pt-24 flex justify-center items-center bg-slate-50 dark:bg-slate-900">
                <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin text-4xl text-purple-600"><FaRocket /></div>
                    <div className="animate-pulse text-slate-500">Loading Dashboard...</div>
                </div>
            </div>
        );
    }

    const usagePercent = (used: number, limit: number | string) => {
        if (limit === 'Unlimited') return 0;
        // @ts-ignore
        return Math.min(100, (used / limit) * 100);
    };

    const getToolBySlug = (slug: string) => tools.find(t => t.slug === slug);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-28 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header Section */}
                <div className="glass-premium rounded-3xl p-8 mb-10 border border-slate-200/50 dark:border-slate-800 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex items-center gap-6">
                            {session?.user?.image ? (
                                <Image
                                    src={session.user.image}
                                    alt={session.user.name || "User"}
                                    width={80}
                                    height={80}
                                    className="rounded-2xl border-4 border-white dark:border-slate-800 shadow-lg"
                                />
                            ) : (
                                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-fuchsia-500 flex items-center justify-center text-white text-3xl font-bold border-4 border-white dark:border-slate-800 shadow-lg">
                                    {session?.user?.name?.[0] || "U"}
                                </div>
                            )}
                            <div>
                                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2">
                                    Welcome back, <span className="bg-gradient-to-r from-purple-600 to-fuchsia-600 bg-clip-text text-transparent">{session?.user?.name?.split(" ")[0]}</span>!
                                </h1>
                                <div className="flex items-center gap-3">
                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-bold shadow-sm ${usage?.isPro ? 'bg-gradient-to-r from-yellow-400 to-amber-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'}`}>
                                        {usage?.isPro ? <FaCrown /> : null}
                                        {usage?.isPro ? 'PRO Plan' : 'Free Plan'}
                                    </span>
                                    <span className="text-slate-300">•</span>
                                    <span className="text-slate-500 dark:text-slate-400 text-sm">Member since 2025</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column - Stats & History */}
                    <div className="lg:col-span-1 space-y-8">
                        {/* Usage Stats Card */}
                        <Card className="p-6 bg-white dark:bg-slate-900">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                                <span className="p-2 rounded-lg bg-blue-50 text-blue-600"><FaChartBar /></span>
                                Monthly Usage
                            </h2>

                            <div className="space-y-6">
                                <div>
                                    <div className="flex justify-between text-sm mb-2 font-medium">
                                        <span className="text-slate-600 dark:text-slate-400">AI Text Credits</span>
                                        <span className="text-slate-900 dark:text-white">{usage?.aiUsed} / {usage?.aiLimit}</span>
                                    </div>
                                    <div className="h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-1000 ease-out"
                                            style={{ width: `${usagePercent(usage?.aiUsed || 0, usage?.aiLimit || 1)}%` }}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex justify-between text-sm mb-2 font-medium">
                                        <span className="text-slate-600 dark:text-slate-400">Image Generations</span>
                                        <span className="text-slate-900 dark:text-white">{usage?.imageUsed} / {usage?.imageLimit}</span>
                                    </div>
                                    <div className="h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-1000 ease-out"
                                            style={{ width: `${usagePercent(usage?.imageUsed || 0, usage?.imageLimit || 1)}%` }}
                                        />
                                    </div>
                                </div>
                            </div>

                            {!usage?.isPro && (
                                <Link
                                    href="/pricing"
                                    className="mt-8 block w-full py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-xl text-center hover:scale-[1.02] transition-transform shadow-lg"
                                >
                                    Upgrade to PRO
                                </Link>
                            )}
                        </Card>

                        {/* Recent Activity */}
                        <Card className="p-6 bg-white dark:bg-slate-900">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                <span className="p-2 rounded-lg bg-green-50 text-green-600"><FaHistory /></span>
                                Recent Activity
                            </h2>

                            {historyLoading ? (
                                <div className="space-y-3 animate-pulse">
                                    {[1, 2, 3].map(i => <div key={i} className="h-12 bg-slate-100 rounded-xl" />)}
                                </div>
                            ) : history.length > 0 ? (
                                <div className="space-y-3">
                                    {history.map((item) => {
                                        const tool = getToolBySlug(item.toolSlug);
                                        return (
                                            <div key={item.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors border border-transparent hover:border-slate-100">
                                                <div className="flex-shrink-0 text-slate-400">
                                                    {tool ? <tool.icon /> : <FaCheckCircle />}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="text-sm font-medium text-slate-900 dark:text-white truncate">
                                                        {tool?.name || "Generated Content"}
                                                    </div>
                                                    <div className="text-xs text-slate-500 flex items-center gap-1">
                                                        <FaClock className="w-3 h-3" />
                                                        {item.date ? new Date(item.date).toLocaleDateString() : 'Just now'}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                    <Link href="/history" className="block text-center text-sm text-purple-600 font-medium hover:text-purple-700 mt-4">
                                        View All History →
                                    </Link>
                                </div>
                            ) : (
                                <div className="text-center py-8 text-slate-500 text-sm">
                                    No activity yet. Start using tools!
                                </div>
                            )}
                        </Card>
                    </div>

                    {/* Right Column - Workflow & Tools */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Hero Card - Smart Workflow */}
                        <div className="relative overflow-hidden bg-gradient-to-br from-purple-600 to-indigo-600 rounded-3xl p-8 text-white shadow-xl group">
                            <div className="absolute top-0 right-0 p-8 opacity-10 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-12">
                                <FaRocket className="text-9xl" />
                            </div>
                            <div className="relative z-10">
                                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm font-bold mb-4 border border-white/20">
                                    <FaStar className="text-yellow-300" />
                                    <span>Recommended Workflow</span>
                                </div>
                                <h2 className="text-3xl font-bold mb-3">Create Your Next Viral Video</h2>
                                <p className="text-purple-100 mb-8 max-w-lg text-lg">
                                    Follow our proven 4-step AI workflow to generate ideas, titles, descriptions, and thumbnails in one continuous flow.
                                </p>

                                <div className="flex flex-wrap items-center gap-3 mb-8">
                                    <div className="flex items-center gap-2 bg-black/20 rounded-lg px-3 py-2 border border-white/10">
                                        <FaLightbulb className="text-yellow-300" /> <span className="text-sm font-medium">Idea</span>
                                    </div>
                                    <FaArrowRight className="text-white/40 text-sm" />
                                    <div className="flex items-center gap-2 bg-black/20 rounded-lg px-3 py-2 border border-white/10">
                                        <FaMagic className="text-purple-300" /> <span className="text-sm font-medium">Title</span>
                                    </div>
                                    <FaArrowRight className="text-white/40 text-sm" />
                                    <div className="flex items-center gap-2 bg-black/20 rounded-lg px-3 py-2 border border-white/10">
                                        <FaImage className="text-pink-300" /> <span className="text-sm font-medium">Thumb</span>
                                    </div>
                                </div>

                                <Link
                                    href="/tools/youtube-video-ideas-generator"
                                    className="inline-flex items-center gap-2 bg-white text-purple-600 px-8 py-3.5 rounded-xl font-bold hover:bg-purple-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                >
                                    Start Workflow <FaArrowRight />
                                </Link>
                            </div>
                        </div>

                        {/* Quick Access Tools Grid */}
                        <div>
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                <FaRocket className="text-purple-500" />
                                Popular Tools
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {tools.filter(t => ['youtube-title-generator', 'youtube-thumbnail-generator', 'youtube-video-ideas-generator', 'youtube-channel-audit'].includes(t.slug)).map(tool => (
                                    <ToolCard
                                        key={tool.slug}
                                        icon={<tool.icon />}
                                        title={tool.name}
                                        description={tool.shortDescription}
                                        href={`/tools/${tool.slug}`}
                                        isAI={tool.isAI}
                                    />
                                ))}
                            </div>
                            <div className="mt-4 text-right">
                                <Link href="/tools" className="text-sm font-medium text-slate-500 hover:text-purple-600 transition-colors">
                                    View All Tools →
                                </Link>
                            </div>
                        </div>

                        {/* Trending Section */}
                        <Card className="p-8 bg-white dark:bg-slate-900">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                    <span className="p-2 rounded-lg bg-orange-50 text-orange-500"><FaFire /></span>
                                    Trending Now (US)
                                </h2>
                                <span className="text-xs font-medium text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">Live Data</span>
                            </div>

                            {trendingLoading ? (
                                <div className="space-y-4">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="animate-pulse flex items-start gap-4">
                                            <div className="w-16 h-10 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
                                            <div className="flex-1 space-y-2">
                                                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
                                                <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : trendingVideos.length > 0 ? (
                                <div className="space-y-4">
                                    {trendingVideos.map((video, index) => (
                                        <Link
                                            key={video.id}
                                            href={`/tools/youtube-video-ideas-generator?topic=${encodeURIComponent(video.title)}`}
                                            className="group flex items-start gap-4 p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors border border-transparent hover:border-slate-100 dark:hover:border-slate-700"
                                        >
                                            <div className="flex-shrink-0 font-mono text-2xl font-bold text-slate-300 dark:text-slate-600 group-hover:text-orange-500 transition-colors w-8">
                                                {index + 1}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-semibold text-slate-900 dark:text-white line-clamp-1 group-hover:text-orange-600 transition-colors">
                                                    {video.title}
                                                </h3>
                                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                                                    {video.channel} • {parseInt(video.views).toLocaleString()} views
                                                </p>
                                                {video.tags && video.tags.length > 0 && (
                                                    <div className="flex flex-wrap gap-2 mt-2">
                                                        {video.tags.slice(0, 3).map(tag => (
                                                            <span key={tag} className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded">
                                                                #{tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-shrink-0 self-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center">
                                                    <FaMagic className="w-4 h-4" />
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12 text-slate-500">
                                    <p>No trending videos available right now.</p>
                                </div>
                            )}
                        </Card>

                    </div>

                </div>
            </div>
        </div>
    );
}
