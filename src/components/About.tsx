import { useState } from "react";
import { motion } from "framer-motion";

const skills = [
  "User Interviews", "Figma", "Design Systems", "AI Workflows",
  "Usability Testing", "Journey Mapping", "Claude", "Prototyping", "Midjourney",
];

const experiences = [
  {
    company: "Freelance / Self-employed",
    role: "Product Designer",
    duration: "2023 — Present",
    current: true,
    points: [
      "End-to-end UX for 12+ client projects across fintech, health, and EdTech",
      "AI-assisted research synthesis cutting analysis time by 3×",
      "Built and maintained Figma design systems for 3 long-term clients",
    ],
  },
  {
    company: "Design Institute",
    role: "BSc Interaction Design",
    duration: "2020 — 2023",
    current: false,
    points: [
      "Final year project: Redesigned a government portal, validated with 40+ users",
      "Coursework spanning HCI, visual design, and front-end prototyping",
      "Graduated with distinction",
    ],
  },
  {
    company: "Self-directed Learning",
    role: "AI for Designers / Google UX Certificate",
    duration: "2023 — 2024",
    current: false,
    points: [
      "Completed Google UX Design Certificate (Coursera)",
      "Explored AI-integrated workflows using Claude, Midjourney, and ChatGPT",
      "Applied learnings immediately to active client projects",
    ],
  },
];

