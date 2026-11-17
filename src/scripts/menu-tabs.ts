// Accessible tabs: roving tabindex, Left/Right/Home/End, panels toggled via `hidden`.
document.querySelectorAll<HTMLElement>("[data-tablist]").forEach((tablist) => {
  const tabs = Array.from(tablist.querySelectorAll<HTMLButtonElement>("[data-tab]"));
  const panelFor = (tab: HTMLElement) =>
    document.getElementById(tab.getAttribute("aria-controls") || "");

  const select = (next: HTMLButtonElement, focus = true) => {
    for (const tab of tabs) {
      const active = tab === next;
      tab.setAttribute("aria-selected", String(active));
      tab.tabIndex = active ? 0 : -1;
      const panel = panelFor(tab);
      if (!panel) continue;
      if (active) {
        if (panel.hidden) {
          panel.hidden = false;
          panel.classList.remove("is-entering");
          void panel.offsetWidth; // restart the fade
          panel.classList.add("is-entering");
        }
      } else {
        panel.hidden = true;
        panel.classList.remove("is-entering");
      }
    }
    if (focus) next.focus();
    next.scrollIntoView({ block: "nearest", inline: "nearest" });
  };

  tabs.forEach((tab, i) => {
    tab.addEventListener("click", () => select(tab, false));
    tab.addEventListener("keydown", (e) => {
      let target: number | null = null;
      if (e.key === "ArrowRight") target = (i + 1) % tabs.length;
      else if (e.key === "ArrowLeft") target = (i - 1 + tabs.length) % tabs.length;
      else if (e.key === "Home") target = 0;
      else if (e.key === "End") target = tabs.length - 1;
      if (target === null) return;
      e.preventDefault();
      select(tabs[target]);
    });
  });
});
