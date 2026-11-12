import type { ReactNode } from "react";

/**
 * Hand-drawn SVG artwork registry — one distinctive motif per tool.
 *
 * Design language (consistent across all 45):
 *  - 48x48 viewBox, rendered at `1em` so it scales with .ti-box font-size
 *  - Primary shapes stroke `currentColor` (white on the gradient cube),
 *    width 3, round caps/joins — bold enough to read at 18–34px
 *  - Glass fills rgba(255,255,255,.22–.3) for depth
 *  - Gold (#fde047) reserved for sparkle/star/coin accents — one accent
 *    language across every theme
 */

const STROKE = {
  stroke: "currentColor",
  strokeWidth: 3,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  fill: "none" as const,
};

const GLASS = "rgba(255,255,255,0.24)";
const GLASS_SOFT = "rgba(255,255,255,0.16)";
const GOLD = "#fde047";

function Sparkle({ x, y, s = 6 }: { x: number; y: number; s?: number }) {
  return (
    <path
      d="M0 -7 L1.9 -1.9 L7 0 L1.9 1.9 L0 7 L-1.9 1.9 L-7 0 L-1.9 -1.9 Z"
      transform={`translate(${x} ${y}) scale(${(s / 7).toFixed(2)})`}
      fill={GOLD}
    />
  );
}

function Svg({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 48 48" width="1em" height="1em" aria-hidden="true" focusable="false">
      {children}
    </svg>
  );
}

// 1. Thumbnail Downloader — image frame with a download badge
const ThumbDownloader = () => (
  <Svg>
    <rect x="7" y="9" width="34" height="26" rx="4" {...STROKE} />
    <circle cx="16" cy="18" r="3" {...STROKE} />
    <path d="M13 29 l7-7 6 6 4-4 7 7" {...STROKE} />
    <circle cx="37" cy="36" r="7" fill="rgba(15,23,42,0.45)" />
    <path d="M37 32.5v7 M33.8 36.5l3.2 3 3.2-3" {...STROKE} strokeWidth={2.5} />
    <Sparkle x={41} y={6} s={5} />
  </Svg>
);

// 2. Thumbnail Generator — frame + magic wand
const ThumbGenerator = () => (
  <Svg>
    <rect x="7" y="9" width="34" height="26" rx="4" {...STROKE} />
    <path d="M13 29 l7-7 6 6 4-4 7 7" {...STROKE} />
    <path d="M14 15 L26 27" {...STROKE} strokeWidth={2.5} />
    <Sparkle x={29} y={13} s={7} />
    <Sparkle x={36} y={6} s={4} />
  </Svg>
);

// 3. AI Thumbnail Generator — frame + AI chip
const AiThumbGenerator = () => (
  <Svg>
    <rect x="7" y="9" width="34" height="26" rx="4" {...STROKE} />
    <rect x="15" y="17" width="18" height="12" rx="3" fill={GLASS} />
    <path d="M20 26 v-6 l3 3 3-3 v6" {...STROKE} strokeWidth={2.5} />
    <path d="M29.5 20 l1.5 4 -1.5 2" {...STROKE} strokeWidth={2.5} />
    <Sparkle x={40} y={7} s={6} />
  </Svg>
);

// 4. AI Thumbnail Prompt Generator — wand + sparkles
const AiThumbPrompt = () => (
  <Svg>
    <path d="M13 35 L29 19" {...STROKE} strokeWidth={3.5} />
    <path d="M25 15 l8 8" {...STROKE} strokeWidth={3.5} />
    <Sparkle x={36} y={12} s={8} />
    <Sparkle x={40} y={24} s={5} />
    <Sparkle x={12} y={12} s={5} />
    <path d="M36 34 a6 6 0 0 1 6 6" {...STROKE} strokeWidth={2.5} />
  </Svg>
);

// 5. Title Generator — heading bars + sparkle
const TitleGenerator = () => (
  <Svg>
    <rect x="8" y="13" width="30" height="7" rx="2.5" fill="currentColor" opacity={0.92} />
    <rect x="8" y="25" width="20" height="6" rx="2.5" fill={GLASS} />
    <path d="M8 37 h14" {...STROKE} strokeWidth={2.5} />
    <Sparkle x={40} y={10} s={7} />
  </Svg>
);

