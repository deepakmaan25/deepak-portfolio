// Music Animate case-study diagrams.
// Editorial light style, matched to the case study tokens:
//   ink hsl(0,0%,8%), muted hsl(0,0%,45%), hairline hsl(0,0%,85%),
//   paper hsl(0,0%,99%), accent lime hsl(76,64%,45%).
// Fonts inherited from the page (Overused Grotesk) via font-family on <text>.

const INK = 'hsl(0,0%,8%)'
const MUT = 'hsl(0,0%,45%)'
const FAINT = 'hsl(0,0%,62%)'
const LINE = 'hsl(0,0%,84%)'
const PAPER = 'hsl(0,0%,99%)'
const FILL = 'hsl(0,0%,96.5%)'
const LIME = 'hsl(76,60%,42%)'
const LIMEBG = 'hsl(76,55%,94%)'
const SANS = "'Overused Grotesk', Inter, system-ui, sans-serif"
const MONO = "'JetBrains Mono', ui-monospace, monospace"

// 1 ── Real-time audio→visual pipeline ───────────────────────────────────────
export const PIPELINE = `
<svg viewBox="0 0 900 360" xmlns="http://www.w3.org/2000/svg" width="100%" height="auto" preserveAspectRatio="xMidYMid meet" style="display:block" font-family="${SANS}" role="img" aria-label="Real-time audio to visual pipeline">
  <rect width="900" height="360" fill="${PAPER}"/>
  <text x="40" y="46" font-size="13" letter-spacing="0.12em" fill="${MUT}">THE PER-FRAME LOOP · 60 TIMES A SECOND</text>
  <line x1="40" y1="60" x2="860" y2="60" stroke="${LINE}"/>

  <!-- Stage 1 -->
  <rect x="40" y="100" width="150" height="92" rx="10" fill="${FILL}" stroke="${LINE}"/>
  <text x="58" y="132" font-size="15" font-weight="600" fill="${INK}">Audio in</text>
  <text x="58" y="154" font-size="12" fill="${MUT}">Web Audio</text>
  <text x="58" y="170" font-size="12" fill="${MUT}">AnalyserNode</text>

  <!-- arrow -->
  <path d="M198 146 H236" stroke="${INK}" stroke-width="1.4"/>
  <path d="M236 146 l-7 -4 v8 z" fill="${INK}"/>

  <!-- Stage 2: frame context -->
  <rect x="244" y="86" width="190" height="120" rx="10" fill="${LIMEBG}" stroke="${LIME}"/>
  <text x="262" y="116" font-size="15" font-weight="600" fill="${INK}">Frame context</text>
  <text x="262" y="138" font-size="12" fill="${MUT}">~30 values, rebuilt</text>
  <text x="262" y="154" font-size="12" fill="${MUT}">every frame:</text>
  <text x="262" y="176" font-size="11.5" font-family="${MONO}" fill="${INK}">freq bands · beat onset</text>
  <text x="262" y="192" font-size="11.5" font-family="${MONO}" fill="${INK}">energy · section · palette</text>

  <path d="M442 146 H480" stroke="${INK}" stroke-width="1.4"/>
  <path d="M480 146 l-7 -4 v8 z" fill="${INK}"/>

  <!-- Stage 3: active engine -->
  <rect x="488" y="100" width="160" height="92" rx="10" fill="${FILL}" stroke="${LINE}"/>
  <text x="506" y="132" font-size="15" font-weight="600" fill="${INK}">Active engine</text>
  <text x="506" y="154" font-size="12" fill="${MUT}">1 of 9, reads</text>
  <text x="506" y="170" font-size="12" fill="${MUT}">the context</text>

  <path d="M656 146 H694" stroke="${INK}" stroke-width="1.4"/>
  <path d="M694 146 l-7 -4 v8 z" fill="${INK}"/>

  <!-- Stage 4: canvas -->
  <rect x="702" y="100" width="158" height="92" rx="10" fill="${INK}"/>
  <text x="720" y="132" font-size="15" font-weight="600" fill="white">Canvas</text>
  <text x="720" y="154" font-size="12" fill="hsl(0,0%,70%)">light-on-black,</text>
  <text x="720" y="170" font-size="12" fill="hsl(0,0%,70%)">beat-locked</text>

  <!-- beat-detection caption under context -->
  <text x="40" y="250" font-size="13" fill="${INK}" font-weight="600">Why it feels locked to the music, not decorating it</text>
  <text x="40" y="274" font-size="13" fill="${MUT}">Beat detection runs off bass-onset tracking with a smoothed envelope. Section context (intro,</text>
  <text x="40" y="294" font-size="13" fill="${MUT}">verse, drop, chorus) drives camera zoom, colour intensity and motion scale, so the visual</text>
  <text x="40" y="314" font-size="13" fill="${MUT}">surges on a drop and settles in a verse.</text>
</svg>`

