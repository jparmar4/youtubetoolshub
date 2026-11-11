"use client";

import { ReactNode } from "react";

export interface PresetOption<T extends string = string> {
    /** Stable id surfaced to onSelect — usually the preset key. */
    id: T;
    label: string;
    icon?: ReactNode;
}

interface PresetPillsProps<T extends string = string> {
    options: PresetOption<T>[];
    /** Currently selected preset id, or null when nothing is active. */
    activeId?: T | null;
    onSelect: (id: T) => void;
    /** Accessible group label (visually hidden). */
    label?: string;
    size?: "sm" | "md";
    className?: string;
}

/**
 * Shared 1-click preset pills for tool inputs. Renders the `.preset-pill`
 * treatment from globals.css with an `aria-pressed` active state so every
 * tool exposes the same selected-preset affordance.
 */
export default function PresetPills<T extends string = string>({
    options,
    activeId = null,
    onSelect,
    label = "Quick presets",
    size = "sm",
    className = "",
}: PresetPillsProps<T>) {
    if (options.length === 0) return null;

    return (
        <div
            role="group"
            aria-label={label}
            className={`flex flex-wrap items-center gap-2 ${className}`}
        >
            {options.map((option) => {
                const isActive = option.id === activeId;
                return (
                    <button
                        key={option.id}
                        type="button"
                        aria-pressed={isActive}
                        onClick={() => onSelect(option.id)}
                        className={`preset-pill ${size === "sm" ? "text-xs" : "text-sm"} ${isActive ? "text-white" : "text-slate-600"}`}
                    >
                        {option.icon && <span aria-hidden="true" className="text-sm leading-none">{option.icon}</span>}
                        <span>{option.label}</span>
                    </button>
                );
            })}
        </div>
    );
}
