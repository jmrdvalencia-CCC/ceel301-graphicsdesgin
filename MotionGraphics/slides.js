/* slides.js — Motion Graphics Deck */

var SLIDES = [];

var current = 0;
var viewport = document.getElementById('viewport');
var dotsEl   = document.getElementById('dots');
var prevBtn  = document.getElementById('prevBtn');
var nextBtn  = document.getElementById('nextBtn');
var ctrEl    = document.getElementById('ctr');

function init() {
  var total = SLIDES.length;
  for (var i = 0; i < total; i++) {
    var div = document.createElement('div');
    div.className = 'slide' + (i === 0 ? ' active' : '');
    div.innerHTML = SLIDES[i];
    viewport.appendChild(div);
  }
  for (var j = 0; j < total; j++) {
    (function(idx) {
      var d = document.createElement('button');
      d.className = 'dot' + (idx === 0 ? ' active' : '');
      d.addEventListener('click', function() { goTo(idx); });
      dotsEl.appendChild(d);
    })(j);
  }
  updateUI();
}

function goTo(n) {
  var slides = viewport.querySelectorAll('.slide');
  var dots   = dotsEl.querySelectorAll('.dot');
  if (n < 0 || n >= slides.length || n === current) return;
  slides[current].classList.remove('active');
  dots[current].classList.remove('active');
  current = n;
  slides[current].classList.add('active');
  dots[current].classList.add('active');
  updateUI();
}

function updateUI() {
  var total = viewport.querySelectorAll('.slide').length;
  ctrEl.textContent = (current + 1) + ' / ' + total;
  prevBtn.disabled = current === 0;
  nextBtn.disabled = current === total - 1;
}

prevBtn.addEventListener('click', function() { goTo(current - 1); });
nextBtn.addEventListener('click', function() { goTo(current + 1); });
document.addEventListener('keydown', function(e) {
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goTo(current + 1);
  if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   goTo(current - 1);
});
var tx = 0;
viewport.addEventListener('touchstart', function(e) { tx = e.touches[0].clientX; }, { passive: true });
viewport.addEventListener('touchend', function(e) {
  var dx = e.changedTouches[0].clientX - tx;
  if (Math.abs(dx) > 40) { if (dx < 0) goTo(current + 1); else goTo(current - 1); }
}, { passive: true });


/* ── Slide 1 — Title ── */
SLIDES[0] = '<div class="slide-inner" style="gap:32px">'
  + '<div style="display:flex;flex-direction:column;gap:12px">'
  + '<span class="title-eyebrow">Graphics Design &middot; Module 06</span>'
  + '<h1>Motion <em>Graphics</em></h1>'
  + '<div class="h-rule"></div>'
  + '<p class="title-sub">Logo animation, basic transitions, and the principles that make movement communicate &mdash; not just decorate.</p>'
  + '</div>'
  + '<div class="cols2" style="gap:20px;align-items:start">'
  + '<div style="display:flex;flex-direction:column;gap:12px">'
  + '<span class="tag">Learning Objectives</span>'
  + '<ol class="obj-list">'
  + '<li><span class="obj-num">1</span>Define motion graphics and explain how movement extends static graphic design into time.</li>'
  + '<li><span class="obj-num">2</span>Identify the four core animation properties: position, scale, rotation, opacity.</li>'
  + '<li><span class="obj-num">3</span>Apply the 12 principles of animation to logo animation and transition design.</li>'
  + '<li><span class="obj-num">4</span>Construct a storyboard and timing diagram for a logo animation sequence.</li>'
  + '<li><span class="obj-num">5</span>Design and describe a logo animation and page transition using correct terminology.</li>'
  + '</ol>'
  + '</div>'
  + '<div style="display:flex;flex-direction:column;gap:12px">'
  + '<div class="vid-wrap" style="height:200px"><iframe src="https://www.youtube.com/embed/aqz-KE-bpKQ?start=0&mute=1&autoplay=0" title="Motion graphics showreel" allowfullscreen></iframe></div>'
  + '<p style="font-size:11px;color:var(--muted);text-align:center">Motion graphics showreel &mdash; graphic design in time</p>'
  + '</div>'
  + '</div>'
  + '<div class="callout"><strong>Reference:</strong> Mrantinkovic et al. (2020). <em>3G Handy Guide: Graphic Designing</em>. 3G E-Learning LLC.</div>'
  + '</div>';

/* ── Slide 2 — 1.1 Defining Motion Graphics ── */
SLIDES[1] = '<div class="slide-inner">'
  + '<div><span class="kicker">Part 1 &middot; 1.1</span>'
  + '<h2 style="margin-top:8px">What is <span style="color:var(--accent)">Motion Graphics?</span></h2>'
  + '<div class="h-rule" style="margin-top:10px"></div></div>'
  + '<div class="cols2" style="gap:24px;align-items:start">'
  + '<div style="display:flex;flex-direction:column;gap:16px">'
  + '<p><strong>Motion graphics</strong> is the practice of applying animation and cinematic techniques to graphic design elements &mdash; typography, logos, icons, shapes, and illustrations &mdash; to communicate ideas through movement over time.</p>'
  + '<div class="callout">Motion graphics is <strong>not</strong> video production. It is <strong>not</strong> traditional animation. It is <strong>graphic design in motion</strong> &mdash; the same principles of hierarchy, balance, contrast, and typography, applied across a timeline rather than a canvas.</div>'
  + '<p style="font-size:12px">Mrantinkovic et al. (2020) describe graphic design as the deliberate arrangement of visual elements to convey a message. Motion graphics adds a fifth dimension to that toolkit: <strong>time</strong>.</p>'
  + '</div>'
  + '<div style="display:flex;flex-direction:column;gap:12px">'
  + '<div class="vid-wrap" style="height:190px"><iframe src="https://www.youtube.com/embed/aqz-KE-bpKQ?mute=1" title="Motion graphics definition" allowfullscreen></iframe></div>'
  + '<div class="tbl-wrap"><table><thead><tr><th>Static Design</th><th>Motion Graphics</th></tr></thead><tbody>'
  + '<tr><td>Single composition</td><td>Sequence over time</td></tr>'
  + '<tr><td>Hierarchy via size</td><td>Hierarchy via size + timing</td></tr>'
  + '<tr><td>Fixed canvas</td><td>Animated timeline</td></tr>'
  + '</tbody></table></div>'
  + '</div></div></div>';

