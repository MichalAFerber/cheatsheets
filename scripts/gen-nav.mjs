#!/usr/bin/env node
// Regenerates the sidebar navigation (_data/toc.yml) and the home page
// (index.md) from the front matter of the pages in _docs/. Run this after
// adding or renaming a cheatsheet:  node scripts/gen-nav.mjs

import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const docsDir = join(root, "_docs");

// Category display order in the sidebar and on the home page.
const CATEGORY_ORDER = ["Shell & CLI", "Editors", "DevOps", "Languages & Data", "macOS"];

const yamlStr = (s) => `"${String(s).replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
const field = (fm, key) => (fm.match(new RegExp(`^${key}:\\s*"?(.*?)"?\\s*$`, "m")) || [])[1] || "";

const items = readdirSync(docsDir)
  .filter((f) => f.endsWith(".md"))
  .map((file) => {
    const fm = (readFileSync(join(docsDir, file), "utf8").match(/^---\n([\s\S]*?)\n---/) || [])[1] || "";
    return {
      slug: file.replace(/\.md$/, ""),
      title: field(fm, "title"),
      description: field(fm, "description"),
      category: field(fm, "category") || "Other",
    };
  });

const byCat = (cat) => items.filter((i) => i.category === cat).sort((a, b) => a.title.localeCompare(b.title));
const categories = [...CATEGORY_ORDER, ...new Set(items.map((i) => i.category))].filter(
  (c, i, a) => a.indexOf(c) === i && byCat(c).length,
);

// --- _data/toc.yml (theme prepends baseurl + '/', so urls have NO leading slash)
const toc = [
  "# Sidebar navigation for the mkdocs-jekyll theme.",
  "# The theme prepends site.baseurl + '/', so urls here have NO leading slash.",
  "# Regenerate with: node scripts/gen-nav.mjs",
  "",
];
for (const cat of categories) {
  toc.push(`- title: ${cat}`, "  children:");
  for (const i of byCat(cat)) toc.push(`    - title: ${yamlStr(i.title)}`, `      url: docs/${i.slug}/`);
}
writeFileSync(join(root, "_data", "toc.yml"), toc.join("\n") + "\n");

// --- index.md (home page; relative_url keeps links correct under baseurl)
const idx = [
  "---",
  "title: Cheatsheets",
  "layout: page",
  "permalink: /",
  "---",
  "",
  "# Cheatsheets",
  "",
  "A growing collection of clean, printable developer cheatsheets. Every one is",
  "**privacy-first** — no cookies, no ad trackers, just the reference. Pick a topic",
  "from the sidebar, or browse below. Each sheet is also available as a **PDF** download.",
  "",
];
for (const cat of categories) {
  idx.push(`## ${cat}`, "");
  for (const i of byCat(cat)) idx.push(`- **[${i.title}]({{ '/docs/${i.slug}/' | relative_url }})** — ${i.description}`);
  idx.push("");
}
writeFileSync(join(root, "index.md"), idx.join("\n"));

console.log(`Wrote _data/toc.yml and index.md from ${items.length} pages in _docs/.`);
