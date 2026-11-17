import Link from "next/link";
import { FaArrowRight, FaChartBar, FaDollarSign } from "react-icons/fa";
import AdSlot from "@/components/ads/AdSlot";
import { AdSectionIgnore } from "@/components/ads/AdSectionTarget";
import { AD_SLOTS } from "@/lib/adsense";

interface HighRpmToolLink {
  slug: string;
  href: string;
  name: string;
  note: string;
  badge: string;
}

const HIGH_RPM_TOOLS: HighRpmToolLink[] = [
  {
    slug: "youtube-earnings-calculator",
    href: "/tools/youtube-earnings-calculator",
    name: "YouTube Earnings & RPM Calculator",
    note: "52-country AdSense CPM projections",
    badge: "CPM",
  },
  {
    slug: "youtube-llc-vs-s-corp-tax-savings-calculator",
    href: "/tools/youtube-llc-vs-s-corp-tax-savings-calculator",
    name: "LLC vs. S-Corp Tax Savings",
    note: "Model 15.3% SE tax savings by state",
    badge: "TAX",
  },
  {
    slug: "youtube-sponsorship-calculator",
    href: "/tools/youtube-sponsorship-calculator",
    name: "Sponsorship Rate Calculator",
    note: "Price Tier-1 brand deals & media kits",
    badge: "B2B",
  },
  {
    slug: "youtube-channel-valuation-calculator",
    href: "/tools/youtube-channel-valuation-calculator",
    name: "Channel Valuation Estimator",
    note: "24x–45x monthly net profit multiples",
    badge: "EXIT",
  },
  {
    slug: "youtube-tax-deduction-calculator",
    href: "/tools/youtube-tax-deduction-calculator",
    name: "Creator Tax & Write-Off Planner",
    note: "US, UK, CA & AU studio deductions",
    badge: "IRS",
  },
];

export default function HighRpmSidebar({
  currentSlug,
  stateTaxHref,
  stateTaxLabel,
}: {
  currentSlug?: string;
  stateTaxHref?: string;
  stateTaxLabel?: string;
}) {
  const visibleLinks = HIGH_RPM_TOOLS.filter((item) => item.slug !== currentSlug).slice(
    0,
    4,
  );

  return (
    <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
      <AdSectionIgnore>
        <div className="card-3d rounded-3xl p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <FaDollarSign className="w-4 h-4" aria-hidden="true" />
              </span>
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 block">
                  Tier-1 Creator Suite
                </span>
                <h2 className="text-base font-black text-slate-900 font-outfit leading-tight">
                  Related High-RPM Tools
                </h2>
              </div>
            </div>
          </div>

          <ul className="space-y-2.5">
            {visibleLinks.map((item) => (
              <li key={item.slug}>
                <Link
                  href={item.href}
                  className="group flex items-center justify-between gap-3 p-3 rounded-2xl border border-slate-200/80 bg-slate-50/70 hover:bg-white hover:border-emerald-400 hover:shadow-xs transition-all"
                >
                  <div className="min-w-0">
                    <span className="block text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors truncate">
                      {item.name}
                    </span>
                    <span className="block text-xs text-slate-600 truncate">
                      {item.note}
                    </span>
                  </div>
                  <span className="shrink-0 px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-black">
                    {item.badge}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="pt-2 border-t border-slate-200/80 space-y-2">
            {stateTaxHref && stateTaxLabel && (
              <Link
                href={stateTaxHref}
                className="flex items-center justify-between gap-2 text-xs font-bold text-blue-700 hover:underline"
              >
                <span>{stateTaxLabel}</span>
                <FaArrowRight className="w-3 h-3 shrink-0" />
              </Link>
            )}
            <Link
              href="/research/youtube-cpm-rpm-report-2026"
              className="flex items-center justify-between gap-2 text-xs font-bold text-purple-700 hover:underline"
            >
              <span className="inline-flex items-center gap-1.5">
                <FaChartBar className="w-3.5 h-3.5" aria-hidden="true" />
                <span>2026 CPM &amp; RPM Benchmark Report</span>
              </span>
              <FaArrowRight className="w-3 h-3 shrink-0" />
            </Link>
          </div>
        </div>
      </AdSectionIgnore>

      {/* Dedicated Sticky Sidebar AdSense Container (reserved min-h-[280px], supports 300x600/responsive) */}
      <AdSlot
        slot={AD_SLOTS.SIDEBAR}
        preset="sidebar"
        format="auto"
        lazy={false}
        className="w-full"
      />
    </aside>
  );
}
