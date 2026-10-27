# Technology Stack

## Languages
- **HTML5** — all lesson pages, slide files, and activities
- **CSS3** — inline `<style>` blocks per file; CSS custom properties for theming
- **Vanilla JavaScript (ES6+)** — slide engines, theme toggle, interactive activities

## No Framework / No Build System
This project uses zero dependencies, no package manager, and no bundler. Everything runs directly in the browser.

## External Resources
- **Google Fonts** — `Inter` (weights 400, 600, 700, 800) loaded via CDN `<link>` tag
  ```html
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');
  ```

## Deployment
- **Cloudflare Workers** (static assets mode)
- Config: `wrangler.toml`
  ```toml
  name = "graphicsdesign"
  compatibility_date = "2024-01-01"
  [assets]
  directory = "./public"
  ```
- Deploy command: `wrangler deploy` (Cloudflare Wrangler CLI required)
- Ignore rules: `.cfignore`

## Development Commands
| Task | Command |
|---|---|
| Local preview | Open any `.html` file directly in browser (no server needed) |
| Deploy to Cloudflare | `wrangler deploy` |
| Wrangler install | `npm install -g wrangler` |

## Browser APIs Used
- `localStorage` — theme preference persistence (`theme: 'light' | 'dark'`)
- `document.documentElement.classList` — `html.light` class toggle for theming
- `canvas` API — used in zoom/raster comparison activities
- `addEventListener` — keyboard navigation in slide decks

## CSS Architecture
- **CSS Custom Properties** (`:root` variables): `--bg`, `--surface`, `--border`, `--text`, `--muted`, `--label`, `--divider`, `--surface2`, `--accent`
- **Dark mode default**, light mode via `html.light` class override
- **`box-sizing: border-box`** reset applied globally via `* {}`
- **Transitions** on `background`, `color`, `transform`, `border-color` for smooth theme/hover effects
- **`--accent` per-component** — each lesson card sets its own accent color via inline `style="--accent:#hex"`

## File Naming Conventions
- Lesson parts: `part1.html`, `part1a-definition.html`, `part2-properties.html` (kebab-case with descriptive suffix)
- Slide files: `slide-01.html` (zero-padded) or `slide1.html` (no padding, UIUX module)
- Shared utilities: `shared.js`, `shared.css`
- Slide data+engine: `slides.js`
