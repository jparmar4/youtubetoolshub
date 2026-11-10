"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function HideOnEmbed({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/embed")) return null;
  return <>{children}</>;
}

