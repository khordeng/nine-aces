# Nine Aces Pool & Cafe: landing page spec

Single-page, static, bilingual (ID/EN) landing page for a billiard house.
Read this whole file before writing code. Follow it literally. Where something is
marked `TODO(owner)`, the owner has not supplied it yet: do NOT invent it.

---

## 0. Rules against slop (hard constraints)

- Build ONLY the sections listed in section 4, in that order. No extra sections (no testimonials, no "about the team", no blog, no newsletter, no pricing for tables).
- NEVER invent business facts: address, phone, hours, founding year, tagline, social handles, reviews, stats, awards. Use the placeholders from `site.config.ts` and keep the `TODO(owner)` marker visible in the string.
- No lorem ipsum. No stock photos. No emoji anywhere (UI, code comments, commit messages). Icons are inline SVG.
- No gradients, glassmorphism, drop shadows, glow, or blur. Flat surfaces only.
- No colors outside the token table in section 3. No new fonts.
- No UI frameworks (React, Vue, Svelte). Vanilla JS only, in small modules.
- No "Coming soon" text and no fake or stock imagery. Photos are not available yet, so every place a photo will go is a reserved PHOTO SLOT (section 4.8). A missing image renders a neutral empty slot, never a substitute picture.
- Do not add dependencies beyond section 2 without a one-line justification in the PR/commit message.

---

## 1. Goal and scope

- Goal: let a visitor (a) see what Nine Aces is, (b) find and navigate to the place, (c) read the menu and prices, (d) contact the venue via WhatsApp, Instagram, or TikTok.
- Only two real "features": WhatsApp deep link and Google Maps (embed + open-in-Maps link). Everything else is content.
- Primary device: phone (most visitors come from social links). Design mobile-first, verify at 360, 768, 1280 px.
- Out of scope: online booking, payments, login, CMS, backend, analytics (add later if requested).

---

## 2. Stack

- Astro (latest stable), static output (`output: 'static'`). TypeScript for config and data files.
- Tailwind CSS (v4, via the official Vite plugin for Astro).
- Vanilla JS modules for: navbar behavior, menu tabs, language switcher.
- Fonts self-hosted via Fontsource where possible; fallback is a Google Fonts `<link>` (see section 3.2).
- Package manager: npm.
- Deploy target: any static host (Vercel / Netlify / Cloudflare Pages). No server code.

Folder structure:

```
/
  SPEC.md
  astro.config.mjs
  package.json
  public/
    logo.svg                  # TODO(owner): if missing, render text wordmark "NINE ACES"
    og-image.jpg              # TODO(owner)
    favicon.svg
  src/
    assets/images/menu/       # photo slots: <categoryId>.webp|jpg|jpeg|png (section 4.8)
    config/site.config.ts     # ALL business facts live here (section 6)
    config/images.ts          # photo slot manifest (section 4.8)
    data/menu.ts              # menu data (section 5)
    i18n/id.json
    i18n/en.json
    styles/global.css         # Tailwind import + tokens as CSS variables
    layouts/Base.astro
    components/
      Navbar.astro
      Hero.astro
      Location.astro
      Menu.astro
      Contact.astro
      Footer.astro
      PhotoSlot.astro         # reusable photo slot (section 4.8)
    scripts/
      navbar.ts
      menu-tabs.ts
      i18n.ts
      reveal.ts               # scroll-reveal (section 4.7)
    pages/index.astro
  scripts/check-todo.mjs      # fails if any "TODO(owner)" remains (section 9)
```

---

## 3. Design system

Brand reference: black and gold jersey (charcoal base, champagne gold metallic ornament, lotus/mandala motif). Overall feel: dark, elegant, editorial. Not neon, not playful.

### 3.1 Color tokens

Define as CSS variables in `global.css` and expose to Tailwind. Use ONLY these.

| Token | Hex | Use |
|---|---|---|
| `--bg` | `#0A0908` | Page and hero background |
| `--bg-alt` | `#111111` | Alternate section background |
| `--bg-alt-2` | `#1A1816` | Second alternate / panels |
| `--card` | `#262626` | Cards, contact tiles |
| `--line` | `#2A2622` | Hairlines, dividers, leader dots (dotted `#3A352F`) |
| `--text` | `#F5F0E6` | Primary text (warm off-white, never pure white) |
| `--text-2` | `#B8B8B8` | Secondary text |
| `--text-muted` | `#9A9382` | Small labels (OPEN / SINCE / CONTACT) |
| `--gold` | `#D2B87D` | Accent: CTAs, prices, active states, outline text, icons |
| `--gold-hover` | `#E8D090` | Hover of gold elements |
| `--gold-dark` | `#8A6D2B` | Gold text on LIGHT surfaces only (not used unless a light surface is added) |
| `--outline-neutral` | `#BFBAB0` | Stroke for the "ACES" outline word |

