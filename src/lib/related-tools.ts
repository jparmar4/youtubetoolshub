import { tools, type Tool } from "@/config/tools";

/** High-intent tool slugs to push for monetization + rankings */
export const PRIORITY_TOOL_SLUGS = [
  "youtube-thumbnail-downloader",
  "youtube-title-generator",
  "youtube-tag-generator",
  "youtube-earnings-calculator",
  "youtube-sponsorship-calculator",
  "youtube-channel-valuation-calculator",
  "youtube-tax-deduction-calculator",
  "youtube-tag-extractor",
  "youtube-description-generator",
  "youtube-channel-audit",
  "youtube-ai-thumbnail-generator",
  "youtube-hashtag-generator",
  "youtube-video-ideas-generator",
] as const;

const CATEGORY_TOOL_MAP: Record<string, string[]> = {
  "YouTube SEO": [
    "youtube-title-generator",
    "youtube-tag-generator",
    "youtube-tag-extractor",
    "youtube-description-generator",
    "youtube-channel-audit",
  ],
  Monetization: [
    "youtube-earnings-calculator",
    "youtube-sponsorship-calculator",
    "youtube-channel-valuation-calculator",
    "youtube-tax-deduction-calculator",
    "youtube-engagement-rate-calculator",
    "youtube-channel-audit",
  ],
  Thumbnails: [
    "youtube-thumbnail-downloader",
    "youtube-thumbnail-generator",
    "youtube-ai-thumbnail-generator",
    "youtube-ai-thumbnail-prompt",
  ],
  Shorts: [
    "youtube-shorts-script-planner",
    "youtube-hashtag-generator",
    "youtube-title-generator",
    "youtube-video-ideas-generator",
  ],
  Growth: [
    "youtube-video-ideas-generator",
    "youtube-content-calendar-generator",
    "youtube-channel-audit",
    "youtube-trend-helper",
  ],
  Equipment: [
    "youtube-banner-logo-maker",
    "youtube-channel-name-generator",
    "youtube-intro-script-generator",
  ],
  AI: [
    "youtube-ai-thumbnail-generator",
    "youtube-ai-thumbnail-prompt",
    "youtube-title-generator",
    "youtube-description-generator",
  ],
};

/**
 * Real post categories (30 drifting strings across 86 posts) → entries in
 * CATEGORY_TOOL_MAP. The fuzzy includes-match already catches variants like
 * "YouTube Growth" → Growth and "AI Tools" → AI; these aliases cover the
 * misses ("SEO & Metadata", "Thumbnail & Design", "Business", …) so posts
 * get topical tool links instead of falling straight to priority fallbacks.
 */
const CATEGORY_ALIASES: Record<string, string[]> = {
  "YouTube SEO": ["SEO", "SEO & Growth", "SEO & Metadata", "SEO Tools", "SEO Tips"],
  Monetization: ["Business", "YouTube Monetization", "Finance"],
  Thumbnails: ["Thumbnail & Design", "Thumbnail & CTR", "Design & Branding"],
  Growth: [
    "Content Strategy",
    "Content Ideas",
    "Getting Started",
    "Analytics & Growth",
  ],
  Equipment: [
    "Video Editing",
    "YouTube Gear",
    "Creator Gear",
    "Scripting",
    "YouTube Tutorials",
  ],
  AI: ["Automation", "Tools & Automation", "Tool Reviews", "YouTube Tools"],
};

const KEYWORD_TOOL_HINTS: Array<{ pattern: RegExp; slugs: string[] }> = [
  { pattern: /sponsor|brand.?deal|media.?kit/i, slugs: ["youtube-sponsorship-calculator"] },
  { pattern: /valuation|channel.?worth|sell.*channel|buy.*channel/i, slugs: ["youtube-channel-valuation-calculator"] },
  { pattern: /tax|write.?off|deduct/i, slugs: ["youtube-tax-deduction-calculator"] },
  {
    pattern: /thumbnail|ctr|click.?through/i,
    slugs: [
      "youtube-thumbnail-downloader",
      "youtube-thumbnail-generator",
      "youtube-ai-thumbnail-generator",
    ],
  },
  {
    pattern: /cpm|rpm|earn|monetiz|adsense|revenue|pay per|1 million views|media kit|sponsorship/i,
    slugs: ["youtube-earnings-calculator", "youtube-engagement-rate-calculator"],
  },
  {
    pattern: /1000 subscribers|1,000 subscribers|first 1000|watch hours|partner program/i,
    slugs: ["youtube-channel-audit", "youtube-video-ideas-generator", "youtube-content-calendar-generator"],
  },
  {
    pattern: /\btags?\b|keyword/i,
    slugs: ["youtube-tag-generator", "youtube-tag-extractor"],
  },
  {
    pattern: /title|headline/i,
    slugs: ["youtube-title-generator", "youtube-title-ab-tester"],
  },
  {
    pattern: /description|metadata|seo/i,
    slugs: [
      "youtube-description-generator",
      "youtube-tag-generator",
      "youtube-title-generator",
    ],
  },
  {
    pattern: /short/i,
    slugs: [
      "youtube-shorts-script-planner",
      "youtube-hashtag-generator",
      "youtube-video-ideas-generator",
    ],
  },
  {
    pattern: /algorithm|growth|subscriber|views/i,
    slugs: [
      "youtube-channel-audit",
      "youtube-video-ideas-generator",
      "youtube-content-calendar-generator",
    ],
  },
  {
    pattern: /hashtag/i,
    slugs: ["youtube-hashtag-generator"],
  },
  {
    pattern: /calendar|batch|schedule|ideas/i,
    slugs: [
      "youtube-content-calendar-generator",
      "youtube-video-ideas-generator",
    ],
  },
  {
    pattern: /tubebuddy|vidiq|alternative/i,
    slugs: [
      "youtube-tag-generator",
      "youtube-title-generator",
      "youtube-channel-audit",
    ],
  },
];

