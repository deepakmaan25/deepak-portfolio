// src/data/caseStudies.ts

export interface CaseStudy {
  slug: string;
  title: string;
  subtitle: string;
  tagline: string;
  tag: string;
  platform: string;
  year: string;
  role: string;
  timeline: string;
  color: string;
  outcomes: { value: string; label: string }[];
  stats: { value: string; label: string }[];
  overview: {
    problem: string;
    description: string;
    contribution: string;
  };
  research: {
    heading: string;
    body: string;
    quotes: { text: string }[];
  };
  process: {
    heading: string;
    intro: string;
    constraints?: string;
    pillars: { icon: string; title: string; description: string }[];
    steps: { week: string; label: string; items: string[] }[];
  };
  solutions: {
    title: string;
    subtitle: string;
    problem: string;
    body: string[];
    metrics?: { value: string; label: string }[];
  }[];
  impact: {
    heading: string;
    body: string;
    quotes?: { text: string }[];
    metrics: { value: string; label: string }[];
  };
  reflection: {
    heading: string;
    body: string;
    learnings: { title: string; description: string }[];
    futureList: string[];
    tools: string[];
  };
  images?: {
    src: string;
    ratio: number;
    caption?: string;
  }[];
  nextProject: string;
  image?: string;
}

export const caseStudies: CaseStudy[] = [

  // ─────────────────────────────────────────────
  // TECH JAPAN  (order: 1)
  // ─────────────────────────────────────────────
  {
    slug: "tech-japan",
    title: "Tech Japan",
    subtitle: "UX Research & Platform Redesign",
    tagline:
      "Two months embedded in a job platform used by IIT students, finding what was breaking their trust, and fixing it",
    tag: "UX Research · Web Platform",
    platform: "Web (Desktop + Mobile)",
    year: "2024",
    role: "UX Research Intern",
    timeline: "September – November 2024 · 2 Months",
    color: "#eaf3ff",

    outcomes: [
      { value: "80%", label: "Easier Navigation" },
      { value: "70%", label: "Unprompted Feature Use" },
      { value: "6", label: "Solutions Shipped" },
    ],

    stats: [
      { value: "10", label: "IIT students interviewed" },
      { value: "50+", label: "Survey responses" },
      { value: "9", label: "Pain points documented" },
      { value: "6", label: "Solutions shipped" },
    ],

    overview: {
      problem:
        "Tech Japan connects IIT engineering students with Japanese companies hiring for technical roles. The platform had real users, real companies, real placements happening. It worked.\n\nBut a set of problems had accumulated that, individually, looked like edge cases. Together, they were making the platform feel unreliable at exactly the wrong moments — when a student was deciding whether to trust a company enough to apply, and when they were trying to complete their profile before a deadline.\n\nBroken company links. Dark mode contrast so low entire sections were unreadable. No way to manage multiple resumes. Post-application communication happening entirely on WhatsApp, completely outside the platform. A profile flow that silently lost your data if you forgot to save each section individually.",
      description:
        "I researched these issues with 10 IIT students, documented 9 distinct pain points with supporting evidence, prioritized using a MoSCoW framework, and designed solutions for the critical ones. Six shipped to production — including the job description layout, accessibility fixes, Save All profile flow, and an in-platform communication system.",
      contribution:
        "Sole researcher and designer. I recruited participants, mapped the platform myself before any sessions, ran interviews, and synthesized findings into a prioritized brief the team could act on. I also designed solutions in Figma, ran usability testing on redesigns, and conducted a separate rebranding survey as the company transitioned from Tech Japan to Talendy.",
    },

    research: {
      heading: "What I Found",
      body:
        "Before talking to anyone, I walked through the platform myself end-to-end — created an account, built a profile, browsed listings, started an application. That gave me a baseline and meant I could follow up on specific moments in interviews rather than asking users to describe their general experience.\n\nNine pain points emerged across 10 interviews and 50+ survey responses.\n\n**Dark mode contrast**, 7 of 10 users. Text was so low-contrast in dark mode that entire sections were unreadable. This hit hardest for students studying late, the users most likely to have dark mode on.\n\n**Broken company links**, 6 of 10 users. Clicking through to a company page returned an error at the exact moment a student was deciding whether to trust a company enough to apply. The critical thing I flagged to the team: an error page at that moment doesn't read as a bug. It reads as a red flag about the company itself. Legitimacy and trust failure, not a technical inconvenience.\n\n**Job description layout**, 4 of 10 users. All the information was present but presented as one long unformatted block. Fine if you're reading carefully. Impossible if you're quickly assessing whether a role is worth pursuing.\n\n**Post-application communication via WhatsApp**, 4 of 10 users. Once someone applied, everything moved off-platform. Users found it unprofessional. The larger issue I framed for the team: Tech Japan had zero visibility into what happened after someone applied. Every offer, every rejection, every follow-up — all happening in an app they had no access to.\n\n**Multiple resumes**, 3 of 10 users. IIT students apply across product, software engineering, design, and analytics tracks. Each needs a different resume. The platform allowed one.\n\n**Save All profile flow**, 2 of 10 users. Each profile section required a separate save. Miss one and the data was gone silently. Two users described abandoning profile completion because of it.",
      quotes: [
        {
          text: "While clicking on a company's link, it takes you to a new page but you can't see any meaningful data — it shows an error every time. It leads to doubting the company's legitimacy.",
        },
        {
          text: "Once I apply, all communication happens on WhatsApp, which feels unprofessional. The flow kind of hinders.",
        },
        {
          text: "I need to upload different resumes for different profiles. There's no way to do that here.",
        },
        {
          text: "Building my profile was painful. I had to save each section separately, and if I forgot once, I had to rewrite everything.",
        },
      ],
    },

    process: {
      heading: "What I Prioritized and Why",
      intro:
        "Nine issues is too many to fix at once. The first real design decision was sequencing — what gets fixed first.\n\nI used a MoSCoW framework with one guiding principle: fix what's actively destroying trust before fixing what's creating friction. Friction is recoverable. A user who struggles through a long save flow might come back. A user who sees an error page on a company listing and questions whether the company is real probably doesn't. Trust failures come first.",
      pillars: [
        {
          icon: "🔴",
          title: "Must Have",
          description:
            "Dark mode contrast and broken company links — both creating trust failures at critical decision moments.",
        },
        {
          icon: "🟡",
          title: "Should Have",
          description:
            "Save All profile flow, multiple resume management, built-in communication tool.",
        },
        {
          icon: "🟢",
          title: "Could Have",
          description:
            "Reports filtering, redundant question auto-fill, full mobile responsiveness overhaul.",
        },
      ],
      steps: [
        {
          week: "Research",
          label: "Discover & Document",
          items: [
            "Self-walkthrough of the full platform before any user sessions",
            "10 semi-structured interviews with IIT students",
            "50+ survey responses for quantitative validation",
            "9 pain points mapped with frequency and severity across participants",
          ],
        },
        {
          week: "Design",
          label: "Prioritize & Ship",
          items: [
            "MoSCoW framework applied to 9 issues — sequenced by trust impact, not effort",
            "High-fidelity solutions in Figma for all priority items",
            "Usability testing to validate before handoff",
            "6 solutions shipped to production during and after the internship",
          ],
        },
      ],
    },

    solutions: [
      {
        title: "Solution 1: Job Description Layout",
        subtitle: "Is this role right for me? Answerable in 10 seconds.",
        problem:
          "The problem wasn't missing information — it was presentation. Requirements, compensation, company details, and application instructions all ran together in a single block of text. Anyone scanning to quickly assess whether a role was worth pursuing couldn't.",
        body: [
          "I restructured job descriptions into clearly labeled sections — role overview, company details, requirements, how to apply. Company links were fixed here too, directly addressing the legitimacy concern several users had raised separately.",
          "Students were trying to answer two questions quickly: is this role right for me, and is this company legitimate? The redesign made both answerable without reading the full page.",
        ],
      },
      {
        title: "Solution 2: Dark Mode and Accessibility",
        subtitle: "WCAG 2.1 AA compliance across every screen",
        problem:
          "Seven of 10 users flagged dark mode. On internship detail pages and company profiles, contrast ratios were low enough to make text genuinely unreadable. The most affected users were studying late at night — exactly the audience most likely to have dark mode enabled.",
        body: [
          "I walked through the platform in dark mode screen by screen and mapped every contrast failure before opening Figma. Updated color values to meet WCAG 2.1 AA across all affected surfaces. Improved button visibility and standardized how interactive elements were treated across light and dark themes.",
          "This is the kind of issue that's invisible if you only test in optimal conditions — and obvious the moment you sit with a real user in their actual environment. The platform had been tested. Nobody had tested it in dark mode, at midnight, on a laptop screen.",
        ],
      },
      {
        title: "Solution 3: Multiple Resume Management",
        subtitle: "One platform. Every version of you.",
        problem:
          "IIT students don't apply to one type of role. Product, software engineering, design, analytics — each track needs a tailored resume. The platform supported one. Changing it meant downloading, renaming, uploading — a workflow that happened entirely outside the platform.",
        body: [
          "I decided not to build resume tailoring into the platform — that would have required AI capability the team didn't have and wasn't in scope. The better insight was simpler: students already had multiple resume versions. The platform was adding unnecessary friction on top of a workflow they'd already figured out for themselves. The fix was making that workflow native.",
          "A resume library inside the profile: upload and label multiple versions — 'Product Resume,' 'Dev Resume,' 'General' — and select the right one at the point of application without leaving the job listing.",
        ],
      },
      {
        title: "Solution 4: Save All Profile Flow",
        subtitle: "Fill once. Save once. Done.",
        problem:
          "Profile completion required a separate save after every section. Miss one — easy to do in a long form — and the data was gone without warning. Two users described abandoning profile completion entirely because of this.",
        body: [
          "A single Save All action that captures the complete profile state at once. Unsaved-change indicators per section so you can see at a glance what's pending before committing. A clear confirmation after saving so you know it worked.",
          "The root issue was a mismatch between the user's mental model — one profile they're filling out — and how the system was actually treating it: a series of independent saves with no relationship to each other. Aligning the system to how people think about the task eliminated the problem entirely.",
        ],
      },
      {
        title: "Solution 5: Built-in Communication Tool",
        subtitle: "Keep the entire hiring journey on one platform",
        problem:
          "Post-application, everything moved to WhatsApp — interview scheduling, task assignments, status updates. This had been known before I joined. It hadn't been prioritized. Understanding why that was, and changing it, was one of the more important things I did on this project.",
        body: [
          "The issue was being framed as a user preference: 'users want better in-app messaging.' That framing wasn't compelling enough to prioritize. I reframed it as a business visibility problem: Tech Japan had zero insight into what happened after someone applied. Every offer, every rejection, every follow-up — all happening in WhatsApp, which they had no access to. That's not a UX problem. That's a product problem. The conversation changed immediately.",
          "The solution: an in-platform messaging and notification system covering the full post-application journey — status updates, document requests, direct messages with hiring teams, interview scheduling — all inside the platform from application to outcome.",
          "The reframe is what got it prioritized. 'Users want better chat' is a feature request. 'You have no visibility into what happens after someone applies' is a business case.",
        ],
      },
    ],

    impact: {
      heading: "Testing & Results",
      body:
        "Testing was done with real users in real sessions — not projections. Ten users, observed tasks, measured with actual behavior rather than self-report.\n\n80% of participants said navigation felt easier, particularly around the redesigned job layout and new categorization. The more meaningful signal: 70% used the resume management and communication features without being prompted. In a usability test, unprompted use is a stronger indicator than task completion rate — it means the features were self-explanatory enough that people reached for them naturally.\n\nThe sessions also flagged what still needed work: button visibility in dark mode needed more passes in places, tooltips for new features weren't clear enough, and mobile responsiveness needed a comprehensive overhaul rather than individual patches.\n\n6 solutions shipped to production during and after the internship.",
      metrics: [
        { value: "80%", label: "Reported easier navigation" },
        { value: "70%", label: "Used new features unprompted" },
        { value: "6", label: "Solutions shipped to production" },
      ],
    },

    reflection: {
      heading: "What I Took Away",
      body:
        "The most important thing I learned on this project had nothing to do with design craft — it was about how findings land.\n\nThe WhatsApp issue had been known before I joined. It hadn't moved. When I reframed it as 'you have zero visibility into what happens after someone applies,' it became a different conversation. Same finding — completely different reception. That distinction between 'users want better messaging' and 'you're blind to your own hiring funnel' is something I think about on every project now. How you frame a finding determines whether it gets acted on.\n\nThe broken company link taught me something about research scope. It's a bug, not a design problem. But it was the single thing most likely to make a user close the tab — because it raised a question about whether the companies were even real. If I'd scoped my research to 'design issues only,' I'd have missed the most trust-critical problem on the platform. Real research has to follow the problem, not the job description.",
      learnings: [
        {
          title: "Frame findings around business impact",
          description:
            "'You have no visibility into your own hiring funnel' landed. 'Users want better chat' didn't. Same insight — completely different reception. Framing determines whether a finding gets acted on.",
        },
        {
          title: "Research scope has to follow the problem",
          description:
            "The broken company link was a bug, not a design problem. But it was the most trust-critical issue on the platform. Scoping research to 'design issues only' would have missed it entirely.",
        },
        {
          title: "Unprompted use is the strongest validation signal",
          description:
            "70% of test participants used new features without being asked. That tells you more than task completion rate — it means the design was obvious enough to be discovered naturally.",
        },
      ],
      futureList: [
        "Onboarding flow for first-time users — several key features are only discoverable if you go looking, including resume management and communication settings",
        "Full mobile responsiveness overhaul — current state is individual patches, not a systematic solution",
        "Redundant question auto-fill — reuse answers across similar applications to reduce repetition in the application flow",
        "Post-application status tracking visible directly in the platform, closing the loop for candidates who currently have no idea where they stand after applying",
      ],
      tools: ["Figma", "Google Forms", "Zoom", "Poppins / Euclid Circular B"],
    },

    images: [
      { src: "/01-project-overview.png",             ratio: 62.5,  caption: "Project overview — redesigning a hiring platform IIT students trust" },
      { src: "/02-pain-point-frequency.png",         ratio: 84.25, caption: "Pain point frequency analysis — 9 issues mapped across 10 IIT student interviews" },
      { src: "/03-wireframe-to-hifi.png",            ratio: 75.05, caption: "Design process — wireframe to mid-fidelity to high-fidelity progression" },
      { src: "/04-job-description-before-after.png", ratio: 64.85, caption: "Solution 1: Job description layout — unformatted block redesigned into scannable categorized layout" },
      { src: "/05-dark-mode-before-after.png",       ratio: 76.55, caption: "Solution 2: Dark mode and accessibility — contrast ratios fixed from 1.2:1 to 7.4:1+" },
      { src: "/06-resume-management.png",            ratio: 72.55, caption: "Solution 3: Multiple resume management — upload, label, and select per application" },
      { src: "/07-save-all-flow.png",                ratio: 82.85, caption: "Solution 4: Save all profile flow — one action captures every section with unsaved-change indicators" },
      { src: "/08-communication-tool.png",           ratio: 64.95, caption: "Solution 5: Built-in communication tool — every conversation stays inside the platform" },
      { src: "/TJ-rebranding-survey.png",            ratio: 90.70, caption: "Rebranding survey — 71% awareness gap and brand perception across 50+ IIT students" },
    ],
    nextProject: "buzztro",
    image: "/04-job-description-before-after.png",
  },

  // ─────────────────────────────────────────────
  // BUZZTRO  (order: 2)
  // ─────────────────────────────────────────────
  {
    slug: "buzztro",
    title: "Buzztro",
    subtitle: "Collective Buying Platform",
    tagline:
      "Designing a group-buying e-commerce experience from zero to shipped — where the price drops as more people commit",
    tag: "Product Design · E-commerce",
    platform: "Web (Desktop + Mobile)",
    year: "2024",
    role: "Lead Product Designer",
    timeline: "Early 2024 · 2 Months",
    color: "#fff4ec",

    outcomes: [
      { value: "40+", label: "Screens Designed" },
      { value: "5", label: "Core Flows Shipped" },
      { value: "2", label: "Months End-to-End" },
    ],

    stats: [
      { value: "40+", label: "Screens designed" },
      { value: "5", label: "Core flows shipped" },
      { value: "1", label: "Solo designer" },
      { value: "2 mo", label: "Zero to production" },
    ],

    overview: {
      problem:
        "Buzztro's model is collective buying — shoppers pool demand so that when enough people commit, the unit price drops and everyone wins. The mechanic is simple on paper: more buyers, lower price.\n\nBut no one on the team had seen this pattern land cleanly in the Indian market. Pinduoduo had scaled it aggressively in China. Meesho and DealShare had circled the space here. None translated directly. The risk was threefold: the pool mechanic feels confusing ('why is the price changing?'), pushy ('join now or lose it'), or invisible, where users shop like it's a normal store and miss the benefit entirely.\n\nThe design problem wasn't building an e-commerce app. It was making a conditional, community-driven pricing model feel trustworthy and rewarding rather than confusing or pressuring.",
      description:
        "I designed the full buying experience around pool progress as the unifying metaphor — a single visual language that follows the user from the product card through PDP, cart, checkout, and order status. The price isn't fixed; it's a live consequence of how many people have joined, and every screen communicates that clearly.",
      contribution:
        "Solo designer on a 2-month freelance contract, reporting directly to the founder. Competitor research, information architecture, flows, wireframes, and high-fidelity design across 40+ screens. Shipped to production and ran for several months before the company paused on funding.",
    },

    research: {
      heading: "Understanding the Problem",
      body:
        "Before opening Figma, I mapped how group-buying platforms handle the pool mechanic across markets — Pinduoduo, Meesho, DealShare, and Groupon in its original deal-of-the-day era. I was looking less at visual style and more at which moments they explained, which they hid, and where the experience broke down.\n\n**Three things I kept seeing break across every platform:**\n\n**The price doesn't match the label.** Most group-buy platforms show a discounted price on the card, but that price is conditional. You only get it if the pool fills. When users noticed this discrepancy at checkout, trust collapsed entirely. The fix had to happen upstream: the discount should never look like a promise until it actually is one.\n\n**The pool status is buried.** How many people have joined? How many more are needed? When does the pool close? These are the questions that decide whether a user commits, and they were routinely hidden behind a tap or only shown after add-to-cart. Users should see pool state before they even click in.\n\n**Post-purchase is an afterthought.** A pool either fills or it doesn't. Most platforms treat the waiting state as an edge case and ship generic order-confirmed screens. But for collective buying, waiting is the product — that's where the shopper lives for hours or days after payment. It needed its own design.",
      quotes: [
        {
          text: "The price isn't a number on the card. It's a promise the platform can only keep if the community keeps it first. The design has to make that feel exciting, not scary.",
        },
      ],
    },

    process: {
      heading: "Design Approach",
      intro:
        "One principle I committed to early: pool progress should be the single most visible element on any Buzztro screen where a product exists. Not the discount, not the CTA, not the photo — the progress indicator.\n\nThis sounds obvious in hindsight, but it wasn't the founder's starting instinct and it wasn't what most competitors were doing. Most group-buy platforms hero the discounted price and treat the pool as supporting information. I inverted it: the price is the consequence, the pool is the cause, and the cause should lead.",
      pillars: [
        {
          icon: "📊",
          title: "Show the State, Not the Sell",
          description:
            "Every product surface shows pool progress first. Users always know where they stand before they see what it costs.",
        },
        {
          icon: "⏱️",
          title: "Urgency Without Pressure",
          description:
            "No flashing timers, no red everything. Pool progress uses motion and color sparingly — it rewards rather than stresses.",
        },
        {
          icon: "🤝",
          title: "Commit, Don't Transact",
          description:
            "Checkout language shifts from 'Buy now' to 'Join the pool.' Small, deliberate, and signals exactly what the user is doing.",
        },
      ],
      steps: [
        {
          week: "Week 1",
          label: "Research & Architecture",
          items: [
            "Competitor teardown: Pinduoduo, Meesho, DealShare, Groupon — mapped where each hid or explained the pool mechanic",
            "Information architecture for the full buying journey: card, PDP, cart, checkout, post-purchase",
            "Lo-fi wireframes exploring 3 configurations of the pool progress indicator on the product card",
            "Founder alignment on the core design principle: pool progress leads, price follows",
          ],
        },
        {
          week: "Week 2-8",
          label: "Design & Ship",
          items: [
            "High-fidelity screens across 5 core flows: product grid, PDP, booking checkout, order checkout, post-purchase states",
            "Component library for the pieces that repeated most — progress bar, gauge, cart card, checkout summary",
            "Iteration rounds directly with founder — tight feedback loop, decisions in hours not days",
            "Shipped to production — ran live for several months before company paused on funding",
          ],
        },
      ],
    },

    solutions: [
      {
        title: "Solution 01: The Product Card",
        subtitle: "Pool progress as the primary signal",
        problem:
          "The card is the workhorse of any e-commerce UI. On Buzztro, it had to carry three things a normal card doesn't: current pool fill, the conditional price it unlocks, and how close the user is to the next price tier — all without becoming cluttered.",
        body: [
          "I tested a few configurations — a circular progress ring, a stacked layout with the bar below the CTA, and a minimal variant that hid progress until hover. The version that shipped places the progress indicator prominently beneath the product title, with the current price on one side and the target discounted price on the other. A 'X joined, Y more to unlock' label completes the picture.",
          "The trade-off: cards became taller than a standard grid card. I pushed back on the instinct to shrink them. If the progress indicator isn't readable at a glance, the product isn't Buzztro anymore — it's a worse Amazon. The extra height is the entire business model made visible.",
        ],
      },
      {
        title: "Solution 02: Product Detail Page",
        subtitle: "Making the group mechanic the hero",
        problem:
          "On a standard PDP, the hierarchy is: image, title, price, CTA, everything else. On Buzztro, price isn't a static value — it's the output of a live community pool. That required a fundamentally different information hierarchy.",
        body: [
          "I reworked the PDP so the live pool state sits directly under the title — a larger, more detailed version of the card progress indicator, with the current price shown alongside the discounted target the pool will unlock.",
          "The circular gauge became the signature visual of the whole product — one glance and a user understands the entire mechanic without reading a word of copy. Below the fold, the PDP returns to familiar e-commerce patterns: gallery, specifications, reviews, related products. Once the mechanic is clear, everything else should feel as boring and trustworthy as any other shop. Novelty is only for the thing that's actually new.",
        ],
      },
      {
        title: "Solution 03: Booking Checkout",
        subtitle: "A pre-commitment flow that earns trust at every step",
        problem:
          "Buzztro's checkout is not a standard transaction — it's a conditional commitment. The user is paying today for something that ships only if the pool fills. That single difference rewrites almost every trust signal the user expects from a checkout flow.",
        body: [
          "The flow settled at a clear multi-step structure — address, payment, review — with a persistent summary that keeps pool state visible throughout. The user never loses sight of what they're joining, even while filling in delivery details.",
          "The most reviewed piece of copy in the entire project: a small note explaining what happens if the pool doesn't fill ('your payment is held and refunded automatically'). If that sentence was confusing, the entire trust story fell apart. Every word was tested. The CTA language also shifted: 'Pay and join the pool' instead of 'Pay now' — a small change that did real work every time I watched someone click it.",
        ],
      },
      {
        title: "Solution 04: Cart Experience",
        subtitle: "A waiting room, not a holding area",
        problem:
          "A standard cart is a neutral holding area before checkout. Buzztro's cart is closer to a waiting room — items the user has committed to joining, each with its own live pool state, each potentially landing at a different final price.",
        body: [
          "I designed the cart with per-item pool status rather than a flat line-item list. Each row shows the product, current pool fill, and the price band it's sitting in. The totals section shows two numbers: what the user pays today at current pool levels, and what they'd pay if every pool fills. The gap between them is the potential savings — shown clearly, but without the exclamation-mark energy most deal platforms use. It's information, not a pitch.",
          "The explicit refund language also appears here, before checkout. Setting that expectation early — not just in the final review step — reduced the cognitive surprise of 'wait, what happens if this doesn't work?' that I'd observed in early walkthroughs.",
        ],
      },
      {
        title: "Solution 05: Post-Purchase States",
        subtitle: "Designed as a product, not an edge case",
        problem:
          "Between payment complete and order shipped, a Buzztro customer lives in a waiting state that can last hours or days. If that state feels empty, users assume something broke. If it feels alive, they tell friends.",
        body: [
          "The order status screen shows live pool fill, a countdown to the pool close, the current price band, and a share CTA that lets users invite others to help fill the pool faster. That share action isn't a growth mechanic bolted on — it's the most useful thing a user can actually do in that moment, so it belongs front and center.",
          "Two other states needed their own treatment: pool filled (savings confirmed, shipping begins) and pool failed (the refund moment — clear and calm, with a nudge toward a similar pool the user might join instead). Neither can be a toast notification. Both are full screens. The waiting state is where the actual Buzztro experience lives.",
        ],
      },
    ],

    impact: {
      heading: "Shipped and Live",
      body:
        "Buzztro launched and ran in production for several months — a complete end-to-end group-buying platform designed, built, and shipped in 8 weeks from a single designer working directly with the founder.\n\nThe biggest validation: the product worked. Users understood the pool mechanic without reading copy. The gauge did the explaining. The checkout flow held up. Post-purchase states handled the conditional nature of the product without generating confusion the team couldn't handle.\n\nThe company eventually paused on funding — a market and timing reality, not a product one. The design work remains the clearest evidence I have of what it looks like to own an entire product end-to-end, make the hard calls under constraint, and ship something that actually runs.",
      metrics: [
        { value: "40+", label: "Screens from zero to production" },
        { value: "5", label: "Core flows shipped end-to-end" },
        { value: "8 wks", label: "Research to live product" },
        { value: "1", label: "Designer, direct to founder" },
      ],
    },

    reflection: {
      heading: "What I Took Away",
      body:
        "This was the first project where I owned every screen of a shipped product from zero. Two months, one designer, one founder, no safety net.\n\nThe pool progress bar wasn't just a component. It was the thesis of the entire product. Once I committed to making it the primary signal on every surface, every other decision got easier. Hierarchy questions became 'does this compete with the bar?' Copy questions became 'does this explain the bar or distract from it?' A single strong principle resolves a hundred small debates.\n\nThe post-purchase state nearly became an afterthought. I almost shipped a generic order-confirmed screen and moved on. Sitting with the flow as a user changed that. Realizing that waiting for the pool to fill is where you actually live after you pay, that screen became the one I spent the most time on relative to its visual complexity. It's not complex. But it needed to be right.",
      learnings: [
        {
          title: "Pick the one idea and follow it everywhere",
          description:
            "The pool progress bar was the thesis of the product, not just a component. Every layout decision, copy decision, and hierarchy call reduced to: does this serve the bar or compete with it? One strong principle resolves a hundred small debates.",
        },
        {
          title: "Novelty only where it earns its place",
          description:
            "Buzztro is a new kind of shopping, but most of the PDP still looks like a normal PDP. Users already know how to buy things. I needed to make the one new thing understandable — not reinvent everything else alongside it.",
        },
        {
          title: "Working directly with a founder is fast and unforgiving",
          description:
            "No PM layer, no design review committee. Decisions happen in minutes and ship in days. Front-loading the reasoning — competitor teardowns, explicit trade-offs — meant we decided on substance, not taste.",
        },
      ],
      futureList: [
        "Onboarding flow — first-time users land on a PDP and have to infer the entire mechanic from the gauge. A proper first-run explainer woven into the first product visit (not a blocking modal) was the first item on the v2 list",
        "Social proof in the waiting state — showing who else joined the pool (even just avatars and city names) would turn the waiting screen from a solo moment into a shared one, which is the whole point of collective buying",
        "Redundant question auto-fill across applications — a pattern worth solving at the product level rather than leaving to individual users",
      ],
      tools: ["Figma", "Photoshop", "Whimsical"],
    },

    images: [
      { src: "/buzztro/hero.png",                     ratio: 56, caption: "Buzztro — collective buying platform, end-to-end product design" },
      { src: "/buzztro/pdp-states.png",               ratio: 56, caption: "Pool mechanic — price drop lifecycle across gauge states" },
      { src: "/buzztro/booking-checkout-mobile.png",  ratio: 70, caption: "Mobile booking checkout — the pre-commitment flow across all three steps" },
      { src: "/buzztro/card-system.png",              ratio: 60, caption: "Product card system — all states from empty pool to price unlocked" },
      { src: "/buzztro/pdp-overview.png",             ratio: 65, caption: "Product detail page — pool gauge as the primary hierarchy element" },
      { src: "/buzztro/booking-checkout-desktop.png", ratio: 60, caption: "Booking checkout — persistent pool summary anchored through every step" },
      { src: "/buzztro/checkout-address.png",         ratio: 58, caption: "Order checkout — address, payment, and review with inline trust signals" },
      { src: "/buzztro/order-waiting.png",            ratio: 68, caption: "Post-purchase waiting state — live pool fill, countdown, and share CTA" },
      { src: "/buzztro/order-details.png",            ratio: 60, caption: "Order summary — tracking and pool status in one place" },
    ],
    nextProject: "zu-ai",
    image: "/buzztro/pdp-overview.png",
  },

  // ─────────────────────────────────────────────
  // ZU-AI  (order: 3)
  // ─────────────────────────────────────────────
  {
    slug: "zu-ai",
    title: "Zu-AI",
    subtitle: "Chat Experience Redesign",
    tagline:
      "Redesigning an AI learning assistant so 100K+ students could actually trust it, navigate it, and make it their own",
    tag: "Product Design · Mobile App",
    platform: "Mobile App (iOS / Android)",
    year: "2024",
    role: "Product Designer",
    timeline: "March 2024 · 2 Weeks",
    color: "#f0eeff",

    outcomes: [
      { value: "40%", label: "Faster Scanning" },
      { value: "3×", label: "Task Completion" },
      { value: "50%", label: "Less Context-Switching" },
    ],

    stats: [
      { value: "33", label: "Research participants" },
      { value: "10", label: "User interviews" },
      { value: "23", label: "Survey responses" },
      { value: "2 wks", label: "Research to hi-fi" },
    ],

    overview: {
      problem:
        "Zu-AI had 100K+ students using it as a learning tool. The concept was solid — an AI tutor that makes studying feel less like work. But the experience wasn't delivering on that promise.\n\nStudents were dealing with walls of unformatted text, a chatbot with no memory between sessions, and no way to personalize anything. There was also a quieter problem: they didn't know when to trust what the AI said. No disclaimer. No caveats. No signal that it could be wrong. For a learning tool, that matters.\n\nEngagement was low. Sessions were getting abandoned before students found what they came for.",
      description:
        "I redesigned the chat interface from the ground up — improving visual hierarchy, building a conversation dashboard for persistent context, and adding accessibility controls that let students make it their own. The hard constraint: I couldn't touch the AI model. Every problem had to be solved at the interface layer.",
      contribution:
        "Sole designer on this brief. Over two weeks, I ran research with 33 participants — 10 interviews and 23 survey responses — and took the project from problem definition to high-fidelity prototype with usability testing.",
    },

    research: {
      heading: "What I Found",
      body:
        "I started with app store reviews before talking to anyone — 100+ across iOS and Android. That's a deliberate methodology choice: it gives me enough signal to direct interviews toward real friction, rather than asking users to narrate their experience from scratch. I went into every session already knowing where to dig.\n\nTwo patterns dominated both the reviews and the interviews.\n\n**Information overload** — 60% of survey respondents flagged this. Responses arrived as long, unbroken blocks of text. No headings, no visual hierarchy, nothing to help you find the part that mattered. Students weren't reading — they were skimming and giving up.\n\n**No sense of personalization** — 40% wanted the app to feel like it knew them. It remembered nothing between sessions. Responses felt generic. There was no way to adjust text size, switch to dark mode, or even change how the AI addressed you.\n\nSmaller issues that compounded: no visible encryption in settings, no disclaimer that the AI could make mistakes, friction when switching subjects mid-session. None were showstoppers alone. Together, they created an experience that felt untrustworthy and unfinished.",
      quotes: [
        {
          text: "Sometimes it's hard to explain what I need help with, and the chatbot doesn't always understand me. It would be great if it could suggest study resources or explain concepts with visuals.",
        },
        {
          text: "I want to feel like I'm talking to a friend when I use it, but it feels too robotic.",
        },
        {
          text: "I wish it could understand my schedule better. It's frustrating having to repeat my tasks every time I log in.",
        },
      ],
    },

    process: {
      heading: "What I Was Working With",
      intro:
        "Three constraints shaped every decision. I couldn't touch the AI model itself — accuracy and content were out of scope. The timeline was two weeks, research to high-fidelity. And the design system had to align with Microsoft Fluent 2.\n\nThat last constraint was actually useful. It meant style decisions weren't up for debate. Every choice had to be justified by the research, not by what looked interesting. That's a good discipline to have when you're working fast.",
      constraints:
        "Couldn't change the AI model — content and accuracy out of scope. Two weeks from research to high-fidelity. Design system aligned with Microsoft Fluent 2.",
      pillars: [
        {
          icon: "🔍",
          title: "Build Trust Through Transparency",
          description:
            "Students needed to know when to rely on the AI — and when to verify what it told them.",
        },
        {
          icon: "🧠",
          title: "Reduce Cognitive Load",
          description:
            "Information overload was the number one complaint. Responses needed structure, not just better writing.",
        },
        {
          icon: "🎨",
          title: "Enable Personalization",
          description:
            "The chat needed to feel like a learning tool that adapted to the student, not a generic Q&A box.",
        },
      ],
      steps: [
        {
          week: "Week 1",
          label: "Empathize & Analyze",
          items: [
            "10 contextual interviews with active Zu-AI users",
            "Analyzed 100+ app store reviews across Android and iOS",
            "Survey circulated to 23 users for quantitative validation",
            "Competitive analysis: ChatGPT, Duolingo, Khan Academy",
          ],
        },
        {
          week: "Week 2",
          label: "Ideate, Design & Test",
          items: [
            "Lo-fi wireframes across 3 concept directions",
            "Direction selected on research alignment, not aesthetics",
            "High-fidelity mockups in Figma",
            "Usability testing with 5 users — iterated before final delivery",
          ],
        },
      ],
    },

    solutions: [
      {
        title: "Solution 1: Chat Interface Redesign",
        subtitle: "Visual hierarchy that makes scanning effortless",
        problem:
          "The issue wasn't that responses were too long — it was that everything looked identical. Same weight, same size, no entry points for someone scanning. A student looking for the answer to a specific sub-question had no choice but to read the whole thing.",
        body: [
          "I restructured responses into digestible sections with clear headings and visual separators between concepts. Typography now differentiates heading, body, and code blocks. Color-coding distinguishes message types — explanations, examples, actions. Inline formatting gives the eye somewhere to land immediately.",
          "The quick-action buttons — 'Explain this further,' 'Show an example' — weren't in the original brief. I added them during testing after noticing students pausing between messages, not because they were reading carefully, but because they were figuring out what to ask next. That pause was friction. The quick actions removed it entirely. They ended up being the most-used feature in testing — which told me the interaction model mattered more than the visual system I'd spent most of week two on.",
        ],
        metrics: [
          { value: "40%", label: "Faster info location in usability tests" },
          { value: "3×", label: "Improvement in task completion speed" },
        ],
      },
      {
        title: "Solution 2: ChatBot Dashboard",
        subtitle: "Persistent context across all your subjects",
        problem:
          "Every new session started from blank. If you were studying Math one day and Physics the next, the thread of each topic — how you'd been framing questions, where you'd left off — was gone. There was no way to pick up where you stopped.",
        body: [
          "I decided to treat conversations as persistent contexts, not temporary sessions — the same mental model students already had for their notes. Visual conversation cards per subject show a preview of the last message and a timestamp. Quick-switch between ongoing threads without losing context. Search for past explanations. Bookmarking for things worth keeping. Auto-categorization by subject with recently-accessed chats surfaced first.",
          "The framing that drove the design: your study context should work the way your notes do. You don't start a new notebook every day.",
        ],
        metrics: [
          { value: "50%", label: "Faster multi-topic study sessions" },
        ],
      },
      {
        title: "Solution 3: Accessibility and Personalization",
        subtitle: "An experience that adapts to every student",
        problem:
          "Students studying late needed dark mode. Students with visual impairments needed larger text. Students who'd been using the app for months wanted it to feel like theirs. None of that was possible. The experience was identical for everyone, regardless of need or preference.",
        body: [
          "Dark/light mode toggle, four text size presets, background color options, theme selection. Custom avatars for user and AI. Name personalization. Chat bubble styles. WCAG 2.1 AA compliance across all interactive elements.",
          "Two trust features came directly from the research and almost didn't make the cut: a visible encryption badge in settings, and an inline disclaimer: 'AI can make mistakes, verify important information.' I nearly cut the disclaimer as too small a detail. In testing, it was one of the things users mentioned most. Setting honest expectations turned out to increase trust more than anything visual I'd designed. Transparency isn't just an ethical choice — it's a design element that directly affects how safe a product feels to use.",
        ],
        metrics: [
          { value: "30%", label: "Projected DAU increase (benchmarked)" },
        ],
      },
    ],

    impact: {
      heading: "Results",
      body:
        "Testing was done with 5 users — worth being upfront about what that means. The directional percentages are drawn from comparable learning and productivity apps: Duolingo, Notion, and published usability research on structured versus unstructured text interfaces. Five-person tests don't produce statistically significant numbers. What they gave me was clear directional signal that the solutions were addressing real needs, and confidence in the decisions made.\n\nThe sessions also surfaced what still needed work — which is the part of testing that matters most.",
      quotes: [
        {
          text: "The new chat feels like talking to a real tutor, not a robot.",
        },
        {
          text: "I can finally customize it the way I like — makes studying at night so much better.",
        },
        {
          text: "Quick prompts are a game-changer. I don't have to think about what to ask next.",
        },
      ],
      metrics: [
        { value: "40%", label: "Faster information scanning" },
        { value: "3×", label: "Task completion speed" },
        { value: "50%", label: "Reduction in context-switching time" },
        { value: "30%", label: "Projected DAU increase (benchmarked)" },
      ],
    },

    reflection: {
      heading: "What I Took Away",
      body:
        "The disclaimer moment was the most unexpected part of this project. I added it as a small honesty feature — almost an afterthought. It became the thing users mentioned most positively in testing. That taught me something I hadn't expected: transparency is a design element, not just an ethical obligation. Trust went up because expectations went down. Setting realistic limits on what the AI could do made the whole product feel more honest.\n\nThe quick-action buttons were a last-minute addition during testing. They became the most-used feature. I'd gone into that test thinking visual hierarchy was the main deliverable. I came out knowing the interaction model mattered more. That's a meaningful reordering of priorities.\n\nThe hardest constraint on this project, not being able to fix the AI itself, turned out to be the most useful. It forced every decision into the interface layer: information architecture, visual hierarchy, interaction patterns. Nothing could lean on 'the AI will handle it.' That discipline is something I'd impose even when it's not required.",
      learnings: [
        {
          title: "Transparency is a design element",
          description:
            "'AI can make mistakes' increased trust because it set honest expectations. Designing for honesty — not perfection — is what makes a product feel safe.",
        },
        {
          title: "Test your assumptions about what matters",
          description:
            "Quick-action buttons were a last-minute testing addition — and became the most-used feature. The interaction model mattered more than the visual system I'd prioritized.",
        },
        {
          title: "Constraints force better decisions",
          description:
            "Not being able to fix the AI pushed every solution into the interface layer: information architecture, visual hierarchy, interaction patterns. Boundaries clarify thinking.",
        },
      ],
      futureList: [
        "Onboarding flow to surface personalization before users hit the chat for the first time — right now every accessibility feature is buried in settings",
        "Voice input — came up in interviews more than expected and worth prototyping seriously",
        "Collaborative features: shared study sessions using the same AI tutor",
        "Learning progress dashboard — not just conversation history, but showing students what they've actually covered and retained over time",
      ],
      tools: ["Figma", "Photoshop", "Google Forms", "Zoom", "Microsoft Fluent 2"],
    },

    images: [
      { src: "/ZA1_Hero_Image.png", ratio: 51.9, caption: "Zu-AI chat experience — overview" },
      { src: "/ZA2_Research.png", ratio: 81.3, caption: "Research findings and pain point map" },
      { src: "/ZA3_Wireframes.png", ratio: 77.7, caption: "Wireframe to high-fidelity progression" },
      { src: "/ZA4_Redesign.png", ratio: 72.6, caption: "Chat interface redesign — visual hierarchy and quick actions" },
      { src: "/ZA5_Dashboard.png", ratio: 59.1, caption: "ChatBot dashboard — conversation management" },
      { src: "/ZA6_Accessibility.png", ratio: 59.1, caption: "Accessibility and personalization settings" },
      { src: "/ZA7_Key_decisions.png", ratio: 48.7, caption: "Key design decisions and impact metrics" },
    ],
    nextProject: "tech-japan",
    image: "/ZA4_Redesign.png",
  },
];

export default caseStudies;
