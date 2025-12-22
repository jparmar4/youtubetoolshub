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
import { FaMagic } from "react-icons/fa";

// Constants
const styleOptions = [
    { value: "bold-colorful", label: "Bold & Colorful" },
    { value: "minimal-clean", label: "Minimal & Clean" },
    { value: "mysterious", label: "Mysterious/Clickbaity" },
    { value: "professional", label: "Professional/Serious" },
    { value: "urgent", label: "Urgent/Warning" },
];

const emotionOptions = [
    { value: "excited", label: "Excited / Hype" },
    { value: "shocked", label: "Shocked / Surprised" },
    { value: "curious", label: "Curious / Questioning" },
    { value: "negative", label: "Negative / Warning" },
    { value: "confident", label: "Confident / Expert" },
];

const faq = [
    {
        question: "Why is thumbnail text important?",
        answer: "Thumbnail text (or 'copy') complements your image to secure the click. It should be short, punchy, and create curiosity without just repeating your title."
    },
    {
        question: "How long should thumbnail text be?",
        answer: "Keep it under 4-5 words. Large, readable text is crucial for mobile viewers. Use our tool to generate punchy short phrases."
    },
    {
        question: "Can I use AI generated text directly?",
        answer: "Absolutely! These ideas are generated to be high-performing. Choose the one that fits your video's vibe best."
    },
];

const howTo = [
    "Enter your video topic or working title",
    "Select a visual style that matches your channel brand",
    "Choose the primary emotion you want to evoke",
    "Click 'Generate Ideas' to get AI-powered text options",
    "Copy your favorite text and use it in your thumbnail design"
];

const seoContent = `Generate viral-worthy text for your YouTube thumbnails with our AI Thumbnail Text Generator. Create punchy, click-optimized copy that grabs attention and improves your CTR. Whether you need bold, shocking, or professional text, our AI analyzes successful trends to give you the best options for your video.`;

export default function ThumbnailGenerator() {
    const [topic, setTopic] = useState("");
    const [style, setStyle] = useState("bold-colorful");
    const [emotion, setEmotion] = useState("excited");
    const [results, setResults] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    const { checkLimit, increment, limitReachedTool, closeLimitModal } = useUsage();

    const handleGenerate = async () => {
        if (!topic.trim()) return;

        if (!checkLimit("youtube-thumbnail-generator")) {
            return;
        }

        setLoading(true);
        setResults([]); // Clear previous results

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
                return; // Or handle error state
            }

            // Success! Increment usage
            increment("youtube-thumbnail-generator");

            if (data.error) {
                console.error("API Error:", data.error);
                return; // Or handle error state
            }

            let resultStr = data.result || "";
            resultStr = resultStr.replace(/```json\s*/gi, "").replace(/```\s*/g, "").trim();

            try {
                const parsed = JSON.parse(resultStr);
                if (Array.isArray(parsed)) {
                    setResults(parsed);
                } else if (typeof parsed === "object" && parsed.ideas) {
                    setResults(parsed.ideas);
                } else {
                    // Fallback splitting if it's just text
                    setResults([resultStr]);
                }
            } catch (e) {
                // detailed fallback
                const lines = resultStr.split("\n")
                    .map((line: string) => line.replace(/^\d+\.\s*/, "").replace(/^[-*]\s*/, "").trim())
                    .filter((line: string) => line.length > 0);
                setResults(lines.length > 0 ? lines : [resultStr]);
            }
        } catch (error) {
            console.error("Generation error:", error);
        } finally {
            setLoading(false);
        }
    };

    const layoutSuggestion = `Text ${emotion === "excited" || emotion === "shocked" ? "left" : "center"} + Face ${emotion === "excited" ? "right" : "background"} + ${style === "bold-colorful" ? "Bright yellow/red background" : style === "minimal-clean" ? "White background with subtle gradient" : "Dynamic gradient background"}`;

    return (
        <ToolPageLayout
            title="YouTube Thumbnail Text Generator"
            description="Generate catchy, click-worthy thumbnail text ideas using AI"
            faq={faq}
            howTo={howTo}
            seoContent={seoContent}
        >
            <div className="space-y-6">
                <UsageBanner type="ai" />
                <LimitReachedModal isOpen={!!limitReachedTool} onClose={closeLimitModal} toolSlug={limitReachedTool} />

                {/* Input Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-3">
                        <Input
                            label="Video Topic or Title"
                            placeholder="e.g., How to grow on YouTube in 2024"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                        />
                    </div>
                    <Select
                        label="Visual Style"
                        options={styleOptions}
                        value={style}
                        onChange={(e) => setStyle(e.target.value)}
                    />
                    <Select
                        label="Primary Emotion"
                        options={emotionOptions}
                        value={emotion}
                        onChange={(e) => setEmotion(e.target.value)}
                    />
                    <div className="flex items-end">
                        <Button onClick={handleGenerate} isLoading={loading} className="w-full">
                            <FaMagic className="mr-2" />
                            Generate Ideas
                        </Button>
                    </div>
                </div>

                {/* Results Section */}
                {results.length > 0 && (
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Thumbnail Text Ideas
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {results.map((text, i) => (
                                <div
                                    key={i}
                                    className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 text-center group hover:from-red-900 hover:to-red-800 transition-colors"
                                >
                                    <p className="text-xl md:text-2xl font-black text-white mb-4 tracking-tight">
                                        {text}
                                    </p>

                                    <CopyButton text={text} variant="button" label="Copy Text" />
                                </div>
                            ))}
                        </div>

                        {/* Layout Suggestion */}
                        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                                💡 Layout Suggestion
                            </h4>
                            <p className="text-gray-600 dark:text-gray-300">
                                {layoutSuggestion}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </ToolPageLayout>
    );
}
