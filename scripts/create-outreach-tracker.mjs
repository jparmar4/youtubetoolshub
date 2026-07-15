import ExcelJS from "exceljs";
import fs from "fs";
import path from "path";

const wb = new ExcelJS.Workbook();
wb.creator = "YouTube Tools Hub";
wb.created = new Date();

const headerFill = {
  type: "pattern",
  pattern: "solid",
  fgColor: { argb: "FF7E22CE" },
};
const headerFont = {
  name: "Arial",
  bold: true,
  color: { argb: "FFFFFFFF" },
  size: 11,
};
const blueFont = { name: "Arial", color: { argb: "FF0000FF" }, size: 10 };
const yellowFill = {
  type: "pattern",
  pattern: "solid",
  fgColor: { argb: "FFFEF08A" },
};
const greenFill = {
  type: "pattern",
  pattern: "solid",
  fgColor: { argb: "FFBBF7D0" },
};
const thin = { style: "thin", color: { argb: "FFE5E7EB" } };
const border = { top: thin, left: thin, bottom: thin, right: thin };

// Dashboard
const dash = wb.addWorksheet("Dashboard");
dash.mergeCells("A1:D1");
dash.getCell("A1").value =
  "YouTube Tools Hub — Backlink Outreach Tracker";
dash.getCell("A1").font = {
  name: "Arial",
  bold: true,
  size: 16,
  color: { argb: "FF7E22CE" },
};

dash.getCell("A3").value = "KPIs (auto-count from Outreach Log)";
dash.getCell("A3").font = { name: "Arial", bold: true, size: 12 };
dash.getCell("A4").value = "Metric";
dash.getCell("B4").value = "Value";
["A4", "B4"].forEach((a) => {
  dash.getCell(a).fill = headerFill;
  dash.getCell(a).font = headerFont;
});

const kpis = [
  ["Total rows logged", "COUNTA('Outreach Log'!B2:B200)"],
  ["Sent", "COUNTIF('Outreach Log'!I:I,\"Sent\")"],
  ["Replied", "COUNTIF('Outreach Log'!I:I,\"Replied\")"],
  ["Live links won", "COUNTIF('Outreach Log'!I:I,\"Linked\")"],
  ["Rejected", "COUNTIF('Outreach Log'!I:I,\"Rejected\")"],
  ["No reply", "COUNTIF('Outreach Log'!I:I,\"No Reply\")"],
  ["To send", "COUNTIF('Outreach Log'!I:I,\"To Send\")"],
  ["Reply rate %", "IF(B5=0,0,B6/B5)"],
  ["Link win rate %", "IF(B5=0,0,B7/B5)"],
];
kpis.forEach((row, i) => {
  const r = 5 + i;
  dash.getCell(r, 1).value = row[0];
  dash.getCell(r, 1).font = { name: "Arial", size: 11 };
  dash.getCell(r, 2).value = { formula: row[1] };
  dash.getCell(r, 2).font = { name: "Arial", size: 11, bold: true };
  dash.getCell(r, 2).fill = greenFill;
  if (row[0].includes("rate")) dash.getCell(r, 2).numFmt = "0.0%";
});

dash.getCell("A16").value = "Weekly targets (yellow = edit)";
dash.getCell("A16").font = { name: "Arial", bold: true, size: 12 };
dash.getCell("A17").value = "Emails / week";
dash.getCell("B17").value = 28;
dash.getCell("B17").font = blueFont;
dash.getCell("B17").fill = yellowFill;
dash.getCell("A18").value = "Goal: new referring domains / month";
dash.getCell("B18").value = 12;
dash.getCell("B18").font = blueFont;
dash.getCell("B18").fill = yellowFill;

dash.getCell("A20").value = "Primary assets";
dash.getCell("A20").font = { name: "Arial", bold: true, size: 12 };
const assets = [
  [
    "Earnings Calculator",
    "https://www.youtubetoolshub.com/tools/youtube-earnings-calculator",
  ],
  [
    "CPM Rates",
    "https://www.youtubetoolshub.com/resources/youtube-cpm-rates",
  ],
  ["All Tools", "https://www.youtubetoolshub.com/tools"],
  [
    "Link to Us / embeds",
    "https://www.youtubetoolshub.com/resources/link-to-us",
  ],
  [
    "vs TubeBuddy",
    "https://www.youtubetoolshub.com/tools/vs/tubebuddy",
  ],
  ["vs VidIQ", "https://www.youtubetoolshub.com/tools/vs/vidiq"],
  [
    "Calculator badge SVG",
    "https://www.youtubetoolshub.com/images/badge-calculator.svg",
  ],
];
dash.getCell("A21").value = "Asset";
dash.getCell("B21").value = "URL";
["A21", "B21"].forEach((a) => {
  dash.getCell(a).fill = headerFill;
  dash.getCell(a).font = headerFont;
});
assets.forEach((row, i) => {
  dash.getCell(22 + i, 1).value = row[0];
  dash.getCell(22 + i, 2).value = row[1];
  dash.getCell(22 + i, 2).font = blueFont;
});

