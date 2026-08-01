"use client";

import { useEffect } from "react";

/**
 * AdSense Funding Choices / privacy UI sometimes injects an H1 that competes
 * with the page H1 for SEO. Demote those injected headings to non-H1 nodes.
 *
 * Throttled + scoped (not a full-tree scan on every mutation) for performance.
 */
export default function PrivacyH1Fix() {
  useEffect(() => {
    const isPrivacyHeading = (el: HTMLElement) => {
      const text = (el.textContent || "").toLowerCase();
      return (
        text.includes("opt out of the sale") ||
        text.includes("sharing of personal information") ||
        text.includes("do not sell") ||
        text.includes("privacy options")
      );
    };

    const demote = (h1: HTMLElement) => {
      if (!isPrivacyHeading(h1)) return;
      const div = document.createElement("div");
      div.innerHTML = h1.innerHTML;
      div.className = h1.className;
      div.style.cssText = h1.style.cssText;
      div.setAttribute("role", "heading");
      div.setAttribute("aria-level", "2");
      h1.parentNode?.replaceChild(div, h1);
    };

    let scheduled = false;
    const scan = () => {
      scheduled = false;
      document.querySelectorAll("h1").forEach((node) => {
        demote(node as HTMLElement);
      });
    };

    const scheduleScan = () => {
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(scan);
    };

    // Initial pass
    scan();

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type !== "childList" || mutation.addedNodes.length === 0) {
          continue;
        }
        for (const node of mutation.addedNodes) {
          if (!(node instanceof HTMLElement)) continue;
          if (node.tagName === "H1") {
            demote(node);
            continue;
          }
          // Only schedule a full pass if a subtree with headings was added
          if (node.querySelector?.("h1")) {
            scheduleScan();
            break;
          }
        }
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return null;
}
