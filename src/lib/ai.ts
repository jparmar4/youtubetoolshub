/**
 * AI Text Generation Utility
 *
 * Professional-grade AI prompts for YouTube content creation.
 * Configure in your .env.local file:
 *
 * AI_API_KEY=your-openai-api-key-here
 * AI_MODEL=gpt-4o-mini  (optional, defaults to gpt-4o-mini)
 */

import { aiCache, hashString } from "./cache";

/** Thrown when AI is not configured (missing API key). Signals a 503, not a 500. */
export class AIConfigurationError extends Error {
    constructor(message = "AI not configured") {
        super(message);
        this.name = "AIConfigurationError";
    }
}

// Types for AI generation
export interface AIGenerationOptions {
    temperature?: number;
    maxTokens?: number;
    skipCache?: boolean; // Allow bypassing cache if needed
}

/**
 * Generate AI text based on a prompt
 * Uses LRU cache to avoid repeat API calls for similar prompts
 */
export async function generateAIText(
    prompt: string,
    options: AIGenerationOptions = {}
): Promise<string> {
    const { temperature = 0.8, maxTokens = 2000, skipCache = false } = options;

    // Create cache key from prompt hash + parameters
    const cacheKey = `ai_${hashString(prompt)}_${temperature}_${maxTokens}`;

    // Check cache first (unless explicitly skipped)
    if (!skipCache) {
        const cached = aiCache.get(cacheKey);
        if (cached) {
            console.log("[AI Cache] HIT - returning cached response");
            return cached;
        }
    }

    const apiKey = process.env.AI_API_KEY;
    const model = process.env.AI_MODEL || "gpt-4o-mini";

    if (!apiKey) {
        console.warn("AI_API_KEY not configured. Returning mock response.");
        // Don't cache mock responses
        return getMockResponse(prompt);
    }

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: model,
                messages: [
                    {
                        role: "system",
                        content: getSystemPrompt()
                    },
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                temperature,
                max_tokens: maxTokens,
            }),
        });

        if (!response.ok) {
            throw new Error(`AI API error: ${response.status}`);
        }

        const data = await response.json();
        const result = data?.choices?.[0]?.message?.content;

        if (!result) {
            throw new Error("AI returned an empty or malformed response");
        }

        // Store in cache for future requests
        aiCache.set(cacheKey, result);

        return result;
    } catch (error) {
        console.error("AI generation error:", error);
        throw error;
    }
}

/**
 * Get current date context for AI prompts
 */
const getDateContext = () => {
    const now = new Date();
    const month = now.toLocaleString('en-US', { month: 'long' });
    const year = now.getFullYear();
    return { month, year, nextYear: year + 1 };
};

/**
 * Expert-level system prompt for YouTube content optimization
 */
const getSystemPrompt = () => {
    const { month, year, nextYear } = getDateContext();

    return `You are an elite YouTube growth strategist and content optimization expert.

CRITICAL DATE CONTEXT:
- Current date: ${month} ${year}
- We are approaching ${nextYear}
- ALWAYS use ${year} or ${nextYear} for year references
- NEVER reference 2023 or 2024 - they are outdated
- Focus on current trends, not outdated information

Your expertise includes:
1. **YouTube Algorithm Mastery**: Watch time, CTR, audience retention, recommendation systems
2. **SEO Excellence**: Keyword research, search intent, discoverability optimization
3. **Psychology of Clicks**: Curiosity gaps, emotional triggers, FOMO, pattern interrupts
4. **Viral Content Patterns**: Analyzing successful videos to identify winning formulas
5. **Copywriting Expertise**: Direct response copywriting, power words, persuasion

Your responses must be:
- Based on ${year}/${nextYear} trends and current best practices
- Specific and actionable, not generic advice
- Optimized for maximum CTR and engagement
- Fresh and creative, avoiding overused clichés
- Formatted exactly as requested (JSON when specified)

Always prioritize: Authenticity > Clickbait, Value > Views, Long-term growth > Short-term gains.`;
};

/**
 * Mock response for development when AI_API_KEY is not configured
 */
function getMockResponse(prompt: string): string {
    if (prompt.includes("title")) {
        return JSON.stringify([
            { title: "How I Grew My Channel to 10K Subscribers in 30 Days", score: 92, method: "Authority/Proof", why: "Specific timeframe + result creates strong curiosity gap." },
            { title: "Stop Making These 5 YouTube Mistakes (Most Creators Do)", score: 88, method: "Negative Urgency", why: "Fear of missing out combined with specific number." },
            { title: "The YouTube Algorithm Explained in 10 Minutes", score: 85, method: "Specifics", why: "Searchable topic + time promise reduces commitment barrier." }
        ]);
    }
    return "This is a mock AI response. Please configure AI_API_KEY in your .env.local file to enable real AI generation.";
}

