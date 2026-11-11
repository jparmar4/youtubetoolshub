"use client";

import { useEffect, useRef } from "react";

const FOCUSABLE_SELECTOR =
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), summary, [tabindex]:not([tabindex="-1"])';

interface UseFocusTrapOptions {
    /** Called when Escape is pressed while the trap is active. */
    onEscape?: () => void;
}

/**
 * Traps Tab navigation inside a dialog/drawer while `active` is true, moves
 * focus to the first focusable element on open, and restores focus to the
 * previously focused element on close.
 */
export function useFocusTrap<T extends HTMLElement = HTMLDivElement>(
    active: boolean,
    { onEscape }: UseFocusTrapOptions = {},
) {
    const containerRef = useRef<T>(null);
    // Keep the latest callbacks without re-running the trap effect on re-renders.
    const onEscapeRef = useRef(onEscape);
    useEffect(() => {
        onEscapeRef.current = onEscape;
    });

    useEffect(() => {
        if (!active) return;
        const container = containerRef.current;
        if (!container) return;

        const previouslyFocused = document.activeElement as HTMLElement | null;

        const getFocusable = () =>
            Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
                (el) => el.offsetParent !== null || el === document.activeElement,
            );

        const first = getFocusable()[0];
        first?.focus();

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onEscapeRef.current?.();
                return;
            }
            if (event.key !== "Tab") return;

            const focusable = getFocusable();
            if (focusable.length === 0) return;

            const firstEl = focusable[0];
            const lastEl = focusable[focusable.length - 1];

            if (event.shiftKey && document.activeElement === firstEl) {
                event.preventDefault();
                lastEl.focus();
            } else if (!event.shiftKey && document.activeElement === lastEl) {
                event.preventDefault();
                firstEl.focus();
            }
        };

        document.addEventListener("keydown", onKeyDown);
        return () => {
            document.removeEventListener("keydown", onKeyDown);
            previouslyFocused?.focus?.();
        };
    }, [active]);

    return containerRef;
}

export default useFocusTrap;
