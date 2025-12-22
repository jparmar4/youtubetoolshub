import Link from "next/link";
import NextImage from "next/image";
import { tools } from "@/config/tools";

// Map of keywords to tool URLs
// We'll generate this from the tools config + manual additions if needed
const keywordMap: Record<string, string> = {};

// Populate from tools
tools.forEach((tool) => {
    // Exact match on name
    keywordMap[tool.name.toLowerCase()] = `/tools/${tool.slug}`;

    // Exact match on slug parts (maybe too aggressive? Let's stick to name and manual keywords)
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

export function processContent(content: string): React.ReactNode[] {
    const lines = content.split('\n');
    const elements: React.ReactNode[] = [];
    let listItems: string[] = [];
    let listType: 'ul' | 'ol' | null = null;

    const flushList = (key: string) => {
        if (listItems.length > 0) {
            const ListTag = listType === 'ol' ? 'ol' : 'ul';
            elements.push(
                <ListTag key={key} className={`space-y-2 my-4 ${listType === 'ol' ? 'list-decimal' : 'list-disc'} pl-6 text-gray-600 dark:text-gray-300`}>
                    {listItems.map((item, i) => (
                        <li key={i} className="leading-relaxed">{parseInlineMarkdown(item, `li-${key}-${i}`, true)}</li>
                    ))}
                </ListTag>
            );
            listItems = [];
            listType = null;
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
                        <div key={key} className="my-8 relative rounded-xl overflow-hidden shadow-lg">
                            <NextImage
                                src={src}
                                alt={alt}
                                width={800}
                                height={450}
                                className="w-full h-auto object-cover"
                            />
                            {alt && <p className="text-center text-sm text-gray-500 mt-2">{alt}</p>}
                        </div>
                    );
                    return;
                }
            }

            // Bold: **text**
            if (part.startsWith('**') && part.endsWith('**')) {
                nodes.push(
                    <strong key={key} className="font-semibold text-gray-900 dark:text-white">
                        {part.slice(2, -2)}
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
                                className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 underline underline-offset-2"
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
                            className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 underline underline-offset-2"
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
                // We'll iterate through keywords and replace the FIRST occurrence in THIS text block
                // This is a basic implementation; robust NLP would be better but overkill here.

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
                                    className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 underline underline-offset-2 decoration-dotted"
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

        // Empty line - flush list and add spacing
        if (trimmedLine === '') {
            flushList(`list-${index}`);
            return;
        }

        // H2 heading
        if (trimmedLine.startsWith('## ')) {
            flushList(`list-${index}`);
            elements.push(
                <h2 key={index} className="text-2xl font-bold text-gray-900 dark:text-white mt-10 mb-4">
                    {trimmedLine.replace('## ', '')}
                </h2>
            );
            return;
        }

        // H3 heading
        if (trimmedLine.startsWith('### ')) {
            flushList(`list-${index}`);
            elements.push(
                <h3 key={index} className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-3">
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
                <p key={index} className="font-semibold text-gray-900 dark:text-white my-4">
                    {parseInlineMarkdown(trimmedLine.replace(/\*\*/g, ''), `p-${index}`, false)}
                </p>
            );
            return;
        }

        // Regular paragraph
        flushList(`list-${index}`);
        elements.push(
            <p key={index} className="text-gray-600 dark:text-gray-300 my-4 leading-relaxed">
                {parseInlineMarkdown(trimmedLine, `p-${index}`, shouldAutoLink)}
            </p>
        );
    });

    // Flush any remaining list
    flushList('list-final');

    return elements;
}
