"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import CopyButton from "@/components/ui/CopyButton";
import ToolPageLayout from "@/components/tools/ToolPageLayout";
import UsageBanner from "@/components/ui/UsageBanner";
import LimitReachedModal from "@/components/ui/LimitReachedModal";
import { useUsage } from "@/hooks/useUsage";
import { FaHashtag } from "react-icons/fa";
import { safeJSONParse } from "@/lib/utils";

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
    "Click 'Generate Hashtags' to get AI suggestions",
    "Review both broad and specific hashtag groups",
    "Copy hashtags in your preferred format",
    "Add the best ones to your video description"
];

const seoContent = `Generate relevant YouTube hashtags for your videos with our AI-powered Hashtag Generator. Get both broad reach hashtags and specific niche hashtags to maximize your video's discoverability. Our tool helps you find the perfect hashtag combinations for your content.`;

interface HashtagResult {
    broad: string[];
    specific: string[];
}

export default function HashtagGenerator() {
    const [topic, setTopic] = useState("");
    const [hashtags, setHashtags] = useState<HashtagResult | null>(null);
    const [loading, setLoading] = useState(false);

    const { checkLimit, increment, limitReachedTool, closeLimitModal } = useUsage();

    const handleGenerate = async () => {
        if (!topic.trim()) return;

        if (!checkLimit("youtube-hashtag-generator")) {
            return;
        }

        setLoading(true);
        try {
            const response = await fetch("/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    tool: "hashtag-generator",
                    topic,
                }),
            });

            const data = await response.json();

            if (data.error) {
                console.error("Generation error:", data.error);
                return;
            }

            // Success! Increment usage
            increment("youtube-hashtag-generator");

            const parsed = safeJSONParse<HashtagResult>(data.result, { broad: [], specific: [] });
            setHashtags(parsed);
        } catch (error) {
            console.error("Generation error:", error);
        } finally {
            setLoading(false);
        }
    };

    const allHashtags = hashtags ? [...hashtags.broad, ...hashtags.specific] : [];
    const spaceFormat = allHashtags.join(" ");
    const commaFormat = allHashtags.join(", ");

    return (
        <ToolPageLayout
            title="YouTube Hashtag Generator"
            description="Generate relevant hashtags for your YouTube videos using AI"
            faq={faq}
            howTo={howTo}
            seoContent={seoContent}
        >
            <div className="space-y-6">
                <UsageBanner type="ai" />
                <LimitReachedModal isOpen={!!limitReachedTool} onClose={closeLimitModal} toolSlug={limitReachedTool} />

                {/* Input Section */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                        <Input
                            label="Video Topic"
                            placeholder="e.g., How to edit videos for YouTube"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                        />
                    </div>
                    <div className="sm:pt-7">
                        <Button onClick={handleGenerate} isLoading={loading}>
                            <FaHashtag className="mr-2" />
                            Generate Hashtags
                        </Button>
                    </div>
                </div>

                {/* Results Section */}
                {hashtags && (
                    <div className="space-y-6">
                        <div className="flex flex-wrap gap-2">
                            <CopyButton text={spaceFormat} variant="button" label="Copy All (Space)" />
                            <CopyButton text={commaFormat} variant="button" label="Copy All (Comma)" />
                        </div>

                        {/* Broad Hashtags */}
                        {hashtags.broad.length > 0 && (
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                    Broad Hashtags <span className="text-sm font-normal text-gray-500">(Higher reach)</span>
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {hashtags.broad.map((tag, i) => (
                                        <span
                                            key={i}
                                            className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium"
                                        >
                                            {tag}
                                            <CopyButton text={tag} className="!p-1" />
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Specific Hashtags */}
                        {hashtags.specific.length > 0 && (
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                    Specific Hashtags <span className="text-sm font-normal text-gray-500">(More targeted)</span>
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {hashtags.specific.map((tag, i) => (
                                        <span
                                            key={i}
                                            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium"
                                        >
                                            {tag}
                                            <CopyButton text={tag} className="!p-1" />
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </ToolPageLayout>
    );
}
