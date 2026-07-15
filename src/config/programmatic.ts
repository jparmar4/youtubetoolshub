export interface Niche {
    id: string;
    name: string;
    keywords: string[];
    description: string;
    examples: string[];
}

export const niches: Niche[] = [
    {
        id: "gaming",
        name: "Gaming",
        keywords: ["gaming", "gameplay", "walkthrough", "let's play", "esports", "streamer"],
        description: "video games, esports, and gaming culture",
        examples: ["Minecraft", "Roblox", "Fortnite", "Call of Duty", "GTA V"]
    },
    {
        id: "vlog",
        name: "Vlogging",
        keywords: ["vlog", "daily vlog", "lifestyle", "travel", "family", "day in the life"],
        description: "personal life, travel, and daily experiences",
        examples: ["Travel Vlog", "Daily Routine", "Family Trip", "Room Tour"]
    },
    {
        id: "tech",
        name: "Tech & Reviews",
        keywords: ["tech review", "unboxing", "gadgets", "tutorial", "software", "coding"],
        description: "technology, gadgets, and software reviews",
        examples: ["iPhone Review", "Coding Tutorial", "PC Build", "Software Demo"]
    },
    {
        id: "education",
        name: "Education",
        keywords: ["education", "tutorial", "how to", "lesson", "course", "study"],
        description: "educational content, tutorials, and lessons",
        examples: ["Math Lesson", "History Documentary", "Science Experiment", "Language Learning"]
    },
    {
        id: "fitness",
        name: "Fitness & Health",
        keywords: ["fitness", "workout", "gym", "health", "diet", "yoga"],
        description: "workouts, health tips, and nutrition",
        examples: ["Home Workout", "Yoga Routine", "Healthy Meal Prep", "Weight Loss Journey"]
    },
    {
        id: "beauty",
        name: "Beauty & Fashion",
        keywords: ["makeup", "fashion", "style", "beauty", "skincare", "haul"],
        description: "makeup, fashion trends, and skincare",
        examples: ["Makeup Tutorial", "Clothing Haul", "Outfit Ideas", "Skincare Routine"]
    },
    {
        id: "cooking",
        name: "Cooking & Food",
        keywords: ["cooking", "recipe", "food", "kitchen", "baking", "street food"],
        description: "recipes, cooking tips, and food reviews",
        examples: ["Easy Recipe", "Street Food Tour", "Cake Decorating", "Meal Prep"]
    },
    {
        id: "finance",
        name: "Finance & Business",
        keywords: ["finance", "investing", "stock market", "crypto", "business", "money"],
        description: "personal finance, investing, and business tips",
        examples: ["Stock Market Update", "Crypto News", "Budgeting Tips", "Passive Income"]
    },
    {
        id: "asmr",
        name: "ASMR & Relaxation",
        keywords: ["asmr", "relaxation", "sleep", "triggers", "whispering", "satisfying"],
        description: "audio-visual relaxation triggers and sleep aid",
        examples: ["Sleep Triggers", "Tapping Sounds", "Roleplay ASMR", "Soft Spoken"]
    },
    {
        id: "diy",
        name: "DIY & Crafts",
        keywords: ["diy", "crafts", "homemade", "tutorial", "life hacks", "art"],
        description: "do-it-yourself projects, crafts, and life hacks",
        examples: ["Room Decor DIY", "Paper Crafts", "Life Hacks", "Pottery"]
    },
    {
        id: "music",
        name: "Music & Production",
        keywords: ["music", "production", "covers", "original song", "beat making", "instrumental"],
        description: "music videos, covers, and production tutorials",
        examples: ["Piano Cover", "Beat Making", "Song Release", "Music Theory"]
    },
    {
        id: "pets",
        name: "Pets & Animals",
        keywords: ["pets", "dogs", "cats", "animal care", "pet training", "veterinary"],
        description: "pet care, animal training, and adorable animal content",
        examples: ["Dog Training Tips", "Cat Behavior", "Pet Grooming", "Exotic Pets"]
    },
    {
        id: "travel",
        name: "Travel & Adventure",
        keywords: ["travel", "adventure", "backpacking", "tourism", "travel tips", "destination"],
        description: "travel vlogs, destination guides, and adventure content",
        examples: ["Thailand Travel", "Europe Backpacking", "Budget Travel", "Luxury Resort Review"]
    },
    {
        id: "motivation",
        name: "Motivation & Self-Help",
        keywords: ["motivation", "self-improvement", "productivity", "mindset", "success", "habits"],
        description: "personal development, motivation, and productivity",
        examples: ["Morning Routine", "Goal Setting", "Time Management", "Success Habits"]
    },
    {
        id: "parenting",
        name: "Parenting & Family",
        keywords: ["parenting", "baby", "family", "kids", "motherhood", "fatherhood"],
        description: "parenting advice, family activities, and child development",
        examples: ["Baby Care Tips", "Toddler Activities", "Family Vacation", "Homeschooling"]
    },
    {
        id: "sports",
        name: "Sports & Athletics",
        keywords: ["sports", "football", "basketball", "soccer", "training", "highlights"],
        description: "sports analysis, training, and highlights",
        examples: ["NBA Highlights", "Soccer Training", "Gym Workout", "Marathon Prep"]
    },
    {
        id: "comedy",
        name: "Comedy & Entertainment",
        keywords: ["comedy", "funny", "sketch", "prank", "stand-up", "entertainment"],
        description: "comedy sketches, pranks, and entertainment",
        examples: ["Funny Skit", "Prank Video", "Reaction Video", "Comedy Roast"]
    },
    {
        id: "real-estate",
        name: "Real Estate & Property",
        keywords: ["real estate", "property", "house tour", "home buying", "investing", "renovation"],
        description: "real estate investing, home tours, and property advice",
        examples: ["House Tour", "First Home Tips", "Property Investment", "Home Renovation"]
    },
    {
        id: "cars",
        name: "Cars & Automotive",
        keywords: ["cars", "automotive", "car review", "supercar", "modification", "racing"],
        description: "car reviews, modifications, and automotive content",
        examples: ["Car Review", "Supercar Test Drive", "DIY Car Mod", "Drag Race"]
    },
    {
        id: "photography",
        name: "Photography & Videography",
        keywords: ["photography", "videography", "camera", "editing", "filmmaking", "drone"],
        description: "photography tips, video production, and creative filmmaking",
        examples: ["Photo Editing", "Cinematic B-Roll", "Drone Footage", "Portrait Tips"]
    }
];

