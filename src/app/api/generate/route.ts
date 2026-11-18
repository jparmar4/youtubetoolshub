import { NextResponse } from "next/server";
import { AIConfigurationError, generateAIText, prompts } from "@/lib/ai";
import { checkAIGlobalRateLimit, checkAIToolDailyLimit } from "@/lib/ai-rate-limit";
import { checkAiIpRateLimit, createRateLimitJsonResponse } from "@/lib/rateLimit";
import { verifyOrigin } from "@/lib/verifyOrigin";

const MAX_REQUEST_BYTES = 24_000;

export async function POST(request: Request) {
    try {
        const originCheck = verifyOrigin(request);
        if (!originCheck.allowed) {
            return originCheck.response;
        }

        const ipRate = checkAiIpRateLimit(request.headers, "ai-generate");
        if (!ipRate.allowed) {
            return createRateLimitJsonResponse(ipRate);
        }

        const rawBody = await request.text();
        if (rawBody.length > MAX_REQUEST_BYTES) {
            return NextResponse.json({ error: "Request is too large" }, { status: 413 });
        }

        const globalLimit = await checkAIGlobalRateLimit(request.headers);
        if (!globalLimit.allowed) {
            return globalLimit.response;
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let body: any;
        try {
            body = JSON.parse(rawBody);
        } catch {
            return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
        }
        const { tool: rawTool, ...params } = body as {
            tool?: string;
            [key: string]: unknown;
        };

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
            "packaging-studio": "ab-packaging-studio",
            "youtube-ab-packaging-studio": "ab-packaging-studio",
            "youtube-hook-auditor": "hook-auditor",
            "youtube-shorts-series-planner": "shorts-series-planner",
            "youtube-video-summary-generator": "video-summary",
            "video-summary-generator": "video-summary",
        };
        const tool =
            typeof rawTool === "string"
                ? toolAliases[rawTool] || rawTool
                : "";

        const str = (v: unknown, fallback = ""): string =>
            typeof v === "string" ? v : fallback;
        const num = (v: unknown, fallback = 0): number => {
            const n = Number(v);
            return Number.isFinite(n) ? n : fallback;
        };

        // Flexible field aliases used by different client components
        const topic =
            str(params.topic) ||
            str(params.niche) ||
            str(params.videoTopic) ||
            str(params.query) ||
            "";
        const niche = str(params.niche) || str(params.topic) || "";
        const days = num(params.days || params.duration || params.dayCount, 30);

        if (!tool) {
            return NextResponse.json(
                { error: "Tool type is required" },
                { status: 400 },
            );
        }

        // Per-tool free-tier cap (server-authoritative).
        const perToolLimit = checkAIToolDailyLimit(globalLimit.context, tool);
        if (!perToolLimit.allowed) {
            return perToolLimit.response;
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
                    str(params.tone, "Normal"),
                    str(params.language, "English"),
                    str(params.targetAudience),
                    str(params.videoType),
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
                    str(params.videoType, "Tutorial"),
                    str(params.tone, "Casual & Friendly"),
                    str(params.keywords),
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
                    niche || str(params.niche),
                    str(params.targetAudience),
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
                    str(params.level, "Beginner"),
                    str(params.channelSize),
                    str(params.contentGoal),
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
                    str(params.region, "Global"),
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
                    str(params.frequency, "Weekly"),
                    days,
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
                    str(params.style, "Bold & Colorful"),
                    str(params.emotion, "Excited"),
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
                    str(params.tone, "Fun"),
                );
                break;

            case "hashtag-generator":
                if (!topic) {
                    return NextResponse.json(
                        { error: "Topic is required" },
                        { status: 400 },
                    );
                }
                prompt = prompts.hashtagGenerator(topic, niche || str(params.niche));
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
                    str(params.personality, "Fun"),
                    str(params.length, "10-15 sec"),
                    str(params.structure, "Standard Hook"),
                );
                break;

            case "title-ab-tester":
                prompt = prompts.titleABTester(
                    str(params.titleA),
                    str(params.titleB),
                    str(params.context),
                );
                break;

            case "thumbnail-prompt":
                prompt = prompts.thumbnailPromptGenerator(
                    str(params.videoTopic) || topic,
                    niche || str(params.niche),
                    str(params.subject),
                    str(params.mood),
                    str(params.colorScheme),
                    str(params.composition),
                );
                break;

            case "sponsorship-estimator":
                prompt = prompts.sponsorshipEstimator(
                    niche || str(params.niche) || topic,
                    str(params.subscribers),
                    str(params.dealViews),
                );
                break;

            case "ab-packaging-studio":
                if (!topic) {
                    return NextResponse.json(
                        { error: "Video topic or working title is required" },
                        { status: 400 },
                    );
                }
                prompt = prompts.abPackagingStudio(
                    topic,
                    str(params.targetAudience) || str(params.audience) || niche || "YouTube Creators",
                );
                break;

            case "hook-auditor": {
                const videoTitle = str(params.videoTitle) || str(params.title) || topic;
                const introScript = str(params.introScript) || str(params.script);
                if (!videoTitle.trim() || !introScript.trim()) {
                    return NextResponse.json(
                        { error: "Both video title and intro script are required" },
                        { status: 400 },
                    );
                }
                prompt = prompts.hookAuditor(videoTitle.trim(), introScript.trim());
                break;
            }

            case "shorts-series-planner": {
                if (!topic.trim()) {
                    return NextResponse.json(
                        { error: "Series topic or core promise is required" },
                        { status: 400 },
                    );
                }
                const rawCount = num(params.episodeCount || params.episodes, 5);
                const episodeCount = rawCount === 3 || rawCount === 7 ? rawCount : 5;
                const seriesTone = str(params.tone, "Educational Breakdown");
                prompt = prompts.shortsSeriesPlanner(topic.trim(), episodeCount, seriesTone);
                break;
            }

            case "video-summary": {
                const videoTitle = str(params.videoTitle) || str(params.title) || topic || "YouTube Video";
                const channelTitle = str(params.channelTitle) || "YouTube Creator";
                const transcriptText = str(params.transcriptText) || str(params.transcript) || "";
                if (!transcriptText.trim() && !videoTitle.trim()) {
                    return NextResponse.json(
                        { error: "Provide a YouTube URL or transcript excerpt to summarize." },
                        { status: 400 },
                    );
                }
                prompt = prompts.videoSummaryGenerator(
                    videoTitle.trim(),
                    channelTitle.trim(),
                    transcriptText.trim() || `Summarize the YouTube video titled "${videoTitle.trim()}".`,
                    str(params.framework, "executive"),
                    params.includeTimestamps !== false,
                    params.includeMetrics !== false,
                );
                break;
            }

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
        // Never echo raw internal error text (DB config, fetch failures) to
        // the client — it is already logged above.
        return NextResponse.json(
            { error: "Failed to generate content. Please try again." },
            { status: 500 }
        );
    }
}
