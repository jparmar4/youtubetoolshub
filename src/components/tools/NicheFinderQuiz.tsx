"use client";

import { useState } from "react";
import { FaCompass, FaMagic } from "react-icons/fa";
import ToolPageLayout from "@/components/tools/ToolPageLayout";
import Button from "@/components/ui/Button";
import CopyButton from "@/components/ui/CopyButton";
import LimitReachedModal from "@/components/ui/LimitReachedModal";
import UsageBanner from "@/components/ui/UsageBanner";
import { useUsage } from "@/hooks/useUsage";

type Strength = "teach" | "research" | "entertain" | "review" | "create";
type Format = "long-form" | "shorts" | "mixed";

interface Niche {
    name: string;
    description: string;
    strengths: Strength[];
    formats: Format[];
    starterIdeas: string[];
    note: string;
}

const niches: Niche[] = [
    {
        name: "Practical tech tutorials",
        description: "Help viewers solve specific device, software, and workflow problems.",
        strengths: ["teach", "research", "review"],
        formats: ["long-form", "mixed"],
        starterIdeas: ["Fix a common app problem", "Compare two tools for one task", "Build a beginner setup guide"],
        note: "Use first-hand testing and keep instructions current.",
    },
    {
        name: "Creator education",
        description: "Share repeatable filming, editing, scripting, and channel workflow lessons.",
        strengths: ["teach", "create", "research"],
        formats: ["long-form", "shorts", "mixed"],
        starterIdeas: ["Show a thumbnail workflow", "Explain a scripting habit", "Audit a recording setup"],
        note: "Demonstrate your process instead of promising guaranteed growth.",
    },
    {
        name: "Product reviews and comparisons",
        description: "Help buyers make informed choices with original demonstrations and clear tradeoffs.",
        strengths: ["review", "research", "teach"],
        formats: ["long-form", "mixed"],
        starterIdeas: ["Compare two products fairly", "Test a product after 30 days", "Explain who should skip a purchase"],
        note: "Disclose affiliate relationships and show your own evidence.",
    },
    {
        name: "Skill-building Shorts",
        description: "Teach one useful idea at a time with concise vertical videos.",
        strengths: ["teach", "entertain", "create"],
        formats: ["shorts", "mixed"],
        starterIdeas: ["One shortcut in 30 seconds", "A before-and-after mini lesson", "Three mistakes to avoid"],
        note: "Keep the advice specific and readable on a small screen.",
    },
    {
        name: "Story-led entertainment",
        description: "Use a clear point of view, original footage, and a strong narrative hook.",
        strengths: ["entertain", "create"],
        formats: ["long-form", "shorts", "mixed"],
        starterIdeas: ["Tell a surprising true story", "Document a creative challenge", "Turn a lesson into a narrative"],
        note: "Use footage and music that you own or are licensed to publish.",
    },
    {
        name: "Business and productivity education",
        description: "Explain practical workflows, planning systems, and professional habits.",
        strengths: ["teach", "research", "review"],
        formats: ["long-form", "mixed"],
        starterIdeas: ["Break down a planning system", "Compare productivity workflows", "Show a week-long experiment"],
        note: "Avoid unsupported income claims and label estimates clearly.",
    },
];

const strengths: { id: Strength; label: string }[] = [
    { id: "teach", label: "Teach clearly" },
    { id: "research", label: "Research details" },
    { id: "entertain", label: "Entertain people" },
    { id: "review", label: "Review products" },
    { id: "create", label: "Make visuals" },
];

const faq = [
    {
        question: "Does this quiz guarantee a profitable niche?",
        answer: "No. It suggests a useful starting direction based on your interests and preferred format. Audience demand, originality, execution quality, and consistency still matter.",
    },
    {
        question: "Should I choose the highest-paying niche?",
        answer: "Choose a niche where you can provide accurate, first-hand, useful content. A topic with advertiser demand is not a shortcut if the content lacks expertise or audience value.",
    },
    {
        question: "Does the quiz collect my answers?",
        answer: "No. The recommendations are calculated locally in your browser.",
    },
];

