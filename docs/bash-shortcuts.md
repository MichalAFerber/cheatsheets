---
title: "Bash Shortcuts"
description: "Move, edit, and recall on the command line without the arrow keys."
category: "Shell & CLI"
tags: [shell-cli]
---
# Bash Shortcuts

<p class="dl-pills">
<a class="dl-pill" href="../downloads/bash-shortcuts.pdf" title="Download PDF"><svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0 1 13.25 16h-9.5A1.75 1.75 0 0 1 2 14.25Zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h9.5a.25.25 0 0 0 .25-.25V6h-2.75A1.75 1.75 0 0 1 9 4.25V1.5Zm6.75.062V4.25c0 .138.112.25.25.25h2.688l-.011-.013-2.914-2.914-.013-.011Z"/></svg>PDF</a>
<a class="dl-pill" href="../downloads/bash-shortcuts.md" title="Markdown source"><svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true"><path d="M14.85 3c.63 0 1.15.52 1.14 1.15v7.7c0 .63-.51 1.15-1.15 1.15H1.15C.52 13 0 12.48 0 11.84V4.15C0 3.52.52 3 1.15 3ZM9 11V5H7L5.5 7 4 5H2v6h2V8l1.5 1.92L7 8v3Zm2.99.5L14.5 8H13V5h-2v3H9.5Z"/></svg>Markdown</a>
<a class="dl-pill" href="../downloads/bash-shortcuts.html" title="Download HTML"><svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="m11.28 3.22 4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.749.749 0 0 1-1.275-.326.749.749 0 0 1 .215-.734L13.94 8l-3.72-3.72a.749.749 0 0 1 .326-1.275.749.749 0 0 1 .734.215Zm-6.56 0a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042L2.06 8l3.72 3.72a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215L.47 8.53a.75.75 0 0 1 0-1.06Z"/></svg>HTML</a>
</p>

These are Readline (Emacs-mode) key bindings — they work the same in Bash, Zsh, and most REPLs, on Linux and macOS. Learning even the top row (`Ctrl-A`, `Ctrl-R`, `Ctrl-W`) makes the shell dramatically faster.

## Move the Cursor

| Keys | Moves to |
| --- | --- |
| `Ctrl-A` | start of the line |
| `Ctrl-E` | end of the line |
| `Alt-B` | back one word |
| `Alt-F` | forward one word |
| `Ctrl-XX` | toggle between start and current position |

## Edit the Line

| Keys | Does |
| --- | --- |
| `Ctrl-W` | delete the word before the cursor |
| `Ctrl-U` | delete from cursor to start of line |
| `Ctrl-K` | delete from cursor to end of line |
| `Ctrl-Y` | paste (yank) what you just deleted |
| `Alt-D` | delete the word after the cursor |
| `Ctrl-T` | transpose (swap) the last two characters |
| `Alt-U / Alt-L` | uppercase / lowercase the next word |
| `Ctrl-_` | undo the last edit |

> **Cut and paste, shell-style.** `Ctrl-U`, `Ctrl-K`, and `Ctrl-W` don't just delete — they cut into a buffer. `Ctrl-Y` pastes it back, so you can move text around the line.

## History

| Keys / token | Does |
| --- | --- |
| `Ctrl-R` | reverse-search history (type to filter) |
| `Ctrl-G` | cancel the history search |
| `Ctrl-P / Ctrl-N` | previous / next command |
| `Alt-.` | insert the last argument of the previous command |
| `!!` | the entire previous command |
| `!$` | the last argument of the previous command |
| `!abc` | the most recent command starting with abc |

**The classic sudo rescue**

```bash
apt update          # oops, permission denied
sudo !!             # re-runs: sudo apt update
```

## Control the Shell

| Keys | Does |
| --- | --- |
| `Ctrl-C` | interrupt the running command |
| `Ctrl-D` | end of input / log out of the shell |
| `Ctrl-Z` | suspend to the background (`fg` to resume) |
| `Ctrl-L` | clear the screen (same as `clear`) |
| `Ctrl-S / Ctrl-Q` | pause / resume terminal output |