dash.getCell("A31").value = "Templates A–F → docs/BACKLINK-OUTREACH.md";
dash.getCell("A31").font = { name: "Arial", bold: true, size: 12 };
[
  "A Resource page",
  "B Listicle",
  "C Data citation",
  "D Guest post",
  "E Creator swap",
  "F Broken link",
].forEach((t, i) => {
  dash.getCell(32 + i, 1).value = t;
  dash.getCell(32 + i, 1).font = { name: "Arial", size: 10 };
});
dash.getColumn(1).width = 38;
dash.getColumn(2).width = 74;

// Outreach Log
const log = wb.addWorksheet("Outreach Log");
const headers = [
  "Date Sent",
  "Contact Name",
  "Email / Handle",
  "Site / Outlet",
  "Page URL",
  "Template (A-F)",
  "Asset Linked",
  "Anchor Text Used",
  "Status",
  "Follow-up 1",
  "Follow-up 2",
  "Live Backlink URL",
  "DR/DA (est)",
  "Notes",
];
headers.forEach((h, i) => {
  const cell = log.getCell(1, i + 1);
  cell.value = h;
  cell.fill = headerFill;
  cell.font = headerFont;
  cell.alignment = {
    wrapText: true,
    vertical: "middle",
    horizontal: "center",
  };
});
log.getRow(1).height = 32;
log.views = [{ state: "frozen", ySplit: 1 }];
log.autoFilter = { from: "A1", to: "N1" };

const today = new Date().toISOString().slice(0, 10);
const samples = [
  [
    today,
    "",
    "",
    "",
    "",
    "A",
    "Earnings Calculator",
    "free YouTube earnings calculator",
    "To Send",
    "",
    "",
    "",
    "",
    "Priority money pages",
  ],
  [
    today,
    "",
    "",
    "",
    "",
    "B",
    "All Tools / Free suite",
    "free YouTube tools 2026",
    "To Send",
    "",
    "",
    "",
    "",
    "Listicle outreach",
  ],
  [
    today,
    "",
    "",
    "",
    "",
    "C",
    "CPM Rates table",
    "YouTube CPM rates by country",
    "To Send",
    "",
    "",
    "",
    "",
    "Data citation",
  ],
];
samples.forEach((row, ri) => {
  row.forEach((v, ci) => {
    const cell = log.getCell(ri + 2, ci + 1);
    cell.value = v;
    cell.font = blueFont;
    cell.border = border;
    if ([0, 5, 6, 7, 8].includes(ci)) cell.fill = yellowFill;
  });
});
for (let r = 5; r <= 100; r++) {
  for (let c = 1; c <= 14; c++) {
    const cell = log.getCell(r, c);
    cell.font = blueFont;
    cell.border = border;
    if (c === 9) cell.fill = yellowFill;
  }
}
[12, 16, 22, 22, 36, 12, 22, 28, 12, 12, 12, 36, 10, 28].forEach((w, i) => {
  log.getColumn(i + 1).width = w;
});

log.dataValidations.add("I2:I200", {
  type: "list",
  allowBlank: true,
  formulae: ['"To Send,Sent,Replied,Linked,Rejected,No Reply"'],
});
log.dataValidations.add("F2:F200", {
  type: "list",
  allowBlank: true,
  formulae: ['"A,B,C,D,E,F"'],
});
log.dataValidations.add("G2:G200", {
  type: "list",
  allowBlank: true,
  formulae: [
    '"Earnings Calculator,CPM Rates table,All Tools / Free suite,Thumbnail Downloader,vs TubeBuddy,vs VidIQ,Algorithm Guide,Link to Us page"',
  ],
});

// Target Ideas
const tg = wb.addWorksheet("Target Ideas");
["Prospect type", "Search query ideas", "Asset to promote", "Template"].forEach(
  (h, i) => {
    const cell = tg.getCell(1, i + 1);
    cell.value = h;
    cell.fill = headerFill;
    cell.font = headerFont;
  },
);
const ideas = [
  [
    "Best tools listicles",
    "best free youtube tools 2026",
    "All Tools / Free suite",
    "B",
  ],
  [
    "Monetization guides",
    "how much does youtube pay per 1000 views",
    "Earnings Calculator",
    "A",
  ],
  [
    "CPM research posts",
    "youtube cpm rates by country",
    "CPM Rates table",
    "C",
  ],
  [
    "TubeBuddy comparisons",
    "tubebuddy alternative free",
    "vs TubeBuddy",
    "B",
  ],
  ["VidIQ comparisons", "vidiq alternative free", "vs VidIQ", "B"],
  [
    "Thumbnail tutorials",
    "youtube thumbnail size download",
    "Thumbnail Downloader",
    "A",
  ],
  [
    "SEO tutorials",
    "youtube tag generator free",
    "All Tools / Free suite",
    "A",
  ],
  [
    "Creator newsletters",
    "youtube creator newsletter",
    "Earnings Calculator",
    "E",
  ],
  [
    "University resource lists",
    "digital marketing free tools list",
    "All Tools / Free suite",
    "A",
  ],
  [
    "Broken tool directories",
    "youtube tools list outdated",
    "Link to Us page",
    "F",
  ],
];
ideas.forEach((row, ri) =>
  row.forEach((v, ci) => {
    const cell = tg.getCell(ri + 2, ci + 1);
    cell.value = v;
    cell.font = { name: "Arial", size: 10 };
    cell.border = border;
  }),
);
[28, 42, 24, 12].forEach((w, i) => {
  tg.getColumn(i + 1).width = w;
});

