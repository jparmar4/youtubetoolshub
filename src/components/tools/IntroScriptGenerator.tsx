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
import { FaMicrophone, FaSpinner, FaPlay, FaStream } from "react-icons/fa";
import { safeJSONParse } from "@/lib/utils";
import { saveHistory } from "@/lib/history";

const personalityOptions = [
    { value: "energetic", label: "Energetic & Excited" },
    { value: "calm", label: "Calm & Professional" },
    { value: "fun", label: "Fun & Playful" },
    { value: "serious", label: "Serious & Authoritative" },
    { value: "friendly", label: "Friendly & Relatable" },
    { value: "teacher", label: "Teacher & Educational" },
    { value: "storyteller", label: "Storyteller" },
    { value: "motivational", label: "Motivational & Inspiring" },
];

const lengthOptions = [
    { value: "10-15 seconds", label: "Short (10-15 sec)" },
    { value: "20-30 seconds", label: "Standard (20-30 sec)" },
    { value: "30-45 seconds", label: "Detailed (30-45 sec)" },
];

const structureOptions = [
    { value: "Standard Hook", label: "Standard Hook (H-C-P-T)" },
    { value: "Story Start", label: "Story Start (Transformation)" },
    { value: "Cold Open", label: "Cold Open (Immediate Action)" },
    { value: "Controversial", label: "Controversial (Pattern Interrupt)" },
];

const faq = [
    {
        question: "How long should a YouTube intro be?",
        answer: "10-30 seconds max. Viewers decide in the first 5 seconds whether to keep watching. Hook them fast, then deliver value."
    },
    {
        question: "What makes a good video intro?",
        answer: "A great intro has: 1) A hook that stops the scroll, 2) Context about what they'll learn, 3) A promise of value, 4) Smooth transition into content."
    },
    {
        question: "Should I ask for likes in the intro?",
        answer: "No! Save CTAs for later. Focus the intro on hooking viewers. Asking for likes before delivering value feels desperate."
    },
];

const howTo = [
    "Enter your video topic",
    "Choose a personality that matches your style",
    "Select your desired intro length",
    "Click 'Generate Script' to get your intro",
    "Practice reading out loud before recording"
];

const seoContent = `Create attention-grabbing YouTube intro scripts with our AI generator. Get ready-to-read scripts that hook viewers in the first 5 seconds. Choose your personality style and length, and get a complete intro with hook, context, promise, and transition.`;

interface ScriptResult {
    hook: string;
    context: string;
    promise: string;
    transition: string;
}

