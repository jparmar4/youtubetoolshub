import Link from "next/link";
import { FaCalculator, FaArrowRight, FaChartLine } from "react-icons/fa";

interface EarningsCalculatorCTAProps {
  /** Compact mid-article style vs full card */
  variant?: "banner" | "card";
  /** Optional context from the article title */
  contextLabel?: string;
}

/**
 * In-article CTA pushing the free YouTube Earnings Calculator pillar.
 * Used automatically on monetization / CPM / revenue posts.
 */
export default function EarningsCalculatorCTA({
  variant = "card",
  contextLabel,
}: EarningsCalculatorCTAProps) {
  if (variant === "banner") {
    return (
      <aside
        className="not-prose my-10 rounded-2xl border border-emerald-200 bg-gradient-to-r from-emerald-50 to-white p-5 md:p-6 shadow-sm"
        data-cta="earnings-calculator"
        aria-label="Free YouTube earnings calculator"
      >
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
          <div className="flex gap-3 items-start">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <FaCalculator className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-black uppercase tracking-wider text-emerald-700 mb-1">
                Free tool
              </p>
              <p className="font-bold text-slate-900 leading-snug">
                Estimate your AdSense income with the YouTube Earnings Calculator
              </p>
              <p className="text-sm text-slate-600 mt-1">
                Formula: (views ÷ 1,000) × RPM · Example: 100K views × $5 ≈ $500/mo
              </p>
            </div>
          </div>
          <Link
            href="/tools/youtube-earnings-calculator"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shrink-0 transition-colors"
          >
            Open calculator
            <FaArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </aside>
    );
  }

  return (
    <aside
      className="not-prose my-10 rounded-3xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-6 md:p-8 shadow-lg shadow-emerald-900/5"
      data-cta="earnings-calculator"
      aria-label="Free YouTube earnings calculator"
    >
      <div className="flex items-center gap-2 text-emerald-800 text-xs font-black uppercase tracking-widest mb-3">
        <FaChartLine />
        {contextLabel || "Plan your channel revenue"}
      </div>
      <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-3 tracking-tight">
        Free YouTube Earnings Calculator
      </h2>
      <p className="text-slate-600 leading-relaxed mb-5 max-w-2xl">
        Estimate monthly and yearly AdSense revenue from your views and RPM.
        Compare country CPM ranges, model high-intent niches, and verify
        planning numbers against YouTube Studio — no signup required.
      </p>
      <ul className="grid sm:grid-cols-3 gap-2 mb-6 text-sm text-slate-700">
        <li className="rounded-lg bg-white/80 border border-emerald-100 px-3 py-2 font-medium">
          RPM × views formula
        </li>
        <li className="rounded-lg bg-white/80 border border-emerald-100 px-3 py-2 font-medium">
          50+ country pages
        </li>
        <li className="rounded-lg bg-white/80 border border-emerald-100 px-3 py-2 font-medium">
          Niche CPM context
        </li>
      </ul>
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/tools/youtube-earnings-calculator"
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-colors shadow-md shadow-emerald-600/20"
        >
          <FaCalculator />
          Calculate earnings free
          <FaArrowRight className="w-3 h-3" />
        </Link>
        <Link
          href="/resources/youtube-cpm-rates"
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white border border-slate-200 text-slate-800 font-bold hover:border-emerald-400 transition-colors"
        >
          CPM rates by country
        </Link>
      </div>
    </aside>
  );
}
