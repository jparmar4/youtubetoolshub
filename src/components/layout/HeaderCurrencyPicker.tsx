"use client";

import { useState, useRef, useEffect, memo } from "react";
import { FaChevronDown, FaGlobe } from "react-icons/fa";
import { usePreferredCurrency, SupportedCurrency, CURRENCY_CONFIG } from "@/lib/currency";
import { toast } from "@/components/ui/Toast";

const CURRENCY_FLAGS: Record<SupportedCurrency, string> = {
  USD: "🇺🇸",
  EUR: "🇪🇺",
  GBP: "🇬🇧",
  CAD: "🇨🇦",
  AUD: "🇦🇺",
  CHF: "🇨🇭",
  INR: "🇮🇳",
};

function HeaderCurrencyPicker() {
  const { currency, setCurrency, symbol } = usePreferredCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleSelect = (code: SupportedCurrency) => {
    setCurrency(code);
    setIsOpen(false);
    toast.success(`Calculator currency updated to ${CURRENCY_CONFIG[code].label}`);
  };

  const currentFlag = CURRENCY_FLAGS[currency] || "🌐";

  return (
    <div ref={containerRef} className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200/80 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all shadow-2xs hover:shadow-xs focus:outline-none focus:ring-2 focus:ring-purple-500/50"
        aria-label="Select preferred display currency"
        aria-expanded={isOpen}
      >
        <span className="text-sm leading-none" aria-hidden="true">
          {currentFlag}
        </span>
        <span className="tracking-tight">{currency}</span>
        <span className="text-purple-600 dark:text-purple-400 font-extrabold text-[11px]">
          ({symbol})
        </span>
        <FaChevronDown
          className={`w-2.5 h-2.5 text-slate-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-200/90 dark:border-slate-800/90 py-2 z-50 animate-fade-in-up">
          <div className="px-3 py-1.5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <FaGlobe className="w-3 h-3 text-purple-600" />
              Global Currency
            </span>
            <span className="text-[9px] font-medium text-slate-400">Syncs Calculators</span>
          </div>

          <div className="py-1 max-h-64 overflow-y-auto">
            {(Object.keys(CURRENCY_CONFIG) as SupportedCurrency[]).map((code) => {
              const meta = CURRENCY_CONFIG[code];
              const isSelected = code === currency;
              const flag = CURRENCY_FLAGS[code];

              return (
                <button
                  key={code}
                  type="button"
                  onClick={() => handleSelect(code)}
                  className={`w-full px-3 py-2 text-left text-xs font-semibold flex items-center justify-between transition-colors ${
                    isSelected
                      ? "bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 font-bold"
                      : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-base">{flag}</span>
                    <span>{meta.label}</span>
                  </span>
                  {isSelected && (
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-600 dark:bg-purple-400" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default memo(HeaderCurrencyPicker);
