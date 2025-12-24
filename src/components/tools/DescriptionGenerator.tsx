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
import { FaMagic, FaSpinner, FaYoutube, FaPen, FaEye, FaAlignLeft, FaHashtag } from "react-icons/fa";

const videoTypeOptions = [
    { value: "tutorial", label: "Tutorial / How-To" },
    { value: "vlog", label: "Vlog / Lifestyle" },
    { value: "review", label: "Product Review" },
    { value: "gaming", label: "Gaming / Let's Play" },
    { value: "education", label: "Educational / Deep Dive" },
    { value: "story", label: "Storytime / Commentary" },
    { value: "business", label: "Business / Professional" },
];

const toneOptions = [
    { value: "casual", label: "Casual & Friendly (Best for Vlogs)" },
    { value: "excited", label: "High Energy / Hype (Best for Gaming)" },
    { value: "professional", label: "Professional & Clean (Best for Business)" },
    { value: "funny", label: "Humorous & Witty (Best for Entertainment)" },
    { value: "educational", label: "Clear & Concise (Best for Tutorials)" },
];

const faq = [
    {
        question: "Why should I include keywords?",
        answer: "Keywords help YouTube understand your video. We recommend adding 2-3 main keywords you want to rank for, and the AI will naturally weave them into the text."
    },
    {
        question: "What is the 'YouTube Preview'?",
        answer: "It shows exactly how your description will look to a viewer on a desktop, including the 'Show More' cutoff point, so you can ensure your hook is visible."
    },
    {
        question: "Can I edit the result?",
        answer: "Yes! Switch to 'Edit Mode' to tweak the text perfectly before copying."
    },
];

const howTo = [
    "Enter your video topic (be specific about the value)",
    "Add 1-2 main keywords for SEO ranking",
    "Choose a Tone that matches your channel style",
    "Click Generate to get a human-sounding description",
    "Use the Preview tab to check your 'Show More' hook"
];

const seoContent = `Create compelling YouTube descriptions that boost your video's discoverability with our AI-powered Description Generator. Our tool creates structured descriptions with engaging hooks, informative bullet points, strategic calls-to-action, and relevant hashtags to help your videos rank higher in search results and keep viewers engaged.`;

// Helper function to format JSON description to readable text
function formatDescriptionFromJSON(jsonString: string): string {
    try {
        const cleaned = jsonString.replace(/```json\s*/gi, "").replace(/```\s*/g, "").trim();
        const data = JSON.parse(cleaned);
        const desc = data.description || data;

        let formatted = "";

        if (desc.hook) formatted += desc.hook + "\n\n";
        if (desc.video_summary || desc.summary) formatted += (desc.video_summary || desc.summary) + "\n\n";

        if (desc.timestamps && Array.isArray(desc.timestamps) && desc.timestamps.length > 0) {
            formatted += "⏱️ TIMESTAMPS:\n";
            desc.timestamps.forEach((ts: string) => formatted += ts + "\n");
            formatted += "\n";
        }

        if (desc.key_points && Array.isArray(desc.key_points) && desc.key_points.length > 0) {
            formatted += "📌 WHAT YOU'LL LEARN:\n";
            desc.key_points.forEach((point: string) => formatted += point + "\n");
            formatted += "\n";
        }

        if (desc.resources_links || desc.resources) {
            formatted += "🔗 RESOURCES & LINKS:\n";
            formatted += (desc.resources_links || desc.resources) + "\n\n";
        }

        if (desc.call_to_action || desc.cta) formatted += (desc.call_to_action || desc.cta) + "\n\n";

        if (desc.hashtags) {
            formatted += "─────────────────────\n";
            formatted += desc.hashtags + "\n";
        }

        return formatted.trim();
    } catch {
        return jsonString;
    }
}

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { FaImage } from "react-icons/fa";

