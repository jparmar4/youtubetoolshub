"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaChartBar, FaExternalLinkAlt, FaSearch, FaSpinner, FaUsers, FaVideo } from "react-icons/fa";
import HorizontalAd from "@/components/ads/HorizontalAd";
import ToolPageLayout from "@/components/tools/ToolPageLayout";
import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import LimitReachedModal from "@/components/ui/LimitReachedModal";
import UsageBanner from "@/components/ui/UsageBanner";
import { useUsage } from "@/hooks/useUsage";

interface ChannelDetails {
    id: string;
    title: string;
    customUrl?: string;
    thumbnails: {
        default?: { url: string };
        medium?: { url: string };
        high?: { url: string };
    };
    statistics: {
        viewCount?: string;
        subscriberCount?: string;
        videoCount?: string;
        hiddenSubscriberCount?: boolean;
    };
}

const faq = [
    {
        question: "Where does the subscriber count come from?",
        answer: "The checker requests public channel statistics from the official YouTube Data API. It does not scrape YouTube pages or ask you to sign in.",
    },
    {
        question: "Why is a subscriber count hidden or rounded?",
        answer: "Channel owners can hide their public subscriber count, and YouTube may display rounded public values. This tool only shows the public value returned by YouTube.",
    },
    {
        question: "Does this tool store channel statistics?",
        answer: "No channel lookup history is stored by this tool. A short server cache may be used to keep the lookup fast and reduce API requests.",
    },
];

function formatNumber(value?: string) {
    if (!value) return "Unavailable";
    return new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(Number(value));
}

export default function SubscriberCountChecker() {
    const [query, setQuery] = useState("");
    const [channel, setChannel] = useState<ChannelDetails | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const { checkLimit, increment, limitReachedTool, closeLimitModal } = useUsage();

    const checkCount = async () => {
        setError("");
        setChannel(null);

        if (!query.trim()) {
            setError("Enter a YouTube channel URL, handle, or video URL");
            return;
        }

        if (!checkLimit("youtube-subscriber-count-checker")) return;

        setLoading(true);
        try {
            const response = await fetch("/api/channel-id", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ query: query.trim() }),
            });
            const data = await response.json();

            if (!response.ok) {
                setError(data.error || "Could not load public channel statistics");
                return;
            }

            setChannel(data);
            increment("youtube-subscriber-count-checker");
        } catch {
            setError("Could not reach the checker. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const videoCount = Number(channel?.statistics.videoCount || 0);
    const viewCount = Number(channel?.statistics.viewCount || 0);
    const averageViews = videoCount > 0 ? String(Math.round(viewCount / videoCount)) : undefined;
    const thumbnail = channel?.thumbnails.high?.url || channel?.thumbnails.medium?.url || channel?.thumbnails.default?.url;

    return (
        <ToolPageLayout
            title="YouTube Subscriber Count Checker"
            slug="youtube-subscriber-count-checker"
            description="Check the public subscriber count, video count, and view count for a YouTube channel using the official YouTube Data API."
            faq={faq}
        >
            <div className="space-y-8">
                <UsageBanner toolSlug="youtube-subscriber-count-checker" />
                <LimitReachedModal isOpen={!!limitReachedTool} onClose={closeLimitModal} toolSlug={limitReachedTool} />

                <div className="max-w-2xl mx-auto">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                            <Input
                                label="Channel URL, handle, or video URL"
                                placeholder="@creator or https://youtube.com/@creator"
                                value={query}
                                onChange={(event) => setQuery(event.target.value)}
                                error={error}
                            />
                        </div>
                        <div className="sm:pt-7">
                            <Button onClick={checkCount} isLoading={loading} disabled={loading} className="w-full sm:w-auto">
                                {loading ? <FaSpinner className="mr-2 animate-spin" /> : <FaSearch className="mr-2" />}
                                Check Count
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-900">
                    Public statistics are provided by YouTube. Counts can be hidden or rounded by YouTube. This tool does not require account access.{" "}
                    <Link href="https://developers.google.com/youtube/v3/docs/channels/list" target="_blank" rel="noreferrer" className="font-semibold underline">
                        API source <FaExternalLinkAlt className="inline ml-1 text-xs" />
                    </Link>
                </div>

                <HorizontalAd />

                {channel && (
                    <div className="space-y-6">
                        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                            <div className="flex flex-col sm:flex-row items-center gap-5">
                                {thumbnail && (
                                    <div className="relative h-24 w-24 overflow-hidden rounded-full border border-slate-200">
                                        <Image src={thumbnail} alt={`${channel.title} YouTube channel avatar`} fill className="object-cover" />
                                    </div>
                                )}
                                <div className="text-center sm:text-left">
                                    <h2 className="text-2xl font-bold text-slate-900">{channel.title}</h2>
                                    <p className="mt-1 text-slate-500">{channel.customUrl || channel.id}</p>
                                </div>
                            </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            <StatCard icon={<FaUsers />} label="Subscribers" value={channel.statistics.hiddenSubscriberCount ? "Hidden" : formatNumber(channel.statistics.subscriberCount)} />
                            <StatCard icon={<FaVideo />} label="Videos" value={formatNumber(channel.statistics.videoCount)} />
                            <StatCard icon={<FaChartBar />} label="Total Views" value={formatNumber(channel.statistics.viewCount)} />
                            <StatCard icon={<FaChartBar />} label="Avg. Views / Video" value={formatNumber(averageViews)} />
                        </div>
                    </div>
                )}
            </div>
        </ToolPageLayout>
    );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
    return (
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 text-red-600">{icon}</div>
            <div className="text-2xl font-bold text-slate-900">{value}</div>
            <div className="mt-1 text-sm text-slate-500">{label}</div>
        </div>
    );
}
