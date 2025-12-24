"use client";

import { useState, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Select from "@/components/ui/Select";
import CopyButton from "@/components/ui/CopyButton";
import ToolPageLayout from "@/components/tools/ToolPageLayout";
import UsageBanner from "@/components/ui/UsageBanner";
import LimitReachedModal from "@/components/ui/LimitReachedModal";
import { useUsage } from "@/hooks/useUsage";
import { FaChartLine, FaSpinner, FaFire, FaEye, FaLightbulb } from "react-icons/fa";
import { saveHistory } from "@/lib/history";


// Interfaces
interface TrendingVideo {
    id: string;
    title: string;
    thumbnail: string;
    channel: string;
    views: string;
    publishedAt: string;
    url: string;
}

interface AISuggestion {
    topic: string;
    angle: string;
    reason: string;
}

// Constants
const regionOptions = [
    { value: "us", label: "United States" },
    { value: "gb", label: "United Kingdom" },
    { value: "in", label: "India" },
    { value: "ca", label: "Canada" },
    { value: "au", label: "Australia" },
];

const faq = [
    {
        question: "How are trending videos selected?",
        answer: "We use the official YouTube Data API to fetch the real-time trending videos for your selected region."
    },
    {
        question: "How often is the data updated?",
        answer: "The trending list is updated in real-time as YouTube updates its charts."
    },
    {
        question: "How do AI suggestions work?",
        answer: "Our AI analyzes current trends and generates specific video ideas tailored to your niche that capitalize on these trends."
    },
];

const howTo = [
    "Select your target region to see what's trending there",
    "Browse the top trending videos for inspiration",
    "Enter your niche (e.g., 'Tech', 'Cooking') to get AI ideas",
    "Click 'Get Trending Ideas' to generate viral video concepts",
    "Use these insights to create timely, relevant content"
];

const seoContent = `Stay ahead of the curve with our YouTube Trend & Topic Helper. Discover what's trending in your region right now and get AI-powered video ideas tailored to your niche. Leveraging real-time YouTube data and advanced AI, this tool helps you identify viral opportunities and create content that viewers are searching for.`;

export default function TrendHelper() {
    const [region, setRegion] = useState("us");
    const [niche, setNiche] = useState("");
    const [trendingVideos, setTrendingVideos] = useState<TrendingVideo[]>([]);
    const [aiSuggestions, setAiSuggestions] = useState<AISuggestion[]>([]);
    const [loadingTrending, setLoadingTrending] = useState(false);
    const [loadingAI, setLoadingAI] = useState(false);
    const [error, setError] = useState("");
    const [isDemo, setIsDemo] = useState(false);

    const { checkLimit, increment, limitReachedTool, closeLimitModal } = useUsage();

    // Fetch viral trending videos when region changes
    const fetchTrending = useCallback(async () => {
        setLoadingTrending(true);
        setError("");
        setIsDemo(false);

        try {
            const response = await fetch(`/api/trending?region=${region}`);
            const data = await response.json();

            if (data.demo) {
                setIsDemo(true);
                return;
            }

            if (data.error) {
                setError(data.error);
                return;
            }

            setTrendingVideos(data.videos || []);
        } catch (err) {
            console.error("Error fetching trending:", err);
            setError("Failed to fetch trending videos");
        } finally {
            setLoadingTrending(false);
        }
    }, [region]);

    // Fetch AI suggestions based on niche
    const fetchAISuggestions = async () => {
        if (!niche.trim()) return;

        if (!checkLimit("youtube-trend-helper")) {
            return;
        }

        setLoadingAI(true);
        setAiSuggestions([]); // Clear previous suggestions

        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 30000);

            const response = await fetch("/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    tool: "trend-helper",
                    niche,
                }),
                signal: controller.signal,
            });

            clearTimeout(timeoutId);
            const data = await response.json();

            if (data.error) {
                console.error("AI Error:", data.error);
                // Don't show modal here, just silence or toast
                return;
            }

            // Success! Increment usage
            increment("youtube-trend-helper");

            let resultStr = data.result || "";
            resultStr = resultStr.replace(/```json\s*/gi, "").replace(/```\s*/g, "").trim();

            try {
                const parsed = JSON.parse(resultStr);
                const suggestions = Array.isArray(parsed) ? parsed.slice(0, 8) : [];
                setAiSuggestions(suggestions);

                // Save to Cloud History
                try {
                    await saveHistory('youtube-trend-helper', {
                        type: 'ai-suggestions',
                        niche,
                        suggestions: suggestions
                    });
                } catch (error) {
                    console.error("Failed to save to cloud history:", error);
                }
            } catch {
                console.error("Failed to parse AI suggestions");
            }
        } catch (error) {
            console.error("AI generation error:", error);
        } finally {
            setLoadingAI(false);
        }
    };

    // Load trending on mount and region change
    useEffect(() => {
        fetchTrending();
    }, [fetchTrending]);

    const formatViews = (views: string) => {
        const num = parseInt(views);
        if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
        if (num >= 1000) return (num / 1000).toFixed(1) + "K";
        return views;
    };

    return (
        <ToolPageLayout
            title="YouTube Trend & Topic Helper"
            slug="youtube-trend-helper"
            description="See what's actually trending on YouTube right now"
            faq={faq}
            howTo={howTo}
            seoContent={seoContent}
        >
            <div className="space-y-6">
                <UsageBanner type="ai" toolSlug="youtube-trend-helper" />
                <LimitReachedModal isOpen={!!limitReachedTool} onClose={closeLimitModal} toolSlug={limitReachedTool} />

                {/* Region Selector */}
                <div className="flex flex-wrap gap-4 items-end">

                    <div className="w-64">
                        <Select
                            label="Select Region"
                            options={regionOptions}
                            value={region}
                            onChange={(e) => setRegion(e.target.value)}
                        />
                    </div>
                    <Button onClick={fetchTrending} isLoading={loadingTrending} variant="outline">
                        <FaChartLine className="mr-2" />
                        Refresh Trends
                    </Button>
                </div>

                {/* API Key Required Notice */}
                {isDemo && (
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4">
                        <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                            ⚠️ YouTube API Key Required
                        </h4>
                        <p className="text-sm text-yellow-700 dark:text-yellow-300">
                            Add <code className="bg-yellow-100 dark:bg-yellow-800 px-1 rounded">YOUTUBE_API_KEY</code> to your .env.local to see real trending videos.
                        </p>
                    </div>
                )}

                {error && (
                    <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
                        <p className="text-red-600 dark:text-red-400">{error}</p>
                    </div>
                )}

                {/* Real Trending Videos */}
                {!isDemo && (
                    <div className="space-y-4">
                        <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                            <FaFire className="text-red-500" />
                            Trending on YouTube ({regionOptions.find(r => r.value === region)?.label})
                        </h3>

                        {loadingTrending ? (
                            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-8 text-center">
                                <FaSpinner className="w-8 h-8 mx-auto text-red-500 animate-spin mb-3" />
                                <p className="text-gray-600 dark:text-gray-400">Loading trending videos...</p>
                            </div>
                        ) : trendingVideos.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {trendingVideos.slice(0, 10).map((video, i) => (
                                    <div
                                        key={video.id}
                                        className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:border-red-300 dark:hover:border-red-600 transition-colors"
                                    >
                                        <div className="flex items-start gap-3">
                                            <span className="flex-shrink-0 w-7 h-7 rounded-full bg-red-500 text-white flex items-center justify-center font-bold text-xs">
                                                {i + 1}
                                            </span>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-medium text-gray-900 dark:text-white text-sm line-clamp-2">
                                                    {video.title}
                                                </h4>
                                                <div className="flex items-center gap-3 mt-2 text-xs text-gray-500 dark:text-gray-400">
                                                    <span>{video.channel}</span>
                                                    <span className="flex items-center gap-1">
                                                        <FaEye className="w-3 h-3" />
                                                        {formatViews(video.views)} views
                                                    </span>
                                                </div>
                                                <div className="mt-2">
                                                    <CopyButton text={video.title} variant="button" label="Copy Title" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : null}
                    </div>
                )}

                {/* AI Suggestions Section */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-6 space-y-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                        <FaLightbulb className="text-yellow-500" />
                        AI Trending Ideas for Your Niche
                    </h3>

                    <div className="flex flex-wrap gap-4 items-end">
                        <div className="flex-1 min-w-64">
                            <Input
                                label="Your Niche"
                                placeholder="e.g., Tech reviews, Cooking, Fitness"
                                value={niche}
                                onChange={(e) => setNiche(e.target.value)}
                            />
                        </div>
                        <Button onClick={fetchAISuggestions} isLoading={loadingAI} disabled={!niche.trim()}>
                            {loadingAI ? (
                                <>
                                    <FaSpinner className="mr-2 animate-spin" />
                                    Generating...
                                </>
                            ) : (
                                <>
                                    <FaLightbulb className="mr-2" />
                                    Get Trending Ideas
                                </>
                            )}
                        </Button>
                    </div>

                    {aiSuggestions.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {aiSuggestions.map((suggestion, i) => (
                                <div
                                    key={i}
                                    className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl p-4"
                                >
                                    <div className="flex items-start gap-3">
                                        <span className="text-xl">🔥</span>
                                        <div>
                                            <h4 className="font-medium text-gray-900 dark:text-white">
                                                {suggestion.topic}
                                            </h4>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                                {suggestion.angle}
                                            </p>
                                            <div className="mt-2">
                                                <CopyButton text={suggestion.topic} variant="button" label="Copy" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </ToolPageLayout>
    );
}
