"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { FaRocket, FaArrowRight, FaCheck } from "react-icons/fa";

interface WorkflowStep {
    id: number;
    title: string;
    description: string;
    tool: string;
    toolSlug: string;
    color: string;
    paramKey?: string; // The query parameter to use for the next tool
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

export default function SmartWorkflow() {
    const [currentStep, setCurrentStep] = useState(0);
    const [workflowData, setWorkflowData] = useState<string>("");
    const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

    const handleStepComplete = (stepId: number, data: string) => {
        setCompletedSteps(prev => new Set(prev).add(stepId));
        setWorkflowData(data);
        if (stepId < workflowSteps.length) {
            setCurrentStep(stepId);
        }
    };

    const getStepLink = (step: WorkflowStep) => {
        if (step.paramKey && workflowData) {
            return `/tools/${step.toolSlug}?${step.paramKey}=${encodeURIComponent(workflowData)}`;
        }
        return `/tools/${step.toolSlug}`;
    };

    const colorClasses: Record<string, { bg: string; text: string; ring: string; border: string }> = {
        yellow: {
            bg: "bg-amber-100",
            text: "text-amber-600",
            ring: "ring-amber-500",
            border: "border-amber-200"
        },
        blue: {
            bg: "bg-cyan-100",
            text: "text-cyan-600",
            ring: "ring-cyan-500",
            border: "border-cyan-200"
        },
        purple: {
            bg: "bg-purple-100",
            text: "text-purple-600",
            ring: "ring-purple-500",
            border: "border-purple-200"
        },
        pink: {
            bg: "bg-fuchsia-100",
            text: "text-fuchsia-600",
            ring: "ring-fuchsia-500",
            border: "border-fuchsia-200"
        },
    };

    return (
        <section className="py-24 relative overflow-hidden bg-slate-50">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-purple-200/20 blur-[120px] rounded-full -z-10" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-100/30 blur-[100px] rounded-full -z-10" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20 relative">
                    <span className="inline-block py-1 px-3 rounded-full bg-purple-100 border border-purple-200 text-purple-700 text-xs font-bold uppercase tracking-widest mb-4">
                        Seamless & Fast
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                        From Idea to Upload in <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-fuchsia-600">5 Minutes</span> ⚡
                    </h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                        Our tools utilize <span className="font-semibold text-purple-700">Smart Context Passing</span>.
                        Data flows automatically from one tool to the next, building your video package effortlessly.
                    </p>
                </div>

                <div className="relative">
                    {/* Connector Line (Desktop) */}
                    <div className="hidden lg:block absolute top-[28%] left-[10%] w-[80%] h-1 bg-gradient-to-r from-transparent via-purple-300 to-transparent -translate-y-1/2 z-0" />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                        {workflowSteps.map((step, index) => {
                            const isCompleted = completedSteps.has(step.id);
                            const isActive = index === currentStep;
                            const colors = colorClasses[step.color];

                            return (
                                <Link
                                    key={step.id}
                                    href={getStepLink(step)}
                                    className={`group relative bg-white rounded-2xl p-6 shadow-xl shadow-purple-900/5 border ${colors.border} hover:-translate-y-2 transition-all duration-300 block overflow-hidden`}
                                >
                                    {/* Hover Gradient Overlay */}
                                    <div className={`absolute inset-0 bg-gradient-to-br from-white to-${step.color}-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                                    <div className="relative z-10">
                                        <div
                                            className={`w-14 h-14 rounded-2xl ${colors.bg} ${colors.text} flex items-center justify-center text-xl font-bold mb-6 mx-auto shadow-sm group-hover:rotate-6 transition-transform duration-300`}
                                        >
                                            {isCompleted ? <FaCheck /> : step.id}
                                        </div>
                                        <h3 className="font-bold text-xl text-slate-900 mb-3 text-center group-hover:text-purple-700 transition-colors">
                                            {step.title}
                                        </h3>
                                        <p className="text-sm text-slate-500 text-center leading-relaxed">
                                            {step.description}
                                        </p>

                                        <div className="mt-6 flex justify-center opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                            <span className={`text-xs font-bold uppercase tracking-wide ${colors.text} flex items-center gap-1`}>
                                                Start Now <FaArrowRight />
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>

                    <div className="text-center mt-16">
                        <Link href="/tools/youtube-video-ideas-generator">
                            <Button
                                size="lg"
                                className="bg-slate-900 text-white hover:bg-slate-800 shadow-xl shadow-slate-900/20 px-8 py-4 rounded-xl text-lg font-bold transform hover:scale-105 transition-all duration-200"
                            >
                                <FaRocket className="mr-2" /> Start Your Workflow
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
