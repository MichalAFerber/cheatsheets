export default {
  title: "Vim Commands",
  tagline: "Modes, motions, and edits — enough to stop fighting the editor.",
  intro:
    "Vim is modal: keys mean different things depending on the mode. The magic is composition — an operator (`d`, `c`, `y`) plus a motion (`w`, `$`, `}`) acts on exactly that range. Press `Esc` to return to Normal mode any time.",
  legend: [
    { class: "core", label: "Normal", desc: "the default — keys are commands" },
    { class: "gfm", label: "Insert", desc: "typing text (`i`, `a`, `o` to enter)" },
    { class: "web", label: "Command", desc: "`:` line for save/quit/substitute" },
  ],
  sections: [
    {
      heading: "Modes",
      variant: "core",
      keywords: "modes normal insert visual command escape",
      blocks: [
        {
          type: "table",
          head: ["Key", "Enters"],
          rows: [
            ["Esc", "Normal mode (the safe home base)"],
            ["i / a", "Insert before / after the cursor"],
            ["I / A", "Insert at line start / end"],
            ["o / O", "open a new line below / above"],
            ["v / V", "Visual (char) / Visual Line select"],
            ["Ctrl-v", "Visual Block (column) select"],
            [":", "Command-line mode"],
          ],
        },
      ],
    },
    {
      heading: "Moving Around",
      variant: "core",
      keywords: "movement motion hjkl word line paragraph scroll gg G",
      blocks: [
        {
          type: "table",
          head: ["Key", "Moves to"],
          rows: [
            ["h j k l", "left, down, up, right"],
            ["w / b", "next / previous word start"],
            ["e", "next word end"],
            ["0 / $", "start / end of line"],
            ["^", "first non-blank of line"],
            ["gg / G", "top / bottom of file"],
            ["{ / }", "previous / next paragraph"],
            ["Ctrl-d / Ctrl-u", "half-page down / up"],
            ["%", "jump to matching bracket"],
            ["42G", "jump to line 42"],
          ],
        },
      ],
    },
    {
      heading: "Editing",
      variant: "core",
      keywords: "editing delete change yank paste undo redo dot repeat",
      blocks: [
        {
          type: "table",
          head: ["Key", "Does"],
          rows: [
            ["x", "delete the character under the cursor"],
            ["dd / yy", "delete / yank (copy) a line"],
            ["p / P", "paste after / before"],
            ["dw / cw", "delete / change to end of word"],
            ["d$ / c$", "delete / change to end of line"],
            ["ciw", "change the whole word (inner word)"],
            ["ci\"", "change inside the quotes"],
            ["u / Ctrl-r", "undo / redo"],
            [".", "repeat the last change"],
            [">> / <<", "indent / outdent a line"],
          ],
        },
        {
          type: "callout",
          variant: "tip",
          title: "Think in sentences.",
          body: "`d2w` = delete two words, `ci(` = change inside parens, `yi{` = yank inside braces. Operator + count + motion composes into thousands of edits you never memorized individually.",
        },
      ],
    },
    {
      heading: "Search & Replace",
      variant: "web",
      keywords: "search replace substitute find next global confirm",
      blocks: [
        {
          type: "table",
          head: ["Command", "Does"],
          rows: [
            ["/pattern", "search forward (`?` searches back)"],
            ["n / N", "next / previous match"],
            ["*", "search for the word under the cursor"],
            [":%s/old/new/g", "replace all in the file"],
            [":%s/old/new/gc", "replace all, confirm each"],
            [":s/old/new/g", "replace all on the current line"],
            [":noh", "clear search highlighting"],
          ],
        },
      ],
    },
    {
      heading: "Files, Windows & Saving",
      variant: "web",
      keywords: "files windows save quit write split buffer",
      blocks: [
        {
          type: "table",
          head: ["Command", "Does"],
          rows: [
            [":w", "write (save)"],
            [":q", "quit (fails if unsaved)"],
            [":wq  or  ZZ", "save and quit"],
            [":q!", "quit, discarding changes"],
            [":e file", "open another file"],
            [":sp / :vsp", "horizontal / vertical split"],
            ["Ctrl-w w", "cycle between splits"],
            [":ls / :b2", "list buffers / go to buffer 2"],
          ],
        },
        {
          type: "callout",
          variant: "danger",
          title: "Stuck and can't quit?",
          body: "Press `Esc` first, then type `:q!` and Enter to bail without saving, or `:wq` to save and leave. The `Esc` is what gets you out of Insert mode so the colon command works.",
        },
      ],
    },
  ],
};
