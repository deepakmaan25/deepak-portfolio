import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import caseStudy1 from "@/assets/case-study-1.jpg";
import caseStudy2 from "@/assets/case-study-2.jpg";
import caseStudy3 from "@/assets/case-study-3.jpg";

const caseStudies = [
  {
    id: "01",
    tag: "UX Research",
    title: "Mapping Mental Models of First-Time Investors",
    description:
      "Conducted 14 user interviews and synthesized findings into actionable insights that reshaped the onboarding flow of a fintech app.",
    image: caseStudy1,
    tools: ["User Interviews", "Affinity Mapping", "Journey Mapping"],
    metric: "38%",
    metricLabel: "drop-off reduced",
    duration: "8 weeks",
    year: "2024",
  },
  {
    id: "02",
    tag: "End-to-End Redesign",
    title: "Redesigning a Legacy Healthcare Scheduling Platform",
    description:
      "Full redesign from heuristic evaluation to high-fidelity prototype — clinician-first approach with rigorous usability testing.",
    image: caseStudy2,
    tools: ["Figma", "Usability Testing", "Design System"],
    metric: "4.2/5",
    metricLabel: "usability score",
    duration: "12 weeks",
    year: "2024",
  },
  {
    id: "03",
    tag: "Visual & Illustration",
    title: "Brand Identity & Surreal Photo-Manipulation Series",
    description:
      "Created a cohesive visual identity and surreal photo-manipulation series for an independent lifestyle brand.",
    image: caseStudy3,
    tools: ["Photoshop", "Illustrator", "Procreate"],
    metric: "15+",
    metricLabel: "deliverables",
    duration: "6 weeks",
    year: "2023",
  },
];

const CaseStudyCard = ({ cs, index }: { cs: typeof caseStudies[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      className="group relative grid lg:grid-cols-[1fr_480px] gap-0 border border-border overflow-hidden cursor-pointer hover:border-terracotta/30 transition-all duration-500"
    >
      {/* Content */}
      <div className="p-8 lg:p-12 flex flex-col justify-between bg-cream group-hover:bg-surface transition-colors duration-300">
        <div>
          <div className="flex items-center gap-4 mb-6">
            <span className="font-display text-6xl font-bold text-border/60 group-hover:text-terracotta/20 transition-colors duration-300">
              {cs.id}
            </span>
            <span className="font-body text-[10px] font-semibold tracking-[0.2em] uppercase text-terracotta border border-terracotta/30 px-3 py-1">
              {cs.tag}
            </span>
          </div>

          <h3 className="font-display text-2xl lg:text-3xl font-semibold text-charcoal mb-4 leading-tight group-hover:text-terracotta transition-colors duration-300">
            {cs.title}
          </h3>

          <p className="font-body text-sm text-warm-gray leading-relaxed max-w-md">
            {cs.description}
          </p>

          {/* Metric callout */}
          <div className="mt-6 inline-flex items-baseline gap-2 px-4 py-2 bg-charcoal/5 group-hover:bg-terracotta/10 transition-colors duration-300">
            <span className="font-display text-2xl font-bold text-charcoal group-hover:text-terracotta transition-colors duration-300">{cs.metric}</span>
            <span className="font-body text-xs text-warm-gray">{cs.metricLabel}</span>
          </div>
        </div>

        <div className="mt-8 flex items-end justify-between flex-wrap gap-4">
          <div className="flex flex-wrap gap-2">
            {cs.tools.map((tool) => (
              <span
                key={tool}
                className="font-body text-[11px] font-medium px-2.5 py-1 bg-muted text-warm-gray"
              >
                {tool}
              </span>
            ))}
          </div>
          <div className="font-body text-xs text-warm-gray">{cs.duration} · {cs.year}</div>
        </div>

        <div className="mt-6 flex items-center gap-2 text-sm font-body font-medium text-charcoal group-hover:text-terracotta transition-colors duration-300">
          <span>Read Case Study</span>
          <span className="transition-transform duration-300 group-hover:translate-x-2">→</span>
        </div>
      </div>

      {/* Image */}
      <div className="relative h-64 lg:h-auto overflow-hidden">
        <img
          src={cs.image}
          alt={cs.title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-charcoal/10 group-hover:bg-charcoal/0 transition-colors duration-500" />
      </div>
    </motion.article>
  );
};

const CaseStudies = () => {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });

  return (
    <section id="work" className="py-24 lg:py-32 px-6 lg:px-12 max-w-7xl mx-auto">
      {/* Section header */}
      <motion.div
        ref={headerRef}
        initial={{ opacity: 0, y: 30 }}
        animate={headerInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="flex items-end justify-between mb-16 gap-4 flex-wrap"
      >
        <div>
          <span className="inline-flex items-center gap-3 font-body text-xs font-medium tracking-[0.25em] uppercase text-warm-gray mb-3">
            <span className="w-8 h-px bg-terracotta" />
            Selected Work
          </span>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-charcoal">
            Case Studies
          </h2>
        </div>
        <p className="font-body text-sm text-warm-gray max-w-xs text-right hidden sm:block">
          Each project is a story — of problems, people, and purposeful design.
        </p>
      </motion.div>

      {/* Case study list */}
      <div className="space-y-8">
        {caseStudies.map((cs, i) => (
          <CaseStudyCard key={cs.id} cs={cs} index={i} />
        ))}
      </div>
    </section>
  );
};

export default CaseStudies;