// 6. Description Generator — paragraph lines
const DescriptionGenerator = () => (
  <Svg>
    <path d="M9 12 h30 M9 20 h24 M9 28 h30 M9 36 h18" {...STROKE} />
    <Sparkle x={40} y={35} s={5} />
  </Svg>
);

// 7. Tag Generator — price tag + sparkle
const TagGenerator = () => (
  <Svg>
    <path d="M9 27 L25 11 h9 a4 4 0 0 1 4 4 v9 L24 39 a4 4 0 0 1-5.7 0 L9 32.7 a4 4 0 0 1 0-5.7 Z" {...STROKE} />
    <circle cx="33" cy="17" r="2.6" fill={GOLD} />
    <Sparkle x={41} y={7} s={5} />
  </Svg>
);

// 8. Tag Extractor — tag + magnifier
const TagExtractor = () => (
  <Svg>
    <path d="M7 21 L19 9 h8 a3.5 3.5 0 0 1 3.5 3.5 V20 L21 31 a3.5 3.5 0 0 1-5 0 L7 26 a3.5 3.5 0 0 1 0-5 Z" {...STROKE} />
    <circle cx="26" cy="15" r="2.2" fill={GOLD} />
    <circle cx="33" cy="30" r="7.5" {...STROKE} />
    <path d="M38.5 35.5 L44 41" {...STROKE} strokeWidth={3.5} />
  </Svg>
);

// 9. Video Ideas Generator — lightbulb
const VideoIdeas = () => (
  <Svg>
    <path d="M24 7 a11 11 0 0 1 6.5 20 c-1.5 1.1-2 2.4-2 4.5 h-9 c0-2.1-.5-3.4-2-4.5 A11 11 0 0 1 24 7 Z" {...STROKE} />
    <path d="M20 37 h8 M21.5 41.5 h5" {...STROKE} strokeWidth={2.5} />
    <Sparkle x={38} y={9} s={6} />
  </Svg>
);

// 10. Trend Helper — rising chart
const TrendHelper = () => (
  <Svg>
    <path d="M7 40 h34" {...STROKE} />
    <path d="M10 33 l9-9 6 5 12-13" {...STROKE} strokeWidth={3.5} />
    <path d="M31 15 h6 v6" {...STROKE} strokeWidth={3} />
    <circle cx="37" cy="16" r="2.6" fill={GOLD} />
  </Svg>
);

// 11. Content Calendar Generator — calendar grid
const ContentCalendar = () => (
  <Svg>
    <rect x="8" y="10" width="32" height="30" rx="4" {...STROKE} />
    <path d="M16 6 v6 M32 6 v6 M8 19 h32" {...STROKE} />
    <circle cx="17" cy="26" r="1.8" fill={GOLD} />
    <circle cx="24" cy="26" r="1.8" fill="currentColor" />
    <circle cx="31" cy="26" r="1.8" fill="currentColor" />
    <circle cx="17" cy="33" r="1.8" fill="currentColor" />
    <circle cx="24" cy="33" r="1.8" fill="currentColor" />
    <circle cx="31" cy="33" r="1.8" fill="currentColor" />
  </Svg>
);

// 12. Earnings Calculator — dollar coin + mini coin
const EarningsCalculator = () => (
  <Svg>
    <circle cx="23" cy="23" r="14" {...STROKE} />
    <path d="M23 10.5 v3 M23 32.5 v3" {...STROKE} strokeWidth={2.5} />
    <path d="M28.5 16.5 c-2-2-9-1.5-9 2.5 0 4.5 9 2.5 9 7 0 4-7 4.5-9 2.5" {...STROKE} strokeWidth={3} />
    <circle cx="38" cy="37" r="6" fill="rgba(15,23,42,0.4)" />
    <path d="M38 34.5 v5 M36 36.8 h4" stroke={GOLD} strokeWidth={2.2} strokeLinecap="round" fill="none" />
  </Svg>
);

// 13. Engagement Rate Calculator — heart + gauge arc
const EngagementCalculator = () => (
  <Svg>
    <path d="M22 39 C10 31 8 23 12.2 18 c3-3.4 7.8-2.4 9.8 1 2-3.4 6.8-4.4 9.8-1 4.2 5 2.2 13-9.8 21 Z" {...STROKE} />
    <path d="M36 8 a11 11 0 0 1 6 10" {...STROKE} strokeWidth={2.5} />
    <circle cx="36" cy="8" r="2.4" fill={GOLD} />
  </Svg>
);

