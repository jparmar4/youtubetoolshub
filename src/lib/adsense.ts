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
 *
 * Usage in ad components:
 *   import { initializeAd, AD_CLIENT } from "@/lib/adsense";
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
 *
 * For now, we map known slots. Update these as you create dedicated slots.
 */
export const AD_SLOTS = {
  /** Top-of-page leaderboard / horizontal banner */
  HEADER: "5848325027",

  /** Fixed bottom anchor ad */
  BOTTOM_STICKY: "5848325027",

  /** Horizontal display ad between content sections */
  HORIZONTAL: "5848325027",

  /** Native in-article ad (blends with content) */
  IN_ARTICLE: "5441130911",

  /** Multiplex ad grid (related content style) */
  MULTIPLEX: "3104734850",

  /** Sidebar display ad */
  SIDEBAR: "5848325027",

  /** Sticky sidebar ad (stays visible on scroll) */
  STICKY_SIDEBAR: "5848325027",

  /** In-feed ad (between list items) */
  IN_FEED: "5848325027",
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
 */
function isAdSenseReady(): boolean {
  if (typeof window === "undefined") return false;
  if (adsenseScriptError) return false;

  // Check if the adsbygoogle array exists (created by the AdSense script)
  if (typeof (window as Window & { adsbygoogle?: unknown[] }).adsbygoogle !== "undefined") {
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

  // Add to pending queue
  pendingAds.push(callback);

  // Poll for script readiness
  const startTime = Date.now();
  const intervalId = setInterval(() => {
    if (isAdSenseReady()) {
      clearInterval(intervalId);
      // Process all pending ads
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
      console.warn("[AdSense] Script did not load within timeout. Ads will not be shown.");
      adsenseScriptError = true;
      pendingAds.splice(0, pendingAds.length); // Clear queue
    }
  }, 200);

  return () => {
    clearInterval(intervalId);
  };
}

// ─── Public API ──────────────────────────────────────────────────────────────

/**
 * Initialize an ad unit within a container element.
 *
 * @param container - The DOM element containing the <ins class="adsbygoogle"> tag
 * @param adId - A unique identifier for this ad instance (e.g., "header-ad", "tool-page-horizontal")
 * @param options - Optional configuration
 * @returns Cleanup function to call on unmount
 *
 * @example
 * ```tsx
 * const containerRef = useRef<HTMLDivElement>(null);
 *
 * useEffect(() => {
 *   const cleanup = initializeAd(containerRef.current, "header-leaderboard");
 *   return cleanup;
 * }, []);
 *
 * return (
 *   <div ref={containerRef}>
 *     <ins className="adsbygoogle" ... />
 *   </div>
 * );
 * ```
 */
export function initializeAd(
  container: HTMLElement | null,
  adId: string,
  options: {
    /** Delay before initializing (ms). Default: 50 */
    delay?: number;
    /** Maximum time to wait for AdSense script (ms). Default: 10000 */
    maxWait?: number;
    /** Callback when ad fails to load */
    onError?: (error: unknown) => void;
    /** Callback when ad is successfully pushed */
    onLoad?: () => void;
  } = {}
): () => void {
  const { delay = 50, maxWait = 10000, onError, onLoad } = options;

  // Server-side guard
  if (typeof window === "undefined") return () => {};

  // No container provided
  if (!container) {
    console.warn(`[AdSense] No container found for ad "${adId}"`);
    return () => {};
  }

  // Already initialized — prevent double-push
  if (initializedAds.has(adId)) {
    return () => {};
  }

  let cancelled = false;

  const doInit = () => {
    if (cancelled) return;

    const insElement = container.querySelector("ins.adsbygoogle");

    if (!insElement) {
      console.warn(`[AdSense] No <ins> element found in container for ad "${adId}"`);
      return;
    }

    // Check if AdSense already processed this element
    const status = insElement.getAttribute("data-adsbygoogle-status");
    if (status === "done" || status === "loaded") {
      initializedAds.add(adId);
      return;
    }

    // Check if the element is visible (has dimensions)
    // AdSense won't serve ads to zero-size elements
    const rect = insElement.getBoundingClientRect();
    if (rect.width === 0) {
      // Element might not be laid out yet, retry after a frame
      requestAnimationFrame(() => {
        if (!cancelled) {
          pushAd(insElement, adId, onLoad, onError);
        }
      });
      return;
    }

    pushAd(insElement, adId, onLoad, onError);
  };

  // Delay to let the DOM settle after React render
  const timerId = setTimeout(() => {
    if (cancelled) return;

    // Wait for AdSense script, then initialize
    const cleanupWait = whenAdSenseReady(doInit, maxWait);

    // Store cleanup for the wait
    cleanupFns.push(cleanupWait);
  }, delay);

  const cleanupFns: Array<() => void> = [];

  return () => {
    cancelled = true;
    clearTimeout(timerId);
    cleanupFns.forEach((fn) => fn());
  };
}

/**
 * Push an ad to AdSense.
 * This is the actual call to window.adsbygoogle.push({}).
 */
function pushAd(
  insElement: Element,
  adId: string,
  onLoad?: () => void,
  onError?: (error: unknown) => void
): void {
  try {
    // Mark as initialized BEFORE pushing to prevent race conditions
    initializedAds.add(adId);

    // The actual AdSense call
    ((window as Window & { adsbygoogle: unknown[] }).adsbygoogle =
      (window as Window & { adsbygoogle?: unknown[] }).adsbygoogle || []).push({});

    onLoad?.();
  } catch (error) {
    // Remove from initialized set so it can be retried
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

// ─── Ad Viewability Helpers ──────────────────────────────────────────────────

/**
 * Create an IntersectionObserver that initializes the ad only when
 * the container is about to enter the viewport.
 *
 * This is ideal for below-the-fold ads (in-article, multiplex, sidebar).
 * Benefits:
 * - Reduces initial page load (fewer ads competing for resources)
 * - Improves Core Web Vitals (less layout shift, faster LCP)
 * - Higher viewability score = higher paying ads from AdSense
 *
 * @param container - The ad container element
 * @param adId - Unique ad identifier
 * @param options - IntersectionObserver options + ad init options
 * @returns Cleanup function
 *
 * @example
 * ```tsx
 * useEffect(() => {
 *   const cleanup = initializeAdOnView(containerRef.current, "in-article-1", {
 *     rootMargin: "200px", // Start loading 200px before it enters viewport
 *   });
 *   return cleanup;
 * }, []);
 * ```
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
  } = {}
): () => void {
  if (typeof window === "undefined" || !container) return () => {};

  const { rootMargin = "200px", threshold = 0, adOptions } = options;

  // If IntersectionObserver is not supported, initialize immediately
  if (!("IntersectionObserver" in window)) {
    return initializeAd(container, adId, adOptions);
  }

  let adCleanup: (() => void) | null = null;

  const observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      if (entry && entry.isIntersecting) {
        // Element is near/in viewport — initialize the ad
        adCleanup = initializeAd(container, adId, adOptions);
        // Stop observing — ad only needs to be initialized once
        observer.disconnect();
      }
    },
    {
      rootMargin,
      threshold,
    }
  );

  observer.observe(container);

  return () => {
    observer.disconnect();
    adCleanup?.();
  };
}

// ─── Revenue Optimization Tips ───────────────────────────────────────────────
//
// These are NOT code — they're AdSense dashboard actions you should take:
//
// 1. ENABLE AUTO ADS:
//    AdSense → Ads → By site → Edit (pencil icon) → Toggle "Auto ads" ON
//    This lets Google place additional ads in optimal positions automatically.
//    It works alongside your manual placements.
//
// 2. ENABLE VIGNETTE ADS:
//    Inside Auto ads settings → Ad formats → Enable "Vignette ads"
//    These full-page ads between page navigations have very high CPMs.
//    Especially effective on mobile from Tier 1 countries.
//
// 3. ENABLE ANCHOR ADS:
//    Inside Auto ads settings → Ad formats → Enable "Anchor ads"
//    Google will show its own optimized anchor (may be better than manual sticky).
//
// 4. CREATE UNIQUE AD SLOTS PER PLACEMENT:
//    AdSense → Ads → By ad unit → Create new ad unit
//    Create separate units for: Header, In-article, Sidebar, Sticky, Multiplex
//    Then update the AD_SLOTS object above with the real slot IDs.
//    This gives you per-placement reporting and lets AdSense optimize each position.
//
// 5. BLOCK LOW-VALUE AD CATEGORIES:
//    AdSense → Blocking controls → Manage
//    Block categories that pay very little: dating, gambling, politics
//    This forces higher-paying advertisers to fill your slots.
//
// 6. EXPERIMENT WITH AD BALANCE:
//    AdSense → Optimization → Experiments
//    Run Google's built-in experiments to find optimal ad density.
//
// 7. TARGET HIGH-CPC CONTENT:
//    Create blog posts about: YouTube monetization, earnings, business tools
//    These topics trigger ads from finance/SaaS advertisers with $5-$15 CPCs
//    vs general content that might only attract $0.10-$0.50 CPCs.
//
// ─────────────────────────────────────────────────────────────────────────────
