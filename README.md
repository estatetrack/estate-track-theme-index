# Estate Track — "Home" Theme

Documentation + source for the Estate Track "Home" website theme.

## Hosted

| What | URL |
|---|---|
| **Index & Blueprint** (documented: pages → sections → variants → data feeds → CTAs → tokens, with thumbnails & walkthroughs) | https://estate-track-theme-index.vercel.app · mirror: https://estatetrack.github.io/estate-track-theme-index/ |
| **Live pages** (clickable index of every real page, rendered) | https://estate-track-theme-site.vercel.app |

## What's in here

- **`index.html`** — the documented Index & Blueprint (self-contained; thumbnails embedded).
- **`estate-track-theme-site/`** — all the actual theme pages (`*.dc.html`), `support.js`, `assets/`, `Mobile Screens/`, the bundled landing page, and shared card components, plus a generated `index.html` linking them.
- **`source/`** — the blueprint markdown (`Estate_Track_Theme_Index.md`) and the build tooling (screenshotter, walkthrough driver, HTML builder, pages-index generator).

## Two uses

1. **Developer → page builder.** Map each documented section to a builder block. The live-pages site shows the rendered reference for each.
2. **Claude Design → next theme.** Feed `source/Estate_Track_Theme_Index.md` to Claude Design with a reference-site URL: *"build this page/section system in that style, on the token layer in Appendix E."*

## Updating

From the parent `Themes/` working folder, run **`bash publish.sh`** — it rebuilds the blueprint HTML, syncs the live pages, regenerates the pages index, pushes to GitHub, and redeploys both Vercel sites.
