"use client";

import Link from "next/link";
import { FaRocket, FaArrowRight } from "react-icons/fa";

interface WorkflowStep {
  id: number;
  title: string;
  description: string;
  tool: string;
  toolSlug: string;
  color: "yellow" | "blue" | "purple" | "pink";
  paramKey?: string;
}

const workflowSteps: WorkflowStep[] = [
  {
    id: 1,
    title: "Find an Idea",
    description: "Use Video Ideas Generator to find a high-potential topic.",
    tool: "Video Ideas Generator",
    toolSlug: "youtube-video-ideas-generator",
    color: "yellow",
  },
  {
    id: 2,
    title: "Get a Title",
    description: "Generate viral title options for your idea.",
    tool: "Title Generator",
    toolSlug: "youtube-title-generator",
    color: "blue",
    paramKey: "topic",
  },
  {
    id: 3,
    title: "Write Description",
    description: "Create SEO-optimized description text.",
    tool: "Description Generator",
    toolSlug: "youtube-description-generator",
    color: "purple",
    paramKey: "topic",
  },
  {
    id: 4,
    title: "Create Thumbnail",
    description: "Get the perfect AI prompt for your thumbnail.",
    tool: "AI Thumbnail Prompt",
    toolSlug: "youtube-ai-thumbnail-prompt",
    color: "pink",
    paramKey: "topic",
  },
];

const colorClasses: Record<
  WorkflowStep["color"],
  { cube: string; text: string; pill: string; rim: string }
> = {
  yellow: {
    cube: "from-amber-500 to-orange-500 shadow-amber-500/30",
    text: "text-amber-600",
    pill: "bg-amber-50 text-amber-700 border-amber-200",
    rim: "from-amber-400 to-orange-500",
  },
  blue: {
    cube: "from-sky-500 to-indigo-600 shadow-sky-500/30",
    text: "text-sky-600",
    pill: "bg-sky-50 text-sky-700 border-sky-200",
    rim: "from-sky-400 to-indigo-500",
  },
  purple: {
    cube: "from-purple-600 to-violet-700 shadow-purple-500/30",
    text: "text-purple-600",
    pill: "bg-purple-50 text-purple-700 border-purple-200",
    rim: "from-purple-500 to-violet-600",
  },
  pink: {
    cube: "from-fuchsia-600 to-pink-600 shadow-pink-500/30",
    text: "text-pink-600",
    pill: "bg-pink-50 text-pink-700 border-pink-200",
    rim: "from-fuchsia-500 to-pink-600",
  },
};

export default function SmartWorkflow() {
  return (
    <section className="py-20 relative overflow-hidden bg-slate-50 cv-auto">
      <div className="nebula-bg opacity-70" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-14">
          <span className="inline-block py-1.5 px-4 rounded-full bg-white border border-purple-200 text-purple-700 text-xs font-extrabold uppercase tracking-widest mb-4 shadow-2xs">
            Smart Context Pipeline
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 font-outfit tracking-tight">
            From Idea to Upload in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-fuchsia-600">
              5 Minutes
            </span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Our tools utilize{" "}
            <span className="font-bold text-purple-700">Smart Context Passing</span>.
            Data flows automatically from one tool to the next, building your video package effortlessly.
          </p>
        </div>

        <div className="relative">
          {/* 3D Glowing Connector Beam (Desktop) */}
          <div className="hidden lg:block absolute top-[32%] left-[12%] w-[76%] h-1.5 rounded-full bg-gradient-to-r from-amber-300 via-purple-400 to-pink-400 opacity-50 -translate-y-1/2 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {workflowSteps.map((step) => {
              const colors = colorClasses[step.color];

              return (
                <Link
                  key={step.id}
                  href={`/tools/${step.toolSlug}`}
                  className="group card-3d rounded-3xl p-7 block overflow-hidden text-center"
                >
                  {/* Top Specular Color Rim */}
                  <div
                    className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${colors.rim}`}
                  />

                  <div className="relative z-10">
                    <div
                      className={`w-15 h-15 rounded-2xl bg-gradient-to-br ${colors.cube} text-white flex items-center justify-center text-xl font-black mb-6 mx-auto shadow-lg group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300`}
                    >
                      0{step.id}
                    </div>
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-extrabold uppercase tracking-wider border mb-2.5 ${colors.pill}`}
                    >
                      {step.tool}
                    </span>
                    <h3 className="font-black text-xl text-slate-900 mb-2.5 group-hover:text-purple-700 transition-colors font-outfit">
                      {step.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {step.description}
                    </p>

                    <div className="mt-5 pt-3 border-t border-slate-200/60 flex justify-center">
                      <span
                        className={`text-xs font-extrabold uppercase tracking-wider ${colors.text} flex items-center gap-1.5 group-hover:translate-x-1 transition-transform`}
                      >
                        Launch Step <FaArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="text-center mt-14">
            <Link
              href="/tools/youtube-video-ideas-generator"
              className="btn-3d-primary inline-flex items-center gap-2.5 px-9 py-4 rounded-2xl text-lg font-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
            >
              <FaRocket aria-hidden="true" className="text-pink-400" /> Start Your Workflow
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
