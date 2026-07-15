---
title: "Linux Commands"
description: "The everyday command-line toolkit — files, text, processes, and the network."
category: "Shell & CLI"
tags: [shell-cli]
---
# Linux Commands

{% include downloads.html slug="linux-commands" %}

A working reference for the commands you actually type at a shell. Distro-agnostic where it matters, with notes on the `apt` vs `dnf` split for package management.

## Navigation & Files

| Command | Action |
| --- | --- |
| `pwd` | print the current working directory |
| `ls -lah` | long listing, **a**ll files, **h**uman-readable sizes |
| `cd -` | jump back to the previous directory |
| `cp -r src dst` | copy recursively (directories) |
| `mv old new` | move or rename |
| `rm -r dir` | remove a directory and its contents |
| `mkdir -p a/b/c` | create nested directories in one shot |
| `touch file` | create an empty file / update its timestamp |
| `ln -s target link` | create a symbolic link |
| `tree -L 2` | show the directory tree, 2 levels deep |

> **rm -rf is unforgiving.** There is no trash can. Double-check the path before running `rm -rf`, and never run it with a variable that could be empty (`rm -rf "$DIR/"` deletes `/` if `$DIR` is unset).

## Viewing & Searching

| Command | Action |
| --- | --- |
| `cat file` | dump a whole file to stdout |
| `less file` | page through a file (`q` to quit, `/` to search) |
| `head -n 20 file` | first 20 lines |
| `tail -f log` | follow a file as it grows — great for logs |
| `grep -rin 'text' .` | recursive, case-**i**nsensitive, with line **n**umbers |
| `find . -name '*.log'` | find files by name pattern |
| `find . -mtime -1` | files modified in the last day |
| `wc -l file` | count lines |
| `sort file | uniq -c` | count unique lines |

## Permissions & Ownership

| Command | Action |
| --- | --- |
| `chmod +x script.sh` | make a file executable |
| `chmod 644 file` | owner read/write, group + others read |
| `chmod 755 dir` | owner all, group + others read/execute |
| `chown user:group file` | change owner and group |
| `chmod -R 750 dir` | apply recursively |
| `sudo !!` | re-run the previous command with sudo |

> **Octal in three digits:** read = 4, write = 2, execute = 1. Add them per role (owner, group, other). `7` = rwx, `6` = rw-, `5` = r-x.

## Processes & System

| Command | Action |
| --- | --- |
| `ps aux | grep node` | find running processes by name |
| `top` | live process/CPU view (`htop` if installed) |
| `kill -9 PID` | force-kill a process by PID |
| `pkill -f pattern` | kill by matching the full command line |
| `df -h` | disk space by filesystem, human-readable |
| `du -sh *` | size of each item in the current directory |
| `free -h` | memory usage |
| `systemctl status nginx` | check a service's state (systemd) |
| `journalctl -u nginx -f` | follow a service's logs |

## Networking

| Command | Action |
| --- | --- |
| `curl -I https://site` | fetch just the response headers |
| `curl -fsSL url | sh` | download and run (inspect first!) |
| `wget url` | download a file |
| `ssh user@host` | open a remote shell |
| `scp file user@host:/path` | copy a file over SSH |
| `ss -tulpn` | listening ports and their processes |
| `ping -c 4 host` | send 4 ICMP probes |
| `dig +short example.com` | resolve a domain, terse output |
| `ip a` | show network interfaces and addresses |

## Archives & Packages

| Command | Action |
| --- | --- |
| `tar czf out.tgz dir/` | create a gzipped tarball |
| `tar xzf out.tgz` | extract a gzipped tarball |
| `tar tzf out.tgz` | list contents without extracting |
| `zip -r out.zip dir/` | create a zip archive |
| `unzip out.zip` | extract a zip archive |

**Package managers — Debian/Ubuntu vs Fedora/RHEL**

```bash
# Debian / Ubuntu (apt)
sudo apt update && sudo apt upgrade
sudo apt install <pkg>
sudo apt remove <pkg>

# Fedora / RHEL / Rocky (dnf)
sudo dnf check-update
sudo dnf install <pkg>
sudo dnf remove <pkg>
```
