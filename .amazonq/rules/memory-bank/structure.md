# Project Structure

## Directory Layout
```
ceel301-graphicsdesgin/
├── index.html                        # Main landing page — lesson & activity hub
├── wrangler.toml                     # Cloudflare Workers deployment config
├── .cfignore                         # Cloudflare deploy ignore rules
│
├── design-principles/                # Lesson: Design Principles & Elements (4 parts)
│   ├── index.html
│   ├── part1.html – part4.html
│   └── icons/                        # designElement/ and designPrinciple/ image assets
│
├── Hierarchy/                        # Lesson: Visual Hierarchy (4 parts)
│   ├── index.html
│   ├── part1.html – part4.html
│   └── assets/                       # Magazine, poster, website reference images
│
├── ColorTheory/                      # Lesson: Color Theory (7 parts + activities)
│   ├── index.html
│   ├── part1a-definition.html … part7-activity.html
│   ├── cocology.html                 # Color personality test (image-based)
│   ├── Color-personality-test-*.html # Scenario-based & ranked tests
│   ├── shared.css                    # Module-scoped shared styles
│   ├── shared.js                     # Module-scoped shared JS (slide engine)
│   └── cocology-image/               # Test scenario images
│
├── LogoDesign/                       # Lesson: Logo Design Techniques (5 parts)
│   ├── index.html
│   ├── part1-intro.html … part5-summary.html
│   ├── shared.css
│   └── shared.js                     # Slide engine for this module
│
├── MotionGraphics/                   # Lesson: Motion Graphics (24 slides)
│   ├── index.html
│   └── slides.js                     # Full slide data + engine for this module
│
├── UIUX/                             # Lesson: UI/UX Web Graphics & Wireframing (14 slides)
│   ├── index.html
│   ├── slide1.html – slide14.html
│   ├── slides.js                     # Slide data + engine
│   ├── styles.css
│   └── test.html
│
├── Typography/                       # Lesson: Typography Mastery (30 slides)
│   ├── index.html
│   └── slide-01.html – slide-30.html
│
├── Photography/                      # Lesson: Photography & Editing (30 slides)
│   ├── index.html
│   ├── slide-01.html – slide-30.html
│   ├── shared.css
│   └── image-prompts.md
│
├── Photoshop/                        # Lesson: Photoshop Essentials
│   ├── index.html                    # JS-driven slide deck (inline)
│   └── assets/                       # Tool screenshots and comparison images
│
├── Graphic-Design-for-Digital-Media/ # Lesson: Social Media Campaigns (20 slides)
│   ├── index.html
│   └── slide-01.html – slide-20.html
│
├── docs/                             # Source markdown documents (module content)
│   └── Module - *.md                 # One .md per lesson topic
│
├── activity3.html                    # Activity: Guess the Fix!
├── zoom-acitivty.html                # Activity: Find the Difference
├── image-zoom-comparison.html        # Activity: Raster vs Vector Zoom
└── typography-presentation.html     # Standalone typography presentation
```

## Core Components

### Landing Page (`index.html`)
- Fixed theme-toggle button (dark/light, persisted via localStorage)
- `section-label` dividers separating Lessons and Activities
- `.lesson-card` components: icon + title + description + `.parts-list` sub-navigation
- `.act-card` components: standalone activity links
- Per-card `--accent` CSS variable drives hover colors

### Slide Engine Pattern
Two variants exist across modules:

1. **Shared JS file** (`shared.js` in ColorTheory, LogoDesign) — imported by individual HTML part files; provides slide navigation functions used across multiple pages.

2. **Self-contained slides.js** (`MotionGraphics/slides.js`, `UIUX/slides.js`) — defines all slide content as a JS data array and renders the entire deck into a single `index.html` at runtime.

### Per-slide HTML files (Typography, Photography, Graphic-Design-for-Digital-Media)
- Each slide is a separate `.html` file with inline styles and prev/next navigation links
- No shared JS dependency; navigation is pure HTML anchor links

## Architectural Patterns
- **No build system** — pure HTML/CSS/JS, no bundler or framework
- **CSS Custom Properties** for theming (`--bg`, `--surface`, `--text`, `--accent`, etc.)
- **`html.light` class toggle** on `<html>` element for dark/light mode switching
- **Inter font** via Google Fonts CDN used consistently across modules
- **Inline `<style>` blocks** — styles are embedded per-file rather than in external sheets (except `shared.css` files)
- **Cloudflare Workers** static hosting via `wrangler.toml`
