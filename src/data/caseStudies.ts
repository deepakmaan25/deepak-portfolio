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
    slug: "fintech-onboarding-redesign",
    tag: "UX Research · Mobile App",
    title: "Redesigning Onboarding for a FinTech App",
    description:
      "Conducted 14 user interviews and synthesized findings into actionable insights that reshaped the onboarding flow, reducing drop-off by 38%.",
    image: caseStudy1,
    tools: ["UX Research", "Mobile App", "B2C"],
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
      { metric: "38%", label: "Reduction in onboarding drop-off" },
      { metric: "4.6/5", label: "Average usability score (SUS)" },
      { metric: "2.1min", label: "Faster average completion time" },
      { metric: "89%", label: "Users felt 'confident' proceeding" },
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
    slug: "health-tracking-dashboard",
    tag: "End-to-End Design · Dashboard",
    title: "A Health Tracking Dashboard for Busy Professionals",
    description:
      "Full redesign from heuristic evaluation to high-fidelity prototype — clinician-first approach with rigorous usability testing.",
    image: caseStudy2,
    tools: ["Product Design", "Dashboard", "B2B"],
    metric: "4.2/5",
    metricLabel: "usability score",
    duration: "12 weeks",
    year: "2024",
    overview:
      "A mid-size healthcare network was struggling with a 15-year-old scheduling system that frustrated both clinicians and administrative staff. The goal was to redesign the scheduling experience from the ground up, creating a modern, intuitive interface that could handle complex scheduling rules while being delightful to use daily.",
    challenge:
      "The legacy system had over 200 screens with inconsistent patterns, no design system, and deeply ingrained user habits. Clinicians were resistant to change, and any downtime in scheduling directly impacted patient care.",
    process: [
      { title: "Heuristic Evaluation & Audit", description: "Conducted a comprehensive heuristic evaluation of the existing 200+ screen system, cataloging 47 usability issues across severity levels." },
      { title: "Contextual Inquiry", description: "Spent 3 days shadowing clinicians and admin staff in their actual work environment. Observed workarounds, shortcuts, and pain points." },
      { title: "Information Architecture & Design System", description: "Restructured the IA from 200+ screens down to 12 core views using card sorting. Built a healthcare-specific design system with WCAG AA baked in." },
      { title: "Prototyping with AI Assistance", description: "Used AI tools to rapidly generate content variations and edge-case scenarios. Built interactive Figma prototypes covering 5 core workflows." },
      { title: "Validation with Maze", description: "Ran unmoderated usability tests via Maze with 24 participants across 3 clinician roles. Achieved task completion rates above 90% on all core flows." },
    ],
    outcomes: [
      { metric: "4.2/5", label: "Average usability score" },
      { metric: "200→12", label: "Screens consolidated" },
      { metric: "93%", label: "Task completion rate" },
      { metric: "60%", label: "Reduction in training time" },
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
    slug: "b2b-saas-forms",
    tag: "Product Design · B2B SaaS",
    title: "Simplifying Complex Forms — A B2B SaaS Case Study",
    description:
      "Created a streamlined multi-step form experience for a B2B SaaS product, improving completion rates and reducing support tickets.",
    image: caseStudy3,
    tools: ["Product Design", "B2B SaaS", "Forms"],
    metric: "15+",
    metricLabel: "deliverables",
    duration: "6 weeks",
    year: "2023",
    overview:
      "An enterprise SaaS product needed to simplify a complex, multi-step onboarding form that was causing high abandonment rates and excessive support tickets. The brief called for a form experience that guided users without overwhelming them.",
    challenge:
      "The existing form had 40+ fields across a single page with no clear hierarchy or progress indication. Users frequently abandoned mid-way or submitted incomplete data, creating downstream issues for the sales team.",
    process: [
      { title: "Audit & User Research", description: "Analyzed form analytics and conducted 8 user interviews to understand pain points, mental models, and expectations around the form experience." },
      { title: "Content & Flow Redesign", description: "Reorganized 40+ fields into logical groups and designed a multi-step wizard pattern with clear progress indication." },
      { title: "Interaction Design", description: "Designed smart defaults, conditional logic, and inline validation to reduce cognitive load and errors." },
      { title: "AI-Enhanced Workflow", description: "Leveraged AI tools for rapid concept exploration and user testing script generation." },
      { title: "Testing & Iteration", description: "Ran 3 rounds of usability testing, iterating on field labels, error messaging, and step transitions." },
    ],
    outcomes: [
      { metric: "15+", label: "Production-ready deliverables" },
      { metric: "52%", label: "Improvement in completion rate" },
      { metric: "40%", label: "Fewer support tickets" },
      { metric: "3x", label: "Faster form completion" },
    ],
    keyInsights: [
      "Breaking a long form into steps isn't enough — each step needs a clear purpose communicated to the user.",
      "Smart defaults saved users the most time and reduced errors significantly.",
      "Inline validation at the field level was preferred over page-level error summaries.",
      "Progress indicators with step labels outperformed simple progress bars.",
    ],
  },
];
