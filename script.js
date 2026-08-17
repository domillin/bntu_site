(() => {
  "use strict";

  //  automaticall dark theme (19:00-7:00). Manuall toggle can override this
  const THEME_KEY = "dorm19-theme-override";
  const root = document.documentElement;
  const toggleBtn = document.getElementById("themeToggle");
  const toggleIcon = document.getElementById("themeToggleIcon");
  const resetBtn = document.getElementById("themeReset");
  const themeColorMeta = document.getElementById("themeColorMeta");

  const THEME_COLORS = { light: "#eef0e8", dark: "#12161a" };

  function autoTheme() {
    const hour = new Date().getHours();
    return (hour >= 19 || hour < 7) ? "dark" : "light";
  }

  function getOverride() {
    try {
      return localStorage.getItem(THEME_KEY);
    } catch (e) {
      return null;
    }
  }

  function setOverride(value) {
    try {
      if (value) localStorage.setItem(THEME_KEY, value);
      else localStorage.removeItem(THEME_KEY);
    } catch (e) { /* storage unavailable, ignore */ }
  }

  function applyTheme() {
    const override = getOverride();
    const theme = override || autoTheme();
    root.setAttribute("data-theme", theme);
    if (themeColorMeta) themeColorMeta.setAttribute("content", THEME_COLORS[theme]);
    if (toggleIcon) toggleIcon.textContent = theme === "dark" ? "🌙" : "☀️";
    if (toggleBtn) {
      toggleBtn.setAttribute(
        "aria-label",
        theme === "dark" ? "Переключить на светлую тему" : "Переключить на тёмную тему"
      );
    }
    if (resetBtn) resetBtn.hidden = !override;
  }

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const current = root.getAttribute("data-theme");
      setOverride(current === "dark" ? "light" : "dark");
      applyTheme();
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      setOverride(null);
      applyTheme();
    });
  }

  applyTheme();
  // recheck every minute
  setInterval(applyTheme, 60 * 1000);
})();
