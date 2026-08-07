/**
 * AdSense Initialization Utility
 * ================================
 * Centralized helper for initializing Google AdSense ad units.
 *
 * Solves these common problems:
 * 1. Double-push errors when React re-renders or Strict Mode runs effects twice
 * 2. Race conditions where adsbygoogle.push() is called before the script loads
 * 3. Ads failing silently without any error tracking
 * 4. Multiple <ins> elements on the same page conflicting with each other
 * 5. Zero-size / display:none containers that AdSense refuses to fill
 *
 * Usage in ad components:
 *   import { initializeAd, AD_CLIENT, watchAdFill } from "@/lib/adsense";
 *
 *   useEffect(() => {
 *     const cleanup = initializeAd(containerRef.current, "my-ad-id");
 *     return cleanup;
 *   }, []);
 */

// ─── Constants ───────────────────────────────────────────────────────────────

/** Your AdSense publisher ID */
export const AD_CLIENT = "ca-pub-1328083083403070";

/**
 * Known ad slot IDs — create new slots in AdSense dashboard for each placement.
 *
 * IMPORTANT: Using unique slots per placement lets AdSense:
 * - Track performance per position (header vs in-article vs sticky)
 * - Optimize ad selection per placement
 * - Give you granular reporting to identify best/worst performers
 *
 * To create new slots:
 * 1. Go to AdSense → Ads → By ad unit → Create new ad unit
 * 2. Choose the format (display, in-article, multiplex, etc.)
 * 3. Copy the slot ID and add it here
 */
export const AD_SLOTS = {
  /** Top-of-page leaderboard / horizontal banner */
  HEADER: "2275881649",

  /** Fixed bottom anchor ad */
  BOTTOM_STICKY: "9962799978",

  /**
   * Horizontal display ad between content sections.
   * Rotate across slots so inventory diversity improves fill rate.
   */
  HORIZONTAL: ["8649718301", "7688425196"],

  /** Native in-article ad (blends with content) */
  IN_ARTICLE: ["7336636636", "6023554962", "3397391628", "2084309959"],

  /** Multiplex ad grid (related content style) */
  MULTIPLEX: "3104734850",

  /**
   * Right sidebar only (blog + tool pages) — AdSense unit "dispsidebarverticle".
   * Use format=auto + data-full-width-responsive=true. Do not force 300x600 height.
   */
  SIDEBAR: "9242656079",

  /**
   * Alias of SIDEBAR for sticky right-rail placements on blog/tool pages.
   */
  STICKY_SIDEBAR: "9242656079",

  /** In-feed ad (between list items) */
  IN_FEED: "2197690717",
} as const;

export type AdSlotKey = keyof typeof AD_SLOTS;

// ─── Internal State ──────────────────────────────────────────────────────────

/** Track which ad containers have been initialized to prevent double-push */
const initializedAds = new Set<string>();

/** Track if the AdSense script has loaded */
let adsenseScriptLoaded = false;
let adsenseScriptError = false;

/** Queue of ads waiting for script to load */
const pendingAds: Array<() => void> = [];

// ─── Script Detection ────────────────────────────────────────────────────────

/**
 * Check if the AdSense script is loaded and ready.
 * The script is loaded in layout.tsx via next/script.
 *
 * Note: `window.adsbygoogle = window.adsbygoogle || []` may exist before the
 * script finishes downloading; pushes still queue correctly in that case.
 */
function isAdSenseReady(): boolean {
  if (typeof window === "undefined") return false;
  if (adsenseScriptError) return false;

  if (typeof window.adsbygoogle !== "undefined") {
    adsenseScriptLoaded = true;
    return true;
  }

  return adsenseScriptLoaded;
}

/**
 * Wait for AdSense script to be ready, then execute callback.
 * Times out after `maxWaitMs` to prevent indefinite waiting.
 */
function whenAdSenseReady(callback: () => void, maxWaitMs = 10000): () => void {
  if (isAdSenseReady()) {
    callback();
    return () => {};
  }

  pendingAds.push(callback);

  const startTime = Date.now();
  const intervalId = setInterval(() => {
    if (isAdSenseReady()) {
      clearInterval(intervalId);
      const pending = pendingAds.splice(0, pendingAds.length);
      pending.forEach((fn) => {
        try {
          fn();
        } catch (err) {
          console.error("[AdSense] Error initializing pending ad:", err);
        }
      });
    } else if (Date.now() - startTime > maxWaitMs) {
      clearInterval(intervalId);
      console.warn(
        "[AdSense] Script did not load within timeout. Ads will not be shown.",
      );
      adsenseScriptError = true;
      pendingAds.splice(0, pendingAds.length);
    }
  }, 200);

  return () => {
    clearInterval(intervalId);
  };
}

