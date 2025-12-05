import { NextRequest, NextResponse } from "next/server";

/**
 * AI Thumbnail Image Generation API
 * 
 * Uses Replicate API with FLUX Schnell for fast, affordable thumbnail generation.
 * Generates 2 images per request so users can pick the best one.
 * 
 * Configure REPLICATE_API_TOKEN in your .env.local file.
 */

// FLUX Schnell - Fast and affordable (~$0.003/image)
const FLUX_SCHNELL_VERSION = "5599ed30703defd1d160a25a63321b4dec97101d98b4674bcc56e41f62f35637";

// Replicate API response type
interface ReplicateResult {
    status: string;
    output?: string[];
    urls: {
        get: string;
    };
    error?: string;
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { prompt, style } = body;

        if (!prompt) {
            return NextResponse.json(
                { error: "Prompt is required" },
                { status: 400 }
            );
        }

        const apiToken = process.env.REPLICATE_API_TOKEN;

        if (!apiToken) {
            console.warn("REPLICATE_API_TOKEN not configured. Returning placeholder.");
            return NextResponse.json({
                success: true,
                images: [
                    `https://placehold.co/1280x720/1a1a2e/ffffff?text=Thumbnail+Option+1`,
                    `https://placehold.co/1280x720/2e1a2e/ffffff?text=Thumbnail+Option+2`
                ],
                message: "Demo mode - Add REPLICATE_API_TOKEN to .env.local for real generation"
            });
        }

        // Build enhanced prompt
        const enhancedPrompt = buildThumbnailPrompt(prompt, style);

        console.log("Generating 2 thumbnails with FLUX Schnell...");

        // Call Replicate API - Generate 2 images
        const startResponse = await fetch("https://api.replicate.com/v1/predictions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiToken}`,
                "Content-Type": "application/json",
                "Prefer": "wait"
            },
            body: JSON.stringify({
                version: FLUX_SCHNELL_VERSION,
                input: {
                    prompt: enhancedPrompt,
                    go_fast: true,
                    num_outputs: 2,  // Generate 2 images
                    aspect_ratio: "16:9",
                    output_format: "webp",
                    output_quality: 90
                }
            }),
        });

        if (!startResponse.ok) {
            const errorText = await startResponse.text();
            console.error("Replicate API error:", errorText);
            throw new Error(`Replicate API error: ${startResponse.status}`);
        }

        const prediction = await startResponse.json() as ReplicateResult;

        // Check if output is ready
        if (prediction.output && prediction.output.length > 0) {
            return NextResponse.json({
                success: true,
                images: prediction.output,
            });
        }

        // Poll for result if not ready
        if (prediction.status === "starting" || prediction.status === "processing") {
            const result = await pollForResult(prediction.urls.get, apiToken);

            if (result.output && result.output.length > 0) {
                return NextResponse.json({
                    success: true,
                    images: result.output,
                });
            }
        }

        throw new Error("Failed to generate images");

    } catch (error) {
        console.error("Image generation error:", error);
        return NextResponse.json(
            { error: "Failed to generate images. Please try again." },
            { status: 500 }
        );
    }
}

/**
 * Poll for prediction result
 */
async function pollForResult(url: string, apiToken: string, maxAttempts = 60): Promise<ReplicateResult> {
    for (let i = 0; i < maxAttempts; i++) {
        await new Promise(resolve => setTimeout(resolve, 1000));

        const response = await fetch(url, {
            headers: {
                "Authorization": `Bearer ${apiToken}`,
            },
        });

        const result = await response.json() as ReplicateResult;

        if (result.status === "succeeded") {
            return result;
        }

        if (result.status === "failed" || result.status === "canceled") {
            throw new Error(result.error || "Prediction failed");
        }
    }

    throw new Error("Prediction timed out");
}

/**
 * Build enhanced prompt for better thumbnail results
 */
function buildThumbnailPrompt(userPrompt: string, style?: string): string {
    const styleEnhancements: Record<string, string> = {
        gaming: "vibrant gaming aesthetic with RGB neon lighting, dynamic energy, esports quality",
        tech: "clean minimalist Apple-style, professional studio lighting, premium tech look",
        vlog: "warm golden hour lifestyle photography, natural authentic candid feel",
        education: "bright professional clean look, trustworthy educational style",
        entertainment: "cinematic dramatic lighting, Hollywood movie poster quality",
        business: "executive professional portrait, Forbes cover style, corporate elegance",
        kids: "bright colorful cheerful Pixar-style, family-friendly fun",
        cooking: "appetizing food photography, warm delicious Bon Appetit style"
    };

    const styleBoost = style && styleEnhancements[style.toLowerCase()]
        ? `, ${styleEnhancements[style.toLowerCase()]}`
        : ", professional YouTube thumbnail quality";

    // Concise but effective prompt for FLUX Schnell
    return `${userPrompt}${styleBoost}. Ultra high resolution photograph, 8K detail, professional DSLR quality, sharp focus, vibrant saturated colors, high contrast, clean composition with blurred background. Photo-realistic, NOT illustrated. Absolutely NO text, NO words, NO letters, NO watermarks in the image.`;
}
