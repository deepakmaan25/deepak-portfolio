import caseStudy1 from "@/assets/case-study-1.jpg";
import caseStudy2 from "@/assets/case-study-2.jpg";
import caseStudy3 from "@/assets/case-study-3.jpg";

export interface CaseStudy {
  id: string;
  slug: string;
  tag: string;
  title: string;
  description: string;
  image: string;
  tools: string[];
  metric: string;
  metricLabel: string;
  duration: string;
  year: string;
  overview: string;
  challenge: string;
  process: { title: string; description: string }[];
  outcomes: { metric: string; label: string }[];
  keyInsights: string[];
}

export const caseStudies: CaseStudy[] = [
  {
    id: "01",
    slug: "fintrack-finance-redesign",
    tag: "UX Research · Mobile App · 2024",
    title: "FinTrack — Personal Finance App Redesign",
    description:
      "Conducted 14 user interviews and synthesized findings into actionable insights that reshaped the onboarding flow of a fintech app.",
    image: caseStudy1,
    tools: ["User Interviews", "Affinity Mapping", "Journey Mapping", "Figma"],
    metric: "38%",
    metricLabel: "drop-off reduced",
    duration: "8 weeks",
    year: "2024",
    overview:
      "First-time investors often feel overwhelmed by financial jargon and complex interfaces. This project focused on understanding their mental models through deep qualitative research, then translating those insights into a simplified onboarding experience for a fintech startup targeting Gen-Z users.",
    challenge:
      "The existing onboarding had a 62% drop-off rate at the KYC step. Users felt lost, confused by terminology, and unsure about the value proposition. The challenge was to redesign the flow without compromising regulatory compliance while making it feel approachable and trustworthy.",
    process: [
      { title: "Discovery & Recruitment", description: "Screened and recruited 14 participants aged 19–28 who had never invested before. Conducted 45-minute semi-structured interviews exploring their relationship with money, fears around investing, and expectations from a financial app." },
      { title: "Synthesis & Affinity Mapping", description: "Transcribed all interviews and ran a collaborative affinity mapping session. Identified 5 key mental model clusters: 'Fear of Loss', 'Jargon Overload', 'Trust Deficit', 'Small Wins Motivation', and 'Social Validation Need'." },
      { title: "Journey Mapping & Opportunity Areas", description: "Created an end-to-end journey map highlighting emotional peaks and valleys. Pinpointed 3 critical opportunity areas where design intervention could reduce cognitive load and build confidence." },
      { title: "Ideation & Prototyping", description: "Designed 3 concept directions in Figma, each addressing different mental models. Ran rapid preference tests with 8 participants to validate the most promising direction." },
      { title: "Usability Testing & Iteration", description: "Conducted 2 rounds of moderated usability testing with 6 participants each. Iterated on micro-copy, progress indicators, and trust signals based on direct user feedback." },
    ],
    outcomes: [
      { metric: "↑ 38%", label: "task completion" },
      { metric: "↓ 60%", label: "drop-off rate" },
      { metric: "4.6/5", label: "usability score" },
      { metric: "2.1min", label: "faster completion" },
    ],
    keyInsights: [
      "Users didn't want less information — they wanted information delivered at the right moment with the right tone.",
      "Progress indicators reduced anxiety more than simplifying the actual steps.",
      "Social proof ('12,000 students already investing') was the single most effective trust signal.",
      "Gamification of small milestones kept users engaged without feeling trivial.",
    ],
  },
  {
    id: "02",
    slug: "medibook-healthcare-booking",
    tag: "Interaction Design · Web App · 2024",
    title: "MediBook — Healthcare Booking Flow",
    description:
      "Full redesign from heuristic evaluation to high-fidelity prototype — clinician-first approach with rigorous usability testing.",
    image: caseStudy2,
    tools: ["Figma", "Usability Testing", "Design System", "ChatGPT"],
    metric: "4.2/5",
    metricLabel: "usability score",
    duration: "12 weeks",
    year: "2024",
    overview:
      "A mid-size healthcare network was struggling with a 15-year-old scheduling system that frustrated both clinicians and administrative staff. The goal was to redesign the scheduling experience from the ground up.",
    challenge:
      "The legacy system had over 200 screens with inconsistent patterns, no design system, and deeply ingrained user habits. Clinicians were resistant to change, and any downtime in scheduling directly impacted patient care.",
    process: [
      { title: "Heuristic Evaluation & Audit", description: "Conducted a comprehensive heuristic evaluation of the existing 200+ screen system, cataloging 47 usability issues across severity levels." },
      { title: "Contextual Inquiry", description: "Spent 3 days shadowing clinicians and admin staff in their actual work environment. Observed workarounds, shortcuts, and pain points." },
      { title: "Information Architecture", description: "Restructured the IA from 200+ screens down to 12 core views using card sorting. Built a healthcare-specific design system with WCAG AA baked in." },
      { title: "Prototyping with AI", description: "Used AI tools to rapidly generate content variations and edge-case scenarios. Built interactive Figma prototypes covering 5 core workflows." },
      { title: "Validation with Maze", description: "Ran unmoderated usability tests via Maze with 24 participants across 3 clinician roles. Achieved task completion rates above 90% on all core flows." },
    ],
    outcomes: [
      { metric: "4.2/5", label: "usability score" },
      { metric: "200→12", label: "screens consolidated" },
      { metric: "93%", label: "task completion" },
      { metric: "↓ 60%", label: "training time" },
    ],
    keyInsights: [
      "Clinicians valued speed over aesthetics — every click saved was a win.",
      "Color-coding by appointment type was deeply ingrained — the redesign preserved this mental model.",
      "AI-assisted content generation saved ~30 hours in prototype preparation.",
      "Involving power users early as co-designers eliminated pushback.",
    ],
  },
  {
    id: "03",
    slug: "edupath-learning-system",
    tag: "Design Systems · SaaS · 2023",
    title: "EduPath — Learning Management System",
    description:
      "Created a streamlined multi-step form experience for a B2B SaaS product, improving completion rates and reducing support tickets.",
    image: caseStudy3,
    tools: ["Product Design", "B2B SaaS", "Forms", "Design Systems"],
    metric: "52%",
    metricLabel: "completion improvement",
    duration: "6 weeks",
    year: "2023",
    overview:
      "An enterprise SaaS product needed to simplify a complex, multi-step onboarding form that was causing high abandonment rates and excessive support tickets.",
    challenge:
      "The existing form had 40+ fields across a single page with no clear hierarchy or progress indication. Users frequently abandoned mid-way or submitted incomplete data.",
    process: [
      { title: "Audit & User Research", description: "Analyzed form analytics and conducted 8 user interviews to understand pain points, mental models, and expectations around the form experience." },
      { title: "Content & Flow Redesign", description: "Reorganized 40+ fields into logical groups and designed a multi-step wizard pattern with clear progress indication." },
      { title: "Interaction Design", description: "Designed smart defaults, conditional logic, and inline validation to reduce cognitive load and errors." },
      { title: "AI-Enhanced Workflow", description: "Leveraged AI tools for rapid concept exploration and user testing script generation." },
      { title: "Testing & Iteration", description: "Ran 3 rounds of usability testing, iterating on field labels, error messaging, and step transitions." },
    ],
    outcomes: [
      { metric: "↑ 52%", label: "completion rate" },
      { metric: "↓ 40%", label: "support tickets" },
      { metric: "3×", label: "faster completion" },
      { metric: "15+", label: "deliverables" },
    ],
    keyInsights: [
      "Breaking a long form into steps isn't enough — each step needs a clear purpose communicated to the user.",
      "Smart defaults saved users the most time and reduced errors significantly.",
      "Inline validation at the field level was preferred over page-level error summaries.",
      "Progress indicators with step labels outperformed simple progress bars.",
    ],
  },
];
