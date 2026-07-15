import Link from "next/link";
import StickySidebarAd from "@/components/ads/StickySidebarAd";
import type { Tool } from "@/config/tools";
import { FaTools, FaArrowRight, FaFire } from "react-icons/fa";

interface BlogSidebarProps {
  relatedTools?: Tool[];
  popularTools?: Tool[];
}

export default function BlogSidebar({
  relatedTools = [],
  popularTools = [],
}: BlogSidebarProps) {
  const toolsToShow =
    relatedTools.length > 0
      ? relatedTools
      : popularTools.slice(0, 5);

  return (
    <aside className="hidden lg:block lg:col-span-1 self-start space-y-8 lg:sticky lg:top-24">
      {/* Contextual free tools — SEO internal links */}
      {toolsToShow.length > 0 && (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-2 text-slate-900">
            <FaTools className="text-purple-600" />
            <h2 className="text-sm font-black uppercase tracking-wider">
              {relatedTools.length > 0 ? "Try These Free Tools" : "Popular Free Tools"}
            </h2>
          </div>
          <ul className="space-y-3">
            {toolsToShow.map((tool) => (
              <li key={tool.slug}>
                <Link
                  href={`/tools/${tool.slug}`}
                  className="group flex items-start gap-2 text-sm text-slate-700 hover:text-purple-700"
                >
                  <FaArrowRight className="mt-1 h-3 w-3 shrink-0 text-purple-400 transition-transform group-hover:translate-x-0.5" />
                  <span>
                    <span className="font-semibold block leading-snug">
                      {tool.name.replace(/^YouTube\s+/i, "")}
                    </span>
                    <span className="text-xs text-slate-500 line-clamp-2">
                      {tool.shortDescription}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/tools"
            className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-purple-600 hover:text-purple-800"
          >
            All free tools
            <FaArrowRight className="h-3 w-3" />
          </Link>
        </div>
      )}

      {/* High-intent hub links */}
      <div className="rounded-2xl border border-purple-100 bg-purple-50/60 p-5">
        <div className="mb-3 flex items-center gap-2 text-purple-900">
          <FaFire className="text-orange-500" />
          <h2 className="text-sm font-black uppercase tracking-wider">
            High-ROI Hubs
          </h2>
        </div>
        <ul className="space-y-2 text-sm">
          <li>
            <Link
              href="/tools/youtube-earnings-calculator"
              className="font-medium text-slate-700 hover:text-purple-700"
            >
              YouTube Earnings Calculator
            </Link>
          </li>
          <li>
            <Link
              href="/resources/youtube-cpm-rates"
              className="font-medium text-slate-700 hover:text-purple-700"
            >
              YouTube CPM Rates 2026
            </Link>
          </li>
          <li>
            <Link
              href="/tools/vs/tubebuddy"
              className="font-medium text-slate-700 hover:text-purple-700"
            >
              Free TubeBuddy Alternative
            </Link>
          </li>
          <li>
            <Link
              href="/tools/vs/vidiq"
              className="font-medium text-slate-700 hover:text-purple-700"
            >
              Free VidIQ Alternative
            </Link>
          </li>
          <li>
            <Link
              href="/resources/youtube-algorithm-guide"
              className="font-medium text-slate-700 hover:text-purple-700"
            >
              Algorithm Guide
            </Link>
          </li>
        </ul>
      </div>

      {/* Sticky sidebar ad — below fold of sticky stack content */}
      <StickySidebarAd />
    </aside>
  );
}
