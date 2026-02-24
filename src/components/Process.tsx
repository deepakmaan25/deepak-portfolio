import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const processSteps = [
  {
    number: "01",
    title: "Discover",
    description: "User interviews, competitor analysis, and stakeholder conversations to deeply understand the problem space.",
  },
  {
    number: "02",
    title: "Define",
    description: "Synthesize research into clear problem statements, personas, and opportunity areas. Confusion becomes clarity.",
  },
  {
    number: "03",
    title: "Design",
    description: "From rough sketches to high-fidelity prototypes — iterating quickly, testing often, keeping the user central.",
  },
  {
    number: "04",
    title: "Deliver",
    description: "Polished, handoff-ready designs with annotated specs, responsive behaviour, and close engineering collaboration.",
  },
];

const Process = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="process" className="py-24 lg:py-32 px-6 lg:px-8 max-w-6xl mx-auto border-t border-border">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="mb-16"
      >
        <p className="type-label text-muted-foreground mb-3">How I Work</p>
        <h2 className="type-display text-foreground">Design Process</h2>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
        {processSteps.map((step, i) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: i * 0.08 }}
          >
            <div className="text-3xl font-medium text-border mb-4">{step.number}</div>
            <h3 className="type-title text-foreground mb-2">{step.title}</h3>
            <p className="type-caption text-muted-foreground">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Process;
