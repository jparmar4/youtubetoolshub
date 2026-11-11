"use client";

import { useState, Suspense } from "react";
import { Input, Textarea } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Select from "@/components/ui/Select";
import CopyButton from "@/components/ui/CopyButton";
import PresetPills from "@/components/ui/PresetPills";
import ToolEmptyState from "@/components/ui/ToolEmptyState";
import ErrorNotice from "@/components/ui/ErrorNotice";
import ToolPageLayout from "@/components/tools/ToolPageLayout";
import UsageBanner from "@/components/ui/UsageBanner";
import LimitReachedModal from "@/components/ui/LimitReachedModal";
import { useUsage } from "@/hooks/useUsage";
import { FaMagic, FaYoutube, FaPen, FaEye, FaAlignLeft, FaHashtag, FaImage } from "react-icons/fa";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { saveHistory } from "@/lib/history";

const videoTypeOptions = [
    { value: "tutorial", label: "Tutorial / How-To" },
    { value: "vlog", label: "Vlog / Lifestyle" },
    { value: "review", label: "Product Review" },
    { value: "gaming", label: "Gaming / Let's Play" },
    { value: "education", label: "Educational / Deep Dive" },
    { value: "story", label: "Storytime / Commentary" },
    { value: "business", label: "Business / Professional" },
];

const toneOptions = [
    { value: "casual", label: "Casual & Friendly (Best for Vlogs)" },
    { value: "excited", label: "High Energy / Hype (Best for Gaming)" },
    { value: "professional", label: "Professional & Clean (Best for Business)" },
    { value: "funny", label: "Humorous & Witty (Best for Entertainment)" },
    { value: "educational", label: "Clear & Concise (Best for Tutorials)" },
];

const descriptionPresets = [
    {
        label: "💻 Tutorial",
        topic: "How to Build and Deploy Full-Stack Next.js 16 Apps in 2026",
        videoType: "tutorial",
        tone: "educational",
        keywords: "Next.js, React, Full Stack, Web Development",
    },
    {
        label: "📷 Review",
        topic: "Sony A7 IV Review: 1 Year Later (Is It Still Worth It?)",
        videoType: "review",
        tone: "professional",
        keywords: "Sony A7 IV, Camera Review, Filmmaking gear",
    },
    {
        label: "✈️ Vlog",
        topic: "48 Hours in Tokyo: Hidden Street Food & Secret Markets",
        videoType: "vlog",
        tone: "casual",
        keywords: "Tokyo travel, Japan street food, Travel vlog",
    },
    {
        label: "🎮 Gaming",
        topic: "Defeating the Hardest Boss in Elden Ring Without Taking Damage",
        videoType: "gaming",
        tone: "excited",
        keywords: "Elden Ring, Boss fight, Gaming guide, No hit run",
    },
];

export default function DescriptionGenerator() {
    return (
        <ToolPageLayout
            title="Optimized Description Generator"
            slug="youtube-description-generator"
            description="Create SEO-ready, human-sounding descriptions that get clicks."
        >
            <Suspense fallback={<div className="min-h-[400px] flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500" /></div>}>
                <DescriptionGeneratorContent />
            </Suspense>
        </ToolPageLayout>
    );
}

