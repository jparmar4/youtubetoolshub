"use client";

import { memo } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

/**
 * Shared nav pill treatments for the desktop dock and mobile drawer.
 * Active state = soft violet gradient + inset highlight (premium tactile).
 */
const PILL_BASE =
  "h-9 inline-flex items-center gap-1.5 px-2.5 xl:px-3.5 rounded-full text-[12.5px] xl:text-[13px] font-semibold whitespace-nowrap transition-all border ";

const PILL_ACTIVE =
  "bg-gradient-to-b from-purple-50 to-purple-100/70 text-purple-800 border-purple-300/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.85),0_2px_6px_-2px_rgba(124,58,237,0.25)]";

const PILL_IDLE =
  "text-slate-700 hover:text-slate-950 hover:bg-slate-100/80 border-transparent";

export const NavLink = memo(function NavLink({
  href,
  children,
  onClick,
  isActive,
  dotColor,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  isActive?: boolean;
  dotColor?: string;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`${PILL_BASE} ${
        isActive ? PILL_ACTIVE : PILL_IDLE
      }`}
      prefetch={false}
    >
      {dotColor && <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotColor}`} aria-hidden="true" />}
      <span>{children}</span>
    </Link>
  );
});

export const DashboardLink = memo(function DashboardLink({
  onClick,
  isActive,
}: {
  onClick?: () => void;
  isActive?: boolean;
}) {
  const { data: session } = useSession();

  if (!session) return null;

  return (
    <Link
      href="/dashboard"
      onClick={onClick}
      rel="nofollow"
      className={`h-9 px-2.5 xl:px-3.5 rounded-full font-semibold transition-all inline-flex items-center gap-1.5 text-[12.5px] xl:text-[13px] whitespace-nowrap border ${
        isActive ? PILL_ACTIVE : PILL_IDLE
      }`}
    >
      <span>Dashboard</span>
    </Link>
  );
});
