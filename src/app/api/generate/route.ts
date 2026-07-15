import { NextResponse } from "next/server";
import { AIConfigurationError, generateAIText, prompts } from "@/lib/ai";
import { enforceRateLimit, getRequestIp } from "@/lib/rate-limit";

const MAX_REQUEST_BYTES = 16_000;
const ANONYMOUS_REQUEST_LIMIT = 12;
const REQUEST_WINDOW_MS = 60 * 60 * 1000;

export async function POST(request: Request) {
    try {
        const rawBody = await request.text();
        if (rawBody.length > MAX_REQUEST_BYTES) {
            return NextResponse.json({ error: "Request is too large" }, { status: 413 });
        }

        const rateLimit = enforceRateLimit(
            `ai-text:${getRequestIp(request.headers)}`,
            ANONYMOUS_REQUEST_LIMIT,
            REQUEST_WINDOW_MS,
        );
        if (!rateLimit.allowed) {
            return NextResponse.json(
                { error: "Too many requests. Please try again later." },
                { status: 429, headers: { "Retry-After": String(rateLimit.retryAfterSeconds) } },
            );
        }

        const body = JSON.parse(rawBody);
        const { tool: rawTool, ...params } = body;

        // Normalize legacy / alternate client tool names
        const toolAliases: Record<string, string> = {
            "content-calendar": "calendar-generator",
            "content-calendar-generator": "calendar-generator",
            "calendar": "calendar-generator",
            "youtube-content-calendar-generator": "calendar-generator",
            "thumbnail-generator": "thumbnail-text",
            "thumbnail-ideas": "thumbnail-text",
            "intro-generator": "intro-script",
            "intro-script-generator": "intro-script",
            "video-ideas-generator": "video-ideas",
            "channel-name-generator": "channel-name",
            "sponsorship": "sponsorship-estimator",
            "earnings-sponsorship": "sponsorship-estimator",
        };
        const tool =
            typeof rawTool === "string"
                ? toolAliases[rawTool] || rawTool
                : "";

        // Flexible field aliases used by different client components
        const topic =
            params.topic || params.niche || params.videoTopic || params.query || "";
        const niche = params.niche || params.topic || "";
        const days =
            Number(params.days || params.duration || params.dayCount) || 30;

        if (!tool) {
            return NextResponse.json(
                { error: "Tool type is required" },
                { status: 400 },
            );
        }

        let prompt: string;

        // Build prompt based on tool type
        switch (tool) {
            case "title-generator":
                if (!topic) {
                    return NextResponse.json(
                        { error: "Topic is required" },
                        { status: 400 },
                    );
                }
                prompt = prompts.titleGenerator(
                    topic,
                    params.tone || "Normal",
                    params.language || "English",
                    params.targetAudience,
                    params.videoType
                );
                break;

            case "description-generator":
                if (!topic) {
                    return NextResponse.json(
                        { error: "Topic is required" },
                        { status: 400 },
                    );
                }
                prompt = prompts.descriptionGenerator(
                    topic,
                    params.videoType || "Tutorial",
                    params.tone || "Casual & Friendly",
                    params.keywords || ""
                );
                break;

            case "tag-generator":
                if (!topic) {
                    return NextResponse.json(
                        { error: "Topic is required" },
                        { status: 400 },
                    );
                }
                prompt = prompts.tagGenerator(
                    topic,
                    niche || params.niche,
                    params.targetAudience
                );
                break;

            case "video-ideas":
                if (!niche) {
                    return NextResponse.json(
                        { error: "Niche is required" },
                        { status: 400 },
                    );
                }
                prompt = prompts.videoIdeasGenerator(
                    niche,
                    params.level || "Beginner",
                    params.channelSize,
                    params.contentGoal
                );
                break;

            case "trend-helper":
                if (!topic) {
                    return NextResponse.json(
                        { error: "Topic or niche is required" },
                        { status: 400 },
                    );
                }
                prompt = prompts.trendHelper(
                    topic,
                    params.region || "Global"
                );
                break;

            case "calendar-generator":
                if (!niche && !topic) {
                    return NextResponse.json(
                        { error: "Niche is required" },
                        { status: 400 },
                    );
                }
                prompt = prompts.calendarGenerator(
                    niche || topic,
                    params.frequency || "Weekly",
                    days
                );
                break;

            case "thumbnail-text":
                if (!topic) {
                    return NextResponse.json(
                        { error: "Topic is required" },
                        { status: 400 },
                    );
                }
                prompt = prompts.thumbnailTextGenerator(
                    topic,
                    params.style || "Bold & Colorful",
                    params.emotion || "Excited"
                );
                break;

            case "channel-name":
                if (!niche && !topic) {
                    return NextResponse.json(
                        { error: "Niche is required" },
                        { status: 400 },
                    );
                }
                prompt = prompts.channelNameGenerator(
                    niche || topic,
                    params.tone || "Fun"
                );
                break;

            case "hashtag-generator":
                if (!topic) {
                    return NextResponse.json(
                        { error: "Topic is required" },
                        { status: 400 },
                    );
                }
                prompt = prompts.hashtagGenerator(topic, niche || params.niche);
                break;

            case "intro-script":
                if (!topic) {
                    return NextResponse.json(
                        { error: "Topic is required" },
                        { status: 400 },
                    );
                }
                prompt = prompts.introScriptGenerator(
                    topic,
                    params.personality || "Fun",
                    params.length || "10-15 sec",
                    params.structure || "Standard Hook"
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
                    params.videoTopic || topic,
                    niche || params.niche,
                    params.subject,
                    params.mood,
                    params.colorScheme,
                    params.composition
                );
                break;

            case "sponsorship-estimator":
                prompt = prompts.sponsorshipEstimator(
                    niche || params.niche || topic,
                    params.subscribers,
                    params.dealViews
                );
                break;

            default:
                return NextResponse.json(
                    { error: `Unknown tool type: ${tool}` },
                    { status: 400 }
                );
        }

        const result = await generateAIText(prompt);

        return NextResponse.json(
            { result },
            {
                headers: {
                    "Cache-Control": "private, no-store",
                },
            }
        );
    } catch (error) {
        console.error("Generation error:", error);
        if (error instanceof AIConfigurationError) {
            return NextResponse.json(
                { error: "AI generation is temporarily unavailable." },
                { status: 503 },
            );
        }
        return NextResponse.json(
            { error: "Failed to generate content" },
            { status: 500 }
        );
    }
}
