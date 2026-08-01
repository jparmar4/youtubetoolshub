import { NextResponse } from "next/server";
import { AIConfigurationError, generateAIText, prompts } from "@/lib/ai";
import { enforceRateLimit, getRequestIp } from "@/lib/rate-limit";
import { auth } from "@/auth";
import { hasActiveSubscription } from "@/lib/subscription";

const MAX_REQUEST_BYTES = 16_000;
/** Free/anonymous: keep abuse cost low while UI free tier is ~2/tool/day */
const FREE_HOURLY_LIMIT = 8;
const FREE_DAILY_LIMIT = 24;
const PRO_HOURLY_LIMIT = 60;
const HOUR_MS = 60 * 60 * 1000;
const DAY_MS = 24 * HOUR_MS;

export async function POST(request: Request) {
    try {
        const rawBody = await request.text();
        if (rawBody.length > MAX_REQUEST_BYTES) {
            return NextResponse.json({ error: "Request is too large" }, { status: 413 });
        }

        const ip = getRequestIp(request.headers);
        const session = await auth();
        const email = session?.user?.email || null;
        const isPro = email ? await hasActiveSubscription(email) : false;

        const hourlyKey = email ? `ai-text-h:user:${email}` : `ai-text-h:ip:${ip}`;
        const dailyKey = email ? `ai-text-d:user:${email}` : `ai-text-d:ip:${ip}`;
        const hourlyLimit = isPro ? PRO_HOURLY_LIMIT : FREE_HOURLY_LIMIT;
        const dailyLimit = isPro ? PRO_HOURLY_LIMIT * 12 : FREE_DAILY_LIMIT;

        const hourly = enforceRateLimit(hourlyKey, hourlyLimit, HOUR_MS);
        if (!hourly.allowed) {
            return NextResponse.json(
                { error: "Too many requests. Please try again later." },
                { status: 429, headers: { "Retry-After": String(hourly.retryAfterSeconds) } },
            );
        }

        if (!isPro) {
            const daily = enforceRateLimit(dailyKey, dailyLimit, DAY_MS);
            if (!daily.allowed) {
                return NextResponse.json(
                    {
                        error: "Daily free AI limit reached. Upgrade to Pro or try again tomorrow.",
                        code: "DAILY_LIMIT",
                    },
                    { status: 429, headers: { "Retry-After": String(daily.retryAfterSeconds) } },
                );
            }
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
