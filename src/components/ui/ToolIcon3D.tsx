import type { ReactNode } from "react";
import Image from "next/image";
import { renderToolIcon } from "@/components/ui/tool-icons";

export type ToolIconSize = "sm" | "md" | "lg" | "xl";

interface ToolIcon3DProps {
  icon?: ReactNode;
  iconKey?: string;
  slug?: string;
  category?: string;
  size?: ToolIconSize;
  badge?: string;
  className?: string;
}

const TOOL_3D_IMAGE_SLUGS = new Set([
  "youtube-earnings-calculator",
  "youtube-sponsorship-calculator",
  "youtube-adsense-fee-calculator",
  "youtube-channel-valuation-calculator",
  "youtube-ads-cost-calculator",
  "youtube-tax-deduction-calculator",
  "youtube-engagement-rate-calculator",
  "youtube-shorts-vs-long-form-calculator",
  "youtube-watch-hours-calculator",
  "youtube-subscriber-count-checker",
  "youtube-llc-vs-s-corp-tax-savings-calculator",
  "patreon-vs-youtube-memberships-vs-fourthwall-fee-calculator",
  "youtube-shorts-music-royalty-split-calculator",
  "youtube-title-ab-tester",
  "youtube-thumbnail-downloader",
  "youtube-thumbnail-generator",
  "youtube-ai-thumbnail-generator",
  "youtube-thumbnail-feed-previewer",
  "youtube-thumbnail-ab-test-calculator",
  "youtube-banner-logo-maker",
  "youtube-ai-thumbnail-prompt",
  "youtube-tag-extractor",
  "youtube-tag-generator",
  "youtube-title-generator",
  "youtube-description-generator",
  "youtube-video-summary-generator",
  "youtube-timestamp-generator",
  "youtube-trend-helper",
  "youtube-video-ideas-generator",
  "youtube-niche-finder-quiz",
  "youtube-content-calendar-generator",
  "youtube-channel-audit",
  "youtube-outlier-calculator",
  "youtube-milestone-countdown-calculator",
  "youtube-subscribe-link-generator",
  "youtube-shorts-script-planner",
  "youtube-transcript-downloader",
  "youtube-video-download-options",
  "youtube-hashtag-generator",
  "youtube-playlist-length-calculator",
  "youtube-comment-picker",
  "youtube-channel-id-finder",
  "youtube-channel-name-generator",
  "youtube-intro-script-generator",
  "youtube-embed-code-generator",
]);

const SIZE_PX: Record<ToolIconSize, number> = {
  sm: 44,
  md: 68,
  lg: 84,
  xl: 96,
};

function normalizeSlug(slug?: string): string | undefined {
  if (!slug) return undefined;
  return slug.split(/[?#]/)[0].replace(/^\/+|\/+$/g, "").toLowerCase();
}

function resolveToolTheme(
  slug?: string,
  category?: string,
): { themeClass: string; badgeText?: string } {
  const s = (slug || "").toLowerCase();
  const c = (category || "").toLowerCase();

  if (s.includes("thumbnail-downloader")) return { themeClass: "ti-t1", badgeText: "4K" };
  if (s.includes("ai-thumbnail") || s.includes("image-prompt")) return { themeClass: "ti-t2", badgeText: "AI" };
  if (s.includes("feed-previewer") || s.includes("banner-resizer") || s.includes("thumbnail-generator")) {
    return { themeClass: "ti-t3", badgeText: s.includes("feed-previewer") ? "CTR" : "HD" };
  }
  if (s.includes("tax-savings") || s.includes("valuation") || s.includes("brand-pitch")) {
    return { themeClass: "ti-t4", badgeText: s.includes("tax") ? "TAX" : "CFO" };
  }
  if (s.includes("earnings") || s.includes("sponsorship") || s.includes("affiliate") || s.includes("faceless-niche")) {
    return { themeClass: "ti-t5", badgeText: "RPM" };
  }
  if (s.includes("watch-hours")) return { themeClass: "ti-t6", badgeText: "YPP" };
  if (s.includes("transcript") || s.includes("chapters") || s.includes("summarizer")) {
    return { themeClass: "ti-t7", badgeText: s.includes("transcript") ? "SRT" : "NLP" };
  }
  if (s.includes("tag-") || s.includes("hashtag") || s.includes("title-") || s.includes("description") || s.includes("seo-checklist")) {
    return { themeClass: "ti-t8", badgeText: "SEO" };
  }
  if (c === "thumbnail-media") return { themeClass: "ti-t9" };
  if (c === "analytics-earnings") return { themeClass: "ti-t10" };
  if (c === "channel-growth" || s.includes("script") || s.includes("ideas") || s.includes("calendar") || s.includes("audit") || s.includes("repurpos")) {
    return { themeClass: "ti-t11" };
  }
  if (c === "utility-fun" || s.includes("giveaway") || s.includes("poll") || s.includes("playlist") || s.includes("comment")) {
    return { themeClass: "ti-t12" };
  }
  return { themeClass: "ti-t13" };
}

export default function ToolIcon3D({
  icon,
  iconKey,
  slug,
  category,
  size = "md",
  badge,
  className = "",
}: ToolIcon3DProps) {
  const cleanSlug = normalizeSlug(slug);
  const theme = resolveToolTheme(cleanSlug, category);
  const finalBadge = badge ?? theme.badgeText;
  const has3DArtwork = !icon && Boolean(cleanSlug && TOOL_3D_IMAGE_SLUGS.has(cleanSlug));
  const px = SIZE_PX[size];

  return (
    <div className={`ti-3d ti-${size} ${theme.themeClass}${className ? ` ${className}` : ""}`}>
      <div className={`ti-box${has3DArtwork ? " ti-has-img" : ""}`}>
        {has3DArtwork && cleanSlug ? (
          <Image
            src={`/images/tools/${cleanSlug}.webp`}
            alt=""
            width={px * 2}
            height={px * 2}
            unoptimized
            className="ti-img"
            aria-hidden="true"
          />
        ) : (
          <div className="ti-ico">{icon ?? renderToolIcon(iconKey ?? cleanSlug)}</div>
        )}
      </div>
      {finalBadge && size !== "sm" && <span className="ti-badge">{finalBadge}</span>}
    </div>
  );
}
