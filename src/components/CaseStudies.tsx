import { useState } from "react";
import caseStudy1 from "@/assets/case-study-1.jpg";
import caseStudy2 from "@/assets/case-study-2.jpg";
import caseStudy3 from "@/assets/case-study-3.jpg";

const caseStudies = [
  {
    id: "01",
    tag: "UX Research",
    title: "Mapping the Mental Models of First-Time Investors",
    description:
      "Conducted 14 user interviews and synthesized findings into actionable insights that reshaped the onboarding flow of a fintech app, reducing drop-off by 38%.",
    image: caseStudy1,
    tools: ["User Interviews", "Affinity Mapping", "Journey Mapping"],
    duration: "8 weeks",
    year: "2024",
  },
  {
    id: "02",
    tag: "Redesign",
    title: "Redesigning a Legacy Healthcare Scheduling App",
    description:
      "End-to-end redesign of a clinician scheduling platform — from heuristic evaluation to high-fidelity prototype — achieving a 4.2/5 usability score in testing.",
    image: caseStudy2,
    tools: ["Figma", "Usability Testing", "Design System"],
    duration: "12 weeks",
    year: "2024",
  },
  {
    id: "03",
    tag: "Illustration & Visual",
    title: "Brand Identity & Photo Manipulation Series",
    description:
      "Created a cohesive visual identity and surreal photo-manipulation series for an independent lifestyle brand, encompassing illustration, typography, and art direction.",
    image: caseStudy3,
    tools: ["Photoshop", "Illustrator", "Procreate"],
    duration: "6 weeks",
    year: "2023",
  },
];

const CaseStudies = () => {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section id="work" className="py-24 lg:py-32 px-6 lg:px-12 max-w-6xl mx-auto">
      {/* Section header */}
      <div className="flex items-end justify-between mb-16 gap-4 flex-wrap">
        <div>
          <span className="font-body text-xs font-medium tracking-[0.2em] uppercase text-terracotta mb-3 block">
            Selected Work
          </span>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-charcoal">
            Case Studies
          </h2>
        </div>
        <p className="font-body text-sm text-warm-gray max-w-xs text-right hidden sm:block">
          Each project is a story — of problems, people, and purposeful design.
        </p>
      </div>

      {/* Case study list */}
      <div className="space-y-6">
        {caseStudies.map((cs, i) => (
          <article
            key={cs.id}
            className={`group relative grid lg:grid-cols-[1fr_420px] gap-0 border border-border overflow-hidden cursor-pointer transition-all duration-500 ${
              hovered === cs.id ? "shadow-hover border-terracotta/30" : "hover:border-border"
            }`}
            onMouseEnter={() => setHovered(cs.id)}
            onMouseLeave={() => setHovered(null)}
          >
            {/* Content */}
            <div className="p-8 lg:p-12 flex flex-col justify-between bg-cream group-hover:bg-surface transition-colors duration-300">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <span className="font-display text-5xl font-bold text-border group-hover:text-terracotta/20 transition-colors duration-300">
                    {cs.id}
                  </span>
                  <span className="font-body text-xs font-medium tracking-[0.18em] uppercase text-terracotta border border-terracotta/30 px-3 py-1">
                    {cs.tag}
                  </span>
                </div>

                <h3 className="font-display text-2xl lg:text-3xl font-semibold text-charcoal mb-4 leading-tight group-hover:text-terracotta transition-colors duration-300">
                  {cs.title}
                </h3>

                <p className="font-body text-sm text-warm-gray leading-relaxed max-w-md">
                  {cs.description}
                </p>
              </div>

              <div className="mt-8 flex items-end justify-between flex-wrap gap-4">
                <div className="flex flex-wrap gap-2">
                  {cs.tools.map((tool) => (
                    <span
                      key={tool}
                      className="font-body text-xs font-medium px-2.5 py-1 bg-muted text-warm-gray"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
                <div className="text-right">
                  <div className="font-body text-xs text-warm-gray">{cs.duration} · {cs.year}</div>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-2 text-sm font-body font-medium text-charcoal group-hover:text-terracotta transition-colors duration-300">
                <span>View Case Study</span>
                <span className="transition-transform duration-300 group-hover:translate-x-2">→</span>
              </div>
            </div>

            {/* Image */}
            <div className="relative h-64 lg:h-auto overflow-hidden">
              <img
                src={cs.image}
                alt={cs.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-charcoal/10 group-hover:bg-charcoal/0 transition-colors duration-500" />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default CaseStudies;
