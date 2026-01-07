/**
 * AI Text Generation Utility
 * 
 * Professional-grade AI prompts for YouTube content creation.
 * Configure in your .env.local file:
 * 
 * AI_API_KEY=your-openai-api-key-here
 * AI_MODEL=gpt-4o-mini  (optional, defaults to gpt-4o-mini)
 */

// Types for AI generation
export interface AIGenerationOptions {
    temperature?: number;
    maxTokens?: number;
}

/**
 * Generate AI text based on a prompt
 */
export async function generateAIText(
    prompt: string,
    options: AIGenerationOptions = {}
): Promise<string> {
    const { temperature = 0.8, maxTokens = 2000 } = options;

    const apiKey = process.env.AI_API_KEY;
    const model = process.env.AI_MODEL || "gpt-4o-mini";

    if (!apiKey) {
        console.warn("AI_API_KEY not configured. Returning mock response.");
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
        return data.choices[0].message.content;
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
  "confidence": 0-100, (How sure are you?)
  "analysis": "Why the winner won in 1 sentence.",
  "titleA": {
    "score": 0-100,
    "ctr_prediction": "X.X%", (Likely CTR, e.g. 5.2%)
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
  "lowEstimate": 500, (Number in USD)
  "highEstimate": 800, (Number in USD)
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

/**
 * Mock response generator for demo purposes
 */
function getMockResponse(prompt: string): string {
    const lowerPrompt = prompt.toLowerCase();

    if (lowerPrompt.includes("title")) {
        return JSON.stringify([
            "I tried this for 30 days – here's what actually happened",
            "The trick that changed everything for me (not clickbait)",
            "Stop doing this! It's costing you more than you think",
            "How I went from complete beginner to confident in 3 months",
            "Nobody talks about this, but it's a game changer",
            "The real reason you're struggling (and how to fix it)",
            "5 things I wish I knew before starting",
            "This one change made all the difference for me",
            "What they don't tell you about getting started",
            "I was doing it all wrong – here's what works instead"
        ]);
    }

    if (lowerPrompt.includes("description")) {
        return JSON.stringify({
            description: {
                hook: "Okay so I finally cracked the code on this and honestly, I wish someone told me this sooner 😅",
                video_summary: "I spent way too long figuring this out the hard way, so I'm sharing everything that actually worked for me. No fluff, just the real stuff that made a difference. Stick around till the end because the last tip is what changed everything for me.",
                timestamps: [
                    "0:00 quick intro (skip to 1:20 if you're impatient)",
                    "1:20 the mistake I kept making",
                    "3:45 what actually works",
                    "6:00 my exact process",
                    "8:30 the results + what surprised me"
                ],
                key_points: [
                    "→ The one thing that made the biggest difference",
                    "→ Why most tutorials overcomplicate this",
                    "→ What I'd do differently if I started over",
                    "→ The free tool I can't live without now",
                    "→ Real numbers from my experience"
                ],
                resources_links: "Stuff I mentioned:\n→ [Link placeholder]\n→ [Link placeholder]\n\nFind me here:\nIG: @yourhandle\nTwitter: @yourhandle",
                call_to_action: "If this helped even a little, a like would mean a lot 👍 And subscribe if you want more of this kind of content – I post every week!",
                hashtags: "#YouTube #Tutorial #HowTo #Tips #2024"
            }
        });
    }

    if (lowerPrompt.includes("tag") || lowerPrompt.includes("keyword")) {
        return JSON.stringify({
            primaryTags: [
                "how to get started",
                "beginner tutorial",
                "complete guide"
            ],
            searchTags: [
                "how to tutorial",
                "step by step guide",
                "for beginners",
                "tips and tricks",
                "learn fast",
                "easy tutorial",
                "2024 guide",
                "best way to"
            ],
            broadTags: [
                "tutorial",
                "education",
                "learning",
                "howto",
                "tips",
                "guide"
            ],
            trendingTags: [
                "2024",
                "new method",
                "works in 2024",
                "updated guide",
                "latest tips"
            ],
            longTailTags: [
                "complete beginners guide step by step",
                "how to get started from scratch",
                "common mistakes to avoid",
                "best practices for beginners",
                "proven strategies that work",
                "what i wish i knew before starting",
                "tips no one tells you about",
                "fastest way to learn"
            ]
        });
    }

    if (lowerPrompt.includes("video idea")) {
        return JSON.stringify([
            { title: "I wasted 6 months doing this wrong (don't make my mistake)", concept: "Personal failure story that builds trust" },
            { title: "Why everything you've been told about this is backwards", concept: "Controversial take challenging popular advice" },
            { title: "I spent $1000 testing these so you don't have to", concept: "Real money, real tests, honest results" },
            { title: "The 5am routine that actually works (not the fake version)", concept: "Behind-the-scenes reality vs influencer fiction" },
            { title: "I asked 50 experts their #1 secret - one answer changed everything", concept: "Expert compilation with a standout insight" },
            { title: "Stop doing this immediately (it's ruining your results)", concept: "Urgent warning that creates fear of missing out" },
            { title: "What no one tells beginners (learned this the hard way)", concept: "Insider knowledge for people just starting" },
            { title: "I tried the viral method for 30 days - honest results", concept: "Real experiment testing trending advice" },
            { title: "The free tool that replaced everything else (not sponsored)", concept: "Genuine recommendation with high value" },
            { title: "Why I quit doing what made me successful", concept: "Counterintuitive story with a twist" }
        ]);
    }

    if (lowerPrompt.includes("thumbnail text")) {
        return JSON.stringify([
            "GAME CHANGER",
            "I WAS WRONG",
            "THIS WORKS",
            "STOP DOING THIS",
            "FINALLY",
            "THE TRUTH",
            "IT'S HERE",
            "MUST WATCH"
        ]);
    }

    if (lowerPrompt.includes("channel name")) {
        return JSON.stringify([
            "ContentFlow", "CreateSphere", "GrowthLab", "ViralMind", "ThriveTube",
            "NextLevel", "ProCreate", "ImpactZone", "ValueVault", "MasterClass",
            "SkillForge", "InsightHub", "LearnPro", "GameChanger", "SuccessPath",
            "WinnerMindset", "EliteTips", "TopTier", "ProGuide", "MaxResults"
        ]);
    }

    if (lowerPrompt.includes("hashtag")) {
        return JSON.stringify({
            broad: ["#YouTube", "#ContentCreator", "#Tutorial", "#HowTo", "#Tips", "#2024", "#Viral", "#Trending", "#Learn", "#Growth"],
            specific: ["#YouTubeTips2024", "#ContentCreation", "#CreatorLife", "#SmallYouTuber", "#GrowOnYouTube", "#VideoTips", "#YouTubeGrowth", "#ContentStrategy", "#CreatorTips", "#YouTubeSuccess"]
        });
    }

    if (lowerPrompt.includes("intro script")) {
        return `[HOOK]
"What if I told you that everything you've been doing is actually holding you back?"

[CONTEXT]
Look, I know that sounds dramatic, but stick with me here - because in the next few minutes, I'm going to show you exactly what changed the game for me.

[PROMISE]
By the end of this video, you'll have the exact blueprint I used to go from struggling to actually seeing real results. And trust me, it's simpler than you think.

[TRANSITION]
So let's dive right in. The first thing you need to understand is...`;
    }

    if (lowerPrompt.includes("trend") || lowerPrompt.includes("topic")) {
        return JSON.stringify([
            { topic: "AI Tools Revolution", angle: "Hands-on comparison of the latest tools with real workflow demos", potential: "High search volume + practical value = high retention" },
            { topic: "Productivity System Overhaul", angle: "Show the 'after dark' reality of popular productivity methods", potential: "Contrarian take drives engagement and comments" },
            { topic: "Behind the Scenes of Success", angle: "Raw, unfiltered look at what it really takes - including failures", potential: "Authenticity is trending, relatability drives shares" },
            { topic: "2024 Predictions That Came True", angle: "Analyzing what worked and what flopped with data", potential: "Year-end content performs well, timely and searchable" },
            { topic: "The Anti-Hustle Movement", angle: "Sustainable success strategies that actually work long-term", potential: "Counter-culture content performs well with engaged audience" }
        ]);
    }

    if (lowerPrompt.includes("calendar") || lowerPrompt.includes("content plan")) {
        const days = [];
        const content = [
            { title: "The Complete Beginner's Guide", type: "Tutorial" },
            { title: "5 Mistakes I Made (So You Don't Have To)", type: "Tips" },
            { title: "Day in My Life + Q&A", type: "Vlog" },
            { title: "Quick Tips Under 60 Seconds", type: "Short" },
            { title: "Tool Review: Is It Worth It?", type: "Review" },
            { title: "Reacting to Your Comments", type: "Community" },
            { title: "Advanced Techniques Deep Dive", type: "Tutorial" }
        ];

        for (let i = 1; i <= 30; i++) {
            const item = content[(i - 1) % content.length];
            days.push({
                day: i,
                title: `${item.title} ${Math.ceil(i / 7) > 1 ? `(Part ${Math.ceil(i / 7)})` : ''}`,
                type: item.type
            });
        }
        return JSON.stringify(days);
    }

    if (lowerPrompt.includes("a/b") || lowerPrompt.includes("compare title")) {
        return JSON.stringify({
            titleA: { score: 72, analysis: "Good emotional appeal with curiosity element. Could benefit from more specific numbers or timeframes. Keywords present but not front-loaded." },
            titleB: { score: 84, analysis: "Strong CTR potential with clear value proposition. Good use of power words and specificity. Well-optimized length and keyword placement." },
            winner: "B",
            suggested: "The 30-Day Strategy That Changed Everything About My Results (Step-by-Step)"
        });
    }

    if (lowerPrompt.includes("thumbnail") && lowerPrompt.includes("prompt")) {
        return JSON.stringify([
            "Professional YouTube thumbnail, confident person with excited surprised expression looking at camera with wide eyes and open mouth, hands raised in amazement gesture, vibrant gradient background transitioning from electric blue to hot pink, dramatic studio lighting with rim light, rule of thirds composition, photorealistic, 8K ultra HD, cinematic color grading, high contrast, no text no words no letters, professional photography",
            "Cinematic YouTube thumbnail, close-up dramatic face shot showing intense focused expression with furrowed brow and determined eyes, moody dark background with subtle neon accent lighting, film grain texture, movie poster quality, volumetric lighting with dramatic shadows, centered composition, photorealistic portrait photography style, 8K detailed, no text no words no letters, Hollywood quality",
            "Clean minimal YouTube thumbnail, professional presenter in modern bright studio environment, warm friendly sincere expression with slight smile, clean white background with soft gradient, even flattering lighting setup, shallow depth of field with bokeh, professional headshot quality, trust-building aesthetic, minimal clean composition, 8K sharp details, no text no words no letters",
            "High-energy YouTube thumbnail, dynamic action pose with person leaning forward pointing at camera, explosion of colorful geometric shapes and light rays in background, vibrant saturated colors with yellow orange and red palette, dutch angle dynamic composition, motion blur on background elements, sharp focus on subject, energetic and exciting mood, 8K render, no text no words no letters",
            "Creative artistic YouTube thumbnail, person silhouette with glowing outline against dramatic sunset sky with clouds, golden hour warm lighting, epic wide landscape composition, cinematic aspect ratio feel, lens flare effects, inspirational aspirational mood, professional landscape photography style, atmospheric and dreamlike, 8K ultra detailed, no text no words no letters"
        ]);
    }

    if (lowerPrompt.includes("sponsorship") || lowerPrompt.includes("estimate")) {
        return JSON.stringify({
            lowEstimate: 450,
            highEstimate: 850,
            currency: "USD",
            explanation: "Based on the Tech niche average of $18-$34 CPM. Your high engagement rate suggests you can command the upper end of this range.",
            pitchTip: "Highlight your audience retention metrics in your media kit - brands pay a premium for 'sticky' viewers."
        });
    }

    return "Generated content will appear here when AI_API_KEY is configured.";
}
