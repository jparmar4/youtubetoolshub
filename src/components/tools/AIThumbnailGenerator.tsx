"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Select from "@/components/ui/Select";
import ToolPageLayout from "@/components/tools/ToolPageLayout";
import UsageBanner from "@/components/ui/UsageBanner";
import LimitReachedModal from "@/components/ui/LimitReachedModal";
import { useUsage } from "@/hooks/useUsage";
import { FaMagic, FaDownload, FaSpinner, FaImage } from "react-icons/fa";

const styleOptions = [
    { value: "gaming", label: "Gaming" },
    { value: "tech", label: "Tech / Reviews" },
    { value: "vlog", label: "Vlog / Lifestyle" },
    { value: "education", label: "Education" },
    { value: "entertainment", label: "Entertainment" },
    { value: "business", label: "Business" },
    { value: "kids", label: "Kids / Family" },
    { value: "cooking", label: "Cooking / Food" },
];

const faq = [
    {
        question: "How does AI thumbnail generation work?",
        answer: "Our tool uses advanced AI (FLUX model) to generate unique thumbnail images based on your text description. Simply describe what you want, select a style, and the AI creates custom images."
    },
    {
        question: "Why do I get 2 images?",
        answer: "We generate 2 variations for each prompt so you can choose the one that best fits your video. Each image is slightly different, giving you more options."
    },
    {
        question: "What resolution are the thumbnails?",
        answer: "Thumbnails are generated at 1280x720 pixels (16:9 aspect ratio), the recommended size for YouTube thumbnails."
    },
    {
        question: "Can I use these thumbnails commercially?",
        answer: "Yes! AI-generated thumbnails can be used for your YouTube videos. However, always ensure the content doesn't infringe on any copyrights or trademarks."
    },
];

const howTo = [
    "Describe the thumbnail you want in detail (e.g., 'person looking shocked at laptop screen')",
    "Select a style that matches your video content",
    "Click 'Generate Thumbnails' to create 2 AI images",
    "Wait a few seconds for the AI to generate your thumbnails",
    "Compare both options and download the one you like best"
];

const seoContent = `Create stunning YouTube thumbnails with AI in seconds. Our AI Thumbnail Generator uses advanced FLUX technology to transform your text descriptions into eye-catching thumbnail images. Get 2 variations per prompt so you can choose the best one. Perfect for gaming, tech, vlogs, education, and more.`;

const examplePrompts = [
    "Person with surprised face looking at phone, bright yellow background",
    "Mysterious hooded figure in dark forest with glowing eyes",
    "Delicious pizza with steam rising, rustic wooden table",
    "Futuristic gaming setup with RGB lights and multiple monitors",
    "Happy family cooking together in modern kitchen",
];

