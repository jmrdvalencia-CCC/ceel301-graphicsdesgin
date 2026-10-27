# Product Overview

## Project Purpose
CEEL301 Graphics Design is an interactive, browser-based educational platform for a Graphics Design course (Academic Year 2026–27, 1st Semester). It delivers structured lesson modules and hands-on activities covering core graphic design disciplines, deployed as a static site on Cloudflare Workers.

## Value Proposition
- Self-paced, slide-driven lessons accessible from any browser with no installation required
- Dark/light theme toggle with localStorage persistence for comfortable viewing
- Modular multi-part lesson structure allowing students to navigate directly to specific topics
- Interactive activities that reinforce concepts through visual comparison and quizzes

## Key Features
- **9 Lesson Modules** — each broken into 4–7 navigable parts
- **3 Interactive Activities** — pixel zoom comparison, raster vs vector slider, design mistake quiz
- **Dark/Light Theme** — CSS custom properties + localStorage, toggled via a fixed button
- **Responsive Grid Layout** — auto-fill card grid adapts to screen width
- **Per-module accent colors** — each lesson card uses a unique `--accent` CSS variable
- **Slide-based navigation** — lessons use JS-driven slide decks (prev/next, keyboard, progress bar)
- **Shared JS/CSS utilities** — reusable `shared.js` and `shared.css` files across modules

## Lesson Modules
| Module | Parts | Accent Color |
|---|---|---|
| Design Principles & Elements | 4 | `#a8dadc` |
| Visual Hierarchy | 4 | `#a78bfa` |
| Color Theory | 7 | `#e0672c` |
| Photoshop Essentials | 5 sections | `#31A8FF` |
| Graphic Design for Digital Media | 2 views | `#FF4ECD` |
| Typography Mastery | 4 | `#c9a84c` |
| Photography & Editing | 5 | `#e8a020` |
| Motion Graphics | 6 | `#ff4d00` |
| UI/UX Web Graphics & Wireframing | 6 | `#2563eb` |

## Target Users
- **Students** enrolled in CEEL301 Graphics Design course
- **Instructor** (Jonimari Ross D. Valencia) — content author and developer

## Deployment
- Hosted on **Cloudflare Workers** via `wrangler.toml` (`name = "graphicsdesign"`, `compatibility_date = "2024-01-01"`)
- Static assets served from `./public` directory
