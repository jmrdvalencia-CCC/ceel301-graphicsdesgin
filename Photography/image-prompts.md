# Image Generation Prompts — Photography & Editing Module
## For use in: `/Photography/slide-XX.html`

Each prompt is written for AI image generators (Midjourney, DALL·E, Firefly, Stable Diffusion).
Replace the `img-slot` placeholder on the indicated slide with the generated image.

---

## COMPOSITION SLIDES

### Prompt #01 — Rule of Thirds (Slide 08)
**Slot:** Rule of Thirds example photo
```
A professional photograph of a lone lighthouse on a rocky coastline at dusk. The lighthouse is positioned at the upper-left power point of the rule of thirds grid. The horizon sits on the lower third line. Large open sky fills the upper two-thirds. Moody, cinematic, desaturated blue-grey tones. Wide angle, 16:9 ratio.
```

### Prompt #02 — Converging Leading Lines (Slide 09)
**Slot:** Road converging to vanishing point
```
A straight empty road stretching into the distance through a flat desert landscape at golden hour. Strong converging perspective lines draw the eye to a vanishing point at the center horizon. Warm amber and orange tones. Low camera angle, wide shot, 16:9.
```

### Prompt #03 — S-Curve Leading Lines (Slide 09)
**Slot:** S-curve river through landscape
```
An aerial photograph of a winding river forming a gentle S-curve through a lush green valley. The river leads the eye from the foreground through the midground and into the distant mountains. Soft natural light, overcast sky, rich greens and blues. 16:9 ratio.
```

### Prompt #04 — Natural Framing (Slide 10)
**Slot:** Subject framed through archway
```
A photograph taken from inside a stone archway looking out at a sunlit cobblestone street in an old European town. The arch frames the scene perfectly. A person walks in the distance at the center of the frame. Warm afternoon light, shallow depth of field on the arch texture. 4:3 ratio.
```

### Prompt #05 — Low Angle Camera (Slide 11)
**Slot:** Low-angle hero shot
```
A low-angle photograph looking up at a confident young woman standing against a bright blue sky with scattered clouds. Shot from below knee height, making the subject appear powerful and heroic. Clean background, strong upward perspective. Natural daylight. 3:4 portrait ratio.
```

### Prompt #06 — Bird's Eye View (Slide 11)
**Slot:** Bird's eye flat-lay
```
A perfectly composed bird's eye view flat-lay photograph of a creative workspace. A sketchbook, pencils, a camera, coffee cup, and plant arranged symmetrically on a white desk. Shot directly from above. Clean, minimal, graphic. Soft diffused light, no shadows. 1:1 square ratio.
```

---

## LIGHTING SLIDES

### Prompt #07 — Hard Side Lighting (Slide 14)
**Slot:** Hard side-lit portrait with sharp shadows
```
A dramatic black and white portrait of a man's face lit by a single hard light source from the left side at 90 degrees. Sharp, defined shadow splits the face exactly in half. Deep contrast, strong texture visible on skin. Dark background. Studio photography style. 3:4 portrait ratio.
```

### Prompt #08 — Soft Window Light (Slide 14)
**Slot:** Soft window-lit portrait with gentle shadows
```
A soft, flattering portrait of a young woman photographed near a large window on an overcast day. Gentle, diffused light wraps around her face with no harsh shadows. Warm neutral tones, shallow depth of field, blurred background. Natural, lifestyle photography style. 3:4 portrait ratio.
```

### Prompt #09 — Front Lit vs Side Lit Comparison (Slide 16)
**Slot:** Side-by-side lighting direction comparison
```
A split-image comparison showing the same ceramic vase photographed twice side by side. Left half: flat front lighting, even illumination, no shadows, colors appear saturated but the vase looks two-dimensional. Right half: dramatic side lighting from the left, strong shadows reveal the texture and three-dimensional form of the vase. Clean white background. Product photography style. 16:9 ratio.
```

### Prompt #10 — Golden Hour Portrait (Slide 17)
**Slot:** Golden hour portrait with warm backlight
```
A lifestyle portrait of a young woman photographed outdoors during golden hour, one hour before sunset. Warm orange backlight creates a glowing rim around her hair and shoulders. She faces slightly away from the camera, looking into the distance. Bokeh background of trees. Warm, nostalgic, aspirational mood. 3:4 portrait ratio.
```

