"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import ToolPageLayout from "@/components/tools/ToolPageLayout";
import { extractVideoId, getThumbnailUrls } from "@/lib/utils";
import { FaDownload, FaImage, FaEye } from "react-icons/fa";
import { saveHistory } from "@/lib/history";
import CreatorSoftwareCard from "@/components/ads/CreatorSoftwareCard";
import Link from "next/link";

const thumbnailPresets = [
    { label: "Sample 4K Video", url: "https://www.youtube.com/watch?v=Bey4XXJAqS8" },
    { label: "Sample Popular Video", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
    { label: "Sample Shorts", url: "https://www.youtube.com/shorts/5qap5aO4i9A" },
];

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

    const handlePresetClick = (sampleUrl: string) => {
        setUrl(sampleUrl);
        setError("");
        const videoId = extractVideoId(sampleUrl);
        if (videoId) {
            const thumbs = getThumbnailUrls(videoId);
            setThumbnails(thumbs);
        }
    };

    return (
        <ToolPageLayout
            title="YouTube Thumbnail Downloader"
            slug="youtube-thumbnail-downloader"
            description="Download high-quality thumbnails from any YouTube video in multiple resolutions"
        >
            <div className="space-y-6">
                {/* Quick Presets Pills */}
                <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                        <span className="text-amber-500 font-bold">⚡</span> Try sample URL:
                    </span>
                    {thumbnailPresets.map((preset) => (
                        <button
                            key={preset.label}
                            type="button"
                            onClick={() => handlePresetClick(preset.url)}
                            className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 hover:bg-purple-100 text-slate-700 hover:text-purple-800 border border-slate-200 hover:border-purple-300 transition-all cursor-pointer active:scale-95"
                        >
                            {preset.label}
                        </button>
                    ))}
                </div>

                {/* This browser-only utility is genuinely free and needs no account. */}
                <form
                    toolname="get_youtube_thumbnail_urls"
                    tooldescription="Download high-quality thumbnails from any YouTube video in multiple resolutions"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleFetch();
                    }}
                    className="flex flex-col sm:flex-row gap-4"
                >
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
                        <Button type="submit" onClick={handleFetch} isLoading={loading}>
                            <FaImage className="mr-2" />
                            Fetch Thumbnails
                        </Button>
                    </div>
                </form>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm text-slate-500">
                    <p>
                        Supports regular videos, Shorts, youtu.be links, and live replays. Downloads
                        public thumbnail images YouTube already hosts — no account required.
                    </p>
                    <Link
                        href="/tools/youtube-thumbnail-feed-previewer"
                        className="inline-flex shrink-0 items-center gap-1.5 font-bold text-red-600 hover:text-red-700"
                    >
                        <FaEye />
                        <span>Preview in YouTube Feed →</span>
                    </Link>
                </div>

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
                                            rel="nofollow"
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

                {/* Creator Software Comparison Card (OpusClip, ElevenLabs, Epidemic) */}
                <CreatorSoftwareCard defaultCategory="video" />
            </div>
        </ToolPageLayout>
    );
}
