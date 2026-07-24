---
title: "systemd"
description: "Control services and read logs with systemctl and journalctl."
category: "DevOps"
tags: [devops]
---
# systemd

<p class="dl-pills">
<a class="dl-pill" href="../downloads/systemd.pdf" title="Download PDF"><svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0 1 13.25 16h-9.5A1.75 1.75 0 0 1 2 14.25Zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h9.5a.25.25 0 0 0 .25-.25V6h-2.75A1.75 1.75 0 0 1 9 4.25V1.5Zm6.75.062V4.25c0 .138.112.25.25.25h2.688l-.011-.013-2.914-2.914-.013-.011Z"/></svg>PDF</a>
<a class="dl-pill" href="../downloads/systemd.md" title="Markdown source"><svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true"><path d="M14.85 3c.63 0 1.15.52 1.14 1.15v7.7c0 .63-.51 1.15-1.15 1.15H1.15C.52 13 0 12.48 0 11.84V4.15C0 3.52.52 3 1.15 3ZM9 11V5H7L5.5 7 4 5H2v6h2V8l1.5 1.92L7 8v3Zm2.99.5L14.5 8H13V5h-2v3H9.5Z"/></svg>Markdown</a>
<a class="dl-pill" href="../downloads/systemd.html" title="Download HTML"><svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="m11.28 3.22 4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.749.749 0 0 1-1.275-.326.749.749 0 0 1 .215-.734L13.94 8l-3.72-3.72a.749.749 0 0 1 .326-1.275.749.749 0 0 1 .734.215Zm-6.56 0a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042L2.06 8l3.72 3.72a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215L.47 8.53a.75.75 0 0 1 0-1.06Z"/></svg>HTML</a>
</p>

systemd is the init system and service manager on most modern Linux distros. `systemctl` controls units (services); `journalctl` reads their logs. Most commands need `sudo` to change state.

## Control Services

| Command | Action |
| --- | --- |
| `systemctl start nginx` | start a service now |
| `systemctl stop nginx` | stop it now |
| `systemctl restart nginx` | stop then start |
| `systemctl reload nginx` | reload config without a full restart |
| `systemctl enable nginx` | start automatically at boot |
| `systemctl disable nginx` | don't start at boot |
| `systemctl enable --now nginx` | enable at boot and start immediately |

## Check Status

| Command | Shows |
| --- | --- |
| `systemctl status nginx` | state, recent logs, and PID |
| `systemctl is-active nginx` | `active` / `inactive` (scriptable) |
| `systemctl is-enabled nginx` | whether it starts at boot |
| `systemctl --failed` | every unit that failed to start |
| `systemctl list-units --type=service` | all loaded services |
| `systemctl list-unit-files` | all installed units + their state |

## Read Logs (journalctl)

| Command | Shows |
| --- | --- |
| `journalctl -u nginx` | all logs for one service |
| `journalctl -u nginx -f` | follow (tail) live |
| `journalctl -b` | logs since the last boot |
| `journalctl -e` | jump to the end |
| `journalctl --since '1 hour ago'` | time-filtered logs |
| `journalctl -p err` | errors and worse only |
| `journalctl -k` | kernel messages (like dmesg) |
| `journalctl --disk-usage` | how much space the journal uses |

## Unit Files

| Command | Does |
| --- | --- |
| `systemctl cat nginx` | print the unit file and any overrides |
| `systemctl edit nginx` | create a drop-in override (safe) |
| `systemctl edit --full nginx` | edit a full copy of the unit |
| `systemctl daemon-reload` | reload after editing unit files |
| `systemctl show nginx` | dump every property |

> **Always daemon-reload after editing.** systemd caches unit files. Change one and forget `sudo systemctl daemon-reload` and it keeps running the old definition — a classic "why isn't my change working" trap.

## System State

| Command | Does |
| --- | --- |
| `systemctl reboot` | restart the machine |
| `systemctl poweroff` | shut down |
| `systemctl suspend` | sleep |
| `systemctl get-default` | current boot target (e.g. graphical) |
| `systemd-analyze blame` | what slowed down the last boot |
