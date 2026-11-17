export type PhotoSlotDef = {
  id: string; // slot id, also the file name without extension
  folder: string; // folder under src/assets/images/
  ratio: string; // CSS aspect-ratio on desktop, e.g. "4 / 5"
  ratioMobile?: string; // e.g. "16 / 9"
  alt: { id: string; en: string }; // descriptive alt text per language
  enabled: boolean;
};

export const photoSlots: PhotoSlotDef[] = [
  { id: "main-course", folder: "menu", ratio: "4 / 5", ratioMobile: "16 / 9", enabled: true,
    alt: { id: "Hidangan makanan utama di Nine Aces", en: "Main course dishes at Nine Aces" } },
  { id: "additionals", folder: "menu", ratio: "4 / 5", ratioMobile: "16 / 9", enabled: true,
    alt: { id: "Menu tambahan di Nine Aces", en: "Additional items at Nine Aces" } },
  { id: "beverages", folder: "menu", ratio: "4 / 5", ratioMobile: "16 / 9", enabled: true,
    alt: { id: "Minuman di Nine Aces", en: "Beverages at Nine Aces" } },
  { id: "snacks", folder: "menu", ratio: "4 / 5", ratioMobile: "16 / 9", enabled: true,
    alt: { id: "Camilan di Nine Aces", en: "Snacks at Nine Aces" } },
  { id: "cigarettes", folder: "menu", ratio: "4 / 5", ratioMobile: "16 / 9", enabled: true,
    alt: { id: "Pilihan rokok di Nine Aces", en: "Cigarette selection at Nine Aces" } },
  { id: "gloves", folder: "menu", ratio: "4 / 5", ratioMobile: "16 / 9", enabled: true,
    alt: { id: "Sarung tangan billiard di Nine Aces", en: "Billiard gloves at Nine Aces" } },
  // Optional hero background photo. Off by default; the hero is typography-only unless enabled.
  { id: "hero-bg", folder: "hero", ratio: "16 / 9", enabled: false,
    alt: { id: "", en: "" } },
];

export const IMAGE_EXTENSIONS = ["webp", "jpg", "jpeg", "png"] as const;

export function getSlot(id: string): PhotoSlotDef | undefined {
  return photoSlots.find((s) => s.id === id);
}
