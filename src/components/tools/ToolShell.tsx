import { type ReactNode } from "react";
import { FaLayerGroup } from "react-icons/fa";
import Breadcrumb from "@/components/ui/Breadcrumb";
import FaqAccordion from "@/components/ui/FaqAccordion";
import HighRpmSidebar from "@/components/tools/HighRpmSidebar";
import { ToolContextProvider } from "@/components/tools/ToolContext";
import AdSlot from "@/components/ads/AdSlot";
import { AdSectionIgnore, AdSectionPrioritize } from "@/components/ads/AdSectionTarget";
import { AD_SLOTS } from "@/lib/adsense";

export interface ToolShellBreadcrumb {
  name: string;
  href?: string;
}

export interface ToolShellFaq {
  question: string;
  answer: string;
}

export interface ToolShellProps {
  /** Optional SEO metadata component (<GeoAeoHead ... />) */
  geoAeo?: ReactNode;
  /** Combined JSON-LD schema object (e.g. combineSchemasToGraph(...)) */
  jsonLd?: Record<string, unknown>;
  /** Breadcrumb trail items */
  breadcrumbs: ToolShellBreadcrumb[];
  /** Tailwind gradient classes for hero top stripe (e.g. "from-emerald-500 via-teal-500 to-cyan-500") */
  accentGradient?: string;
  /** Icon node rendered inside the hero header (e.g. <ToolIcon3D ... />) */
  icon: ReactNode;
  /** Top hero eyebrow pill content */
  badge: ReactNode;
  /** Main page H1 headline */
  title: ReactNode;
  /** Concise hero subtitle / summary */
  subtitle: ReactNode;
  /** Optional right-hand header controls (<ToolFavoriteButton />, trackers) */
  headerRight?: ReactNode;
  /** Interactive studio chrome bar title */
  consoleTitle: string;
  /** Optional icon inside console header bar */
  consoleIcon?: ReactNode;
  /** Optional text color class for console icon */
  consoleIconColorClass?: string;
  /** Optional right pill inside console chrome bar */
  consoleBadge?: string;
  /** Console badge color classes */
  consoleBadgeClass?: string;
  /** Main interactive calculator or tool component */
  workspace: ReactNode;
  /** Post-workspace educational content, QuickAnswerCapsule, tables, and cross-links */
  children?: ReactNode;
  /** Optional FAQ section heading */
  faqHeading?: string;
  /** FAQ items rendered via FaqAccordion (should match JSON-LD FAQPage) */
  faqs?: ToolShellFaq[];
  /** Optional slot below FAQs inside the 8-column main stack */
  afterFaqSlot?: ReactNode;
  /** Active tool slug excluded from Related High-RPM Tools sidebar */
  sidebarSlug?: string;
  /** Optional custom US State Tax sidebar CTA href */
  stateTaxHref?: string;
  /** Optional custom US State Tax sidebar CTA label */
  stateTaxLabel?: string;
  /** Render full-width bottom Multiplex ad unit (default: true) */
  showMultiplex?: boolean;
}

/**
 * Standardized SSR wrapper for dedicated & programmatic YouTube Tools Hub pages:
 * enforces unified breadcrumbs, H1 hero header, desktop 12-column grid with sticky
 * right AdSense/related-tools sidebar, zero-CLS post-result ad placement, FAQs,
 * and consolidated JSON-LD injection.
 */
export default function ToolShell({
  geoAeo,
  jsonLd,
  breadcrumbs,
  accentGradient = "from-purple-600 via-indigo-500 to-emerald-500",
  icon,
  badge,
  title,
  subtitle,
  headerRight,
  consoleTitle,
  consoleIcon,
  consoleIconColorClass = "text-emerald-300",
  consoleBadge,
  consoleBadgeClass = "bg-emerald-500/20 border-emerald-400/30 text-emerald-300",
  workspace,
  children,
  faqHeading = "Frequently Asked Questions",
  faqs,
  afterFaqSlot,
  sidebarSlug,
  stateTaxHref,
  stateTaxLabel,
  showMultiplex = true,
}: ToolShellProps) {
  return (
    <>
      {geoAeo}
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}

      <div className="min-h-screen py-8 sm:py-12 relative overflow-x-clip">
        <div className="nebula-bg" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <AdSectionIgnore>
            <div className="mb-6">
              <Breadcrumb items={breadcrumbs} />
            </div>
          </AdSectionIgnore>

          <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-start">
            <div className="lg:col-span-8 min-w-0 space-y-8">
              <AdSectionPrioritize>
                {/* Hero Header */}
                <header className="card-3d rounded-3xl p-6 sm:p-7 relative overflow-hidden">
                  <div
                    className={`pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${accentGradient}`}
                  />
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex items-start gap-4 sm:gap-5 flex-1">
                      {icon}
                      <div className="flex-1 min-w-0">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-200/80 text-slate-800 text-xs font-extrabold uppercase tracking-wider mb-2.5">
                          {badge}
                        </div>
                        <h1
                          className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mb-2 tracking-tight font-outfit leading-tight"
                          data-speakable
                        >
                          {title}
                        </h1>
                        <p
                          className="text-sm sm:text-base text-slate-600 leading-relaxed summary"
                          data-speakable
                        >
                          {subtitle}
                        </p>
                      </div>
                    </div>
                    {headerRight && (
                      <div className="shrink-0 sm:pt-1">{headerRight}</div>
                    )}
                  </div>
                </header>

                {/* Interactive Workspace Console — immediately above the fold */}
                <div className="studio-console-3d rounded-3xl overflow-hidden">
                  <div className="flex items-center justify-between gap-2 px-5 py-3 bg-slate-900 text-white border-b border-slate-800">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span
                        className={`inline-flex items-center justify-center w-6 h-6 rounded-lg bg-white/10 shrink-0 ${consoleIconColorClass}`}
                        aria-hidden="true"
                      >
                        {consoleIcon || <FaLayerGroup className="w-3 h-3" />}
                      </span>
                      <span className="text-xs font-bold text-slate-200 truncate">
                        {consoleTitle}
                      </span>
                    </div>
                    {consoleBadge && (
                      <span
                        className={`shrink-0 text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${consoleBadgeClass}`}
                      >
                        {consoleBadge}
                      </span>
                    )}
                  </div>
                  <div className="p-4 sm:p-6">
                    <ToolContextProvider value={{ hideHeader: true }}>
                      {workspace}
                    </ToolContextProvider>
                  </div>
                </div>

                {/* High-Viewability Post-Result Display Slot (min-h-[280px] zero-CLS) */}
                <AdSlot
                  slot={AD_SLOTS.IN_ARTICLE[0]}
                  preset="in-article"
                  lazy={false}
                />

                {children}
              </AdSectionPrioritize>

              {faqs && faqs.length > 0 && (
                <section data-speakable>
                  <h2 className="text-2xl font-black text-slate-900 mb-5 font-outfit">
                    {faqHeading}
                  </h2>
                  <FaqAccordion items={faqs} headingLevel="h3" />
                </section>
              )}

              {afterFaqSlot}
            </div>

            <HighRpmSidebar
              currentSlug={sidebarSlug}
              stateTaxHref={stateTaxHref}
              stateTaxLabel={stateTaxLabel}
            />
          </div>

          {showMultiplex && (
            <AdSlot
              slot={AD_SLOTS.MULTIPLEX}
              preset="multiplex"
              label="Recommended For Creators"
            />
          )}
        </div>
      </div>
    </>
  );
}
