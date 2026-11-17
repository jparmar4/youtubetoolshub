import { Metadata } from "next";
import Link from "next/link";
import { FaArrowRight, FaBalanceScale, FaBuilding, FaMapMarkedAlt } from "react-icons/fa";
import {
  IRS_2026_CONSTANTS,
  US_STATE_CREATOR_TAXES,
} from "@/data/usStateCreatorTaxes";
import { siteConfig } from "@/config/site";
import {
  combineSchemasToGraph,
  getBreadcrumbSchema,
  getGlobalAlternates,
  getSoftwareApplicationSchema,
} from "@/lib/seo";
import { DATA_LAST_REVIEWED } from "@/lib/seo-data";
import Breadcrumb from "@/components/ui/Breadcrumb";
import UsStateTaxDirectoryGrid from "@/components/tools/UsStateTaxDirectoryGrid";
import AdSlot from "@/components/ads/AdSlot";
import { AD_SLOTS } from "@/lib/adsense";

export const metadata: Metadata = {
  title: {
    absolute: "US State YouTube Creator Tax & S-Corp Directory (50 States + DC, 2026)",
  },
  description:
    "Compare 2026 state income tax rates, Secretary of State LLC filing fees, 15.3% Federal SE tax ($184,500 cap), and S-Corp savings across all 50 US states and Washington, D.C.",
  keywords: [
    "youtube creator tax calculator by state",
    "youtuber llc vs s corp by state",
    "best state for youtube llc taxes",
    "creator income tax 2026 usa",
  ],
  alternates: getGlobalAlternates("/tools/creator-tax-calculator"),
};

export default function CreatorTaxStateIndexPage() {
  const noTaxStates = US_STATE_CREATOR_TAXES.filter(
    (s) => s.taxStructure === "none" || s.topIncomeTaxRate === 0,
  );

  const schema = combineSchemasToGraph(
    getSoftwareApplicationSchema({
      name: "US State YouTube Creator Tax & LLC vs. S-Corp Directory",
      description:
        "State-by-state 2026 calculator modeling 15.3% Federal Self-Employment tax ($184,500 SS cap), $16,100 standard deduction, 20% QBI, state income tax, LLC fees, and Form 2553 S-Corp savings across 50 US states and DC.",
      url: `${siteConfig.url}/tools/creator-tax-calculator`,
      category: "analytics-earnings",
      dateModified: DATA_LAST_REVIEWED,
    }),
    getBreadcrumbSchema([
      { name: "Home", url: siteConfig.url },
      { name: "Tools", url: `${siteConfig.url}/tools` },
      { name: "Creator Tax by State", url: `${siteConfig.url}/tools/creator-tax-calculator` },
    ]),
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="min-h-screen py-8 sm:py-12 relative overflow-x-clip">
        <div className="nebula-bg" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <Breadcrumb
            items={[
              { name: "Home", href: "/" },
              { name: "Tools", href: "/tools" },
              { name: "Creator Tax by State" },
            ]}
          />

          <header className="card-3d rounded-3xl p-6 sm:p-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-extrabold uppercase tracking-wider">
              <FaMapMarkedAlt className="w-3.5 h-3.5" aria-hidden="true" />
              <span>50 US States + D.C. · Verified 2026 IRS Rules</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 font-outfit tracking-tight">
              YouTube Creator Tax &amp; LLC vs. S-Corp Calculator by US State
            </h1>
            <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
              Select or search your US jurisdiction below to calculate 2026 Federal 15.3% Self-Employment tax (${IRS_2026_CONSTANTS.socialSecurityWageBase.toLocaleString("en-US")} Social Security cap), Federal income tax (${IRS_2026_CONSTANTS.standardDeductionSingle.toLocaleString("en-US")} single standard deduction + 20% QBI), state tax rates, LLC filing/annual fees, and IRS Form 2553 S-Corp savings.
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              <Link
                href="/tools/youtube-llc-vs-s-corp-tax-savings-calculator"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs"
              >
                <FaBalanceScale className="w-3.5 h-3.5" /> Open Full S-Corp Calculator
              </Link>
              <Link
                href="/tools/youtube-tax-deduction-calculator"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-300 hover:border-purple-400 text-slate-800 text-xs font-bold"
              >
                <FaBuilding className="w-3.5 h-3.5 text-purple-600" /> Creator Tax Write-Offs Tool
              </Link>
            </div>
          </header>

          <AdSlot slot={AD_SLOTS.HEADER} preset="leaderboard" />

          <section className="card-3d rounded-3xl p-6 sm:p-8 space-y-4">
            <h2 className="text-xl font-black text-slate-900 font-outfit">
              0% State Wage &amp; Business Income Tax Hubs ({noTaxStates.length} States)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {noTaxStates.map((s) => (
                <Link
                  key={s.slug}
                  href={`/tools/creator-tax-calculator/${s.slug}`}
                  className="group p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 hover:border-emerald-400 hover:bg-white transition-all flex items-center justify-between gap-2"
                >
                  <div>
                    <span className="font-extrabold text-slate-900 group-hover:text-emerald-700 block">
                      {s.stateName} ({s.stateCode})
                    </span>
                    <span className="text-xs text-slate-600">
                      0% State Tax · ${s.llcFilingFee} LLC filing · ${s.llcAnnualFee}/yr
                    </span>
                  </div>
                  <FaArrowRight className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                </Link>
              ))}
            </div>
          </section>

          <UsStateTaxDirectoryGrid heading="Search & Compare All 50 States + Washington, D.C." />

          <AdSlot slot={AD_SLOTS.MULTIPLEX} preset="multiplex" label="Recommended For Creators" />
        </div>
      </div>
    </>
  );
}
