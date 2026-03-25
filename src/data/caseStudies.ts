// src/data/caseStudies.ts
// Full case study data — Zu-AI + Tech Japan (Talendy)

export interface Outcome {
  metric: string;
  label: string;
}

export interface ImagePlaceholder {
  id: number;
  caption: string;
  aspectRatio?: string; // e.g. "16/9" | "4/3" | "1/1"
}

export interface CaseStudySection {
  type: "overview" | "insight" | "solution" | "process" | "impact" | "reflection";
  heading: string;
  subheading?: string;
  body: string; // markdown-lite: supports **bold**, > blockquotes, bullet lines starting with "- "
  image?: ImagePlaceholder;
  images?: ImagePlaceholder[];
  stats?: { value: string; label: string }[];
  quotes?: string[];
  pillars?: { icon: string; title: string; desc: string }[];
  steps?: { week: string; title: string; items: string[] }[];
  learnings?: { title: string; body: string }[];
  futureItems?: string[];
}

export interface CaseStudy {
  id: string;         // "01", "02" — watermark number
  slug: string;       // URL slug
  tag: string;        // e.g. "UX Research · Mobile"
  title: string;      // supports — separator for italic styling
  description: string;
  metric: string;     // big number e.g. "40%"
  metricLabel: string; // first word gets accent color
  outcomes: Outcome[];
  // Hero / meta
  role: string;
  timeline: string;
  platform: string;
  year: string;
  heroTagline: string;
  // Sections
  sections: CaseStudySection[];
}

