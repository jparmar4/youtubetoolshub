"use client";

import { useEffect } from "react";

export default function PrivacyH1Fix() {
    useEffect(() => {
        // Function to replace H1 with Div
        const fixH1 = (h1: HTMLElement) => {
            if (
                h1.innerText.includes("Opt out of the sale") ||
                h1.innerText.includes("sharing of personal information")
            ) {
                // Create replacement div
                const div = document.createElement("div");
                div.innerHTML = h1.innerHTML;
                div.className = h1.className;
                div.style.cssText = h1.style.cssText;
                div.setAttribute("role", "heading");
                div.setAttribute("aria-level", "2");

                // Keep any other attributes if needed, but styling/class usually sufficient
                // Replace
                h1.parentNode?.replaceChild(div, h1);
                console.log("PrivacyH1Fix: Replaced injected H1 with div");
            }
        };

        // Observer to watch for injected H1 tags from AdSense/Privacy/Cookie scripts
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node instanceof HTMLElement) {
                        // Check if the node itself is an H1 or contains an H1
                        if (node.tagName === "H1") {
                            fixH1(node);
                        } else {
                            const h1s = node.querySelectorAll("h1");
                            h1s.forEach(fixH1);
                        }
                    }
                });
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });

        // Initial check in case it's already there (fast load)
        const existingH1s = document.querySelectorAll("h1");
        existingH1s.forEach(fixH1);

        return () => observer.disconnect();
    }, []);

    return null;
}
