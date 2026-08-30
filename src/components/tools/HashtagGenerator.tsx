"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import CopyButton from "@/components/ui/CopyButton";
import ToolPageLayout from "@/components/tools/ToolPageLayout";
import UsageBanner from "@/components/ui/UsageBanner";
import LimitReachedModal from "@/components/ui/LimitReachedModal";
import { useUsage } from "@/hooks/useUsage";
import { FaHashtag, FaBookmark, FaCheckCircle, FaFire, FaLayerGroup, FaBullseye, FaDownload, FaFileAlt } from "react-icons/fa";
import { safeJSONParse } from "@/lib/utils";
import { saveItem } from "@/lib/dashboard";
import { saveHistory } from "@/lib/history";
import { motion } from "framer-motion";



interface HashtagItem {
    tag: string;
    volume?: string;
    relevance?: string;
}

interface HashtagResult {
    broad: HashtagItem[];
    niche: HashtagItem[];
    trending: HashtagItem[];
}

export default function HashtagGenerator() {
    const [topic, setTopic] = useState("");
    const [niche, setNiche] = useState("");
    const [hashtags, setHashtags] = useState<HashtagResult | null>(null);
    const [loading, setLoading] = useState(false);
    const [saved, setSaved] = useState(false);

    const { checkLimit, increment, limitReachedTool, closeLimitModal } = useUsage();

    const [error, setError] = useState("");

    const handleGenerate = async () => {
        if (!topic.trim()) {
            setError("Please enter a video topic");
            return;
        }

        if (!checkLimit("youtube-hashtag-generator")) {
            return;
        }

        setLoading(true);
        setSaved(false);
        setError("");
        try {
            const response = await fetch("/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    tool: "hashtag-generator",
                    topic,
                    niche,
                }),
            });

            const data = await response.json();

            if (!response.ok || data.error) {
                setError(data.error || "Failed to generate hashtags. Please try again.");
                return;
            }

            increment("youtube-hashtag-generator");

            // Safe parse specifically for the new structure
            const parsed = safeJSONParse<HashtagResult>(data.result, { broad: [], niche: [], trending: [] });
            setHashtags(parsed);

            // Save to Cloud History
            try {
                await saveHistory('youtube-hashtag-generator', {
                    topic,
                    niche,
                    hashtags: parsed
                });
            } catch (error) {
                console.error("Failed to save to cloud history:", error);
            }
        } catch (err) {
            console.error("Generation error:", err);
            setError("Failed to generate hashtags. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleSave = () => {
        if (!hashtags) return;
        const allTags = [
            ...hashtags.broad.map(h => h.tag),
            ...hashtags.niche.map(h => h.tag),
        ]; // Save varied set
        saveItem({
            type: 'hashtag',
            toolSlug: 'youtube-hashtag-generator',
            content: allTags
        });
        setSaved(true);
    };

    const allHashtags = hashtags
        ? [...hashtags.broad, ...hashtags.niche, ...hashtags.trending]
        : [];
    const spaceFormat = allHashtags.map((h) => h.tag).join(" ");
    const commaFormat = allHashtags.map((h) => h.tag).join(", ");
    const lineFormat = allHashtags.map((h) => h.tag).join("\n");

    const handleDownloadCSV = () => {
        const blob = new Blob([commaFormat], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `youtube-hashtags-${topic.toLowerCase().replace(/[^a-z0-9]+/g, "-") || "export"}.csv`;
        link.click();
        URL.revokeObjectURL(url);
    };

    const handleDownloadTXT = () => {
        const blob = new Blob([lineFormat], { type: "text/plain;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `youtube-hashtags-${topic.toLowerCase().replace(/[^a-z0-9]+/g, "-") || "export"}.txt`;
        link.click();
        URL.revokeObjectURL(url);
    };

    const CategorySection = ({
        title,
        icon,
        items,
        color,
        desc,
    }: {
        title: string;
        icon: React.ReactNode;
        items: HashtagItem[];
        color: string;
        desc: string;
    }) => {
        if (!items || items.length === 0) return null;

        const colorClasses: Record<string, string> = {
            purple: "bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-900/40",
            blue: "bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900/40",
            orange: "bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-900/40",
        };

        const iconBg: Record<string, string> = {
            purple: "bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300",
            blue: "bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300",
            orange: "bg-orange-100 text-orange-700 dark:bg-orange-950/60 dark:text-orange-300",
        };

        return (
            <div className="space-y-3">
                <div className="flex items-center gap-2">
                    <span className={`p-2 rounded-lg ${iconBg[color]}`}>{icon}</span>
                    <div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">{title}</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{desc}</p>
                    </div>
                </div>
                <div className="flex flex-wrap gap-3">
                    {items.map((item, i) => (
                        <div
                            key={i}
                            className={`group relative flex items-center gap-2 px-4 py-2 ${colorClasses[color]} rounded-xl text-sm font-semibold hover:brightness-95 transition-all`}
                        >
                            {item.tag}
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity pl-2 border-l border-current/20">
                                <CopyButton text={item.tag} variant="icon" className="!p-0 !h-auto" />
                            </div>
                            {(item.volume || item.relevance) && (
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                                    Vol: {item.volume} • Rel: {item.relevance}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <ToolPageLayout
            title="Professional Hashtag Generator"
            slug="youtube-hashtag-generator"
            description="Generate high-performing hashtags categorized by reach and relevance."
        >
            <div className="space-y-8">
                <UsageBanner type="ai" toolSlug="youtube-hashtag-generator" />
                <LimitReachedModal isOpen={!!limitReachedTool} onClose={closeLimitModal} toolSlug={limitReachedTool} />

                {/* Input Section */}
                <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 shadow-md border border-slate-200 dark:border-slate-800">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <Input
                            label="Video Topic"
                            placeholder="e.g., How to edit videos for YouTube"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            className="text-lg"
                        />
                        <Input
                            label="Niche (Optional)"
                            placeholder="e.g., Video Editing, Content Creation"
                            value={niche}
                            onChange={(e) => setNiche(e.target.value)}
                            className="text-lg"
                        />
                    </div>
                    <Button onClick={handleGenerate} isLoading={loading} className="w-full py-4 text-lg">
                        <FaHashtag className="mr-2" />
                        Generate Hashtag Strategy
                    </Button>
                    {error && (
                        <p className="mt-4 text-sm text-red-600 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/40 rounded-xl px-4 py-3 font-medium">
                            {error}
                        </p>
                    )}

                </div>

                {/* Results Section */}
                {hashtags && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-8"
                    >
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-50 dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                            <div>
                                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                                    Generated <span className="text-purple-600 dark:text-purple-400">{allHashtags.length} Hashtags</span>
                                </h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                    Grouped by high volume, niche specific, and trending signals
                                </p>
                            </div>
                            <div className="flex flex-wrap items-center gap-2">
                                <CopyButton text={spaceFormat} variant="button" label="Copy (Space)" />
                                <CopyButton text={commaFormat} variant="button" label="Copy (CSV)" />
                                <button
                                    onClick={handleDownloadCSV}
                                    className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-purple-300 hover:text-purple-600 transition-colors shadow-sm"
                                    title="Download hashtags as CSV"
                                >
                                    <FaDownload className="text-[10px]" />
                                    <span>CSV</span>
                                </button>
                                <button
                                    onClick={handleDownloadTXT}
                                    className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-purple-300 hover:text-purple-600 transition-colors shadow-sm"
                                    title="Download hashtags as Plain Text"
                                >
                                    <FaFileAlt className="text-[10px]" />
                                    <span>TXT</span>
                                </button>
                                <button
                                    onClick={handleSave}
                                    disabled={saved}
                                    className={`flex items-center gap-1.5 px-3 py-2 text-xs rounded-lg font-semibold transition-colors ${saved
                                        ? "bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-300 cursor-default"
                                        : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-200 shadow-sm"
                                        }`}
                                >
                                    {saved ? <FaCheckCircle className="text-xs" /> : <FaBookmark className="text-xs" />}
                                    {saved ? "Saved" : "Save"}
                                </button>
                            </div>
                        </div>

                        <div className="grid gap-8">
                            <CategorySection
                                title="Broad & High Volume"
                                desc="Use 1-2 of these for maximum discoverability"
                                icon={<FaLayerGroup />}
                                items={hashtags.broad}
                                color="purple"
                            />
                            <CategorySection
                                title="Niche Specific"
                                desc="Highly relevant to your specific topic"
                                icon={<FaBullseye />}
                                items={hashtags.niche}
                                color="blue"
                            />
                            <CategorySection
                                title="Trending / Timely"
                                desc="Capitalize on current interest"
                                icon={<FaFire />}
                                items={hashtags.trending}
                                color="orange"
                            />
                        </div>
                    </motion.div>
                )}
            </div>
        </ToolPageLayout>
    );
}
