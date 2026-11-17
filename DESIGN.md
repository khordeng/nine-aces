---
name: Nine Aces Pool & Cafe
description: A billiard club's own program, set in black and champagne gold.
colors:
  charcoal-ground: "#0a0908"
  night-panel: "#111111"
  warm-panel: "#1a1816"
  felt-card: "#262626"
  hairline: "#2a2622"
  leader-dot: "#3a352f"
  bone-white: "#f5f0e6"
  pewter-text: "#b8b8b8"
  brass-muted: "#9a9382"
  champagne-gold: "#d2b87d"
  champagne-gold-bright: "#e8d090"
  chalk-outline: "#bfbab0"
typography:
  display:
    fontFamily: "Archivo Variable, Archivo, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 9vw, 7.5rem)"
    fontWeight: 800
    lineHeight: 0.98
    letterSpacing: "-0.01em"
    fontVariation: "'wdth' 125"
  headline:
    fontFamily: "Instrument Serif, Georgia, serif"
    fontSize: "clamp(2.25rem, 6vw, 3.5rem)"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "-0.005em"
  tagline:
    fontFamily: "Instrument Serif, Georgia, serif"
    fontSize: "clamp(1.375rem, 1rem + 1.6vw, 2rem)"
    fontWeight: 400
    lineHeight: 1.25
  title:
    fontFamily: "Instrument Serif, Georgia, serif"
    fontSize: "clamp(1.75rem, 1.4rem + 1.2vw, 2.25rem)"
    fontWeight: 400
    lineHeight: 1.1
  body:
    fontFamily: "Archivo Variable, Archivo, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
  ui:
    fontFamily: "Archivo Variable, Archivo, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 500
    lineHeight: 1.2
  label:
    fontFamily: "Archivo Variable, Archivo, system-ui, sans-serif"
    fontSize: "11px"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.22em"
  tab:
    fontFamily: "Archivo Variable, Archivo, system-ui, sans-serif"
    fontSize: "11px"
    fontWeight: 500
    letterSpacing: "0.18em"
rounded:
  button: "6px"
  photo: "8px"
  card: "10px"
spacing:
  gutter-sm: "1.25rem"
  gutter-md: "2rem"
  gutter-lg: "3rem"
  section-sm: "4rem"
  section-lg: "6rem"
  container: "1200px"
components:
  button-primary:
    backgroundColor: "{colors.champagne-gold}"
    textColor: "{colors.charcoal-ground}"
    typography: "{typography.ui}"
    rounded: "{rounded.button}"
    padding: "0.75rem 1.25rem"
    height: "44px"
  button-primary-hover:
    backgroundColor: "{colors.champagne-gold-bright}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.champagne-gold}"
    typography: "{typography.ui}"
    rounded: "{rounded.button}"
    padding: "0.75rem 1.25rem"
    height: "44px"
  contact-tile:
    backgroundColor: "{colors.felt-card}"
    textColor: "{colors.bone-white}"
    rounded: "{rounded.card}"
    padding: "1.5rem"
  nav-panel:
    backgroundColor: "{colors.warm-panel}"
    rounded: "{rounded.card}"
    padding: "0.75rem 1.25rem 1.25rem"
  menu-tab:
    backgroundColor: "transparent"
    textColor: "{colors.brass-muted}"
    typography: "{typography.tab}"
    padding: "0.75rem"
    height: "48px"
  menu-tab-active:
    textColor: "{colors.bone-white}"
  photo-slot-empty:
    backgroundColor: "{colors.warm-panel}"
    textColor: "{colors.brass-muted}"
    rounded: "{rounded.photo}"
---

# Design System: Nine Aces Pool & Cafe

## Overview

**Creative North Star: "The Club Program"**

Nine Aces is dressed like its own team kit: a charcoal jersey ground with champagne gold ornament, the name lettered across the chest in wide, heavy capitals, and the house menu set as a printed price list with dotted leaders. The page reads as a club's own printed program, not a cafe flyer. Everything sits on near-black; warm off-white carries the reading; gold is the metallic thread that marks what to touch and what things cost.

The system is flat and typographic. Depth comes from small steps between warm charcoal panels and from hairline rules, never from shadow, glow, blur, or gradient. Three voices do all the work: an expanded Archivo at 800 for the name only, an italic Instrument Serif for headings and the tagline, and small tracked Archivo capitals for labels. Motion is short and purposeful: the name rises out of clipped masks on load, content fades up once as it enters, and state changes run 150 to 250ms ease-out.

Density is calm on phones first. One column, generous section padding, 44px touch targets, and the two actions that matter (WhatsApp and the map) always within a thumb's reach.

**Key Characteristics:**
- Charcoal ground on every surface; no light sections.
- Champagne gold as the single accent, roughly a tenth of the ink.
- Outline lettering (text stroke) as a native device of the name.
- Hairline rules, dotted price leaders, and short gold underline rules as the ornament.
- Flat surfaces with 6 / 8 / 10px corners.
- Inline SVG icons only.

## Colors

