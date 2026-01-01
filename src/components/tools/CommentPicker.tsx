"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import ToolPageLayout from "@/components/tools/ToolPageLayout";
import { FaSearch, FaSpinner, FaTrophy, FaFilter, FaQuoteLeft } from "react-icons/fa";
import Image from "next/image";
import confetti from "canvas-confetti";
import { saveHistory } from "@/lib/history";



interface Comment {
    id: string;
    text: string;
    authorDisplayName: string;
    authorProfileImageUrl: string;
    authorChannelUrl: string;
    publishedAt: string;
    likeCount: number;
}

export default function CommentPicker() {
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(false);
    const [error, setError] = useState("");

    // Data
    const [originalComments, setOriginalComments] = useState<Comment[]>([]);
    const [filteredComments, setFilteredComments] = useState<Comment[]>([]);
    const [winner, setWinner] = useState<Comment | null>(null);

    // Settings
    const [filterDuplicates, setFilterDuplicates] = useState(true);
    const [filterText, setFilterText] = useState("");

    const handleLoadComments = async () => {
        setError("");
        setWinner(null);
        setOriginalComments([]);
        setFilteredComments([]);

        if (!url.trim()) {
            setError("Please enter a video URL");
            return;
        }

        setFetching(true);

        try {
            const response = await fetch("/api/comment-picker", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ url: url.trim() }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || "Failed to load comments");
                return;
            }

            setOriginalComments(data.comments);
            applyFilters(data.comments);
        } catch (err) {
            console.error("Comment load error:", err);
            setError("An unexpected error occurred. Please try again.");
        } finally {
            setFetching(false);
        }
    };

    const applyFilters = (comments: Comment[] = originalComments) => {
        let result = [...comments];

        // 1. Text filter
        if (filterText) {
            const lowerFilter = filterText.toLowerCase();
            result = result.filter(c => c.text.toLowerCase().includes(lowerFilter));
        }

        // 2. Duplicates
        if (filterDuplicates) {
            const seen = new Set();
            result = result.filter(c => {
                const uniqueId = c.authorChannelUrl;
                if (seen.has(uniqueId)) return false;
                seen.add(uniqueId);
                return true;
            });
        }

        // 3. Exclude specific users (comma separated names) - optional basic implementation

        setFilteredComments(result);
        setWinner(null); // Reset winner if filters change
    };

    // Re-apply filters when settings change
    const handleSettingChange = (duplicates: boolean, text: string) => {
        setFilterDuplicates(duplicates);
        setFilterText(text);

        // We need to apply filters to original comments with NEW settings
        // But we can't use state immediately here, so pass args or use effect
        // Using a helper function for clarity
        let result = [...originalComments];
        if (text) {
            const lowerFilter = text.toLowerCase();
            result = result.filter(c => c.text.toLowerCase().includes(lowerFilter));
        }
        if (duplicates) {
            const seen = new Set();
            result = result.filter(c => {
                const uniqueId = c.authorChannelUrl; // Use channel URL as unique user ID
                if (seen.has(uniqueId)) return false;
                seen.add(uniqueId);
                return true;
            });
        }
        setFilteredComments(result);
        setWinner(null);
    };

    const pickWinner = () => {
        if (filteredComments.length === 0) return;

        setLoading(true);
        // Simulate "rolling" effect
        setTimeout(async () => {
            const randomIndex = Math.floor(Math.random() * filteredComments.length);
            const luckyWinner = filteredComments[randomIndex];
            setWinner(luckyWinner);
            setLoading(false);

            // Save to Cloud History
            try {
                await saveHistory('youtube-comment-picker', {
                    url,
                    winnerName: luckyWinner.authorDisplayName,
                    winnerComment: luckyWinner.text
                });
            } catch (error) {
                console.error("Failed to save to cloud history:", error);
            }

            // Confetti
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 }
            });
        }, 800);
    };

    return (
        <ToolPageLayout
            title="YouTube Comment Picker"
            slug="youtube-comment-picker"
            description="Pick a random winner for your YouTube giveaway. Filter duplicates and find a fair winner instantly."
        >
            <div className="space-y-8">
                {/* Input Section */}
                <div className="max-w-2xl mx-auto space-y-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                            <Input
                                label="Video URL"
                                placeholder="https://youtube.com/watch?v=..."
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                error={error}
                            />
                        </div>
                        <div className="sm:pt-7">
                            <Button onClick={handleLoadComments} isLoading={fetching} disabled={fetching} className="w-full sm:w-auto">
                                {fetching ? (
                                    <>
                                        <FaSpinner className="mr-2 animate-spin" />
                                        Loading...
                                    </>
                                ) : (
                                    <>
                                        <FaSearch className="mr-2" />
                                        Load Comments
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>

                    {/* Filters - Only show if we have comments or if we want to set them beforehand? Better to show always or after load? Show always for convenience */}
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-4">
                        <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                            <FaFilter className="text-slate-400" /> Contest Rules
                        </h3>

                        <div className="flex flex-col sm:flex-row gap-6">
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={filterDuplicates}
                                    onChange={(e) => handleSettingChange(e.target.checked, filterText)}
                                    className="w-5 h-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                                />
                                <span className="text-slate-700">Filter Duplicates</span>
                            </label>

                            <div className="flex-1">
                                <input
                                    type="text"
                                    placeholder="Must contain text (e.g. #giveaway)"
                                    value={filterText}
                                    onChange={(e) => handleSettingChange(filterDuplicates, e.target.value)}
                                    className="w-full text-sm rounded-lg border-gray-300 bg-white focus:ring-emerald-500 focus:border-emerald-500"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Status Bar */}
                {originalComments.length > 0 && (
                    <div className="flex flex-wrap items-center justify-between gap-4 bg-blue-50 p-4 rounded-xl text-blue-800">
                        <div className="font-medium">
                            Found <span className="font-bold">{originalComments.length}</span> total comments.
                            <span className="mx-2 opacity-50">|</span>
                            <span className="font-bold text-green-600">{filteredComments.length}</span> qualified entries.
                        </div>
                        <Button onClick={pickWinner} isLoading={loading} disabled={loading || filteredComments.length === 0} variant="primary">
                            <FaTrophy className="mr-2" />
                            Pick a Winner
                        </Button>
                    </div>
                )}

                {/* Winner Card */}
                {winner && (
                    <div className="animate-scale-in bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-3xl p-8 relative overflow-hidden text-center">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <FaTrophy className="w-32 h-32 text-yellow-600" />
                        </div>

                        <div className="relative z-10">
                            <h2 className="text-2xl font-bold text-slate-900 mb-6">🎉 We have a Winner! 🎉</h2>

                            <div className="inline-block relative mb-4">
                                <div className="w-24 h-24 rounded-full border-4 border-yellow-400 shadow-xl overflow-hidden relative">
                                    <Image
                                        src={winner.authorProfileImageUrl}
                                        alt={winner.authorDisplayName}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-yellow-900 p-2 rounded-full shadow-lg">
                                    <FaTrophy className="w-5 h-5" />
                                </div>
                            </div>

                            <h3 className="text-xl font-bold text-slate-900 mb-1">
                                {winner.authorDisplayName}
                            </h3>
                            <a href={winner.authorChannelUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-slate-500 hover:text-emerald-500 underline mb-6 inline-block">
                                View Channel
                            </a>

                            <div className="bg-white/80 rounded-xl p-6 max-w-xl mx-auto backdrop-blur-sm relative">
                                <FaQuoteLeft className="absolute top-4 left-4 text-slate-300 w-6 h-6" />
                                <p className="text-lg text-slate-700 italic relative z-10 px-6">
                                    &quot;{winner.text}&quot;
                                </p>
                                <div className="mt-4 flex items-center justify-center gap-4 text-sm text-slate-500">
                                    <span>❤️ {winner.likeCount} likes</span>
                                    <span>📅 {new Date(winner.publishedAt).toLocaleDateString()}</span>
                                </div>
                            </div>

                            <div className="mt-8">
                                <a
                                    href={`https://www.youtube.com/watch?v=${extractVideoId(url)}&lc=${winner.id}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Button variant="outline">
                                        View Comment on YouTube
                                    </Button>
                                </a>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </ToolPageLayout>
    );
}

// Helper to extract video ID (reused but local for safety in rendering link)
function extractVideoId(url: string) {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/)([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : null;
}
