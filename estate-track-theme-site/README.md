# UK Estate Agent Website — Source Handoff

This folder contains the **complete source** for every page, screen and shared
component of the estate-agent website template, **excluding** the digital window
displays and email banners (those are non-website marketing artefacts).

The purpose of this bundle is to let a developer (e.g. Claude Code) produce an
**instruction book** documenting the pages, their sections and their functions —
and/or to re-implement the site in a real codebase.

---

## What these files are

Every page is a single self-contained **`.dc.html`** file ("Design Component").
Each one opens directly in a browser. It is a *design reference / working
prototype* — not production code to copy verbatim. The intended look, layout,
copy and interactions are all there to be read and re-expressed in the target
stack (React, Vue, a CMS theme, etc.).

### Anatomy of a `.dc.html` file

```html
<!DOCTYPE html>
<html><head>
  <script src="./support.js"></script>   <!-- shared runtime, same for every page -->
</head><body>
<x-dc>
  <helmet>
    <link href="https://fonts.googleapis.com/..." />   <!-- Google Fonts -->
    <style> :root { --color-...: ...; } @keyframes ... </style>  <!-- design tokens + global CSS -->
  </helmet>

  ...the page markup (header, sections, footer)...     <!-- this is the page -->

</x-dc>
<script data-dc-script type="application/json">...</script>  <!-- optional: props + logic -->
</body></html>
```

- **`<helmet>`** holds the fonts, the `:root` design-token CSS custom properties,
  global resets, responsive `@media` rules and `@keyframes`. The token block is
  **repeated near-identically in every page** — treat `Style Foundation.dc.html`
  as the canonical source of truth for tokens.
- The markup **between `</helmet>` and `</x-dc>`** is the actual page: a sticky
  header/nav, a series of `<section>`s, and a footer. This is what you document.
- Some files contain a logic class (`class Component extends DCLogic`) for
  interactive behaviour (filters, carousels, tabs, form steps). Read it to learn
  the page's *functions*.
- Styling is **inline `style="..."`** plus a handful of `.et-*` helper classes
  (defined in the `<helmet>` `<style>`) used mainly for responsive behaviour.

> You can ignore `support.js` for documentation purposes — it is the rendering
> runtime that powers the `<x-dc>` / `{{ }}` / `<sc-for>` syntax. It is included
> only so the pages render if you open them in a browser.

---

## Design tokens (from `Style Foundation.dc.html`)

Colours are in OKLCH. Key tokens (identical across pages):

**Colour**
- `--color-bg` warm off-white · `--color-surface` white · `--color-surface-alt` light warm grey
- `--color-primary` deep slate-blue (`oklch(0.31 0.018 255)`) · `--color-primary-hover`
- `--color-secondary` muted slate · `--color-accent` blue (`oklch(0.66 0.105 232)`) · `--color-accent-hover`
- `--color-text` near-black · `--color-muted` grey · `--color-border` · `--color-success` green

**Type** — headings: **Newsreader** (serif); body: **Hanken Grotesk** (sans); mono: ui-monospace.
Scale `--text-xs … --text-5xl` (0.75rem → 4rem). `--tracking-kicker` 0.16em for eyebrow labels.

**Spacing** `--space-1 … --space-24` (4px → 96px). **Radius** sm/`--radius`/lg/full.
**Shadow** sm/md/lg. **Layout** `--container: 1200px`.

**Placeholder imagery** — striped boxes via `.et-ph` (light) / `.et-ph-dark` (dark).
Anywhere you see those classes, a real photo/asset belongs there.

---

## Assets

`assets/` contains the only binary/SVG assets referenced by the pages:
- `google-g.svg`, `trustpilot-star.svg` — review-rating badges
- `instagram-white.svg` — social icon

Fonts load from Google Fonts (Newsreader + Hanken Grotesk). Everything else is
CSS/markup; property photos and team photos are striped placeholders.

---

## Pages & components included

**Home**
- `Home.dc.html` — primary homepage (desktop)
- `Home with Images.dc.html` — homepage variant with photography
- `Home Mobile.dc.html` — mobile homepage
- `Home Hero Form.dc.html`, `Home Hero Search.dc.html` — hero-section variants

**Properties**
- `Property Listings.dc.html`, `Property Listings Mobile.dc.html` — search results
- `Single Property.dc.html`, `Single Property Mobile.dc.html` — listing detail
- `PropertyCard.dc.html` — shared property card component
- `Development Search.dc.html`, `Individual Development.dc.html` — new-homes developments

**Valuation / lead capture**
- `Valuation Overview.dc.html`
- `Book a Valuation.dc.html`, `Book a Valuation with Diary.dc.html`
- `Instant Valuation.dc.html`, `Virtual Valuation.dc.html`
- `Pre-Val Pack.dc.html`, `Post-Val Proposal.dc.html`
- `Property & Area Report.dc.html`

**Branches & people**
- `Branches Overview.dc.html`, `Branch Listings.dc.html`, `Branch Contact.dc.html`
- `Find an Agent.dc.html`, `Agent Listings.dc.html`
- `Meet the Team.dc.html`, `Single Team Member.dc.html`

**Area / market data**
- `Area Guide & Data Overview.dc.html`, `Individual Area Guide.dc.html`, `Individual Market Data.dc.html`

**Content & social proof**
- `News Listings.dc.html`, `Single News Article.dc.html`, `NewsCard.dc.html`
- `Testimonials Listings.dc.html`, `Video Testimonials.dc.html`, `Leave a Review.dc.html`
- `TestimonialCard.dc.html`, `VideoTestimonialCard.dc.html`

**Services & company**
- `Services.dc.html`, `Individual Service.dc.html`
- `About.dc.html`, `FAQs.dc.html`, `Pricing & Fees.dc.html`
- `General Enquiries.dc.html`, `Register.dc.html`
- `Legal.dc.html`, `Sitemap.dc.html`

**Shared building blocks**
- `Style Foundation.dc.html` — canonical design tokens & style reference
- `FilterSelect.dc.html` — reusable dropdown/filter control
- (card components listed above)

**Runtime**
- `support.js` — rendering runtime (not part of the design; needed only to view pages)

---

## How to build the instruction book

For each page file, document:
1. **Name & route** — what the page is and where it sits in the site.
2. **Purpose** — the user goal it serves.
3. **Sections** — in source order, each `<section>`: its heading, content, and layout.
4. **Functions** — interactive behaviour from the logic class / event handlers
   (search & filtering, carousels, tab switches, multi-step forms, validation).
5. **Shared components** used (header, footer, `PropertyCard`, `FilterSelect`, etc.).
6. **Responsive behaviour** — note the `@media` breakpoints (980px, 860px, 680px)
   and the `.et-*` classes that toggle mobile layouts.
