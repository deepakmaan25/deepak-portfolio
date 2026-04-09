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
        "Zu-AI had 100K+ students using it as a learning tool. The concept was solid — an AI tutor that makes studying feel less like work. But the experience wasn't delivering on that promise.\n\nStudents were dealing with walls of unformatted text, a chatbot with no memory between sessions, and no way to personalize anything. There was also a quieter problem: they didn't know when to trust what the AI said. No disclaimer. No caveats. No signal that it could be wrong — and for a learning tool, that matters.\n\nEngagement was low. Sessions were getting abandoned before students found what they came for.",
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
        "Three constraints shaped every decision. I couldn't touch the AI model itself — accuracy and content were out of scope. The timeline was two weeks, research to high-fidelity. And the design system had to align with Microsoft Fluent 2.\n\nThat last constraint was actually useful. It meant style decisions weren't up for debate — every choice had to be justified by the research, not by what looked interesting. That's a good discipline to have when you're working fast.",
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
            "The chat needed to feel like a learning tool that adapted to the student — not a generic Q&A box.",
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
        title: "Solution 1 — Chat Interface Redesign",
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
        title: "Solution 2 — ChatBot Dashboard",
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
        title: "Solution 3 — Accessibility & Personalization",
        subtitle: "An experience that adapts to every student",
        problem:
          "Students studying late needed dark mode. Students with visual impairments needed larger text. Students who'd been using the app for months wanted it to feel like theirs. None of that was possible. The experience was identical for everyone, regardless of need or preference.",
        body: [
          "Dark/light mode toggle, four text size presets, background color options, theme selection. Custom avatars for user and AI. Name personalization. Chat bubble styles. WCAG 2.1 AA compliance across all interactive elements.",
          "Two trust features came directly from the research and almost didn't make the cut: a visible encryption badge in settings, and an inline disclaimer — 'AI can make mistakes — verify important information.' I nearly cut the disclaimer as too small a detail. In testing, it was one of the things users mentioned most. Setting honest expectations turned out to increase trust more than anything visual I'd designed. Transparency isn't just an ethical choice — it's a design element that directly affects how safe a product feels to use.",
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
        "The disclaimer moment was the most unexpected part of this project. I added it as a small honesty feature — almost an afterthought. It became the thing users mentioned most positively in testing. That taught me something I hadn't expected: transparency is a design element, not just an ethical obligation. Trust went up because expectations went down. Setting realistic limits on what the AI could do made the whole product feel more honest.\n\nThe quick-action buttons were a last-minute addition during testing. They became the most-used feature. I'd gone into that test thinking visual hierarchy was the main deliverable. I came out knowing the interaction model mattered more. That's a meaningful reordering of priorities.\n\nThe hardest constraint on this project — not being able to fix the AI itself — turned out to be the most useful. It forced every decision into the interface layer: information architecture, visual hierarchy, interaction patterns. Nothing could lean on 'the AI will handle it.' That discipline is something I'd impose even when it's not required.",
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
            "Not being able to fix the AI pushed every solution into the interface layer — information architecture, visual hierarchy, interaction patterns. Boundaries clarify thinking.",
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
    image: "/ZA1_Hero_Image.png",
  },

  // ─────────────────────────────────────────────
  // TECH JAPAN
  // ─────────────────────────────────────────────
  {
    slug: "tech-japan",
    title: "Tech Japan",
    subtitle: "UX Research & Platform Redesign",
    tagline:
      "Two months embedded in a job platform used by IIT students — finding what was breaking their trust, and fixing it",
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
        "Tech Japan connects IIT engineering students with Japanese companies hiring for technical roles. The platform had real users, real companies, real placements happening. It worked.\n\nBut a set of problems had accumulated that, individually, looked like edge cases. Together, they were making the platform feel unreliable at exactly the wrong moments — when a student was deciding whether to trust a company enough to apply, and when they were trying to complete their profile before a deadline.\n\nBroken company links. Dark mode contrast so low entire sections were unreadable. No way to manage multiple resumes. Post-application communication happening entirely on WhatsApp — completely outside the platform. A profile flow that silently lost your data if you forgot to save each section individually.",
      description:
        "I researched these issues with 10 IIT students, documented 9 distinct pain points with supporting evidence, prioritized using a MoSCoW framework, and designed solutions for the critical ones. Six shipped to production — including the job description layout, accessibility fixes, Save All profile flow, and an in-platform communication system.",
      contribution:
        "Sole researcher and designer. I recruited participants, mapped the platform myself before any sessions, ran interviews, and synthesized findings into a prioritized brief the team could act on. I also designed solutions in Figma, ran usability testing on redesigns, and conducted a separate rebranding survey as the company transitioned from Tech Japan to Talendy.",
    },

    research: {
      heading: "What I Found",
      body:
        "Before talking to anyone, I walked through the platform myself end-to-end — created an account, built a profile, browsed listings, started an application. That gave me a baseline and meant I could follow up on specific moments in interviews rather than asking users to describe their general experience.\n\nNine pain points emerged across 10 interviews and 50+ survey responses.\n\n**Dark mode contrast** — 7 of 10 users. Text was so low-contrast in dark mode that entire sections were unreadable. This hit hardest for students studying late — exactly the users most likely to have dark mode on.\n\n**Broken company links** — 6 of 10 users. Clicking through to a company page returned an error at the exact moment a student was deciding whether to trust a company enough to apply. The critical thing I flagged to the team: an error page at that moment doesn't read as a bug — it reads as a red flag about the company itself. Legitimacy and trust failure, not a technical inconvenience.\n\n**Job description layout** — 4 of 10 users. All the information was present but presented as one long unformatted block. Fine if you're reading carefully. Impossible if you're quickly assessing whether a role is worth pursuing.\n\n**Post-application communication via WhatsApp** — 4 of 10 users. Once someone applied, everything moved off-platform. Users found it unprofessional. The larger issue I framed for the team: Tech Japan had zero visibility into what happened after someone applied. Every offer, every rejection, every follow-up — all happening in an app they had no access to.\n\n**Multiple resumes** — 3 of 10 users. IIT students apply across product, software engineering, design, and analytics tracks. Each needs a different resume. The platform allowed one.\n\n**Save All profile flow** — 2 of 10 users. Each profile section required a separate save. Miss one and the data was gone silently. Two users described abandoning profile completion because of it.",
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
        title: "Solution 1 — Job Description Layout",
        subtitle: "Is this role right for me? Answerable in 10 seconds.",
        problem:
          "The problem wasn't missing information — it was presentation. Requirements, compensation, company details, and application instructions all ran together in a single block of text. Anyone scanning to quickly assess whether a role was worth pursuing couldn't.",
        body: [
          "I restructured job descriptions into clearly labeled sections — role overview, company details, requirements, how to apply. Company links were fixed here too, directly addressing the legitimacy concern several users had raised separately.",
          "Students were trying to answer two questions quickly: is this role right for me, and is this company legitimate? The redesign made both answerable without reading the full page.",
        ],
      },
      {
        title: "Solution 2 — Dark Mode & Accessibility",
        subtitle: "WCAG 2.1 AA compliance across every screen",
        problem:
          "Seven of 10 users flagged dark mode. On internship detail pages and company profiles, contrast ratios were low enough to make text genuinely unreadable. The most affected users were studying late at night — exactly the audience most likely to have dark mode enabled.",
        body: [
          "I walked through the platform in dark mode screen by screen and mapped every contrast failure before opening Figma. Updated color values to meet WCAG 2.1 AA across all affected surfaces. Improved button visibility and standardized how interactive elements were treated across light and dark themes.",
          "This is the kind of issue that's invisible if you only test in optimal conditions — and obvious the moment you sit with a real user in their actual environment. The platform had been tested. Nobody had tested it in dark mode, at midnight, on a laptop screen.",
        ],
      },
      {
        title: "Solution 3 — Multiple Resume Management",
        subtitle: "One platform. Every version of you.",
        problem:
          "IIT students don't apply to one type of role. Product, software engineering, design, analytics — each track needs a tailored resume. The platform supported one. Changing it meant downloading, renaming, uploading — a workflow that happened entirely outside the platform.",
        body: [
          "I decided not to build resume tailoring into the platform — that would have required AI capability the team didn't have and wasn't in scope. The better insight was simpler: students already had multiple resume versions. The platform was adding unnecessary friction on top of a workflow they'd already figured out for themselves. The fix was making that workflow native.",
          "A resume library inside the profile: upload and label multiple versions — 'Product Resume,' 'Dev Resume,' 'General' — and select the right one at the point of application without leaving the job listing.",
        ],
      },
      {
        title: "Solution 4 — Save All Profile Flow",
        subtitle: "Fill once. Save once. Done.",
        problem:
          "Profile completion required a separate save after every section. Miss one — easy to do in a long form — and the data was gone without warning. Two users described abandoning profile completion entirely because of this.",
        body: [
          "A single Save All action that captures the complete profile state at once. Unsaved-change indicators per section so you can see at a glance what's pending before committing. A clear confirmation after saving so you know it worked.",
          "The root issue was a mismatch between the user's mental model — one profile they're filling out — and how the system was actually treating it — a series of independent saves with no relationship to each other. Aligning the system to how people think about the task eliminated the problem entirely.",
        ],
      },
      {
        title: "Solution 5 — Built-in Communication Tool",
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
      { src: "/01-project-overview.png",            ratio: 62.5,  caption: "Project overview — redesigning a hiring platform IIT students trust" },
      { src: "/02-pain-point-frequency.png",        ratio: 84.25, caption: "Pain point frequency analysis — 9 issues mapped across 10 IIT student interviews" },
      { src: "/03-wireframe-to-hifi.png",           ratio: 75.05, caption: "Design process — wireframe to mid-fidelity to high-fidelity progression" },
      { src: "/04-job-description-before-after.png", ratio: 64.85, caption: "Solution 1: Job description layout — unformatted block redesigned into scannable categorized layout" },
      { src: "/05-dark-mode-before-after.png",      ratio: 76.55, caption: "Solution 2: Dark mode & accessibility — contrast ratios fixed from 1.2:1 to 7.4:1+" },
      { src: "/06-resume-management.png",           ratio: 72.55, caption: "Solution 3: Multiple resume management — upload, label, and select per application" },
      { src: "/07-save-all-flow.png",               ratio: 82.85, caption: "Solution 4: Save all profile flow — one action captures every section with unsaved-change indicators" },
      { src: "/08-communication-tool.png",          ratio: 64.95, caption: "Solution 5: Built-in communication tool — every conversation stays inside the platform" },
      { src: "/TJ-rebranding-survey.png",           ratio: 90.70, caption: "Rebranding survey — 71% awareness gap and brand perception across 50+ IIT students" },
    ],
    nextProject: "zu-ai",
    image: "/06-resume-management.png",
  },
];

export default caseStudies;
