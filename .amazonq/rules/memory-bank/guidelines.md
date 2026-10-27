# Development Guidelines

## Code Quality Standards

### Formatting Conventions
- **2-space indentation** throughout all JS and HTML files
- **Single quotes** for strings in JavaScript
- **Semicolons** omitted in modern ES6+ code (LogoDesign/shared.js), but used in older `var`-style code (MotionGraphics/slides.js, UIUX/slides.js) — match the style of the file being edited
- **Inline comments** use `/* ── Section Name ── */` with em-dash decorators to visually separate logical blocks
- **File header comment** on every JS file: `/* filename.js — Module Name */`

### Naming Conventions
- **SCREAMING_SNAKE_CASE** for top-level data arrays: `SLIDES`, `SECTIONS`
- **camelCase** for all functions and variables: `buildRail`, `goTo`, `updateUI`, `hexToRgba`
- **kebab-case** for CSS class names: `slide-inner`, `h-rule`, `title-eyebrow`, `obj-list`
- **kebab-case with zero-padding** for slide HTML files: `slide-01.html`, `part1a-definition.html`
- **Descriptive section IDs** in SECTIONS arrays: `'foundations-definition'`, `'properties'`, `'harmonies'`

---

## Structural Conventions

### SECTIONS Array Pattern (shared.js modules)
Every module that uses a sidebar/rail navigation defines a `SECTIONS` constant at the top of `shared.js`:

```js
const SECTIONS = [
  { id: 'intro', label: 'What is Logo Design?', file: 'part1-intro.html' },
  // ColorTheory extends this with accent, bgA, bgB, angle per section:
  { id: 'harmonies', label: 'Harmonies', file: 'part3-harmonies.html',
    accent: '#8a3ae8', bgA: '#ece0fb', bgB: '#f5f1f9', angle: 103 },
];
```

- LogoDesign: `{ id, label, file }`
- ColorTheory: `{ id, label, file, accent, bgA, bgB, angle }` — richer, drives dynamic theming

### SLIDES Array Pattern (slides.js modules)
Self-contained deck modules (MotionGraphics, UIUX) declare a global `var SLIDES = []` then assign HTML strings by index:

```js
var SLIDES = [];
// ... engine code ...
SLIDES[0] = '<div class="slide-inner" ...>...</div>';
SLIDES[1] = '<div class="slide-inner">...';
init(); // always called last
```

- Slide content is pure HTML string concatenation using `+`
- `init()` is always the last statement in the file
- Engine variables (`current`, `viewport`, `dotsEl`, `prevBtn`, `nextBtn`, `ctrEl`) are declared at the top with `var` (not `const`/`let`) in these modules

### Slide Engine Pattern
Both `slides.js` variants share the same engine shape:

```js
function init() { /* build slide divs + dots, call updateUI */ }
function goTo(n) { /* bounds check, toggle .active on slides + dots, call updateUI */ }
function updateUI() { /* update counter text, disable prev/next at boundaries */ }
prevBtn.addEventListener('click', function() { goTo(current - 1); });
nextBtn.addEventListener('click', function() { goTo(current + 1); });
document.addEventListener('keydown', function(e) {
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goTo(current + 1);
  if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   goTo(current - 1);
});
// Touch swipe (MotionGraphics + UIUX only):
viewport.addEventListener('touchstart', function(e) { tx = e.touches[0].clientX; }, { passive: true });
viewport.addEventListener('touchend', function(e) {
  var dx = e.changedTouches[0].clientX - tx;
  if (Math.abs(dx) > 40) { if (dx < 0) goTo(current + 1); else goTo(current - 1); }
}, { passive: true });
```

### buildRail Pattern (shared.js modules)
`buildRail(activeId)` is called by each HTML part file on load. It:
1. Sets `document.body.dataset.activeSection = activeId`
2. Queries `#snavParts` (LogoDesign) or `#navlist` + `#tabstrip` + `.wheel-wrap` (ColorTheory)
3. Iterates `SECTIONS`, creates `<a>` elements, appends to nav containers
4. Marks the active section with class `active`

ColorTheory's `buildRail` additionally:
- Calls `hexToRgba(hex, alpha)` helper to compute rgba values
- Sets CSS custom properties on `document.documentElement`: `--accent`, `--accent-soft`, `--bg-a`, `--bg-b`
- Applies a `radial-gradient` background to `<main>` dynamically

### Mobile Navigation (LogoDesign shared.js)
`buildMobileNav()` is called alongside `buildSlides()`. It:
- Returns early if `window.innerWidth > 700`
- Creates a sticky `<nav class="mobile-nav">` with prev/next buttons and a label
- Uses `IntersectionObserver` (threshold 0.5) to sync `current` as user scrolls
- Handles `?slide=last` URL param for cross-part navigation

### Cross-Part Navigation
Parts link to each other via `data-prev` and `data-next` attributes on `<body>`:
```html
<body data-active="sketching" data-prev="part1-intro.html" data-next="part3-digitizing.html">
```
The slide engine reads these to navigate between part files at the first/last slide boundary. URL param `?slide=last` is used to land on the last slide of the previous part.

