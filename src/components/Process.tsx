import { useState } from "react";
import { motion } from "framer-motion";

const steps = [
  {
    tag: "Step 01 — Discover",
    title: "Discover &",
    titleEm: "Listen",
    desc: "User interviews, competitive audits, and stakeholder workshops — using AI to synthesize patterns from raw transcripts 3× faster than manual analysis.",
    pills: ["User Interviews", "AI Synthesis", "Competitive Audit"],
  },
  {
    tag: "Step 02 — Define",
    title: "Define the Real",
    titleEm: "Problem",
    desc: "Affinity mapping and JTBD frameworks reframe vague briefs into precise, testable problem statements — validated with stakeholders before a single wireframe.",
    pills: ["HMW Statements", "Journey Maps", "JTBD"],
  },
  {
    tag: "Step 03 — Design",
    title: "Design with",
    titleEm: "Intention",
    desc: "From rough sketches to high-fidelity Figma prototypes — every decision traceable to a research insight. Component-driven systems for scalable delivery.",
    pills: ["Figma Systems", "AI Ideation", "Prototyping"],
  },
  {
    tag: "Step 04 — Deliver",
    title: "Deliver &",
    titleEm: "Measure",
    desc: "Design doesn't end at handoff. Usability testing, developer specs, and post-launch metrics close the feedback loop and quantify real impact.",
    pills: ["Usability Testing", "Impact Metrics", "Maze"],
  },
];

const DiscoverIllus = () => (
  <div className="flex flex-col gap-3 w-full">
    <div className="rounded-xl px-4 py-3 text-[11px] leading-relaxed self-start max-w-[200px]"
      style={{ background: "#f0eeff", color: "#4f46e5", border: "1px solid rgba(99,102,241,0.15)" }}>
      "How do you currently track your spending?"
    </div>
    <div className="rounded-xl px-4 py-3 text-[11px] leading-relaxed self-end max-w-[200px]"
      style={{ background: "#0A0A0A", color: "rgba(255,255,255,0.75)" }}>
      AI Pattern: 9/14 users mention anxiety around budgets
    </div>
    <div className="rounded-xl px-4 py-3 text-[11px] leading-relaxed self-start max-w-[200px]"
      style={{ background: "#fff7ed", color: "#c2410c", border: "1px solid rgba(234,88,12,0.15)" }}>
      "I just avoid looking at it honestly..."
    </div>
    <div className="flex gap-2 mt-1">
      {[
        { label: "F", bg: "#f0eeff", color: "#4f46e5" },
        { label: "T", bg: "#eaf3ff", color: "#1d4ed8" },
        { label: "A", bg: "#fff4ec", color: "#c2410c" },
        { label: "+6", bg: "rgba(0,0,0,0.05)", color: "#888" },
      ].map((d) => (
        <div key={d.label} className="w-8 h-8 rounded-lg flex items-center justify-center text-[11px] font-bold flex-shrink-0"
          style={{ background: d.bg, color: d.color }}>
          {d.label}
        </div>
      ))}
    </div>
  </div>
);

const DefineIllus = () => (
  <div className="flex flex-col gap-3 w-full">
    <div className="grid grid-cols-3 gap-1.5">
      {[
        { label: "Fear", cards: [{ text: "Loss anxiety", type: "purple" }, { text: "Avoidance", type: "muted" }] },
        { label: "Trust", cards: [{ text: "Social proof", type: "blue" }, { text: "Transparency", type: "muted" }] },
        { label: "Wins", cards: [{ text: "Milestones", type: "orange" }, { text: "Progress", type: "muted" }] },
      ].map((group) => (
        <div key={group.label} className="flex flex-col gap-1">
          <div className="text-[9px] font-bold uppercase tracking-wider text-center mb-0.5" style={{ color: "#bbb" }}>{group.label}</div>
          {group.cards.map((card) => (
            <div key={card.text} className="rounded-md px-2 py-1.5 text-[10px] font-medium text-center leading-tight"
              style={{
                background: card.type === "purple" ? "#f0eeff" : card.type === "blue" ? "#eaf3ff" : card.type === "orange" ? "#fff4ec" : "rgba(0,0,0,0.04)",
                color: card.type === "purple" ? "#4f46e5" : card.type === "blue" ? "#1d4ed8" : card.type === "orange" ? "#c2410c" : "#888",
                border: `1px solid ${card.type === "purple" ? "rgba(99,102,241,0.15)" : card.type === "blue" ? "rgba(37,99,235,0.15)" : card.type === "orange" ? "rgba(234,88,12,0.15)" : "rgba(0,0,0,0.07)"}`,
              }}>
              {card.text}
            </div>
          ))}
        </div>
      ))}
    </div>
    <div className="rounded-lg px-3 py-2.5 flex items-center gap-2" style={{ background: "#0A0A0A" }}>
      <span className="text-[9px] font-bold uppercase tracking-wider flex-shrink-0" style={{ color: "rgba(255,255,255,0.35)" }}>HMW</span>
      <span className="text-[10px] italic" style={{ color: "rgba(255,255,255,0.65)" }}>"...make investing feel safe for first-timers?"</span>
    </div>
  </div>
);

