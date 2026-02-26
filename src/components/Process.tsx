import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Search, Target, PenTool, CheckCircle } from "lucide-react";

const steps = [
  {
    num: "01",
    icon: Search,
    title: "Discover & Listen",
    description:
      "Every project starts with curiosity. I conduct user interviews, competitive audits, and stakeholder workshops — using AI tools like Claude to synthesize patterns from raw transcripts 3x faster than manual analysis.",
    tags: ["User Interviews", "AI Synthesis"],
  },
  {
    num: "02",
    icon: Target,
    title: "Define the Real Problem",
    description:
      "Most design fails because it solves the wrong thing. I use affinity mapping and Jobs-to-be-Done frameworks to reframe vague briefs into precise, testable problem statements — validated with stakeholders before a single wireframe.",
    tags: ["HMW Statements", "Journey Maps"],
  },
  {
    num: "03",
    icon: PenTool,
    title: "Design with Intention",
    description:
      "From rough sketches to high-fidelity Figma prototypes — every decision is traceable to a research insight. I use Midjourney for early visual mood exploration and component-driven design systems for scalable delivery.",
    tags: ["Figma Systems", "AI-Assisted Ideation"],
  },
  {
    num: "04",
    icon: CheckCircle,
    title: "Deliver & Measure",
    description:
      "Design doesn't end at handoff. I conduct usability testing with Maze, annotate developer specs, and track post-launch metrics to close the feedback loop and quantify impact.",
    tags: ["Usability Testing", "Impact Metrics"],
  },
];

const StepCard = ({ step, index }: { step: typeof steps[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const isLeft = index % 2 === 0;

  return (
    <div className="relative">
      {/* Center node dot */}
      <div className="hidden md:block absolute left-1/2 top-10 -translate-x-1/2 w-2 h-2 rounded-full bg-foreground z-10" />

      <div className={`md:flex items-start ${isLeft ? "md:justify-start" : "md:justify-end"}`}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-full md:w-[calc(50%-32px)] bg-background border border-border rounded-2xl p-8 shadow-[0_4px_24px_rgba(0,0,0,0.05)]"
        >
          <div className="text-[48px] font-extrabold text-border/60 leading-none mb-3">{step.num}</div>
          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mb-4">
            <step.icon size={18} className="text-foreground" />
          </div>
          <h3 className="text-[20px] font-bold text-foreground mb-3">{step.title}</h3>
          <p className="type-body text-text-body mb-5">{step.description}</p>
          <div className="flex flex-wrap gap-2">
            {step.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-3 py-1.5 border border-tag-border rounded-full text-[12px] text-text-body bg-background"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const Process = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="process" className="py-24 md:py-[96px] bg-surface">
      <div className="px-6 max-w-site mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="mb-16"
        >
          <p className="type-label mb-3">PROCESS</p>
          <h2 className="type-h2">How I work</h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical dashed line — desktop only */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 border-l border-dashed border-border" />

          <div className="space-y-10 md:space-y-12">
            {steps.map((step, i) => (
              <StepCard key={step.num} step={step} index={i} />
            ))}
          </div>
        </div>

        {/* Quote block */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mt-16 bg-foreground rounded-2xl p-12 max-md:p-8"
        >
          <span className="text-[72px] leading-none text-primary-foreground/20 font-serif block -mb-6">"</span>
          <p className="text-[24px] max-md:text-[20px] italic text-primary-foreground/80 leading-relaxed max-w-3xl">
            The best designers I know aren't the best at Figma. They're the best at asking the right questions.
          </p>
          <p className="text-[14px] text-primary-foreground/40 mt-6">— Deepak Maan</p>
        </motion.div>
      </div>
    </section>
  );
};

export default Process;