### Prompt #11 — Three-Point Lighting Studio Portrait (Slide 18)
**Slot:** Professional three-point lit studio portrait
```
A professional studio portrait of a man in his 30s lit with classic three-point lighting. Key light from the upper left creates gentle shadows. Fill light from the right softens the shadows. A rim light behind and above separates him from the dark grey background with a subtle glow. Clean, commercial photography style. 3:4 portrait ratio.
```

---

## EXPOSURE SLIDES

### Prompt #12 — Shallow vs Deep Depth of Field (Slide 20)
**Slot:** DoF comparison
```
A split-image comparison showing the same red rose photographed twice. Left half: wide aperture f/1.8, the rose is sharp and in focus while the background is beautifully blurred with soft bokeh circles. Right half: narrow aperture f/16, both the rose and the entire background garden are sharp and in focus. Natural daylight. 16:9 ratio.
```

### Prompt #13 — Frozen Splash vs Silky Waterfall (Slide 20)
**Slot:** Shutter speed motion comparison
```
A split-image comparison showing water photographed with two different shutter speeds. Left half: fast shutter speed 1/2000s, a water splash is frozen mid-air with every droplet sharp and crisp. Right half: slow shutter speed 1/4s, a waterfall appears as smooth, silky, flowing white streaks. Both images are well-exposed. 16:9 ratio.
```

---

## EDITING SLIDES

### Prompt #14 — Before/After Color Grade (Slide 24)
**Slot:** Before/after editing comparison
```
A side-by-side before and after photo editing comparison of the same outdoor portrait. Left half labeled "BEFORE": flat, slightly underexposed, cool color cast, low contrast, dull skin tones. Right half labeled "AFTER": warm golden color grade, lifted shadows, increased contrast, rich skin tones, slightly lifted blacks for a cinematic matte look. Same composition, clearly improved. 16:9 ratio.
```

---

## ACTIVITY SLIDES (Optional — for printed handouts)

### Prompt #15 — Composition Critique Photo (Slide 26, Group 1)
**Slot:** Activity handout — composition problems
```
A photograph of a person standing in a park, centered in the frame, with a cluttered background of trees, benches, and other people. The horizon is slightly tilted. The subject is cut off at the knees. No leading lines or intentional negative space. Overcast flat lighting. Realistic, candid photography style. 4:3 ratio.
```

### Prompt #16 — Lighting Analysis Photo (Slide 26, Group 2)
**Slot:** Activity handout — lighting analysis
```
A product photograph of a glass perfume bottle on a reflective surface. The lighting is flat front lighting — even, shadow-free, but the bottle looks two-dimensional and lacks depth. The background is pure white. Commercial product photography style. 1:1 square ratio.
```

### Prompt #17 — Editing Plan Photo (Slide 26, Group 3)
**Slot:** Activity handout — technically imperfect photo
```
A photograph of a coffee cup on a wooden table near a window. The image is slightly underexposed with a warm orange color cast from tungsten indoor lighting. The contrast is low and flat. The image is slightly soft/unsharp. Good composition — rule of thirds, nice negative space — but technically imperfect. Realistic, candid style. 4:3 ratio.
```

---

## USAGE NOTES

- All image slots in the slides are marked with `class="img-slot"` and include the prompt number as a reference comment.
- Replace the placeholder `div` with an `<img>` tag pointing to the generated image file saved in a `/Photography/assets/` folder.
- Recommended image dimensions: **1200×800px** (16:9), **900×1200px** (3:4 portrait), **1000×1000px** (1:1 square).
- Save as **JPEG at 85% quality** for web use.

### Example replacement:
```html
<!-- Before (placeholder) -->
<div class="img-slot">IMAGE PLACEHOLDER<br>Prompt #01</div>

<!-- After (with generated image) -->
<img src="assets/img-01-rule-of-thirds.jpg" alt="Rule of thirds example — lighthouse at power point" style="width:100%;border-radius:12px;object-fit:cover;max-height:200px">
```