export default function IntroScriptGenerator() {
    const [topic, setTopic] = useState("");
    const [personality, setPersonality] = useState("energetic");
    const [length, setLength] = useState("10-15 seconds");
    const [structure, setStructure] = useState("Standard Hook");
    const [scriptData, setScriptData] = useState<ScriptResult | null>(null);
    const [rawScript, setRawScript] = useState(""); // Fallback
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const { checkLimit, increment, limitReachedTool, closeLimitModal } = useUsage();

    const handleGenerate = async () => {
        if (!topic.trim()) {
            setError("Please enter your video topic");
            return;
        }

        if (!checkLimit("youtube-intro-generator")) {
            return;
        }

        setError("");
        setLoading(true);
        setScriptData(null);
        setRawScript("");

        try {
            const response = await fetch("/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    tool: "intro-script", // API calls this "intro-script", UI component "intro-generator" but API route expects "intro-script" for the case? Wait, route.ts has "intro-script". OK.
                    topic,
                    personality: personalityOptions.find(p => p.value === personality)?.label,
                    length,
                    structure: structureOptions.find(s => s.value === structure)?.label,
                }),
            });

            const data = await response.json();

            if (data.error) {
                setError(data.error);
                return;
            }

            increment("youtube-intro-generator");

            // Try parsing JSON first
            const parsed = safeJSONParse<ScriptResult | null>(data.result, null);
            if (parsed && parsed.hook) {
                setScriptData(parsed);
            } else {
                // Fallback text
                setRawScript(data.result.replace(/```json\s*/gi, "").replace(/```\s*/g, ""));
            }

            // Save to Cloud History
            try {
                const historyContent = parsed && parsed.hook ? parsed : { script: data.result };
                await saveHistory('youtube-intro-script-generator', {
                    topic,
                    personality,
                    length,
                    structure,
                    result: historyContent
                });
            } catch (error) {
                console.error("Failed to save to cloud history:", error);
            }

        } catch (err) {
            console.error("Generation error:", err);
            setError("Failed to generate script. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const getFullText = () => {
        if (scriptData) {
            return `${scriptData.hook}\n\n${scriptData.context}\n\n${scriptData.promise}\n\n${scriptData.transition}`;
        }
        return rawScript;
    };

    return (
        <ToolPageLayout
            title="YouTube Intro Script Generator"
            description="Create engaging video intros that hook viewers in seconds"
            faq={faq}
            howTo={howTo}
            seoContent={seoContent}
        >
            <div className="space-y-8">
                <UsageBanner type="ai" toolSlug="youtube-intro-script-generator" />
                <LimitReachedModal isOpen={!!limitReachedTool} onClose={closeLimitModal} toolSlug={limitReachedTool} />

                {/* Input Section */}
                <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 md:p-8 shadow-xl border border-gray-100 dark:border-gray-700">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="md:col-span-2">
                            <Input
                                label="Video Topic"
                                placeholder="e.g., How to grow a YouTube channel from 0 to 1000 subscribers"
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                                className="text-lg"
                            />
                        </div>
                        <Select
                            label="Personality"
                            options={personalityOptions}
                            value={personality}
                            onChange={(e) => setPersonality(e.target.value)}
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <Select
                                label="Intro Length"
                                options={lengthOptions}
                                value={length}
                                onChange={(e) => setLength(e.target.value)}
                            />
                            <Select
                                label="Structure"
                                options={structureOptions}
                                value={structure}
                                onChange={(e) => setStructure(e.target.value)}
                            />
                        </div>
                    </div>

                    <Button onClick={handleGenerate} isLoading={loading} disabled={loading} className="w-full py-4 text-lg">
                        {loading ? "Writing Script..." : "Generate Intro Script"}
                    </Button>
                </div>

                {error && (
                    <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400">
                        {error}
                    </div>
                )}

                {/* Results Section */}
                {(scriptData || rawScript) && !loading && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                <FaPlay className="text-purple-500" /> Your Intro Script
                            </h3>
                            <CopyButton text={getFullText()} variant="button" label="Copy Full Script" />
                        </div>

                        {scriptData ? (
                            <div className="space-y-4">
                                <ScriptSection
                                    title="🎬 The Hook (0-3s)"
                                    content={scriptData.hook}
                                    tip="Purpose: Grab attention immediately. Stop the scroll."
                                    color="text-red-600 dark:text-red-400"
                                    bgColor="bg-red-50 dark:bg-red-900/20"
                                />
                                <ScriptSection
                                    title="📍 Context (3-8s)"
                                    content={scriptData.context}
                                    tip="Purpose: Show relevance. 'This is for you if...'"
                                    color="text-blue-600 dark:text-blue-400"
                                    bgColor="bg-blue-50 dark:bg-blue-900/20"
                                />
                                <ScriptSection
                                    title="✨ The Promise (8-15s)"
                                    content={scriptData.promise}
                                    tip="Purpose: High stakes. 'By the end, you will...'"
                                    color="text-purple-600 dark:text-purple-400"
                                    bgColor="bg-purple-50 dark:bg-purple-900/20"
                                />
                                <ScriptSection
                                    title="➡️ Transition (15s+)"
                                    content={scriptData.transition}
                                    tip="Purpose: Smooth handoff. 'Let's dive in.'"
                                    color="text-green-600 dark:text-green-400"
                                    bgColor="bg-green-50 dark:bg-green-900/20"
                                />
                            </div>
                        ) : (
                            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm">
                                <pre className="whitespace-pre-wrap text-gray-800 dark:text-gray-100 font-sans text-lg leading-relaxed">
                                    {rawScript}
                                </pre>
                            </div>
                        )}

                        {/* Validation Reading Tips */}
                        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800 rounded-xl p-6 border border-purple-100 dark:border-gray-700">
                            <h4 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                                <FaMicrophone /> Pro Delivery Tips
                            </h4>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600 dark:text-gray-300">
                                <li>• <strong>Energy Check:</strong> Record yourself. Are you 20% more energetic than usual? You need to be.</li>
                                <li>• <strong>Speed:</strong> Read the Hook fast, then slow down for the Context.</li>
                                <li>• <strong>Eye Contact:</strong> Look at the lens, not the screen!</li>
                                <li>• <strong>No Fluff:</strong> If a word handles no purpose, cut it. The intro must be tight.</li>
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </ToolPageLayout>
    );
}

const ScriptSection = ({ title, content, tip, color, bgColor }: { title: string, content: string, tip: string, color: string, bgColor: string }) => (
    <div className={`rounded-xl p-5 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-md transition-shadow`}>
        <div className="flex flex-col md:flex-row md:items-start gap-4">
            <div className={`shrink-0 rounded-lg px-3 py-1 ${bgColor} ${color} font-bold text-sm uppercase tracking-wider w-fit`}>
                {title}
            </div>
            <div className="flex-1">
                <p className="text-lg text-gray-900 dark:text-white font-medium leading-relaxed">
                    {content}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 italic">
                    {tip}
                </p>
            </div>
        </div>
    </div>
);
