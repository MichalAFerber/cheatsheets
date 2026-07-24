---
title: "Vim Commands"
description: "Modes, motions, and edits — enough to stop fighting the editor."
category: "Editors"
tags: [editors]
---
# Vim Commands

<p class="dl-pills">
<a class="dl-pill" href="../downloads/vim-commands.pdf" title="Download PDF"><svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0 1 13.25 16h-9.5A1.75 1.75 0 0 1 2 14.25Zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h9.5a.25.25 0 0 0 .25-.25V6h-2.75A1.75 1.75 0 0 1 9 4.25V1.5Zm6.75.062V4.25c0 .138.112.25.25.25h2.688l-.011-.013-2.914-2.914-.013-.011Z"/></svg>PDF</a>
<a class="dl-pill" href="../downloads/vim-commands.md" title="Markdown source"><svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true"><path d="M14.85 3c.63 0 1.15.52 1.14 1.15v7.7c0 .63-.51 1.15-1.15 1.15H1.15C.52 13 0 12.48 0 11.84V4.15C0 3.52.52 3 1.15 3ZM9 11V5H7L5.5 7 4 5H2v6h2V8l1.5 1.92L7 8v3Zm2.99.5L14.5 8H13V5h-2v3H9.5Z"/></svg>Markdown</a>
<a class="dl-pill" href="../downloads/vim-commands.html" title="Download HTML"><svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="m11.28 3.22 4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.749.749 0 0 1-1.275-.326.749.749 0 0 1 .215-.734L13.94 8l-3.72-3.72a.749.749 0 0 1 .326-1.275.749.749 0 0 1 .734.215Zm-6.56 0a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042L2.06 8l3.72 3.72a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215L.47 8.53a.75.75 0 0 1 0-1.06Z"/></svg>HTML</a>
</p>

Vim is modal: keys mean different things depending on the mode. The magic is composition — an operator (`d`, `c`, `y`) plus a motion (`w`, `$`, `}`) acts on exactly that range. Press `Esc` to return to Normal mode any time.

## Modes

| Key | Enters |
| --- | --- |
| `Esc` | Normal mode (the safe home base) |
| `i / a` | Insert before / after the cursor |
| `I / A` | Insert at line start / end |
| `o / O` | open a new line below / above |
| `v / V` | Visual (char) / Visual Line select |
| `Ctrl-v` | Visual Block (column) select |
| `:` | Command-line mode |

## Moving Around

| Key | Moves to |
| --- | --- |
| `h j k l` | left, down, up, right |
| `w / b` | next / previous word start |
| `e` | next word end |
| `0 / $` | start / end of line |
| `^` | first non-blank of line |
| `gg / G` | top / bottom of file |
| `{ / }` | previous / next paragraph |
| `Ctrl-d / Ctrl-u` | half-page down / up |
| `%` | jump to matching bracket |
| `42G` | jump to line 42 |

## Editing

| Key | Does |
| --- | --- |
| `x` | delete the character under the cursor |
| `dd / yy` | delete / yank (copy) a line |
| `p / P` | paste after / before |
| `dw / cw` | delete / change to end of word |
| `d$ / c$` | delete / change to end of line |
| `ciw` | change the whole word (inner word) |
| `ci"` | change inside the quotes |
| `u / Ctrl-r` | undo / redo |
| `.` | repeat the last change |
| `>> / <<` | indent / outdent a line |

> **Think in sentences.** `d2w` = delete two words, `ci(` = change inside parens, `yi{` = yank inside braces. Operator + count + motion composes into thousands of edits you never memorized individually.

## Search & Replace

| Command | Does |
| --- | --- |
| `/pattern` | search forward (`?` searches back) |
| `n / N` | next / previous match |
| `*` | search for the word under the cursor |
| `:%s/old/new/g` | replace all in the file |
| `:%s/old/new/gc` | replace all, confirm each |
| `:s/old/new/g` | replace all on the current line |
| `:noh` | clear search highlighting |

## Files, Windows & Saving

| Command | Does |
| --- | --- |
| `:w` | write (save) |
| `:q` | quit (fails if unsaved) |
| `:wq  or  ZZ` | save and quit |
| `:q!` | quit, discarding changes |
| `:e file` | open another file |
| `:sp / :vsp` | horizontal / vertical split |
| `Ctrl-w w` | cycle between splits |
| `:ls / :b2` | list buffers / go to buffer 2 |

> **Stuck and can't quit?** Press `Esc` first, then type `:q!` and Enter to bail without saving, or `:wq` to save and leave. The `Esc` is what gets you out of Insert mode so the colon command works.
