export default {
  title: "Python RegEx",
  tagline: "The `re` module, metacharacters, and the patterns you keep re-Googling.",
  intro:
    "Regular expressions in Python live in the `re` module. Always write patterns as raw strings (`r\"...\"`) so backslashes reach the regex engine instead of being eaten by Python's string parser.",
  sections: [
    {
      heading: "The re Module",
      variant: "core",
      keywords: "re module search match findall finditer sub split compile fullmatch",
      blocks: [
        {
          type: "table",
          head: ["Call", "Returns / does"],
          rows: [
            ["re.search(p, s)", "first match anywhere, else `None`"],
            ["re.match(p, s)", "match only at the **start** of the string"],
            ["re.fullmatch(p, s)", "match only if the **whole** string matches"],
            ["re.findall(p, s)", "list of all matches (or group tuples)"],
            ["re.finditer(p, s)", "iterator of match objects"],
            ["re.sub(p, repl, s)", "replace all matches"],
            ["re.split(p, s)", "split the string on the pattern"],
            ["re.compile(p)", "pre-compile a pattern for reuse"],
          ],
        },
        {
          type: "recipe",
          title: "Extract, then use the match",
          lang: "python",
          code: `import re

m = re.search(r"(\\d{4})-(\\d{2})-(\\d{2})", text)
if m:
    year, month, day = m.groups()
    print(m.group(0))   # the full match`,
        },
      ],
    },
    {
      heading: "Character Classes",
      variant: "core",
      keywords: "metacharacters character class digit word space dot anchor set",
      blocks: [
        {
          type: "table",
          head: ["Token", "Matches"],
          rows: [
            [".", "any character except newline"],
            ["\\d / \\D", "a digit / a non-digit"],
            ["\\w / \\W", "word char (a-z, 0-9, _) / non-word"],
            ["\\s / \\S", "whitespace / non-whitespace"],
            ["\\b", "a word boundary"],
            ["[abc]", "any one of a, b, c"],
            ["[^abc]", "any char except a, b, c"],
            ["[a-z0-9]", "a range: lowercase letter or digit"],
          ],
        },
      ],
    },
    {
      heading: "Anchors & Quantifiers",
      variant: "core",
      keywords: "anchors quantifiers greedy lazy star plus optional repeat",
      blocks: [
        {
          type: "table",
          head: ["Token", "Meaning"],
          rows: [
            ["^ / $", "start / end of string (or line with `re.M`)"],
            ["*", "0 or more (greedy)"],
            ["+", "1 or more"],
            ["?", "0 or 1 (optional)"],
            ["{3}", "exactly 3"],
            ["{2,5}", "between 2 and 5"],
            ["{2,}", "2 or more"],
            ["*? +? ??", "lazy — match as few as possible"],
          ],
        },
        {
          type: "callout",
          variant: "tip",
          title: "Greedy by default.",
          body: "`.*` grabs as much as it can and backtracks. For `<.*>` on `<a><b>` that's the whole string — use the lazy `<.*?>` to stop at the first `>`.",
        },
      ],
    },
    {
      heading: "Groups & Lookarounds",
      variant: "web",
      keywords: "groups capturing named non-capturing alternation lookahead lookbehind backreference",
      blocks: [
        {
          type: "table",
          head: ["Token", "Meaning"],
          rows: [
            ["(abc)", "capturing group — numbered from 1"],
            ["(?:abc)", "group without capturing"],
            ["(?P<name>abc)", "named group — read via `m.group('name')`"],
            ["a|b", "alternation: a or b"],
            ["(?=abc)", "lookahead: followed by abc"],
            ["(?!abc)", "negative lookahead: not followed by abc"],
            ["(?<=abc)", "lookbehind: preceded by abc"],
            ["\\1", "backreference to group 1"],
          ],
        },
        {
          type: "recipe",
          title: "Named groups + sub with a backreference",
          lang: "python",
          code: `# swap "First Last" -> "Last, First"
re.sub(r"(?P<f>\\w+)\\s+(?P<l>\\w+)",
       r"\\g<l>, \\g<f>",
       "Grace Hopper")
# -> "Hopper, Grace"`,
        },
      ],
    },
    {
      heading: "Flags",
      variant: "web",
      keywords: "flags ignorecase multiline dotall verbose compile",
      blocks: [
        {
          type: "table",
          head: ["Flag", "Effect"],
          rows: [
            ["re.I  (IGNORECASE)", "case-insensitive matching"],
            ["re.M  (MULTILINE)", "`^` and `$` match at each line"],
            ["re.S  (DOTALL)", "`.` also matches newlines"],
            ["re.X  (VERBOSE)", "ignore whitespace/comments in the pattern"],
          ],
        },
        {
          type: "recipe",
          title: "Combine flags with |",
          lang: "python",
          code: `re.findall(r"^error:.*", log, re.I | re.M)`,
        },
      ],
    },
  ],
};
