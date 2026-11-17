// Navbar: solid after 16px, hide on scroll down / show on scroll up, mobile popup panel,
// active-section highlight. The entrance animation is pure CSS (.js .site-header).
import { t } from "./i18n";

const header = document.querySelector<HTMLElement>("[data-navbar]");
const toggle = document.querySelector<HTMLButtonElement>("[data-nav-toggle]");
const panel = document.querySelector<HTMLElement>("[data-nav-panel]");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (header) {
  const SOLID_AT = 16;
  const HIDE_AFTER = 80;
  const DELTA = 6;
  let lastY = window.scrollY;
  let ticking = false;

  const isPanelOpen = () => panel?.classList.contains("is-open") ?? false;

  const update = () => {
    const y = window.scrollY;
    header.classList.toggle("is-solid", y > SOLID_AT || isPanelOpen());

    const focusInside = header.contains(document.activeElement) && document.activeElement !== document.body;
    if (isPanelOpen() || focusInside || y <= HIDE_AFTER) {
      header.classList.remove("is-hidden");
    } else if (y > lastY + DELTA) {
      header.classList.add("is-hidden");
    } else if (y < lastY - DELTA) {
      header.classList.remove("is-hidden");
    }
    if (Math.abs(y - lastY) > DELTA) lastY = y;
    ticking = false;
  };

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    },
    { passive: true },
  );
  header.addEventListener("focusin", () => header.classList.remove("is-hidden"));
  update();

  // ---- Mobile popup panel ----
  if (toggle && panel) {
    const focusables = () =>
      Array.from(panel.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"));

    const setOpen = (open: boolean, returnFocus = true) => {
      panel.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", t(open ? "nav.closeMenu" : "nav.openMenu"));
      update();
      if (open) {
        // Wait one frame so the panel is visible (visibility transition) before focusing.
        requestAnimationFrame(() => focusables()[0]?.focus());
      } else if (returnFocus) {
        toggle.focus();
      }
    };

    toggle.addEventListener("click", () => setOpen(!isPanelOpen()));

    panel.addEventListener("click", (e) => {
      if ((e.target as HTMLElement).closest("a")) setOpen(false, false);
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && isPanelOpen()) {
        e.preventDefault();
        setOpen(false);
      }
    });

    document.addEventListener("click", (e) => {
      if (!isPanelOpen()) return;
      const target = e.target as Node;
      if (!panel.contains(target) && !toggle.contains(target)) setOpen(false, false);
    });

    // Closing when the layout switches to desktop keeps state consistent.
    window.matchMedia("(min-width: 48rem)").addEventListener("change", (e) => {
      if (e.matches && isPanelOpen()) setOpen(false, false);
    });
  }
}

// ---- Active section highlight ----
const links = Array.from(document.querySelectorAll<HTMLAnchorElement>("[data-nav-link]"));
const sections = Array.from(new Set(links.map((a) => a.getAttribute("href"))))
  .map((href) => (href ? document.querySelector<HTMLElement>(href) : null))
  .filter((el): el is HTMLElement => el !== null);

const setActive = (id: string) => {
  for (const a of links) {
    if (a.getAttribute("href") === `#${id}`) a.setAttribute("aria-current", "true");
    else a.removeAttribute("aria-current");
  }
};

if ("IntersectionObserver" in window && sections.length) {
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
    },
    { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
  );
  sections.forEach((s) => io.observe(s));
}

// ---- Smooth anchor scrolling (CSS scroll-behavior; disabled under reduced motion) ----
const applyScrollBehavior = () => {
  document.documentElement.style.scrollBehavior = reduceMotion.matches ? "auto" : "smooth";
};
applyScrollBehavior();
reduceMotion.addEventListener("change", applyScrollBehavior);