/* ── Slide 3 — 1.2 Where Motion Graphics Appears ── */
SLIDES[2] = '<div class="slide-inner">'
  + '<div><span class="kicker">Part 1 &middot; 1.2</span>'
  + '<h2 style="margin-top:8px">Where Motion Graphics <span style="color:var(--accent)">Appears</span></h2>'
  + '<div class="h-rule" style="margin-top:10px"></div>'
  + '<p style="margin-top:8px">Motion graphics is present across every digital touchpoint a brand occupies.</p></div>'
  + '<div class="cols2" style="gap:24px;align-items:start">'
  + '<div class="tbl-wrap"><table><thead><tr><th>Context</th><th>Example</th></tr></thead><tbody>'
  + '<tr><td><strong>Logo animation</strong></td><td>Brand logo animates on website load or app launch</td></tr>'
  + '<tr><td><strong>UI transitions</strong></td><td>Screens slide, fade, or morph during navigation</td></tr>'
  + '<tr><td><strong>Social media</strong></td><td>Animated posts, stories, and reels</td></tr>'
  + '<tr><td><strong>Explainer videos</strong></td><td>Animated diagrams and kinetic typography</td></tr>'
  + '<tr><td><strong>Title sequences</strong></td><td>Opening animations for films and YouTube channels</td></tr>'
  + '<tr><td><strong>Digital advertising</strong></td><td>Animated banner ads and display campaigns</td></tr>'
  + '<tr><td><strong>Broadcast graphics</strong></td><td>Lower thirds, transitions, overlays in video</td></tr>'
  + '</tbody></table></div>'
  + '<div style="display:flex;flex-direction:column;gap:12px">'
  + '<div class="img-wrap" style="height:180px"><img src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80" alt="Motion graphics on a screen in a studio" /></div>'
  + '<div class="callout">This module focuses on the two most foundational applications: <strong>logo animation</strong> and <strong>basic transitions</strong>.</div>'
  + '</div></div></div>';

/* ── Slide 4 — 1.3 Core Properties ── */
SLIDES[3] = '<div class="slide-inner">'
  + '<div><span class="kicker">Part 1 &middot; 1.3</span>'
  + '<h2 style="margin-top:8px">The Four Core <span style="color:var(--accent)">Properties</span></h2>'
  + '<div class="h-rule" style="margin-top:10px"></div>'
  + '<p style="margin-top:8px">Every animation &mdash; regardless of complexity &mdash; is built from four animatable properties. All motion design is a combination of changes to these values over time.</p></div>'
  + '<div class="prop-grid">'
  + '<div class="prop-card"><div class="prop-icon">&#8597;</div><h3>Position</h3><p>X and Y coordinates on screen. Controls entrances, exits, and movement paths.</p></div>'
  + '<div class="prop-card"><div class="prop-icon">&#8596;</div><h3>Scale</h3><p>The size of the element. Controls emphasis, reveals, and zoom effects.</p></div>'
  + '<div class="prop-card"><div class="prop-icon">&#8635;</div><h3>Rotation</h3><p>The angle of the element. Controls spin effects and dynamic entrances.</p></div>'
  + '<div class="prop-card"><div class="prop-icon">&#9681;</div><h3>Opacity</h3><p>Transparency from 0% (invisible) to 100% (fully visible). Controls fades and reveals.</p></div>'
  + '</div>'
  + '<div class="cols2" style="gap:20px;align-items:start">'
  + '<div class="img-wrap" style="height:160px"><img src="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80" alt="Animation software timeline showing keyframes" /></div>'
  + '<div class="callout">These four properties are the <strong>vocabulary of motion</strong>. Every animation technique &mdash; no matter how sophisticated &mdash; is a combination of changes to these four values over time.</div>'
  + '</div></div>';

/* ── Slide 5 — 1.4 Keyframes and Timing ── */
SLIDES[4] = '<div class="slide-inner">'
  + '<div><span class="kicker">Part 1 &middot; 1.4</span>'
  + '<h2 style="margin-top:8px">Keyframes &amp; <span style="color:var(--accent)">Timing</span></h2>'
  + '<div class="h-rule" style="margin-top:10px"></div>'
  + '<p style="margin-top:8px">A <strong>keyframe</strong> is a defined state of an element at a specific point in time. The software calculates all intermediate states between two keyframes &mdash; this is called <strong>interpolation</strong> or <strong>tweening</strong>.</p></div>'
  + '<div class="cols2" style="gap:24px;align-items:start">'
  + '<div style="display:flex;flex-direction:column;gap:14px">'
  + '<div class="timeline">'
  + 'Time:&nbsp;&nbsp;&nbsp;&nbsp; 0s &mdash;&mdash;&mdash;&mdash;&mdash;&mdash; 0.5s &mdash;&mdash;&mdash;&mdash;&mdash;&mdash; 1.0s<br>'
  + 'Opacity: 0% &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 100%<br>'
  + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &#9650; Keyframe 1 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &#9650; Keyframe 2<br>'
  + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; (invisible) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; (fully visible)'
  + '</div>'
  + '<div class="tbl-wrap"><table><thead><tr><th>Term</th><th>Definition</th></tr></thead><tbody>'
  + '<tr><td><strong>Duration</strong></td><td>How long the animation takes to complete</td></tr>'
  + '<tr><td><strong>Delay</strong></td><td>How long before the animation starts</td></tr>'
  + '<tr><td><strong>Frame rate</strong></td><td>24fps cinematic &middot; 30fps broadcast &middot; 60fps UI/web</td></tr>'
  + '<tr><td><strong>Easing</strong></td><td>The acceleration curve of the animation</td></tr>'
  + '</tbody></table></div>'
  + '</div>'
  + '<div class="img-wrap" style="height:240px"><img src="https://images.unsplash.com/photo-1536240478700-b869ad10e2b5?w=800&q=80" alt="Video editing timeline with keyframes" /></div>'
  + '</div></div>';

/* ── Slide 6 — 2.1 The 12 Principles ── */
SLIDES[5] = '<div class="slide-inner">'
  + '<div><span class="kicker">Part 2 &middot; 2.1</span>'
  + '<h2 style="margin-top:8px">The 12 Principles <span style="color:var(--accent)">of Animation</span></h2>'
  + '<div class="h-rule" style="margin-top:10px"></div>'
  + '<p style="margin-top:8px">Originally developed by Disney animators Ollie Johnston and Frank Thomas (1981). Mrantinkovic et al. (2020) identify these as foundational to understanding how visual elements communicate through movement.</p></div>'
  + '<div class="cols2" style="gap:24px;align-items:start">'
  + '<div style="display:flex;flex-direction:column;gap:10px">'
  + '<span class="tag">All 12 Principles</span>'
  + '<ul class="checklist">'
  + '<li><strong>Squash &amp; Stretch</strong> &mdash; conveys weight and elasticity</li>'
  + '<li><strong>Anticipation</strong> &mdash; prepares the viewer for action</li>'
  + '<li><strong>Staging</strong> &mdash; directs attention to what matters</li>'
  + '<li><strong>Straight Ahead / Pose to Pose</strong> &mdash; animation approaches</li>'
  + '<li><strong>Follow Through &amp; Overlapping Action</strong> &mdash; organic movement</li>'
  + '<li><strong>Slow In / Slow Out (Easing)</strong> &mdash; natural acceleration</li>'
  + '<li><strong>Arc</strong> &mdash; natural movement paths</li>'
  + '<li><strong>Secondary Action</strong> &mdash; supporting movements</li>'
  + '<li><strong>Timing</strong> &mdash; speed communicates weight</li>'
  + '<li><strong>Exaggeration</strong> &mdash; amplifies the idea</li>'
  + '<li><strong>Solid Drawing</strong> &mdash; three-dimensional form</li>'
  + '<li><strong>Appeal</strong> &mdash; engaging, readable design</li>'
  + '</ul>'
  + '</div>'
  + '<div style="display:flex;flex-direction:column;gap:12px">'
  + '<div class="vid-wrap" style="height:200px"><iframe src="https://www.youtube.com/embed/uDqjIdI4bF4?mute=1" title="12 principles of animation" allowfullscreen></iframe></div>'
  + '<div class="callout">This module focuses on the <strong>six principles</strong> most directly applicable to motion graphics and logo animation.</div>'
  + '</div></div></div>';

