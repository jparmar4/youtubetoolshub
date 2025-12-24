"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaCrown, FaStar, FaTrash, FaHistory, FaChartBar, FaLightbulb, FaHashtag, FaHeading } from "react-icons/fa";
import { getSavedItems, deleteItem, SavedItem } from "@/lib/dashboard";
import { getUsageSummary } from "@/lib/usage";
import { tools } from "@/config/tools";
import Link from "next/link";
import Image from "next/image";

export default function DashboardPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [savedItems, setSavedItems] = useState<SavedItem[]>([]);
    const [usage, setUsage] = useState<any>(null);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/sign-in");
        }
    }, [status, router]);

    useEffect(() => {
        // Load data on mount
        setSavedItems(getSavedItems());
        setUsage(getUsageSummary());

        // Listen for storage updates
        const handleStorage = () => {
            setSavedItems(getSavedItems());
            setUsage(getUsageSummary());
        };

        window.addEventListener('usage_updated', handleStorage);
        return () => window.removeEventListener('usage_updated', handleStorage);
    }, []);

    const handleDelete = (id: string) => {
        deleteItem(id);
        setSavedItems(getSavedItems());
    };

    if (status === "loading") {
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
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-12">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div className="flex items-center gap-4">
                        {session?.user?.image ? (
                            <Image
                                src={session.user.image}
                                alt={session.user.name || "User"}
                                width={64}
                                height={64}
                                className="rounded-full border-4 border-white dark:border-gray-800 shadow-lg"
                            />
                        ) : (
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white text-2xl font-bold border-4 border-white dark:border-gray-800 shadow-lg">
                                {session?.user?.name?.[0] || "U"}
                            </div>
                        )}
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                                Welcome back, {session?.user?.name?.split(" ")[0]}!
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold ${usage?.isPro ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}>
                                    {usage?.isPro ? <FaCrown /> : null}
                                    {usage?.isPro ? 'PRO Plan' : 'Free Plan'}
                                </span>
                                <span>•</span>
                                <span>member since 2025</span>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column - Stats */}
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
                                            className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-500"
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
                                    className="mt-8 block w-full py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold rounded-xl text-center hover:opacity-90 transition-opacity"
                                >
                                    Upgrade to PRO
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Right Column - Saved Items */}
                    <div className="lg:col-span-2">
                        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 min-h-[500px]">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                                <FaHistory className="text-orange-500" />
                                Your Saved Items
                            </h2>

                            {savedItems.length === 0 ? (
                                <div className="text-center py-12">
                                    <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl">
                                        📂
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No saved items yet</h3>
                                    <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto mb-8">
                                        Use our tools to generate ideas, audit channels, or create titles, and save them here.
                                    </p>
                                    <Link
                                        href="/tools"
                                        className="inline-flex items-center justify-center px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl transition-colors"
                                    >
                                        Browse Tools
                                    </Link>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {savedItems.map((item) => (
                                        <div key={item.id} className="group flex items-start gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-gray-900/50 hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-gray-100 dark:hover:border-gray-700">
                                            <div className="mt-1 flex-shrink-0 w-10 h-10 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center text-lg shadow-sm">
                                                {getIconForType(item.type)}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-start justify-between">
                                                    <div>
                                                        <h3 className="font-semibold text-gray-900 dark:text-white truncate pr-4">
                                                            {/* Render content based on type */}
                                                            {item.type === 'audit' ? `Channel Audit: Score ${item.content.score}` :
                                                                item.type === 'title' ? item.content :
                                                                    item.type === 'hashtag' ? item.content.join(', ') :
                                                                        JSON.stringify(item.content).slice(0, 50)}
                                                        </h3>
                                                        <p className="text-xs text-gray-500 mt-1">
                                                            {item.toolSlug.replace(/-/g, ' ')} • {new Date(item.date).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                    <button
                                                        onClick={() => handleDelete(item.id)}
                                                        className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-red-500 transition-all"
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
