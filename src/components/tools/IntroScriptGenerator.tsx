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
import { FaMicrophone, FaSpinner, FaPlay } from "react-icons/fa";

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

export default function IntroScriptGenerator() {
    const [topic, setTopic] = useState("");
    const [personality, setPersonality] = useState("energetic");
    const [length, setLength] = useState("10-15 seconds");
    const [script, setScript] = useState("");
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
        setScript(""); // Changed from setScripts([]) as `script` is a string state

        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 30000);

            const response = await fetch("/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    tool: "intro-generator",
                    topic,
                    tone: personalityOptions.find(p => p.value === personality)?.label, // Changed from personality to tone
                    hookType: "standard", // Added hookType, assuming a default value as it's not in the UI
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
            increment("youtube-intro-generator");

            // Clean up any JSON or code blocks
            let result = data.result || "";
            result = result.replace(/```json\s*/gi, "").replace(/```\s*/g, "").trim();

            // If it's JSON, try to extract text
            if (result.startsWith("{") || result.startsWith("[")) {
                try {
                    const parsed = JSON.parse(result);
                    // Try to get the script from various possible keys
                    result = parsed.script || parsed.intro || parsed.text ||
                        parsed.hook + "\n\n" + parsed.context + "\n\n" + parsed.promise + "\n\n" + parsed.transition ||
                        JSON.stringify(parsed, null, 2);
                } catch {
                    // Keep original if parsing fails
                }
            }

            setScript(result);
        } catch (err) {
            console.error("Generation error:", err);
            setError("Failed to generate script. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Clean script for copying (remove emojis and section headers if desired)
    const getCleanScript = () => {
        return script
            .replace(/🎬|📍|✨|➡️/g, "")
            .replace(/---/g, "")
            .replace(/\([\d-]+ seconds?\)/gi, "")
            .replace(/HOOK|CONTEXT|PROMISE|TRANSITION/gi, "")
            .split("\n")
            .map(line => line.trim())
            .filter(line => line)
            .join("\n\n");
    };

    return (
        <ToolPageLayout
            title="YouTube Intro Script Generator"
            description="Create engaging video intros that hook viewers in seconds"
            faq={faq}
            howTo={howTo}
            seoContent={seoContent}
        >
            <div className="space-y-6">
                <UsageBanner type="ai" toolSlug="youtube-intro-script-generator" />
                <LimitReachedModal isOpen={!!limitReachedTool} onClose={closeLimitModal} toolSlug={limitReachedTool} />
                {/* Input Section */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="md:col-span-2">
                        <Input
                            label="Video Topic"
                            placeholder="e.g., How to grow a YouTube channel from 0 to 1000 subscribers"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                        />
                    </div>
                    <Select
                        label="Personality"
                        options={personalityOptions}
                        value={personality}
                        onChange={(e) => setPersonality(e.target.value)}
                    />
                    <Select
                        label="Intro Length"
                        options={lengthOptions}
                        value={length}
                        onChange={(e) => setLength(e.target.value)}
                    />
                </div>

                <Button onClick={handleGenerate} isLoading={loading} disabled={loading}>
                    {loading ? (
                        <>
                            <FaSpinner className="mr-2 animate-spin" />
                            Writing Script...
                        </>
                    ) : (
                        <>
                            <FaMicrophone className="mr-2" />
                            Generate Script
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
                        <FaMicrophone className="w-10 h-10 mx-auto text-purple-500 animate-pulse mb-3" />
                        <p className="text-gray-600 dark:text-gray-400">Writing your intro script...</p>
                    </div>
                )}

                {/* Results Section */}
                {script && !loading && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                                <FaPlay className="text-purple-500" />
                                Your Intro Script
                            </h3>
                            <div className="flex gap-2">
                                <CopyButton text={getCleanScript()} variant="button" label="Copy Clean" />
                                <CopyButton text={script} variant="button" label="Copy All" />
                            </div>
                        </div>

                        {/* Script Display */}
                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm">
                            <pre className="whitespace-pre-wrap text-gray-800 dark:text-gray-100 font-sans text-lg leading-relaxed">
                                {script}
                            </pre>
                        </div>

                        {/* Reading Tips */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4">
                                <h4 className="font-medium text-purple-900 dark:text-purple-100 mb-2">
                                    🎤 Delivery Tips
                                </h4>
                                <ul className="text-sm text-purple-700 dark:text-purple-300 space-y-1">
                                    <li>• Practice reading out loud 3-5 times</li>
                                    <li>• Vary your tone - don&apos;t be monotone</li>
                                    <li>• Smile while speaking (it shows in your voice)</li>
                                    <li>• Pause after the hook for impact</li>
                                </ul>
                            </div>
                            <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4">
                                <h4 className="font-medium text-green-900 dark:text-green-100 mb-2">
                                    ⏱️ Timing Check
                                </h4>
                                <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                                    <li>• Time yourself reading the script</li>
                                    <li>• Should take ~{length.split(" ")[0]} seconds</li>
                                    <li>• Cut words if it&apos;s too long</li>
                                    <li>• Natural pauses count toward time</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </ToolPageLayout>
    );
}
