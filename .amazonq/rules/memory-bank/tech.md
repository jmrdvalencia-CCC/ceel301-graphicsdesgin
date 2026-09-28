# Technology Stack

## Languages
- **HTML5** — all pages; semantic markup with `<!DOCTYPE html>` and `lang="en"`
- **CSS3** — inline `<style>` blocks per page + shared `.css` files; uses custom properties, flexbox, grid, transitions
- **Vanilla JavaScript (ES6+)** — inline `<script>` blocks + shared `.js` files; no transpilation

## Fonts
- **Inter** (Google Fonts CDN) — weights 400, 600, 700, 800; loaded via `@import url(...)` in CSS

## Deployment
- **Cloudflare Workers** via [Wrangler](https://developers.cloudflare.com/workers/wrangler/)
  - `wrangler.toml`: `name = "graphicsdesign"`, `compatibility_date = "2024-01-01"`, assets from `./public`
- **`.cfignore`** — controls which files are excluded from Cloudflare deployment

## Build System
- None — no npm, no bundler, no framework
- Files are served as static assets directly

## Development Commands
```bash
# Install Wrangler (one-time)
npm install -g wrangler

# Preview locally
wrangler dev

# Deploy to Cloudflare Workers
wrangler deploy
```

## Browser APIs Used
- `localStorage` — theme preference persistence
- `Canvas API` — freehand drawing in LogoDesign sketching activity
- `scrollIntoView` — smooth carousel navigation
- `addEventListener` with `{ passive: true }` — scroll performance optimization

## Asset Types
- `.html` — lesson pages and activities
- `.css` — shared module stylesheets
- `.js` — shared module scripts
- `.png`, `.jpg`, `.jpeg`, `.webp`, `.svg` — reference images and activity assets
- `.pdf` — course reference document (CEEL301-DCI.pdf)
- `.md`, `.docx` — source course documentation in `/docs`
