/* Shared website-only dark mode. No extension settings or recordings are changed. */
(function () {
  "use strict";
  const KEY = "ta_site_dark_mode";
  const root = document.documentElement;
  const button = document.getElementById("ta-theme-toggle");
  if (!button) return;

  function update(dark) {
    if (dark) root.setAttribute("data-ta-theme", "dark");
    else root.removeAttribute("data-ta-theme");
    button.setAttribute("aria-pressed", String(dark));
    const label = dark ? "Switch to light mode" : "Switch to dark mode";
    button.setAttribute("aria-label", label);
    button.setAttribute("title", label);
  }

  update(root.getAttribute("data-ta-theme") === "dark");
  button.addEventListener("click", function () {
    const dark = root.getAttribute("data-ta-theme") !== "dark";
    update(dark);
    try { localStorage.setItem(KEY, dark ? "dark" : "light"); } catch (_) {}
  });

  window.addEventListener("storage", function (event) {
    if (event.key === KEY) update(event.newValue === "dark");
  });
}());