/* ── Slide 7 — 2.2 Easing ── */
SLIDES[6] = '<div class="slide-inner">'
  + '<div><span class="kicker">Part 2 &middot; 2.2</span>'
  + '<h2 style="margin-top:8px">Easing &mdash; <span style="color:var(--accent)">Slow In / Slow Out</span></h2>'
  + '<div class="h-rule" style="margin-top:10px"></div>'
  + '<p style="margin-top:8px"><strong>Easing</strong> is the most important principle in motion design. Objects in the physical world do not start and stop instantaneously &mdash; they accelerate from rest and decelerate before stopping.</p></div>'
  + '<div class="cols2" style="gap:24px;align-items:start">'
  + '<div style="display:flex;flex-direction:column;gap:14px">'
  + '<div class="tbl-wrap"><table><thead><tr><th>Type</th><th>Behavior</th><th>Use</th></tr></thead><tbody>'
  + '<tr><td><strong>Linear</strong></td><td>Constant speed</td><td>Mechanical &mdash; rarely used</td></tr>'
  + '<tr><td><strong>Ease In</strong></td><td>Starts slow, ends fast</td><td>Elements exiting screen</td></tr>'
  + '<tr><td><strong>Ease Out</strong></td><td>Starts fast, ends slow</td><td>Elements entering screen</td></tr>'
  + '<tr><td><strong>Ease In-Out</strong></td><td>Slow &rarr; fast &rarr; slow</td><td>Moving between positions</td></tr>'
  + '<tr><td><strong>Custom curve</strong></td><td>Designer-defined</td><td>Signature brand motion</td></tr>'
  + '</tbody></table></div>'
  + '<div class="callout"><strong>Rule:</strong> Never use linear easing for brand animation. Linear motion reads as robotic and cheap. <strong>Ease Out</strong> is the default for any element entering the screen.</div>'
  + '</div>'
  + '<div style="display:flex;flex-direction:column;gap:12px">'
  + '<div class="vid-wrap" style="height:200px"><iframe src="https://www.youtube.com/embed/fy2XDBbDrAs?mute=1" title="Easing in animation explained" allowfullscreen></iframe></div>'
  + '<p style="font-size:11px;color:var(--muted);text-align:center">Easing curves &mdash; how acceleration shapes the feel of motion</p>'
  + '</div></div></div>';

/* ── Slide 8 — 2.3 Anticipation ── */
SLIDES[7] = '<div class="slide-inner">'
  + '<div><span class="kicker">Part 2 &middot; 2.3</span>'
  + '<h2 style="margin-top:8px">Principle: <span style="color:var(--accent)">Anticipation</span></h2>'
  + '<div class="h-rule" style="margin-top:10px"></div>'
  + '<p style="margin-top:8px"><strong>Anticipation</strong> is a small preparatory movement that signals to the viewer that a larger action is about to occur. It primes the eye and makes the subsequent movement feel intentional rather than sudden.</p></div>'
  + '<div class="cols2" style="gap:24px;align-items:start">'
  + '<div style="display:flex;flex-direction:column;gap:14px">'
  + '<span class="tag">Examples in Motion Graphics</span>'
  + '<ul class="checklist">'
  + '<li>A logo element <strong>pulls back slightly</strong> before launching forward into its final position</li>'
  + '<li>A letter <strong>compresses slightly</strong> before bouncing into place</li>'
  + '<li>An icon <strong>shrinks briefly</strong> before expanding to full size</li>'
  + '</ul>'
  + '<div class="callout">Anticipation is the motion equivalent of a visual pause &mdash; it creates <strong>expectation</strong>, and expectation makes the payoff more satisfying.</div>'
  + '<div class="card">'
  + '<span class="tag">Without vs. With Anticipation</span>'
  + '<p style="margin-top:6px"><strong>Without:</strong> Element appears suddenly &mdash; feels abrupt, mechanical, unintentional.</p>'
  + '<p><strong>With:</strong> Element pulls back, then launches &mdash; feels alive, deliberate, energetic.</p>'
  + '</div>'
  + '</div>'
  + '<div class="vid-wrap" style="height:260px"><iframe src="https://www.youtube.com/embed/haa7n3UGyDc?mute=1" title="Anticipation animation principle" allowfullscreen></iframe></div>'
  + '</div></div>';

/* ── Slide 9 — 2.4 Squash and Stretch ── */
SLIDES[8] = '<div class="slide-inner">'
  + '<div><span class="kicker">Part 2 &middot; 2.4</span>'
  + '<h2 style="margin-top:8px">Principle: <span style="color:var(--accent)">Squash &amp; Stretch</span></h2>'
  + '<div class="h-rule" style="margin-top:10px"></div>'
  + '<p style="margin-top:8px"><strong>Squash and stretch</strong> describes the deformation of an object to convey weight, elasticity, and energy. A rigid object reads as heavy and mechanical. A deforming object reads as light, energetic, and alive.</p></div>'
  + '<div class="cols2" style="gap:24px;align-items:start">'
  + '<div style="display:flex;flex-direction:column;gap:14px">'
  + '<div class="tbl-wrap"><table><thead><tr><th>Brand Personality</th><th>Use Squash &amp; Stretch?</th></tr></thead><tbody>'
  + '<tr><td>Playful, youthful, approachable</td><td><strong style="color:#4ade80">Yes &mdash; use freely</strong></td></tr>'
  + '<tr><td>Energetic, athletic, dynamic</td><td><strong style="color:#4ade80">Yes &mdash; use subtly</strong></td></tr>'
  + '<tr><td>Professional, trustworthy</td><td><strong style="color:var(--accent)">Minimal &mdash; very subtle only</strong></td></tr>'
  + '<tr><td>Luxury, premium, authority</td><td><strong style="color:#f87171">No &mdash; avoid entirely</strong></td></tr>'
  + '</tbody></table></div>'
  + '<div class="callout">In logo animation, squash and stretch is applied <strong>subtly</strong> &mdash; a letterform that compresses slightly as it lands. Overuse makes a brand feel cartoonish; underuse makes it feel stiff.</div>'
  + '</div>'
  + '<div class="vid-wrap" style="height:260px"><iframe src="https://www.youtube.com/embed/haa7n3UGyDc?start=30&mute=1" title="Squash and stretch animation principle" allowfullscreen></iframe></div>'
  + '</div></div>';

