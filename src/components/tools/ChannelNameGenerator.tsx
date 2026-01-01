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
import { FaUser, FaSpinner, FaStar, FaBolt, FaGem, FaRocket, FaTag, FaExternalLinkAlt } from "react-icons/fa";
import { saveHistory } from "@/lib/history";

const toneOptions = [
    { value: "fun", label: "Fun & Playful" },
    { value: "professional", label: "Professional" },
    { value: "luxury", label: "Luxury & Premium" },
    { value: "friendly", label: "Friendly & Approachable" },
    { value: "edgy", label: "Edgy & Bold" },
    { value: "educational", label: "Educational" },
    { value: "creative", label: "Creative & Artistic" },
    { value: "tech", label: "Tech & Modern" },
];

// New Interfaces
interface BrandName {
    name: string;
    vibe: string;
    score: number;
    reason: string;
}

// Map the keys "personalBrand", "creativeCompound" etc. to an array of BrandNames
type ChannelNameResults = Record<string, BrandName[]>;

const categoryInfo = [
    { key: "personalBrand", label: "Twist on Your Name", icon: FaUser, color: "blue", desc: "Builds personal authority" },
    { key: "creativeCompound", label: "Modern Compounds", icon: FaGem, color: "purple", desc: "Short & memorable (TechCrunch style)" },
    { key: "actionBased", label: "Action Verbs", icon: FaBolt, color: "yellow", desc: "Shows what you do (GetFit)" },
    { key: "abstractCool", label: "Abstract & Clean", icon: FaStar, color: "pink", desc: "Nike/Apple style branding" },
    { key: "descriptive", label: "SEO Descriptive", icon: FaTag, color: "green", desc: "Rankable names" },
];

