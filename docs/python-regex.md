---
title: "Python RegEx"
description: "The `re` module, metacharacters, and the patterns you keep re-Googling."
category: "Languages & Data"
tags: [languages-data]
---
# Python RegEx

<p class="dl-pills">
<a class="dl-pill" href="../downloads/python-regex.pdf" title="Download PDF"><svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0 1 13.25 16h-9.5A1.75 1.75 0 0 1 2 14.25Zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h9.5a.25.25 0 0 0 .25-.25V6h-2.75A1.75 1.75 0 0 1 9 4.25V1.5Zm6.75.062V4.25c0 .138.112.25.25.25h2.688l-.011-.013-2.914-2.914-.013-.011Z"/></svg>PDF</a>
<a class="dl-pill" href="../downloads/python-regex.md" title="Markdown source"><svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true"><path d="M14.85 3c.63 0 1.15.52 1.14 1.15v7.7c0 .63-.51 1.15-1.15 1.15H1.15C.52 13 0 12.48 0 11.84V4.15C0 3.52.52 3 1.15 3ZM9 11V5H7L5.5 7 4 5H2v6h2V8l1.5 1.92L7 8v3Zm2.99.5L14.5 8H13V5h-2v3H9.5Z"/></svg>Markdown</a>
<a class="dl-pill" href="../downloads/python-regex.html" title="Download HTML"><svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="m11.28 3.22 4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.749.749 0 0 1-1.275-.326.749.749 0 0 1 .215-.734L13.94 8l-3.72-3.72a.749.749 0 0 1 .326-1.275.749.749 0 0 1 .734.215Zm-6.56 0a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042L2.06 8l3.72 3.72a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215L.47 8.53a.75.75 0 0 1 0-1.06Z"/></svg>HTML</a>
</p>

Regular expressions in Python live in the `re` module. Always write patterns as raw strings (`r"..."`) so backslashes reach the regex engine instead of being eaten by Python's string parser.

## The re Module

| Call | Returns / does |
| --- | --- |
| `re.search(p, s)` | first match anywhere, else `None` |
| `re.match(p, s)` | match only at the **start** of the string |
| `re.fullmatch(p, s)` | match only if the **whole** string matches |
| `re.findall(p, s)` | list of all matches (or group tuples) |
| `re.finditer(p, s)` | iterator of match objects |
| `re.sub(p, repl, s)` | replace all matches |
| `re.split(p, s)` | split the string on the pattern |
| `re.compile(p)` | pre-compile a pattern for reuse |

**Extract, then use the match**

```python
import re

m = re.search(r"(\d{4})-(\d{2})-(\d{2})", text)
if m:
    year, month, day = m.groups()
    print(m.group(0))   # the full match
```

## Character Classes

| Token | Matches |
| --- | --- |
| `.` | any character except newline |
| `\d / \D` | a digit / a non-digit |
| `\w / \W` | word char (a-z, 0-9, _) / non-word |
| `\s / \S` | whitespace / non-whitespace |
| `\b` | a word boundary |
| `[abc]` | any one of a, b, c |
| `[^abc]` | any char except a, b, c |
| `[a-z0-9]` | a range: lowercase letter or digit |

## Anchors & Quantifiers

| Token | Meaning |
| --- | --- |
| `^ / $` | start / end of string (or line with `re.M`) |
| `*` | 0 or more (greedy) |
| `+` | 1 or more |
| `?` | 0 or 1 (optional) |
| `{3}` | exactly 3 |
| `{2,5}` | between 2 and 5 |
| `{2,}` | 2 or more |
| `*? +? ??` | lazy — match as few as possible |

> **Greedy by default.** `.*` grabs as much as it can and backtracks. For `<.*>` on `<a><b>` that's the whole string — use the lazy `<.*?>` to stop at the first `>`.

## Groups & Lookarounds

| Token | Meaning |
| --- | --- |
| `(abc)` | capturing group — numbered from 1 |
| `(?:abc)` | group without capturing |
| `(?P<name>abc)` | named group — read via `m.group('name')` |
| `a|b` | alternation: a or b |
| `(?=abc)` | lookahead: followed by abc |
| `(?!abc)` | negative lookahead: not followed by abc |
| `(?<=abc)` | lookbehind: preceded by abc |
| `\1` | backreference to group 1 |

**Named groups + sub with a backreference**

```python
# swap "First Last" -> "Last, First"
re.sub(r"(?P<f>\w+)\s+(?P<l>\w+)",
       r"\g<l>, \g<f>",
       "Grace Hopper")
# -> "Hopper, Grace"
```

## Flags

| Flag | Effect |
| --- | --- |
| `re.I  (IGNORECASE)` | case-insensitive matching |
| `re.M  (MULTILINE)` | `^` and `$` match at each line |
| `re.S  (DOTALL)` | `.` also matches newlines |
| `re.X  (VERBOSE)` | ignore whitespace/comments in the pattern |

**Combine flags with |**

```python
re.findall(r"^error:.*", log, re.I | re.M)
```
