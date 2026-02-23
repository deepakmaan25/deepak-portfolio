import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const processSteps = [
  {
    number: "01",
    title: "Discover",
    description: "Research — user interviews, competitor analysis, and stakeholder conversations — to deeply understand the problem before opening Figma.",
    icon: "🔍",
  },
  {
    number: "02",
    title: "Define",
    description: "Synthesising research into clear problem statements, personas, and opportunity areas. Confusion becomes clarity.",
    icon: "🎯",
  },
  {
    number: "03",
    title: "Design",
    description: "From rough sketches to high-fidelity prototypes, iterating quickly, testing often, and keeping the user at the centre.",
    icon: "✏️",
  },
  {
    number: "04",
    title: "Deliver",
    description: "Polished, handoff-ready designs with annotated specs, responsive behaviour, and close engineering collaboration.",
    icon: "🚀",
  },
];

const Process = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="process" className="py-24 lg:py-32 px-6 lg:px-12 max-w-7xl mx-auto">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <span className="inline-flex items-center gap-3 font-body text-xs font-medium tracking-[0.25em] uppercase text-warm-gray mb-3 mx-auto">
          <span className="w-8 h-px bg-terracotta" />
          How I Work
          <span className="w-8 h-px bg-terracotta" />
        </span>
        <h2 className="font-display text-4xl lg:text-5xl font-bold text-charcoal">
          My Design Process
        </h2>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
        {processSteps.map((step, i) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            className="bg-cream p-8 group hover:bg-charcoal transition-colors duration-400 relative"
          >
            <div className="font-display text-5xl font-bold text-border/60 group-hover:text-terracotta/40 transition-colors duration-300 mb-6">
              {step.number}
            </div>
            <div className="text-2xl mb-4">{step.icon}</div>
            <h3 className="font-display text-xl font-semibold text-charcoal group-hover:text-cream transition-colors duration-300 mb-3">
              {step.title}
            </h3>
            <p className="font-body text-sm text-warm-gray group-hover:text-cream/70 transition-colors duration-300 leading-relaxed">
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Process;
