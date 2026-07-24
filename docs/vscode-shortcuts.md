---
title: "VS Code Shortcuts"
description: "Command palette, multi-cursor, and navigation — keys shown for Windows/Linux."
category: "Editors"
tags: [editors]
---
# VS Code Shortcuts

<p class="dl-pills">
<a class="dl-pill" href="../downloads/vscode-shortcuts.pdf" title="Download PDF"><svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0 1 13.25 16h-9.5A1.75 1.75 0 0 1 2 14.25Zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h9.5a.25.25 0 0 0 .25-.25V6h-2.75A1.75 1.75 0 0 1 9 4.25V1.5Zm6.75.062V4.25c0 .138.112.25.25.25h2.688l-.011-.013-2.914-2.914-.013-.011Z"/></svg>PDF</a>
<a class="dl-pill" href="../downloads/vscode-shortcuts.md" title="Markdown source"><svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true"><path d="M14.85 3c.63 0 1.15.52 1.14 1.15v7.7c0 .63-.51 1.15-1.15 1.15H1.15C.52 13 0 12.48 0 11.84V4.15C0 3.52.52 3 1.15 3ZM9 11V5H7L5.5 7 4 5H2v6h2V8l1.5 1.92L7 8v3Zm2.99.5L14.5 8H13V5h-2v3H9.5Z"/></svg>Markdown</a>
<a class="dl-pill" href="../downloads/vscode-shortcuts.html" title="Download HTML"><svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="m11.28 3.22 4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.749.749 0 0 1-1.275-.326.749.749 0 0 1 .215-.734L13.94 8l-3.72-3.72a.749.749 0 0 1 .326-1.275.749.749 0 0 1 .734.215Zm-6.56 0a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042L2.06 8l3.72 3.72a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215L.47 8.53a.75.75 0 0 1 0-1.06Z"/></svg>HTML</a>
</p>

The shortcuts below use Windows/Linux bindings. On macOS, swap `Ctrl` for `⌘` (Cmd) and `Alt` for `⌥` (Option) for most of them — a handful keep `Control`, noted where they do. When in doubt, the Command Palette finds any action and shows its current binding.

## The Essentials

| Shortcut | Action |
| --- | --- |
| `Ctrl+Shift+P` | Command Palette — run any command |
| `Ctrl+P` | Quick Open — jump to any file by name |
| `Ctrl+,` | open Settings |
| `Ctrl+K Ctrl+S` | Keyboard Shortcuts editor |
| `Ctrl+Shift+X` | Extensions view |
| `Ctrl+Shift+P then >` | browse all commands |

> **Forget a shortcut?** `Ctrl+Shift+P`, type what you want ("format", "split", "rename"). The palette lists the command and its key binding, so you re-learn it in place.

## Editing

| Shortcut | Action |
| --- | --- |
| `Ctrl+/` | toggle line comment |
| `Shift+Alt+A` | toggle block comment |
| `Alt+↑ / Alt+↓` | move line up / down |
| `Shift+Alt+↓` | copy line down (duplicate) |
| `Ctrl+Shift+K` | delete line |
| `Ctrl+Enter` | insert line below |
| `Ctrl+] / Ctrl+[` | indent / outdent |
| `Shift+Alt+F` | format the document |
| `Ctrl+Space` | trigger suggestions |

## Multi-Cursor & Selection

| Shortcut | Action |
| --- | --- |
| `Ctrl+D` | select next occurrence of the word (add cursor) |
| `Ctrl+Shift+L` | select all occurrences at once |
| `Alt+Click` | add a cursor wherever you click |
| `Ctrl+Alt+↑ / ↓` | add a cursor above / below |
| `Shift+Alt+drag` | column (box) selection |
| `Ctrl+L` | select the current line |
| `Shift+Alt+→ / ←` | expand / shrink selection |

## Navigation

| Shortcut | Action |
| --- | --- |
| `Ctrl+G` | go to line number (Mac: ⌃G) |
| `Ctrl+Shift+O` | go to symbol in the file |
| `Ctrl+T` | go to symbol across the workspace |
| `F12` | go to definition |
| `Alt+F12` | peek definition (inline) |
| `Ctrl+Tab` | switch between open editors |
| `Alt+← / Alt+→` | navigate back / forward |

## Search & Replace

| Shortcut | Action |
| --- | --- |
| `Ctrl+F` | find in the current file |
| `Ctrl+H` | replace in the current file |
| `Ctrl+Shift+F` | find across all files |
| `Ctrl+Shift+H` | replace across all files |
| `F3 / Shift+F3` | next / previous match |
| `Alt+Enter` | select all find matches |

## Panels & Layout

| Shortcut | Action |
| --- | --- |
| `Ctrl+B` | toggle the sidebar |
| `Ctrl+`` | toggle the integrated terminal (Mac: ⌃`) |
| `Ctrl+J` | toggle the bottom panel |
| `Ctrl+\` | split the editor |
| `Ctrl+K Z` | Zen mode (distraction-free) |
| `Ctrl+Shift+E` | Explorer |
| `Ctrl+Shift+G` | Source Control |
