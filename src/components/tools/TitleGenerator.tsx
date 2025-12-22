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
import { FaMagic } from "react-icons/fa";

const toneOptions = [
    { value: "casual", label: "Casual & Friendly" },
    { value: "professional", label: "Professional" },
    { value: "educational", label: "Educational" },
    { value: "entertaining", label: "Entertaining & Fun" },
    { value: "dramatic", label: "Dramatic & Bold" },
    { value: "curiosity", label: "Curiosity-Driven" },
    { value: "storytelling", label: "Storytelling" },
    { value: "controversial", label: "Hot Take / Controversial" },
];

// All major world languages
const languageOptions = [
    // Top 10 most spoken
    { value: "english", label: "🇺🇸 English" },
    { value: "spanish", label: "🇪🇸 Spanish (Español)" },
    { value: "mandarin", label: "🇨🇳 Chinese (中文)" },
    { value: "hindi", label: "🇮🇳 Hindi (हिन्दी)" },
    { value: "arabic", label: "🇸🇦 Arabic (العربية)" },
    { value: "portuguese", label: "🇧🇷 Portuguese (Português)" },
    { value: "bengali", label: "🇧🇩 Bengali (বাংলা)" },
    { value: "russian", label: "🇷🇺 Russian (Русский)" },
    { value: "japanese", label: "🇯🇵 Japanese (日本語)" },
    { value: "french", label: "🇫🇷 French (Français)" },
    // European
    { value: "german", label: "🇩🇪 German (Deutsch)" },
    { value: "italian", label: "🇮🇹 Italian (Italiano)" },
    { value: "dutch", label: "🇳🇱 Dutch (Nederlands)" },
    { value: "polish", label: "🇵🇱 Polish (Polski)" },
    { value: "turkish", label: "🇹🇷 Turkish (Türkçe)" },
    { value: "greek", label: "🇬🇷 Greek (Ελληνικά)" },
    { value: "swedish", label: "🇸🇪 Swedish (Svenska)" },
    { value: "norwegian", label: "🇳🇴 Norwegian (Norsk)" },
    { value: "danish", label: "🇩🇰 Danish (Dansk)" },
    { value: "finnish", label: "🇫🇮 Finnish (Suomi)" },
    { value: "czech", label: "🇨🇿 Czech (Čeština)" },
    { value: "romanian", label: "🇷🇴 Romanian (Română)" },
    { value: "hungarian", label: "🇭🇺 Hungarian (Magyar)" },
    { value: "ukrainian", label: "🇺🇦 Ukrainian (Українська)" },
    // Asian
    { value: "korean", label: "🇰🇷 Korean (한국어)" },
    { value: "thai", label: "🇹🇭 Thai (ไทย)" },
    { value: "vietnamese", label: "🇻🇳 Vietnamese (Tiếng Việt)" },
    { value: "indonesian", label: "🇮🇩 Indonesian (Bahasa)" },
    { value: "malay", label: "🇲🇾 Malay (Bahasa Melayu)" },
    { value: "tagalog", label: "🇵🇭 Filipino (Tagalog)" },
    { value: "tamil", label: "🇮🇳 Tamil (தமிழ்)" },
    { value: "telugu", label: "🇮🇳 Telugu (తెలుగు)" },
    { value: "marathi", label: "🇮🇳 Marathi (मराठी)" },
    { value: "urdu", label: "🇵🇰 Urdu (اردو)" },
    // Middle East & Africa
    { value: "persian", label: "🇮🇷 Persian (فارسی)" },
    { value: "hebrew", label: "🇮🇱 Hebrew (עברית)" },
    { value: "swahili", label: "🇰🇪 Swahili (Kiswahili)" },
];

const faq = [
    {
        question: "What makes a good YouTube title?",
        answer: "A good YouTube title is clear, engaging, and contains relevant keywords. It should accurately represent your content while creating curiosity. Aim for 50-60 characters for optimal display in search results."
    },
    {
        question: "Should I use clickbait titles?",
        answer: "While clickbait can increase clicks, it can hurt your channel long-term if the content doesn't deliver. Use curiosity-inducing titles that accurately represent your content for the best results."
    },
    {
        question: "How important are keywords in titles?",
        answer: "Keywords are crucial for YouTube SEO. Place your main keyword near the beginning of the title when possible, but make sure the title still sounds natural and appealing to viewers."
    },
    {
        question: "Can I use emojis in my title?",
        answer: "Yes, emojis can help your title stand out and convey emotion. However, use them sparingly and ensure they're relevant to your content."
    },
];