Proportion: background is ALWAYS black/charcoal. Off-white is used for text and key elements (about 40% of visible ink), gold is an accent (about 10%). Never use gold for long paragraphs. Never use `#FFD700` or any saturated yellow.

Contrast: all text must pass WCAG AA (4.5:1; 3:1 at 24px and above). `--text-muted` on `--bg` is acceptable for 11px+ labels; do not go darker.

### 3.2 Typography

| Role | Font | Settings |
|---|---|---|
| Display (hero words) | Archivo | width axis 125 (expanded), weight 800, uppercase |
| Section headings, taglines | Instrument Serif | italic, weight 400 |
| Body and UI | Archivo | width 100, weights 400 and 500 only |
| Small labels | Archivo | 11 to 12 px, uppercase, `letter-spacing` 0.18 to 0.25em, weight 500 |

- Heading weights: only 400 and 500 outside the hero. No 600/700.
- Archivo must include the `wdth` axis. Preferred: `@fontsource-variable/archivo` (use the width-axis CSS file) and `@fontsource/instrument-serif` (italic). Fallback if the width axis is unavailable: `https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@100..125,400..800&family=Instrument+Serif:ital@1&display=swap`.
- `font-display: swap`. Preload the display font file used above the fold.
- Fluid hero size: see section 4.2. Body 16px, line-height 1.6.

### 3.3 Spacing, shape, motion

- Container: `max-width: 1200px`, horizontal padding 1.25rem (mobile), 2rem (md), 3rem (lg).
- Section vertical padding: 4rem mobile, 6rem desktop.
- Radius: 6px buttons, 10px cards. Hairline borders 0.5 to 1px using `--line`.
- Motion: transitions 150 to 250ms, ease-out. Everything must respect `prefers-reduced-motion: reduce` (disable transforms/animations, keep instant state changes).
- Focus: visible focus ring on every interactive element: 2px solid `--gold`, offset 2px.
- Touch targets at least 44x44 px.

### 3.4 Buttons

- Primary: background `--gold`, text `--bg`, weight 500, radius 6px, padding 0.75rem 1.25rem. Hover `--gold-hover`.
- Secondary: transparent, 1px border `--gold`, text `--gold`. Hover: background `--gold` at 10% opacity.
- Only one primary button per viewport region.

---

## 4. Sections (in this exact order)

Section ids (anchors): `#home`, `#location`, `#menu`, `#contact`. Add `scroll-margin-top` equal to navbar height. Use semantic landmarks: `<header>`, `<main>`, `<section aria-labelledby=...>`, `<footer>`.

### 4.1 Navbar (fixed, animated)

Content:
- Left: logo (`/logo.svg`) or text wordmark "NINE ACES" in `--gold`, weight 500, letter-spacing 0.08em.
- Center/right (desktop): anchor links Home, Location, Menu, Contact (i18n keys `nav.*`).
- Right: language switcher (section 7) and WhatsApp button (primary, links to the WhatsApp deep link).
- Mobile: hamburger button replaces the links; the links, language switcher, and WhatsApp button live in the popup panel.

Behavior (ASSUMPTION: "animated pop-up navbar" means the three behaviors below; the owner may refine):
1. Entrance: on first load the bar slides down from `translateY(-100%)` to 0 with a fade, 500ms ease-out, once.
2. Scroll: bar is transparent over the hero at scroll 0, then gets solid `--bg` with a bottom hairline `--line` after 16px of scroll. It hides on scroll DOWN (after 80px) and reappears on scroll UP. It never hides while the mobile panel is open or while focus is inside it.
3. Mobile panel: opens as a popup under the bar, animating `opacity 0 to 1` and `translateY(-8px) scale(0.98)` to none, 200ms, transform-origin top right. Closes on link click, Escape, outside click, or hamburger toggle. `aria-expanded` and `aria-controls` on the button; focus moves into the panel on open and returns to the button on close.
4. Active link highlight: use `IntersectionObserver` to mark the current section link (gold text + 1.5px gold underline, `aria-current="true"`).
5. Anchor links use smooth scrolling (disabled under reduced motion).

