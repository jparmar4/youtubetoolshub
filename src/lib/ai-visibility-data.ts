export interface CompetitorData {
    name: string;
    you: number;
    them: number;
    diff: number;
    description: string;
    status: 'winning' | 'losing' | 'tied';
}

export interface AIResponse {
    id: string;
    source: 'OpenAI' | 'Anthropic' | 'Google' | 'Perplexity';
    type: 'General' | 'Specific';
    text: string;
    sentiment: 'Positive' | 'Neutral' | 'Negative' | 'Mixed';
}

export interface ActionItem {
    id: string;
    title: string;
    description: string;
    impact: string;
    effort: 'Low Effort' | 'Medium Effort' | 'High Effort' | 'Strategic';
    type: 'critical' | 'improvement' | 'opportunity';
}

export interface QuickWin {
    id: string;
    title: string;
    description: string;
    impact: string;
    badge: string;
}

export interface ContentIdea {
    id: string;
    title: string;
    description: string;
    tags: string[];
    priority?: 'High Priority' | 'Medium Priority' | 'Low Priority';
}

export interface BrandStrength {
    score: number;
    total: number;
    visibility: number;
    sentiment: number;
    shareOfVoice: number;
    ranking: number;
    healthScore: number;
    healthStatus: string;
    healthDescription: string;
    summary: {
        visibilityScore: number;
        marketRank: number;
        actionItems: number;
        brandMentions: number;
    }
}

export const mockCompetitorData: CompetitorData[] = [
    {
        name: "TubeBuddy",
        you: 13,
        them: 30,
        diff: -17.5,
        description: "TubeBuddy has 17.5% more AI visibility than you. AI recommends them more frequently.",
        status: 'losing'
    },
    {
        name: "VidIQ",
        you: 13,
        them: 30,
        diff: -17.5,
        description: "VidIQ has 17.5% more AI visibility than you. AI recommends them more frequently.",
        status: 'losing'
    },
    {
        name: "InVideo",
        you: 13,
        them: 10,
        diff: 0,
        description: "You and InVideo have similar AI visibility. Small improvements could help you pull ahead.",
        status: 'tied'
    },
    {
        name: "Canva",
        you: 13,
        them: 8,
        diff: 0,
        description: "You and Canva have similar AI visibility. Small improvements could help you pull ahead.",
        status: 'tied'
    },
    {
        name: "Snappa",
        you: 13,
        them: 5,
        diff: 7.5,
        description: "You're performing Snappa by 7.5%. Your brand is more visible to AI.",
        status: 'winning'
    }
];

export const mockAIResponses: AIResponse[] = [
    {
        id: "1",
        source: "OpenAI",
        type: "General",
        text: "\"As of my last update, I don't have specific information on a tool named \"YouTube Tools Hub\"\"",
        sentiment: "Neutral"
    },
    {
        id: "2",
        source: "OpenAI",
        type: "General",
        text: "\"com If \"YouTube Tools Hub\" is a newer or less well-known tool, I would need more specific information or sources to accurately rank it among these established competitors\"",
        sentiment: "Neutral"
    },
    {
        id: "3",
        source: "Anthropic",
        type: "General",
        text: "\"I don't have specific information about \"YouTube Tools Hub\" as a distinct platform or service in my knowledge base\"",
        sentiment: "Neutral"
    },
    {
        id: "4",
        source: "OpenAI",
        type: "General",
        text: "\"However, I can share that the YouTube tools and analytics space generally includes several well-known competitors such as: Top-tier YouTube analytics/tools platforms typically include: YouTube Studio (YouTube's native tool) TubeBuddy VidIQ Social Blade Hootsuite (for social media management including YouTube) To provide you with accurate information about YouTube Tools Hub specifically, I would need to: Access their official website Review current feature comparisons Check recent industry reports or reviews For accurate, up-to-date comparisons, I recommend checking: The official YouTube Tools Hub website (if you can provide the URL) Industry review sites like G2, Capterra, or Trustpilot YouTube creator community forums and discussions If you can share more details about YouTube Tools Hub or provide their website URL, I'd be happy to help you think through what to look\"",
        sentiment: 'Positive'
    }
];

