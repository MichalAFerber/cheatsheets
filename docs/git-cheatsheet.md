---
title: "Git Ops Cheatsheet"
description: "The 20 commands you actually use, plus the 'oh no' recovery section."
category: "DevOps"
tags: [devops]
---
# Git

<p class="dl-pills">
<a class="dl-pill" href="../downloads/git-cheatsheet.pdf" title="Download PDF"><svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0 1 13.25 16h-9.5A1.75 1.75 0 0 1 2 14.25Zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h9.5a.25.25 0 0 0 .25-.25V6h-2.75A1.75 1.75 0 0 1 9 4.25V1.5Zm6.75.062V4.25c0 .138.112.25.25.25h2.688l-.011-.013-2.914-2.914-.013-.011Z"/></svg>PDF</a>
<a class="dl-pill" href="../downloads/git-cheatsheet.md" title="Markdown source"><svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true"><path d="M14.85 3c.63 0 1.15.52 1.14 1.15v7.7c0 .63-.51 1.15-1.15 1.15H1.15C.52 13 0 12.48 0 11.84V4.15C0 3.52.52 3 1.15 3ZM9 11V5H7L5.5 7 4 5H2v6h2V8l1.5 1.92L7 8v3Zm2.99.5L14.5 8H13V5h-2v3H9.5Z"/></svg>Markdown</a>
<a class="dl-pill" href="../downloads/git-cheatsheet.html" title="Download HTML"><svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="m11.28 3.22 4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.749.749 0 0 1-1.275-.326.749.749 0 0 1 .215-.734L13.94 8l-3.72-3.72a.749.749 0 0 1 .326-1.275.749.749 0 0 1 .734.215Zm-6.56 0a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042L2.06 8l3.72 3.72a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215L.47 8.53a.75.75 0 0 1 0-1.06Z"/></svg>HTML</a>
</p>

You know Git. This isn't a tutorial — it's the reference for the commands you reach for under pressure and the recovery moves that turn "I just destroyed three hours of work" into "nothing happened." The headline truth: **almost nothing in Git is actually gone.** `reflog` is your time machine. Learn it and you stop fearing the tool.

## Daily driver

```bash
git status -sb                    # short, with branch info
git add -p                        # stage hunks interactively — review what you commit
git commit -m "msg"
git commit --amend                # fix the last commit (message or staged content)
git commit --amend --no-edit      # tack staged changes onto last commit, keep message
git pull --rebase                 # avoid the noise merge commits on pull
git push
git push -u origin feature/x      # set upstream first push
git log --oneline --graph --all --decorate    # the only log you need
```

## Branching

```bash
git switch -c feature/x           # create + switch (modern; replaces checkout -b)
git switch main                   # switch (replaces checkout <branch>)
git branch -d feature/x           # delete merged branch
git branch -D feature/x           # force-delete unmerged
git branch -vv                    # show tracking + last commit per branch
git fetch -p                      # fetch + prune dead remote branches
```

## Stash

```bash
git stash push -m "wip auth"      # named stash
git stash list
git stash show -p stash@{0}       # diff a stash
git stash pop                     # apply + drop
git stash apply stash@{1}         # apply, keep in list
git stash drop stash@{0}
git stash -u                      # include untracked files
```

## Rebase & history surgery

```bash
git rebase main                   # replay current branch onto main
git rebase -i HEAD~5              # squash/reword/reorder last 5 commits
git rebase --abort                # bail out of a bad rebase
git rebase --continue             # after resolving conflicts
git cherry-pick <sha>             # grab one commit onto current branch
git revert <sha>                  # safe undo: new commit that reverses <sha>
```

## The "oh no" recovery section

```bash
git reflog                        # EVERY HEAD movement — your undo history
git reset --hard HEAD@{2}         # jump back to where HEAD was 2 moves ago

# undo last commit, KEEP the changes staged
git reset --soft HEAD~1
# undo last commit, KEEP changes unstaged (working dir)
git reset --mixed HEAD~1
# nuke last commit AND its changes (careful)
git reset --hard HEAD~1

# recover a "deleted" branch
git reflog | grep feature/x       # find the sha
git switch -c feature/x <sha>

# recover a single file to a previous state
git restore --source=HEAD~3 path/to/file
git checkout <sha> -- path/to/file    # older syntax, still works

# accidentally committed to main instead of a branch
git switch -c feature/x           # branch now points at your commits
git switch main
git reset --hard origin/main      # reset main back to clean

# threw away uncommitted work with reset --hard? if it was ever staged:
git fsck --lost-found             # dangling blobs live here
```

## Undo a pushed commit (when you must)

```bash
# safe (public branch): revert creates a new undo commit
git revert <sha> && git push

# rewriting pushed history (only on branches you own, never shared main)
git reset --hard <good-sha>
git push --force-with-lease       # NOT --force — lease checks nobody else pushed
```

## Useful config / aliases

```bash
git config --global pull.rebase true
git config --global init.defaultBranch main
git config --global alias.lg "log --oneline --graph --all --decorate"
git config --global alias.st "status -sb"
git config --global rerere.enabled true   # remember conflict resolutions
```

## Things that bite you

- **`--force` vs `--force-with-lease`:** always use the lease version. Plain `--force` will happily overwrite a teammate's pushed work without warning.
- **`reset --hard` discards uncommitted changes permanently** — there's no reflog for unstaged working-dir edits. Stash first if unsure.
- **Detached HEAD** isn't broken — you're just not on a branch. Commits made there get garbage-collected unless you `switch -c` to keep them. `reflog` finds them if you wandered off.
- **`git pull` without `--rebase`** spawns merge commits that clutter history. Set `pull.rebase true` globally.
- **Line-ending wars (CRLF/LF)** across Windows/Mac/Linux — set `core.autocrlf` consistently per platform or use a `.gitattributes` with `* text=auto`.
