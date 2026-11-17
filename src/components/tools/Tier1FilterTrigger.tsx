"use client";

import { FaFilter } from "react-icons/fa";

export default function Tier1FilterTrigger({
  label = "Filter 9 Tier-1 Calculators",
  query,
  className = "",
}: {
  label?: string;
  query?: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={() =>
        window.dispatchEvent(
          new CustomEvent("tools-filter-tier1", { detail: { query } }),
        )
      }
      className={
        className ||
        "cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm transition-all shadow-md"
      }
    >
      <FaFilter className="w-3 h-3" aria-hidden="true" />
      <span>{label}</span>
    </button>
  );
}
