---
title: ""
description: ""
category: "Languages & Data"
tags: [languages-data]
---
# Markdown Cheatsheet

[Download PDF]({{ '/assets/downloads/markdown-cheatsheet.pdf' | relative_url }}){: .pdf-link } · [Markdown source]({{ '/assets/downloads/markdown-cheatsheet.md' | relative_url }}){: .pdf-link }

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
