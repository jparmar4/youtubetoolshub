"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import CopyButton from "@/components/ui/CopyButton";
import ToolPageLayout from "@/components/tools/ToolPageLayout";
import LimitReachedModal from "@/components/ui/LimitReachedModal";
import { useUsage } from "@/hooks/useUsage";
import { FaSearch, FaExclamationTriangle, FaSpinner, FaVideo, FaUser, FaCalendar } from "react-icons/fa";
import Link from "next/link";
import { saveHistory } from "@/lib/history";

interface VideoInfo {
    videoTitle: string;
    channelTitle: string;
    publishedAt: string;
}

const faq = [
    {
        question: "How do I see tags on YouTube videos?",
        answer: "YouTube doesn't publicly display video tags in the interface. Our tool uses the YouTube Data API to fetch the actual tags that creators have added to their videos."
    },
    {
        question: "Is it okay to use other videos' tags?",
        answer: "While you can use them for inspiration, it's best to create your own relevant tags. Copying tags that don't relate to your content can hurt your SEO. Use extracted tags to understand what works in your niche."
    },
    {
        question: "Why can't I see tags for some videos?",
        answer: "Not all videos have tags - many creators don't use them. Also, some videos may be private or unlisted, which prevents tag extraction."
    },
    {
        question: "How can I use these tags effectively?",
        answer: "Don't copy tags directly. Instead, analyze patterns - what keywords are popular? What long-tail phrases do successful videos use? Then create your own relevant variations."
    },
];

const howTo = [
    "Copy the URL of any YouTube video you want to analyze",
    "Paste the video URL into the input field",
    "Click 'Extract Tags' to retrieve the video's actual tags",
    "View video info and all extracted tags",
    "Copy tags in your preferred format to analyze or get inspiration"
];

const seoContent = `Extract real tags and keywords from any YouTube video with our Tag Extractor tool. Using the official YouTube Data API, we fetch the actual tags that creators have added to their videos. Analyze competitor videos, understand successful tag strategies, and get inspiration for your own content optimization.`;