// 14. Title A/B Tester — split panels
const TitleAbTester = () => (
  <Svg>
    <rect x="7" y="11" width="14" height="26" rx="3" fill={GLASS} />
    <rect x="27" y="11" width="14" height="26" rx="3" {...STROKE} />
    <path d="M24 8 v32" {...STROKE} strokeWidth={2.5} strokeDasharray="3 4" />
    <circle cx="14" cy="24" r="3" fill={GOLD} />
    <circle cx="34" cy="24" r="3" fill="currentColor" />
  </Svg>
);

// 15. Channel Name Generator — @ badge
const ChannelName = () => (
  <Svg>
    <circle cx="24" cy="24" r="14.5" {...STROKE} />
    <circle cx="23" cy="24" r="4.5" {...STROKE} strokeWidth={2.8} />
    <path d="M27.5 24 v3 a3.5 3.5 0 0 0 6.5-1.5 A10.5 10.5 0 1 0 30 31.5" {...STROKE} strokeWidth={2.8} />
  </Svg>
);

// 16. Hashtag Generator — hash mark
const HashtagGenerator = () => (
  <Svg>
    <path d="M19 9 L15 39 M33 9 L29 39" {...STROKE} strokeWidth={3.5} />
    <path d="M11 18 h27 M9 30 h27" {...STROKE} strokeWidth={3.5} />
    <Sparkle x={41} y={8} s={5} />
  </Svg>
);

// 17. Intro Script Generator — microphone
const IntroScript = () => (
  <Svg>
    <rect x="18" y="6" width="12" height="20" rx="6" {...STROKE} />
    <path d="M12 21 a12 12 0 0 0 24 0" {...STROKE} />
    <path d="M24 33 v6 M18 41.5 h12" {...STROKE} />
    <Sparkle x={40} y={10} s={5} />
  </Svg>
);

// 18. Channel ID Finder — ID card + magnifier
const ChannelIdFinder = () => (
  <Svg>
    <rect x="6" y="11" width="27" height="22" rx="3.5" {...STROKE} />
    <circle cx="14.5" cy="19" r="3" {...STROKE} strokeWidth={2.5} />
    <path d="M22 17 h7 M22 22 h7 M11 27 h17" {...STROKE} strokeWidth={2.5} />
    <circle cx="34" cy="31" r="7.5" {...STROKE} />
    <path d="M39.5 36.5 L44.5 41.5" {...STROKE} strokeWidth={3.5} />
  </Svg>
);

// 19. Playlist Length Calculator — list + clock
const PlaylistLength = () => (
  <Svg>
    <path d="M7 13 h22 M7 20 h16 M7 27 h20" {...STROKE} strokeWidth={3} />
    <circle cx="33" cy="31" r="9.5" {...STROKE} />
    <path d="M33 25.5 v5.5 h5.5" {...STROKE} strokeWidth={2.8} />
    <path d="M7 34 h11" {...STROKE} strokeWidth={3} />
  </Svg>
);

// 20. Comment Picker — speech bubble + star
const CommentPicker = () => (
  <Svg>
    <path d="M8 11 a4 4 0 0 1 4-4 h24 a4 4 0 0 1 4 4 v13 a4 4 0 0 1-4 4 H21 l-8 8 v-8 h-5 a4 4 0 0 1-4-4 Z" {...STROKE} fill={GLASS_SOFT} />
    <path d="M24 14.5 l2 4.2 4.6 0.6 -3.3 3.2 0.8 4.6 -4.1-2.2 -4.1 2.2 0.8-4.6 -3.3-3.2 4.6-0.6 Z" fill={GOLD} />
  </Svg>
);

// 21. Channel Audit — clipboard + check
const ChannelAudit = () => (
  <Svg>
    <rect x="10" y="10" width="28" height="30" rx="4" {...STROKE} />
    <rect x="17" y="5.5" width="14" height="7" rx="2.5" fill="currentColor" />
    <path d="M16 27.5 l5.5 5.5 L33.5 21" {...STROKE} strokeWidth={3.5} />
    <Sparkle x={41} y={9} s={5} />
  </Svg>
);

