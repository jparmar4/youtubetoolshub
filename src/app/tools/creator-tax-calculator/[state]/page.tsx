import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  FaArrowRight,
  FaBuilding,
  FaCheckCircle,
  FaFileInvoiceDollar,
  FaLightbulb,
  FaMapMarkedAlt,
} from "react-icons/fa";
import {
  IRS_2026_CONSTANTS,
  US_STATE_CREATOR_TAXES,
  buildStateCreatorTaxMetadata,
  calculateCreatorStateTaxSummary,
  getStateTaxBySlug,
} from "@/data/usStateCreatorTaxes";
import { siteConfig } from "@/config/site";
import { INDEX_US_STATE_TAX_PAGES } from "@/config/index-policy";
import {
  combineSchemasToGraph,
  getBreadcrumbSchema,
  getFAQSchema,
  getUsOnlyAlternates,
  getSoftwareApplicationSchema,
} from "@/lib/seo";
import { DATA_LAST_REVIEWED } from "@/lib/seo-data";
import QuickAnswerCapsule from "@/components/seo/QuickAnswerCapsule";
import GeoAeoHead from "@/components/seo/GeoAeoHead";
import { GEO_AEO_PRESETS } from "@/config/geo-aeo";
import ToolIcon3D from "@/components/ui/ToolIcon3D";
import ToolShell from "@/components/tools/ToolShell";
import StateCreatorTaxWorkspace from "@/components/tools/StateCreatorTaxWorkspace";
import UsStateTaxDirectoryGrid from "@/components/tools/UsStateTaxDirectoryGrid";
import { AdSectionIgnore } from "@/components/ads/AdSectionTarget";

export const dynamicParams = false;

