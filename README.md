# Cheatsheets

A growing collection of clean, printable developer cheatsheets, published as a
static site with GitHub Pages.

**Live site:** https://michalaferber.github.io/cheatsheets/

## Available cheatsheets

- **[Markdown Cheatsheet](site/markdown-cheatsheet.html)** — a GitHub Flavored Markdown reference.

More to come.

## Repository layout

```
.
├── site/                     # Everything published to GitHub Pages
│   ├── index.html            # Auto-generated listing (do not edit by hand)
│   ├── markdown-cheatsheet.html
│   └── .nojekyll             # Serve files as-is, skip Jekyll processing
├── scripts/
│   └── build-index.mjs       # Generates site/index.html from site/ contents
├── .github/workflows/
│   └── deploy-pages.yml       # Builds the index and deploys site/ to Pages
├── LICENSE
└── README.md
```

## How it works

The landing page (`site/index.html`) is **generated**, not hand-written. On every
push to `main`, the GitHub Actions workflow runs `scripts/build-index.mjs`, which
scans `site/` and builds a card for each file it finds — deriving each card's
title from the page's `<title>` tag. `index.html`, `README.md`, `LICENSE`, and
dotfiles are excluded from the listing.

## Adding a new cheatsheet

1. Drop a self-contained `.html` file into `site/`.
2. Give it a descriptive `<title>` (e.g. `Docker Cheatsheet — Everyday Commands`).
   The part before the dash becomes the card title; the part after becomes its
   tagline.
3. Commit and push to `main` — the workflow regenerates the index and redeploys.

That's it. No need to touch `index.html`.

## Previewing locally

Regenerate the index and open the site:

```bash
node scripts/build-index.mjs
# then open site/index.html in a browser, or serve the folder:
python3 -m http.server -d site 8000   # http://localhost:8000
```

## Deployment

Deployment is handled by [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml).

One-time setup: in the repository, go to **Settings → Pages → Build and
deployment → Source** and select **GitHub Actions**. After that, every push to
`main` publishes automatically.

## License

Released under the [MIT License](LICENSE). © Michal Ferber.
