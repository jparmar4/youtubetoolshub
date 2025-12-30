"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import ToolPageLayout from "@/components/tools/ToolPageLayout";
import { extractVideoId, getThumbnailUrls } from "@/lib/utils";
import { FaDownload, FaImage } from "react-icons/fa";
import { saveHistory } from "@/lib/history";


const faq = [
    {
        question: "What is a YouTube thumbnail?",
        answer: "A YouTube thumbnail is the small preview image that represents a video. It's one of the first things viewers see when browsing YouTube, making it crucial for attracting clicks and views."
    },
    {
        question: "Can I use downloaded thumbnails?",
        answer: "You should only download and use thumbnails that you have permission to use. Downloading thumbnails for reference or personal use is generally acceptable, but using someone else's thumbnail for your own videos may violate copyright laws."
    },
    {
        question: "What resolution thumbnails can I download?",
        answer: "We provide thumbnails in four different resolutions: Maximum Resolution (1280x720), Standard Definition (640x480), High Quality (480x360), and Medium Quality (320x180)."
    },
    {
        question: "Why isn't the maximum resolution thumbnail available?",
        answer: "Not all YouTube videos have maximum resolution thumbnails available. If the uploader didn't upload a custom HD thumbnail, only the standard resolutions will be available."
    },
];

const howTo = [
    "Copy the URL of any YouTube video you want to get the thumbnail from",
    "Paste the video URL into the input field above",
    "Click the 'Fetch Thumbnails' button to load all available thumbnail sizes",
    "Preview the thumbnails and click 'Download' on your preferred resolution",
    "The thumbnail will be saved to your downloads folder"
];

const seoContent = `Download high-quality thumbnails from any YouTube video instantly and for free. Our YouTube Thumbnail Downloader extracts all available thumbnail resolutions including HD quality images. Whether you need thumbnails for reference, creating video compilations, or personal archiving, our tool makes it simple. Just paste a YouTube video URL and get access to all thumbnail sizes in one click.`;

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
            faq={faq}
            howTo={howTo}
            seoContent={seoContent}
        >
            <div className="space-y-6">
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

                {/* Results Section */}
                {thumbnails && (
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Available Thumbnails
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {thumbnails.map((thumb) => (
                                <div
                                    key={thumb.quality}
                                    className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4"
                                >
                                    <div className="aspect-video mb-4 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-600">
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
                                            <p className="font-medium text-gray-900 dark:text-white">
                                                {thumb.quality}
                                            </p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
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
