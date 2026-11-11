import Link from "next/link";
import { ReactNode } from "react";

interface CtaAction {
    label: string;
    href: string;
    icon?: ReactNode;
}

interface CtaPanelProps {
    title: ReactNode;
    description?: ReactNode;
    primaryAction: CtaAction;
    secondaryAction?: CtaAction;
    className?: string;
}

/**
 * Shared dark rounded closing CTA panel ("heroic dark CTA") used at the end
 * of marketing pages. Uses the shared Button cta variant so the extruded
 * tactile treatment stays consistent site-wide.
 */
export default function CtaPanel({
    title,
    description,
    primaryAction,
    secondaryAction,
    className = "",
}: CtaPanelProps) {
    return (
        <section
            className={`relative overflow-hidden rounded-3xl uhd-dark-grid bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 px-6 py-10 sm:px-12 sm:py-14 text-center ${className}`}
        >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-purple-600 via-fuchsia-500 to-emerald-500" aria-hidden="true" />
            <div className="relative mx-auto max-w-2xl">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight font-outfit text-white">
                    {title}
                </h2>
                {description && (
                    <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-300">
                        {description}
                    </p>
                )}
                <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
                    <Link
                        href={primaryAction.href}
                        className="btn-3d-primary inline-flex items-center gap-2.5 rounded-2xl px-7 py-3.5 text-base font-bold sm:px-9 sm:py-4 sm:text-lg"
                    >
                        {primaryAction.icon}
                        <span>{primaryAction.label}</span>
                    </Link>
                    {secondaryAction && (
                        <Link
                            href={secondaryAction.href}
                            className="btn-3d-glass inline-flex items-center gap-2.5 rounded-2xl px-6 py-3 text-sm sm:text-base font-bold"
                        >
                            {secondaryAction.icon}
                            <span>{secondaryAction.label}</span>
                        </Link>
                    )}
                </div>
            </div>
        </section>
    );
}
