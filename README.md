# Cheatsheets

A growing collection of clean, printable developer cheatsheets, published as a
static site with GitHub Pages.

**Live site:** https://michalaferber.github.io/cheatsheets/

Each cheatsheet is offered in three formats — view it as a styled web page, or
download the **PDF**, **Markdown**, or **HTML**.

## Repository layout

```
.
├── content/                  # Cheatsheet SOURCES (one structured .js per sheet)
│   ├── linux-commands.js
│   └── …
├── site/                     # Everything published to GitHub Pages
│   ├── index.html            # Generated listing (do not edit by hand)
│   ├── <slug>.html/.md/.pdf  # Each cheatsheet, three formats
│   └── .nojekyll             # Serve files as-is, skip Jekyll
├── scripts/
│   ├── build.mjs             # Renders content/ → site/, then the index
│   └── build-index.mjs       # Builds site/index.html from site/ contents
├── .github/workflows/
│   └── deploy-pages.yml      # Runs the build and deploys site/ to Pages
├── .gitignore                # Excludes local-only reference material
├── LICENSE
└── README.md
```

## How it works

`scripts/build.mjs` reads each source in `content/`, renders it into the shared
cheatsheet template (`site/<slug>.html`), and emits a clean `site/<slug>.md` for
the download button. It then runs `scripts/build-index.mjs`, which scans `site/`
and builds the landing page — one card per cheatsheet, grouping every file that
shares a basename (`.html` / `.md` / `.pdf`) and showing a download button only
for the formats that exist. On every push to `main`, the GitHub Actions workflow
runs the build and redeploys.

## Adding a new cheatsheet

1. Create `content/<slug>.js`:

   ```js
   export default {
     title: "Docker Commands",
     tagline: "Build, run, and clean up containers.",
     intro: "Optional lead paragraph. Supports `code`, **bold**, [links](url).",
     sections: [
       {
         heading: "Everyday",
         variant: "core",              // core | web | danger (accent colour)
         badge: { class: "core", label: "Safe" },   // optional
         note: "Optional one-liner under the heading.",
         blocks: [
           { type: "table", head: ["Command", "Action"], rows: [
             ["docker ps", "list running containers"],
           ]},
           { type: "recipe", title: "Multi-line example", lang: "bash", code: `docker build -t app .` },
           { type: "code", lang: "bash", code: `docker system prune` },
           { type: "callout", variant: "tip", title: "Heads up:", body: "any prose." },
         ],
       },
     ],
   };
   ```

2. Render and preview:

   ```bash
   node scripts/build.mjs
   python3 -m http.server -d site 8000   # http://localhost:8000
   ```

3. (Optional) Generate the PDF so the card gets a PDF button too:

   ```bash
   chromium --headless --no-pdf-header-footer \
     --print-to-pdf=site/<slug>.pdf site/<slug>.html
   ```

4. Commit and push to `main` — the workflow regenerates everything and redeploys.

> Some early sheets (e.g. `git`, `tmux`) are standalone hand-authored HTML in
> `site/` rather than `content/` sources. The index picks them up all the same;
> they can be migrated to `content/` over time.

## Source material (`content` origin)

Some cheatsheets are drafted using third-party sheets as factual reference. Those
source files (folders like `muo/`, `datadog/`, `raspberrytips/`, `redhat/`) are
**git-ignored** — they are copyrighted by their publishers and are never
committed or published. Everything in `site/` is authored from scratch.

## Deployment

Deployment is handled by [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml).

One-time setup: **Settings → Pages → Build and deployment → Source → GitHub
Actions**. After that, every push to `main` publishes automatically.

## License

Released under the [MIT License](LICENSE). © Michal Ferber.
