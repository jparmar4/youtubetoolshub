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
    titleGenerator: (topic: string, tone: string, language: string) => `
# Task: Generate 10 Viral YouTube Titles

## Your Role
You are a world-class YouTube content strategist who has helped channels grow from 0 to 10M+ subscribers. You understand what makes titles irresistible to click while remaining authentic and trustworthy.

## Input
- **Video Topic**: "${topic}"
- **Tone/Style**: ${tone}
- **Language**: ${language}

## Critical Rules for Natural, Human-Sounding Titles

### DO:
- Write like a real person, not AI - use casual, conversational language
- Include specific numbers (3, 7, 21, 100) instead of generic terms
- Use lowercase strategically for authenticity (not everything CAPITALIZED)
- Add personal touches: "I", "My", "How I", "What happened when I"
- Use contractions naturally: "I'm", "Don't", "Can't", "Here's"
- Include relatable scenarios viewers experience
- Front-load the main benefit or hook
- Use curiosity gaps that make people NEED to click
- Match the exact ${language} language style and cultural nuances

### DON'T:
- Sound robotic or overly formal
- Use cliché AI phrases like "In this video", "Ultimate guide", "Everything you need to know"
- Make every word capitalized
- Be obviously clickbait that won't deliver
- Use generic filler words
- Exceed 60 characters when possible

## Title Formulas That Convert (Pick various ones):
1. **Personal Story**: "I [did X] for [time] – Here's What Happened"
2. **Contrarian**: "Stop Doing [common thing] (Do This Instead)"
3. **Mistake-Based**: "[Number] [Topic] Mistakes That Are Costing You"
4. **Secret Reveal**: "The [Topic] Trick Nobody Tells You About"
5. **Transformation**: "From [Bad State] to [Good State] in [Time]"
6. **Challenge**: "I Tried [X] for [Time] – Honest Review"
7. **Why Question**: "Why [Successful People/Thing] Always [Do X]"
8. **Hot Take**: "[Popular Opinion] is Wrong. Here's Why"
9. **Emotional**: "The Real Reason You're [Problem] (It's Not What You Think)"
10. **Practical How-To**: "How to [Achieve X] (Step-by-Step)"

## Output Format
Return ONLY a valid JSON array of exactly 10 title strings in ${language}.
Each title must feel like it was written by a successful YouTuber, not an AI.

["Title 1", "Title 2", "Title 3", ...]`,

    descriptionGenerator: (topic: string, videoType: string, includeCTA: boolean) => `
# Task: Write a YouTube Description That Sounds 100% Human

## Your Role
You are a successful YouTuber who writes descriptions that feel personal, authentic, and engaging. Your descriptions read like a friend recommending a video, not a robot generating content.

## Input
- **Video Topic**: "${topic}"
- **Video Type**: ${videoType}
- **Include CTA**: ${includeCTA ? 'Yes' : 'No'}

## CRITICAL: How to Sound Human, Not AI

### DO THIS:
- Write casually like you're texting a friend about your video
- Use "I", "you", "we" naturally throughout  
- Start with excitement or a personal hook, not generic phrases
- Include natural imperfections (casual grammar is OK)
- Use contractions: "you'll", "I've", "don't", "here's"
- Add personal touches: "honestly", "trust me", "real talk"
- Make timestamps feel conversational, not robotic
- Use emojis sparingly and authentically (2-4 max per section)

### NEVER DO THIS:
- Start with "In this video" or "Welcome to my channel"
- Use phrases like "comprehensive guide" or "everything you need to know"
- Sound like a commercial or press release
- Use overly perfect grammar everywhere
- Add emojis to every single line
- Use "embark on a journey" or other AI clichés
- Sound like you're trying too hard to be professional

## Structure (Make It Feel Natural):

### 1. Opening Hook (2-3 lines)
Write like you're excited to share something with a friend.
Examples:
- "Okay so I finally figured out why [problem] happens..."
- "This changed everything for me and I had to share"
- "Real talk – if you're struggling with [topic], watch this"

### 2. What's In This Video (3-4 lines)
Casually explain what they'll learn. Be specific but conversational.
- Don't list features, tell them what they'll GET from watching
- Mention something unexpected or a "secret" you share

### 3. Timestamps
Format them naturally:
0:00 intro (or skip to 1:30 if you know the basics)
1:30 the thing everyone gets wrong
3:45 my actual process
6:00 the results + what surprised me

### 4. Quick Takeaways (4-5 bullets)
Use casual bullet points, not formal lists:
→ The one thing that actually matters
→ Why most people overcomplicate this
→ What I'd do differently (learned this the hard way)

### 5. Links & Resources
Keep it simple:
"Stuff I mentioned:"
[Link placeholder]
[Link placeholder]

"Find me here:"
IG: [placeholder]
Twitter: [placeholder]

### 6. CTA ${includeCTA ? '(Natural, not pushy)' : '(Skip)'}
${includeCTA ? `Sound genuine:
- "If this helped, a like would mean a lot 👍"
- "Subscribe if you want more of this kind of content"
- "Drop a comment – I actually read them all"` : ''}

### 7. Hashtags (5-7 max)
Mix specific + broad, placed at the very end

## Output Format
Return a JSON object with this structure:
{
  "description": {
    "hook": "Your natural opening hook",
    "video_summary": "Casual explanation of what's in the video",
    "timestamps": ["0:00 intro", "1:30 section name", ...],
    "key_points": ["→ Point 1", "→ Point 2", ...],
    "resources_links": "Stuff I mentioned section + social links",
    "call_to_action": "${includeCTA ? 'Natural CTA' : ''}",
    "hashtags": "#Tag1 #Tag2 #Tag3..."
  }
}

Make it sound like a real person wrote this while excited about their video!`,

    tagGenerator: (topic: string, niche?: string) => `
# Task: Generate Winning YouTube Tags That Actually Rank

## Your Role
You are a YouTube SEO expert who has helped videos get millions of views through strategic tagging. You understand how YouTube's algorithm discovers and recommends content.

## Input
- **Video Topic**: "${topic}"
${niche ? `- **Content Niche**: ${niche}` : ''}

## YouTube Tag Strategy (What Actually Works in 2024)

### The Science of YouTube Tags:
1. **First 3 tags matter most** - YouTube weights them heavily
2. **Mix of broad + specific** - Cast wide net, catch specific audience
3. **Match search intent** - What would someone TYPE to find this?
4. **Include your title keywords** - Reinforces relevance
5. **Use what competitors rank for** - Proven to work

### Tag Categories to Generate:

**🎯 Primary Keywords (3-5 tags)**
- Exact phrase someone would search
- Your video title keywords
- The main topic in different phrasings

**🔍 Search Query Tags (8-10 tags)**
- "how to [topic]"
- "[topic] tutorial"  
- "[topic] for beginners"
- "[topic] tips"
- "[topic] 2024" / "[topic] 2025"
- "best [topic]"
- "[topic] guide"
- "learn [topic]"

**🏷️ Broad Category Tags (5-7 tags)**
- Single words that describe the niche
- General category terms
- Related topic areas

**🔥 Trending & Viral Tags (5-8 tags)**
- Current trending formats
- Popular creator styles
- Viral search patterns
- Seasonal/timely variations

**💡 Long-Tail Specific Tags (8-10 tags)**
- Very specific 4-6 word phrases
- Problem + solution format
- "why [common problem] and how to fix it"
- "[topic] for [specific audience]"
- Comparison tags: "[thing] vs [thing]"

## Critical Rules:
- NO hashtag symbols (#) - just plain text
- Keep individual tags under 30 characters when possible
- Total tags should be 25-35
- Lowercase is fine (YouTube normalizes)
- Include common misspellings only if major
- Mirror what successful similar videos use

## Output Format
Return ONLY valid JSON:
{
  "primaryTags": ["most important tag 1", "main tag 2", "core tag 3"],
  "searchTags": ["how to topic", "topic tutorial", "topic for beginners", ...],
  "broadTags": ["category", "niche", "related area", ...],
  "trendingTags": ["topic 2024", "viral format", ...],
  "longTailTags": ["specific longer phrase for targeting", ...]
}

Generate tags that a successful YouTuber would actually use - practical, searchable, and strategic.`,

    videoIdeasGenerator: (niche: string, level: string) => `
You are a viral YouTube strategist. Generate 10 video ideas for: "${niche}" (${level} audience).

RULES FOR TITLES:
- Sound like a real YouTuber, NOT like AI wrote them
- Create instant curiosity - viewer MUST click
- Use lowercase naturally, not Title Case Everything
- Include specific numbers/timeframes when relevant
- Be conversational, like texting a friend about a video idea

GOOD EXAMPLES:
- "I wasted $2000 on this (so you don't have to)"
- "Why I stopped doing what everyone recommends"  
- "The thing nobody tells beginners about [niche]"
- "I tried this for 30 days - here's what actually happened"
- "Stop doing this immediately (it's killing your results)"

BAD EXAMPLES (never write like this):
- "Ultimate Guide to [Topic]"
- "Everything You Need to Know About [Topic]"
- "Top 10 Tips and Tricks for [Topic]"
- "Master the Art of [Topic]"
- "Complete Tutorial: How to [Topic]"

VARIETY - Include mix of:
- 2 personal experiments/challenges
- 2 controversial hot takes
- 2 mistake/warning videos
- 2 behind-the-scenes/real process
- 2 comparison/honest reviews

OUTPUT: Return ONLY a JSON array. No markdown, no explanation.
[
  {"title": "video title here", "concept": "one sentence describing the angle"},
  ...10 total
]`,

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
# Task: Generate Click-Worthy Thumbnail Text

