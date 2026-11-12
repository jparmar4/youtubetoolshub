"use client";

import { useEffect, useState } from "react";

/**
 * True once the page is scrolled past `threshold` px. Passive listener;
 * safe during SSR/hydration (starts false).
 */
export function useScrolled(threshold = 12) {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > threshold);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, [threshold]);

    return scrolled;
}

export default useScrolled;
