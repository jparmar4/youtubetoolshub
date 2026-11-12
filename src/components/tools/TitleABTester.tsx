"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import Button from "@/components/ui/Button";

import ToolPageLayout from "@/components/tools/ToolPageLayout";
import UsageBanner from "@/components/ui/UsageBanner";
import LimitReachedModal from "@/components/ui/LimitReachedModal";
import { useUsage } from "@/hooks/useUsage";
import { FaBalanceScale } from "react-icons/fa";
import { safeJSONParse } from "@/lib/utils";
import { saveHistory } from "@/lib/history";

// Interfaces
interface TitleMetrics {
    score: number;
    ctr_prediction: string;
    impulse_rating: "High" | "Medium" | "Low";
    strengths: string[];
    weaknesses: string[];
}

interface TitleAnalysis {
    winner: "A" | "B";
    confidence: number;
    analysis: string;
    titleA: TitleMetrics;
    titleB: TitleMetrics;
}

// Constants



export default function TitleABTester() {
    const [titleA, setTitleA] = useState("");
    const [titleB, setTitleB] = useState("");
    const [context, setContext] = useState("");
    const [result, setResult] = useState<TitleAnalysis | null>(null);
    const [loading, setLoading] = useState(false);

    const { checkLimit, increment, limitReachedTool, closeLimitModal } = useUsage();

    const handleAnalyze = async () => {
        if (!titleA.trim() || !titleB.trim()) return;

        if (!checkLimit("youtube-title-ab-tester")) {
            return;
        }

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

            if (data.error) {
                console.error("Analysis error:", data.error);
                return;
            }

            // Success! Increment usage
            increment("youtube-title-ab-tester");

            const parsed = safeJSONParse<TitleAnalysis>(data.result, null as unknown as TitleAnalysis);
            setResult(parsed);

            // Save to Cloud History
            try {
                if (parsed) {
                    await saveHistory('youtube-title-ab-tester', {
                        titleA,
                        titleB,
                        context,
                        result: parsed
                    });
                }
            } catch (error) {
                console.error("Failed to save to cloud history:", error);
            }
        } catch (error) {
            console.error("Analysis error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ToolPageLayout
            title="AI Title Click Simulator"
            slug="youtube-title-ab-tester"
            description="Predict the winner before you publish. Simulate 1,000 keyword impressions."
        >
            <div className="space-y-8">
                <UsageBanner type="ai" toolSlug="youtube-title-ab-tester" />
                <LimitReachedModal isOpen={!!limitReachedTool} onClose={closeLimitModal} toolSlug={limitReachedTool} />

                {/* Input Section */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <Input
                            label="Title Option A"
                            placeholder="e.g., I Quit Sugar for 30 Days"
                            value={titleA}
                            onChange={(e) => setTitleA(e.target.value)}
                        />
                        <Input
                            label="Title Option B"
                            placeholder="e.g., The Truth About Sugar (Withdrawal Symptoms)"
                            value={titleB}
                            onChange={(e) => setTitleB(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <Input
                            label="Target Audience / Context (Optional)"
                            placeholder="e.g., Health conscious people, skeptics, beginners"
                            value={context}
                            onChange={(e) => setContext(e.target.value)}
                        />
                    </div>

                    <Button onClick={handleAnalyze} isLoading={loading} className="w-full text-lg py-4">
                        {loading ? "Running Click Simulation..." : "Run 1,000-Impression Simulation"}
                    </Button>
                </div>


                {/* Results Section */}
                {result && (
                    <div className="space-y-8 animate-fade-in">

                        {/* Winner Banner */}
                        <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 text-white shadow-xl text-center">
                            <div className="absolute inset-0 bg-white/10 opacity-20"></div>
                            <div className="relative z-10">
                                <div className="inline-block bg-white/20 backdrop-blur-md rounded-full px-4 py-1 text-sm font-semibold mb-4">
                                    AI CONFIDENCE: {result.confidence}%
                                </div>
                                <h3 className="text-3xl font-bold mb-2">
                                    Title {result.winner} is the Likely Winner
                                </h3>
                                <p className="text-blue-100 text-lg max-w-2xl mx-auto">
                                    {result.analysis}
                                </p>
                            </div>
                        </div>

                        {/* Comparison Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Card A */}
                            <div className={`rounded-2xl border-4 ${result.winner === 'A' ? 'border-emerald-500 shadow-emerald-200/70 shadow-lg bg-white' : 'border-slate-200 bg-slate-50'}`}>
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <span className={`text-sm font-bold px-3 py-1 rounded-full ${result.winner === 'A' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-700'}`}>
                                            OPTION A
                                        </span>
                                        <span className="font-mono text-sm text-slate-600">
                                            Impulse: <span className="font-bold text-slate-900">{result.titleA.impulse_rating}</span>
                                        </span>
                                    </div>
                                    <h4 className="text-xl font-bold text-slate-900 mb-6 leading-relaxed">
                                        {titleA}
                                    </h4>

                                    {/* Stats Grid */}
                                    <div className="grid grid-cols-2 gap-4 mb-6">
                                        <div className="bg-white p-3 rounded-xl border border-slate-200">
                                            <p className="text-xs text-slate-600 mb-1">Viral Score</p>
                                            <p className="text-2xl font-bold text-blue-600">{result.titleA.score}</p>
                                        </div>
                                        <div className="bg-white p-3 rounded-xl border border-slate-200">
                                            <p className="text-xs text-slate-600 mb-1">Proj. CTR</p>
                                            <p className="text-2xl font-bold text-purple-600">{result.titleA.ctr_prediction}</p>
                                        </div>
                                    </div>

                                    {/* Lists */}
                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-sm font-semibold text-emerald-700 mb-2 flex items-center">
                                                <FaBalanceScale className="mr-2" /> Strengths
                                            </p>
                                            <ul className="text-sm space-y-1 text-slate-700">
                                                {result.titleA.strengths.map((s, i) => (
                                                    <li key={i} className="flex items-start">
                                                        <span className="mr-2">•</span> {s}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-rose-600 mb-2">Weaknesses</p>
                                            <ul className="text-sm space-y-1 text-slate-600">
                                                {result.titleA.weaknesses.map((w, i) => (
                                                    <li key={i} className="flex items-start">
                                                        <span className="mr-2">•</span> {w}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Card B */}
                            <div className={`rounded-2xl border-4 ${result.winner === 'B' ? 'border-emerald-500 shadow-emerald-200/70 shadow-lg bg-white' : 'border-slate-200 bg-slate-50'}`}>
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <span className={`text-sm font-bold px-3 py-1 rounded-full ${result.winner === 'B' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-700'}`}>
                                            OPTION B
                                        </span>
                                        <span className="font-mono text-sm text-slate-600">
                                            Impulse: <span className="font-bold text-slate-900">{result.titleB.impulse_rating}</span>
                                        </span>
                                    </div>
                                    <h4 className="text-xl font-bold text-slate-900 mb-6 leading-relaxed">
                                        {titleB}
                                    </h4>

                                    {/* Stats Grid */}
                                    <div className="grid grid-cols-2 gap-4 mb-6">
                                        <div className="bg-white p-3 rounded-xl border border-slate-200">
                                            <p className="text-xs text-slate-600 mb-1">Viral Score</p>
                                            <p className="text-2xl font-bold text-blue-600">{result.titleB.score}</p>
                                        </div>
                                        <div className="bg-white p-3 rounded-xl border border-slate-200">
                                            <p className="text-xs text-slate-600 mb-1">Proj. CTR</p>
                                            <p className="text-2xl font-bold text-purple-600">{result.titleB.ctr_prediction}</p>
                                        </div>
                                    </div>

                                    {/* Lists */}
                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-sm font-semibold text-emerald-700 mb-2 flex items-center">
                                                <FaBalanceScale className="mr-2" /> Strengths
                                            </p>
                                            <ul className="text-sm space-y-1 text-slate-700">
                                                {result.titleB.strengths.map((s, i) => (
                                                    <li key={i} className="flex items-start">
                                                        <span className="mr-2">•</span> {s}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-rose-600 mb-2">Weaknesses</p>
                                            <ul className="text-sm space-y-1 text-slate-600">
                                                {result.titleB.weaknesses.map((w, i) => (
                                                    <li key={i} className="flex items-start">
                                                        <span className="mr-2">•</span> {w}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                )}
            </div>
        </ToolPageLayout>
    );
}