export default function NicheFinderQuiz() {
    const [selectedStrengths, setSelectedStrengths] = useState<Strength[]>(["teach"]);
    const [format, setFormat] = useState<Format>("mixed");
    const [results, setResults] = useState<Niche[]>([]);
    const { checkLimit, increment, limitReachedTool, closeLimitModal } = useUsage();

    const toggleStrength = (strength: Strength) => {
        setSelectedStrengths((current) =>
            current.includes(strength) ? current.filter((item) => item !== strength) : [...current, strength]
        );
    };

    const findNiches = () => {
        if (!checkLimit("youtube-niche-finder-quiz")) return;

        const ranked = [...niches]
            .map((niche) => ({
                niche,
                score: niche.strengths.filter((strength) => selectedStrengths.includes(strength)).length * 3 + (niche.formats.includes(format) ? 2 : 0),
            }))
            .sort((a, b) => b.score - a.score)
            .slice(0, 3)
            .map(({ niche }) => niche);

        setResults(ranked);
        increment("youtube-niche-finder-quiz");
    };

    const summary = results
        .map((niche, index) => `${index + 1}. ${niche.name}\n${niche.description}\nStarter ideas: ${niche.starterIdeas.join("; ")}\nNote: ${niche.note}`)
        .join("\n\n");

    return (
        <ToolPageLayout
            title="YouTube Niche Finder Quiz"
            slug="youtube-niche-finder-quiz"
            description="Find a practical YouTube niche direction based on your strengths and preferred video format. Recommendations are calculated locally."
            faq={faq}
        >
            <div className="space-y-8">
                <UsageBanner toolSlug="youtube-niche-finder-quiz" />
                <LimitReachedModal isOpen={!!limitReachedTool} onClose={closeLimitModal} toolSlug={limitReachedTool} />

                <div>
                    <h2 className="mb-3 text-lg font-bold text-slate-900">What are your strongest creator skills?</h2>
                    <div className="flex flex-wrap gap-3">
                        {strengths.map((strength) => {
                            const selected = selectedStrengths.includes(strength.id);
                            return (
                                <button
                                    key={strength.id}
                                    type="button"
                                    aria-pressed={selected}
                                    onClick={() => toggleStrength(strength.id)}
                                    className={`rounded-lg border px-4 py-3 text-sm font-semibold transition-colors ${selected ? "border-purple-600 bg-purple-50 text-purple-800" : "border-slate-200 bg-white text-slate-600 hover:border-slate-400"}`}
                                >
                                    {strength.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <label className="block text-sm font-medium text-slate-700">
                    Preferred format
                    <select
                        value={format}
                        onChange={(event) => setFormat(event.target.value as Format)}
                        className="mt-2 w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-slate-900 focus:border-purple-500 focus:outline-none"
                    >
                        <option value="mixed">Mix Shorts and long-form videos</option>
                        <option value="long-form">Focus on long-form videos</option>
                        <option value="shorts">Focus on Shorts</option>
                    </select>
                </label>

                <Button onClick={findNiches} disabled={selectedStrengths.length === 0}>
                    <FaMagic className="mr-2" />
                    Find Niche Ideas
                </Button>

                {results.length > 0 && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between gap-3">
                            <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900"><FaCompass className="text-purple-600" /> Your starting directions</h2>
                            <CopyButton text={summary} variant="button" label="Copy ideas" />
                        </div>
                        {results.map((niche, index) => (
                            <div key={niche.name} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                                <div className="mb-2 text-sm font-bold text-purple-700">Option {index + 1}</div>
                                <h3 className="text-lg font-bold text-slate-900">{niche.name}</h3>
                                <p className="mt-2 text-slate-600">{niche.description}</p>
                                <ul className="mt-4 space-y-2 text-sm text-slate-700">
                                    {niche.starterIdeas.map((idea) => <li key={idea}>- {idea}</li>)}
                                </ul>
                                <p className="mt-4 border-t border-slate-100 pt-3 text-sm text-slate-500">{niche.note}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </ToolPageLayout>
    );
}