## Input Details
- **Topic**: "${topic}"
- **Visual Style**: ${style}
- **Target Emotion**: ${emotion}

## Requirements
Generate 8 punchy thumbnail text options. Each must:

1. **Length**: 2-5 words MAXIMUM (readable at small size)
2. **Impact**: Create instant curiosity or emotional response
3. **Contrast**: Work well as overlay text on images
4. **No Repetition**: Each option uses different words/approach

## Proven Patterns
- Question starters: "WHY?", "HOW?"
- Outcome focused: "I QUIT", "IT WORKED"
- Shock value: "SHOCKING", "BANNED"
- Numbers: "10X FASTER", "$100K"
- Challenge: "DON'T DO THIS"
- Mystery: "THE TRUTH", "REVEALED"

## Output Format
Return ONLY valid JSON array of 8 strings:
["TEXT 1", "TEXT 2", ...]`,

    channelNameGenerator: (niche: string, tone: string) => `
You're a branding expert who has named successful YouTube channels. Generate 15 unique channel name ideas for: "${niche}" with ${tone} vibe.

WHAT MAKES A GREAT CHANNEL NAME:
- Says it once, remember it forever
- Easy to spell when heard out loud
- Looks good as @handle
- Works as you grow bigger
- Available on socials (avoid common words)