/**
 * Professional-grade prompts for each tool
 */
export const prompts = {
    titleGenerator: (topic: string, tone: string, language: string, targetAudience: string = "General Audience", videoType: string = "General") => `
# Task: Generate 10 Professional, Viral-Optimized YouTube Titles

## Your Role
You are a top-tier YouTube Consultant (think MrBeast/Paddy Galloway level). Your goal is to generate titles that maximize Click-Through Rate (CTR) while remaining strictly relevant to the content.

## Input Context
- **Topic**: "${topic}"
- **Tone**: ${tone}
- **Language**: ${language}
- **Target Audience**: ${targetAudience}
- **Video Type**: ${videoType}

## Mental Models for High CTR:
1. **Curiosity Gap**: Reveal *what* but withhold *why* or *how* (e.g., "I Tried X... Here's What Happened").
2. **Negativity Bias**: Warning of mistakes or "stop doing this" works better than "do this".
3. **Specifics**: "3 Tips" < "7 Advanced Tactics". "Fast" < "In 5 Minutes".
4. **Authority/Proof**: "I Spent $10k" or "Tested by Pros".
5. **Pattern Interrupt**: Short, punchy titles that break the mold.

## Output Structure
Return ONLY a valid JSON array of objects. Do not include markdown formatting.
Each object must have:
- \`title\`: The generated title string.
- \`score\`: A predicted Viral Score (0-100) based on psychology.
- \`method\`: The strategy used (e.g., "Curiosity Gap", "Negative Urgency").
- \`why\`: A brief (1 sentence) explanation of why this title gets clicks.

## Example Output:
[
  {
    "title": "Why 99% of Channels Fail (It's Not Content)",
    "score": 94,
    "method": "Negative Urgency",
    "why": "Leverages fear of failure and promises a hidden secret."
  }
]

GENERATE 10 TITLES NOW:`,

    descriptionGenerator: (topic: string, videoType: string, tone: string = "Casual & Friendly", keywords: string = "") => `
# Task: Write a World-Class YouTube Description

## Your Role
You are a top 0.1% YouTube strategist who has written descriptions for channels with 10M+ subscribers. Your descriptions drive engagement, boost watch time, and convert viewers into subscribers.

## Input
- **Video Topic**: "${topic}"
- **Video Type**: ${videoType}
- **Tone**: ${tone}
- **Keywords to Include**: ${keywords}

## CRITICAL INSTRUCTIONS

### Voice & Style
- Write like a confident creator who genuinely loves their content
- Sound conversational but polished — like a pro YouTuber, not a friend texting
- Be specific to the topic, never generic
- Every sentence should add value or intrigue
- Use power words that create urgency and curiosity

### Structure (Output as PLAIN TEXT, ready to paste into YouTube)

**LINE 1-2: THE HOOK**
Open with something that makes people NEED to read more. Options:
- A bold claim or result ("This one change doubled my [result]")
- A pattern interrupt ("Everyone's doing [X] wrong. Here's the truth.")
- Specific intrigue ("After testing 47 methods, only 3 actually worked.")

**LINE 3-5: THE PROMISE**
Tell them exactly what value they'll get. Be specific:
- What problem you solve
- What transformation or result they'll achieve
- Why THIS video is different from the 100 others on the topic

**TIMESTAMPS** (with compelling section names)
0:00 [Hook/Intro - make it intriguing]
X:XX [First major point - specific benefit-driven title]
X:XX [The breakthrough moment]
X:XX [Advanced tip or secret]
X:XX [Summary + what to do next]

**KEY INSIGHTS** (4-5 punchy bullet points)
Use arrows (→) and write insights that make people want to watch:
→ [Specific insight that challenges common belief]
→ [The "secret" or counterintuitive truth]
→ [Practical takeaway they can use immediately]
→ [Result or transformation they'll achieve]

**RESOURCES**
━━━━━━━━━━━━━━━━━━━━
🔗 Links mentioned in this video:
[Link to resource 1]
[Link to resource 2]

📱 Connect with me:
Instagram: @[handle]
Twitter: @[handle]
━━━━━━━━━━━━━━━━━━━━

**CALL TO ACTION** (1-2 lines, genuine not pushy)
Something like: "If this saved you time/money/frustration, a like helps more than you know. And if you're serious about [topic], subscribe — I post [value proposition] every [frequency]."

**HASHTAGS** (5-7 strategic ones at the very end)
#Hashtag1 #Hashtag2 #Hashtag3 #Hashtag4 #Hashtag5

## Quality Standards
- NO generic phrases like "In this video" or "Welcome to my channel"
- NO AI clichés like "dive into", "embark on a journey", "unlock your potential"
- Every line must be specific to the actual topic "${topic}"
- Timestamps must have creative, benefit-driven section names
- The description should make someone want to watch even if they only read it

## Output Format
Return ONLY the plain text description, ready to paste into YouTube. No JSON, no markdown code blocks, no extra formatting. Just the description text exactly as it should appear.

Write the description now:`,

    tagGenerator: (topic: string, niche?: string, targetAudience?: string) => `
# Task: Generate Winning YouTube Tags That Actually Rank
## Your Role
You are a YouTube SEO expert who knows how to tag videos for maximum discoverability. You balance high-volume keywords with low-competition long-tail tags.

## Input
- **Video Topic**: "${topic}"
${niche ? `- **Content Niche**: ${niche}` : ''}
${targetAudience ? `- **Target Audience**: ${targetAudience}` : ''}

## YouTube Tag Strategy 2025:
1. **First 3 tags matter most** - YouTube weights them heavily
2. **Mix specific & broad** - Cast wide net, catch specific audience
3. **Match search intent** - What would someone TYPE to find this?
4. **Include your title keywords** - Reinforces relevance

## Output Format
Return ONLY valid JSON:
{
  "primaryTags": ["most important tag 1", "main tag 2", "core tag 3"],
  "searchTags": ["how to topic", "topic tutorial", "topic for beginners", ...],
  "broadTags": ["category", "niche", "related area", ...],
  "trendingTags": ["topic 2025", "viral format", ...],
  "longTailTags": ["specific longer phrase for targeting", ...]
}

Generate tags that a successful YouTuber would actually use - practical, searchable, and strategic.`,

    hashtagGenerator: (topic: string, niche?: string) => `
# Task: Generate Strategic YouTube Hashtags (Maximize Reach)

## Input Details
- **Topic**: "${topic}"
${niche ? `- **Niche**: ${niche}` : ''}

## Strategy
Hashtags on YouTube help with **Discovery** (via Hashtag pages) and **Context** (telling the algorithm what the video is about). You need a mix of broad (volume) and specific (relevance).

## Output Format
Return ONLY valid JSON with 3 categories:
{
  "broad": [
     {"tag": "#Hashtag1", "volume": "High", "relevance": "Medium"},
     {"tag": "#Hashtag2", "volume": "High", "relevance": "Low"}
     ... (5-8 tags)
  ],
  "niche": [
     {"tag": "#SpecificTag1", "volume": "Medium", "relevance": "High"},
     ... (5-8 tags)
  ],
  "trending": [
     {"tag": "#TrendingTag1", "volume": "High", "relevance": "High"},
     ... (3-5 tags)
  ]
}

- Include the # symbol.
- No spaces.
- CamelCase or lowercase is fine.`,

    videoIdeasGenerator: (niche: string, level: string, channelSize: string = "Just Starting", contentGoal: string = "Get Views") => `
# Task: Generate 10 Strategic, Viral Video Ideas

## Your Role
You are a strategic YouTube Growth Consultant. You don't just brainstorm random ideas; you design video concepts that are mathematically likely to succeed based on the creator's current size and goals.

## Input Context
- **Niche**: "${niche}"
- **Audience Level**: ${level}
- **Channel Size**: ${channelSize}
- **Primary Goal**: ${contentGoal}

## Strategy by Channel Size
- **Just Starting (0-1k)**: Focus on Search (How-to) and strong community hooks ("My Journey"). High utility required.
- **Growing (1k-10k)**: Focus on Trend-Surfing and high-CTR experiments.
- **Established (100k+)**: Focus on Storytelling, High Production, and Personality-driven content.

## Strategy by Goal
- **Get Views**: Broad appeal, curiosity gaps, trending topics, "Negative Urgency" titles.
- **Get Subscribers**: High value, series-based content, "Ultimate Guides", strong personality connection.
- **Sell Product/Service**: Problem-aware content, tutorials demonstrating a solution, case studies.

## Output Structure
Return ONLY a valid JSON array of objects.
Each object must have:
- \`title\`: The click-worthy title.
- \`concept\`: A 1-sentence expansion of the idea.
- \`score\`: Viral Potential Score (0-100).
- \`difficulty\`: Execution Difficulty (Easy/Medium/Hard).
- \`angle\`: The psychological angle (e.g., "Contrarian", "Story", "Search").
- \`thumbnail_concept\`: A brief visual description for the thumbnail.

## Example Output:
[
  {
    "title": "I Quit [Popular Tool] (Here's Why)",
    "concept": "A review explaining why the industry standard is actually bad for beginners.",
    "score": 92,
    "difficulty": "Easy",
    "angle": "Contrarian",
    "thumbnail_concept": "Me looking disappointed holding the tool + big red X."
  }
]

GENERATE 10 IDEAS NOW:`,

    trendHelper: (topic: string, region: string) => {
        const now = new Date();
        const month = now.toLocaleString('en-US', { month: 'long' });
        const year = now.getFullYear();
        const nextYear = year + 1;

        return `You're a YouTube trend analyst. Generate 8 trending topic ideas for the "${topic}" niche in ${region}.

IMPORTANT: Current date is ${month} ${year}. We are about to enter ${nextYear}.
- All year references must be ${year} or ${nextYear}
- NEVER mention 2023 or 2024 - those are outdated
- Focus on end-of-${year} trends or ${nextYear} predictions

RULES:
- Sound like a real content strategist, not AI
- Give specific, actionable topics
- Focus on what's actually getting attention right now
- Include the unique angle that would make it work

THINK ABOUT:
- What questions are people asking right now in ${month} ${year}?
- What's happening in the news related to this niche?
- End-of-year roundups, ${nextYear} predictions
- What controversial or hot debates are happening?
- What new tools/tech/methods are people curious about?

OUTPUT: Return ONLY JSON array, no markdown:
[
  {"topic": "specific trending topic here", "angle": "your unique take to stand out from others"},
  ...8 total
]`;
    },

    calendarGenerator: (niche: string, frequency: string, days: number) => `
# Task: Generate Strategic Content Calendar

## Input Details
- **Niche**: "${niche}"
- **Posting Frequency**: ${frequency}
- **Duration**: ${days} days

## Requirements
Create a ${days}-day content calendar with strategic variety:

### Content Mix
- 40% Educational (How-to, Tutorials, Tips)
- 30% Entertainment (Stories, Challenges, Reactions)
- 20% Community (Q&A, Collaborations, Behind-scenes)
- 10% Trending (News, Current events)

### Optimization Rules
- Alternate between high-effort and quick-turnaround content
- Include Shorts ideas (mark as "Short")
- Consider optimal posting days (Tue-Thu typically best)
- Build content series for retention

## Output Format
Return ONLY valid JSON array:
[
  {"day": 1, "title": "Video Title", "type": "Tutorial/Vlog/Short/etc"},
  ...
]`,

    thumbnailTextGenerator: (topic: string, style: string, emotion: string) => `
# Task: Generate Viral YouTube Thumbnail Text & Design Concepts
## Input Details
- **Topic**: "${topic}"
- **Style**: ${style}
- **Emotion**: ${emotion}

## Your Goal
Generate 8 high-CTR thumbnail concepts. For each, provide the text overlay and the psychology behind it.

## Critical Rules for Text
- **Max 4 words** per thumbnail (readability is king).
- **No questions** followed by "Answer" (just show the result).
- **Use Contrast**: "Good vs Bad", "Then vs Now", "$1 vs $1,000".
- **Focus on**: Outcomes, warnings, money, or extreme emotions.

## Output Format
Return ONLY valid JSON:
[
  {
    "text": "STOP DOING THIS",
    "color_suggestion": "Bright Red (#FF0000) background, White text",
    "trigger": "Negative Urgency (Loss Aversion)"
  },
  ...
]`,

    channelNameGenerator: (niche: string, tone: string) => `
You're a branding expert. Generate 15 unique, available-friendly YouTube channel names for "${niche}" with a "${tone}" vibe.

NAMING STRATEGY:
- **Personal Brand**: Name + Niche (e.g., "Mike Cooks")
- **Creative**: Unique compounds (e.g., "TechFlow")
- **Action**: Verbs (e.g., "BuildWithMe")
- **Short**: 1-2 words max
- **Global**: Easy to spell worldwide

OUTPUT FORMAT:
Return ONLY a valid JSON object with these categories. Currently, users need detailed branding info.
{
  "personalBrand": [
     { "name": "Name1", "vibe": "Friendly", "score": 90, "reason": "High trust factor" },
     ...
  ],
  "creativeCompound": [
     { "name": "Name1", "vibe": "Modern", "score": 85, "reason": "Memorable & short" }
     ...
  ],
  "actionBased": [ ... ],
  "abstractCool": [ ... ],
  "descriptive": [ ... ]
}
Generate 3 names per category.`,

    introScriptGenerator: (topic: string, personality: string, length: string, structure: string = "Standard Hook") => `
# Task: Write a YouTube Video Intro Script
## Input
- **Topic**: "${topic}"
- **Persona**: ${personality}
- **Length**: ${length}
- **Structure**: ${structure}

## Structure Guide:
- **Standard Hook**: Hook -> Context -> Promise -> Transition
- **Story Start**: "I used to struggle with..." -> The Change -> The Lesson
- **Cold Open**: Immediate action/result -> "Here's how I did it" -> Intro
- **Controversial**: "Everything you know is wrong" -> Proof -> New Way

## Output Format
Return ONLY valid JSON:
{
  "hook": "The opening line(s)",
  "context": "Why this matters",
  "promise": "What they will get",
  "transition": "Leading into content"
}`,

    titleABTester: (titleA: string, titleB: string, context?: string) => `
# Task: Advanced YouTube Title A/B Simulation
## Input
- **Option A**: "${titleA}"
- **Option B**: "${titleB}"
${context ? `- **Context**: ${context}` : ''}

## Simulation Task
Act as the YouTube Algorithm (RankBrain). Simulate 1,000 impressions for both titles. Analyze which one gets more clicks based on:
1. **Curiosity Gap** (Does it make them *need* to know?)
2. **Urgency/Fear** (Loss aversion?)
3. **Specifics** (Numbers, specific outcomes?)

## Output Format
Return ONLY valid JSON:
{
  "winner": "A" or "B",
  "confidence": 0-100,
  "analysis": "Why the winner won in 1 sentence.",
  "titleA": {
    "score": 0-100,
    "ctr_prediction": "X.X%",
    "impulse_rating": "High/Medium/Low",
    "strengths": ["list", "of", "strengths"],
    "weaknesses": ["list", "of", "weaknesses"]
  },
  "titleB": {
    "score": 0-100,
    "ctr_prediction": "X.X%",
    "impulse_rating": "High/Medium/Low",
    "strengths": ["list", "of", "strengths"],
    "weaknesses": ["list", "of", "weaknesses"]
  }
}`,

    sponsorshipEstimator: (niche: string, subscribers: string, views: string) => `
# Task: Estimate YouTube Sponsorship Rate
## Input
- **Niche**: "${niche}"
- **Subscribers**: ${subscribers}
- **Avg Views/Video**: ${views}

## Valuation Guide (CPM Models)
- **Tech/Finance**: $30-$50 CPM (Cost Per Mille)
- **Lifestyle/Vlog**: $15-$25 CPM
- **Gaming**: $10-$20 CPM
- **Education**: $20-$35 CPM

## Output Format
Return ONLY valid JSON:
{
  "lowEstimate": 500,
  "highEstimate": 800,
  "currency": "USD",
  "explanation": "Based on the Tech niche average of $40 CPM...",
  "pitchTip": "Focus on your high retention rate in your email..."
}`,

    thumbnailPromptGenerator: (videoTopic: string, niche: string, subject: string, mood: string, colorScheme: string, composition: string) => `
# Task: Generate Professional AI Image Prompts for YouTube Thumbnails

## Input Details
- **Video Topic**: "${videoTopic}"
- **Content Niche**: ${niche}
- **Main Subject**: ${subject}
- **Mood/Emotion**: ${mood}
- **Color Scheme**: ${colorScheme}
- **Composition Style**: ${composition}

## Requirements
Generate 5 unique, highly detailed AI image prompts. Each prompt must:

1. **Visual Specificity**: Describe exact visual elements, lighting, angles
2. **Style Direction**: Include art style, photography type, rendering quality
3. **Mood Alignment**: Match the emotional tone to the video content
4. **YouTube Optimization**: Design for high CTR and visibility at small sizes
5. **No Text**: Explicitly exclude text overlays (user adds separately)

## Prompt Structure to Follow
Each prompt should include:
- Subject description (who/what is the focus)
- Action or pose (what they're doing)
- Environment/background
- Lighting conditions
- Color palette
- Camera angle/shot type
- Style keywords (photorealistic, cinematic, etc.)
- Quality modifiers (8K, detailed, professional)
- Explicit "no text, no words, no letters" instruction

## Prompt Types to Generate
1. **Hero Shot**: Maximum impact, main subject front and center
2. **Reaction Style**: If person, emphasize facial expression
3. **Dramatic/Cinematic**: Movie poster quality, high contrast
4. **Clean/Professional**: Minimal, focused, trust-building
5. **Creative/Unique**: Unexpected angle or artistic interpretation

## Output Format
Return ONLY valid JSON array of 5 detailed prompt strings:
["Prompt 1 with full details...", "Prompt 2 with full details...", ...]

Make each prompt 50-100 words for optimal AI image generator results.`
};