export const programmaticTools = [
    "youtube-tag-generator",
    "youtube-title-generator",
    "youtube-description-generator",
    "youtube-hashtag-generator",
    "youtube-video-ideas-generator",
    "youtube-intro-script-generator",
    "youtube-content-calendar-generator",
    "youtube-channel-name-generator",
    "youtube-ai-thumbnail-prompt",
    "youtube-thumbnail-generator"
];

export const getNicheContent = (toolName: string, niche: Niche) => {
    const shortTool = toolName.replace(/^YouTube\s+/i, "");
    const exampleList = niche.examples.slice(0, 4).join(", ");
    const keywordList = niche.keywords.slice(0, 5).join(", ");

    return {
        title: `${toolName} for ${niche.name} Channels (Free)`,
        description: `Free ${shortTool.toLowerCase()} built for ${niche.name} YouTube channels. Optimize for ${keywordList} and ideas like ${niche.examples[0]} — no signup required.`,
        content: [
            {
                title: `What is a ${toolName} for ${niche.name}?`,
                content: `A ${shortTool.toLowerCase()} for ${niche.name} creators helps you draft niche-specific outputs faster. Instead of generic suggestions, you can seed the tool with ${niche.name.toLowerCase()} language around ${keywordList}, then refine the result before publishing.`,
            },
            {
                title: `Why ${niche.name} channels need specialized metadata`,
                content: `${niche.name} is competitive on YouTube. Viewers searching for "${niche.examples[0]}" or "${niche.examples[1] || niche.examples[0]}" compare many results. Clear titles, tags, descriptions, and packaging that match ${niche.description} improve click-through and relevance without keyword stuffing.`,
            },
            {
                title: `How to use this free ${shortTool.toLowerCase()} for ${niche.name}`,
                content: `1) Open the tool above and enter a ${niche.name.toLowerCase()} topic (examples: ${exampleList}). 2) Generate draft output in one click. 3) Edit for accuracy, policy compliance, and your brand voice. 4) Paste into YouTube Studio and track CTR / retention. Review every AI draft — never publish unedited claims.`,
            },
            {
                title: `Keyword ideas for ${niche.name} creators`,
                content: `Start with primary terms like "${niche.keywords[0]}" and expand into long-tail phrases such as "best ${niche.keywords[0]} for beginners", "${niche.keywords[1] || niche.keywords[0]} tutorial", and "${niche.examples[0]} explained". Pair searchable phrases with a clear thumbnail promise so search intent matches the video.`,
            },
            {
                title: `${niche.name} content tips that work with this tool`,
                content: `Keep packaging honest: the title and thumbnail should reflect the actual video. For ${niche.name}, specificity beats vague hype — name the game, product, lesson, or outcome. Use this ${shortTool.toLowerCase()} for drafts, then validate wording against your audience and YouTube's community guidelines.`,
            },
        ],
        faqs: [
            {
                question: `Is this ${toolName} free for ${niche.name} creators?`,
                answer: `Yes. You can use this ${shortTool.toLowerCase()} for ${niche.name} channel workflows free in your browser. Some AI features may have daily usage limits.`,
            },
            {
                question: `What topics work best for ${niche.name}?`,
                answer: `Strong starting points include ${exampleList}. Combine one clear outcome with a niche keyword so viewers know exactly what they will learn or watch.`,
            },
            {
                question: `Can I use the output directly on YouTube?`,
                answer: `Treat generated text as a draft. Edit for accuracy, remove anything misleading, and make sure tags and titles match your video. You remain responsible for what you publish.`,
            },
        ],
    };
};