function resolveTools(slugs: string[]): Tool[] {
  const seen = new Set<string>();
  const result: Tool[] = [];
  for (const slug of slugs) {
    if (seen.has(slug)) continue;
    const tool = tools.find((t) => t.slug === slug);
    if (tool) {
      seen.add(slug);
      result.push(tool);
    }
  }
  return result;
}

/**
 * Pick related free tools for a blog post based on category + keywords.
 * Used for internal linking / AEO contextual CTAs.
 */
export function getRelatedToolsForPost(
  post: {
    category?: string;
    keywords?: string[];
    title?: string;
    slug?: string;
  },
  limit = 4,
): Tool[] {
  const slugs: string[] = [];

  const haystack = [
    post.title || "",
    post.slug || "",
    ...(post.keywords || []),
  ].join(" ");

  for (const hint of KEYWORD_TOOL_HINTS) {
    if (hint.pattern.test(haystack)) {
      slugs.push(...hint.slugs);
    }
  }

  if (post.category) {
    const cat = post.category.toLowerCase();
    // 1. Direct alias hit
    for (const [mapKey, aliases] of Object.entries(CATEGORY_ALIASES)) {
      if (aliases.some((a) => a.toLowerCase() === cat)) {
        slugs.push(...CATEGORY_TOOL_MAP[mapKey]);
        break;
      }
    }
    // 2. Fuzzy match for unaliased variants
    const catKey = Object.keys(CATEGORY_TOOL_MAP).find(
      (k) =>
        cat.includes(k.toLowerCase()) ||
        k.toLowerCase().includes(cat),
    );
    if (catKey) slugs.push(...CATEGORY_TOOL_MAP[catKey]);
  }

  // Always ensure a few priority tools as fallback
  slugs.push(...PRIORITY_TOOL_SLUGS.slice(0, 4));

  return resolveTools(slugs).slice(0, limit);
}

export function getPriorityTools(limit = 8): Tool[] {
  return resolveTools([...PRIORITY_TOOL_SLUGS]).slice(0, limit);
}

const MONEY_TOPIC =
  /monetiz|adsense|cpm|rpm|earn|revenue|income|pay(?:s|ing|ment)?|sponsor|super.?thanks|partner.?program|how.?much.?youtube|money.?per|faceless.?income|profit|ypp/i;

/**
 * True when a blog post is primarily about money / monetization / CPM-RPM.
 * Used to auto-insert the Earnings Calculator CTA.
 */
export function isMonetizationPost(post: {
  slug?: string;
  title?: string;
  category?: string;
  keywords?: string[];
  excerpt?: string;
  metaDescription?: string;
}): boolean {
  const haystack = [
    post.slug || "",
    post.title || "",
    post.category || "",
    post.excerpt || "",
    post.metaDescription || "",
    ...(post.keywords || []),
  ].join(" ");

  if (MONEY_TOPIC.test(haystack)) return true;

  const cat = (post.category || "").toLowerCase();
  if (
    cat.includes("monetiz") ||
    cat.includes("business") ||
    cat.includes("finance") ||
    cat.includes("earning")
  ) {
    return true;
  }

  return false;
}

/**
 * Related blog topics for a tool page (keyword overlap on tool name/keywords).
 */
export function getRelatedBlogHintsForTool(
  tool: { name: string; keywords: string[]; slug: string },
  posts: Array<{
    slug: string;
    title: string;
    category: string;
    keywords: string[];
  }>,
  limit = 4,
): Array<{ slug: string; title: string; category: string }> {
  const toolTerms = [
    tool.name.toLowerCase(),
    tool.slug.replace(/-/g, " "),
    ...tool.keywords.map((k) => k.toLowerCase()),
  ];

  const scored = posts.map((post) => {
    const postText = [
      post.title,
      post.category,
      ...post.keywords,
    ]
      .join(" ")
      .toLowerCase();
    let score = 0;
    for (const term of toolTerms) {
      if (term.length < 4) continue;
      if (postText.includes(term)) score += 2;
      // partial token match
      const tokens = term.split(/\s+/).filter((t) => t.length > 3);
      for (const t of tokens) {
        if (postText.includes(t)) score += 1;
      }
    }
    return { post, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ post }) => ({
      slug: post.slug,
      title: post.title,
      category: post.category,
    }));
}
