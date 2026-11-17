import { siteConfig } from "../config/site.config";

export type Lang = "id" | "en";
export const LANGS: Lang[] = ["id", "en"];
export const DEFAULT_LANG: Lang = "id"; // TODO(owner): confirm default language

const TODO_MARK = "TODO" + "(owner)"; // split so check:todo does not match this line

/** True when a config value is still an unfilled owner placeholder. */
export function isTodo(value: string | undefined | null): boolean {
  return typeof value === "string" && value.includes(TODO_MARK);
}

/** True when a value is present (placeholders count as present so they stay visible). */
export function hasValue(value: string | undefined | null): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

/** Full rupiah integer to thousands: 30000 -> "30", 12500 -> "12,5". */
export function formatPrice(p: number): string {
  return String(p / 1000).replace(".", ",");
}

/** WhatsApp deep link. Every WhatsApp href on the page is built here. */
export function whatsappLink(lang: Lang): string {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(siteConfig.whatsappMessage[lang])}`;
}

export function instagramLink(): string {
  return `https://instagram.com/${siteConfig.instagram}`;
}

export function tiktokLink(): string {
  return `https://www.tiktok.com/@${siteConfig.tiktok}`;
}
