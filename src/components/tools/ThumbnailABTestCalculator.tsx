"use client";

import { useState, useMemo } from "react";
import ToolPageLayout from "@/components/tools/ToolPageLayout";
import { Input } from "@/components/ui/Input";
import { parseCalculatorInput } from "@/lib/calculator-input";
import GoogleAd from "@/components/ads/GoogleAd";
import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaQuestionCircle,
  FaCopy,
  FaLightbulb,
  FaTrophy,
} from "react-icons/fa";

// Standard normal cumulative distribution function approximation
function normalCdf(z: number): number {
  const t = 1 / (1 + 0.2316419 * Math.abs(z));
  const d = 0.3989423 * Math.exp((-z * z) / 2);
  let p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  if (z > 0) p = 1 - p;
  return p;
}

export default function ThumbnailABTestCalculator() {
  const [includeVariantC, setIncludeVariantC] = useState<boolean>(false);

  // Variant A
  const [nameA, setNameA] = useState<string>("Thumbnail A (Expressive Face)");
  const [impAInput, setImpAInput] = useState<string>("24500");
  const [clicksAInput, setClicksAInput] = useState<string>("1180");

  // Variant B
  const [nameB, setNameB] = useState<string>("Thumbnail B (Bold Text Minimal)");
  const [impBInput, setImpBInput] = useState<string>("24200");
  const [clicksBInput, setClicksBInput] = useState<string>("1510");

  // Variant C
  const [nameC, setNameC] = useState<string>("Thumbnail C (Product Zoom)");
  const [impCInput, setImpCInput] = useState<string>("23800");
  const [clicksCInput, setClicksCInput] = useState<string>("1210");

  const [copied, setCopied] = useState<boolean>(false);

  const results = useMemo(() => {
    const impA = parseCalculatorInput(impAInput);
    const clicksA = parseCalculatorInput(clicksAInput);

    const impB = parseCalculatorInput(impBInput);
    const clicksB = parseCalculatorInput(clicksBInput);

    if (impA <= 0 || impB <= 0 || clicksA < 0 || clicksB < 0) return null;

    const ctrA = (clicksA / impA) * 100;
    const ctrB = (clicksB / impB) * 100;

    // Two-proportion Z-test between A and B
    const p1 = clicksA / impA;
    const p2 = clicksB / impB;
    const pooledP = (clicksA + clicksB) / (impA + impB);
    const se = Math.sqrt(pooledP * (1 - pooledP) * (1 / impA + 1 / impB));

    let zScore = 0;
    let pValue = 1;
    let confidence = 0;

    if (se > 0) {
      zScore = (p2 - p1) / se;
      const oneTailed = normalCdf(Math.abs(zScore));
      pValue = Math.min(1, oneTailed * 2);
      confidence = +((1 - pValue) * 100).toFixed(1);
    }

    const ctrDiff = +(ctrB - ctrA).toFixed(2);
    const relativeLift = ctrA > 0 ? +(((ctrB - ctrA) / ctrA) * 100).toFixed(1) : 0;

    // Estimated sample size required for 95% confidence (alpha 0.05, power 0.80)
    const delta = Math.abs(p1 - p2);
    let sampleSizeNeededPerVariant = 0;
    let impressionsRemaining = 0;

    if (delta > 0.0001) {
      sampleSizeNeededPerVariant = Math.round((16 * pooledP * (1 - pooledP)) / (delta * delta));
      const currentMin = Math.min(impA, impB);
      impressionsRemaining = Math.max(0, sampleSizeNeededPerVariant - currentMin);
    }

    // Additional Variant C analysis if enabled
    let ctrC = 0;
    let winnerName = nameB;
    if (ctrA > ctrB) winnerName = nameA;

    if (includeVariantC) {
      const impC = parseCalculatorInput(impCInput);
      const clicksC = parseCalculatorInput(clicksCInput);
      if (impC > 0 && clicksC >= 0) {
        ctrC = (clicksC / impC) * 100;
        if (ctrC > Math.max(ctrA, ctrB)) winnerName = nameC;
      }
    }

    // Verdict determination
    let verdict: "WINNER" | "TRENDING" | "INCONCLUSIVE" = "INCONCLUSIVE";
    if (confidence >= 95) {
      verdict = "WINNER";
    } else if (confidence >= 80) {
      verdict = "TRENDING";
    }

    // Extra views per 100k impressions
    const extraViewsPer100k = Math.round(Math.abs(ctrDiff / 100) * 100000);

    return {
      impA,
      clicksA,
      ctrA: +ctrA.toFixed(2),
      impB,
      clicksB,
      ctrB: +ctrB.toFixed(2),
      ctrC: +ctrC.toFixed(2),
      ctrDiff,
      relativeLift,
      zScore: +zScore.toFixed(3),
      pValue: +pValue.toFixed(4),
      confidence,
      winnerName,
      verdict,
      sampleSizeNeededPerVariant,
      impressionsRemaining,
      extraViewsPer100k,
    };
  }, [impAInput, clicksAInput, impBInput, clicksBInput, impCInput, clicksCInput, nameA, nameB, nameC, includeVariantC]);

  const handleCopySummary = () => {
    if (!results) return;
    const summary = `🎯 YouTube Thumbnail A/B Test Verdict:
- ${nameA}: ${results.ctrA}% CTR (${results.clicksA.toLocaleString()} / ${results.impA.toLocaleString()})
- ${nameB}: ${results.ctrB}% CTR (${results.clicksB.toLocaleString()} / ${results.impB.toLocaleString()})
- Confidence Level: ${results.confidence}% (Z: ${results.zScore}, p: ${results.pValue})
- Verdict: ${results.verdict === "WINNER" ? `Clear Winner: ${results.winnerName}` : `Needs more data (~${results.impressionsRemaining.toLocaleString()} impressions)`}
- Incremental Lift: ${results.relativeLift > 0 ? `+${results.relativeLift}%` : `${results.relativeLift}%`} (${results.extraViewsPer100k.toLocaleString()} extra views / 100k views)
Calculated on youtubetoolshub.com`;

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <ToolPageLayout
      title="YouTube Thumbnail A/B Test Statistical Significance Calculator"
      description="Calculate statistical confidence, p-value, and sample size requirements for YouTube Studio Test & Compare thumbnail experiments."
    >
      <form
        toolname="calculate_thumbnail_ab_significance"
        tooldescription="Calculate statistical confidence and winner significance for YouTube thumbnail A/B tests"
        className="space-y-8"
        onSubmit={(e) => e.preventDefault()}
      >
        {/* Toggle 3rd Variant */}
        <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              YouTube 3-Way &quot;Test & Compare&quot; Support
            </h3>
            <p className="text-xs text-slate-500">Enable if testing 3 thumbnail variants simultaneously</p>
          </div>
          <button
            type="button"
            onClick={() => setIncludeVariantC(!includeVariantC)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              includeVariantC
                ? "bg-purple-600 text-white"
                : "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
            }`}
          >
            {includeVariantC ? "3 Variants Active" : "+ Add Variant C"}
          </button>
        </div>

        {/* Input Cards Grid */}
        <div className={`grid grid-cols-1 ${includeVariantC ? "md:grid-cols-3" : "md:grid-cols-2"} gap-5`}>
          {/* Variant A */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3.5">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
              <span className="text-xs font-extrabold uppercase tracking-wider text-purple-600">Variant A</span>
              <span className="text-xs font-bold text-slate-500">{results ? `${results.ctrA}% CTR` : "--"}</span>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Variant Name</label>
              <Input
                value={nameA}
                onChange={(e) => setNameA(e.target.value)}
                className="text-xs font-semibold"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Impressions</label>
                <Input
                  value={impAInput}
                  onChange={(e) => setImpAInput(e.target.value)}
                  placeholder="24500"
                  className="font-bold text-slate-900 dark:text-slate-100"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Clicks</label>
                <Input
                  value={clicksAInput}
                  onChange={(e) => setClicksAInput(e.target.value)}
                  placeholder="1180"
                  className="font-bold text-slate-900 dark:text-slate-100"
                />
              </div>
            </div>
          </div>

          {/* Variant B */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3.5">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
              <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-600">Variant B</span>
              <span className="text-xs font-bold text-slate-500">{results ? `${results.ctrB}% CTR` : "--"}</span>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Variant Name</label>
              <Input
                value={nameB}
                onChange={(e) => setNameB(e.target.value)}
                className="text-xs font-semibold"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Impressions</label>
                <Input
                  value={impBInput}
                  onChange={(e) => setImpBInput(e.target.value)}
                  placeholder="24200"
                  className="font-bold text-slate-900 dark:text-slate-100"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Clicks</label>
                <Input
                  value={clicksBInput}
                  onChange={(e) => setClicksBInput(e.target.value)}
                  placeholder="1510"
                  className="font-bold text-slate-900 dark:text-slate-100"
                />
              </div>
            </div>
          </div>

          {/* Optional Variant C */}
          {includeVariantC && (
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3.5">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
                <span className="text-xs font-extrabold uppercase tracking-wider text-sky-600">Variant C</span>
                <span className="text-xs font-bold text-slate-500">{results ? `${results.ctrC}% CTR` : "--"}</span>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Variant Name</label>
                <Input
                  value={nameC}
                  onChange={(e) => setNameC(e.target.value)}
                  className="text-xs font-semibold"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Impressions</label>
                  <Input
                    value={impCInput}
                    onChange={(e) => setImpCInput(e.target.value)}
                    placeholder="23800"
                    className="font-bold text-slate-900 dark:text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Clicks</label>
                  <Input
                    value={clicksCInput}
                    onChange={(e) => setClicksCInput(e.target.value)}
                    placeholder="1210"
                    className="font-bold text-slate-900 dark:text-slate-100"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Statistical Verdict Showcase */}
        {results && (
          <div className="space-y-5">
            {/* Verdict Header Banner */}
            <div
              className={`p-6 rounded-2xl border shadow-sm ${
                results.verdict === "WINNER"
                  ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800"
                  : results.verdict === "TRENDING"
                  ? "bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800"
                  : "bg-slate-50 dark:bg-slate-900 border-slate-300 dark:border-slate-800"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <span className="p-3 rounded-xl bg-white dark:bg-slate-800 shadow-2xs shrink-0 mt-0.5">
                    {results.verdict === "WINNER" ? (
                      <FaTrophy className="w-6 h-6 text-emerald-600" />
                    ) : results.verdict === "TRENDING" ? (
                      <FaExclamationTriangle className="w-6 h-6 text-amber-600" />
                    ) : (
                      <FaQuestionCircle className="w-6 h-6 text-slate-500" />
                    )}
                  </span>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`text-xs font-extrabold uppercase px-2.5 py-0.5 rounded-full ${
                          results.verdict === "WINNER"
                            ? "bg-emerald-600 text-white"
                            : results.verdict === "TRENDING"
                            ? "bg-amber-600 text-white"
                            : "bg-slate-600 text-white"
                        }`}
                      >
                        {results.verdict === "WINNER"
                          ? "Statistically Significant Winner"
                          : results.verdict === "TRENDING"
                          ? "Trending Result (Need More Views)"
                          : "Inconclusive Difference"}
                      </span>
                      <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
                        {results.confidence}% Statistical Confidence
                      </span>
                    </div>
                    <h3 className="text-lg font-extrabold text-slate-900 dark:text-slate-100">
                      {results.verdict === "WINNER"
                        ? `${results.winnerName} wins with +${results.relativeLift}% higher CTR`
                        : results.verdict === "TRENDING"
                        ? `${results.winnerName} is currently leading, but needs ~${results.impressionsRemaining.toLocaleString()} more impressions`
                        : "Neither thumbnail has a statistically detectable edge yet"}
                    </h3>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopySummary}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold hover:bg-slate-50 transition-colors shadow-2xs self-start sm:self-center shrink-0"
                >
                  <FaCopy className="w-3.5 h-3.5" />
                  {copied ? "Copied Verdict!" : "Copy Report"}
                </button>
              </div>
            </div>

            {/* Metrics Breakdown Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span className="text-xs font-medium text-slate-500 block mb-1">Relative CTR Lift</span>
                <span className="text-2xl font-extrabold text-purple-600">
                  {results.relativeLift > 0 ? `+${results.relativeLift}%` : `${results.relativeLift}%`}
                </span>
                <span className="text-[11px] text-slate-500 block mt-0.5">
                  vs {nameA}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span className="text-xs font-medium text-slate-500 block mb-1">Extra Views / 100k</span>
                <span className="text-2xl font-extrabold text-emerald-600">
                  +{results.extraViewsPer100k.toLocaleString()}
                </span>
                <span className="text-[11px] text-slate-500 block mt-0.5">
                  Incremental viewers
                </span>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span className="text-xs font-medium text-slate-500 block mb-1">P-Value</span>
                <span className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">
                  {results.pValue}
                </span>
                <span className="text-[11px] text-slate-500 block mt-0.5">
                  {results.pValue < 0.05 ? "p < 0.05 (Rigorous)" : "p >= 0.05"}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span className="text-xs font-medium text-slate-500 block mb-1">Sample Size Required</span>
                <span className="text-2xl font-extrabold text-sky-600">
                  {results.sampleSizeNeededPerVariant.toLocaleString()}
                </span>
                <span className="text-[11px] text-slate-500 block mt-0.5">
                  per thumbnail
                </span>
              </div>
            </div>

            {/* Recommendations Advice */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 space-y-1.5">
              <p className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <FaLightbulb className="text-amber-500 shrink-0" />
                Actionable Recommendation
              </p>
              <p>
                {results.verdict === "WINNER"
                  ? `Lock in "${results.winnerName}" as your permanent thumbnail immediately in YouTube Studio. The ${results.confidence}% confidence score confirms this isn't random variance.`
                  : results.verdict === "TRENDING"
                  ? `Keep the test running. You need approximately ${results.impressionsRemaining.toLocaleString()} more impressions per variant before declaring a permanent winner with 95% statistical confidence.`
                  : "Both thumbnails perform virtually identically. Pick the one that better represents your branding and overall video tone."}
              </p>
            </div>
          </div>
        )}

        <GoogleAd slot="4112285121" />
      </form>
    </ToolPageLayout>
  );
}