export const caseStudies: CaseStudy[] = [
  // ─────────────────────────────────────────
  // 01 · ZU-AI
  // ─────────────────────────────────────────
  {
    id: "01",
    slug: "zu-ai",
    tag: "Product Design · Mobile App",
    title: "Zu-AI — Chat Experience Redesign",
    description:
      "Redesigning an AI tutoring chat to feel human, trustworthy, and personalized for 100K+ students.",
    metric: "40%",
    metricLabel: "faster information scanning",
    outcomes: [
      { metric: "40%", label: "Faster Scanning" },
      { metric: "3×", label: "Task Completion" },
      { metric: "50%", label: "Less Context-Switching" },
    ],
    role: "Product Design Intern (Assessment Project)",
    timeline: "March 2024 · 2 Weeks",
    platform: "Mobile App (iOS / Android)",
    year: "2024",
    heroTagline:
      "Making AI learning feel human, trustworthy, and personalized for 100K+ students",

    sections: [
      // ── Executive Summary ──
      {
        type: "overview",
        heading: "The Problem",
        body: `Zu-AI's 100K+ students were struggling with a robotic, overwhelming chat experience. The AI tutor — meant to make learning addictive — felt impersonal and difficult to navigate. Users couldn't trust responses, felt information overload, and lacked customization options, leading to low engagement and session abandonment.

I redesigned the chat interface to feel more human, trustworthy, and personalized. By introducing accessibility controls, a chat dashboard for context switching, and visual hierarchy improvements, I transformed the experience from a basic Q&A tool into an adaptive learning companion.

As the **sole designer** on this assessment project, I led the entire design process: conducted user research with 33 participants (10 interviews + 23 survey responses), synthesized insights into actionable design patterns, created high-fidelity prototypes, and validated solutions through usability testing.`,
        stats: [
          { value: "33", label: "Research participants" },
          { value: "10", label: "User interviews" },
          { value: "23", label: "Survey responses" },
          { value: "2 wks", label: "Research to hi-fi" },
        ],
      },

      // ── Research ──
      {
        type: "insight",
        heading: "Understanding the Problem",
        body: `I started by understanding how students actually used Zu-AI. After interviewing 10 users and surveying 23 more, clear patterns emerged.`,
        quotes: [
          "Sometimes, it's hard to explain what I need help with, and the chatbot doesn't always understand me. It would be great if it could suggest study resources or explain concepts with visuals.",
          "I want to feel like I'm talking to a friend when I use the chatbot, but sometimes it feels too robotic.",
          "I wish the chatbot could understand my schedule better. It's frustrating having to repeat my tasks every time I log in.",
        ],
        body: `From analyzing app store reviews and user feedback, I identified the core pain points:

**60% reported Information Overload** — long, unbroken text blocks were hard to scan, with no visual hierarchy in responses.

**40% wanted More Personalization** — generic responses felt robotic; no memory of past conversations, no customization.

**Other critical issues:** Trust deficit with no indication when AI might be wrong · No dark mode or text size controls · Navigation friction when switching subjects · No encryption or privacy assurances visible.`,
        image: {
          id: 1,
          caption: "Research findings — information overload (60%) and personalization needs (40%)",
          aspectRatio: "16/9",
        },
      },

      // ── Design Approach ──
      {
        type: "process",
        heading: "Design Approach",
        body: `I broke down the challenge into three strategic pillars, then worked within real constraints.`,
        pillars: [
          {
            icon: "🔍",
            title: "Build Trust Through Transparency",
            desc: "Users needed to know when they could rely on the AI — and when to verify information.",
          },
          {
            icon: "🧠",
            title: "Reduce Cognitive Load",
            desc: "Information overload was the #1 complaint. Responses needed better formatting and scannability.",
          },
          {
            icon: "🎨",
            title: "Enable Personalization",
            desc: "Students wanted the chat to feel like their learning companion, not a generic tool.",
          },
        ],
        body: `**Key constraints:** Couldn't change the AI model itself — content and accuracy issues were out of scope. Timeline was 2 weeks from research to high-fidelity designs. Design system aligned with **Microsoft Fluent 2** for consistency and accessibility.`,
        steps: [
          {
            week: "Week 1",
            title: "Empathize & Analyze",
            items: [
              "10 contextual inquiries with active Zu-AI users",
              "Analyzed 100+ app store reviews across Android/iOS",
              "Survey circulated to 23 users for quantitative validation",
              "Competitive analysis: ChatGPT, Duolingo, Khan Academy",
            ],
          },
          {
            week: "Week 2",
            title: "Ideate, Design & Test",
            items: [
              "Low-fidelity wireframes for 3 concept directions",
              "Selected strongest direction based on research alignment",
              "High-fidelity mockups in Figma",
              "Usability testing with 5 users + refinement",
            ],
          },
        ],
        images: [
          {
            id: 9,
            caption: "Wireframe to high-fidelity progression",
            aspectRatio: "16/9",
          },
          {
            id: 10,
            caption: "Design iteration examples showing refinements based on user feedback",
            aspectRatio: "16/9",
          },
        ],
      },

      // ── Solution 1: Chat Interface ──
      {
        type: "solution",
        heading: "Solution 1 — Chat Interface Redesign",
        subheading: "Visual hierarchy that makes scanning effortless",
        body: `**The Core Problem:** Students felt overwhelmed by walls of text and couldn't quickly scan for the information they needed.

**Breaking Down Information** — Split long responses into digestible paragraphs with clear headings. Added visual separators between concepts. Implemented progressive disclosure for detailed explanations.

**Visual Hierarchy** — Used typography scale to differentiate headings, body text, and code snippets. Introduced color-coded message types (explanations vs. examples vs. actions). Added inline formatting — bold, italics, lists — to improve scannability.

**Quick Actions** — Suggested prompts appear contextually ("Explain this further," "Show an example"). One-tap follow-up questions based on conversation context. Reduces repetitive typing and improves flow.`,
        images: [
          {
            id: 2,
            caption: "Before: plain text wall — After: structured with headings, formatting, and quick actions",
            aspectRatio: "16/9",
          },
          {
            id: 3,
            caption: "Chat interface showing visual hierarchy and message formatting",
            aspectRatio: "9/16",
          },
          {
            id: 4,
            caption: "Quick action buttons contextually appearing based on conversation",
            aspectRatio: "9/16",
          },
        ],
        stats: [
          { value: "40%", label: "Faster info location in usability tests" },
          { value: "3×", label: "Improvement in task completion speed" },
        ],
      },

      // ── Solution 2: Dashboard ──
      {
        type: "solution",
        heading: "Solution 2 — ChatBot Dashboard",
        subheading: "Persistent context across all your subjects",
        body: `**The Problem:** Users studying multiple subjects had to start fresh conversations each time, losing context and wasting time re-explaining their needs.

**Conversation Management** — Visual cards for each subject/topic with preview of last message. Quick-switch between ongoing conversations without losing context. Search functionality to find past discussions.

**History & Context** — Persistent chat history across sessions. Date-stamped conversations for easy reference. Ability to bookmark important explanations.

**Smart Organization** — Auto-categorization by subject (Math, Science, etc.). Recently accessed chats surfaced first. Archive completed topics to reduce clutter.`,
        images: [
          {
            id: 5,
            caption: "ChatBot Dashboard showing multiple conversation threads organized by subject",
            aspectRatio: "9/16",
          },
          {
            id: 6,
            caption: "Quick-switching between conversations with context preserved",
            aspectRatio: "9/16",
          },
        ],
        stats: [
          { value: "50%", label: "Faster multi-topic study sessions" },
        ],
      },

      // ── Solution 3: Accessibility ──
      {
        type: "solution",
        heading: "Solution 3 — Accessibility & Personalization",
        subheading: "An experience that adapts to every student",
        body: `**The Problem:** Students had diverse needs — some preferred dark mode for late-night studying, others needed larger text due to visual impairments. The app offered no customization.

**Visual Customization** — Dark/Light mode toggle · Text size controls (4 preset sizes) · Background color options for better contrast · Theme selection.

**Personal Touch** — Custom avatars for both user and AI · Name personalization ("Hey Sarah" vs "Hey there") · Chat bubble customization.

**Accessibility Standards** — WCAG 2.1 AA compliance for color contrast · Screen reader optimization · Keyboard navigation support.

**Trust Indicators** — Encryption badge visible in settings · Disclaimer: "AI can make mistakes — verify important information" · Source citations when available.`,
        images: [
          {
            id: 7,
            caption: "Accessibility settings page with dark mode, text size, and theme options",
            aspectRatio: "9/16",
          },
          {
            id: 8,
            caption: "Personalization options showing avatar customization and chat preferences",
            aspectRatio: "9/16",
          },
        ],
        stats: [
          { value: "30%", label: "Projected increase in daily active users" },
        ],
      },

      // ── Impact ──
      {
        type: "impact",
        heading: "Impact & Results",
        body: `Based on usability testing with 5 users and validated against industry benchmarks from Duolingo and Notion.`,
        stats: [
          { value: "40%", label: "Faster information scanning" },
          { value: "3×", label: "Task completion speed" },
          { value: "50%", label: "Reduction in context-switching time" },
          { value: "30%", label: "Projected DAU increase" },
        ],
        quotes: [
          "The new chat feels like talking to a real tutor, not a robot.",
          "I can finally customize it the way I like — makes studying at night so much better.",
          "Quick prompts are a game-changer. I don't have to think about what to ask next.",
        ],
        image: {
          id: 11,
          caption: "Impact metrics visualization",
          aspectRatio: "16/9",
        },
      },

      // ── Reflection ──
      {
        type: "reflection",
        heading: "What I Learned",
        body: `This project taught me that great UX isn't about adding features — it's about deeply understanding user pain and designing the simplest solution that addresses it.`,
        learnings: [
          {
            title: "Design for trust, not just aesthetics",
            body: "The simple addition of 'AI can make mistakes' disclaimer actually increased trust because it set realistic expectations. Transparency > perfection.",
          },
          {
            title: "Small interactions, big impact",
            body: "Quick-action buttons were a last-minute addition during testing, but became the most-loved feature. The smallest details often have the biggest UX impact.",
          },
          {
            title: "Constraints drive creativity",
            body: "Not being able to fix content/technical issues forced focus on what I could control — information architecture, visual hierarchy, and interaction patterns.",
          },
        ],
        futureItems: [
          "Onboarding flow to guide new users through personalization",
          "Voice input — many students mentioned wanting to speak to the AI",
          "Collaborative features: study groups using the same AI tutor",
          "Analytics dashboard: show students their learning progress over time",
        ],
      },
    ],
  },

  // ─────────────────────────────────────────
  // 02 · TECH JAPAN (TALENDY)
  // ─────────────────────────────────────────
  {
    id: "02",
    slug: "tech-japan",
    tag: "UX Research · Web Platform",
    title: "Tech Japan — UX Research & Platform Redesign",
    description:
      "Researching and redesigning a job platform used by IIT students to land roles in Japan.",
    metric: "80%",
    metricLabel: "improved navigation in testing",
    outcomes: [
      { metric: "80%", label: "Improved Navigation" },
      { metric: "70%", label: "Feature Adoption" },
      { metric: "9", label: "Pain Points Fixed" },
    ],
    role: "UX Research Intern",
    timeline: "September – November 2024 · 2 Months",
    platform: "Web (Desktop + Mobile)",
    year: "2024",
    heroTagline:
      "Researching and redesigning a job platform used by IIT students to land roles in Japan",

    sections: [
      // ── Overview ──
      {
        type: "overview",
        heading: "The Problem",
        body: `Tech Japan connects engineering students from IITs with Japanese companies looking to hire. The platform had a real use case, but the experience was letting it down. Users were running into broken company links, unreadable text in dark mode, no way to manage multiple resumes, and a post-application process that moved entirely to WhatsApp.

Small things on their own — but together they were making the platform feel **untrustworthy and unfinished**.

I spent two months researching these issues with 10 IIT students, documented **9 distinct pain points** with supporting evidence, and designed fixes for the most critical ones. Several made it into the product — including the job description layout, accessibility improvements, Save All profile flow, and the communication tool.

I was the **sole researcher** on this project: recruited participants, ran interviews, synthesized everything into something actionable, designed solutions in Figma, and presented findings to the team. In parallel, I ran a rebranding survey as the company transitioned from Tech Japan to Talendy, and designed a recruiter-side hiring dashboard.`,
        stats: [
          { value: "10", label: "IIT students interviewed" },
          { value: "50+", label: "Survey responses" },
          { value: "9", label: "Pain points documented" },
          { value: "6", label: "Solutions shipped" },
        ],
      },

      // ── Research ──
      {
        type: "insight",
        heading: "Understanding the Problem",
        body: `I started with a simple question: **why would a well-qualified IIT student abandon an application on a platform that could get them an international job?**

I ran 1:1 interviews with 10 students from IIT Dhanbad, Roorkee, Guwahati, Delhi, Hyderabad, and Bombay — 8 final year, 2 pre-final year, all actively job hunting or recently placed. I also collected 50+ survey responses alongside the interviews for the Talendy rebranding study.`,
        quotes: [
          "While clicking on a company's link, it takes you to a new page but you can't see any meaningful data — it shows an error every time. It leads to doubting the company's legitimacy.",
          "Once I apply, all communication happens on WhatsApp, which feels unprofessional. The flow kind of hinders.",
          "I need to upload different resumes for different profiles. There's no way to do that here.",
          "Building my profile was painful. I had to save each section separately, and if I forgot once, I had to rewrite everything.",
        ],
        body: `**9 pain points documented across the platform:**

**Dark mode issues** — mentioned by 7 of 10 users. Text contrast so low that sections were completely unreadable.

**Accessibility and bugs** — 6 users. Company page links returning errors at the exact moment users were deciding whether to trust a company.

**Job descriptions** — 4 users. Layout was functional for careful readers, but impossible to scan quickly.

**Communication and updates** — 4 users. Post-application, everything moved to WhatsApp — unprofessional and disconnected.

**Multiple resumes** — 3 users. Students apply to very different roles but the platform only allowed one resume.

**Reports section** — 3 users. Company reports shown regardless of which role was being applied for.

**Saving profile details** — 2 users. Every section had to be saved individually, losing data on any missed save.

**Responsiveness** — 3 users. Platform didn't hold up when zoomed or on mobile.

**Redundant questions** — 3 users. Same screening answers had to be rewritten from scratch for every application.`,
        image: {
          id: 1,
          caption: "Pain point map from user interviews — 9 issues with frequency count across 10 participants",
          aspectRatio: "16/9",
        },
      },

      // ── Prioritization ──
      {
        type: "process",
        heading: "What I Prioritized and Why",
        body: `With 9 issues documented, I used a **MoSCoW framework** to decide where to focus the design work first.

The broken company links and dark mode contrast problems went to the top. Both were creating moments where users either couldn't use the platform or actively lost trust in it — and trust is hard to rebuild once it's gone. Fixing a layout is recoverable. Having a user think a platform is showing them fake companies is not.

The Save All profile flow and multiple resume management came next — both were generating real frustration during the most important interaction on the platform: actually completing a profile and applying. The communication tool was scoped as a "should have" given development effort, but the user signal was strong enough to make it into the final recommendations.`,
        pillars: [
          {
            icon: "🔴",
            title: "Must Have",
            desc: "Dark mode contrast, broken company links — both destroying trust at critical decision moments.",
          },
          {
            icon: "🟡",
            title: "Should Have",
            desc: "Save All profile flow, multiple resume management, built-in communication tool.",
          },
          {
            icon: "🟢",
            title: "Could Have",
            desc: "Reports filtering, redundant questions auto-fill, mobile responsiveness overhaul.",
          },
        ],
      },

      // ── Solution 1 ──
      {
        type: "solution",
        heading: "Solution 1 — Job Description Layout",
        subheading: "Is this role right for me? Answerable in 10 seconds.",
        body: `**The problem:** Company requirements, role details, compensation, and application instructions were all presented as a single unformatted block. Users who were willing to read carefully could get through it, but anyone doing a quick scan couldn't assess a role at a glance.

**What I designed:** A restructured layout that breaks job information into clearly labeled sections — role overview, company details, requirements, how to apply. The company links were also fixed to actually resolve, which addressed the legitimacy concern several users raised.

Users wanted to answer two questions quickly: is this role right for me, and is this company real? The redesign made both answerable without reading the entire page.`,
        image: {
          id: 2,
          caption: "Before and after — unformatted job description block vs. categorized layout with working company links",
          aspectRatio: "16/9",
        },
      },

      // ── Solution 2 ──
      {
        type: "solution",
        heading: "Solution 2 — Dark Mode & Accessibility",
        subheading: "WCAG 2.1 AA compliance across every screen",
        body: `**The problem:** 7 of 10 users flagged dark mode as broken. On internship detail pages and company profiles, text contrast was too low to read — hitting hardest for students studying late at night, who are exactly the users most likely to have dark mode enabled.

**What I designed:** I went through the platform in dark mode and identified the specific screens and elements with contrast failures. Fixes included updated color values to meet WCAG 2.1 AA standards, improved button visibility, and consistent treatment of interactive elements across both light and dark themes.

This was one of the first fixes flagged for implementation. It's the kind of issue that's easy to miss if you only ever test in ideal conditions, but obvious the moment you sit with a user in their actual environment.`,
        image: {
          id: 3,
          caption: "Contrast comparison — before and after across key screens in dark mode",
          aspectRatio: "16/9",
        },
      },

      // ── Solution 3 ──
      {
        type: "solution",
        heading: "Solution 3 — Multiple Resume Management",
        subheading: "One platform, every version of you",
        body: `**The problem:** Engineering students at IITs typically apply across several different tracks — product, software engineering, design, analytics. Each needs a tailored resume. The platform only supported one, and swapping it out required downloading, renaming, and re-uploading every time.

**What I designed:** A resume library within the profile where users can upload and label multiple versions — "Product Resume," "Dev Resume," "General" — and choose the right one at the point of application without navigating away from the job page.

The mental model already existed for users — they were maintaining multiple resume versions anyway, just in Google Drive or on their laptop. The platform was adding friction on top of a workflow users had already figured out for themselves.`,
        image: {
          id: 4,
          caption: "Resume management — upload, label, and select per application",
          aspectRatio: "16/9",
        },
      },

      // ── Solution 4 ──
      {
        type: "solution",
        heading: "Solution 4 — Save All Profile Flow",
        subheading: "Fill once. Save once. Done.",
        body: `**The problem:** Profile completion required a separate save action after each section. Forgetting to save one section — easy to do when filling in a long form — meant losing that data and having to refill it. Two users specifically described abandoning profile completion because of this.

**What I designed:** A single Save All action that captures the full profile state at once, with unsaved-change indicators so users can see at a glance what's pending. A confirmation message appears after saving so users know their data was captured.

The issue was a mismatch between how users thought about their profile (as one thing they're filling out) and how the system was treating it (as a series of independent saves). The fix was aligning the system to how users already think.`,
        image: {
          id: 5,
          caption: "Profile flow with Save All — single save action with unsaved indicators per section",
          aspectRatio: "16/9",
        },
      },

      // ── Solution 5 ──
      {
        type: "solution",
        heading: "Solution 5 — Built-in Communication Tool",
        subheading: "Keep the entire hiring journey on one platform",
        body: `**The problem:** Once a candidate applied, all recruiter communication moved to WhatsApp — interview scheduling, task assignments, status updates. Users described it as unprofessional and said it made the hiring process feel disconnected from the platform they'd applied through.

What I framed for the team: this wasn't just a UX complaint. It meant Tech Japan had **zero visibility** into what happened after someone applied. Every follow-up, every offer, every rejection — all happening in a chat app they had no access to.

**What I designed:** An in-platform messaging and notification system that keeps all hiring communication in one place — status updates, document requests, direct messages with HRs, interview scheduling. Users stay inside the platform through the full process instead of being handed off to a separate app.`,
        image: {
          id: 6,
          caption: "Built-in communication — in-platform messaging and status updates replacing WhatsApp",
          aspectRatio: "16/9",
        },
      },

      // ── Testing ──
      {
        type: "impact",
        heading: "Testing & Results",
        body: `After designing the solutions, I ran another round of testing with participants from the same pool — 10 users from IITs, selected for their familiarity with the platform and similar products.`,
        stats: [
          { value: "80%", label: "Reported easier navigation" },
          { value: "70%", label: "Used new features unprompted" },
          { value: "6", label: "Solutions shipped to production" },
        ],
        body: `**80% of participants reported that navigation felt easier**, particularly around the job categorization and new layout. **70% actively used the resume management and communication features** during the session without being prompted — a strong signal that they were filling a real need, not just something that looked useful in a demo.

The feedback also surfaced things to keep working on: button visibility in dark mode still needed refinement in some spots, tooltips for new features could be clearer, and mobile responsiveness needed more than individual patches.`,
      },

      // ── Parallel Work ──
      {
        type: "solution",
        heading: "Parallel Work — Rebranding & Recruiter Dashboard",
        subheading: "Both sides of the same platform problem",
        body: `**Rebranding Survey**

Alongside the platform research, I ran a 10+ question survey to gauge awareness and perception of the Tech Japan → Talendy rebrand.

**71% of respondents hadn't heard about the rebrand at all.** Of those who had, 64.5% found out through friends or peers — almost no one through official channels. Brand appeal averaged 3.6 out of 5, with 60% rating it 4+ once shown the new identity.

The main recommendation: the brand needed a proper launch strategy with social media presence and clearer messaging, not just a name change.

**Recruiter-side Dashboard**

I also designed a recruiter-side hiring dashboard looking at how Tech Japan's internal team managed the volume of applications, screened candidates consistently, and kept hiring timelines on track. From 50+ survey responses and recruiter interviews: 72% advocated for a detailed feedback mechanism and 60% wanted better transparency into the review process.

Working on both sides gave a clearer picture of where friction actually lived — candidates didn't know where they stood, and recruiters didn't have the tools to tell them.`,
        images: [
          {
            id: 7,
            caption: "Rebranding survey findings — 71% awareness gap and brand perception ratings",
            aspectRatio: "16/9",
          },
          {
            id: 8,
            caption: "Recruiter dashboard — candidate pipeline, trend analysis, and upcoming interviews",
            aspectRatio: "16/9",
          },
        ],
      },

      // ── Reflection ──
      {
        type: "reflection",
        heading: "What I Took Away",
        body: `The biggest thing I learned is that research findings don't speak for themselves.`,
        learnings: [
          {
            title: "Frame findings around business impact",
            body: "The WhatsApp finding landed when I framed it as 'you have no visibility into what happens after someone applies' — not just 'users want better chat.' The same insight, completely different reception.",
          },
          {
            title: "UX research has to account for bugs",
            body: "The broken company link isn't a design problem in the traditional sense — it's a bug. But it was the single thing most likely to make a user close the tab and not come back, because it raised a question about whether the companies were even real.",
          },
          {
            title: "Testing numbers come from real sessions",
            body: "The 80% navigation improvement and 70% feature adoption came from real sessions with real users — not projections. Several recommendations made it into the product during and after the internship.",
          },
        ],
        futureItems: [
          "Onboarding flow for first-time users with no guidance",
          "Full mobile responsiveness overhaul — not just individual patches",
          "Redundant questions auto-fill — reuse answers across similar applications",
          "Post-application status tracking visible directly in the platform",
        ],
      },
    ],
  },
];
