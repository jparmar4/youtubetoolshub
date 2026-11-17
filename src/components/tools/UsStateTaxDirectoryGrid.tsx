"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { FaArrowRight, FaMapMarkedAlt, FaSearch } from "react-icons/fa";
import { US_STATE_CREATOR_TAXES } from "@/data/usStateCreatorTaxes";

type TaxFilter = "all" | "no-tax" | "flat" | "graduated" | "scorp-friendly";

export default function UsStateTaxDirectoryGrid({
  currentSlug,
  heading = "Searchable 50-State + D.C. Creator Tax Directory",
}: {
  currentSlug?: string;
  heading?: string;
}) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<TaxFilter>("all");

  const filteredStates = useMemo(() => {
    const q = query.trim().toLowerCase();
    return US_STATE_CREATOR_TAXES.filter((s) => {
      if (filter === "no-tax" && s.taxStructure !== "none" && s.topIncomeTaxRate !== 0) {
        return false;
      }
      if (filter === "flat" && s.taxStructure !== "flat") {
        return false;
      }
      if (filter === "graduated" && s.taxStructure !== "graduated") {
        return false;
      }
      if (filter === "scorp-friendly" && !s.sCorpFriendly) {
        return false;
      }
      if (!q) return true;
      return (
        s.stateName.toLowerCase().includes(q) ||
        s.stateCode.toLowerCase().includes(q) ||
        s.slug.includes(q)
      );
    });
  }, [query, filter]);

  const filterButtons: Array<{ id: TaxFilter; label: string }> = [
    { id: "all", label: `All (${US_STATE_CREATOR_TAXES.length})` },
    { id: "no-tax", label: "0% State Tax" },
    { id: "flat", label: "Flat Rate" },
    { id: "graduated", label: "Graduated Tax" },
    { id: "scorp-friendly", label: "S-Corp Friendly" },
  ];

  return (
    <section
      className="card-3d rounded-3xl p-6 sm:p-8 space-y-5"
      aria-labelledby="state-tax-directory-heading"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-purple-700">
            <FaMapMarkedAlt className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Interactive State Index (2026 Rules)</span>
          </span>
          <h2
            id="state-tax-directory-heading"
            className="text-xl sm:text-2xl font-black text-slate-900 font-outfit mt-1"
          >
            {heading}
          </h2>
        </div>
        <span className="text-xs font-bold text-slate-500">
          Showing {filteredStates.length} of {US_STATE_CREATOR_TAXES.length} jurisdictions
        </span>
      </div>

      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <FaSearch
            className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter by state name or code (e.g. California, TX, Florida)..."
            aria-label="Filter US states by name or two-letter code"
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500"
          />
        </div>

        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter states by tax type">
          {filterButtons.map((btn) => (
            <button
              key={btn.id}
              type="button"
              onClick={() => setFilter(btn.id)}
              className={`cursor-pointer px-3 py-2 rounded-xl text-xs font-bold border transition-colors ${
                filter === btn.id
                  ? "bg-slate-900 text-white border-slate-900"
                  : "bg-slate-50 text-slate-700 border-slate-200 hover:border-purple-400"
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {filteredStates.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center text-sm text-slate-600">
          No US jurisdiction matched &ldquo;{query}&rdquo;.{" "}
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setFilter("all");
            }}
            className="font-bold text-purple-700 hover:underline cursor-pointer"
          >
            Reset filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredStates.map((s) => {
            const isCurrent = s.slug === currentSlug;
            const isZeroTax = s.topIncomeTaxRate === 0;
            return (
              <Link
                key={s.slug}
                href={`/tools/creator-tax-calculator/${s.slug}`}
                aria-current={isCurrent ? "page" : undefined}
                className={`group p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-2 ${
                  isCurrent
                    ? "bg-purple-50 border-purple-400 ring-1 ring-purple-300"
                    : isZeroTax
                    ? "bg-emerald-50/50 border-emerald-200 hover:border-emerald-400 hover:bg-white"
                    : "bg-slate-50/70 border-slate-200 hover:border-purple-400 hover:bg-white"
                }`}
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="px-1.5 py-0.5 rounded bg-slate-900 text-white text-[10px] font-black shrink-0">
                      {s.stateCode}
                    </span>
                    <span className="font-extrabold text-sm text-slate-900 group-hover:text-purple-700 truncate">
                      {s.stateName}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-600 block mt-1 truncate">
                    {isZeroTax
                      ? `0% State Tax`
                      : `${s.topIncomeTaxRate}% Top Rate`}{" "}
                    · ${s.llcFilingFee} LLC · ${s.llcAnnualFee}/yr
                  </span>
                </div>
                <FaArrowRight
                  className="w-3 h-3 text-slate-400 group-hover:text-purple-700 shrink-0 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}
