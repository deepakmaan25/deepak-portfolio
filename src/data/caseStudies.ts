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
    role: "Product Design Intern (Assessment Project)",
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
        "Zu-AI had 100K+ students using it as a learning tool. The core idea was solid — an AI tutor that makes studying feel less like work. But the experience wasn't delivering on that promise.\n\nStudents were dealing with walls of text they couldn't scan, a chatbot that forgot them every session, and no way to make it feel like their own tool. There was also a quieter problem: they didn't know when to trust what it said. No disclaimer, no caveats, no indication the AI could be wrong. For a learning tool, that's a real issue.\n\nThe result was low engagement and sessions being abandoned before students got what they came for.",
      description:
        "I redesigned the chat interface to feel more human, trustworthy, and personalized — introducing visual hierarchy improvements, a chat dashboard for context-switching, and accessibility controls that let students make it their own.",
      contribution:
        "I was brought in to assess the experience and redesign the chat interface. Over two weeks, I ran research with 33 participants — 10 interviews and 23 survey responses — and took the product from problem definition to high-fidelity prototype.",
    },

    research: {
      heading: "What I Found",
      body:
        "I started with app store reviews before talking to anyone — 100+ across iOS and Android. That gave me enough signal to know where to point the interviews, and meant I wasn't going into sessions cold.\n\nTwo things came up consistently.\n\n**Information overload** — 60% of survey respondents flagged this. Responses were long, unbroken blocks of text with no formatting, no hierarchy, nothing to help you find the part you actually needed. Students weren't reading — they were scanning and giving up.\n\n**No sense of personalization** — 40% wanted the chat to feel like it knew them. It didn't remember anything between sessions. Responses felt generic. There was no way to adjust text size, switch to dark mode, or even change how the AI addressed them.\n\nA few other things worth noting: no encryption visible in settings, no disclaimer that the AI could be wrong, navigation friction when switching subjects. Small individually — together, they added up to an experience that felt untrustworthy and unfinished.",
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
        "A few constraints shaped every decision. I couldn't touch the AI model itself — accuracy and content issues were out of scope. Two weeks, research to high-fidelity. And the design system needed to align with Microsoft Fluent 2.\n\nThat last constraint was actually useful — it meant I wasn't making style decisions for their own sake. Every choice had to be justified by the research, not just what looked good.",
      constraints:
        "Couldn't change the AI model itself — content and accuracy were out of scope. Timeline was 2 weeks from research to high-fidelity. Design system aligned with Microsoft Fluent 2.",
      pillars: [
        {
          icon: "🔍",
          title: "Build Trust Through Transparency",
          description:
            "Students needed to know when they could rely on the AI — and when to verify information.",
        },
        {
          icon: "🧠",
          title: "Reduce Cognitive Load",
          description:
            "Information overload was the #1 complaint. Responses needed structure, not just better writing.",
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
            "Lo-fi wireframes for 3 concept directions",
            "Selected strongest direction based on research alignment",
            "High-fidelity mockups in Figma",
            "Usability testing with 5 users and refinement",
          ],
        },
      ],
    },

    solutions: [
      {
        title: "Solution 1 — Chat Interface Redesign",
        subtitle: "Visual hierarchy that makes scanning effortless",
        problem:
          "The core issue wasn't that responses were too long. It was that there was no way to quickly find the part that mattered. Everything looked the same — same weight, same size, no entry points for someone scanning.",
        body: [
          "Responses now break into digestible sections with clear headings and visual separators between concepts. Typography differentiates heading, body, and code. Color-coding distinguishes message types — explanations, examples, actions to take. Inline formatting gives the eye somewhere to land.",
          "I also added contextual quick-action buttons — 'Explain this further,' 'Show an example' — that appear based on what's being discussed. These came out of testing, not the original brief. Students were spending time thinking about what to ask next rather than actually learning. The quick actions removed that friction.",
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
          "If you're studying Math in one session and Physics in another, there was no continuity. You'd open the app and be back at a blank chat. Whatever context you'd built — the way you'd framed questions, the thread of a topic — was gone.",
        body: [
          "A dashboard view with visual conversation cards per subject — showing a preview of the last message and a timestamp. Quick-switch between ongoing conversations without losing context. Search to find past explanations. Bookmarking for things worth keeping. Auto-categorization by subject with recently-accessed chats surfaced first.",
          "The core idea: your study context should persist the way your notes do.",
        ],
        metrics: [
          { value: "50%", label: "Faster multi-topic study sessions" },
        ],
      },
      {
        title: "Solution 3 — Accessibility & Personalization",
        subtitle: "An experience that adapts to every student",
        problem:
          "Students studying late at night needed dark mode. Students with visual impairments needed larger text. Students who'd been using the app for months wanted it to feel like theirs. None of that was possible.",
        body: [
          "Dark/light mode toggle, four text size presets, background color options, theme selection. Custom avatars for user and AI. Name personalization. Chat bubble styles.",
          "I also added two trust features that came directly from the research: a visible encryption badge in settings, and a disclaimer — 'AI can make mistakes — verify important information' — inline with responses. That second one felt small when I added it. In testing, it was one of the things users mentioned most positively. Setting realistic expectations turned out to increase trust more than anything visual I'd designed.",
          "WCAG 2.1 AA compliance across all contrast and interactive elements.",
        ],
        metrics: [
          { value: "30%", label: "Projected increase in daily active users" },
        ],
      },
    ],

    impact: {
      heading: "Results",
      body:
        "Testing was done with 5 users. Quantitative benchmarks are drawn from comparable learning and productivity apps — Duolingo, Notion, and published usability research on structured vs. unstructured text interfaces. Being upfront about that: 5-person tests don't produce statistically valid percentages. What they gave me was directional confidence that the solutions were addressing real needs.",
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
        "The disclaimer moment taught me something I didn't expect: transparency is a design element, not just an ethical obligation. Adding 'AI can make mistakes' wasn't a concession — it was the thing that made students feel the product was being honest with them. Trust went up because expectations went down.\n\nThe quick-action buttons were a last-minute addition during testing. They became the most-used feature. I'd gone into that test thinking visual hierarchy was the main deliverable. I came out knowing the interaction model mattered more.\n\nThe hardest constraint on this project was also the most useful: I couldn't fix the AI. That forced me to work entirely within the interface layer — information architecture, visual hierarchy, interaction patterns. Everything I changed had to earn its place because there was no shortcut.",
      learnings: [
        {
          title: "Transparency is a design element",
          description:
            "The 'AI can make mistakes' disclaimer increased trust because it set realistic expectations. Transparency beats perfection.",
        },
        {
          title: "Small interactions, big impact",
          description:
            "Quick-action buttons were a last-minute addition during testing — and became the most-loved feature. The smallest details often have the biggest UX impact.",
        },
        {
          title: "Constraints drive creativity",
          description:
            "Not being able to fix content or technical issues forced focus on what I could control — information architecture, visual hierarchy, and interaction patterns.",
        },
      ],
      futureList: [
        "Onboarding flow to help users personalize before they hit the chat for the first time — right now those features are only discoverable if you go looking",
        "Voice input — came up in interviews more than expected and worth prototyping",
        "Collaborative features: study groups using the same AI tutor",
        "Learning progress dashboard — not just conversation history, but showing students what they've actually covered over time",
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
      { value: "80%", label: "Improved Navigation" },
      { value: "70%", label: "Feature Adoption" },
      { value: "9", label: "Pain Points Fixed" },
    ],

    stats: [
      { value: "10", label: "IIT students interviewed" },
      { value: "50+", label: "Survey responses" },
      { value: "9", label: "Pain points documented" },
      { value: "6", label: "Solutions shipped" },
    ],

    overview: {
      problem:
        "Tech Japan connects IIT engineering students with Japanese companies hiring for technical roles. The concept works. The platform had real users, real companies, real placements happening.\n\nBut the experience had accumulated a set of problems that, individually, looked minor. Together, they were making the platform feel untrustworthy and unfinished at exactly the moments that mattered most — when a student was deciding whether to apply, and when they were trying to complete their profile.\n\nBroken company links. Dark mode contrast so low that sections were unreadable. No way to manage multiple resumes. Post-application communication happening entirely on WhatsApp, completely outside the platform. A profile flow that lost your data if you forgot to save each section individually.",
      description:
        "I researched these issues with 10 IIT students, documented 9 distinct pain points with supporting evidence, prioritized them using a MoSCoW framework, and designed fixes for the critical ones. Several shipped — including the job description layout, accessibility fixes, Save All profile flow, and the communication tool.",
      contribution:
        "I was the sole researcher: recruited participants, ran interviews, synthesized findings into something the team could act on, and designed solutions in Figma. I also ran a rebranding survey as the company transitioned from Tech Japan to Talendy, and designed a recruiter-side hiring dashboard.",
    },

    research: {
      heading: "What I Found",
      body:
        "I interviewed 10 IIT students and ran a survey with 50+ responses. Before the interviews, I mapped the platform end-to-end myself — creating an account, building a profile, browsing jobs, starting an application. That gave me a baseline and meant I could follow up on specific moments in sessions rather than asking general questions.\n\nNine pain points emerged:\n\n**Dark mode contrast** — 7 of 10 users. Text was so low-contrast in dark mode that entire sections were unreadable. Hitting hardest for students studying late at night — exactly the users most likely to have dark mode on.\n\n**Broken company links** — 6 of 10 users. Clicking through to a company page returned an error at the exact moment a student was deciding whether to trust a company enough to apply. An error page at that moment doesn't read as a bug — it reads as a red flag about the company itself.\n\n**Job description layout** — 4 of 10 users. All the information was there, but presented as one long unformatted block. Fine if you're reading carefully. Impossible if you're quickly assessing whether a role is worth pursuing.\n\n**Post-application communication** — 4 of 10 users. Once someone applied, everything moved to WhatsApp. Users described it as unprofessional. The bigger issue I framed for the team: Tech Japan had zero visibility into what happened after someone applied. Every follow-up, every offer, every rejection — all happening in an app they had no access to.\n\n**Multiple resumes** — 3 of 10 users. IIT students apply across product, software engineering, design, and analytics tracks. Each needs a different resume. The platform allowed one.\n\n**Save All profile flow** — 2 of 10 users. Each profile section required a separate save. Miss one and you lose that data. Two users described abandoning profile completion because of this.",
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
        "Nine issues is too many to fix at once — so the first real design decision was deciding what order mattered.\n\nI used a MoSCoW framework and one principle: fix the things actively destroying trust before fixing the things causing friction. Friction is recoverable — a user who struggles to complete their profile might still come back. A user who sees an error page on a company listing and thinks 'is this even a real company?' probably doesn't.",
      pillars: [
        {
          icon: "🔴",
          title: "Must Have",
          description:
            "Dark mode contrast, broken company links — both destroying trust at critical decision moments.",
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
            "Reports filtering, redundant questions auto-fill, mobile responsiveness overhaul.",
        },
      ],
      steps: [
        {
          week: "Research",
          label: "Discover & Document",
          items: [
            "Self-walkthrough of the full platform before any interviews",
            "10 semi-structured interviews with IIT students",
            "50+ survey responses for quantitative validation",
            "9 pain points mapped with frequency across participants",
          ],
        },
        {
          week: "Design",
          label: "Prioritize & Ship",
          items: [
            "MoSCoW prioritization framework applied to 9 issues",
            "High-fidelity designs in Figma for all priority solutions",
            "Usability testing to validate redesigns",
            "6 solutions shipped to production",
          ],
        },
      ],
    },

    solutions: [
      {
        title: "Solution 1 — Job Description Layout",
        subtitle: "Is this role right for me? Answerable in 10 seconds.",
        problem:
          "The problem wasn't missing information — it was presentation. Requirements, compensation, company details, and application instructions were all in one block. A careful reader could get through it. Anyone scanning — which is most people evaluating a role — couldn't.",
        body: [
          "A restructured layout with clearly labeled sections — role overview, company details, requirements, how to apply. Company links were also fixed here, addressing the legitimacy concern several users raised separately.",
          "Students were trying to answer two questions quickly: is this role right for me, and is this company real? The redesign made both answerable without reading the entire page.",
        ],
      },
      {
        title: "Solution 2 — Dark Mode & Accessibility",
        subtitle: "WCAG 2.1 AA compliance across every screen",
        problem:
          "7 of 10 users flagged dark mode. On internship detail pages and company profiles, contrast was too low to read. The students most affected were studying late at night — exactly the users most likely to have dark mode on.",
        body: [
          "I went through the platform in dark mode screen by screen and mapped every contrast failure. Updated color values to meet WCAG 2.1 AA, improved button visibility, made interactive element treatment consistent across light and dark themes.",
          "This is the kind of issue that's easy to miss if you only test in ideal conditions — and obvious the moment you sit with a real user in their actual environment.",
        ],
      },
      {
        title: "Solution 3 — Multiple Resume Management",
        subtitle: "One platform, every version of you",
        problem:
          "IIT students don't apply to one type of role. Product, software engineering, design, analytics — each track needs a different resume. The platform supported one. Swapping it out meant downloading, renaming, uploading — outside the platform entirely.",
        body: [
          "A resume library inside the profile. Upload and label multiple versions — 'Product Resume,' 'Dev Resume,' 'General' — and select the right one at the point of application without leaving the job page.",
          "The mental model already existed. Students were already maintaining multiple versions in Google Drive or on their laptop. The platform was adding friction on top of a workflow they'd already figured out. The fix was just making that workflow native.",
        ],
      },
      {
        title: "Solution 4 — Save All Profile Flow",
        subtitle: "Fill once. Save once. Done.",
        problem:
          "Profile completion required a separate save after every section. Miss one — easy to do in a long form — and you lose that data. Two users described abandoning profile completion because of it.",
        body: [
          "A single Save All action that captures the full profile state at once, with unsaved-change indicators per section so you can see at a glance what's pending. A confirmation message after saving so you know it worked.",
          "The root issue was a mismatch between how users thought about their profile — one thing they're filling out — and how the system was treating it — a series of independent saves. The fix was aligning the system to how people actually think about the task.",
        ],
      },
      {
        title: "Solution 5 — Built-in Communication Tool",
        subtitle: "Keep the entire hiring journey on one platform",
        problem:
          "Post-application, everything moved to WhatsApp — interview scheduling, task assignments, status updates. Users described it as unprofessional and disconnected.",
        body: [
          "I framed this for the team as two problems. For users: it felt unprofessional. For Tech Japan: they had zero visibility into what happened after someone applied. Every follow-up, every offer, every rejection — all happening in an app they had no access to. That's not just a UX problem — it's a product problem.",
          "An in-platform messaging and notification system: status updates, document requests, direct messages with HRs, interview scheduling — all inside the platform from application through to outcome.",
          "The framing shift was what got this prioritized. 'Users want better chat' is a feature request. 'You have no visibility into what happens after someone applies' is a business case.",
        ],
      },
    ],

    impact: {
      heading: "Testing & Results",
      body:
        "Testing was done with real users in real sessions — not projections.\n\n80% of participants said navigation felt easier, particularly around the job layout and new categorization. 70% used the resume management and communication features without being prompted — which, in a usability test, is a stronger signal than task completion rate. It means the features were self-explanatory enough that people reached for them naturally.\n\nThe feedback also flagged things still needing work: button visibility in dark mode needed more refinement in spots, tooltips for new features could be clearer, and mobile responsiveness needed a more comprehensive pass rather than individual patches.\n\n6 solutions shipped to production during and after the internship.",
      metrics: [
        { value: "80%", label: "Reported easier navigation" },
        { value: "70%", label: "Used new features unprompted" },
        { value: "6", label: "Solutions shipped to production" },
      ],
    },

    reflection: {
      heading: "What I Took Away",
      body:
        "The biggest shift for me on this project was learning that how you frame a finding determines whether it gets acted on.\n\nThe WhatsApp issue had been known before I got there. It hadn't moved up the priority list. When I reframed it as 'you have zero visibility into what happens after someone applies,' it became a different conversation. Same finding, completely different reception. That's not spin — it's knowing what actually matters to the people you're presenting to.\n\nThe broken company link taught me something about scope. That's not a design problem in the traditional sense — it's a bug. But it was the single thing most likely to make a user close the tab and not come back. If I'd scoped my research to 'design issues only,' I'd have missed the most trust-critical problem on the platform.",
      learnings: [
        {
          title: "Frame findings around business impact",
          description:
            "'You have no visibility into what happens after someone applies' landed. 'Users want better chat' didn't. Same insight — completely different reception.",
        },
        {
          title: "UX research has to account for bugs",
          description:
            "The broken company link was a bug, not a design problem. But it was the single thing most likely to make a user close the tab — because it raised a question about whether the companies were even real.",
        },
        {
          title: "Testing numbers come from real sessions",
          description:
            "The 80% and 70% figures came from observed sessions — not projections. 10 users isn't a statistically significant sample, but it gave enough directional confidence to make a case for what to build next.",
        },
      ],
      futureList: [
        "Onboarding flow for first-time users — right now there's no guidance and several features are only discoverable if you go looking",
        "Full mobile responsiveness overhaul — not just individual patches",
        "Redundant question auto-fill — reuse answers across similar applications",
        "Post-application status tracking visible directly in the platform, closing the loop for candidates who currently have no idea where they stand",
      ],
      tools: ["Figma", "Google Forms", "Zoom", "Poppins / Euclid Circular B"],
    },

   images: [
      { src: "/01-project-overview.png",       ratio: 0.625,  caption: "Project overview — redesigning a hiring platform IIT students trust" },
      { src: "/02-pain-point-frequency.png",   ratio: 0.8425, caption: "Pain point frequency analysis — 9 issues mapped across 10 IIT student interviews" },
      { src: "/03-wireframe-to-hifi.png",      ratio: 0.7505, caption: "Design process — wireframe to mid-fidelity to high-fidelity progression" },
      { src: "/04-job-description-before-after.png",        ratio: 0.6485, caption: "Solution 1: Job description layout — unformatted block redesigned into scannable categorized layout" },
      { src: "/05-dark-mode-before-after.png",              ratio: 0.7655, caption: "Solution 2: Dark mode & accessibility — contrast ratios fixed from 1.2:1 to 7.4:1+" },
      { src: "/06-resume-management.png",      ratio: 0.7255, caption: "Solution 3: Multiple resume management — upload, label, and select per application" },
      { src: "/07-save-all-flow.png",          ratio: 0.8285, caption: "Solution 4: Save all profile flow — one action captures every section with unsaved-change indicators" },
      { src: "/08-communication-tool.png",     ratio: 0.6495, caption: "Solution 5: Built-in communication tool — every conversation stays inside the platform" },
      { src: "/09-rebranding-survey.png",      ratio: 0.907,  caption: "Additional research: Rebranding survey — 71% awareness gap and brand perception across 50+ IIT students" },
    ],
    nextProject: "zu-ai",
  },
];

export default caseStudies;
