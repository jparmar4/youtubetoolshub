/**
 * Topic cluster map for internal linking & topical authority.
 * Each cluster: 1 pillar + spokes (existing site pages only).
 * Used by content-processor auto-links and llms/GEO surfaces.
 */

export type ClusterPage = {
  path: string;
  title: string;
  /** Phrases that should auto-link to this page (longer first preferred) */
  anchors: string[];
};

export type TopicCluster = {
  id: string;
  name: string;
  pillar: ClusterPage;
  spokes: ClusterPage[];
};

export const topicClusters: TopicCluster[] = [
  {
    id: "monetization",
    name: "YouTube Monetization",
    pillar: {
      path: "/resources/youtube-monetization-guide",
      title: "YouTube Monetization Guide",
      anchors: [
        "youtube monetization guide",
        "youtube partner program",
        "youtube monetization",
        "how to monetize youtube",
      ],
    },
    spokes: [
      {
        path: "/tools/youtube-earnings-calculator",
        title: "YouTube Earnings Calculator",
        anchors: [
          "youtube earnings calculator",
          "youtube revenue calculator",
          "adsense earnings calculator",
        ],
      },
      {
        path: "/resources/youtube-cpm-rates",
        title: "YouTube CPM Rates by Country",
        anchors: ["youtube cpm rates", "cpm by country", "youtube rpm by country"],
      },
      {
        path: "/blog/youtube-partner-program-2026",
        title: "YouTube Partner Program 2026",
        anchors: ["partner program requirements", "ypp requirements"],
      },
      {
        path: "/blog/youtube-shorts-monetization-2026",
        title: "YouTube Shorts Monetization",
        anchors: ["shorts monetization", "youtube shorts pay"],
      },
      {
        path: "/blog/how-much-youtube-pays-per-1000-views-2026",
        title: "How Much YouTube Pays Per 1,000 Views",
        anchors: ["how much youtube pays", "pay per 1000 views", "youtube pay per view"],
      },
      {
        path: "/blog/youtube-rpm-vs-cpm-explained",
        title: "YouTube RPM vs CPM Explained",
        anchors: ["rpm vs cpm", "cpm vs rpm"],
      },
      {
        path: "/blog/youtube-monetization-guide-2026",
        title: "YouTube Monetization Guide 2026",
        anchors: ["monetization requirements 2026"],
      },
      {
        path: "/blog/high-cpm-youtube-niches-2026",
        title: "High CPM YouTube Niches",
        anchors: ["high cpm niches", "most profitable youtube niches"],
      },
      {
        path: "/blog/youtube-media-kit-template-2026",
        title: "YouTube Media Kit Template",
        anchors: ["youtube media kit", "creator media kit", "media kit template"],
      },
      {
        path: "/blog/youtube-adsense-payment-schedule-2026",
        title: "YouTube AdSense Payment Schedule",
        anchors: ["adsense payment schedule", "when does youtube pay"],
      },
    ],
  },
  {
    id: "cpm-rates",
    name: "CPM & RPM Data",
    pillar: {
      path: "/resources/youtube-cpm-rates",
      title: "YouTube CPM Rates by Country 2026",
      anchors: [
        "youtube cpm rates by country",
        "youtube cpm rates",
        "average youtube cpm",
      ],
    },
    spokes: [
      {
        path: "/tools/youtube-earnings-calculator",
        title: "Earnings Calculator",
        anchors: ["estimate youtube earnings", "calculate youtube revenue"],
      },
      {
        path: "/tools/youtube-earnings-calculator/usa",
        title: "US YouTube Earnings",
        anchors: ["youtube cpm usa", "us youtube cpm", "youtube earnings usa"],
      },
      {
        path: "/tools/youtube-earnings-calculator/uk",
        title: "UK YouTube Earnings",
        anchors: ["youtube cpm uk", "uk youtube cpm"],
      },
      {
        path: "/tools/youtube-earnings-calculator/india",
        title: "India YouTube Earnings",
        anchors: ["youtube cpm india", "india youtube cpm"],
      },
      {
        path: "/blog/youtube-cpm-rates-by-country-2026",
        title: "CPM Rates Blog Guide",
        anchors: ["cpm rates guide", "tier 1 cpm comparison"],
      },
      {
        path: "/resources/youtube-creator-statistics",
        title: "Creator Statistics",
        anchors: ["youtube creator statistics", "creator economy stats"],
      },
    ],
  },
  {
    id: "seo",
    name: "YouTube SEO & Algorithm",
    pillar: {
      path: "/resources/youtube-algorithm-guide",
      title: "YouTube Algorithm Guide",
      anchors: [
        "youtube algorithm guide",
        "how the youtube algorithm works",
        "youtube algorithm",
      ],
    },
    spokes: [
      {
        path: "/blog/youtube-seo-checklist-2026",
        title: "YouTube SEO Checklist 2026",
        anchors: ["youtube seo checklist", "youtube seo tips"],
      },
      {
        path: "/blog/youtube-algorithm-guide-2026",
        title: "Algorithm Ranking Factors 2026",
        anchors: ["youtube ranking factors", "rank on youtube"],
      },
      {
        path: "/tools/youtube-title-generator",
        title: "Title Generator",
        anchors: ["youtube title generator", "seo title generator"],
      },
      {
        path: "/tools/youtube-tag-generator",
        title: "Tag Generator",
        anchors: ["youtube tag generator", "video tags generator"],
      },
      {
        path: "/tools/youtube-description-generator",
        title: "Description Generator",
        anchors: ["youtube description generator", "video description template"],
      },
      {
        path: "/tools/youtube-tag-extractor",
        title: "Tag Extractor",
        anchors: ["youtube tag extractor", "extract youtube tags"],
      },
      {
        path: "/blog/youtube-keyword-research-tools-2026",
        title: "Keyword Research Tools",
        anchors: ["youtube keyword research"],
      },
      {
        path: "/tools/seo-tools",
        title: "SEO Tools Hub",
        anchors: ["youtube seo tools", "free youtube seo tools"],
      },
    ],
  },
  {
    id: "thumbnails",
    name: "Thumbnails & CTR",
    pillar: {
      path: "/tools/youtube-thumbnail-downloader",
      title: "YouTube Thumbnail Downloader",
      anchors: [
        "youtube thumbnail downloader",
        "download youtube thumbnail",
        "thumbnail downloader",
      ],
    },
    spokes: [
      {
        path: "/tools/youtube-ai-thumbnail-generator",
        title: "AI Thumbnail Generator",
        anchors: ["ai thumbnail generator", "youtube thumbnail maker"],
      },
      {
        path: "/tools/youtube-thumbnail-generator",
        title: "Thumbnail Text Generator",
        anchors: ["thumbnail text generator", "thumbnail text ideas"],
      },
      {
        path: "/tools/youtube-ai-thumbnail-prompt",
        title: "AI Thumbnail Prompt Generator",
        anchors: ["thumbnail prompt", "ai thumbnail prompt"],
      },
      {
        path: "/blog/youtube-thumbnail-design-psychology",
        title: "Thumbnail Design Psychology",
        anchors: ["thumbnail psychology", "thumbnail design tips"],
      },
      {
        path: "/blog/how-to-optimize-youtube-thumbnails",
        title: "How to Optimize Thumbnails",
        anchors: ["optimize youtube thumbnails", "thumbnail size"],
      },
      {
        path: "/blog/youtube-thumbnail-ab-testing-guide-2026",
        title: "Thumbnail A/B Testing",
        anchors: ["thumbnail ab testing", "thumbnail a/b test"],
      },
      {
        path: "/tools/thumbnail-tools",
        title: "All Thumbnail Tools",
        anchors: ["thumbnail tools"],
      },
    ],
  },
  {
    id: "shorts",
    name: "YouTube Shorts",
    pillar: {
      path: "/blog/youtube-shorts-monetization-2026",
      title: "YouTube Shorts Monetization 2026",
      anchors: ["youtube shorts monetization", "shorts revenue"],
    },
    spokes: [
      {
        path: "/tools/youtube-shorts-script-planner",
        title: "Shorts Script Planner",
        anchors: ["shorts script planner", "shorts script"],
      },
      {
        path: "/blog/youtube-shorts-ideas-2026",
        title: "Shorts Ideas 2026",
        anchors: ["youtube shorts ideas", "shorts video ideas"],
      },
      {
        path: "/blog/youtube-shorts-viral-strategy-2026",
        title: "Shorts Viral Strategy",
        anchors: ["viral shorts strategy", "make shorts go viral"],
      },
      {
        path: "/blog/shorts-vs-reels-vs-tiktok-pay",
        title: "Shorts vs Reels vs TikTok Pay",
        anchors: ["shorts vs reels", "shorts vs tiktok"],
      },
      {
        path: "/tools/youtube-hashtag-generator",
        title: "Hashtag Generator",
        anchors: ["youtube hashtag generator", "shorts hashtags"],
      },
    ],
  },
  {
    id: "growth",
    name: "Channel Growth",
    pillar: {
      path: "/blog/how-to-get-more-views-youtube-2026",
      title: "How to Get More Views on YouTube",
      anchors: [
        "how to get more views on youtube",
        "get more youtube views",
        "grow youtube channel",
      ],
    },
    spokes: [
      {
        path: "/blog/how-to-start-youtube-channel-2026",
        title: "How to Start a YouTube Channel",
        anchors: ["start a youtube channel", "how to start youtube"],
      },
      {
        path: "/blog/get-1000-subscribers-youtube-fast-2026",
        title: "Get 1,000 Subscribers",
        anchors: ["get 1000 subscribers", "first 1000 subscribers"],
      },
      {
        path: "/tools/youtube-channel-audit",
        title: "Channel Audit Checklist",
        anchors: ["youtube channel audit", "channel audit checklist"],
      },
      {
        path: "/tools/youtube-video-ideas-generator",
        title: "Video Ideas Generator",
        anchors: ["youtube video ideas", "video ideas generator"],
      },
      {
        path: "/tools/youtube-content-calendar-generator",
        title: "Content Calendar Generator",
        anchors: ["youtube content calendar", "content calendar generator"],
      },
      {
        path: "/blog/best-time-upload-youtube-2026",
        title: "Best Time to Upload",
        anchors: ["best time to upload youtube", "best upload time"],
      },
      {
        path: "/tools/youtube-subscriber-count-checker",
        title: "Subscriber Count Checker",
        anchors: ["subscriber count checker", "check subscribers"],
      },
    ],
  },
  {
    id: "niches",
    name: "Niche Selection",
    pillar: {
      path: "/blog/best-youtube-niches-2026",
      title: "Best YouTube Niches 2026",
      anchors: ["best youtube niches", "youtube niche ideas"],
    },
    spokes: [
      {
        path: "/tools/youtube-niche-finder-quiz",
        title: "Niche Finder Quiz",
        anchors: ["niche finder", "youtube niche quiz"],
      },
      {
        path: "/blog/high-cpm-youtube-niches-2026",
        title: "High CPM Niches",
        anchors: ["high cpm youtube niches"],
      },
      {
        path: "/blog/most-profitable-youtube-niches-2026",
        title: "Most Profitable Niches",
        anchors: ["profitable youtube niches"],
      },
      {
        path: "/blog/faceless-youtube-channel-2026",
        title: "Faceless YouTube Channel",
        anchors: ["faceless youtube channel", "faceless channel"],
      },
      {
        path: "/blog/faceless-youtube-channel-ideas-2026",
        title: "Faceless Channel Ideas",
        anchors: ["faceless youtube ideas", "faceless channel ideas"],
      },
    ],
  },
  {
    id: "ai-tools",
    name: "AI Creator Tools",
    pillar: {
      path: "/blog/best-ai-tools-youtube-creators-2026",
      title: "Best AI Tools for YouTube Creators",
      anchors: [
        "best ai tools for youtube",
        "ai tools for youtube creators",
        "ai youtube tools",
      ],
    },
    spokes: [
      {
        path: "/tools",
        title: "Free YouTube Tools Suite",
        anchors: [
          "free youtube tools",
          "youtube tools hub",
          "free tubebuddy alternative",
        ],
      },
      {
        path: "/tools/vs/tubebuddy",
        title: "vs TubeBuddy",
        anchors: ["tubebuddy alternative", "tube buddy alternative"],
      },
      {
        path: "/tools/vs/vidiq",
        title: "vs VidIQ",
        anchors: ["vidiq alternative", "vid iq alternative"],
      },
      {
        path: "/blog/ai-tools-youtube-creators-2026",
        title: "AI Tools Guide",
        anchors: ["ai for youtube creators"],
      },
      {
        path: "/blog/25-best-ai-tools-for-youtube-creators",
        title: "25 Best AI Tools",
        anchors: ["best free ai tools youtube"],
      },
      {
        path: "/tools/youtube-title-generator",
        title: "AI Title Generator",
        anchors: ["ai title generator"],
      },
    ],
  },
  {
    id: "analytics",
    name: "Analytics & Planning",
    pillar: {
      path: "/resources/youtube-creator-statistics",
      title: "YouTube Creator Statistics",
      anchors: [
        "youtube creator statistics",
        "youtube statistics 2026",
        "creator statistics",
      ],
    },
    spokes: [
      {
        path: "/blog/youtube-analytics-guide-beginners-2026",
        title: "YouTube Analytics Guide",
        anchors: ["youtube analytics guide", "youtube studio analytics"],
      },
      {
        path: "/tools/youtube-engagement-rate-calculator",
        title: "Engagement Rate Calculator",
        anchors: ["engagement rate calculator", "youtube engagement rate"],
      },
      {
        path: "/tools/youtube-channel-audit",
        title: "Channel Audit",
        anchors: ["audit your channel"],
      },
      {
        path: "/tools/analytics-tools",
        title: "Analytics Tools",
        anchors: ["youtube analytics tools"],
      },
      {
        path: "/blog/youtube-studio-walkthrough",
        title: "YouTube Studio Walkthrough",
        anchors: ["youtube studio guide", "youtube studio walkthrough"],
      },
    ],
  },
  {
    id: "content-strategy",
    name: "Content Strategy",
    pillar: {
      path: "/blog/youtube-video-ideas-that-actually-work",
      title: "Video Ideas That Actually Work",
      anchors: ["youtube video ideas that work", "content ideas for youtube"],
    },
    spokes: [
      {
        path: "/tools/youtube-video-ideas-generator",
        title: "Video Ideas Generator",
        anchors: ["video ideas generator"],
      },
      {
        path: "/blog/youtube-content-batching",
        title: "Content Batching",
        anchors: ["content batching", "batch youtube videos"],
      },
      {
        path: "/blog/youtube-script-formula-retention",
        title: "Script Formula for Retention",
        anchors: ["youtube script formula", "retention script"],
      },
      {
        path: "/tools/youtube-intro-script-generator",
        title: "Intro Script Generator",
        anchors: ["intro script generator", "youtube hook script"],
      },
      {
        path: "/tools/youtube-timestamp-generator",
        title: "Timestamp Generator",
        anchors: ["youtube chapters", "timestamp generator", "youtube timestamps"],
      },
      {
        path: "/blog/how-to-write-catchy-youtube-titles",
        title: "Catchy YouTube Titles",
        anchors: ["catchy youtube titles", "write youtube titles"],
      },
    ],
  },
];

