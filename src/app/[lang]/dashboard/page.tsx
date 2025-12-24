"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaCrown, FaStar, FaTrash, FaHistory, FaChartBar, FaLightbulb, FaHashtag, FaHeading, FaRocket } from "react-icons/fa";
import { getSavedItems, deleteItem, SavedItem } from "@/lib/dashboard";
import { useUsage } from "@/hooks/useUsage"; // New Hook
import { tools } from "@/config/tools";
import Link from "next/link";
import Image from "next/image";

export default function DashboardPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [savedItems, setSavedItems] = useState<SavedItem[]>([]);
    const { summary: usage, loading: usageLoading } = useUsage(); // Use the hook

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/sign-in");
        }
    }, [status, router]);

    useEffect(() => {
        const loadSavedItems = async () => {
            const items = await getSavedItems();
            setSavedItems(items);
        };

        if (status === "authenticated") {
            loadSavedItems();
        }
    }, [status]);

    const handleDelete = async (id: string) => {
        // Optimistic update
        setSavedItems(prev => prev.filter(i => i.id !== id));
        await deleteItem(id);
    };

    if (status === "loading" || usageLoading) {
        return (
            <div className="min-h-screen pt-24 flex justify-center">
                <div className="animate-pulse">Loading Dashboard...</div>
            </div>
        );
    }

    const usagePercent = (used: number, limit: number | string) => {
        if (limit === 'Unlimited') return 0; // Show 0% usage visually for unlimited or handle differently
        // @ts-ignore
        return Math.min(100, (used / limit) * 100);
    };

    const getIconForType = (type: string) => {
        switch (type) {
            case 'audit': return <FaChartBar className="text-red-500" />;
            case 'title': return <FaHeading className="text-blue-500" />;
            case 'idea': return <FaLightbulb className="text-yellow-500" />;
            case 'hashtag': return <FaHashtag className="text-purple-500" />;
            default: return <FaStar className="text-gray-400" />;
        }
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

                    {/* Right Column - Saved Items */}
                    <div className="lg:col-span-2">
                        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 min-h-[600px]">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                                <FaHistory className="text-orange-500" />
                                Your Saved Items
                            </h2>

                            {savedItems.length === 0 ? (
                                <div className="text-center py-20 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700">
                                    <div className="w-20 h-20 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl shadow-sm">
                                        📂
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No saved items yet</h3>
                                    <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto mb-8">
                                        Start using tools to populate your dashboard with ideas, titles, and audit reports.
                                    </p>
                                    <Link
                                        href="/tools"
                                        className="inline-flex items-center justify-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-colors shadow-md hover:shadow-lg"
                                    >
                                        Browse All Tools
                                    </Link>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {savedItems.map((item) => (
                                        <div key={item.id} className="group flex items-start gap-4 p-5 rounded-2xl bg-gray-50 dark:bg-gray-900/50 hover:bg-white dark:hover:bg-gray-700/50 hover:shadow-md transition-all border border-transparent hover:border-gray-100 dark:hover:border-gray-600">
                                            <div className="mt-1 flex-shrink-0 w-12 h-12 rounded-xl bg-white dark:bg-gray-800 flex items-center justify-center text-xl shadow-sm group-hover:scale-110 transition-transform">
                                                {getIconForType(item.type)}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-start justify-between">
                                                    <div>
                                                        <h3 className="font-semibold text-lg text-gray-900 dark:text-white truncate pr-4">
                                                            {/* Render content based on type */}
                                                            {item.type === 'audit' ? <span className="text-red-600 dark:text-red-400">Channel Audit: Score {item.content.score}/100</span> :
                                                                item.type === 'title' ? item.content :
                                                                    item.type === 'hashtag' ? item.content.join(', ') :
                                                                        JSON.stringify(item.content).slice(0, 50)}
                                                        </h3>
                                                        <div className="flex items-center gap-3 mt-1.5">
                                                            <span className="text-xs font-medium px-2 py-0.5 rounded bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                                                                {item.toolSlug.replace(/-/g, ' ')}
                                                            </span>
                                                            <span className="text-xs text-gray-400">
                                                                {new Date(item.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <button
                                                        onClick={() => handleDelete(item.id)}
                                                        className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                                                        title="Delete item"
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
