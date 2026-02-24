import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Search, Pencil, Zap, Ruler } from "lucide-react";

const processSteps = [
  {
    icon: Search,
    title: "Understand First",
    description: "I start with questions, not solutions. Research shapes every decision.",
  },
  {
    icon: Pencil,
    title: "Explore Broadly",
    description: "Quantity before quality. I sketch fast to find the right direction.",
  },
  {
    icon: Zap,
    title: "Prototype to Learn",
    description: "Ideas become real through testing, not debate.",
  },
  {
    icon: Ruler,
    title: "Deliver with Precision",
    description: "Every detail — spacing, copy, interaction — reflects intentionality.",
  },
];

const Process = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="process" className="py-[120px] max-md:py-16 bg-surface">
      <div className="px-6 lg:px-8 max-w-site mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <p className="type-caption text-muted-foreground mb-3">My Approach</p>
          <h2 className="type-h2 text-foreground">How I think about design</h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {processSteps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <step.icon size={24} className="text-accent mb-4" />
              <h3 className="type-h3 text-foreground mb-2">{step.title}</h3>
              <p className="type-body text-muted-foreground">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