export function generateStaticParams() {
  return US_STATE_CREATOR_TAXES.map((s) => ({
    state: s.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string }>;
}): Promise<Metadata> {
  const { state: slug } = await params;
  const state = getStateTaxBySlug(slug);

  if (!state) {
    return {
      title: "Creator Tax Calculator",
      robots: { index: false, follow: false },
    };
  }

  const { title, description } = buildStateCreatorTaxMetadata(state);

  return {
    title: { absolute: title },
    description,
    keywords: [
      `${state.stateName} youtube creator taxes`,
      `${state.stateName} youtuber llc s corp calculator`,
      `${state.stateName} influencer tax calculator`,
      `form 2553 s corp savings ${state.stateName}`,
      `${state.stateName} llc filing fee creator`,
    ],
    openGraph: {
      title: `${title} | YouTube Tools Hub`,
      description,
      type: "website",
      url: `${siteConfig.url}/tools/creator-tax-calculator/${state.slug}`,
      images: [
        {
          url: `${siteConfig.url}/tools/creator-tax-calculator/${state.slug}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | YouTube Tools Hub`,
      description,
      images: [`${siteConfig.url}/tools/creator-tax-calculator/${state.slug}/opengraph-image`],
    },
    alternates: INDEX_US_STATE_TAX_PAGES
      ? getUsOnlyAlternates(`/tools/creator-tax-calculator/${state.slug}`)
      : { canonical: "/tools/creator-tax-calculator" },
    robots: {
      index: INDEX_US_STATE_TAX_PAGES,
      follow: true,
      googleBot: {
        index: INDEX_US_STATE_TAX_PAGES,
        follow: true,
        ...(INDEX_US_STATE_TAX_PAGES
          ? {
              "max-image-preview": "large",
              "max-snippet": -1,
              "max-video-preview": -1,
            }
          : {}),
      },
    },
  };
}

const BENCHMARK_INCOMES = [60_000, 100_000, 250_000] as const;
const TOP_CREATOR_STATES = [
  "california",
  "texas",
  "florida",
  "new-york",
  "washington",
  "nevada",
  "tennessee",
  "north-carolina",
];

export default async function StateCreatorTaxPage({
  params,
}: {
  params: Promise<{ state: string }>;
}) {
  const { state: slug } = await params;
  const state = getStateTaxBySlug(slug);

  if (!state) {
    notFound();
  }

  const brackets = BENCHMARK_INCOMES.map((inc) =>
    calculateCreatorStateTaxSummary(state, inc),
  );
  const bracket100k = brackets[1];
  const hasZeroStateTax = state.topIncomeTaxRate === 0;
  const combinedAssumedRate = String(
    Math.min(48, Math.round(28 + state.topIncomeTaxRate * 0.7)),
  );

  const neighborStates = state.popularNeighborSlugs
    .map((ns) => getStateTaxBySlug(ns))
    .filter((s): s is NonNullable<typeof s> => Boolean(s && s.slug !== state.slug));

  const popularStates = TOP_CREATOR_STATES.map((ps) => getStateTaxBySlug(ps)).filter(
    (s): s is NonNullable<typeof s> =>
      Boolean(
        s &&
          s.slug !== state.slug &&
          !neighborStates.some((n) => n.slug === s.slug),
      ),
  );

  const stateFaqs = [
    {
      question: `How are YouTube AdSense and sponsorship earnings taxed in ${state.stateName} in 2026?`,
      answer: hasZeroStateTax
        ? `${state.stateName} charges 0% personal state income tax on AdSense, brand deals, and affiliate earnings. Creators still pay 2026 Federal 15.3% Self-Employment tax (up to the $184,500 Social Security wage base) plus Federal income brackets after the $16,100 standard deduction and 20% QBI deduction.`
        : `Creators in ${state.stateName} pay ${state.taxStructure} state income tax (up to ${state.topIncomeTaxRate}%, or roughly ${state.effectiveRateAt100k}% effective at $100K net profit) alongside 2026 Federal 15.3% Self-Employment tax and Federal income brackets.`,
    },
    {
      question: `How much does an LLC cost in ${state.stateName} (${state.stateCode}) in 2026?`,
      answer: `Articles of Organization in ${state.stateName} cost $${state.llcFilingFee} to form initially, with an ongoing annual fee of $${state.llcAnnualFee} (${state.annualFeeSchedule}).`,
    },
    {
      question: `How much does an S-Corp save a ${state.stateName} YouTuber at $100,000 net profit?`,
      answer: `On $100,000 net profit in ${state.stateName}, a sole-proprietor LLC pays ~$${bracket100k.federalSelfEmploymentTax.toLocaleString("en-US")} in 2026 Federal SE tax plus ~$${bracket100k.estimatedFederalIncomeTax.toLocaleString("en-US")} estimated Federal income tax and $${bracket100k.estimatedStateIncomeTax.toLocaleString("en-US")} state tax ($${bracket100k.totalSolePropTax.toLocaleString("en-US")} total). Modeling a 45% W-2 S-Corp salary nets roughly ~$${bracket100k.estimatedSCorpNetSavings.toLocaleString("en-US")}/year in illustrative savings after payroll and state fees. ${state.sCorpNotes}`,
    },
    {
      question: `Should a ${state.stateName} creator form an LLC in Wyoming or Delaware instead?`,
      answer: `Usually no if you live and film in ${state.stateName}. Forming out-of-state requires foreign LLC registration where you work—doubling state filing fees without avoiding ${state.stateName} income taxes.`,
    },
    {
      question: `What business expenses can ${state.stateName} creators write off against AdSense income?`,
      answer: `Camera bodies, lenses, editing workstations, software subscriptions, freelance editors, contractor thumbnail designers, business travel, and exclusive home studio space lower both your 15.3% Federal SE tax and ${state.stateName} taxable profit dollar-for-dollar.`,
    },
  ];

  const pageUrl = `${siteConfig.url}/tools/creator-tax-calculator/${state.slug}`;
  const combinedSchema = combineSchemasToGraph(
    getSoftwareApplicationSchema({
      name: `${state.stateName} YouTube Creator Tax & S-Corp Calculator`,
      description: `2026 state-localized YouTube tax and LLC vs. S-Corp Form 2553 calculator for creators in ${state.stateName} (${state.stateCode}).`,
      url: pageUrl,
      category: "analytics-earnings",
      dateModified: DATA_LAST_REVIEWED,
    }),
    getBreadcrumbSchema([
      { name: "Home", url: siteConfig.url },
      { name: "Tools", url: `${siteConfig.url}/tools` },
      { name: "Creator Tax by State", url: `${siteConfig.url}/tools/creator-tax-calculator` },
      { name: state.stateName, url: pageUrl },
    ]),
    getFAQSchema(stateFaqs),
  );

  return (
    <ToolShell
      geoAeo={
        <GeoAeoHead
          {...GEO_AEO_PRESETS.toolPage(
            `${state.stateName} YouTube Creator Tax & S-Corp Calculator`,
            `Calculate 2026 ${state.stateName} state taxes, 15.3% Federal SE tax ($184,500 cap), $${state.llcFilingFee} LLC fee, and Form 2553 S-Corp savings.`,
            "analytics-earnings",
          )}
          pathname={`/tools/creator-tax-calculator/${state.slug}`}
        />
      }
      jsonLd={combinedSchema}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Tools", href: "/tools" },
        { name: "Creator Tax by State", href: "/tools/creator-tax-calculator" },
        { name: state.stateName },
      ]}
      accentGradient="from-blue-600 via-emerald-500 to-teal-500"
      icon={
        <ToolIcon3D
          slug="youtube-llc-vs-s-corp-tax-savings-calculator"
          category="analytics-earnings"
          size="lg"
          badge={state.stateCode}
          className="mt-0.5"
        />
      }
      badge={
        <>
          <span>{state.stateCode}</span>
          <span>·</span>
          <span>
            {hasZeroStateTax
              ? state.taxStructure === "capital-gains-only"
                ? "0% State Income Tax (Cap Gains Only)"
                : "0% State Income Tax (2026)"
              : `Up to ${state.topIncomeTaxRate}% ${state.taxStructure} State Tax (${state.effectiveRateAt100k}% eff. at $100K)`}
          </span>
        </>
      }
      title={`${state.stateName} YouTube Creator Tax & S-Corp Calculator`}
      subtitle={`Estimate 2026 Federal 15.3% Self-Employment tax ($${IRS_2026_CONSTANTS.socialSecurityWageBase.toLocaleString("en-US")} SS cap), Federal income tax ($${IRS_2026_CONSTANTS.standardDeductionSingle.toLocaleString("en-US")} std deduction + 20% QBI), ${state.stateName} state taxes, LLC fees ($${state.llcFilingFee} filing / $${state.llcAnnualFee} annual), and S-Corp savings.`}
      consoleTitle={`${state.stateName} (${state.stateCode}) Tax & S-Corp Console`}
      consoleIconColorClass="text-blue-300"
      consoleBadge={`Pre-Selected: ${state.stateCode}`}
      workspace={
        <StateCreatorTaxWorkspace
          state={state}
          combinedAssumedRate={combinedAssumedRate}
        />
      }
      faqHeading={`${state.stateName} Creator Tax Frequently Asked Questions`}
      faqs={stateFaqs}
      sidebarSlug="youtube-llc-vs-s-corp-tax-savings-calculator"
      stateTaxHref="/tools/creator-tax-calculator"
      stateTaxLabel="Browse All 50 US State Tax Pages"
      afterFaqSlot={
        <AdSectionIgnore>
          <div className="space-y-8">
            <div className="card-3d rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link
                  href="/tools/youtube-llc-vs-s-corp-tax-savings-calculator"
                  className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 hover:border-blue-400 transition-all flex items-center justify-between gap-3"
                >
                  <div>
                    <span className="text-xs font-extrabold uppercase text-blue-700 block">
                      Core Tax Tool
                    </span>
                    <span className="font-bold text-slate-900 block">
                      Full YouTube LLC vs. S-Corp Calculator
                    </span>
                  </div>
                  <FaBuilding className="w-5 h-5 text-blue-600 shrink-0" />
                </Link>

                <Link
                  href="/tools/youtube-tax-deduction-calculator"
                  className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 hover:border-emerald-400 transition-all flex items-center justify-between gap-3"
                >
                  <div>
                    <span className="text-xs font-extrabold uppercase text-emerald-700 block">
                      Write-Off Planner
                    </span>
                    <span className="font-bold text-slate-900 block">
                      YouTube Creator Tax &amp; Write-Off Calculator
                    </span>
                  </div>
                  <FaFileInvoiceDollar className="w-5 h-5 text-emerald-600 shrink-0" />
                </Link>
              </div>

              <div className="space-y-3">
                <h3 className="font-bold text-slate-900 flex items-center gap-2 font-outfit text-lg">
                  <FaMapMarkedAlt className="text-purple-600" />
                  <span>Compare Neighboring &amp; Popular Creator States</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[...neighborStates, ...popularStates].slice(0, 10).map((peer) => (
                    <Link
                      key={peer.slug}
                      href={`/tools/creator-tax-calculator/${peer.slug}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-purple-400 text-xs sm:text-sm font-bold text-slate-800 hover:text-purple-700 transition-colors"
                    >
                      <span className="px-1.5 py-0.5 rounded bg-slate-900 text-white text-[10px] font-black">
                        {peer.stateCode}
                      </span>
                      <span>{peer.stateName}</span>
                      <span className="text-slate-500 font-medium">
                        ({peer.topIncomeTaxRate === 0 ? "0%" : `${peer.topIncomeTaxRate}%`})
                      </span>
                    </Link>
                  ))}
                  <Link
                    href="/tools/creator-tax-calculator"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-purple-100 text-purple-800 hover:bg-purple-200 text-xs sm:text-sm font-bold transition-colors"
                  >
                    <span>Full Hub</span>
                    <FaArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>

            <UsStateTaxDirectoryGrid
              currentSlug={state.slug}
              heading="Browse or Filter All 50 States + D.C."
            />
          </div>
        </AdSectionIgnore>
      }
    >
      {/* Quick Answer Capsule */}
      <QuickAnswerCapsule
        question={`How much does a ${state.stateName} YouTuber owe in taxes and save via S-Corp in 2026?`}
        answer={`On $100,000 net profit in ${state.stateName}, a sole-proprietor LLC owes ~$${bracket100k.federalSelfEmploymentTax.toLocaleString("en-US")} in 15.3% Federal Self-Employment tax, ~$${bracket100k.estimatedFederalIncomeTax.toLocaleString("en-US")} estimated Federal income tax, and $${bracket100k.estimatedStateIncomeTax.toLocaleString("en-US")} ${state.stateCode} state tax ($${bracket100k.totalSolePropTax.toLocaleString("en-US")} total). An S-Corp election saves roughly ~$${bracket100k.estimatedSCorpNetSavings.toLocaleString("en-US")}/year net after $2,200 payroll/CPA overhead and ${state.stateCode} entity fees.`}
        keyPoints={[
          `2026 IRS Caps: $184,500 SS wage base · $16,100 single std deduction · 20% QBI`,
          `${state.stateCode} Income Tax: ${hasZeroStateTax ? "0% State Wage Tax" : `${state.effectiveRateAt100k}% effective at $100K (${state.topIncomeTaxRate}% top rate, ${state.taxStructure})`}`,
          `${state.stateName} LLC Costs: $${state.llcFilingFee} formation · $${state.llcAnnualFee}/yr (${state.annualFeeSchedule})`,
          `Est. Net S-Corp Savings at $250K Profit: +$${brackets[2].estimatedSCorpNetSavings.toLocaleString("en-US")}/year illustrative`,
        ]}
        badgeText={`${state.stateCode} 2026 Summary`}
      />

      {/* State Tax & S-Corp Comparison Table ($60K, $100K, $250K) */}
      <section className="card-3d rounded-3xl p-6 sm:p-8 space-y-5">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700">
            2026 Comparative Projections
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-outfit mt-1">
            {state.stateName} Creator Tax Breakdown ($60K, $100K &amp; $250K Net Income)
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Models 2026 Federal 15.3% Self-Employment tax ($
            {IRS_2026_CONSTANTS.socialSecurityWageBase.toLocaleString("en-US")} SSA cap),
            Federal income tax ($
            {IRS_2026_CONSTANTS.standardDeductionSingle.toLocaleString("en-US")} std deduction +
            20% QBI), {state.stateCode}{" "}
            {hasZeroStateTax
              ? "0% state income tax"
              : `${state.effectiveRateAt100k}% eff. / ${state.topIncomeTaxRate}% top state tax`}
            , and S-Corp savings (45% W-2 salary less $2,200 overhead &amp; $
            {state.llcAnnualFee} annual fee).
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-slate-200 text-slate-700 bg-slate-50">
                <th scope="col" className="py-3 px-3 font-extrabold">Net Creator Income</th>
                <th scope="col" className="py-3 px-3 font-extrabold">Federal SE Tax</th>
                <th scope="col" className="py-3 px-3 font-extrabold">Est. Fed Income</th>
                <th scope="col" className="py-3 px-3 font-extrabold">{state.stateCode} State Tax</th>
                <th scope="col" className="py-3 px-3 font-extrabold">Total Sole-Prop</th>
                <th scope="col" className="py-3 px-3 font-extrabold">Est. S-Corp Savings</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {brackets.map((row) => (
                <tr key={row.netProfit} className="hover:bg-slate-50/70">
                  <td className="py-3 px-3 font-black text-slate-900 whitespace-nowrap">
                    ${row.netProfit.toLocaleString("en-US")}/yr
                  </td>
                  <td className="py-3 px-3 text-rose-700 font-bold whitespace-nowrap">
                    ${row.federalSelfEmploymentTax.toLocaleString("en-US")}
                  </td>
                  <td className="py-3 px-3 font-semibold whitespace-nowrap">
                    ${row.estimatedFederalIncomeTax.toLocaleString("en-US")}
                  </td>
                  <td className="py-3 px-3 font-semibold whitespace-nowrap">
                    {hasZeroStateTax
                      ? "$0 (0%)"
                      : `$${row.estimatedStateIncomeTax.toLocaleString("en-US")}`}
                  </td>
                  <td className="py-3 px-3 text-slate-900 font-bold whitespace-nowrap">
                    ${row.totalSolePropTax.toLocaleString("en-US")}
                  </td>
                  <td
                    className={`py-3 px-3 font-black whitespace-nowrap ${
                      row.estimatedSCorpNetSavings > 0
                        ? "text-emerald-700"
                        : "text-slate-600"
                    }`}
                  >
                    {row.estimatedSCorpNetSavings > 0
                      ? `+$${row.estimatedSCorpNetSavings.toLocaleString("en-US")}/yr`
                      : "$0 net"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* State LLC Formation & Annual Report Table */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="text-[11px] font-bold uppercase text-slate-500 block">
              LLC Filing Fee ({state.stateCode})
            </span>
            <span className="text-lg font-black text-slate-900">
              ${state.llcFilingFee}
            </span>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="text-[11px] font-bold uppercase text-slate-500 block">
              Annual Report / Franchise
            </span>
            <span className="text-lg font-black text-slate-900">
              ${state.llcAnnualFee}/yr
            </span>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="text-[11px] font-bold uppercase text-slate-500 block">
              Filing Schedule
            </span>
            <span className="text-xs font-bold text-slate-800 block mt-0.5">
              {state.annualFeeSchedule}
            </span>
          </div>
        </div>

        <p className="text-[11px] text-slate-500">
          Disclaimer: Illustrative 2026 educational model using single-filer IRS constants ($
          {IRS_2026_CONSTANTS.socialSecurityWageBase.toLocaleString("en-US")} Social Security wage
          base, ${IRS_2026_CONSTANTS.standardDeductionSingle.toLocaleString("en-US")} standard
          deduction, 20% Section 199A QBI). Confirm local municipal taxes and exact brackets with a{" "}
          {state.stateName} CPA.
        </p>
      </section>

      {/* Localized Creator Guidance */}
      <section className="card-3d rounded-3xl p-6 sm:p-8 space-y-5">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
              <FaLightbulb className="w-4 h-4" aria-hidden="true" />
            </span>
            <h2 className="text-xl font-black text-slate-900 font-outfit">
              {state.stateName} Creator S-Corp Notes &amp; Tax Tips
            </h2>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-extrabold ${
              state.sCorpFriendly
                ? "bg-emerald-100 text-emerald-800"
                : "bg-amber-100 text-amber-800"
            }`}
          >
            {state.sCorpFriendly ? "Recognizes Federal S-Corp" : "Special Entity Tax Rules"}
          </span>
        </div>

        <div className="rounded-2xl bg-blue-50/70 border border-blue-200 p-4 text-sm text-slate-800 leading-relaxed">
          <strong className="text-blue-900">{state.stateCode} S-Corp &amp; Entity Rule: </strong>
          {state.sCorpNotes}
        </div>

        <div className="rounded-2xl bg-emerald-50/70 border border-emerald-200 p-4 text-sm text-slate-800 leading-relaxed flex items-start gap-2.5">
          <FaCheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
          <div>
            <strong className="text-emerald-900">{state.stateName} Creator Tax Tip: </strong>
            {state.creatorTaxTip}
          </div>
        </div>
      </section>
    </ToolShell>
  );
}
