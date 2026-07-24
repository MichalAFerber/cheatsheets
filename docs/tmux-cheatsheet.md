---
title: "tmux Cheat Sheet"
description: "Sessions, windows, panes, and copy mode — the whole multiplexer at a glance."
category: "Shell & CLI"
tags: [shell-cli]
---
# tmux Cheat Sheet

<p class="dl-pills">
<a class="dl-pill" href="../downloads/tmux-cheatsheet.pdf" title="Download PDF"><svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0 1 13.25 16h-9.5A1.75 1.75 0 0 1 2 14.25Zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h9.5a.25.25 0 0 0 .25-.25V6h-2.75A1.75 1.75 0 0 1 9 4.25V1.5Zm6.75.062V4.25c0 .138.112.25.25.25h2.688l-.011-.013-2.914-2.914-.013-.011Z"/></svg>PDF</a>
<a class="dl-pill" href="../downloads/tmux-cheatsheet.md" title="Markdown source"><svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true"><path d="M14.85 3c.63 0 1.15.52 1.14 1.15v7.7c0 .63-.51 1.15-1.15 1.15H1.15C.52 13 0 12.48 0 11.84V4.15C0 3.52.52 3 1.15 3ZM9 11V5H7L5.5 7 4 5H2v6h2V8l1.5 1.92L7 8v3Zm2.99.5L14.5 8H13V5h-2v3H9.5Z"/></svg>Markdown</a>
<a class="dl-pill" href="../downloads/tmux-cheatsheet.html" title="Download HTML"><svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="m11.28 3.22 4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.749.749 0 0 1-1.275-.326.749.749 0 0 1 .215-.734L13.94 8l-3.72-3.72a.749.749 0 0 1 .326-1.275.749.749 0 0 1 .734.215Zm-6.56 0a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042L2.06 8l3.72 3.72a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215L.47 8.53a.75.75 0 0 1 0-1.06Z"/></svg>HTML</a>
</p>

> The **prefix** is `Ctrl+b` by default. Press the prefix, release it, then press the next key.

## tmux Sessions

| Command | Action |
|---|---|
| `tmux` | Start a new session. |
| `tmux new -s [session_name]` | Create a new session with a specific name. |
| `tmux attach` | Re-attach to the latest active session. |
| `tmux detach` | Disconnect from a session, but keep it running. |
| `tmux attach -t [session_name]` / `tmux a -t [session_name]` | Attach to a session with a specific name. |
| `tmux switch -t [session_name]` | Switch to a different session. |
| `tmux rename-session -t [old_name] [new_name]` | Rename an existing session. |
| `tmux list-sessions` / `tmux ls` | List all active tmux sessions. |
| `tmux kill-session -t [session_name]` | Terminate a specific session. |
| `tmux kill-session -a` | Kill all sessions but the current one. |
| `tmux kill-session -a -t [session_name]` | Terminate all sessions except the specified one. |
| `tmux kill-server` | Terminate the tmux server, ending all sessions, windows, and panes. |

## tmux Windows

| Shortcut | Action |
|---|---|
| `Ctrl+b` then `c` | Create a new window. |
| `Ctrl+b` then `,` | Rename the current window. |
| `Ctrl+b` then `w` | List all windows. |
| `Ctrl+b` then `&` | Kill the current window. |
| `Ctrl+b` then `n` | Switch to the next window. |
| `Ctrl+b` then `p` | Switch to the previous window. |
| `Ctrl+b` then `l` | Open the last window. |
| `Ctrl+b` then `0....9` | Switch to a specific numbered window. |
| `Ctrl+b` then `d` | Detach from the current session. |

## tmux Panes

| Shortcut | Action |
|---|---|
| `Ctrl+b` then `%` | Split the current pane vertically. |
| `Ctrl+b` then `"` | Split the current pane horizontally. |
| `Ctrl+b` then `x` | Close the current pane. |
| `Ctrl+b` then `o` | Switch between panes. |
| `Ctrl+b` then `z` | Toggle pane zoom (make pane full screen). |
| `Ctrl+b` then `;` | Toggle between the last two active panes. |
| `Ctrl+b` then `{` | Move the current pane left. |
| `Ctrl+b` then `}` | Move the current pane right. |
| `Ctrl+b` then `Space` | Toggle through different pane layouts. |
| `Ctrl+b` then `!` | Convert the current pane into a window. |
| `Ctrl+b` then `q` | Display pane number. |
| `Ctrl+b` then `↑` | Increase pane height. |
| `Ctrl+b` then `↓` | Decrease pane height. |
| `Ctrl+b` then `←` | Increase pane width. |
| `Ctrl+b` then `→` | Decrease pane width. |

## tmux Copy Mode

| Shortcut | Action |
|---|---|
| `Ctrl+b` then `[` | Enter copy mode. |
| `q` | Exit copy mode. |
| `Space` | Start text selection in copy mode. |
| `Enter` | Copy the selected text. |
| `Esc` | Clear the selected text and exit copy mode. |
| `Ctrl+b` then `]` | Paste the copied text. |
| `h` | Move the cursor left. |
| `j` | Move the cursor down. |
| `k` | Move the cursor up. |
| `l` | Move the cursor right. |
| `w` | Move the cursor one word forward. |
| `b` | Move the cursor one word backward. |
| `Ctrl+u` | Scroll up half a page. |
| `Ctrl+d` | Scroll down half a page. |
| `PgUp` | Scroll up full page. |
| `PgDn` | Scroll down full page. |

## Pro tip: remap the prefix

`Ctrl+b` is an awkward stretch. Most people remap to `Ctrl+a` (screen muscle memory) or `Ctrl+Space`. In `~/.tmux.conf`:

```bash
unbind C-b
set -g prefix C-a
bind C-a send-prefix
```

---

Source: [phoenixNAP — tmux Cheat Sheet](https://phoenixnap.com/kb/tmux-cheat-sheet)
