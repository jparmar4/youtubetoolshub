"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  FaArrowRight,
  FaBullhorn,
  FaCheck,
  FaCopy,
  FaDollarSign,
  FaFileContract,
  FaGlobeAmericas,
} from "react-icons/fa";
import ToolPageLayout from "@/components/tools/ToolPageLayout";
import { Input } from "@/components/ui/Input";
import ShareResultCardButton from "@/components/tools/ShareResultCardButton";
import SaveToVideoPackButton from "@/components/video-pack/SaveToVideoPackButton";
import { useVideoPack } from "@/context/VideoPackContext";
import { parseCalculatorInput } from "@/lib/calculator-input";

const VIEW_PRESETS = [10_000, 25_000, 50_000, 100_000, 250_000, 1_000_000] as const;

const NICHE_TIERS = [
  { id: "finance", label: "Finance / B2B / SaaS ($35 CPM)", cpm: 35 },
  { id: "tech", label: "Tech / AI ($28 CPM)", cpm: 28 },
  { id: "education", label: "Education / Health ($20 CPM)", cpm: 20 },
  { id: "lifestyle", label: "Lifestyle / Travel ($15 CPM)", cpm: 15 },
  { id: "gaming", label: "Gaming / Entertainment ($10 CPM)", cpm: 10 },
] as const;

const BOOST_RIGHTS_OPTIONS = [
  { id: "none", label: "None (0%)", pct: 0, short: "No Paid Whitelisting" },
  { id: "30d", label: "30 Days (+30%)", pct: 0.3, short: "30-Day Creator Partnerships Boost" },
  { id: "60d", label: "60 Days (+50%)", pct: 0.5, short: "60-Day Creator Partnerships Boost" },
  { id: "90d", label: "90 Days (+75%)", pct: 0.75, short: "90-Day Creator Partnerships Boost" },
] as const;

const FORMAT_OPTIONS = [
  { id: "integration", label: "60s Organic Integration (1.0x)", factor: 1.0 },
  { id: "dedicated", label: "Full Dedicated Video (2.5x)", factor: 2.5 },
] as const;

