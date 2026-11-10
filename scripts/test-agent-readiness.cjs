// scripts/test-agent-readiness.cjs
// Automated verification suite for AI Agent-Readiness, BotVisibility, and Token Efficiency

const assert = require("assert");
const fs = require("fs");
const path = require("path");

console.log("Checking AI Agent-Readiness & Token Budget constraints...");

// 1. Check layout.tsx WebMCP provider & tool registrations
const layoutContent = fs.readFileSync(path.join(__dirname, "../src/app/layout.tsx"), "utf8");
assert(
  layoutContent.includes("navigator.modelContext.provideContext"),
  "layout.tsx must contain navigator.modelContext.provideContext call (BotVisibility Check 1.18)"
);
assert(
  layoutContent.includes("navigator.modelContext.registerTool"),
  "layout.tsx must contain navigator.modelContext.registerTool call"
);
assert(
  layoutContent.includes("webmcp-registry.js"),
  "layout.tsx must load deferred external webmcp-registry.js"
);
assert(
  layoutContent.includes("@graph") || layoutContent.includes("combineSchemasToGraph"),
  "layout.tsx must consolidate SEO schemas into @graph JSON-LD"
);

// 2. Check homepage single @graph consolidation & direct SSR Hero showcase
const homeContent = fs.readFileSync(path.join(__dirname, "../src/app/page.tsx"), "utf8");
assert(
  homeContent.includes("@graph"),
  "page.tsx must consolidate schemas into @graph JSON-LD"
);
assert(
  homeContent.includes("<Hero3DShowcase") && !homeContent.includes("<ClientOnly"),
  "page.tsx must render Hero3DShowcase directly without ClientOnly fallback shift"
);

// 3. Check tool pages single @graph consolidation
const toolPageContent = fs.readFileSync(path.join(__dirname, "../src/app/tools/[slug]/page.tsx"), "utf8");
assert(
  toolPageContent.includes("combinedToolGraphSchema"),
  "tools/[slug]/page.tsx must consolidate schemas into combinedToolGraphSchema"
);

// 4. Check blog post pages single @graph consolidation
const blogPageContent = fs.readFileSync(path.join(__dirname, "../src/app/blog/[slug]/page.tsx"), "utf8");
assert(
  blogPageContent.includes("combinedBlogGraphSchema"),
  "blog/[slug]/page.tsx must consolidate schemas into combinedBlogGraphSchema"
);

// 5. Check proxy.ts markdown content negotiation
const proxyContent = fs.readFileSync(path.join(__dirname, "../src/proxy.ts"), "utf8");
assert(
  proxyContent.includes("text/markdown"),
  "proxy.ts must support Accept: text/markdown content negotiation"
);
assert(
  proxyContent.includes("/api/markdown"),
  "proxy.ts must rewrite agent requests to /api/markdown"
);
assert(
  proxyContent.includes(".md"),
  "proxy.ts must support .md extension routing"
);

// 6. Check api/markdown/route.ts endpoints
const markdownRouteContent = fs.readFileSync(path.join(__dirname, "../src/app/api/markdown/route.ts"), "utf8");
assert(
  markdownRouteContent.includes("buildBlogPostMarkdown"),
  "api/markdown must implement buildBlogPostMarkdown for blog posts"
);
assert(
  markdownRouteContent.includes("buildCpmRatesMarkdown"),
  "api/markdown must implement buildCpmRatesMarkdown for country CPM benchmarks"
);
assert(
  markdownRouteContent.includes("buildFaqMarkdown"),
  "api/markdown must implement buildFaqMarkdown for FAQs"
);

// 7. Check webmcp-registry.js has all 8 tools
const webmcpRegistryContent = fs.readFileSync(path.join(__dirname, "../public/webmcp-registry.js"), "utf8");
const expectedTools = [
  "estimate_youtube_earnings",
  "list_youtube_tools",
  "get_country_cpm_rates",
  "get_youtube_thumbnail_urls",
  "estimate_sponsorship_rate",
  "estimate_channel_valuation",
  "estimate_shorts_earnings",
  "calculate_youtube_tax_deductions",
];

for (const tool of expectedTools) {
  assert(
    webmcpRegistryContent.includes(`name: "${tool}"`) || webmcpRegistryContent.includes(`name: '${tool}'`) || webmcpRegistryContent.includes(`"${tool}"`),
    `webmcp-registry.js must register tool ${tool}`
  );
}

// 8. Check static index.md existence
assert(
  fs.existsSync(path.join(__dirname, "../public/index.md")),
  "public/index.md must exist for direct agent fetching"
);

// 9. Keep inline WebMCP script compact (< 2000 chars) so every HTML route stays slim
const webmcpStart = layoutContent.indexOf("(function()", layoutContent.indexOf("webmcp-registry-script"));
const webmcpEnd = layoutContent.indexOf("})();", webmcpStart) + 5;
const webmcpInline = webmcpStart !== -1 && webmcpEnd > webmcpStart ? layoutContent.slice(webmcpStart, webmcpEnd) : "";
assert(
  webmcpInline.length > 0 && webmcpInline.length < 2000,
  `Expected compact #webmcp-registry-script (< 2000 chars), got ${webmcpInline.length}`
);

// 10. Ensure no loading.tsx files emit redundant Suspense fallback shells in SSR HTML
function findLoadingFiles(dir) {
  const found = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      found.push(...findLoadingFiles(full));
    } else if (entry.name === "loading.tsx") {
      found.push(full);
    }
  }
  return found;
}
const loadingFiles = findLoadingFiles(path.join(__dirname, "../src/app"));
assert.strictEqual(
  loadingFiles.length,
  0,
  `Expected zero src/app/**/loading.tsx files to avoid Suspense shell HTML bloat, found: ${loadingFiles.join(", ")}`
);

// 11. When a production build exists, verify built tool HTML has no Suspense S:1 fallback shell
const builtToolHtml = path.join(__dirname, "../.next/server/app/tools/youtube-thumbnail-downloader.html");
if (fs.existsSync(builtToolHtml)) {
  const html = fs.readFileSync(builtToolHtml, "utf8");
  assert(
    !html.includes('hidden id="S:1"'),
    "Built tool HTML must not contain hidden id=\"S:1\" Suspense fallback shell"
  );
}

console.log("All AI Agent-Readiness & Token Budget checks passed successfully!");