Height: 64px mobile, 72px desktop.

### 4.2 Hero (`#home`)

Visual reference: large editorial type stack on near-black, small spaced caps above, italic serif tagline, small info row below. Layout is left-aligned on desktop and mobile.

Structure top to bottom:
1. Eyebrow (small caps, `--gold`): `config.shortAddress` (e.g. area, city). Hidden if empty.
2. Title stack, three lines, uppercase, Archivo expanded 800, line-height 0.98:
   - Line 1 `NINE`: solid `--text`.
   - Line 2 `ACES`: transparent fill, `-webkit-text-stroke: 1.5px var(--outline-neutral)`.
   - Line 3 `POOL & CAFE`: transparent fill, `-webkit-text-stroke: 1.5px var(--gold)`.
   - All three lines use the same font-size. `POOL & CAFE` must stay on ONE line and never overflow or wrap. Start with `font-size: clamp(2rem, 9vw, 8rem)` and verify at 320, 360, 390, 768, 1280, 1920 px; adjust the vw value if it overflows. Use `white-space: nowrap`. Stroke 2px on mobile if 1.5px looks too thin.
   - Provide an `sr-only` text version of the full name inside the `<h1>` and mark the visual lines `aria-hidden="true"`.
3. Tagline (Instrument Serif italic, ~22px mobile to 32px desktop, `--text`), prefixed with an em dash: `config.tagline[lang]`.
4. Short profile paragraph (2 to 3 sentences, body, `--text-2`, max-width 52ch): `config.profile[lang]`.
5. Info row (3 columns, wraps on mobile): label (small caps, `--text-muted`) over value (12px, uppercase, letter-spacing 0.12em, `--text`, weight 500):
   - OPEN: `config.hours[lang]`
   - SINCE: `config.since` (hide the whole block if empty)
   - CONTACT: `config.whatsappDisplay`
6. CTA row: primary "Chat on WhatsApp" (WhatsApp deep link) and secondary "See location" (anchor `#location`).

Background: flat `--bg`. Optional (only if `public/images/hero-ornament.svg` exists): a lotus outline ornament at 8 to 12% opacity behind the text, `aria-hidden`. Do not create or generate this ornament.

Min height: `min-height: 100svh` on mobile and desktop, content vertically centered below the navbar.

### 4.3 Location (`#location`)

- Section heading (Instrument Serif italic): i18n `location.title`.
- Desktop (md+): two columns, map left (about 60%), info right (about 40%), vertically centered. Mobile: stacked, map first.
- Map: `<iframe>` using `config.mapsEmbedUrl` (Google Maps "Share > Embed a map" URL, no API key). Attributes: `loading="lazy"`, `referrerpolicy="no-referrer-when-downgrade"`, `title` = i18n `location.mapTitle`, `allowfullscreen`. Aspect ratio 4/3 (mobile 1/1 allowed), radius 10px, 1px `--line` border.
  - Optional dark-map treatment: `filter: invert(92%) hue-rotate(180deg) contrast(0.9)` on the iframe. Test it; if the map looks wrong or unreadable, remove it.
- Info column:
  - Venue name (weight 500).
  - Simple address: `config.address[lang]` (plain text, 1 to 3 lines, `--text-2`).
  - Button (secondary or primary): "Open in Google Maps" (i18n `location.openMaps`) as an `<a href={config.mapsLink} target="_blank" rel="noopener noreferrer">`. It must open the Google Maps app on mobile (use the normal `https://maps.app.goo.gl/...` or `https://www.google.com/maps/...` link from the owner, do not build custom `geo:` links).
  - Optionally show hours again here ONLY if `config.hours` is set; do not duplicate if the hero already shows it prominently (hero info row is enough, so omit here).
- If `mapsEmbedUrl` is a TODO placeholder, render the info column only and no iframe.

### 4.4 Menu (`#menu`)