/** Flat map of anchor phrase (lowercase) → path for auto-linking */
export function getClusterKeywordMap(): Record<string, string> {
  const map: Record<string, string> = {};
  for (const cluster of topicClusters) {
    const pages = [cluster.pillar, ...cluster.spokes];
    for (const page of pages) {
      for (const anchor of page.anchors) {
        const key = anchor.toLowerCase();
        // Prefer first registration (pillar anchors often registered first in cluster order)
        if (!map[key]) {
          map[key] = page.path;
        }
      }
    }
  }
  return map;
}

/** Resolve cluster for a path (blog slug or full path) */
export function getClusterForPath(pathOrSlug: string): TopicCluster | undefined {
  const normalized = pathOrSlug.startsWith("/")
    ? pathOrSlug
    : `/blog/${pathOrSlug}`;
  return topicClusters.find(
    (c) =>
      c.pillar.path === normalized ||
      c.spokes.some((s) => s.path === normalized),
  );
}

/** Sibling pages in the same cluster (excluding self) for plain-text related links */
export function getClusterSiblings(
  pathOrSlug: string,
  limit = 5,
): ClusterPage[] {
  const path = pathOrSlug.startsWith("/")
    ? pathOrSlug
    : `/blog/${pathOrSlug}`;
  const cluster = getClusterForPath(path);
  if (!cluster) return [];
  const all = [cluster.pillar, ...cluster.spokes].filter((p) => p.path !== path);
  return all.slice(0, limit);
}
