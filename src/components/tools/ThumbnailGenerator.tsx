"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Select from "@/components/ui/Select";
import CopyButton from "@/components/ui/CopyButton";
import ToolPageLayout from "@/components/tools/ToolPageLayout";
import UsageBanner from "@/components/ui/UsageBanner";
import LimitReachedModal from "@/components/ui/LimitReachedModal";
import { useUsage } from "@/hooks/useUsage";
import { FaMagic, FaStar, FaRegStar, FaPalette, FaBrain } from "react-icons/fa";
import { saveItem } from "@/lib/dashboard";
import { saveHistory } from "@/lib/history";
import { safeJSONParse } from "@/lib/utils";

// Constants
const styleOptions = [
    { value: "bold-colorful", label: "Bold & Colorful (MrBeast Style)" },
    { value: "minimal-clean", label: "Minimal & Clean (Tech/Lifestyle)" },
    { value: "mysterious", label: "Mysterious (True Crime/Documentary)" },
    { value: "professional", label: "Professional (Business/Finance)" },
    { value: "urgent", label: "Urgent/Warning (News/Updates)" },
];

const emotionOptions = [
    { value: "excited", label: "Excited / Hype" },
    { value: "shocked", label: "Shocked / Surprised" },
    { value: "curious", label: "Curious / Query" },
    { value: "negative", label: "Negative / Fear (Loss Aversion)" },
    { value: "confident", label: "Confident / Authority" },
];

const faq = [
    {
        question: "Why is thumbnail text important?",
        answer: "Thumbnail text (copy) complements your image to secure the click. It should be short, punchy, and create curiosity without repeating your title."
    },
    {
        question: "How long should thumbnail text be?",
        answer: "Keep it under 4 words. Large, readable text is crucial for mobile viewers. Less is often more."
    },
    {
        question: "What color text works best?",
        answer: "High contrast is key. White text on red/black backgrounds, or yellow text on dark backgrounds usually performs best. Our AI suggests colors for each idea."
    },
];

const howTo = [
    "Enter your video topic",
    "Select a visual style matching your niche",
    "Choose the emotion you want to trigger",
    "Generate 8 psychological hooks",
    "Use the color & text suggestions in Canva/Photoshop"
];

const seoContent = `Generate viral-worthy text for your YouTube thumbnails with our AI Thumbnail Text Generator. Create punchy, click-optimized copy that grabs attention and improves your CTR. Whether you need bold, shocking, or professional text, our AI analyzes successful trends to give you the best options for your video.`;

interface ThumbnailIdea {
    text: string;
    color_suggestion: string;
    trigger: string;
}

