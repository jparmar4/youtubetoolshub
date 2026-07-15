"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import ToolPageLayout from "@/components/tools/ToolPageLayout";
import { extractVideoId, getThumbnailUrls } from "@/lib/utils";
import { FaDownload, FaImage } from "react-icons/fa";
import { saveHistory } from "@/lib/history";
import HorizontalAd from "@/components/ads/HorizontalAd";


export default function ThumbnailDownloader() {
    const [url, setUrl] = useState("");
    const [thumbnails, setThumbnails] = useState<ReturnType<typeof getThumbnailUrls> | null>(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleFetch = () => {
        setError("");
        setThumbnails(null);
        setLoading(true);

        const videoId = extractVideoId(url);

        if (!videoId) {
            setError(
                "Please enter a valid YouTube URL (watch, Shorts, youtu.be, or video ID)",
            );
            setLoading(false);
            return;
        }

        const thumbs = getThumbnailUrls(videoId);
        setThumbnails(thumbs);
        setLoading(false);

        // Save to Cloud History
        try {
            saveHistory("youtube-thumbnail-downloader", {
                url,
                videoId,
                thumbnailCount: thumbs.length,
            });
        } catch (error) {
            console.error("Failed to save to cloud history:", error);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleFetch();
        }
    };

    return (
        <ToolPageLayout
            title="YouTube Thumbnail Downloader"
            slug="youtube-thumbnail-downloader"
            description="Download high-quality thumbnails from any YouTube video in multiple resolutions"
        >
            <div className="space-y-6">
                {/* This browser-only utility is genuinely free and needs no account. */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                        <Input
                            label="YouTube Video or Shorts URL"
                            placeholder="https://www.youtube.com/watch?v=... or /shorts/..."
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            onKeyDown={handleKeyDown}
                            error={error}
                        />
                    </div>
                    <div className="sm:pt-7">
                        <Button onClick={handleFetch} isLoading={loading}>
                            <FaImage className="mr-2" />
                            Fetch Thumbnails
                        </Button>
                    </div>
                </div>
                <p className="text-sm text-slate-500">
                    Supports regular videos, Shorts, youtu.be links, and live replays. Downloads
                    public thumbnail images YouTube already hosts — no account required.
                </p>

                {/* Results Section */}
                {thumbnails && (
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-slate-900">
                            Available Thumbnails
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {thumbnails.map((thumb) => (
                                <div
                                    key={thumb.quality}
                                    className="bg-slate-50 rounded-xl p-4"
                                >
                                    <div className="aspect-video mb-4 rounded-lg overflow-hidden bg-slate-200">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={thumb.url}
                                            alt={`YouTube video thumbnail in ${thumb.quality} quality (${thumb.dimension})`}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.src = "/placeholder-thumbnail.svg";
                                            }}
                                        />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium text-slate-900">
                                                {thumb.quality}
                                            </p>
                                            <p className="text-sm text-slate-500">
                                                {thumb.dimension}
                                            </p>
                                        </div>
                                        <a
                                            href={`/api/download-image?url=${encodeURIComponent(thumb.url)}&filename=${encodeURIComponent(`youtube-thumbnail-${thumb.quality.toLowerCase().replace(/\s+/g, "-")}.jpg`)}`}
                                            download={`youtube-thumbnail-${thumb.quality.toLowerCase().replace(/\s+/g, "-")}.jpg`}
                                            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors shadow-lg shadow-emerald-500/20"
                                        >
                                            <FaDownload />
                                            Download
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Ad placed BELOW results — safe distance from download buttons (AdSense policy) */}
                <HorizontalAd />
            </div>
        </ToolPageLayout>
    );
}