/* ── Slide 10 — 2.5 Staging ── */
SLIDES[9] = '<div class="slide-inner">'
  + '<div><span class="kicker">Part 2 &middot; 2.5</span>'
  + '<h2 style="margin-top:8px">Principle: <span style="color:var(--accent)">Staging</span></h2>'
  + '<div class="h-rule" style="margin-top:10px"></div>'
  + '<p style="margin-top:8px"><strong>Staging</strong> is the principle that the viewer\'s attention should be directed to the most important element at any given moment. In motion graphics, staging is achieved through <strong>timing</strong> &mdash; only one element moves at a time.</p></div>'
  + '<div class="cols2" style="gap:24px;align-items:start">'
  + '<div style="display:flex;flex-direction:column;gap:14px">'
  + '<ul class="checklist">'
  + '<li>Never animate two equally important elements <strong>simultaneously</strong> &mdash; the viewer cannot watch both</li>'
  + '<li>The element that <strong>moves first</strong> receives the most attention</li>'
  + '<li>Use <strong>stillness</strong> as a staging tool &mdash; a static element surrounded by moving elements draws the eye through contrast</li>'
  + '</ul>'
  + '<div class="card">'
  + '<span class="tag">Staging in Practice</span>'
  + '<p style="margin-top:6px">In a logo animation with an icon and a wordmark: animate the <strong>icon first</strong> (brand symbol), then the <strong>wordmark</strong> (brand name), then the <strong>tagline</strong> last. Each element gets its moment of attention.</p>'
  + '</div>'
  + '<div class="callout">Staging in motion is the same as <strong>visual hierarchy</strong> in static design &mdash; one primary element, one secondary, one tertiary. The difference is that in motion, hierarchy is expressed through the <strong>order of movement</strong>.</div>'
  + '</div>'
  + '<div class="img-wrap" style="height:260px"><img src="https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80" alt="Motion graphics staging example on screen" /></div>'
  + '</div></div>';

/* ── Slide 11 — 2.6 Follow Through & Overlapping Action ── */
SLIDES[10] = '<div class="slide-inner">'
  + '<div><span class="kicker">Part 2 &middot; 2.6</span>'
  + '<h2 style="margin-top:8px">Follow Through &amp; <span style="color:var(--accent)">Overlapping Action</span></h2>'
  + '<div class="h-rule" style="margin-top:10px"></div></div>'
  + '<div class="cols2" style="gap:24px;align-items:start">'
  + '<div style="display:flex;flex-direction:column;gap:14px">'
  + '<div class="card" style="border-left:3px solid var(--accent)">'
  + '<span class="tag">Follow Through</span>'
  + '<p style="margin-top:6px">Movement continues <strong>after the primary action stops</strong>. A flag continues to wave after the wind stops. In logo animation: a letterform overshoots its final position slightly before settling.</p>'
  + '</div>'
  + '<div class="card" style="border-left:3px solid #a78bfa">'
  + '<span class="tag" style="background:rgba(167,139,250,.1);color:#a78bfa">Overlapping Action</span>'
  + '<p style="margin-top:6px">Different parts of an object <strong>do not all move at the same time</strong> &mdash; they move in sequence, each part slightly delayed from the previous.</p>'
  + '</div>'
  + '<div class="callout">In a multi-component logo, letters or shapes animate in <strong>sequence with slight delays</strong> &mdash; creating organic, natural movement rather than mechanical synchronization.</div>'
  + '</div>'
  + '<div style="display:flex;flex-direction:column;gap:12px">'
  + '<div class="vid-wrap" style="height:200px"><iframe src="https://www.youtube.com/embed/4OxphYV8W3E?mute=1" title="Follow through overlapping action" allowfullscreen></iframe></div>'
  + '<div class="timeline">'
  + 'Letter A: [&mdash;&mdash;&mdash;&mdash;]<br>'
  + 'Letter B: &nbsp;&nbsp;[&mdash;&mdash;&mdash;&mdash;]<br>'
  + 'Letter C: &nbsp;&nbsp;&nbsp;&nbsp;[&mdash;&mdash;&mdash;&mdash;]<br>'
  + 'Letter D: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&mdash;&mdash;&mdash;&mdash;]<br>'
  + '<span style="color:var(--accent)">Each letter delayed 50ms &mdash; overlapping action</span>'
  + '</div>'
  + '</div></div></div>';

/* ── Slide 12 — 2.7 Timing and Weight ── */
SLIDES[11] = '<div class="slide-inner">'
  + '<div><span class="kicker">Part 2 &middot; 2.7</span>'
  + '<h2 style="margin-top:8px">Principle: <span style="color:var(--accent)">Timing &amp; Weight</span></h2>'
  + '<div class="h-rule" style="margin-top:10px"></div>'
  + '<p style="margin-top:8px">The timing of an animation communicates the <strong>weight and character</strong> of the object being animated. More frames = slower movement = heavier feel.</p></div>'
  + '<div class="cols2" style="gap:24px;align-items:start">'
  + '<div style="display:flex;flex-direction:column;gap:14px">'
  + '<div class="tbl-wrap"><table><thead><tr><th>Timing</th><th>Communicates</th></tr></thead><tbody>'
  + '<tr><td><strong>Fast (fewer frames)</strong></td><td>Light, energetic, urgent</td></tr>'
  + '<tr><td><strong>Slow (more frames)</strong></td><td>Heavy, deliberate, premium</td></tr>'
  + '<tr><td><strong>Sudden start, slow end</strong></td><td>Confident, assertive</td></tr>'
  + '<tr><td><strong>Slow start, sudden end</strong></td><td>Building tension, impact</td></tr>'
  + '</tbody></table></div>'
  + '<div class="tbl-wrap"><table><thead><tr><th>Brand</th><th>Timing Approach</th></tr></thead><tbody>'
  + '<tr><td>Luxury / Premium</td><td>Slow, deliberate &mdash; 1.5&ndash;3s</td></tr>'
  + '<tr><td>Tech / Startup</td><td>Crisp, fast &mdash; 0.5&ndash;1s</td></tr>'
  + '<tr><td>Playful / Youth</td><td>Bouncy, variable &mdash; 0.8&ndash;1.5s</td></tr>'
  + '<tr><td>Professional</td><td>Clean, moderate &mdash; 0.8&ndash;1.2s</td></tr>'
  + '</tbody></table></div>'
  + '</div>'
  + '<div style="display:flex;flex-direction:column;gap:12px">'
  + '<div class="img-wrap" style="height:180px"><img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80" alt="Brand logo on a luxury product" /></div>'
  + '<div class="callout">A luxury brand\'s logo animation should move <strong>slowly and deliberately</strong>. Fast animation communicates energy but undermines the perception of quality and exclusivity.</div>'
  + '</div></div></div>';

