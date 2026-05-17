# fourteenzerosix studios — website

A static portfolio site for **fourteenzerosix studios** (pottery) and **Zoei Benzon** (brand & marketing).

Built as plain HTML + CSS + React-via-Babel — no build step, no install. Open `index.html` in a browser and it just works.

## Pages

| File | What it is |
|---|---|
| `index.html` | Main site. Single-scroll layout (Hero → About → Pottery → Marketing → Contact) with an optional split-landing variant available in the Tweaks panel. |
| `pottery.html` | Image-led pottery landing. Gallery-first, with a year filter and asymmetric grid. |
| `zoei.html` | Zoei Benzon's brand & marketing portfolio — dev-portfolio-style row list of work, services, and press. |

## Files

```
index.html          ← single-scroll site
pottery.html        ← pottery landing
zoei.html           ← marketing landing
styles.css          ← shared design tokens + base styles
pages.css           ← styles specific to pottery.html / zoei.html
data.jsx            ← content (pottery pieces, marketing case studies, etc.)
components.jsx      ← React components used on index.html
app.jsx             ← index.html entry point + Tweaks panel wiring
pages.jsx           ← React components for pottery.html / zoei.html
tweaks-panel.jsx    ← in-page Tweaks panel (palette, layout, density, type)
```

## How to edit common things

**Swap the pottery pieces** — edit the `POTTERY` array in `data.jsx`. Each piece has `name`, `form`, `glaze`, `year`, `dimensions`, `price`, `color` (used by the placeholder tile), and an optional `badge` (`"new"` or `"sold"`).

**Swap the marketing case studies** — edit the `MARKETING` array in `data.jsx`.

**Swap real images in** — replace the `<Placeholder>` component usages with `<img src="...">`. The placeholder is in `components.jsx` (used on `index.html`) and `pages.jsx` (used on `pottery.html`).

**Change the palette** — edit the `--terracotta`, `--tan`, `--sage`, `--dark`, `--cream`, `--ink`, `--brown` variables at the top of `styles.css`. Tweak presets live in `app.jsx` under `PALETTES`.

**Change the type pairing** — edit the font variables at the top of `styles.css` (`--sans`, `--display`, `--body`, `--ui`).

## Tweaks panel

The Tweaks toggle (top-right toolbar in preview) opens an in-page panel where you can flip:

- **Palette** — studio / kiln / ash / porcelain
- **Layout** — single-scroll vs split landing
- **Pottery grid density** — airy / medium / dense
- **Marquee band** on/off
- **Type pair** — DM Sans + Helvetica (brand) / DM Serif headings / All DM Sans

## Brand system

Sourced from the Figma brand style guide:

- **Colors:** terracotta `#A56435`, tan `#E7C69E`, sage `#688662`, dark `#282D2A`, cream `#F7F9F8`, ink `#232323`, brown `#6F5950`
- **Type:** DM Sans (Medium, –0.03em tracking), DM Serif Display (italic display moments), Helvetica Neue (body), Inter (eyebrows/UI)
- **Buttons:** primary = terracotta fill / cream text, secondary = white fill / terracotta border+text. Radius 10, padding 16/32.

## Running locally

No build step. You can either:

- **Open `index.html` directly** in any modern browser, or
- Serve the folder over HTTP (recommended, so script imports resolve cleanly):
  ```
  python3 -m http.server 8000
  # then visit http://localhost:8000
  ```

## Deploying

Drop the folder onto any static host — Netlify, Vercel, GitHub Pages, Cloudflare Pages all work without configuration.

---

© 2026 fourteenzerosix studios · made with love in Chicago
