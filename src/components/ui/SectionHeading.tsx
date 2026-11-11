import { ReactNode } from "react";

interface SectionHeadingProps {
    /** Small uppercase pill above the title. */
    eyebrow?: string;
    title: ReactNode;
    description?: ReactNode;
    align?: "left" | "center";
    /** id for aria-labelledby targets on the section wrapper. */
    id?: string;
    as?: "h1" | "h2";
    className?: string;
}

/**
 * Shared section heading used across marketing/content pages so headings,
 * eyebrows and descriptions keep one visual treatment instead of drifting
 * per page.
 */
export default function SectionHeading({
    eyebrow,
    title,
    description,
    align = "center",
    id,
    as: Tag = "h2",
    className = "",
}: SectionHeadingProps) {
    const alignment = align === "center" ? "text-center items-center" : "text-left items-start";

    return (
        <div className={`flex flex-col gap-3 ${alignment} ${className}`}>
            {eyebrow && (
                <span className="inline-flex items-center gap-2 rounded-full border border-purple-200/80 bg-purple-50 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-purple-700">
                    {eyebrow}
                </span>
            )}
            <Tag
                id={id}
                className={`font-black tracking-tight font-outfit text-slate-900 ${
                    Tag === "h1"
                        ? "text-3xl sm:text-4xl md:text-5xl"
                        : "text-2xl sm:text-3xl md:text-4xl"
                }`}
            >
                {title}
            </Tag>
            {description && (
                <p className="max-w-2xl text-base leading-relaxed text-slate-600">{description}</p>
            )}
        </div>
    );
}