export default function AIThumbnailGenerator() {
    const [prompt, setPrompt] = useState("");
    const [style, setStyle] = useState("entertainment");
    const [loading, setLoading] = useState(false);
    const [generatedImages, setGeneratedImages] = useState<string[]>([]);
    const [error, setError] = useState("");

    const { checkAndIncrement, limitReachedTool, closeLimitModal } = useUsage();

    const handleGenerate = async () => {
        if (!prompt.trim()) {
            setError("Please enter a description for your thumbnail");
            return;
        }

        if (!checkAndIncrement("youtube-ai-thumbnail-generator")) {
            return;
        }

        setError("");
        setLoading(true);
        setGeneratedImages([]);

        try {
            const response = await fetch("/api/generate-image", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    prompt,
                    style,
                }),
            });
            // ... (rest of function)
        } catch (err) {
            console.error("Generation error:", err);
            setError("Failed to generate thumbnails. Please try again.");
        } finally {
            setLoading(false);
        }
    };
    const handleDownload = async (imageUrl: string, index: number) => {
        try {
            const proxyUrl = `/api/download-image?url=${encodeURIComponent(imageUrl)}`;
            const response = await fetch(proxyUrl);

            if (!response.ok) {
                throw new Error("Failed to fetch image");
            }

            const contentDisposition = response.headers.get("Content-Disposition");
            let filename = `youtube-thumbnail-${index + 1}-${Date.now()}.webp`;

            if (contentDisposition) {
                const match = contentDisposition.match(/filename="(.+?)"/);
                if (match && match[1]) {
                    filename = match[1];
                }
            }

            const blob = await response.blob();
            const blobUrl = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = blobUrl;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(blobUrl);
            document.body.removeChild(a);
        } catch (error) {
            console.error("Download error:", error);
            alert("Failed to download. Please try again.");
        }
    };
    // ... (existing functions)

    return (
        <ToolPageLayout
            title="AI YouTube Thumbnail Generator"
            description="Generate 2 stunning thumbnail options with AI - pick the best one"
            faq={faq}
            howTo={howTo}
            seoContent={seoContent}
        >
            <div className="space-y-6">
                <UsageBanner type="image" />
                <LimitReachedModal isOpen={!!limitReachedTool} onClose={closeLimitModal} toolSlug={limitReachedTool} />

                {/* Input Section */}
                <div className="space-y-4">
                    <Input
                        label="Describe Your Thumbnail"
                        placeholder="e.g., Person looking shocked at laptop screen with vibrant colors"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        error={error}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Select
                            label="Thumbnail Style"
                            options={styleOptions}
                            value={style}
                            onChange={(e) => setStyle(e.target.value)}
                        />
                        <div className="flex items-end">
                            <Button
                                onClick={handleGenerate}
                                isLoading={loading}
                                disabled={loading}
                                className="w-full"
                            >
                                {loading ? (
                                    <>
                                        <FaSpinner className="mr-2 animate-spin" />
                                        Generating 2 Options...
                                    </>
                                ) : (
                                    <>
                                        <FaMagic className="mr-2" />
                                        Generate Thumbnails
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Example Prompts */}
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                        💡 Try these example prompts:
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {examplePrompts.map((example, i) => (
                            <button
                                key={i}
                                onClick={() => setPrompt(example)}
                                className="text-xs px-3 py-1.5 bg-white dark:bg-gray-700 rounded-full border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-red-500 hover:text-red-500 transition-colors"
                            >
                                {example.length > 40 ? example.substring(0, 40) + "..." : example}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-12 text-center">
                        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center animate-pulse">
                            <FaImage className="w-10 h-10 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            Creating 2 Thumbnail Options...
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            This usually takes 10-15 seconds
                        </p>
                    </div>
                )}

                {/* Generated Images - Side by Side */}
                {generatedImages.length > 0 && !loading && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Choose Your Thumbnail
                            </h3>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                {generatedImages.length} options generated
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {generatedImages.map((imageUrl, index) => (
                                <div key={index} className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-4 space-y-3">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Option {index + 1}
                                        </span>
                                        <span className="text-xs px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full">
                                            AI Generated
                                        </span>
                                    </div>
                                    <div className="aspect-video rounded-xl overflow-hidden bg-gray-200 dark:bg-gray-700">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={imageUrl}
                                            alt={`Generated thumbnail option ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <Button
                                        onClick={() => handleDownload(imageUrl, index)}
                                        className="w-full"
                                        variant={index === 0 ? "primary" : "secondary"}
                                    >
                                        <FaDownload className="mr-2" />
                                        Download Option {index + 1}
                                    </Button>
                                </div>
                            ))}
                        </div>

                        {/* Generate More Button */}
                        <div className="text-center">
                            <Button variant="secondary" onClick={handleGenerate}>
                                <FaMagic className="mr-2" />
                                Generate 2 More Options
                            </Button>
                        </div>

                        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
                            <p className="text-sm text-blue-700 dark:text-blue-300">
                                💡 <strong>Tip:</strong> Add text overlays to your thumbnail using image editing
                                software or try our <strong>Thumbnail Text Generator</strong> tool for catchy text ideas!
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </ToolPageLayout>
    );
}
