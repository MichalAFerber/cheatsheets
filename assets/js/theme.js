/* Dark/light theme toggle. The initial theme is set before paint by the inline
   script in head.html (stored choice, else prefers-color-scheme). This wires the
   header button to flip it, persists the choice, and keeps the OS in sync until
   the user makes an explicit choice. */
(function () {
  var root = document.documentElement;

  function current() {
    return root.getAttribute("data-theme") === "dark" ? "dark" : "light";
  }

  function apply(theme, persist) {
    root.setAttribute("data-theme", theme);
    if (persist) {
      try { localStorage.setItem("theme", theme); } catch (e) {}
    }
    var btn = document.querySelector(".theme-toggle");
    if (btn) {
      btn.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
      btn.setAttribute("title", theme === "dark" ? "Switch to light theme" : "Switch to dark theme");
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    apply(current(), false); // sync the button's aria-pressed on load
    var btn = document.querySelector(".theme-toggle");
    if (btn) {
      btn.addEventListener("click", function () {
        apply(current() === "dark" ? "light" : "dark", true);
      });
    }
  });

  // Follow OS changes only while the user hasn't chosen explicitly.
  try {
    matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function (e) {
      if (localStorage.getItem("theme")) return;
      apply(e.matches ? "dark" : "light", false);
    });
  } catch (e) {}
})();