// Sequence calendar helper
const seq = wb.addWorksheet("Sequence Calendar");
[
  "Date Sent",
  "Contact",
  "Sequence (1-6)",
  "Day 0 done",
  "Day 7 due",
  "Day 7 done",
  "Day 21 due",
  "Day 21 done",
  "Status",
].forEach((h, i) => {
  const cell = seq.getCell(1, i + 1);
  cell.value = h;
  cell.fill = headerFill;
  cell.font = headerFont;
});
// Example formulas: Day 7 = Date+7, Day 21 = Date+21
seq.getCell(2, 1).value = new Date().toISOString().slice(0, 10);
seq.getCell(2, 1).font = blueFont;
seq.getCell(2, 1).fill = yellowFill;
seq.getCell(2, 3).value = 1;
seq.getCell(2, 3).font = blueFont;
seq.getCell(2, 3).fill = yellowFill;
seq.getCell(2, 4).value = "Y";
seq.getCell(2, 5).value = { formula: "A2+7" };
seq.getCell(2, 5).numFmt = "yyyy-mm-dd";
seq.getCell(2, 7).value = { formula: "A2+21" };
seq.getCell(2, 7).numFmt = "yyyy-mm-dd";
seq.getCell(2, 9).value = "In sequence";
seq.getCell(2, 9).font = blueFont;
for (let r = 3; r <= 50; r++) {
  seq.getCell(r, 1).font = blueFont;
  seq.getCell(r, 1).fill = yellowFill;
  seq.getCell(r, 5).value = { formula: `IF(A${r}="","",A${r}+7)` };
  seq.getCell(r, 5).numFmt = "yyyy-mm-dd";
  seq.getCell(r, 7).value = { formula: `IF(A${r}="","",A${r}+21)` };
  seq.getCell(r, 7).numFmt = "yyyy-mm-dd";
  for (let c = 1; c <= 9; c++) seq.getCell(r, c).border = border;
}
[12, 18, 14, 12, 12, 12, 12, 12, 14].forEach((w, i) => {
  seq.getColumn(i + 1).width = w;
});
seq.getCell("A52").value =
  "Sequences 1–6 full email copy: docs/EMAIL-OUTREACH-SEQUENCES.md";
seq.getCell("A52").font = { name: "Arial", italic: true, size: 10 };

// Instructions
const ins = wb.addWorksheet("Instructions");
ins.getCell("A1").value = "How to use this tracker";
ins.getCell("A1").font = {
  name: "Arial",
  bold: true,
  size: 14,
  color: { argb: "FF7E22CE" },
};
[
  "1. Set weekly targets on Dashboard (yellow cells).",
  "2. Log every outreach on Outreach Log. Status: To Send → Sent → Replied / Linked / Rejected / No Reply.",
  "3. Template A–F maps to docs/BACKLINK-OUTREACH.md.",
  "4. Full Day 0 / 7 / 21 email copy: docs/EMAIL-OUTREACH-SEQUENCES.md",
  "5. Use Sequence Calendar sheet to auto-calc Day 7 and Day 21 due dates.",
  "6. Follow-up day 7 and day 21 only — then stop.",
  "7. When live, Status=Linked + paste Live Backlink URL.",
  "8. Blue text = inputs. Green Dashboard cells = formulas.",
  "9. Embed badges: https://www.youtubetoolshub.com/resources/link-to-us",
  "10. After deploy: npm run deploy:post (IndexNow + smoke checks).",
  "11. Aim for 8–20 real referring domains/month — quality over spam.",
  "12. Do not buy PBNs or fake reviews (AdSense risk).",
].forEach((s, i) => {
  ins.getCell(3 + i, 1).value = s;
  ins.getCell(3 + i, 1).font = { name: "Arial", size: 11 };
});
ins.getColumn(1).width = 110;

if (!fs.existsSync("outputs")) fs.mkdirSync("outputs");
const xlsxPath = path.join(
  "outputs",
  "youtubetoolshub_backlink_outreach_tracker.xlsx",
);
await wb.xlsx.writeFile(xlsxPath);
console.log("Wrote", xlsxPath);

const escape = (v) => `"${String(v).replace(/"/g, '""')}"`;
const csv = [headers.map(escape).join(",")]
  .concat(samples.map((r) => r.map(escape).join(",")))
  .join("\n");
const csvPath = path.join(
  "outputs",
  "youtubetoolshub_backlink_outreach_tracker.csv",
);
fs.writeFileSync(csvPath, csv, "utf8");
console.log("Wrote", csvPath);
