"use client";

import { useState } from "react";
import { FaBoxOpen, FaCheck } from "react-icons/fa";
import { useVideoPack } from "@/context/VideoPackContext";
import { toast } from "@/components/ui/Toast";

interface SaveToVideoPackButtonProps {
  onSave: () => void;
  label?: string;
  savedLabel?: string;
  toastMessage?: string;
  isAlreadySaved?: boolean;
  compact?: boolean;
  className?: string;
}

export default function SaveToVideoPackButton({
  onSave,
  label = "Save to Video Pack",
  savedLabel = "Saved to Pack",
  toastMessage = "Saved to Active Video Pack!",
  isAlreadySaved = false,
  compact = false,
  className = "",
}: SaveToVideoPackButtonProps) {
  const { openDrawer } = useVideoPack();
  const [justSaved, setJustSaved] = useState(false);

  const handleClick = () => {
    onSave();
    setJustSaved(true);
    toast.success(toastMessage);
    setTimeout(() => setJustSaved(false), 2200);
  };

  const active = justSaved || isAlreadySaved;

  return (
    <div className={`inline-flex items-center gap-1.5 ${className}`}>
      <button
        type="button"
        onClick={handleClick}
        className={`cursor-pointer inline-flex items-center gap-1.5 font-bold transition-all border ${
          compact
            ? "px-2.5 py-1.5 rounded-xl text-xs"
            : "px-3 py-1.5 rounded-xl text-xs sm:text-sm"
        } ${
          active
            ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
            : "bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:border-purple-300"
        }`}
        title={label}
      >
        {active ? (
          <FaCheck className="w-3 h-3 shrink-0 text-emerald-600" aria-hidden="true" />
        ) : (
          <FaBoxOpen className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
        )}
        <span>{justSaved ? savedLabel : isAlreadySaved ? "In Video Pack" : label}</span>
      </button>

      {justSaved && (
        <button
          type="button"
          onClick={openDrawer}
          className="cursor-pointer text-[11px] font-extrabold text-purple-700 hover:underline px-1.5 py-1"
        >
          Open Pack →
        </button>
      )}
    </div>
  );
}