- Heading: eyebrow (small caps gold) i18n `menu.eyebrow`, title (Instrument Serif italic) i18n `menu.title`.
- Tab bar: horizontal, centered on desktop, horizontally scrollable on mobile (no wrap, hide scrollbar visually, keep it scrollable, fade nothing). Tab = small caps text (11px, letter-spacing 0.18em, `--text-muted`); active tab = `--text` with a 1.5px `--gold` bottom border. Tab padding gives a 44px minimum height.
- Under the tab bar, a small note (`--text-muted`, 12px): i18n `menu.priceNote`.
- Panels: one per category, ALL rendered into the HTML at build time (good for SEO and no-JS), inactive ones carry the `hidden` attribute. JS only toggles `hidden`.
- Panel layout:
  - Category title (Instrument Serif italic, 28 to 36px) with a 36px by 1.5px gold rule beneath it.
  - Item list: each row is flex, baseline aligned: item name (weight 500, `--text`), a flexible dotted leader (`border-bottom: 1px dotted var(--line-dot)` where dot color is `#3A352F`, slightly raised), price (`--gold`, weight 500, tabular numbers). Rows separated by a hairline `--line`. Row vertical padding 0.7rem.
  - Item names are NOT translated (they are product names). Category names and UI strings are translated.
  - Image column: rendered with `PhotoSlot` (section 4.8), slot id `menu-<categoryId>`. Two columns on md+ (list about 60%, slot about 40%, 4/5 ratio, radius 8px). On mobile the slot sits ABOVE the list at 16/9. The slot is always present by default, empty or filled. Only when `siteConfig.showEmptyPhotoSlots` is `false` AND the file is missing, omit the slot and let the list take a single column with `max-width: 40rem`.
- Price display: data stores full rupiah as an integer (`30000`). Display the thousands only, no suffix: `30000` renders as `30`. Implement `formatPrice(p) = String(p / 1000)` in ONE place. The data is guaranteed to be multiples of 1000; if a future price is not, render with a decimal comma (`12,5`).
- Tabs behavior and a11y: `role="tablist"`, `role="tab"` with `aria-selected`, `aria-controls`, `role="tabpanel"` with `aria-labelledby`. Roving `tabindex`. Left/Right arrow keys move between tabs, Home/End jump to first/last. Default tab: first category.
- Cigarettes tab: render like the others. Optional small `18+` label next to the tab title, controlled by `config.showAgeNoteOnCigarettes` (default `false`). `TODO(owner)`: decide.

### 4.5 Contact (`#contact`)

- Heading: eyebrow i18n `contact.eyebrow`, title i18n `contact.title`, one short line i18n `contact.subtitle`.
- Three tiles (grid 1 col mobile, 3 cols md+), each a single `<a>` (whole tile is the link), card background `--card`, radius 10px, padding 1.5rem, icon (inline SVG, 28px, `--gold`), label (WhatsApp / Instagram / TikTok), value (handle or number, `--text-2`):
  1. WhatsApp (visually primary: gold border): `config.whatsappLink[lang]` (deep link, section 6). Value: `config.whatsappDisplay`.
  2. Instagram: `https://instagram.com/{config.instagram}`. Value: `@{config.instagram}`.
  3. TikTok: `https://www.tiktok.com/@{config.tiktok}`. Value: `@{config.tiktok}`.
- All open in a new tab with `rel="noopener noreferrer"`. Hover: border becomes `--gold`. Hide any tile whose config value is empty.
- Brand icons: inline SVG paths (WhatsApp, Instagram, TikTok). Use simple, official-style glyphs; no icon font, no emoji.

### 4.6 Footer

- Wordmark "NINE ACES POOL & CAFE" (small caps, gold), then `config.shortAddress` and the social handles as plain links, then `(c) {currentYear} Nine Aces Pool & Cafe` (i18n `footer.rights`). Background `--bg`, top hairline `--line`. Keep it minimal.

### 4.7 Scroll-reveal animation (site-wide)

When the visitor scrolls down, content fades and slides up into place as it enters the viewport. Implemented with ONE `IntersectionObserver` in `src/scripts/reveal.ts`. No animation libraries (no AOS, GSAP, Framer, etc.).

Mechanics:
- Mark elements with `data-reveal`. Optional `data-reveal-delay="<ms>"` for manual stagger.
- Hidden initial state (opacity 0, `translateY(24px)`) applies ONLY when JS is running: an inline script in `<head>` adds the class `js` to `<html>`, and the CSS is scoped as `.js [data-reveal]:not(.is-visible)`. Without JS everything is visible. Content always exists in the DOM at build time (SEO safe).
- Observer options: `threshold: 0.15`, `rootMargin: "0px 0px -8% 0px"`. When an element intersects, add `.is-visible` and `unobserve` it. Reveal happens ONCE; do not hide again when scrolling back up.
- Elements already in the viewport on load are revealed immediately (same code path, no special case needed).
- Animate ONLY `opacity` and `transform` (no layout properties, so no layout shift). Duration 700ms, easing `cubic-bezier(0.22, 1, 0.36, 1)`. Add `will-change: opacity, transform` only until revealed, then remove it.
- Stagger: children of a group get an incremental delay of 100ms each, capped at 400ms total, set via a `--i` CSS variable (`transition-delay: calc(var(--i) * 100ms)`). Do not stagger more than 5 items.

