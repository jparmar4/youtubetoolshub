// Tools Registry - All tools defined in one place for easy management

import {
    FaImage, FaMagic, FaRocket,
    FaHeading, FaAlignLeft, FaTags, FaSearch,
    FaLightbulb, FaChartLine, FaCalendarAlt,
    FaDollarSign, FaChartBar, FaBalanceScale,
    FaUser, FaHashtag, FaMicrophone, FaIdCard, FaListUl,
    FaTrophy
} from "react-icons/fa";
import { IconType } from "react-icons";

export interface Tool {
    slug: string;
    name: string;
    description: string;
    shortDescription: string;
    category: string;
    icon: IconType;
    isAI: boolean;
    isFeatured?: boolean;
    keywords: string[];
    content?: { title: string; content: string }[];
    faqs?: { question: string; answer: string }[];
    howTo?: {
        name: string;
        description: string;
        steps: { name: string; text: string }[];
        totalTime?: string;
    };
}

export const toolCategories = [
    { id: "thumbnail-media", name: "Thumbnail & Media Tools", description: "Download and create stunning thumbnails" },
    { id: "seo-metadata", name: "SEO & Metadata Tools", description: "Optimize your videos for search" },
    { id: "channel-growth", name: "Channel Research & Growth", description: "Grow your channel with AI insights" },
    { id: "analytics-earnings", name: "Analytics & Earnings", description: "Track and calculate your earnings" },
    { id: "utility-fun", name: "Utility & Fun Tools", description: "Useful tools for creators" },
];

