"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import ErrorNotice from "@/components/ui/ErrorNotice";
import ToolPageLayout from "@/components/tools/ToolPageLayout";
import {
  FaCalculator,
  FaDollarSign,
  FaChartLine,
  FaCopy,
  FaCheck,
  FaHandshake,
  FaCoins,
  FaBolt,
  FaPrint,
  FaGlobeAmericas,
} from "react-icons/fa";
import { formatCurrency, calculateEarnings } from "@/lib/utils";
import { CURRENCY_CONFIG, isSupportedCurrency, type SupportedCurrency } from "@/lib/currency-data";
import { usePreferredCurrency } from "@/lib/currency";
import { saveHistory } from "@/lib/history";
import InternationalPayoutCallout from "@/components/ads/InternationalPayoutCallout";
import Link from "next/link";



const VIEW_PRESETS = [
  { label: "25K", value: 25000 },
  { label: "50K", value: 50000 },
  { label: "100K", value: 100000 },
  { label: "500K", value: 500000 },
  { label: "1M", value: 1000000 },
];

const RPM_PRESETS = [
  { label: "📈 US Finance/Tech ($14.00)", value: 14.0 },
  { label: "🇺🇸 US Long-Form ($8.50)", value: 8.5 },
  { label: "🇨🇭 Switzerland ($7.80)", value: 7.8 },
  { label: "🇦🇺 Australia ($7.20)", value: 7.2 },
  { label: "🇨🇦 Canada ($7.00)", value: 7.0 },
  { label: "🇳🇿 New Zealand ($6.80)", value: 6.8 },
  { label: "🇬🇧 UK Long-Form ($6.50)", value: 6.5 },
  { label: "🇩🇪 Germany ($6.20)", value: 6.2 },
  { label: "🇳🇴 Norway ($6.00)", value: 6.0 },
  { label: "🇫🇷 France ($4.80)", value: 4.8 },
  { label: "🇦🇪 UAE ($4.00)", value: 4.0 },
  { label: "🇯🇵 Japan ($3.50)", value: 3.5 },
  { label: "🌐 Global Long-Form ($2.50)", value: 2.5 },
  { label: "🇮🇳 India Long-Form ($0.80)", value: 0.8 },
  { label: "⚡ US Shorts ($0.05)", value: 0.05 },
  { label: "⚡ Global Shorts ($0.02)", value: 0.02 },
];

const QUICK_CURRENCY_CODES: SupportedCurrency[] = [
  "USD",
  "GBP",
  "EUR",
  "CAD",
  "AUD",
  "CHF",
  "SGD",
  "AED",
  "JPY",
  "INR",
];

const NICHE_MULTIPLIERS = [
  { id: "balanced", label: "Balanced Mix (1.0x)", factor: 1.0 },
  { id: "finance", label: "💰 Finance & Investing (2.2x)", factor: 2.2 },
  { id: "b2b", label: "💼 B2B SaaS & Software (1.9x)", factor: 1.9 },
  { id: "tech", label: "💻 Tech & AI Reviews (1.4x)", factor: 1.4 },
  { id: "education", label: "🎓 Education & Career (1.15x)", factor: 1.15 },
  { id: "gaming", label: "🎮 Gaming & Shorts Mix (0.65x)", factor: 0.65 },
];

interface EarningsCalculatorProps {
  initialRPM?: number;
  currency?: string;
  countryName?: string;
}

