import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getToolBySlug, tools } from "@/config/tools";
import { siteConfig } from "@/config/site";
import { ToolContextProvider } from "@/components/tools/ToolContext";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { FaExternalLinkAlt, FaYoutube, FaBolt } from "react-icons/fa";

const toolComponents: Record<string, React.ComponentType> = {
  "youtube-thumbnail-downloader": dynamic(() => import("@/components/tools/ThumbnailDownloader")),
  "youtube-thumbnail-generator": dynamic(() => import("@/components/tools/ThumbnailGenerator")),
  "youtube-ai-thumbnail-generator": dynamic(() => import("@/components/tools/AIThumbnailGenerator")),
  "youtube-ai-thumbnail-prompt": dynamic(() => import("@/components/tools/AIThumbnailPromptGenerator")),
  "youtube-title-generator": dynamic(() => import("@/components/tools/TitleGenerator")),
  "youtube-description-generator": dynamic(() => import("@/components/tools/DescriptionGenerator")),
  "youtube-tag-generator": dynamic(() => import("@/components/tools/TagGenerator")),
  "youtube-tag-extractor": dynamic(() => import("@/components/tools/TagExtractor")),
  "youtube-video-ideas-generator": dynamic(() => import("@/components/tools/VideoIdeasGenerator")),
  "youtube-trend-helper": dynamic(() => import("@/components/tools/TrendHelper")),
  "youtube-content-calendar-generator": dynamic(() => import("@/components/tools/ContentCalendarGenerator")),
  "youtube-earnings-calculator": dynamic(() => import("@/components/tools/EarningsCalculator")),
  "youtube-engagement-rate-calculator": dynamic(() => import("@/components/tools/EngagementCalculator")),
  "youtube-title-ab-tester": dynamic(() => import("@/components/tools/TitleABTester")),
  "youtube-channel-name-generator": dynamic(() => import("@/components/tools/ChannelNameGenerator")),
  "youtube-hashtag-generator": dynamic(() => import("@/components/tools/HashtagGenerator")),
  "youtube-intro-script-generator": dynamic(() => import("@/components/tools/IntroScriptGenerator")),
  "youtube-channel-id-finder": dynamic(() => import("@/components/tools/ChannelIdFinder")),
  "youtube-playlist-length-calculator": dynamic(() => import("@/components/tools/PlaylistLengthCalculator")),
  "youtube-comment-picker": dynamic(() => import("@/components/tools/CommentPicker")),
  "youtube-channel-audit": dynamic(() => import("@/components/tools/ChannelAudit")),
  "youtube-subscriber-count-checker": dynamic(() => import("@/components/tools/SubscriberCountChecker")),
  "youtube-video-download-options": dynamic(() => import("@/components/tools/VideoDownloadOptionsGuide")),
  "youtube-timestamp-generator": dynamic(() => import("@/components/tools/TimestampGenerator")),
  "youtube-shorts-script-planner": dynamic(() => import("@/components/tools/ShortsScriptPlanner")),
  "youtube-banner-logo-maker": dynamic(() => import("@/components/tools/BannerLogoMaker")),
  "youtube-niche-finder-quiz": dynamic(() => import("@/components/tools/NicheFinderQuiz")),
  "youtube-sponsorship-calculator": dynamic(() => import("@/components/tools/SponsorshipCalculator")),
  "youtube-channel-valuation-calculator": dynamic(() => import("@/components/tools/ChannelValuationCalculator")),
  "youtube-tax-deduction-calculator": dynamic(() => import("@/components/tools/TaxDeductionCalculator")),
  "youtube-transcript-downloader": dynamic(() => import("@/components/tools/TranscriptDownloader")),
  "youtube-thumbnail-feed-previewer": dynamic(() => import("@/components/tools/ThumbnailFeedPreviewer")),
  "youtube-llc-vs-s-corp-tax-savings-calculator": dynamic(() => import("@/components/tools/LLCvsSCorpCalculator")),
  "patreon-vs-youtube-memberships-vs-fourthwall-fee-calculator": dynamic(() => import("@/components/tools/MembershipFeeCalculator")),
  "youtube-shorts-music-royalty-split-calculator": dynamic(() => import("@/components/tools/ShortsMusicSplitCalculator")),
  "youtube-ads-cost-calculator": dynamic(() => import("@/components/tools/AdsCostCalculator")),
  "youtube-subscribe-link-generator": dynamic(() => import("@/components/tools/SubscribeLinkGenerator")),
  "youtube-video-summary-generator": dynamic(() => import("@/components/tools/VideoSummaryGenerator")),
  "youtube-outlier-calculator": dynamic(() => import("@/components/tools/OutlierCalculator")),
  "youtube-embed-code-generator": dynamic(() => import("@/components/tools/EmbedCodeGenerator")),
  "youtube-adsense-fee-calculator": dynamic(() => import("@/components/tools/AdSenseFeeCalculator")),
};

export const dynamicParams = false;

export function generateStaticParams() {
  return tools.map((tool) => ({
    slug: tool.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    return {
      title: "Tool Not Found",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: `${tool.name} (Embed Widget) | YouTube Tools Hub`,
    description: tool.shortDescription,
    robots: {
      index: false,
      follow: true,
    },
    alternates: {
      canonical: `${siteConfig.url}/tools/${tool.slug}`,
    },
  };
}

export default async function EmbedToolPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  const ToolComponent = toolComponents[slug] || null;

  return (
    <div className="w-full min-h-screen bg-slate-50 dark:bg-slate-950 p-2 sm:p-4 flex flex-col justify-between font-sans antialiased text-slate-800 dark:text-slate-100">
      <div className="max-w-4xl mx-auto w-full">
        {/* Minimal Widget Header */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-600 to-fuchsia-600 flex items-center justify-center text-white text-xs shadow-sm">
              <FaYoutube />
            </span>
            <span className="font-bold text-sm text-slate-900 dark:text-white truncate max-w-[220px] sm:max-w-md">
              {tool.name}
            </span>
          </div>
          <a
            href={`${siteConfig.url}/tools/${tool.slug}?utm_source=embed&utm_medium=widget_header`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-purple-600 dark:text-purple-400 hover:text-purple-700 hover:underline flex items-center gap-1 shrink-0"
          >
            <span>Full Tool</span>
            <FaExternalLinkAlt className="text-[10px]" />
          </a>
        </div>

        {/* The Interactive Tool Container */}
        {ToolComponent ? (
          <ToolContextProvider value={{ hideHeader: true }}>
            <Suspense
              fallback={
                <div className="min-h-[300px] flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500" />
                </div>
              }
            >
              <ToolComponent />
            </Suspense>
          </ToolContextProvider>
        ) : (
          <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <p className="text-sm text-slate-500">Interactive preview unavailable for this embed.</p>
          </div>
        )}
      </div>

      {/* Embed Backlink Attribution Footer */}
      <div className="max-w-4xl mx-auto w-full mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500 dark:text-slate-400">
        <span className="inline-flex items-center gap-1.5 font-medium">
          <FaBolt className="text-purple-500" /> Free Creator Suite • No Signup Required
        </span>
        <a
          href={`${siteConfig.url}/tools/${tool.slug}?utm_source=embed&utm_medium=backlink_footer`}
          target="_blank"
          rel="noopener"
          className="font-bold text-purple-600 dark:text-purple-400 hover:text-purple-700 hover:underline inline-flex items-center gap-1"
        >
          <span>Powered by YouTube Tools Hub</span>
          <span>&rarr;</span>
        </a>
      </div>
    </div>
  );
}
