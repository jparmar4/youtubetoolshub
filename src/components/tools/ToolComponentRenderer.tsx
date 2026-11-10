"use client";

import dynamic from "next/dynamic";
import { ComponentType, ReactNode, Suspense } from "react";

// Client-only dynamic registry so Next.js emits separate lazy chunks per tool
// instead of bundling all 45 interactive tools into every Server Component route.
const toolComponents: Record<string, ComponentType> = {
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
  "youtube-watch-hours-calculator": dynamic(() => import("@/components/tools/WatchHoursCalculator")),
  "youtube-shorts-vs-long-form-calculator": dynamic(() => import("@/components/tools/ShortsVsLongFormCalculator")),
  "youtube-milestone-countdown-calculator": dynamic(() => import("@/components/tools/MilestoneCountdownCalculator")),
  "youtube-thumbnail-ab-test-calculator": dynamic(() => import("@/components/tools/ThumbnailABTestCalculator")),
};

const defaultSpinner = (
  <div className="min-h-[360px] flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500" />
  </div>
);

export default function ToolComponentRenderer({
  slug,
  fallback = defaultSpinner,
  unavailableFallback = null,
}: {
  slug: string;
  fallback?: ReactNode;
  unavailableFallback?: ReactNode;
}) {
  const ToolComponent = toolComponents[slug];

  if (!ToolComponent) {
    return <>{unavailableFallback}</>;
  }

  return (
    <Suspense fallback={fallback}>
      <ToolComponent />
    </Suspense>
  );
}

