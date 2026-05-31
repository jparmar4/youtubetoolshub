"use client";

import { useState } from "react";
import { FaBookmark, FaCheckCircle, FaClipboardCheck, FaShareAlt } from "react-icons/fa";
import HorizontalAd from "@/components/ads/HorizontalAd";
import ShareModal from "@/components/ui/ShareModal";
import { saveItem } from "@/lib/dashboard";
import { saveHistory } from "@/lib/history";
import { siteConfig } from "@/config/site";

interface ChecklistItem {
    id: string;
    title: string;
    description: string;
    points: number;
}

const checklist: ChecklistItem[] = [
    { id: "channel-promise", title: "Clear channel promise", description: "A new viewer can understand your topic and audience from your channel page.", points: 15 },
    { id: "thumbnail-system", title: "Readable thumbnail system", description: "Recent thumbnails stay legible on mobile and use a consistent visual approach.", points: 20 },
    { id: "title-quality", title: "Specific video titles", description: "Titles describe a useful outcome, question, comparison, or story without misleading viewers.", points: 20 },
    { id: "publishing-rhythm", title: "Sustainable publishing rhythm", description: "Your current schedule is realistic enough to maintain without reducing quality.", points: 15 },
    { id: "retention-review", title: "Regular retention review", description: "You review audience retention and use the drop-off points to improve future videos.", points: 15 },
    { id: "comment-learning", title: "Audience feedback loop", description: "You use comments and viewer questions to choose or refine future topics.", points: 15 },
];

function getSummary(score: number) {
    if (score >= 85) return "Your fundamentals look strong. Pick one experiment for your next three uploads and compare the result in YouTube Studio.";
    if (score >= 60) return "You have a useful base. Focus on the unchecked items before adding more publishing volume.";
    return "Start with packaging and a clear audience promise. A smaller, repeatable workflow will make later improvements easier to measure.";
}

export default function ChannelAudit() {
    const [channelLabel, setChannelLabel] = useState("");
    const [selected, setSelected] = useState<string[]>([]);
    const [score, setScore] = useState<number | null>(null);
    const [saved, setSaved] = useState(false);
    const [showShareModal, setShowShareModal] = useState(false);

    const toggleItem = (id: string) => {
        setSelected((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
        setScore(null);
        setSaved(false);
    };

    const runAudit = async () => {
        const nextScore = checklist
            .filter((item) => selected.includes(item.id))
            .reduce((total, item) => total + item.points, 0);

        setScore(nextScore);
        setSaved(false);

        try {
            await saveHistory("youtube-channel-audit", {
                channelLabel: channelLabel.trim(),
                score: nextScore,
                completedItems: selected,
            });
        } catch (error) {
            console.error("Failed to save audit history:", error);
        }
    };

    const recommendations = checklist.filter((item) => !selected.includes(item.id));
    const shareText = score === null
        ? ""
        : `I completed a YouTube channel workflow self-audit and scored ${score}/100. Review your creator workflow with this free checklist.`;

    const handleSave = () => {
        if (score === null) return;
        saveItem({
            type: "audit",
            toolSlug: "youtube-channel-audit",
            content: {
                score,
                summary: getSummary(score),
            },
        });
        setSaved(true);
    };

    return (
        <div className="mx-auto w-full max-w-4xl space-y-8">
            <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-6 text-center">
                    <h1 className="text-3xl font-bold text-slate-900">YouTube Channel Audit Checklist</h1>
                    <p className="mx-auto mt-3 max-w-2xl text-slate-600">
                        Review your creator workflow with an honest self-assessment. This tool does not scan YouTube, access private analytics, or generate a hidden algorithm score.
                    </p>
                </div>

                <label className="block text-sm font-medium text-slate-700">
                    Channel name or handle <span className="text-slate-400">(optional)</span>
                    <input
                        value={channelLabel}
                        onChange={(event) => setChannelLabel(event.target.value)}
                        placeholder="@yourchannel"
                        className="mt-2 w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                    />
                </label>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                {checklist.map((item) => {
                    const checked = selected.includes(item.id);
                    return (
                        <label key={item.id} className={`cursor-pointer rounded-lg border p-5 transition-colors ${checked ? "border-green-500 bg-green-50" : "border-slate-200 bg-white hover:border-slate-400"}`}>
                            <span className="flex gap-3">
                                <input
                                    type="checkbox"
                                    checked={checked}
                                    onChange={() => toggleItem(item.id)}
                                    className="mt-1 h-4 w-4 accent-green-600"
                                />
                                <span>
                                    <span className="block font-bold text-slate-900">{item.title}</span>
                                    <span className="mt-1 block text-sm leading-relaxed text-slate-600">{item.description}</span>
                                </span>
                            </span>
                        </label>
                    );
                })}
            </div>

            <div className="flex justify-center">
                <button
                    type="button"
                    onClick={runAudit}
                    className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-6 py-3 font-bold text-white transition-colors hover:bg-slate-700"
                >
                    <FaClipboardCheck />
                    Review Checklist
                </button>
            </div>

            <HorizontalAd />

            {score !== null && (
                <div className="space-y-5 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <div className="text-sm font-bold uppercase text-slate-500">Self-assessment score</div>
                            <div className="mt-1 text-5xl font-black text-slate-900">{score}<span className="text-xl text-slate-400">/100</span></div>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            <button
                                type="button"
                                onClick={handleSave}
                                disabled={saved}
                                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-60"
                            >
                                {saved ? <FaCheckCircle className="text-green-600" /> : <FaBookmark />}
                                {saved ? "Saved" : "Save"}
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowShareModal(true)}
                                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 font-semibold text-slate-700 hover:bg-slate-50"
                            >
                                <FaShareAlt />
                                Share
                            </button>
                        </div>
                    </div>

                    <p className="leading-relaxed text-slate-700">{getSummary(score)}</p>

                    {recommendations.length > 0 ? (
                        <div>
                            <h2 className="mb-3 font-bold text-slate-900">Next improvements</h2>
                            <ul className="space-y-3">
                                {recommendations.slice(0, 3).map((item) => (
                                    <li key={item.id} className="rounded-lg bg-slate-50 p-4 text-sm text-slate-700">
                                        <strong>{item.title}:</strong> {item.description}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <p className="rounded-lg bg-green-50 p-4 text-sm text-green-800">All checklist items are covered. Choose one measurable experiment for your next upload batch.</p>
                    )}
                </div>
            )}

            <ShareModal
                isOpen={showShareModal}
                onClose={() => setShowShareModal(false)}
                title="YouTube Channel Workflow Self-Audit"
                text={shareText}
                url={`${siteConfig.url}/tools/youtube-channel-audit`}
            />
        </div>
    );
}
