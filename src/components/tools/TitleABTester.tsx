"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import CopyButton from "@/components/ui/CopyButton";
import ToolPageLayout from "@/components/tools/ToolPageLayout";
import { FaBalanceScale } from "react-icons/fa";
import { safeJSONParse } from "@/lib/utils";

const faq = [
    {
        question: "What makes a good YouTube title?",
        answer: "Good titles are clear, create curiosity, contain relevant keywords, and accurately represent the content. They should be engaging without being misleading."
    },
    {
        question: "How long should my title be?",
        answer: "Aim for 50-60 characters to ensure full visibility in search results. YouTube allows up to 100 characters, but shorter is often better."
    },
    {
        question: "How is the AI score calculated?",
        answer: "The AI evaluates titles based on click-through potential, clarity, emotional appeal, keyword usage, and overall effectiveness."
    },
];

const howTo = [
    "Enter your first title option (Title A)",
    "Enter your second title option (Title B)",
    "Optionally add context about your video",
    "Click 'Analyze Titles' to get AI comparison",
    "Review scores and use the suggested improvements"
];

const seoContent = `Compare two YouTube title options with our AI-powered A/B Title Tester. Get scores for click-through potential, clarity, and emotional appeal. Our AI analyzes both titles and suggests improvements to help you create the most effective title for your video.`;

interface TitleAnalysis {
    titleA: { score: number; analysis: string };
    titleB: { score: number; analysis: string };
    suggested: string;
}

export default function TitleABTester() {
    const [titleA, setTitleA] = useState("");
    const [titleB, setTitleB] = useState("");
    const [context, setContext] = useState("");
    const [result, setResult] = useState<TitleAnalysis | null>(null);
    const [loading, setLoading] = useState(false);

    const handleAnalyze = async () => {
        if (!titleA.trim() || !titleB.trim()) return;

        setLoading(true);
        try {
            const response = await fetch("/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    tool: "title-ab-tester",
                    titleA,
                    titleB,
                    context: context || undefined,
                }),
            });

            const data = await response.json();
            const parsed = safeJSONParse<TitleAnalysis>(data.result, null as unknown as TitleAnalysis);
            setResult(parsed);
        } catch (error) {
            console.error("Analysis error:", error);
        } finally {
            setLoading(false);
        }
    };

    const getScoreColor = (score: number) => {
        if (score >= 80) return "text-green-500";
        if (score >= 60) return "text-yellow-500";
        return "text-red-500";
    };

    const getScoreGradient = (score: number) => {
        if (score >= 80) return "from-green-500 to-emerald-600";
        if (score >= 60) return "from-yellow-500 to-amber-600";
        return "from-red-500 to-rose-600";
    };

    return (
        <ToolPageLayout
            title="YouTube Title A/B Score Checker"
            description="Compare two title options and get AI-powered scoring"
            faq={faq}
            howTo={howTo}
            seoContent={seoContent}
        >
            <div className="space-y-6">
                {/* Input Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        label="Title A"
                        placeholder="e.g., How I Made $10K on YouTube"
                        value={titleA}
                        onChange={(e) => setTitleA(e.target.value)}
                    />
                    <Input
                        label="Title B"
                        placeholder="e.g., My Complete YouTube Income Breakdown"
                        value={titleB}
                        onChange={(e) => setTitleB(e.target.value)}
                    />
                </div>
                <Input
                    label="Video Context (Optional)"
                    placeholder="e.g., This video is about my monthly YouTube earnings as a tech creator"
                    value={context}
                    onChange={(e) => setContext(e.target.value)}
                />

                <Button onClick={handleAnalyze} isLoading={loading}>
                    <FaBalanceScale className="mr-2" />
                    Analyze Titles
                </Button>

                {/* Results Section */}
                {result && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Title A Card */}
                            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
                                <div className={`bg-gradient-to-r ${getScoreGradient(result.titleA.score)} p-4`}>
                                    <div className="flex items-center justify-between">
                                        <span className="text-white font-medium">Title A</span>
                                        <span className="text-3xl font-bold text-white">{result.titleA.score}</span>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <p className="font-medium text-gray-900 dark:text-white mb-3">{titleA}</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{result.titleA.analysis}</p>
                                    <CopyButton text={titleA} variant="button" label="Copy Title" />
                                </div>
                            </div>

                            {/* Title B Card */}
                            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
                                <div className={`bg-gradient-to-r ${getScoreGradient(result.titleB.score)} p-4`}>
                                    <div className="flex items-center justify-between">
                                        <span className="text-white font-medium">Title B</span>
                                        <span className="text-3xl font-bold text-white">{result.titleB.score}</span>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <p className="font-medium text-gray-900 dark:text-white mb-3">{titleB}</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{result.titleB.analysis}</p>
                                    <CopyButton text={titleB} variant="button" label="Copy Title" />
                                </div>
                            </div>
                        </div>

                        {/* Suggested Title */}
                        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                ✨ Suggested Improved Title
                            </h3>
                            <p className="text-gray-700 dark:text-gray-300 font-medium mb-4">{result.suggested}</p>
                            <CopyButton text={result.suggested} variant="button" label="Copy Suggested Title" />
                        </div>

                        {/* Winner */}
                        <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Winner</p>
                            <p className={`text-xl font-bold ${getScoreColor(Math.max(result.titleA.score, result.titleB.score))}`}>
                                {result.titleA.score > result.titleB.score ? "Title A" : result.titleB.score > result.titleA.score ? "Title B" : "Tie!"}
                                {result.titleA.score !== result.titleB.score &&
                                    ` (by ${Math.abs(result.titleA.score - result.titleB.score)} points)`
                                }
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </ToolPageLayout>
    );
}
