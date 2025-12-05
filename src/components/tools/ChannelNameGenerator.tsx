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

const faq = [
    {
        question: "What makes a good YouTube channel name?",
        answer: "A good channel name is memorable (say it once, remember forever), easy to spell when heard, available as @handle on socials, and works as your brand grows."
    },
    {
        question: "Should I use my real name?",
        answer: "Personal names work great for personal brands and vlogs. Brand names work better for topic-focused channels where personality matters less than content."
    },
    {
        question: "Can I change my channel name later?",
        answer: "Yes, but it's not recommended. Changing your name confuses subscribers and hurts brand recognition. Choose carefully from the start."
    },
];

const howTo = [
    "Enter your channel's niche or main topic",
    "Select a tone that matches your brand personality",
    "Click 'Generate Names' to get AI suggestions",
    "Browse names by category (Personal, Creative, Action, Abstract, Descriptive)",
    "Check availability on YouTube, Instagram, Twitter before deciding"
];

const seoContent = `Find the perfect YouTube channel name with our AI-powered generator. Get 15 unique, memorable name ideas organized by naming style - from personal brands to creative compounds. Each name is designed to be easy to spell, memorable, and available-friendly for consistent branding across platforms.`;

interface ChannelNames {
    personalBrand?: string[];
    creativeCompound?: string[];
    actionBased?: string[];
    abstractCool?: string[];
    descriptive?: string[];
}

const categoryInfo = [
    { key: "personalBrand", label: "Personal Brand", icon: FaUser, color: "blue", desc: "Your name + niche" },
    { key: "creativeCompound", label: "Creative Compound", icon: FaGem, color: "purple", desc: "Two words merged" },
    { key: "actionBased", label: "Action-Based", icon: FaBolt, color: "yellow", desc: "Verb + topic" },
    { key: "abstractCool", label: "Abstract & Cool", icon: FaStar, color: "pink", desc: "Modern & unique" },
    { key: "descriptive", label: "Descriptive", icon: FaTag, color: "green", desc: "Clear what you do" },
];

export default function ChannelNameGenerator() {
    const [niche, setNiche] = useState("");
    const [tone, setTone] = useState("fun");
    const [names, setNames] = useState<ChannelNames | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const { checkAndIncrementAI, showLimitModal, limitType, closeLimitModal } = useUsage();

    const handleGenerate = async () => {
        if (!niche.trim()) {
            setError("Please enter your niche or topic");
            return;
        }

        if (!checkAndIncrementAI()) {
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
            let resultStr = data.result || "";
            resultStr = resultStr.replace(/```json\s*/gi, "").replace(/```\s*/g, "").trim();

            try {
                const parsed = JSON.parse(resultStr);
                // Support both old array format and new object format
                if (Array.isArray(parsed)) {
                    setNames({ descriptive: parsed });
                } else {
                    setNames(parsed);
                }
            } catch {
                setError("Failed to parse names. Please try again.");
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
        return Object.values(names).flat();
    };

    const checkAvailability = (name: string) => {
        const cleanName = name.replace(/\s+/g, "").toLowerCase();
        window.open(`https://www.youtube.com/@${cleanName}`, "_blank");
    };

    return (
        <ToolPageLayout
            title="YouTube Channel Name Generator"
            description="Get 15 unique channel names organized by naming style"
            faq={faq}
            howTo={howTo}
            seoContent={seoContent}
        >
            <div className="space-y-6">
                <UsageBanner type="ai" />
                <LimitReachedModal isOpen={showLimitModal} onClose={closeLimitModal} type={limitType} />

                {/* Input Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                        <Input
                            label="Your Niche / Topic"
                            placeholder="e.g., Tech reviews, Cooking, Fitness, Gaming, Art tutorials"
                            value={niche}
                            onChange={(e) => setNiche(e.target.value)}
                        />
                    </div>
                    <Select
                        label="Brand Vibe"
                        options={toneOptions}
                        value={tone}
                        onChange={(e) => setTone(e.target.value)}
                    />
                </div>

                <Button onClick={handleGenerate} isLoading={loading} disabled={loading}>
                    {loading ? (
                        <>
                            <FaSpinner className="mr-2 animate-spin" />
                            Generating Names...
                        </>
                    ) : (
                        <>
                            <FaRocket className="mr-2" />
                            Generate Names
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
                        <FaUser className="w-10 h-10 mx-auto text-blue-500 animate-pulse mb-3" />
                        <p className="text-gray-600 dark:text-gray-400">Creating unique channel names...</p>
                    </div>
                )}

                {/* Results Section */}
                {names && !loading && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                                🎬 Channel Name Ideas ({getAllNames().length})
                            </h3>
                            <CopyButton
                                text={getAllNames().join("\n")}
                                variant="button"
                                label="Copy All"
                            />
                        </div>

                        {/* Categorized Names */}
                        <div className="space-y-4">
                            {categoryInfo.map((cat) => {
                                const categoryNames = names[cat.key as keyof ChannelNames] || [];
                                if (categoryNames.length === 0) return null;

                                const Icon = cat.icon;
                                const colorClasses: Record<string, string> = {
                                    blue: "from-blue-500 to-cyan-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
                                    purple: "from-purple-500 to-pink-500 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400",
                                    yellow: "from-yellow-500 to-orange-500 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400",
                                    pink: "from-pink-500 to-rose-500 bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400",
                                    green: "from-green-500 to-emerald-500 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400",
                                };

                                return (
                                    <div key={cat.key} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                                        <div className={`px-4 py-3 bg-gradient-to-r ${colorClasses[cat.color].split(" ")[0]} ${colorClasses[cat.color].split(" ")[1]}`}>
                                            <div className="flex items-center gap-2 text-white">
                                                <Icon className="w-4 h-4" />
                                                <span className="font-medium">{cat.label}</span>
                                                <span className="text-white/70 text-sm">— {cat.desc}</span>
                                            </div>
                                        </div>
                                        <div className="p-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                                            {categoryNames.map((name, i) => (
                                                <div
                                                    key={i}
                                                    className="flex items-center justify-between bg-gray-50 dark:bg-gray-700/50 rounded-lg px-4 py-3"
                                                >
                                                    <span className="font-medium text-gray-900 dark:text-white">
                                                        {name}
                                                    </span>
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            onClick={() => checkAvailability(name)}
                                                            className="text-gray-400 hover:text-blue-500 transition-colors"
                                                            title="Check on YouTube"
                                                        >
                                                            <FaExternalLinkAlt className="w-3 h-3" />
                                                        </button>
                                                        <CopyButton text={name} />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Tips */}
                        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
                            <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                                ✅ Before You Decide
                            </h4>
                            <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
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
