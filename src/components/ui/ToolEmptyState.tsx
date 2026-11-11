import { ReactNode } from "react";
import { FaMagic } from "react-icons/fa";

interface ToolEmptyStateProps {
    icon?: ReactNode;
    title?: string;
    description?: string;
    /** Optional custom call-to-action under the description (e.g. preset pills). */
    action?: ReactNode;
    className?: string;
}

/**
 * Shared placeholder shown before a tool's first successful run so no tool
 * presents a blank region between the form and the results. Rendered inside
 * the parent aria-live region (ToolPageLayout), so when results replace it
 * screen readers announce the update.
 */
export default function ToolEmptyState({
    icon,
    title = "Your results will appear here",
    description = "Fill in the form above or tap a quick preset to get started — nothing to install, nothing to sign up.",
    action,
    className = "",
}: ToolEmptyStateProps) {
    return (
        <div
            className={`flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/60 px-6 py-10 text-center ${className}`}
        >
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-fuchsia-600 text-white shadow-lg shadow-purple-500/25">
                {icon || <FaMagic aria-hidden="true" className="text-xl" />}
            </div>
            <p className="text-sm font-bold text-slate-700">{title}</p>
            <p className="mt-1 max-w-md text-xs leading-relaxed text-slate-500">{description}</p>
            {action && <div className="mt-4">{action}</div>}
        </div>
    );
}
