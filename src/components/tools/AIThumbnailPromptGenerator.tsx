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
import { FaMagic, FaRocket, FaLightbulb, FaStar } from "react-icons/fa";

// Comprehensive options for prompt generation
const nicheOptions = [
    { value: "gaming", label: "🎮 Gaming" },
    { value: "tech", label: "💻 Tech & Reviews" },
    { value: "education", label: "📚 Education" },
    { value: "vlog", label: "📷 Vlog & Lifestyle" },
    { value: "cooking", label: "🍳 Cooking & Food" },
    { value: "fitness", label: "💪 Fitness & Health" },
    { value: "finance", label: "💰 Finance & Business" },
    { value: "entertainment", label: "🎬 Entertainment" },
    { value: "music", label: "🎵 Music" },
    { value: "beauty", label: "💄 Beauty & Fashion" },
    { value: "travel", label: "✈️ Travel" },
    { value: "diy", label: "🔧 DIY & Crafts" },
];

const subjectOptions = [
    { value: "person-reaction", label: "Person with Reaction Face" },
    { value: "person-action", label: "Person Doing Action" },
    { value: "product-focus", label: "Product/Object Focus" },
    { value: "scene", label: "Scene/Environment" },
    { value: "comparison", label: "Before/After or VS" },
    { value: "abstract", label: "Abstract/Conceptual" },
    { value: "text-heavy", label: "Text-Focused Design" },
    { value: "collage", label: "Multi-Element Collage" },
];

const moodOptions = [
    { value: "excited", label: "😆 Excited & Energetic" },
    { value: "shocked", label: "😱 Shocked & Surprised" },
    { value: "curious", label: "🤔 Curious & Intriguing" },
    { value: "professional", label: "💼 Professional & Trust" },
    { value: "fun", label: "🎉 Fun & Playful" },
    { value: "dramatic", label: "🎭 Dramatic & Intense" },
    { value: "calm", label: "😌 Calm & Peaceful" },
    { value: "urgent", label: "⚡ Urgent & FOMO" },
];

const colorSchemeOptions = [
    { value: "vibrant", label: "🌈 Vibrant & Bold" },
    { value: "neon", label: "💜 Neon & Cyberpunk" },
    { value: "warm", label: "🔥 Warm (Red/Orange/Yellow)" },
    { value: "cool", label: "❄️ Cool (Blue/Purple/Teal)" },
    { value: "minimal", label: "⚪ Minimal & Clean" },
    { value: "dark", label: "🖤 Dark & Moody" },
    { value: "pastel", label: "🌸 Soft & Pastel" },
    { value: "gold", label: "✨ Luxury Gold/Black" },
];

const compositionOptions = [
    { value: "centered", label: "Centered Focus" },
    { value: "rule-of-thirds", label: "Rule of Thirds" },
    { value: "diagonal", label: "Dynamic Diagonal" },
    { value: "split", label: "Split Screen" },
    { value: "close-up", label: "Extreme Close-up" },
    { value: "wide", label: "Wide/Panoramic" },
];

const faq = [
    {
        question: "What makes a great AI thumbnail prompt?",
        answer: "A great prompt is specific, descriptive, and includes details about subject, mood, colors, lighting, and style. Our tool combines all these elements into prompts optimized for AI image generators."
    },
    {
        question: "Can I use these prompts with any AI generator?",
        answer: "Yes! These prompts work with DALL-E, Midjourney, Stable Diffusion, FLUX, and our built-in AI Thumbnail Generator. They're designed to be universally effective."
    },
    {
        question: "How do I get the best results?",
        answer: "Be specific about your video topic, choose options that match your content style, and experiment with different combinations. The more details you provide, the better the results."
    },
    {
        question: "Why generate prompts instead of direct images?",
        answer: "Prompts give you full control. You can tweak them, combine elements, and use them across different AI tools. It's the professional approach to AI-generated content."
    },
];

const howTo = [
    "Enter your video title or topic for context",
    "Select your content niche for style optimization",
    "Choose the main subject type for your thumbnail",
    "Pick the mood and emotion you want to convey",
    "Select a color scheme that fits your brand",
    "Choose a composition style",
    "Click 'Generate Prompts' to get optimized AI prompts",
    "Copy any prompt and use it with your favorite AI image generator",
];