// 2 ── The signature refactor, before / after ────────────────────────────────
export const REFACTOR = `
<svg viewBox="0 0 900 380" xmlns="http://www.w3.org/2000/svg" width="100%" height="auto" preserveAspectRatio="xMidYMid meet" style="display:block" font-family="${SANS}" role="img" aria-label="Engine extraction refactor, before and after">
  <rect width="900" height="380" fill="${PAPER}"/>
  <text x="40" y="46" font-size="13" letter-spacing="0.12em" fill="${MUT}">THE SIGNATURE REFACTOR · ZERO BEHAVIOUR CHANGE</text>
  <line x1="40" y1="60" x2="860" y2="60" stroke="${LINE}"/>

  <!-- BEFORE -->
  <text x="40" y="96" font-size="13" font-weight="600" fill="${INK}">Before</text>
  <text x="92" y="96" font-size="13" fill="${FAINT}">one giant component</text>
  <rect x="40" y="110" width="360" height="210" rx="10" fill="${FILL}" stroke="${LINE}"/>
  <text x="60" y="138" font-size="12" font-family="${MONO}" fill="${MUT}">VisualEngine.tsx</text>
  <!-- monolith block with tangled if/else -->
  <rect x="60" y="152" width="320" height="148" rx="6" fill="white" stroke="${LINE}"/>
  <text x="76" y="176" font-size="11.5" font-family="${MONO}" fill="${INK}">if (engine === 'spectrum') {…}</text>
  <text x="76" y="196" font-size="11.5" font-family="${MONO}" fill="${INK}">else if (engine === 'radial') {…}</text>
  <text x="76" y="216" font-size="11.5" font-family="${MONO}" fill="${INK}">else if (engine === 'orbital') {…}</text>
  <text x="76" y="236" font-size="11.5" font-family="${MONO}" fill="${FAINT}">… 6 more branches …</text>
  <text x="76" y="262" font-size="11.5" font-family="${MONO}" fill="${INK}">~1,450-line if/else chain</text>
  <text x="76" y="286" font-size="11.5" font-family="${MONO}" fill="${MUT}">main component: ~4,100 lines</text>

  <!-- arrow between -->
  <path d="M412 215 H468" stroke="${INK}" stroke-width="1.6"/>
  <path d="M468 215 l-8 -5 v10 z" fill="${INK}"/>
  <text x="420" y="205" font-size="11" fill="${MUT}">extract</text>

  <!-- AFTER -->
  <text x="500" y="96" font-size="13" font-weight="600" fill="${INK}">After</text>
  <text x="548" y="96" font-size="13" fill="${LIME}">testable module behind a typed interface</text>
  <rect x="500" y="110" width="360" height="210" rx="10" fill="${FILL}" stroke="${LINE}"/>
  <!-- interface box -->
  <rect x="520" y="130" width="320" height="52" rx="6" fill="${LIMEBG}" stroke="${LIME}"/>
  <text x="536" y="152" font-size="11.5" font-family="${MONO}" fill="${INK}">EngineContext</text>
  <text x="536" y="170" font-size="11.5" font-family="${MONO}" fill="${MUT}">31 typed fields · one contract</text>
  <!-- engine module -->
  <rect x="520" y="196" width="320" height="104" rx="6" fill="white" stroke="${LINE}"/>
  <text x="536" y="220" font-size="11.5" font-family="${MONO}" fill="${INK}">engines/ · standalone module</text>
  <text x="536" y="244" font-size="11.5" font-family="${MONO}" fill="${MUT}">independently testable</text>
  <text x="536" y="268" font-size="11.5" font-family="${MONO}" fill="${MUT}">verified both directions</text>
  <text x="536" y="290" font-size="11.5" font-family="${MONO}" fill="${INK}">main component: ~2,600 lines</text>

  <!-- footer note -->
  <text x="40" y="356" font-size="13" fill="${MUT}">Done <tspan font-style="italic" font-family="${"'IBM Plex Serif', Georgia, serif"}">after</tspan> the product was stable, deployed in isolation, verified with interface-contract scans in both directions.</text>
</svg>`

