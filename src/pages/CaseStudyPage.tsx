import { useEffect, useRef, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useIsMobile } from '../hooks/useMediaQuery'
import { DIAGRAMS } from '../data/maDiagrams'

const f  = "'Overused Grotesk', Inter, system-ui, sans-serif"
const fs = "'IBM Plex Serif', Georgia, serif"

interface Quote { text: string; attribution: string }
interface Embed { src: string; label: string }
interface Section {
  id: string; heading: string; body: string
  highlight?: string | null; quote?: Quote | null
  image?: string | null; images?: string[]
  embeds?: Embed[]
  svgs?: string[]
  video?: string
}
interface CaseStudy {
  slug: string; category: string; title: string; subtitle: string
  tags: string[]; status: string; metrics: { value: string; label: string }[]
  bg: string; accentBg: string
  sections: { id: string; label: string }[]
  content: Section[]
  liveUrl?: string
}

const CASE_STUDIES: Record<string, CaseStudy> = {
  'music-animate': {
    slug: 'music-animate',
    category: 'Case study · AI Product · 0→1 Build',
    title: 'Music Animate',
    subtitle: 'An audio to animation generator, built solo by directing AI',
    tags: ['Design & Product Lead', '2025 · Solo build', 'Web · runs in the browser', 'React · TS · Supabase · Canvas'],
    status: 'LIVE',
    metrics: [
      { value: '9',    label: 'generative engines' },
      { value: '25+',  label: 'visual variants' },
      { value: 'live', label: 'full-stack, solo' },
    ],
    bg: 'hsl(72,40%,95%)',
    accentBg: '#0e0e0e',
    liveUrl: 'https://musictoanimate.vercel.app',
    sections: [
      { id: 'overview',   label: 'Overview' },
      { id: 'problem',    label: 'The real problem' },
      { id: 'direction',  label: 'AI-direction model' },
      { id: 'process',    label: 'Idea → live' },
      { id: 'engines',    label: 'The engines' },
      { id: 'architecture', label: 'Architecture' },
      { id: 'obstacles',  label: 'Obstacles' },
      { id: 'design',     label: 'Design system' },
      { id: 'reflection', label: 'Reflection' },
    ],
    content: [
      {
        id: 'overview', heading: 'Overview',
        body: `Music Animate is an audio to animation generator. It turns any track into a beat-synced animated video for TikTok, Reels and Shorts. You drop a track, the app analyses it for BPM, key, energy and drops, and then you pick from 9 visual engines, tune motion and colour, and export. Everything runs in the browser. There is no server rendering, no upload-to-cloud, and no timeline editing.\n\nI built it solo, as the design and product lead, by directing AI to write the code. That second sentence is the actual case study. The interesting part is not that a creative tool exists. It is what it takes to direct AI to architect, build, debug, refactor and ship a real product, with auth, storage and a video export pipeline, and hold the quality across nine different animation systems.\n\n**Live at musictoanimate.vercel.app**`,
        highlight: null, quote: null,
        image: '/music-animate/ma_hero_light.png',
      },
      {
        id: 'problem', heading: 'The real problem',
        body: `Short-form creators need visuals synced to their music. The existing options are bad in predictable ways. After Effects is expensive and steep, templated apps all look the same, and hiring a motion designer does not scale to a daily posting habit. So there is room for something fast, free and browser-based that does the analysis for you.\n\nThat is the surface problem. The real one was harder. Build a performant, real-time generative graphics product with a full backend, as one person directing AI, without the quality falling apart across nine engines, a video exporter, auth and persistence.\n\nGenerative graphics are unforgiving. An engine either feels alive and locked to the music, or it looks like a screensaver. A video exporter either handles Safari's codec quirks or it silently ships a broken file. There is no "good enough" that hides. It is visible the moment you test on a real track on a real phone.`,
        highlight: "The hard part was never \u201Ccan AI write the code.\u201D It was whether disciplined direction could hold production quality across nine engines, a backend, and an export pipeline.",
        quote: null, image: null,
      },
      {
        id: 'direction', heading: 'The AI-direction model',
        body: `I was the single person behind the product: design, product calls, QA and build direction. AI wrote the code, inside a tight loop I ran.\n\n**I diagnosed and decided.** Every engine redesign, every architecture call, every "rebuild vs polish vs leave it alone" judgment was mine. AI proposed, I judged against quality and product fit, and I sent it back when it was "fine" instead of right.\n\n**Prototype before build.** For every visual engine, I had AI build a standalone live prototype with simulated audio first. I reviewed it, tuned or approved it, then directed the port into the real codebase. Never port blind. This one rule is why the engines look intentional instead of generic.\n\n**Verification gates I enforced.** After every structural change: brace-balance and scope-depth checks, a clean build before every ship, free-variable scans on refactors. These came out of a production bug that cost me hours.\n\nThe honest, sellable insight is that directing AI to build production software well takes *more* judgment, not less. The discipline to prototype, the rigour to verify, the taste to tell "fine" from "right." The AI is the build engine. The judgment is the work.`,
        highlight: null, quote: null, image: null,
        svgs: ['loop'],
      },
      {
        id: 'process', heading: 'From idea to live product',
        body: `This did not go in a straight line, and the case study is more honest for saying so. The shape was simple: build a rough working version, ship it, test on real tracks, find what was weak, and decide per piece whether to rebuild, polish, or leave it alone.\n\n**Ship the loop first.** Get the full chain running end to end, audio in, analysis, one or two engines, export out, before it is pretty. You cannot judge a generative engine in your head. You have to watch it react to a real song.\n\n**Test on real music, find the weak engines.** Live testing is where the truth showed up. Some engines reacted beautifully. Others, Orbital especially, looked like a screensaver on a timer with the audio barely nudging it. You do not catch that in a spec. You catch it watching it ignore a beat drop.\n\n**Triage, then rebuild only what needed it.** Five engines got full redesigns: prototyped, approved, ported. Four were already strong and only needed smoothing. I deliberately did not rebuild the best two, because rebuilding good work to satisfy a "redesign everything" reflex lowers quality, it does not raise it.\n\n**Re-architect once stable.** Only after the product worked did I direct the big refactor. Stabilise first, refactor second, never both at once.`,
        highlight: "The starting-over wasn\u2019t failure. It was the method. You ship to learn what\u2019s wrong, because generative graphics don\u2019t reveal their problems any other way.",
        quote: null, image: '/music-animate/ma_saved_light.png',
        svgs: ['triage'],
      },
      {
        id: 'engines', heading: 'The engines, in motion',
        body: `Nine engines, around 25 variants. The fastest way to understand them is to watch them react. These are the actual prototypes I built and reviewed before porting each one into the product, running live, driven by simulated audio. Drag the energy slider or trigger a beat.\n\nEach one listens to frequency bands and a beat-onset envelope. Bodies sit near-still when it is quiet, then surge on hits. That reactivity is the whole game. It is the difference between "synced to the music" and "decoration that happens to be on screen."`,
        highlight: null, quote: null,
        embeds: [
          { src: '/prototypes/resonance.html', label: 'Resonance Field, particles connect into a living constellation' },
          { src: '/prototypes/aurora.html',    label: 'Liquid Aurora, light curtains that flare on every beat' },
          { src: '/prototypes/orbital.html',   label: 'Orbital, bodies trace tilted orbits, trailing comets' },
          { src: '/prototypes/geometric.html', label: 'Geometric Pulse, shockwaves ripple through a dot grid' },
          { src: '/prototypes/fractal.html',   label: 'Fractal Kaleidoscope, mirror symmetry, three variants' },
        ],
      },
      {
        id: 'architecture', heading: 'Architecture & performance',
        body: `This is the part that matters most for what the project proves, so it gets the most detail.\n\n**Real-time audio to visual pipeline.** A Web Audio AnalyserNode produces frequency and time-domain data every frame. A per-frame context carries around 30 values into whichever engine is active: frequency bands, beat-onset detection, smoothed energy, section intensity, camera state, the live palette. Beat detection runs off bass-onset tracking with a smoothed envelope. Section context (intro, verse, drop, chorus) drives camera zoom, colour intensity and motion scale. That is what makes the visuals feel locked to the music instead of decorating it.\n\n**Performance engineering, with real numbers.** The biggest per-frame cost was shadowBlur glow. I replaced all of it with cheaper additive radial-gradient halos, a measurable smoothness win on every engine. On top of that: persistent typed-array buffers reused per frame so there is no per-frame garbage collection, cached hex to rgb conversions, React state throttled to 2 Hz instead of 60 Hz so the overlay never fights the render loop, and perf-mode auto-detection that drops particle counts and skips glow when sustained FPS falls. The result is smooth on mobile, which is where most short-form creators actually work.\n\n**Full production backend.** Supabase for Postgres, Storage and Auth. Projects persist in Postgres (engine, variant, palette, motion settings, audio metadata), audio lives in Storage, and unauthenticated users get a "pending upload" flow that syncs once they sign in. Auth was designed around the free tier's email cap rather than ignoring it.\n\n**Video export.** An in-browser MediaRecorder pipeline with capability detection and a WebM/MP4 fallback chain, progress and cancel UX, and export history. It handles the iOS and Safari codec differences that quietly break naive exporters.\n\n**The signature refactor.** The nine engines originally lived as a 1,450-line if/else chain inside one giant component. I directed a clean extraction into a standalone, independently testable module behind a typed 31-field context interface, shrinking the main component from around 4,100 to 2,600 lines with zero behaviour change. It happened *after* the product was stable, was deployed in isolation, and was verified with interface-contract scans in both directions.`,
        highlight: null, quote: null, image: null,
        svgs: ['pipeline', 'refactor'],
      },
      {
        id: 'obstacles', heading: 'Obstacles, and how I solved them',
        body: `This is the most honest section, so it is the most useful one.\n\n**The production blank-screen bug.** The big engine-extraction refactor accidentally inserted functions after the component's closing brace, stranding them in module scope. Production rendered a blank screen with a ReferenceError. I chased several wrong theories first, browser cache, wrong Vercel deploy, CDN, minification, before a scope-depth check found the real cause. The lesson became a permanent rule: brace-balance alone is not enough, verify scope depth on any refactor that moves code between scopes. I also added an ErrorBoundary so the real error surfaces next time instead of a blank screen.\n\n**Engines that looked good but were not musical.** Live testing exposed Orbital as a screensaver. It orbited on a fixed timer with only a tiny audio nudge. I diagnosed that the baseline motion was dominating and the audio was a rounding error, then re-tuned so audio drives the motion: near-still when quiet, surging on beats, the core flashing on hits. The same pass fixed Geometric Pulse looking dead between beats and Liquid Aurora looking pale next to its prototype.\n\n**Dead variant buttons.** After redesigning some engines into single cohesive looks, a few variant buttons did nothing, because the redesign had quietly ignored the variant parameter. Instead of spot-fixing, I audited all nine engines, found exactly two with dead buttons, and built real second variants for each rather than leave dead UI in the product.\n\n**Free-tier constraints, designed around.** Supabase's email cap ruled out the default OTP-confirmation signup, so I built the auth flow to work without confirmation emails rather than hit the cap.`,
        highlight: "This is the bug that taught me the verification gates I now run by default. The fix wasn\u2019t the patch. It was the rule that prevents the next one.",
        quote: null, image: null,
        svgs: ['bug'],
      },
      {
        id: 'design', heading: 'The design system: Studio Instrument',
        body: `The visual identity is supporting work, but it is where the product stops looking AI-generated and starts looking like a real tool.\n\n**Escaping the AI-SaaS look.** The first UI had the exact cliché, a purple-to-pink-to-orange gradient on light purple. I redirected the whole identity to a "Studio Instrument" system grounded in pro audio gear: one electric accent (signal lime), monospace data readouts, fine instrument grids, and a live spectrum input-monitor as the hero, framed like rack gear with BPM, KEY, PEAK and ENGINE readouts.\n\n**Dark-first, on purpose.** The canvas renders light-on-black animations, so the workspace stays dark, like a DAW or a video editor. I prototyped a full light mode, tested it, found it fought the dark-designed UI, and reverted it. Knowing when *not* to ship is part of the job. The two screens below are that exact decision: the engine grid in the light build I made, next to the dark one I kept.\n\n**Accessibility as a gate.** Every colour pairing was contrast-checked to WCAG-AA in both themes before shipping (body text 17.5:1 dark, 15.9:1 light). Reduced-motion is respected, and keyboard focus stays visible.`,
        highlight: null, quote: null,
        images: ['/music-animate/ma_engines_dark.png', '/music-animate/ma_engines_light.png'],
      },
      {
        id: 'reflection', heading: 'Reflection',
        body: `The interesting story is not "AI wrote the code." It is that shipping a quality product with AI took more product and engineering judgment, not less. The discipline to prototype before building. The habit of verifying obsessively, learned the hard way from a blank-screen production bug. The honesty to triage, rebuilding what was weak and leaving the strong engines alone. The QA to test across devices and themes on the live site. And the restraint to make the un-flashy calls, like reverting a light mode I had already built.\n\n**What it demonstrates, with no invented metrics, because there is no user study here.** A live, deployed product with the full creator flow. Nine engines and around 25 variants, mobile-tested. A full stack built solo: email auth, Postgres and Storage persistence, in-browser video export with codec fallbacks, auto-deploy CI. Real performance engineering. A maintainable architecture refactored with zero behaviour change. And underneath all of it, directing AI to design, build, ship, debug, refactor and scale a production product, with the judgment to know what to build, what to polish, and what not to ship.\n\nAI is the build engine. The judgment, taste and rigour are the part that is mine, and the part that is hard to replace.`,
        highlight: null,
        quote: null, image: null,
      },
    ],
  },
  'tech-japan': {
    slug: 'tech-japan',
    category: 'Case study · UX Research',
    title: 'Tech Japan (Talendy)',
    subtitle: 'UX Research & Platform Redesign',
    tags: ['UX Research Intern', 'Sep–Nov 2024 · 2 months', 'Web (Desktop + Mobile)', 'Figma · Google Forms · Zoom'],
    status: 'SHIPPED',
    metrics: [
      { value: '80%', label: 'improved navigation' },
      { value: '70%', label: 'feature adoption in testing' },
      { value: '9',   label: 'pain points documented' },
    ],
    bg: 'hsl(222,100%,96%)',
    accentBg: '#E8F0FE',
    sections: [
      { id: 'overview',   label: 'Overview' },
      { id: 'research',   label: 'Research' },
      { id: 'sol-1',      label: 'Job descriptions' },
      { id: 'sol-2',      label: 'Dark mode' },
      { id: 'sol-3',      label: 'Resumes' },
      { id: 'sol-4',      label: 'Save All' },
      { id: 'sol-5',      label: 'Communication' },
      { id: 'parallel',   label: 'Parallel work' },
      { id: 'reflection', label: 'Reflection' },
    ],
    content: [
      {
        id: 'overview', heading: 'Overview',
        body: `Tech Japan connects IIT students with Japanese companies. The platform had a real use case, but the experience was letting it down -broken company links, unreadable dark mode text, no way to manage multiple resumes, and post-application communication happening entirely on WhatsApp.\n\nI spent two months researching these issues with 10 IIT students across 6 campuses, documented 9 distinct pain points, and designed fixes for the most critical ones. Several shipped to production -including the job description layout, accessibility fixes, Save All profile flow, and the built-in communication tool.\n\nSole researcher on this project. I recruited participants, ran interviews, synthesised findings into an actionable brief, designed solutions in Figma, and presented to the team.`,
        highlight: null, quote: null, image: null,
      },
      {
        id: 'research', heading: 'What I found',
        body: `Ten 1:1 interviews with students from IIT Dhanbad, Roorkee, Guwahati, Delhi, Hyderabad, and Bombay -8 final year, 2 pre-final year, all actively job hunting or recently placed.\n\n**Dark mode contrast -7 of 10 users.** Text was unreadable on internship detail and company pages. It looked unfinished.\n\n**Broken company links -6 users.** For someone deciding whether to trust a company enough to apply, a 404 at that moment reads as a red flag about the company itself -not a technical inconvenience.\n\n**Job description layout -4 users.** All the information was there, presented as one long unformatted block. Fine if you're reading carefully. Impossible if you're scanning.\n\n**WhatsApp handoff -4 users.** Post-application, everything moved off-platform. The larger issue: Tech Japan had zero visibility into what happened after someone applied.\n\n**Multiple resumes -3 users.** Students apply across product, dev, design, analytics. One resume slot doesn't work.\n\n**Save profile -2 users.** Every section had to be saved individually. Missing one meant losing that data silently.`,
        highlight: "The most important signal wasn't what users said they wanted. It was the moment they stopped trusting the platform.",
        quote: { text: "While clicking on a company's link, it takes you to a new page but you can't see any meaningful data -it shows an error every time. It leads to doubting the company's legitimacy.", attribution: 'IIT student, 4th year' },
        image: '/02-pain-point-frequency.png',
      },
      {
        id: 'sol-1', heading: 'Solution 1: Job description layout',
        body: `**Problem:** Requirements, compensation, company details, and application instructions ran together in a single unformatted block. Anyone scanning to assess a role quickly couldn't.\n\n**Fix:** Restructured into clearly labelled sections -role overview, company details, requirements, how to apply. Company links fixed to actually resolve. Students could now answer two questions at a glance: is this role right for me, and is this company real?`,
        highlight: null, quote: null, image: '/04-job-description-before-after.png',
      },
      {
        id: 'sol-2', heading: 'Solution 2: Dark mode & accessibility',
        body: `**Problem:** 7 of 10 users couldn't read key sections in dark mode. Most affected: students studying late -exactly the users most likely to have dark mode on.\n\n**Fix:** Walked through the platform in dark mode screen by screen. Updated colour values to meet WCAG 2.1 AA across all affected surfaces. Standardised interactive element treatment across light and dark themes. One of the first fixes flagged for production.`,
        highlight: null, quote: null, image: '/05-dark-mode-before-after.png',
      },
      {
        id: 'sol-3', heading: 'Solution 3: Multiple resume management',
        body: `**Problem:** IIT students apply across several tracks -product, engineering, design, analytics. The platform supported one resume. Swapping required downloading, renaming, re-uploading.\n\n**Fix:** A resume library inside the profile -upload and label multiple versions ("Product Resume", "Dev Resume"), then select the right one at the point of application without leaving the job listing. Students already maintained multiple versions in Drive. The fix made that workflow native.`,
        highlight: null,
        quote: { text: "I need to upload different resumes for different profiles. There's no way to do that here.", attribution: 'IIT student, pre-final year' },
        image: '/06-resume-management.png',
      },
      {
        id: 'sol-4', heading: 'Solution 4: Save All profile flow',
        body: `**Problem:** Each profile section required a separate save. Forget one and the data was gone silently. Two users described abandoning profile completion because of it.\n\n**Fix:** A single Save All action capturing the full profile state at once. Unsaved-change indicators per section so you can see what's pending. A clear confirmation after saving. The root issue was a mismatch between the user's mental model (one profile) and how the system treated it (independent saves).`,
        highlight: null,
        quote: { text: "Building my profile was painful. I had to save each section separately, and if I forgot once, I had to rewrite everything.", attribution: 'IIT student, final year' },
        image: '/07-save-all-flow.png',
      },
      {
        id: 'sol-5', heading: 'Solution 5: Built-in communication',
        body: `**Problem:** Post-application, everything moved to WhatsApp. Users flagged it as unprofessional. But the deeper issue was business-level: Tech Japan had zero visibility into what happened after someone applied. Every offer, rejection, and follow-up was happening in an app they couldn't access.\n\n**Fix:** In-platform messaging covering the full post-application journey -status updates, document requests, direct messages with HRs, interview scheduling. All inside the platform from application to outcome.\n\n"Users want better chat" is a feature request. "You have no visibility into your own hiring funnel" is a business case. The reframe is what got it prioritised.`,
        highlight: 'The WhatsApp finding landed when I framed it as: you have zero visibility into what happens after someone applies.',
        quote: null, image: '/08-communication-tool.png',
      },
      {
        id: 'parallel', heading: 'Parallel work',
        body: `**Rebranding survey:** Ran a 10+ question survey on the Tech Japan → Talendy transition. Headline finding: 71% of respondents hadn't heard about the rebrand at all. Of those who had, 64.5% found out through peers -almost none through official channels. The recommendation was a proper launch strategy, not just a name change.\n\n**Recruiter dashboard:** Designed a hiring dashboard for Tech Japan's internal team. From 50+ responses and recruiter interviews, 72% wanted a detailed feedback mechanism and 60% wanted better transparency into the review process. Working on both sides clarified where friction actually lived -candidates didn't know where they stood, and recruiters didn't have the tools to tell them.`,
        highlight: null, quote: null, images: ['/TJ-rebranding-survey.png'],
      },
      {
        id: 'reflection', heading: 'Reflection',
        body: `Research findings don't speak for themselves. The WhatsApp issue was known before I joined and hadn't moved. Reframing it as a business visibility problem -not a chat preference -changed the conversation entirely.\n\nThe broken company link was a bug, not a design problem. But it was the single thing most likely to make a user close the tab, because it raised a question about whether the companies were real. Real research has to follow the problem, not just evaluate screens.\n\n**Results:** 80% of test participants said navigation felt easier. 70% used new features unprompted -the strongest signal a design is working.`,
        highlight: null, quote: null, image: null,
      },
    ],
  },

  'buzztro': {
    slug: 'buzztro',
    category: 'Case study · Product Design',
    title: 'Buzztro',
    subtitle: 'Collective Buying Platform',
    tags: ['Lead Product Designer', '2024 · 2 months', 'Web (Desktop + Mobile)', 'Figma · Whimsical · Photoshop'],
    status: 'SHIPPED',
    metrics: [
      { value: '40+',   label: 'screens shipped' },
      { value: '5',     label: 'core flows' },
      { value: '8 wks', label: 'zero to production' },
    ],
    bg: 'hsl(22,100%,95%)',
    accentBg: '#FEF3E2',
    sections: [
      { id: 'overview',     label: 'Overview' },
      { id: 'research',     label: 'Research' },
      { id: 'sol-card',     label: 'Product card' },
      { id: 'sol-pdp',      label: 'PDP' },
      { id: 'sol-checkout', label: 'Checkout' },
      { id: 'sol-cart',     label: 'Cart' },
      { id: 'sol-post',     label: 'Post-purchase' },
      { id: 'reflection',   label: 'Reflection' },
    ],
    content: [
      {
        id: 'overview', heading: 'Overview',
        body: `Buzztro's model is collective buying -shoppers pool demand so the price drops when enough people commit. Simple on paper. The design problem was making a conditional, community-driven pricing model feel trustworthy and rewarding rather than confusing or pressuring.\n\nSolo designer on a 2-month contract, direct to founder. Competitor research, information architecture, wireframes, and 40+ high-fidelity screens across 5 core flows. Shipped to production.`,
        highlight: null, quote: null, image: null,
      },
      {
        id: 'research', heading: 'Research',
        body: `Mapped how group-buying platforms handle the pool mechanic across markets -Pinduoduo, Meesho, DealShare, Groupon -looking at which moments they explained, which they hid, and where the experience broke down.\n\n**The price doesn't match the label.** Most platforms show a discounted price on the card, but it's conditional. When users noticed this at checkout, trust collapsed. The fix had to happen upstream.\n\n**Pool status is buried.** How many joined? How many more needed? These questions decide whether a user commits -and were routinely hidden until after add-to-cart.\n\n**Post-purchase is an afterthought.** Waiting is the product for collective buying -that's where the shopper lives for hours after payment. It needed its own design, not a generic confirmation screen.`,
        highlight: "The design problem was not building an e-commerce app. It was making a conditional, community-driven pricing model feel trustworthy.",
        quote: { text: "The price isn't a number on the card. It's a promise the platform can only keep if the community keeps it first.", attribution: 'Design principle, week 1' },
        image: '/buzztro/pdp-states.png',
      },
      {
        id: 'sol-card', heading: 'Solution 1: Product card',
        body: `The card had to carry three things a normal card doesn't: current pool fill, the price it unlocks, and proximity to the next tier -without becoming cluttered.\n\nThe version that shipped places the progress indicator beneath the product title -current price on one side, target price on the other, "X joined, Y more to unlock" completing the picture. Cards became taller than standard. That's the right trade-off. If the progress bar isn't readable at a glance, it's not Buzztro anymore.`,
        highlight: null, quote: null, image: '/buzztro/card-system.png',
      },
      {
        id: 'sol-pdp', heading: 'Solution 2: Product detail page',
        body: `Standard PDP hierarchy: image, title, price, CTA. On Buzztro, price is the output of a live community pool -which required inverting that hierarchy entirely.\n\nThe circular gauge sits directly under the title -a live readout of pool fill with the discounted target alongside. One glance and the mechanic is understood without reading any copy. Below the fold: familiar e-commerce patterns. Novelty only where it earns its place.`,
        highlight: null, quote: null, image: '/buzztro/pdp-overview.png',
      },
      {
        id: 'sol-checkout', heading: 'Solution 3: Checkout',
        body: `This is a conditional commitment -paying today for something that ships only if the pool fills. That rewrites almost every trust signal a user expects from checkout.\n\nMulti-step structure: address, payment, review -with pool state persistent throughout. The most-reviewed piece of copy in the project: what happens if the pool doesn't fill ("your payment is held and refunded automatically"). If that sentence was confusing, the trust story collapsed. CTA shifted from "Pay now" to "Pay and join the pool."`,
        highlight: null, quote: null,
        images: ['/buzztro/booking-checkout-mobile.png', '/buzztro/booking-checkout-desktop.png'],
      },
      {
        id: 'sol-cart', heading: 'Solution 4: Cart',
        body: `Buzztro's cart is closer to a waiting room than a holding area -items the user has committed to, each with its own live pool state and potential final price.\n\nPer-item pool status instead of a flat line-item list. Totals show two numbers: what you pay at current pool levels, and what you'd pay if every pool fills. The refund language appears here too, before checkout -setting expectations early rather than surprising users in the final step.`,
        highlight: null, quote: null, image: '/buzztro/checkout-address.png',
      },
      {
        id: 'sol-post', heading: 'Solution 5: Post-purchase',
        body: `Between payment and shipment, a Buzztro customer lives in a waiting state that can last hours or days. If it feels empty, users assume something broke.\n\nThe order status screen shows live pool fill, countdown to close, current price band, and a share CTA. That share action isn't a growth mechanic bolted on -it's the most useful thing the user can actually do in that moment. Two additional states designed in full: pool filled and pool failed. Both are full screens. Neither is a toast.`,
        highlight: null, quote: null,
        images: ['/buzztro/order-waiting.png', '/buzztro/order-details.png'],
      },
      {
        id: 'reflection', heading: 'Reflection',
        body: `The pool progress bar was the thesis of the entire product. Once I committed to making it the primary signal on every surface, every other decision got easier -hierarchy, copy, layout all resolved against it. A single strong principle does that.\n\nThe post-purchase state nearly became an afterthought. Sitting with the flow as a user changed that. For a platform where purchase is conditional, the hours after checkout are where the actual experience lives.\n\n**Outcome:** The product worked. Users understood the pool mechanic without reading copy. The gauge did the explaining. The company eventually paused on funding -a market reality, not a product one.`,
        highlight: null, quote: null, image: null,
      },
    ],
  },

  'zu-ai': {
    slug: 'zu-ai',
    category: 'Case study · Product Design',
    title: 'Zu-AI',
    subtitle: 'Chat Experience Redesign',
    tags: ['Product Designer', 'March 2024 · 2 weeks', 'Mobile App (iOS/Android)', 'Figma · Microsoft Fluent 2'],
    status: 'SHIPPED',
    metrics: [
      { value: '40%', label: 'faster scanning' },
      { value: '3x',  label: 'task completion' },
      { value: '50%', label: 'less context-switching' },
    ],
    bg: 'hsl(260,60%,97%)',
    accentBg: '#F0EEFF',
    sections: [
      { id: 'overview',   label: 'Overview' },
      { id: 'research',   label: 'Research' },
      { id: 'sol-chat',   label: 'Chat redesign' },
      { id: 'sol-dash',   label: 'Dashboard' },
      { id: 'sol-access', label: 'Accessibility' },
      { id: 'reflection', label: 'Reflection' },
    ],
    content: [
      {
        id: 'overview', heading: 'Overview',
        body: `Zu-AI had 100K+ students using it as a learning tool. The concept was solid. The experience wasn't -walls of unformatted text, no memory between sessions, no personalisation, no signal for when to trust what the AI said. Sessions were getting abandoned.\n\nI redesigned the chat interface from the ground up in 2 weeks. Research with 33 participants (10 interviews, 23 survey responses). Hard constraint: couldn't touch the AI model. Every problem had to be solved at the interface layer.`,
        highlight: null, quote: null, image: null,
      },
      {
        id: 'research', heading: 'What I found',
        body: `Started with 100+ app store reviews before any interviews -gives signal to direct sessions toward real friction rather than general impressions.\n\n**Information overload -60% of respondents.** Responses arrived as long unbroken blocks of text with no headings or hierarchy. Students were skimming and giving up.\n\n**No personalisation -40%.** No memory between sessions, no dark mode, no text size controls, no way to adjust how the AI addressed you.\n\nSmaller issues that compounded: no encryption indicator in settings, no disclaimer that the AI could be wrong, friction when switching subjects. Together they made the experience feel untrustworthy and unfinished.`,
        highlight: "Information overload was the number one complaint -and none of it required changing the AI itself.",
        quote: { text: "I want to feel like I'm talking to a friend when I use it, but it feels too robotic.", attribution: 'Zu-AI user, survey' },
        image: '/ZA2_Research.png',
      },
      {
        id: 'sol-chat', heading: 'Solution 1: Chat redesign',
        body: `**Problem:** Everything looked identical -same weight, same size, no entry points for scanning. Students weren't reading, they were skimming and giving up.\n\n**Fix:** Structured responses into sections with clear headings and visual separators. Typography differentiates heading, body, and code. Quick-action buttons -"Explain this further", "Show an example" -added during testing after noticing users pausing not because they were reading, but because they were figuring out what to ask next. They became the most-used feature in testing.`,
        highlight: null, quote: null, image: '/ZA4_Redesign.png',
      },
      {
        id: 'sol-dash', heading: 'Solution 2: ChatBot dashboard',
        body: `**Problem:** Every session started from blank. No way to pick up where you left off across subjects.\n\n**Fix:** Persistent conversation contexts -visual cards per subject with last message preview, quick-switch between threads, search for past explanations, auto-categorisation by subject. The framing: your study context should work the way your notes do. You don't start a new notebook every day.`,
        highlight: null,
        quote: { text: "I wish it could understand my schedule better. It's frustrating having to repeat my tasks every time I log in.", attribution: 'Zu-AI user, survey' },
        image: '/ZA5_Dashboard.png',
      },
      {
        id: 'sol-access', heading: 'Solution 3: Accessibility & trust',
        body: `**Problem:** No customisation. No way to adjust text size, switch themes, or set preferences. And no signal for when the AI might be wrong.\n\n**Fix:** Dark/light toggle, 4 text size presets, custom avatars, name personalisation. WCAG 2.1 AA compliance. And two trust features that almost didn't make the cut: a visible encryption badge, and an inline disclaimer -"AI can make mistakes -verify important information."\n\nIn testing, the disclaimer was mentioned most positively by every participant. Setting honest expectations increased trust more than anything visual I designed. Transparency is a design element.`,
        highlight: null, quote: null,
        images: ['/ZA6_Accessibility.png', '/ZA7_Key_decisions.png'],
      },
      {
        id: 'reflection', heading: 'Reflection',
        body: `The disclaimer moment was the most unexpected part. I added it as an afterthought. It became the thing every test participant mentioned positively. Trust went up because expectations went down.\n\nThe quick-action buttons were a last-minute addition. They became the most-used feature. I went in thinking visual hierarchy was the main deliverable -I came out knowing the interaction model mattered more.\n\n**Results:** 40% faster information scanning. 3x task completion speed. 50% reduction in context-switching time. The constraint of not touching the AI turned out to be the most useful thing -it forced every solution into the interface layer, where design actually lives.`,
        highlight: null,
        quote: { text: "Quick prompts are a game-changer. I don't have to think about what to ask next.", attribution: 'Zu-AI user, usability test' },
        image: null,
      },
    ],
  },
}