A warm charcoal-and-champagne palette: four charcoal steps, three warm text values, one gold with its hover lift, and a chalk tone reserved for outline lettering.

### Primary
- **Champagne Gold** (`champagne-gold`): the only accent. Primary button fill, secondary button stroke and text, prices, active nav underline, active tab rule, the 36px category rule, contact icons, the WhatsApp tile border, the gold outline line of the name, focus rings, and text selection. The navbar logo is filled with it through an SVG mask.
- **Bright Champagne** (`champagne-gold-bright`): hover state of gold fills and gold borders only. Never used at rest.

### Neutral
- **Charcoal Ground** (`charcoal-ground`): page, hero, menu, footer, solid navbar, and text on gold buttons.
- **Night Panel** (`night-panel`): alternate section ground (Location, Contact).
- **Warm Panel** (`warm-panel`): raised panels: mobile nav popup, empty photo slots, map backing.
- **Felt Card** (`felt-card`): contact tiles.
- **Hairline** (`hairline`): every 1px divider, card border, menu row separator, tab bar baseline, solid-nav bottom rule, and the dashed border of an empty photo slot.
- **Leader Dot** (`leader-dot`): dotted price leaders, the scrollbar thumb, the 18+ note border.
- **Bone White** (`bone-white`): primary text and the solid line of the name. Never pure white.
- **Pewter** (`pewter-text`): secondary text: profile paragraph, addresses, tile values, nav links at rest.
- **Muted Brass** (`brass-muted`): small labels, inactive tabs, the price note, footer rights, empty-slot icon. Do not go darker; it is the AA floor for 11px+ caps on charcoal.
- **Chalk Outline** (`chalk-outline`): stroke colour of the neutral outline word of the name. Not a text fill.

