"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import CopyButton from "@/components/ui/CopyButton";
import ToolPageLayout from "@/components/tools/ToolPageLayout";
import UsageBanner from "@/components/ui/UsageBanner";
import LimitReachedModal from "@/components/ui/LimitReachedModal";
import { useUsage } from "@/hooks/useUsage";
import { FaMagic, FaSpinner, FaStar, FaSearch, FaHashtag, FaFire, FaLightbulb } from "react-icons/fa";

interface TagResult {
    primaryTags?: string[];
    searchTags?: string[];
    broadTags?: string[];
    trendingTags?: string[];
    longTailTags?: string[];
    // Legacy format support
    shortTags?: string[];
}

const faq = [
    {
        question: "How many tags should I use on YouTube?",
        answer: "YouTube allows up to 500 characters for tags. Use 15-30 strategic tags, prioritizing quality over quantity. The first 3-5 tags are weighted most heavily by the algorithm."
    },
    {
        question: "Do YouTube tags still matter in 2024?",
        answer: "Yes! While titles and descriptions are more important, tags help YouTube understand your content and suggest it to relevant viewers. They're especially useful for new channels building authority."
    },
    {
        question: "What's the best tag strategy?",
        answer: "Use a mix: 3-5 primary exact-match tags first, then search query variations, broad category tags, and specific long-tail phrases. Include trending/timely tags when relevant."
    },
    {
        question: "Should I use the same tags on every video?",
        answer: "No! While some channel-specific tags are fine, each video should have unique tags matching its specific content. This helps YouTube understand each video's unique value."
    },
];

const howTo = [
    "Enter your video topic or title",
    "Optionally add your niche for more targeted tags",
    "Click 'Generate Tags' to get SEO-optimized keywords",
    "Review tags organized by category (Primary, Search, Trending, etc.)",
    "Copy all tags at once or individually",
    "Paste into YouTube Studio - primary tags first!"
];

const seoContent = `Generate winning YouTube tags that actually rank with our AI-powered Tag Generator. Our tool uses proven SEO strategies to create primary keywords, search query tags, trending variations, and long-tail phrases that help YouTube's algorithm discover and recommend your content. Maximize your video's visibility with strategic tagging.`;

export default function TagGenerator() {
    const [topic, setTopic] = useState("");
    const [niche, setNiche] = useState("");
    const [tags, setTags] = useState<TagResult>({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const { checkAndIncrement, limitReachedTool, closeLimitModal } = useUsage();

    const handleGenerate = async () => {
        if (!topic.trim()) {
            setError("Please enter a video topic");
            return;
        }

        if (!checkAndIncrement("youtube-tag-generator")) {
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

            // Parse the result
            let resultStr = data.result || "";
            resultStr = resultStr.replace(/```json\s*/gi, "").replace(/```\s*/g, "").trim();

            try {
                const parsed = JSON.parse(resultStr);
                setTags(parsed);
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
            red: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300",
            blue: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
            green: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300",
            orange: "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300",
            purple: "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300",
        };

        return (
            <div className="space-y-3">
                <div className="flex items-center gap-2">
                    <span className={`p-2 rounded-lg ${colorClasses[color]}`}>{icon}</span>
                    <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">{title}</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>
                    </div>
                </div>
                <div className="flex flex-wrap gap-2">
                    {sectionTags.map((tag, i) => (
                        <span
                            key={i}
                            className={`inline-flex items-center gap-2 px-3 py-1.5 ${colorClasses[color]} rounded-full text-sm`}
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
            description="Generate SEO-optimized, trending tags that help your videos rank"
            faq={faq}
            howTo={howTo}
            seoContent={seoContent}
        >
            <div className="space-y-6">
                <UsageBanner type="ai" />
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
                    <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4">
                        <p className="text-red-600 dark:text-red-400">{error}</p>
                    </div>
                )}

                {/* Loading State */}
                {loading && (
                    <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-2xl p-8 text-center">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center animate-pulse">
                            <FaHashtag className="w-8 h-8 text-white" />
                        </div>
                        <p className="text-gray-600 dark:text-gray-400">
                            Analyzing topic & generating SEO-optimized tags...
                        </p>
                    </div>
                )}

                {/* Results Section */}
                {hasTags && !loading && (
                    <div className="space-y-6">
                        {/* Summary & Copy Buttons */}
                        <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Generated <strong className="text-gray-900 dark:text-white">{totalCount} tags</strong> optimized for SEO
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <CopyButton text={csvFormat} variant="button" label="Copy All Tags" />
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
                        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
                            <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                                💡 Pro Tips for Maximum Reach
                            </h4>
                            <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
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
