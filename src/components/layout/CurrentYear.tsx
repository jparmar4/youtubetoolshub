"use client";

/**
 * The copyright year must not be baked into statically prerendered HTML —
 * server-side `new Date().getFullYear()` shows the previous year after New
 * Year until the next rebuild. This 1KB island stays current.
 */
export default function CurrentYear() {
  return <>{new Date().getFullYear()}</>;
}