What animates (and what does not):
- Hero (on page load, not on scroll): the three title lines slide up from `translateY(100%)` inside an `overflow: hidden` wrapper, 120ms stagger between NINE, ACES, POOL & CAFE, 800ms each. Then tagline, profile, info row, and CTAs fade up in sequence (100ms stagger). Keep the `sr-only` h1 text readable immediately.
- Location: section heading, then the map and the info column (info delayed 100ms after the map).
- Menu: section heading and the tab bar reveal on scroll. Menu ROWS do NOT animate individually (about 60 rows would be noisy and slow). When switching tabs, the new panel does a simple 200ms opacity fade only.
- Contact: heading, then the three tiles with 100ms stagger.
- Footer: no animation.
- Navbar: keeps its own behavior from section 4.1; it does not use `data-reveal`.

Rules:
- `prefers-reduced-motion: reduce`: no transforms and no delays. Everything is visible immediately, with at most an instant state change.
- The language switcher must not retrigger reveals (text swaps in place, already-revealed elements stay visible).
- Never leave content invisible if the observer fails or JS errors: add a fallback timer that reveals all remaining `[data-reveal]` elements after 3 seconds from load.
- Do not animate the same element with two different effects (no stacking reveal with hover transforms on the same node; wrap if needed).

### 4.8 Photo slots (images arrive later)

The owner has no photos yet. Build every place a photo belongs as a reserved slot now, so adding a photo later means dropping a file in a folder with the right name, with ZERO code changes.

Manifest `src/config/images.ts` (single source of truth):

```ts
export type PhotoSlotDef = {
  id: string;                         // slot id, also the file name without extension
  folder: string;                     // folder under src/assets/images/
  ratio: string;                      // CSS aspect-ratio on desktop, e.g. "4 / 5"
  ratioMobile?: string;               // e.g. "16 / 9"
  alt: { id: string; en: string };    // descriptive alt text per language
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
```

File convention: `src/assets/images/<folder>/<id>.<webp|jpg|jpeg|png>`. Example: `src/assets/images/menu/beverages.webp`. Resolve files at build time with `import.meta.glob('/src/assets/images/**/*.{webp,jpg,jpeg,png}', { eager: true })` and match by `<folder>/<id>`. Using `src/assets` (not `public`) is deliberate so Astro's `<Image>` resizes and compresses photos automatically; the owner can drop in large phone photos safely.

`PhotoSlot.astro` (props: `id`, optional class):
- Filled (file exists): render with Astro `<Image>`: `object-fit: cover`, radius 8px, `loading="lazy"` (eager only if above the fold), `width`/`height` set, `alt` from the manifest in the active language (swap on language change like other i18n text).
- Empty (no file): render a flat box with the SAME aspect ratio (so nothing shifts when a photo is added later): background `--bg-alt-2`, 1px dashed `--line` border, radius 8px, a centered inline SVG photo icon (28px, `--text-muted`), `aria-hidden="true"`. No "coming soon" text.
- In DEV only (`import.meta.env.DEV`): also show the expected path in small monospace `--text-muted` text under the icon, for example `src/assets/images/menu/beverages.webp`, so the owner knows exactly where to drop the file. Never show this in production.
- When `siteConfig.showEmptyPhotoSlots` is `false` and the slot is empty, render nothing and let the parent layout collapse as described in section 4.4.
- A slot with `enabled: false` renders nothing and ignores any file.
- Reveal animation (section 4.7) applies to the slot wrapper.

Hero background (only if the owner enables `hero-bg` later): the photo sits behind the hero text covering the section, with a flat `--bg` overlay at 70% opacity (no gradient) to keep text contrast at AA. The hero typography layout does not change.

Tooling: add `npm run check:images` that prints each slot with its status (filled / empty / disabled) and the expected path. It is informational and must NOT fail the build (unlike `check:todo`).