const DesignIllus = () => (
  <div className="flex flex-col gap-2 w-full">
    <div className="flex items-center gap-1.5 mb-1">
      <div className="w-2 h-2 rounded-full bg-red-400" />
      <div className="w-2 h-2 rounded-full bg-yellow-400" />
      <div className="w-2 h-2 rounded-full bg-green-400" />
      <span className="text-[10px] font-medium ml-1" style={{ color: "#bbb" }}>Figma — Onboarding v3</span>
    </div>
    <div className="rounded-xl overflow-hidden border" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
      <div className="flex items-center gap-1.5 px-3 py-2" style={{ background: "#f5f5f5", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
        <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
        <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
        <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
      </div>
      <div className="p-3 bg-white flex flex-col gap-1.5">
        <div className="h-1.5 rounded-full w-[55%]" style={{ background: "rgba(99,102,241,0.4)" }} />
        <div className="h-1.5 rounded-full w-full" style={{ background: "rgba(0,0,0,0.07)" }} />
        <div className="h-1.5 rounded-full w-[35%]" style={{ background: "rgba(0,0,0,0.05)" }} />
        <div className="flex gap-2 mt-1">
          <div className="px-3 py-1 rounded text-[9px] font-bold text-white" style={{ background: "#6366f1" }}>Continue</div>
          <div className="px-3 py-1 rounded text-[9px]" style={{ border: "1px solid rgba(0,0,0,0.1)", color: "#888" }}>Skip</div>
        </div>
      </div>
    </div>
    <div className="grid grid-cols-2 gap-1.5">
      {[0, 1].map((i) => (
        <div key={i} className="rounded-lg p-2 bg-white border flex flex-col gap-1" style={{ borderColor: "rgba(0,0,0,0.07)" }}>
          <div className="h-1 rounded-full" style={{ width: i === 0 ? "70%" : "80%", background: "rgba(99,102,241,0.35)" }} />
          <div className="h-1 rounded-full w-1/2" style={{ background: "rgba(0,0,0,0.07)" }} />
        </div>
      ))}
    </div>
  </div>
);

const DeliverIllus = () => (
  <div className="flex flex-col gap-2.5 w-full">
    <div className="grid grid-cols-2 gap-2">
      {[
        { val: "↑38", suf: "%", lbl: "Completion" },
        { val: "4.6", suf: "/5", lbl: "Usability" },
      ].map((m) => (
        <div key={m.lbl} className="rounded-xl p-3" style={{ background: "#f9f8f6", border: "1px solid rgba(0,0,0,0.07)" }}>
          <div className="font-normal leading-none mb-1" style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, color: "#0A0A0A" }}>
            {m.val}<em style={{ fontStyle: "normal", color: "#6366f1", fontSize: 14 }}>{m.suf}</em>
          </div>
          <div className="text-[9px] font-semibold uppercase tracking-wider" style={{ color: "#bbb" }}>{m.lbl}</div>
        </div>
      ))}
    </div>
    <div className="rounded-xl p-3" style={{ background: "#f9f8f6", border: "1px solid rgba(0,0,0,0.07)" }}>
      <div className="text-[9px] font-bold uppercase tracking-wider mb-2" style={{ color: "#bbb" }}>Drop-off — before vs after</div>
      <div className="flex items-end gap-1" style={{ height: 40 }}>
        {[
          { h: "80%", type: "before" }, { h: "32%", type: "after" },
          { h: "70%", type: "before" }, { h: "28%", type: "after" },
          { h: "65%", type: "before" }, { h: "22%", type: "after" },
        ].map((b, i) => (
          <div key={i} className="flex-1 rounded-t"
            style={{ height: b.h, background: b.type === "before" ? "rgba(0,0,0,0.08)" : "rgba(99,102,241,0.55)" }} />
        ))}
      </div>
    </div>
    <div className="rounded-xl px-3 py-2.5 flex items-center gap-3 bg-white" style={{ border: "1px solid rgba(0,0,0,0.07)" }}>
      <span className="relative flex h-2 w-2 flex-shrink-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: "#22c55e" }} />
        <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: "#22c55e" }} />
      </span>
      <div>
        <div className="text-[11px] font-semibold" style={{ color: "#0A0A0A" }}>Maze test complete</div>
        <div className="text-[9px]" style={{ color: "#bbb" }}>24 participants · 2 rounds</div>
      </div>
    </div>
  </div>
);

const illustrations = [DiscoverIllus, DefineIllus, DesignIllus, DeliverIllus];

