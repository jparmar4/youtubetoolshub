"use client";

import { useState } from "react";
import Link from "next/link";
import { FaExternalLinkAlt, FaLink, FaLock, FaPlayCircle, FaUserCheck } from "react-icons/fa";
import ToolPageLayout from "@/components/tools/ToolPageLayout";
import Button from "@/components/ui/Button";
import LimitReachedModal from "@/components/ui/LimitReachedModal";
import UsageBanner from "@/components/ui/UsageBanner";
import { useUsage } from "@/hooks/useUsage";

type Intent = "own-video" | "offline" | "reuse" | "share";

const options: Record<Intent, {
    title: string;
    summary: string;
    steps: string[];
    href: string;
    linkLabel: string;
}> = {
    "own-video": {
        title: "Download your own upload from YouTube Studio",
        summary: "For a video you uploaded, use the download option in YouTube Studio. This keeps the workflow inside your creator account.",
        steps: ["Open YouTube Studio", "Choose Content", "Open the video's options menu", "Select Download"],
        href: "https://studio.youtube.com/",
        linkLabel: "Open YouTube Studio",
    },
    offline: {
        title: "Use YouTube's official offline viewing options",
        summary: "For offline watching, use the YouTube app's official download feature where it is available. Availability depends on location, device, and plan.",
        steps: ["Open the video in the YouTube app", "Look for the Download button", "Choose a quality option", "Watch it from Downloads in the app"],
        href: "https://support.google.com/youtube/answer/11977233?hl=en",
        linkLabel: "Read YouTube offline viewing help",
    },
    reuse: {
        title: "Get permission before reusing someone else's video",
        summary: "A public video is not automatically free to republish. Ask the rights holder for permission or use content with a license that supports your intended use.",
        steps: ["Identify the rights holder", "Explain where and how you want to reuse the video", "Get written permission or confirm the license", "Credit the creator when the license requires it"],
        href: "https://support.google.com/youtube/answer/2797466?hl=en",
        linkLabel: "Read YouTube copyright basics",
    },
    share: {
        title: "Share or embed the original YouTube video",
        summary: "If your goal is to show a video to your audience, link to the original upload or use YouTube's standard embed option.",
        steps: ["Open the video on YouTube", "Choose Share", "Copy the link or choose Embed", "Publish the original YouTube link or player"],
        href: "https://support.google.com/youtube/answer/171780?hl=en",
        linkLabel: "Read YouTube embed help",
    },
};

const intentButtons: { id: Intent; icon: React.ReactNode; label: string; description: string }[] = [
    { id: "own-video", icon: <FaUserCheck />, label: "My own upload", description: "Download a video you uploaded" },
    { id: "offline", icon: <FaPlayCircle />, label: "Offline viewing", description: "Watch a video later in the YouTube app" },
    { id: "reuse", icon: <FaLock />, label: "Reuse a video", description: "Use someone else's clip in a project" },
    { id: "share", icon: <FaLink />, label: "Share or embed", description: "Show the original video elsewhere" },
];

const faq = [
    {
        question: "Why does this page not extract video files?",
        answer: "YouTube's API developer policies prohibit tools from downloading, caching, or storing copies of YouTube audiovisual content without prior written approval from YouTube.",
    },
    {
        question: "Can I download my own upload?",
        answer: "Yes. Use the download option in YouTube Studio for videos that you uploaded to your own channel.",
    },
    {
        question: "Can I share a YouTube video on my website?",
        answer: "Use the original YouTube link or the standard YouTube embed player. This preserves attribution and the normal YouTube viewing experience.",
    },
];

export default function VideoDownloadOptionsGuide() {
    const [intent, setIntent] = useState<Intent>("own-video");
    const [revealedIntent, setRevealedIntent] = useState<Intent | null>(null);
    const { checkLimit, increment, limitReachedTool, closeLimitModal } = useUsage();
    const selected = revealedIntent ? options[revealedIntent] : null;

    const revealOption = () => {
        if (!checkLimit("youtube-video-download-options")) return;
        setRevealedIntent(intent);
        increment("youtube-video-download-options");
    };

    return (
        <ToolPageLayout
            title="YouTube Video Download Options Guide"
            slug="youtube-video-download-options"
            description="Choose your goal and get a policy-safe YouTube option. This guide does not fetch, extract, or store video files."
            faq={faq}
        >
            <div className="space-y-8">
                <UsageBanner toolSlug="youtube-video-download-options" />
                <LimitReachedModal isOpen={!!limitReachedTool} onClose={closeLimitModal} toolSlug={limitReachedTool} />

                <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-amber-950">
                    This tool is an official-options guide. It does not download YouTube audiovisual content or bypass YouTube controls.
                </div>

                <div>
                    <h2 className="mb-4 text-lg font-bold text-slate-900">What do you want to do?</h2>
                    <div className="grid gap-3 sm:grid-cols-2">
                        {intentButtons.map((button) => (
                            <button
                                key={button.id}
                                type="button"
                                aria-pressed={intent === button.id}
                                onClick={() => setIntent(button.id)}
                                className={`rounded-lg border p-4 text-left transition-colors ${intent === button.id ? "border-red-500 bg-red-50" : "border-slate-200 bg-white hover:border-slate-400"}`}
                            >
                                <span className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-700">{button.icon}</span>
                                <span className="block font-semibold text-slate-900">{button.label}</span>
                                <span className="mt-1 block text-sm text-slate-500">{button.description}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <Button onClick={revealOption}>Show Official Option</Button>

                {selected && (
                    <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                        <h2 className="text-xl font-bold text-slate-900">{selected.title}</h2>
                        <p className="mt-3 leading-relaxed text-slate-600">{selected.summary}</p>
                        <ol className="mt-5 space-y-3">
                            {selected.steps.map((step, index) => (
                                <li key={step} className="flex gap-3 text-slate-700">
                                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-100 text-sm font-bold text-red-700">{index + 1}</span>
                                    <span className="pt-0.5">{step}</span>
                                </li>
                            ))}
                        </ol>
                        <Link
                            href={selected.href}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-3 font-semibold text-white hover:bg-slate-700"
                        >
                            {selected.linkLabel}
                            <FaExternalLinkAlt className="text-xs" />
                        </Link>
                    </div>
                )}
            </div>
        </ToolPageLayout>
    );
}