const About = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const toggle = (i: number) => setOpenIndex(openIndex === i ? -1 : i);

  const lift = (el: HTMLDivElement, up: boolean) => {
    el.style.transform = up ? "translateY(-3px)" : "translateY(0)";
  };

  return (
    <section id="about" className="py-24 px-6 lg:px-8 max-w-site mx-auto">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="mb-10"
      >
        <p className="type-label text-muted-foreground mb-3">About</p>
        <h2 className="font-normal text-foreground"
          style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(32px, 4vw, 44px)", lineHeight: 1.1 }}>
          A designer who{" "}
          <em style={{ fontStyle: "italic", color: "#6366f1" }}>listens</em> first.
        </h2>
      </motion.div>

      {/* ── BENTO GRID ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="about-bento"
        style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 8, marginBottom: 56, alignItems: "stretch" }}
      >
        {/* LEFT */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>

          {/* Photo card — always deep indigo, works in both modes */}
          <div
            onMouseEnter={e => lift(e.currentTarget as HTMLDivElement, true)}
            onMouseLeave={e => lift(e.currentTarget as HTMLDivElement, false)}
            style={{
              flex: 1, borderRadius: 20, padding: 28,
              background: "linear-gradient(145deg, #1e1b4b, #312e81, #4338ca)",
              display: "flex", flexDirection: "column", justifyContent: "space-between",
              position: "relative", overflow: "hidden", minHeight: 320,
              transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s",
              cursor: "default",
            }}
          >
            <div style={{ position: "absolute", top: -40, right: -40, width: 150, height: 150, borderRadius: "50%", background: "radial-gradient(circle, rgba(165,180,252,0.35), transparent 70%)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: -40, left: -20, width: 120, height: 120, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.2), transparent 70%)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: -10, right: -5, fontFamily: "'DM Serif Display', serif", fontSize: 96, fontStyle: "italic", color: "rgba(255,255,255,0.04)", lineHeight: 1, pointerEvents: "none", userSelect: "none" }}>DM</div>
            <div style={{ position: "relative", zIndex: 1 }}>
              <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 10 }}>About</p>
              <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 32, fontWeight: 400, color: "#fff", lineHeight: 1.05 }}>
                Deepak<em style={{ fontStyle: "italic", color: "#a5b4fc", display: "block" }}>Maan</em>
              </div>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 6 }}>Product Designer · India · Open to remote</p>
            </div>
            <p style={{ fontSize: 12, fontStyle: "italic", color: "rgba(255,255,255,0.28)", lineHeight: 1.6, position: "relative", zIndex: 1 }}>
              "Design starts in conversations, not Figma."
            </p>
          </div>

          {/* Availability card — dark-mode aware */}
          <div
            onMouseEnter={e => lift(e.currentTarget as HTMLDivElement, true)}
            onMouseLeave={e => lift(e.currentTarget as HTMLDivElement, false)}
            style={{
              borderRadius: 20, padding: "22px 24px",
              background: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16,
              flexShrink: 0,
              transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1)", cursor: "default",
            }}
          >
            <div>
              <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "hsl(var(--muted-foreground))", marginBottom: 6 }}>Status</p>
              <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 18, fontWeight: 400, color: "hsl(var(--foreground))", lineHeight: 1.2 }}>
                Open to new <em style={{ fontStyle: "italic", color: "#6366f1" }}>opportunities</em>
              </div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11, fontWeight: 500, padding: "4px 10px", borderRadius: 100, background: "rgba(34,197,94,0.12)", color: "#22c55e", border: "1px solid rgba(34,197,94,0.25)", marginTop: 10 }}>
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
                </span>
                Available now
              </div>
            </div>
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 32, fontWeight: 400, color: "#6366f1", lineHeight: 1 }}>
                12<em style={{ fontStyle: "normal", fontSize: 18 }}>+</em>
              </div>
              <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "hsl(var(--muted-foreground))", marginTop: 3 }}>Projects</div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>

          {/* Bio card */}
          <div
            onMouseEnter={e => lift(e.currentTarget as HTMLDivElement, true)}
            onMouseLeave={e => lift(e.currentTarget as HTMLDivElement, false)}
            style={{
              flex: 1, borderRadius: 20, padding: 28,
              background: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
              transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s",
              cursor: "default",
            }}
          >
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "hsl(var(--muted-foreground))", marginBottom: 10 }}>Bio</p>
            <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, fontWeight: 400, color: "hsl(var(--foreground))", lineHeight: 1.25, marginBottom: 12 }}>
              Crafting experiences through{" "}
              <em style={{ fontStyle: "italic", color: "#6366f1" }}>research, design, and AI.</em>
            </h3>
            <p style={{ fontSize: 14, lineHeight: 1.8, color: "hsl(var(--muted-foreground))" }}>
              I'm Deepak — a product designer crafting digital experiences that balance user needs with business goals. I work at the intersection of UX research, interface design, and AI-powered creative workflows. Great design starts before the first wireframe — in conversations and empathy.
            </p>
            <div style={{ width: 28, height: 2, background: "#6366f1", opacity: 0.3, borderRadius: 2, margin: "16px 0" }} />
            <p style={{ fontSize: 14, lineHeight: 1.75, color: "hsl(var(--muted-foreground))", fontStyle: "italic" }}>
              "I leverage AI tools as force multipliers for research synthesis and ideation — not because it's trendy, but because it lets me spend more time on the thinking that actually matters."
            </p>
          </div>

          {/* Skills card — dark-mode aware */}
          <div
            onMouseEnter={e => lift(e.currentTarget as HTMLDivElement, true)}
            onMouseLeave={e => lift(e.currentTarget as HTMLDivElement, false)}
            style={{
              borderRadius: 20, padding: 24,
              background: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              flexShrink: 0,
              transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1)", cursor: "default",
            }}
          >
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "hsl(var(--muted-foreground))", marginBottom: 8 }}>Skills & Tools</p>
            <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 18, fontWeight: 400, color: "hsl(var(--foreground))", marginBottom: 12 }}>
              Research · Design · <em style={{ fontStyle: "italic", color: "#6366f1" }}>AI</em>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
              {skills.map(skill => (
                <span
                  key={skill}
                  style={{ fontSize: 11, fontWeight: 500, padding: "4px 10px", borderRadius: 100, background: "rgba(99,102,241,0.1)", color: "#818cf8", border: "1px solid rgba(99,102,241,0.2)", cursor: "default", transition: "all 0.2s" }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLSpanElement; el.style.background = "#6366f1"; el.style.color = "#fff"; el.style.borderColor = "#6366f1"; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLSpanElement; el.style.background = "rgba(99,102,241,0.1)"; el.style.color = "#818cf8"; el.style.borderColor = "rgba(99,102,241,0.2)"; }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── EXPERIENCE ACCORDION ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      >
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 20 }}>
          <div>
            <p className="type-label text-muted-foreground mb-2">Experience</p>
            <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 400, color: "hsl(var(--foreground))" }}>
              Where I've <em style={{ fontStyle: "italic", color: "#6366f1" }}>worked</em>
            </h3>
          </div>
          <span style={{ fontSize: 12, color: "hsl(var(--muted-foreground))" }}>3 roles · 4 years</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {experiences.map((exp, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                onClick={() => toggle(i)}
                style={{
                  borderRadius: 14,
                  overflow: "hidden",
                  background: "hsl(var(--card))",
                  border: `1.5px solid ${isOpen ? "rgba(99,102,241,0.35)" : "hsl(var(--border))"}`,
                  cursor: "pointer",
                  transition: "border-color 0.25s, box-shadow 0.25s",
                  boxShadow: isOpen ? "0 0 0 3px rgba(99,102,241,0.08)" : "none",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 22px", gap: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{
                      width: 8, height: 8, borderRadius: "50%", flexShrink: 0,
                      background: isOpen ? "#6366f1" : exp.current ? "#22c55e" : "hsl(var(--border))",
                      boxShadow: isOpen ? "0 0 0 3px rgba(99,102,241,0.2)" : exp.current ? "0 0 0 3px rgba(34,197,94,0.2)" : "none",
                      transition: "all 0.25s",
                    }} />
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: isOpen ? "#818cf8" : "hsl(var(--foreground))", transition: "color 0.2s" }}>
                        {exp.company}
                      </div>
                      <div style={{ fontSize: 12, color: "#818cf8", marginTop: 2 }}>{exp.role}</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                    <span style={{
                      fontSize: 11, fontWeight: exp.current ? 600 : 400,
                      color: exp.current ? "#818cf8" : "hsl(var(--muted-foreground))",
                      padding: "3px 10px", borderRadius: 100,
                      background: exp.current ? "rgba(99,102,241,0.1)" : "transparent",
                      border: exp.current ? "1px solid rgba(99,102,241,0.2)" : "none",
                    }}>
                      {exp.duration}
                    </span>
                    <span style={{ fontSize: 10, color: "hsl(var(--muted-foreground))", display: "inline-block", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s" }}>▼</span>
                  </div>
                </div>
                <div style={{ maxHeight: isOpen ? 200 : 0, overflow: "hidden", transition: "max-height 0.4s cubic-bezier(0.16,1,0.3,1)" }}>
                  <div style={{ padding: "0 22px 18px", borderTop: "1px solid hsl(var(--border))" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: 6, paddingTop: 14 }}>
                      {exp.points.map((point, j) => (
                        <div key={j} style={{ display: "flex", gap: 10, fontSize: 13, color: "hsl(var(--muted-foreground))", lineHeight: 1.7 }}>
                          <span style={{ color: "#6366f1", flexShrink: 0, opacity: 0.5 }}>—</span>
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

    </section>
  );
};

export default About;