---

## Semantic Patterns

### Slide Inner Structure
Every slide (both in `slides.js` and in individual HTML files) wraps content in `.slide-inner`:
```html
<div class="slide-inner">
  <div>
    <span class="kicker">Part N · Section N.N</span>
    <h2>Title with <span style="color:var(--accent)">Accent Word</span></h2>
    <div class="h-rule"></div>
  </div>
  <!-- content: .cols2, .tbl-wrap, .callout, .card, .checklist, .img-wrap, .vid-wrap -->
</div>
```

### Recurring Layout Components
These class names appear across all modules and should be used consistently:

| Class | Purpose |
|---|---|
| `.cols2` | Two-column flex layout (`gap:20-24px; align-items:start`) |
| `.callout` | Highlighted info box (border-left accent, soft background) |
| `.card` | Surface card with border and padding |
| `.tbl-wrap` | Scrollable table wrapper |
| `.checklist` | `<ul>` with custom bullet styling |
| `.obj-list` | Numbered learning objectives list |
| `.q-list` | Numbered assessment questions list |
| `.img-wrap` | Fixed-height image container with `object-fit:cover` |
| `.vid-wrap` | Fixed-height iframe container for YouTube embeds |
| `.h-rule` | Horizontal divider line below slide headings |
| `.kicker` | Small uppercase label above slide `<h2>` |
| `.tag` | Inline label chip (small, uppercase, accent color) |
| `.title-eyebrow` | Module identifier on title slides |
| `.title-sub` | Subtitle paragraph on title slides |

### Accent Color Pattern
Every module and every lesson card uses a `--accent` CSS custom property:
- Set globally in `:root` for the module's base color
- Overridden per-section dynamically in ColorTheory via `buildRail`
- Applied inline on landing page cards: `style="--accent:#hex"`
- Used in slide content via `style="color:var(--accent)"` on key words in headings

### Theme System
Dark mode is the default. Light mode is toggled by adding `html.light` class:
```js
const isLight = html.classList.toggle('light');
btn.textContent = isLight ? '☀️' : '🌙';
localStorage.setItem('theme', isLight ? 'light' : 'dark');
```
All color values use CSS custom properties (`--bg`, `--surface`, `--text`, `--muted`, etc.) so both themes work automatically.

### YouTube Embed Pattern
Videos are embedded consistently as:
```html
<div class="vid-wrap" style="height:200px">
  <iframe src="https://www.youtube.com/embed/VIDEO_ID?mute=1" title="Description" allowfullscreen></iframe>
</div>
```
Always: `mute=1`, descriptive `title` attribute, wrapped in `.vid-wrap` with explicit height.

### Unsplash Image Pattern
Images use Unsplash with width and quality params:
```html
<div class="img-wrap" style="height:180px">
  <img src="https://images.unsplash.com/photo-ID?w=800&q=80" alt="Descriptive alt text" />
</div>
```
Always: `w=800&q=80`, wrapped in `.img-wrap` with explicit height, descriptive `alt`.

### Table Pattern
All data tables use a consistent structure:
```html
<div class="tbl-wrap">
  <table>
    <thead><tr><th>Col A</th><th>Col B</th></tr></thead>
    <tbody>
      <tr><td><strong>Term</strong></td><td>Definition</td></tr>
    </tbody>
  </table>
</div>
```
Key terms in the first column are always wrapped in `<strong>`.

### Canvas Animation (LogoDesign)
The background pen-path animation in LogoDesign uses:
- `requestAnimationFrame` loop
- Bézier curve sampling via a custom `sample(progress)` function
- `canvas.width/height` reset on `window.resize`
- Two colors: `ORANGE = '#FF5A1F'` and `TEAL = '#1B4B4A'`
- `ctx.globalAlpha` for fade-in effects on anchor points

---

## Practices Followed Throughout

1. **No framework, no build step** — every file runs directly in the browser. Never introduce npm dependencies or bundlers.
2. **Inline styles for one-off layout** — use `style="..."` attributes for unique per-element sizing (heights, gaps, grid spans). Use class names only for reusable patterns.
3. **`var` in slides.js engine code** — the MotionGraphics and UIUX slide engines use `var` (not `const`/`let`). Maintain this style when editing those files.
4. **`const` in shared.js** — LogoDesign and ColorTheory shared.js use `const`/`let`. Use modern syntax there.
5. **Mobile breakpoint at 700px** — `window.innerWidth <= 700` is the consistent mobile threshold across all modules.
6. **`passive: true` on touch events** — always add `{ passive: true }` to `touchstart`/`touchend` listeners.
7. **`aria-label` on interactive elements** — dot navigation buttons always include `aria-label="Go to slide N"`.
8. **Section comments** — separate logical blocks with `/* ── Slide N — Title ── */` comments in slides.js files.
9. **`init()` last** — the `init()` call is always the final line of any slides.js file.
10. **Google Fonts via `@import`** — always load Inter via `@import url(...)` inside a `<style>` block, not via a `<link>` tag.
