---
title: "Terminfo & TERM over SSH"
description: "Fix 'Error opening terminal: xterm-ghostty' (and kitty/alacritty) under sudo and over SSH."
category: "Shell & CLI"
tags: [shell-cli]
---
# Terminfo & TERM over SSH

<p class="dl-pills">
<a class="dl-pill" href="../downloads/terminfo-ssh.pdf" title="Download PDF"><svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0 1 13.25 16h-9.5A1.75 1.75 0 0 1 2 14.25Zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h9.5a.25.25 0 0 0 .25-.25V6h-2.75A1.75 1.75 0 0 1 9 4.25V1.5Zm6.75.062V4.25c0 .138.112.25.25.25h2.688l-.011-.013-2.914-2.914-.013-.011Z"/></svg>PDF</a>
<a class="dl-pill" href="../downloads/terminfo-ssh.md" title="Markdown source"><svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true"><path d="M14.85 3c.63 0 1.15.52 1.14 1.15v7.7c0 .63-.51 1.15-1.15 1.15H1.15C.52 13 0 12.48 0 11.84V4.15C0 3.52.52 3 1.15 3ZM9 11V5H7L5.5 7 4 5H2v6h2V8l1.5 1.92L7 8v3Zm2.99.5L14.5 8H13V5h-2v3H9.5Z"/></svg>Markdown</a>
<a class="dl-pill" href="../downloads/terminfo-ssh.html" title="Download HTML"><svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="m11.28 3.22 4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.749.749 0 0 1-1.275-.326.749.749 0 0 1 .215-.734L13.94 8l-3.72-3.72a.749.749 0 0 1 .326-1.275.749.749 0 0 1 .734.215Zm-6.56 0a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042L2.06 8l3.72 3.72a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215L.47 8.53a.75.75 0 0 1 0-1.06Z"/></svg>HTML</a>
</p>

Modern terminal emulators — Ghostty, Kitty, Alacritty — advertise their own terminal type (`TERM=xterm-ghostty`, `xterm-kitty`, and so on). A remote server can only drive a terminal it has a **terminfo** entry for, so the moment you land on a box that has never heard of `xterm-ghostty`, full-screen programs bail out with `Error opening terminal: xterm-ghostty`. The classic tell is that `nano` works but `sudo nano` doesn't — because `sudo` throws away the environment that made it work.

## On This Page

