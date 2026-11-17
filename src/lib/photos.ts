import type { ImageMetadata } from "astro";
import { getSlot, IMAGE_EXTENSIONS, type PhotoSlotDef } from "../config/images";
import { siteConfig } from "../config/site.config";

// Every photo dropped into src/assets/images/<folder>/<id>.<ext> is picked up here.
const files = import.meta.glob<{ default: ImageMetadata }>(
  "/src/assets/images/**/*.{webp,jpg,jpeg,png}",
  { eager: true },
);

export type ResolvedSlot = {
  def: PhotoSlotDef;
  image: ImageMetadata | null;
  /** Whether the slot produces any markup at all. */
  render: boolean;
  expectedPath: string;
};

export function resolveSlot(id: string): ResolvedSlot {
  const def = getSlot(id);
  if (!def) throw new Error(`Unknown photo slot "${id}" (add it to src/config/images.ts)`);

  let image: ImageMetadata | null = null;
  for (const ext of IMAGE_EXTENSIONS) {
    const mod = files[`/src/assets/images/${def.folder}/${def.id}.${ext}`];
    if (mod) {
      image = mod.default;
      break;
    }
  }

  const render = def.enabled && (image !== null || siteConfig.showEmptyPhotoSlots);
  return {
    def,
    image: def.enabled ? image : null,
    render,
    expectedPath: `src/assets/images/${def.folder}/${def.id}.webp`,
  };
}