function DescriptionGeneratorContent() {
    const searchParams = useSearchParams();
    const [topic, setTopic] = useState(searchParams.get("topic") || "");
    const [videoType, setVideoType] = useState("tutorial");
    const [tone, setTone] = useState("casual");
    const [keywords, setKeywords] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [activePreset, setActivePreset] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<"preview" | "edit">("preview");

    const { checkLimit, increment, limitReachedTool, closeLimitModal } = useUsage();

    // Legacy save logic could be added here if needed, but description tool didn't have save button before
    const saveToHistory = async (desc: string) => {
        try {
            await saveHistory('youtube-description-generator', {
                topic,
                videoType,
                tone,
                keywords,
                description: desc
            });
        } catch (error) {
            console.error("Failed to save to cloud history:", error);
        }
    };

    const handleGenerate = async () => {
        if (!topic.trim()) {
            setError("Please enter a video topic");
            return;
        }

        if (!checkLimit("youtube-description-generator")) {
            return;
        }

        setError("");
        setLoading(true);
        setDescription("");

        try {
            const response = await fetch("/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    tool: "description-generator",
                    topic,
                    videoType: videoTypeOptions.find(t => t.value === videoType)?.label,
                    tone: toneOptions.find(t => t.value === tone)?.label,
                    keywords,
                }),
            });

            const data = await response.json();

            if (data.error) {
                setError(data.error);
                return;
            }

            increment("youtube-description-generator");
            const formattedDescription = formatDescriptionFromJSON(data.result);
            setDescription(formattedDescription);

            // Save to history
            saveToHistory(formattedDescription);

            setViewMode("preview");
        } catch (err) {
            console.error("Generation error:", err);
            setError("Failed to generate description. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8">
            <UsageBanner type="ai" toolSlug="youtube-description-generator" />
            <LimitReachedModal isOpen={!!limitReachedTool} onClose={closeLimitModal} toolSlug={limitReachedTool} />

            {/* Input Section */}
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="col-span-1 md:col-span-2">
                        {/* Quick Presets Pills */}
                        <div className="mb-3">
                            <PresetPills
                                options={descriptionPresets.map((preset, i) => ({
                                    id: `preset-${i}`,
                                    label: preset.label.replace(/^\S+\s/, ""),
                                    icon: preset.label.match(/^\S+/)?.[0],
                                }))}
                                activeId={activePreset}
                                onSelect={(id) => {
                                    const preset = descriptionPresets[Number(id.replace("preset-", ""))];
                                    if (!preset) return;
                                    setActivePreset(id);
                                    setTopic(preset.topic);
                                    setVideoType(preset.videoType);
                                    setTone(preset.tone);
                                    setKeywords(preset.keywords);
                                }}
                            />
                        </div>
                        <Input
                            label="Video Topic / Summary"
                            placeholder="e.g., How to edit videos faster in Premiere Pro"
                            value={topic}
                            onChange={(e) => {
                                setTopic(e.target.value);
                                setActivePreset(null);
                            }}
                            className="text-lg"
                        />
                    </div>

                    <div className="space-y-4">
                        <Select
                            label="Video Category"
                            options={videoTypeOptions}
                            value={videoType}
                            onChange={(e) => setVideoType(e.target.value)}
                            icon={<FaYoutube />}
                        />
                        <Select
                            label="Tone of Voice"
                            options={toneOptions}
                            value={tone}
                            onChange={(e) => setTone(e.target.value)}
                            icon={<FaAlignLeft />}
                        />
                    </div>

                    <div className="space-y-4">
                        <Input
                            label="Keywords to Target (Optional)"
                            placeholder="e.g., video editing, premiere pro hacks"
                            value={keywords}
                            onChange={(e) => setKeywords(e.target.value)}
                        />
                    </div>
                </div>

                <Button onClick={handleGenerate} isLoading={loading} disabled={loading} className="w-full py-4 text-lg">
                    <FaMagic className="mr-2" />
                    {loading ? "Writing Description..." : "Generate Description"}
                </Button>

            </div>

            {error && <ErrorNotice message={error} onRetry={() => setError("")} />}

            {loading && (
                <div
                    className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 text-center"
                    role="status"
                    aria-live="polite"
                >
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center animate-pulse">
                        <FaMagic className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-gray-600">
                        Writing a human-sounding description optimized for SEO...
                    </p>
                </div>
            )}

            {/* Empty state before first run */}
            {!loading && !error && !description && (
                <ToolEmptyState
                    title="Your SEO description will appear here"
                    description="Enter a video topic above or tap a quick preset — the generated description includes timestamps, key takeaways and hashtags ready to paste into YouTube."
                />
            )}

            {/* Results Section */}
            {description && !loading && (
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                            <FaAlignLeft className="text-blue-500" /> Result
                        </h3>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setViewMode("preview")}
                                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${viewMode === "preview"
                                    ?"bg-gray-100 text-gray-900"
                                    :"text-gray-500 hover:text-gray-900"
                                    }`}
                            >
                                <FaEye /> Preview
                            </button>
                            <button
                                onClick={() => setViewMode("edit")}
                                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${viewMode === "edit"
                                    ?"bg-gray-100 text-gray-900"
                                    :"text-gray-500 hover:text-gray-900"
                                    }`}
                            >
                                <FaPen /> Edit
                            </button>
                            <Link
                                href={`/tools/youtube-ai-thumbnail-prompt?topic=${encodeURIComponent(topic)}`}
                                className="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 text-emerald-600 hover:bg-pink-50"
                            >
                                <FaImage /> Thumbnail
                            </Link>
                            <CopyButton text={description} variant="button" label="Copy" />
                        </div>
                    </div>

                    {viewMode === "preview" ? (
                        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                            <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 flex items-center gap-2">
                                <FaYoutube className="text-emerald-500" />
                                <span className="text-xs font-bold text-gray-500 uppercase">YouTube Player View</span>
                            </div>
                            <div className="p-6">
                                <div className="space-y-2">
                                    <div className="h-6 w-3/4 bg-gray-100 rounded mb-4"></div>
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                                        <div className="space-y-1">
                                            <div className="h-3 w-32 bg-gray-100 rounded"></div>
                                            <div className="h-3 w-20 bg-gray-100 rounded"></div>
                                        </div>
                                    </div>

                                    <div className="bg-gray-100 p-4 rounded-xl text-sm leading-relaxed text-gray-800 whitespace-pre-wrap font-sans">
                                        {description}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200">
                            <Textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={15}
                                className="border-0 focus:ring-0 p-6 font-mono text-sm leading-relaxed text-gray-800"
                            />
                        </div>
                    )}

                    <div className="bg-green-50 rounded-xl p-4 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                            <FaHashtag className="text-green-600 text-sm"/>
                        </div>
                        <p className="text-sm text-green-700">
                            <strong>Pro Tip:</strong> Paste this into your default upload settings on YouTube if you use a consistent template!
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

function formatDescriptionFromJSON(jsonResult: string | Record<string, unknown>): string {
    try {
        const content = jsonResult;

        // If it's already an object, use it directly
        if (typeof content !== 'string') {
            const typedContent = content as { description?: unknown; result?: string };

            // Handle the specific structured output from our AI prompt
            if (typedContent.description && typeof typedContent.description === 'object' && !Array.isArray(typedContent.description)) {
                const d = typedContent.description as Record<string, unknown>;
                return [
                    getString(d.hook),
                    "",
                    getString(d.video_summary),
                    "",
                    "TIMESTAMPS:",
                    Array.isArray(d.timestamps) ? d.timestamps.join('\n') : String(d.timestamps || ''),
                    "",
                    "KEY TAKEAWAYS:",
                    Array.isArray(d.key_points) ? d.key_points.join('\n') : String(d.key_points || ''),
                    "",
                    getString(d.resources_links),
                    "",
                    getString(d.call_to_action),
                    "",
                    getString(d.hashtags)
                ].filter(Boolean).join('\n');
            }

            return getString(typedContent.description) || typedContent.result || JSON.stringify(content, null, 2);
        }

        // Check if it's a JSON string
        if (content.trim().startsWith('{') || content.trim().startsWith('[')) {
            try {
                // Clean markdown code blocks if present
                const cleaned = content.replace(/```json\s*|\s*```/g, '').trim();
                const parsed = JSON.parse(cleaned);

                // Recursively call for the parsed object to handle the logic above
                if (typeof parsed === 'object' && parsed !== null) {
                    return formatDescriptionFromJSON(parsed);
                }

                return String(parsed);
            } catch {
                // If parse fails, return content as is (might be raw text)
                return content;
            }
        }

        // If it's just a string, return it clean of markdown code blocks
        return content.replace(/```json\s*|\s*```/g, '').trim();
    } catch (e) {
        console.error("Error formatting description:", e);
        return typeof jsonResult === 'string' ? jsonResult : String(jsonResult);
    }
}

function getString(value: unknown): string {
    return typeof value === "string" ? value : String(value || "");
}
