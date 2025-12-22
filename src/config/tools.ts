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
    },
    {
        slug: "youtube-description-generator",
        name: "YouTube Description Generator",
        description: "Create engaging video descriptions with AI. Includes hooks, bullet points, CTAs, and hashtags.",
        shortDescription: "AI-powered video descriptions",
        category: "seo-metadata",
        icon: FaAlignLeft,
        isAI: true,
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
    },
    {
        slug: "youtube-tag-extractor",
        name: "YouTube Tag Extractor",
        description: "Extract tags from any YouTube video URL. See what keywords successful videos are using.",
        shortDescription: "Extract tags from any video",
        category: "seo-metadata",
        icon: FaSearch,
        isAI: false,
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
    },
    {
        slug: "youtube-trend-helper",
        name: "YouTube Trend & Topic Helper",
        description: "Discover trending topics in your niche. Get AI-powered suggestions for viral video ideas.",
        shortDescription: "Find trending topics",
        category: "channel-growth",
        icon: FaChartLine,
        isAI: true,
    },
    {
        slug: "youtube-content-calendar-generator",
        name: "Content Calendar Generator",
        description: "Generate a complete content calendar with video ideas. Plan your uploads for weeks ahead.",
        shortDescription: "Plan your content schedule",
        category: "channel-growth",
        icon: FaCalendarAlt,
        isAI: true,
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
    },
    {
        slug: "youtube-engagement-rate-calculator",
        name: "Engagement Rate Calculator",
        description: "Calculate your video's engagement rate based on views, likes, comments, and shares.",
        shortDescription: "Measure video engagement",
        category: "analytics-earnings",
        icon: FaChartBar,
        isAI: false,
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
    },
    {
        slug: "youtube-hashtag-generator",
        name: "YouTube Hashtag Generator",
        description: "Generate relevant hashtags for your YouTube videos. Get broad and specific hashtag suggestions.",
        shortDescription: "Generate video hashtags",
        category: "utility-fun",
        icon: FaHashtag,
        isAI: true,
    },
    {
        slug: "youtube-intro-script-generator",
        name: "Intro Script Generator",
        description: "Create engaging video intro scripts with AI. Hook your viewers in the first 15-30 seconds.",
        shortDescription: "Write compelling intros",
        category: "utility-fun",
        icon: FaMicrophone,
        isAI: true,
    },
    {
        slug: "youtube-channel-id-finder",
        name: "YouTube Channel ID Finder",
        description: "Find the unique Channel ID (UC...) and User ID for any YouTube channel. Works with handles, channel URLs, and video links.",
        shortDescription: "Find any YouTube Channel ID",
        category: "utility-fun",
        icon: FaIdCard,
        isAI: false,
    },
    {
        slug: "youtube-playlist-length-calculator",
        name: "YouTube Playlist Length Calculator",
        description: "Calculate the total length of any YouTube playlist. See how long it takes to specific speeds (1.25x, 1.5x, 2x).",
        shortDescription: "Calculate playlist duration",
        category: "utility-fun",
        icon: FaListUl,
        isAI: false,
    },
    {
        slug: "youtube-comment-picker",
        name: "YouTube Comment Picker",
        description: "Pick a random winner for your YouTube giveaway or contest. Filter duplicates and spammers fairly.",
        shortDescription: "Pick random comment winner",
        category: "utility-fun",
        icon: FaTrophy,
        isAI: false,
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
