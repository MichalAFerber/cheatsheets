---
title: "Vim Commands"
description: "Modes, motions, and edits — enough to stop fighting the editor."
category: "Editors"
tags: [editors]
---
# Vim Commands

[Download PDF]({{ '/assets/downloads/vim-commands.pdf' | relative_url }}){: .pdf-link } · [Markdown source]({{ '/assets/downloads/vim-commands.md' | relative_url }}){: .pdf-link }

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
