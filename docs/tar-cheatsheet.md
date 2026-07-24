---
title: "tar (Archives)"
description: "Create, inspect, and extract tarballs — the flag combos, compression formats, and safe-extract habits."
category: "Shell & CLI"
tags: [shell-cli]
---
# tar — Archives & Tarballs

<p class="dl-pills">
<a class="dl-pill" href="../downloads/tar-cheatsheet.pdf" title="Download PDF"><svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0 1 13.25 16h-9.5A1.75 1.75 0 0 1 2 14.25Zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h9.5a.25.25 0 0 0 .25-.25V6h-2.75A1.75 1.75 0 0 1 9 4.25V1.5Zm6.75.062V4.25c0 .138.112.25.25.25h2.688l-.011-.013-2.914-2.914-.013-.011Z"/></svg>PDF</a>
<a class="dl-pill" href="../downloads/tar-cheatsheet.md" title="Markdown source"><svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true"><path d="M14.85 3c.63 0 1.15.52 1.14 1.15v7.7c0 .63-.51 1.15-1.15 1.15H1.15C.52 13 0 12.48 0 11.84V4.15C0 3.52.52 3 1.15 3ZM9 11V5H7L5.5 7 4 5H2v6h2V8l1.5 1.92L7 8v3Zm2.99.5L14.5 8H13V5h-2v3H9.5Z"/></svg>Markdown</a>
<a class="dl-pill" href="../downloads/tar-cheatsheet.html" title="Download HTML"><svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="m11.28 3.22 4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.749.749 0 0 1-1.275-.326.749.749 0 0 1 .215-.734L13.94 8l-3.72-3.72a.749.749 0 0 1 .326-1.275.749.749 0 0 1 .734.215Zm-6.56 0a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042L2.06 8l3.72 3.72a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215L.47 8.53a.75.75 0 0 1 0-1.06Z"/></svg>HTML</a>
</p>

`tar` bundles many files into one archive — a *tarball* — and optionally compresses it. The command itself is simple; what trips people up is the flag soup (`-czf` vs `-xjf`), the fact that compression is a separate layer from the archive, and the classic "tar bomb" that sprays files across your current directory. This sheet covers the combinations you actually use, plus a few lesser-known options that make extracting safer.

## On This Page