NAMING STYLES TO MIX:

1. **Personal Brand** (3 names)
   - FirstName + Niche: "Mike Cooks", "Anna Draws"
   - The [Niche] + Title: "The Tech Teacher", "The Plant Dad"
   
2. **Creative Compound** (3 names)
   - Two words merged: "CodeCraft", "FitFusion", "ArtSpark"
   - Unexpected combos: "NerdNest", "GlowGrind"
   
3. **Action Words** (3 names)
   - Verb + Niche: "UnboxDaily", "LearnWithMe", "BuildIt"
   
4. **Abstract/Cool** (3 names)
   - Sounds modern: "Lumino", "Vextra", "Zenly"
   - Mysterious but memorable
   
5. **Descriptive** (3 names)
   - Clear what you do: "5-Minute Crafts style", "Daily Dose of X"
   - Niche-specific names

AVOID:
- Numbers unless meaningful (avoid random 123)
- Hard to spell words
- Names that limit growth
- Anything close to existing big channels
- Underscores (hard to say out loud)

OUTPUT: Return ONLY a JSON object with categories:
{
  "personalBrand": ["Name1", "Name2", "Name3"],
  "creativeCompound": ["Name1", "Name2", "Name3"],
  "actionBased": ["Name1", "Name2", "Name3"],
  "abstractCool": ["Name1", "Name2", "Name3"],
  "descriptive": ["Name1", "Name2", "Name3"]
}`,

    hashtagGenerator: (topic: string) => `
