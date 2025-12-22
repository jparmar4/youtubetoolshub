"use client";

import { useState } from "react";
import { Input, Textarea } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Select from "@/components/ui/Select";
import CopyButton from "@/components/ui/CopyButton";
import ToolPageLayout from "@/components/tools/ToolPageLayout";
import UsageBanner from "@/components/ui/UsageBanner";
import LimitReachedModal from "@/components/ui/LimitReachedModal";
import { useUsage } from "@/hooks/useUsage";
import { FaMagic, FaSpinner } from "react-icons/fa";

const videoTypeOptions = [
    { value: "tutorial", label: "Tutorial" },
    { value: "vlog", label: "Vlog" },
    { value: "review", label: "Review" },
    { value: "gaming", label: "Gaming" },
    { value: "educational", label: "Educational" },
    { value: "entertainment", label: "Entertainment" },
    { value: "news", label: "News/Commentary" },
    { value: "howto", label: "How-To Guide" },
    { value: "unboxing", label: "Unboxing" },
    { value: "other", label: "Other" },
];

const faq = [
    {
        question: "What should a YouTube description include?",
        answer: "A good description includes a hook, brief summary, timestamps, links to related content, call-to-action, social media links, and relevant hashtags."
    },
    {
        question: "How long should my description be?",
        answer: "Aim for 200-300 words minimum. YouTube allows up to 5,000 characters. Longer descriptions with relevant keywords can help with SEO."
    },
    {
        question: "What are the best hashtags to use?",
        answer: "Use a mix of broad and specific hashtags. YouTube shows the first 3 hashtags above your title, so choose wisely. Generally, 3-5 hashtags work best."
    },
];

const howTo = [
    "Enter your video topic or a brief summary of your content",
    "Select the type of video you're creating",
    "Check the box if you want a call-to-action included",
    "Click 'Generate Description' to create your content",
    "Review and customize the generated description",
    "Copy the description to use on YouTube"
];

const seoContent = `Create compelling YouTube descriptions that boost your video's discoverability with our AI-powered Description Generator. Our tool creates structured descriptions with engaging hooks, informative bullet points, strategic calls-to-action, and relevant hashtags to help your videos rank higher in search results and keep viewers engaged.`;

// Helper function to format JSON description to readable text
function formatDescriptionFromJSON(jsonString: string): string {
    try {
        // Clean markdown code blocks if present
        const cleaned = jsonString.replace(/```json\s*/gi, "").replace(/```\s*/g, "").trim();

        const data = JSON.parse(cleaned);
        const desc = data.description || data;

        let formatted = "";

        // Hook
        if (desc.hook) {
            formatted += desc.hook + "\n\n";
        }

        // Video Summary
        if (desc.video_summary || desc.summary) {
            formatted += (desc.video_summary || desc.summary) + "\n\n";
        }

        // Timestamps
        if (desc.timestamps && Array.isArray(desc.timestamps) && desc.timestamps.length > 0) {
            formatted += "⏱️ TIMESTAMPS:\n";
            desc.timestamps.forEach((ts: string) => {
                formatted += ts + "\n";
            });
            formatted += "\n";
        }

        // Key Points
        if (desc.key_points && Array.isArray(desc.key_points) && desc.key_points.length > 0) {
            formatted += "📌 WHAT YOU'LL LEARN:\n";
            desc.key_points.forEach((point: string) => {
                formatted += point + "\n";
            });
            formatted += "\n";
        }

        // Resources/Links
        if (desc.resources_links || desc.resources) {
            formatted += "🔗 RESOURCES & LINKS:\n";
            formatted += (desc.resources_links || desc.resources) + "\n\n";
        }

        // Call to Action
        if (desc.call_to_action || desc.cta) {
            formatted += (desc.call_to_action || desc.cta) + "\n\n";
        }

        // Hashtags
        if (desc.hashtags) {
            formatted += "─────────────────────\n";
            formatted += desc.hashtags + "\n";
        }

        return formatted.trim();
    } catch {
        // If not JSON, return as-is (might already be formatted text)
        return jsonString;
    }
}

export default function DescriptionGenerator() {
    const [topic, setTopic] = useState("");
    const [videoType, setVideoType] = useState("tutorial");
    const [includeCTA, setIncludeCTA] = useState(true);
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const { checkLimit, increment, limitReachedTool, closeLimitModal } = useUsage();

    const handleGenerate = async () => {
        if (!topic.trim()) {
            setError("Please enter a video topic");
            return;
        }

        if (!checkLimit("youtube-description-generator")) {
            return;
        }

        setError("");
        setLoading(true);
        setDescription("");

        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 30000);

            const response = await fetch("/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    tool: "description-generator",
                    topic,
                    videoType: videoTypeOptions.find(t => t.value === videoType)?.label,
                    includeCTA,
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
            increment("youtube-description-generator");

            // Format the JSON response to readable text
            const formattedDescription = formatDescriptionFromJSON(data.result);
            setDescription(formattedDescription);
        } catch (err) {
            if (err instanceof Error && err.name === "AbortError") {
                setError("Request timed out. Please try again.");
            } else {
                console.error("Generation error:", err);
                setError("Failed to generate description. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <ToolPageLayout
            title="YouTube Description Generator"
            description="Create engaging, SEO-optimized video descriptions with AI"
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
                            label="Video Topic / Summary"
                            placeholder="e.g., Complete guide to starting a YouTube channel in 2024"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                        />
                    </div>
                    <Select
                        label="Video Type"
                        options={videoTypeOptions}
                        value={videoType}
                        onChange={(e) => setVideoType(e.target.value)}
                    />
                </div>

                <div className="flex items-center gap-3">
                    <input
                        type="checkbox"
                        id="include-cta"
                        checked={includeCTA}
                        onChange={(e) => setIncludeCTA(e.target.checked)}
                        className="w-5 h-5 rounded border-gray-300 text-red-500 focus:ring-red-500"
                    />
                    <label htmlFor="include-cta" className="text-gray-700 dark:text-gray-300">
                        Include call-to-action (like & subscribe)
                    </label>
                </div>

                <Button onClick={handleGenerate} isLoading={loading} disabled={loading}>
                    {loading ? (
                        <>
                            <FaSpinner className="mr-2 animate-spin" />
                            Generating...
                        </>
                    ) : (
                        <>
                            <FaMagic className="mr-2" />
                            Generate Description
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
                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8 text-center">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center animate-pulse">
                            <FaMagic className="w-8 h-8 text-white" />
                        </div>
                        <p className="text-gray-600 dark:text-gray-400">
                            Creating your SEO-optimized description...
                        </p>
                    </div>
                )}

                {/* Results Section */}
                {description && !loading && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Your Description (Ready to Copy!)
                            </h3>
                            <CopyButton text={description} variant="button" label="Copy Description" />
                        </div>
                        <Textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={18}
                            className="font-mono text-sm"
                        />
                        <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4">
                            <p className="text-sm text-green-700 dark:text-green-300">
                                ✅ <strong>Ready to use!</strong> Copy this description and paste it directly into your YouTube video.
                                Feel free to edit the timestamps and links before publishing.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </ToolPageLayout>
    );
}