Photo guidance for the owner (put in a short `src/assets/images/README.md`): menu photos portrait 4:5, at least 1200x1500 px, any of webp/jpg/png; keep faces and plates in the middle 70% of the frame because mobile crops to 16:9; dark, warm lighting matches the theme.

---

## 5. Menu data (`src/data/menu.ts`)

Source of truth. Prices are full rupiah integers. Preserve order and spelling exactly.

```ts
export type MenuItem = { name: string; price: number };
export type MenuCategory = { id: string; items: MenuItem[] };

export const menu: MenuCategory[] = [
  { id: "main-course", items: [
    { name: "Nasi Goreng", price: 30000 },
    { name: "Spaghetti Bolognese", price: 27000 },
    { name: "Indomie Goreng", price: 9000 },
    { name: "Indomie Goreng Double", price: 16000 },
    { name: "Indomie Kuah", price: 9000 },
    { name: "Indomie Kuah Double", price: 16000 },
    { name: "Nasi Ayam Sambal Matah", price: 32000 },
    { name: "Beef Yakiniku", price: 35000 },
    { name: "Sapi Lada Hitam", price: 35000 },
    { name: "Chicken Curry Katsu", price: 32000 },
    { name: "Nasi Ayam Goreng", price: 30000 },
  ]},
  { id: "additionals", items: [
    { name: "Telur Goreng", price: 5000 },
    { name: "Sosis", price: 5000 },
    { name: "Keju Mozzarella", price: 7000 },
  ]},
  { id: "beverages", items: [
    { name: "Mineral Water", price: 10000 },
    { name: "Hot / Iced Tea Tawar", price: 12000 },
    { name: "Hot / Iced Tea Manis", price: 15000 },
    { name: "Ice Lychee Tea", price: 22000 },
    { name: "Ice Lemon Tea", price: 18000 },
    { name: "Ice Lemonade", price: 18000 },
    { name: "Green Tea Latte", price: 22000 },
    { name: "Orange Lychee Tea", price: 23000 },
    { name: "Thai Tea", price: 20000 },
    { name: "Milo", price: 20000 },
    { name: "Mint Mojito", price: 25000 },
    { name: "Susu Soda", price: 20000 },
    { name: "Signature Chocolate", price: 20000 },
    { name: "Hot / Iced Vanilla Latte", price: 24000 },
    { name: "Hot / Iced Latte", price: 22000 },
    { name: "Hot / Iced Americano", price: 16000 },
    { name: "Fanta / Cola / Sprite", price: 10000 },
    { name: "Frestea / Minute Maid", price: 10000 },
    { name: "Nutriboost", price: 12000 },
  ]},
  { id: "snacks", items: [
    { name: "French Fries", price: 18000 },
    { name: "Potato Wedges", price: 20000 },
    { name: "Sosis & Nugget", price: 20000 },
    { name: "Chicken Wings", price: 22000 },
    { name: "Roti Bakar Keju Susu", price: 19000 },
    { name: "Roti Bakar Coklat Susu", price: 19000 },
    { name: "Roti Bakar Coklat Keju", price: 22000 },
    { name: "French Toast Blueberry", price: 25000 },
    { name: "Baso Tahu", price: 20000 },
    { name: "Batagor", price: 20000 },
    { name: "Cireng Bumbu Rujak", price: 18000 },
  ]},
  { id: "cigarettes", items: [
    { name: "GG Filter Surya Coklat", price: 40000 },
    { name: "GG Filter Surya Merah", price: 40000 },
    { name: "GG Mild", price: 40000 },
    { name: "GG Mild Shiver", price: 40000 },
    { name: "GG Surya Pro", price: 40000 },
    { name: "GG Surya Pro Mild", price: 40000 },
    { name: "GG International", price: 32000 },
    { name: "GG Signature Coklat", price: 32000 },
    { name: "GG Merah", price: 23000 },
    { name: "GG Special Deluxe", price: 23000 },
    { name: "Sampoerna Mild", price: 43000 },
    { name: "Esse Berry Pop", price: 45000 },
    { name: "Esse Double Pop", price: 45000 },
    { name: "Esse Change Double", price: 50000 },
    { name: "Esse Change Applemint", price: 50000 },
    { name: "Esse Change Juicy", price: 50000 },
    { name: "Esse Change Icy Double", price: 47000 },
    { name: "Marlboro Merah", price: 57000 },
    { name: "Marlboro Black", price: 45000 },
  ]},
  { id: "gloves", items: [
    { name: "Nine Aces Gloves", price: 45000 },
    { name: "Zuna Reg Half/Full", price: 79000 },
    { name: "Zuna Premium Half", price: 169000 },
    { name: "Zuna Premium Full", price: 179000 },
  ]},
];
```