// 22. Subscriber Count Checker — person + plus badge
const SubscriberCount = () => (
  <Svg>
    <circle cx="19" cy="16" r="6.5" {...STROKE} />
    <path d="M8.5 37 c0-7.5 4.5-11 10.5-11 s10.5 3.5 10.5 11" {...STROKE} />
    <circle cx="35" cy="30" r="7.5" fill="rgba(15,23,42,0.4)" />
    <path d="M35 26.5 v7 M31.5 30 h7" stroke={GOLD} strokeWidth={2.6} strokeLinecap="round" fill="none" />
  </Svg>
);

// 23. Video Download Options — arrow into tray
const VideoDownloadOptions = () => (
  <Svg>
    <path d="M24 6 v17 M15.5 17 l8.5 8.5 8.5-8.5" {...STROKE} strokeWidth={3.5} />
    <path d="M8 32 v6 a3 3 0 0 0 3 3 h26 a3 3 0 0 0 3-3 v-6" {...STROKE} />
    <Sparkle x={40} y={10} s={5} />
  </Svg>
);

// 24. Timestamp Generator — clock + chapter marks
const TimestampGenerator = () => (
  <Svg>
    <circle cx="21" cy="24" r="13" {...STROKE} />
    <path d="M21 16.5 v8 h7" {...STROKE} strokeWidth={2.8} />
    <path d="M39.5 14 h3 M39.5 24 h3 M39.5 34 h3" {...STROKE} strokeWidth={3} />
    <circle cx="21" cy="24" r="1.6" fill={GOLD} />
  </Svg>
);

// 25. Shorts Script Planner — phone with script
const ShortsScriptPlanner = () => (
  <Svg>
    <rect x="14" y="5" width="20" height="38" rx="4.5" {...STROKE} />
    <path d="M21.5 16 l9 5.5 -9 5.5 Z" fill={GLASS} />
    <path d="M19.5 32.5 h9 M19.5 36.5 h6" {...STROKE} strokeWidth={2.5} />
    <Sparkle x={40} y={9} s={5} />
  </Svg>
);

// 26. Banner Logo Maker — banner + pen
const BannerLogoMaker = () => (
  <Svg>
    <path d="M7 16 a3.5 3.5 0 0 1 3.5-3.5 h27 a3.5 3.5 0 0 1 3.5 3.5 v10 a3.5 3.5 0 0 1-3.5 3.5 H22.5 l-6.5 7 v-7 h-5.5 a3.5 3.5 0 0 1-3.5-3.5 Z" {...STROKE} />
    <path d="M31 26.5 l9.5-9.5 3 3-9.5 9.5-4 1 Z" fill="currentColor" opacity={0.9} />
    <circle cx="14" cy="21" r="2.2" fill={GOLD} />
  </Svg>
);

// 27. Niche Finder Quiz — compass
const NicheFinderQuiz = () => (
  <Svg>
    <circle cx="24" cy="24" r="15" {...STROKE} />
    <path d="M31.5 16.5 l-5 12-12 5 5-12 Z" fill={GLASS} />
    <circle cx="24" cy="24" r="2.4" fill={GOLD} />
    <Sparkle x={40} y={8} s={4.5} />
  </Svg>
);

// 28. Sponsorship Calculator — briefcase + dollar
const SponsorshipCalculator = () => (
  <Svg>
    <rect x="7" y="15" width="34" height="24" rx="4" {...STROKE} />
    <path d="M18 15 v-3.5 a3 3 0 0 1 3-3 h6 a3 3 0 0 1 3 3 V15" {...STROKE} />
    <circle cx="24" cy="27" r="7" fill={GLASS} />
    <path d="M24 22.5 v9 M26.5 24 c-1-1-4.5-.8-4.5 1.2 0 2.2 4.5 1.2 4.5 3.4 0 2-3.5 2.2-4.5 1.2" stroke={GOLD} strokeWidth={2.3} strokeLinecap="round" fill="none" />
  </Svg>
);

// 29. Channel Valuation Calculator — coin stack + rising bars
const ChannelValuation = () => (
  <Svg>
    <ellipse cx="14" cy="33" rx="9.5" ry="4" {...STROKE} strokeWidth={2.8} />
    <ellipse cx="14" cy="26" rx="9.5" ry="4" {...STROKE} strokeWidth={2.8} />
    <ellipse cx="14" cy="19" rx="9.5" ry="4" {...STROKE} strokeWidth={2.8} />
    <path d="M31 37 v-8 M37 37 v-12 M43 37 v-16" {...STROKE} strokeWidth={3.5} />
    <circle cx="37" cy="18" r="2.4" fill={GOLD} />
  </Svg>
);

