/* Adds copy-to-clipboard buttons to code blocks and to command cells in the
   reference tables. Loaded with `defer` so the DOM is ready. */
(function () {
  var COPY = '<svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true"><path fill="currentColor" d="M16 1H4a2 2 0 0 0-2 2v12h2V3h12V1zm3 4H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm0 16H8V7h11v14z"/></svg>';
  var DONE = '<svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true"><path fill="currentColor" d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>';

  function copy(text, btn) {
    var write = navigator.clipboard
      ? navigator.clipboard.writeText(text)
      : new Promise(function (res, rej) {
          var t = document.createElement("textarea");
          t.value = text; t.style.position = "fixed"; t.style.opacity = "0";
          document.body.appendChild(t); t.select();
          try { document.execCommand("copy"); res(); } catch (e) { rej(e); }
          document.body.removeChild(t);
        });
    write.then(function () {
      btn.innerHTML = DONE;
      btn.classList.add("copied");
      setTimeout(function () { btn.innerHTML = COPY; btn.classList.remove("copied"); }, 1400);
    });
  }

  function button(extraClass) {
    var b = document.createElement("button");
    b.type = "button";
    b.className = "copy-btn" + (extraClass ? " " + extraClass : "");
    b.setAttribute("aria-label", "Copy");
    b.innerHTML = COPY;
    return b;
  }

  document.addEventListener("DOMContentLoaded", function () {
    // Fenced code blocks / recipes.
    document.querySelectorAll(".md-typeset pre").forEach(function (pre) {
      var code = pre.querySelector("code") || pre;
      var wrap = document.createElement("div");
      wrap.className = "code-wrap";
      pre.parentNode.insertBefore(wrap, pre);
      wrap.appendChild(pre);
      var btn = button();
      btn.addEventListener("click", function () { copy(code.innerText.replace(/\n+$/, ""), btn); });
      wrap.appendChild(btn);
    });

    // Command cells in the reference tables (first column).
    document.querySelectorAll(".md-typeset table:not([class]) td:first-child code").forEach(function (code) {
      var btn = button("copy-btn--inline");
      btn.addEventListener("click", function (e) { e.preventDefault(); copy(code.innerText, btn); });
      code.parentNode.appendChild(btn);
    });
  });
})();
