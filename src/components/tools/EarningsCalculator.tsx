"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import ToolPageLayout from "@/components/tools/ToolPageLayout";
import {
  FaCalculator,
  FaDollarSign,
  FaChartLine,
  FaRocket,
} from "react-icons/fa";
import { formatCurrency, calculateEarnings } from "@/lib/utils";
import { saveHistory } from "@/lib/history";
import HorizontalAd from "@/components/ads/HorizontalAd";

const faq = [
  {
    question: "What is RPM?",
    answer:
      "RPM (Revenue Per Mille) is what you earn per 1,000 video views after YouTube’s share and non-monetized views. Typical RPM ranges from about $0.25 to $12+ depending on country and niche.",
  },
  {
    question: "How accurate is this calculator?",
    answer:
      "It is a planning estimate only. Confirm real earnings in YouTube Studio Analytics. Seasonality, ad fill, and audience location all change results.",
  },
  {
    question: "When does YouTube pay?",
    answer:
      "After YouTube Partner Program eligibility and once you meet AdSense’s payout threshold (commonly $100). Payouts usually land mid-month for the prior month.",
  },
];

const howTo = [
  "Enter your average monthly views from YouTube Studio",
  "Set an RPM (use Studio, or try a Quick RPM preset)",
  "Click Calculate to see monthly and yearly estimates",
];

const RPM_PRESETS = [
  { label: "Global ~$2.5", value: 2.5 },
  { label: "US ~$8.5", value: 8.5 },
  { label: "UK ~$6.5", value: 6.5 },
  { label: "India ~$0.8", value: 0.8 },
  { label: "Finance US ~$12", value: 12 },
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
  const [views, setViews] = useState("");
  const [rpm, setRpm] = useState(initialRPM.toString());
  const [adError, setAdError] = useState("");
  const [adResult, setAdResult] = useState<{
    monthly: number;
    yearly: number;
  } | null>(null);

  const handleCalculateAds = () => {
    const monthlyViews = parseFloat(views.replace(/,/g, ""));
    const rpmValue = parseFloat(rpm);
    if (isNaN(monthlyViews) || monthlyViews <= 0) {
      setAdError("Enter monthly views greater than zero");
      setAdResult(null);
      return;
    }
    if (isNaN(rpmValue) || rpmValue < 0) {
      setAdError("Enter a valid RPM (e.g. 2.5)");
      setAdResult(null);
      return;
    }
    setAdError("");
    const result = calculateEarnings(monthlyViews, rpmValue);
    setAdResult(result);
    try {
      saveHistory("youtube-earnings-calculator", {
        type: "ads",
        monthlyViews,
        rpm: rpmValue,
        currency,
        countryName,
        result,
      });
    } catch {
      /* optional */
    }
  };

  return (
    <ToolPageLayout
      title="YouTube Earnings Calculator"
      slug="youtube-earnings-calculator"
      description="Estimate monthly and yearly AdSense revenue from views and RPM."
      faq={faq}
      howTo={howTo}
    >
      <div className="space-y-6">
        {countryName && (
          <p className="text-sm text-slate-500">
            Estimating for <strong>{countryName}</strong> ({currency}). Adjust
            RPM to match your Studio Analytics.
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="Monthly Views"
            placeholder="e.g., 100000"
            value={views}
            onChange={(e) => setViews(e.target.value)}
          />
          <Input
            label={`RPM (${currency === "USD" ? "$" : currency})`}
            type="number"
            placeholder="2.5"
            value={rpm}
            onChange={(e) => setRpm(e.target.value)}
            step="0.1"
          />
          <div className="flex items-end">
            <Button onClick={handleCalculateAds} className="w-full h-[46px]">
              <FaCalculator className="mr-2" />
              Calculate
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-xs font-semibold text-slate-500 self-center mr-1">
            Quick RPM:
          </span>
          {RPM_PRESETS.map((p) => (
            <button
              key={p.label}
              type="button"
              onClick={() => setRpm(String(p.value))}
              className="px-2.5 py-1 text-xs rounded-full border border-slate-200 bg-slate-50 text-slate-700 hover:border-emerald-400 hover:bg-emerald-50"
            >
              {p.label}
            </button>
          ))}
        </div>

        {adError && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-3">
            {adError}
          </p>
        )}

        <HorizontalAd />

        {adResult && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-20">
                <FaDollarSign className="w-24 h-24" />
              </div>
              <p className="opacity-80 mb-1">Estimated Monthly</p>
              <p className="text-4xl font-bold mb-4">
                {formatCurrency(adResult.monthly, currency)}
              </p>
              <div className="bg-white/20 rounded-lg p-3 text-sm">
                <p className="font-semibold mb-1 flex items-center">
                  <FaRocket className="mr-2" /> Growth note
                </p>
                <div className="flex justify-between items-center opacity-90">
                  <span>If you grow 10%/mo:</span>
                  <span className="font-bold">
                    {formatCurrency(adResult.monthly * 1.1, currency)}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <h4 className="text-slate-500 font-medium mb-4 flex items-center">
                <FaChartLine className="mr-2" /> Yearly Projection
              </h4>
              <p className="text-3xl font-bold text-slate-900 mb-2">
                {formatCurrency(adResult.yearly, currency)}
              </p>
              <p className="text-sm text-slate-500">
                Planning estimate only. Confirm in YouTube Studio.
              </p>
            </div>
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
}