- [The symptom](#the-symptom)
- [Why it happens](#why-it-happens)
- [Quick fix — one-off](#quick-fix--one-off)
- [Permanent fix A — copy the terminfo to the server](#permanent-fix-a--copy-the-terminfo-to-the-server)
- [Permanent fix B — let sudo keep your TERMINFO](#permanent-fix-b--let-sudo-keep-your-terminfo)
- [Permanent fix C — report xterm-256color](#permanent-fix-c--report-xterm-256color)
- [Diagnose it](#diagnose-it)
- [Which fix should I use?](#which-fix-should-i-use)

## The symptom

```text
$ sudo nano /etc/hosts
Error opening terminal: xterm-ghostty.
```

| You run | Result | Why |
| :-- | :-- | :-- |
| `nano file` | works | your login shell has `TERM` **and** a terminfo it can find |
| `sudo nano file` | **fails** | `sudo` resets the environment; `root` can't find `xterm-ghostty` |
| `vim`, `top`, `less`, `tmux` | may fail the same way | any curses / full-screen program needs terminfo |

## Why it happens

Two things line up:

1. **`TERM` names a terminal the server doesn't know.** Ghostty sets `TERM=xterm-ghostty`. The server looks that name up in its **terminfo** database to learn how to move the cursor, clear the screen, and do colour. No entry means `Error opening terminal`.
2. **`sudo` starts a clean environment.** Your login shell probably had a terminfo it *could* find — Ghostty's SSH integration drops one into `~/.terminfo`, and `TERMINFO` / `TERMINFO_DIRS` may point at it. `sudo` strips those variables and runs as `root`, which only searches the system database, where `xterm-ghostty` usually isn't.

| Whose lookup | Searches | Has `xterm-ghostty`? |
| :-- | :-- | :-- |
| your user | `~/.terminfo`, then `$TERMINFO` / `$TERMINFO_DIRS`, then the system dirs | often yes (injected on connect) |
| `root` via `sudo` | system dirs only — `/usr/share/terminfo`, `/lib/terminfo`, `/etc/terminfo` | usually **no** |

## Quick fix — one-off

Override `TERM` for that single command with a type every server understands:

```bash
sudo TERM=xterm-256color nano /etc/hosts
```

Nothing to install, nothing to configure. You only lose Ghostty-specific niceties (a few colours or key sequences) for that one command.

## Permanent fix A — copy the terminfo to the server

Keep the real `xterm-ghostty` features by putting its terminfo where the server — and `root` — can find it. The cleanest approach exports your local entry and compiles it on the remote in one line, with no files to move by hand:

```bash
# run on your LOCAL machine
infocmp -x xterm-ghostty | ssh user@server -- tic -x -
```

Already SSH'd in, with the entry sitting in your `~/.terminfo`? Copy it into a system location instead:

```bash
# into root's own database
sudo mkdir -p /root/.terminfo/x
sudo cp -a ~/.terminfo/x/xterm-ghostty /root/.terminfo/x/

# …or system-wide, for every user on the box
sudo cp -a ~/.terminfo/x/xterm-ghostty /usr/share/terminfo/x/
```

> Distros disagree on the system path — it may be `/lib/terminfo/x/` or `/etc/terminfo/x/` instead. Run `infocmp -D` to print the directories *this* server actually searches.

## Permanent fix B — let sudo keep your TERMINFO

If the entry is already reachable from your user (for example in `~/.terminfo`), tell `sudo` to carry `TERMINFO` across instead of stripping it:

```bash
sudo TERM=xterm-256color visudo          # the override just lets visudo open
```

Add one line — ideally as a drop-in like `/etc/sudoers.d/terminfo`, so a package upgrade can't clobber it:

```text
Defaults    env_keep += "TERMINFO TERMINFO_DIRS"
```

Now `sudo nano` inherits your terminfo path and finds `xterm-ghostty`.

## Permanent fix C — report xterm-256color

Tired of doing this on every new box? Tell the emulator to identify as the universal type. You give up a few bleeding-edge features in exchange for compatibility everywhere.

| Terminal | Config file | Line to add |
| :-- | :-- | :-- |
| Ghostty | `~/.config/ghostty/config` | `term = xterm-256color` |
| Kitty | `~/.config/kitty/kitty.conf` | `term xterm-256color` |
| Alacritty | `~/.config/alacritty/alacritty.toml` | `[env]` &rarr; `TERM = "xterm-256color"` |

Restart the terminal afterwards. Kitty and Ghostty also ship SSH integration — `kitten ssh user@host`, or Ghostty's SSH feature — that copies the terminfo to the remote for you, so you keep the native `TERM` without the errors.

## Diagnose it

```bash
echo "$TERM"                          # what your terminal claims to be
infocmp "$TERM" >/dev/null && echo ok || echo "no terminfo for $TERM"
infocmp -D                            # the terminfo directories searched, in order
toe | grep -i ghostty                 # is any ghostty entry installed?
sudo sh -c 'echo "$TERM"; infocmp -D' # what root sees (TERM is often reset first)
```

| Command | Tells you |
| :-- | :-- |
| `echo $TERM` | the terminal type being advertised |
| `infocmp $TERM` | dumps the entry — errors if it's missing |
| `infocmp -D` | the exact terminfo search path on this host |
| `tic -x file` | compile / install a terminfo source (`-x` keeps extended caps) |
| `toe` | list every terminfo the system knows about |

## Which fix should I use?

| Situation | Best fix |
| :-- | :-- |
| Just need to edit one file, right now | Quick fix: `sudo TERM=xterm-256color …` |
| Your own server, want the full terminal | Fix A: copy the terminfo (system-wide or to `/root`) |
| Entry already in your `~/.terminfo` | Fix B: `env_keep += "TERMINFO"` |
| You hop across many servers | Fix C: report `xterm-256color`, or use `kitten ssh` |
