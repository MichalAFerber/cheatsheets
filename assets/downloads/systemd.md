# systemd

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

---

© 2026 | Created with ❤️ by [Michal Ferber](https://michalferber.dev/), aka [TechGuyWithABeard](https://techguywithabeard.com/)