// 30. Transcript Downloader — captions box
const TranscriptDownloader = () => (
  <Svg>
    <rect x="6" y="11" width="36" height="26" rx="4" {...STROKE} />
    <path d="M19 19.5 a5.5 5.5 0 1 0 0 9 M31 19.5 a5.5 5.5 0 1 0 0 9" {...STROKE} strokeWidth={2.8} />
    <path d="M6 31 h36" {...STROKE} strokeWidth={2} opacity={0.5} />
    <Sparkle x={41} y={7} s={4.5} />
  </Svg>
);

// 31. Tax Deduction Calculator — receipt
const TaxDeductionCalculator = () => (
  <Svg>
    <path d="M12 7.5 h24 v33 l-4-3-4 3-4-3-4 3-4-3-4 3 Z" {...STROKE} />
    <path d="M18 15 h12 M18 21 h9" {...STROKE} strokeWidth={2.6} />
    <path d="M18.5 31.5 l11-9" stroke={GOLD} strokeWidth={2.8} strokeLinecap="round" fill="none" />
    <circle cx="19.5" cy="22.5" r="2.2" stroke={GOLD} strokeWidth={2} fill="none" />
    <circle cx="28.5" cy="31" r="2.2" stroke={GOLD} strokeWidth={2} fill="none" />
  </Svg>
);

// 32. Thumbnail Feed Previewer — phone with feed thumbs
const FeedPreviewer = () => (
  <Svg>
    <rect x="15" y="5" width="18" height="38" rx="4.5" {...STROKE} />
    <rect x="18.5" y="10" width="11" height="7.5" rx="1.5" fill={GLASS} />
    <rect x="18.5" y="20.5" width="11" height="7.5" rx="1.5" fill={GLASS} />
    <rect x="18.5" y="31" width="11" height="7.5" rx="1.5" fill={GLASS} />
    <path d="M23 12.5 l3.5 2 -3.5 2 Z" fill="currentColor" opacity={0.9} />
    <circle cx="24" cy="24.2" r="1.4" fill={GOLD} />
  </Svg>
);

// 33. LLC vs S-Corp — two towers
const LlcVsSCorp = () => (
  <Svg>
    <rect x="7" y="16" width="14" height="24" rx="2.5" {...STROKE} />
    <rect x="27" y="10" width="14" height="30" rx="2.5" {...STROKE} />
    <path d="M11 22 h3 M11 28 h3 M11 34 h3 M31 16 h3 M31 22 h3 M31 28 h3 M31 34 h3" {...STROKE} strokeWidth={2.4} />
    <Sparkle x={24} y={9} s={5.5} />
  </Svg>
);

// 34. Membership Fee Calculator — membership card
const MembershipFee = () => (
  <Svg>
    <rect x="6" y="13" width="36" height="23" rx="4" {...STROKE} />
    <circle cx="15" cy="24.5" r="5" fill={GLASS} />
    <path d="M15 22 v5 M13.5 23.4 c.8-.8 3-.5 3 .8 0 1.5-3 1-3 2.2" stroke={GOLD} strokeWidth={1.8} strokeLinecap="round" fill="none" />
    <path d="M25 20 h12 M25 26 h9 M25 31.5 h12" {...STROKE} strokeWidth={2.4} />
  </Svg>
);

// 35. Shorts Music Royalty Split — note + split pie
const MusicRoyalty = () => (
  <Svg>
    <circle cx="16" cy="33" r="5" {...STROKE} strokeWidth={2.8} />
    <path d="M21 33 V11 c6 1.5 9 4.5 9 9" {...STROKE} strokeWidth={2.8} />
    <circle cx="35" cy="30" r="8" {...STROKE} strokeWidth={2.8} />
    <path d="M35 30 L35 22 A8 8 0 0 1 43 30 Z" fill={GOLD} />
  </Svg>
);

// 36. Ads Cost Calculator — megaphone
const AdsCost = () => (
  <Svg>
    <path d="M8 21 h7 l17-10 v26 l-17-10 h-7 a3 3 0 0 1-3-3 v0 a3 3 0 0 1 3-3 Z" {...STROKE} />
    <path d="M14 30 v7 a2.5 2.5 0 0 0 2.5 2.5 h3" {...STROKE} strokeWidth={2.5} />
    <path d="M38 17 a9 9 0 0 1 0 14" {...STROKE} strokeWidth={2.8} />
    <circle cx="41" cy="24" r="2.2" fill={GOLD} />
  </Svg>
);

