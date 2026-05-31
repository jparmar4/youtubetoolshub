"use client";

import { useMemo, useState } from "react";
import { FaClock, FaMagic } from "react-icons/fa";
import ToolPageLayout from "@/components/tools/ToolPageLayout";
import Button from "@/components/ui/Button";
import CopyButton from "@/components/ui/CopyButton";
import { Input, Textarea } from "@/components/ui/Input";
import LimitReachedModal from "@/components/ui/LimitReachedModal";
import UsageBanner from "@/components/ui/UsageBanner";
import { useUsage } from "@/hooks/useUsage";

const faq = [
    {
        question: "What format should YouTube timestamps use?",
        answer: "Start each chapter on a new line with a time such as 00:00 followed by a descriptive title. YouTube chapters work best when the first timestamp starts at 00:00.",
    },
    {
        question: "Can I paste timestamps I already drafted?",
        answer: "Yes. Lines that already begin with a timestamp are preserved. Lines without timestamps receive evenly spaced times based on your interval.",
    },
    {
        question: "Does this tool upload my text?",
        answer: "No. Timestamp formatting happens in your browser.",
    },
];

const timestampPattern = /^((?:\d{1,2}:)?\d{1,2}:\d{2})\s+(.+)$/;

function formatSeconds(totalSeconds: number) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return hours > 0
        ? `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
        : `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export default function TimestampGenerator() {
    const [chapters, setChapters] = useState("Intro\nMain idea\nStep-by-step walkthrough\nCommon mistakes\nFinal tips");
    const [intervalMinutes, setIntervalMinutes] = useState(2);
    const [output, setOutput] = useState("");
    const { checkLimit, increment, limitReachedTool, closeLimitModal } = useUsage();

    const chapterCount = useMemo(() => chapters.split("\n").filter((line) => line.trim()).length, [chapters]);

    const generate = () => {
        if (!checkLimit("youtube-timestamp-generator")) return;

        const intervalSeconds = Math.max(1, intervalMinutes) * 60;
        const result = chapters
            .split("\n")
            .map((line) => line.trim())
            .filter(Boolean)
            .map((line, index) => {
                const existing = line.match(timestampPattern);
                return existing ? `${existing[1]} ${existing[2]}` : `${formatSeconds(index * intervalSeconds)} ${line}`;
            })
            .join("\n");

        setOutput(result);
        increment("youtube-timestamp-generator");
    };

    return (
        <ToolPageLayout
            title="YouTube Timestamp Generator"
            slug="youtube-timestamp-generator"
            description="Turn a chapter outline into clean YouTube timestamps for your video description. Formatting runs locally in your browser."
            faq={faq}
        >
            <div className="space-y-6">
                <UsageBanner toolSlug="youtube-timestamp-generator" />
                <LimitReachedModal isOpen={!!limitReachedTool} onClose={closeLimitModal} toolSlug={limitReachedTool} />

                <div className="grid gap-6 md:grid-cols-[1fr_180px]">
                    <Textarea
                        label="Chapter titles"
                        value={chapters}
                        onChange={(event) => setChapters(event.target.value)}
                        helperText="Enter one chapter title per line. Existing timestamps are preserved."
                        className="min-h-[220px]"
                    />
                    <Input
                        label="Default interval (minutes)"
                        type="number"
                        min={1}
                        max={120}
                        value={intervalMinutes}
                        onChange={(event) => setIntervalMinutes(Number(event.target.value) || 1)}
                    />
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <Button onClick={generate}>
                        <FaMagic className="mr-2" />
                        Generate Timestamps
                    </Button>
                    <span className="inline-flex items-center gap-2 text-sm text-slate-500">
                        <FaClock />
                        {chapterCount} chapter{chapterCount === 1 ? "" : "s"}
                    </span>
                </div>

                {output && (
                    <div className="rounded-lg border border-slate-200 bg-slate-950 p-5 text-white">
                        <div className="mb-4 flex items-center justify-between gap-3">
                            <h2 className="font-semibold">Description-ready chapters</h2>
                            <CopyButton text={output} variant="button" label="Copy timestamps" />
                        </div>
                        <pre className="whitespace-pre-wrap font-mono text-sm leading-7 text-slate-100">{output}</pre>
                    </div>
                )}
            </div>
        </ToolPageLayout>
    );
}
