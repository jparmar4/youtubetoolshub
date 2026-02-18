/**
 * SEO/AEO/GEO Verification Script
 * Run: node scripts/check-seo.mjs
 * Requires: dev server running at http://localhost:3000
 */

const BASE_URL = 'http://localhost:3000';
const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const YELLOW = '\x1b[33m';
const BOLD = '\x1b[1m';
const RESET = '\x1b[0m';

let passed = 0;
let failed = 0;

function pass(label) {
    console.log(`  ${GREEN}✓${RESET} ${label}`);
    passed++;
}

function fail(label, hint = '') {
    console.log(`  ${RED}✗${RESET} ${label}${hint ? ` ${YELLOW}(${hint})${RESET}` : ''}`);
    failed++;
    process.exitCode = 1;
}

async function checkPage(path, label, checks) {
    console.log(`\n${BOLD}${label}${RESET} — ${BASE_URL}${path}`);
    try {
        const res = await fetch(`${BASE_URL}${path}`);
        if (!res.ok) {
            fail(`HTTP ${res.status}`, `expected 200`);
            return;
        }
        const text = await res.text();
        for (const { name, str } of checks) {
            // Check both raw and JSON-escaped form (RSC streaming payloads escape quotes)
            const escapedStr = str.replace(/"/g, '\\"');
            if (text.includes(str) || text.includes(escapedStr)) {
                pass(name);
            } else {
                fail(name, `"${str}" not found`);
            }
        }
    } catch (err) {
        fail(`Fetch failed`, err.message);
    }
}

async function checkBinaryUrl(path, label, expectedContentType) {
    console.log(`\n${BOLD}${label}${RESET} — ${BASE_URL}${path}`);
    try {
        const res = await fetch(`${BASE_URL}${path}`);
        if (!res.ok) {
            fail(`HTTP ${res.status}`, `expected 200`);
            return;
        }
        const ct = res.headers.get('content-type') || '';
        if (ct.includes(expectedContentType)) {
            pass(`Content-Type: ${ct}`);
        } else {
            fail(`Content-Type mismatch`, `got "${ct}", expected "${expectedContentType}"`);
        }
    } catch (err) {
        fail(`Fetch failed`, err.message);
    }
}

async function run() {
    console.log(`\n${BOLD}=== YouTube Tools Hub – SEO/AEO/GEO Verification ===${RESET}`);
    console.log(`Target: ${BASE_URL}\n`);

    // 1. Homepage – Verification tags + core schemas
    await checkPage('/', 'Homepage – Verification Tags + Core Schemas', [
        { name: 'Google Site Verification', str: 'google299d0fa42c6b8fbb' },
        { name: 'Yandex Verification meta tag', str: 'yandex-verification' },
        { name: 'Bing (msvalidate.01) meta tag', str: 'msvalidate.01' },
        { name: 'Organization JSON-LD', str: '"@type":"Organization"' },
        { name: 'WebSite JSON-LD', str: '"@type":"WebSite"' },
        { name: 'SearchAction (Sitelinks Searchbox)', str: '"@type":"SearchAction"' },
        { name: 'FAQPage JSON-LD', str: '"@type":"FAQPage"' },
        { name: 'SpeakableSpecification JSON-LD', str: '"@type":"SpeakableSpecification"' },
    ]);

    // 2. Blog post – NewsArticle + BlogPosting + BreadcrumbList (dynamic [slug] route)
    await checkPage('/blog/youtube-banner-makers-2026', 'Blog Post – NewsArticle + BlogPosting + BreadcrumbList', [
        { name: 'NewsArticle JSON-LD', str: '"NewsArticle"' },
        { name: 'BlogPosting JSON-LD', str: '"BlogPosting"' },
        { name: 'SpeakableSpecification JSON-LD', str: '"SpeakableSpecification"' },
        { name: 'BreadcrumbList JSON-LD', str: '"BreadcrumbList"' },
        { name: 'Article author field', str: '"author"' },
        { name: 'Article datePublished field', str: '"datePublished"' },
    ]);

    // 3. Search page – Sitelinks Searchbox target
    await checkPage('/search?q=thumbnail', 'Search Page – Sitelinks Searchbox Target', [
        { name: 'BreadcrumbList JSON-LD', str: '"BreadcrumbList"' },
        { name: 'Tool results rendered', str: 'YouTube Thumbnail' },
    ]);

    // 4. Tools index – ItemList + BreadcrumbList
    await checkPage('/tools', 'Tools Index – ItemList + BreadcrumbList', [
        { name: 'ItemList JSON-LD', str: '"@type":"ItemList"' },
        { name: 'BreadcrumbList JSON-LD', str: '"@type":"BreadcrumbList"' },
    ]);

    // 5. Tool page – SoftwareApplication + FAQPage + BreadcrumbList
    await checkPage('/tools/youtube-thumbnail-downloader', 'Tool Page – SoftwareApplication + FAQPage', [
        { name: 'SoftwareApplication JSON-LD', str: '"@type":"SoftwareApplication"' },
        { name: 'BreadcrumbList JSON-LD', str: '"@type":"BreadcrumbList"' },
        { name: 'FAQPage JSON-LD', str: '"@type":"FAQPage"' },
        { name: 'Offer (free pricing)', str: '"price":"0"' },
    ]);

    // 6. FAQ page – FAQPage + QAPage + SpeakableSpecification
    await checkPage('/faq', 'FAQ Page – FAQPage + QAPage + SpeakableSpecification', [
        { name: 'FAQPage JSON-LD', str: '"@type":"FAQPage"' },
        { name: 'QAPage JSON-LD', str: '"@type":"QAPage"' },
        { name: 'SpeakableSpecification JSON-LD', str: '"@type":"SpeakableSpecification"' },
    ]);

    // 7. Sitemap – /search route + image entries
    await checkPage('/sitemap.xml', 'Sitemap – Routes + Image Entries', [
        { name: '/search in sitemap', str: '/search' },
        { name: 'Image namespace declared', str: 'xmlns:image' },
        { name: 'image:image entries', str: 'image:image' },
        { name: 'Tool pages indexed', str: '/tools/youtube-thumbnail-downloader' },
        { name: 'Blog pages indexed', str: '/blog/' },
    ]);

    // 8. Dynamic OG image for tool
    await checkBinaryUrl(
        '/tools/youtube-thumbnail-downloader/opengraph-image',
        'Dynamic OG Image – Tool Page',
        'image/png'
    );

    // 9. AI discovery files
    await checkPage('/llms.txt', 'AI Discovery – llms.txt', [
        { name: 'YouTube Tools Hub mentioned', str: 'YouTube Tools Hub' },
    ]);

    await checkPage('/knowledge-graph.jsonld', 'AI Discovery – knowledge-graph.jsonld', [
        { name: 'Organization entity', str: 'Organization' },
        { name: 'WebApplication entity', str: 'WebApplication' },
    ]);

    // Summary
    console.log(`\n${'─'.repeat(50)}`);
    console.log(`${BOLD}Results: ${GREEN}${passed} passed${RESET}${BOLD}, ${failed > 0 ? RED : GREEN}${failed} failed${RESET}`);
    if (failed === 0) {
        console.log(`${GREEN}${BOLD}✓ All SEO/AEO/GEO checks passed!${RESET}`);
    } else {
        console.log(`${RED}${BOLD}✗ Some checks failed. Review output above.${RESET}`);
    }
    console.log('');
}

run().catch((err) => {
    console.error(`${RED}Fatal error:${RESET}`, err);
    process.exit(1);
});