/* ── Slide 13 — 3.1 What is Logo Animation ── */
SLIDES[12] = '<div class="slide-inner">'
  + '<div><span class="kicker">Part 3 &middot; 3.1</span>'
  + '<h2 style="margin-top:8px">What is <span style="color:var(--accent)">Logo Animation?</span></h2>'
  + '<div class="h-rule" style="margin-top:10px"></div>'
  + '<p style="margin-top:8px">A <strong>logo animation</strong> (also called a logo reveal or logo sting) is a short animated sequence &mdash; typically 1 to 5 seconds &mdash; in which a brand\'s logo is introduced to the viewer.</p></div>'
  + '<div class="cols2" style="gap:24px;align-items:start">'
  + '<div style="display:flex;flex-direction:column;gap:14px">'
  + '<span class="tag">Where Logo Animations Appear</span>'
  + '<ul class="checklist">'
  + '<li>At the <strong>start of video content</strong> &mdash; YouTube, social media, presentations</li>'
  + '<li>When a <strong>website or app loads</strong> &mdash; splash screens, loading states</li>'
  + '<li>At the <strong>end of video content</strong> &mdash; outro sequences</li>'
  + '<li>In <strong>digital advertising</strong> &mdash; animated banner ads</li>'
  + '</ul>'
  + '<div class="callout">Mrantinkovic et al. (2020) identify the logo as the <strong>primary visual anchor</strong> of a brand identity. A logo animation does not just show the logo &mdash; it <strong>performs</strong> the brand\'s personality.</div>'
  + '</div>'
  + '<div style="display:flex;flex-direction:column;gap:12px">'
  + '<div class="vid-wrap" style="height:200px"><iframe src="https://www.youtube.com/embed/aqz-KE-bpKQ?mute=1" title="Logo animation examples" allowfullscreen></iframe></div>'
  + '<p style="font-size:11px;color:var(--muted);text-align:center">Logo animation examples from professional motion designers</p>'
  + '</div></div></div>';

/* ── Slide 14 — 3.2 Logo Animation Styles ── */
SLIDES[13] = '<div class="slide-inner">'
  + '<div><span class="kicker">Part 3 &middot; 3.2</span>'
  + '<h2 style="margin-top:8px">Logo Animation <span style="color:var(--accent)">Styles</span></h2>'
  + '<div class="h-rule" style="margin-top:10px"></div>'
  + '<p style="margin-top:8px">The animation style must be consistent with the brand\'s visual identity and personality. The motion is an extension of the brand &mdash; not a separate creative decision.</p></div>'
  + '<div class="cols2" style="gap:20px;align-items:start">'
  + '<div class="tbl-wrap"><table><thead><tr><th>Style</th><th>Brand Personality</th></tr></thead><tbody>'
  + '<tr><td><strong>Fade In</strong></td><td>Elegant, minimal, understated</td></tr>'
  + '<tr><td><strong>Draw / Reveal</strong></td><td>Crafted, artisanal, personal</td></tr>'
  + '<tr><td><strong>Build</strong></td><td>Structured, engineered, precise</td></tr>'
  + '<tr><td><strong>Morph</strong></td><td>Creative, fluid, innovative</td></tr>'
  + '<tr><td><strong>Kinetic type</strong></td><td>Dynamic, editorial, modern</td></tr>'
  + '<tr><td><strong>Bounce / Spring</strong></td><td>Playful, approachable, youthful</td></tr>'
  + '<tr><td><strong>Glitch</strong></td><td>Tech-forward, edgy, disruptive</td></tr>'
  + '<tr><td><strong>Particle</strong></td><td>Premium, cinematic, high-production</td></tr>'
  + '</tbody></table></div>'
  + '<div style="display:flex;flex-direction:column;gap:12px">'
  + '<div class="vid-wrap" style="height:200px"><iframe src="https://www.youtube.com/embed/vB9xOnCiB_E?mute=1" title="Logo animation styles examples" allowfullscreen></iframe></div>'
  + '<div class="callout"><strong>Rule:</strong> A law firm\'s logo should not bounce. A children\'s toy brand\'s logo should not glitch. Match the motion to the brand.</div>'
  + '</div></div></div>';

/* ── Slide 15 — 3.3 Anatomy of a Logo Animation ── */
SLIDES[14] = '<div class="slide-inner">'
  + '<div><span class="kicker">Part 3 &middot; 3.3</span>'
  + '<h2 style="margin-top:8px">Anatomy of a <span style="color:var(--accent)">Logo Animation</span></h2>'
  + '<div class="h-rule" style="margin-top:10px"></div>'
  + '<p style="margin-top:8px">A well-structured logo animation follows a <strong>three-act structure</strong>.</p></div>'
  + '<div style="display:flex;flex-direction:column;gap:16px">'
  + '<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px">'
  + '<div class="card" style="border-top:3px solid var(--muted)">'
  + '<span class="tag">Act 1 &middot; 0s &ndash; 0.5s</span>'
  + '<h3 style="margin-top:8px">Intro</h3>'
  + '<p>Supporting elements enter or context is established. Sets the stage for the reveal.</p>'
  + '</div>'
  + '<div class="card" style="border-top:3px solid var(--accent)">'
  + '<span class="tag" style="background:var(--accent-lt);color:var(--accent)">Act 2 &middot; 0.5s &ndash; 1.5s</span>'
  + '<h3 style="margin-top:8px">Reveal</h3>'
  + '<p>Logo animates into its final position using the chosen style. The primary moment.</p>'
  + '</div>'
  + '<div class="card" style="border-top:3px solid #4ade80">'
  + '<span class="tag" style="background:rgba(74,222,128,.1);color:#4ade80">Act 3 &middot; 1.5s &ndash; 3.0s</span>'
  + '<h3 style="margin-top:8px">Hold</h3>'
  + '<p>Logo holds in final position. Viewer reads and registers the brand.</p>'
  + '</div>'
  + '</div>'
  + '<div class="tbl-wrap"><table><thead><tr><th>Element</th><th>Recommended Duration</th></tr></thead><tbody>'
  + '<tr><td><strong>Total animation</strong></td><td>1.5 &ndash; 4 seconds</td></tr>'
  + '<tr><td><strong>Logo reveal</strong></td><td>0.5 &ndash; 1.5 seconds</td></tr>'
  + '<tr><td><strong>Hold (static)</strong></td><td>0.5 &ndash; 1.5 seconds</td></tr>'
  + '<tr><td><strong>Tagline reveal</strong></td><td>0.3 &ndash; 0.8 seconds after logo</td></tr>'
  + '</tbody></table></div>'
  + '<div class="callout"><strong>Never skip the hold.</strong> If the logo disappears immediately after the reveal, the viewer cannot register the brand. The hold is not dead time &mdash; it is the moment of recognition.</div>'
  + '</div></div>';