// 37. Subscribe Link Generator — link chain
const SubscribeLink = () => (
  <Svg>
    <path d="M20 28 a7.5 7.5 0 0 1 0-10.6 l5-5 a7.5 7.5 0 0 1 10.6 10.6 l-2.6 2.6" {...STROKE} />
    <path d="M28 20 a7.5 7.5 0 0 1 0 10.6 l-5 5 a7.5 7.5 0 0 1-10.6-10.6 l2.6-2.6" {...STROKE} />
    <Sparkle x={41} y={8} s={4.5} />
  </Svg>
);

// 38. Video Summary Generator — doc + sparkle
const VideoSummary = () => (
  <Svg>
    <rect x="12" y="7" width="24" height="34" rx="3.5" {...STROKE} />
    <path d="M18 16 h12 M18 22 h16 M18 28 h12" {...STROKE} strokeWidth={2.5} />
    <Sparkle x={39} y={10} s={7} />
    <Sparkle x={39} y={22} s={4.5} />
  </Svg>
);

// 39. Outlier Calculator — flame
const OutlierCalculator = () => (
  <Svg>
    <path d="M24 6 c2 5.5 10 8 10 16.5 a10 10 0 0 1-20 0 c0-4.5 2-7.5 4.5-10.5 .5 3 2 4.5 4.5 5 -1.5-4-.5-8 1-11 Z" {...STROKE} />
    <path d="M24 24 c1.5 2.5 4.5 3.5 4.5 6.5 a4.5 4.5 0 0 1-9 0 c0-3 3-4 4.5-6.5 Z" fill={GOLD} />
  </Svg>
);

// 40. Embed Code Generator — code brackets
const EmbedCode = () => (
  <Svg>
    <path d="M16 13 L6.5 24 16 35" {...STROKE} strokeWidth={3.5} />
    <path d="M32 13 L41.5 24 32 35" {...STROKE} strokeWidth={3.5} />
    <path d="M27 9 L21 39" {...STROKE} strokeWidth={2.8} />
  </Svg>
);

// 41. AdSense Fee Calculator — percent badge
const AdSenseFee = () => (
  <Svg>
    <circle cx="24" cy="24" r="14.5" {...STROKE} />
    <path d="M19 29 l10-10" {...STROKE} strokeWidth={2.8} />
    <circle cx="19.5" cy="19.5" r="2.6" {...STROKE} strokeWidth={2.2} />
    <circle cx="28.5" cy="28.5" r="2.6" {...STROKE} strokeWidth={2.2} />
    <circle cx="24" cy="24" r="1.4" fill={GOLD} />
  </Svg>
);

// 42. Watch Hours Calculator — hourglass
const WatchHours = () => (
  <Svg>
    <path d="M13 8.5 h22 M13 39.5 h22" {...STROKE} strokeWidth={3.2} />
    <path d="M15.5 8.5 c0 8.5 5.5 10.5 8.5 12.5 3-2 8.5-4 8.5-12.5 M15.5 39.5 c0-8.5 5.5-10.5 8.5-12.5 3 2 8.5 4 8.5 12.5" {...STROKE} strokeWidth={2.8} />
    <path d="M20 36.5 c1-3.5 3-4.5 4-4.5 s3 1 4 4.5 Z" fill={GOLD} />
  </Svg>
);

// 43. Shorts vs Long-form — phone vs widescreen
const ShortsVsLongForm = () => (
  <Svg>
    <rect x="7" y="9" width="15" height="30" rx="3.5" {...STROKE} />
    <path d="M12 20 l5.5 4 -5.5 4 Z" fill={GLASS} />
    <rect x="26" y="15" width="15" height="18" rx="3.5" {...STROKE} />
    <path d="M31.5 20.5 l5.5 3.5 -5.5 3.5 Z" fill={GLASS} />
    <circle cx="24" cy="24" r="2.2" fill={GOLD} />
  </Svg>
);

