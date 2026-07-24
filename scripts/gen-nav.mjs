#!/usr/bin/env node
// Regenerates the MkDocs navigation (the `nav:` block in mkdocs.yml) and the
// home page (docs/index.md) from the front matter of the pages in docs/. Run
// this after adding or renaming a cheatsheet:  node scripts/gen-nav.mjs

import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const docsDir = join(root, "docs");

// Category display order in the sidebar and on the home page.
const CATEGORY_ORDER = ["Shell & CLI", "Editors", "DevOps", "Languages & Data", "macOS"];

const yamlStr = (s) => `"${String(s).replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
const field = (fm, key) => (fm.match(new RegExp(`^${key}:\\s*"?(.*?)"?\\s*$`, "m")) || [])[1] || "";

const items = readdirSync(docsDir)
  .filter((f) => f.endsWith(".md") && f !== "index.md")
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

// --- mkdocs.yml `nav:` block (nav is the last key; replace it to EOF). ---
const nav = ["nav:", "  - Home: index.md"];
for (const cat of categories) {
  nav.push(`  - ${yamlStr(cat)}:`);
  for (const i of byCat(cat)) nav.push(`      - ${yamlStr(i.title)}: ${i.slug}.md`);
}
const mkdocsPath = join(root, "mkdocs.yml");
const cfg = readFileSync(mkdocsPath, "utf8").replace(/\n?nav:\n[\s\S]*$/, "\n" + nav.join("\n") + "\n");
writeFileSync(mkdocsPath, cfg);

// --- docs/index.md (home page; MkDocs-relative links). ---
const idx = [
  "# Cheatsheets",
  "",
  "A growing collection of clean, printable developer cheatsheets. Every one is",
  "**privacy-first** — no cookies, no ad trackers, just the reference. Pick a topic",
  "from the sidebar, or browse below. Each sheet is also available as a **PDF** download.",
  "",
];
for (const cat of categories) {
  idx.push(`## ${cat}`, "");
  for (const i of byCat(cat)) idx.push(`- **[${i.title}](${i.slug}.md)** — ${i.description}`);
  idx.push("");
}
writeFileSync(join(docsDir, "index.md"), idx.join("\n"));

console.log(`Wrote mkdocs.yml nav + docs/index.md from ${items.length} pages in docs/.`);