export default function EarningsCalculator({
  initialRPM = 2.5,
  currency = "USD",
  countryName,
}: EarningsCalculatorProps) {
  const [views, setViews] = useState("100000");
  const [rpm, setRpm] = useState(initialRPM.toString());
  const [baseRpm, setBaseRpm] = useState<number>(initialRPM);
  const [nicheId, setNicheId] = useState<string>("balanced");
  const { currency: activeCurrency, setCurrency: setPreferredCurrency, rate: currentRate } =
    usePreferredCurrency(currency);
  const [adError, setAdError] = useState("");
  const [copied, setCopied] = useState(false);
  const [adResult, setAdResult] = useState<{
    monthly: number;
    yearly: number;
    viewsNum: number;
    rpmNum: number;
    sponsorEstMin: number;
    sponsorEstMax: number;
    channelValuationMin: number;
    channelValuationMax: number;
  } | null>(() => {
    const monthlyViews = 100000;
    const rpmValue = initialRPM;
    const res = calculateEarnings(monthlyViews, rpmValue);
    const sponsorMin = Math.round((monthlyViews / 1000) * 18);
    const sponsorMax = Math.round((monthlyViews / 1000) * 38);
    return {
      monthly: res.monthly,
      yearly: res.yearly,
      viewsNum: monthlyViews,
      rpmNum: rpmValue,
      sponsorEstMin: sponsorMin,
      sponsorEstMax: sponsorMax,
      channelValuationMin: Math.round(res.monthly * 24),
      channelValuationMax: Math.round(res.monthly * 36),
    };
  });

  useEffect(() => {
    if (typeof window === "undefined" || !window.location.search) return;
    const params = new URLSearchParams(window.location.search);
    const viewsParam = params.get("views");
    const rpmParam = params.get("rpm");
    const parsedViews = viewsParam ? parseFloat(viewsParam.replace(/,/g, "")) : NaN;
    const parsedRpm = rpmParam ? parseFloat(rpmParam) : NaN;

    const validViews = Number.isFinite(parsedViews) && parsedViews > 0 ? parsedViews : 100000;
    const validRpm = Number.isFinite(parsedRpm) && parsedRpm >= 0 ? parsedRpm : initialRPM;
    const hasCustomQuery = (viewsParam && Number.isFinite(parsedViews) && parsedViews > 0) ||
      (rpmParam && Number.isFinite(parsedRpm) && parsedRpm >= 0);
    if (!hasCustomQuery) return;

    let cancelled = false;
    void Promise.resolve().then(() => {
      if (cancelled) return;
      setViews(validViews.toString());
      setRpm(validRpm.toString());
      setBaseRpm(validRpm);
      setNicheId("balanced");
      const res = calculateEarnings(validViews, validRpm);
      setAdResult({
        monthly: res.monthly,
        yearly: res.yearly,
        viewsNum: validViews,
        rpmNum: validRpm,
        sponsorEstMin: Math.round((validViews / 1000) * 18),
        sponsorEstMax: Math.round((validViews / 1000) * 38),
        channelValuationMin: Math.round(res.monthly * 24),
        channelValuationMax: Math.round(res.monthly * 36),
      });
    });

    return () => {
      cancelled = true;
    };
  }, [initialRPM]);

  const handleCalculateWithValues = (viewsStr: string, rpmStr: string) => {
    const monthlyViews = parseFloat(viewsStr.replace(/,/g, ""));
    const rpmValue = parseFloat(rpmStr);
    if (isNaN(monthlyViews) || monthlyViews <= 0) {
      setAdError("Enter monthly views greater than zero");
      setAdResult(null);
      return;
    }
    if (isNaN(rpmValue) || rpmValue < 0) {
      setAdError("Enter a valid RPM (e.g. 2.5 or 0.05 for Shorts)");
      setAdResult(null);
      return;
    }
    setAdError("");
    const result = calculateEarnings(monthlyViews, rpmValue);
    const sponsorMin = Math.round((monthlyViews / 1000) * 18);
    const sponsorMax = Math.round((monthlyViews / 1000) * 38);

    setAdResult({
      monthly: result.monthly,
      yearly: result.yearly,
      viewsNum: monthlyViews,
      rpmNum: rpmValue,
      sponsorEstMin: sponsorMin,
      sponsorEstMax: sponsorMax,
      channelValuationMin: Math.round(result.monthly * 24),
      channelValuationMax: Math.round(result.monthly * 36),
    });

    try {
      saveHistory("youtube-earnings-calculator", {
        type: "ads",
        monthlyViews,
        rpm: rpmValue,
        currency: activeCurrency,
        countryName,
        result,
      });
    } catch {
      /* optional */
    }
  };

  const handleCalculateAds = () => {
    handleCalculateWithValues(views, rpm);
  };

  const handleViewPreset = (val: number) => {
    const str = val.toString();
    setViews(str);
    handleCalculateWithValues(str, rpm);
  };

  const handleRpmPreset = (val: number) => {
    setBaseRpm(val);
    setNicheId("balanced");
    const str = val.toString();
    setRpm(str);
    handleCalculateWithValues(views, str);
  };

  const handleNicheMultiplier = (id: string, factor: number) => {
    setNicheId(id);
    const scaled = Math.max(0.02, Number((baseRpm * factor).toFixed(2)));
    const str = scaled.toString();
    setRpm(str);
    handleCalculateWithValues(views, str);
  };

  const handleCopySummary = async () => {
    if (!adResult) return;
    const summary = `📊 YouTube Earnings Estimate (2026):
• Monthly Views: ${adResult.viewsNum.toLocaleString()}
• Effective RPM: ${formatCurrency(adResult.rpmNum * currentRate, activeCurrency)}
• Monthly AdSense: ${formatCurrency(adResult.monthly * currentRate, activeCurrency)}
• Yearly Run Rate: ${formatCurrency(adResult.yearly * currentRate, activeCurrency)}
• Brand Deal Potential: ${formatCurrency(adResult.sponsorEstMin * currentRate, activeCurrency)} – ${formatCurrency(adResult.sponsorEstMax * currentRate, activeCurrency)} / video
• Estimated Channel Asset Value: ${formatCurrency(adResult.channelValuationMin * currentRate, activeCurrency)} – ${formatCurrency(adResult.channelValuationMax * currentRate, activeCurrency)}
Calculated via YouTube Tools Hub: https://www.youtubetoolshub.com/tools/youtube-earnings-calculator`;

    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      /* ignore */
    }
  };

  const handlePrintMediaKit = () => {
    if (!adResult || typeof window === "undefined") return;
    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>YouTube Creator Media Kit &amp; Valuation — ${adResult.viewsNum.toLocaleString()} Views</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 40px; color: #0f172a; max-width: 800px; margin: 0 auto; }
            h1 { font-size: 24px; color: #7e22ce; margin-bottom: 4px; }
            .badge { display: inline-block; padding: 4px 10px; background: #f3e8ff; color: #7e22ce; border-radius: 999px; font-size: 12px; font-weight: bold; margin-bottom: 24px; }
            .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px; }
            .card { border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; background: #f8fafc; }
            .card h3 { font-size: 11px; text-transform: uppercase; color: #64748b; margin: 0 0 8px; }
            .card p { font-size: 22px; font-weight: 800; margin: 0; color: #0f172a; }
            .highlight { border: 2px solid #7e22ce; background: #faf5ff; }
            .highlight p { color: #7e22ce; font-size: 26px; }
            .footer { margin-top: 40px; border-top: 1px solid #e2e8f0; padding-top: 16px; font-size: 12px; color: #94a3b8; display: flex; justify-content: space-between; }
          </style>
        </head>
        <body>
          <h1>Official YouTube Creator Media Kit &amp; Revenue Projection</h1>
          <div class="badge">Verified 2026 Industry Benchmark · YouTubeToolsHub.com</div>
          
          <div class="grid">
            <div class="card highlight">
              <h3>Monthly AdSense Revenue</h3>
              <p>${formatCurrency(adResult.monthly * currentRate, activeCurrency)} / mo</p>
            </div>
            <div class="card">
              <h3>Annualized Run Rate</h3>
              <p>${formatCurrency(adResult.yearly * currentRate, activeCurrency)} / yr</p>
            </div>
            <div class="card">
              <h3>Sponsorship Rate (60s Mid-Roll)</h3>
              <p>${formatCurrency(adResult.sponsorEstMin * currentRate, activeCurrency)} – ${formatCurrency(adResult.sponsorEstMax * currentRate, activeCurrency)}</p>
            </div>
            <div class="card">
              <h3>Channel Asset Sale Valuation (24x-36x)</h3>
              <p>${formatCurrency(adResult.channelValuationMin * currentRate, activeCurrency)} – ${formatCurrency(adResult.channelValuationMax * currentRate, activeCurrency)}</p>
            </div>
          </div>

          <div class="card">
            <h3>Audience &amp; Production Parameters</h3>
            <p style="font-size: 14px; font-weight: normal; color: #475569; line-height: 1.6;">
              • Monthly View Benchmark: <strong>${adResult.viewsNum.toLocaleString()}</strong> views<br/>
              • Baseline Audience RPM: <strong>${formatCurrency(adResult.rpmNum * currentRate, activeCurrency)}</strong> per 1,000 views<br/>
              • Display Currency: <strong>${activeCurrency}</strong><br/>
              • Asset Valuation Multiple: 24x to 36x monthly net cash flow
            </p>
          </div>

          <div class="footer">
            <span>Generated on ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
            <span>https://www.youtubetoolshub.com/tools/youtube-earnings-calculator</span>
          </div>
          <script>window.onload = function() { window.print(); };</script>
        </body>
      </html>
    `;
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
    }
  };

  return (
    <ToolPageLayout
      title="YouTube Earnings Calculator"
      slug="youtube-earnings-calculator"
      description="Estimate monthly and yearly AdSense revenue, brand deal sponsorships, and channel value from views and RPM."
    >
      <div className="space-y-6">
        {countryName && (
          <p className="text-sm text-slate-500">
            Estimating for <strong>{countryName}</strong> ({currency}). Adjust
            RPM to match your Studio Analytics.
          </p>
        )}

        {/* Input Controls */}
        <form
          toolname="estimate_youtube_earnings"
          tooldescription="Calculate estimated YouTube AdSense revenue (RPM and CPM) for any view count and country."
          onSubmit={(e) => {
            e.preventDefault();
            handleCalculateAds();
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <div>
            <Input
              label="Monthly Views"
              placeholder="e.g., 100000"
              value={views}
              onChange={(e) => setViews(e.target.value)}
            />
            {/* Quick View Presets */}
            <div className="flex flex-wrap items-center gap-1.5 mt-2">
              <span className="text-[11px] font-bold text-slate-600 mr-0.5">Presets:</span>
              {VIEW_PRESETS.map((p) => (
                <button
                  key={p.label}
                  type="button"
                  aria-pressed={parseFloat(views.replace(/,/g, "")) === p.value}
                  onClick={() => handleViewPreset(p.value)}
                  className={`px-2 py-0.5 text-[11px] font-semibold rounded-md transition-colors ${
                    parseFloat(views.replace(/,/g, "")) === p.value
                      ? "bg-purple-600 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <Input
              label="Est. RPM ($ USD Base)"
              type="number"
              placeholder="2.5"
              value={rpm}
              onChange={(e) => {
                const next = e.target.value;
                setRpm(next);
                const parsed = parseFloat(next);
                if (Number.isFinite(parsed) && parsed >= 0) {
                  setBaseRpm(parsed);
                  setNicheId("balanced");
                }
              }}
              step="0.01"
            />
            <div className="text-[11px] text-slate-600 mt-2">
              USD per 1,000 views (converted to {activeCurrency} below)
            </div>
          </div>

          <div className="flex items-start md:pt-6">
            <Button type="submit" onClick={handleCalculateAds} className="w-full h-[46px] shadow-md shadow-purple-500/20">
              <FaCalculator className="mr-2" />
              Calculate Revenue
            </Button>
          </div>
        </form>

        {/* Quick RPM Presets */}
        <div className="bg-slate-50/80 p-3.5 rounded-xl border border-slate-200/80 space-y-3">
          <div>
            <div className="text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5">
              <FaBolt className="text-amber-500" />
              <span>Select Benchmark RPM by Country &amp; Format:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {RPM_PRESETS.map((p) => (
                <button
                  key={p.label}
                  type="button"
                  aria-pressed={parseFloat(rpm) === p.value && nicheId === "balanced"}
                  onClick={() => handleRpmPreset(p.value)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                    parseFloat(rpm) === p.value && nicheId === "balanced"
                      ? "bg-purple-600 text-white border-purple-600 shadow-xs"
                      : "bg-white border-slate-200 text-slate-700 hover:border-purple-400 hover:bg-purple-50"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2.5 border-t border-slate-200/80">
            <div className="text-xs font-bold text-slate-700 mb-2 flex items-center justify-between gap-2">
              <span>Apply Content Niche Multiplier ({countryName ? `${countryName} Base` : `$${baseRpm.toFixed(2)} Base`}):</span>
              <span className="text-[11px] font-semibold text-emerald-700">High-intent niches boost Tier-1 RPM up to 2.2x</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {NICHE_MULTIPLIERS.map((n) => (
                <button
                  key={n.id}
                  type="button"
                  aria-pressed={nicheId === n.id}
                  onClick={() => handleNicheMultiplier(n.id, n.factor)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-lg border transition-all ${
                    nicheId === n.id
                      ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                      : "bg-white border-slate-200 text-slate-700 hover:border-emerald-400 hover:bg-emerald-50"
                  }`}
                >
                  {n.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {adError && <ErrorNotice message={adError} />}

        {/* Calculation Results Grid */}
        {adResult && (
          <div className="space-y-6 pt-2">
              {/* Currency Selector Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-200/90">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                  <FaGlobeAmericas className="text-purple-600"/>
                  <span>Display Currency:</span>
                </div>
                <div className="flex flex-wrap items-center gap-1.5">
                  {QUICK_CURRENCY_CODES.map((code) => {
                    const conf = CURRENCY_CONFIG[code];
                    return (
                      <button
                        key={code}
                        type="button"
                        onClick={() => setPreferredCurrency(code)}
                        className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                          activeCurrency === code
                            ? "bg-purple-600 text-white shadow-xs"
                            : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                        }`}
                      >
                        {conf.label}
                      </button>
                    );
                  })}
                  <select
                    aria-label="All supported currencies"
                    value={activeCurrency}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (isSupportedCurrency(val)) setPreferredCurrency(val);
                    }}
                    className="px-2.5 py-1 text-xs font-bold rounded-lg bg-white text-slate-700 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500/40"
                  >
                    {(Object.keys(CURRENCY_CONFIG) as SupportedCurrency[]).map((code) => (
                      <option key={code} value={code}>
                        {CURRENCY_CONFIG[code].label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Primary Result Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Monthly AdSense */}
                <div className="bg-gradient-to-br from-emerald-500 to-teal-700 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden flex flex-col justify-between">
                  <div className="absolute top-0 right-0 p-4 opacity-15">
                    <FaDollarSign className="w-20 h-20" />
                  </div>
                  <div>
                    <p className="text-xs uppercase font-extrabold tracking-wider opacity-85 mb-1">
                      Monthly AdSense
                    </p>
                    <p className="text-3xl sm:text-4xl font-black tracking-tight mb-2">
                      {formatCurrency(adResult.monthly * currentRate, activeCurrency)}
                    </p>
                  </div>
                  <div className="bg-white/20 rounded-lg p-2.5 text-xs mt-3 backdrop-blur-xs">
                    <div className="flex justify-between items-center opacity-95">
                      <span>10% Monthly Growth:</span>
                      <span className="font-bold">
                        {formatCurrency(adResult.monthly * 1.1 * currentRate, activeCurrency)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Yearly Projection */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="text-xs uppercase font-extrabold tracking-wider text-slate-600 mb-1 flex items-center">
                      <FaChartLine className="mr-1.5 text-purple-600" /> Yearly AdSense Run Rate
                    </div>
                    <p className="text-2xl sm:text-3xl font-black text-slate-900 mb-1">
                      {formatCurrency(adResult.yearly * currentRate, activeCurrency)}
                    </p>
                  </div>
                  <p className="text-xs text-slate-500 mt-2">
                    12-month baseline (excluding seasonal Q4 advertiser surges of +20–50%).
                  </p>
                </div>

                {/* Brand Deal Sponsor Value */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="text-xs uppercase font-extrabold tracking-wider text-slate-600 mb-1 flex items-center">
                      <FaHandshake className="mr-1.5 text-amber-500" /> Sponsor Rate / Video
                    </div>
                    <p className="text-xl sm:text-2xl font-black text-slate-900 mb-1">
                      {formatCurrency(adResult.sponsorEstMin * currentRate, activeCurrency)} – {formatCurrency(adResult.sponsorEstMax * currentRate, activeCurrency)}
                    </p>
                  </div>
                  <p className="text-xs text-slate-500 mt-2">
                    Typical 60s mid-roll brand deal rate in Tier 1 niches for {adResult.viewsNum.toLocaleString()} views.
                  </p>
                </div>

                {/* Estimated Channel Asset Value */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="text-xs uppercase font-extrabold tracking-wider text-slate-600 mb-1 flex items-center">
                      <FaCoins className="mr-1.5 text-rose-500" /> Channel Asset Value
                    </div>
                    <p className="text-xl sm:text-2xl font-black text-slate-900 mb-1">
                      {formatCurrency(adResult.channelValuationMin * currentRate, activeCurrency)} – {formatCurrency(adResult.channelValuationMax * currentRate, activeCurrency)}
                    </p>
                  </div>
                  <p className="text-xs text-slate-500 mt-2">
                    24x–36x monthly net multiple based on broker transaction multiples.
                  </p>
                </div>
              </div>

              {/* Action Toolbar: Copy Summary & Print CTA */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-purple-50/70 border border-purple-200/80 rounded-2xl">
                <div className="text-xs font-semibold text-purple-900">
                  Formula: ({adResult.viewsNum.toLocaleString()} views ÷ 1,000) × {formatCurrency(adResult.rpmNum * currentRate, activeCurrency)} RPM = {formatCurrency(adResult.monthly * currentRate, activeCurrency)}/mo
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopySummary}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-all shadow-xs"
                  >
                    {copied ? <FaCheck className="w-3.5 h-3.5" /> : <FaCopy className="w-3.5 h-3.5" />}
                    <span>{copied ? "Copied!" : "Copy Summary"}</span>
                  </button>
                  <button
                    type="button"
                    onClick={handlePrintMediaKit}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white border border-purple-300 text-purple-800 hover:bg-purple-100 text-xs font-bold transition-colors shadow-xs"
                  >
                    <FaPrint className="w-3.5 h-3.5 text-purple-600" />
                    <span>Print Media Kit</span>
                  </button>
                  <Link
                    href="/tools/youtube-sponsorship-calculator"
                    className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-purple-600 text-xs font-bold transition-colors"
                  >
                    <span>Build Media Kit →</span>
                  </Link>
                </div>
              </div>
          </div>
        )}

        {/* High-CPC FinTech Comparisons & International Payout Callout */}
        <div className="pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
            <Link
              href="/tools/youtube-llc-vs-s-corp-tax-savings-calculator"
              className="p-4 rounded-xl border border-slate-200 bg-white hover:border-purple-300 transition-all text-xs"
            >
              <span className="font-bold text-slate-900 block mb-1">
                LLC vs. S-Corp Calculator →
              </span>
              <span className="text-slate-500">
                See how electing S-Corp saves $4k–$12k in self-employment tax.
              </span>
            </Link>

            <Link
              href="/tools/patreon-vs-youtube-memberships-vs-fourthwall-fee-calculator"
              className="p-4 rounded-xl border border-slate-200 bg-white hover:border-purple-300 transition-all text-xs"
            >
              <span className="font-bold text-slate-900 block mb-1">
                Platform Fee Calculator →
              </span>
              <span className="text-slate-500">
                Compare YouTube 30% take vs Patreon and Fourthwall 0% fee.
              </span>
            </Link>

            <Link
              href="/tools/youtube-shorts-music-royalty-split-calculator"
              className="p-4 rounded-xl border border-slate-200 bg-white hover:border-purple-300 transition-all text-xs"
            >
              <span className="font-bold text-slate-900 block mb-1">
                Shorts Music Split Calculator →
              </span>
              <span className="text-slate-500">
                Model how licensed songs impact Creator Pool RPM.
              </span>
            </Link>
          </div>

          <InternationalPayoutCallout
            monthlyUsdEstimate={adResult ? adResult.monthly : 2500}
          />
        </div>
      </div>
    </ToolPageLayout>
  );
}
