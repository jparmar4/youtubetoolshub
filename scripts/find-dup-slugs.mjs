import fs from "fs";
const raw = fs.readFileSync("src/config/blog.ts", "utf8");
const re = /slug:\s*"([^"]+)"/g;
const map = new Map();
let m;
let i = 0;
while ((m = re.exec(raw))) {
  i++;
  const s = m[1];
  if (!map.has(s)) map.set(s, []);
  map.get(s).push({ index: m.index, n: i, line: raw.slice(0, m.index).split("\n").length });
}
const dups = [...map.entries()].filter(([, v]) => v.length > 1);
console.log("total slug hits", i, "unique", map.size, "dupes", dups.length);
for (const [s, v] of dups) {
  console.log(s, "x" + v.length, "lines", v.map((x) => x.line).join(","));
}