function LazyEmbed({ embeds, accentBg }: { embeds: { src: string; label: string }[]; accentBg: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, margin: '32px 0' }}>
      {embeds.map((e, i) => <LazyEmbedFrame key={i} src={e.src} label={e.label} accentBg={accentBg} />)}
    </div>
  )
}

function LazyEmbedFrame({ src, label, accentBg }: { src: string; label: string; accentBg: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    // Mount the iframe only while it is on screen; unmount when it scrolls away,
    // so at most one or two engine render-loops ever run at once (mobile-safe).
    const io = new IntersectionObserver(
      entries => entries.forEach(en => setActive(en.isIntersecting)),
      { rootMargin: '200px 0px', threshold: 0.01 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <div ref={ref} style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid hsl(0,0%,18%)', background: accentBg }}>
      <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%', background: '#05050c' }}>
        {active ? (
          <iframe src={src} title={label} loading="lazy"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0, display: 'block' }} />
        ) : (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'hsl(0,0%,45%)', fontFamily: f, fontSize: 12, letterSpacing: '0.04em' }}>
            ● loading engine…
          </div>
        )}
      </div>
      <p style={{ fontFamily: f, fontSize: 11, color: 'hsl(0,0%,55%)', margin: 0, padding: '10px 14px', borderTop: '1px solid hsl(0,0%,16%)' }}>
        {label} <span style={{ color: 'hsl(0,0%,38%)' }}>· live prototype, simulated audio</span>
      </p>
    </div>
  )
}