// 3 ── Prototype → port → verify loop ────────────────────────────────────────
export const LOOP = `
<svg viewBox="0 0 900 320" xmlns="http://www.w3.org/2000/svg" width="100%" height="auto" preserveAspectRatio="xMidYMid meet" style="display:block" font-family="${SANS}" role="img" aria-label="Prototype, review, port, verify loop">
  <rect width="900" height="320" fill="${PAPER}"/>
  <text x="40" y="46" font-size="13" letter-spacing="0.12em" fill="${MUT}">HOW EVERY ENGINE GOT BUILT · THE DIRECTION LOOP</text>
  <line x1="40" y1="60" x2="860" y2="60" stroke="${LINE}"/>

  <!-- 4 steps -->
  <g>
    <rect x="40" y="110" width="180" height="96" rx="10" fill="${FILL}" stroke="${LINE}"/>
    <text x="58" y="140" font-size="12" font-family="${MONO}" fill="${LIME}">01</text>
    <text x="58" y="164" font-size="15" font-weight="600" fill="${INK}">Prototype</text>
    <text x="58" y="186" font-size="12" fill="${MUT}">standalone HTML,</text>
    <text x="58" y="200" font-size="12" fill="${MUT}">simulated audio</text>
  </g>
  <path d="M228 158 H260" stroke="${INK}" stroke-width="1.4"/><path d="M260 158 l-7 -4 v8 z" fill="${INK}"/>
  <g>
    <rect x="268" y="110" width="180" height="96" rx="10" fill="${FILL}" stroke="${LINE}"/>
    <text x="286" y="140" font-size="12" font-family="${MONO}" fill="${LIME}">02</text>
    <text x="286" y="164" font-size="15" font-weight="600" fill="${INK}">I review</text>
    <text x="286" y="186" font-size="12" fill="${MUT}">tune or approve,</text>
    <text x="286" y="200" font-size="12" fill="${MUT}">judge fine vs right</text>
  </g>
  <path d="M456 158 H488" stroke="${INK}" stroke-width="1.4"/><path d="M488 158 l-7 -4 v8 z" fill="${INK}"/>
  <g>
    <rect x="496" y="110" width="180" height="96" rx="10" fill="${FILL}" stroke="${LINE}"/>
    <text x="514" y="140" font-size="12" font-family="${MONO}" fill="${LIME}">03</text>
    <text x="514" y="164" font-size="15" font-weight="600" fill="${INK}">Port</text>
    <text x="514" y="186" font-size="12" fill="${MUT}">into the real</text>
    <text x="514" y="200" font-size="12" fill="${MUT}">codebase</text>
  </g>
  <path d="M684 158 H716" stroke="${INK}" stroke-width="1.4"/><path d="M716 158 l-7 -4 v8 z" fill="${INK}"/>
  <g>
    <rect x="724" y="110" width="136" height="96" rx="10" fill="${INK}"/>
    <text x="742" y="140" font-size="12" font-family="${MONO}" fill="hsl(76,60%,62%)">04</text>
    <text x="742" y="164" font-size="15" font-weight="600" fill="white">Verify</text>
    <text x="742" y="186" font-size="12" fill="hsl(0,0%,70%)">scope-depth,</text>
    <text x="742" y="200" font-size="12" fill="hsl(0,0%,70%)">clean build</text>
  </g>

  <text x="40" y="262" font-size="14" font-style="italic" font-family="${"'IBM Plex Serif', Georgia, serif"}" fill="${INK}">Never port blind.</text>
  <text x="190" y="262" font-size="13" fill="${MUT}">The one rule that makes the engines look intentional instead of generic.</text>
</svg>`

