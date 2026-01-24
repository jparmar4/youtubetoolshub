import Link from "next/link";
import NextImage from "next/image";
import { tools } from "@/config/tools";
import { FaInfoCircle, FaLightbulb, FaExclamationTriangle, FaCheckCircle, FaBolt } from "react-icons/fa";
import InArticleAd from "@/components/ads/InArticleAd";


// Map of keywords to tool URLs
// We'll generate this from the tools config + manual additions if needed
const keywordMap: Record<string, string> = {};

// Populate from tools
tools.forEach((tool) => {
    // Exact match on name
    keywordMap[tool.name.toLowerCase()] = `/tools/${tool.slug}`;
});

// Manual keywords based on common terms
const manualKeywords: Record<string, string> = {
    "thumbnail downloader": "/tools/youtube-thumbnail-downloader",
    "thumbnail text generator": "/tools/youtube-thumbnail-generator",
    "ai thumbnail generator": "/tools/youtube-ai-thumbnail-generator",
    "title generator": "/tools/youtube-title-generator",
    "description generator": "/tools/youtube-description-generator",
    "tag generator": "/tools/youtube-tag-generator",
    "video ideas": "/tools/youtube-video-ideas-generator",
    "trend helper": "/tools/youtube-trend-helper",
    "content calendar": "/tools/youtube-content-calendar-generator",
    "earnings calculator": "/tools/youtube-earnings-calculator",
    "channel name generator": "/tools/youtube-channel-name-generator",
    "hashtag generator": "/tools/youtube-hashtag-generator",
    "intro script": "/tools/youtube-intro-script-generator",
};

Object.assign(keywordMap, manualKeywords);

type AlertType = 'NOTE' | 'TIP' | 'IMPORTANT' | 'WARNING' | 'CAUTION' | 'QUOTE';

