import { NextResponse } from "next/server";
import { generateAIText, prompts } from "@/lib/ai";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { tool, ...params } = body;

        let prompt: string;

        // Build prompt based on tool type
        switch (tool) {
            case "title-generator":
                prompt = prompts.titleGenerator(
                    params.topic,
                    params.tone || "Normal",
                    params.language || "English"
                );
                break;

            case "description-generator":
                prompt = prompts.descriptionGenerator(
                    params.topic,
                    params.videoType || "Tutorial",
                    params.includeCTA ?? true
                );
                break;

            case "tag-generator":
                prompt = prompts.tagGenerator(params.topic, params.niche);
                break;

            case "video-ideas":
                prompt = prompts.videoIdeasGenerator(
                    params.niche,
                    params.level || "Beginner"
                );
                break;

            case "trend-helper":
                prompt = prompts.trendHelper(
                    params.topic,
                    params.region || "Global"
                );
                break;

            case "calendar-generator":
                prompt = prompts.calendarGenerator(
                    params.niche,
                    params.frequency || "Weekly",
                    params.days || 30
                );
                break;

            case "thumbnail-text":
                prompt = prompts.thumbnailTextGenerator(
                    params.topic,
                    params.style || "Bold & Colorful",
                    params.emotion || "Excited"
                );
                break;

            case "channel-name":
                prompt = prompts.channelNameGenerator(
                    params.niche,
                    params.tone || "Fun"
                );
                break;

            case "hashtag-generator":
                prompt = prompts.hashtagGenerator(params.topic);
                break;

            case "intro-script":
                prompt = prompts.introScriptGenerator(
                    params.topic,
                    params.personality || "Fun",
                    params.length || "10-15 sec"
                );
                break;

            case "title-ab-tester":
                prompt = prompts.titleABTester(
                    params.titleA,
                    params.titleB,
                    params.context
                );
                break;

            case "thumbnail-prompt":
                prompt = prompts.thumbnailPromptGenerator(
                    params.videoTopic,
                    params.niche,
                    params.subject,
                    params.mood,
                    params.colorScheme,
                    params.composition
                );
                break;

            default:
                return NextResponse.json(
                    { error: "Unknown tool type" },
                    { status: 400 }
                );
        }

        const result = await generateAIText(prompt);

        return NextResponse.json({ result });
    } catch (error) {
        console.error("Generation error:", error);
        return NextResponse.json(
            { error: "Failed to generate content" },
            { status: 500 }
        );
    }
}
