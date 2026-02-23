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
  gallery?: string[];
}

export const caseStudies: CaseStudy[] = [
  {
    id: "01",
    slug: "mental-models-first-time-investors",
    tag: "UX Research",
    title: "Mapping Mental Models of First-Time Investors",
    description:
      "Conducted 14 user interviews and synthesized findings into actionable insights that reshaped the onboarding flow of a fintech app.",
    image: caseStudy1,
    tools: ["User Interviews", "Affinity Mapping", "Journey Mapping", "Figma", "Miro"],
    metric: "38%",
    metricLabel: "drop-off reduced",
    duration: "8 weeks",
    year: "2024",
    overview:
      "First-time investors often feel overwhelmed by financial jargon and complex interfaces. This project focused on understanding their mental models through deep qualitative research, then translating those insights into a simplified onboarding experience for a fintech startup targeting Gen-Z users.",
    challenge:
      "The existing onboarding had a 62% drop-off rate at the KYC step. Users felt lost, confused by terminology, and unsure about the value proposition. The challenge was to redesign the flow without compromising regulatory compliance while making it feel approachable and trustworthy.",
    process: [
      {
        title: "Discovery & Recruitment",
        description: "Screened and recruited 14 participants aged 19–28 who had never invested before. Conducted 45-minute semi-structured interviews exploring their relationship with money, fears around investing, and expectations from a financial app.",
      },
      {
        title: "Synthesis & Affinity Mapping",
        description: "Transcribed all interviews and ran a collaborative affinity mapping session. Identified 5 key mental model clusters: 'Fear of Loss', 'Jargon Overload', 'Trust Deficit', 'Small Wins Motivation', and 'Social Validation Need'.",
      },
      {
        title: "Journey Mapping & Opportunity Areas",
        description: "Created an end-to-end journey map highlighting emotional peaks and valleys. Pinpointed 3 critical opportunity areas where design intervention could reduce cognitive load and build confidence.",
      },
      {
        title: "Ideation & Prototyping",
        description: "Designed 3 concept directions in Figma, each addressing different mental models. Ran rapid preference tests with 8 participants to validate the most promising direction before moving to hi-fi.",
      },
      {
        title: "Usability Testing & Iteration",
        description: "Conducted 2 rounds of moderated usability testing with 6 participants each. Iterated on micro-copy, progress indicators, and trust signals based on direct user feedback.",
      },
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
    slug: "healthcare-scheduling-redesign",
    tag: "End-to-End Redesign",
    title: "Redesigning a Legacy Healthcare Scheduling Platform",
    description:
      "Full redesign from heuristic evaluation to high-fidelity prototype — clinician-first approach with rigorous usability testing.",
    image: caseStudy2,
    tools: ["Figma", "Usability Testing", "Design System", "ChatGPT", "Maze"],
    metric: "4.2/5",
    metricLabel: "usability score",
    duration: "12 weeks",
    year: "2024",
    overview:
      "A mid-size healthcare network was struggling with a 15-year-old scheduling system that frustrated both clinicians and administrative staff. The goal was to redesign the scheduling experience from the ground up, creating a modern, intuitive interface that could handle complex scheduling rules while being delightful to use daily.",
    challenge:
      "The legacy system had over 200 screens with inconsistent patterns, no design system, and deeply ingrained user habits. Clinicians were resistant to change, and any downtime in scheduling directly impacted patient care. The redesign had to respect existing mental models while introducing significant improvements.",
    process: [
      {
        title: "Heuristic Evaluation & Audit",
        description: "Conducted a comprehensive heuristic evaluation of the existing 200+ screen system, cataloging 47 usability issues across severity levels. Created a prioritized backlog based on frequency of use and impact on workflow efficiency.",
      },
      {
        title: "Contextual Inquiry",
        description: "Spent 3 days shadowing clinicians and admin staff in their actual work environment. Observed workarounds, shortcuts, and pain points that wouldn't surface in interviews alone. Documented 23 unique workflow patterns.",
      },
      {
        title: "Information Architecture & Design System",
        description: "Restructured the IA from 200+ screens down to 12 core views using card sorting with 10 participants. Built a healthcare-specific design system with accessibility (WCAG AA) baked in from day one.",
      },
      {
        title: "Prototyping with AI Assistance",
        description: "Used ChatGPT to rapidly generate content variations and edge-case scenarios. Built interactive Figma prototypes covering 5 core workflows. Leveraged AI to write realistic patient data for prototype testing.",
      },
      {
        title: "Validation with Maze",
        description: "Ran unmoderated usability tests via Maze with 24 participants across 3 clinician roles. Achieved task completion rates above 90% on all core flows. Iterated based on heatmap and misclick data.",
      },
    ],
    outcomes: [
      { metric: "4.2/5", label: "Average usability score" },
      { metric: "200→12", label: "Screens consolidated" },
      { metric: "93%", label: "Task completion rate" },
      { metric: "60%", label: "Reduction in training time" },
    ],
    keyInsights: [
      "Clinicians valued speed over aesthetics — every click saved was a win. Keyboard shortcuts were non-negotiable.",
      "Color-coding by appointment type was deeply ingrained — the redesign preserved this mental model while modernizing the palette.",
      "AI-assisted content generation saved ~30 hours in prototype preparation.",
      "The biggest risk wasn't bad design — it was change resistance. Involving power users early as co-designers eliminated pushback.",
    ],
  },
  {
    id: "03",
    slug: "brand-identity-photo-manipulation",
    tag: "Visual & Illustration",
    title: "Brand Identity & Surreal Photo-Manipulation Series",
    description:
      "Created a cohesive visual identity and surreal photo-manipulation series for an independent lifestyle brand.",
    image: caseStudy3,
    tools: ["Photoshop", "Illustrator", "Procreate", "Midjourney", "After Effects"],
    metric: "15+",
    metricLabel: "deliverables",
    duration: "6 weeks",
    year: "2023",
    overview:
      "An emerging lifestyle brand needed a complete visual identity that would stand out in a crowded market. The brief called for something 'between luxury and surrealism' — a visual language that felt premium yet unexpected. The project spanned logo design, a photo-manipulation art series, and social media templates.",
    challenge:
      "The brand had no existing visual assets and a very broad target audience (18–35 urban creatives). The challenge was creating a visual system flexible enough for everything from Instagram stories to packaging, while maintaining a consistent surreal aesthetic that didn't veer into gimmicky territory.",
    process: [
      {
        title: "Brand Discovery & Moodboarding",
        description: "Ran a brand workshop to define personality attributes, audience archetypes, and competitive positioning. Created 3 moodboard directions exploring different balances of luxury, surrealism, and accessibility.",
      },
      {
        title: "Logo & Typography System",
        description: "Designed 12 logo concepts, narrowed to 3 through client feedback, and refined the chosen direction. Paired a custom-modified wordmark with a flexible type system for different contexts.",
      },
      {
        title: "Surreal Photo-Manipulation Series",
        description: "Created 8 surreal compositions blending product photography with dreamlike environments. Used Photoshop for compositing, Midjourney for environmental concepts, and Procreate for hand-drawn overlays.",
      },
      {
        title: "AI-Enhanced Workflow",
        description: "Leveraged Midjourney to rapidly explore visual directions and generate background concepts. Used AI as a creative brainstorming partner — all final outputs were hand-crafted and refined in Photoshop.",
      },
      {
        title: "Brand Guidelines & Handoff",
        description: "Compiled a comprehensive brand book with logo usage, color system, typography rules, photography guidelines, and social media templates. Delivered 15+ production-ready assets.",
      },
    ],
    outcomes: [
      { metric: "15+", label: "Production-ready deliverables" },
      { metric: "8", label: "Surreal art compositions" },
      { metric: "40+", label: "Social media templates" },
      { metric: "3x", label: "Engagement increase on launch" },
    ],
    keyInsights: [
      "AI tools like Midjourney were invaluable for rapid exploration but required significant manual refinement for brand-quality output.",
      "Consistency in surrealism is harder than consistency in minimalism — a strict color and composition system was essential.",
      "The brand workshop saved weeks of revision by aligning stakeholders early on personality and positioning.",
      "Hand-drawn overlays on digital compositions created the 'unexpected premium' feel the client wanted.",
    ],
  },
];
