import Link from "next/link";
import { FaArrowRight, FaBolt } from "react-icons/fa";

export interface WorkflowBridgeAction {
  href: string;
  label: string;
  description: string;
}

export default function WorkflowBridgeCard({
  title = "Continue Your Workflow",
  subtitle,
  actions,
}: {
  title?: string;
  subtitle: string;
  actions: WorkflowBridgeAction[];
}) {
  return (
    <div className="rounded-2xl border-2 border-indigo-200/80 bg-gradient-to-r from-indigo-50/80 via-white to-purple-50/80 p-5 sm:p-6 shadow-sm space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <span className="inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-indigo-700">
            <FaBolt className="w-3 h-3" aria-hidden="true" />
            <span>Pre-Filled Next Step</span>
          </span>
          <h3 className="text-lg font-black text-slate-900 font-outfit mt-0.5">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600">{subtitle}</p>
        </div>
      </div>

      <div
        className={`grid grid-cols-1 gap-3 ${
          actions.length === 4
            ? "md:grid-cols-2 lg:grid-cols-4"
            : actions.length >= 3
              ? "md:grid-cols-3"
              : actions.length === 2
                ? "md:grid-cols-2"
                : ""
        }`}
      >
        {actions.map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className="group p-4 rounded-xl bg-white border border-slate-200 hover:border-indigo-400 hover:shadow-md transition-all flex flex-col justify-between gap-2"
          >
            <div>
              <span className="font-extrabold text-sm text-slate-900 group-hover:text-indigo-700 flex items-center justify-between gap-2">
                <span>{action.label}</span>
                <FaArrowRight
                  className="w-3.5 h-3.5 text-indigo-600 shrink-0 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </span>
              <span className="text-xs text-slate-600 block mt-1 leading-relaxed">
                {action.description}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
