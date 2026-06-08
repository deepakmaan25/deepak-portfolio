import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useIsMobile } from '../hooks/useMediaQuery'

const f  = "'Overused Grotesk', Inter, system-ui, sans-serif"
const fs = "'IBM Plex Serif', Georgia, serif"

// ─── Types ────────────────────────────────────────────────────────────────────
interface Quote { text: string; attribution: string }
interface Section {
  id: string
  heading: string
  body: string
  highlight?: string | null
  quote?: Quote | null
  image?: string | null
  images?: string[]
}
interface CaseStudy {
  slug: string
  category: string
  title: string
  subtitle: string
  tags: string[]
  status: string
  metrics: { value: string; label: string }[]
  bg: string
  accentBg: string
  sections: { id: string; label: string }[]
  content: Section[]
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const CASE_STUDIES: Record<string, CaseStudy> = {
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
      { id: 'overview',    label: 'Overview' },
      { id: 'research',    label: 'Research' },
      { id: 'priorities',  label: 'Prioritisation' },
      { id: 'sol-1',       label: 'Job descriptions' },
      { id: 'sol-2',       label: 'Dark mode' },
      { id: 'sol-3',       label: 'Resumes' },
      { id: 'sol-4',       label: 'Save All' },
      { id: 'sol-5',       label: 'Communication' },
      { id: 'testing',     label: 'Testing' },
      { id: 'parallel',    label: 'Parallel work' },
      { id: 'reflection',  label: 'Reflection' },
    ],
    content: [
      {
        id: 'overview',
        heading: 'Overview',
        body: `Tech Japan connects engineering students from IITs with Japanese companies looking to hire. The platform had a real use case, but the experience was letting it down. Users were running into broken company links, unreadable text in dark mode, no way to manage multiple resumes, and a post-application process that moved entirely to WhatsApp. Small things on their own — but together they were making the platform feel untrustworthy and unfinished.\n\nI spent two months researching these issues with 10 IIT students, documented 9 distinct pain points with supporting evidence, and designed fixes for the most critical ones. Several shipped to production — including the job description layout, accessibility improvements, Save All profile flow, and the communication tool.\n\nI was the sole researcher. I recruited participants, ran the interviews, synthesized everything into something actionable, designed the solutions in Figma, and presented findings to the team. In parallel I ran a rebranding survey as the company transitioned from Tech Japan to Talendy, and designed a recruiter-side hiring dashboard.`,
        highlight: null,
        quote: null,
        image: '/01-project-overview.png',
      },
      {
        id: 'research',
        heading: 'Understanding the problem',
        body: `I started with a simple question: why would a well-qualified IIT student abandon an application on a platform that could get them an international job?\n\nTo find out, I ran 1:1 interviews with 10 students from IIT Dhanbad, Roorkee, Guwahati, Delhi, Hyderabad, and Bombay — 8 final year, 2 pre-final year, all actively job hunting or recently placed. I chose IIT students because they're the platform's core users, and they've used enough polished products to notice when something feels off.\n\n**Dark mode issues — 7 of 10 users.** Text contrast was so low that sections were completely unreadable. On internship detail and company pages, some text simply couldn't be read. Beyond the usability problem, it looked unfinished.\n\n**Broken company links — 6 users.** For a user evaluating whether to trust a company enough to apply, a broken link at exactly that moment is a serious problem. Several users said it made them question whether the companies listed were even real.\n\n**Job description layout — 4 users.** The layout was functional for someone willing to read every detail, but for anyone doing a quick scan, the information wasn't organised in a way that helped them decide if a role was worth pursuing.\n\n**WhatsApp handoff — 4 users.** Post-application, everything moved to WhatsApp. Users flagged it as unprofessional and said it made the whole flow feel disconnected.\n\n**Multiple resumes — 3 users.** Students apply to very different roles — design, development, analytics, business — and want to tailor their resume accordingly. The platform only allowed one.\n\n**Save profile — 2 users.** Every section of the profile had to be saved individually. Missing one save meant losing that section's data entirely.`,
        highlight: "The most important signal wasn't what users said they wanted. It was the moment they stopped trusting the platform.",
        quote: { text: "While clicking on a company's link, it takes you to a new page but you can't see any meaningful data — it shows an error every time. It leads to doubting the company's legitimacy.", attribution: 'IIT student, 4th year' },
        image: '/02-pain-point-frequency.png',
      },
      {
        id: 'priorities',
        heading: 'What I prioritised and why',
        body: `With 9 issues documented, I used a MoSCoW framework to decide where to focus first.\n\nThe broken company links and dark mode contrast went to the top. Both were creating moments where users either couldn't use the platform or actively lost trust in it — and trust is hard to rebuild once it's gone. Fixing a layout is recoverable. Having a user think a platform is showing them fake companies is much harder to come back from.\n\nThe Save All profile flow and multiple resume management came next — both were generating real frustration during the most important interaction on the platform. The communication tool was scoped as a "should have" given the development effort involved, but the user signal for it was strong enough to make it into the final recommendations.`,
        highlight: null,
        quote: { text: "Once I apply, all communication happens on WhatsApp, which feels unprofessional. The flow kind of hinders.", attribution: 'IIT student, final year' },
        image: '/03-wireframe-to-hifi.png',
      },
      {
        id: 'sol-1',
        heading: 'Solution 1: Job description layout',
        body: `**The problem:** Company requirements, role details, compensation, and application instructions were all presented as a single unformatted block. Users who were willing to read carefully could get through it, but anyone doing a quick scan couldn't assess a role at a glance.\n\n**What I designed:** A restructured layout that breaks job information into clearly labelled sections — role overview, company details, requirements, how to apply. The company links were also fixed to actually resolve, which addressed the legitimacy concern several users raised.\n\nStudents were trying to answer two questions quickly: is this role right for me, and is this company legitimate? The redesign made both answerable without reading the full page.`,
        highlight: null,
        quote: null,
        image: '/04-job-description-before-after.png',
      },
      {
        id: 'sol-2',
        heading: 'Solution 2: Dark mode & accessibility',
        body: `**The problem:** 7 of 10 users flagged dark mode as broken. On internship detail pages and company profiles, contrast ratios were low enough to make text genuinely unreadable. The most affected users were studying late at night — exactly the audience most likely to have dark mode enabled.\n\n**What I designed:** I walked through the platform in dark mode screen by screen and mapped every contrast failure before opening Figma. Updated color values to meet WCAG 2.1 AA across all affected surfaces. Improved button visibility and standardised how interactive elements were treated across light and dark themes.\n\nThis is the kind of issue that's invisible if you only test in optimal conditions, and obvious the moment you sit with a real user in their actual environment.`,
        highlight: null,
        quote: null,
        image: '/05-dark-mode-before-after.png',
      },
      {
        id: 'sol-3',
        heading: 'Solution 3: Multiple resume management',
        body: `**The problem:** IIT students apply across several different tracks — product, software engineering, design, analytics. Each needs a tailored resume. The platform only supported one, and swapping it out required downloading, renaming, and re-uploading a new file every time.\n\n**What I designed:** A resume library within the profile where users can upload and label multiple versions — "Product Resume", "Dev Resume", "General" — and choose the right one at the point of application without navigating away from the job page.\n\nStudents already had multiple resume versions. The platform was adding unnecessary friction on top of a workflow they had already figured out for themselves.`,
        highlight: null,
        quote: { text: "I need to upload different resumes for different profiles. There's no way to do that here.", attribution: 'IIT student, pre-final year' },
        image: '/06-resume-management.png',
      },
      {
        id: 'sol-4',
        heading: 'Solution 4: Save All profile flow',
        body: `**The problem:** Profile completion required a separate save action after each section. Forgetting to save one section — easy to do when you're filling in a long form — meant losing that data silently. Two users described abandoning profile completion because of it.\n\n**What I designed:** A single Save All action that captures the full profile state at once, with unsaved-change indicators so users can see at a glance what's pending. A confirmation message appears after saving so users know their data was actually captured.\n\nThe issue was a mismatch between how users thought about their profile (as one thing they're filling out) and how the system treated it (a series of independent saves with no relationship to each other).`,
        highlight: null,
        quote: { text: "Building my profile was painful. I had to save each section separately, and if I forgot once, I had to rewrite everything.", attribution: 'IIT student, final year' },
        image: '/07-save-all-flow.png',
      },
      {
        id: 'sol-5',
        heading: 'Solution 5: Built-in communication tool',
        body: `**The problem:** Once a candidate applied, all recruiter communication moved to WhatsApp — interview scheduling, task assignments, status updates. Users described it as unprofessional and said it made the hiring process feel disconnected.\n\nWhat I framed for the team: this wasn't just a UX complaint. It meant Tech Japan had zero visibility into what happened after someone applied. Every follow-up, every offer, every rejection — all happening in a chat app they had no access to.\n\n**What I designed:** An in-platform messaging and notification system that keeps all hiring communication in one place — status updates, document requests, direct messages with HRs, interview scheduling. Users stay inside the platform through the full process instead of being handed off to a separate app.\n\n"Users want better chat" is a feature request. "You have no visibility into what happens after someone applies" is a business case. The reframe is what got it prioritised.`,
        highlight: 'The WhatsApp finding landed when I framed it as: you have zero visibility into what happens after someone applies.',
        quote: null,
        image: '/08-communication-tool.png',
      },
      {
        id: 'testing',
        heading: 'Testing & results',
        body: `After designing the solutions, I ran another round of testing with participants from the same pool — 10 users from IITs, selected for their familiarity with the platform and similar products.\n\n**80% of participants reported that navigation felt easier**, particularly around the job categorisation and new layout. **70% actively used the resume management and communication features** during the session without being prompted — a strong signal that they were filling a real need, not just something that looked useful in a demo.\n\nThe feedback also surfaced what still needed work: button visibility in dark mode in some spots, tooltips for new features could be clearer, and the mobile experience needed a more comprehensive fix than individual patches.\n\nSeveral fixes shipped to production during and after the internship — job description layout, dark mode fixes, Save All, and the communication tool.`,
        highlight: null,
        quote: null,
        image: null,
      },
      {
        id: 'parallel',
        heading: 'Parallel work: rebranding & recruiter dashboard',
        body: `**Rebranding survey:** Alongside the platform research, I ran a 10+ question survey to gauge awareness and perception of the Tech Japan → Talendy rebrand.\n\nThe headline finding: 71% of respondents hadn't heard about the rebrand at all. Of those who had, 64.5% found out through friends or peers — almost no one through official channels. The brand appeal rating averaged 3.6 out of 5. The main recommendation was that the brand needed a proper launch strategy, not just a name change.\n\n**Recruiter-side dashboard:** I also designed a hiring dashboard for Tech Japan's internal team — managing application volume, screening candidates consistently, and keeping hiring timelines on track. From 50+ survey responses and recruiter interviews, 72% advocated for a detailed feedback mechanism and 60% wanted better transparency into the review process.\n\nWorking on both sides gave me a clearer picture of where friction actually lived — candidates didn't know where they stood, and recruiters didn't have the tools to tell them.`,
        highlight: null,
        quote: null,
        images: ['/TJ-rebranding-survey.png'],
      },
      {
        id: 'reflection',
        heading: 'What I took away',
        body: `The biggest thing I learned is that research findings don't speak for themselves. After two months of interviews and a detailed pain point document, the moment that actually moved things forward was a 20-minute presentation where I connected user frustration to something the business cared about. The WhatsApp finding landed when I framed it as "you have no visibility into what happens after someone applies" — not just "users want better chat."\n\nThe broken company link was the other thing that stuck with me. It's not a design problem in the traditional sense — it's a bug. But it was the single thing most likely to make a user close the tab and not come back, because it raised a question about whether the companies were even real. UX research has to account for that kind of thing, not just evaluate screens.\n\n**If I had more time:** The onboarding flow was something I didn't get to properly address — first-time users had no guidance, and the platform assumed a level of familiarity that new candidates didn't have. The mobile responsiveness issues also needed a more thorough fix than individual patches. And the redundant questions problem — where users had to rewrite the same screening answers for every application — was worth a real solution, not just a note in the recommendations doc.`,
        highlight: null,
        quote: null,
        image: null,
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
      { id: 'overview',   label: 'Overview' },
      { id: 'research',   label: 'Research' },
      { id: 'approach',   label: 'Approach' },
      { id: 'sol-card',   label: 'Product card' },
      { id: 'sol-pdp',    label: 'PDP' },
      { id: 'sol-checkout', label: 'Checkout' },
      { id: 'sol-cart',   label: 'Cart' },
      { id: 'sol-post',   label: 'Post-purchase' },
      { id: 'outcome',    label: 'Outcome' },
      { id: 'reflection', label: 'Reflection' },
    ],
    content: [
      {
        id: 'overview',
        heading: 'Overview',
        body: `Buzztro's model is collective buying: shoppers pool demand so that when enough people commit, the unit price drops and everyone wins. The mechanic is simple on paper — more buyers means lower price.\n\nBut no one on the team had seen this pattern land cleanly in the Indian market. Pinduoduo had scaled it aggressively in China. Meesho and DealShare had circled the space here. None translated directly. The risk was threefold: the pool mechanic feels confusing ("why is the price changing?"), pushy ("join now or lose it"), or invisible — where users shop like it's a normal store and miss the benefit entirely.\n\nThe design problem wasn't building an e-commerce app. It was making a conditional, community-driven pricing model feel trustworthy and rewarding rather than confusing or pressuring.\n\nSolo designer on a 2-month freelance contract, reporting directly to the founder. Competitor research, information architecture, flows, wireframes, and high-fidelity design across 40+ screens. Shipped to production.`,
        highlight: null,
        quote: null,
        image: '/buzztro/hero.png',
      },
      {
        id: 'research',
        heading: 'Research',
        body: `Before opening Figma, I mapped how group-buying platforms handle the pool mechanic across markets: Pinduoduo, Meesho, DealShare, and Groupon in its original deal-of-the-day era. Looking less at visual style and more at which moments they explained, which they hid, and where the experience broke down.\n\n**The price doesn't match the label.** Most group-buy platforms show a discounted price on the card, but that price is conditional. You only get it if the pool fills. When users noticed this discrepancy at checkout, trust collapsed entirely. The fix had to happen upstream: the discount should never look like a promise until it actually is one.\n\n**The pool status is buried.** How many people have joined? How many more are needed? When does the pool close? These are the questions that decide whether a user commits — and they were routinely hidden behind a tap or only shown after add-to-cart. Users should see pool state before they even click in.\n\n**Post-purchase is an afterthought.** A pool either fills or it doesn't. Most platforms treat the waiting state as an edge case and ship generic order-confirmed screens. But for collective buying, waiting is the product — that's where the shopper lives for hours or days after payment. It needed its own design.`,
        highlight: "The design problem was not building an e-commerce app. It was making a conditional, community-driven pricing model feel trustworthy.",
        quote: { text: "The price isn't a number on the card. It's a promise the platform can only keep if the community keeps it first.", attribution: 'Design principle, established in week 1' },
        image: '/buzztro/pdp-states.png',
      },
      {
        id: 'approach',
        heading: 'Design approach',
        body: `One principle I committed to early: pool progress should be the single most visible element on any Buzztro screen where a product exists. Not the discount, not the CTA, not the photo — the progress indicator.\n\nMost group-buy platforms hero the discounted price and treat the pool as supporting information. I inverted it: the price is the consequence, the pool is the cause, and the cause should lead.\n\n**Show the state, not the sell.** Every product surface shows pool progress first. Users always know where they stand before they see what it costs.\n\n**Urgency without pressure.** No flashing timers, no red everything. Pool progress uses motion and colour sparingly — it rewards rather than stresses.\n\n**Commit, don't transact.** Checkout language shifts from "Buy now" to "Join the pool." Small, deliberate, and signals exactly what the user is doing.`,
        highlight: null,
        quote: null,
        image: '/buzztro/card-system.png',
      },
      {
        id: 'sol-card',
        heading: 'Solution 1: The product card',
        body: `The card is the workhorse of any e-commerce UI. On Buzztro, it had to carry three things a normal card doesn't: current pool fill, the conditional price it unlocks, and how close the user is to the next price tier — all without becoming cluttered.\n\nI tested a few configurations: a circular progress ring, a stacked layout with the bar below the CTA, and a minimal variant that hid progress until hover. The version that shipped places the progress indicator prominently beneath the product title, with the current price on one side and the target discounted price on the other. A "X joined, Y more to unlock" label completes the picture.\n\nThe trade-off: cards became taller than a standard grid card. I pushed back on the instinct to shrink them. If the progress indicator isn't readable at a glance, the product isn't Buzztro anymore — it's a worse Amazon. The extra height is the entire business model made visible.`,
        highlight: null,
        quote: null,
        image: '/buzztro/card-system.png',
      },
      {
        id: 'sol-pdp',
        heading: 'Solution 2: Product detail page',
        body: `On a standard PDP, the hierarchy is: image, title, price, CTA, everything else. On Buzztro, price isn't a static value — it's the output of a live community pool. That required a fundamentally different information hierarchy.\n\nI reworked the PDP so the live pool state sits directly under the title — a larger, more detailed version of the card progress indicator, with the current price shown alongside the discounted target the pool will unlock.\n\nThe circular gauge became the signature visual of the whole product. One glance and a user understands the entire mechanic without reading a word of copy. Below the fold, the PDP returns to familiar e-commerce patterns: gallery, specifications, reviews, related products. Novelty earns its place only where it's actually needed.`,
        highlight: null,
        quote: null,
        image: '/buzztro/pdp-overview.png',
      },
      {
        id: 'sol-checkout',
        heading: 'Solution 3: Checkout',
        body: `Buzztro's checkout is not a standard transaction. It's a conditional commitment. The user is paying today for something that ships only if the pool fills. That single difference rewrites almost every trust signal the user expects from a checkout flow.\n\nThe flow settled at a clear multi-step structure: address, payment, review — with a persistent summary that keeps pool state visible throughout. The user never loses sight of what they're joining, even while filling in delivery details.\n\nThe most reviewed piece of copy in the entire project: a small note explaining what happens if the pool doesn't fill ("your payment is held and refunded automatically"). If that sentence was confusing, the entire trust story fell apart. Every word was tested. The CTA language also shifted: "Pay and join the pool" instead of "Pay now" — a small change that did real work every time I watched someone click it.`,
        highlight: null,
        quote: null,
        images: ['/buzztro/booking-checkout-mobile.png', '/buzztro/booking-checkout-desktop.png'],
      },
      {
        id: 'sol-cart',
        heading: 'Solution 4: Cart',
        body: `A standard cart is a neutral holding area before checkout. Buzztro's cart is closer to a waiting room: items the user has committed to joining, each with its own live pool state, each potentially landing at a different final price.\n\nI designed the cart with per-item pool status rather than a flat line-item list. Each row shows the product, current pool fill, and the price band it's sitting in. The totals section shows two numbers: what the user pays today at current pool levels, and what they'd pay if every pool fills. The gap between them is the potential savings — shown clearly, but without the exclamation-mark energy most deal platforms use.\n\nThe explicit refund language also appears here, before checkout. Setting that expectation early — not just in the final review step — reduced the cognitive surprise of "wait, what happens if this doesn't work?" that I'd observed in early walkthroughs.`,
        highlight: null,
        quote: null,
        image: '/buzztro/checkout-address.png',
      },
      {
        id: 'sol-post',
        heading: 'Solution 5: Post-purchase states',
        body: `Between payment complete and order shipped, a Buzztro customer lives in a waiting state that can last hours or days. If that state feels empty, users assume something broke. If it feels alive, they tell friends.\n\nThe order status screen shows live pool fill, a countdown to the pool close, the current price band, and a share CTA that lets users invite others to help fill the pool faster. That share action isn't a growth mechanic bolted on — it's the most useful thing a user can actually do in that moment.\n\nTwo other states needed their own treatment: pool filled (savings confirmed, shipping begins) and pool failed (the refund moment — clear and calm, with a nudge toward a similar pool the user might join instead). Neither can be a toast notification. Both are full screens. The waiting state is where the actual Buzztro experience lives.`,
        highlight: null,
        quote: null,
        images: ['/buzztro/order-waiting.png', '/buzztro/order-details.png'],
      },
      {
        id: 'outcome',
        heading: 'Outcome',
        body: `Buzztro launched and ran in production for several months — a complete end-to-end group-buying platform designed, built, and shipped in 8 weeks from a single designer working directly with the founder.\n\nThe biggest validation: the product worked. Users understood the pool mechanic without reading copy. The gauge did the explaining. The checkout flow held up. Post-purchase states handled the conditional nature of the product without generating confusion the team couldn't handle.\n\nThe company eventually paused on funding — a market and timing reality, not a product one. The design work remains the clearest evidence I have of what it looks like to own an entire product end-to-end, make the hard calls under constraint, and ship something that actually runs.`,
        highlight: null,
        quote: null,
        image: null,
      },
      {
        id: 'reflection',
        heading: 'What I took away',
        body: `This was the first project where I owned every screen of a shipped product from zero. Two months, one designer, one founder, no safety net.\n\nThe pool progress bar wasn't just a component — it was the thesis of the entire product. Once I committed to making it the primary signal on every surface, every other decision got easier. Hierarchy questions became "does this compete with the bar?" Copy questions became "does this explain the bar or distract from it?" A single strong principle resolves a hundred small debates.\n\nThe post-purchase state nearly became an afterthought. I almost shipped a generic order-confirmed screen and moved on. Sitting with the flow as a user changed that. For a platform where the purchase is conditional, the hours after checkout are where the actual experience lives — and where the user either becomes a repeat customer or writes a one-star review.\n\n**If I had more time:** An onboarding flow for first-time users landing on a PDP with no context for the mechanic. Social proof in the waiting state — showing who else joined the pool would turn a solo moment into a shared one, which is the whole point of collective buying.`,
        highlight: null,
        quote: null,
        image: null,
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
      { id: 'overview',    label: 'Overview' },
      { id: 'research',    label: 'Research' },
      { id: 'approach',    label: 'Approach' },
      { id: 'sol-chat',    label: 'Chat redesign' },
      { id: 'sol-dash',    label: 'Dashboard' },
      { id: 'sol-access',  label: 'Accessibility' },
      { id: 'outcome',     label: 'Outcome' },
      { id: 'reflection',  label: 'Reflection' },
    ],
    content: [
      {
        id: 'overview',
        heading: 'Overview',
        body: `Zu-AI had 100K+ students using it as a learning tool. The concept was solid: an AI tutor that makes studying feel less like work. But the experience wasn't delivering on that promise.\n\nStudents were dealing with walls of unformatted text, a chatbot with no memory between sessions, and no way to personalise anything. There was also a quieter problem: they didn't know when to trust what the AI said. No disclaimer. No caveats. No signal that it could be wrong. For a learning tool, that matters.\n\nI redesigned the chat interface from the ground up — improving visual hierarchy, building a conversation dashboard for persistent context, and adding accessibility controls. Hard constraint: I couldn't touch the AI model. Every problem had to be solved at the interface layer.\n\nSole designer on this assessment brief. Two weeks, research to high-fidelity prototype with usability testing.`,
        highlight: null,
        quote: null,
        image: '/ZA1_Hero_Image.png',
      },
      {
        id: 'research',
        heading: 'What I found',
        body: `I started with app store reviews before talking to anyone — 100+ across iOS and Android. It gives enough signal to direct interviews toward real friction rather than asking users to narrate their general experience.\n\n**Information overload — 60% of survey respondents.** Responses arrived as long, unbroken blocks of text. No headings, no visual hierarchy, nothing to help you find the part that mattered. Students weren't reading — they were skimming and giving up.\n\n**No personalisation — 40% of respondents.** The app remembered nothing between sessions. Responses felt generic. No way to adjust text size, switch to dark mode, or even change how the AI addressed you.\n\nSmaller issues that compounded: no visible encryption in settings, no disclaimer that the AI could make mistakes, friction when switching subjects mid-session. None were showstoppers alone. Together they created an experience that felt untrustworthy and unfinished.`,
        highlight: "Information overload was the number one complaint — and none of it required changing the AI itself.",
        quote: { text: "I want to feel like I'm talking to a friend when I use it, but it feels too robotic.", attribution: 'Zu-AI user, survey response' },
        image: '/ZA2_Research.png',
      },
      {
        id: 'approach',
        heading: 'Design approach',
        body: `Three constraints shaped every decision. I couldn't touch the AI model — accuracy and content were out of scope. The timeline was two weeks, research to high-fidelity. And the design system had to align with Microsoft Fluent 2.\n\nThat last constraint was actually useful. Style decisions weren't up for debate. Every choice had to be justified by the research, not by what looked interesting.\n\nThree strategic pillars guided the work:\n\n**Build trust through transparency.** Students needed to know when they could rely on the AI and when to verify what it told them.\n\n**Reduce cognitive load.** Information overload was the number one complaint. Responses needed structure, not just better writing.\n\n**Enable personalisation.** The chat needed to feel like a learning tool that adapted to the student, not a generic Q&A box.`,
        highlight: null,
        quote: { text: "Sometimes it's hard to explain what I need help with, and the chatbot doesn't always understand me. It would be great if it could suggest study resources or explain concepts with visuals.", attribution: 'Zu-AI user, interview' },
        image: '/ZA3_Wireframes.png',
      },
      {
        id: 'sol-chat',
        heading: 'Solution 1: Chat interface redesign',
        body: `**The problem:** The issue wasn't that responses were too long. It was that everything looked identical — same weight, same size, no entry points for someone scanning. A student looking for the answer to a specific sub-question had no choice but to read the whole thing.\n\n**What I designed:** Structured responses into digestible sections with clear headings and visual separators between concepts. Typography now differentiates heading, body, and code blocks. Colour-coding distinguishes message types: explanations, examples, actions. Inline formatting gives the eye somewhere to land immediately.\n\nThe quick-action buttons — "Explain this further", "Show an example" — weren't in the original brief. I added them during testing after noticing students pausing between messages not because they were reading carefully, but because they were figuring out what to ask next. They ended up being the most-used feature in testing, which told me the interaction model mattered more than the visual system.`,
        highlight: null,
        quote: null,
        image: '/ZA4_Redesign.png',
      },
      {
        id: 'sol-dash',
        heading: 'Solution 2: ChatBot dashboard',
        body: `**The problem:** Every new session started from blank. If you were studying Maths one day and Physics the next, the thread of each topic — how you'd been framing questions, where you'd left off — was gone.\n\n**What I designed:** Persistent conversation contexts rather than temporary sessions — the same mental model students already had for their notes. Visual conversation cards per subject show a preview of the last message and a timestamp. Quick-switch between ongoing threads without losing context. Search for past explanations. Bookmarking for things worth keeping. Auto-categorisation by subject with recently-accessed chats surfaced first.\n\nThe framing that drove the design: your study context should work the way your notes do. You don't start a new notebook every day.`,
        highlight: null,
        quote: { text: "I wish the chatbot could understand my schedule better. It's frustrating having to repeat my tasks every time I log in.", attribution: 'Zu-AI user, survey response' },
        image: '/ZA5_Dashboard.png',
      },
      {
        id: 'sol-access',
        heading: 'Solution 3: Accessibility & personalisation',
        body: `**The problem:** Students had diverse needs — some preferred dark mode for late-night studying, others needed larger text. The app offered no customisation. And there was a trust problem: no indication that the AI could ever be wrong.\n\n**What I designed:**\n\n**Visual customisation:** Dark/light mode toggle, four text size presets, background colour options, theme selection.\n\n**Personal touch:** Custom avatars for user and AI, name personalisation, chat bubble customisation.\n\n**Accessibility:** WCAG 2.1 AA compliance, screen reader optimisation, keyboard navigation support.\n\n**Trust indicators:** Encryption badge visible in settings. And the most impactful addition: an inline disclaimer — "AI can make mistakes — verify important information." In testing, it was mentioned most positively. Setting honest expectations turned out to increase trust more than anything visual I'd designed. Transparency isn't just an ethical choice — it's a design element that directly affects how safe a product feels to use.`,
        highlight: null,
        quote: null,
        image: '/ZA6_Accessibility.png',
      },
      {
        id: 'outcome',
        heading: 'Outcome',
        body: `Testing with 5 users. Worth being upfront about what that means: the directional percentages are drawn from comparable learning and productivity apps — Duolingo, Notion — and published usability research on structured versus unstructured text interfaces. Five-person tests don't produce statistically significant numbers. What they gave me was clear directional signal that the solutions were addressing real needs.\n\n**40% faster information scanning** — users found specific information in responses 40% faster when content had clear headings and visual breaks versus plain text blocks.\n\n**3x faster task completion** — quick-action prompts reduced follow-up messages from 3–4 down to 1 on average.\n\n**50% reduction in context-switching time** — users with the dashboard feature completed multi-topic sessions twice as fast because they didn't need to re-explain their learning context.\n\nUser reactions in testing: "The new chat feels like talking to a real tutor, not a robot." "Quick prompts are a game-changer. I don't have to think about what to ask next."`,
        highlight: null,
        quote: { text: "Quick prompts are a game-changer. I don't have to think about what to ask next.", attribution: 'Zu-AI user, usability test' },
        image: '/ZA7_Key_decisions.png',
      },
      {
        id: 'reflection',
        heading: 'What I took away',
        body: `The disclaimer moment was the most unexpected part of this project. I added it as a small honesty feature — almost an afterthought. It became the thing users mentioned most positively in testing. Transparency is a design element, not just an ethical obligation. Trust went up because expectations went down. Setting realistic limits on what the AI could do made the whole product feel more honest.\n\nThe quick-action buttons were a last-minute addition during testing. They became the most-used feature. I'd gone into that test thinking visual hierarchy was the main deliverable. I came out knowing the interaction model mattered more.\n\nThe hardest constraint on this project — not being able to fix the AI itself — turned out to be the most useful. It forced every decision into the interface layer: information architecture, visual hierarchy, interaction patterns. Nothing could lean on "the AI will handle it." That discipline is something I'd impose even when it's not required.\n\n**If I had more time:** An onboarding flow to surface personalisation before users hit the chat for the first time — right now every accessibility feature is buried in settings. Voice input came up in interviews more than expected. Collaborative features — shared study sessions using the same AI tutor.`,
        highlight: null,
        quote: null,
        image: null,
      },
    ],
  },
}

// ─── Image components ─────────────────────────────────────────────────────────
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

// ─── Main component ───────────────────────────────────────────────────────────
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
        if (el && el.getBoundingClientRect().top <= 140) {
          setActiveSection(cs.sections[i].id)
          break
        }
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
                  <button key={s.id}
                    onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
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
            </aside>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? 48 : 72 }}>
            {cs.content.map((section, i) => (
              <motion.section key={section.id} id={section.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03, duration: 0.45 }}
                style={{ scrollMarginTop: 100 }}>

                <h2 style={{ fontFamily: f, fontSize: 'clamp(1rem,1.6vw,1.25rem)', fontWeight: 700, letterSpacing: '-0.01em', color: 'hsl(0,0%,8%)', margin: '0 0 20px' }}>
                  {section.heading}
                </h2>

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
                    <p style={{ fontFamily: f, fontSize: 11, color: 'hsl(0,0%,55%)', margin: '10px 0 0', paddingLeft: 40 }}>— {section.quote.attribution}</p>
                  </div>
                )}

                {section.images && section.images.length > 0 && (
                  <ImageStrip images={section.images} accentBg={cs.accentBg} />
                )}

                {!section.images && section.image && (
                  <SingleImage src={section.image} accentBg={cs.accentBg} />
                )}

              </motion.section>
            ))}

            {/* Footer nav */}
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
