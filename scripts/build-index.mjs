#!/usr/bin/env node
// Generates site/index.html — one card per cheatsheet, grouping every file that
// shares a basename (e.g. markdown-cheatsheet.html / .md / .pdf) into a single
// card with a View button plus a download button per available format.
// Run automatically by the GitHub Pages workflow on each deploy, so adding a
// cheatsheet never requires editing the index by hand. Preview locally with:
//   node scripts/build-index.mjs

import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { dirname, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const siteDir = resolve(__dirname, "..", "site");

const REPO_URL = "https://github.com/MichalAFerber/cheatsheets";
const LICENSE_URL = `${REPO_URL}/blob/main/LICENSE`;

// Files that are never listed, regardless of where they live.
const EXCLUDED = new Set(["index.html", "readme.md", "license"]);

const HTML_EXTS = new Set(["html", "htm"]);

// --- File-type logos (inline SVG, so the page stays self-contained) ----------
const ICON_PDF = `<svg class="ico ico-pdf" viewBox="0 0 24 24" aria-hidden="true"><path fill="#e23a3a" d="M7 2h8l5 5v13a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"/><path fill="#9b1c1c" d="M15 2l5 5h-4a1 1 0 0 1-1-1V2z"/><text x="10.8" y="18.4" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="6.6" font-weight="700" fill="#fff">PDF</text></svg>`;
const ICON_MD = `<svg class="ico ico-md" viewBox="0 0 208 128" aria-hidden="true"><rect x="5" y="5" width="198" height="118" rx="12" ry="12" fill="none" stroke="currentColor" stroke-width="14"/><path fill="currentColor" d="M30 98V30h20l20 25 20-25h20v68H90V59L70 84 50 59v39zm125 0l-30-33h20V30h20v35h20z"/></svg>`;
const ICON_HTML = `<svg class="ico ico-html" viewBox="0 0 384 512" aria-hidden="true"><path fill="#e44d26" d="M0 32l34.9 395.8L191.5 480l157.6-52.2L384 32H0z"/><path fill="#f16529" d="M192 442.7l127.4-42.2 29.8-334.3H192z"/><path fill="#ebebeb" d="M192 233.2h-64l-4.4-49.5H192V135H68.9l1.2 13.4 12.1 135.5H192zm0 128.1l-.4.1-53.7-14.5-3.4-38.5H85.7l6.8 76 99.1 27.5.4-.1z"/><path fill="#fff" d="M191.8 233.2v49.5h59.5l-5.6 62.7-53.9 14.5v51.5l99.2-27.5.7-8.1 11.4-127.5 1.2-13.1zm0-98.2v49.5h118.7l1-11 2.2-25.1 1.2-13.4z"/></svg>`;
const ICON_FILE = `<svg class="ico ico-file" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M7 2h8l5 5v13a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm7 1.5V8h4.5z"/></svg>`;
const ICON_VIEW = `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>`;

// Normalized type -> label + icon. Download buttons render in this order.
const FORMAT_META = {
  pdf: { label: "PDF", icon: ICON_PDF },
  md: { label: "MD", icon: ICON_MD },
  html: { label: "HTML", icon: ICON_HTML },
};
const DOWNLOAD_ORDER = ["pdf", "md", "html"];

const normType = (ext) => (HTML_EXTS.has(ext) ? "html" : ext);
const metaFor = (type) => FORMAT_META[type] ?? { label: (type || "file").toUpperCase(), icon: ICON_FILE };

// --- Small HTML helpers ------------------------------------------------------
const ENTITIES = {
  "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"',
  "&#39;": "'", "&apos;": "'", "&mdash;": "—", "&ndash;": "–",
};
const decodeEntities = (s) => s.replace(/&[a-z#0-9]+;/gi, (m) => ENTITIES[m.toLowerCase()] ?? m);
const escapeHtml = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const titleCase = (s) => s.replace(/\b\w/g, (c) => c.toUpperCase());

function humanSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  const units = ["KB", "MB", "GB"];
  let value = bytes / 1024, unit = 0;
  while (value >= 1024 && unit < units.length - 1) { value /= 1024; unit += 1; }
  return `${value.toFixed(value < 10 ? 1 : 0)} ${units[unit]}`;
}

const firstMatch = (html, re) => { const m = html.match(re); return m ? m[1].trim() : null; };

function extractMeta(html, name) {
  const re = new RegExp(`<meta[^>]*name=["']${name}["'][^>]*content=["']([^"']*)["']`, "i");
  const alt = new RegExp(`<meta[^>]*content=["']([^"']*)["'][^>]*name=["']${name}["']`, "i");
  return firstMatch(html, re) ?? firstMatch(html, alt);
}

// Split "Name — Tagline" style titles into their two halves.
function splitTitle(title) {
  for (const sep of [" — ", " – ", " | ", " - ", "—", "–"]) {
    const idx = title.indexOf(sep);
    if (idx > 0) return { name: title.slice(0, idx).trim(), tagline: title.slice(idx + sep.length).trim() };
  }
  return { name: title.trim(), tagline: null };
}

// --- Group files by basename into one cheatsheet each ------------------------
const groups = new Map(); // stem -> Map(normType -> { file, size })
for (const file of readdirSync(siteDir)) {
  if (file.startsWith(".")) continue;
  if (EXCLUDED.has(file.toLowerCase())) continue;
  if (!statSync(join(siteDir, file)).isFile()) continue;

  const ext = extname(file).toLowerCase().slice(1);
  const stem = ext ? file.slice(0, -(ext.length + 1)) : file;
  if (!groups.has(stem)) groups.set(stem, new Map());
  const bytes = statSync(join(siteDir, file)).size;
  groups.get(stem).set(normType(ext), { file, size: humanSize(bytes) });
}

function buildCard(stem, formats) {
  const htmlEntry = formats.get("html");
  const viewEntry = htmlEntry ?? formats.get("pdf") ?? formats.get("md") ?? [...formats.values()][0];

  let name = titleCase(stem.replace(/[-_]+/g, " "));
  let tagline = null;
  if (htmlEntry) {
    const html = readFileSync(join(siteDir, htmlEntry.file), "utf8");
    const rawTitle = firstMatch(html, /<title[^>]*>([\s\S]*?)<\/title>/i);
    const description = extractMeta(html, "description");
    if (rawTitle) {
      const split = splitTitle(decodeEntities(rawTitle));
      name = split.name;
      tagline = description ?? split.tagline;
    }
  }

  const orderedTypes = [
    ...DOWNLOAD_ORDER.filter((t) => formats.has(t)),
    ...[...formats.keys()].filter((t) => !DOWNLOAD_ORDER.includes(t)).sort(),
  ];
  const downloads = orderedTypes
    .map((type) => {
      const entry = formats.get(type);
      const meta = metaFor(type);
      return `            <a class="btn btn-file" href="./${escapeHtml(entry.file)}" download title="Download ${meta.label} — ${entry.size}">${meta.icon}<span>${meta.label}</span></a>`;
    })
    .join("\n");

  const taglineHtml = tagline ? `\n          <p class="card-tagline">${escapeHtml(tagline)}</p>` : "";

  const markup = `      <li class="card">
        <h2 class="card-title">${escapeHtml(name)}</h2>${taglineHtml}
        <div class="card-actions">
          <a class="btn btn-primary" href="./${escapeHtml(viewEntry.file)}">${ICON_VIEW}<span>View cheatsheet</span></a>
          <div class="downloads">
            <span class="dl-label">Download</span>
${downloads}
          </div>
        </div>
      </li>`;

  return { name, markup };
}

const cardData = [...groups.entries()]
  .map(([stem, formats]) => buildCard(stem, formats))
  .sort((a, b) => a.name.localeCompare(b.name));

const cards =
  cardData.length === 0
    ? `      <li class="empty">No cheatsheets yet. Drop an <code>.html</code> file (optionally with <code>.md</code> / <code>.pdf</code> siblings) into <code>site/</code> and it will appear here.</li>`
    : cardData.map((c) => c.markup).join("\n");

const count = cardData.length;
const countLabel = `${count} ${count === 1 ? "cheatsheet" : "cheatsheets"}`;

// Official GitHub mark (Octocat), inlined so the page stays self-contained.
const OCTOCAT = `<svg viewBox="0 0 16 16" width="30" height="30" aria-hidden="true" focusable="false"><path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>`;

const html = `<!DOCTYPE html>
<!-- Auto-generated by scripts/build-index.mjs. Do not edit by hand; edit the script instead. -->
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Cheatsheets — Clean, privacy-first developer references</title>
<meta name="description" content="A growing collection of clean, privacy-first, printable developer cheatsheets.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700;800&display=swap" rel="stylesheet">
<style>
  :root{
    --bg:#0A0A0B;          /* Cod Gray */
    --surface:#18181C;     /* Vulcan */
    --surface-hover:#202028;
    --head:#ffffff;
    --ink:#f4f4f6;
    --ink-soft:#9a9aa6;
    --line:#26262c;
    --accent:#4F39F6;      /* Royal Blue */
    --accent-hover:#6350f8;
    --accent-ink:#ffffff;
    --heart:#ff5a7a;
    --mono:'JetBrains Mono', ui-monospace, 'SFMono-Regular', Menlo, Consolas, monospace;
    --sans:'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
  }

  *{box-sizing:border-box;}
  html{scroll-behavior:smooth;}
  body{
    margin:0;
    background:var(--bg);
    color:var(--ink);
    font-family:var(--sans);
    font-size:16px;
    line-height:1.6;
    -webkit-font-smoothing:antialiased;
  }
  /* Royal-blue frame on all four sides of the viewport. */
  body::before{
    content:"";
    position:fixed; inset:0;
    border:4px solid var(--accent);
    pointer-events:none;
    z-index:100;
  }
  ::selection{background:var(--accent); color:var(--accent-ink);}
  a{color:var(--accent); text-decoration:none;}
  a:hover{text-decoration:underline;}
  code{font-family:var(--mono); font-size:0.85em;}

  header.masthead{
    max-width:900px; margin:0 auto; padding:4rem 1.75rem 1.5rem;
  }
  .hero-top{
    display:flex; align-items:flex-start; justify-content:space-between; gap:1.5rem;
  }
  .masthead h1{
    font-family:var(--mono); font-weight:800; font-size:2.4rem;
    margin:0; letter-spacing:-0.02em; color:var(--head);
  }
  .masthead p.lede{
    margin:0.7rem 0 0; font-size:1.05rem; color:var(--ink-soft); max-width:42rem;
  }
  .masthead p.lede strong{color:var(--ink); font-weight:600;}

  .repo-link{
    flex:none; display:inline-flex; align-items:center; justify-content:center;
    width:48px; height:48px; border-radius:10px;
    color:var(--ink); border:1px solid var(--line); background:var(--surface);
    transition:color .15s ease, border-color .15s ease, transform .15s ease;
  }
  .repo-link:hover{color:var(--accent); border-color:var(--accent); transform:translateY(-2px); text-decoration:none;}

  .tags{display:flex; flex-wrap:wrap; gap:0.55rem; margin-top:1.4rem;}
  .tag{
    font-family:var(--mono); font-size:0.72rem; font-weight:700;
    letter-spacing:0.03em;
    background:var(--accent); color:var(--accent-ink);
    border-radius:999px; padding:0.32rem 0.8rem;
    display:inline-flex; align-items:center; gap:0.35rem; white-space:nowrap;
  }
  a.tag{transition:background .15s ease;}
  a.tag:hover{background:var(--accent-hover); text-decoration:none;}

  main{max-width:900px; margin:0 auto; padding:1.25rem 1.75rem 4rem;}
  ul.cards{list-style:none; margin:0; padding:0; display:grid; gap:1rem;}
  @media (min-width:640px){ ul.cards{grid-template-columns:1fr 1fr;} }

  .card{
    display:flex; flex-direction:column;
    background:var(--surface); border:1px solid var(--line); border-radius:12px;
    padding:1.35rem 1.4rem;
    transition:border-color .15s ease;
  }
  .card:hover{border-color:#33333c;}
  .card-title{
    font-family:var(--mono); font-size:1.15rem; font-weight:700; margin:0;
    letter-spacing:-0.01em; color:var(--head);
  }
  .card-tagline{margin:0.55rem 0 0; font-size:0.92rem; color:var(--ink-soft);}

  .card-actions{margin-top:auto; padding-top:1.2rem; display:flex; flex-direction:column; gap:0.85rem;}
  .btn{
    display:inline-flex; align-items:center; gap:0.45rem;
    font-family:var(--sans); font-weight:600; font-size:0.85rem; line-height:1;
    border:1px solid transparent; border-radius:9px; padding:0.6rem 0.95rem;
    cursor:pointer; white-space:nowrap;
    transition:background .15s ease, border-color .15s ease, color .15s ease, transform .15s ease;
  }
  .btn:hover{text-decoration:none;}
  .btn .ico{width:16px; height:16px; flex:none; display:block;}
  .btn-primary{
    align-self:flex-start; background:var(--accent); color:var(--accent-ink);
  }
  .btn-primary:hover{background:var(--accent-hover); transform:translateY(-1px);}

  .downloads{display:flex; align-items:center; flex-wrap:wrap; gap:0.5rem;}
  .dl-label{
    font-family:var(--mono); font-size:0.66rem; font-weight:700; letter-spacing:0.09em;
    text-transform:uppercase; color:var(--ink-soft); margin-right:0.1rem;
  }
  .btn-file{
    background:var(--bg); color:var(--ink); border-color:var(--line);
    font-family:var(--mono); font-size:0.74rem; font-weight:700;
    padding:0.42rem 0.7rem; gap:0.4rem;
  }
  .btn-file:hover{border-color:var(--accent); color:var(--head); transform:translateY(-1px);}
  .btn-file .ico{width:auto; height:15px;}
  .btn-file .ico-md{color:var(--ink);}
  .btn-file:hover .ico-md{color:var(--head);}

  .empty{
    list-style:none; color:var(--ink-soft); font-size:1rem;
    background:var(--surface); border:1px solid var(--line); border-radius:12px;
    padding:1.35rem 1.4rem;
  }

  footer{
    max-width:900px; margin:0 auto; padding:2rem 1.75rem 3rem;
    border-top:1px solid var(--line);
    font-size:0.9rem; color:var(--ink-soft);
  }
  footer .heart{color:var(--heart);}
  footer a{color:var(--accent); font-weight:500;}
</style>
</head>
<body>
<header class="masthead">
  <div class="hero-top">
    <div>
      <h1>Cheatsheets</h1>
      <p class="lede">A growing collection of clean, printable developer references. Every one is <strong>privacy-first</strong> — no trackers, no analytics, just the reference.</p>
    </div>
    <a class="repo-link" href="${REPO_URL}" aria-label="View source on GitHub" title="View source on GitHub">${OCTOCAT}</a>
  </div>
  <div class="tags">
    <span class="tag">${countLabel}</span>
    <span class="tag">Privacy-first</span>
    <a class="tag" href="${LICENSE_URL}">MIT Licensed</a>
  </div>
</header>
<main>
  <ul class="cards">
${cards}
  </ul>
</main>
<footer>
  <p>&copy; 2026 &nbsp;|&nbsp; Created with <span class="heart">&#10084;&#65039;</span> by <a href="https://michalferber.dev/">Michal Ferber</a>, aka <a href="https://techguywithabeard.com/">TechGuyWithABeard</a></p>
</footer>
</body>
</html>
`;

writeFileSync(join(siteDir, "index.html"), html);
console.log(`Generated site/index.html with ${count} cheatsheet card${count === 1 ? "" : "s"}.`);
