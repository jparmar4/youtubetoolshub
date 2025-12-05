"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Select from "@/components/ui/Select";
import CopyButton from "@/components/ui/CopyButton";
import ToolPageLayout from "@/components/tools/ToolPageLayout";
import { FaMagic } from "react-icons/fa";

const styleOptions = [
    { value: "bold-colorful", label: "Bold & Colorful" },
    { value: "minimal-clean", label: "Minimal & Clean" },
    { value: "gaming", label: "Gaming Style" },
    { value: "kids-education", label: "Kids/Education" },
    { value: "luxury", label: "Luxury/Premium" },
    { value: "tech", label: "Tech/Modern" },
];

const emotionOptions = [
    { value: "excited", label: "Excited" },
    { value: "curious", label: "Curious" },
    { value: "urgent", label: "Urgent" },
    { value: "fun", label: "Fun" },
    { value: "shocked", label: "Shocked" },
    { value: "inspired", label: "Inspired" },
];

const faq = [
    {
        question: "What makes a good thumbnail text?",
        answer: "Good thumbnail text is short (3-6 words), clear, and creates curiosity. It should complement the image, not duplicate it. Use power words that evoke emotion and urgency."
    },
    {
        question: "Should I use all caps in thumbnails?",
        answer: "All caps can work well for creating impact, but use it strategically. Sometimes a mix of caps and regular text creates better hierarchy and readability."
    },
    {
        question: "How do I choose the right style?",
        answer: "Match your thumbnail style to your content and audience. Gaming content works well with bold colors, while educational content might benefit from cleaner, more minimal designs."
    },
];

const howTo = [
    "Enter your video topic or title in the input field",
    "Select a visual style that matches your content",
    "Choose the primary emotion you want to convey",
    "Click 'Generate Thumbnail Text Ideas' to get AI suggestions",
    "Review the generated text ideas and copy your favorites",
    "Use these text ideas when designing your thumbnail"
];

const seoContent = `Create attention-grabbing thumbnail text with our AI-powered generator. Get punchy, clickable text suggestions that will make your YouTube thumbnails stand out in search results and suggested videos. Our tool analyzes successful thumbnails and generates short, impactful text that drives clicks.`;

export default function ThumbnailGenerator() {
    const [topic, setTopic] = useState("");
    const [style, setStyle] = useState("bold-colorful");
    const [emotion, setEmotion] = useState("excited");
    const [results, setResults] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    const handleGenerate = async () => {
        if (!topic.trim()) return;

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
            console.log("API Response:", data); // Debug log

            if (data.error) {
                console.error("API Error:", data.error);
                return;
            }

            // Try to parse the result
            let parsed: string[] = [];
            if (typeof data.result === "string") {
                // Remove markdown code blocks (```json...```)
                const cleanResult = data.result
                    .replace(/```json\s*/gi, "")
                    .replace(/```\s*/g, "")
                    .trim();

                // Try JSON parse first
                try {
                    parsed = JSON.parse(cleanResult);
                } catch {
                    // If not JSON, try to split by newlines
                    parsed = cleanResult.split("\n").filter((line: string) => line.trim());
                }
            } else if (Array.isArray(data.result)) {
                parsed = data.result;
            }

            setResults(parsed);
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
