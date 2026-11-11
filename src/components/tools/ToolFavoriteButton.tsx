"use client";

import { memo } from "react";
import { FaStar } from "react-icons/fa";
import { useFavoriteTools } from "@/lib/favorites";
import { toast } from "@/components/ui/Toast";

interface ToolFavoriteButtonProps {
  toolSlug: string;
  toolName: string;
  className?: string;
  compact?: boolean;
}

function ToolFavoriteButton({
  toolSlug,
  toolName,
  className = "",
  compact = false,
}: ToolFavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavoriteTools();
  const favorited = isFavorite(toolSlug);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const isNowFavorited = toggleFavorite(toolSlug);
    if (isNowFavorited) {
      toast.star(`Pinned "${toolName}" to your Quick Access header!`);
    } else {
      toast.info(`Removed "${toolName}" from Quick Access.`);
    }
  };

  if (compact) {
    return (
      <button
        type="button"
        onClick={handleClick}
        className={`p-2 rounded-xl transition-all shadow-2xs ${
          favorited
            ? "bg-amber-100/90 text-amber-600"
            : "bg-white/80 text-slate-500 hover:text-amber-500 hover:bg-amber-50"
        } ${className}`}
        aria-label={favorited ? `Pinned to Quick Access - Unpin ${toolName}` : `Pin to Quick Access - ${toolName}`}
        title={favorited ? "Pinned to Quick Access" : "Pin to Quick Access"}
      >
        <FaStar className={`w-3.5 h-3.5 ${favorited ? "fill-current" : ""}`} />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all border shadow-2xs hover:shadow-xs ${
        favorited
          ? "bg-amber-50 border-amber-300 text-amber-900"
          : "bg-white border-slate-200 text-slate-700 hover:border-amber-400 hover:text-amber-600"
      } ${className}`}
      aria-label={favorited ? `Pinned to Quick Access - Unpin ${toolName}` : `Pin to Quick Access - ${toolName}`}
    >
      <FaStar
        className={`w-3.5 h-3.5 ${
          favorited ? "text-amber-500 fill-current animate-bounce" : "text-slate-500"
        }`}
      />
      <span>{favorited ? "Pinned to Quick Access" : "Pin to Quick Access"}</span>
    </button>
  );
}

export default memo(ToolFavoriteButton);
