"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import ToolPageLayout from "@/components/tools/ToolPageLayout";
import { FaSearch, FaSpinner, FaListUl, FaPlayCircle, FaForward } from "react-icons/fa";
import { formatDuration } from "@/lib/utils";
import Image from "next/image";

const faq = [
    {
        question: "How does the Playlist Length Calculator work?",
        answer: "It fetches all videos in a YouTube playlist, extracts their durations using the YouTube Data API, and sums them up to give you the total watch time."
    },
    {
        question: "Does it calculate correctly for deleted or private videos?",
        answer: "Deleted or private videos are skipped by the API, so the calculation only includes watchable videos."
    },
    {
        question: "What is the 1.25x, 1.5x, and 2x speed calculation?",
        answer: "This shows you how much time you save by watching the playlist at faster speeds. Great for estimating study time or binge-watching sessions."
    },
    {
        question: "Why only the first 500 videos?",
        answer: "To ensure fast performance and fair usage, we currently limit calculations to the first 500 videos of a playlist, which covers 99% of playlists."
    },
];

const howTo = [
    "Copy the URL of a YouTube specific playlist (e.g., https://youtube.com/playlist?list=...)",
    "Paste the URL into the input field below",
    "Click 'Calculate Length' to see the breakdown"
];

const seoContent = `Calculate the total duration of any YouTube playlist instantly. 
Perfect for planning your study schedule, binge-watching sessions, or content consumption. 
See how long it takes to watch at 1.25x, 1.5x, and 2x speeds.`;

interface PlaylistResult {
    playlistInfo: {
        title: string;
        thumbnail: string;
        channelTitle: string;
    };
    videoCount: number;
    totalSeconds: number;
    averageSeconds: number;
}

export default function PlaylistLengthCalculator() {
    const [query, setQuery] = useState("");
    const [result, setResult] = useState<PlaylistResult | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleCalculate = async () => {
        setError("");
        setResult(null);

        if (!query.trim()) {
            setError("Please enter a playlist URL");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch("/api/playlist-length", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ query: query.trim() }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || "Failed to calculate playlist length");
                return;
            }

            setResult(data);
        } catch (err) {
            console.error("Calculation error:", err);
            setError("An unexpected error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const formatFullDuration = (seconds: number) => {
        const days = Math.floor(seconds / (3600 * 24));
        const hours = Math.floor((seconds % (3600 * 24)) / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;

        const parts = [];
        if (days > 0) parts.push(`${days} days`);
        if (hours > 0) parts.push(`${hours} hours`);
        if (minutes > 0) parts.push(`${minutes} minutes`);
        if (secs > 0) parts.push(`${secs} seconds`);

        if (parts.length === 0) return "0 seconds";
        return parts.join(", ");
    };

    // Helper to format concise time for speed cards
    const formatConcise = (seconds: number) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = Math.floor(seconds % 60); // Ensure integer

        if (h > 0) return `${h}h ${m}m ${s}s`;
        return `${m}m ${s}s`;
    };

    return (
        <ToolPageLayout
            title="YouTube Playlist Length Calculator"
            description="Find out exactly how long a YouTube playlist is. See total duration and time at different playback speeds."
            faq={faq}
            howTo={howTo}
            seoContent={seoContent}
        >
            <div className="space-y-8">
                {/* Input Section */}
                <div className="max-w-2xl mx-auto">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                            <Input
                                label="Playlist URL"
                                placeholder="https://youtube.com/playlist?list=..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                error={error}
                            />
                        </div>
                        <div className="sm:pt-7">
                            <Button onClick={handleCalculate} isLoading={loading} disabled={loading} className="w-full sm:w-auto">
                                {loading ? (
                                    <>
                                        <FaSpinner className="mr-2 animate-spin" />
                                        Calculating...
                                    </>
                                ) : (
                                    <>
                                        <FaListUl className="mr-2" />
                                        Calculate Length
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Results Section */}
                {result && !loading && (
                    <div className="animate-fade-in space-y-6">
                        {/* Playlist Info */}
                        <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-6 shadow-sm">
                            <div className="flex gap-4 items-center">
                                <div className="relative w-24 h-16 sm:w-32 sm:h-20 shrink-0 rounded-lg overflow-hidden bg-gray-200">
                                    {
                                        result.playlistInfo.thumbnail ? (
                                            <Image
                                                src={result.playlistInfo.thumbnail}
                                                alt={result.playlistInfo.title}
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                <FaPlayCircle className="w-8 h-8" />
                                            </div>
                                        )
                                    }
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1">
                                        {result.playlistInfo.title}
                                    </h2>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                        by {result.playlistInfo.channelTitle} • {result.videoCount} videos
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Main Result */}
                        <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-2xl p-8 text-center text-white shadow-lg shadow-red-500/20">
                            <div className="text-red-100 mb-2 font-medium">Total Duration</div>
                            <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 tracking-tight">
                                {formatFullDuration(result.totalSeconds)}
                            </div>
                            <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-1.5 rounded-full text-sm backdrop-blur-sm">
                                <span className="opacity-80">Average video length:</span>
                                <span className="font-bold">{formatFullDuration(result.averageSeconds)}</span>
                            </div>
                        </div>

                        {/* Speed Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* 1.25x */}
                            <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800/50 rounded-xl p-5">
                                <div className="flex items-center gap-2 mb-2 text-blue-600 dark:text-blue-400">
                                    <FaForward className="w-4 h-4" />
                                    <span className="font-bold">1.25x Speed</span>
                                </div>
                                <div className="text-xl font-bold text-gray-900 dark:text-white">
                                    {formatFullDuration(Math.round(result.totalSeconds / 1.25))}
                                </div>
                                <div className="text-xs text-blue-500 dark:text-blue-400 mt-1">
                                    Save {formatConcise(result.totalSeconds - (result.totalSeconds / 1.25))}
                                </div>
                            </div>

                            {/* 1.5x */}
                            <div className="bg-purple-50 dark:bg-purple-900/10 border border-purple-100 dark:border-purple-800/50 rounded-xl p-5">
                                <div className="flex items-center gap-2 mb-2 text-purple-600 dark:text-purple-400">
                                    <FaForward className="w-4 h-4" />
                                    <span className="font-bold">1.50x Speed</span>
                                </div>
                                <div className="text-xl font-bold text-gray-900 dark:text-white">
                                    {formatFullDuration(Math.round(result.totalSeconds / 1.5))}
                                </div>
                                <div className="text-xs text-purple-500 dark:text-purple-400 mt-1">
                                    Save {formatConcise(result.totalSeconds - (result.totalSeconds / 1.5))}
                                </div>
                            </div>

                            {/* 2.0x */}
                            <div className="bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-800/50 rounded-xl p-5">
                                <div className="flex items-center gap-2 mb-2 text-green-600 dark:text-green-400">
                                    <FaForward className="w-4 h-4" />
                                    <span className="font-bold">2.00x Speed</span>
                                </div>
                                <div className="text-xl font-bold text-gray-900 dark:text-white">
                                    {formatFullDuration(Math.round(result.totalSeconds / 2))}
                                </div>
                                <div className="text-xs text-green-500 dark:text-green-400 mt-1">
                                    Save {formatConcise(result.totalSeconds - (result.totalSeconds / 2))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </ToolPageLayout>
    );
}
