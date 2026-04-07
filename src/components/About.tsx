import { useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, ExternalLink } from "lucide-react";

const FONT_BODY = "'Aileron', sans-serif";
const FONT_DISPLAY = "'Unbounded', sans-serif";

const skillGroups = [
  {
    label: "Research",
    color: "#6366f1",
    colorBg: "rgba(99,102,241,0.08)",
    colorBorder: "rgba(99,102,241,0.18)",
    skills: ["User Research", "User Interviews", "Usability Testing", "A/B Testing"],
  },
  {
    label: "Design",
    color: "#0ea5e9",
    colorBg: "rgba(14,165,233,0.08)",
    colorBorder: "rgba(14,165,233,0.18)",
    skills: ["Figma", "FigJam", "Figma Make", "Prototyping", "Design Systems", "Photoshop", "Illustrator"],
  },
  {
    label: "AI",
    color: "#a855f7",
    colorBg: "rgba(168,85,247,0.08)",
    colorBorder: "rgba(168,85,247,0.18)",
    skills: ["Claude / AI Tools", "Midjourney", "Prompt Writing"],
  },
  {
    label: "Workflow",
    color: "#10b981",
    colorBg: "rgba(16,185,129,0.08)",
    colorBorder: "rgba(16,185,129,0.18)",
    skills: ["Notion", "Miro"],
  },
];

const experiences = [
  {
    company: "JSW Steel",
    role: "Design Analyst",
    duration: "Aug 2025 — Present",
    current: true,
    points: [
      "Designing end-to-end monthly steel market intelligence reports, structuring complex data into Power BI–driven insight narratives for the CMO",
      "Mapped district-wise sales potential using historical demand analysis, improving regional sales projections and opportunity sizing",
      "Researched the Global/Indian data center market to predict steel consumption trends across regions and steel categories",
    ],
  },
  {
    company: "Tech Japan (Talendy)",
    role: "UX Research Intern",
    duration: "Sep – Nov 2024 · 2 months",
    current: false,
    points: [
      "Sole researcher on a job platform used by IIT students to find roles in Japan — ran 10 1:1 interviews across 6 IITs",
      "Documented 9 platform pain points; multiple fixes shipped to production including job description layout, dark mode accessibility, and a built-in communication tool",
      "Reframing the WhatsApp finding as a visibility problem got it onto the priority list",
    ],
  },
  {
    company: "EVeez",
    role: "Product Designer",
    duration: "Oct 2023 – Apr 2024 · 8 months",
    current: false,
    points: [
      "Led design of multiple high-impact landing pages and the homepage, improving usability, visual hierarchy, and conversion-focused user flows",
      "Resulted in a 12% increase in user conversion rate through research-backed design iterations",
      "Collaborated closely with developers and product managers to ensure smooth implementation",
    ],
  },
  {
    company: "CyberLabs, IIT ISM Dhanbad",
    role: "Head of Design",
    duration: "May 2023 – Apr 2025 · 2 years",
    current: false,
    points: [
      "Led the UI/UX division of CyberLabs — the tech society of IIT ISM Dhanbad",
      "Organised design workshops and mentored 50+ students across the institute",
      "Drove creative direction for campus digital products and internal design initiatives",
    ],
  },
];

const cardSocials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/deepakmaan/", icon: Linkedin },
  { label: "GitHub", href: "https://github.com/deepakmaan25", icon: Github },
  { label: "Behance", href: "https://www.behance.net/deepakmaan1", icon: ExternalLink },
];

