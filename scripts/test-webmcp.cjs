// scripts/test-webmcp.cjs
// Verifies WebMCP tool registration on page load and DOM form annotations

const assert = require("assert");
const fs = require("fs");
const path = require("path");

console.log("Checking WebMCP agent-readiness...");

// 1. Verify layout.tsx includes the inline script calling navigator.modelContext.registerTool
const layoutContent = fs.readFileSync(path.join(__dirname, "../src/app/layout.tsx"), "utf8");
assert(
  layoutContent.includes("navigator.modelContext.registerTool"),
  "layout.tsx must contain navigator.modelContext.registerTool call"
);
assert(
  layoutContent.includes("webmcp-registry-script"),
  "layout.tsx must include webmcp-registry-script"
);
assert(
  layoutContent.includes("<WebMCPRegistry />"),
  "layout.tsx must include <WebMCPRegistry /> component"
);

// 2. Simulate in-browser agent environment with navigator.modelContext
const registeredTools = [];
navigator.modelContext = {
  registerTool: function (tool) {
    registeredTools.push(tool);
  },
};
global.window = {
  addEventListener: () => {},
  removeEventListener: () => {},
};
global.document = {
  readyState: "complete",
  addEventListener: () => {},
};

// Extract and eval the inline script from layout.tsx
const start = layoutContent.indexOf("(function()", layoutContent.indexOf("webmcp-registry-script"));
const end = layoutContent.indexOf("})();", start) + 5;
const scriptCode = layoutContent.slice(start, end);

eval(scriptCode);

assert(registeredTools.length >= 8, `Expected at least 8 WebMCP tools registered, got ${registeredTools.length}`);

const requiredTools = [
  "estimate_youtube_earnings",
  "list_youtube_tools",
  "get_country_cpm_rates",
  "get_youtube_thumbnail_urls",
  "estimate_sponsorship_rate",
  "estimate_channel_valuation",
  "estimate_shorts_earnings",
  "calculate_youtube_tax_deductions",
];

for (const name of requiredTools) {
  const tool = registeredTools.find((t) => t.name === name);
  assert(tool, `Tool ${name} must be registered`);
  assert(typeof tool.name === "string" && tool.name.length > 0, `${name}: name must be a non-empty string`);
  assert(typeof tool.description === "string" && tool.description.length > 0, `${name}: description must be non-empty`);
  assert(tool.inputSchema && typeof tool.inputSchema === "object", `${name}: inputSchema must be an object`);
  assert(tool.inputSchema.type === "object", `${name}: inputSchema.type must be 'object'`);
  assert(typeof tool.execute === "function", `${name}: execute must be a callback function`);
}

// 3. Verify form annotations with toolname and tooldescription
const formsToCheck = [
  { file: "../src/components/blog/EarningsCalculatorCTA.tsx", tool: "estimate_youtube_earnings" },
  { file: "../src/components/tools/EarningsCalculator.tsx", tool: "estimate_youtube_earnings" },
  { file: "../src/components/tools/ThumbnailDownloader.tsx", tool: "get_youtube_thumbnail_urls" },
  { file: "../src/components/tools/TranscriptDownloader.tsx", tool: "extract_youtube_transcript" },
];

for (const item of formsToCheck) {
  const content = fs.readFileSync(path.join(__dirname, item.file), "utf8");
  assert(
    content.includes(`toolname="${item.tool}"`),
    `${item.file} must have form with toolname="${item.tool}"`
  );
  assert(
    content.includes("tooldescription="),
    `${item.file} must have form with tooldescription`
  );
}

console.log("All WebMCP tool registration and declarative form checks passed successfully!");
