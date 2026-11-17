// Build-time i18n. Approach used everywhere: one dictionary per language that merges
// the UI strings (src/i18n/*.json) with the bilingual config content (cfg.*) and the
// photo alt texts (photo.*). Every translatable node carries data-i18n / data-i18n-attr.
import id from "../i18n/id.json";
import en from "../i18n/en.json";
import { siteConfig } from "../config/site.config";
import { photoSlots } from "../config/images";
import { DEFAULT_LANG, LANGS, whatsappLink, type Lang } from "./site";

export type Dict = Record<string, string>;

const year = String(new Date().getFullYear());

function build(lang: Lang, ui: Dict): Dict {
  const d: Dict = { ...ui };
  d["cfg.tagline"] = siteConfig.tagline[lang];
  d["cfg.profile"] = siteConfig.profile[lang];
  d["cfg.hours"] = siteConfig.hours[lang];
  d["cfg.address"] = siteConfig.address[lang];
  for (const slot of photoSlots) d[`photo.${slot.id}`] = slot.alt[lang];
  d["footer.rights"] = d["footer.rights"].replace("{year}", year);
  return d;
}

export const dictionaries: Record<Lang, Dict> = {
  id: build("id", id as Dict),
  en: build("en", en as Dict),
};

/** Payload embedded in the page for the client-side switcher. */
export const clientPayload = {
  defaultLang: DEFAULT_LANG,
  langs: LANGS,
  dict: dictionaries,
  wa: Object.fromEntries(LANGS.map((l) => [l, whatsappLink(l)])) as Record<Lang, string>,
};

/** Translate a key in the default (build-time) language. */
export function t(key: string, lang: Lang = DEFAULT_LANG): string {
  const value = dictionaries[lang][key];
  if (value === undefined) throw new Error(`Missing i18n key "${key}" for "${lang}"`);
  return value;
}
