"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import CopyButton from "@/components/ui/CopyButton";
import ToolPageLayout from "@/components/tools/ToolPageLayout";
import UsageBanner from "@/components/ui/UsageBanner";
import LimitReachedModal from "@/components/ui/LimitReachedModal";
import { useUsage } from "@/hooks/useUsage";
import { saveHistory } from "@/lib/history";
import { FaMagic, FaSpinner, FaStar, FaSearch, FaHashtag, FaFire, FaLightbulb, FaDownload, FaFileAlt } from "react-icons/fa";

interface TagResult {
    primaryTags?: string[];
    searchTags?: string[];
    broadTags?: string[];
    trendingTags?: string[];
    longTailTags?: string[];
    // Legacy format support
    shortTags?: string[];
}

export default function TagGenerator() {
    const [topic, setTopic] = useState("");
    const [niche, setNiche] = useState("");
    const [tags, setTags] = useState<TagResult>({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const { checkLimit, increment, limitReachedTool, closeLimitModal } = useUsage();

    const handleGenerate = async () => {
        if (!topic.trim()) {
            setError("Please enter a video topic");
            return;
        }

        if (!checkLimit("youtube-tag-generator")) {
            return;
        }

        setError("");
        setLoading(true);
        setTags({});

        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 30000);

            const response = await fetch("/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    tool: "tag-generator",
                    topic,
                    niche: niche || undefined,
                }),
                signal: controller.signal,
            });

            clearTimeout(timeoutId);

            const data = await response.json();

            if (data.error) {
                setError(data.error);
                return;
            }

            // Success! Increment usage
            increment("youtube-tag-generator");

            // Parse the result
            let resultStr = data.result || "";
            resultStr = resultStr.replace(/```json\s*/gi, "").replace(/```\s*/g, "").trim();

            try {
                const parsed = JSON.parse(resultStr);
                setTags(parsed);

                // Save to Cloud History
                try {
                    await saveHistory('youtube-tag-generator', {
                        topic,
                        niche,
                        tags: parsed
                    });
                } catch (error) {
                    console.error("Failed to save to cloud history:", error);
                }
            } catch {
                setError("Failed to parse tags. Please try again.");
            }
        } catch (err) {
            if (err instanceof Error && err.name === "AbortError") {
                setError("Request timed out. Please try again.");
            } else {
                console.error("Generation error:", err);
                setError("Failed to generate tags. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    // Combine all tags for copy functionality
    const getAllTags = () => {
        const allTags: string[] = [];
        if (tags.primaryTags) allTags.push(...tags.primaryTags);
        if (tags.searchTags) allTags.push(...tags.searchTags);
        if (tags.broadTags) allTags.push(...tags.broadTags);
        if (tags.trendingTags) allTags.push(...tags.trendingTags);
        if (tags.longTailTags) allTags.push(...tags.longTailTags);
        // Legacy format
        if (tags.shortTags) allTags.push(...tags.shortTags);
        return allTags;
    };

    const allTags = getAllTags();
    const csvFormat = allTags.join(", ");
    const totalCount = allTags.length;
    const charCount = csvFormat.length;
    const charLimit = 500;

    const handleDownloadCSV = () => {
        const blob = new Blob([csvFormat], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `youtube-tags-${topic.toLowerCase().replace(/[^a-z0-9]+/g, "-") || "export"}.csv`;
        link.click();
        URL.revokeObjectURL(url);
    };

    const handleDownloadTXT = () => {
        const blob = new Blob([csvFormat], { type: "text/plain;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `youtube-tags-${topic.toLowerCase().replace(/[^a-z0-9]+/g, "-") || "export"}.txt`;
        link.click();
        URL.revokeObjectURL(url);
    };

    const TagSection = ({
        title,
        icon,
        tags: sectionTags,
        color,
        description
    }: {
        title: string;
        icon: React.ReactNode;
        tags: string[] | undefined;
        color: string;
        description: string;
    }) => {
        if (!sectionTags || sectionTags.length === 0) return null;

        const colorClasses: Record<string, string> = {
            red: "bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-300",
            blue: "bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300",
            green: "bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-300",
            orange: "bg-orange-100 text-orange-700 dark:bg-orange-950/40 dark:text-orange-300",
            purple: "bg-purple-100 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300",
        };

        return (
            <div className="space-y-3">
                <div className="flex items-center gap-2">
                    <span className={`p-2 rounded-lg ${colorClasses[color]}`}>{icon}</span>
                    <div>
                        <h3 className="font-semibold text-slate-900 dark:text-white">{title}</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{description}</p>
                    </div>
                </div>
                <div className="flex flex-wrap gap-2">
                    {sectionTags.map((tag, i) => (
                        <span
                            key={i}
                            className={`inline-flex items-center gap-2 px-3 py-1.5 ${colorClasses[color]} rounded-full text-sm font-medium`}
                        >
                            {tag}
                            <CopyButton text={tag} className="!p-0.5 opacity-60 hover:opacity-100" />
                        </span>
                    ))}
                </div>
            </div>
        );
    };

    const hasTags = allTags.length > 0;

    return (
        <ToolPageLayout
            title="YouTube Tag Generator"
            slug="youtube-tag-generator"
            description="Generate SEO-optimized, trending tags that help your videos rank"
        >
            <div className="space-y-6">
                <UsageBanner type="ai" toolSlug="youtube-tag-generator" />
                <LimitReachedModal isOpen={!!limitReachedTool} onClose={closeLimitModal} toolSlug={limitReachedTool} />

                {/* Input Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                        <Input
                            label="Video Topic or Title"
                            placeholder="e.g., How to edit videos on iPhone for beginners"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                        />
                    </div>
                    <Input
                        label="Niche/Industry (Optional)"
                        placeholder="e.g., Tech, Gaming, Cooking"
                        value={niche}
                        onChange={(e) => setNiche(e.target.value)}
                    />
                </div>

                <Button onClick={handleGenerate} isLoading={loading} disabled={loading}>
                    {loading ? (
                        <>
                            <FaSpinner className="mr-2 animate-spin" />
                            Generating SEO Tags...
                        </>
                    ) : (
                        <>
                            <FaMagic className="mr-2" />
                            Generate Tags
                        </>
                    )}
                </Button>


                {/* Error Display */}
                {error && (
                    <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/40 rounded-xl p-4">
                        <p className="text-red-600 dark:text-red-400 font-medium">{error}</p>
                    </div>
                )}

                {/* Loading State */}
                {loading && (
                    <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 rounded-2xl p-8 text-center border border-slate-200 dark:border-slate-800">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center animate-pulse shadow-md">
                            <FaHashtag className="w-8 h-8 text-white" />
                        </div>
                        <p className="text-slate-600 dark:text-slate-300 font-medium">
                            Analyzing topic & generating SEO-optimized tags...
                        </p>
                    </div>
                )}

                {/* Results Section */}
                {hasTags && !loading && (
                    <div className="space-y-6">
                        {/* Summary & Copy Buttons */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
                            <div>
                                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                                    Generated <strong className="text-purple-600 dark:text-purple-400">{totalCount} tags</strong>
                                </p>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${charCount <= charLimit ? 'bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-300' : 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300'}`}>
                                        {charCount} / {charLimit} characters
                                    </span>
                                    <span className="text-[11px] text-slate-400">
                                        (YouTube Studio Limit: 500)
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                                <CopyButton text={csvFormat} variant="button" label="Copy All (CSV)" />
                                <button
                                    onClick={handleDownloadCSV}
                                    className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-purple-300 hover:text-purple-600 transition-colors shadow-sm"
                                    title="Download tags as CSV"
                                >
                                    <FaDownload className="text-[10px]" />
                                    <span>CSV</span>
                                </button>
                                <button
                                    onClick={handleDownloadTXT}
                                    className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-purple-300 hover:text-purple-600 transition-colors shadow-sm"
                                    title="Download tags as Plain Text"
                                >
                                    <FaFileAlt className="text-[10px]" />
                                    <span>TXT</span>
                                </button>
                            </div>
                        </div>

                        {/* Tag Sections */}
                        <div className="space-y-6">
                            <TagSection
                                title="🎯 Primary Tags (Use First!)"
                                icon={<FaStar className="w-4 h-4" />}
                                tags={tags.primaryTags}
                                color="red"
                                description="Most important - put these first in YouTube"
                            />

                            <TagSection
                                title="🔍 Search Query Tags"
                                icon={<FaSearch className="w-4 h-4" />}
                                tags={tags.searchTags}
                                color="blue"
                                description="How people search for this content"
                            />

                            <TagSection
                                title="🏷️ Broad Category Tags"
                                icon={<FaHashtag className="w-4 h-4" />}
                                tags={tags.broadTags || tags.shortTags}
                                color="green"
                                description="General niche & category keywords"
                            />

                            <TagSection
                                title="🔥 Trending Tags"
                                icon={<FaFire className="w-4 h-4" />}
                                tags={tags.trendingTags}
                                color="orange"
                                description="Timely & trending variations"
                            />

                            <TagSection
                                title="💡 Long-Tail Keywords"
                                icon={<FaLightbulb className="w-4 h-4" />}
                                tags={tags.longTailTags}
                                color="purple"
                                description="Specific phrases for targeted reach"
                            />
                        </div>

                        {/* Pro Tips */}
                        <div className="bg-blue-50 rounded-xl p-4">
                            <h4 className="font-medium text-blue-900 mb-2">
                                💡 Pro Tips for Maximum Reach
                            </h4>
                            <ul className="text-sm text-blue-700 space-y-1">
                                <li>• <strong>Order matters:</strong> Put primary tags first - YouTube weights them more</li>
                                <li>• <strong>Use all 500 characters:</strong> More relevant tags = more discovery</li>
                                <li>• <strong>Match your title:</strong> Include your exact title words as tags</li>
                                <li>• <strong>Check competitors:</strong> See what tags successful similar videos use</li>
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </ToolPageLayout>
    );
}
