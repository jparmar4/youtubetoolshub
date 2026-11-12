import Link from "next/link";
import ToolIcon3D from "@/components/ui/ToolIcon3D";
import { QUICK_LAUNCH_TOOLS } from "@/config/quick-launch";

/**
 * Mobile-only horizontal quick-launch strip. The desktop equivalent lives in
 * the sidebar dock (BlogSidebar), which is hidden below lg — without this
 * strip mobile users lose the flagship tool links entirely.
 */
export default function MobileQuickLinks() {
    return (
        <div className="lg:hidden" aria-label="Flagship creator tools">
            <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 mb-2.5">
                Flagship creator tools
            </p>
            <div className="flex gap-2.5 overflow-x-auto pb-2 -mx-1 px-1 snap-x">
                {QUICK_LAUNCH_TOOLS.map((tool) => {
                    return (
                        <Link
                            key={tool.href}
                            href={tool.href}
                            className="group flex shrink-0 snap-start items-center gap-2.5 rounded-2xl border border-slate-200/80 bg-white px-3.5 py-2.5 shadow-xs transition-all hover:border-purple-300 hover:shadow-sm"
                        >
                            <ToolIcon3D slug={tool.href.replace("/tools/", "")} size="sm" />
                            <span className="flex flex-col">
                                <span className="whitespace-nowrap text-xs font-bold text-slate-800 group-hover:text-purple-700">
                                    {tool.name}
                                </span>
                                <span
                                    className={`mt-0.5 w-fit rounded-full border px-1.5 py-px text-[11px] font-extrabold ${tool.badgeColor}`}
                                >
                                    {tool.badge}
                                </span>
                            </span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
