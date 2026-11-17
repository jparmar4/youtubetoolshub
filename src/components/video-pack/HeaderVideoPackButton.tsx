"use client";

import { memo } from "react";
import { FaBoxOpen } from "react-icons/fa";
import { useVideoPack } from "@/context/VideoPackContext";

function HeaderVideoPackButton({
  variant = "header",
  onAfterClick,
}: {
  variant?: "header" | "drawer";
  onAfterClick?: () => void;
}) {
  const { itemCount, isOpen, toggleDrawer } = useVideoPack();

  const handleClick = () => {
    onAfterClick?.();
    toggleDrawer();
  };

  if (variant === "drawer") {
    return (
      <button
        type="button"
        onClick={handleClick}
        className="w-full cursor-pointer flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-900 text-xs font-bold transition-colors mb-3"
      >
        <span className="flex items-center gap-2">
          <FaBoxOpen className="w-3.5 h-3.5 text-purple-600" aria-hidden="true" />
          <span>Active Video Pack</span>
        </span>
        <span className="px-2 py-0.5 rounded-full bg-purple-600 text-white text-[11px] font-black">
          {itemCount}
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-expanded={isOpen}
      aria-label={`Open Active Video Pack (${itemCount} items)`}
      className={`h-9 inline-flex items-center gap-1.5 px-2.5 sm:px-3 rounded-full border text-xs font-semibold transition-all shadow-2xs whitespace-nowrap cursor-pointer ${
        itemCount > 0 || isOpen
          ? "bg-purple-50 border-purple-200 text-purple-900 hover:bg-purple-100 hover:border-purple-300"
          : "bg-white border-slate-200/90 text-slate-700 hover:bg-slate-50 hover:border-purple-300"
      }`}
    >
      <FaBoxOpen className="w-3.5 h-3.5 text-purple-600 shrink-0" aria-hidden="true" />
      <span className="hidden md:inline">Video Pack</span>
      <span
        className={`px-1.5 py-0.5 rounded-full text-[11px] font-black leading-none ${
          itemCount > 0
            ? "bg-purple-600 text-white"
            : "bg-slate-200 text-slate-700"
        }`}
      >
        {itemCount}
      </span>
    </button>
  );
}

export default memo(HeaderVideoPackButton);