// ─── Fill detection ──────────────────────────────────────────────────────────

export type AdFillResult = "filled" | "unfilled" | "timeout";

export interface WatchAdFillOptions {
  /** Min height (px) to treat as filled. Default 20 */
  minHeight?: number;
  /** Max wait ms before timeout. Default 8000 */
  timeoutMs?: number;
  /** Poll interval ms. Default 400 */
  pollIntervalMs?: number;
}

/**
 * Watch an <ins.adsbygoogle> element until AdSense fills it, marks unfilled,
 * or we time out. Always returns a cleanup function.
 */
export function watchAdFill(
  insElement: Element,
  onResult: (result: AdFillResult) => void,
  options: WatchAdFillOptions = {},
): () => void {
  const { minHeight = 20, timeoutMs = 8000, pollIntervalMs = 400 } = options;
  let settled = false;
  let observer: MutationObserver | null = null;
  let pollId: ReturnType<typeof setInterval> | null = null;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const settle = (result: AdFillResult) => {
    if (settled) return;
    settled = true;
    cleanup();
    onResult(result);
  };

  const check = (): boolean => {
    const status = insElement.getAttribute("data-adsbygoogle-status");
    const rect = insElement.getBoundingClientRect();
    const hasIframe = !!insElement.querySelector("iframe");
    const content = (insElement as HTMLElement).innerHTML?.trim() ?? "";

    if (status === "unfilled") {
      settle("unfilled");
      return true;
    }

    const tallEnough = rect.height >= minHeight || hasIframe;
    if (
      tallEnough &&
      (status === "done" || status === "loaded" || hasIframe || content.length > 0)
    ) {
      settle("filled");
      return true;
    }

    return false;
  };

  const cleanup = () => {
    observer?.disconnect();
    observer = null;
    if (pollId != null) {
      clearInterval(pollId);
      pollId = null;
    }
    if (timeoutId != null) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  if (check()) return cleanup;

  observer = new MutationObserver(() => {
    check();
  });
  observer.observe(insElement, {
    attributes: true,
    attributeFilter: ["data-adsbygoogle-status", "style", "data-ad-status"],
    childList: true,
    subtree: true,
  });

  pollId = setInterval(() => {
    check();
  }, pollIntervalMs);

  timeoutId = setTimeout(() => {
    if (check()) return;
    // Final height check — slow inventory can still be "done" with content
    const status = insElement.getAttribute("data-adsbygoogle-status");
    const h = insElement.getBoundingClientRect().height;
    if (h >= minHeight && status !== "unfilled") {
      settle("filled");
    } else {
      settle("timeout");
    }
  }, timeoutMs);

  return cleanup;
}

/**
 * Measure whether an element has a usable width for AdSense.
 * AdSense will not serve to zero-width nodes.
 */
function hasUsableWidth(el: Element): boolean {
  const rect = el.getBoundingClientRect();
  if (rect.width > 0) return true;
  // Fallback for off-screen measurement containers (fixed left:-9999px etc.)
  const style = window.getComputedStyle(el);
  const w = parseFloat(style.width);
  return Number.isFinite(w) && w > 0;
}

// ─── Public API ──────────────────────────────────────────────────────────────

/**
 * Initialize an ad unit within a container element.
 *
 * @param container - The DOM element containing the <ins class="adsbygoogle"> tag
 * @param adId - A unique identifier for this ad instance
 * @param options - Optional configuration
 * @returns Cleanup function to call on unmount
 */
export function initializeAd(
  container: HTMLElement | null,
  adId: string,
  options: {
    /** Delay before initializing (ms). Default: 50 */
    delay?: number;
    /** Maximum time to wait for AdSense script (ms). Default: 10000 */
    maxWait?: number;
    /** How many layout retries when width is 0. Default: 8 */
    sizeRetries?: number;
    /** Callback when ad fails to load */
    onError?: (error: unknown) => void;
    /** Callback when ad is successfully pushed */
    onLoad?: () => void;
  } = {},
): () => void {
  const {
    delay = 50,
    maxWait = 10000,
    sizeRetries = 8,
    onError,
    onLoad,
  } = options;

  if (typeof window === "undefined") return () => {};

  if (!container) {
    console.warn(`[AdSense] No container found for ad "${adId}"`);
    return () => {};
  }

  if (initializedAds.has(adId)) {
    return () => {};
  }

  let cancelled = false;
  const cleanupFns: Array<() => void> = [];

  const doInit = () => {
    if (cancelled) return;

    const insElement = container.querySelector("ins.adsbygoogle");

    if (!insElement) {
      console.warn(`[AdSense] No <ins> element found in container for ad "${adId}"`);
      return;
    }

    const status = insElement.getAttribute("data-adsbygoogle-status");
    if (status === "done" || status === "loaded") {
      initializedAds.add(adId);
      onLoad?.();
      return;
    }

    let attempts = 0;
    const tryPush = () => {
      if (cancelled) return;

      if (hasUsableWidth(insElement) || attempts >= sizeRetries) {
        pushAd(insElement, adId, onLoad, onError);
        return;
      }

      attempts += 1;
      requestAnimationFrame(tryPush);
    };

    tryPush();
  };

  const timerId = setTimeout(() => {
    if (cancelled) return;
    const cleanupWait = whenAdSenseReady(doInit, maxWait);
    cleanupFns.push(cleanupWait);
  }, delay);

  return () => {
    cancelled = true;
    clearTimeout(timerId);
    cleanupFns.forEach((fn) => fn());
  };
}

/**
 * Push an ad to AdSense.
 */
function pushAd(
  insElement: Element,
  adId: string,
  onLoad?: () => void,
  onError?: (error: unknown) => void,
): void {
  try {
    initializedAds.add(adId);

    (window.adsbygoogle = window.adsbygoogle || []).push({});

    onLoad?.();
  } catch (error) {
    initializedAds.delete(adId);
    console.error(`[AdSense] Failed to initialize ad "${adId}":`, error);
    onError?.(error);
  }
}

/**
 * Reset the initialization state for a specific ad.
 * Useful when navigating between pages in a SPA where
 * the same ad ID might need to be re-initialized.
 */
export function resetAd(adId: string): void {
  initializedAds.delete(adId);
}

/**
 * Reset all ad initialization states.
 * Useful on route changes in Next.js.
 */
export function resetAllAds(): void {
  initializedAds.clear();
}

/**
 * Check if an ad has been initialized.
 */
export function isAdInitialized(adId: string): boolean {
  return initializedAds.has(adId);
}

/**
 * Create an IntersectionObserver that initializes the ad only when
 * the container is about to enter the viewport.
 */
export function initializeAdOnView(
  container: HTMLElement | null,
  adId: string,
  options: {
    /** How far before the viewport to start loading. Default: "200px" */
    rootMargin?: string;
    /** Minimum visibility ratio to trigger. Default: 0 */
    threshold?: number;
    /** Ad initialization options */
    adOptions?: Parameters<typeof initializeAd>[2];
  } = {},
): () => void {
  if (typeof window === "undefined" || !container) return () => {};

  const { rootMargin = "200px", threshold = 0, adOptions } = options;

  if (!("IntersectionObserver" in window)) {
    return initializeAd(container, adId, adOptions);
  }

  let adCleanup: (() => void) | null = null;

  const observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      if (entry && entry.isIntersecting) {
        adCleanup = initializeAd(container, adId, adOptions);
        observer.disconnect();
      }
    },
    {
      rootMargin,
      threshold,
    },
  );

  observer.observe(container);

  return () => {
    observer.disconnect();
    adCleanup?.();
  };
}

/**
 * Pick a horizontal slot by stable index (avoids Math.random SSR/hydration skew).
 */
export function pickHorizontalSlot(index = 0): string {
  const slots = AD_SLOTS.HORIZONTAL as readonly string[];
  return slots[Math.abs(index) % slots.length] ?? slots[0]!;
}

/**
 * Pick an in-article slot by stable index.
 */
export function pickInArticleSlot(index = 0): string {
  const slots = AD_SLOTS.IN_ARTICLE as readonly string[];
  return slots[Math.abs(index) % slots.length] ?? slots[0]!;
}
