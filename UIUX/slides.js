/* slides.js */

var SLIDES = [];

/* Engine — runs after DOM is ready (script is at bottom of body) */
var current = 0;
var viewport = document.getElementById('viewport');
var dotsEl   = document.getElementById('dots');
var prevBtn  = document.getElementById('prevBtn');
var nextBtn  = document.getElementById('nextBtn');
var ctrEl    = document.getElementById('ctr');

function init() {
  var total = SLIDES.length;
  /* Build slide divs */
  for (var i = 0; i < total; i++) {
    var div = document.createElement('div');
    div.className = 'slide' + (i === 0 ? ' active' : '');
    div.innerHTML = SLIDES[i];
    viewport.appendChild(div);
  }
  /* Build dots */
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

/* Touch swipe */
var tx = 0;
viewport.addEventListener('touchstart', function(e) { tx = e.touches[0].clientX; }, { passive: true });
viewport.addEventListener('touchend',   function(e) {
  var dx = e.changedTouches[0].clientX - tx;
  if (Math.abs(dx) > 40) { if (dx < 0) goTo(current + 1); else goTo(current - 1); }
}, { passive: true });


SLIDES[0] = '<div class="slide-inner" style="gap:28px">'
  + '<div style="display:flex;flex-direction:column;gap:10px">'
  + '<span class="title-eyebrow">Graphics Design &middot; Module 05</span>'
  + '<h1 class="title-main">UI/UX <em>Web Graphics</em><br>&amp; Wireframing</h1>'
  + '<div class="h-rule"></div>'
  + '<p class="title-sub">From user thinking to paper blueprints &mdash; learn how to plan, structure, and communicate web interfaces before a single pixel is designed.</p>'
  + '</div>'
  + '<div class="cols2" style="gap:20px;align-items:start">'
  + '<div style="display:flex;flex-direction:column;gap:12px">'
  + '<span class="tag">Learning Objectives</span>'
  + '<ol class="obj-list">'
  + '<li><span class="obj-num">1</span>Define UI and UX design and explain the distinction between the two disciplines.</li>'
  + '<li><span class="obj-num">2</span>Identify the stages of the web design process and where wireframing fits.</li>'
  + '<li><span class="obj-num">3</span>Construct a sitemap and user flow diagram for a given brief.</li>'
  + '<li><span class="obj-num">4</span>Apply hierarchy, layout, and proximity principles to wireframe structure.</li>'
  + '<li><span class="obj-num">5</span>Produce a lo-fi paper wireframe with annotations and a mobile adaptation.</li>'
  + '</ol></div>'
  + '<div class="img-wrap" style="height:220px"><img src="https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&q=80" alt="Designer sketching wireframes" /></div>'
  + '</div>'
  + '<div class="callout"><strong>Reference:</strong> Mrantinkovic et al. (2020). <em>3G Handy Guide: Graphic Designing</em>. 3G E-Learning LLC.</div>'
  + '</div>';

SLIDES[1] = '<div class="slide-inner">'
  + '<div><span class="kicker">Part 1 &middot; Section 1.1</span>'
  + '<h2 style="margin-top:8px">What is <span style="color:var(--accent)">UI</span> &amp; <span style="color:var(--accent)">UX</span>?</h2>'
  + '<div class="h-rule" style="margin-top:10px"></div></div>'
  + '<div class="cols2" style="align-items:start;gap:20px">'
  + '<div style="display:flex;flex-direction:column;gap:14px">'
  + '<div class="card" style="border-left:3px solid var(--accent)"><span class="tag">UI &mdash; User Interface Design</span>'
  + '<p>The practice of designing the <strong>visual and interactive elements</strong> a user directly engages with &mdash; buttons, menus, forms, icons, typography, and layout.</p></div>'
  + '<div class="card" style="border-left:3px solid #7c3aed"><span class="tag" style="background:#f5f3ff;color:#7c3aed">UX &mdash; User Experience Design</span>'
  + '<p>The broader practice of shaping the <strong>entire experience</strong> a person has while interacting with a digital product &mdash; how it feels, how easy it is to use, and whether it achieves the user\'s goal.</p></div>'
  + '<div class="callout"><strong>Key Distinction:</strong> UI is what it <em>looks like</em>. UX is how it <em>works and feels</em>. Both are required.</div>'
  + '</div>'
  + '<div style="display:flex;flex-direction:column;gap:14px">'
  + '<div class="img-wrap" style="height:160px"><img src="https://images.unsplash.com/photo-1559028012-481c04fa702d?w=800&q=80" alt="UI design mockup" /></div>'
  + '<div class="tbl-wrap"><table><thead><tr><th>Graphic Design</th><th>UI/UX Context</th></tr></thead><tbody>'
  + '<tr><td>Static compositions</td><td>Interactive, multi-state layouts</td></tr>'
  + '<tr><td>Single viewing context</td><td>Multiple devices &amp; screen sizes</td></tr>'
  + '<tr><td>Aesthetic-first</td><td>Function-first, aesthetic-second</td></tr>'
  + '<tr><td>Fixed dimensions</td><td>Fluid, responsive grids</td></tr>'
  + '<tr><td>One-time experience</td><td>Repeated, habitual use</td></tr>'
  + '</tbody></table></div>'
  + '</div></div></div>';

SLIDES[2] = '<div class="slide-inner">'
  + '<div><span class="kicker">Part 1 &middot; Section 1.3</span>'
  + '<h2 style="margin-top:8px">What is <span style="color:var(--accent)">Wireframing?</span></h2>'
  + '<div class="h-rule" style="margin-top:10px"></div></div>'
  + '<div class="cols2" style="gap:24px;align-items:start">'
  + '<div style="display:flex;flex-direction:column;gap:14px">'
  + '<p>A <strong>wireframe</strong> is a low-detail, structural blueprint of a web page. It defines layout and content structure <em>before</em> any visual design decisions are made.</p>'
  + '<ul class="checklist"><li>What <strong>content</strong> appears on the page</li><li>Where each <strong>element is positioned</strong></li><li>How the user <strong>navigates</strong> between pages</li><li>What <strong>interactions</strong> are available</li></ul>'
  + '<div class="callout"><strong>Rule:</strong> Never open a design tool before you have a wireframe. Designing without one is like building a house without a floor plan.</div>'
  + '<p style="font-size:12px">Wireframing is to web design what <strong>thumbnail sketching</strong> is to logo design &mdash; the ideation stage before execution.</p>'
  + '</div>'
  + '<div style="display:flex;flex-direction:column;gap:10px">'
  + '<span class="tag">Lo-fi Wireframe Example</span>'
  + '<div class="wf-mock">'
  + '<div class="wf-header"><span>&#9776; Logo</span><span>Nav &middot; Nav &middot; Nav</span></div>'
  + '<div class="wf-hero"><div class="wf-h1"></div><div class="wf-h1" style="width:40%;margin:0 auto 8px"></div><div class="wf-btn">Primary CTA</div></div>'
  + '<div class="wf-body"><div class="wf-card"><div class="wf-img-ph"></div><div class="wf-line"></div><div class="wf-line short"></div></div>'
  + '<div class="wf-card"><div class="wf-img-ph"></div><div class="wf-line"></div><div class="wf-line short"></div></div>'
  + '<div class="wf-card"><div class="wf-img-ph"></div><div class="wf-line"></div><div class="wf-line short"></div></div></div>'
  + '<div class="wf-footer">Footer &middot; Links &middot; Legal &middot; Contact</div>'
  + '</div>'
  + '<p style="font-size:11px;color:var(--muted);text-align:center">Boxes, lines, and labels &mdash; no color, no images, no styling.</p>'
  + '</div></div></div>';

SLIDES[3] = '<div class="slide-inner">'
  + '<div><span class="kicker">Part 1 &middot; Section 1.4</span>'
  + '<h2 style="margin-top:8px">The Web <span style="color:var(--accent)">Design Process</span></h2>'
  + '<div class="h-rule" style="margin-top:10px"></div>'
  + '<p style="margin-top:8px">Wireframing occupies a critical position between strategic thinking and visual execution.</p></div>'
  + '<div class="steps">'
  + '<div class="step"><div class="step-num">1</div><div class="step-label">Research</div></div>'
  + '<div class="step"><div class="step-num">2</div><div class="step-label">Define</div></div>'
  + '<div class="step"><div class="step-num">3</div><div class="step-label">Ideate</div></div>'
  + '<div class="step active-step"><div class="step-num">4</div><div class="step-label">Wireframe</div></div>'
  + '<div class="step"><div class="step-num">5</div><div class="step-label">Prototype</div></div>'
  + '<div class="step"><div class="step-num">6</div><div class="step-label">Test</div></div>'
  + '<div class="step"><div class="step-num">7</div><div class="step-label">Visual Design</div></div>'
  + '<div class="step"><div class="step-num">8</div><div class="step-label">Build</div></div>'
  + '</div>'
  + '<div class="cols2" style="gap:20px;align-items:start">'
  + '<div class="tbl-wrap"><table><thead><tr><th>Stage</th><th>What Happens</th></tr></thead><tbody>'
  + '<tr><td>Research</td><td>Understand users, goals, and context</td></tr>'
  + '<tr><td>Define</td><td>Identify the problem to solve</td></tr>'
  + '<tr><td>Ideate</td><td>Brainstorm solutions and user flows</td></tr>'
  + '<tr><td><strong>Wireframe</strong></td><td><strong>Sketch the structure and layout</strong></td></tr>'
  + '<tr><td>Prototype</td><td>Make it interactive (clickable)</td></tr>'
  + '<tr><td>Test</td><td>Validate with real users</td></tr>'
  + '<tr><td>Visual Design</td><td>Apply color, type, and imagery</td></tr>'
  + '<tr><td>Build</td><td>Hand off to developers</td></tr>'
  + '</tbody></table></div>'
  + '<div style="display:flex;flex-direction:column;gap:14px">'
  + '<div class="img-wrap" style="height:150px"><img src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&q=80" alt="Team collaborating on design process" /></div>'
  + '<div class="callout">Wireframing sits at the intersection of <strong>thinking and making</strong>. It is cheap to change a wireframe. It is expensive to change a built interface.</div>'
  + '</div></div></div>';

SLIDES[4] = '<div class="slide-inner">'
  + '<div><span class="kicker">Part 1 &middot; Section 1.5</span>'
  + '<h2 style="margin-top:8px">Fidelity <span style="color:var(--accent)">Levels</span></h2>'
  + '<div class="h-rule" style="margin-top:10px"></div>'
  + '<p style="margin-top:8px"><strong>Fidelity</strong> refers to how closely a wireframe resembles the final product. This module focuses on lo-fi paper wireframes.</p></div>'
  + '<div class="fidelity-grid">'
  + '<div class="fid-card"><div class="fid-preview"><div class="fid-bar dark" style="width:50%;height:10px"></div><div class="fid-bar" style="width:80%"></div><div class="fid-bar short"></div><div style="display:flex;gap:6px;margin-top:4px"><div style="flex:1;height:28px;background:#ddd;border-radius:3px"></div><div style="flex:1;height:28px;background:#ddd;border-radius:3px"></div></div></div><div class="fid-info"><h3>Lo-fi &middot; Low Fidelity</h3><p>Rough boxes, lines, placeholder text. No styling whatsoever.</p><span class="tag" style="margin-top:6px">Early ideation &middot; Paper sketches</span></div></div>'
  + '<div class="fid-card" style="border-color:var(--accent)"><div class="fid-preview" style="background:#eff6ff"><div class="fid-bar dark" style="width:55%;height:10px;background:#93c5fd"></div><div class="fid-bar" style="width:85%;background:#bfdbfe"></div><div class="fid-bar short" style="background:#bfdbfe"></div><div style="display:flex;gap:6px;margin-top:4px"><div style="flex:1;height:28px;background:#bfdbfe;border-radius:3px"></div><div style="flex:1;height:28px;background:#bfdbfe;border-radius:3px"></div></div></div><div class="fid-info"><h3>Mid-fi &middot; Medium Fidelity</h3><p>Defined layout, real labels, basic spacing. Grayscale or single color.</p><span class="tag" style="margin-top:6px;background:var(--accent-lt);color:var(--accent)">After concept is validated</span></div></div>'
  + '<div class="fid-card"><div class="fid-preview" style="background:#f0fdf4"><div class="fid-bar dark" style="width:60%;height:10px;background:#86efac"></div><div class="fid-bar" style="width:90%;background:#bbf7d0"></div><div class="fid-bar short" style="background:#bbf7d0"></div><div style="display:flex;gap:6px;margin-top:4px"><div style="flex:1;height:28px;background:#bbf7d0;border-radius:3px"></div><div style="flex:1;height:28px;background:#bbf7d0;border-radius:3px"></div></div></div><div class="fid-info"><h3>Hi-fi &middot; High Fidelity</h3><p>Near-final layout with real content, fonts, and spacing.</p><span class="tag" style="margin-top:6px">Before visual design handoff</span></div></div>'
  + '</div>'
  + '<div class="cols2" style="gap:16px;align-items:start">'
  + '<div class="img-wrap" style="height:130px"><img src="https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&q=80" alt="Paper wireframe sketches" /></div>'
  + '<div class="callout">Lo-fi wireframes allow designers to explore many layout options quickly <strong>without investing time in visual polish</strong> that may need to be discarded.</div>'
  + '</div></div>';

SLIDES[5] = '<div class="slide-inner">'
  + '<div><span class="kicker">Part 2 &middot; Section 2.1</span>'
  + '<h2 style="margin-top:8px">Starting with <span style="color:var(--accent)">the User</span></h2>'
  + '<div class="h-rule" style="margin-top:10px"></div>'
  + '<p style="margin-top:8px">Before drawing a single box, a UX designer must understand <strong>who the user is</strong> and what they are trying to accomplish.</p></div>'
  + '<div class="cols2" style="gap:20px;align-items:start">'
  + '<div style="display:flex;flex-direction:column;gap:14px">'
  + '<div class="persona"><div class="persona-avatar"><img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80" alt="Maya persona" /></div>'
  + '<div class="persona-info"><h3>Maya, 28</h3><p class="persona-role">Urban commuter &middot; Coffee shop regular</p>'
  + '<div class="persona-rows">'
  + '<div class="persona-row"><span class="label">Context</span><span class="val">Looking for a local coffee shop on her phone during her commute</span></div>'
  + '<div class="persona-row"><span class="label">Goal</span><span class="val">Find the menu and opening hours in under 30 seconds</span></div>'
  + '<div class="persona-row"><span class="label">Frustration</span><span class="val">Websites that make her scroll past a full-screen hero before finding basic info</span></div>'
  + '</div></div></div>'
  + '<div class="callout">Every wireframe decision should be answerable by referring back to the <strong>persona</strong>.</div>'
  + '</div>'
  + '<div style="display:flex;flex-direction:column;gap:14px">'
  + '<div class="img-wrap" style="height:160px"><img src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80" alt="Team conducting user research" /></div>'
  + '<div class="card"><span class="tag">Key Questions Before Wireframing</span>'
  + '<ul class="checklist" style="margin-top:6px">'
  + '<li><strong>Who is the user?</strong> &mdash; age, context, goals, technical comfort</li>'
  + '<li><strong>What are they trying to do?</strong> &mdash; their primary task</li>'
  + '<li><strong>What do they already know?</strong> &mdash; prior expectations</li>'
  + '<li><strong>What would make them leave?</strong> &mdash; friction, confusion</li>'
  + '</ul></div>'
  + '</div></div></div>';

SLIDES[6] = '<div class="slide-inner">'
  + '<div><span class="kicker">Part 2 &middot; Section 2.2</span>'
  + '<h2 style="margin-top:8px">Information <span style="color:var(--accent)">Architecture</span></h2>'
  + '<div class="h-rule" style="margin-top:10px"></div>'
  + '<p style="margin-top:8px"><strong>Information Architecture (IA)</strong> is the practice of organizing, structuring, and labeling content so users can find what they need efficiently.</p></div>'
  + '<div class="cols2" style="gap:24px;align-items:start">'
  + '<div style="display:flex;flex-direction:column;gap:14px">'
  + '<span class="tag">Example Sitemap &mdash; Coffee Shop</span>'
  + '<div class="sitemap" style="padding:16px;background:var(--surface);border:1px solid var(--border);border-radius:var(--radius)">'
  + '<div class="sm-node"><div class="sm-box root">Home</div><div class="sm-line-v"></div></div>'
  + '<div class="sm-children">'
  + '<div class="sm-child"><div class="sm-line-v"></div><div class="sm-box">Menu</div><div class="sm-line-v"></div><div style="display:flex;gap:6px"><div style="display:flex;flex-direction:column;align-items:center"><div class="sm-line-v" style="height:10px"></div><div class="sm-box" style="font-size:9px;padding:4px 8px">Drinks</div></div><div style="display:flex;flex-direction:column;align-items:center"><div class="sm-line-v" style="height:10px"></div><div class="sm-box" style="font-size:9px;padding:4px 8px">Food</div></div></div></div>'
  + '<div class="sm-child"><div class="sm-line-v"></div><div class="sm-box">About</div></div>'
  + '<div class="sm-child"><div class="sm-line-v"></div><div class="sm-box">Locations</div></div>'
  + '<div class="sm-child"><div class="sm-line-v"></div><div class="sm-box">Contact</div></div>'
  + '</div></div></div>'
  + '<div style="display:flex;flex-direction:column;gap:14px">'
  + '<div class="tbl-wrap"><table><thead><tr><th>IA Principle</th><th>What It Means</th></tr></thead><tbody>'
  + '<tr><td><strong>Hierarchy</strong></td><td>Group related content under clear parent categories</td></tr>'
  + '<tr><td><strong>Clarity</strong></td><td>Label navigation with words users actually use</td></tr>'
  + '<tr><td><strong>Depth</strong></td><td>No more than 3 clicks to reach any page</td></tr>'
  + '<tr><td><strong>Consistency</strong></td><td>Navigation must appear in the same place on every page</td></tr>'
  + '</tbody></table></div>'
  + '<div class="img-wrap" style="height:120px"><img src="https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=800&q=80" alt="Whiteboard with sitemap diagram" /></div>'
  + '</div></div></div>';

SLIDES[7] = '<div class="slide-inner">'
  + '<div><span class="kicker">Part 2 &middot; Section 2.3</span>'
  + '<h2 style="margin-top:8px">User <span style="color:var(--accent)">Flows</span></h2>'
  + '<div class="h-rule" style="margin-top:10px"></div>'
  + '<p style="margin-top:8px">A <strong>user flow</strong> maps the path a specific user takes through a website to complete a specific task &mdash; showing decisions, branches, and outcomes.</p></div>'
  + '<div class="cols2" style="gap:20px;align-items:start">'
  + '<div style="display:flex;flex-direction:column;gap:14px">'
  + '<span class="tag">Example &mdash; Online Order Flow</span>'
  + '<div style="background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:16px;display:flex;flex-direction:column;gap:8px;align-items:center;font-size:11px">'
  + '<div style="background:var(--accent);color:#fff;border-radius:100px;padding:5px 16px;font-weight:600">Landing Page</div>'
  + '<div style="width:1.5px;height:14px;background:var(--border)"></div>'
  + '<div style="background:var(--tag-bg);border:1px solid var(--border);border-radius:6px;padding:5px 14px;font-weight:600;color:var(--muted)">Menu Page</div>'
  + '<div style="width:1.5px;height:14px;background:var(--border)"></div>'
  + '<div style="width:100px;height:40px;background:var(--accent-lt);border:1.5px solid var(--accent);border-radius:4px;display:flex;align-items:center;justify-content:center;font-weight:700;color:var(--accent);font-size:10px;text-align:center;line-height:1.3">Item<br>Selected?</div>'
  + '<div style="display:flex;gap:32px;align-items:flex-start;width:100%">'
  + '<div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:6px"><div style="font-size:10px;color:var(--accent);font-weight:700">YES</div><div style="width:1.5px;height:10px;background:var(--border)"></div><div style="background:var(--tag-bg);border:1px solid var(--border);border-radius:6px;padding:4px 10px;font-weight:600;color:var(--muted)">Cart</div><div style="width:1.5px;height:8px;background:var(--border)"></div><div style="background:var(--tag-bg);border:1px solid var(--border);border-radius:6px;padding:4px 10px;font-weight:600;color:var(--muted)">Checkout</div><div style="width:1.5px;height:8px;background:var(--border)"></div><div style="background:#dcfce7;border:1px solid #86efac;border-radius:6px;padding:4px 10px;font-weight:600;color:#16a34a">Confirmation &#10003;</div></div>'
  + '<div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:6px"><div style="font-size:10px;color:var(--muted);font-weight:700">NO</div><div style="width:1.5px;height:10px;background:var(--border)"></div><div style="background:var(--tag-bg);border:1px solid var(--border);border-radius:6px;padding:4px 10px;font-weight:600;color:var(--muted);font-size:10px;text-align:center;line-height:1.4">Continue<br>Browsing</div></div>'
  + '</div></div></div>'
  + '<div style="display:flex;flex-direction:column;gap:14px">'
  + '<div class="card"><span class="tag">Flow Notation</span>'
  + '<div style="display:flex;flex-direction:column;gap:8px;margin-top:8px;font-size:12px">'
  + '<div style="display:flex;gap:10px;align-items:center"><div style="width:32px;height:20px;border:1.5px solid var(--border);border-radius:3px;flex-shrink:0"></div><span><strong>Rectangle</strong> &mdash; a page or screen</span></div>'
  + '<div style="display:flex;gap:10px;align-items:center"><div style="width:24px;height:24px;border:1.5px solid var(--accent);background:var(--accent-lt);transform:rotate(45deg);flex-shrink:0"></div><span><strong>Diamond</strong> &mdash; a decision point</span></div>'
  + '<div style="display:flex;gap:10px;align-items:center"><div style="font-size:18px;color:var(--muted);flex-shrink:0">&rarr;</div><span><strong>Arrow</strong> &mdash; direction of navigation</span></div>'
  + '</div></div>'
  + '<div class="img-wrap" style="height:130px"><img src="https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800&q=80" alt="User flow diagram on paper" /></div>'
  + '<div class="callout"><strong>Before wireframing any page, define the user flow it belongs to.</strong> A page without a flow has no context.</div>'
  + '</div></div></div>';

SLIDES[8] = '<div class="slide-inner">'
  + '<div><span class="kicker">Part 3 &middot; Sections 3.1 &ndash; 3.2</span>'
  + '<h2 style="margin-top:8px">Wireframe <span style="color:var(--accent)">Anatomy</span></h2>'
  + '<div class="h-rule" style="margin-top:10px"></div>'
  + '<p style="margin-top:8px">Every web page is built from a consistent set of structural regions. Each region has a defined role.</p></div>'
  + '<div class="cols2" style="gap:24px;align-items:start">'
  + '<div style="display:flex;flex-direction:column;gap:8px"><span class="tag">Page Regions</span>'
  + '<div class="wf-mock" style="font-size:11px">'
  + '<div class="wf-header" style="justify-content:space-between"><span>&#9312; HEADER</span><span style="font-size:9px;color:var(--muted)">Logo + Navigation</span></div>'
  + '<div class="wf-hero" style="padding:20px 12px"><div style="font-size:10px;font-weight:700;color:var(--muted);margin-bottom:6px">&#9313; HERO</div><div class="wf-h1" style="margin:0 auto 4px"></div><div class="wf-h1" style="width:35%;margin:0 auto 8px"></div><div class="wf-btn">Primary CTA</div></div>'
  + '<div style="padding:10px 12px;border-bottom:1px solid var(--border)"><div style="font-size:10px;font-weight:700;color:var(--muted);margin-bottom:6px">&#9314; MAIN CONTENT</div><div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px"><div class="wf-card"><div class="wf-img-ph"></div><div class="wf-line"></div></div><div class="wf-card"><div class="wf-img-ph"></div><div class="wf-line"></div></div><div class="wf-card"><div class="wf-img-ph"></div><div class="wf-line"></div></div></div></div>'
  + '<div class="wf-footer">&#9317; FOOTER &middot; Links &middot; Legal &middot; Contact</div>'
  + '</div></div>'
  + '<div style="display:flex;flex-direction:column;gap:14px">'
  + '<div class="tbl-wrap"><table><thead><tr><th>Component</th><th>Symbol</th><th>Purpose</th></tr></thead><tbody>'
  + '<tr><td><strong>Box</strong></td><td>Rectangle</td><td>Any container</td></tr>'
  + '<tr><td><strong>X-Box</strong></td><td>Rect + diagonal X</td><td>Image placeholder</td></tr>'
  + '<tr><td><strong>Lines</strong></td><td>Horizontal lines</td><td>Text placeholder</td></tr>'
  + '<tr><td><strong>Button</strong></td><td>Rounded rect + label</td><td>CTA or action</td></tr>'
  + '<tr><td><strong>Nav bar</strong></td><td>Horizontal strip</td><td>Primary navigation</td></tr>'
  + '<tr><td><strong>Input field</strong></td><td>Rect + underline</td><td>Form entry</td></tr>'
  + '</tbody></table></div>'
  + '<div class="callout"><strong>Rule:</strong> In lo-fi wireframes, never use real images or styled typography. The goal is <strong>structure, not aesthetics</strong>.</div>'
  + '</div></div></div>';

SLIDES[9] = '<div class="slide-inner">'
  + '<div><span class="kicker">Part 3 &middot; Sections 3.3 &ndash; 3.4</span>'
  + '<h2 style="margin-top:8px">Grid System &amp; <span style="color:var(--accent)">Above the Fold</span></h2>'
  + '<div class="h-rule" style="margin-top:10px"></div></div>'
  + '<div class="cols2" style="gap:24px;align-items:start">'
  + '<div style="display:flex;flex-direction:column;gap:12px"><h3>The Grid System</h3>'
  + '<p>Web layouts are built on <strong>grids</strong> &mdash; invisible columns that align content consistently across the page.</p>'
  + '<div style="border:1px solid var(--border);border-radius:var(--radius);padding:12px;background:var(--surface)">'
  + '<div style="font-size:10px;color:var(--muted);margin-bottom:8px;font-weight:600;letter-spacing:.06em;text-transform:uppercase">12-Column Grid (Desktop)</div>'
  + '<div style="display:grid;grid-template-columns:repeat(12,1fr);gap:3px;margin-bottom:10px"><div style="height:20px;background:var(--accent-lt);border-radius:2px;border:1px solid #bfdbfe"></div><div style="height:20px;background:var(--accent-lt);border-radius:2px;border:1px solid #bfdbfe"></div><div style="height:20px;background:var(--accent-lt);border-radius:2px;border:1px solid #bfdbfe"></div><div style="height:20px;background:var(--accent-lt);border-radius:2px;border:1px solid #bfdbfe"></div><div style="height:20px;background:var(--accent-lt);border-radius:2px;border:1px solid #bfdbfe"></div><div style="height:20px;background:var(--accent-lt);border-radius:2px;border:1px solid #bfdbfe"></div><div style="height:20px;background:var(--accent-lt);border-radius:2px;border:1px solid #bfdbfe"></div><div style="height:20px;background:var(--accent-lt);border-radius:2px;border:1px solid #bfdbfe"></div><div style="height:20px;background:var(--accent-lt);border-radius:2px;border:1px solid #bfdbfe"></div><div style="height:20px;background:var(--accent-lt);border-radius:2px;border:1px solid #bfdbfe"></div><div style="height:20px;background:var(--accent-lt);border-radius:2px;border:1px solid #bfdbfe"></div><div style="height:20px;background:var(--accent-lt);border-radius:2px;border:1px solid #bfdbfe"></div></div>'
  + '<div style="display:grid;grid-template-columns:repeat(12,1fr);gap:3px;margin-bottom:6px"><div style="grid-column:span 12;height:14px;background:#e0e7ff;border-radius:2px"></div></div>'
  + '<div style="display:grid;grid-template-columns:repeat(12,1fr);gap:3px;margin-bottom:6px"><div style="grid-column:span 6;height:14px;background:#dbeafe;border-radius:2px"></div><div style="grid-column:span 6;height:14px;background:#dbeafe;border-radius:2px"></div></div>'
  + '<div style="display:grid;grid-template-columns:repeat(12,1fr);gap:3px"><div style="grid-column:span 4;height:14px;background:#eff6ff;border-radius:2px"></div><div style="grid-column:span 4;height:14px;background:#eff6ff;border-radius:2px"></div><div style="grid-column:span 4;height:14px;background:#eff6ff;border-radius:2px"></div></div>'
  + '<div style="font-size:9px;color:var(--muted);margin-top:8px">Full-width &middot; Half &middot; Third</div></div>'
  + '<div class="tbl-wrap"><table><thead><tr><th>Grid</th><th>Columns</th><th>Use</th></tr></thead><tbody>'
  + '<tr><td><strong>12-col</strong></td><td>12</td><td>Desktop &mdash; most flexible</td></tr>'
  + '<tr><td><strong>8-col</strong></td><td>8</td><td>Tablet layouts</td></tr>'
  + '<tr><td><strong>4-col</strong></td><td>4</td><td>Mobile layouts</td></tr>'
  + '</tbody></table></div></div>'
  + '<div style="display:flex;flex-direction:column;gap:12px"><h3>Above the Fold</h3>'
  + '<p>The <strong>fold</strong> is the bottom edge of the visible screen before the user scrolls. Content above it is seen immediately.</p>'
  + '<div style="border:1px solid var(--border);border-radius:var(--radius);overflow:hidden;background:var(--surface)">'
  + '<div style="padding:8px 12px;background:var(--tag-bg);border-bottom:1px solid var(--border);font-size:10px;font-weight:600;color:var(--muted)">HEADER &mdash; Logo + Nav</div>'
  + '<div style="padding:12px;background:#f7f6f4"><div style="font-size:10px;font-weight:700;color:var(--accent);margin-bottom:6px">HERO &mdash; Headline + CTA</div><div style="height:8px;background:#ddd;border-radius:2px;margin-bottom:4px;width:70%"></div><div style="height:8px;background:#ddd;border-radius:2px;margin-bottom:8px;width:45%"></div><div style="display:inline-block;background:var(--accent);color:#fff;border-radius:4px;padding:4px 12px;font-size:9px;font-weight:700">Order Now</div></div>'
  + '<div style="border-top:2px dashed var(--accent);padding:6px 12px;background:var(--accent-lt);font-size:9px;font-weight:700;color:var(--accent);letter-spacing:.08em;text-transform:uppercase">&uarr; The Fold &mdash; visible without scrolling</div>'
  + '<div style="padding:10px 12px;opacity:.4"><div style="font-size:10px;color:var(--muted);margin-bottom:6px">CONTENT BELOW FOLD</div><div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px"><div style="height:30px;background:#e8e5e0;border-radius:3px"></div><div style="height:30px;background:#e8e5e0;border-radius:3px"></div><div style="height:30px;background:#e8e5e0;border-radius:3px"></div></div></div>'
  + '</div>'
  + '<div class="callout"><strong>Above the fold must contain:</strong> brand identity, what the site is about, primary CTA, and navigation to key sections.</div>'
  + '</div></div></div>';

SLIDES[10] = '<div class="slide-inner">'
  + '<div><span class="kicker">Part 4 &middot; Sections 4.1 &ndash; 4.2</span>'
  + '<h2 style="margin-top:8px">Hierarchy &amp; <span style="color:var(--accent)">Scan Patterns</span></h2>'
  + '<div class="h-rule" style="margin-top:10px"></div>'
  + '<p style="margin-top:8px">In a lo-fi wireframe, hierarchy must be communicated through <strong>size, position, weight, whitespace, and contrast</strong> alone.</p></div>'
  + '<div class="cols2" style="gap:24px;align-items:start">'
  + '<div style="display:flex;flex-direction:column;gap:10px"><h3>F-Pattern <span style="font-size:11px;font-weight:400;color:var(--muted)">&mdash; text-heavy pages</span></h3>'
  + '<div style="background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:14px;display:flex;flex-direction:column;gap:5px"><div style="height:9px;background:var(--accent);border-radius:2px;opacity:.7"></div><div style="height:7px;background:var(--accent);border-radius:2px;opacity:.5;width:75%"></div><div style="height:6px;background:#ddd;border-radius:2px;width:30%"></div><div style="height:6px;background:#ddd;border-radius:2px;width:30%"></div><div style="height:6px;background:#ddd;border-radius:2px;width:30%"></div><div style="height:6px;background:#ddd;border-radius:2px;width:30%"></div><div style="font-size:9px;color:var(--muted);margin-top:4px">Articles &middot; Search results &middot; Listings</div></div>'
  + '<ul class="checklist" style="font-size:12px"><li>Place logo <strong>top-left</strong> &mdash; F starts there</li><li>Most important text in the <strong>first two lines</strong></li><li>Left edge carries the most <strong>vertical attention</strong></li></ul>'
  + '</div>'
  + '<div style="display:flex;flex-direction:column;gap:10px"><h3>Z-Pattern <span style="font-size:11px;font-weight:400;color:var(--muted)">&mdash; visual/minimal pages</span></h3>'
  + '<div style="background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:14px">'
  + '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px"><div style="width:40px;height:9px;background:var(--accent);border-radius:2px;opacity:.7"></div><div style="flex:1;height:1.5px;background:var(--accent);opacity:.3;margin:0 8px"></div><div style="width:40px;height:9px;background:var(--accent);border-radius:2px;opacity:.7"></div></div>'
  + '<div style="text-align:center;font-size:18px;color:var(--accent);opacity:.4;margin-bottom:8px">&#8601;</div>'
  + '<div style="display:flex;justify-content:space-between;align-items:center"><div style="width:40px;height:9px;background:var(--accent);border-radius:2px;opacity:.7"></div><div style="flex:1;height:1.5px;background:var(--accent);opacity:.3;margin:0 8px"></div><div style="width:60px;height:22px;background:var(--accent);border-radius:4px;opacity:.8;display:flex;align-items:center;justify-content:center"><span style="font-size:9px;color:#fff;font-weight:700">CTA</span></div></div>'
  + '<div style="font-size:9px;color:var(--muted);margin-top:8px">Landing pages &middot; Homepages</div>'
  + '</div>'
  + '<ul class="checklist" style="font-size:12px"><li>Primary CTA at <strong>end of Z diagonal</strong> or top-right</li><li>Do not place critical content <strong>bottom-right</strong> &mdash; last seen</li><li>Logo always <strong>top-left</strong></li></ul>'
  + '</div></div>'
  + '<div class="cols2" style="gap:16px;align-items:start">'
  + '<div class="img-wrap" style="height:110px"><img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80" alt="Eye tracking heatmap" /></div>'
  + '<div class="callout">Before finalizing any wireframe, ask: <strong>where does the eye go first, second, and third?</strong> If the answer is unclear, the hierarchy has not been resolved.</div>'
  + '</div></div>';

SLIDES[11] = '<div class="slide-inner">'
  + '<div><span class="kicker">Part 5 &middot; Sections 5.1 &ndash; 5.3</span>'
  + '<h2 style="margin-top:8px">UI <span style="color:var(--accent)">Patterns</span> &amp; Navigation</h2>'
  + '<div class="h-rule" style="margin-top:10px"></div>'
  + '<p style="margin-top:8px"><strong>UI patterns</strong> are reusable solutions to common interface problems. Use established patterns unless you have a validated reason not to.</p></div>'
  + '<div class="cols2" style="gap:20px;align-items:start">'
  + '<div style="display:flex;flex-direction:column;gap:12px"><h3>Navigation Patterns</h3>'
  + '<div class="tbl-wrap"><table><thead><tr><th>Pattern</th><th>Best For</th></tr></thead><tbody>'
  + '<tr><td><strong>Top nav bar</strong></td><td>4&ndash;7 primary sections</td></tr>'
  + '<tr><td><strong>Hamburger menu</strong></td><td>Mobile, secondary nav</td></tr>'
  + '<tr><td><strong>Sidebar nav</strong></td><td>Dashboards, admin panels</td></tr>'
  + '<tr><td><strong>Tab navigation</strong></td><td>Filtered content, settings</td></tr>'
  + '<tr><td><strong>Breadcrumb</strong></td><td>Deep hierarchies, e-commerce</td></tr>'
  + '<tr><td><strong>Footer nav</strong></td><td>Legal, sitemap, social links</td></tr>'
  + '</tbody></table></div></div>'
  + '<div style="display:flex;flex-direction:column;gap:12px"><h3>Content Patterns</h3>'
  + '<div class="pattern-grid">'
  + '<div class="pat-chip"><span class="pat-icon">&#127991;</span><h3>Hero Section</h3><p>Full-width banner + CTA. Homepages.</p></div>'
  + '<div class="pat-chip"><span class="pat-icon">&#127183;</span><h3>Card Grid</h3><p>Repeating cards. Products, articles.</p></div>'
  + '<div class="pat-chip"><span class="pat-icon">&#10022;</span><h3>Feature List</h3><p>Icon + heading + desc. Services.</p></div>'
  + '<div class="pat-chip"><span class="pat-icon">&#128172;</span><h3>Testimonial</h3><p>Quote + name + avatar. Trust.</p></div>'
  + '<div class="pat-chip"><span class="pat-icon">+</span><h3>FAQ Accordion</h3><p>Expand/collapse. Support pages.</p></div>'
  + '<div class="pat-chip"><span class="pat-icon">&#9634;</span><h3>Modal</h3><p>Overlay content. Confirmations.</p></div>'
  + '</div></div></div>'
  + '<div class="cols2" style="gap:16px;align-items:center">'
  + '<div class="img-wrap" style="height:100px"><img src="https://images.unsplash.com/photo-1555421689-491a97ff2040?w=800&q=80" alt="Mobile navigation menu" /></div>'
  + '<div class="callout" style="font-size:12px"><strong>Carousel Warning:</strong> Users rarely interact past the first slide. Only use a carousel when content is genuinely sequential.</div>'
  + '</div></div>';

SLIDES[12] = '<div class="slide-inner">'
  + '<div><span class="kicker">Part 5 &middot; Sections 5.4 &ndash; 5.5</span>'
  + '<h2 style="margin-top:8px">Forms &amp; <span style="color:var(--accent)">Responsive Design</span></h2>'
  + '<div class="h-rule" style="margin-top:10px"></div></div>'
  + '<div class="cols2" style="gap:24px;align-items:start">'
  + '<div style="display:flex;flex-direction:column;gap:12px"><h3>Form Wireframing Rules</h3>'
  + '<ul class="checklist"><li>Every input must have a visible <strong>label above</strong> the field &mdash; not inside it</li><li>Group related fields <strong>on the same row</strong></li><li>Submit button must be the <strong>primary CTA</strong></li><li>Show <strong>error and success states</strong> in annotations</li><li>Never use more fields than necessary &mdash; <strong>every extra field reduces completion</strong></li></ul>'
  + '<div style="background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:14px;display:flex;flex-direction:column;gap:10px;font-size:11px">'
  + '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px"><div><div style="font-weight:600;margin-bottom:3px;color:var(--text)">First Name</div><div style="border:1px solid var(--border);border-radius:4px;height:28px;background:#fafaf9"></div></div><div><div style="font-weight:600;margin-bottom:3px;color:var(--text)">Last Name</div><div style="border:1px solid var(--border);border-radius:4px;height:28px;background:#fafaf9"></div></div></div>'
  + '<div><div style="font-weight:600;margin-bottom:3px;color:var(--text)">Email Address</div><div style="border:1px solid var(--border);border-radius:4px;height:28px;background:#fafaf9"></div></div>'
  + '<div><div style="font-weight:600;margin-bottom:3px;color:var(--text)">Message</div><div style="border:1px solid var(--border);border-radius:4px;height:48px;background:#fafaf9"></div></div>'
  + '<div style="background:var(--accent);color:#fff;border-radius:5px;padding:7px;text-align:center;font-weight:700;font-size:11px">Send Message</div>'
  + '</div></div>'
  + '<div style="display:flex;flex-direction:column;gap:12px"><h3>Responsive Breakpoints</h3>'
  + '<div class="tbl-wrap"><table><thead><tr><th>Breakpoint</th><th>Width</th><th>Layout</th></tr></thead><tbody>'
  + '<tr><td><strong>Mobile</strong></td><td>320&ndash;767px</td><td>Single column, stacked</td></tr>'
  + '<tr><td><strong>Tablet</strong></td><td>768&ndash;1023px</td><td>2-column, some stacking</td></tr>'
  + '<tr><td><strong>Desktop</strong></td><td>1024px+</td><td>Full multi-column</td></tr>'
  + '</tbody></table></div>'
  + '<div class="callout" style="font-size:12px">The mobile wireframe is <strong>not a shrunken desktop</strong> &mdash; it is a re-prioritized layout. Decide what is essential and what can be hidden or moved.</div>'
  + '</div></div></div>';

SLIDES[13] = '<div class="slide-inner">'
  + '<div><span class="kicker">Part 6 &middot; Activity &amp; Summary</span>'
  + '<h2 style="margin-top:8px">Activity, Assessment <span style="color:var(--accent)">&amp; Summary</span></h2>'
  + '<div class="h-rule" style="margin-top:10px"></div></div>'
  + '<div class="cols2" style="gap:20px;align-items:start">'
  + '<div style="display:flex;flex-direction:column;gap:10px"><h3>Key Takeaways</h3>'
  + '<ul class="checklist"><li><strong>UI</strong> is what it looks like. <strong>UX</strong> is how it works and feels.</li><li>Wireframing is the <strong>planning stage</strong> &mdash; never skip it.</li><li>Lo-fi wireframes use <strong>boxes, lines, and labels</strong> only &mdash; no color or images.</li><li><strong>IA</strong> organizes content so users find what they need in 3 clicks or fewer.</li><li><strong>User flows</strong> map the path to complete a task &mdash; every page belongs to a flow.</li><li>Hierarchy in wireframes: <strong>size, position, weight, whitespace, contrast</strong>.</li><li><strong>UI patterns</strong> are reusable solutions &mdash; use conventions before inventing.</li><li>Every wireframe needs a <strong>mobile version</strong> &mdash; re-prioritized, not shrunk.</li></ul>'
  + '</div>'
  + '<div style="display:flex;flex-direction:column;gap:14px"><h3>Assessment Questions</h3>'
  + '<ol class="q-list"><li>What is the difference between UI and UX? Give one example of each for the same website.</li><li>List the steps you would take before opening any design software for a homepage.</li><li>What is "above the fold" and what must always appear there?</li><li>A wireframe has six equally sized buttons. What UX problem does this create?</li><li>Describe lo-fi, mid-fi, and hi-fi wireframes. When is each appropriate?</li><li>A form has 12 fields and 70% of users abandon it. What changes would you make?</li></ol>'
  + '<div class="callout"><strong>&#128203; Paper Wireframe Activity</strong><br>Your brief was randomly assigned in the last class. Produce a lo-fi wireframe for your assigned website\'s <strong>homepage</strong> and <strong>one inner page</strong>. Include a sitemap, user flow, and mobile adaptation.<br><br>Upload via Google Forms: <strong>[INSERT GOOGLE FORMS LINK HERE]</strong><br>Then mark <em>"Done"</em> under Notes in <strong>CCCLMS</strong>.</div>'
  + '</div></div>'
  + '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px">'
  + '<div class="img-wrap" style="height:80px"><img src="https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=400&q=80" alt="Paper wireframe sketches" /></div>'
  + '<div class="img-wrap" style="height:80px"><img src="https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=400&q=80" alt="Sitemap diagram" /></div>'
  + '<div class="img-wrap" style="height:80px"><img src="https://images.unsplash.com/photo-1559028012-481c04fa702d?w=400&q=80" alt="UI mockup on laptop" /></div>'
  + '</div></div>';

/* Start the deck */
init();
