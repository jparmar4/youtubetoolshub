import { createRequire } from "module";
import { readFileSync } from "fs";
const require = createRequire(import.meta.url);
const XLSX = require("xlsx");

const wb = XLSX.readFile("youtubetoolshub_content_strategy.xlsx");
console.log("SHEETS:", wb.SheetNames.join(" | "));

const plan = XLSX.utils.sheet_to_json(wb.Sheets["New Plan (60)"], { defval: "" });
console.log("\nNEW PLAN count:", plan.length);
console.log("columns:", Object.keys(plan[0] || {}).join(" | "));
console.log("\nFirst 25 new posts:");
plan.slice(0, 25).forEach((r, i) => {
  const vals = Object.values(r);
  console.log(
    `${i + 1}. ${vals[0]} | ${String(vals[2] || vals[1] || "").slice(0, 65)} | cluster=${vals[1]} | CPC=${vals[6] || vals[5]} | vol=${vals[5] || vals[4]}`,
  );
});

const tools = XLSX.utils.sheet_to_json(wb.Sheets["Tool Pages"], { defval: "" });
console.log("\nTOOL PAGES:", tools.length);
tools.forEach((r) => console.log(Object.values(r).slice(0, 7).join(" | ")));

const pub = XLSX.utils.sheet_to_json(wb.Sheets["Already Published"], { defval: "" });
console.log("\nAlready Published rows:", pub.length);

const blog = readFileSync("src/config/blog.ts", "utf8");
const slugs = [...blog.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);
console.log("Live blog slugs in code:", slugs.length);

const toolCfg = readFileSync("src/config/tools.ts", "utf8");
const toolSlugs = [...toolCfg.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);
console.log("Live tools in code:", toolSlugs.length);

// Rough match published titles to blog content
let found = 0;
const missing = [];
for (const r of pub) {
  const title = String(r.Title || r.title || Object.values(r)[2] || "");
  if (!title || title.includes("ALREADY") || title === "Title") continue;
  const key = title.toLowerCase().replace(/[^a-z0-9 ]/g, " ").split(/\s+/).slice(0, 5).join(" ");
  if (key.length > 8 && blog.toLowerCase().includes(key.slice(0, 30))) found++;
  else missing.push(title.slice(0, 75));
}
console.log("Published titles roughly present in blog.ts:", found);
console.log("Possibly missing / renamed:");
missing.slice(0, 15).forEach((t) => console.log(" -", t));

// Revenue assumptions check
const rev = XLSX.utils.sheet_to_json(wb.Sheets["Revenue Forecast"], { header: 1, defval: "" });
console.log("\nRevenue forecast raw:");
rev.forEach((row) => console.log(row.slice(0, 10).join(" | ")));
