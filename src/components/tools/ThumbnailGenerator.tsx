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
import HorizontalAd from "@/components/ads/HorizontalAd";

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

interface ThumbnailIdea {
    text: string;
    trigger: string;
    color_suggestion: string;
}

export default function ThumbnailGenerator() {
    const [topic, setTopic] = useState("");
    const [style, setStyle] = useState("bold-colorful");
    const [emotion, setEmotion] = useState("excited");
    const [results, setResults] = useState<ThumbnailIdea[]>([]);
    const [loading, setLoading] = useState(false);
    const [savedSet, setSavedSet] = useState<Set<string>>(new Set());

    const { checkLimit, increment, limitReachedTool, closeLimitModal } = useUsage();

    const [error, setError] = useState("");

    const handleGenerate = async () => {
        if (!topic.trim()) {
            setError("Please enter a video topic");
            return;
        }
        if (!checkLimit("youtube-thumbnail-generator")) return;

        setLoading(true);
        setError("");
        setResults([]);
        try {
            const response = await fetch("/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    tool: "thumbnail-text",
                    topic,
                    style:
                        styleOptions.find((s) => s.value === style)?.label ||
                        style,
                    emotion:
                        emotionOptions.find((e) => e.value === emotion)?.label ||
                        emotion,
                }),
            });
            const data = await response.json();

            if (!response.ok || data.error) {
                setError(data.error || "Failed to generate thumbnail ideas");
                return;
            }

            if (data.result) {
                let parsed: ThumbnailIdea[] = [];
                try {
                    let cleanJson = data.result.replace(/```json\s*|\s*```/g, "").trim();
                    const arrayMatch = cleanJson.match(/\[[\s\S]*\]/);
                    if (arrayMatch) cleanJson = arrayMatch[0];
                    parsed = JSON.parse(cleanJson);
                } catch (e) {
                    console.error("Parse error", e);
                    setError("Could not parse thumbnail ideas. Please try again.");
                    return;
                }

                if (Array.isArray(parsed) && parsed.length > 0) {
                    setResults(parsed);
                    increment("youtube-thumbnail-generator");

                    try {
                        saveHistory("youtube-thumbnail-generator", {
                            topic,
                            results: parsed,
                        });
                    } catch (e) {
                        console.error(e);
                    }
                } else {
                    setError("No thumbnail ideas returned. Please try again.");
                }
            }
        } catch (err) {
            console.error(err);
            setError("Failed to generate thumbnail ideas. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (idea: ThumbnailIdea) => {
        saveItem({
            type: 'other',
            toolSlug: 'youtube-thumbnail-generator',
            content: { title: idea.text, description: idea.trigger }
        });
        setSavedSet(prev => new Set(prev).add(idea.text));
    };

    return (
        <ToolPageLayout
            title="Professional Thumbnail Text Generator"
            slug="youtube-thumbnail-generator"
            description="Generate psychological hooks and design concepts for higher CTR."
        >
            <div className="space-y-8">
                <UsageBanner type="ai" toolSlug="youtube-thumbnail-generator" />
                <LimitReachedModal isOpen={!!limitReachedTool} onClose={closeLimitModal} toolSlug={limitReachedTool} />

                {/* Input Section */}
                <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-200">
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
                    {error && (
                        <p className="mt-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-3">
                            {error}
                        </p>
                    )}
                </div>

                <HorizontalAd />

                {/* Results Section */}
                {results.length > 0 && (
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                            <FaBrain className="text-purple-500" /> Psychology-Backed Concepts
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {results.map((idea, i) => {
                                const isSaved = savedSet.has(idea.text);
                                return (
                                    <div
                                        key={i}
                                        className="bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-lg hover:border-purple-500/30 transition-all flex flex-col justify-between group h-full"
                                    >
                                        <div>
                                            {/* Trigger Badge */}
                                            <div className="inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full bg-purple-100 text-purple-700 mb-4">
                                                {idea.trigger || "Curiosity Hook"}
                                            </div>

                                            {/* Main Text */}
                                            <div className="bg-gray-900 rounded-xl p-4 mb-4 text-center transform group-hover:scale-[1.02] transition-transform">
                                                <p className="text-2xl md:text-3xl font-black text-white tracking-tighter uppercase leading-none drop-shadow-md">
                                                    {idea.text}
                                                </p>
                                            </div>

                                            {/* Color Suggestion */}
                                            <div className="flex items-start gap-2 text-sm text-slate-500 mb-4">
                                                <FaPalette className="flex-shrink-0 mt-0.5 text-slate-400" />
                                                <span>{idea.color_suggestion || "High contrast colors recommendation"}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                                            <button
                                                onClick={() => handleSave(idea)}
                                                disabled={isSaved}
                                                className={`flex items-center gap-2 text-sm font-medium transition-colors ${isSaved
                                                    ? "text-yellow-500 cursor-default"
                                                    : "text-slate-500 hover:text-yellow-500"
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