// 4 ── Triage matrix: 9 engines ──────────────────────────────────────────────
export const TRIAGE = `
<svg viewBox="0 0 900 380" xmlns="http://www.w3.org/2000/svg" width="100%" height="auto" preserveAspectRatio="xMidYMid meet" style="display:block" font-family="${SANS}" role="img" aria-label="Engine triage: rebuilt, smoothed, left alone">
  <rect width="900" height="380" fill="${PAPER}"/>
  <text x="40" y="46" font-size="13" letter-spacing="0.12em" fill="${MUT}">TRIAGE · NINE ENGINES, THREE DECISIONS</text>
  <line x1="40" y1="60" x2="860" y2="60" stroke="${LINE}"/>

  <!-- Column 1: rebuilt -->
  <text x="40" y="100" font-size="15" font-weight="600" fill="${INK}">Rebuilt</text>
  <text x="40" y="120" font-size="12" fill="${MUT}">prototyped, approved, ported</text>
  <g font-size="13" fill="${INK}">
    <rect x="40" y="136" width="250" height="34" rx="7" fill="${LIMEBG}" stroke="${LIME}"/><text x="56" y="158">Orbital Rings</text>
    <rect x="40" y="178" width="250" height="34" rx="7" fill="${LIMEBG}" stroke="${LIME}"/><text x="56" y="200">Geometric Pulse</text>
    <rect x="40" y="220" width="250" height="34" rx="7" fill="${LIMEBG}" stroke="${LIME}"/><text x="56" y="242">Liquid Aurora</text>
    <rect x="40" y="262" width="250" height="34" rx="7" fill="${LIMEBG}" stroke="${LIME}"/><text x="56" y="284">Resonance Field</text>
    <rect x="40" y="304" width="250" height="34" rx="7" fill="${LIMEBG}" stroke="${LIME}"/><text x="56" y="326">Fractal Kaleidoscope</text>
  </g>

  <!-- Column 2: smoothed -->
  <text x="325" y="100" font-size="15" font-weight="600" fill="${INK}">Smoothed</text>
  <text x="325" y="120" font-size="12" fill="${MUT}">already strong, light touch</text>
  <g font-size="13" fill="${INK}">
    <rect x="325" y="136" width="250" height="34" rx="7" fill="${FILL}" stroke="${LINE}"/><text x="341" y="158">Radial Spectrum</text>
    <rect x="325" y="178" width="250" height="34" rx="7" fill="${FILL}" stroke="${LINE}"/><text x="341" y="200">Spectrum Bars</text>
    <rect x="325" y="220" width="250" height="34" rx="7" fill="${FILL}" stroke="${LINE}"/><text x="341" y="242">(refinement pass)</text>
  </g>

  <!-- Column 3: left alone -->
  <text x="610" y="100" font-size="15" font-weight="600" fill="${INK}">Left alone</text>
  <text x="610" y="120" font-size="12" fill="${MUT}">best work, untouched on purpose</text>
  <g font-size="13" fill="${INK}">
    <rect x="610" y="136" width="250" height="34" rx="7" fill="white" stroke="${INK}"/><text x="626" y="158">Depth Field</text>
    <rect x="610" y="178" width="250" height="34" rx="7" fill="white" stroke="${INK}"/><text x="626" y="200">Audio Terrain</text>
  </g>
  <text x="610" y="244" font-size="12.5" font-style="italic" font-family="${"'IBM Plex Serif', Georgia, serif"}" fill="${MUT}">Rebuilding good work to satisfy a</text>
  <text x="610" y="262" font-size="12.5" font-style="italic" font-family="${"'IBM Plex Serif', Georgia, serif"}" fill="${MUT}">"redesign everything" reflex lowers</text>
  <text x="610" y="280" font-size="12.5" font-style="italic" font-family="${"'IBM Plex Serif', Georgia, serif"}" fill="${MUT}">quality. It does not raise it.</text>
</svg>`