export default function ThumbnailGenerator() {
    const [topic, setTopic] = useState("");
    const [style, setStyle] = useState("bold-colorful");
    const [emotion, setEmotion] = useState("excited");
    const [results, setResults] = useState<ThumbnailIdea[]>([]);
    const [loading, setLoading] = useState(false);
    const [savedSet, setSavedSet] = useState<Set<string>>(new Set());

    const { checkLimit, increment, limitReachedTool, closeLimitModal } = useUsage();

    const handleSave = (idea: ThumbnailIdea) => {
        saveItem({
            type: 'idea',
            toolSlug: 'youtube-thumbnail-generator',
            content: `${idea.text} (${idea.trigger})`
        });
        setSavedSet(prev => new Set(prev).add(idea.text));
    };

    const handleGenerate = async () => {
        if (!topic.trim()) return;

        if (!checkLimit("youtube-thumbnail-generator")) {
            return;
        }

        setLoading(true);
        setResults([]);

        try {
            const response = await fetch("/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    tool: "thumbnail-text",
                    topic,
                    style: styleOptions.find(s => s.value === style)?.label,
                    emotion: emotionOptions.find(e => e.value === emotion)?.label,
                }),
            });
            const data = await response.json();

            if (data.error) {
                console.error("API Error:", data.error);
                return;
            }

            increment("youtube-thumbnail-generator");

            // Safe parse the new structured JSON
            const parsed = safeJSONParse<ThumbnailIdea[]>(data.result, []);

            // Fallback for string array (legacy)
            if (parsed.length === 0 && typeof data.result === 'string') {
                // Try parsing again if result is a string but not array
                try {
                    const directParse = JSON.parse(data.result);
                    if (Array.isArray(directParse)) {
                        // Check if it's string array or object array
                        if (typeof directParse[0] === 'string') {
                            setResults(directParse.map((t: string) => ({
                                text: t,
                                color_suggestion: "High Contrast",
                                trigger: "Curiosity"
                            })));
                        } else {
                            setResults(directParse);
                        }
                        return;
                    }
                } catch { }
            }

            setResults(parsed);

            // Save to Cloud History
            try {
                await saveHistory('youtube-thumbnail-generator', {
                    topic,
                    style,
                    emotion,
                    results: parsed
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

    return (
        <ToolPageLayout
            title="Professional Thumbnail Text Generator"
            slug="youtube-thumbnail-generator"
            description="Generate psychological hooks and design concepts for higher CTR."
            faq={faq}
            howTo={howTo}
            seoContent={seoContent}
        >
            <div className="space-y-8">
                <UsageBanner type="ai" toolSlug="youtube-thumbnail-generator" />
                <LimitReachedModal isOpen={!!limitReachedTool} onClose={closeLimitModal} toolSlug={limitReachedTool} />

                {/* Input Section */}
                <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 md:p-8 shadow-xl border border-gray-100 dark:border-gray-700">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div className="md:col-span-3">
                            <Input
                                label="Video Topic"
                                placeholder="e.g., I tried the most dangerous sport"
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                                className="text-lg"
                            />
                        </div>
                        <Select
                            label="Visual Style"
                            options={styleOptions}
                            value={style}
                            onChange={(e) => setStyle(e.target.value)}
                        />
                        <Select
                            label="Psychological Trigger"
                            options={emotionOptions}
                            value={emotion}
                            onChange={(e) => setEmotion(e.target.value)}
                        />
                        <div className="flex items-end">
                            <Button onClick={handleGenerate} isLoading={loading} className="w-full py-4 text-lg">
                                <FaMagic className="mr-2" />
                                Generate Concepts
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Results Section */}
                {results.length > 0 && (
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            <FaBrain className="text-purple-500" /> Psychology-Backed Concepts
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {results.map((idea, i) => {
                                const isSaved = savedSet.has(idea.text);
                                return (
                                    <div
                                        key={i}
                                        className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 hover:shadow-lg hover:border-purple-500/30 transition-all flex flex-col justify-between group h-full"
                                    >
                                        <div>
                                            {/* Trigger Badge */}
                                            <div className="inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 mb-4">
                                                {idea.trigger || "Curiosity Hook"}
                                            </div>

                                            {/* Main Text */}
                                            <div className="bg-gray-900 rounded-xl p-4 mb-4 text-center transform group-hover:scale-[1.02] transition-transform">
                                                <p className="text-2xl md:text-3xl font-black text-white tracking-tighter uppercase leading-none drop-shadow-md">
                                                    {idea.text}
                                                </p>
                                            </div>

                                            {/* Color Suggestion */}
                                            <div className="flex items-start gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
                                                <FaPalette className="flex-shrink-0 mt-0.5 text-gray-400" />
                                                <span>{idea.color_suggestion || "High contrast colors recommendation"}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                                            <button
                                                onClick={() => handleSave(idea)}
                                                disabled={isSaved}
                                                className={`flex items-center gap-2 text-sm font-medium transition-colors ${isSaved
                                                    ? "text-yellow-500 cursor-default"
                                                    : "text-gray-500 hover:text-yellow-500"
                                                    }`}
                                            >
                                                {isSaved ? <FaStar /> : <FaRegStar />}
                                                {isSaved ? "Saved" : "Save"}
                                            </button>
                                            <CopyButton text={idea.text} label="Copy Text" variant="button" />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </ToolPageLayout>
    );
}
