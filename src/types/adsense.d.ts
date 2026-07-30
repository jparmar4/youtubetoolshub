/**
 * Global type augmentation for Google AdSense.
 * Centralised here so individual ad components don't each need their own `declare global`.
 */
declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export {};
