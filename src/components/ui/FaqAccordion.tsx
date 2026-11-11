import { FaChevronDown } from "react-icons/fa";

export interface FaqItem {
    question: string;
    answer: string;
}

interface FaqAccordionProps {
    items: FaqItem[];
    /** Heading level inside each summary. */
    headingLevel?: "h2" | "h3" | "h4";
    className?: string;
}

/**
 * Native <details>/<summary> FAQ accordion — no client JS, and both question
 * and answer stay in the served HTML for crawlers. The FAQPage JSON-LD is
 * rendered separately by the page, so this component is purely presentational.
 */
export default function FaqAccordion({
    items,
    headingLevel = "h3",
    className = "",
}: FaqAccordionProps) {
    if (items.length === 0) return null;

    const Heading = headingLevel;

    return (
        <div className={`space-y-3 ${className}`}>
            {items.map((item, index) => (
                <details
                    key={index}
                    className="group rounded-2xl border border-slate-200/80 bg-white shadow-xs transition-colors open:border-purple-300/80"
                >
                    <summary className="flex cursor-pointer select-none items-center justify-between gap-4 px-5 py-4 font-bold text-slate-900 transition-colors hover:text-purple-700 [&::-webkit-details-marker]:hidden">
                        <Heading className="text-sm sm:text-base font-black font-outfit tracking-tight">
                            {item.question}
                        </Heading>
                        <FaChevronDown
                            aria-hidden="true"
                            className="shrink-0 text-sm text-slate-500 transition-transform duration-300 group-open:rotate-180 group-open:text-purple-600"
                        />
                    </summary>
                    <div className="border-t border-slate-100 px-5 py-4">
                        <p className="text-sm leading-relaxed text-slate-600">{item.answer}</p>
                    </div>
                </details>
            ))}
        </div>
    );
}