function LazyVideo({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      entries => entries.forEach(en => {
        if (en.isIntersecting) { el.play().catch(() => {}) } else { el.pause() }
      }),
      { threshold: 0.35 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <div style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid hsl(0,0%,88%)', margin: '32px 0', background: '#0a0a0a' }}>
      <video ref={ref} src={src} muted loop playsInline preload="metadata"
        style={{ width: '100%', display: 'block' }} />
    </div>
  )
}

function DiagramStrip({ keys }: { keys: string[] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, margin: '32px 0' }}>
      {keys.map((k, i) => (
        <div key={i} style={{ borderRadius: 14, overflow: 'hidden', border: '1px solid hsl(0,0%,88%)', background: 'hsl(0,0%,99%)' }}
          dangerouslySetInnerHTML={{ __html: DIAGRAMS[k] || '' }} />
      ))}
    </div>
  )
}

function SingleImage({ src, accentBg }: { src: string; accentBg: string }) {
  return (
    <div style={{ margin: '32px 0', borderRadius: 16, overflow: 'hidden', border: '1px solid hsl(0,0%,90%)', background: accentBg }}>
      <img src={src} alt="" style={{ width: '100%', height: 'auto', display: 'block' }}
        onError={e => { (e.target as HTMLImageElement).parentElement!.style.display = 'none' }} />
    </div>
  )
}