Category labels (i18n keys `menu.cat.<id>`):

| id | ID | EN |
|---|---|---|
| main-course | Makanan Utama | Main course |
| additionals | Tambahan | Additionals |
| beverages | Minuman | Beverages |
| snacks | Camilan | Snacks |
| cigarettes | Rokok | Cigarettes |
| gloves | Sarung Tangan | Gloves |

---

## 6. Business config (`src/config/site.config.ts`)

All facts live here. Every `TODO(owner)` value must be a visible placeholder string until replaced.

```ts
export const siteConfig = {
  name: "Nine Aces Pool & Cafe",
  shortAddress: "TODO(owner): area, city",          // hero eyebrow + footer
  tagline: { id: "TODO(owner): tagline", en: "TODO(owner): tagline" },
  profile: {                                         // 2 to 3 sentences each
    id: "TODO(owner): profil singkat",
    en: "TODO(owner): short profile",
  },
  hours: { id: "TODO(owner): jam buka", en: "TODO(owner): opening hours" },
  since: "",                                         // e.g. "2019"; empty hides the block
  address: { id: "TODO(owner): alamat", en: "TODO(owner): address" },
  mapsLink: "TODO(owner): https://maps.app.goo.gl/...",
  mapsEmbedUrl: "TODO(owner): https://www.google.com/maps/embed?pb=...",
  whatsappNumber: "TODO(owner): 62xxxxxxxxxx",       // digits only, country code, no + or leading 0
  whatsappDisplay: "TODO(owner): +62 xxx-xxxx-xxxx",
  whatsappMessage: {
    id: "Halo Nine Aces, saya mau booking meja.",
    en: "Hi Nine Aces, I'd like to book a table.",
  },
  instagram: "TODO(owner): handle without @",
  tiktok: "TODO(owner): handle without @",
  showAgeNoteOnCigarettes: false,
  showEmptyPhotoSlots: true,   // false: slots without a photo are omitted (set false before launch if photos are still missing)
};
```