/* ── Slide 16 — 3.4 Storyboarding ── */
SLIDES[15] = '<div class="slide-inner">'
  + '<div><span class="kicker">Part 3 &middot; 3.4</span>'
  + '<h2 style="margin-top:8px">Storyboarding a <span style="color:var(--accent)">Logo Animation</span></h2>'
  + '<div class="h-rule" style="margin-top:10px"></div>'
  + '<p style="margin-top:8px">Before animating, a <strong>storyboard</strong> maps the sequence of states the logo passes through. Each frame represents a keyframe in the animation.</p></div>'
  + '<div style="display:flex;flex-direction:column;gap:16px">'
  + '<div class="sb-grid">'
  + '<div class="sb-frame"><div class="sb-screen"><span style="font-size:11px;color:var(--muted)">[ empty ]</span></div><div class="sb-info"><strong>Frame 1 &middot; 0s</strong>Empty screen. Opacity: 0%. Scale: 0.8.</div></div>'
  + '<div class="sb-frame"><div class="sb-screen"><div style="width:40px;height:40px;border:2px solid var(--accent);border-radius:4px;opacity:.4"></div></div><div class="sb-info"><strong>Frame 2 &middot; 0.5s</strong>Logo appears. Opacity: 20%. Scale: 0.9. Ease Out begins.</div></div>'
  + '<div class="sb-frame"><div class="sb-screen"><div style="width:50px;height:50px;border:2px solid var(--accent);border-radius:4px;opacity:.8"></div></div><div class="sb-info"><strong>Frame 3 &middot; 1.0s</strong>Logo at 80%. Scale: 1.05 (slight overshoot). Squash &amp; stretch.</div></div>'
  + '<div class="sb-frame"><div class="sb-screen"><div style="width:48px;height:48px;background:var(--accent);border-radius:4px"></div></div><div class="sb-info"><strong>Frame 4 &middot; 1.5s</strong>Logo at 100%. Scale: 1.0. HOLD begins. Final position registered.</div></div>'
  + '</div>'
  + '<div class="callout">Each storyboard frame must include: <strong>timestamp</strong>, <strong>property values</strong> (opacity, scale, position), <strong>easing type</strong>, and a <strong>written note</strong> explaining the design decision.</div>'
  + '<div class="cols2" style="gap:16px;align-items:start">'
  + '<div class="img-wrap" style="height:130px"><img src="https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=800&q=80" alt="Storyboard frames drawn on paper" /></div>'
  + '<div class="card"><span class="tag">Each Frame Includes</span><ul class="checklist" style="margin-top:8px"><li>Sketch of the visual state</li><li>Timestamp in seconds</li><li>Property values at that keyframe</li><li>Easing type to next frame</li></ul></div>'
  + '</div></div></div>';

/* ── Slide 17 — 3.5 Brand Consistency ── */
SLIDES[16] = '<div class="slide-inner">'
  + '<div><span class="kicker">Part 3 &middot; 3.5</span>'
  + '<h2 style="margin-top:8px">Logo Animation &amp; <span style="color:var(--accent)">Brand Consistency</span></h2>'
  + '<div class="h-rule" style="margin-top:10px"></div>'
  + '<p style="margin-top:8px">A logo animation is a brand touchpoint. It must adhere to the same rules as all other brand applications. Mrantinkovic et al. (2020) identify brand consistency as a core responsibility of the graphic designer.</p></div>'
  + '<div class="cols2" style="gap:24px;align-items:start">'
  + '<div class="tbl-wrap"><table><thead><tr><th>Element</th><th>Requirement</th></tr></thead><tbody>'
  + '<tr><td><strong>Color</strong></td><td>Only brand-approved colors used in the animation</td></tr>'
  + '<tr><td><strong>Typography</strong></td><td>Wordmark uses the correct typeface &mdash; no substitutions</td></tr>'
  + '<tr><td><strong>Proportions</strong></td><td>Logo proportions never distorted beyond intentional squash/stretch</td></tr>'
  + '<tr><td><strong>Clear space</strong></td><td>Logo clear space rules respected in the final hold frame</td></tr>'
  + '<tr><td><strong>Speed</strong></td><td>Animation speed consistent with brand personality</td></tr>'
  + '<tr><td><strong>Sound</strong></td><td>If used, sound must match the visual character of the animation</td></tr>'
  + '</tbody></table></div>'
  + '<div style="display:flex;flex-direction:column;gap:12px">'
  + '<div class="img-wrap" style="height:160px"><img src="https://images.unsplash.com/photo-1634942537034-2531766767d1?w=800&q=80" alt="Brand identity guidelines document" /></div>'
  + '<div class="callout">The motion is an <strong>extension of the brand</strong> &mdash; not a separate creative decision. Every animation choice must be justifiable against the brand guidelines.</div>'
  + '</div></div></div>';

/* ── Slide 18 — 4.1 What Are Transitions ── */
SLIDES[17] = '<div class="slide-inner">'
  + '<div><span class="kicker">Part 4 &middot; 4.1</span>'
  + '<h2 style="margin-top:8px">What Are <span style="color:var(--accent)">Transitions?</span></h2>'
  + '<div class="h-rule" style="margin-top:10px"></div>'
  + '<p style="margin-top:8px">A <strong>transition</strong> is an animated change between two states &mdash; two screens, two slides, two sections of a page, or two scenes in a video. Transitions communicate that something has changed and guide the eye from the old state to the new.</p></div>'
  + '<div class="cols2" style="gap:24px;align-items:start">'
  + '<div style="display:flex;flex-direction:column;gap:14px">'
  + '<div class="callout"><strong>Rule:</strong> A transition should never draw attention to itself. If the viewer <em>notices</em> the transition, it has failed. A successful transition is <strong>felt, not seen</strong> &mdash; it makes the change feel natural and inevitable.</div>'
  + '<div class="tbl-wrap"><table><thead><tr><th>Transition</th><th>Description</th></tr></thead><tbody>'
  + '<tr><td><strong>Cut</strong></td><td>Instant change &mdash; no animation</td></tr>'
  + '<tr><td><strong>Fade</strong></td><td>Old fades out; new fades in</td></tr>'
  + '<tr><td><strong>Dissolve</strong></td><td>Old and new overlap during transition</td></tr>'
  + '<tr><td><strong>Slide</strong></td><td>New slides in; old slides out</td></tr>'
  + '<tr><td><strong>Push</strong></td><td>New pushes old off screen</td></tr>'
  + '<tr><td><strong>Zoom</strong></td><td>Camera zooms in or out to transition</td></tr>'
  + '<tr><td><strong>Morph</strong></td><td>Elements transform into each other</td></tr>'
  + '</tbody></table></div>'
  + '</div>'
  + '<div class="img-wrap" style="height:280px"><img src="https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&q=80" alt="Screen transitions in a UI design tool" /></div>'
  + '</div></div>';

