// Client-side language switcher. Text is rendered at build time in the default language;
// this swaps every [data-i18n] / [data-i18n-attr] node, WhatsApp hrefs, title and meta.
type Lang = "id" | "en";
type Payload = {
  defaultLang: Lang;
  langs: Lang[];
  dict: Record<Lang, Record<string, string>>;
  wa: Record<Lang, string>;
};

const STORAGE_KEY = "lang";
const root = document.documentElement;
const dataEl = document.getElementById("i18n-data");
const payload: Payload | null = dataEl ? JSON.parse(dataEl.textContent || "null") : null;

function store(lang: Lang) {
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    /* storage unavailable: choice lasts for this page view only */
  }
}

export function applyLang(lang: Lang) {
  if (!payload) return;
  const dict = payload.dict[lang];
  if (!dict) return;

  root.lang = lang;

  document.querySelectorAll<HTMLElement>("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    if (key && dict[key] !== undefined) el.textContent = dict[key];
  });

  document.querySelectorAll<HTMLElement>("[data-i18n-attr]").forEach((el) => {
    for (const pair of (el.dataset.i18nAttr || "").split(";")) {
      const [attr, key] = pair.split(":").map((s) => s.trim());
      if (attr && key && dict[key] !== undefined) el.setAttribute(attr, dict[key]);
    }
  });

  document.querySelectorAll<HTMLAnchorElement>("a[data-wa]").forEach((a) => {
    a.href = payload.wa[lang];
  });

  if (dict["meta.title"]) document.title = dict["meta.title"];
  document.querySelector('meta[name="description"]')?.setAttribute("content", dict["meta.description"] ?? "");

  document.querySelectorAll<HTMLButtonElement>("[data-lang-btn]").forEach((btn) => {
    btn.setAttribute("aria-pressed", String(btn.dataset.langBtn === lang));
  });

  // Keep the menu toggle label in sync with its state.
  const toggle = document.querySelector<HTMLButtonElement>("[data-nav-toggle]");
  if (toggle) {
    const open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-label", dict[open ? "nav.closeMenu" : "nav.openMenu"]);
  }

  window.dispatchEvent(new CustomEvent("langchange", { detail: { lang } }));
}

export function currentLang(): Lang {
  return (root.lang as Lang) || payload?.defaultLang || "id";
}

export function t(key: string): string {
  return payload?.dict[currentLang()]?.[key] ?? key;
}

if (payload) {
  const initial = payload.langs.includes(root.lang as Lang) ? (root.lang as Lang) : payload.defaultLang;
  if (initial !== payload.defaultLang) applyLang(initial);
  else document.querySelectorAll<HTMLButtonElement>("[data-lang-btn]").forEach((btn) => {
    btn.setAttribute("aria-pressed", String(btn.dataset.langBtn === initial));
  });
  root.classList.remove("i18n-pending");

  document.querySelectorAll<HTMLButtonElement>("[data-lang-btn]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const lang = btn.dataset.langBtn as Lang;
      if (!payload.langs.includes(lang) || lang === currentLang()) return;
      store(lang);
      applyLang(lang);
    });
  });
} else {
  root.classList.remove("i18n-pending");
}
