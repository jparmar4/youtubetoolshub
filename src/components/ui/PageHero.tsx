import { ReactNode } from "react";

interface PageHeroProps {
    /** Small pill/badge above the title (text or JSX). */
    badge?: ReactNode;
    title: ReactNode;
    description?: ReactNode;
    /** Buttons/links under the description. */
    actions?: ReactNode;
    /** Extra content (pills, search box…) below actions. */
    children?: ReactNode;
    /** Wrap in the decorative nebula hero background (default true). */
    nebula?: boolean;
    /** h1 sizing: "xl" for landing pages, "lg" for inner pages. */
    size?: "lg" | "xl";
    className?: string;
    contentClassName?: string;
}

/**
 * Shared hero for marketing/content pages so heroes keep one structural and
 * visual treatment while their copy stays fully per-page. Server-rendered.
 */
export default function PageHero({
    badge,
    title,
    description,
    actions,
    children,
    nebula = true,
    size = "lg",
    className = "",
    contentClassName = "",
}: PageHeroProps) {
    return (
        <section className={`relative overflow-hidden ${className}`}>
            {nebula && <div className="nebula-bg" aria-hidden="true" />}
            <div className={`relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center ${contentClassName}`}>
                <div className="py-12 lg:py-20 flex flex-col items-center">
                    {badge}
                    <h1
                        className={`mt-4 font-black tracking-tight font-outfit text-slate-900 ${
                            size === "xl" ? "text-4xl sm:text-5xl md:text-6xl" : "text-3xl sm:text-4xl md:text-5xl"
                        }`}
                    >
                        {title}
                    </h1>
                    {description && (
                        <p className="mt-4 max-w-2xl text-base sm:text-lg leading-relaxed text-slate-600">
                            {description}
                        </p>
                    )}
                    {actions && <div className="mt-8 flex flex-wrap items-center justify-center gap-4">{actions}</div>}
                    {children}
                </div>
            </div>
        </section>
    );
}
