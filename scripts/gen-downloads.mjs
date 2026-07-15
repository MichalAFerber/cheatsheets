#!/usr/bin/env node
// Generates the download files for a cheatsheet: the raw Markdown, a self-contained
// HTML file, and (optionally) a PDF printed from that HTML.
//
//   npm install                                  # once, to get marked + highlight.js
//   node scripts/gen-downloads.mjs <slug>        # one sheet: .md + .html
//   node scripts/gen-downloads.mjs <slug> --pdf  # also print the .pdf (needs Chromium)
//   node scripts/gen-downloads.mjs --all [--pdf] # every sheet in _docs/
//
// PDF needs a Chromium/Chrome binary; set CHROME_BIN or it will try common paths.
// See CONTRIBUTING.md for the full authoring + download spec.

import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { marked } = require("marked");
const hljs = require("highlight.js").default || require("highlight.js");

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const docsDir = join(root, "_docs");
const outDir = join(root, "assets", "downloads");
const template = readFileSync(join(root, "scripts", "download-template.html"), "utf8");

const args = process.argv.slice(2);
const wantPdf = args.includes("--pdf");
const slugs = args.includes("--all")
  ? readdirSync(docsDir).filter((f) => f.endsWith(".md")).map((f) => f.replace(/\.md$/, ""))
  : args.filter((a) => !a.startsWith("--"));

if (!slugs.length) {
  console.error("usage: node scripts/gen-downloads.mjs <slug> [--pdf]  |  --all [--pdf]");
  process.exit(1);
}

// kramdown-compatible heading slug, so the "On This Page" anchors resolve in the
// standalone HTML exactly as they do on the site.
const slugify = (s) =>
  s.toLowerCase().replace(/<[^>]+>/g, "").replace(/[^a-z0-9\s-]/g, "").replace(/\s/g, "-");

const decode = (s) =>
  s.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, "&");

function toDownloadMarkdown(docSource) {
  // Strip the YAML front matter and the {% include downloads.html %} line: the raw
  // .md download is exactly the page body a reader would want to keep.
  return docSource
    .replace(/^---\n[\s\S]*?\n---\n+/, "")
    .replace(/\{%\s*include downloads\.html[^%]*%\}\n*/, "")
    .replace(/\n+$/, "\n");
}

function toHtml(md, title) {
  let html = marked.parse(md, { mangle: false, headerIds: false });
  // add ids to headings so in-page anchors work in the standalone file
  html = html.replace(/<(h[1-4])>([\s\S]*?)<\/\1>/g, (_m, tag, inner) => `<${tag} id="${slugify(inner)}">${inner}</${tag}>`);
  // syntax-highlight fenced code blocks with highlight.js (GitHub light theme in the template CSS)
  html = html.replace(/<pre><code class="language-([\w-]+)">([\s\S]*?)<\/code><\/pre>/g, (_m, lang, body) => {
    const code = decode(body).replace(/\n$/, "");
    const language = hljs.getLanguage(lang) ? lang : "plaintext";
    return `<pre><code class="hljs language-${lang}">${hljs.highlight(code, { language }).value}\n</code></pre>`;
  });
  html = html.replace(/<pre><code>([\s\S]*?)<\/code><\/pre>/g, (_m, body) => `<pre><code class="hljs">${body.replace(/\n$/, "")}\n</code></pre>`);
  const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return template.replace("{{TITLE}}", esc(title)).replace("{{CONTENT}}", html);
}

function findChrome() {
  const candidates = [
    process.env.CHROME_BIN,
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
    "/usr/bin/google-chrome",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  ].filter(Boolean);
  return candidates.find((p) => existsSync(p));
}

for (const slug of slugs) {
  const docPath = join(docsDir, `${slug}.md`);
  if (!existsSync(docPath)) {
    console.error(`skip ${slug}: no _docs/${slug}.md`);
    continue;
  }
  const src = readFileSync(docPath, "utf8");
  const md = toDownloadMarkdown(src);
  const title = (md.match(/^#\s+(.+)$/m) || [])[1] || slug;

  writeFileSync(join(outDir, `${slug}.md`), md);
  writeFileSync(join(outDir, `${slug}.html`), toHtml(md, title));
  let line = `${slug}: wrote .md + .html`;

  if (wantPdf) {
    const chrome = findChrome();
    if (!chrome) {
      line += "  (PDF skipped: no Chromium — set CHROME_BIN)";
    } else {
      const htmlPath = join(outDir, `${slug}.html`);
      const pdfPath = join(outDir, `${slug}.pdf`);
      execFileSync(chrome, [
        "--headless", "--no-sandbox", "--disable-gpu", "--no-pdf-header-footer",
        `--print-to-pdf=${pdfPath}`, `file://${htmlPath}`,
      ], { stdio: "ignore" });
      line += " + .pdf";
    }
  }
  console.log(line);
}