const Process = () => {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);

  const handleStep = (i: number) => {
    if (i === active) return;
    setAnimating(true);
    setTimeout(() => {
      setActive(i);
      setAnimating(false);
    }, 220);
  };

  const IllusComponent = illustrations[active];
  const step = steps[active];
  const progressPct = active === 0 ? 0 : (active / 3) * 100;

  return (
    <section id="process" className="py-24 px-6 lg:px-8 max-w-site mx-auto">

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="mb-12"
      >
        <p className="type-label text-muted-foreground mb-3">Process</p>
        <h2 className="font-normal text-foreground"
          style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(32px, 4vw, 48px)", lineHeight: 1.1 }}>
          How I <em style={{ fontStyle: "italic", color: "#6366f1" }}>work</em>
        </h2>
      </motion.div>

      {/* Stepper track */}
      <div className="relative flex items-start mb-6">
        {/* Background line */}
        <div className="absolute h-px bg-border z-0" style={{ top: 20, left: 20, right: 20 }} />
        {/* Progress line */}
        <div className="absolute h-px z-10 transition-all duration-500" style={{
          top: 20, left: 20,
          width: `calc(${progressPct}% * (100% - 40px) / 100)`,
          background: "#6366f1",
          transition: "width 0.4s cubic-bezier(0.16,1,0.3,1)"
        }} />
        {steps.map((s, i) => (
          <div key={i} className="flex-1 flex flex-col items-center relative z-20 cursor-pointer"
            onClick={() => handleStep(i)}>
            <div className="w-10 h-10 rounded-full flex items-center justify-center mb-2.5 transition-all duration-300"
              style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: 14, fontStyle: "italic",
                background: i === active ? "#6366f1" : "hsl(var(--background))",
                border: `1.5px solid ${i === active ? "#6366f1" : "hsl(var(--border))"}`,
                color: i === active ? "#fff" : "hsl(var(--muted-foreground))",
                boxShadow: i === active ? "0 4px 12px rgba(99,102,241,0.25)" : "none",
              }}>
              {String(i + 1).padStart(2, "0")}
            </div>
            <div className="text-center transition-colors duration-300 max-w-[90px]"
              style={{ fontSize: 11, fontWeight: 600, lineHeight: 1.3, color: i === active ? "#0A0A0A" : "hsl(var(--muted-foreground))" }}>
              {s.tag.split(" — ")[1]}
            </div>
          </div>
        ))}
      </div>

      {/* Panel */}
      <motion.div
        className="rounded-2xl overflow-hidden bg-background relative"
        style={{ border: "1px solid hsl(var(--border))" }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Indigo top bar */}
        <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl"
          style={{ background: "linear-gradient(90deg, #6366f1, #818cf8)" }} />

        <div className="grid" style={{ gridTemplateColumns: "65fr 35fr", minHeight: 280 }}>
          {/* Left — text */}
          <div className="flex flex-col justify-center p-10"
            style={{
              borderRight: "1px solid hsl(var(--border))",
              opacity: animating ? 0 : 1,
              transform: animating ? "translateY(6px)" : "translateY(0)",
              transition: "opacity 0.22s ease, transform 0.22s ease",
            }}>
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] mb-2.5"
              style={{ color: "hsl(var(--muted-foreground))" }}>
              {step.tag}
            </p>
            <h3 className="font-normal mb-3"
              style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(22px, 2.5vw, 30px)", lineHeight: 1.2, color: "hsl(var(--foreground))" }}>
              {step.title}{" "}
              <em style={{ fontStyle: "italic", color: "#6366f1" }}>{step.titleEm}</em>
            </h3>
            <p className="mb-5 max-w-[400px]"
              style={{ fontSize: 13, lineHeight: 1.75, color: "hsl(var(--muted-foreground))" }}>
              {step.desc}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {step.pills.map((pill) => (
                <span key={pill} className="text-[10px] font-medium px-3 py-1 rounded-full"
                  style={{ background: "rgba(99,102,241,0.06)", color: "#6366f1", border: "1px solid rgba(99,102,241,0.14)" }}>
                  {pill}
                </span>
              ))}
            </div>
          </div>

          {/* Right — illustration */}
          <div className="flex items-center justify-center p-8"
            style={{
              opacity: animating ? 0 : 1,
              transform: animating ? "translateY(6px)" : "translateY(0)",
              transition: "opacity 0.22s ease, transform 0.22s ease",
            }}>
            <IllusComponent />
          </div>
        </div>
      </motion.div>

      {/* Quote block */}
      <div className="mt-12 relative overflow-hidden rounded-2xl"
        style={{ background: "hsl(var(--foreground))" }}>
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(99,102,241,0.15), transparent 70%)" }} />
        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(139,92,246,0.1), transparent 70%)" }} />
        <div className="relative p-12 md:p-16">
          <div className="absolute top-4 left-8 leading-none font-serif select-none pointer-events-none"
            style={{ fontSize: 100, color: "rgba(99,102,241,0.12)", fontFamily: "Georgia, serif" }}>"</div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mt-6">
            <p className="max-w-2xl italic leading-relaxed text-primary-foreground/90"
              style={{ fontSize: "clamp(20px, 2.5vw, 28px)" }}>
              The best designers I know aren't the best at Figma. They're the best at asking the right questions.
            </p>
            <div className="flex-shrink-0 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-[13px] font-bold text-white"
                style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.7), rgba(139,92,246,0.7))" }}>
                DM
              </div>
              <div>
                <div className="text-[13px] font-medium text-primary-foreground/80">Deepak Maan</div>
                <div className="text-[11px] text-primary-foreground/35">Product Designer</div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default Process;