export function processContent(content: string): React.ReactNode[] {
    const lines = content.split('\n');
    const elements: React.ReactNode[] = [];
    let listItems: string[] = [];
    let listType: 'ul' | 'ol' | null = null;
    let blockquoteItems: string[] = [];
    let blockquoteType: AlertType | null = null;
    let paragraphCount = 0;

    const flushList = (key: string) => {
        if (listItems.length > 0) {
            const ListTag = listType === 'ol' ? 'ol' : 'ul';
            elements.push(
                <ListTag key={key} className={`space-y-2 my-6 ${listType === 'ol' ? 'list-decimal' : 'list-disc'} pl-6 text-slate-700 dark:text-slate-300`}>
                    {listItems.map((item, i) => (
                        <li key={i} className="leading-relaxed pl-2">{parseInlineMarkdown(item, `li-${key}-${i}`, true)}</li>
                    ))}
                </ListTag>
            );
            listItems = [];
            listType = null;
        }
    };

    const flushBlockquote = (key: string) => {
        if (blockquoteItems.length > 0 && blockquoteType) {
            const content = blockquoteItems.map((item, i) => (
                <p key={i} className={`leading-relaxed ${i > 0 ? 'mt-3' : ''}`}>
                    {parseInlineMarkdown(item, `bq-${key}-${i}`, true)}
                </p>
            ));

            if (blockquoteType === 'QUOTE') {
                elements.push(
                    <blockquote key={key} className="border-l-4 border-purple-500 bg-purple-50 p-6 my-8 rounded-r-xl text-slate-700 italic shadow-sm">
                        {content}
                    </blockquote>
                );
            } else {
                // Alert styles
                let styles = "";
                let icon = null;
                let title = "";

                switch (blockquoteType) {
                    case 'NOTE':
                        styles = "bg-blue-50 border-blue-200 text-slate-700";
                        icon = <FaInfoCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />;
                        title = "Note";
                        break;
                    case 'TIP':
                        styles = "bg-emerald-50 border-emerald-200 text-slate-700";
                        icon = <FaLightbulb className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />;
                        title = "Pro Tip";
                        break;
                    case 'IMPORTANT':
                        styles = "bg-purple-50 border-purple-200 text-slate-700";
                        icon = <FaBolt className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />;
                        title = "Important";
                        break;
                    case 'WARNING':
                        styles = "bg-amber-50 border-amber-200 text-slate-800";
                        icon = <FaExclamationTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />;
                        title = "Warning";
                        break;
                    case 'CAUTION':
                        styles = "bg-red-50 border-red-200 text-slate-800";
                        icon = <FaExclamationTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />;
                        title = "Caution";
                        break;
                }

                elements.push(
                    <div key={key} className={`flex gap-4 p-6 my-8 rounded-xl border ${styles} shadow-sm items-start`}>
                        {icon}
                        <div className="flex-1">
                            <h4 className="font-bold text-sm uppercase tracking-wider opacity-90 mb-2 select-none">
                                {title}
                            </h4>
                            <div className="text-base">
                                {content}
                            </div>
                        </div>
                    </div>
                );
            }

            blockquoteItems = [];
            blockquoteType = null;
        }
    };

    // Keep track of which keywords we've already linked to avoid over-linking
    const linkedKeywords = new Set<string>();

    const parseInlineMarkdown = (text: string, keyPrefix: string, autoLink: boolean = false): React.ReactNode[] => {
        // First, handle existing markdown links [label](url) and bold **text**
        // We'll split by these patterns first to preserve them
        const pattern = /(\*\*[^*]+\*\*)|(\[[^\]]+\]\([^\)]+\))|(!\[[^\]]*\]\([^\)]+\))/g;
        const parts = text.split(pattern).filter((p) => p !== undefined && p !== '');

        const nodes: React.ReactNode[] = [];

        parts.forEach((part, i) => {
            const key = `${keyPrefix}-${i}`;

            // Image: ![alt](url)
            if (part.startsWith('![') && part.includes('](') && part.endsWith(')')) {
                const match = part.match(/^!\[([^\]]*)\]\(([^\)]+)\)$/);
                if (match) {
                    const alt = match[1];
                    const src = match[2];
                    nodes.push(
                        <div key={key} className="my-10 relative rounded-2xl overflow-hidden shadow-xl shadow-purple-900/5">
                            <NextImage
                                src={src}
                                alt={alt}
                                width={800}
                                height={450}
                                className="w-full h-auto object-cover"
                            />
                            {alt && <p className="text-center text-sm text-slate-500 mt-3 italic">{alt}</p>}
                        </div>
                    );
                    return;
                }
            }

            // Bold: **text**
            if (part.startsWith('**') && part.endsWith('**')) {
                const innerText = part.slice(2, -2);
                nodes.push(
                    <strong key={key} className="font-bold text-slate-900 dark:text-white">
                        {parseInlineMarkdown(innerText, `${key}-bold`, false)}
                    </strong>
                );
                return;
            }

            // Link: [label](url)
            if (part.startsWith('[') && part.includes('](') && part.endsWith(')')) {
                const match = part.match(/^\[([^\]]+)\]\(([^\)]+)\)$/);
                if (match) {
                    const label = match[1];
                    const url = match[2];
                    const isInternal = url.startsWith('/');

                    if (isInternal) {
                        nodes.push(
                            <Link
                                key={key}
                                href={url}
                                className="text-purple-600 hover:text-purple-700 font-medium underline underline-offset-2 transition-colors"
                            >
                                {label}
                            </Link>
                        );
                        return;
                    }

                    nodes.push(
                        <a
                            key={key}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-purple-600 hover:text-purple-700 font-medium underline underline-offset-2 transition-colors"
                        >
                            {label}
                        </a>
                    );
                    return;
                }
            }

            // Plain text - apply auto-linking if enabled
            if (autoLink) {
                // simple auto-linking implementation
                let textSegments: (string | React.ReactNode)[] = [part];

                // For each keyword in our map
                for (const [keyword, url] of Object.entries(keywordMap)) {
                    // Skip if we've already linked this keyword globally
                    if (linkedKeywords.has(keyword)) continue;

                    const newSegments: (string | React.ReactNode)[] = [];
                    let foundInThisBlock = false;

                    for (const segment of textSegments) {
                        if (typeof segment !== 'string') {
                            newSegments.push(segment);
                            continue;
                        }

                        // Case-insensitive search
                        const lowerSegment = segment.toLowerCase();
                        const idx = lowerSegment.indexOf(keyword.toLowerCase());

                        if (idx !== -1 && !foundInThisBlock) {
                            // Split and link
                            const before = segment.slice(0, idx);
                            const match = segment.slice(idx, idx + keyword.length);
                            const after = segment.slice(idx + keyword.length);

                            if (before) newSegments.push(before);
                            newSegments.push(
                                <Link
                                    key={`${key}-${keyword}`}
                                    href={url}
                                    className="text-purple-600 hover:text-purple-700 font-medium border-b border-dotted border-purple-400 hover:border-solid transition-all"
                                    title={`Try our ${keyword} tool`}
                                >
                                    {match}
                                </Link>
                            );
                            if (after) newSegments.push(after);

                            linkedKeywords.add(keyword);
                            foundInThisBlock = true;
                        } else {
                            newSegments.push(segment);
                        }
                    }
                    textSegments = newSegments;
                }
                nodes.push(...textSegments);
            } else {
                nodes.push(part);
            }
        });

        return nodes;
    };


    lines.forEach((line, index) => {
        const trimmedLine = line.trim();

        // Empty line - flush list/blockquotes and add spacing
        if (trimmedLine === '') {
            flushList(`list-${index}`);
            flushBlockquote(`quote-${index}`);
            return;
        }

        // Check for Blockquotes/Alerts
        if (line.trim().startsWith('>')) {
            // If we are currently in a list, flush it
            flushList(`list-${index}`);

            // Logic to determine if this is a NEW alert or continuation
            // Alerts usually start with > [!TYPE]
            const alertMatch = trimmedLine.match(/^>\s*\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]/i);

            if (alertMatch) {
                // If we were already in a blockquote, flush it first (though rare to have consecutive different ones without space)
                flushBlockquote(`quote-prev-${index}`);

                blockquoteType = alertMatch[1].toUpperCase() as AlertType;
                // If there is content on the same line after ]? Usually not in standard usage but let's handle empty
                // We don't add the [!NOTE] text itself to content
                return;
            }

            // If it's not a new alert start, it's either content for current alert, or a standard blockquote
            if (!blockquoteType) {
                blockquoteType = 'QUOTE';
            }

            // Extract content: remove '> ' or '>'
            const content = trimmedLine.replace(/^>\s?/, '');
            if (content) {
                blockquoteItems.push(content);
            }
            return;
        }

        // If line does not start with >, flush any active blockquote
        flushBlockquote(`quote-${index}`);

        // H2 heading
        if (trimmedLine.startsWith('## ')) {
            flushList(`list-${index}`);
            elements.push(
                <h2 key={index} className="text-3xl font-bold text-slate-900 mt-16 mb-6 tracking-tight leading-tight">
                    {trimmedLine.replace('## ', '')}
                </h2>
            );
            // Insert ad after H2 (major sections)
            elements.push(<InArticleAd key={`ad-h2-${index}`} />);
            return;
        }

        // H3 heading
        if (trimmedLine.startsWith('### ')) {
            flushList(`list-${index}`);
            elements.push(
                <h3 key={index} className="text-2xl font-bold text-slate-900 mt-10 mb-5 tracking-tight">
                    {trimmedLine.replace('### ', '')}
                </h3>
            );
            return;
        }

        // Unordered list item
        if (trimmedLine.startsWith('- ')) {
            listType = 'ul';
            listItems.push(trimmedLine.replace('- ', ''));
            return;
        }

        // Ordered list item
        if (/^\d+\.\s/.test(trimmedLine)) {
            listType = 'ol';
            listItems.push(trimmedLine.replace(/^\d+\.\s/, ''));
            return;
        }

        // Only auto-link in regular paragraphs and list items to avoid messy links in headers/bold
        const shouldAutoLink = true;

        // Bold paragraph (standalone bold)
        if (trimmedLine.startsWith('**') && trimmedLine.endsWith('**')) {
            flushList(`list-${index}`);
            elements.push(
                <p key={index} className="font-bold text-slate-900 text-lg my-6">
                    {parseInlineMarkdown(trimmedLine.replace(/\*\*/g, ''), `p-${index}`, false)}
                </p>
            );

            paragraphCount++;
            if (paragraphCount === 2) {
                elements.push(<InArticleAd key={`ad-${index}`} />);
            }
            return;
        }

        // Regular paragraph
        flushList(`list-${index}`);
        elements.push(
            <p key={index} className="text-slate-600 outline-none my-5 leading-8 text-[1.1rem]">
                {parseInlineMarkdown(trimmedLine, `p-${index}`, shouldAutoLink)}
            </p>
        );

        paragraphCount++;
        // Insert ads after paragraph 2 and then every 5 paragraphs
        if (paragraphCount === 2 || (paragraphCount > 2 && (paragraphCount - 2) % 4 === 0)) {
            elements.push(<InArticleAd key={`ad-${index}`} />);
        }


    });

    // Flush any remaining items
    flushList('list-final');
    flushBlockquote('quote-final');

    return elements;
}
