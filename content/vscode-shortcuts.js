export default {
  title: "VS Code Shortcuts",
  tagline: "Command palette, multi-cursor, and navigation — keys shown for Windows/Linux.",
  intro:
    "The shortcuts below use Windows/Linux bindings. On macOS, swap `Ctrl` for `⌘` (Cmd) and `Alt` for `⌥` (Option) for most of them — a handful keep `Control`, noted where they do. When in doubt, the Command Palette finds any action and shows its current binding.",
  sections: [
    {
      heading: "The Essentials",
      variant: "core",
      keywords: "general command palette quick open settings keyboard extensions",
      blocks: [
        {
          type: "table",
          head: ["Shortcut", "Action"],
          rows: [
            ["Ctrl+Shift+P", "Command Palette — run any command"],
            ["Ctrl+P", "Quick Open — jump to any file by name"],
            ["Ctrl+,", "open Settings"],
            ["Ctrl+K Ctrl+S", "Keyboard Shortcuts editor"],
            ["Ctrl+Shift+X", "Extensions view"],
            ["Ctrl+Shift+P then >", "browse all commands"],
          ],
        },
        {
          type: "callout",
          variant: "tip",
          title: "Forget a shortcut?",
          body: "`Ctrl+Shift+P`, type what you want (\"format\", \"split\", \"rename\"). The palette lists the command and its key binding, so you re-learn it in place.",
        },
      ],
    },
    {
      heading: "Editing",
      variant: "core",
      keywords: "editing comment move copy line indent delete suggestions format",
      blocks: [
        {
          type: "table",
          head: ["Shortcut", "Action"],
          rows: [
            ["Ctrl+/", "toggle line comment"],
            ["Shift+Alt+A", "toggle block comment"],
            ["Alt+↑ / Alt+↓", "move line up / down"],
            ["Shift+Alt+↓", "copy line down (duplicate)"],
            ["Ctrl+Shift+K", "delete line"],
            ["Ctrl+Enter", "insert line below"],
            ["Ctrl+] / Ctrl+[", "indent / outdent"],
            ["Shift+Alt+F", "format the document"],
            ["Ctrl+Space", "trigger suggestions"],
          ],
        },
      ],
    },
    {
      heading: "Multi-Cursor & Selection",
      variant: "core",
      keywords: "multi cursor selection add occurrence column expand shrink",
      blocks: [
        {
          type: "table",
          head: ["Shortcut", "Action"],
          rows: [
            ["Ctrl+D", "select next occurrence of the word (add cursor)"],
            ["Ctrl+Shift+L", "select all occurrences at once"],
            ["Alt+Click", "add a cursor wherever you click"],
            ["Ctrl+Alt+↑ / ↓", "add a cursor above / below"],
            ["Shift+Alt+drag", "column (box) selection"],
            ["Ctrl+L", "select the current line"],
            ["Shift+Alt+→ / ←", "expand / shrink selection"],
          ],
        },
      ],
    },
    {
      heading: "Navigation",
      variant: "web",
      keywords: "navigation go to line symbol definition file breadcrumb back",
      blocks: [
        {
          type: "table",
          head: ["Shortcut", "Action"],
          rows: [
            ["Ctrl+G", "go to line number (Mac: ⌃G)"],
            ["Ctrl+Shift+O", "go to symbol in the file"],
            ["Ctrl+T", "go to symbol across the workspace"],
            ["F12", "go to definition"],
            ["Alt+F12", "peek definition (inline)"],
            ["Ctrl+Tab", "switch between open editors"],
            ["Alt+← / Alt+→", "navigate back / forward"],
          ],
        },
      ],
    },
    {
      heading: "Search & Replace",
      variant: "web",
      keywords: "search replace find in files next previous",
      blocks: [
        {
          type: "table",
          head: ["Shortcut", "Action"],
          rows: [
            ["Ctrl+F", "find in the current file"],
            ["Ctrl+H", "replace in the current file"],
            ["Ctrl+Shift+F", "find across all files"],
            ["Ctrl+Shift+H", "replace across all files"],
            ["F3 / Shift+F3", "next / previous match"],
            ["Alt+Enter", "select all find matches"],
          ],
        },
      ],
    },
    {
      heading: "Panels & Layout",
      variant: "web",
      keywords: "panels layout sidebar terminal split zen explorer source control",
      blocks: [
        {
          type: "table",
          head: ["Shortcut", "Action"],
          rows: [
            ["Ctrl+B", "toggle the sidebar"],
            ["Ctrl+`", "toggle the integrated terminal (Mac: ⌃`)"],
            ["Ctrl+J", "toggle the bottom panel"],
            ["Ctrl+\\", "split the editor"],
            ["Ctrl+K Z", "Zen mode (distraction-free)"],
            ["Ctrl+Shift+E", "Explorer"],
            ["Ctrl+Shift+G", "Source Control"],
          ],
        },
      ],
    },
  ],
};