export const tools: Tool[] = [
    // Thumbnail & Media Tools
    {
        slug: "youtube-thumbnail-downloader",
        name: "YouTube Thumbnail Downloader",
        description: "Download high-quality thumbnails from any YouTube video. Get all resolutions including HD and SD versions.",
        shortDescription: "Download thumbnails from any YouTube video",
        category: "thumbnail-media",
        icon: FaImage,
        isAI: false,
        isFeatured: true,
        keywords: ["youtube thumbnail downloader", "download youtube thumbnail", "youtube thumbnail saver", "get youtube thumbnail", "hd thumbnail downloader"],
        content: [
            {
                title: "What is a YouTube Thumbnail Downloader?",
                content: "A YouTube Thumbnail Downloader is a free online tool that allows you to save the thumbnail image from any YouTube video in high quality. It's essential for creators who need to recover their own thumbnails, create archives, or use thumbnails for reference and inspiration."
            },
            {
                title: "Why Download High-Quality Thumbnails?",
                content: "High-quality thumbnails (HD 1280x720) are crucial for analysis and reuse. Low-resolution images look professional and pixelated. Our tool ensures you get the highest resolution available (Max Res) directly from YouTube's servers."
            }
        ],
        howTo: {
            name: "How to Download a YouTube Thumbnail",
            description: "Follow these simple steps to download any YouTube video thumbnail in seconds.",
            steps: [
                { name: "Copy Video URL", text: "Go to YouTube, find the video you want, and copy its URL from the address bar or share button." },
                { name: "Paste and Search", text: "Paste the URL into our tool's search box above and click the 'Get Thumbnail' button." },
                { name: "Select Resolution", text: "Choose your desired resolution (HD, SD, or Normal) and click 'Download' to save the image to your device." }
            ],
            totalTime: "PT1M"
        },
        faqs: [
            {
                question: "Is it legal to download YouTube thumbnails?",
                answer: "Yes, it is legal to download thumbnails for fair use purposes, such as reference, criticism, or personal archiving. However, you should not use someone else's thumbnail as your own without permission, as copyright laws apply."
            },
            {
                question: "What is the highest quality thumbnail available?",
                answer: "The highest quality is usually 'Max Res' (1920x1080 or 1280x720), depending on what the creator uploaded. Our tool automatically fetches the highest resolution available."
            },
            {
                question: "Does this tool work on mobile?",
                answer: "Yes! Our YouTube Thumbnail Downloader works perfectly on all devices, including iPhones, Android phones, tablets, and desktop computers."
            }
        ]
    },
    {
        slug: "youtube-thumbnail-generator",
        name: "YouTube Thumbnail Text Generator",
        description: "Generate catchy thumbnail text ideas using AI. Get punchy, clickable text suggestions for your video thumbnails.",
        shortDescription: "AI-powered thumbnail text ideas",
        category: "thumbnail-media",
        icon: FaMagic,
        isAI: true,
        isFeatured: true,
        keywords: ["youtube thumbnail text", "thumbnail text generator", "catchy thumbnail text", "thumbnail ideas", "ai thumbnail text"],
    },
    {
        slug: "youtube-ai-thumbnail-generator",
        name: "AI Thumbnail Image Generator",
        description: "Generate stunning thumbnail images with AI. Just describe what you want and get a unique, professional thumbnail in seconds.",
        shortDescription: "Generate thumbnail images with AI",
        category: "thumbnail-media",
        icon: FaImage,
        isAI: true,
        isFeatured: true,
        keywords: ["ai thumbnail generator", "youtube thumbnail creator", "ai image generator for youtube", "custom thumbnail maker", "generate youtube thumbnails"],
    },
    {
        slug: "youtube-ai-thumbnail-prompt",
        name: "AI Thumbnail Prompt Generator",
        description: "Generate professional AI prompts for stunning YouTube thumbnails. Works with DALL-E, Midjourney, Stable Diffusion, and any AI image generator.",
        shortDescription: "Create perfect AI image prompts",
        category: "thumbnail-media",
        icon: FaRocket,
        isAI: true,
        isFeatured: true,
        keywords: ["ai prompt generator", "midjourney prompts for thumbnails", "dall-e thumbnail prompts", "stable diffusion prompts", "thumbnail art prompt"],
    },

    // SEO & Metadata Tools
    {
        slug: "youtube-title-generator",
        name: "YouTube Title Generator",
        description: "Generate SEO-optimized, clickable YouTube titles using AI. Choose from different tones and languages.",
        shortDescription: "AI-generated SEO titles",
        category: "seo-metadata",
        icon: FaHeading,
        isAI: true,
        isFeatured: true,
        keywords: ["youtube title generator", "video title maker", "clickbait title generator", "catchy youtube titles", "seo title generator"],
        content: [
            {
                title: "Generate Viral YouTube Titles with AI",
                content: "Your video title is the most important factor in your Click-Through Rate (CTR). Our AI YouTube Title Generator analyzes millions of successful videos to create catchy, SEO-optimized titles that get views. Stop guessing and start ranking."
            },
            {
                title: "How It Works",
                content: "We use advanced Natural Language Processing (NLP) models tuned specifically for YouTube algorithms. Whether you need a clickbait-style title (for entertainment) or an SEO-focused title (for tutorials), our AI understands the nuance."
            }
        ],
        howTo: {
            name: "How to Generate Catchy YouTube Titles",
            description: "Create punchy, high-CTR titles in 3 simple steps.",
            steps: [
                { name: "Enter Topic", text: "Type a few words about your video's topic or paste your keyword (e.g., 'vegan cooking', 'iPhone review')." },
                { name: "Choose Vibe", text: "Select the tone you want: 'Clickbait', 'Professional', 'Funny', or 'Educational'." },
                { name: "Generate & Pick", text: "Click 'Generate' to get 10+ unique title variations. Click any title to copy it instantly." }
            ],
            totalTime: "PT2M"
        },
        faqs: [
            {
                question: "How long should a YouTube title be?",
                answer: "The optimal length for a YouTube title is 60 characters or less. This ensures the full title is visible in search results and suggested video sidebaars without being cut off."
            },
            {
                question: "Do keywords in titles still matter?",
                answer: "Yes! Placing your main keyword near the beginning of the title helps YouTube's algorithm understand your video's topic and rank it for relevant search terms."
            },
            {
                question: "Should I use clickbait titles?",
                answer: "You should use 'curiosity gaps' (smart clickbait) rather than misleading clickbait. The title must deliver on its promise, or viewers will click away, hurting your retention and rankings."
            }
        ]
    },
    {
        slug: "youtube-description-generator",
        name: "YouTube Description Generator",
        description: "Create engaging video descriptions with AI. Includes hooks, bullet points, CTAs, and hashtags.",
        shortDescription: "AI-powered video descriptions",
        category: "seo-metadata",
        icon: FaAlignLeft,
        isAI: true,
        keywords: ["youtube description generator", "video description maker", "youtube seo description", "description template", "ai visualization generator"],
    },
    {
        slug: "youtube-tag-generator",
        name: "YouTube Tag Generator",
        description: "Generate relevant tags and keywords for your YouTube videos. Get both short and long-tail keywords.",
        shortDescription: "Generate SEO tags for videos",
        category: "seo-metadata",
        icon: FaTags,
        isAI: true,
        isFeatured: true,
        keywords: ["youtube tag generator", "video tags", "youtube keywords", "seo tags for youtube", "find best youtube tags"],
        content: [
            {
                title: "Boost Discovery with SEO Tags",
                content: "YouTube tags (keywords) help the algorithm understand your video's context. While their weight has decreased, they are still vital for misspelled queries and establishing relevance. Our tool generates 100% relevant, high-volume tags."
            }
        ],
        howTo: {
            name: "How to Generate Video Tags",
            description: "Find the best keywords for your video in seconds.",
            steps: [
                { name: "Enter Keyword", text: "Type your main video topic (e.g., 'fitness tips')." },
                { name: "Generate", text: "Click the generate button." },
                { name: "Copy & Paste", text: "Copy the list of comma-separated tags and paste them directly into your YouTube video details." }
            ],
            totalTime: "PT1M"
        },
        faqs: [
            {
                question: "How many tags should I use?",
                answer: "YouTube allows up to 500 characters for tags. We recommend using 10-15 highly relevant tags rather than stuffing irrelevant ones."
            },
            {
                question: "Do tags help with views?",
                answer: "Yes, they help YouTube categorize your content, especially when your video is new and has no view history."
            }
        ]
    },
    {
        slug: "youtube-tag-extractor",
        name: "YouTube Tag Extractor",
        description: "Extract tags from any YouTube video URL. See what keywords successful videos are using.",
        shortDescription: "Extract tags from any video",
        category: "seo-metadata",
        icon: FaSearch,
        isAI: false,
        keywords: ["youtube tag extractor", "copy youtube tags", "spy on youtube tags", "video tag finder", "get tags from video"],
    },

    // Channel Research & Growth Tools
    {
        slug: "youtube-video-ideas-generator",
        name: "YouTube Video Ideas Generator",
        description: "Get 20+ unique video ideas for your niche using AI. Perfect for content planning and avoiding creator's block.",
        shortDescription: "AI video ideas for your niche",
        category: "channel-growth",
        icon: FaLightbulb,
        isAI: true,
        keywords: ["video ideas generator", "youtube content ideas", "video topics", "what to post on youtube", "content inspiration"],
    },
    {
        slug: "youtube-trend-helper",
        name: "YouTube Trend & Topic Helper",
        description: "Discover trending topics in your niche. Get AI-powered suggestions for viral video ideas.",
        shortDescription: "Find trending topics",
        category: "channel-growth",
        icon: FaChartLine,
        isAI: true,
        keywords: ["youtube trends", "trending topics", "viral video ideas", "what is trending on youtube", "niche research"],
    },
    {
        slug: "youtube-content-calendar-generator",
        name: "Content Calendar Generator",
        description: "Generate a complete content calendar with video ideas. Plan your uploads for weeks ahead.",
        shortDescription: "Plan your content schedule",
        category: "channel-growth",
        icon: FaCalendarAlt,
        isAI: true,
        keywords: ["content calendar generator", "youtube upload schedule", "content planner", "video content plan", "social media calendar"],
    },

    // Analytics & Earnings Tools
    {
        slug: "youtube-earnings-calculator",
        name: "YouTube Earnings Calculator",
        description: "Estimate your YouTube earnings based on views and RPM. Calculate monthly and yearly revenue.",
        shortDescription: "Calculate your potential earnings",
        category: "analytics-earnings",
        icon: FaDollarSign,
        isAI: false,
        isFeatured: true,
        keywords: ["youtube earnings calculator", "how much does youtube pay", "youtube money calculator", "adsense calculator", "estimated youtube revenue"],
        content: [
            {
                title: "Calculate Your Potential YouTube Income",
                content: "Curious how much money you can make on YouTube? Our Earnings Calculator uses your daily views and estimated RPM (Revenue Per Mille) to project your monthly and yearly income."
            },
            {
                title: "What is RPM?",
                content: "RPM stands for Revenue Per Mille (thousand views). It varies by niche. Finance and Tech channels often have high RPM ($5-$20), while Vlogs or Gaming might be lower ($1-$5)."
            }
        ],
        howTo: {
            name: "How to Calculate YouTube Revenue",
            description: "Estimate your channel's earnings in 3 steps.",
            steps: [
                { name: "Enter Daily Views", text: "Input the average number of views you get per day." },
                { name: "Set RPM", text: "Adjust the RPM slider based on your niche (default is $2.00)." },
                { name: "See Results", text: "Instantly see your estimated daily, monthly, and yearly earnings." }
            ],
            totalTime: "PT1M"
        },
        faqs: [
            {
                question: "Does this calculator include sponsorship income?",
                answer: "No, this calculator only estimates AdSense revenue (ads displayed on your videos). Sponsorships and affiliate marketing are separate income streams."
            },
            {
                question: "Why is my actual revenue different?",
                answer: "Actual revenue depends on many factors like viewer location, ad blockers, and video length. This tool provides an estimate."
            }
        ]
    },
    {
        slug: "youtube-engagement-rate-calculator",
        name: "Engagement Rate Calculator",
        description: "Calculate your video's engagement rate based on views, likes, comments, and shares.",
        shortDescription: "Measure video engagement",
        category: "analytics-earnings",
        icon: FaChartBar,
        isAI: false,
        keywords: ["engagement rate calculator", "youtube engagement", "video engagement metrics", "calculate youtube engagement", "engagement analysis"],
    },
    {
        slug: "youtube-title-ab-tester",
        name: "Title A/B Score Checker",
        description: "Compare two titles and get AI scoring for click-through potential, clarity, and emotional appeal.",
        shortDescription: "Compare title effectiveness",
        category: "analytics-earnings",
        icon: FaBalanceScale,
        isAI: true,
        isFeatured: true,
        keywords: ["title ab tester", "youtube title rater", "title comparison", "best title checker", "click through rate tool"],
    },

    // Utility & Fun Tools
    {
        slug: "youtube-channel-name-generator",
        name: "Channel Name Generator",
        description: "Generate unique, memorable YouTube channel name ideas. Find the perfect name for your brand.",
        shortDescription: "Find your perfect channel name",
        category: "utility-fun",
        icon: FaUser,
        isAI: true,
        keywords: ["channel name generator", "youtube name ideas", "creative channel names", "brand name generator", "cool youtube names"],
    },
    {
        slug: "youtube-hashtag-generator",
        name: "YouTube Hashtag Generator",
        description: "Generate relevant hashtags for your YouTube videos. Get broad and specific hashtag suggestions.",
        shortDescription: "Generate video hashtags",
        category: "utility-fun",
        icon: FaHashtag,
        isAI: true,
        keywords: ["youtube hashtag generator", "video hashtags", "best hashtags for youtube", "viral hashtags", "hashtag finder"],
    },
    {
        slug: "youtube-intro-script-generator",
        name: "Intro Script Generator",
        description: "Create engaging video intro scripts with AI. Hook your viewers in the first 15-30 seconds.",
        shortDescription: "Write compelling intros",
        category: "utility-fun",
        icon: FaMicrophone,
        isAI: true,
        keywords: ["intro script generator", "youtube intro writer", "video hook generator", "script writing ai", "youtube script maker"],
    },
    {
        slug: "youtube-channel-id-finder",
        name: "YouTube Channel ID Finder",
        description: "Find the unique Channel ID (UC...) and User ID for any YouTube channel. Works with handles, channel URLs, and video links.",
        shortDescription: "Find any YouTube Channel ID",
        category: "utility-fun",
        icon: FaIdCard,
        isAI: false,
        keywords: ["channel id finder", "find youtube channel id", "get channel id", "youtube user id", "find channel id by handle"],
    },
    {
        slug: "youtube-playlist-length-calculator",
        name: "YouTube Playlist Length Calculator",
        description: "Calculate the total length of any YouTube playlist. See how long it takes to specific speeds (1.25x, 1.5x, 2x).",
        shortDescription: "Calculate playlist duration",
        category: "utility-fun",
        icon: FaListUl,
        isAI: false,
        keywords: ["playlist length calculator", "youtube playlist duration", "how long is this playlist", "video duration calculator", "playlist time"],
    },
    {
        slug: "youtube-comment-picker",
        name: "YouTube Comment Picker",
        description: "Pick a random winner for your YouTube giveaway or contest. Filter duplicates and spammers fairly.",
        shortDescription: "Pick random comment winner",
        category: "utility-fun",
        icon: FaTrophy,
        isAI: false,
        keywords: ["comment picker", "random comment winner", "youtube giveaway tool", "pick contest winner", "random youtube comment"],
    },
    {
        slug: "youtube-channel-audit",
        name: "Channel Health Auditor",
        description: "Get a comprehensive health check for your YouTube channel. Analyze your thumbnails, titles, and engagement consistency.",
        shortDescription: "Audit your channel health",
        category: "channel-growth",
        icon: FaChartBar,
        isAI: true,
        isFeatured: true,
        keywords: ["channel audit", "youtube channel checker", "channel health score", "youtube analytics tool", "audit my channel"],
        content: [
            {
                title: "What is a Channel Audit?",
                content: "A channel audit is a deep dive into your channel's performance metrics. We analyze your public data to identify strengths (what's working) and weaknesses (what needs improvement)."
            },
            {
                title: "How to Improve Your Health Score?",
                content: "To boost your score, focus on three pillars: Consistency (upload schedule), Packaging (Thumbnails/Titles), and Engagement (Replying to comments). tackling these areas usually results in immediate growth."
            }
        ],
        howTo: {
            name: "How to Audit Your Channel",
            description: "Get your channel score in seconds.",
            steps: [
                { name: "Enter Handle", text: "Type your channel handle (e.g., @YourChannel)." },
                { name: "Run Audit", text: "Click the 'Audit Channel' button to start the analysis." },
                { name: "Review Score", text: "See your overall 0-100 score and get specific actionable advice." }
            ]
        }
    },
];

export const getToolBySlug = (slug: string): Tool | undefined => {
    return tools.find(tool => tool.slug === slug);
};

export const getToolsByCategory = (categoryId: string): Tool[] => {
    return tools.filter(tool => tool.category === categoryId);
};

export const getFeaturedTools = (): Tool[] => {
    return tools.filter(tool => tool.isFeatured);
};