function ImageStrip({ images, accentBg }: { images: string[]; accentBg: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, margin: '32px 0' }}>
      {images.map((src, i) => (
        <div key={i} style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid hsl(0,0%,90%)', background: accentBg }}>
          <img src={src} alt="" style={{ width: '100%', height: 'auto', display: 'block' }}
            onError={e => { (e.target as HTMLImageElement).parentElement!.style.display = 'none' }} />
        </div>
      ))}
    </div>
  )
}

export default function CaseStudyPage() {
  const { slug } = useParams<{ slug: string }>()
  const cs = slug ? CASE_STUDIES[slug] : undefined
  const [activeSection, setActiveSection] = useState(cs?.sections[0]?.id ?? '')
  const isMobile = useIsMobile()

  useEffect(() => { window.scrollTo(0, 0) }, [slug])

  useEffect(() => {
    if (!cs) return
    const handleScroll = () => {
      for (let i = cs.sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(cs.sections[i].id)
        if (el && el.getBoundingClientRect().top <= 140) { setActiveSection(cs.sections[i].id); break }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [cs])

  if (!cs) return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: f }}>
      <div style={{ textAlign: 'center' }}>
        <p style={{ color: 'hsl(0,0%,55%)', marginBottom: 16 }}>Case study not found.</p>
        <Link to="/#work" style={{ fontFamily: f, fontSize: 14, color: 'hsl(0,0%,8%)', textDecoration: 'underline' }}>← Back to work</Link>
      </div>
    </main>
  )

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:ital,wght@0,300;1,300;1,400&display=swap');`}</style>
      <main style={{ backgroundColor: 'hsl(0,0%,98%)', minHeight: '100vh', fontFamily: f }}>

        {/* Top bar */}
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: isMobile ? '14px 16px' : '18px 32px', borderBottom: '1px solid hsl(0,0%,92%)', background: 'rgba(250,250,248,0.92)', backdropFilter: 'blur(12px)' }}>
          <Link to="/#work" style={{ fontFamily: f, fontSize: 13, color: 'hsl(0,0%,45%)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6, transition: 'color 0.15s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'hsl(0,0%,8%)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'hsl(0,0%,45%)' }}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 4L6 8l4 4"/></svg>
            Back
          </Link>
          {!isMobile && <span style={{ fontFamily: f, fontSize: 11, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'hsl(0,0%,55%)' }}>{cs.category}</span>}
          <span style={{ fontFamily: f, fontSize: 12, color: 'hsl(0,0%,55%)' }}>{cs.tags[1]}</span>
        </div>

        {/* Hero */}
        <div style={{ background: cs.bg, padding: isMobile ? '88px 20px 50px' : '120px 32px 80px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
                <span style={{ padding: '5px 12px', borderRadius: 9999, background: 'hsl(0,0%,8%)', color: 'white', fontFamily: f, fontSize: 11, fontWeight: 600, letterSpacing: '0.06em' }}>{cs.status}</span>
                {cs.tags.map(tag => (
                  <span key={tag} style={{ padding: '5px 12px', borderRadius: 9999, background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(0,0,0,0.1)', color: 'hsl(0,0%,35%)', fontFamily: f, fontSize: 11 }}>{tag}</span>
                ))}
              </div>
              <h1 style={{ fontFamily: f, fontSize: 'clamp(2.2rem,4.5vw,4rem)', fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1.1, color: 'hsl(0,0%,8%)', margin: '0 0 16px', maxWidth: 700 }}>
                {cs.title}
                <span style={{ display: 'block', fontFamily: fs, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(1.4rem,3vw,2.4rem)', color: 'hsl(0,0%,35%)', marginTop: 8 }}>{cs.subtitle}</span>
              </h1>
              <div style={{ display: 'flex', gap: isMobile ? 28 : 48, marginTop: isMobile ? 32 : 48, flexWrap: 'wrap' }}>
                {cs.metrics.map(m => (
                  <div key={m.label}>
                    <div style={{ fontFamily: f, fontSize: 'clamp(2rem,4vw,3.2rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1, color: 'hsl(0,0%,8%)' }}>{m.value}</div>
                    <div style={{ fontFamily: f, fontSize: 11, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'hsl(0,0%,55%)', marginTop: 6 }}>{m.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Content grid */}
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: isMobile ? '50px 20px 80px' : '80px 32px 120px', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '200px 1fr', gap: isMobile ? '36px 0' : '0 80px', alignItems: 'start' }}>
          {!isMobile && (
            <aside style={{ position: 'sticky', top: 80 }}>
              <nav style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {cs.sections.map(s => (
                  <button key={s.id} onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                    style={{ display: 'block', width: '100%', textAlign: 'left', fontFamily: f, fontSize: 13, lineHeight: 1.5, color: activeSection === s.id ? 'hsl(0,0%,8%)' : 'hsl(0,0%,60%)', fontWeight: activeSection === s.id ? 600 : 400, background: 'none', border: 'none', cursor: 'pointer', padding: '5px 0', transition: 'color 0.15s' }}>
                    {s.label}
                  </button>
                ))}
              </nav>
              <div style={{ height: 1, background: 'hsl(0,0%,90%)', margin: '28px 0' }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[{ label: 'Role', value: cs.tags[0] }, { label: 'Tools', value: cs.tags[3] || '' }, { label: 'Platform', value: cs.tags[2] || '' }].map(item => (
                  <div key={item.label}>
                    <p style={{ fontFamily: f, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'hsl(0,0%,55%)', margin: '0 0 3px' }}>{item.label}</p>
                    <p style={{ fontFamily: f, fontSize: 13, color: 'hsl(0,0%,25%)', margin: 0 }}>{item.value}</p>
                  </div>
                ))}
              </div>
              {cs.liveUrl && (
                <a href={cs.liveUrl} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 28, padding: '12px 16px', borderRadius: 10, background: 'hsl(0,0%,8%)', color: 'white', fontFamily: f, fontSize: 13, fontWeight: 600, letterSpacing: '0.01em', textDecoration: 'none', transition: 'opacity 0.15s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.85' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1' }}>
                  Try it live
                  <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M6 4l4 4-4 4"/></svg>
                </a>
              )}
            </aside>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? 48 : 72 }}>
            {cs.content.map((section, i) => (
              <motion.section key={section.id} id={section.id}
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.03, duration: 0.45 }}
                style={{ scrollMarginTop: 100 }}>
                <h2 style={{ fontFamily: f, fontSize: 'clamp(1rem,1.6vw,1.25rem)', fontWeight: 700, letterSpacing: '-0.01em', color: 'hsl(0,0%,8%)', margin: '0 0 20px' }}>{section.heading}</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {section.body.split('\n\n').map((para, j) => (
                    <p key={j} style={{ fontFamily: f, fontSize: isMobile ? 15 : 16, color: 'hsl(0,0%,25%)', lineHeight: isMobile ? 1.7 : 1.75, margin: 0 }}
                      dangerouslySetInnerHTML={{ __html: para.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') }} />
                  ))}
                </div>
                {section.highlight && (
                  <div style={{ margin: '28px 0', padding: '20px 24px', borderLeft: '3px solid hsl(0,0%,8%)', background: 'hsl(0,0%,96%)' }}>
                    <p style={{ fontFamily: fs, fontStyle: 'italic', fontWeight: 300, fontSize: 17, color: 'hsl(0,0%,15%)', lineHeight: 1.65, margin: 0 }}>
                      <mark style={{ background: 'rgba(245,230,66,0.4)', color: 'inherit', padding: '0 3px', borderRadius: 3 }}>{section.highlight}</mark>
                    </p>
                  </div>
                )}
                {section.quote && (
                  <div style={{ margin: '28px 0', padding: '20px 24px', background: 'hsl(0,0%,97%)', border: '1px solid hsl(0,0%,90%)', borderRadius: 12 }}>
                    <p style={{ fontFamily: f, fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'hsl(0,0%,55%)', margin: '0 0 12px' }}>User quote</p>
                    <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                      <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'hsl(0,0%,88%)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>😶</div>
                      <p style={{ fontFamily: f, fontSize: 14, color: 'hsl(0,0%,20%)', lineHeight: 1.65, margin: 0 }}>"{section.quote.text}"</p>
                    </div>
                    <p style={{ fontFamily: f, fontSize: 11, color: 'hsl(0,0%,55%)', margin: '10px 0 0', paddingLeft: 40 }}>-{section.quote.attribution}</p>
                  </div>
                )}
                {section.video && <LazyVideo src={section.video} />}
                {section.svgs && section.svgs.length > 0 && <DiagramStrip keys={section.svgs} />}
                {section.embeds && section.embeds.length > 0 && <LazyEmbed embeds={section.embeds} accentBg={cs.accentBg} />}
                {section.images && section.images.length > 0 && <ImageStrip images={section.images} accentBg={cs.accentBg} />}
                {!section.images && section.image && <SingleImage src={section.image} accentBg={cs.accentBg} />}
              </motion.section>
            ))}

            {cs.liveUrl && (
              <a href={cs.liveUrl} target="_blank" rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, padding: isMobile ? '18px 24px' : '20px 28px', borderRadius: 14, background: 'hsl(0,0%,8%)', color: 'white', fontFamily: f, fontSize: isMobile ? 15 : 16, fontWeight: 600, textDecoration: 'none', transition: 'opacity 0.15s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.85' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1' }}>
                Try Music Animate live
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M6 4l4 4-4 4"/></svg>
              </a>
            )}

            <div style={{ paddingTop: 32, borderTop: '1px solid hsl(0,0%,90%)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Link to="/#work" style={{ fontFamily: f, fontSize: 14, color: 'hsl(0,0%,55%)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'hsl(0,0%,8%)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'hsl(0,0%,55%)' }}>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 4L6 8l4 4"/></svg>
                All work
              </Link>
              {(() => {
                const keys = Object.keys(CASE_STUDIES)
                const idx = keys.indexOf(slug ?? '')
                const nextKey = keys[idx + 1]
                if (!nextKey) return null
                const next = CASE_STUDIES[nextKey]
                return (
                  <Link to={`/case-study/${nextKey}`} style={{ fontFamily: f, fontSize: 14, color: 'hsl(0,0%,55%)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'hsl(0,0%,8%)' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'hsl(0,0%,55%)' }}>
                    Next: {next.title}
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 4l4 4-4 4"/></svg>
                  </Link>
                )
              })()}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
