import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Search, Target, PenTool, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Discover",
    description: "I start with listening — user interviews, competitor analysis, and stakeholder alignment to frame the right problem before touching Figma.",
  },
  {
    icon: Target,
    title: "Define",
    description: "Synthesizing research into opportunity areas using affinity mapping, journey maps, and clear 'How Might We' statements.",
  },
  {
    icon: PenTool,
    title: "Design",
    description: "Low-fi to hi-fi: rapid sketches, wireframes, component-based design in Figma, and iterative prototyping grounded in the defined problem space.",
  },
  {
    icon: CheckCircle,
    title: "Deliver",
    description: "Usability testing, design handoff with annotated specs, and post-launch metrics tracking to validate decisions.",
  },
];

const Process = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="process" className="py-24 md:py-[96px] bg-process-bg">
      <div className="px-6 max-w-site mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="mb-14"
        >
          <p className="type-label mb-3">PROCESS</p>
          <h2 className="type-h2">How I work</h2>
        </motion.div>

        {/* Steps grid */}
        <div className="grid md:grid-cols-4 gap-6 md:gap-4 mb-16">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="relative"
            >
              <div className="flex items-start md:flex-col gap-4 md:gap-0">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mb-4 shrink-0">
                  <step.icon size={18} className="text-foreground" />
                </div>
                <div>
                  <h3 className="text-[18px] font-bold text-foreground mb-2">{step.title}</h3>
                  <p className="type-body text-text-body">{step.description}</p>
                </div>
              </div>
              {/* Arrow connector — desktop only */}
              {i < steps.length - 1 && (
                <span className="hidden md:block absolute top-5 -right-3 text-border text-lg">→</span>
              )}
            </motion.div>
          ))}
        </div>

        {/* Quote block */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="bg-background rounded-xl p-10 max-md:p-6"
        >
          <span className="text-[72px] leading-none text-quote-mark font-serif block -mb-6">"</span>
          <p className="text-[24px] max-md:text-[20px] italic text-text-body leading-relaxed max-w-3xl">
            Good design is invisible. Great design is the research behind it.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Process;
