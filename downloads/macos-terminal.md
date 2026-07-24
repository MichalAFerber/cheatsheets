# macOS Terminal

macOS ships a BSD-flavoured Unix userland, so the usual `cd`, `ls`, and `grep` all work. This sheet focuses on the commands that are unique to macOS — the ones worth knowing beyond generic Linux.

## macOS-only Commands

| Command | Action |
| --- | --- |
| `open .` | open the current folder in Finder |
| `open file.pdf` | open a file with its default app |
| `open -a Safari url` | open with a specific app |
| `pbcopy < file` | copy a file's contents to the clipboard |
| `pbpaste > file` | paste the clipboard into a file |
| `cmd | pbcopy` | pipe command output to the clipboard |
| `mdfind name` | Spotlight search from the terminal |
| `say 'done'` | speak text aloud |
| `caffeinate -d` | keep the Mac awake until you Ctrl-C |
| `sw_vers` | show the macOS version |

## Homebrew

| Command | Action |
| --- | --- |
| `brew install <pkg>` | install a formula |
| `brew install --cask <app>` | install a GUI app |
| `brew update && brew upgrade` | update Homebrew, then all packages |
| `brew list` | list installed packages |
| `brew search <term>` | search for a formula/cask |
| `brew uninstall <pkg>` | remove a package |
| `brew services start <svc>` | run a background service |
| `brew doctor` | diagnose common problems |
| `brew cleanup` | delete old versions and caches |

## System & Defaults

| Command | Action |
| --- | --- |
| `softwareupdate -l` | list available OS updates |
| `defaults read <domain>` | read an app's preferences |
| `defaults write <domain> <key> <val>` | change a hidden setting |
| `killall Finder` | restart Finder (after defaults changes) |
| `launchctl list` | list launchd (background) jobs |
| `pmset -g` | show power-management settings |
| `diskutil list` | list disks and volumes |

> **defaults write can break apps.** Undocumented `defaults` keys are unsupported and can leave an app in a weird state. Note the current value with `defaults read` first so you can put it back.

## Networking

| Command | Action |
| --- | --- |
| `ifconfig` | show network interfaces (BSD-style) |
| `ipconfig getifaddr en0` | your current Wi-Fi IP address |
| `networksetup -listallnetworkservices` | list network services |
| `scutil --dns` | show the resolver / DNS configuration |
| `ping -c 4 host` | send 4 probes |
| `arp -a` | show the local ARP cache |
