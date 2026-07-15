# Authoring cheatsheets

How to add a cheatsheet to this site and produce its three downloadable versions
(raw **Markdown**, self-contained **HTML**, and **PDF**). Every published sheet is
one source file in `_docs/` plus three generated files in `assets/downloads/`.

- [Quick version](#quick-version)
- [1. Write the page](#1-write-the-page)
  - [Front matter](#front-matter)
  - [Categories](#categories)
  - [Page structure](#page-structure)
  - [Content conventions](#content-conventions)
- [2. Regenerate the navigation](#2-regenerate-the-navigation)
- [3. Generate the downloads](#3-generate-the-downloads)
  - [What each download is](#what-each-download-is)
- [4. Preview locally](#4-preview-locally)
- [Content rules](#content-rules)

---

## Quick version

```bash
# 1. write _docs/<slug>.md  (front matter + body — see below)
# 2. update the sidebar + home page from the docs' front matter
npm run gen:nav
# 3. build the .md / .html / .pdf downloads (needs `npm install` once, + Chromium for PDF)
node scripts/gen-downloads.mjs <slug> --pdf
# 4. preview
bundle exec jekyll serve
```

`<slug>` is the file name without `.md` (e.g. `terminfo-ssh`). Use it consistently:
the page is `_docs/<slug>.md`, the downloads are `assets/downloads/<slug>.{md,html,pdf}`,
and the page references them with `{% include downloads.html slug="<slug>" %}`.

---

## 1. Write the page

Create `_docs/<slug>.md`. It is a document in the `docs` collection and is served
at `/docs/<slug>/`.

### Front matter

```yaml
---
title: "Terminfo & TERM over SSH"
description: "Fix 'Error opening terminal: xterm-ghostty' under sudo and over SSH."
category: "Shell & CLI"
tags: [shell-cli]
---
```

| Field | Required | Notes |
| :-- | :-- | :-- |
| `title` | yes | Shown in the sidebar and on the home-page card. Keep it short. |
| `description` | yes | One line; used as the home-page card blurb. |
| `category` | yes | One of the categories below — controls grouping. |
| `tags` | yes | `[<category-slug>]`, the category lower-cased with `&`→nothing and spaces→`-` (e.g. `Shell & CLI` → `shell-cli`, `Languages & Data` → `languages-data`). |

An empty `title`/`description` leaves a blank card and sidebar entry — always fill them.

### Categories

Group order on the home page and sidebar is fixed in `scripts/gen-nav.mjs`
(`CATEGORY_ORDER`). Current categories:

| `category` value | `tags` slug |
| :-- | :-- |
| `Shell & CLI` | `shell-cli` |
| `Editors` | `editors` |
| `DevOps` | `devops` |
| `Languages & Data` | `languages-data` |
| `macOS` | `macos` |

To add a new category, add it to `CATEGORY_ORDER` in `scripts/gen-nav.mjs`.

### Page structure

Body layout that matches the existing sheets:

```markdown
# Display Title

{% include downloads.html slug="<slug>" %}

A one- or two-sentence intro that frames the topic.

## On This Page

- [Section One](#section-one)
- [Section Two](#section-two)

## Section one

...content...
```

- The **H1** is the display title (it can differ slightly from the front-matter
  `title`) and becomes the `<title>` of the HTML/PDF downloads.
- `{% include downloads.html slug="<slug>" %}` renders the three download pills.
  Put it right after the H1.
- **"On This Page"** links use the same anchors Kramdown generates for the
  headings: lower-case, punctuation dropped, spaces → `-`. An em dash (` — `)
  becomes a **double** hyphen because the spaces around it survive
  (`Quick fix — one-off` → `#quick-fix--one-off`). The download generator uses
  the identical scheme, so the anchors also work inside the standalone HTML.

### Content conventions

- **Reference tables** — two or three columns, e.g. `Command | What it does`.
  Commands go in `` `inline code` ``.
- **Code blocks** — fenced with a language (` ```bash `, ` ```text `) so both the
  site (Rouge) and the downloads (highlight.js) colour them.
- **Callouts** — a `>` blockquote renders as a left-bordered note; use it for the
  one "gotcha" per section.
- Copy buttons, pills, and syntax colours are applied automatically — don't hand-roll them.

---

## 2. Regenerate the navigation

`_data/toc.yml` (sidebar) and `index.md` (home page) are generated from the
front matter of every file in `_docs/`. After adding or renaming a sheet:

```bash
npm run gen:nav        # = node scripts/gen-nav.mjs
```

Don't hand-edit `_data/toc.yml` or `index.md`; they are overwritten.

---

## 3. Generate the downloads

```bash
npm install                                   # once — installs marked + highlight.js
node scripts/gen-downloads.mjs <slug> --pdf   # writes assets/downloads/<slug>.{md,html,pdf}
# or regenerate everything:
node scripts/gen-downloads.mjs --all --pdf
```

The **PDF** step needs a Chromium/Chrome binary. The script checks `CHROME_BIN`
and then common install paths; set `CHROME_BIN=/path/to/chrome` if it can't find one.
Omit `--pdf` to generate just the `.md` and `.html`.

### What each download is

| File | It is… | How it's made |
| :-- | :-- | :-- |
| `<slug>.md` | The page body as plain Markdown | The page with its front matter and the `{% include %}` line stripped. |
| `<slug>.html` | A self-contained, styled page | Markdown → HTML (`marked`) with highlight.js code colouring and heading IDs, dropped into `scripts/download-template.html` (palette CSS + a print stylesheet, no external assets except web fonts). |
| `<slug>.pdf` | A print-ready sheet | Headless Chromium prints the HTML; the template's `@media print` block flattens the card and avoids awkward page breaks. |

The shared look for HTML/PDF lives in **`scripts/download-template.html`**
(`{{TITLE}}` + `{{CONTENT}}` placeholders). Edit it once to restyle every future
download. The palette is Midnight Moss `#00070A`, Chathams Blue `#214D72`, Sepia
Skin `#98643F`, Cape Cod `#404040`, Celeste `#CCCCCC` — the same as the site.

---

## 4. Preview locally

```bash
bundle exec jekyll serve      # http://localhost:4000/cheatsheets/
```

Check: the sheet appears in the sidebar under its category, the three download
pills resolve (`.md` serves raw Markdown, not a rendered page), and the
"On This Page" anchors jump correctly.

---

## Content rules

- **Original content only.** Write cheatsheets from facts and your own words.
  Never copy a third party's text, tables, wording, or layout, and never commit
  or publish their source files.
- Prefer the commands and gotchas you'd actually reach for over exhaustive man-page
  dumps — these are cheatsheets, not manuals.
