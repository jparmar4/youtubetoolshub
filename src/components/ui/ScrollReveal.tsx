"use client";

import { ReactNode, useEffect, useRef } from "react";

interface ScrollRevealProps {
    children: ReactNode;
    className?: string;
    /** Extra transition delay in ms (for simple stagger effects). */
    delay?: number;
}

/**
 * Reveals a below-fold section with a one-time fade-up when it first scrolls
 * into view. Content is always server-rendered (SEO-safe); the hidden
 * `.reveal-pending` state is only applied client-side to sections that are
 * still below the fold at mount, so in-view content never flashes.
 * Global prefers-reduced-motion handling makes the reveal instant.
 */
export default function ScrollReveal({ children, className = "", delay = 0 }: ScrollRevealProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el || typeof IntersectionObserver === "undefined") return;

        // Already in view at mount → leave it visible, no hide/reveal flash.
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) return;

        el.classList.add("reveal-pending");
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry?.isIntersecting) return;
                el.classList.add("is-visible");
                el.classList.remove("reveal-pending");
                observer.disconnect();
            },
            { rootMargin: "0px 0px -10% 0px" },
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <div ref={ref} className={`scroll-reveal ${className}`} style={delay ? { transitionDelay: `${delay}ms` } : undefined}>
            {children}
        </div>
    );
}