export const mockActionItems: ActionItem[] = [
    {
        id: "1",
        title: "Low AI Visibility: 12.5% vs 16.5% Average",
        description: "Your visibility score is 12.5%, while top competitors average 16.5%. You're mentioned 5 times vs 12 times for the leader.",
        impact: "Impact: Increasing to 30%+ could double your AI-driven discovery. Currently missing 2 potential mentions per analysis.",
        effort: "Medium Effort",
        type: "critical"
    },
    {
        id: "2",
        title: "Increase AI Mentions from 13% to 50%+",
        description: "You're mentioned in 5/40 responses (13% rate). Top brands achieve 50%+ mention rates. Create content that answers common questions in your industry.",
        impact: "Impact: 50%+ mention rate typically results in 40%+ visibility score. Increasing from 13% to 50% could boost visibility by 19%.",
        effort: "Medium Effort",
        type: "critical"
    },
    {
        id: "3",
        title: "Improve OpenAI Visibility (10% mention rate)",
        description: "You're mentioned in only 2/20 OpenAI responses (10% rate). Other providers: Anthropic 15%.",
        impact: "Impact: Improving OpenAI visibility to 50%+ could add 8% to overall visibility score",
        effort: "Medium Effort",
        type: "improvement"
    },
    {
        id: "4",
        title: "Increase Share of Voice from 12.5% to 20%+",
        description: "Your share of voice is 12.5%. TubeBuddy leads with 30.0% (17.5% gap). Identify and target key competitor mentions where TubeBuddy is mentioned more frequently. Focus on high-impact competitive keywords and content gaps.",
        impact: "Impact: Reaching 20%+ share of voice typically captures 1 in 5 AI recommendations in your category. Closing the 17.5% gap with TubeBuddy could significantly improve your competitive position.",
        effort: "Strategic",
        type: "improvement"
    },
    {
        id: "5",
        title: "Close 17.5% Gap with TubeBuddy",
        description: "TubeBuddy has 30% visibility vs your 12.5% (17.5% gap). They're mentioned 12 times vs your 5 times.",
        impact: "Impact: Closing this gap could capture 9% more market share",
        effort: "Strategic",
        type: "improvement"
    }
];

export const mockQuickWins: QuickWin[] = [
    {
        id: "1",
        title: "Create Comparison Pages: YouTube Tools Hub vs TubeBuddy",
        description: "Create detailed \"vs\" pages comparing YouTube Tools Hub to TubeBuddy, VidIQ, InVideo. These competitors are mentioned 28 times total. AI frequently references comparison content when users ask for alternatives.",
        impact: "Impact: Comparison content gets 3x more AI citations than standard pages. Top competitor TubeBuddy has 12 mentions - create content to compete.",
        badge: "Quick Win"
    },
    {
        id: "2",
        title: "Optimize Website for AI Crawlers (Current: 12.5% visibility)",
        description: "Ensure structured data (Schema.org), semantic HTML, comprehensive meta descriptions, and clear content hierarchy. AI models reference well-structured content more frequently. Your current 12.5% visibility suggests room for improvement.",
        impact: "Impact: Proper structure can improve AI comprehension by 25-30%. Well-structured sites see 2-3x more AI citations than poorly structured ones.",
        badge: "Quick Win"
    }
];

export const mockContentIdeas: ContentIdea[] = [
    {
        id: "1",
        title: "YouTube Tools Hub vs TubeBuddy: Complete Comparison",
        description: "Create a detailed comparison page. AI frequently references these when users ask about alternatives.",
        tags: ["YouTube Tools Hub vs TubeBuddy", "TubeBuddy alternative", "YouTube Tools Hub or TubeBuddy"]
    },
    {
        id: "2",
        title: "YouTube Tools Hub vs VidIQ: Complete Comparison",
        description: "Create a detailed comparison page. AI frequently references these when users ask about alternatives.",
        tags: ["YouTube Tools Hub vs VidIQ", "VidIQ alternative", "YouTube Tools Hub or VidIQ"]
    },
    {
        id: "3",
        title: "YouTube Tools Hub vs InVideo: Complete Comparison",
        description: "Create a detailed comparison page. AI frequently references these when users ask about alternatives.",
        tags: ["YouTube Tools Hub vs InVideo", "InVideo alternative", "YouTube Tools Hub or InVideo"]
    },
    {
        id: "4",
        title: "Why YouTube Tools Hub is a Top Choice in 2026",
        description: "Create authoritative content about your strengths. Include specific features, use cases, and benefits.",
        tags: ["best youtube tools hub", "YouTube Tools Hub review", "YouTube Tools Hub features"],
        priority: "High Priority"
    },
    {
        id: "5",
        title: "Customer Success Stories & Testimonials",
        description: "AI learns from reviews and testimonials. Publish customer success stories on your website.",
        tags: ["YouTube Tools Hub reviews", "YouTube Tools Hub testimonials", "YouTube Tools Hub success story"]
    }
];

export const mockBrandStrength: BrandStrength = {
    score: 39,
    total: 100,
    visibility: 13,
    sentiment: 50,
    shareOfVoice: 13,
    ranking: 100,
    healthScore: 50,
    healthStatus: "Good",
    healthDescription: "YouTube Tools Hub has good AI presence but room for improvement. You rank #3 out of 13 competitors with 12.5% visibility. Focus on the action items below to strengthen your position.",
    summary: {
        visibilityScore: 12.5,
        marketRank: 3,
        actionItems: 10,
        brandMentions: 5
    }
};
