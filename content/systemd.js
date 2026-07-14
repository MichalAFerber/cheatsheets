export default {
  title: "systemd",
  tagline: "Control services and read logs with systemctl and journalctl.",
  intro:
    "systemd is the init system and service manager on most modern Linux distros. `systemctl` controls units (services); `journalctl` reads their logs. Most commands need `sudo` to change state.",
  sections: [
    {
      heading: "Control Services",
      variant: "core",
      keywords: "control services start stop restart reload enable disable systemctl",
      blocks: [
        {
          type: "table",
          head: ["Command", "Action"],
          rows: [
            ["systemctl start nginx", "start a service now"],
            ["systemctl stop nginx", "stop it now"],
            ["systemctl restart nginx", "stop then start"],
            ["systemctl reload nginx", "reload config without a full restart"],
            ["systemctl enable nginx", "start automatically at boot"],
            ["systemctl disable nginx", "don't start at boot"],
            ["systemctl enable --now nginx", "enable at boot and start immediately"],
          ],
        },
      ],
    },
    {
      heading: "Check Status",
      variant: "core",
      keywords: "status check active enabled failed list units",
      blocks: [
        {
          type: "table",
          head: ["Command", "Shows"],
          rows: [
            ["systemctl status nginx", "state, recent logs, and PID"],
            ["systemctl is-active nginx", "`active` / `inactive` (scriptable)"],
            ["systemctl is-enabled nginx", "whether it starts at boot"],
            ["systemctl --failed", "every unit that failed to start"],
            ["systemctl list-units --type=service", "all loaded services"],
            ["systemctl list-unit-files", "all installed units + their state"],
          ],
        },
      ],
    },
    {
      heading: "Read Logs (journalctl)",
      variant: "web",
      keywords: "logs journalctl follow boot since priority kernel unit",
      blocks: [
        {
          type: "table",
          head: ["Command", "Shows"],
          rows: [
            ["journalctl -u nginx", "all logs for one service"],
            ["journalctl -u nginx -f", "follow (tail) live"],
            ["journalctl -b", "logs since the last boot"],
            ["journalctl -e", "jump to the end"],
            ["journalctl --since '1 hour ago'", "time-filtered logs"],
            ["journalctl -p err", "errors and worse only"],
            ["journalctl -k", "kernel messages (like dmesg)"],
            ["journalctl --disk-usage", "how much space the journal uses"],
          ],
        },
      ],
    },
    {
      heading: "Unit Files",
      variant: "web",
      keywords: "unit files edit override daemon reload cat drop-in",
      blocks: [
        {
          type: "table",
          head: ["Command", "Does"],
          rows: [
            ["systemctl cat nginx", "print the unit file and any overrides"],
            ["systemctl edit nginx", "create a drop-in override (safe)"],
            ["systemctl edit --full nginx", "edit a full copy of the unit"],
            ["systemctl daemon-reload", "reload after editing unit files"],
            ["systemctl show nginx", "dump every property"],
          ],
        },
        {
          type: "callout",
          variant: "danger",
          title: "Always daemon-reload after editing.",
          body:
            "systemd caches unit files. Change one and forget `sudo systemctl daemon-reload` and it keeps running the old definition — a classic \"why isn't my change working\" trap.",
        },
      ],
    },
    {
      heading: "System State",
      variant: "danger",
      keywords: "system state reboot poweroff suspend target default analyze boot time",
      blocks: [
        {
          type: "table",
          head: ["Command", "Does"],
          rows: [
            ["systemctl reboot", "restart the machine"],
            ["systemctl poweroff", "shut down"],
            ["systemctl suspend", "sleep"],
            ["systemctl get-default", "current boot target (e.g. graphical)"],
            ["systemd-analyze blame", "what slowed down the last boot"],
          ],
        },
      ],
    },
  ],
};
