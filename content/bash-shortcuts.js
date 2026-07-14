export default {
  title: "Bash Shortcuts",
  tagline: "Move, edit, and recall on the command line without the arrow keys.",
  intro:
    "These are Readline (Emacs-mode) key bindings — they work the same in Bash, Zsh, and most REPLs, on Linux and macOS. Learning even the top row (`Ctrl-A`, `Ctrl-R`, `Ctrl-W`) makes the shell dramatically faster.",
  sections: [
    {
      heading: "Move the Cursor",
      variant: "core",
      keywords: "cursor move line word start end beginning",
      blocks: [
        {
          type: "table",
          head: ["Keys", "Moves to"],
          rows: [
            ["Ctrl-A", "start of the line"],
            ["Ctrl-E", "end of the line"],
            ["Alt-B", "back one word"],
            ["Alt-F", "forward one word"],
            ["Ctrl-XX", "toggle between start and current position"],
          ],
        },
      ],
    },
    {
      heading: "Edit the Line",
      variant: "core",
      keywords: "edit delete kill yank cut word transpose case",
      blocks: [
        {
          type: "table",
          head: ["Keys", "Does"],
          rows: [
            ["Ctrl-W", "delete the word before the cursor"],
            ["Ctrl-U", "delete from cursor to start of line"],
            ["Ctrl-K", "delete from cursor to end of line"],
            ["Ctrl-Y", "paste (yank) what you just deleted"],
            ["Alt-D", "delete the word after the cursor"],
            ["Ctrl-T", "transpose (swap) the last two characters"],
            ["Alt-U / Alt-L", "uppercase / lowercase the next word"],
            ["Ctrl-_", "undo the last edit"],
          ],
        },
        {
          type: "callout",
          variant: "tip",
          title: "Cut and paste, shell-style.",
          body: "`Ctrl-U`, `Ctrl-K`, and `Ctrl-W` don't just delete — they cut into a buffer. `Ctrl-Y` pastes it back, so you can move text around the line.",
        },
      ],
    },
    {
      heading: "History",
      variant: "web",
      keywords: "history search recall previous last argument bang reverse",
      blocks: [
        {
          type: "table",
          head: ["Keys / token", "Does"],
          rows: [
            ["Ctrl-R", "reverse-search history (type to filter)"],
            ["Ctrl-G", "cancel the history search"],
            ["Ctrl-P / Ctrl-N", "previous / next command"],
            ["Alt-.", "insert the last argument of the previous command"],
            ["!!", "the entire previous command"],
            ["!$", "the last argument of the previous command"],
            ["!abc", "the most recent command starting with abc"],
          ],
        },
        {
          type: "recipe",
          title: "The classic sudo rescue",
          lang: "bash",
          code: `apt update          # oops, permission denied
sudo !!             # re-runs: sudo apt update`,
        },
      ],
    },
    {
      heading: "Control the Shell",
      variant: "web",
      keywords: "control interrupt suspend eof clear screen job",
      blocks: [
        {
          type: "table",
          head: ["Keys", "Does"],
          rows: [
            ["Ctrl-C", "interrupt the running command"],
            ["Ctrl-D", "end of input / log out of the shell"],
            ["Ctrl-Z", "suspend to the background (`fg` to resume)"],
            ["Ctrl-L", "clear the screen (same as `clear`)"],
            ["Ctrl-S / Ctrl-Q", "pause / resume terminal output"],
          ],
        },
      ],
    },
  ],
};
