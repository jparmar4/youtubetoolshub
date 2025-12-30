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

    const colorClasses: Record<string, { bg: string; text: string; ring: string }> = {
        yellow: {
            bg: "bg-yellow-100 dark:bg-yellow-900/30",
            text: "text-yellow-600 dark:text-yellow-400",
            ring: "ring-yellow-500",
        },
        blue: {
            bg: "bg-blue-100 dark:bg-blue-900/30",
            text: "text-blue-600 dark:text-blue-400",
            ring: "ring-blue-500",
        },
        purple: {
            bg: "bg-purple-100 dark:bg-purple-900/30",
            text: "text-purple-600 dark:text-purple-400",
            ring: "ring-purple-500",
        },
        pink: {
            bg: "bg-pink-100 dark:bg-pink-900/30",
            text: "text-emerald-600 dark:text-emerald-400",
            ring: "ring-emerald-500",
        },
    };

    return (
        <section className="py-16 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <span className="text-purple-600 dark:text-purple-400 font-bold uppercase tracking-wider text-sm">
                        Smart Workflows
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-2 mb-4">
                        From Idea to Upload in 5 Minutes ⚡
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Our tools pass data to each other automatically. Click through to build your video package.
                    </p>
                </div>

                <div className="relative">
                    {/* Connector Line (Desktop) */}
                    <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-300 dark:via-purple-700 to-transparent -translate-y-1/2 z-0" />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                        {workflowSteps.map((step, index) => {
                            const isCompleted = completedSteps.has(step.id);
                            const isActive = index === currentStep;
                            const colors = colorClasses[step.color];

                            return (
                                <Link
                                    key={step.id}
                                    href={getStepLink(step)}
                                    className={`bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-gray-700 relative group hover:-translate-y-2 transition-all duration-300 block ${isActive ? `ring-2 ${colors.ring}` : ""
                                        }`}
                                >
                                    <div
                                        className={`w-12 h-12 rounded-full ${colors.bg} ${colors.text} flex items-center justify-center text-xl font-bold mb-4 mx-auto group-hover:scale-110 transition-transform`}
                                    >
                                        {isCompleted ? <FaCheck /> : step.id}
                                    </div>
                                    <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-center">
                                        {step.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                                        {step.description}
                                    </p>
                                    <div className="mt-4 text-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span className="text-xs font-medium text-purple-600 dark:text-purple-400 flex items-center justify-center gap-1">
                                            Open Tool <FaArrowRight className="text-[10px]" />
                                        </span>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>

                    <div className="text-center mt-12">
                        <Link href="/tools/youtube-video-ideas-generator">
                            <Button
                                size="lg"
                                className="bg-gradient-to-r from-indigo-600 to-purple-600 border-0 hover:from-indigo-700 hover:to-purple-700 shadow-lg shadow-purple-500/30"
                            >
                                <FaRocket className="mr-2" /> Start the Chain
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