WhatsApp deep link, built in ONE helper: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage[lang])}`. The link `href` must update when the language changes.

---

## 7. Internationalization (ID / EN)

- Languages: `id` and `en`. Default: `id` (`TODO(owner)`: confirm default).
- Mechanism: client-side switcher, no separate routes. All translatable text is rendered at build time in the DEFAULT language and carries `data-i18n="<key>"` (or `data-i18n-attr="aria-label:<key>"` for attributes). Dictionaries in `src/i18n/id.json` and `en.json`. Config content that has both languages (tagline, profile, hours, address) is output with both versions in the HTML (for example two spans with `lang` attributes, one hidden), or handled by the same `data-i18n` mechanism via a generated dictionary. Pick one approach and use it everywhere.
- Switcher UI: two buttons `ID` and `EN` in the navbar (and in the mobile panel), `aria-pressed` on the active one, gold underline on the active one.
- Persistence: store the choice in `localStorage` under key `lang`. On first visit, use `id` unless `navigator.language` starts with `en` (`TODO(owner)`: confirm this rule).
- No flash of wrong language: an inline blocking script in `<head>` reads the stored language and sets `<html lang>` before first paint; `i18n.ts` then swaps text.
- On switch: update `<html lang>`, all `data-i18n` nodes, the WhatsApp `href`s, the `<title>` and meta description, and the menu note. Do not reload the page.
- Wrap `localStorage` access in try/catch (it can throw).
- Keys to provide in BOTH dictionaries (at minimum): `nav.home`, `nav.location`, `nav.menu`, `nav.contact`, `nav.openMenu`, `nav.closeMenu`, `cta.whatsapp`, `cta.seeLocation`, `hero.open`, `hero.since`, `hero.contact`, `location.title`, `location.openMaps`, `location.mapTitle`, `menu.eyebrow`, `menu.title`, `menu.priceNote`, `menu.cat.*` (six), `contact.eyebrow`, `contact.title`, `contact.subtitle`, `footer.rights`, `meta.title`, `meta.description`.
- Suggested copy, to be used unless the owner changes it:
  - `menu.priceNote`: ID "Harga dalam ribuan rupiah." / EN "Prices in thousands of rupiah."
  - `cta.whatsapp`: ID "Chat WhatsApp" / EN "Chat on WhatsApp"
  - `cta.seeLocation`: ID "Lihat lokasi" / EN "See location"
  - `location.openMaps`: ID "Buka di Google Maps" / EN "Open in Google Maps"
  - `menu.title`: ID "Menu kami" / EN "Our menu"
  - `contact.title`: ID "Hubungi kami" / EN "Contact us"
- Copy style: sentence case, active voice, no exclamation marks, no filler words ("seamless", "unlock", "premium experience").

---

## 8. SEO, accessibility, performance

- `<title>` and meta description from i18n. Open Graph tags with `og-image.jpg` (skip the tag if the file is missing).
- JSON-LD `LocalBusiness` (or `BarOrPub`/`Restaurant`, pick one) built from `siteConfig`; omit fields that are still TODO.
- `<html lang>` always reflects the active language. One `<h1>` (hero). Headings in order.
- Every interactive element is a real `<a>` or `<button>` (no click handlers on `div`). Icon-only buttons have `aria-label`. Decorative SVG gets `aria-hidden="true"`.
- Keyboard: full navigation works with Tab, Enter, Space, Escape, arrow keys (tabs).
- Images through Astro's `<Image>` (width/height set, `loading="lazy"` below the fold). Iframe is lazy.
- No layout shift: reserve space for iframe and images (aspect-ratio).
- Targets (mobile, Lighthouse): Performance 90+, Accessibility 95+, Best Practices 95+, SEO 95+. No horizontal scroll at 320px.

---

## 9. Quality gates and definition of done

Add `scripts/check-todo.mjs` and an npm script `check:todo` that greps `src/` and `public/` for the string `TODO(owner)` and exits non-zero if found. Run it in the pre-deploy step. It is expected to FAIL until the owner supplies the data; that is the point.

Done means ALL of these:
- [ ] `npm run build` succeeds with zero warnings you introduced.
- [ ] Sections appear in order: Hero, Location, Menu, Contact (plus navbar and footer). Nothing else.
- [ ] Hero `POOL & CAFE` fits on one line at 320, 360, 390, 768, 1280, 1920 px.
- [ ] Navbar: entrance animation, hide on scroll down / show on scroll up, active-section highlight, animated mobile popup, Escape closes it, focus returns to the button.
- [ ] Menu: six tabs, all six panels exist in the built HTML, arrow-key navigation works, prices show as `30`, `27`, `169` (no "K", no "Rp").
- [ ] Language switcher: toggling ID/EN changes all UI text, the WhatsApp message in the link, `<html lang>`, and persists after reload with no flash of the wrong language.
- [ ] WhatsApp links open `wa.me` with the pre-filled message in the active language.
- [ ] "Open in Google Maps" opens the owner's Maps link in a new tab.
- [ ] Only colors and fonts from section 3 are used (grep the CSS for stray hex values).
- [ ] No emoji, no lorem ipsum, no invented facts.
- [ ] `prefers-reduced-motion` verified.
- [ ] Photo slots: all six menu slots render (empty box with correct aspect ratio when no photo exists, dev-only path label), dropping a correctly named file into `src/assets/images/menu/` fills the slot with no code change, `npm run check:images` lists slot status, and adding a photo causes no layout shift.
- [ ] Scroll reveal: sections fade up once when scrolled into view, hero title lines slide up on load, menu rows do not animate individually, content is fully visible with JS disabled, and no layout shift is introduced (check CLS).
- [ ] `npm run check:todo` output is listed in the final message so the owner sees what is still missing.

---

## 10. Open items for the owner (fill these, then re-run the check)

- [ ] Short address for hero and footer, and full address for the Location section (ID and EN)
- [ ] Google Maps share link and embed URL
- [ ] Tagline and 2 to 3 sentence profile (ID and EN)
- [ ] Opening hours (ID and EN); founding year (optional)
- [ ] WhatsApp number and the pre-filled booking message (ID and EN)
- [ ] Instagram and TikTok handles
- [ ] Logo file (SVG preferred) and OG image
- [ ] Menu photos per category (optional)
- [ ] Confirm: default language, `18+` label on the cigarettes tab, price note under the menu tabs, and the navbar "pop-up" behavior in section 4.1

When working: ask the owner a question only if a requirement here is genuinely ambiguous or contradicts itself. Otherwise decide, follow this spec, and list any assumptions you made at the end.