/* ── Slide 19 — 4.2 Directional Logic ── */
SLIDES[18] = '<div class="slide-inner">'
  + '<div><span class="kicker">Part 4 &middot; 4.2</span>'
  + '<h2 style="margin-top:8px">Directional <span style="color:var(--accent)">Logic</span></h2>'
  + '<div class="h-rule" style="margin-top:10px"></div>'
  + '<p style="margin-top:8px">Transitions that involve movement must follow a consistent <strong>directional logic</strong> that matches the spatial model of the interface or narrative. Violating it creates spatial disorientation.</p></div>'
  + '<div class="cols2" style="gap:24px;align-items:start">'
  + '<div style="display:flex;flex-direction:column;gap:14px">'
  + '<div class="dir-diagram">'
  + '<div class="dir-cell"></div>'
  + '<div class="dir-cell" style="flex-direction:column;gap:4px"><span style="font-size:16px;color:var(--muted)">&#8593;</span><span>Back / Up</span></div>'
  + '<div class="dir-cell"></div>'
  + '<div class="dir-cell" style="flex-direction:column;gap:4px"><span style="font-size:16px;color:var(--muted)">&#8592;</span><span>Previous</span></div>'
  + '<div class="dir-center">Current<br>Screen</div>'
  + '<div class="dir-cell" style="flex-direction:column;gap:4px"><span style="font-size:16px;color:var(--accent)">&#8594;</span><span style="color:var(--accent)">Next</span></div>'
  + '<div class="dir-cell"></div>'
  + '<div class="dir-cell" style="flex-direction:column;gap:4px"><span style="font-size:16px;color:var(--muted)">&#8595;</span><span>Deeper</span></div>'
  + '<div class="dir-cell"></div>'
  + '</div>'
  + '<div class="tbl-wrap"><table><thead><tr><th>Action</th><th>Direction</th></tr></thead><tbody>'
  + '<tr><td>Moving forward (next page)</td><td>New content enters from <strong>right</strong></td></tr>'
  + '<tr><td>Moving backward (previous)</td><td>New content enters from <strong>left</strong></td></tr>'
  + '<tr><td>Going deeper (detail page)</td><td>New content enters from <strong>bottom</strong> or zooms in</td></tr>'
  + '<tr><td>Going up (parent page)</td><td>New content enters from <strong>top</strong> or zooms out</td></tr>'
  + '</tbody></table></div>'
  + '</div>'
  + '<div style="display:flex;flex-direction:column;gap:12px">'
  + '<div class="img-wrap" style="height:180px"><img src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80" alt="Mobile app navigation transitions" /></div>'
  + '<div class="callout">Consistent directional logic builds a <strong>mental model</strong> of the interface. Users know where they are and how to get back &mdash; without thinking about it.</div>'
  + '</div></div></div>';

/* ── Slide 20 — 4.3 Transition Timing ── */
SLIDES[19] = '<div class="slide-inner">'
  + '<div><span class="kicker">Part 4 &middot; 4.3</span>'
  + '<h2 style="margin-top:8px">Transition <span style="color:var(--accent)">Timing</span></h2>'
  + '<div class="h-rule" style="margin-top:10px"></div>'
  + '<p style="margin-top:8px">The duration of a transition directly affects the perceived quality and personality of the interface or content.</p></div>'
  + '<div class="cols2" style="gap:24px;align-items:start">'
  + '<div style="display:flex;flex-direction:column;gap:14px">'
  + '<div class="tbl-wrap"><table><thead><tr><th>Duration</th><th>Effect</th><th>Use Case</th></tr></thead><tbody>'
  + '<tr><td><strong>&lt; 100ms</strong></td><td>Imperceptible</td><td>Not recommended</td></tr>'
  + '<tr><td><strong>100 &ndash; 200ms</strong></td><td>Crisp, responsive</td><td>UI micro-interactions</td></tr>'
  + '<tr><td><strong>200 &ndash; 400ms</strong></td><td>Natural, standard</td><td>Page transitions, modals</td></tr>'
  + '<tr><td><strong>400 &ndash; 600ms</strong></td><td>Deliberate, considered</td><td>Brand moments, reveals</td></tr>'
  + '<tr><td><strong>&gt; 600ms</strong></td><td>Slow &mdash; risks sluggish</td><td>Cinematic / editorial only</td></tr>'
  + '</tbody></table></div>'
  + '<div class="callout"><strong>Rule:</strong> UI transitions should never exceed <strong>400ms</strong>. Users are trying to accomplish a task &mdash; a slow transition is an obstacle, not a feature.</div>'
  + '<div class="card"><span class="tag">Staggered Entrance</span>'
  + '<div class="timeline" style="margin-top:8px">'
  + 'Screen &nbsp;&nbsp;: [0ms]<br>'
  + 'Heading &nbsp;: [200ms]<br>'
  + 'Subhead &nbsp;: [350ms]<br>'
  + 'Body text: [450ms]<br>'
  + '<span style="color:var(--accent)">CTA btn &nbsp;: [550ms] &larr; last</span>'
  + '</div></div>'
  + '</div>'
  + '<div class="img-wrap" style="height:280px"><img src="https://images.unsplash.com/photo-1555421689-491a97ff2040?w=800&q=80" alt="Mobile UI transitions timing" /></div>'
  + '</div></div>';

/* ── Slide 21 — 4.4 Transitions in Presentations ── */
SLIDES[20] = '<div class="slide-inner">'
  + '<div><span class="kicker">Part 4 &middot; 4.4</span>'
  + '<h2 style="margin-top:8px">Transitions in <span style="color:var(--accent)">Presentations</span></h2>'
  + '<div class="h-rule" style="margin-top:10px"></div>'
  + '<p style="margin-top:8px">Slide transitions are the most common context in which students will apply transition design. Mrantinkovic et al. (2020) identify presentations as a key deliverable of the graphic designer.</p></div>'
  + '<div class="cols2" style="gap:24px;align-items:start">'
  + '<div class="tbl-wrap"><table><thead><tr><th>Guideline</th><th>Reason</th></tr></thead><tbody>'
  + '<tr><td>Use <strong>one transition type</strong> throughout</td><td>Consistency &mdash; multiple types feel chaotic</td></tr>'
  + '<tr><td>Use <strong>fade or slide</strong> &mdash; avoid complex effects</td><td>Complex transitions distract from content</td></tr>'
  + '<tr><td>Keep duration at <strong>200 &ndash; 300ms</strong></td><td>Responsive yet registerable</td></tr>'
  + '<tr><td>Use <strong>directional slides</strong> for sequential content</td><td>Reinforces forward narrative progression</td></tr>'
  + '<tr><td>Use <strong>fade</strong> for non-sequential jumps</td><td>Slide implies spatial relationship; fade does not</td></tr>'
  + '<tr><td><strong>Never use random</strong> transitions</td><td>Communicates lack of design intent</td></tr>'
  + '</tbody></table></div>'
  + '<div style="display:flex;flex-direction:column;gap:12px">'
  + '<div class="img-wrap" style="height:180px"><img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80" alt="Presentation slide deck on screen" /></div>'
  + '<div class="callout">The best presentation transition is the one the audience <strong>never notices</strong>. It serves the content &mdash; it does not compete with it.</div>'
  + '</div></div></div>';