const About = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const toggle = (i: number) => setOpenIndex(openIndex === i ? -1 : i);

  return (
    <section id="about" className="py-20 max-md:py-14 px-6 lg:px-8 max-w-site mx-auto">

      {/* ── Section header ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="mb-10"
      >
        <p style={{ fontFamily: FONT_BODY, fontSize: 11, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "hsl(var(--muted-foreground))", marginBottom: 12 }}>About</p>
        <h2 style={{ margin: 0, lineHeight: 1.15 }}>
          <span style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(20px, 3.5vw, 36px)", fontWeight: 700, color: "hsl(var(--foreground))", letterSpacing: "-0.03em" }}>A designer who </span>
          <span style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(20px, 3.5vw, 36px)", fontWeight: 700, color: "#6366f1", letterSpacing: "-0.03em" }}>listens</span>
          <span style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(20px, 3.5vw, 36px)", fontWeight: 700, color: "hsl(var(--foreground))", letterSpacing: "-0.03em" }}> first.</span>
        </h2>
      </motion.div>

      {/* ── Bento grid ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="about-bento"
        style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 8, marginBottom: 40, alignItems: "stretch" }}
      >

        {/* ── LEFT COLUMN ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>

  {/* ── Identity card — Layout B1 ── */}
<div
  style={{
    flex: 1,
    borderRadius: 20,
    overflow: "hidden",
    background: "linear-gradient(145deg, #1e1b4b, #312e81, #4338ca)",
    position: "relative",
    minHeight: 300,
  }}
>
  {/* Blobs */}
  <div style={{ position: "absolute", top: -30, right: -30, width: 130, height: 130, borderRadius: "50%", background: "radial-gradient(circle, rgba(165,180,252,0.32), transparent 70%)", pointerEvents: "none" }} />
  <div style={{ position: "absolute", bottom: -30, left: -20, width: 100, height: 100, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.2), transparent 70%)", pointerEvents: "none" }} />
  <div style={{ position: "absolute", bottom: -8, right: 12, fontFamily: FONT_DISPLAY, fontSize: 68, fontWeight: 800, color: "rgba(255,255,255,0.04)", lineHeight: 1, pointerEvents: "none", userSelect: "none", letterSpacing: "-0.04em" }}>DM</div>

  {/* ── DESKTOP: content left, photo vertically centered right ── */}
  <div
    className="id-desktop"
    style={{
      display: "flex",
      flexDirection: "row",
      gap: 16,
      padding: 24,
      height: "100%",
      minHeight: 280,
      position: "relative",
      zIndex: 2,
    }}
  >
    {/* Left: full content stack */}
    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", minWidth: 0 }}>
      <div>
        <p style={{ fontFamily: FONT_BODY, fontSize: 9, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 10 }}>About</p>
        <div style={{ lineHeight: 1.1, marginBottom: 6 }}>
          <span style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(18px, 1.8vw, 24px)", fontWeight: 700, color: "#fff", letterSpacing: "-0.03em", display: "block" }}>Deepak</span>
          <span style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(18px, 1.8vw, 24px)", fontWeight: 700, color: "#a5b4fc", display: "block", letterSpacing: "-0.03em" }}>Maan.</span>
        </div>
        <p style={{ fontFamily: FONT_BODY, fontSize: 10, lineHeight: 1.5, color: "rgba(255,255,255,0.4)", marginBottom: 14 }}>
          Product Designer · India · Open to remote
        </p>
        <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
          {cardSocials.map((s) => (
            
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: 4, fontFamily: FONT_BODY, fontSize: 10, fontWeight: 500, color: "rgba(255,255,255,0.65)", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", padding: "4px 9px", borderRadius: 100, textDecoration: "none", transition: "background 0.2s, color 0.2s", whiteSpace: "nowrap" }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "rgba(255,255,255,0.16)"; el.style.color = "#fff"; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "rgba(255,255,255,0.08)"; el.style.color = "rgba(255,255,255,0.65)"; }}
            >
              <s.icon size={9} style={{ flexShrink: 0 }} />
              {s.label} ↗
            </a>
          ))}
        </div>
      </div>
      <p style={{ fontFamily: FONT_BODY, fontSize: 11, fontStyle: "italic", color: "rgba(255,255,255,0.28)", lineHeight: 1.65, margin: 0 }}>
        "Design starts in conversations, not Figma."
      </p>
    </div>

    {/* Right: photo + caption, vertically centered */}
    <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8 }}>
      <div style={{ width: 88, height: 106, borderRadius: 10, overflow: "hidden", border: "1.5px solid rgba(165,180,252,0.22)", flexShrink: 0 }}>
        <img
          src="/deepak.png"
          alt="Deepak Maan"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", display: "block", filter: "brightness(0.9) saturate(0.88)" }}
          onError={e => { (e.currentTarget.parentElement as HTMLDivElement).style.display = "none"; }}
        />
      </div>
      <span style={{ fontFamily: FONT_BODY, fontSize: 9, color: "rgba(255,255,255,0.28)", fontStyle: "italic", textAlign: "center", lineHeight: 1.4 }}>
        Product Designer
      </span>
    </div>
  </div>

  {/* ── MOBILE: everything vertically centered in a single column ── */}
  <div
    className="id-mobile"
    style={{
      display: "none",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      padding: "26px 22px",
      gap: 16,
      position: "relative",
      zIndex: 2,
    }}
  >
    {/* Name + role */}
    <div style={{ width: "100%" }}>
      <p style={{ fontFamily: FONT_BODY, fontSize: 9, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 8 }}>About</p>
      <div style={{ lineHeight: 1.1, marginBottom: 5 }}>
        <span style={{ fontFamily: FONT_DISPLAY, fontSize: 22, fontWeight: 700, color: "#fff", letterSpacing: "-0.03em", display: "block" }}>Deepak</span>
        <span style={{ fontFamily: FONT_DISPLAY, fontSize: 22, fontWeight: 700, color: "#a5b4fc", display: "block", letterSpacing: "-0.03em" }}>Maan.</span>
      </div>
      <p style={{ fontFamily: FONT_BODY, fontSize: 11, color: "rgba(255,255,255,0.4)", lineHeight: 1.5 }}>
        Product Designer · India · Open to remote
      </p>
    </div>

    {/* Photo + caption */}
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 7 }}>
      <div style={{ width: 96, height: 116, borderRadius: 10, overflow: "hidden", border: "1.5px solid rgba(165,180,252,0.22)" }}>
        <img
          src="/deepak.png"
          alt="Deepak Maan"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", display: "block", filter: "brightness(0.9) saturate(0.88)" }}
          onError={e => { (e.currentTarget.parentElement as HTMLDivElement).style.display = "none"; }}
        />
      </div>
      <span style={{ fontFamily: FONT_BODY, fontSize: 9, color: "rgba(255,255,255,0.28)", fontStyle: "italic" }}>
        Product Designer
      </span>
    </div>

    {/* Social links */}
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, width: "100%" }}>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "center" }}>
        {cardSocials.map((s) => (
          
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: 4, fontFamily: FONT_BODY, fontSize: 10, fontWeight: 500, color: "rgba(255,255,255,0.65)", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", padding: "5px 11px", borderRadius: 100, textDecoration: "none" }}
          >
            <s.icon size={9} style={{ flexShrink: 0 }} />
            {s.label} ↗
          </a>
        ))}
      </div>
      <p style={{ fontFamily: FONT_BODY, fontSize: 11, fontStyle: "italic", color: "rgba(255,255,255,0.26)", lineHeight: 1.65, margin: 0, textAlign: "center" }}>
        "Design starts in conversations, not Figma."
      </p>
    </div>
  </div>