// 5 ── Blank-screen bug anatomy ──────────────────────────────────────────────
export const BUG = `
<svg viewBox="0 0 900 400" xmlns="http://www.w3.org/2000/svg" width="100%" height="auto" preserveAspectRatio="xMidYMid meet" style="display:block" font-family="${SANS}" role="img" aria-label="The blank-screen bug anatomy">
  <rect width="900" height="400" fill="${PAPER}"/>
  <text x="40" y="46" font-size="13" letter-spacing="0.12em" fill="${MUT}">THE PRODUCTION BLANK-SCREEN BUG · ANATOMY</text>
  <line x1="40" y1="60" x2="860" y2="60" stroke="${LINE}"/>

  <!-- code panel showing the scope error -->
  <rect x="40" y="86" width="430" height="220" rx="10" fill="hsl(0,0%,12%)"/>
  <text x="60" y="114" font-size="11.5" font-family="${MONO}" fill="hsl(0,0%,55%)">VisualEngine.tsx</text>
  <text x="60" y="146" font-size="12" font-family="${MONO}" fill="hsl(0,0%,80%)">function Component() {</text>
  <text x="76" y="166" font-size="12" font-family="${MONO}" fill="hsl(0,0%,80%)">  const draw = () => {…}</text>
  <text x="76" y="186" font-size="12" font-family="${MONO}" fill="hsl(0,0%,80%)">  return &lt;canvas /&gt;</text>
  <text x="60" y="206" font-size="12" font-family="${MONO}" fill="hsl(0,0%,80%)">}  </text>
  <text x="86" y="206" font-size="11" font-family="${MONO}" fill="hsl(76,60%,62%)">// closing brace</text>
  <text x="60" y="234" font-size="12" font-family="${MONO}" fill="hsl(8,75%,68%)">function drawOrbital() {…}</text>
  <text x="60" y="252" font-size="12" font-family="${MONO}" fill="hsl(8,75%,68%)">function drawAurora() {…}</text>
  <rect x="52" y="220" width="372" height="40" rx="5" fill="none" stroke="hsl(8,75%,60%)" stroke-dasharray="4 3"/>
  <text x="60" y="284" font-size="11.5" font-family="${MONO}" fill="hsl(8,75%,68%)">stranded past the brace, in module scope</text>

  <!-- arrow -->
  <path d="M480 196 H520" stroke="${INK}" stroke-width="1.4"/><path d="M520 196 l-7 -4 v8 z" fill="${INK}"/>

  <!-- result -->
  <rect x="528" y="120" width="332" height="150" rx="10" fill="${FILL}" stroke="${LINE}"/>
  <text x="548" y="150" font-size="14" font-weight="600" fill="${INK}">Production: blank screen</text>
  <text x="548" y="174" font-size="12.5" font-family="${MONO}" fill="hsl(8,70%,45%)">ReferenceError</text>
  <text x="548" y="200" font-size="12.5" fill="${MUT}">Wrong theories chased first:</text>
  <text x="548" y="220" font-size="12.5" fill="${FAINT}">cache · wrong deploy · CDN · minify</text>
  <text x="548" y="248" font-size="12.5" fill="${INK}">Real cause: a scope-depth check</text>

  <!-- the rule -->
  <rect x="40" y="326" width="820" height="58" rx="10" fill="${LIMEBG}" stroke="${LIME}"/>
  <text x="60" y="350" font-size="13.5" fill="${INK}"><tspan font-weight="600">The permanent rule:</tspan> brace-balance alone is not enough. Verify scope depth on any refactor</text>
  <text x="60" y="370" font-size="13.5" fill="${INK}">that moves code between scopes. Plus an ErrorBoundary, so next time the real error surfaces.</text>
</svg>`

export const DIAGRAMS: Record<string, string> = {
  'pipeline': PIPELINE,
  'refactor': REFACTOR,
  'loop': LOOP,
  'triage': TRIAGE,
  'bug': BUG,
}
