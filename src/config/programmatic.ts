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
    }
];

export const programmaticTools = [
    "youtube-tag-generator",
    "youtube-title-generator",
    "youtube-description-generator",
    "youtube-hashtag-generator",
    "youtube-video-ideas-generator"
];

export const getNicheContent = (toolName: string, niche: Niche) => {
    return {
        title: `${toolName} for ${niche.name} Channels`,
        description: `Generate optimized ${toolName.toLowerCase().replace("youtube ", "")} specifically for ${niche.name} videos. tailored for ${niche.keywords.join(", ")}.`,
        content: [
            {
                title: `Why use a ${toolName} for ${niche.name}?`,
                content: `${niche.name} is a competitive niche. To rank for terms like "${niche.examples[0]}" or "${niche.examples[1]}", you need precise optimization. Our tool understands the specific vocabulary of the ${niche.name} community.`
            },
            {
                title: `Best practices for ${niche.name} Metadata`,
                content: `When creating content about ${niche.description}, focus on high-intent keywords. For example, instead of just "${niche.keywords[0]}", target long-tail phrases like "best ${niche.keywords[0]} for beginners".`
            }
        ]
    };
};
