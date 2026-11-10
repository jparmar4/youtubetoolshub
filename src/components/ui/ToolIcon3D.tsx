import type { ReactNode } from "react";
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
  const theme = resolveToolTheme(slug, category);
  const finalBadge = badge ?? theme.badgeText;

  return (
    <div className={`ti-3d ti-${size} ${theme.themeClass}${className ? ` ${className}` : ""}`}>
      <div className="ti-box">
        <div className="ti-ico">{icon ?? renderToolIcon(iconKey ?? slug)}</div>
      </div>
      {finalBadge && size !== "sm" && <span className="ti-badge">{finalBadge}</span>}
    </div>
  );
}
