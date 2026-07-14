export default {
  title: "macOS Keyboard Shortcuts",
  tagline: "The muscle-memory keys — Finder, windows, text, and screenshots.",
  intro:
    "Modifier symbols: `⌘` Command, `⌥` Option, `⌃` Control, `⇧` Shift, `⌫` Delete, `↩` Return, `⎋` Esc. Most system shortcuts are `⌘`-based; the exceptions are noted.",
  sections: [
    {
      heading: "Essentials",
      variant: "core",
      keywords: "essentials copy paste undo find select spotlight switcher",
      blocks: [
        {
          type: "table",
          head: ["Keys", "Action"],
          rows: [
            ["⌘ C / ⌘ V / ⌘ X", "copy / paste / cut"],
            ["⌘ Z / ⇧ ⌘ Z", "undo / redo"],
            ["⌘ A", "select all"],
            ["⌘ F", "find in the current app"],
            ["⌘ Space", "Spotlight search"],
            ["⌘ Tab", "switch between apps"],
            ["⌘ `", "cycle windows of the current app"],
            ["⌃ ⌘ Space", "emoji & symbol picker"],
          ],
        },
      ],
    },
    {
      heading: "Windows & Apps",
      variant: "core",
      keywords: "windows apps minimize hide quit close mission control spaces fullscreen",
      blocks: [
        {
          type: "table",
          head: ["Keys", "Action"],
          rows: [
            ["⌘ N / ⌘ T", "new window / new tab"],
            ["⌘ W / ⌘ Q", "close window / quit app"],
            ["⌘ M", "minimize window"],
            ["⌘ H / ⌥ ⌘ H", "hide app / hide all others"],
            ["⌥ ⌘ ⎋", "Force Quit dialog"],
            ["⌃ ↑", "Mission Control"],
            ["⌃ → / ⌃ ←", "move one Space right / left"],
            ["⌃ ⌘ F", "toggle full screen"],
          ],
        },
      ],
    },
    {
      heading: "Editing Text",
      variant: "core",
      keywords: "text editing cursor word line delete navigate",
      blocks: [
        {
          type: "table",
          head: ["Keys", "Action"],
          rows: [
            ["⌘ ← / ⌘ →", "jump to start / end of line"],
            ["⌥ ← / ⌥ →", "move one word left / right"],
            ["⌘ ↑ / ⌘ ↓", "jump to start / end of document"],
            ["⌥ ⌫", "delete the previous word"],
            ["⌘ ⌫", "delete to the start of the line"],
            ["fn ⌫", "forward delete"],
            ["⌃ K", "delete to end of line (Emacs-style)"],
          ],
        },
      ],
    },
    {
      heading: "Screenshots & Screen",
      variant: "web",
      keywords: "screenshots screen capture lock record clipboard",
      blocks: [
        {
          type: "table",
          head: ["Keys", "Captures"],
          rows: [
            ["⇧ ⌘ 3", "the entire screen"],
            ["⇧ ⌘ 4", "a selection you drag"],
            ["⇧ ⌘ 4 then Space", "a specific window"],
            ["⇧ ⌘ 5", "the capture & screen-record toolbar"],
            ["⌃ ⌘ Q", "lock the screen"],
          ],
        },
        {
          type: "callout",
          variant: "tip",
          title: "Hold ⌃ to copy instead of save.",
          body: "Add `⌃` (Control) to any screenshot shortcut — e.g. `⌃ ⇧ ⌘ 4` — and the capture goes to the clipboard instead of a file on the Desktop.",
        },
      ],
    },
    {
      heading: "Finder",
      variant: "web",
      keywords: "finder files new folder info trash hidden go duplicate",
      blocks: [
        {
          type: "table",
          head: ["Keys", "Action"],
          rows: [
            ["⇧ ⌘ N", "new folder"],
            ["⌘ ⌫", "move selection to Trash"],
            ["⌘ I", "Get Info"],
            ["⌘ D", "duplicate"],
            ["Space", "Quick Look preview"],
            ["⇧ ⌘ .", "show / hide hidden files"],
            ["⇧ ⌘ G", "go to a folder path"],
          ],
        },
      ],
    },
  ],
};
