# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Astro (static output) + Tailwind CSS v4 + vanilla TypeScript modules, npm. Fixed by the owner in SPEC.md section 2. Deploys to any static host.

## Users

Mostly people on a phone who tapped a link from Nine Aces' Instagram or TikTok, or who were told about the place. They want to know what the place is, where it is, what it serves and at what price, and how to reach it (usually to book a table over WhatsApp).

## Product Purpose

A single-page bilingual (Indonesian default, English) landing page for Nine Aces Pool & Cafe, a billiard house. Success: a visitor can (a) see what Nine Aces is, (b) find and navigate to it, (c) read the menu and prices, (d) contact the venue on WhatsApp, Instagram, or TikTok.

## Positioning

Nine Aces has its own team identity: a black and gold jersey and its own branded gloves. It reads as a club with a home table, not a table-rental hall. (Confirmed by the owner, 2026-11-13.)

## Capabilities and Constraints

- Only two real features: WhatsApp deep link (pre-filled booking message per language) and Google Maps (embed + open-in-Maps link). Everything else is content.
- Out of scope: online booking, payments, login, CMS, backend, analytics.
- Menu: six categories (main course, additionals, beverages, snacks, cigarettes, gloves), prices shown in thousands of rupiah without suffix.
- SPEC.md is the binding contract for sections, tokens, fonts, motion, and behavior.

## Brand Commitments

- Name: Nine Aces Pool & Cafe. Logo: `public/logo.svg` (traced from the owner's artwork).
- Reference: the black and gold team jersey (charcoal base, champagne gold metallic ornament, lotus/mandala motif). Dark, elegant, editorial; not neon, not playful.
- Voice: sentence case, active voice, no exclamation marks, no filler.

## Evidence on Hand

- Real menu with prices (`src/data/menu.ts`).
- Logo SVG.
- Not yet supplied (must not be invented): address, maps links, tagline, profile, opening hours, founding year, WhatsApp number, social handles, OG image, photos. These stay as visible `TODO(owner)` placeholders in `src/config/site.config.ts`.
- No reviews, testimonials, stats, or awards exist. Never fabricate them.

## Product Principles

1. Get a phone visitor to the location or to WhatsApp in as few taps as possible.
2. Facts only from the owner; a missing fact is a visible placeholder, never a guess.
3. The menu is real content and should be fast to scan.
4. Adding owner material later (photos, copy) must need zero code changes.

## Accessibility & Inclusion

WCAG AA contrast, full keyboard operation, visible focus, 44px touch targets, `prefers-reduced-motion` respected, content visible without JS.