// 44. Milestone Countdown — trophy
const MilestoneCountdown = () => (
  <Svg>
    <path d="M16 9 h16 v9 a8 8 0 0 1-16 0 Z" {...STROKE} />
    <path d="M16 12 h-5.5 c0 5.5 3 7.5 6.5 7.5 M32 12 h5.5 c0 5.5-3 7.5-6.5 7.5" {...STROKE} strokeWidth={2.6} />
    <path d="M24 26 v5 M18.5 34.5 h11 M16 39.5 h16" {...STROKE} strokeWidth={2.8} />
    <circle cx="24" cy="15" r="2" fill={GOLD} />
  </Svg>
);

// 45. Thumbnail A/B Test Calculator — split frame A/B
const ThumbnailAbTest = () => (
  <Svg>
    <rect x="6.5" y="11" width="35" height="26" rx="4" {...STROKE} />
    <path d="M24 11 v26" {...STROKE} strokeWidth={2.5} />
    <path d="M7.5 12.5 h15.5 v23 H10 a3 3 0 0 1-3-3 Z" fill={GLASS_SOFT} />
    <circle cx="16" cy="24" r="3.4" fill={GOLD} />
    <circle cx="32" cy="24" r="3.4" fill="currentColor" />
  </Svg>
);

const TOOL_ARTWORK: Record<string, () => ReactNode> = {
  "youtube-thumbnail-downloader": ThumbDownloader,
  "youtube-thumbnail-generator": ThumbGenerator,
  "youtube-ai-thumbnail-generator": AiThumbGenerator,
  "youtube-ai-thumbnail-prompt": AiThumbPrompt,
  "youtube-title-generator": TitleGenerator,
  "youtube-description-generator": DescriptionGenerator,
  "youtube-tag-generator": TagGenerator,
  "youtube-tag-extractor": TagExtractor,
  "youtube-video-ideas-generator": VideoIdeas,
  "youtube-trend-helper": TrendHelper,
  "youtube-content-calendar-generator": ContentCalendar,
  "youtube-earnings-calculator": EarningsCalculator,
  "youtube-engagement-rate-calculator": EngagementCalculator,
  "youtube-title-ab-tester": TitleAbTester,
  "youtube-channel-name-generator": ChannelName,
  "youtube-hashtag-generator": HashtagGenerator,
  "youtube-intro-script-generator": IntroScript,
  "youtube-channel-id-finder": ChannelIdFinder,
  "youtube-playlist-length-calculator": PlaylistLength,
  "youtube-comment-picker": CommentPicker,
  "youtube-channel-audit": ChannelAudit,
  "youtube-subscriber-count-checker": SubscriberCount,
  "youtube-video-download-options": VideoDownloadOptions,
  "youtube-timestamp-generator": TimestampGenerator,
  "youtube-shorts-script-planner": ShortsScriptPlanner,
  "youtube-banner-logo-maker": BannerLogoMaker,
  "youtube-niche-finder-quiz": NicheFinderQuiz,
  "youtube-sponsorship-calculator": SponsorshipCalculator,
  "youtube-channel-valuation-calculator": ChannelValuation,
  "youtube-transcript-downloader": TranscriptDownloader,
  "youtube-tax-deduction-calculator": TaxDeductionCalculator,
  "youtube-thumbnail-feed-previewer": FeedPreviewer,
  "youtube-llc-vs-s-corp-tax-savings-calculator": LlcVsSCorp,
  "patreon-vs-youtube-memberships-vs-fourthwall-fee-calculator": MembershipFee,
  "youtube-shorts-music-royalty-split-calculator": MusicRoyalty,
  "youtube-ads-cost-calculator": AdsCost,
  "youtube-subscribe-link-generator": SubscribeLink,
  "youtube-video-summary-generator": VideoSummary,
  "youtube-outlier-calculator": OutlierCalculator,
  "youtube-embed-code-generator": EmbedCode,
  "youtube-adsense-fee-calculator": AdSenseFee,
  "youtube-watch-hours-calculator": WatchHours,
  "youtube-shorts-vs-long-form-calculator": ShortsVsLongForm,
  "youtube-milestone-countdown-calculator": MilestoneCountdown,
  "youtube-thumbnail-ab-test-calculator": ThumbnailAbTest,
  // Hero aliases for dedicated landing pages reuse their tool's motif
  "earnings-calculator-hero": EarningsCalculator,
  "transcript-downloader-hero": TranscriptDownloader,
  "watch-hours-tier-hero": WatchHours,
  "shorts-comparison-tier-hero": ShortsVsLongForm,
};

export function getToolArtwork(key?: string) {
  return (key && TOOL_ARTWORK[key]) || undefined;
}
