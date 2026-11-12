import type { ReactNode } from "react";

export type LegalPageAccent = "purple" | "indigo" | "fuchsia" | "amber";

interface AccentPreset {
    /** Outer page wrapper classes. */
    wrapper: string;
    /** Decorative blur blob behind the hero (omitted when empty). */
    background?: string;
    /** Hero <section> classes. */
    hero: string;
    /** Decorative overlay rendered inside the hero (omitted when empty). */
    heroOverlay?: string;
    /** Gradient icon badge classes. */
    badge: string;
    /** h1 classes. */
    title: string;
    /** Content <section> classes. */
    content: string;
    /** Long-form white card classes; omit to render children bare. */
    card?: string;
    /** Gradient classes for the card's decorative top border (requires card). */
    topBorder?: string;
}

/**
 * Visual treatments copied verbatim from the legal pages so each keeps its
 * existing hero decoration, badge gradient/rotation, and card top border.
 */
const ACCENT_PRESETS: Record<LegalPageAccent, AccentPreset> = {
    purple: {
        wrapper: "min-h-screen bg-slate-50 relative overflow-hidden",
        background:
            "absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-purple-200/20 blur-[100px] rounded-full pointer-events-none",
        hero: "relative pt-10 pb-8 lg:pt-14 lg:pb-10",
        badge:
            "inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-purple-600 to-fuchsia-600 text-white mb-6 shadow-2xl shadow-purple-900/10 transform rotate-3 hover:rotate-6 transition-transform duration-300",
        title: "text-3xl md:text-4xl font-black text-slate-900 mb-4 tracking-tight font-outfit",
        content: "py-8 sm:py-10",
        card: "bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-6 sm:p-8 md:p-12 space-y-10 relative overflow-hidden",
        topBorder: "bg-gradient-to-r from-purple-500 via-fuchsia-500 to-indigo-500",
    },
    indigo: {
        wrapper: "min-h-screen bg-slate-50 relative overflow-hidden",
        background:
            "absolute top-0 right-1/4 w-full h-[500px] bg-indigo-200/20 blur-[100px] rounded-full pointer-events-none",
        hero: "relative pt-10 pb-8 lg:pt-14 lg:pb-10",
        badge:
            "inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white mb-6 shadow-2xl shadow-indigo-900/10 transform -rotate-3 hover:rotate-0 transition-transform duration-300",
        title: "text-3xl md:text-4xl font-black text-slate-900 mb-4 tracking-tight font-outfit",
        content: "py-8 sm:py-10",
        card: "bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-6 sm:p-8 md:p-12 space-y-10",
    },
    fuchsia: {
        wrapper: "min-h-screen bg-slate-50 relative overflow-hidden",
        background:
            "absolute top-0 left-1/4 w-full h-[500px] bg-fuchsia-200/20 blur-[100px] rounded-full pointer-events-none",
        hero: "relative pt-10 pb-8 lg:pt-14 lg:pb-10",
        badge:
            "inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-fuchsia-600 to-purple-600 text-white mb-6 shadow-2xl shadow-fuchsia-900/10 transform rotate-3 hover:rotate-6 transition-transform duration-300",
        title: "text-3xl md:text-4xl font-black text-slate-900 mb-4 tracking-tight font-outfit",
        content: "py-8 sm:py-10",
        card: "bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-6 sm:p-8 md:p-12 space-y-10 relative overflow-hidden",
        topBorder: "bg-gradient-to-r from-fuchsia-500 via-purple-500 to-indigo-500",
    },
    amber: {
        wrapper: "min-h-screen bg-slate-50 relative overflow-hidden",
        background:
            "absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-amber-200/20 blur-[100px] rounded-full pointer-events-none",
        hero: "relative pt-10 pb-8 lg:pt-14 lg:pb-10",
        badge:
            "inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-amber-400 to-orange-500 text-white mb-6 shadow-2xl shadow-amber-900/10",
        title: "text-3xl md:text-4xl font-black text-slate-900 mb-4 tracking-tight font-outfit",
        content: "py-8 sm:py-10",
    },
};

interface LegalPageShellProps {
    /** Page title rendered as the hero h1. */
    title: string;
    /** Hero paragraph under the title; omit for pages without one (e.g. Disclaimer). */
    description?: string;
    /** Icon element rendered inside the gradient hero badge (size it via its own className). */
    icon: ReactNode;
    /** Optional "Last updated: …" line rendered under the title. */
    updated?: string;
    /** Visual treatment preset (hero decoration, badge gradient, card top border). */
    accent?: LegalPageAccent;
    /** Optional band between the hero and the long-form content (highlights grid / quick summary). */
    highlights?: ReactNode;
    /** Long-form h2 sections rendered inside the white card. */
    children: ReactNode;
}

/**
 * Shared shell for the legal pages (Privacy Policy, Terms of Use, Disclaimer,
 * Refund Policy): centered hero with a gradient icon badge, optional highlights
 * band, then the long-form white card with a decorative gradient top border.
 * Per-page accents reproduce each page's existing treatment; children are the
 * page's own h2 sections. Server-rendered.
 */
export default function LegalPageShell({
    title,
    description,
    icon,
    updated,
    accent = "purple",
    highlights,
    children,
}: LegalPageShellProps) {
    const preset = ACCENT_PRESETS[accent];

    return (
        <div className={preset.wrapper}>
            {preset.background && <div className={preset.background} />}

            {/* Hero Section */}
            <section className={preset.hero}>
                {preset.heroOverlay && <div className={preset.heroOverlay} />}
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-4xl mx-auto">
                        <div className={preset.badge}>{icon}</div>
                        <h1 className={preset.title}>{title}</h1>
                        {updated && (
                            <p className="text-sm font-medium text-slate-500 mb-2">{updated}</p>
                        )}
                        {description && (
                            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                                {description}
                            </p>
                        )}
                    </div>
                </div>
            </section>

            {highlights}

            {/* Content */}
            <section className={preset.content}>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {preset.card ? (
                        <div className={preset.card}>
                            {/* Decorative top border */}
                            {preset.topBorder && (
                                <div
                                    className={`absolute top-0 left-0 w-full h-1 ${preset.topBorder}`}
                                />
                            )}
                            {children}
                        </div>
                    ) : (
                        children
                    )}
                </div>
            </section>
        </div>
    );
}
