---
title: "Markdown"
description: "GitHub Flavored Markdown — headings, lists, tables, links, code, and the GFM extras."
category: "Languages & Data"
tags: [languages-data]
---
# Markdown Cheatsheet

<p class="dl-pills">
<a class="dl-pill" href="../downloads/markdown-cheatsheet.pdf" title="Download PDF"><svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0 1 13.25 16h-9.5A1.75 1.75 0 0 1 2 14.25Zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h9.5a.25.25 0 0 0 .25-.25V6h-2.75A1.75 1.75 0 0 1 9 4.25V1.5Zm6.75.062V4.25c0 .138.112.25.25.25h2.688l-.011-.013-2.914-2.914-.013-.011Z"/></svg>PDF</a>
<a class="dl-pill" href="../downloads/markdown-cheatsheet.md" title="Markdown source"><svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true"><path d="M14.85 3c.63 0 1.15.52 1.14 1.15v7.7c0 .63-.51 1.15-1.15 1.15H1.15C.52 13 0 12.48 0 11.84V4.15C0 3.52.52 3 1.15 3ZM9 11V5H7L5.5 7 4 5H2v6h2V8l1.5 1.92L7 8v3Zm2.99.5L14.5 8H13V5h-2v3H9.5Z"/></svg>Markdown</a>
<a class="dl-pill" href="../downloads/markdown-cheatsheet.html" title="Download HTML"><svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="m11.28 3.22 4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.749.749 0 0 1-1.275-.326.749.749 0 0 1 .215-.734L13.94 8l-3.72-3.72a.749.749 0 0 1 .326-1.275.749.749 0 0 1 .734.215Zm-6.56 0a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042L2.06 8l3.72 3.72a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215L.47 8.53a.75.75 0 0 1 0-1.06Z"/></svg>HTML</a>
</p>

> GitHub Flavored Markdown Reference

Every syntax rule below is grouped by where it actually comes from, since
"Markdown" on GitHub is really three layers stacked on top of each other:

- **CommonMark** — base spec, works everywhere
- **GFM** — GitHub Flavored Markdown extension (spec-defined)
- **GitHub.com** — web app rendering only, not in any Markdown spec

---

## Headings — CommonMark

ATX-style headings use 1–6 `#` characters followed by a space. A closing run of
`#` is optional and ignored.

```markdown
# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6
```

## Emphasis — CommonMark (+ GFM)

Bold and italic are core CommonMark. Strikethrough (`~~text~~`) is a GFM-only
addition.

```markdown
*italic* or _italic_
**bold** or __bold__
***bold italic***
~~strikethrough~~
```

## Paragraphs & Line Breaks — CommonMark

A blank line starts a new paragraph. For a hard line break inside one paragraph,
end the line with two or more trailing spaces, or a trailing backslash `\`.

```markdown
First paragraph.

Second paragraph, line one␣␣
Second paragraph, line two

Line one\
Line two (backslash break)
```

The `␣␣` above stands in for two literal trailing spaces — invisible in most
editors, which is exactly why the backslash form is usually the safer choice.

## Blockquotes — CommonMark

Prefix a line with `>`. Quotes can be nested and can contain other block
elements like lists or code.

```markdown
> Single level quote.
>
> > Nested quote inside it.
>
> Back to the first level, with a **bold** word.
```

## Lists — CommonMark

Unordered lists accept `-`, `*`, or `+` as the bullet marker — pick one and stay
consistent. Ordered lists use any number followed by `.`; the actual numbers
after the first don't matter for rendering.

```markdown
- Item one
- Item two
  - Nested item
- Item three

1. First step
2. Second step
   1. Nested step
3. Third step
```

## Task Lists — GFM

A list item written as `[ ]` or `[x]` renders as an interactive-looking
checkbox. On GitHub.com, checkboxes in issues and PRs are actually clickable.

```markdown
- [x] Write cheatsheet
- [x] Add GFM extensions
- [ ] Ship it
- [ ] Sub-tasks:
  - [x] Draft
  - [ ] Review
```

## Code — CommonMark

Inline code uses single backticks. Fenced code blocks use triple backticks and
accept an optional language hint that GitHub.com uses for syntax highlighting.

````markdown
Run `npm install` first.

```bash
echo "hello world"
git status
```
````

## Links — CommonMark

Inline links carry the URL right in the text. Reference-style links keep prose
clean by parking the URL in a definition elsewhere in the document.

```markdown
[Anthropic](https://anthropic.com "Anthropic homepage")

Check out [TGWAB][tgwab] for MSP tips.

[tgwab]: https://techguywithabeard.com "TechGuyWithABeard"
```

## Autolinks — CommonMark (+ GFM extended)

CommonMark auto-links anything wrapped in angle brackets. GFM's *extended
autolinks* go further and link bare URLs, `www.` domains, and email addresses
with no brackets at all.

```markdown
<https://example.com>
<support@techguywithabeard.com>

Just paste it bare: https://github.com
Or a bare domain: www.michalferber.dev
```

## Images — CommonMark

Same syntax as links with a leading `!`. Wrap an image in a link to make it
clickable.

```markdown
![Server rack diagram](./rack.png "Rack layout v2")

[![Company logo](./logo.png)](https://techguywithabeard.com)
```

## Tables — GFM

Pipe-delimited rows with a required header separator. Colons in the separator
control column alignment.

```markdown
| Service    | Uptime  | Cost   |
| :--------- | :-----: | -----: |
| DNS        | 99.99%  | $150   |
| Migration  | 99.9%   | $400   |
```

| Service    | Uptime  | Cost   |
| :--------- | :-----: | -----: |
| DNS        | 99.99%  | $150   |
| Migration  | 99.9%   | $400   |

## Horizontal Rules — CommonMark

Three or more `-`, `*`, or `_` characters on their own line, all producing an
identical `<hr>`.

```markdown
Above the line.

---
***
___

Below the line.
```

## Escaping — CommonMark

A backslash before a punctuation character forces it to render literally instead
of being parsed as syntax.

```markdown
\*not italic\*
\# not a heading
1975\. not a list item
```

Escapable characters: `\` `` ` `` `*` `_` `{ }` `[ ]` `( )` `#` `+` `-` `.` `!` `|`

## Footnotes — GFM

A caret-bracket marker in the text pairs with a definition anywhere else in the
document; GitHub.com renders it as a jump-linked superscript.

```markdown
DNS propagation can take up to 48 hours.[^1]

[^1]: In practice it's usually under an hour with low TTLs.
```

## Raw HTML — CommonMark (+ GFM sanitization)

CommonMark passes inline HTML straight through. GFM's *disallowed raw HTML*
extension then escapes a specific list of tags for safety, even though the base
parser would otherwise render them.

```markdown
<details>
<summary>Click to expand</summary>

Hidden content revealed on click.

</details>

<!-- this comment is invisible -->
```

Tags GFM always escapes: `<title>` `<textarea>` `<style>` `<xmp>` `<iframe>`
`<noembed>` `<noframes>` `<script>` `<plaintext>`

## GitHub.com Extras — GitHub.com

Web-app rendering behavior, not part of the GFM parsing spec. These only
activate inside GitHub.com, in a repository context — a static Markdown renderer
built against the GFM spec won't reproduce them.

```markdown
Nice work :rocket: :tada:

Thanks @octocat for the review.

Fixes #142, see also a5c3785.
```
