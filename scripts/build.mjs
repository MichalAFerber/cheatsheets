#!/usr/bin/env node
// Cheatsheet generator.
//
// Each sheet is authored once as a structured content module in content/<slug>.js
// (export default { title, tagline, intro, legend?, sections:[...] }). This script
// renders each one into the shared light-theme template used across the site
// (masthead + auto TOC + search + command tables / recipes / callouts) as
// site/<slug>.html, and emits a clean site/<slug>.md for the download button.
// It then rebuilds site/index.html via build-index.mjs.
//
// PDFs are generated separately (headless Chromium) and committed; see README.
// Run locally to preview:  node scripts/build.mjs

import { existsSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const siteDir = join(root, "site");
const contentDir = join(root, "content");

const REPO_URL = "https://github.com/MichalAFerber/cheatsheets";

// --- helpers -----------------------------------------------------------------
const escapeHtml = (s) =>
  String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const slugify = (s) =>
  String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

// Strip inline markdown to plain text (for <meta> / index card descriptions).
const plain = (s) =>
  escapeHtml(String(s ?? "")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1"));

// Inline Markdown-ish formatting for prose: `code`, **bold**, *italic*, [t](url).
// Code spans are parked in private-use sentinels so nothing inside them is
// re-processed and so plain digits in prose are never mistaken for placeholders.
function inline(s) {
  if (s == null) return "";
  let t = escapeHtml(s);
  const codes = [];
  t = t.replace(/`([^`]+)`/g, (_, c) => `${codes.push(c) - 1}`);
  t = t.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, txt, url) => `<a href="${url}">${txt}</a>`);
  t = t.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  t = t.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  t = t.replace(/(\d+)/g, (_, i) => `<code>${codes[+i]}</code>`);
  return t;
}

// Dim trailing / full-line comments inside an already-escaped code string.
function dimComments(escapedCode, lang) {
  const token = lang === "sql" ? "--" : "#";
  const trailing = token === "--" ? /( {2,}--.*)$/ : /( {2,}#.*)$/;
  return escapedCode.split("\n").map((line) => {
    const trimmed = line.trimStart();
    if (trimmed.startsWith(token)) {
      const lead = line.slice(0, line.length - trimmed.length);
      return `${lead}<span class="c">${trimmed}</span>`;
    }
    return line.replace(trailing, (m) => `<span class="c">${m}</span>`);
  }).join("\n");
}

// --- block renderers (HTML) --------------------------------------------------
function renderTable(b) {
  const head = b.head ?? ["Command", "Action"];
  const rows = b.rows
    .map(([cmd, desc]) => `          <tr><td class="cmd"><code>${escapeHtml(cmd)}</code></td><td class="desc">${inline(desc)}</td></tr>`)
    .join("\n");
  return `<table class="cmd-table">
        <thead><tr><th>${escapeHtml(head[0])}</th><th>${escapeHtml(head[1])}</th></tr></thead>
        <tbody>
${rows}
        </tbody>
      </table>`;
}

function renderRecipe(b) {
  return `<div class="recipe">
        <div class="recipe-title">${inline(b.title)}</div>
        <pre>${dimComments(escapeHtml(String(b.code).replace(/\n+$/, "")), b.lang)}</pre>
      </div>`;
}

function renderCodeblock(b) {
  return `<div class="codeblock"><pre>${dimComments(escapeHtml(String(b.code).replace(/\n+$/, "")), b.lang)}</pre></div>`;
}

function renderCallout(b) {
  const cls = b.variant === "tip" ? " tip" : b.variant === "danger" ? " danger" : "";
  const icon = b.variant === "tip" ? "\u{1F4A1}" : "⚠️";
  const strong = b.title ? `<strong>${inline(b.title)}</strong> ` : "";
  return `<div class="callout${cls}"><span class="icon">${icon}</span><p>${strong}${inline(b.body)}</p></div>`;
}

function renderBlock(b) {
  switch (b.type) {
    case "table": return renderTable(b);
    case "recipe": return renderRecipe(b);
    case "code": return renderCodeblock(b);
    case "callout": return renderCallout(b);
    default: throw new Error(`Unknown block type: ${b.type}`);
  }
}

function renderSection(sec) {
  const id = sec.id ?? slugify(sec.heading);
  const variant = sec.variant ? ` ${sec.variant}` : "";
  const badge = sec.badge ? `<span class="badge badge-${sec.badge.class}">${escapeHtml(sec.badge.label)}</span>` : "";
  const note = sec.note ? `\n      <p class="section-note">${inline(sec.note)}</p>` : "";
  const keywords = escapeHtml(String(sec.keywords ?? sec.heading).toLowerCase());
  const blocks = sec.blocks.map(renderBlock).join("\n      ");
  return `    <section class="section" id="${id}" data-title="${keywords}">
      <div class="section-head${variant}"><h2>${escapeHtml(sec.heading)}</h2>${badge}</div>${note}
      ${blocks}
    </section>`;
}

// --- shared stylesheet (kept identical to the site's cheatsheet family) -------
const CSS = `  :root{
    --bg:#ffffff;
    --surface:#f6f8fa;
    --ink:#0d1117;
    --ink-soft:#57606a;
    --line:#d0d7de;
    --accent:#0969da;
    --accent-soft:#ddf4ff;
    --core-bg:#eaeef2;
    --core-ink:#424a53;
    --warn-bg:#fff8c5;
    --warn-ink:#9a6700;
    --danger-bg:#ffebe9;
    --danger-ink:#cf222e;
    --danger-line:#ffcecb;
    --mono:'JetBrains Mono', ui-monospace, 'SFMono-Regular', Menlo, Consolas, monospace;
    --sans:'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
  }
  *{box-sizing:border-box;}
  html{scroll-behavior:smooth;}
  body{margin:0; background:var(--bg); color:var(--ink); font-family:var(--sans); font-size:16px; line-height:1.6; -webkit-font-smoothing:antialiased;}
  ::selection{background:var(--accent-soft);}
  a{color:var(--accent); text-decoration:none;}
  a:hover{text-decoration:underline;}
  .topbar{height:4px; background:linear-gradient(90deg,var(--accent),#54aeff,var(--accent)); position:sticky; top:0; z-index:40;}
  header.masthead{position:sticky; top:4px; z-index:30; background:rgba(255,255,255,0.92); backdrop-filter:blur(8px); border-bottom:1px solid var(--line); padding:1.1rem 1.5rem;}
  .masthead-inner{max-width:1180px; margin:0 auto; display:flex; align-items:center; justify-content:space-between; gap:1.5rem; flex-wrap:wrap;}
  .brand{display:flex; align-items:baseline; gap:0.75rem; flex-wrap:wrap;}
  .brand h1{font-family:var(--mono); font-weight:800; font-size:1.5rem; margin:0; letter-spacing:-0.02em; color:var(--ink);}
  .brand p{margin:0.15rem 0 0; font-size:0.85rem; color:var(--ink-soft);}
  .brand p code{font-family:var(--mono); background:var(--surface); padding:0.05rem 0.35rem; border-radius:4px; border:1px solid var(--line);}
  .repo-link{font-family:var(--mono); font-size:0.78rem; font-weight:600; color:var(--ink-soft); border:1px solid var(--line); border-radius:6px; padding:0.3rem 0.6rem; white-space:nowrap;}
  .repo-link:hover{color:var(--accent); border-color:var(--accent); text-decoration:none;}
  .search-wrap{position:relative;}
  #search{font-family:var(--sans); font-size:0.9rem; padding:0.6rem 0.9rem 0.6rem 2.2rem; border:1px solid var(--line); border-radius:8px; width:240px; max-width:60vw; background:var(--surface) url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="%2357606a" stroke-width="2"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>') no-repeat 0.75rem center; color:var(--ink);}
  #search:focus{outline:2px solid var(--accent); outline-offset:1px; background-color:#fff;}
  .layout{max-width:1180px; margin:0 auto; display:grid; grid-template-columns:250px 1fr; gap:2.5rem; padding:2rem 1.5rem 5rem;}
  nav.toc{position:sticky; top:5.5rem; align-self:start; max-height:calc(100vh - 7rem); overflow-y:auto;}
  nav.toc .toc-label{font-family:var(--mono); font-size:0.72rem; font-weight:700; letter-spacing:0.08em; text-transform:uppercase; color:var(--ink-soft); margin:0 0 0.75rem;}
  nav.toc ul{list-style:none; margin:0; padding:0; border-left:2px solid var(--line);}
  nav.toc li{margin:0;}
  nav.toc a{display:block; padding:0.4rem 0 0.4rem 0.9rem; margin-left:-2px; border-left:2px solid transparent; font-size:0.87rem; color:var(--ink-soft); font-weight:500;}
  nav.toc a:hover{color:var(--ink); text-decoration:none;}
  nav.toc a.active{color:var(--accent); border-left:2px solid var(--accent); font-weight:600;}
  .jump-mobile{display:none; margin-bottom:1.5rem;}
  .jump-mobile select{width:100%; font-family:var(--mono); font-size:0.85rem; padding:0.7rem; border:1px solid var(--line); border-radius:8px; background:var(--surface); color:var(--ink);}
  main{min-width:0;}
  .intro{margin-bottom:3rem;}
  .intro p{color:var(--ink-soft); max-width:70ch; margin:0.5rem 0;}
  .legend{display:flex; flex-wrap:wrap; gap:0.6rem; margin-top:1.2rem;}
  .legend-item{display:flex; align-items:center; gap:0.5rem; font-size:0.82rem; color:var(--ink-soft);}
  .badge{display:inline-block; font-family:var(--mono); font-size:0.68rem; font-weight:700; letter-spacing:0.04em; text-transform:uppercase; padding:0.2rem 0.5rem; border-radius:20px; vertical-align:middle; white-space:nowrap;}
  .badge-core{background:var(--core-bg); color:var(--core-ink);}
  .badge-gfm{background:var(--accent-soft); color:var(--accent);}
  .badge-web{background:var(--warn-bg); color:var(--warn-ink);}
  .badge-danger{background:var(--danger-bg); color:var(--danger-ink);}
  section.section{padding-top:5.5rem; margin-top:-5.5rem; margin-bottom:3.5rem; border-bottom:1px solid var(--line); padding-bottom:2.5rem;}
  section.section:last-child{border-bottom:none;}
  .section-head{display:flex; align-items:center; gap:0.7rem; flex-wrap:wrap; border-left:5px solid var(--accent); padding-left:0.9rem; margin-bottom:0.6rem;}
  .section-head.core{border-left-color:var(--core-ink);}
  .section-head.web{border-left-color:var(--warn-ink);}
  .section-head.danger{border-left-color:var(--danger-ink);}
  h2{font-family:var(--mono); font-weight:800; font-size:1.65rem; text-transform:uppercase; letter-spacing:0.01em; margin:0; color:var(--ink);}
  .section-note{color:var(--ink-soft); max-width:72ch; margin:0.3rem 0 1.5rem; font-size:0.95rem;}
  .section-note code{font-family:var(--mono); background:var(--surface); padding:0.05rem 0.35rem; border-radius:4px; border:1px solid var(--line); font-size:0.88em;}
  table.cmd-table{width:100%; border-collapse:collapse; margin-bottom:1.4rem; font-size:0.9rem;}
  table.cmd-table th,table.cmd-table td{border:1px solid var(--line); padding:0.55rem 0.8rem; text-align:left; vertical-align:top;}
  table.cmd-table th{background:var(--surface); font-family:var(--mono); font-size:0.72rem; text-transform:uppercase; letter-spacing:0.04em; color:var(--ink-soft);}
  table.cmd-table td.cmd{font-family:var(--mono); font-size:0.85rem; white-space:nowrap; color:var(--ink); background:var(--surface);}
  table.cmd-table td.desc{color:var(--ink-soft); width:60%;}
  table.cmd-table tr:hover td{background:var(--accent-soft);}
  table.cmd-table tr:hover td.cmd{background:var(--accent-soft);}
  .recipe{margin-bottom:1.4rem; border:1px solid var(--line); border-radius:8px; overflow:hidden;}
  .recipe-title{font-family:var(--sans); font-weight:600; font-size:0.9rem; color:var(--ink); background:var(--surface); padding:0.6rem 1rem; border-bottom:1px solid var(--line);}
  .recipe pre{margin:0; padding:1rem 1.1rem; font-family:var(--mono); font-size:0.85rem; overflow-x:auto; background:var(--bg); color:var(--ink);}
  .recipe pre .c{color:var(--ink-soft);}
  .codeblock{border:1px solid var(--line); border-radius:8px; background:var(--surface); padding:1rem 1.1rem; margin-bottom:1.1rem; overflow-x:auto;}
  .codeblock pre{margin:0; font-family:var(--mono); font-size:0.85rem; color:var(--ink);}
  .codeblock pre .c{color:var(--ink-soft);}
  .callout{display:flex; gap:0.8rem; border:1px solid var(--warn-ink); border-left:4px solid var(--warn-ink); background:var(--warn-bg); border-radius:6px; padding:0.9rem 1.1rem; margin-bottom:0.9rem;}
  .callout .icon{font-size:1.1rem; line-height:1.4;}
  .callout strong{color:var(--ink);}
  .callout p{margin:0; color:var(--ink); font-size:0.9rem;}
  .callout code{font-family:var(--mono); background:rgba(255,255,255,0.6); padding:0.05rem 0.35rem; border-radius:4px; font-size:0.88em;}
  .callout.tip{border-color:var(--accent); border-left-color:var(--accent); background:var(--accent-soft);}
  .callout.danger{border-color:var(--danger-ink); border-left-color:var(--danger-ink); background:var(--danger-bg);}
  @media (max-width:900px){
    .layout{grid-template-columns:1fr; padding-top:1.5rem;}
    nav.toc{display:none;}
    .jump-mobile{display:block;}
    table.cmd-table{font-size:0.82rem;}
    table.cmd-table td.cmd{white-space:normal;}
    .masthead-inner{flex-direction:column; align-items:flex-start;}
    .search-wrap{width:100%;}
    #search{width:100%; max-width:none;}
  }
  footer{border-top:1px solid var(--line); padding:2.2rem 1.5rem; text-align:center; font-family:var(--sans); font-size:0.85rem; color:var(--ink-soft);}
  footer a{color:var(--accent); font-weight:600;}
  @media (prefers-reduced-motion:reduce){ html{scroll-behavior:auto;} }`;

const PAGE_JS = `  const searchInput = document.getElementById('search');
  const sections = document.querySelectorAll('section.section');
  searchInput.addEventListener('input', () => {
    const q = searchInput.value.trim().toLowerCase();
    sections.forEach(section => {
      const titleMatch = (section.dataset.title || '').includes(q);
      const headingMatch = section.querySelector('h2').textContent.toLowerCase().includes(q);
      const rows = section.querySelectorAll('tr, .recipe, .codeblock, .callout');
      let anyVisible = q === '';
      rows.forEach(row => {
        const rowMatch = q === '' || row.textContent.toLowerCase().includes(q);
        if (row.tagName === 'TR' && row.closest('thead')) return;
        row.style.display = rowMatch ? '' : 'none';
        if (rowMatch) anyVisible = true;
      });
      const show = q === '' || titleMatch || headingMatch || anyVisible;
      section.style.display = show ? '' : 'none';
      if (show && q !== '' && (titleMatch || headingMatch)) rows.forEach(row => row.style.display = '');
    });
  });
  const jump = document.getElementById('jump');
  if (jump) jump.addEventListener('change', function () {
    const target = document.getElementById(this.value);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
  const tocLinks = document.querySelectorAll('nav.toc a');
  const linkByHash = {};
  tocLinks.forEach(link => linkByHash[link.getAttribute('href').slice(1)] = link);
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const link = linkByHash[entry.target.id];
      if (!link) return;
      if (entry.isIntersecting) { tocLinks.forEach(l => l.classList.remove('active')); link.classList.add('active'); }
    });
  }, { rootMargin: '-15% 0px -70% 0px', threshold: 0 });
  sections.forEach(s => observer.observe(s));`;

function renderPage(sheet) {
  const sections = sheet.sections.map((s) => ({ ...s, id: s.id ?? slugify(s.heading) }));
  const toc = sections.map((s) => `      <li><a href="#${s.id}">${escapeHtml(s.heading)}</a></li>`).join("\n");
  const jump = sections.map((s) => `        <option value="${s.id}">${escapeHtml(s.heading)}</option>`).join("\n");
  const legend = sheet.legend
    ? `\n      <div class="legend">\n${sheet.legend.map((l) => `        <div class="legend-item"><span class="badge badge-${l.class}">${escapeHtml(l.label)}</span> ${inline(l.desc)}</div>`).join("\n")}\n      </div>`
    : "";
  const intro = (sheet.intro || sheet.legend)
    ? `    <div class="intro">\n      ${sheet.intro ? `<p>${inline(sheet.intro)}</p>` : ""}${legend}\n    </div>\n\n`
    : "";
  const body = sections.map(renderSection).join("\n\n");

  return `<!DOCTYPE html>
<!-- Auto-generated by scripts/build.mjs from content/${sheet.slug}.js. Do not edit by hand. -->
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${escapeHtml(sheet.title)} — TechGuyWithABeard</title>
<meta name="description" content="${plain(sheet.tagline)}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700;800&display=swap" rel="stylesheet">
<style>
${CSS}
</style>
</head>
<body>

<div class="topbar"></div>

<header class="masthead">
  <div class="masthead-inner">
    <div class="brand">
      <h1>${escapeHtml(sheet.title)}</h1>
      <p>${inline(sheet.tagline)}</p>
    </div>
    <a class="repo-link" href="${REPO_URL}" target="_blank" rel="noopener">GitHub ↗</a>
    <div class="search-wrap">
      <input id="search" type="text" placeholder="Filter…" autocomplete="off">
    </div>
  </div>
</header>

<div class="layout">

  <nav class="toc" aria-label="Table of contents">
    <p class="toc-label">On this page</p>
    <ul id="toc-list">
${toc}
    </ul>
  </nav>

  <main>

    <div class="jump-mobile">
      <select id="jump" aria-label="Jump to section">
${jump}
      </select>
    </div>

${intro}${body}

  </main>
</div>

<footer>
  © 2026 | Created with ❤️ by <a href="https://michalferber.dev/" target="_blank" rel="noopener">Michal Ferber</a>, aka <a href="https://techguywithabeard.com/" target="_blank" rel="noopener">TechGuyWithABeard</a>
</footer>

<script>
${PAGE_JS}
</script>

</body>
</html>
`;
}

// --- Markdown emitter (for the download button) ------------------------------
function toMarkdown(sheet) {
  const out = ["---", `title: "${sheet.title}"`, `tagline: "${sheet.tagline}"`, "---", "", `# ${sheet.title}`, ""];
  if (sheet.intro) out.push(sheet.intro, "");
  for (const sec of sheet.sections) {
    out.push(`## ${sec.heading}`, "");
    if (sec.note) out.push(sec.note, "");
    for (const b of sec.blocks) {
      if (b.type === "table") {
        const head = b.head ?? ["Command", "Action"];
        out.push(`| ${head[0]} | ${head[1]} |`, `| --- | --- |`);
        for (const [cmd, desc] of b.rows) out.push(`| \`${cmd}\` | ${desc} |`);
        out.push("");
      } else if (b.type === "recipe") {
        out.push(`**${b.title}**`, "", "```" + (b.lang ?? ""), String(b.code).replace(/\n+$/, ""), "```", "");
      } else if (b.type === "code") {
        out.push("```" + (b.lang ?? ""), String(b.code).replace(/\n+$/, ""), "```", "");
      } else if (b.type === "callout") {
        out.push(`> ${b.title ? `**${b.title}** ` : ""}${b.body}`, "");
      }
    }
  }
  out.push("---", "", "© 2026 | Created with ❤️ by [Michal Ferber](https://michalferber.dev/), aka [TechGuyWithABeard](https://techguywithabeard.com/)", "");
  return out.join("\n");
}

// --- main --------------------------------------------------------------------
let built = 0;
if (existsSync(contentDir)) {
  const files = readdirSync(contentDir).filter((f) => f.endsWith(".js")).sort();
  for (const file of files) {
    const slug = file.replace(/\.js$/, "");
    const mod = await import(pathToFileURL(join(contentDir, file)).href);
    const sheet = { ...mod.default, slug };
    if (!sheet.title || !sheet.sections) { console.warn(`Skipping ${file}: missing title/sections`); continue; }
    writeFileSync(join(siteDir, `${slug}.html`), renderPage(sheet));
    writeFileSync(join(siteDir, `${slug}.md`), toMarkdown(sheet));
    built += 1;
  }
}
console.log(`Rendered ${built} cheatsheet${built === 1 ? "" : "s"} from content/.`);

// Rebuild the index (build-index.mjs runs its work on import).
await import("./build-index.mjs");