export default function TagExtractor() {
    const [url, setUrl] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [noTagsFound, setNoTagsFound] = useState(false);
    const [isDemo, setIsDemo] = useState(false);

    const { checkLimit, increment, limitReachedTool, closeLimitModal } = useUsage();

    const handleExtract = async () => {
        setError("");
        setTags([]);
        setVideoInfo(null);
        setNoTagsFound(false);
        setIsDemo(false);

        setLoading(true);

        if (!checkLimit("youtube-tag-extractor")) {
            setLoading(false);
            return;
        }

        try {
            const response = await fetch("/api/extract-tags", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ videoUrl: url }),
            });

            const data = await response.json();

            if (data.error) {
                setError(data.error);
                if (data.isDemo) setIsDemo(true);
                return;
            }

            increment("youtube-tag-extractor");

            setTags(data.tags || []);
            setVideoInfo(data.videoInfo || null);
            setNoTagsFound(data.tags && data.tags.length === 0);

            // Save to Cloud History
            if (data.tags && data.tags.length > 0) {
                try {
                    await saveHistory('youtube-tag-extractor', {
                        videoUrl: url,
                        videoInfo: data.videoInfo,
                        tags: data.tags
                    });
                } catch (error) {
                    console.error("Failed to save to cloud history:", error);
                }
            }

        } catch (err) {
            console.error("Extraction error:", err);
            setError("Failed to extract tags. Please try again.");
        } finally {
            setLoading(false);
        }
    };
    const csvFormat = tags.join(", ");
    const lineFormat = tags.join("\n");

    const formatDate = (dateStr: string) => {
        if (!dateStr) return "";
        const date = new Date(dateStr);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric"
        });
    };
    // ... (existing functions)

    return (
        <ToolPageLayout
            title="YouTube Tag Extractor"
            slug="youtube-tag-extractor"
            description="Extract real tags from any YouTube video using the official API"
            faq={faq}
            howTo={howTo}
            seoContent={seoContent}
        >
            <div className="space-y-6">
                <LimitReachedModal isOpen={!!limitReachedTool} onClose={closeLimitModal} toolSlug={limitReachedTool} />

                {/* Input Section */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                        <Input
                            label="YouTube Video URL"
                            placeholder="https://www.youtube.com/watch?v=..."
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            error={error && !isDemo ? error : undefined}
                        />
                    </div>
                    <div className="sm:pt-7">
                        <Button onClick={handleExtract} isLoading={loading} disabled={loading}>
                            {loading ? (
                                <>
                                    <FaSpinner className="mr-2 animate-spin" />
                                    Extracting...
                                </>
                            ) : (
                                <>
                                    <FaSearch className="mr-2" />
                                    Extract Tags
                                </>
                            )}
                        </Button>
                    </div>
                </div>

                {/* API Key Required Notice */}
                {isDemo && (
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4">
                        <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                            ⚠️ YouTube API Key Required
                        </h4>
                        <p className="text-sm text-yellow-700 dark:text-yellow-300 mb-3">
                            To extract real tags, add your YouTube Data API key to the environment.
                        </p>
                        <ol className="text-sm text-yellow-700 dark:text-yellow-300 list-decimal pl-4 space-y-1">
                            <li>Go to <a href="https://console.developers.google.com/" target="_blank" rel="noopener noreferrer" className="underline">Google Cloud Console</a></li>
                            <li>Enable the YouTube Data API v3</li>
                            <li>Create an API key</li>
                            <li>Add <code className="bg-yellow-100 dark:bg-yellow-800 px-1 rounded">YOUTUBE_API_KEY=your_key</code> to .env.local</li>
                            <li>Restart the server</li>
                        </ol>
                    </div>
                )}

                {/* Loading State */}
                {loading && (
                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8 text-center">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center animate-pulse">
                            <FaSearch className="w-8 h-8 text-white" />
                        </div>
                        <p className="text-gray-600 dark:text-gray-400">
                            Fetching video data from YouTube API...
                        </p>
                    </div>
                )}

                {/* Video Info */}
                {videoInfo && !loading && (
                    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
                                <FaVideo className="w-6 h-6 text-red-600 dark:text-red-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                                    {videoInfo.videoTitle}
                                </h3>
                                <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
                                    <span className="flex items-center gap-1">
                                        <FaUser className="w-3 h-3" />
                                        {videoInfo.channelTitle}
                                    </span>
                                    {videoInfo.publishedAt && (
                                        <span className="flex items-center gap-1">
                                            <FaCalendar className="w-3 h-3" />
                                            {formatDate(videoInfo.publishedAt)}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* No Tags Found Message */}
                {noTagsFound && !loading && (
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-6 text-center">
                        <FaExclamationTriangle className="w-12 h-12 mx-auto text-yellow-500 mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            No Tags Found
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                            This video doesn&apos;t have any tags. Many creators don&apos;t add tags to their videos.
                        </p>
                        <Link href="/tools/youtube-tag-generator">
                            <Button variant="outline">
                                Generate Your Own Tags Instead
                            </Button>
                        </Link>
                    </div>
                )}

                {/* Results Section */}
                {tags.length > 0 && !loading && (
                    <div className="space-y-4">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Extracted Tags ({tags.length})
                            </h3>
                            <div className="flex gap-2">
                                <CopyButton text={csvFormat} variant="button" label="Copy All (Comma)" />
                                <CopyButton text={lineFormat} variant="button" label="Copy All (Lines)" />
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {tags.map((tag, i) => (
                                <span
                                    key={i}
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm"
                                >
                                    {tag}
                                    <CopyButton text={tag} className="!p-1 opacity-60 hover:opacity-100" />
                                </span>
                            ))}
                        </div>

                        {/* Tips */}
                        <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4">
                            <h4 className="font-medium text-green-900 dark:text-green-100 mb-2">
                                💡 How to Use These Tags
                            </h4>
                            <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                                <li>• <strong>Don&apos;t copy directly</strong> - analyze patterns and create your own variations</li>
                                <li>• <strong>Look for trends</strong> - what keywords appear across successful videos?</li>
                                <li>• <strong>Find gaps</strong> - what relevant tags might this video be missing?</li>
                                <li>• <strong>Generate more</strong> - use our <Link href="/tools/youtube-tag-generator" className="underline">Tag Generator</Link> for AI-powered suggestions</li>
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </ToolPageLayout>
    );
}