const seoContent = `Create professional AI prompts for stunning YouTube thumbnails. Our advanced AI Thumbnail Prompt Generator analyzes your video topic, niche, and preferences to create optimized prompts for AI image generators like DALL-E, Midjourney, and Stable Diffusion. Get click-worthy thumbnails with prompts engineered for maximum visual impact.`;

const quickPromptTemplates = [
    {
        label: "Viral Reaction",
        prompt: `Photorealistic YouTube thumbnail, [TOPIC], person with shocked surprised expression looking at camera, mouth open, eyes wide, vibrant lighting, ultra HD, professional photography, trending on YouTube, 1280x720`
    },
    {
        label: "Professional Expert",
        prompt: `Professional YouTube thumbnail, [TOPIC], confident expert presenter in modern studio, clean minimalist background, soft professional lighting, high-end production quality, trustworthy appealing look, 8K detailed, 1280x720`
    },
    {
        label: "Dramatic Impact",
        prompt: `Cinematic YouTube thumbnail, [TOPIC], dramatic movie poster style, high contrast lighting with rim light, dynamic composition, Hollywood quality, intense mood, volumetric lighting, 1280x720`
    },
];

export default function AIThumbnailPromptGenerator() {
    const [videoTopic, setVideoTopic] = useState("");
    const [niche, setNiche] = useState("tech");
    const [subject, setSubject] = useState("person-reaction");
    const [mood, setMood] = useState("excited");
    const [colorScheme, setColorScheme] = useState("vibrant");
    const [composition, setComposition] = useState("rule-of-thirds");
    const [loading, setLoading] = useState(false);
    const [generatedPrompts, setGeneratedPrompts] = useState<string[]>([]);
    const [error, setError] = useState("");

    const { checkLimit, increment, limitReachedTool, closeLimitModal } = useUsage();

    const handleGenerate = async () => {
        if (!videoTopic.trim()) {
            setError("Please enter your video topic");
            return;
        }

        if (!checkLimit("youtube-ai-thumbnail-prompt")) {
            return;
        }

        setError("");
        setLoading(true);
        setGeneratedPrompts([]);

        try {
            const response = await fetch("/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    tool: "thumbnail-prompt",
                    videoTopic,
                    niche: nicheOptions.find(n => n.value === niche)?.label,
                    subject: subjectOptions.find(s => s.value === subject)?.label,
                    mood: moodOptions.find(m => m.value === mood)?.label,
                    colorScheme: colorSchemeOptions.find(c => c.value === colorScheme)?.label,
                    composition: compositionOptions.find(c => c.value === composition)?.label,
                }),
            });

            const data = await response.json();

            if (!response.ok || data.error) {
                throw new Error(data.error || "Failed to generate prompts");
            }

            // Success! Increment usage
            increment("youtube-ai-thumbnail-prompt");

            let result = data.result;
            // specific cleanup for potential markdown
            result = result.replace(/```json\s*/gi, "").replace(/```\s*/g, "").trim();

            try {
                const parsed = JSON.parse(result);
                if (Array.isArray(parsed)) {
                    setGeneratedPrompts(parsed);
                } else {
                    throw new Error("Invalid format");
                }
            } catch (e) {
                console.error("Parse error", e);
                // Fallback if it's just text
                setGeneratedPrompts([result]);
            }
        } catch (err) {
            console.error("Generation error:", err);
            setError("Failed to generate prompts. Please try again.");
        } finally {
            setLoading(false);
        }
    };
    // ... (existing functions)

    return (
        <ToolPageLayout
            title="AI Thumbnail Prompt Generator"
            description="Generate optimized prompts for AI thumbnail creation - works with any AI image generator"
            faq={faq}
            howTo={howTo}
            seoContent={seoContent}
        >
            <div className="space-y-8">
                <UsageBanner type="ai" toolSlug="youtube-ai-thumbnail-prompt" />
                <LimitReachedModal isOpen={!!limitReachedTool} onClose={closeLimitModal} toolSlug={limitReachedTool} />

                {/* Hero Input Section */}
                <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 rounded-2xl p-[2px]">
                    <div className="bg-white dark:bg-gray-900 rounded-2xl p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <FaRocket className="text-purple-500 text-xl" />
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                Describe Your Video
                            </h3>
                        </div>
                        <Input
                            placeholder="e.g., How I Made $10,000 in One Week with AI, 10 iPhone Tricks You Didn't Know, My Morning Routine..."
                            value={videoTopic}
                            onChange={(e) => setVideoTopic(e.target.value)}
                            error={error}
                        />
                    </div>
                </div>

                {/* Options Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Select
                        label="Content Niche"
                        options={nicheOptions}
                        value={niche}
                        onChange={(e) => setNiche(e.target.value)}
                    />
                    <Select
                        label="Main Subject"
                        options={subjectOptions}
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                    />
                    <Select
                        label="Mood & Emotion"
                        options={moodOptions}
                        value={mood}
                        onChange={(e) => setMood(e.target.value)}
                    />
                    <Select
                        label="Color Scheme"
                        options={colorSchemeOptions}
                        value={colorScheme}
                        onChange={(e) => setColorScheme(e.target.value)}
                    />
                    <Select
                        label="Composition"
                        options={compositionOptions}
                        value={composition}
                        onChange={(e) => setComposition(e.target.value)}
                    />
                    <div className="flex items-end">
                        <Button
                            onClick={handleGenerate}
                            isLoading={loading}
                            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                        >
                            <FaMagic className="mr-2" />
                            Generate AI Prompts
                        </Button>
                    </div>
                </div>

                {/* Quick Templates */}
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <FaLightbulb className="text-yellow-500" />
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                            Quick Prompt Templates
                        </h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {quickPromptTemplates.map((template, i) => (
                            <div
                                key={i}
                                className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 hover:border-purple-500 transition-colors"
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <span className="font-medium text-gray-900 dark:text-white text-sm">
                                        {template.label}
                                    </span>
                                    <CopyButton text={template.prompt} variant="icon" />
                                </div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-3">
                                    {template.prompt}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="flex flex-col items-center justify-center py-12">
                        <div className="relative">
                            <div className="w-20 h-20 rounded-full border-4 border-purple-200 dark:border-purple-900"></div>
                            <div className="absolute top-0 left-0 w-20 h-20 rounded-full border-4 border-purple-600 border-t-transparent animate-spin"></div>
                        </div>
                        <p className="mt-4 text-gray-600 dark:text-gray-400 font-medium">
                            Crafting perfect prompts...
                        </p>
                    </div>
                )}

                {/* Generated Prompts */}
                {generatedPrompts.length > 0 && !loading && (
                    <div className="space-y-6">
                        <div className="flex items-center gap-2">
                            <FaStar className="text-yellow-500" />
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                Your AI-Optimized Prompts
                            </h3>
                        </div>

                        <div className="space-y-4">
                            {generatedPrompts.map((prompt, i) => (
                                <div
                                    key={i}
                                    className="group bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-800/50 rounded-xl p-5 border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-all"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs font-medium px-2 py-1 rounded-full">
                                                    Prompt {i + 1}
                                                </span>
                                                {i === 0 && (
                                                    <span className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 text-xs font-medium px-2 py-1 rounded-full">
                                                        ⭐ Recommended
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                                                {prompt}
                                            </p>
                                        </div>
                                        <div className="flex-shrink-0">
                                            <CopyButton text={prompt} variant="button" label="Copy" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Usage Tips */}
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6">
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                                💡 Pro Tips for Best Results
                            </h4>
                            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-500 font-bold">1.</span>
                                    Use these prompts with our <strong>AI Thumbnail Generator</strong> for instant results
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-500 font-bold">2.</span>
                                    Add <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded text-xs">--no text</code> in Midjourney to avoid text on thumbnails
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-500 font-bold">3.</span>
                                    Combine multiple prompts or mix elements for unique results
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-500 font-bold">4.</span>
                                    Generate 3-5 variations and A/B test to find what works best
                                </li>
                            </ul>
                        </div>
                    </div>
                )}

                {/* Empty State */}
                {!loading && generatedPrompts.length === 0 && (
                    <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/30 rounded-2xl">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                            <FaMagic className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            Ready to Create Perfect Prompts
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                            Enter your video topic and customize the options above to generate
                            AI-optimized prompts for stunning thumbnails.
                        </p>
                    </div>
                )}
            </div>
        </ToolPageLayout>
    );
}
