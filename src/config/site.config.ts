// All business facts live here. Replace every owner placeholder below, then run `npm run check:todo`.
export const siteConfig = {
  name: "Nine Aces Pool & Cafe",
  shortAddress: "TODO(owner): area, city", // hero eyebrow + footer
  tagline: { id: "TODO(owner): tagline", en: "TODO(owner): tagline" },
  profile: {
    // 2 to 3 sentences each
    id: "TODO(owner): profil singkat",
    en: "TODO(owner): short profile",
  },
  hours: { id: "TODO(owner): jam buka", en: "TODO(owner): opening hours" },
  since: "", // e.g. "2019"; empty hides the block
  address: { id: "TODO(owner): alamat", en: "TODO(owner): address" },
  mapsLink: "TODO(owner): https://maps.app.goo.gl/...",
  mapsEmbedUrl: "TODO(owner): https://www.google.com/maps/embed?pb=...",
  whatsappNumber: "TODO(owner): 62xxxxxxxxxx", // digits only, country code, no + or leading 0
  whatsappDisplay: "TODO(owner): +62 xxx-xxxx-xxxx",
  whatsappMessage: {
    id: "Halo Nine Aces, saya mau booking meja.",
    en: "Hi Nine Aces, I'd like to book a table.",
  },
  instagram: "TODO(owner): handle without @",
  tiktok: "TODO(owner): handle without @",
  showAgeNoteOnCigarettes: false, // TODO(owner): decide
  showEmptyPhotoSlots: true, // false: slots without a photo are omitted (set false before launch if photos are still missing)
};

export type SiteConfig = typeof siteConfig;
