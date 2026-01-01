"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import CopyButton from "@/components/ui/CopyButton";
import ToolPageLayout from "@/components/tools/ToolPageLayout";
import UsageBanner from "@/components/ui/UsageBanner";
import LimitReachedModal from "@/components/ui/LimitReachedModal";
import { useUsage } from "@/hooks/useUsage";
import { FaHashtag, FaBookmark, FaCheckCircle, FaFire, FaLayerGroup, FaBullseye } from "react-icons/fa";
import { safeJSONParse } from "@/lib/utils";
import { saveItem } from "@/lib/dashboard";
import { saveHistory } from "@/lib/history";
import { motion, AnimatePresence } from "framer-motion";



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

    const handleGenerate = async () => {
        if (!topic.trim()) return;

        if (!checkLimit("youtube-hashtag-generator")) {
            return;
        }

        setLoading(true);
        setSaved(false);
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

            if (data.error) {
                console.error("Generation error:", data.error);
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
        } catch (error) {
            console.error("Generation error:", error);
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

    // Helper to get raw strings for copy
    const getStrings = (items: HashtagItem[] = []) => items.map(i => i.tag);

    const allHashtags = hashtags ? [
        ...getStrings(hashtags.broad),
        ...getStrings(hashtags.niche),
        ...getStrings(hashtags.trending)
    ] : [];

    const spaceFormat = allHashtags.join(" ");
    const commaFormat = allHashtags.join(", ");

    const CategorySection = ({
        title,
        icon,
        items,
        color,
        desc
    }: {
        title: string;
        icon: React.ReactNode;
        items: HashtagItem[];
        color: string;
        desc: string;
    }) => {
        if (!items || items.length === 0) return null;

        const colorClasses: Record<string, string> = {
            purple: "bg-purple-50 text-purple-700",
            blue: "bg-blue-50 text-blue-700",
            orange: "bg-orange-50 text-orange-700",
        };

        return (
            <div className="space-y-3">
                <div className="flex items-center gap-2">
                    <span className={`p-2 rounded-lg ${colorClasses[color]}`}>{icon}</span>
                    <div>
                        <h3 className="text-lg font-bold text-slate-900">{title}</h3>
                        <p className="text-xs text-slate-500">{desc}</p>
                    </div>
                </div>
                <div className="flex flex-wrap gap-3">
                    {items.map((item, i) => (
                        <div
                            key={i}
                            className={`group relative flex items-center gap-2 px-4 py-2 ${colorClasses[color]} rounded-xl text-sm font-medium hover:brightness-95 transition-all`}
                        >
                            {item.tag}
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity pl-2 border-l border-gray-400/20">
                                <CopyButton text={item.tag} variant="icon" className="!p-0 !h-auto" />
                            </div>
                            {/* Metrics Popover (Optional/Subtle) */}
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
                <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-200">
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
                        Generate Strategy
                    </Button>
                </div>

                {/* Results Section */}
                {hashtags && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-8"
                    >
                        <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                            <h3 className="font-semibold text-slate-700">
                                Found {allHashtags.length} hashtags
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                <CopyButton text={spaceFormat} variant="button" label="Copy All (Space)" />
                                <button
                                    onClick={handleSave}
                                    disabled={saved}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${saved
                                        ? "bg-green-100 text-green-700 cursor-default"
                                        : "bg-white border border-slate-200 hover:bg-slate-50 text-slate-700"
                                        }`}
                                >
                                    {saved ? <FaCheckCircle /> : <FaBookmark />}
                                    {saved ? "Saved" : "Save Set"}
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