/* ── Slide 22 — 5.1 Motion and Brand Personality ── */
SLIDES[21] = '<div class="slide-inner">'
  + '<div><span class="kicker">Part 5 &middot; 5.1</span>'
  + '<h2 style="margin-top:8px">Motion &amp; <span style="color:var(--accent)">Brand Personality</span></h2>'
  + '<div class="h-rule" style="margin-top:10px"></div>'
  + '<p style="margin-top:8px">In motion graphics, brand personality is expressed through the <strong>character of movement</strong> &mdash; its speed, easing, style, and timing.</p></div>'
  + '<div class="brand-grid">'
  + '<div class="brand-chip"><span class="bname">Luxury / Premium</span><p>Slow, deliberate, smooth ease-in-out. Minimal movement. Long holds.</p></div>'
  + '<div class="brand-chip"><span class="bname">Playful / Youthful</span><p>Bouncy, springy, squash &amp; stretch. Bright color transitions. Fast timing.</p></div>'
  + '<div class="brand-chip"><span class="bname">Tech / Innovative</span><p>Crisp, precise, geometric. Glitch or particle effects. Sharp easing.</p></div>'
  + '<div class="brand-chip"><span class="bname">Trustworthy / Professional</span><p>Clean fades and slides. No decorative motion. Consistent timing.</p></div>'
  + '<div class="brand-chip"><span class="bname">Creative / Artistic</span><p>Fluid morphs, hand-drawn reveals. Irregular timing. Expressive curves.</p></div>'
  + '<div class="brand-chip"><span class="bname">Energetic / Athletic</span><p>Fast, impactful. Strong directional movement. Minimal hold time.</p></div>'
  + '</div>'
  + '<div class="callout">Define the brand\'s motion personality <strong>before</strong> animating. Every motion decision &mdash; easing, duration, style &mdash; should be justifiable against this definition.</div>'
  + '</div>';

/* ── Slide 23 — 5.2 Common Mistakes ── */
SLIDES[22] = '<div class="slide-inner">'
  + '<div><span class="kicker">Part 5 &middot; 5.2</span>'
  + '<h2 style="margin-top:8px">Common Motion Design <span style="color:var(--accent)">Mistakes</span></h2>'
  + '<div class="h-rule" style="margin-top:10px"></div></div>'
  + '<div class="cols2" style="gap:20px;align-items:start">'
  + '<div class="tbl-wrap"><table><thead><tr><th>Mistake</th><th>Correction</th></tr></thead><tbody>'
  + '<tr><td><strong>Too many simultaneous animations</strong></td><td>Stagger animations; one element at a time</td></tr>'
  + '<tr><td><strong>Linear easing throughout</strong></td><td>Ease Out for entrances; Ease In for exits</td></tr>'
  + '<tr><td><strong>Animation with no purpose</strong></td><td>Every animation must serve a communication goal</td></tr>'
  + '<tr><td><strong>Inconsistent timing</strong></td><td>Establish a timing system and apply it consistently</td></tr>'
  + '<tr><td><strong>Motion contradicts brand</strong></td><td>Define motion guidelines before animating</td></tr>'
  + '<tr><td><strong>Transitions too slow</strong></td><td>Keep UI transitions under 400ms</td></tr>'
  + '<tr><td><strong>Logo proportions distorted</strong></td><td>Respect logo proportions and clear space rules</td></tr>'
  + '<tr><td><strong>No hold on final logo frame</strong></td><td>Always hold final state for at least 0.5 seconds</td></tr>'
  + '</tbody></table></div>'
  + '<div style="display:flex;flex-direction:column;gap:12px">'
  + '<div class="img-wrap" style="height:160px"><img src="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80" alt="Motion design on a professional workstation" /></div>'
  + '<div class="callout"><strong>Gratuitous animation distracts. Purposeful animation clarifies.</strong> Every movement must earn its place by contributing to the communication goal &mdash; Mrantinkovic et al. (2020).</div>'
  + '</div></div></div>';

/* ── Slide 24 — Activity ── */
SLIDES[23] = '<div class="slide-inner">'
  + '<div><span class="kicker">Part 6 &middot; Activity</span>'
  + '<h2 style="margin-top:8px">Activity &mdash; <span style="color:var(--accent)">Logo Animation Storyboard</span></h2>'
  + '<div class="h-rule" style="margin-top:10px"></div></div>'
  + '<div style="display:flex;flex-direction:column;gap:16px;max-width:720px">'
  + '<p>Your brief was randomly assigned in the last class. Using your assigned brand, complete the following deliverables:</p>'
  + '<ul class="checklist">'
  + '<li><strong>4-frame storyboard</strong> &mdash; sketch each key moment of the logo animation (intro, build, reveal, hold).</li>'
  + '<li><strong>Timing diagram</strong> &mdash; map each element\'s start time, duration, and easing on a timeline.</li>'
  + '<li><strong>Animation specification</strong> (150+ words) &mdash; describe every animated property, easing choice, and how the style reflects the brand personality.</li>'
  + '<li><strong>Transition specification</strong> (100+ words) &mdash; explain the transition type chosen, directional logic, and timing rationale.</li>'
  + '</ul>'
  + '<div class="callout">'
  + '<strong>&#128203; Submission</strong><br>'
  + 'Upload via Google Forms: <strong>[INSERT GOOGLE FORMS LINK HERE]</strong><br>'
  + 'Then mark <em>"Done"</em> under Notes in <strong>CCCLMS</strong>.'
  + '</div>'
  + '</div></div>';

/* ── Slide 25 — Assessment ── */
SLIDES[24] = '<div class="slide-inner">'
  + '<div><span class="kicker">Part 6 &middot; Assessment</span>'
  + '<h2 style="margin-top:8px">Assessment <span style="color:var(--accent)">Questions</span></h2>'
  + '<div class="h-rule" style="margin-top:10px"></div></div>'
  + '<ol class="q-list" style="max-width:720px">'
  + '<li>What is the difference between motion graphics and traditional animation?</li>'
  + '<li>A logo animation uses linear easing. What problem does this create and what would you use instead?</li>'
  + '<li>A brand is &ldquo;premium, calm, and trustworthy.&rdquo; Describe its logo animation timing, easing, and style.</li>'
  + '<li>A slide deck uses a different transition on every slide. What principle does this violate?</li>'
  + '<li>Explain directional logic. Give one correct and one incorrect example.</li>'
  + '<li>A logo reveals in 0.3s then immediately cuts away. What principle is violated and how do you fix it?</li>'
  + '</ol></div>';

/* ── Slide 26 — Summary ── */
SLIDES[25] = '<div class="slide-inner">'
  + '<div><span class="kicker">Part 6 &middot; Summary</span>'
  + '<h2 style="margin-top:8px">Key <span style="color:var(--accent)">Takeaways</span></h2>'
  + '<div class="h-rule" style="margin-top:10px"></div></div>'
  + '<ul class="checklist" style="max-width:720px">'
  + '<li><strong>Motion graphics is graphic design in time</strong> &mdash; same principles, applied across a timeline.</li>'
  + '<li>Every animation is built from <strong>position, scale, rotation, opacity</strong>.</li>'
  + '<li><strong>Easing</strong> is the most important principle &mdash; never use linear for brand animation.</li>'
  + '<li>A logo animation <strong>performs the brand\'s personality</strong> &mdash; style must match identity.</li>'
  + '<li>Always follow the <strong>three-act structure</strong>: intro &rarr; reveal &rarr; hold.</li>'
  + '<li>Transitions communicate <strong>spatial and narrative relationships</strong> &mdash; directional logic must be consistent.</li>'
  + '<li><strong>Stagger animations</strong> to reinforce hierarchy &mdash; most important element moves first.</li>'
  + '<li>UI transitions must be <strong>under 400ms</strong> &mdash; users are completing tasks, not watching a performance.</li>'
  + '<li><strong>Hold the final logo frame</strong> for at least 0.5 seconds.</li>'
  + '</ul></div>';

/* ── Start ── */
init();
