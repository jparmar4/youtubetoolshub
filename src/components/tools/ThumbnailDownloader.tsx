"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import ToolPageLayout from "@/components/tools/ToolPageLayout";
import { extractVideoId, getThumbnailUrls } from "@/lib/utils";
import { FaDownload, FaImage } from "react-icons/fa";
import ToolAuthGuard from "@/components/tools/ToolAuthGuard";
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
            setError("Please enter a valid YouTube URL");
            setLoading(false);
            return;
        }

        const thumbs = getThumbnailUrls(videoId);
        setThumbnails(thumbs);
        setLoading(false);

        // Save to Cloud History
        try {
            saveHistory('youtube-thumbnail-downloader', {
                url,
                videoId,
                thumbnailCount: thumbs.length
            });
        } catch (error) {
            console.error("Failed to save to cloud history:", error);
        }
    };

    return (
        <ToolPageLayout
            title="YouTube Thumbnail Downloader"
            slug="youtube-thumbnail-downloader"
            description="Download high-quality thumbnails from any YouTube video in multiple resolutions"
        >
            <div className="space-y-6">
                <ToolAuthGuard title="Free Sign In Required" message="Please sign in to use this unlimited thumbnail downloader tool for free.">
                    {/* Input Section */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                            <Input
                                label="YouTube Video URL"
                                placeholder="https://www.youtube.com/watch?v=..."
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
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
                </ToolAuthGuard>

                <HorizontalAd />

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
                                            alt={`${thumb.quality} thumbnail`}
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
                                            href={thumb.url}
                                            download={`thumbnail-${thumb.quality.toLowerCase().replace(/\s+/g, '-')}.jpg`}
                                            target="_blank"
                                            rel="noopener noreferrer"
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
            </div>
        </ToolPageLayout>
    );
}