# Task: Generate Strategic YouTube Hashtags

## Input Details
- **Topic**: "${topic}"

## Requirements
Generate hashtags in two categories:

### Broad Hashtags (10)
- High-volume, discoverable tags
- Category-level hashtags
- Platform hashtags (#YouTube, #Shorts if relevant)

### Specific Hashtags (10)
- Niche-specific tags
- Long-tail variations
- Trending topic tags
- Community hashtags

## Rules
- Include # symbol
- No spaces in hashtags
- Mix of capitalization for readability
- Include year-specific if relevant (#2024)

## Output Format
Return ONLY valid JSON:
{
  "broad": ["#Hashtag1", "#Hashtag2", ...],
  "specific": ["#SpecificTag1", "#SpecificTag2", ...]
}`,

    introScriptGenerator: (topic: string, personality: string, length: string) => `
Write a YouTube video intro script for: "${topic}"

STYLE: ${personality} personality, ${length} length

STRUCTURE (use this exact format):

---
🎬 HOOK (0-3 seconds)
[Write 1-2 punchy sentences that stop the scroll - question, shocking statement, or bold claim]

📍 CONTEXT (3-8 seconds)  
[What this video is about and why it matters to the viewer]

✨ PROMISE (8-15 seconds)
[What they'll learn or achieve by watching - be specific]

➡️ TRANSITION (15-${length === "20-30 seconds" ? "30" : "20"} seconds)
[Smooth lead into the main content - something like "Let's dive in" or "Here's what you need to know"]
---

RULES:
- Write conversationally, like talking to a friend
- Use "you" and "your" to address the viewer directly
- Short sentences, easy to read out loud
- Match the ${personality} energy throughout
- NO JSON, NO code blocks - just the script text
- Include timing markers like [pause] or [emphasize] if helpful

Write the complete intro script now, ready to read out loud:`,

    titleABTester: (titleA: string, titleB: string, context?: string) => `
# Task: Analyze and Compare YouTube Titles

## Titles to Compare
- **Title A**: "${titleA}"
- **Title B**: "${titleB}"
${context ? `- **Context**: ${context}` : ''}

## Analysis Criteria (Score 0-100 for each)

### 1. CTR Potential
- Curiosity gap strength
- Emotional trigger effectiveness
- Value proposition clarity

### 2. SEO Optimization
- Keyword placement
- Search intent match
- Character length optimization

### 3. Clarity & Accuracy
- Content expectation setting
- Specificity level
- Avoid clickbait risk

### 4. Emotional Appeal
- Power word usage
- Urgency/FOMO elements
- Aspiration triggers

## Output Format
Return ONLY valid JSON:
{
  "titleA": {
    "score": 0-100,
    "analysis": "Detailed analysis with strengths and weaknesses"
  },
  "titleB": {
    "score": 0-100,
    "analysis": "Detailed analysis with strengths and weaknesses"
  },
  "winner": "A or B",
  "suggested": "An improved title combining best elements of both"
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

    return "Generated content will appear here when AI_API_KEY is configured.";
}
