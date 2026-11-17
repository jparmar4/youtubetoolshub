import Link from "next/link";
import { FaArrowRight, FaMapMarkedAlt } from "react-icons/fa";
import { getStateTaxBySlug, type UsStateCreatorTax } from "@/data/usStateCreatorTaxes";

const POPULAR_STATE_SLUGS = [
  "california",
  "texas",
  "florida",
  "new-york",
  "washington",
  "nevada",
  "tennessee",
  "georgia",
  "north-carolina",
  "illinois",
  "ohio",
  "washington-dc",
];

export default function PopularStateTaxHub({
  title = "US State YouTube Creator Tax & S-Corp Calculators (2026)",
  description = "Explore 2026 Federal Self-Employment tax ($184,500 SS cap), state income tax rates, Secretary of State LLC fees, and IRS Form 2553 S-Corp savings by US state.",
}: {
  title?: string;
  description?: string;
}) {
  const states = POPULAR_STATE_SLUGS.map((slug) => getStateTaxBySlug(slug)).filter(
    (s): s is UsStateCreatorTax => Boolean(s),
  );

  return (
    <section
      className="card-3d rounded-3xl p-6 sm:p-8 border border-blue-200/80 space-y-5"
      aria-labelledby="popular-state-tax-hub-heading"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-blue-700">
            <FaMapMarkedAlt className="w-3.5 h-3.5" aria-hidden="true" />
            <span>50 US States + D.C. Tax Benchmarks</span>
          </span>
          <h2
            id="popular-state-tax-hub-heading"
            className="text-xl sm:text-2xl font-black text-slate-900 font-outfit mt-1"
          >
            {title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            {description}
          </p>
        </div>

        <Link
          href="/tools/creator-tax-calculator"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold shrink-0 shadow-xs transition-colors"
        >
          <span>All 51 US States</span>
          <FaArrowRight className="w-3 h-3" aria-hidden="true" />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
        {states.map((state) => (
          <Link
            key={state.slug}
            href={`/tools/creator-tax-calculator/${state.slug}`}
            className="group p-3 rounded-2xl bg-slate-50/80 border border-slate-200 hover:border-blue-400 hover:bg-white transition-all flex items-center justify-between gap-2"
          >
            <div className="min-w-0">
              <span className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-blue-700 block truncate">
                {state.stateName}
              </span>
              <span className="text-[11px] text-slate-600 block truncate">
                {state.topIncomeTaxRate === 0
                  ? "0% State Tax"
                  : `${state.topIncomeTaxRate}% State`}{" "}
                · ${state.llcFilingFee} LLC
              </span>
            </div>
            <span className="px-1.5 py-0.5 rounded bg-slate-900 text-white text-[10px] font-black shrink-0">
              {state.stateCode}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
