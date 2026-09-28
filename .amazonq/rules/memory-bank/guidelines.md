# Development Guidelines

## Code Quality Standards

### Formatting Conventions
- 2-space indentation throughout HTML, CSS, and JS
- Single quotes for JS strings; double quotes for HTML attributes
- Semicolons used consistently in JS
- Inline comments use `/* comment */` style in JS; section dividers use `/* ── label ── */`
- File-level comment at top of shared JS: `/* shared.js — Module Name */`

### Naming Conventions
- **JS variables/functions**: camelCase (`buildRail`, `goTo`, `updateNav`, `randPts`)
- **CSS classes**: kebab-case (`snav-part`, `wheel-node`, `mnav-btn`, `lesson-card`)
- **CSS custom properties**: `--kebab-case` (`--accent`, `--bg-a`, `--surface2`)
- **HTML IDs**: camelCase (`snavParts`, `snavDots`, `navlist`, `tabstrip`)
- **SECTIONS array**: UPPER_SNAKE_CASE for the constant, object keys in camelCase
- **Data attributes**: `data-kebab-case` on `<body>` (`data-active-section`, `data-next`, `data-prev`)

---

## Structural Conventions

### SECTIONS Array Pattern
Every module's `shared.js` defines a top-level `SECTIONS` constant — an array of objects describing each part of the module. This is the single source of truth for navigation.

```js
const SECTIONS = [
  { id: 'intro', label: 'What is Logo Design?', file: 'part1-intro.html' },
  // ...
];
```

ColorTheory extends this with per-section theming data:
```js
const SECTIONS = [
  { id: 'foundations-definition', label: 'Definition', file: 'part1a-definition.html',
    accent: '#e0672c', bgA: '#fbe4d5', bgB: '#f8f1e6', angle: 0 },
  // ...
];
```

### buildRail(activeId) Pattern
Every module calls `buildRail(activeId)` to dynamically render the sidebar/navigation rail. The `activeId` string matches a `SECTIONS[i].id` value. Active state is set via CSS class `active`.

```js
function buildRail(activeId) {
  SECTIONS.forEach((sec, i) => {
    const a = document.createElement('a');
    a.className = 'snav-part' + (sec.id === activeId ? ' active' : '');
    a.href = sec.file;
    // ...
    partsEl.appendChild(a);
  });
}
```

### Slide Deck Engine Pattern
`buildSlides()` in `shared.js` powers the desktop slide-by-slide navigation within a part. Key behaviors:
- Skips entirely on mobile (`window.innerWidth <= 700`)
- Reads `data-next` / `data-prev` from `document.body` for cross-part navigation
- Supports `?slide=last` and `?slide=N` URL params for deep-linking
- Keyboard navigation: ArrowRight/Down = next, ArrowLeft/Up = prev

```js
function buildSlides() {
  if (window.innerWidth <= 700) return;
  // ...
  prevBtn.addEventListener('click', () => {
    if (current === 0 && prevPart) { location.href = prevPart + '?slide=last'; return; }
    goTo(current - 1);
  });
}
```

### Mobile Nav Pattern
`buildMobileNav()` provides a sticky bottom nav for mobile. Uses `IntersectionObserver` (threshold 0.5) to sync the current slide index as the user scrolls.

```js
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const idx = slides.indexOf(e.target);
      if (idx !== -1 && idx !== current) { current = idx; updateNav(); }
    }
  });
}, { threshold: 0.5 });
slides.forEach(s => observer.observe(s));
```

### Per-Section Dynamic Theming (ColorTheory)
ColorTheory's `buildRail` reads `accent`, `bgA`, `bgB` from the active section and sets CSS custom properties on `:root` and a radial gradient on `<main>`:

```js
document.documentElement.style.setProperty('--accent', s.accent);
document.documentElement.style.setProperty('--accent-soft', hexToRgba(s.accent, 0.16));
document.querySelector('main').style.background =
  `radial-gradient(circle at 12% -10%, ${s.bgA}, transparent 55%), ${s.bgB}`;
```

---

## CSS Patterns

### CSS Custom Properties for Theming
All colors are defined as CSS variables on `:root` (dark mode default) and overridden on `html.light`:

```css
:root {
  --bg: #0a0a14; --surface: #1f2937; --border: #374151;
  --text: #f9fafb; --muted: #9ca3af; --accent: #38bdf8;
}
html.light {
  --bg: #f3f4f6; --surface: #ffffff; --border: #e5e7eb;
  --text: #111827; --muted: #6b7280;
}
```

### Per-Card Accent Override
Lesson cards use inline `style="--accent:#hex;"` to override the accent color locally without affecting global theme:

```html
<div class="lesson-card" style="--accent:#a8dadc;">
```

### Transition Defaults
All interactive elements use `transition: all 0.2s` or specific property transitions (`border-color 0.2s`, `background 0.3s`, `transform 0.2s`).

---

## JavaScript Idioms

### Zero-padded Numbers
```js
String(i + 1).padStart(2, '0')  // → "01", "02", ...
```

### Hex to RGBA Utility
```js
function hexToRgba(hex, a) {
  const v = hex.replace('#', '');
  const r = parseInt(v.substr(0,2),16), g = parseInt(v.substr(2,2),16), b = parseInt(v.substr(4,2),16);
  return `rgba(${r},${g},${b},${a})`;
}
```

### Theme Toggle (localStorage)
```js
const saved = localStorage.getItem('theme');
if (saved === 'light') { html.classList.add('light'); btn.textContent = '☀️'; }
btn.addEventListener('click', () => {
  const isLight = html.classList.toggle('light');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
});
```

### URL Param Deep-linking
```js
const slideParam = new URLSearchParams(location.search).get('slide');
if (slideParam === 'last') goTo(slides.length - 1);
else if (slideParam !== null && !isNaN(slideParam)) goTo(parseInt(slideParam));
```

---

## HTML Conventions

### Body Data Attributes for Module Config
Each part HTML file sets navigation context on `<body>`:
```html
<body data-active-section="sketching" data-prev="part1-intro.html" data-next="part3-digitizing.html">
```

### Slide Markup
Each slide is a `.slide` div with an optional `data-section` label:
```html
<div class="slide" data-section="Sketching Basics">
  <!-- slide content -->
</div>
```

### Inline Styles for One-off Overrides
One-off layout or color overrides are applied inline rather than adding new CSS classes, keeping shared stylesheets lean.

---

## Responsive Design Rules
- **Breakpoint**: `700px` — desktop slide engine vs. mobile scroll layout
- Desktop: fixed-height `.deck` with JS-driven slide transitions (`exit-left` class)
- Mobile: all `.slide` elements visible, scrollable; sticky bottom nav via `buildMobileNav()`
- `scrollIntoView({ behavior: 'smooth', block: 'start' })` used for mobile slide navigation