</div>

          {/* ── Status card ── */}
          <div style={{ borderRadius: 20, padding: "18px 20px", background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexShrink: 0 }}>
            <div>
              <p style={{ fontFamily: FONT_BODY, fontSize: 9, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "hsl(var(--muted-foreground))", marginBottom: 6 }}>Status</p>
              <div style={{ lineHeight: 1.3, marginBottom: 10 }}>
                <span style={{ fontFamily: FONT_DISPLAY, fontSize: 11, fontWeight: 600, color: "hsl(var(--foreground))", letterSpacing: "-0.02em" }}>Open to new </span>
                <span style={{ fontFamily: FONT_DISPLAY, fontSize: 11, fontWeight: 700, color: "#6366f1", letterSpacing: "-0.02em" }}>opportunities</span>
              </div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: FONT_BODY, fontSize: 11, fontWeight: 500, padding: "4px 10px", borderRadius: 100, background: "rgba(34,197,94,0.12)", color: "#22c55e", border: "1px solid rgba(34,197,94,0.25)" }}>
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
                </span>
                Available now
              </div>
            </div>
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <div style={{ fontFamily: FONT_DISPLAY, fontSize: 26, fontWeight: 700, color: "#6366f1", lineHeight: 1, letterSpacing: "-0.03em" }}>5<span style={{ fontSize: 14 }}>+</span></div>
              <div style={{ fontFamily: FONT_BODY, fontSize: 9, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "hsl(var(--muted-foreground))", marginTop: 3 }}>Products</div>
            </div>
          </div>
        </div>

        {/* ── RIGHT COLUMN ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>

          {/* Bio card */}
          <div style={{ flex: 1, borderRadius: 20, padding: 26, background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }}>
            <p style={{ fontFamily: FONT_BODY, fontSize: 9, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "hsl(var(--muted-foreground))", marginBottom: 10 }}>Bio</p>
            <h3 style={{ margin: "0 0 14px", lineHeight: 1.3 }}>
              <span style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(12px, 1.4vw, 16px)", fontWeight: 700, color: "hsl(var(--foreground))", letterSpacing: "-0.02em" }}>I don't start in Figma. </span>
              <span style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(12px, 1.4vw, 16px)", fontWeight: 700, color: "#6366f1", letterSpacing: "-0.02em" }}>I start with the person who's struggling.</span>
            </h3>
            <p style={{ fontFamily: FONT_BODY, fontSize: 13, lineHeight: 1.8, color: "hsl(var(--muted-foreground))", marginBottom: 0 }}>
              I'm Deepak — a Product Designer from IIT ISM Dhanbad, based in India and open to remote. I've worked across AI, SaaS, job platforms, and consumer products — researching what's broken, designing what fixes it, and making sure it actually ships.
            </p>
            <div style={{ width: 28, height: 2, background: "#6366f1", opacity: 0.3, borderRadius: 2, margin: "14px 0" }} />
            <p style={{ fontFamily: FONT_BODY, fontSize: 13, lineHeight: 1.8, color: "hsl(var(--muted-foreground))", marginBottom: 12 }}>
              Google UX Certified. Led design at CyberLabs, IIT ISM — mentored 50+ students. Currently a Design Analyst at JSW Steel, where design meets data and business strategy.
            </p>
            <p style={{ fontFamily: FONT_BODY, fontSize: 12, lineHeight: 1.75, color: "hsl(var(--muted-foreground))", fontStyle: "italic" }}>
              "I use AI tools — Claude, Midjourney, Figma Make — to compress the repetitive parts of research and synthesis."
            </p>
          </div>

          {/* Skills card — Hybrid 3: 2×2 grid, top colour bar + dot + label */}
          <div style={{ borderRadius: 20, background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", padding: 20, flexShrink: 0 }}>
            <p style={{ fontFamily: FONT_BODY, fontSize: 9, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "hsl(var(--muted-foreground))", marginBottom: 14 }}>
              Skills & Tools
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {skillGroups.map((group) => (
                <div
                  key={group.label}
                  style={{ borderRadius: 10, overflow: "hidden", background: "hsl(var(--muted))", border: "1px solid hsl(var(--border))" }}
                >
                  {/* Top colour bar */}
                  <div style={{ height: 3, background: group.color, width: "100%" }} />
                  <div style={{ padding: "10px 11px 12px" }}>
                    {/* Category label */}
                    <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 8 }}>
                      <div style={{ width: 5, height: 5, borderRadius: "50%", background: group.color, flexShrink: 0 }} />
                      <span style={{ fontFamily: FONT_BODY, fontSize: 10, fontWeight: 700, color: group.color, letterSpacing: "0.04em" }}>{group.label}</span>
                    </div>
                    {/* Skill pills */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                      {group.skills.map((skill) => (
                        <span
                          key={skill}
                          style={{ fontFamily: FONT_BODY, fontSize: 10, fontWeight: 400, padding: "3px 7px", borderRadius: 5, background: "hsl(var(--background))", color: "hsl(var(--muted-foreground))", border: "1px solid hsl(var(--border))", lineHeight: 1.4, cursor: "default", transition: "all 0.18s" }}
                          onMouseEnter={e => { const el = e.currentTarget as HTMLSpanElement; el.style.background = group.colorBg; el.style.color = group.color; el.style.borderColor = group.colorBorder; }}
                          onMouseLeave={e => { const el = e.currentTarget as HTMLSpanElement; el.style.background = "hsl(var(--background))"; el.style.color = "hsl(var(--muted-foreground))"; el.style.borderColor = "hsl(var(--border))"; }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Experience accordion ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      >
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 20 }}>
          <div>
            <p style={{ fontFamily: FONT_BODY, fontSize: 11, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "hsl(var(--muted-foreground))", marginBottom: 8 }}>Experience</p>
            <h3 style={{ margin: 0, lineHeight: 1.15 }}>
              <span style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(18px, 2.5vw, 28px)", fontWeight: 700, color: "hsl(var(--foreground))", letterSpacing: "-0.03em" }}>Where I've </span>
              <span style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(18px, 2.5vw, 28px)", fontWeight: 700, color: "#6366f1", letterSpacing: "-0.03em" }}>worked</span>
            </h3>
          </div>
          <span style={{ fontFamily: FONT_BODY, fontSize: 12, color: "hsl(var(--muted-foreground))" }}>4 roles · 1.5 years</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {experiences.map((exp, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                onClick={() => toggle(i)}
                style={{ borderRadius: 14, overflow: "hidden", background: "hsl(var(--card))", border: `1.5px solid ${isOpen ? "rgba(99,102,241,0.35)" : "hsl(var(--border))"}`, cursor: "pointer", transition: "border-color 0.25s, box-shadow 0.25s", boxShadow: isOpen ? "0 0 0 3px rgba(99,102,241,0.08)" : "none" }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", gap: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", flexShrink: 0, background: isOpen ? "#6366f1" : exp.current ? "#22c55e" : "hsl(var(--border))", boxShadow: isOpen ? "0 0 0 3px rgba(99,102,241,0.2)" : exp.current ? "0 0 0 3px rgba(34,197,94,0.2)" : "none", transition: "all 0.25s" }} />
                    <div>
                      <div style={{ fontFamily: FONT_BODY, fontSize: 14, fontWeight: 600, lineHeight: 1.4, color: isOpen ? "#818cf8" : "hsl(var(--foreground))", transition: "color 0.2s" }}>{exp.company}</div>
                      <div style={{ fontFamily: FONT_BODY, fontSize: 12, lineHeight: 1.5, color: "#818cf8", marginTop: 2 }}>{exp.role}</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                    <span style={{ fontFamily: FONT_BODY, fontSize: 11, fontWeight: exp.current ? 600 : 400, color: exp.current ? "#818cf8" : "hsl(var(--muted-foreground))", padding: "3px 10px", borderRadius: 100, background: exp.current ? "rgba(99,102,241,0.1)" : "transparent", border: exp.current ? "1px solid rgba(99,102,241,0.2)" : "none" }}>
                      {exp.duration}
                    </span>
                    <span style={{ fontSize: 10, color: "hsl(var(--muted-foreground))", display: "inline-block", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s" }}>▼</span>
                  </div>
                </div>
                <div style={{ maxHeight: isOpen ? 260 : 0, overflow: "hidden", transition: "max-height 0.4s cubic-bezier(0.16,1,0.3,1)" }}>
                  <div style={{ padding: "0 20px 16px", borderTop: "1px solid hsl(var(--border))" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8, paddingTop: 14 }}>
                      {exp.points.map((point, j) => (
                        <div key={j} style={{ display: "flex", gap: 10, fontFamily: FONT_BODY, fontSize: 13, lineHeight: 1.75, color: "hsl(var(--muted-foreground))" }}>
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

      <style>{`
        /* Bento: single column on mobile */
        @media (max-width: 768px) {
          .about-bento {
            grid-template-columns: 1fr !important;
          }
        }

        /* Identity card layout switch */
        @media (min-width: 769px) {
          .id-desktop { display: flex !important; }
          .id-mobile  { display: none !important; }
        }
        @media (max-width: 768px) {
          .id-desktop { display: none !important; }
          .id-mobile  { display: flex !important; }
        }
      `}</style>
    </section>
  );
};

export default About;
