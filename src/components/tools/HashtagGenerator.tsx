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

const faq = [
    {
        question: "How many hashtags should I use on YouTube?",
        answer: "YouTube shows the first 3 hashtags above your title. You can add more in the description, but 3-5 strategic hashtags is generally optimal."
    },
    {
        question: "Do hashtags help with YouTube SEO?",
        answer: "Yes, hashtags are clickable links that help categorize your content. They can help viewers discover your videos when searching or clicking related hashtags."
    },
    {
        question: "What's the difference between broad and specific hashtags?",
        answer: "Broad hashtags like #YouTube reach more people but have more competition. Specific hashtags like #YouTubeTutorial2024 are more targeted and can help you stand out."
    },
];

const howTo = [
    "Enter your video topic in the input field",
    "Add your niche for smarter suggestions",
    "Click 'Generate Hashtags' to get AI suggestions",
    "Review Broad, Niche, and Trending categories",
    "Copy the best mix for your video"
];

const seoContent = `Generate relevant YouTube hashtags for your videos with our AI-powered Hashtag Generator. Get both broad reach hashtags and specific niche hashtags to maximize your video's discoverability. Our tool helps you find the perfect hashtag combinations for your content.`;

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
            purple: "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300",
            blue: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
            orange: "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300",
        };

        return (
            <div className="space-y-3">
                <div className="flex items-center gap-2">
                    <span className={`p-2 rounded-lg ${colorClasses[color]}`}>{icon}</span>
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{title}</h3>
                        <p className="text-xs text-gray-500">{desc}</p>
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
            description="Generate high-performing hashtags categorized by reach and relevance."
            faq={faq}
            howTo={howTo}
            seoContent={seoContent}
        >
            <div className="space-y-8">
                <UsageBanner type="ai" toolSlug="youtube-hashtag-generator" />
                <LimitReachedModal isOpen={!!limitReachedTool} onClose={closeLimitModal} toolSlug={limitReachedTool} />

                {/* Input Section */}
                <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 md:p-8 shadow-xl border border-gray-100 dark:border-gray-700">
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
                        <div className="flex flex-wrap items-center justify-between gap-4 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl">
                            <h3 className="font-semibold text-gray-700 dark:text-gray-300">
                                Found {allHashtags.length} hashtags
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                <CopyButton text={spaceFormat} variant="button" label="Copy All (Space)" />
                                <button
                                    onClick={handleSave}
                                    disabled={saved}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${saved
                                        ? "bg-green-100 text-green-700 cursor-default"
                                        : "bg-white border border-gray-200 hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
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
