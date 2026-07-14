---
title: "tmux Cheat Sheet"
tagline: "Sessions, windows, panes, and copy mode — the whole multiplexer at a glance."
---

# tmux Cheat Sheet

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

© 2026 | Created with ❤️ by [Michal Ferber](https://michalferber.dev/), aka [TechGuyWithABeard](https://techguywithabeard.com/)
