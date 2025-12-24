"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import CopyButton from "@/components/ui/CopyButton";
import ToolPageLayout from "@/components/tools/ToolPageLayout";
import { FaSearch, FaSpinner, FaIdCard, FaUser } from "react-icons/fa";
import Image from "next/image";
import { saveHistory } from "@/lib/history";


const faq = [
    {
        question: "What is a YouTube Channel ID?",
        answer: "A YouTube Channel ID is a unique identifier starting with 'UC' that strictly identifies a YouTube channel. Unlike handles (@name) which can change, the Channel ID is permanent."
    },
    {
        question: "Why do I need my Channel ID?",
        answer: "You often need your Channel ID for API integrations, third-party tools, verifying your channel, or setting up monetization and sponsorship platforms."
    },
    {
        question: "Is the Channel ID the same as my User ID?",
        answer: "No, they are different. The Channel ID (starts with UC) is for the channel itself. The User ID is for the account owner. Both are provided by this tool."
    },
    {
        question: "Can I find a Channel ID from a video URL?",
        answer: "Yes! Just paste any video URL from the channel, and our tool will find the owner's Channel ID."
    },
];

const howTo = [
    "Copy the URL of the YouTube channel (or any video from that channel)",
    "Paste the URL or handle (e.g., @PewDiePie) into the input field",
    "Click 'Find Channel ID' to retrieve the details",
    "Copy the Channel ID, User ID, or other details as needed"
];

const seoContent = `Find any YouTube Channel ID unique identifier (UC...) instantly. 
Whether you have a channel URL, a handle, or a video link, our free tool extracts the exact Channel ID, 
User ID, and channel statistics. Essential for developers, marketers, and creators using YouTube APIs.`;

interface ChannelDetails {
    id: string;
    title: string;
    description: string;
    customUrl: string;
    publishedAt: string;
    thumbnails: {
        default: { url: string };
        medium: { url: string };
        high: { url: string };
    };
    statistics: {
        viewCount: string;
        subscriberCount: string;
        videoCount: string;
        hiddenSubscriberCount: boolean;
    };
}

export default function ChannelIdFinder() {
    const [query, setQuery] = useState("");
    const [channelData, setChannelData] = useState<ChannelDetails | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSearch = async () => {
        setError("");
        setChannelData(null);

        if (!query.trim()) {
            setError("Please enter a channel URL or handle");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch("/api/channel-id", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ query: query.trim() }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || "Failed to fetch channel details");
                return;
            }

            setChannelData(data);

            // Save to Cloud History
            try {
                await saveHistory('youtube-channel-id-finder', {
                    query: query.trim(),
                    channelTitle: data.title,
                    channelId: data.id,
                    customUrl: data.customUrl
                });
            } catch (error) {
                console.error("Failed to save to cloud history:", error);
            }
        } catch (err) {
            console.error("Search error:", err);
            setError("An unexpected error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const formatNumber = (num: string) => {
        return new Intl.NumberFormat('en-US', { notation: "compact", maximumFractionDigits: 1 }).format(Number(num));
    };

    return (
        <ToolPageLayout
            title="YouTube Channel ID Finder"
            slug="youtube-channel-id-finder"
            description="Find the unique Channel ID (UC...) and User ID for any YouTube channel instantly."
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
                                label="Channel URL, Handle (@name), or Video URL"
                                placeholder="@MrBeast or https://youtube.com/..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                error={error}
                            />
                        </div>
                        <div className="sm:pt-7">
                            <Button onClick={handleSearch} isLoading={loading} disabled={loading} className="w-full sm:w-auto">
                                {loading ? (
                                    <>
                                        <FaSpinner className="mr-2 animate-spin" />
                                        Searching...
                                    </>
                                ) : (
                                    <>
                                        <FaSearch className="mr-2" />
                                        Find ID
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Results Section */}
                {channelData && !loading && (
                    <div className="animate-fade-in space-y-6">
                        {/* Channel Header Card */}
                        <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-6 shadow-sm">
                            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                                <div className="shrink-0">
                                    <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-gray-50 dark:border-gray-700 shadow-md">
                                        <Image
                                            src={channelData.thumbnails.high.url}
                                            alt={channelData.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </div>
                                <div className="flex-1 text-center sm:text-left space-y-2">
                                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                                        {channelData.title}
                                    </h2>
                                    <div className="text-gray-500 dark:text-gray-400 font-medium">
                                        {channelData.customUrl}
                                    </div>
                                    <div className="flex flex-wrap justify-center sm:justify-start gap-4 mt-2">
                                        <div className="bg-gray-50 dark:bg-gray-700/50 px-3 py-1 rounded-lg text-sm text-gray-600 dark:text-gray-300">
                                            <span className="font-bold text-gray-900 dark:text-gray-100">{formatNumber(channelData.statistics.subscriberCount)}</span> Subscribers
                                        </div>
                                        <div className="bg-gray-50 dark:bg-gray-700/50 px-3 py-1 rounded-lg text-sm text-gray-600 dark:text-gray-300">
                                            <span className="font-bold text-gray-900 dark:text-gray-100">{formatNumber(channelData.statistics.videoCount)}</span> Videos
                                        </div>
                                        <div className="bg-gray-50 dark:bg-gray-700/50 px-3 py-1 rounded-lg text-sm text-gray-600 dark:text-gray-300">
                                            <span className="font-bold text-gray-900 dark:text-gray-100">{formatNumber(channelData.statistics.viewCount)}</span> Views
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* IDs Card */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-2xl p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 bg-blue-100 dark:bg-blue-800 rounded-lg">
                                        <FaIdCard className="w-6 h-6 text-blue-600 dark:text-blue-300" />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Channel ID</h3>
                                </div>
                                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 flex items-center justify-between gap-4 shadow-sm">
                                    <code className="text-lg font-mono text-blue-600 dark:text-blue-300 break-all">
                                        {channelData.id}
                                    </code>
                                    <CopyButton text={channelData.id} variant="icon" />
                                </div>
                                <p className="mt-3 text-sm text-blue-700 dark:text-blue-300 opacity-80">
                                    This is the permanent unique identifier for the channel.
                                </p>
                            </div>

                            <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800 rounded-2xl p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 bg-purple-100 dark:bg-purple-800 rounded-lg">
                                        <FaUser className="w-6 h-6 text-purple-600 dark:text-purple-300" />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Handle</h3>
                                </div>
                                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 flex items-center justify-between gap-4 shadow-sm">
                                    <code className="text-lg font-mono text-purple-600 dark:text-purple-300 break-all">
                                        {channelData.customUrl}
                                    </code>
                                    <CopyButton text={channelData.customUrl} variant="icon" />
                                </div>
                                <p className="mt-3 text-sm text-purple-700 dark:text-purple-300 opacity-80">
                                    This is the custom handle for the channel.
                                </p>
                            </div>
                        </div>

                        {/* Channel Description */}
                        {channelData.description && (
                            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">About Channel</h3>
                                <p className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap text-sm leading-relaxed max-h-48 overflow-y-auto">
                                    {channelData.description}
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </ToolPageLayout>
    );
}