export default function DescriptionGenerator() {
    const searchParams = useSearchParams();
    const [topic, setTopic] = useState("");

    // Auto-fill topic from URL
    useEffect(() => {
        const urlTopic = searchParams.get("topic");
        if (urlTopic) {
            setTopic(urlTopic);
        }
    }, [searchParams]);
    const [videoType, setVideoType] = useState("tutorial");
    const [tone, setTone] = useState("casual");
    const [keywords, setKeywords] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [viewMode, setViewMode] = useState<"preview" | "edit">("preview");

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
            const response = await fetch("/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    tool: "description-generator",
                    topic,
                    videoType: videoTypeOptions.find(t => t.value === videoType)?.label,
                    tone: toneOptions.find(t => t.value === tone)?.label,
                    keywords,
                }),
            });

            const data = await response.json();

            if (data.error) {
                setError(data.error);
                return;
            }

            increment("youtube-description-generator");
            const formattedDescription = formatDescriptionFromJSON(data.result);
            setDescription(formattedDescription);
            setViewMode("preview");
        } catch (err) {
            console.error("Generation error:", err);
            setError("Failed to generate description. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <ToolPageLayout
            title="Optimized Description Generator"
            description="Create SEO-ready, human-sounding descriptions that get clicks."
            faq={faq}
            howTo={howTo}
            seoContent={seoContent}
        >
            <div className="space-y-8">
                <UsageBanner type="ai" toolSlug="youtube-description-generator" />
                <LimitReachedModal isOpen={!!limitReachedTool} onClose={closeLimitModal} toolSlug={limitReachedTool} />

                {/* Input Section */}
                <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 md:p-8 shadow-xl border border-gray-100 dark:border-gray-700">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="col-span-1 md:col-span-2">
                            <Input
                                label="Video Topic / Summary"
                                placeholder="e.g., How to edit videos faster in Premiere Pro"
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                                className="text-lg"
                            />
                        </div>

                        <div className="space-y-4">
                            <Select
                                label="Video Category"
                                options={videoTypeOptions}
                                value={videoType}
                                onChange={(e) => setVideoType(e.target.value)}
                                icon={<FaYoutube />}
                            />
                            <Select
                                label="Tone of Voice"
                                options={toneOptions}
                                value={tone}
                                onChange={(e) => setTone(e.target.value)}
                                icon={<FaAlignLeft />}
                            />
                        </div>

                        <div className="space-y-4">
                            <Input
                                label="Keywords to Target (Optional)"
                                placeholder="e.g., video editing, premiere pro hacks"
                                value={keywords}
                                onChange={(e) => setKeywords(e.target.value)}
                            />
                        </div>
                    </div>

                    <Button onClick={handleGenerate} isLoading={loading} disabled={loading} className="w-full py-4 text-lg">
                        <FaMagic className="mr-2" />
                        {loading ? "Writing Description..." : "Generate Description"}
                    </Button>
                </div>

                {error && (
                    <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400">
                        {error}
                    </div>
                )}

                {loading && (
                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8 text-center">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center animate-pulse">
                            <FaMagic className="w-8 h-8 text-white" />
                        </div>
                        <p className="text-gray-600 dark:text-gray-400">
                            Writing a human-sounding description optimized for SEO...
                        </p>
                    </div>
                )}

                {/* Results Section */}
                {description && !loading && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                <FaAlignLeft className="text-blue-500" /> Result
                            </h3>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setViewMode("preview")}
                                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${viewMode === "preview"
                                        ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                                        : "text-gray-500 hover:text-gray-900 dark:hover:text-white"
                                        }`}
                                >
                                    <FaEye /> Preview
                                </button>
                                <button
                                    onClick={() => setViewMode("edit")}
                                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${viewMode === "edit"
                                        ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                                        : "text-gray-500 hover:text-gray-900 dark:hover:text-white"
                                        }`}
                                >
                                    <FaPen /> Edit
                                </button>
                                <Link
                                    href={`/tools/youtube-ai-thumbnail-prompt?topic=${encodeURIComponent(topic)}`}
                                    className="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 text-pink-600 hover:bg-pink-50 dark:text-pink-400 dark:hover:bg-pink-900/20"
                                >
                                    <FaImage /> Thumbnail
                                </Link>
                                <CopyButton text={description} variant="button" label="Copy" />
                            </div>
                        </div>

                        {viewMode === "preview" ? (
                            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                                <div className="bg-gray-50 dark:bg-gray-900/50 px-4 py-2 border-b border-gray-200 dark:border-gray-700 flex items-center gap-2">
                                    <FaYoutube className="text-red-500" />
                                    <span className="text-xs font-bold text-gray-500 uppercase">YouTube Player View</span>
                                </div>
                                <div className="p-6">
                                    <div className="space-y-2">
                                        <div className="h-6 w-3/4 bg-gray-100 dark:bg-gray-700 rounded mb-4"></div>
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-600"></div>
                                            <div className="space-y-1">
                                                <div className="h-3 w-32 bg-gray-100 dark:bg-gray-700 rounded"></div>
                                                <div className="h-3 w-20 bg-gray-100 dark:bg-gray-700 rounded"></div>
                                            </div>
                                        </div>

                                        <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-xl text-sm leading-relaxed text-gray-800 dark:text-gray-200 whitespace-pre-wrap font-sans">
                                            {description}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm border border-gray-200 dark:border-gray-700">
                                <Textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    rows={15}
                                    className="border-0 focus:ring-0 p-6 font-mono text-sm leading-relaxed text-gray-800 dark:text-gray-200"
                                />
                            </div>
                        )}

                        <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center flex-shrink-0">
                                <FaHashtag className="text-green-600 dark:text-green-400 text-sm" />
                            </div>
                            <p className="text-sm text-green-700 dark:text-green-300">
                                <strong>Pro Tip:</strong> Paste this into your default upload settings on YouTube if you use a consistent template!
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </ToolPageLayout>
    );
}