A darker gold (#8A6D2B) is defined in the stylesheet as `--gold-dark` for gold text on a light surface. No light surface exists, so it is unused and reserved.

### Named Rules
**The One Metal Rule.** Gold is the only accent and stays near a tenth of the visible ink. It marks actions, prices, active states, and ornament; it is never used for a paragraph. No saturated yellow, no second accent.

**The Charcoal Floor Rule.** Every surface is a charcoal step. New sections alternate between Charcoal Ground and Night Panel; raised things step to Warm Panel or Felt Card.

## Typography

**Display Font:** Archivo Variable at width 125 (with Archivo, system-ui)
**Heading Font:** Instrument Serif italic (with Georgia)
**Body Font:** Archivo Variable at width 100 (with Archivo, system-ui)

**Character:** A wide, heavy sans for the lettered name against a soft editorial italic: jersey lettering beside a printed program. The body stays plain Archivo so the two voices carry the identity.

### Hierarchy
- **Display** (800, expanded, uppercase, fluid up to 7.5rem, line-height 0.98): the venue name only, three lines of equal size: one solid in Bone White, one stroked in Chalk Outline, one stroked in Champagne Gold. Each line is `nowrap`; the last line must fit on one line from 320px to 1920px. Stroke 2px on phones, 1.5px from 48rem.
- **Headline** (Instrument Serif italic 400, clamp to 3.5rem, line-height 1.1): section titles.
- **Tagline** (Instrument Serif italic 400, about 22 to 32px, line-height 1.25): the hero tagline, prefixed with an em dash.
- **Title** (Instrument Serif italic 400, 28 to 36px): menu category titles, each followed by a 36 x 1.5px gold rule.
- **Body** (400, 16px, line-height 1.6): paragraphs in Pewter, max 52ch.
- **UI** (500, 14 to 15px): buttons at 15px, nav links at 14px (16px in the mobile panel), item names and prices at body size and 500.
- **Label** (500, 11px rising to 12px at 48rem, uppercase, 0.22em tracking): info-row labels in Muted Brass; real information set in gold (the hero address line, the footer wordmark). Info-row values are 12px, 500, uppercase, 0.12em, Bone White.
- **Tab** (500, 11px, uppercase, 0.18em): menu tabs and the language switcher (12px).

### Named Rules
**The Two-Weight Rule.** Outside the display name, Archivo uses 400 and 500 only, and the serif uses 400 only. No 600 or 700.

**The Name-Only Display Rule.** Expanded 800 capitals belong to the venue name. Section titles use the italic serif, never the display face.

**The Tabular Price Rule.** Prices use tabular numerals, gold, weight 500, in thousands without a currency suffix.

## Layout

A single centred column with a 1200px container and side gutters of 1.25rem, 2rem at 48rem, and 3rem at 64rem. Sections pad 4rem vertically on phones and 6rem from 64rem, and alternate between Charcoal Ground and Night Panel. The hero is a left-aligned type stack at full viewport height, content starting below the navbar height (64px, 72px from 48rem) plus 2.5rem; its info row is a 2-column grid rising to 3 at 40rem, under a hairline.

Two-column splits appear only from 48rem: Location at map-left / info-right, Menu at list (3fr) / photo (2fr) with the photo sticky under the navbar. On phones the media goes first (map above info, photo above list). Section headings are left-aligned except Menu, whose heading and tab bar are centred. Anchored sections offset by the navbar height.

## Elevation & Depth

Flat. There are no shadows anywhere. Depth is tonal: four charcoal steps (ground, night panel, warm panel, felt card) plus 1px Hairline borders. The fixed navbar separates from content by turning solid Charcoal Ground with a bottom hairline after 16px of scroll, not by casting a shadow. The only lift is a 1 to 2px translate on hover (buttons, contact tiles).

### Named Rules
**The Flat Program Rule.** No box-shadow, glow, blur, glassmorphism, or gradient. A thing is raised by a lighter charcoal step and a hairline, nothing else.

## Shapes

Gently softened rectangles: 6px on buttons and the hamburger, 8px on photos and photo slots, 10px on cards, the map, and the mobile nav popup. Lines are the ornament: 1px Hairline dividers, dotted Leader Dot leaders between item and price, and short 1.5px gold underlines that mark active state (nav link, language, tab, category rule). Empty photo slots use a 1px dashed Hairline border at the final aspect ratio so nothing shifts when a photo arrives. The name's outline lettering is a native stroke device of this world.

## Components

### Buttons
Confident and quiet: solid gold for the one action that matters, a gold outline for the second.
- **Shape:** softened corners (6px), min height 44px, 0.75rem 1.25rem padding, 15px weight 500, 18px inline SVG icon with a 0.5rem gap.
- **Primary:** Champagne Gold fill and border, Charcoal Ground text. One per viewport region; it is always the WhatsApp action.
- **Secondary:** transparent, 1px gold border, gold text. Hover fills gold at 10%.
- **Hover / Active:** primary steps to Bright Champagne; both lift 1px on hover and press to scale 0.98 on click; 200ms ease-out colour, 150ms transform.
- **Focus:** 2px solid gold outline, 2px offset (global for every interactive element).

### Cards / Containers
- **Contact tile:** whole tile is the link. Felt Card ground, 1px Hairline border, 10px corners, 1.5rem padding, 28px gold icon above a 18px label and a Pewter value. Hover turns the border gold and lifts 2px. The WhatsApp tile carries a gold border at rest (Bright Champagne on hover).
- **Map frame:** 1px Hairline border, 10px corners, 4/3 (1/1 on phones), darkened with an invert and hue-rotate filter.
- **Photo slot:** 8px corners, cover-fit. Empty: Warm Panel, 1px dashed Hairline, centred 28px Muted Brass photo icon, no text.

### Navigation
- **Bar:** fixed, transparent over the hero, solid Charcoal Ground with a bottom hairline after 16px of scroll; hides on scroll down and returns on scroll up. Slides in once on load (500ms).
- **Logo:** gold crown-and-name crop of the traced owner mark, 32px high on phones, 40px from 48rem.
- **Links:** 14px weight 500 Pewter; hover Bone White; active section gold with a 1.5px gold underline drawn from the left.
- **Language switcher:** tracked 12px caps in Muted Brass; pressed language in Bone White with an 18px gold underline.
- **Mobile:** hamburger morphs to a cross; links, language, and WhatsApp live in a Warm Panel popup (10px corners, hairline border) that scales in from the top right in 200ms.

### Menu tabs
- **Style:** 11px tracked caps in Muted Brass on a hairline baseline, 48px tall; horizontally scrollable on phones with a hidden scrollbar, centred from 48rem.
- **State:** hover Pewter; selected Bone White with a 1.5px gold bottom border. Panels swap with a 200ms opacity fade.

### Price list (signature)
Each row is a baseline-aligned line: item name (500, Bone White), a flexible dotted Leader Dot leader raised 0.3em, and the price (500, gold, tabular). Rows are separated by Hairline and padded 0.7rem. Rows never animate individually.

### Footer
Charcoal Ground under a top hairline: gold tracked wordmark and short address on the left, social handles on the right as 14px Pewter links whose gold underline draws in on hover.

## Do's and Don'ts

### Do:
- **Do** keep every surface on a charcoal step (Charcoal Ground, Night Panel, Warm Panel, Felt Card).
- **Do** use Champagne Gold for actions, prices, active states, icons, and ornament only, around a tenth of the ink.
- **Do** mark active state with a 1.5px gold rule (underline, tab border, 36px category rule).
- **Do** separate with 1px Hairline rules and dotted leaders rather than boxes.
- **Do** keep touch targets at 44px minimum and give every interactive element the 2px gold focus ring at 2px offset.
- **Do** run transitions at 150 to 250ms ease-out, reveals at 700ms on cubic-bezier(0.22, 1, 0.36, 1), and drop all transforms and delays under reduced motion.
- **Do** reserve photo space with an empty slot at the final aspect ratio; never substitute a stand-in image.

### Don't:
- **Don't** use shadows, glow, blur, glassmorphism, or gradients.
- **Don't** introduce colours outside the token set, saturated yellow, or pure white text.
- **Don't** use Archivo above weight 500 outside the venue name, or set section titles in the expanded display face.
- **Don't** use icon fonts, emoji, or glyph characters as icons; icons are inline SVG.
- **Don't** set paragraphs in gold or darken labels below Muted Brass.
