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
                { name: "Copy Video URL", text: "Copy the URL of any YouTube video you want to get the thumbnail from." },
                { name: "Paste and Fetch", text: "Paste the video URL into the input field above and click 'Fetch Thumbnails'." },
                { name: "Download", text: "Preview available sizes and click 'Download' on your preferred resolution (HD, SD, or Low)." }
            ],
            totalTime: "PT1M"
        },
        faqs: [
            {
                question: "What is a YouTube thumbnail?",
                answer: "A YouTube thumbnail is the small preview image that represents a video. It's one of the first things viewers see when browsing YouTube, making it crucial for attracting clicks and views."
            },
            {
                question: "Can I use downloaded thumbnails?",
                answer: "You should only download and use thumbnails that you have permission to use. Downloading thumbnails for reference or personal use is generally acceptable, but using someone else's thumbnail for your own videos may violate copyright laws."
            },
            {
                question: "What resolution thumbnails can I download?",
                answer: "We provide thumbnails in four different resolutions: Maximum Resolution (1280x720), Standard Definition (640x480), High Quality (480x360), and Medium Quality (320x180)."
            },
            {
                question: "Why isn't the maximum resolution thumbnail available?",
                answer: "Not all YouTube videos have maximum resolution thumbnails available. If the uploader didn't upload a custom HD thumbnail, only the standard resolutions will be available."
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
        content: [
            {
                title: "Generate Viral-Worthy Thumbnail Text",
                content: "Generate viral-worthy text for your YouTube thumbnails with our AI Thumbnail Text Generator. Create punchy, click-optimized copy that grabs attention and improves your CTR. Whether you need bold, shocking, or professional text, our AI analyzes successful trends to give you the best options for your video."
            },
            {
                title: "Psychology-Backed Suggestions",
                content: "Our AI doesn't just generate random words. It analyzes psychological triggers (Curiosity, Urgency, Negativity Bias) to create text that compels viewers to click. We also provide color suggestions to ensure your text pops against the background."
            }
        ],
        howTo: {
            name: "How to Generate Thumbnail Text",
            description: "Create punchy, psychological hooks for your thumbnails in seconds.",
            steps: [
                { name: "Enter Video Topic", text: "Type a brief topic or title for your video (e.g., 'I tried the most dangerous sport')." },
                { name: "Select Style & Emotion", text: "Choose a visual style (e.g., 'Bold & Colorful') and the emotion you want to trigger (e.g., 'Excited')." },
                { name: "Generate", text: "Click 'Generate Concepts' to get 6 unique text ideas with color and layout suggestions." },
                { name: "Save", text: "Save the best ideas to your dashboard or copy them directly to Canva/Photoshop." }
            ],
            totalTime: "PT1M"
        },
        faqs: [
            {
                question: "Why is thumbnail text important?",
                answer: "Thumbnail text (copy) complements your image to secure the click. It should be short, punchy, and create curiosity without repeating your title."
            },
            {
                question: "How long should thumbnail text be?",
                answer: "Keep it under 4 words. Large, readable text is crucial for mobile viewers. Less is often more."
            },
            {
                question: "What color text works best?",
                answer: "High contrast is key. White text on red/black backgrounds, or yellow text on dark backgrounds usually performs best. Our AI suggests colors for each idea."
            }
        ]
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
        content: [
            {
                title: "Create High-CTR Thumbnails with AI",
                content: "Stop struggling with Photoshop. Our AI Thumbnail Generator creates professional, eye-catching thumbnails in seconds. Just describe your video concept, and our advanced AI will generate a unique, high-resolution image tailored to grab attention on YouTube. Perfect for vloggers, gamers, and educators who want to stand out."
            },
            {
                title: "Why AI Thumbnails Work",
                content: "YouTube is a visual platform. If your thumbnail doesn't pop, your video doesn't get clicked. Our AI is trained on millions of viral videos to understand what visual elements drive clicks—bright colors, expressive faces, and clear focal points. Get the same quality as top YouTubers without hiring a designer."
            }
        ],
        howTo: {
            name: "How to Generate AI Thumbnails",
            description: "Create a custom thumbnail in 3 easy steps.",
            steps: [
                { name: "Describe Your Vision", text: "Enter a detailed description of the thumbnail you want (e.g., 'shocked gamer face with neon background')." },
                { name: "Select Style", text: "Choose a style that fits your channel: 'Photorealistic', 'Cartoon', '3D Render', or 'Anime'." },
                { name: "Generate & Download", text: "Click 'Generate' to see your unique thumbnail. Download the high-res image and upload it to YouTube." }
            ],
            totalTime: "PT1M"
        },
        faqs: [
            {
                question: "Is it free to generate thumbnails?",
                answer: "Yes, you can generate standard thumbnails for free. We offer premium features for higher resolution and advanced styles, but the core tool is accessible to everyone."
            },
            {
                question: "Do I own the copyright to the image?",
                answer: "Yes! You own full rights to the images you generate. You can use them on YouTube, social media, or your website without worrying about copyright strikes."
            },
            {
                question: "What makes a good thumbnail prompt?",
                answer: "Be specific. Instead of 'gamer', try 'excited gamer wearing headphones, purple lighting, digital art style'. The more detail you provide about lighting, mood, and style, the better the result."
            }
        ]
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
        content: [
            {
                title: "Master the Art of AI Prompts",
                content: "The secret to amazing AI art isn't the tool—it's the prompt. Our AI Thumbnail Prompt Generator takes your simple idea and expands it into a highly detailed, professional prompt optimized for Midjourney, DALL-E, and Stable Diffusion. We include technical keywords for lighting, composition, and style that most users forget."
            },
            {
                title: "Compatible with All Major AI Models",
                content: "Whether you use Midjourney v6, DALL-E 3, or open-source Stable Diffusion, our prompts are engineered to work. We understand the specific 'language' each model prefers, helping you get consistent, high-quality results every time."
            }
        ],
        howTo: {
            name: "How to Create Perfect Prompts",
            description: "Turn basic ideas into pro-level AI prompts.",
            steps: [
                { name: "Enter Concept", text: "Type a basic idea of what you want (e.g., 'dog playing poker')." },
                { name: "Select AI Model", text: "Choose which AI you're using (Midjourney, DALL-E, etc.) to optimize the syntax." },
                { name: "Enhance", text: "Click 'Generate Prompt' to receive a detailed paragraph including lighting, camera angles, and artistic style." },
                { name: "Copy & Paste", text: "Copy the enhanced prompt and paste it into your AI image generator." }
            ],
            totalTime: "PT1M"
        },
        faqs: [
            {
                question: "Why do I need a prompt generator?",
                answer: "AI models can be picky. A simple prompt like 'cat' gives boring results. Our generator adds modifiers like 'cinematic lighting, 8k resolution, unreal engine 5 render' to force the AI to create high-quality output."
            },
            {
                question: "Does this work for Midjourney?",
                answer: "Yes, specifically for Midjourney! We include parameters like --ar 16:9 (aspect ratio) and --v 6 (version) automatically if you select the Midjourney option."
            },
            {
                question: "Can I use these prompts for non-YouTube images?",
                answer: "Absolutely. While we focus on thumbnails, these high-quality prompts work for blog headers, social media posts, and digital art projects."
            }
        ]
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
        content: [
            {
                title: "Generate SEO-Optimized Descriptions",
                content: "Create compelling YouTube descriptions that boost your video's discoverability with our AI-powered Description Generator. Our tool creates structured descriptions with engaging hooks, informative bullet points, strategic calls-to-action, and relevant hashtags to help your videos rank higher in search results and keep viewers engaged."
            },
            {
                title: "Why Structure Matters",
                content: "A well-structured description helps YouTube understand your video context. By including timestamps, key takeaways, and relevant keywords naturally, you increase the chances of appearing in suggested videos and search results."
            }
        ],
        howTo: {
            name: "How to Generate a YouTube Description",
            description: "Create a professional, SEO-ready video description in seconds.",
            steps: [
                { name: "Enter Video Topic", text: "Enter your video topic or a brief summary (be specific about the value provided)." },
                { name: "Add Keywords", text: "Add 1-2 main keywords for SEO ranking that you want to target." },
                { name: "Select Tone", text: "Choose a Tone that matches your channel style (e.g., Casual, Professional, Excited)." },
                { name: "Generate", text: "Click 'Generate' to get a human-sounding description with timestamps and emojis." },
                { name: "Preview & Edit", text: "Use the Preview tab to check your 'Show More' hook, then edit if needed." }
            ],
            totalTime: "PT1M"
        },
        faqs: [
            {
                question: "Why should I include keywords?",
                answer: "Keywords help YouTube understand your video. We recommend adding 2-3 main keywords you want to rank for, and the AI will naturally weave them into the text."
            },
            {
                question: "What is the 'YouTube Preview'?",
                answer: "It shows exactly how your description will look to a viewer on a desktop, including the 'Show More' cutoff point, so you can ensure your hook is visible."
            },
            {
                question: "Can I edit the result?",
                answer: "Yes! Switch to 'Edit Mode' to tweak the text perfectly before copying."
            }
        ]
    },
    {
        slug: "youtube-tag-generator",
        name: "YouTube Tag Generator",
        description: "Generate SEO-optimized, trending tags that help your videos rank. Get primary, search, and long-tail keywords.",
        shortDescription: "Generate SEO tags for videos",
        category: "seo-metadata",
        icon: FaTags,
        isAI: true,
        isFeatured: true,
        keywords: ["youtube tag generator", "video tags", "youtube keywords", "seo tags for youtube", "find best youtube tags", "youtube tag finder"],
        content: [
            {
                title: "Generate SEO-Optimized Tags",
                content: "Generate winning YouTube tags that actually rank with our AI-powered Tag Generator. Our tool uses proven SEO strategies to create primary keywords, search query tags, trending variations, and long-tail phrases that help YouTube's algorithm discover and recommend your content. Maximize your video's visibility with strategic tagging."
            },
            {
                title: "Why Tags Still Matter",
                content: "While titles and descriptions are crucial, tags help YouTube understand the context of your video, especially for misspelled searches or establishing topic relevance. They are a key signal for the recommendation algorithm."
            }
        ],
        howTo: {
            name: "How to Generate YouTube Tags",
            description: "Get the perfect mix of tags for your video in seconds.",
            steps: [
                { name: "Enter Topic", text: "Enter your video topic or title (be specific)." },
                { name: "Add Niche", text: "Optionally add your niche for more targeted tags (e.g., Gaming, Tech)." },
                { name: "Generate", text: "Click 'Generate Tags' to get SEO-optimized keywords organized by category." },
                { name: "Review", text: "Review Primary, Search, and Long-Tail tags." },
                { name: "Copy & Paste", text: "Copy the tags and paste them into your YouTube video details." }
            ],
            totalTime: "PT1M"
        },
        faqs: [
            {
                question: "How many tags should I use on YouTube?",
                answer: "YouTube allows up to 500 characters for tags. Use 15-30 strategic tags, prioritizing quality over quantity. The first 3-5 tags are weighted most heavily by the algorithm."
            },
            {
                question: "Do YouTube tags still matter?",
                answer: "Yes! While titles and descriptions are more important, tags help YouTube understand your content and suggest it to relevant viewers. They're especially useful for new channels building authority."
            },
            {
                question: "What's the best tag strategy?",
                answer: "Use a mix: 3-5 primary exact-match tags first, then search query variations, broad category tags, and specific long-tail phrases. Include trending/timely tags when relevant."
            },
            {
                question: "Should I use the same tags on every video?",
                answer: "No! Each video should have unique tags matching its specific content. This helps YouTube understand each video's unique value."
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
        content: [
            {
                title: "Spy on Your Competitors' Strategy",
                content: "Ever wonder why certain videos strictly rank #1? Often, it's their hidden meta tags. Our YouTube Tag Extractor reveals the exact keywords successful channels use. By analyzing these tags, you can discover high-value keywords, understand how the algorithm categorizes their content, and apply similar strategies to your own videos to boost rankings."
            },
            {
                title: "Safe & Legal Research",
                content: "Analyzing public metadata is a standard SEO practice. This tool simply reads the public code of the YouTube page to find the 'keywords' meta tag that isn't visible on the screen. It's a powerful way to perform competitive analysis without violating any terms of service."
            }
        ],
        howTo: {
            name: "How to Extract Tags from Any Video",
            description: "Reveal hidden video tags in seconds.",
            steps: [
                { name: "Find a Video", text: "Go to YouTube and find a popular video in your niche." },
                { name: "Copy Link", text: "Copy the video URL from your browser address bar." },
                { name: "Extract", text: "Paste the link above and click 'Extract Tags'. We'll instantly list every tag used on that video." },
                { name: "Copy & Use", text: "Click to copy individual tags or 'Copy All' to save them for your own video metadata." }
            ],
            totalTime: "PT1M"
        },
        faqs: [
            {
                question: "Can I just copy all tags from a viral video?",
                answer: "You can, but you shouldn't blindly copy them. Only use tags that are relevant to YOUR video. Using irrelevant tags (misleading metadata) is against YouTube policy and can hurt your channel."
            },
            {
                question: "Why can't I see tags on YouTube anymore?",
                answer: "YouTube hid tags from the public view years ago because they wanted to clean up the interface. However, they are still in the page code and used by the algorithm."
            },
            {
                question: "How many tags should I steal?",
                answer: "Look for patterns across 3-5 top videos. If they all use 'vegan meal prep', that's a tag you should probably use. Don't just copy one video's tags entirely."
            }
        ]
    },

    // Channel Research & Growth Tools
    {
        slug: "youtube-video-ideas-generator",
        name: "Strategic Video Ideas Generator",
        description: "Get proven video concepts tailored to your channel size and growth goals. Includes titles, thumbnails, and difficulty ratings.",
        shortDescription: "AI video ideas for your niche",
        category: "channel-growth",
        icon: FaLightbulb,
        isAI: true,
        keywords: ["video ideas generator", "youtube content ideas", "video topics", "viral video ideas", "content inspiration", "youtube growth strategy"],
        content: [
            {
                title: "Strategic Video Concepts, Not Just Topics",
                content: "Generate high-potential YouTube video ideas tailored to your specific channel size and goals. Unlike generic generators, our AI acts as a growth strategist, suggesting concepts that match your current stage (0 subs vs 100k subs) and objective (viral views vs loyal subscribers). Get complete concepts with titles, thumbnail ideas, and execution difficulty ratings."
            }
        ],
        howTo: {
            name: "How to Generate Video Ideas",
            description: "Get viral-ready video concepts for your niche.",
            steps: [
                { name: "Enter Niche", text: "Enter your specific niche (e.g., 'Fitness for busy dads')." },
                { name: "Select Context", text: "Choose your current Channel Size for realistic ideas." },
                { name: "Set Goal", text: "Choose your Content Goal (Views vs. Subs)." },
                { name: "Generate", text: "Click 'Generate' to get strategized video concepts." },
                { name: "Review Strategy", text: "Review the 'Viral Score' and 'Thumbnail Concept' for each idea." }
            ],
            totalTime: "PT1M"
        },
        faqs: [
            {
                question: "Why does channel size matter?",
                answer: "A small channel needs 'Searchable' or 'High Value' content to get discovered. A big channel can rely on 'Personality' and 'Storytelling' because they already have an audience. The AI adjusts ideas based on this context."
            },
            {
                question: "What is the 'Difficulty' rating?",
                answer: "It estimates how hard the video is to make. 'Easy' might be a talking head video, while 'Hard' implies complex editing, b-roll, or a challenge/vlog format."
            },
            {
                question: "How do I use the Thumbnail Concept?",
                answer: "The AI suggests a visual to pair with the title. This is crucial because Title + Thumbnail = Click. Use it as a starting point for your design."
            }
        ]
    },

    {
        slug: "youtube-trend-helper",
        name: "YouTube Trend & Topic Helper",
        description: "Discover trending topics in your region and get AI-powered video ideas tailored to your niche using real-time YouTube data.",
        shortDescription: "Find trending topics & viral ideas",
        category: "channel-growth",
        icon: FaChartLine,
        isAI: true,
        keywords: ["youtube trends", "trending topics", "viral video ideas", "what is trending on youtube", "niche research", "youtube trend finder"],
        content: [
            {
                title: "Spot Trends Before They Fade",
                content: "Stay ahead of the curve with our YouTube Trend & Topic Helper. Discover what's trending in your region right now and get AI-powered video ideas tailored to your niche. Leveraging real-time YouTube data and advanced AI, this tool helps you identify viral opportunities and create content that viewers are searching for."
            }
        ],
        howTo: {
            name: "How to Find Trending Topics",
            description: "Identify viral opportunities in 3 steps.",
            steps: [
                { name: "Global Trends", text: "Select your target region to see what's trending there." },
                { name: "Niche Ideas", text: "Enter your niche (e.g., 'Tech', 'Cooking') to get tailored AI suggestions." },
                { name: "Generate", text: "Click 'Get Trending Ideas' to generate viral video concepts." },
                { name: "Create", text: "Use these real-time insights to create timely, relevant content." }
            ],
            totalTime: "PT1M"
        },
        faqs: [
            {
                question: "How are trending videos selected?",
                answer: "We use the official YouTube Data API to fetch the real-time trending videos for your selected region."
            },
            {
                question: "How often is the data updated?",
                answer: "The trending list is updated in real-time as YouTube updates its charts."
            },
            {
                question: "How do AI suggestions work?",
                answer: "Our AI analyzes current trends and generates specific video ideas tailored to your niche that capitalize on these trends."
            }
        ]
    },
    {
        slug: "youtube-content-calendar-generator",
        name: "Content Calendar Generator",
        description: "Plan your YouTube success with our AI Content Calendar Generator. Create a consistent, strategic content schedule with video ideas tailored to your niche.",
        shortDescription: "Plan your content schedule",
        category: "channel-growth",
        icon: FaCalendarAlt,
        isAI: true,
        keywords: ["content calendar generator", "youtube upload schedule", "content planner", "video content plan", "social media calendar", "youtube scheduler"],
        content: [
            {
                title: "Plan Your Path to Success",
                content: "Plan your YouTube success with our AI Content Calendar Generator. Create a consistent, strategic content schedule in seconds. Whether you're a daily vlogger or a weekly educator, our tool generates engaging video ideas and organizes them into a balanced calendar to keep your audience growing and engaged."
            }
        ],
        howTo: {
            name: "How to Generate a Content Calendar",
            description: "Create a strategic content plan in seconds.",
            steps: [
                { name: "Enter Niche", text: "Enter your channel's niche or main topic (e.g., 'Tech tutorials')." },
                { name: "Set Frequency", text: "Select how often you want to post videos (e.g., Weekly)." },
                { name: "Set Duration", text: "Choose the duration for your calendar (e.g., 30 days)." },
                { name: "Generate", text: "Click 'Generate Calendar' to get a complete content plan." },
                { name: "Download", text: "Download the calendar as a CSV file to execute your plan." }
            ],
            totalTime: "PT1M"
        },
        faqs: [
            {
                question: "How does the calendar generator work?",
                answer: "Our AI analyzes your niche and generates a balanced content schedule with diverse video types (Tutorials, Vlogs, Shorts, etc.) suitable for your posting frequency."
            },
            {
                question: "Can I edit the generated calendar?",
                answer: "Currently, you can download the calendar as a CSV file and edit it in Excel or Google Sheets. In-app editing is coming soon."
            },
            {
                question: "What's the best posting frequency?",
                answer: "Consistency is key. It's better to post one high-quality video weekly than to burn out trying to post daily. Choose a schedule you can maintain long-term."
            }
        ]
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
        description: "Calculate your YouTube video's engagement rate. Measure how actively your audience interacts with your content.",
        shortDescription: "Measure video engagement",
        category: "analytics-earnings",
        icon: FaChartBar,
        isAI: false,
        keywords: ["engagement rate calculator", "youtube engagement", "video engagement metrics", "calculate youtube engagement", "engagement analysis", "youtube analytics"],
        content: [
            {
                title: "Why Engagement Rate Matters",
                content: "Your engagement rate is a key metric that YouTube uses to decide whether to promote your video. High engagement (likes, comments, shares) signals to the algorithm that viewers value your content, leading to more impressions and growth. Use this calculator to track your performance against industry benchmarks."
            }
        ],
        howTo: {
            name: "How to Calculate Engagement Rate",
            description: "Check your engagement score in seconds.",
            steps: [
                { name: "Enter Views", text: "Enter the total number of views on your video." },
                { name: "Enter Likes", text: "Input the total number of likes." },
                { name: "Enter Comments", text: "Input the total number of comments." },
                { name: "Calculate", text: "Click 'Calculate Engagement' to see your percentage and a rating (e.g., 'Good', 'Excellent')." }
            ],
            totalTime: "PT1M"
        },
        faqs: [
            {
                question: "What is a good engagement rate on YouTube?",
                answer: "Generally, 3-5% is considered average, while anything above 10% is excellent. Smaller channels often have higher engagement rates than massive ones."
            },
            {
                question: "How is engagement rate calculated?",
                answer: "We use the standard formula: ((Likes + Comments + Shares) / Total Views) × 100. This gives you a percentage representing active viewer participation."
            },
            {
                question: "How can I improve my engagement?",
                answer: "Ask a specific question in your video (CTAs), reply to every comment in the first 24 hours, and use community posts to keep the conversation going."
            }
        ]
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
        content: [
            {
                title: "Stop Guessing, Start Testing",
                content: "Which title will get more clicks? 'How to Make Money' or 'I Made $1000 in 24 Hours'? Top YouTubers don't guess—they test. Our Title A/B Score Checker analyzes your title options against proven viral patterns to predict which one will have a higher Click-Through Rate (CTR)."
            },
            {
                title: "The Science of the Click",
                content: "We evaluate titles based on three core metrics: Emotional Impact, Curiosity Gap, and Clarity. By comparing two variations side-by-side, you can choose the one that is statistically more likely to win the click."
            }
        ],
        howTo: {
            name: "How to A/B Test Your Titles",
            description: "Pick the winning title in 3 steps.",
            steps: [
                { name: "Draft Options", text: "Come up with two different angles for your video title (e.g., Short vs. Long, Negative vs. Positive)." },
                { name: "Enter Titles", text: "Paste Title A and Title B into the comparison fields." },
                { name: "Analyze", text: "Click 'Compare Titles' to see a side-by-side breakdown." },
                { name: "Select Winner", text: "Use the title with the higher 'Viral Potential' score for your video." }
            ],
            totalTime: "PT1M"
        },
        faqs: [
            {
                question: "What is A/B testing?",
                answer: "A/B testing is comparing two versions of something to see which performs better. In this case, we use AI to simulate how real viewers would react to your different title options."
            },
            {
                question: "Can I test thumbnails too?",
                answer: "Currently, this tool focuses on text. For thumbnail testing, we recommend using our Thumbnail Downloader to compare your design against competitors."
            },
            {
                question: "How accurate is the score?",
                answer: "Our scoring is based on analysis of high-performing YouTube videos. While no tool can guarantee views, high-scoring titles generally follow the patterns of viral content."
            }
        ]
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
        keywords: ["channel name generator", "youtube name ideas", "creative channel names", "brand name generator", "cool youtube names", "youtube channel namer"],
        content: [
            {
                title: "Find Your Perfect Brand Name",
                content: "Find the perfect YouTube channel name with our AI-powered generator. Get 15 unique, memorable name ideas organized by naming style - from personal brands to creative compounds. Each name is designed to be easy to spell, memorable, and availability-friendly for consistent branding across platforms."
            }
        ],
        howTo: {
            name: "How to Generate a Channel Name",
            description: "Find a unique brand name in seconds.",
            steps: [
                { name: "Enter Niche", text: "Enter your channel's niche or main topic (e.g., 'Coding for kids')." },
                { name: "Select Vibe", text: "Select a tone that matches your brand personality (e.g., 'Fun', 'Professional')." },
                { name: "Generate", text: "Click 'Generate Names' to get AI suggestions organized by category." },
                { name: "Check Availability", text: "Use the built-in check button to see if the handle is available on YouTube." }
            ],
            totalTime: "PT1M"
        },
        faqs: [
            {
                question: "What makes a good YouTube channel name?",
                answer: "A good channel name is memorable (say it once, remember forever), easy to spell when heard, available as @handle on socials, and works as your brand grows."
            },
            {
                question: "Should I use my real name?",
                answer: "Personal names work great for personal brands and vlogs. Brand names work better for topic-focused channels where personality matters less than content."
            },
            {
                question: "Can I change my channel name later?",
                answer: "Yes, but it's not recommended. Changing your name confuses subscribers and hurts brand recognition. Choose carefully from the start."
            }
        ]
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
        content: [
            {
                title: "Generate Viral Hashtags",
                content: "Generate relevant YouTube hashtags for your videos with our AI-powered Hashtag Generator. Get both broad reach hashtags and specific niche hashtags to maximize your video's discoverability. Our tool helps you find the perfect hashtag combinations for your content."
            }
        ],
        howTo: {
            name: "How to Generate Best Hashtags",
            description: "Get the perfect mix of broad and niche hashtags.",
            steps: [
                { name: "Enter Topic", text: "Enter your video topic in the input field." },
                { name: "Add Niche", text: "Add your niche for smarter suggestions." },
                { name: "Generate", text: "Click 'Generate Hashtags' to get AI suggestions." },
                { name: "Review", text: "Review Broad, Niche, and Trending categories." },
                { name: "Copy", text: "Copy the best mix for your video description." }
            ],
            totalTime: "PT1M"
        },
        faqs: [
            {
                question: "How many hashtags should I use on YouTube?",
                answer: "YouTube shows the first 3 hashtags above your title. You can add more in the description, but 3-5 strategic hashtags is generally optimal."
            },
            {
                question: "Do hashtags help with YouTube SEO?",
                answer: "Yes, hashtags are clickable links that help categorize your content. They can help viewers discover your videos when searching or clicking related hashtags."
            },
            {
                question: "What's the difference between broad and specific hashtags?",
                answer: "Broad hashtags like #YouTube reach more people but have more competition. Specific hashtags like #YouTubeTutorial2024 are more targeted and can help you stand out."
            }
        ]
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
        content: [
            {
                title: "Hook Viewers in the First 30 Seconds",
                content: "The first 30 seconds of your video determine its success. If viewers click away, YouTube stops recommending it. Our AI Intro Script Generator writes compelling hooks that grab attention immediately. We use proven frameworks like 'Problem-Agitation-Solution' and 'Open Loops' to ensure viewers stay watching until the end."
            },
            {
                title: "Stop Starting with 'Hey Guys'",
                content: "Generic intros kill retention. Our AI generates professional, structured openings that state exactly what the video is about, why it matters, and what the viewer will gain. No fluff, just value."
            }
        ],
        howTo: {
            name: "How to Write a Killer Intro",
            description: "Generate a retention-boosting script in 3 steps.",
            steps: [
                { name: "Enter Topic", text: "Tell us what your video is about (e.g., 'How to bake a cake without eggs')." },
                { name: "Choose Hook Style", text: "Select a framework: 'Storytelling', 'Shocking Fact', or 'Direct Promise'." },
                { name: "Generate", text: "Get 3 unique script options. Read them out loud to see which one sounds most natural." },
                { name: "Filming", text: "Use the generated script verbatim or tweak it to match your voice. Record it with high energy!" }
            ],
            totalTime: "PT2M"
        },
        faqs: [
            {
                question: "How long should an intro be?",
                answer: "Ideally, under 60 seconds. The best intros are often 15-30 seconds. Get straight to the point and deliver on the promise of your title."
            },
            {
                question: "What is a 'Hook'?",
                answer: "A hook is the very first sentence. It must confirm the viewer clicked the right video and give them a reason to keep watching. Example: 'In this video, I'll show you how to double your money...'"
            },
            {
                question: "Can I use this for Shorts?",
                answer: "Yes! Select the 'Short/Punchy' style for 60-second vertical videos. These intros are even faster and more aggressive to stop the scroll."
            }
        ]
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
        content: [
            {
                title: "Find Any Channel ID Instantly",
                content: "Need a YouTube Channel ID for an API integration, social blade lookup, or marketing tool? YouTube often hides these IDs behind custom handles (like @MrBeast). Our tool digs into the channel data to reveal the permanent Channel ID (UC...) and User ID required for developers and marketers."
            },
            {
                title: "Why You Need the ID",
                content: "Custom URLs change, but Channel IDs are forever. If you're building an app, setting up an RSS feed, or whitelisting a channel for ads, you need the immutable ID, not the vanity URL. We make finding it simple."
            }
        ],
        howTo: {
            name: "How to Find a Channel ID",
            description: "Get the permanent ID in seconds.",
            steps: [
                { name: "Copy Link", text: "Go to the YouTube channel page and copy the URL (e.g., youtube.com/@user)." },
                { name: "Paste", text: "Paste the link into the box above." },
                { name: "Find", text: "Click 'Find ID'. We'll process the request instantly." },
                { name: "Copy ID", text: "Copy the 'Channel ID' (starts with UC) for your use." }
            ],
            totalTime: "PT1M"
        },
        faqs: [
            {
                question: "What is a Channel ID?",
                answer: "It's a unique string starting with 'UC' (e.g., UC12345...) that permanently identifies a YouTube channel, unlike handles which can be changed."
            },
            {
                question: "Can I find my own ID?",
                answer: "Yes! But it's often easier to use this tool than to dig through your advanced account settings page."
            },
            {
                question: "Is this legal?",
                answer: "100%. Channel IDs are public information used by YouTube's API. We just make them easier to find."
            }
        ]
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
        content: [
            {
                title: "Plan Your Binge-Watching Sessions",
                content: "Whether you're studying a course or catching up on a vlog series, knowing the total runtime is essential. Our Playlist Length Calculator sums up the duration of every video in a playlist. It even calculates how much time you save by watching at 1.25x, 1.5x, or 2x speed."
            },
            {
                title: "Perfect for Students & Researchers",
                content: "Don't guess if you have time to finish that lecture series. Get the exact hour and minute count instantly. You can select up to 500 videos at once."
            }
        ],
        howTo: {
            name: "How to Calculate Playlist Duration",
            description: "See exactly how long a playlist takes to watch.",
            steps: [
                { name: "Get Link", text: "Copy the URL of a YouTube playlist (must be public)." },
                { name: "Paste & Calculate", text: "Paste it above and hit 'Calculate Length'." },
                { name: "Review Stats", text: "See the total time, average video length, and fastest possible watch time." },
                { name: "Plan", text: "Use the 'Watch at 2x' stat to see if you can cram it in before the deadline!" }
            ],
            totalTime: "PT1M"
        },
        faqs: [
            {
                question: "Does this work on 'Watch Later'?",
                answer: "No, 'Watch Later' is a private playlist. The playlist must be Public or Unlisted for our tool to access it."
            },
            {
                question: "What is the limit?",
                answer: "We maximize content for performance. Extremely large playlists (1000+ videos) might take a moment to process, but we handle most standard sizes instantly."
            },
            {
                question: "Is the calculation accurate?",
                answer: "Yes, it is precise to the second, summing up the exact duration of every video file in the list."
            }
        ]
    },
    {
        slug: "youtube-comment-picker",
        name: "YouTube Comment Picker",
        description: "Pick a random winner for your YouTube giveaway or contest. Filter duplicates and spammers fairly.",
        shortDescription: "Pick random comment winner",
        category: "utility-fun",
        icon: FaTrophy,
        isAI: false,
        keywords: ["comment picker", "random comment winner", "youtube giveaway tool", "pick contest winner", "random youtube comment", "youtube comment raffle"],
        content: [
            {
                title: "Fair & Random Comment Picker",
                content: "Pick a random winner for your YouTube giveaway or contest with our free Comment Picker. Fair, transparent, and easy to use. Filter out duplicates and spammers to ensure a legitimate winner every time."
            }
        ],
        howTo: {
            name: "How to Pick a Random Winner",
            description: "Select a winner for your contest in seconds.",
            steps: [
                { name: "Paste Link", text: "Copy the URL of your YouTube video and paste it into the box." },
                { name: "Load Comments", text: "Click 'Load Comments' to fetch all eligible entries." },
                { name: "Apply Filters", text: "Choose your settings (Filter duplicates, require specific text)." },
                { name: "Pick Winner", text: "Click 'Pick Winner' to randomly select a lucky commenter." }
            ],
            totalTime: "PT1M"
        },
        faqs: [
            {
                question: "Is this tool free?",
                answer: "Yes, this Random Comment Picker is 100% free to use for your giveaways and contests."
            },
            {
                question: "Does it include replies?",
                answer: "Currently, we only pick from top-level comments to ensure fairness, as replies are often discussions."
            },
            {
                question: "How do you filter duplicates?",
                answer: "If you check 'Filter Duplicates', we only count one comment per user. Even if they commented 10 times, they only have 1 chance to win."
            },
            {
                question: "Is it truly random?",
                answer: "Yes, we use a cryptographically secure random number generator to select the winner from the list of qualified comments."
            }
        ]
    },
    {
        slug: "youtube-channel-audit",
        name: "Channel Health Auditor",
        description: "Get a comprehensive health check for your YouTube channel. Analyze your thumbnails, titles, and engagement consistency with our AI Auditor.",
        shortDescription: "Audit your channel health",
        category: "channel-growth",
        icon: FaChartBar,
        isAI: true,
        isFeatured: true,
        keywords: ["channel audit", "youtube channel checker", "channel health score", "youtube analytics tool", "audit my channel", "youtube seo check"],
        content: [
            {
                title: "Comprehensive Channel Health Check",
                content: "Is your YouTube channel optimized for growth? Our Channel Health Auditor acts as your personal consultant, analyzing critical metrics like Title Optimization, Thumbnail Quality, Upload Consistency, and Engagement Rate. Get a clear 0-100 score and actionable feedback to fix what's holding you back."
            },
            {
                title: "What We Analyze",
                content: "We look at the 'Big 3' growth factors: Packaging (Do your Titles & Thumbnails click?), Consistency (Is your schedule reliable?), and Community (Are you engaging with viewers?). Improving these specific areas is the fastest way to trigger the YouTube algorithm."
            }
        ],
        howTo: {
            name: "How to Audit Your YouTube Channel",
            description: "Get a professional channel review in 3 steps.",
            steps: [
                { name: "Enter Handle", text: "Type your YouTube channel handle (e.g., @YourChannel) or Channel ID." },
                { name: "Run Analysis", text: "Click 'Audit Channel' to scan your channel's public data." },
                { name: "Review Score", text: "See your overall Health Score (0-100) and letter grade." },
                { name: "Fix Issues", text: "Read the specific feedback for each metric (e.g., 'Improve Thumbnail Contrast') and implement changes." }
            ],
            totalTime: "PT1M"
        },
        faqs: [
            {
                question: "What is a good Channel Health Score?",
                answer: "A score above 70 is considered 'Healthy'. Above 90 is 'Excellent'. If your score is below 50, you likely have low-hanging fruit to fix, such as inconsistent uploads or poor SEO."
            },
            {
                question: "Is this audit tool safe?",
                answer: "Yes! We only analyze public data visible on YouTube. We do not require access to your private account or studio dashboard."
            },
            {
                question: "How often should I audit my channel?",
                answer: "We recommend a quick check-up once a month to ensure you're maintaining best practices, or whenever you notice a dip in views."
            }
        ]
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
