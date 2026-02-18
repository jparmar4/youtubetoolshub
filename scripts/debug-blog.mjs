// Quick check: does a dynamic blog post have the new schemas?
const posts = [
    '/blog/why-youtube-tools-hub',
    '/blog/youtube-banner-makers-2026',
    '/blog/best-microphones-under-100-youtube',
];

for (const post of posts) {
    const res = await fetch(`http://localhost:3000${post}`);
    const t = await res.text();
    const esc = s => s.replace(/"/g, '\\"');
    const has = s => t.includes(s) || t.includes(esc(s));
    console.log(`\n${post}`);
    console.log('  NewsArticle:', has('"NewsArticle"'));
    console.log('  BlogPosting:', has('"BlogPosting"'));
    console.log('  BreadcrumbList:', has('"BreadcrumbList"'));
    console.log('  SpeakableSpec:', has('"SpeakableSpecification"'));
}