export default function CreatorPartnershipBoostCalculator() {
  const searchParams = useSearchParams();
  const initialViews = searchParams.get("views") || "";
  const [prevViewsParam, setPrevViewsParam] = useState(initialViews);
  const [avgViewsInput, setAvgViewsInput] = useState(initialViews || "50000");

  if (initialViews && initialViews !== prevViewsParam) {
    setPrevViewsParam(initialViews);
    setAvgViewsInput(initialViews);
  }

  const [nicheId, setNicheId] = useState<string>("tech");
  const [tier1Share, setTier1Share] = useState<number>(60);
  const [boostId, setBoostId] = useState<string>("60d");
  const [formatId, setFormatId] = useState<string>("integration");
  const [copiedClause, setCopiedClause] = useState(false);

  const { pack, updatePack } = useVideoPack();

  const activeNiche =
    NICHE_TIERS.find((n) => n.id === nicheId) || NICHE_TIERS[1];
  const activeBoost =
    BOOST_RIGHTS_OPTIONS.find((b) => b.id === boostId) || BOOST_RIGHTS_OPTIONS[2];
  const activeFormat =
    FORMAT_OPTIONS.find((f) => f.id === formatId) || FORMAT_OPTIONS[0];

  const calculations = useMemo(() => {
    const avgViews = parseCalculatorInput(avgViewsInput);
    if (!Number.isFinite(avgViews) || avgViews <= 0) return null;

    // Tier-1 (US/UK/CA/AU) audience weighting: 50% share = 1.0x benchmark; 10% = 0.72x; 90% = 1.28x
    const tier1Multiplier = 0.65 + (tier1Share / 100) * 0.7;
    const adjustedCpm = activeNiche.cpm * tier1Multiplier * activeFormat.factor;

    const minFloor = activeFormat.id === "dedicated" ? 450 : 150;
    const rawBaseRate = (avgViews / 1000) * adjustedCpm;
    const baseOrganicRate = Math.max(minFloor, Math.round(rawBaseRate));

    const adBoostFee = Math.round(baseOrganicRate * activeBoost.pct);
    const totalPackageQuote = baseOrganicRate + adBoostFee;

    const negotiationFloor = Math.round(totalPackageQuote * 0.85);
    const agencyAnchorQuote = Math.round(totalPackageQuote * 1.25);

    return {
      avgViews,
      tier1Multiplier,
      effectiveCpm: adjustedCpm.toFixed(2),
      baseOrganicRate,
      adBoostFee,
      totalPackageQuote,
      negotiationFloor,
      agencyAnchorQuote,
    };
  }, [avgViewsInput, activeNiche, tier1Share, activeBoost, activeFormat]);

  const emailTemplate = useMemo(() => {
    if (!calculations) return "";
    const boostClause =
      activeBoost.pct === 0
        ? "Usage Rights Clause: This fee covers organic channel upload and description links only. Paid ad amplification (YouTube Creator Partnerships / Google Ads linking) is excluded unless licensed separately."
        : `Paid Ad Boost & Whitelisting Clause: Includes non-exclusive YouTube Creator Partnerships ad-linking permission (${activeBoost.short}) for $${calculations.adBoostFee.toLocaleString("en-US")}. Usage automatically expires at the end of the ${activeBoost.id.replace("d", "-day")} flight unless renewed in writing. Category exclusivity and raw file buyouts are excluded.`;

    return `Subject: YouTube Sponsorship + Ad Boost Proposal (~${calculations.avgViews.toLocaleString("en-US")} Avg Views)

Hi [Brand Partner / Agency Name],

Thanks for reaching out! Based on our channel's last 10 uploads averaging ${calculations.avgViews.toLocaleString("en-US")} views with ${tier1Share}% Tier-1 audience share (US/UK/CA/AU) in the ${activeNiche.label.split(" (")[0]} category, here is our structured 2026 package quote:

• ${activeFormat.label.split(" (")[0]} (Base Organic Fee): $${calculations.baseOrganicRate.toLocaleString("en-US")}
• Paid YouTube Partnership Boost (${activeBoost.label}): +$${calculations.adBoostFee.toLocaleString("en-US")}
• Total Recommended Package Quote: $${calculations.totalPackageQuote.toLocaleString("en-US")}

${boostClause}

Let me know if you'd like us to hold our upcoming production window and I'll send over audience Analytics verification and an invoice schedule.

Best,
[Your Name / Channel Handle]`;
  }, [calculations, tier1Share, activeNiche, activeFormat, activeBoost]);

  const handleCopyClause = async () => {
    if (!emailTemplate) return;
    try {
      await navigator.clipboard.writeText(emailTemplate);
      setCopiedClause(true);
      setTimeout(() => setCopiedClause(false), 2400);
    } catch {
      /* ignore */
    }
  };

  return (
    <ToolPageLayout
      title='Sponsorship & Creator Partnership "Ad Boost" Rate Calculator'
      slug="creator-partnership-boost-calculator"
      description="Price organic YouTube integrations plus paid Creator Partnerships ad whitelisting usage rights based on Niche CPM and Tier-1 geography."
    >
      <div className="space-y-8">
        {/* Inputs Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Quick Average Views Presets
              </span>
              <div className="flex flex-wrap gap-1.5">
                {VIEW_PRESETS.map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setAvgViewsInput(String(v))}
                    className={`cursor-pointer px-2.5 py-1 rounded-lg text-xs font-bold border transition-colors ${
                      parseCalculatorInput(avgViewsInput) === v
                        ? "bg-purple-600 text-white border-purple-600"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:border-purple-400"
                    }`}
                  >
                    {v >= 1_000_000 ? `${v / 1_000_000}M` : `${v / 1000}K`}
                  </button>
                ))}
              </div>
            </div>

            <Input
              label="Average Views per Video (Last 10 Uploads)"
              type="text"
              inputMode="decimal"
              placeholder="e.g. 50000"
              value={avgViewsInput}
              onChange={(e) => setAvgViewsInput(e.target.value)}
            />
          </div>

          {/* Format + Niche Tier */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="partnership-niche-select"
                className="block text-sm font-bold text-slate-800 mb-2"
              >
                Content Niche CPM Tier
              </label>
              <select
                id="partnership-niche-select"
                value={nicheId}
                onChange={(e) => setNicheId(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500"
              >
                {NICHE_TIERS.map((n) => (
                  <option key={n.id} value={n.id}>
                    {n.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <span className="block text-sm font-bold text-slate-800 mb-2">
                Organic Deliverable Format
              </span>
              <div className="grid grid-cols-2 gap-2">
                {FORMAT_OPTIONS.map((fmt) => (
                  <button
                    key={fmt.id}
                    type="button"
                    onClick={() => setFormatId(fmt.id)}
                    className={`cursor-pointer py-2.5 px-3 rounded-xl border text-xs font-extrabold transition-all ${
                      formatId === fmt.id
                        ? "bg-slate-900 text-white border-slate-900"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:border-purple-300"
                    }`}
                  >
                    {fmt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Tier-1 Audience Share Slider */}
          <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4 sm:p-5 space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <label
                htmlFor="tier1-share-slider"
                className="text-sm font-bold text-slate-900 flex items-center gap-2"
              >
                <FaGlobeAmericas className="text-emerald-600" aria-hidden="true" />
                <span>Audience Tier-1 Share (US / UK / CA / AU)</span>
              </label>
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black">
                {tier1Share}% Tier-1 Viewers
              </span>
            </div>
            <input
              id="tier1-share-slider"
              type="range"
              min={10}
              max={90}
              step={5}
              value={tier1Share}
              onChange={(e) => setTier1Share(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer h-2.5 rounded-lg bg-slate-200"
            />
            <div className="flex justify-between text-[11px] font-bold text-slate-500">
              <span>10% (Global)</span>
              <span>50% (1.0x Base CPM)</span>
              <span>90% (1.28x Tier-1 Premium)</span>
            </div>
          </div>

          {/* Paid Ad Boost Rights */}
          <div>
            <span className="block text-sm font-bold text-slate-800 mb-2">
              YouTube Creator Partnerships Paid Ad Boost / Whitelisting Rights
            </span>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
              {BOOST_RIGHTS_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setBoostId(opt.id)}
                  className={`cursor-pointer p-3 rounded-xl border text-left transition-all ${
                    boostId === opt.id
                      ? "bg-purple-600 text-white border-purple-600 shadow-sm"
                      : "bg-slate-50 text-slate-800 border-slate-200 hover:border-purple-400"
                  }`}
                >
                  <span className="text-xs font-black block">{opt.label}</span>
                  <span
                    className={`text-[11px] block mt-0.5 ${
                      boostId === opt.id ? "text-purple-100" : "text-slate-500"
                    }`}
                  >
                    {opt.short}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {!calculations && (
          <p role="status" className="text-sm font-medium text-amber-700">
            Enter a valid average view count greater than 0 to compute sponsorship and boost fees.
          </p>
        )}

        {/* Output Cards */}
        {calculations && (
          <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-xs">
                <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500 block">
                  Base Organic Integration Rate
                </span>
                <span className="text-3xl font-black text-slate-900 font-outfit block mt-1">
                  ${calculations.baseOrganicRate.toLocaleString("en-US")}
                </span>
                <span className="text-xs text-slate-600 block mt-1.5">
                  Effective CPM: <strong>${calculations.effectiveCpm}</strong> ({tier1Share}% Tier-1)
                </span>
              </div>

              <div className="rounded-2xl bg-indigo-50/70 border border-indigo-200 p-6 shadow-xs">
                <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-700 block">
                  Paid Partnership Ad-Boost Fee
                </span>
                <span className="text-3xl font-black text-indigo-800 font-outfit block mt-1">
                  +${calculations.adBoostFee.toLocaleString("en-US")}
                </span>
                <span className="text-xs text-indigo-900/80 block mt-1.5">
                  {activeBoost.label} ad whitelisting license
                </span>
              </div>

              <div className="rounded-2xl bg-gradient-to-br from-purple-700 to-indigo-800 text-white p-6 shadow-lg">
                <span className="text-xs font-extrabold uppercase tracking-wider text-purple-200 block">
                  Total Recommended Quote
                </span>
                <span className="text-3xl sm:text-4xl font-black font-outfit block mt-1">
                  ${calculations.totalPackageQuote.toLocaleString("en-US")}
                </span>
                <span className="text-xs text-purple-100 block mt-1.5">
                  Floor: ${calculations.negotiationFloor.toLocaleString("en-US")} · Anchor: $
                  {calculations.agencyAnchorQuote.toLocaleString("en-US")}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-slate-50 border border-slate-200 px-5 py-3.5">
              <span className="text-xs font-semibold text-slate-600">
                Package Breakdown: ${calculations.baseOrganicRate.toLocaleString("en-US")} organic + $
                {calculations.adBoostFee.toLocaleString("en-US")} boost ={" "}
                <strong>${calculations.totalPackageQuote.toLocaleString("en-US")}</strong>
              </span>
              <div className="flex flex-wrap items-center gap-2">
                <ShareResultCardButton
                  badgeText="Sponsor + Ad Boost Quote"
                  headline={`$${calculations.totalPackageQuote.toLocaleString("en-US")} Recommended Deal Quote`}
                  subtitle={`${calculations.avgViews.toLocaleString("en-US")} avg views · ${tier1Share}% Tier-1 audience · ${activeBoost.short}`}
                  accent="purple"
                  filename="youtube-partnership-boost-quote.png"
                  metrics={[
                    {
                      label: "Base Organic Rate",
                      value: `$${calculations.baseOrganicRate.toLocaleString("en-US")}`,
                    },
                    {
                      label: "Ad Boost License",
                      value: `+$${calculations.adBoostFee.toLocaleString("en-US")}`,
                    },
                    {
                      label: "Adjusted Niche CPM",
                      value: `$${calculations.effectiveCpm}`,
                    },
                  ]}
                />
                <SaveToVideoPackButton
                  label="Save Quote to Pack"
                  toastMessage="Saved sponsorship & boost quote to Active Video Pack!"
                  onSave={() =>
                    updatePack({
                      notes: [
                        pack.notes,
                        `Sponsor + Ad Boost Quote ($${calculations.totalPackageQuote.toLocaleString("en-US")}): Base $${calculations.baseOrganicRate.toLocaleString("en-US")} + ${activeBoost.label} (+$${calculations.adBoostFee.toLocaleString("en-US")}) at ${tier1Share}% Tier-1.`,
                      ]
                        .filter(Boolean)
                        .join("\n\n"),
                    })
                  }
                />
              </div>
            </div>

            {/* Pre-Filled Brand Negotiation Email & Usage Rights Clause */}
            <div className="rounded-2xl bg-slate-900 text-white p-6 shadow-xl space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <FaFileContract className="text-emerald-400" aria-hidden="true" />
                  <h3 className="text-sm sm:text-base font-black text-white font-outfit">
                    Brand Negotiation Email &amp; Usage Rights Clause
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={handleCopyClause}
                  className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-extrabold transition-colors"
                >
                  {copiedClause ? (
                    <FaCheck className="text-emerald-300" />
                  ) : (
                    <FaCopy />
                  )}
                  <span>{copiedClause ? "Copied Email & Clause!" : "Copy Email & Usage Clause"}</span>
                </button>
              </div>
              <pre className="text-xs text-slate-300 font-mono whitespace-pre-wrap leading-relaxed bg-slate-950/70 p-4 rounded-xl border border-slate-800 overflow-x-auto">
                {emailTemplate}
              </pre>
            </div>

            {/* Cross-links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <Link
                href={`/tools/youtube-sponsorship-calculator?views=${Math.round(calculations.avgViews)}`}
                className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-purple-400 transition-colors flex items-center justify-between gap-3"
              >
                <div>
                  <span className="font-bold text-slate-900 flex items-center gap-1.5">
                    <FaBullhorn className="text-purple-600" aria-hidden="true" /> Full Media Kit &amp; Cold Pitch Builder
                  </span>
                  <span className="text-slate-600 block mt-0.5">
                    Export a 1-page agency rate card PDF &amp; 5 follow-up cold email scripts.
                  </span>
                </div>
                <FaArrowRight className="w-3.5 h-3.5 text-purple-600 shrink-0" />
              </Link>

              <Link
                href={`/tools/youtube-earnings-calculator?views=${Math.round(calculations.avgViews * 4)}`}
                className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-emerald-400 transition-colors flex items-center justify-between gap-3"
              >
                <div>
                  <span className="font-bold text-slate-900 flex items-center gap-1.5">
                    <FaDollarSign className="text-emerald-600" aria-hidden="true" /> Compare AdSense + Sponsorship Stack
                  </span>
                  <span className="text-slate-600 block mt-0.5">
                    Model AdSense monthly revenue alongside brand integration income.
                  </span>
                </div>
                <FaArrowRight className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
}
