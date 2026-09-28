# Product Overview

## Project Purpose
CEEL301 Graphics Design is an interactive, web-based educational platform for a Graphics Design course (Academic Year 26–27, 1st Semester). It delivers structured lesson modules and hands-on activities covering core graphic design concepts, deployed via Cloudflare Workers.

## Value Proposition
- Self-paced, browser-based learning — no installs required
- Rich interactive activities (canvas drawing, sliders, quizzes) embedded directly in lessons
- Dark/light theme support with localStorage persistence
- Modular multi-part lesson structure for progressive learning

## Key Features
- **6 Lesson Modules**: Design Principles & Elements, Visual Hierarchy, Color Theory, Photoshop Essentials, Logo Design Techniques, Graphic Design for Digital Media
- **4 Interactive Activities**: Find the Difference, Guess the Fix!, Raster vs Vector Zoom, Thumbnail Ideation Grid
- **Theme Toggle**: Dark/light mode persisted via localStorage
- **Carousel Navigation**: Scroll-snapping card carousels with dot indicators and prev/next buttons
- **Shared JS/CSS**: Reusable navigation, progress tracking, and slide logic across modules
- **Color Personality Tests**: Scenario-based and ranked cocology tests in ColorTheory module
- **Canvas Drawing Activity**: Freehand thumbnail sketching grid in LogoDesign module

## Target Users
- Students enrolled in CEEL301 Graphics Design course
- Instructor: Jonimari Ross Valencia

## Deployment
- Hosted on Cloudflare Workers (wrangler.toml, `name = "graphicsdesign"`)
- Static asset site served from `./public` directory
