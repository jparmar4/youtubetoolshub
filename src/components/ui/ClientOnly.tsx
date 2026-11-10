"use client";

import { useSyncExternalStore, ReactNode } from "react";

interface ClientOnlyProps {
  children: ReactNode;
  fallback?: ReactNode;
}

const emptySubscribe = () => () => {};

export default function ClientOnly({ children, fallback = null }: ClientOnlyProps) {
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  if (!mounted) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