- [The mental model](#the-mental-model)
- [Create an archive](#create-an-archive)
- [Inspect before extracting](#inspect-before-extracting)
- [Extract](#extract)
- [The flags that matter](#the-flags-that-matter)
- [Compression formats](#compression-formats)
- [Handy recipes](#handy-recipes)
- [Gotchas](#gotchas)

## The mental model

`tar` = *tape archive*. It concatenates files (with their paths and permissions) into a single `.tar` stream. **Compression is a separate step** layered on top — `.tar.gz`, `.tar.xz`, and so on. The letters pick the job:

```text
c = create      x = extract      t = list (table of contents)
f = file …      v = verbose      z = gzip   j = bzip2   J = xz
```

Read `-czf` as "**c**reate a g**z**ipped **f**ile" and `-xf` as "e**x**tract this **f**ile." Modern GNU tar auto-detects the compression when extracting, so you rarely need the `z`/`j`/`J` on the way out.

## Create an archive

```bash
tar -cf  archive.tar     files/        # bundle only, no compression
tar -czf archive.tar.gz  files/        # gzip   (.tgz)  — fast, universal
tar -cjf archive.tar.bz2 files/        # bzip2  (.tbz)  — smaller, slower
tar -cJf archive.tar.xz  files/        # xz     (.txz)  — smallest, slowest
tar --zstd -cf archive.tar.zst files/  # zstd — fast with a great ratio (modern)
tar -caf archive.tar.gz  files/        # -a: pick compression from the extension
```

Add `-v` to watch the file names scroll by. Reach for `-a` (auto) when you'd rather name the output by extension than remember which letter is which.

## Inspect before extracting

Make this a habit — it's the cheapest way to avoid a mess:

```bash
tar -tf  archive.tar.gz                # list every member, no extraction
tar -tvf archive.tar.gz                # long listing: perms, size, mtime
tar -tf  archive.tar.gz | head         # just the first entries
```

If the listing shows files at the top level (not tucked under one folder), extracting will scatter them into your current directory — a "tar bomb." List first, or extract with `--one-top-level` (below).

## Extract

```bash
tar -xf archive.tar.gz                       # extract here (compression auto-detected)
tar -xvf archive.tar.gz                      # …and print what's being written
tar -xf archive.tar.gz -C /path/to/dir       # extract INTO an existing directory
tar -xf archive.tar.gz --one-top-level       # into a new folder named after the archive
tar -xf archive.tar.gz --one-top-level=out   # into a new folder you name
tar -xf archive.tar.gz dir/file.txt docs/    # only these members (paths as shown by -t)
tar -xf archive.tar.gz --strip-components=1   # drop the leading path component
```

`--one-top-level` (GNU tar) is the antidote to tar bombs: everything lands inside a single new directory no matter how the archive was built. `--strip-components=N` is handy when a tarball wraps everything in a top folder you don't want (common with GitHub source tarballs).

## The flags that matter

| Flag | Does |
| :-- | :-- |
| `-c` | create an archive |
| `-x` | extract |
| `-t` | list contents (table of contents) |
| `-f FILE` | operate on `FILE` — almost always required |
| `-v` | verbose — name each member as it's processed |
| `-z` / `-j` / `-J` | compress with gzip / bzip2 / xz |
| `--zstd` | compress with zstd |
| `-a` | choose compression from the file extension (on create) |
| `-C DIR` | change to `DIR` first (position-sensitive) |
| `-p` | preserve permissions (the default when root) |
| `--exclude=PATTERN` | skip matching paths (repeatable) |
| `--strip-components=N` | remove `N` leading path parts on extract |
| `--one-top-level[=DIR]` | extract into a single new directory |

## Compression formats

| Extension | Create flag | Trade-off |
| :-- | :-- | :-- |
| `.tar.gz` / `.tgz` | `-z` | fast, everywhere — the safe default |
| `.tar.bz2` / `.tbz` | `-j` | ~10–15% smaller than gzip, noticeably slower |
| `.tar.xz` / `.txz` | `-J` | smallest, slowest; great for release artifacts |
| `.tar.zst` | `--zstd` | near-gzip speed, near-xz ratio; needs a recent tar |
| `.tar` | *(none)* | no compression — required for `-r`/`-u` append |

## Handy recipes

```bash
# Back up a project, skipping junk
tar -czf backup.tar.gz --exclude='*.log' --exclude=node_modules project/

# Stream one file out of an archive to stdout (no extraction)
tar -xOf archive.tar.gz path/to/file.txt

# Archive from an explicit list of paths
tar -czf set.tar.gz -T files.txt

# Add a file to an existing UNcompressed archive
tar -rf archive.tar newfile.txt

# Copy a directory tree preserving perms/owners (tar-over-pipe)
tar -cf - -C /src . | tar -xf - -C /dst

# Send a compressed backup over SSH to another host
tar -czf - project/ | ssh user@host 'cat > /backups/project.tar.gz'
```

## Gotchas

- **You can't append to a compressed tarball.** `-r` (append) and `-u` (update) need a plain `.tar`. Decompress, append, recompress.
- **`-C` is positional.** It takes effect from where it appears on the line, so `tar -xf a.tgz -C /dst` changes to `/dst` before extracting.
- **`f` is almost always required.** Without `-f FILE`, tar reads/writes the default device (or stdin/stdout) — usually not what you want.
- **GNU vs BSD/macOS tar differ.** macOS ships `bsdtar`: no `--one-top-level`, and some long options vary. `brew install gnu-tar` gives you `gtar` if you need GNU behaviour.
- **Leading slashes are stripped on create.** GNU tar stores absolute paths as relative (a safety feature); `-P` keeps them literal — rarely what you want, and risky on extract.
- **`-z`/`-j`/`-J` on extract are optional but harmless.** Modern tar sniffs the format; you only *need* the letter with very old tars or non-seekable streams.
