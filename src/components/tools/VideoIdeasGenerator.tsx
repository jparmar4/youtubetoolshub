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
import { FaMagic, FaSpinner } from "react-icons/fa";

const levelOptions = [
    { value: "beginner", label: "Beginner" },
    { value: "intermediate", label: "Intermediate" },
    { value: "advanced", label: "Advanced" },
];

const faq = [
    {
        question: "What makes these video ideas different?",
        answer: "Our AI generates ideas that sound like real YouTubers wrote them - not generic AI-speak. Each title creates curiosity and is designed to get clicks."
    },
    {
        question: "Can I use these titles exactly as generated?",
        answer: "Yes! Or customize them with your specific numbers, timeframes, and niche details to make them yours."
    },
    {
        question: "Why only 10 ideas?",
        answer: "Quality over quantity. Each idea is crafted with viral potential rather than generating 50 generic concepts."
    },
];

const howTo = [
    "Enter your niche (be specific for better results)",
    "Select your audience level",
    "Click 'Generate Ideas' to get 10 video concepts",
    "Copy the ones you like and make them your own"
];

const seoContent = `Generate YouTube video ideas that actually sound human. Our AI creates titles with built-in curiosity gaps - the kind that make viewers click. No generic "Ultimate Guide" or "Tips and Tricks" - just real ideas that real YouTubers would actually make.`;

interface VideoIdea {
    title: string;
    concept: string;
}

export default function VideoIdeasGenerator() {
    const [niche, setNiche] = useState("");
    const [level, setLevel] = useState("beginner");
    const [ideas, setIdeas] = useState<VideoIdea[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const { checkLimit, increment, limitReachedTool, closeLimitModal } = useUsage();

    const handleGenerate = async () => {
        if (!niche.trim()) {
            setError("Please enter your niche");
            return;
        }

        if (!checkLimit("youtube-video-ideas-generator")) {
            return;
        }

        setError("");
        setLoading(true);
        setIdeas([]);

        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 30000);

            const response = await fetch("/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    tool: "video-ideas",
                    niche,
                    level: levelOptions.find(l => l.value === level)?.label,
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
            increment("youtube-video-ideas-generator");

            let resultStr = data.result || "";
            resultStr = resultStr.replace(/```json\s*/gi, "").replace(/```\s*/g, "").trim();

            try {
                const parsed = JSON.parse(resultStr);
                setIdeas(Array.isArray(parsed) ? parsed.slice(0, 10) : []);
            } catch {
                setError("Failed to parse ideas. Please try again.");
            }
        } catch (err) {
            if (err instanceof Error && err.name === "AbortError") {
                setError("Request timed out. Please try again.");
            } else {
                setError("Failed to generate ideas. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    const allIdeasText = ideas.map((idea, i) => `${i + 1}. ${idea.title}`).join("\n");

    return (
        <ToolPageLayout
            title="YouTube Video Ideas Generator"
            description="Get 10 video ideas that sound human, not AI-generated"
            faq={faq}
            howTo={howTo}
            seoContent={seoContent}
        >
            <div className="space-y-6">
                <UsageBanner type="ai" />
                <LimitReachedModal isOpen={!!limitReachedTool} onClose={closeLimitModal} toolSlug={limitReachedTool} />

                {/* Input */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                        <Input
                            label="Your Niche"
                            placeholder="e.g., Budget travel, iPhone photography, Beginner guitar"
                            value={niche}
                            onChange={(e) => setNiche(e.target.value)}
                        />
                    </div>
                    <Select
                        label="Audience Level"
                        options={levelOptions}
                        value={level}
                        onChange={(e) => setLevel(e.target.value)}
                    />
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
                            Generate Ideas
                        </>
                    )}
                </Button>

                {error && (
                    <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
                        <p className="text-red-600 dark:text-red-400">{error}</p>
                    </div>
                )}

                {loading && (
                    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-8 text-center">
                        <FaMagic className="w-10 h-10 mx-auto text-red-500 animate-pulse mb-3" />
                        <p className="text-gray-600 dark:text-gray-400">Creating 10 video ideas...</p>
                    </div>
                )}

                {/* Results */}
                {ideas.length > 0 && !loading && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                                10 Video Ideas
                            </h3>
                            <CopyButton text={allIdeasText} variant="button" label="Copy All" />
                        </div>

                        <div className="space-y-3">
                            {ideas.map((idea, i) => (
                                <div
                                    key={i}
                                    className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:border-red-300 dark:hover:border-red-600 transition-colors"
                                >
                                    <div className="flex items-start gap-3">
                                        <span className="flex-shrink-0 w-7 h-7 rounded-full bg-red-500 text-white flex items-center justify-center font-bold text-sm">
                                            {i + 1}
                                        </span>
                                        <div className="flex-1">
                                            <div className="flex items-start justify-between gap-3">
                                                <div>
                                                    <h4 className="font-medium text-gray-900 dark:text-white">
                                                        {idea.title}
                                                    </h4>
                                                    {idea.concept && (
                                                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                                            {idea.concept}
                                                        </p>
                                                    )}
                                                </div>
                                                <CopyButton text={idea.title} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </ToolPageLayout>
    );
}
