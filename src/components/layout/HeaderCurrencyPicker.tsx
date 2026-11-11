"use client";

import { useState, useRef, useEffect, memo } from "react";
import { FaChevronDown, FaGlobe } from "react-icons/fa";
import { usePreferredCurrency, SupportedCurrency, CURRENCY_CONFIG } from "@/lib/currency";
import { toast } from "@/components/ui/Toast";

const CURRENCY_BADGES: Record<SupportedCurrency, string> = {
  USD: "US",
  EUR: "EU",
  GBP: "UK",
  CAD: "CA",
  AUD: "AU",
  CHF: "CH",
  NZD: "NZ",
  SGD: "SG",
  NOK: "NO",
  SEK: "SE",
  DKK: "DK",
  HKD: "HK",
  JPY: "JP",
  KRW: "KR",
  AED: "AE",
  SAR: "SA",
  QAR: "QA",
  PLN: "PL",
  INR: "IN",
};

function HeaderCurrencyPicker() {
  const { currency, setCurrency, symbol } = usePreferredCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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

  return (
    <div ref={containerRef} className="relative inline-block text-left shrink-0">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="h-9 inline-flex items-center gap-1.5 px-3 rounded-full bg-white hover:bg-slate-50 border border-slate-200/90 text-slate-700 text-xs font-bold transition-all shadow-[inset_0_1px_0_0_#fff,0_1px_2px_rgba(15,23,42,0.05)] hover:border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500/40 whitespace-nowrap"
        aria-expanded={isOpen}
      >
        <span className="sr-only">Display currency: </span>
        <span className="px-1.5 py-0.5 rounded bg-purple-100 text-purple-800 font-extrabold text-[10px] leading-none">
          {symbol}
        </span>
        <span className="tracking-tight font-extrabold text-slate-800">{currency}</span>
        <FaChevronDown
          aria-hidden="true"
          className={`w-2.5 h-2.5 text-slate-500 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-60 rounded-2xl bg-white shadow-2xl border border-slate-200/90 py-2 z-50 animate-fade-in-up">
          <div className="px-3.5 py-2 border-b border-slate-100 flex items-center justify-between">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <FaGlobe className="w-3 h-3 text-purple-600" />
              Display Currency
            </span>
            <span className="text-[10px] font-semibold text-purple-600">Syncs All Tools</span>
          </div>

          <div className="py-1 max-h-64 overflow-y-auto">
            {(Object.keys(CURRENCY_CONFIG) as SupportedCurrency[]).map((code) => {
              const meta = CURRENCY_CONFIG[code];
              const isSelected = code === currency;
              const iso = CURRENCY_BADGES[code];

              return (
                <button
                  key={code}
                  type="button"
                  onClick={() => handleSelect(code)}
                  className={`w-full px-3.5 py-2 text-left text-xs font-semibold flex items-center justify-between transition-colors ${
                    isSelected
                      ? "bg-purple-50 text-purple-700 font-bold"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <span className="w-6 py-0.5 text-center rounded bg-slate-100 text-slate-700 font-mono text-[10px] font-black border border-slate-200">
                      {iso}
                    </span>
                    <span>{meta.label}</span>
                  </span>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-purple-600" />
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
