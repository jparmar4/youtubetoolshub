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
import { FaMagic, FaStar, FaRegStar, FaLightbulb, FaChartLine, FaImage, FaTrophy, FaLayerGroup } from "react-icons/fa";
import { saveItem } from "@/lib/dashboard";
import { saveHistory } from "@/lib/history";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const levelOptions = [
    { value: "beginner", label: "Beginner Audience" },
    { value: "intermediate", label: "Intermediate Audience" },
    { value: "advanced", label: "Advanced / Expert Audience" },
];

const channelSizeOptions = [
    { value: "starting", label: "Just Starting (0 - 1k Subs)" },
    { value: "growing", label: "Growing (1k - 10k Subs)" },
    { value: "established", label: "Established (10k - 100k Subs)" },
    { value: "big", label: "Big Creator (100k+ Subs)" },
];

const goalOptions = [
    { value: "views", label: "Get More Views (Viral)" },
    { value: "subs", label: "Get Subscribers (Community)" },
    { value: "search", label: "Rank in Search (Evergreen)" },
    { value: "money", label: "Make Money (Sales/Sponsors)" },
];

interface VideoIdea {
    title: string;
    concept: string;
    score: number;
    difficulty: string;
    angle: string;
    thumbnail_concept: string;
}

export default function VideoIdeasGenerator() {
    const [niche, setNiche] = useState("");
    const [level, setLevel] = useState("beginner");
    const [channelSize, setChannelSize] = useState("starting");
    const [contentGoal, setContentGoal] = useState("views");

    const [ideas, setIdeas] = useState<VideoIdea[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [savedSet, setSavedSet] = useState<Set<string>>(new Set());

    const { checkLimit, increment, limitReachedTool, closeLimitModal } = useUsage();

    const handleSave = async (idea: VideoIdea) => {
        // Save to local dashboard (legacy/offline support)
        saveItem({
            type: 'idea',
            toolSlug: 'youtube-video-ideas-generator',
            content: { title: idea.title, concept: idea.concept }
        });

        // Save to Cloud History
        try {
            await saveHistory('youtube-video-ideas-generator', {
                title: idea.title,
                concept: idea.concept,
                score: idea.score,
                difficulty: idea.difficulty,
                angle: idea.angle,
                thumbnail_concept: idea.thumbnail_concept
            });
        } catch (error) {
            console.error("Failed to save to cloud history:", error);
            // Optionally show a toast or notification
        }

        setSavedSet(prev => new Set(prev).add(idea.title));
    };

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
            const response = await fetch("/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    tool: "video-ideas",
                    niche,
                    level: levelOptions.find(l => l.value === level)?.label,
                    channelSize: channelSizeOptions.find(c => c.value === channelSize)?.label,
                    contentGoal: goalOptions.find(g => g.value === contentGoal)?.label,
                }),
            });

            const data = await response.json();

            if (data.error) {
                setError(data.error);
                return;
            }

            let resultStr = data.result || "";

            // Robust JSON extraction
            const jsonMatch = resultStr.match(/\[[\s\S]*\]/);
            if (jsonMatch) {
                resultStr = jsonMatch[0];
            } else {
                // Fallback for cleaning markdown if regex fails (though regex is reliable for arrays)
                resultStr = resultStr.replace(/```json\s*/gi, "").replace(/```\s*/g, "").trim();
            }

            try {
                const parsed = JSON.parse(resultStr);

                // Handle backward compatibility or new format
                if (Array.isArray(parsed)) {
                    // Normalize data structure if needed
                    const normalized: VideoIdea[] = parsed.map((item: any) => ({
                        title: item.title || "",
                        concept: item.concept || "",
                        score: item.score || 80,
                        difficulty: item.difficulty || "Medium",
                        angle: item.angle || "Strategic",
                        thumbnail_concept: item.thumbnail_concept || "Descriptive visual relating to title."
                    }));

                    setIdeas(normalized);
                    increment("youtube-video-ideas-generator"); // Only increment after success

                    // Auto-save the first result or summary to history
                    if (normalized.length > 0) {
                        try {
                            // Saving the simplified first idea as a history marker
                            await saveHistory('youtube-video-ideas-generator', {
                                title: normalized[0].title,
                                concept: normalized[0].concept,
                                score: normalized[0].score,
                                difficulty: normalized[0].difficulty,
                                angle: normalized[0].angle,
                                thumbnail_concept: normalized[0].thumbnail_concept
                            });
                        } catch (histErr) {
                            console.error("Failed to auto-save history:", histErr);
                        }
                    }
                } else {
                    console.error("Parsed data is not an array:", parsed);
                    setError("AI returned an unexpected format. Please try again.");
                }
            } catch (parseErr) {
                console.error("JSON Parse Error:", parseErr, "Result string:", resultStr);
                setError("Failed to process AI response. Please try again.");
            }

        } catch (err) {
            console.error("Generation error:", err);
            setError("Failed to generate ideas. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const allIdeasText = ideas.map((idea, i) => `${i + 1}. ${idea.title}\nConcept: ${idea.concept}`).join("\n\n");

    return (
        <ToolPageLayout
            title="Strategic Video Ideas Generator"
            slug="youtube-video-ideas-generator"
            description="Get proven video concepts tailored to your channel size and growth goals."
        >
            <div className="space-y-8">
                <UsageBanner type="ai" toolSlug="youtube-video-ideas-generator" />
                <LimitReachedModal isOpen={!!limitReachedTool} onClose={closeLimitModal} toolSlug={limitReachedTool} />

                {/* Pro Input Section */}
                <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="col-span-1 md:col-span-2">
                            <Input
                                label="Your Niche (Be Specific)"
                                placeholder="e.g., Sustainable tech reviews, Vegan meal prep for students"
                                value={niche}
                                onChange={(e) => setNiche(e.target.value)}
                                className="text-lg"
                            />
                        </div>

                        <div className="space-y-4">
                            <Select
                                label="Channel Size"
                                options={channelSizeOptions}
                                value={channelSize}
                                onChange={(e) => setChannelSize(e.target.value)}
                                icon={<FaChartLine />}
                            />
                            <Select
                                label="Audience Level"
                                options={levelOptions}
                                value={level}
                                onChange={(e) => setLevel(e.target.value)}
                                icon={<FaLayerGroup />}
                            />
                        </div>

                        <div className="space-y-4">
                            <Select
                                label="Primary Goal"
                                options={goalOptions}
                                value={contentGoal}
                                onChange={(e) => setContentGoal(e.target.value)}
                                icon={<FaTrophy />}
                            />
                        </div>
                    </div>

                    <Button onClick={handleGenerate} isLoading={loading} disabled={loading} className="w-full py-4 text-lg">
                        <FaMagic className="mr-2" />
                        {loading ? "Strategizing Concepts..." : "Generate Strategic Ideas"}
                    </Button>
                </div>

                {error && (
                    <div className="bg-red-50 rounded-xl p-4 border border-red-200 text-red-600">
                        {error}
                    </div>
                )}

                {loading && (
                    <div className="py-12 text-center space-y-4">
                        <div className="inline-block relative">
                            <div className="w-16 h-16 rounded-full border-4 border-red-100 border-t-emerald-500 animate-spin" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <FaLightbulb className="text-emerald-500 animate-pulse" />
                            </div>
                        </div>
                        <p className="text-gray-500 text-lg">Brainstorming viral angles for your niche...</p>
                    </div>
                )}

                {/* Results - Card Layout */}
                <div className="space-y-6">
                    {ideas.length > 0 && !loading && (
                        <div className="flex items-center justify-between px-2">
                            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                <FaLightbulb className="text-yellow-500" /> Best Strategy Matches
                            </h3>
                            <CopyButton text={allIdeasText} variant="button" label="Copy All Ideas" />
                        </div>
                    )}

                    <AnimatePresence>
                        {ideas.map((idea, i) => {
                            const isSaved = savedSet.has(idea.title);
                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-lg hover:border-red-200 transition-all group relative overflow-hidden"
                                >
                                    <div className="flex flex-col md:flex-row gap-6">

                                        {/* Score Visual */}
                                        <div className="flex-shrink-0 flex flex-col items-center gap-3">
                                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 flex flex-col items-center justify-center">
                                                <span className={`text-xl font-black ${idea.score >= 90 ? "text-green-500" :
                                                    idea.score >= 80 ? "text-blue-500" : "text-yellow-500"
                                                    }`}>
                                                    {idea.score}
                                                </span>
                                                <span className="text-[10px] uppercase font-bold text-slate-400">Score</span>
                                            </div>
                                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${idea.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                                                idea.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                                                    'bg-red-100 text-emerald-700'
                                                }`}>
                                                {idea.difficulty}
                                            </span>
                                        </div>

                                        <div className="flex-1 space-y-3">
                                            <div className="flex justify-between items-start">
                                                <div className="space-y-1">
                                                    <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">{idea.angle} Angle</span>
                                                    <h4 className="text-lg font-bold text-slate-900 leading-tight">
                                                        {idea.title}
                                                    </h4>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Link
                                                        href={`/tools/youtube-title-generator?topic=${encodeURIComponent(idea.title)}`}
                                                        className="p-2 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition-all font-medium text-sm flex items-center gap-2"
                                                        title="Generate Optimized Titles"
                                                    >
                                                        <FaMagic /> Generate Titles
                                                    </Link>
                                                    <button
                                                        onClick={() => handleSave(idea)}
                                                        disabled={isSaved}
                                                        className={`p-2 rounded-xl transition-all ${isSaved
                                                            ? "bg-yellow-50 text-yellow-500"
                                                            : "bg-slate-50 text-slate-400 hover:text-yellow-500 hover:bg-yellow-50"
                                                            }`}
                                                        title="Save Idea"
                                                    >
                                                        {isSaved ? <FaStar /> : <FaRegStar />}
                                                    </button>
                                                    <CopyButton text={idea.title} variant="icon" />
                                                </div>
                                            </div>

                                            <p className="text-slate-600 text-sm">
                                                {idea.concept}
                                            </p>

                                            <div className="bg-slate-50 rounded-lg p-3 flex gap-3 items-start border border-slate-200">
                                                <FaImage className="text-slate-400 mt-1 flex-shrink-0" />
                                                <div>
                                                    <span className="text-xs font-bold text-slate-500 uppercase block mb-1">Thumbnail Concept</span>
                                                    <p className="text-sm text-slate-600 italic">
                                                        &quot;{idea.thumbnail_concept}&quot;
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
            </div>
        </ToolPageLayout>
    );
}
