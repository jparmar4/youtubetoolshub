"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import CopyButton from "@/components/ui/CopyButton";
import ToolPageLayout from "@/components/tools/ToolPageLayout";
import LimitReachedModal from "@/components/ui/LimitReachedModal";
import { useUsage } from "@/hooks/useUsage";
import { extractVideoId } from "@/lib/utils";
import { FaSearch, FaExclamationTriangle, FaSpinner, FaVideo, FaUser, FaCalendar, FaDownload, FaFileAlt } from "react-icons/fa";
import Link from "next/link";
import { saveHistory } from "@/lib/history";

interface VideoInfo {
    videoTitle: string;
    channelTitle: string;
    publishedAt: string;
}




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

        const videoId = extractVideoId(url);
        if (!videoId) {
            setError(
                "Please enter a valid YouTube URL (watch, Shorts, youtu.be, or video ID)",
            );
            return;
        }

        if (!checkLimit("youtube-tag-extractor")) {
            return;
        }

        setLoading(true);

        try {
            const response = await fetch("/api/extract-tags", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ videoUrl: url, videoId }),
            });

            const data = await response.json();

            if (!response.ok || data.error || data.success === false) {
                setError(data.error || data.message || "Failed to extract tags");
                if (data.isDemo || data.demo) setIsDemo(true);
                return;
            }

            increment("youtube-tag-extractor");

            const info: VideoInfo | null =
                data.videoInfo ||
                (data.videoTitle
                    ? {
                          videoTitle: data.videoTitle,
                          channelTitle: data.channelTitle || "",
                          publishedAt: data.publishedAt || "",
                      }
                    : null);

            setTags(data.tags || []);
            setVideoInfo(info);
            setNoTagsFound(!data.tags || data.tags.length === 0);

            if (data.tags && data.tags.length > 0) {
                try {
                    await saveHistory("youtube-tag-extractor", {
                        videoUrl: url,
                        videoId,
                        videoInfo: info,
                        tags: data.tags,
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

    const handleDownloadCSV = () => {
        const id = extractVideoId(url) || "youtube";
        const blob = new Blob([csvFormat], { type: "text/csv;charset=utf-8;" });
        const urlObj = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = urlObj;
        link.download = `extracted-tags-${id}.csv`;
        link.click();
        URL.revokeObjectURL(urlObj);
    };

    const handleDownloadTXT = () => {
        const id = extractVideoId(url) || "youtube";
        const blob = new Blob([lineFormat], { type: "text/plain;charset=utf-8;" });
        const urlObj = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = urlObj;
        link.download = `extracted-tags-${id}.txt`;
        link.click();
        URL.revokeObjectURL(urlObj);
    };

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
                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                        <h4 className="font-medium text-yellow-800 mb-2">
                            ⚠️ YouTube API Key Required
                        </h4>
                        <p className="text-sm text-yellow-700 mb-3">
                            To extract real tags, add your YouTube Data API key to the environment.
                        </p>
                        <ol className="text-sm text-yellow-700 list-decimal pl-4 space-y-1">
                            <li>Go to <a href="https://console.developers.google.com/" target="_blank" rel="noopener noreferrer" className="underline">Google Cloud Console</a></li>
                            <li>Enable the YouTube Data API v3</li>
                            <li>Create an API key</li>
                            <li>Add <code className="bg-yellow-100 px-1 rounded">YOUTUBE_API_KEY=your_key</code> to .env.local</li>
                            <li>Restart the server</li>
                        </ol>
                    </div>
                )}

                {/* Loading State */}
                {loading && (
                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 text-center">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center animate-pulse">
                            <FaSearch className="w-8 h-8 text-white" />
                        </div>
                        <p className="text-slate-600">
                            Fetching video data from YouTube API...
                        </p>
                    </div>
                )}

                {/* Video Info */}
                {videoInfo && !loading && (
                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 shadow-sm">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-red-100 text-red-600 rounded-xl">
                                <FaVideo className="w-6 h-6" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-bold text-slate-900 truncate text-base">
                                    {videoInfo.videoTitle}
                                </h3>
                                <div className="flex flex-wrap gap-4 mt-2 text-sm text-slate-600">
                                    <span className="flex items-center gap-1.5 font-medium">
                                        <FaUser className="w-3.5 h-3.5 text-slate-400" />
                                        {videoInfo.channelTitle}
                                    </span>
                                    {videoInfo.publishedAt && (
                                        <span className="flex items-center gap-1.5">
                                            <FaCalendar className="w-3.5 h-3.5 text-slate-400" />
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
                    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 text-center">
                        <FaExclamationTriangle className="w-12 h-12 mx-auto text-amber-500 mb-4" />
                        <h3 className="text-lg font-bold text-slate-900 mb-2">
                            No Tags Found
                        </h3>
                        <p className="text-slate-600 mb-4 max-w-md mx-auto text-sm">
                            This video doesn&apos;t have any tags attached. Many creators rely purely on title and description metadata.
                        </p>
                        <Link href="/tools/youtube-tag-generator">
                            <Button variant="outline">
                                Generate SEO Tags Instead →
                            </Button>
                        </Link>
                    </div>
                )}

                {/* Results Section */}
                {tags.length > 0 && !loading && (
                    <div className="space-y-5">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 bg-slate-50 border border-slate-200 rounded-2xl shadow-sm">
                            <div>
                                <h3 className="text-base font-bold text-slate-900">
                                    Extracted Tags <span className="text-purple-600 font-semibold">({tags.length})</span>
                                </h3>
                                <p className="text-xs text-slate-500 mt-0.5">
                                    Official tags fetched directly from the YouTube Data API
                                </p>
                            </div>
                            <div className="flex flex-wrap items-center gap-2">
                                <CopyButton text={csvFormat} variant="button" label="Copy CSV" />
                                <button
                                    onClick={handleDownloadCSV}
                                    className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-white border border-slate-200 text-slate-700 hover:border-purple-300 hover:text-purple-600 transition-colors shadow-sm"
                                    title="Download tags as CSV"
                                >
                                    <FaDownload className="text-[10px]" />
                                    <span>CSV</span>
                                </button>
                                <button
                                    onClick={handleDownloadTXT}
                                    className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-white border border-slate-200 text-slate-700 hover:border-purple-300 hover:text-purple-600 transition-colors shadow-sm"
                                    title="Download tags as Plain Text"
                                >
                                    <FaFileAlt className="text-[10px]" />
                                    <span>TXT</span>
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {tags.map((tag, i) => (
                                <span
                                    key={i}
                                    className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-purple-50 text-purple-700 border border-purple-200 rounded-full text-sm font-medium"
                                >
                                    {tag}
                                    <CopyButton text={tag} className="!p-0.5 opacity-60 hover:opacity-100" />
                                </span>
                            ))}
                        </div>

                        {/* Tips */}
                        <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-100 rounded-2xl p-5">
                            <h4 className="font-bold text-slate-900 mb-2 text-sm">
                                💡 How to Use Competitor Tags
                            </h4>
                            <ul className="text-xs text-slate-600 space-y-1.5">
                                <li>• <strong>Analyze Keyword Grouping</strong>: Note which broad and niche phrases this video prioritizes.</li>
                                <li>• <strong>Never Direct Copy Blindly</strong>: Ensure all tags you adapt are 100% relevant to your actual video.</li>
                                <li>• <strong>Scale With AI</strong>: Use our <Link href="/tools/youtube-tag-generator"className="underline font-semibold text-purple-600">Tag Generator</Link> to generate fresh 500-character sets.</li>
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </ToolPageLayout>
    );
}
