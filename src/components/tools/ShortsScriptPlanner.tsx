"use client";

import { useState } from "react";
import { FaBolt, FaMagic } from "react-icons/fa";
import ToolPageLayout from "@/components/tools/ToolPageLayout";
import Button from "@/components/ui/Button";
import CopyButton from "@/components/ui/CopyButton";
import { Input } from "@/components/ui/Input";
import LimitReachedModal from "@/components/ui/LimitReachedModal";
import UsageBanner from "@/components/ui/UsageBanner";
import { useUsage } from "@/hooks/useUsage";

type Tone = "educational" | "energetic" | "story";

const faq = [
    {
        question: "Does this tool edit or upload a video?",
        answer: "No. It creates a local Shorts script and shot plan. You can record and edit the video in the editor of your choice.",
    },
    {
        question: "Why is the first shot so short?",
        answer: "A concise opening helps viewers understand the topic quickly. Adjust the suggested timing to fit your own delivery style.",
    },
    {
        question: "Is my topic sent to a server?",
        answer: "No. This planner uses local templates in your browser.",
    },
];

const toneCopy: Record<Tone, { hook: string; pace: string; close: string }> = {
    educational: { hook: "Here is the fastest way to understand", pace: "Show one clear example", close: "Save this so you can try it later." },
    energetic: { hook: "Stop scrolling if you want to improve", pace: "Cut quickly between the strongest moments", close: "Try it today and tell me what changed." },
    story: { hook: "I used to struggle with", pace: "Show the turning point", close: "The small change made the biggest difference." },
};

export default function ShortsScriptPlanner() {
    const [topic, setTopic] = useState("make better YouTube thumbnails");
    const [audience, setAudience] = useState("new creators");
    const [tone, setTone] = useState<Tone>("educational");
    const [duration, setDuration] = useState(30);
    const [plan, setPlan] = useState("");
    const { checkLimit, increment, limitReachedTool, closeLimitModal } = useUsage();

    const generatePlan = () => {
        if (!checkLimit("youtube-shorts-script-planner")) return;

        const copy = toneCopy[tone];
        const middleEnd = Math.max(12, duration - 6);
        setPlan(
            [
                `0:00-0:03 Hook: "${copy.hook} ${topic}."`,
                `0:03-0:08 Context: Explain why this matters for ${audience}.`,
                `0:08-0:${String(middleEnd).padStart(2, "0")} Demo: ${copy.pace}. Keep only the most useful steps.`,
                `0:${String(middleEnd).padStart(2, "0")}-0:${String(duration).padStart(2, "0")} CTA: "${copy.close}"`,
                "",
                "Recording checklist:",
                "- Use a vertical 9:16 frame",
                "- Keep on-screen text short and readable",
                "- Use your own footage or properly licensed assets",
                "- Preview the Short without sound before publishing",
            ].join("\n")
        );
        increment("youtube-shorts-script-planner");
    };

    return (
        <ToolPageLayout
            title="YouTube Shorts Script and Shot Planner"
            slug="youtube-shorts-script-planner"
            description="Build a practical YouTube Shorts script, shot timeline, and recording checklist without uploading your footage."
            faq={faq}
        >
            <div className="space-y-6">
                <UsageBanner toolSlug="youtube-shorts-script-planner" />
                <LimitReachedModal isOpen={!!limitReachedTool} onClose={closeLimitModal} toolSlug={limitReachedTool} />

                <div className="grid gap-5 md:grid-cols-2">
                    <Input label="Shorts topic" value={topic} onChange={(event) => setTopic(event.target.value)} />
                    <Input label="Target audience" value={audience} onChange={(event) => setAudience(event.target.value)} />
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                    <label className="block text-sm font-medium text-slate-700">
                        Tone
                        <select
                            value={tone}
                            onChange={(event) => setTone(event.target.value as Tone)}
                            className="mt-2 w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-slate-900 focus:border-purple-500 focus:outline-none"
                        >
                            <option value="educational">Educational</option>
                            <option value="energetic">Energetic</option>
                            <option value="story">Story-led</option>
                        </select>
                    </label>
                    <label className="block text-sm font-medium text-slate-700">
                        Duration
                        <select
                            value={duration}
                            onChange={(event) => setDuration(Number(event.target.value))}
                            className="mt-2 w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-slate-900 focus:border-purple-500 focus:outline-none"
                        >
                            <option value={20}>20 seconds</option>
                            <option value={30}>30 seconds</option>
                            <option value={45}>45 seconds</option>
                            <option value={60}>60 seconds</option>
                        </select>
                    </label>
                </div>

                <Button onClick={generatePlan} disabled={!topic.trim() || !audience.trim()}>
                    <FaMagic className="mr-2" />
                    Build Shot Plan
                </Button>

                {plan && (
                    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                        <div className="mb-4 flex items-center justify-between gap-3">
                            <h2 className="flex items-center gap-2 font-semibold text-slate-900"><FaBolt className="text-yellow-500" /> Shorts plan</h2>
                            <CopyButton text={plan} variant="button" label="Copy plan" />
                        </div>
                        <pre className="whitespace-pre-wrap font-sans text-sm leading-7 text-slate-700">{plan}</pre>
                    </div>
                )}
            </div>
        </ToolPageLayout>
    );
}