const howTo = [
    "Enter your video topic or a brief description of your content",
    "Select a tone that matches your video style and audience",
    "Choose your preferred language",
    "Click 'Generate Titles' to get AI-suggested titles",
    "Review the titles and copy the ones you like",
    "Optionally use 'Copy All' to save all suggestions"
];

const seoContent = `Generate engaging, SEO-optimized YouTube titles with our AI-powered Title Generator. Our tool analyzes successful video titles and creates click-worthy suggestions tailored to your content. Whether you're creating educational content, vlogs, or entertainment videos, get titles that drive views and improve your channel's searchability.`;

export default function TitleGenerator() {
    const [topic, setTopic] = useState("");
    const [tone, setTone] = useState("normal");
    const [language, setLanguage] = useState("english");
    const [titles, setTitles] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Usage tracking
    const { checkLimit, increment, limitReachedTool, closeLimitModal } = useUsage();

    const handleGenerate = async () => {
        if (!topic.trim()) {
            setError("Please enter a video topic");
            return;
        }

        // Check usage limit before generating
        if (!checkLimit("youtube-title-generator")) {
            return; // Modal will show automatically
        }

        setError("");
        setLoading(true);
        setTitles([]); // Clear previous results

        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

            const response = await fetch("/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    tool: "title-generator",
                    topic,
                    tone: toneOptions.find(t => t.value === tone)?.label,
                    language: languageOptions.find(l => l.value === language)?.label,
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
            increment("youtube-title-generator");

            // Handle the result - strip markdown and parse
            let resultStr = data.result || "";
            resultStr = resultStr.replace(/```json\s*/gi, "").replace(/```\s*/g, "").trim();

            try {
                const parsed = JSON.parse(resultStr);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    setTitles(parsed);
                } else {
                    setError("No titles generated. Please try again.");
                }
            } catch {
                // If not JSON, try to split by newlines
                const lines = resultStr.split("\n")
                    .map((line: string) => line.replace(/^\d+\.\s*/, "").replace(/^[-*]\s*/, "").trim())
                    .filter((line: string) => line.length > 0);
                if (lines.length > 0) {
                    setTitles(lines);
                } else {
                    setError("Failed to parse titles. Please try again.");
                }
            }
        } catch (err) {
            if (err instanceof Error && err.name === "AbortError") {
                setError("Request timed out. Please try again.");
            } else {
                console.error("Generation error:", err);
                setError("Failed to generate titles. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    const allTitlesText = titles.join("\n");

    return (
        <ToolPageLayout
            title="YouTube Title Generator"
            description="Generate SEO-optimized, click-worthy titles for your YouTube videos using AI"
            faq={faq}
            howTo={howTo}
            seoContent={seoContent}
        >
            <div className="space-y-6">
                {/* Usage Banner */}
                <UsageBanner type="ai" toolSlug="youtube-title-generator" />

                {/* Limit Reached Modal */}
                <LimitReachedModal
                    isOpen={!!limitReachedTool}
                    onClose={closeLimitModal}
                    toolSlug={limitReachedTool}
                />

                {/* Input Section */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="md:col-span-2">
                        <Input
                            label="Video Topic or Description"
                            placeholder="e.g., How to start a YouTube channel in 2025"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                        />
                    </div>
                    <Select
                        label="Tone"
                        options={toneOptions}
                        value={tone}
                        onChange={(e) => setTone(e.target.value)}
                    />
                    <Select
                        label="Language"
                        options={languageOptions}
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                    />
                </div>

                <Button onClick={handleGenerate} isLoading={loading} disabled={loading}>
                    <FaMagic className="mr-2" />
                    {loading ? "Generating..." : "Generate Titles"}
                </Button>

                {/* Error Display */}
                {error && (
                    <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4">
                        <p className="text-red-600 dark:text-red-400">{error}</p>
                    </div>
                )}

                {/* Loading State */}
                {loading && (
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-8 text-center">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center animate-pulse">
                            <FaMagic className="w-8 h-8 text-white" />
                        </div>
                        <p className="text-gray-600 dark:text-gray-400">
                            Generating 10 SEO-optimized titles...
                        </p>
                    </div>
                )}

                {/* Results Section */}
                {titles.length > 0 && !loading && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Generated Titles
                            </h3>
                            <CopyButton text={allTitlesText} variant="button" label="Copy All" />
                        </div>
                        <div className="space-y-3">
                            {titles.map((title, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 group hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                >
                                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 flex items-center justify-center font-bold text-sm">
                                        {i + 1}
                                    </span>
                                    <p className="flex-1 text-gray-900 dark:text-white font-medium">
                                        {title}
                                    </p>
                                    <CopyButton text={title} />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </ToolPageLayout>
    );
}
