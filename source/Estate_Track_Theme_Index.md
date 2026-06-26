# Home - Harvell & Co · Theme Index & Blueprint

> ## ⚠️ Using this to generate a NEW theme — read first
> This is a **structure spec**: which pages exist, which sections each page has, and each section's functions, content variants, data feeds and CTAs. It is **not** a visual design to copy.
> - **Do NOT reproduce** the Estate Track look, layout, colours, fonts or example content — that's one client's skin.
> - Take all **visual style _and_ section layout from your reference site**, and capture it yourself (don't ask for screenshots).
> - Build a **fresh token layer** from the reference site — replace every value in **Appendix E**.
>
> **Paste-ready prompt** (swap in your URL):
> ```
> Build a NEW theme. The attached markdown is a STRUCTURE SPEC only — it defines which pages exist, which sections each page has, and each section's functions, content variants, data feeds and CTAs. Do NOT reproduce its visual design, layout, colours, fonts or example content — that's a previous client's skin; discard it. Treat each section description as its purpose and function, not a layout to copy. For all visual style AND section layout, use [REFERENCE-URL] as the only reference — capture it yourself with your web-capture/screenshot tools; don't ask me for screenshots. Build a fresh token layer from that site (don't reuse Appendix E's values). Work global chrome + tokens first, then page by page.
> ```

An **open, living catalogue** of **Home - Harvell & Co** — the Estate Track "Home" theme, skinned for Harvell & Co. Two jobs: (1) a reference for adding the theme + its sections to the page builder, and (2) a blueprint to hand Claude — *"recreate every page and section in this style at a new URL"*.

**Each page card shows:** a **thumbnail**, a **description**, its **sections** (in order), its **content type**, the **data feeds** it needs, and its **CTA**. Interactive pages (forms, the report) also show a **walkthrough** — every screen the user passes through (form steps, results, thank-yous).

**Content type** *(provisional — finalise in Appendix D)*: **Automated** · **Manual** · **Hybrid** · **Dashboard-driven**. Sections → **Appendix A** · Data feeds → **Appendix B** · CTAs → **Appendix C** · Style tokens → **Appendix E** · Cards → **Appendix F**.

> Source pages: `Home/site_handoff/*.dc.html`. Thumbnails: `thumbnails/<slug>/`. This is the single source doc.

---

# Pages

**Home**

## 1 · Home
<img src="thumbnails/home-buttons-hero/page.png" width="320" alt="Home" />

- **Description:** The homepage and shop window — hero (search / buttons / form variants), featured properties, count-up stats, services, video & written reviews, valuation CTA, newsletter.
- **Sections:** `hero-home` → `image-text-split` ×2 → `stats-band` → `featured-properties` → `services-grid` → `video-testimonials` → `testimonials-slider` → `cta-banner` → `latest-news` → `newsletter`
- **Content type:** Hybrid
- **Data feeds:** `Property feed` · `Reviews feed` · `Internal CRM` (news, stats)
- **CTA:** "Thinking of selling or letting?"

**Hero variants** — the homepage hero ships in three forms:

| A — Search bar | B — Buttons | C — Buttons + form |
|---|---|---|
| <img src="thumbnails/home-search-hero/page.png" width="220" alt="hero search variant" /> | <img src="thumbnails/home-buttons-hero/page.png" width="220" alt="hero buttons variant" /> | <img src="thumbnails/home-form-hero/page.png" width="220" alt="hero form variant" /> |

**Hero background:** image · CSS-controlled moving image · image slider · video — sits behind the content. Optional **overlay**: colour + transparency, or pattern + colour + transparency (see Appendix E).
**New site-wide elements (shown on these screens):** a floating **modal launcher** ("Spring offer" pill) that opens the **Promo Modal**, plus the **Cookie Consent** banner — documented in Appendix A.

**Properties & search**

## 2 · Property Listings
<img src="thumbnails/property-listings-new/page.png" width="320" alt="Property Listings" />

- **Description:** The main search-results page — Grid / List / Map with a filter bar (location, price, beds, type, sale/let), save-search and register-for-alerts.
- **Sections:** `hero-internal` → `property-search` → `cta-banner`
- **Content type:** Automated
- **Data feeds:** `Property feed` · `Ofsted` (near-a-school filter) · `PropertyData` (near-a-station filter)
- **CTA:** "See new homes before they hit the portals"

## 3 · Single Property
<img src="thumbnails/single-property/page.png" width="320" alt="Single Property" />

- **Description:** A full listing — media tabs, key facts, description, material info, local area (schools/transport/map), stamp-duty & mortgage calculators, viewing booking, agent & branch, similar properties.
- **Sections:** `property-media` → `property-header` → `property-description` → `property-material-info` → `property-local-area` → `property-tools` → `property-viewing` → `property-agent` → `property-branch` → `similar-properties` → `sell-prompt`
- **Content type:** Automated *(description & material info authored in CRM)*
- **Data feeds:** `Property feed` · `EPC Register` · `Ofsted` · `PropertyData` · `HM Land Registry` · `Internal CRM`
- **CTA:** "Find out what your home is worth" *(sell-prompt)*

## 18 · Development Search
<img src="thumbnails/development-search/page.png" width="320" alt="Development Search" />

- **Description:** New-homes search — like property search but sales-only, with development cards (price "from", plots available).
- **Sections:** `hero-internal` → `development-search` → `cta-banner`
- **Content type:** Automated
- **Data feeds:** `Property feed`
- **CTA:** "See new homes before they hit the portals"

## 19 · Individual Development
<img src="thumbnails/individual-development/page.png" width="320" alt="Individual Development" />

- **Description:** One development — media, price range, description, about-the-developer, plots (as property cards), enquiry form, agent & branch.
- **Sections:** `development-media` → `development-header` → `rich-text` → `development-developer` → `development-plots` → `property-viewing` → `property-agent` → `property-branch` → `similar-developments` → `sell-prompt`
- **Content type:** Hybrid *(developer/description authored)*
- **Data feeds:** `Property feed` · `Internal CRM`
- **CTA:** "Find out what your home is worth"

## 18a · Off-Market Properties — *not yet built*
- **Description:** Off-market listings with an explainer and a register CTA, plus a low-visibility-marketing prompt. To be composed from the section library.
- **Sections:** `hero-internal` → `off-market-listings` → `cta-banner`
- **Content type:** Automated
- **Data feeds:** `Property feed`
- **CTA:** "Want to market your property with low visibility?"

**Valuation & lead capture**

## 8 · Valuation Overview
<img src="thumbnails/valuation-overview/page.png" width="320" alt="Valuation Overview" />

- **Description:** A chooser of three valuation routes (Instant / Book / Virtual), backed by trust stats, video reviews and an FAQ.
- **Sections:** `hero-internal` → `valuation-chooser` → `stats-band` → `video-testimonials` → `cta-banner` → `faq-accordion`
- **Content type:** Manual
- **Data feeds:** `Reviews feed`
- **CTA:** "Prefer to talk it through first?"

## 9 · Instant Valuation
<img src="thumbnails/instant-valuation/page.png" width="320" alt="Instant Valuation" />

- **Description:** Address → property details → contact stepper returning an on-screen guide price (range + confidence + "view full report"); testimonials; FAQ.
- **Sections:** `hero-internal` → `valuation-form` → `valuation-result` → `video-testimonials` → `cta-banner` → `faq-accordion`
- **Content type:** Hybrid
- **Data feeds:** `PropertyData` · `HM Land Registry` · `Property feed` (address lookup) · `Reviews feed`
- **CTA:** "Prefer to talk it through first?"

**Walkthrough** — the instant-valuation stepper, screen by screen:

| Step 1 — Address | Step 2 — Property details | Step 3 — Your details | Step 4 — Instant result |
|---|---|---|---|
| <img src="thumbnails/instant-valuation/walk-00.png" width="200" alt="address" /> | <img src="thumbnails/instant-valuation/walk-01.png" width="200" alt="property details" /> | <img src="thumbnails/instant-valuation/walk-02.png" width="200" alt="your details" /> | <img src="thumbnails/instant-valuation/walk-03.png" width="200" alt="instant result" /> |
| Postcode lookup → pick address | Type / bedrooms / condition | Name, email, phone, consent | Estimated value, range, confidence + "View full report" |

## 9a · Instant Valuation (Landing)
<img src="thumbnails/instant-valuation-landing/page.png" width="320" alt="Instant Valuation Landing" />

- **Description:** Distraction-free paid-landing version — no header/footer/nav and no off-page links, just the hero, the instant-valuation stepper and the result. Used as a paid/ads destination focused only on completing the valuation.
- **Sections:** `valuation-form` → `valuation-result` *(minimal footer only)*
- **Content type:** Hybrid
- **Data feeds:** `PropertyData` · `HM Land Registry` · `Property feed` (address lookup)
- **CTA:** *none off-page — only "Book a valuation" / "View full report" on the result*

**Walkthrough** — the distraction-free stepper, screen by screen:

| Step 1 — Address | Step 2 — Property details | Step 3 — Your details | Step 4 — Instant result |
|---|---|---|---|
| <img src="thumbnails/instant-valuation-landing/walk-00.png" width="200" alt="address" /> | <img src="thumbnails/instant-valuation-landing/walk-01.png" width="200" alt="property details" /> | <img src="thumbnails/instant-valuation-landing/walk-02.png" width="200" alt="your details" /> | <img src="thumbnails/instant-valuation-landing/walk-03.png" width="200" alt="instant result" /> |

## 10 · Book a Valuation
<img src="thumbnails/book-a-valuation/page.png" width="320" alt="Book a Valuation" />

- **Description:** In-person valuation request; the diary variant adds a date + time-slot picker. Testimonials; FAQ. *(Form → success panel; diary variant → date/time → confirmation.)*
- **Sections:** `hero-internal` → `valuation-form` (booking; optional diary) → `video-testimonials` → `cta-banner` → `faq-accordion`
- **Content type:** Manual *(diary slots dashboard-driven)*
- **Data feeds:** `Internal CRM` (diary, branch) · `Reviews feed`
- **CTA:** "Prefer to talk it through first?"

**Walkthrough** — the booking request, then confirmation:

| Booking request form | Request received |
|---|---|
| <img src="thumbnails/book-a-valuation/walk-00.png" width="200" alt="booking form" /> | <img src="thumbnails/book-a-valuation/walk-01.png" width="200" alt="request received" /> |

## 11 · Virtual Valuation
<img src="thumbnails/virtual-valuation/page.png" width="320" alt="Virtual Valuation" />

- **Description:** How-it-works explainer + a virtual (video/phone) valuation request with optional photo upload; testimonials; FAQ.
- **Sections:** `hero-internal` → `virtual-valuation-explainer` → `valuation-form` (virtual) → `video-testimonials` → `cta-banner` → `faq-accordion`
- **Content type:** Manual
- **Data feeds:** `Internal CRM` (branch) · `Reviews feed`
- **CTA:** "Prefer to talk it through first?"

**Walkthrough** — choose call type, then confirmation:

| Choose video or phone | Booking received |
|---|---|
| <img src="thumbnails/virtual-valuation/walk-00.png" width="200" alt="choose video or phone" /> | <img src="thumbnails/virtual-valuation/walk-01.png" width="200" alt="booking received" /> |

## 12 · Property & Area Report
<img src="thumbnails/property-and-area-report/page.png" width="320" alt="Property & Area Report" />

- **Description:** The full report (Property / Area tabs) reached from the instant-val result — value, comparables, EPC, costs & risk, stations, connectivity, market stats, schools.
- **Sections:** `report-tabs` → `report-property` / `report-area`
- **Content type:** Automated
- **Data feeds:** `Property feed` · `PropertyData` · `HM Land Registry` · `EPC Register` · `Ofcom` · `Ofsted` · `ONS`
- **CTA:** "Book your valuation" *(report header)*

**Walkthrough** — the two report tabs:

| Property report tab | Area report tab |
|---|---|
| <img src="thumbnails/property-and-area-report/walk-00.png" width="200" alt="property report tab" /> | <img src="thumbnails/property-and-area-report/walk-01.png" width="200" alt="area report tab" /> |

**Appraisals (personalised documents)**

## 12a · Pre-Val Pack
<img src="thumbnails/pre-val-pack/page.png" width="320" alt="Pre-Val Pack" />

- **Description:** Personalised pre-appraisal pack — meet-your-valuer, about the agency, why-instruct, local market, on-the-day, pre-visit survey; sections toggle on/off and reorder.
- **Sections:** `preval-hero` *(always on)* → `preval-valuer` → `preval-agency` → `preval-why-instruct` → `preval-local-market` → `preval-on-the-day` → `preval-survey` *(all toggle + reorder)*
- **Content type:** Hybrid + Dashboard-driven
- **Data feeds:** `Internal CRM` (appraisal, valuer, branch) · `PropertyData` (local market) · `Reviews feed`
- **CTA:** "Complete pre-visit survey"

**Walkthrough** — the pre-visit survey, then confirmation:

| Pre-visit survey | Sent to your valuer |
|---|---|
| <img src="thumbnails/pre-val-pack/walk-00.png" width="200" alt="pre-visit survey" /> | <img src="thumbnails/pre-val-pack/walk-01.png" width="200" alt="sent to your valuer" /> |

## 12b · Post-Val Proposal
<img src="thumbnails/post-val-proposal/page.png" width="320" alt="Post-Val Proposal" />

- **Description:** Personalised proposal with proceed buttons — recommended price, why-this-price, property facts, comparables, marketing plan, fee, instruct CTA, disclaimer; sections appear when filled.
- **Sections:** `postval-hero` *(always on)* → `postval-why-price` → `postval-property` → `postval-comparables` → `postval-marketing` → `postval-fee` → `postval-instruct-cta` → `postval-disclaimer` *(always on)*
- **Content type:** Hybrid + Dashboard-driven
- **Data feeds:** `Internal CRM` (appraisal, fee config) · `HM Land Registry` · `PropertyData`
- **CTA:** "I'd like to proceed" *(instruct)*

**Walkthrough** — the proposal, then the instructed state:

| Proposal | Instructed |
|---|---|
| <img src="thumbnails/post-val-proposal/walk-00.png" width="200" alt="proposal" /> | <img src="thumbnails/post-val-proposal/walk-01.png" width="200" alt="instructed" /> |

**Branches & people**

## 13 · Meet the Team
<img src="thumbnails/meet-the-team/page.png" width="320" alt="Meet the Team" />

- **Description:** Grid of team-member cards with a branch filter and department dropdown.
- **Sections:** `hero-internal` → `team-grid`
- **Content type:** Automated *(bios authored in CRM)*
- **Data feeds:** `Internal CRM` (team)
- **CTA:** "We're hiring" *(careers)*

## 14 · Individual Team Member
<img src="thumbnails/single-team-member/page.png" width="320" alt="Individual Team Member" />

- **Description:** One member — photo/video intro, bio, contact routes, their branch, and same-branch colleagues.
- **Sections:** `team-member-profile` → *(meet-the-rest-of-the-branch grid)*
- **Content type:** Automated *(bio authored in CRM)*
- **Data feeds:** `Internal CRM` (team, branch)
- **CTA:** "Book an appointment" *(with this member)*

## 15 · Agent Listings
<img src="thumbnails/agent-listings/page.png" width="320" alt="Agent Listings" />

- **Description:** One agent's stock — agent-branded hero + property search filtered to that agent.
- **Sections:** `hero-internal` (agent name + photo) → `property-search` → `cta-banner`
- **Content type:** Automated
- **Data feeds:** `Property feed` · `Internal CRM` (agent)
- **CTA:** "See new homes before they hit the portals"

## 16 · Branch Listings
<img src="thumbnails/branch-listings/page.png" width="320" alt="Branch Listings" />

- **Description:** One branch's stock — branch-named hero + property search filtered to that branch.
- **Sections:** `hero-internal` (branch name) → `property-search` → `cta-banner`
- **Content type:** Automated
- **Data feeds:** `Property feed` · `Internal CRM` (branch)
- **CTA:** "Hear about new homes first"

## 17 · Find an Agent
<img src="thumbnails/find-an-agent/page.png" width="320" alt="Find an Agent" />

- **Description:** Postcode/town search returning the agents who cover that area, as agent cards linking to their listings.
- **Sections:** `hero-internal` → `agent-finder` → `cta-banner`
- **Content type:** Automated
- **Data feeds:** `Internal CRM` (agents, areas-covered)
- **CTA:** "Not sure who to ask?" *(valuation)*

## 20 · Branches Overview
<img src="thumbnails/branches-overview/page.png" width="320" alt="Branches Overview" />

- **Description:** Cards for every branch — address, hours, areas covered, live-stock count, links to contact / listings / directions.
- **Sections:** `hero-internal` → `branch-list` → `cta-banner`
- **Content type:** Automated
- **Data feeds:** `Internal CRM` (branches) · `Property feed` (live-stock counts)
- **CTA:** "Book a free valuation with your local team"

## 21 · Branch Contact
<img src="thumbnails/branch-contact/page.png" width="320" alt="Branch Contact" />

- **Description:** One branch — about, manager, areas covered, contact + hours, map, message form, FAQ.
- **Sections:** `hero-internal` → `branch-detail` → `faq-accordion`
- **Content type:** Dashboard-driven
- **Data feeds:** `Internal CRM` (branch)
- **CTA:** *contact form → "Get a valuation"*

**Walkthrough** — the message form, then confirmation:

| Contact form | Message sent |
|---|---|
| <img src="thumbnails/branch-contact/walk-00.png" width="200" alt="contact form" /> | <img src="thumbnails/branch-contact/walk-01.png" width="200" alt="message sent" /> |

**Area & market data**

## 22 · Area Guide & Data Overview
<img src="thumbnails/area-guide-and-data-overview/page.png" width="320" alt="Area Guide & Data Overview" />

- **Description:** A hub of every covered area, grouped by branch, each linking to its area guide and market-data page.
- **Sections:** `hero-internal` → `area-hub` → `cta-banner`
- **Content type:** Automated
- **Data feeds:** `Internal CRM` (areas-covered) · `PropertyData` (avg price)
- **CTA:** "Find out what your home is worth"

## 23 · Individual Area Guide
<img src="thumbnails/individual-area-guide/page.png" width="320" alt="Individual Area Guide" />

- **Description:** AI-written guide to living in one area (overview, transport, schools, places of interest, demographics, property market) with a conversion sidebar, in-area homes slider and FAQs.
- **Sections:** `hero-internal` → `area-guide` → `featured-properties` (in-area) → `faq-accordion`
- **Content type:** Hybrid *(AI-written copy + live data)*
- **Data feeds:** `PropertyData` · `Ofcom` · `Ofsted` · `ONS` · `Property feed` (in-area) · `HM Land Registry`
- **CTA:** "See [area] homes before they hit the market"

## 24 · Individual Market Data
<img src="thumbnails/individual-market-data/page.png" width="320" alt="Individual Market Data" />

- **Description:** One area's live market picture — prices, rents, yields, demand, price trend + forecast, velocity, stock mix, tenure, schools, connectivity, with FAQs.
- **Sections:** `hero-internal` → `market-data` → `faq-accordion`
- **Content type:** Automated
- **Data feeds:** `PropertyData` · `Ofcom` · `Ofsted` · `ONS`
- **CTA:** "Get a valuation / Read the area guide / Contact the branch" *(nav cards)*

**Content & social proof**

## 4 · News Listings
<img src="thumbnails/news-listings/page.png" width="320" alt="News Listings" />

- **Description:** Article grid with category filter, featured article, author + reading time, and newsletter sign-up.
- **Sections:** `hero-internal` → `news-index` → `newsletter`
- **Content type:** Automated
- **Data feeds:** `Internal CRM` (news)
- **CTA:** Newsletter sign-up

## 5 · Single News Article
<img src="thumbnails/single-news-article/page.png" width="320" alt="Single News Article" />

- **Description:** One article — hero, body, share, author, reading time, similar articles, newsletter.
- **Sections:** `news-article` (hero → body → similar articles → newsletter)
- **Content type:** Hybrid *(article authored in CRM)*
- **Data feeds:** `Internal CRM` (news)
- **CTA:** **AI-generated to match the article's story** *(see Appendix C)*

## 6 · Testimonials Listings
<img src="thumbnails/testimonials-listings/page.png" width="320" alt="Testimonials Listings" />

- **Description:** All written reviews, filterable by branch and service, with the review-network logo and a CTA.
- **Sections:** `hero-internal` → `testimonials-list` → `cta-banner`
- **Content type:** Automated
- **Data feeds:** `Reviews feed`
- **CTA:** "Ready to experience it for yourself?"

## 7 · Video Testimonials
<img src="thumbnails/video-testimonials/page.png" width="320" alt="Video Testimonials" />

- **Description:** Featured video + grid of video reviews with a lightbox, and a CTA.
- **Sections:** `hero-internal` → `video-testimonials` → `cta-banner`
- **Content type:** Automated
- **Data feeds:** `Reviews feed`
- **CTA:** "Ready to experience it for yourself?"

## 28b · Leave a Review
<img src="thumbnails/leave-a-review/page.png" width="320" alt="Leave a Review" />

- **Description:** A star-rated written-review form for clients without a Google account; nudges Google reviews as an alternative. *(Form → "Thank you for your review".)*
- **Sections:** `hero-internal` → `review-form`
- **Content type:** Manual
- **Data feeds:** `Internal CRM` (branch list) · `Reviews feed` (aggregate rating)
- **CTA:** *form submit → "Thank you"*

**Walkthrough** — the star-rated review form, then thank-you:

| Review form | Thank you |
|---|---|
| <img src="thumbnails/leave-a-review/walk-00.png" width="200" alt="review form" /> | <img src="thumbnails/leave-a-review/walk-01.png" width="200" alt="thank you" /> |

**Services & company**

## 25 · About
<img src="thumbnails/about/page.png" width="320" alt="About" />

- **Description:** The agency story — intro, image-text split, stats, team preview, accreditations, FAQ, CTA.
- **Sections:** `hero-internal` → `rich-text` → `image-text-split` → `stats-band` → `team-grid` (preview) → `logo-carousel` → `cta-banner` → `faq-accordion`
- **Content type:** Manual *(team preview & stats automated)*
- **Data feeds:** `Reviews feed` (rating) · `Internal CRM` (team)
- **CTA:** "Let's talk about your move"

## 26 · Services
<img src="thumbnails/services/page.png" width="320" alt="Services" />

- **Description:** Everything the agency offers — services grid (each → a detail page), image-text split, three-up cards, CTA.
- **Sections:** `hero-internal` → `services-grid` → `image-text-split` → `three-up-cards` → `cta-banner`
- **Content type:** Manual
- **Data feeds:** *None (authored)*
- **CTA:** "Not sure which service you need?"

## 26a · Individual Service
<img src="thumbnails/individual-service/page.png" width="320" alt="Individual Service" />

- **Description:** One service (Selling, Lettings, etc.) in depth — intro, marketing split, how-it-works, get-started CTAs.
- **Sections:** `hero-internal` → `service-detail` → `cta-banner`
- **Content type:** Manual
- **Data feeds:** *None (authored)* — headline stats optionally `PropertyData`
- **CTA:** dynamic per-service CTA *(see Appendix C)*

## 27 · Pricing / Fees
<img src="thumbnails/pricing-and-fees/page.png" width="320" alt="Pricing / Fees" />

- **Description:** Selling packages (SaaS-style boxes) + a lettings comparison table, fees FAQ and CTA.
- **Sections:** `hero-internal` → `fees-table` → `faq-accordion` → `cta-banner`
- **Content type:** Dashboard-driven *(fees config)*
- **Data feeds:** `Internal CRM` (fees config)
- **CTA:** "Have any questions about our fees?"

## 28 · Register
<img src="thumbnails/register/page.png" width="320" alt="Register" />

- **Description:** Requirements registration, dynamic by client type (sales/lettings), with "something to sell", new-homes and off-market options. *(Form → "You're registered".)*
- **Sections:** `hero-internal` → `register-form`
- **Content type:** Manual + Dashboard-driven
- **Data feeds:** `Internal CRM` (branch, client-type config)
- **CTA:** *form submit → "You're registered"*

**Walkthrough** — the requirements form, then confirmation:

| Requirements form | You're registered |
|---|---|
| <img src="thumbnails/register/walk-00.png" width="200" alt="requirements form" /> | <img src="thumbnails/register/walk-01.png" width="200" alt="registered" /> |

## 28c · General Enquiries
<img src="thumbnails/general-enquiries/page.png" width="320" alt="General Enquiries" />

- **Description:** A catch-all contact form with branch selector + enquiry-type dropdown, routed to the chosen branch. *(Form → "Message sent".)*
- **Sections:** `hero-internal` → `enquiry-form`
- **Content type:** Manual + Dashboard-driven
- **Data feeds:** `Internal CRM` (branches)
- **CTA:** *form submit → "Message sent"*

**Walkthrough** — the enquiry form, then confirmation:

| Enquiry form | Message sent |
|---|---|
| <img src="thumbnails/general-enquiries/walk-00.png" width="200" alt="enquiry form" /> | <img src="thumbnails/general-enquiries/walk-01.png" width="200" alt="message sent" /> |

**Legal & utility**

## 28d · Sitemap (HTML)
<img src="thumbnails/sitemap/page.png" width="320" alt="Sitemap" />

- **Description:** A large index of every indexable URL — pages, branches, agents, areas, developments, news and all URL-friendly searches — grouped under headings.
- **Sections:** `hero-internal` → `sitemap-index`
- **Content type:** Automated
- **Data feeds:** `Internal CRM` (branches, agents, areas, news) · `Property feed`
- **CTA:** *none*

## 29 · FAQs
<img src="thumbnails/faqs/page.png" width="320" alt="FAQs" />

- **Description:** A grouped, jump-navigable Q&A accordion with a contact CTA.
- **Sections:** `hero-internal` → `faq-accordion` → `cta-banner`
- **Content type:** Manual
- **Data feeds:** `Internal CRM` (FAQ set, optional)
- **CTA:** "Didn't find your answer?"

## 30–32 · Privacy / Terms / Cookie
<img src="thumbnails/legal/page.png" width="320" alt="Legal template" />

- **Description:** One legal template serving all three pages — anchored long-form rich-text with a table of contents and a document switcher.
- **Sections:** `hero-internal` → `rich-text` *(document switcher: Privacy / Terms / Cookie)*
- **Content type:** Manual
- **Data feeds:** *None (authored)*
- **CTA:** *none*

---

# Mobile

Dedicated **full-page mobile screens** (≈390px), captured top-to-bottom. **Pages not listed here reflow responsively** — they share the same container/section system, so they don't need an explicit mobile version. Source: `Home/site_handoff/Mobile Screens/`.

**Home — hero variants (mobile)**

| Search | Buttons | Form |
|---|---|---|
| <img src="thumbnails/mobile-search-hero/page.png" width="200" alt="Home search mobile" /> | <img src="thumbnails/mobile-buttons-hero/page.png" width="200" alt="Home buttons mobile" /> | <img src="thumbnails/mobile-form-hero/page.png" width="200" alt="Home form mobile" /> |

**Key pages (mobile)**

| Property Listings | Single Property | Instant Valuation |
|---|---|---|
| <img src="thumbnails/mobile-property-listings-new/page.png" width="200" alt="Property Listings mobile" /> | <img src="thumbnails/mobile-single-property/page.png" width="200" alt="Single Property mobile" /> | <img src="thumbnails/mobile-instant-valuation/page.png" width="200" alt="Instant Valuation mobile" /> |

| Market Data | Pre-Val Pack | Post-Val Proposal |
|---|---|---|
| <img src="thumbnails/mobile-market-data/page.png" width="200" alt="Market Data mobile" /> | <img src="thumbnails/mobile-pre-val-pack/page.png" width="200" alt="Pre-Val Pack mobile" /> | <img src="thumbnails/mobile-post-val-proposal/page.png" width="200" alt="Post-Val Proposal mobile" /> |

---

# Appendix A — Section library

Every section in the theme, with a thumbnail, where it appears, and its variants/options. Global chrome (`topbar`, `header`, `footer`, `modal`) is on every page. `cta-banner` variants are catalogued in **Appendix C**.

> **Section-demo pages** (on the live site) show the content blocks in context: **Image Sections** (image-led + image-text splits + galleries), **Text Sections** (rich-text, quote, stats, two-column), **Video Sections** (featured video, video wall, video-text split). Heroes now support four **background** types — image · CSS-moving image · image slider · video — each with an optional **overlay** (colour + transparency, or pattern + colour + transparency).

| Thumbnail | Section | Appears on | Variants / options |
|---|---|---|---|
| <img src="thumbnails/home/sec-02.png" width="150" /> | `topbar` + `header` | All pages | topbar left: branch selector / contact details · header: transparent-until-scroll (default) / solid-sticky |
| <img src="thumbnails/home/sec-13.png" width="150" /> | `footer` | All pages | optional inline newsletter |
| <img src="thumbnails/promo-modal/page.png" width="150" /> | `modal` (Promo Modal) | All pages (site-wide) | promo / lead-capture: heading, body, email + button, image, dismiss. **Triggers:** floating launcher button · timed (after N seconds) · exit-intent · on nav-away. Per-site config |
| <img src="thumbnails/cookie-consent/page.png" width="150" /> | `cookie-consent` | All pages (site-wide) | bottom banner: Accept cookies / Find out more / Close site; shows until accepted |
| <img src="thumbnails/home-search-hero/page.png" width="88" alt="A search" /> <img src="thumbnails/home-buttons-hero/page.png" width="88" alt="B buttons" /> <img src="thumbnails/home-form-hero/page.png" width="88" alt="C form" /> | `hero-home` | Home | **A** search bar / **B** up to 4 buttons / **C** 2 buttons + form. **Background:** image / CSS-moving image / image slider / video (behind content); optional **overlay** (colour + transparency, or pattern + colour + transparency); optional rating badge |
| <img src="thumbnails/about/sec-01.png" width="150" /> | `hero-internal` | Most internal pages | breadcrumb, optional CTA; **background:** image / moving image / slider / video; optional **overlay** (colour + transparency, or pattern + colour + transparency); agent-name / branch-name variants |
| <img src="thumbnails/home/sec-06.png" width="150" /> | `featured-properties` | Home; Individual Area Guide (in-area) | slider / grid |
| <img src="thumbnails/home/sec-05.png" width="150" /> | `stats-band` | Home, About, Valuation Overview; improvise pool | count-up climbers; stat count/labels configurable |
| <img src="thumbnails/home/sec-07.png" width="150" /> | `services-grid` | Home, Services | card count configurable; each card → an Individual Service page |
| <img src="thumbnails/home/sec-11.png" width="150" /> | `latest-news` | Home; improvise pool | card count configurable |
| <img src="thumbnails/home/sec-09.png" width="150" /> | `testimonials-slider` | Home; Valuation pages (option) | dot pagination |
| <img src="thumbnails/home/sec-10.png" width="150" /> | `cta-banner` | Home, Listings, Testimonials, Agent/Branch, Development, About, Services, Pricing, FAQs, hubs; improvise pool | see **Appendix C** |
| <img src="thumbnails/home/sec-12.png" width="150" /> | `newsletter` | Home, News; footer option; improvise pool | — |
| <img src="thumbnails/home/sec-03.png" width="150" /> | `image-text-split` | Home, About, Services; improvise pool | image left / right; text-first on mobile |
| <img src="thumbnails/single-property/sec-04.png" width="150" /> | `property-card` | Everywhere properties show | grid card / wide list row / map popup / off-market (blurred + register). **Now carries a photo slider** (multi-image, "1/5"); video badge; save heart; status pill |
| <img src="thumbnails/property-listings-new/page.png" width="150" /> | `property-search` | Property/Agent/Branch Listings | Grid / List / Map; photo-slider cards; filter set varies; sale/let toggle (dropped on Development Search); save-search; AI search |
| <img src="thumbnails/single-property/sec-03.png" width="150" /> | `property-media` | Single Property | tabs: Video / Floorplan / Virtual Tour / Brochure / EPC (only those the listing has) |
| <img src="thumbnails/single-property/sec-04.png" width="150" /> | `property-header` + `property-description` | Single Property | save & share; availability tag; expand/collapse description + key features |
| <img src="thumbnails/single-property/sec-05.png" width="150" /> | `property-material-info` | Single Property | expand/collapse; fields show when present |
| <img src="thumbnails/single-property/sec-06.png" width="150" /> | `property-local-area` | Single Property | tabs: schools / transport; map optional |
| <img src="thumbnails/single-property/sec-07.png" width="150" /> | `property-tools` | Single Property | stamp-duty calc (FTB / second-home toggles); mortgage / rental-yield tab |
| <img src="thumbnails/single-property/sec-08.png" width="150" /> | `property-viewing` + `property-agent` + `property-branch` | Single Property, Individual Development | viewing form / booking calendar (day + time picker); agent & branch cards |
| <img src="thumbnails/single-property/sec-09.png" width="150" /> | `similar-properties` | Single Property | carousel of property-cards |
| <img src="thumbnails/single-property/sec-10.png" width="150" /> | `sell-prompt` | Single Property, Individual Development | CTA copy/buttons configurable |
| <img src="thumbnails/find-an-agent/sec-03.png" width="150" /> | `agent-finder` (+ `agent-card`) | Find an Agent | postcode / town search; popular-area chips; areas-covered chips |
| <img src="thumbnails/development-search/sec-03.png" width="150" /> | `development-search` (+ `development-card`) | Development Search | sales-only (no department dropdown); status pill; price "from"; plots count |
| <img src="thumbnails/individual-development/sec-03.png" width="150" /> | `development-media` | Individual Development | Photos / Video / Brochure (no floorplan/EPC/virtual tour) |
| <img src="thumbnails/individual-development/sec-04.png" width="150" /> | `development-header` + `development-developer` | Individual Development | price range from–to; sticky enquiry/save rail; developer block |
| <img src="thumbnails/individual-development/sec-05.png" width="150" /> | `development-plots` | Individual Development | download chips (price list / floor plans); plot table; plots as property-cards |
| <img src="thumbnails/valuation-overview/sec-03.png" width="150" /> | `valuation-chooser` | Valuation Overview | middle "Most accurate" card emphasised |
| <img src="thumbnails/instant-valuation/sec-03.png" width="150" /> | `valuation-form` + `valuation-result` | Instant / Book / Virtual Valuation | **instant** (stepper) / **booking** (single-screen, optional diary) / **virtual** (call-type + photo upload); result with refurbished-value toggle |
| <img src="thumbnails/virtual-valuation/sec-03.png" width="150" /> | `virtual-valuation-explainer` | Virtual Valuation | 4-step how-it-works |
| <img src="thumbnails/property-and-area-report/sec-02.png" width="150" /> | `report-tabs` | Property & Area Report | Property (default) / Area; sticky tab pill on scroll |
| <img src="thumbnails/property-and-area-report/sec-03.png" width="150" /> | `report-property` / `report-area` | Property & Area Report | refurbished-value toggle; Area tab: stat cards, trend chart (+forecast), tables, donut, tenure bars, schools, connectivity |
| <img src="thumbnails/pre-val-pack/sec-01.png" width="150" /> | `preval-hero` | Pre-Val Pack | **always on** |
| <img src="thumbnails/pre-val-pack/sec-03.png" width="150" /> | `preval-valuer` / `-agency` / `-why-instruct` / `-local-market` / `-on-the-day` / `-survey` | Pre-Val Pack | each optional + reorderable (Settings → Appraisals); survey → thank-you |
| <img src="thumbnails/post-val-proposal/sec-01.png" width="150" /> | `postval-hero` | Post-Val Proposal | **always on**; proceed / not-yet buttons |
| <img src="thumbnails/post-val-proposal/sec-05.png" width="150" /> | `postval-why-price` / `-property` / `-comparables` / `-marketing` / `-fee` / `-instruct-cta` | Post-Val Proposal | each shows when its field is filled; comparables tagged Sold / Asking; fee % or fixed |
| <img src="thumbnails/meet-the-team/sec-03.png" width="150" /> | `team-grid` | Meet the Team, About (preview) | branch filter + department dropdown; pagination |
| <img src="thumbnails/single-team-member/sec-03.png" width="150" /> | `team-member-profile` | Individual Team Member | photo or video; specialisms; visit-branch card |
| <img src="thumbnails/branches-overview/sec-03.png" width="150" /> | `branch-list` | Branches Overview | split-cards; embedded CTA banner |
| <img src="thumbnails/branch-contact/sec-03.png" width="150" /> | `branch-detail` | Branch Contact | about + manager + areas; contact + hours; map; contact form → success |
| <img src="thumbnails/area-guide-and-data-overview/sec-03.png" width="150" /> | `area-hub` | Area Guide & Data Overview | grouped by branch; area cards → guide + market data |
| <img src="thumbnails/individual-area-guide/sec-03.png" width="150" /> | `area-guide` | Individual Area Guide | main column + sticky sidebar; in-area slider; register CTA |
| <img src="thumbnails/individual-market-data/sec-04.png" width="150" /> | `market-data` | Individual Market Data | stat band, trend chart (+forecast), tables, velocity, donut, tenure bars, schools, connectivity, nav CTAs |
| <img src="thumbnails/news-listings/sec-03.png" width="150" /> | `news-index` | News Listings | category filter; featured article (first page only); pagination |
| <img src="thumbnails/single-news-article/sec-01.png" width="150" /> | `news-article` | Single News Article | copy-link share; author rail; similar articles; AI CTA |
| <img src="thumbnails/testimonials-listings/sec-03.png" width="150" /> | `testimonials-list` | Testimonials Listings | branch + service filters; read-more modal; load-more |
| <img src="thumbnails/video-testimonials/sec-03.png" width="150" /> | `video-testimonials` | Video Testimonials; Home; Valuation pages | featured + grid; lightbox; load-more |
| <img src="thumbnails/pricing-and-fees/sec-03.png" width="150" /> | `fees-table` | Pricing / Fees | comparison table / 3 SaaS-style boxes; featured card |
| <img src="thumbnails/faqs/sec-03.png" width="150" /> | `faq-accordion` | Valuation, Branch Contact, Area, Market Data, About, Pricing, FAQs | one-column / two-column; single-open; jump-nav (FAQs) |
| <img src="thumbnails/register/sec-03.png" width="150" /> | `register-form` | Register | dynamic by client type; "something to sell"; new-homes / off-market opt-ins; → success |
| <img src="thumbnails/leave-a-review/sec-03.png" width="150" /> | `review-form` | Leave a Review | interactive ≤5 star rating; branch + service dropdowns; → thank-you |
| <img src="thumbnails/general-enquiries/sec-03.png" width="150" /> | `enquiry-form` | General Enquiries | branch selector + enquiry-type dropdown; branch-linked aside; → sent |
| <img src="thumbnails/sitemap/sec-03.png" width="150" /> | `sitemap-index` | Sitemap (HTML) | jump-to chips; grouped link lists incl. URL-friendly searches |
| <img src="thumbnails/individual-service/sec-03.png" width="150" /> | `service-detail` | Individual Service | data-driven by service slug; intro split, marketing split, how-it-works, get-started CTAs |
| <img src="thumbnails/about/sec-03.png" width="150" /> | `rich-text` | About, Individual Development, Legal; improvise pool | — |
| <img src="thumbnails/services/sec-05.png" width="150" /> | `three-up-cards` | Services; improvise pool | repeatable rows |
| <img src="thumbnails/about/sec-07.png" width="150" /> | `logo-carousel` | About (accreditations); improvise pool | logos / awards |
| — | `tile-text-button` · `two-column` · `quote` · `image-gallery` · `video-gallery` · `guide-downloads` · `form-standard` · `form-with-image` | Improvise pool | generic content sections any page may use |

---

# Appendix B — Data sources

The CRM project's live sources, the data values each provides, and the pages that use them.

| Source | Data values it provides | Pages that use it |
|---|---|---|
| **Property feed** (CRM/portal) | Live listings: price, status, address, beds/baths/receptions; media (photos, video, floorplan, brochure, EPC doc); development plots | Home (featured), Property Listings, Single Property, Agent/Branch Listings, Development Search, Individual Development, Off-Market, Area Guide (in-area), Property & Area Report, Sitemap |
| **PropertyData** | Avg asking/sold price, £/sq ft, avg rent, gross yield, demand, price trend + forecast, market velocity, housing-stock mix, tenure split, comparables, rental estimate, flood risk, rebuild cost, planning applications, nearest stations | Instant Valuation, Property & Area Report, Individual Area Guide, Individual Market Data, Area Overview, Pre-Val Pack, Post-Val Proposal, Single Property (tools/area) |
| **HM Land Registry** | Sold prices / comparable sales | Single Property (similar), Instant Valuation, Property & Area Report, Post-Val Proposal |
| **EPC Register** | EPC current → potential rating | Single Property, Property & Area Report |
| **Ofcom** | Broadband coverage %, mobile coverage by network | Single Property (local area), Individual Area Guide, Individual Market Data, Property & Area Report |
| **Ofsted** | School name, phase, rating, distance | Single Property, Individual Area Guide, Individual Market Data, Property & Area Report, Property Listings (school filter) |
| **ONS** | Population, median income, demographics, tenure split | Individual Area Guide, Individual Market Data, Property & Area Report |
| **Reviews feed** | Google / Trustpilot reviews, ratings, video reviews + network logo | Home, Testimonials Listings, Video Testimonials, Valuation pages, About, Pre-Val Pack, Leave a Review (aggregate) |
| **Internal CRM** | Team, branches, agents, areas-covered, news articles, appraisal fields, fees config, FAQ sets, diary/availability; captures valuation & enquiry leads | Meet the Team, Team Member, Agent/Branch Listings, Find an Agent, Branches Overview, Branch Contact, News, Pre/Post-Val, Pricing, Register, Enquiries, FAQs, Sitemap; branch selector on every page |

---

# Appendix C — CTA library

Reusable call-to-action banners across the site (the same CTA repeats in many places). Buttons in `{{ }}` are dynamic.

| CTA | Message | Buttons | Used on |
|---|---|---|---|
| **Valuation prompt** | "Find out what your home is worth" / "Thinking of moving?" | Book a Valuation (· Instant valuation) | Single Property, Individual Development, Area Overview |
| **Sell or let** | "Thinking of selling or letting?" | Book a Valuation · Instant valuation | Home |
| **New-homes alerts** | "See new homes before they hit the portals" | Register for alerts (· Create an account) | Property Listings, Agent Listings, Development Search |
| **Branch alerts** | "Hear about new homes first" | Register with this branch · Call the branch | Branch Listings |
| **Talk to a branch** | "Prefer to talk it through first?" | Call `{{ branch }}` · Find your branch | Valuation Overview, Instant / Book / Virtual Valuation |
| **Reviews → valuation** | "Ready to experience it for yourself?" | Book a Valuation | Testimonials Listings, Video Testimonials |
| **About → move** | "Let's talk about your move" | Book a Valuation · Contact us | About |
| **Services → help** | "Not sure which service you need?" | Contact us | Services |
| **Fees → talk** | "Have any questions about our fees?" | Talk to us | Pricing / Fees |
| **FAQ → contact** | "Didn't find your answer?" | Contact us | FAQs |
| **Service detail** *(dynamic)* | `{{ service.ctaHeading }}` | `{{ service.primaryLabel }}` · Contact us | Individual Service |
| **Area register** | "See `{{ area }}` homes before they hit the market" | Register your requirements | Individual Area Guide |
| **Market-data nav** | "Get a valuation / Read the area guide / Contact the branch" | 3 cards | Individual Market Data |
| **Off-market** | "Want to market your property with low visibility?" | Speak to our team | Off-Market Properties |
| **Valuation prompt (branch)** | "Book a free valuation with your local team" / "Not sure who to ask?" | Book a Valuation | Branches Overview, Find an Agent |
| **News article** *(AI)* | **AI-generated to match the article's story** | varies per article | Single News Article |

---

# Appendix D — Page classification *(to complete)*

Set **Type** (Automated / Manual / Hybrid / Dashboard-driven), confirm the **data feeds** (pre-filled — multi-select from Appendix B), and add **Notes** (for hybrids, which parts are which).

| Page | Type | Requires data feed | Notes |
|---|---|---|---|
| 1 · Home |  | Property feed, Reviews feed, Internal CRM |  |
| 2 · Property Listings |  | Property feed, Ofsted, PropertyData |  |
| 3 · Single Property |  | Property feed, EPC Register, Ofsted, PropertyData, HM Land Registry, Internal CRM |  |
| 4 · News Listings |  | Internal CRM |  |
| 5 · Single News Article |  | Internal CRM |  |
| 6 · Testimonials Listings |  | Reviews feed |  |
| 7 · Video Testimonials |  | Reviews feed |  |
| 8 · Valuation Overview |  | Reviews feed |  |
| 9 · Instant Valuation |  | PropertyData, HM Land Registry, Property feed, Reviews feed |  |
| 9a · Instant Valuation (Landing) |  | PropertyData, HM Land Registry |  |
| 10 · Book a Valuation |  | Internal CRM, Reviews feed |  |
| 11 · Virtual Valuation |  | Internal CRM, Reviews feed |  |
| 12 · Property & Area Report |  | Property feed, PropertyData, HM Land Registry, EPC Register, Ofcom, Ofsted, ONS |  |
| 12a · Pre-Val Pack |  | Internal CRM, PropertyData, Reviews feed |  |
| 12b · Post-Val Proposal |  | Internal CRM, HM Land Registry, PropertyData |  |
| 13 · Meet the Team |  | Internal CRM |  |
| 14 · Individual Team Member |  | Internal CRM |  |
| 15 · Agent Listings |  | Property feed, Internal CRM |  |
| 16 · Branch Listings |  | Property feed, Internal CRM |  |
| 17 · Find an Agent |  | Internal CRM |  |
| 18 · Development Search |  | Property feed |  |
| 18a · Off-Market Properties |  | Property feed |  |
| 19 · Individual Development |  | Property feed, Internal CRM |  |
| 20 · Branches Overview |  | Internal CRM, Property feed |  |
| 21 · Branch Contact |  | Internal CRM |  |
| 22 · Area Guide & Data Overview |  | Internal CRM, PropertyData |  |
| 23 · Individual Area Guide |  | PropertyData, Ofcom, Ofsted, ONS, Property feed, HM Land Registry |  |
| 24 · Individual Market Data |  | PropertyData, Ofcom, Ofsted, ONS |  |
| 25 · About |  | Reviews feed, Internal CRM |  |
| 26 · Services |  | — |  |
| 26a · Individual Service |  | (PropertyData optional) |  |
| 27 · Pricing / Fees |  | Internal CRM |  |
| 28 · Register |  | Internal CRM |  |
| 28b · Leave a Review |  | Internal CRM, Reviews feed |  |
| 28c · General Enquiries |  | Internal CRM |  |
| 28d · Sitemap (HTML) |  | Internal CRM, Property feed |  |
| 29 · FAQs |  | Internal CRM |  |
| 30–32 · Privacy / Terms / Cookie |  | — |  |

---

# Appendix E — Style token guide

> **This is the reference token layer.** When restyling a new theme, **replace every value below** with tokens derived from your reference site — sections never hard-code colours or fonts (they read `var(--…)`), so re-skinning is just changing these values. **Every theme's style guide uses this same `Style Foundation` format.**

The canonical style guide is **`Style Foundation.html`** — its `:root` block repeats in every page. Colours are in **OKLCH**.

<img src="thumbnails/style-foundation-new/page.png" width="320" alt="Style Foundation reference" />

### Colour
| Token | Value | Role |
|---|---|---|
| `--color-bg` | `oklch(0.984 0.004 95)` | page background, warm off-white |
| `--color-surface` | `oklch(1 0 0)` | cards / panels |
| `--color-surface-alt` | `oklch(0.963 0.005 95)` | subtle alt fill / banded sections |
| `--color-primary` | `oklch(0.31 0.018 255)` | deep slate — dark bands, headings |
| `--color-primary-hover` | `oklch(0.255 0.018 255)` | — |
| `--color-on-primary` | `oklch(0.985 0.004 95)` | text on primary |
| `--color-secondary` | `oklch(0.46 0.02 255)` | secondary text/UI |
| `--color-accent` | `oklch(0.66 0.105 232)` | steel-blue — CTAs/links |
| `--color-accent-hover` | `oklch(0.60 0.105 232)` | — |
| `--color-on-accent` | `oklch(0.99 0.003 232)` | text on accent |
| `--color-text` | `oklch(0.24 0.012 260)` | body text |
| `--color-muted` | `oklch(0.53 0.012 260)` | secondary text |
| `--color-border` | `oklch(0.905 0.005 95)` | hairlines |
| `--color-success` | `oklch(0.62 0.10 155)` | SSTC / success status |

### Typography
- `--font-heading: "Newsreader", Georgia, serif` (serif headings) · `--font-body: "Hanken Grotesk", system-ui, sans-serif` · `--font-mono: ui-monospace, Menlo, monospace`. Fonts load from Google Fonts.
- Scale: `--text-xs` 0.75rem · `--text-sm` 0.875 · `--text-base` 1 · `--text-lg` 1.125 · `--text-xl` 1.375 · `--text-2xl` 1.75 · `--text-3xl` 2.25 · `--text-4xl` 3 · `--text-5xl` 4rem.
- Leading: `--leading-tight` 1.12 · `--leading-snug` 1.3 · `--leading-body` 1.6. Kicker tracking `--tracking-kicker` 0.16em (uppercase eyebrow labels).

### Spacing · shape · depth · layout
- **Spacing** (4px base): `--space-1` 4 → `--space-24` 96px (1,2,3,4,5,6,8,10,12,16,20,24).
- **Radius:** `--radius-sm` 6px · `--radius` 10px · `--radius-lg` 18px · `--radius-full` 999px.
- **Shadow:** `--shadow-sm` (subtle card) · `--shadow-md` (hover/raised) · `--shadow-lg` (overlays/modals).
- **Layout:** `--container: 1200px`. Breakpoints across pages: **980px** (nav → hamburger, 3→2 col), **860px** (splits stack), **680px** (→ single column), plus **560/640px** for card tweaks.

### Image fills & overlay patterns
The diagonal-hatch fill stands in for **every image and video** across the site (either fill can hold a real image/video). Pick by background, not content:
- **`.et-ph`** (light) — `var(--color-surface-alt)` + `repeating-linear-gradient(45deg, oklch(0.93 0.006 95) 0 9px, transparent 9px 18px)`
- **`.et-ph-dark`** (dark / hero) — `var(--color-primary)` + `repeating-linear-gradient(45deg, oklch(0.36 0.02 255) 0 9px, transparent 9px 18px)`
- **Dot grid** (map / texture) — `var(--color-surface-alt)` + `radial-gradient(var(--color-border) 2px, transparent 2px)`, `background-size: 18px 18px`

These double as the **overlay patterns** (applied over hero/image backgrounds with a colour + transparency). An optional monospace `[ … ]` label notes what belongs there. Review badges in `assets/`: `google-g.svg`, `trustpilot-star.svg`, `instagram-white.svg`.

### Re-skinning (build once, skin many)
1. Duplicate the project. 2. Override **only** the `:root` token values with the client's palette/fonts/radius. 3. Swap logo + imagery. Layout and sections are untouched — the Estate Track v3 token-layer / theme-recipe model.

---

# Appendix F — Cards (actual size)

The reusable card components, captured at 1:1 from the live pages. The **property card now carries a photo slider** (multi-image, "1/5") — captured from the new Property Listings page.

### Property card — grid  *(377 × 425)*
<img src="thumbnails/cards/property-card-grid.png" width="377" alt="property card grid" />

Used by `featured-properties` sliders and the `property-search` grid: photo slider, status pill, Video badge, save heart, price, beds/baths/receptions.

### Property card — list row  *(1148 wide)*
<img src="thumbnails/cards/property-card-list.png" width="720" alt="property list card" />

The wide row variant used by `property-search` **List** view.

### Property card — map popup  *(504 wide)*
<img src="thumbnails/cards/property-card-map.png" width="380" alt="property map card" />

The card shown in `property-search` **Map** view (pin popup / map-side list).

### Testimonial card  *(375 × 309)*
<img src="thumbnails/cards/testimonial-card.png" width="340" alt="testimonial card" />

Star rating, quote, author + date, review-network logo (Google / Trustpilot).

### Video review card  *(375 × 622)*
<img src="thumbnails/cards/video-review-card.png" width="320" alt="video review card" />

Video poster + play, duration, client name/role, quote, "watch story" link.

### News post card  *(375 × 493)*
<img src="thumbnails/cards/news-card.png" width="320" alt="news post card" />

Category pill, article image, date + reading time, title, excerpt, author.
