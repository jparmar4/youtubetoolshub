"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  FaChartLine,
  FaFire,
  FaSearch,
  FaArrowRight,
  FaAward,
  FaSlidersH,
} from "react-icons/fa";

interface NicheMetric {
  id: string;
  name: string;
  category: "finance" | "tech" | "business" | "lifestyle" | "entertainment";
  usCpmRange: [number, number];
  usCpmAvg: number;
  rpmAvg: number;
  demandScore: number; // 0 - 100
  topSponsors: string[];
  growthTrend: "+24%" | "+18%" | "+15%" | "+10%" | "+5%" | "Stable";
  notes: string;
}

const NICHE_METRICS: NicheMetric[] = [
  {
    id: "finance",
    name: "Personal Finance, Real Estate & Investing",
    category: "finance",
    usCpmRange: [15, 50],
    usCpmAvg: 26.5,
    rpmAvg: 14.5,
    demandScore: 99,
    topSponsors: ["FinTech", "Brokerages", "Credit Cards", "Business Banking"],
    growthTrend: "+24%",
    notes: "Highest advertiser bids globally. Banking and insurance pay top dollar for adult audiences with disposable income.",
  },
  {
    id: "business-saas",
    name: "B2B Software, SaaS & Entrepreneurship",
    category: "business",
    usCpmRange: [12, 40],
    usCpmAvg: 22.0,
    rpmAvg: 12.0,
    demandScore: 95,
    topSponsors: ["CRMs", "Cloud Hosting", "AI Tools", "Payment Processors"],
    growthTrend: "+18%",
    notes: "Enterprise SaaS advertisers allocate massive quarterly customer-acquisition budgets.",
  },
  {
    id: "marketing-seo",
    name: "Digital Marketing, SEO & E-Commerce",
    category: "business",
    usCpmRange: [10, 32],
    usCpmAvg: 18.5,
    rpmAvg: 10.2,
    demandScore: 92,
    topSponsors: ["Shopify Apps", "SEO Suites", "Ad Networks", "Email Marketing"],
    growthTrend: "+15%",
    notes: "Direct-response affiliate programs and subscription software bid heavily on tutorial views.",
  },
  {
    id: "tech-ai",
    name: "Technology, AI Reviews & Coding",
    category: "tech",
    usCpmRange: [9, 28],
    usCpmAvg: 16.0,
    rpmAvg: 8.8,
    demandScore: 90,
    topSponsors: ["Hardware", "Dev Tools", "VPNs", "Cloud Workstations"],
    growthTrend: "+24%",
    notes: "AI boom has driven surge in developer tool sponsorships and cloud compute ad spend.",
  },
  {
    id: "creator-tools",
    name: "Creator Economy & YouTube Strategy",
    category: "business",
    usCpmRange: [7, 22],
    usCpmAvg: 13.5,
    rpmAvg: 7.5,
    demandScore: 86,
    topSponsors: ["Video Editors", "Royalty Music", "Thumbnail Apps", "Webcams"],
    growthTrend: "+15%",
    notes: "Target audience is actively purchasing professional tools, gear, and digital subscriptions.",
  },
  {
    id: "education",
    name: "Online Education, Science & History",
    category: "tech",
    usCpmRange: [5, 18],
    usCpmAvg: 9.5,
    rpmAvg: 5.2,
    demandScore: 78,
    topSponsors: ["MasterClass", "Language Apps", "Audiobook Services", "Study Tools"],
    growthTrend: "+10%",
    notes: "Higher average watch time and completion rates improve organic ad fill rates.",
  },
  {
    id: "health-fitness",
    name: "Health, Fitness & Longevity",
    category: "lifestyle",
    usCpmRange: [5, 16],
    usCpmAvg: 8.5,
    rpmAvg: 4.8,
    demandScore: 75,
    topSponsors: ["Supplements", "Home Gym Gear", "Meal Delivery", "Fitness Apps"],
    growthTrend: "+10%",
    notes: "Strong seasonal peak in Q1 and recurring monthly sponsor retargeting.",
  },
  {
    id: "travel",
    name: "Travel, Luxury & Credit Card Points",
    category: "lifestyle",
    usCpmRange: [4, 15],
    usCpmAvg: 7.8,
    rpmAvg: 4.2,
    demandScore: 72,
    topSponsors: ["Airlines", "Hotel Booking", "Luggage Brands", "Travel Cards"],
    growthTrend: "+5%",
    notes: "High-net-worth travel viewers attract luxury retail and premium hotel chain campaigns.",
  },
  {
    id: "beauty-fashion",
    name: "Beauty, Skincare & Fashion",
    category: "lifestyle",
    usCpmRange: [3, 12],
    usCpmAvg: 6.5,
    rpmAvg: 3.6,
    demandScore: 68,
    topSponsors: ["Cosmetics", "Clothing Brands", "Hair Care", "Fragrance"],
    growthTrend: "+5%",
    notes: "Moderate AdSense RPM, but extraordinarily high brand deal and PR gift bag volume.",
  },
  {
    id: "food-cooking",
    name: "Cooking, Recipes & Restaurant Reviews",
    category: "lifestyle",
    usCpmRange: [3, 10],
    usCpmAvg: 5.8,
    rpmAvg: 3.2,
    demandScore: 64,
    topSponsors: ["Kitchen Appliances", "Knife Makers", "Grocery Delivery", "Spices"],
    growthTrend: "+5%",
    notes: "Family-friendly brand safety ensures consistent year-round ad placement.",
  },
  {
    id: "gaming",
    name: "Gaming, Esports & Live Streaming",
    category: "entertainment",
    usCpmRange: [1.5, 7],
    usCpmAvg: 3.8,
    rpmAvg: 2.1,
    demandScore: 55,
    topSponsors: ["Energy Drinks", "Peripherals", "Mobile Games", "Chairs"],
    growthTrend: "Stable",
    notes: "Very high view volume offsets lower RPM; audience demographics skew younger.",
  },
  {
    id: "entertainment",
    name: "Pop Culture, Comedy & Commentary",
    category: "entertainment",
    usCpmRange: [1.2, 6],
    usCpmAvg: 3.2,
    rpmAvg: 1.8,
    demandScore: 50,
    topSponsors: ["Streaming Services", "Snack Brands", "App Games", "Merchandise"],
    growthTrend: "Stable",
    notes: "Massive viral distribution potential; revenue primarily supplemented by channel memberships.",
  },
];