export default function ChannelNameGenerator() {
    const [niche, setNiche] = useState("");
    const [tone, setTone] = useState("fun");
    const [names, setNames] = useState<ChannelNameResults | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const { checkLimit, increment, limitReachedTool, closeLimitModal } = useUsage();

    const handleGenerate = async () => {
        if (!niche.trim()) {
            setError("Please enter your niche or topic");
            return;
        }

        if (!checkLimit("youtube-channel-name-generator")) {
            return;
        }

        setError("");
        setLoading(true);
        setNames(null);

        try {
            const response = await fetch("/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    tool: "channel-name",
                    niche,
                    tone: toneOptions.find(t => t.value === tone)?.label,
                }),
            });

            const data = await response.json();

            if (data.error) {
                setError(data.error);
                return;
            }

            // Success! Increment usage
            increment("youtube-channel-name-generator");

            // Handle both legacy string arrays (fallback) and new object arrays
            // We can safely parse the result, then check the structure
            let parsed: any;
            try {
                const resultStr = data.result.replace(/```json\s*/gi, "").replace(/```\s*/g, "").trim();
                parsed = JSON.parse(resultStr);
            } catch {
                setError("Failed to parse names");
                return;
            }

            // Normalizing data: if it's old string[], convert to mock objects
            const normalized: ChannelNameResults = {};
            Object.keys(parsed).forEach(key => {
                const val = parsed[key];
                if (Array.isArray(val)) {
                    if (typeof val[0] === 'string') {
                        normalized[key] = val.map((s: string) => ({
                            name: s,
                            vibe: "Classic",
                            score: 85,
                            reason: "Standard generated name"
                        }));
                    } else {
                        normalized[key] = val; // It's already the new BrandName[] format
                    }
                }
            });

            setNames(normalized);

            // Save to Cloud History
            try {
                await saveHistory('youtube-channel-name-generator', {
                    niche,
                    tone,
                    result: normalized
                });
            } catch (error) {
                console.error("Failed to save to cloud history:", error);
            }

        } catch (err) {
            console.error("Generation error:", err);
            setError("Failed to generate names. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const getAllNames = () => {
        if (!names) return [];
        return Object.values(names).flat().map(n => n.name);
    };

    const checkAvailability = (name: string) => {
        const cleanName = name.replace(/\s+/g, "").toLowerCase();
        window.open(`https://www.youtube.com/@${cleanName}`, "_blank");
    };

    return (
        <ToolPageLayout
            title="AI Brand Name Consultant"
            slug="youtube-channel-name-generator"
            description="Get 15 assessed channel names. We analyze availability potential, brand vibe, and trust score."
        >
            <div className="space-y-6">
                <UsageBanner type="ai" toolSlug="youtube-channel-name-generator" />
                <LimitReachedModal isOpen={!!limitReachedTool} onClose={closeLimitModal} toolSlug={limitReachedTool} />

                {/* Input Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                        <Input
                            label="Your Niche / Content Topic"
                            placeholder="e.g., Coding for kids, Vegan Meal Prep, Retro Tech"
                            value={niche}
                            onChange={(e) => setNiche(e.target.value)}
                        />
                    </div>
                    <Select
                        label="Brand Personality"
                        options={toneOptions}
                        value={tone}
                        onChange={(e) => setTone(e.target.value)}
                    />
                </div>

                <Button onClick={handleGenerate} isLoading={loading} disabled={loading}>
                    {loading ? (
                        <>
                            <FaSpinner className="mr-2 animate-spin" />
                            Analyzing Brand Options...
                        </>
                    ) : (
                        <>
                            <FaRocket className="mr-2" />
                            Generate Brand Names
                        </>
                    )}
                </Button>

                {error && (
                    <div className="bg-red-50 rounded-lg p-4">
                        <p className="text-emerald-600">{error}</p>
                    </div>
                )}

                {loading && (
                    <div className="bg-slate-50 rounded-xl p-8 text-center animate-pulse">
                        <FaUser className="w-10 h-10 mx-auto text-blue-500 mb-3" />
                        <p className="text-slate-600">Consulting branding engine...</p>
                    </div>
                )}

                {/* Results Section */}
                {names && !loading && (
                    <div className="space-y-8 animate-fade-in">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-xl font-bold text-slate-900">
                                    Your Brand Portfolio
                                </h3>
                                <p className="text-sm text-gray-500">15 curated names across 5 styles</p>
                            </div>
                            <CopyButton
                                text={getAllNames().join("\n")}
                                variant="button"
                                label="Copy Portfolio"
                            />
                        </div>

                        {/* Categorized Names */}
                        <div className="space-y-6">
                            {categoryInfo.map((cat) => {
                                const categoryNames = names[cat.key] || [];
                                if (categoryNames.length === 0) return null;

                                const Icon = cat.icon;
                                const colorClasses: Record<string, string> = {
                                    blue: "from-blue-500 to-cyan-500 bg-blue-50",
                                    purple: "from-purple-500 to-emerald-500 bg-purple-50",
                                    yellow: "from-yellow-500 to-orange-500 bg-yellow-50",
                                    pink: "from-emerald-500 to-rose-500 bg-pink-50",
                                    green: "from-green-500 to-emerald-500 bg-green-50",
                                };

                                return (
                                    <div key={cat.key} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                                        <div className={`px-5 py-3 bg-gradient-to-r ${colorClasses[cat.color]}`}>
                                            <div className="flex items-center gap-2 text-white">
                                                <Icon className="w-5 h-5" />
                                                <span className="font-bold text-lg">{cat.label}</span>
                                                <span className="text-white/80 text-sm hidden sm:inline">— {cat.desc}</span>
                                            </div>
                                        </div>

                                        <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-4">
                                            {categoryNames.map((item, i) => (
                                                <div
                                                    key={i}
                                                    className="group relative bg-slate-50 hover:bg-white hover:shadow-md border border-transparent hover:border-slate-200 rounded-xl p-4 transition-all duration-200"
                                                >
                                                    <div className="flex justify-between items-start mb-2">
                                                        <span className="inline-block px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wide bg-slate-200 text-slate-600">
                                                            {item.vibe}
                                                        </span>
                                                        <span className="text-xs font-bold text-green-500">
                                                            Score: {item.score}
                                                        </span>
                                                    </div>

                                                    <h4 className="text-lg font-bold text-slate-900 mb-1">
                                                        {item.name}
                                                    </h4>
                                                    <p className="text-xs text-slate-500 mb-3 line-clamp-2">
                                                        {item.reason}
                                                    </p>

                                                    <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                                                        <button
                                                            onClick={() => checkAvailability(item.name)}
                                                            className="flex-1 flex items-center justify-center gap-1.5 text-xs font-medium text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-md py-1.5 transition-colors"
                                                        >
                                                            <FaExternalLinkAlt className="w-3 h-3" />
                                                            Check Tube
                                                        </button>
                                                        <CopyButton text={item.name} />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Tips */}
                        <div className="bg-blue-50 rounded-xl p-4">
                            <h4 className="font-medium text-blue-900 mb-2">
                                ✅ Before You Decide
                            </h4>
                            <ul className="text-sm text-blue-700 space-y-1">
                                <li>• Check if @username is available on YouTube, Instagram & Twitter</li>
                                <li>• Say it out loud - is it easy to spell when heard?</li>
                                <li>• Search YouTube to make sure no big channel has a similar name</li>
                                <li>• Consider if it still works if you expand your content later</li>
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </ToolPageLayout>
    );
}
