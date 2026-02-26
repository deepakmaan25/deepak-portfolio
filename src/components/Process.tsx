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

// Visual illustrations for each step
const StepVisual = ({ index }: { index: number }) => {
  if (index === 0) {
    // Discover — transcript to insight flow
    return (
      <div className="flex flex-col gap-3 p-4">
        <div className="flex items-center gap-2">
          <div className="px-3 py-2 rounded-lg bg-muted text-[11px] font-medium text-foreground border border-border">Raw Transcripts</div>
          <div className="text-muted-foreground text-[10px]">→</div>
          <div className="px-3 py-2 rounded-lg text-[11px] font-medium text-primary-foreground border" style={{ background: "rgba(99,102,241,0.8)", borderColor: "rgba(99,102,241,0.3)" }}>AI Analysis</div>
          <div className="text-muted-foreground text-[10px]">→</div>
          <div className="px-3 py-2 rounded-lg bg-muted text-[11px] font-medium text-foreground border border-border">Insights</div>
        </div>
        <div className="space-y-2 mt-2">
          {[85, 60, 45].map((w, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-foreground/20" />
              <div className="h-2 rounded-full bg-foreground/10" style={{ width: `${w}%` }} />
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (index === 1) {
    // Define — affinity map
    return (
      <div className="p-4">
        <div className="grid grid-cols-3 gap-2">
          {["Pain Points", "Needs", "Goals"].map((label) => (
            <div key={label} className="flex flex-col gap-1.5">
              <div className="text-[9px] font-semibold text-muted-foreground uppercase tracking-wider">{label}</div>
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="px-2 py-1.5 rounded text-[10px] border border-border bg-background" style={{
                  background: label === "Pain Points" ? "rgba(239,68,68,0.05)" : label === "Needs" ? "rgba(59,130,246,0.05)" : "rgba(16,185,129,0.05)",
                  borderColor: label === "Pain Points" ? "rgba(239,68,68,0.15)" : label === "Needs" ? "rgba(59,130,246,0.15)" : "rgba(16,185,129,0.15)",
                }}>
                  <div className="h-1.5 rounded-full bg-foreground/10" style={{ width: `${60 + i * 15}%` }} />
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="mt-3 px-3 py-2 rounded-lg border border-border bg-muted text-[10px] font-medium text-center text-foreground/70">
          → HMW Statement
        </div>
      </div>
    );
  }
  if (index === 2) {
    // Design — component system
    return (
      <div className="p-4">
        <div className="rounded-xl overflow-hidden border border-border">
          {/* Toolbar */}
          <div className="flex items-center gap-2 px-3 py-2 bg-muted/50 border-b border-border">
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-destructive/50" />
              <div className="w-2 h-2 rounded-full bg-foreground/15" />
              <div className="w-2 h-2 rounded-full bg-foreground/15" />
            </div>
            <div className="h-2 rounded bg-foreground/8 flex-1 max-w-[80px]" />
          </div>
          {/* Canvas */}
          <div className="p-3 flex gap-2">
            {/* Sidebar layers */}
            <div className="w-[60px] space-y-1.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-2 rounded bg-foreground/8" style={{ width: `${70 + Math.random() * 30}%` }} />
              ))}
            </div>
            {/* Preview area */}
            <div className="flex-1 rounded-lg p-2" style={{ background: "rgba(99,102,241,0.04)", border: "1px dashed rgba(99,102,241,0.2)" }}>
              <div className="h-4 rounded bg-foreground/6 mb-2 w-3/4" />
              <div className="grid grid-cols-2 gap-1.5">
                <div className="h-8 rounded" style={{ background: "rgba(99,102,241,0.1)" }} />
                <div className="h-8 rounded" style={{ background: "rgba(99,102,241,0.1)" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  // Deliver — metrics dashboard
  return (
    <div className="p-4">
      <div className="grid grid-cols-2 gap-2 mb-3">
        {[
          { label: "Task Success", value: "94%", color: "rgba(16,185,129,0.15)" },
          { label: "Time on Task", value: "-32%", color: "rgba(59,130,246,0.15)" },
          { label: "Error Rate", value: "2.1%", color: "rgba(239,68,68,0.1)" },
          { label: "SUS Score", value: "82", color: "rgba(139,92,246,0.15)" },
        ].map((m) => (
          <div key={m.label} className="rounded-lg p-2.5 border border-border" style={{ background: m.color }}>
            <div className="text-[9px] text-muted-foreground uppercase tracking-wider">{m.label}</div>
            <div className="text-[16px] font-bold text-foreground leading-none mt-1">{m.value}</div>
          </div>
        ))}
      </div>
      <div className="flex items-end gap-1 h-[30px]">
        {[30, 50, 40, 70, 60, 85, 75, 90].map((h, i) => (
          <div key={i} className="flex-1 rounded-t" style={{ height: `${h}%`, background: `rgba(16,185,129,${0.2 + i * 0.05})` }} />
        ))}
      </div>
    </div>
  );
};

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
          className="w-full md:w-[calc(50%-32px)] bg-background border border-border rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.05)]"
        >
          <div className="p-8">
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
          </div>
          {/* Visual illustration */}
          <div className="border-t border-border bg-muted/30">
            <StepVisual index={index} />
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

        {/* Quote block — premium dark card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mt-16 relative overflow-hidden rounded-2xl"
          style={{ background: "#0A0A0A" }}
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full" style={{
            background: "radial-gradient(circle, rgba(99,102,241,0.12), transparent 70%)",
          }} />
          <div className="absolute bottom-0 left-0 w-[200px] h-[200px] rounded-full" style={{
            background: "radial-gradient(circle, rgba(139,92,246,0.08), transparent 70%)",
          }} />
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }} />

          <div className="relative p-12 md:p-16">
            {/* Large decorative quote mark */}
            <div className="absolute top-6 left-10 text-[120px] leading-none font-serif" style={{ color: "rgba(99,102,241,0.15)" }}>
              "
            </div>

            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mt-8">
              <div className="max-w-2xl">
                <p className="text-[26px] md:text-[30px] italic leading-relaxed" style={{ color: "rgba(255,255,255,0.9)" }}>
                  The best designers I know aren't the best at Figma. They're the best at asking the right questions.
                </p>
              </div>
              <div className="flex-shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-[14px] font-bold" style={{
                    background: "linear-gradient(135deg, rgba(99,102,241,0.6), rgba(139,92,246,0.6))",
                    color: "white",
                  }}>
                    DM
                  </div>
                  <div>
                    <div className="text-[14px] font-medium" style={{ color: "rgba(255,255,255,0.8)" }}>Deepak Maan</div>
                    <div className="text-[12px]" style={{ color: "rgba(255,255,255,0.35)" }}>Product Designer</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Process;