export default function NicheProfitabilityHeatmap() {
  const [filter, setFilter] = useState<"all" | "high-cpm" | "business" | "lifestyle">("all");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"cpm" | "rpm" | "demand">("cpm");

  const filteredNiches = useMemo(() => {
    let list = [...NICHE_METRICS];

    if (filter === "high-cpm") {
      list = list.filter((n) => n.usCpmAvg >= 15);
    } else if (filter === "business") {
      list = list.filter((n) => n.category === "finance" || n.category === "business");
    } else if (filter === "lifestyle") {
      list = list.filter((n) => n.category === "lifestyle");
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (n) =>
          n.name.toLowerCase().includes(q) ||
          n.topSponsors.some((s) => s.toLowerCase().includes(q)) ||
          n.notes.toLowerCase().includes(q)
      );
    }

    list.sort((a, b) => {
      if (sortBy === "cpm") return b.usCpmAvg - a.usCpmAvg;
      if (sortBy === "rpm") return b.rpmAvg - a.rpmAvg;
      return b.demandScore - a.demandScore;
    });

    return list;
  }, [filter, search, sortBy]);

  return (
    <div className="rounded-3xl border border-slate-200/90 bg-white p-6 md:p-8 shadow-xl shadow-slate-900/5 dark:bg-slate-900 dark:border-slate-800">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2">
            <FaFire className="text-emerald-600 dark:text-emerald-400" /> 2026 Niche Profitability Heatmap
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white font-outfit tracking-tight">
            Top Paying YouTube Niches &amp; Advertiser Bids
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
            Real advertiser CPM benchmarks across primary categories. Finance, SaaS, and B2B command up to <strong>12x higher payouts</strong> than entertainment.
          </p>
        </div>

        {/* View Switcher / Sort */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <FaSlidersH className="text-slate-400 text-xs" />
          <span className="text-xs font-semibold text-slate-500">Sort:</span>
          <select
            aria-label="Sort niches by"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "cpm" | "rpm" | "demand")}
            className="text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 border-none rounded-lg px-2.5 py-1.5 focus:ring-2 focus:ring-emerald-500"
          >
            <option value="cpm">Highest CPM</option>
            <option value="rpm">Highest RPM</option>
            <option value="demand">Advertiser Demand</option>
          </select>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 my-4">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {[
            { id: "all", label: "All Niches (12)" },
            { id: "high-cpm", label: "High-RPM Only ($15+)" },
            { id: "business", label: "Finance & B2B" },
            { id: "lifestyle", label: "Lifestyle & Fitness" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as typeof filter)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                filter === tab.id
                  ? "bg-slate-900 text-white dark:bg-emerald-600 shadow-sm"
                  : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative min-w-[200px]">
          <FaSearch className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search niche or sponsors..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* Heatmap Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredNiches.map((niche, index) => {
          const isTopTier = niche.usCpmAvg >= 18;
          return (
            <div
              key={niche.id}
              className={`rounded-2xl p-4 sm:p-5 border transition-all duration-200 flex flex-col justify-between ${
                isTopTier
                  ? "bg-gradient-to-br from-emerald-50/50 via-white to-teal-50/30 border-emerald-200 dark:from-emerald-950/20 dark:via-slate-900 dark:to-teal-950/20 dark:border-emerald-800/60 shadow-sm"
                  : "bg-white border-slate-200/80 dark:bg-slate-900/60 dark:border-slate-800"
              }`}
            >
              <div>
                {/* Header row */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-black w-5 h-5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 flex items-center justify-center">
                      #{index + 1}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                      {niche.name}
                    </h3>
                  </div>
                  {isTopTier && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300 shrink-0">
                      <FaAward /> Top Payout
                    </span>
                  )}
                </div>

                {/* Primary Metric Badges */}
                <div className="grid grid-cols-2 gap-2 my-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">US CPM Range</span>
                    <span className="text-base font-black text-slate-900 dark:text-slate-100">
                      ${niche.usCpmRange[0]} – ${niche.usCpmRange[1]}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Avg Creator RPM</span>
                    <span className="text-base font-black text-emerald-600 dark:text-emerald-400">
                      ~${niche.rpmAvg.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Demand Bar */}
                <div className="space-y-1 mb-3">
                  <div className="flex justify-between text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                    <span>Advertiser Demand</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{niche.demandScore}/100</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        niche.demandScore > 90
                          ? "bg-emerald-500"
                          : niche.demandScore > 75
                          ? "bg-teal-500"
                          : niche.demandScore > 65
                          ? "bg-blue-500"
                          : "bg-slate-400"
                      }`}
                      style={{ width: `${niche.demandScore}%` }}
                    />
                  </div>
                </div>

                {/* Key Bidders */}
                <div className="text-[11px] text-slate-600 dark:text-slate-400 mb-2">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Top Bidders: </span>
                  {niche.topSponsors.join(", ")}
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                  {niche.notes}
                </p>
              </div>

              {/* Card Footer Link */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold">
                <span className="text-slate-400">100k views ≈ ${(niche.rpmAvg * 100).toFixed(0)}</span>
                <Link
                  href="/tools/youtube-earnings-calculator"
                  className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 group"
                >
                  <span>Model Earnings</span>
                  <span aria-hidden="true" className="group-hover:translate-x-0.5 transition-transform text-xs font-bold leading-none">→</span>
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Context Callout */}
      <div className="mt-6 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
          <FaChartLine className="text-emerald-600 w-4 h-4 shrink-0" />
          <span>
            Advertiser CPM represents gross bids before YouTube&apos;s 45% revenue cut. RPM reflects net creator payout.
          </span>
        </div>
        <Link
          href="/resources/youtube-cpm-rates"
          className="font-bold text-emerald-700 dark:text-emerald-400 hover:underline shrink-0"
        >
          View Full 50-Country CPM Table →
        </Link>
      </div>
    </div>
  );
}
