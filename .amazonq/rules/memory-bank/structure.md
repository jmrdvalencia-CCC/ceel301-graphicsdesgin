# Project Structure

## Directory Layout

```
ceel301-graphicsdesgin/
├── index.html                        # Main landing page (lessons + activities hub)
├── wrangler.toml                     # Cloudflare Workers deployment config
├── .cfignore                         # Cloudflare ignore rules
├── activity3.html                    # "Guess the Fix!" activity
├── zoom-acitivty.html                # "Find the Difference" activity
├── image-zoom-comparison.html        # "Raster vs Vector Zoom" activity
├── CEEL301-DCI.pdf                   # Course reference document
│
├── ColorTheory/                      # 7-part Color Theory lesson module
│   ├── index.html                    # Module landing page
│   ├── part1a-definition.html        # Foundations & Definition
│   ├── part1a2-pillars.html          # Three pillars of color theory
│   ├── part1b-history.html           # History of color theory
│   ├── part1c-wheel-pillar.html      # Color wheel pillar
│   ├── part1d-psychology-pillar.html # Psychology pillar
│   ├── part1e-systems-pillar.html    # Systems pillar
│   ├── part1-foundations.html        # Foundations overview
│   ├── part2-properties.html         # Color wheel & properties
│   ├── part2b-colorlab.html          # Interactive color lab
│   ├── part2c-temperature.html       # Color temperature
│   ├── part3-harmonies.html          # Harmonies & schemes
│   ├── part4-ratio.html              # 60-30-10 rule
│   ├── part5-psychology.html         # Psychology & culture
│   ├── part6-systems.html            # Color systems overview
│   ├── part6b-rgbcmyk.html           # RGB vs CMYK
│   ├── part7-activity.html           # Activity & summary
│   ├── cocology.html                 # Color personality test
│   ├── Color-personality-test-ranks.html
│   ├── Color-personality-test-scenario-based.html
│   ├── shared.css                    # Module-scoped styles
│   └── shared.js                     # Module navigation & progress logic
│
├── LogoDesign/                       # 5-part Logo Design lesson module
│   ├── index.html
│   ├── part1-intro.html
│   ├── part2-sketching.html          # Includes canvas drawing activity
│   ├── part3-digitizing.html
│   ├── part4-scalability.html
│   ├── part5-summary.html
│   ├── shared.css                    # Module-scoped styles
│   └── shared.js                     # Module navigation & progress logic
│
├── design-principles/                # 4-part Design Principles lesson module
│   ├── index.html
│   ├── part1.html – part4.html
│   └── icons/                        # Brand/logo reference images
│       ├── designElement/
│       └── designPrinciple/
│
├── Hierarchy/                        # 4-part Visual Hierarchy lesson module
│   ├── index.html
│   ├── part1.html – part4.html
│   └── assets/                       # Magazine/poster reference images
│
├── Photoshop/                        # Photoshop Essentials lesson module
│   ├── index.html                    # Slide-based presentation
│   └── assets/                       # Tool screenshots and sample images
│
├── Graphic-Design-for-Digital-Media/ # 20-slide Social Media & Banner Ads module
│   ├── index.html
│   └── slide-01.html – slide-20.html
│
└── docs/                             # Source course documents (Markdown, DOCX, GDoc)
```

## Core Components & Relationships

- **index.html** is the hub; all modules link from here via lesson cards and activity cards
- **shared.js + shared.css** (in ColorTheory/ and LogoDesign/) provide reusable per-module navigation, progress bars, and slide transitions — each module has its own copy
- **Lesson modules** follow a consistent multi-part HTML file pattern (`part1.html`, `part2.html`, …)
- **Graphic-Design-for-Digital-Media** uses a numbered slide pattern (`slide-01.html` … `slide-20.html`)
- **Activities** are standalone HTML files at the root level

## Architectural Patterns

- **No build system** — pure HTML/CSS/JS, no bundler or framework
- **CSS custom properties (variables)** for theming (`--bg`, `--surface`, `--accent`, etc.) defined on `:root` and overridden with `html.light`
- **localStorage** for theme persistence across pages
- **Inline `<style>` blocks** inside each HTML file for page-specific styles
- **Shared module files** (`shared.js`, `shared.css`) imported via `<script src>` / `<link href>` for cross-page consistency within a module
- **Cloudflare Workers** deployment via `wrangler.toml`
