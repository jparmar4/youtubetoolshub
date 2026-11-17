"use client";

import { usePathname } from "next/navigation";
import { FaBoxOpen } from "react-icons/fa";
import { useVideoPack } from "@/context/VideoPackContext";

export default function FloatingVideoPackPill() {
  const pathname = usePathname();
  const { itemCount, isOpen, openDrawer } = useVideoPack();

  if (pathname?.startsWith("/embed") || isOpen || itemCount === 0) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={openDrawer}
      aria-label={`Open Active Video Pack (${itemCount} items)`}
      className="fixed bottom-28 left-4 sm:left-6 z-40 cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-900 hover:bg-purple-700 text-white text-xs font-extrabold border border-white/15 shadow-[0_12px_30px_-6px_rgba(15,23,42,0.5)] transition-all hover:-translate-y-0.5"
    >
      <FaBoxOpen className="w-3.5 h-3.5 text-purple-300" aria-hidden="true" />
      <span>Video Pack</span>
      <span className="px-2 py-0.5 rounded-full bg-purple-500 text-white text-[11px] font-black leading-none">
        {itemCount}
      </span>
    </button>
  );
}
