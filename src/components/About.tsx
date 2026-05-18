import { useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, ExternalLink } from "lucide-react";

const FONT_BODY    = "'Aileron', sans-serif";
const FONT_DISPLAY = "'Unbounded', sans-serif";

// ── Skills — outcomes anchored, modest level labels ───────────────────────────
const coreSkills = [
  {
    label:       "Product Design",
    evidence:    "40+ screens shipped across 3 products, end to end",
    level:       "Proficient",
    levelColor:  "#6366f1",
    levelBg:     "rgba(99,102,241,0.08)",
    levelBorder: "rgba(99,102,241,0.2)",
  },
  {
    label:       "User Research",
    evidence:    "9 pain points documented, 6 solutions shipped at Tech Japan",
    level:       "Proficient",
    levelColor:  "#6366f1",
    levelBg:     "rgba(99,102,241,0.08)",
    levelBorder: "rgba(99,102,241,0.2)",
  },
  {
    label:       "Design Systems",
    evidence:    "Token-to-component systems built for 2 live products",
    level:       "Intermediate",
    levelColor:  "#0ea5e9",
    levelBg:     "rgba(14,165,233,0.08)",
    levelBorder: "rgba(14,165,233,0.2)",
  },
  {
    label:       "AI-Assisted Design",
    evidence:    "Claude and Midjourney in active daily workflow",
    level:       "Advanced",
    levelColor:  "#a855f7",
    levelBg:     "rgba(168,85,247,0.08)",
    levelBorder: "rgba(168,85,247,0.2)",
  },
];

const toolTags = [
  "Figma", "FigJam", "Midjourney", "Photoshop",
  "Illustrator", "Power BI", "Miro", "Notion",
];

// ── Experience ────────────────────────────────────────────────────────────────
const experiences = [
  {
    company: "JSW Steel",
    role: "Design Analyst",
    duration: "Aug 2025 — Present",
    current: true,
    points: [
      "Designed and delivered 12+ monthly steel market intelligence reports in Power BI, translating dense pricing and demand data into executive-ready visual narratives for 500+ stakeholders across business units.",
      "Deep-dived into India's data center market to quantify steel consumption potential, modeled demand through 2030 and surfaced a 1 MTPA opportunity, flagged as a near-term revenue lever for JSW's growth strategy.",
    ],
  },
  {
    company: "Tech Japan (Talendy)",
    role: "UX Research Intern",
    duration: "Sep – Nov 2024 · 3 months",
    current: false,
    points: [
      "Shipped 6 solutions to production in 2 months: job description layout redesign, WCAG 2.1 AA accessibility fixes, save-all profile flow, multiple resume management, and a built-in communication tool that replaced a fragmented WhatsApp-based post-application workflow.",
      "80% of users reported easier navigation post-redesign. 70% adopted new features without prompting, both from observed usability sessions, not projections.",
      "Reframing the WhatsApp finding as a platform visibility problem got it onto the priority list.",
    ],
  },
  {
    company: "EVeez",
    role: "Product Designer",
    duration: "Oct 2023 – Apr 2024 · 7 months",
    current: false,
    points: [
      "Redesigned the homepage and 4 landing pages for an EV startup, ran competitive analysis, built wireframes, and took everything through to developer-ready mockups, driving a 12% lift in conversion rate.",
      "Sole designer on the team, owned the full process from first sketch to stakeholder sign-off, including usability reviews and iteration cycles.",
    ],
  },
  {
    company: "CyberLabs, IIT ISM Dhanbad",
    role: "Head of Design",
    duration: "May 2023 – Apr 2025 · 2 years",
    current: false,
    points: [
      "Led the UI/UX division of CyberLabs, the tech society of IIT ISM Dhanbad, organizing design workshops and mentoring 50+ students across the institute.",
      "Won WOC 4.0, led the winning design strategy for a competitive open problem statement at IIT Dhanbad.",
      "Selected as the only designer across 23 IITs for an early-stage startup role.",
    ],
  },
];

// ── Socials ───────────────────────────────────────────────────────────────────
const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/deepakmaan/", icon: Linkedin,     hoverColor: "#0077b5" },
  { label: "GitHub",   href: "https://github.com/deepakmaan25",          icon: Github,       hoverColor: "#6366f1" },
  { label: "Behance",  href: "https://www.behance.net/deepakmaan1",      icon: ExternalLink, hoverColor: "#053eff" },
];

// ── Photos ────────────────────────────────────────────────────────────────────
// Replace src values with your real photo paths once ready.
// Recommended: square or landscape crops, consistent mood.
// Portrait shots work fine — objectPosition "center top" keeps faces in frame.
const photos = [
  { src: "/photos/photo-01.jpg" },
  { src: "/photos/photo-02.jpg" },
  { src: "/photos/photo-03.jpg" },
  { src: "/photos/photo-04.jpg" },
  { src: "/photos/photo-05.jpg" },
];
const allPhotos = [...photos, ...photos];

// ── Component ─────────────────────────────────────────────────────────────────
const About = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const toggle = (i: number) => setOpenIndex(openIndex === i ? -1 : i);

  return (
    <section id="about" className="py-16 max-md:py-10 px-6 lg:px-8 max-w-site mx-auto">

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="mb-10"
      >
        <p style={{ fontFamily: FONT_BODY, fontSize: 11, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "hsl(var(--muted-foreground))", marginBottom: 12 }}>
          About
        </p>
        <h2 style={{ margin: 0, lineHeight: 1.15 }}>
          <span style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(20px,3.5vw,36px)", fontWeight: 700, color: "hsl(var(--foreground))", letterSpacing: "-0.03em" }}>A designer who </span>
          <span style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(20px,3.5vw,36px)", fontWeight: 700, color: "#6366f1",               letterSpacing: "-0.03em" }}>listens</span>
          <span style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(20px,3.5vw,36px)", fontWeight: 700, color: "hsl(var(--foreground))", letterSpacing: "-0.03em" }}> first.</span>
        </h2>
      </motion.div>

      {/* ── Main bento card ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        style={{
          border: "1px solid hsl(var(--border))",
          borderRadius: 16,
          overflow: "hidden",
          background: "hsl(var(--card))",
          marginBottom: 40,
        }}
      >

        {/* Identity strip — indigo-tinted gradient for personality */}
        <div
          className="about-id-strip"
          style={{
            display: "grid",
            gridTemplateColumns: "auto 1fr auto",
            gap: 16,
            alignItems: "center",
            padding: "18px 22px",
            borderBottom: "1px solid hsl(var(--border))",
            background: "linear-gradient(135deg, rgba(99,102,241,0.07) 0%, rgba(99,102,241,0.02) 60%, transparent 100%)",
            position: "relative",
          }}
        >
          {/* Subtle left accent bar */}
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3, background: "linear-gradient(to bottom, #6366f1, #a855f7)", borderRadius: "0 2px 2px 0" }} />

          {/* Profile photo */}
          <div style={{
            width: 48, height: 48, borderRadius: 12, overflow: "hidden",
            flexShrink: 0,
            border: "1.5px solid rgba(99,102,241,0.25)",
            background: "linear-gradient(135deg,#1e1b4b,#4338ca)",
            display: "flex", alignItems: "center", justifyContent: "center",
            marginLeft: 8,
          }}>
            <img
              src="/deepak.png"
              alt="Deepak Maan"
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", display: "block" }}
              onError={e => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
            />
          </div>

          {/* Name + availability */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
              <span style={{ fontFamily: FONT_DISPLAY, fontSize: 15, fontWeight: 700, color: "hsl(var(--foreground))", letterSpacing: "-0.02em" }}>
                Deepak Maan
              </span>
              <span style={{
                display: "inline-flex", alignItems: "center", gap: 4,
                fontFamily: FONT_BODY, fontSize: 9, fontWeight: 600,
                padding: "3px 8px", borderRadius: 20,
                background: "rgba(34,197,94,0.1)", color: "#22c55e",
                border: "1px solid rgba(34,197,94,0.25)",
              }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#22c55e", flexShrink: 0, animation: "aboutPulse 1.8s ease-in-out infinite" }} />
                Available
              </span>
            </div>
            <span style={{ fontFamily: FONT_BODY, fontSize: 12, color: "hsl(var(--muted-foreground))" }}>
              Product Designer · AI Products · India / Remote
            </span>
          </div>

          {/* Stats */}
          <div className="about-stats" style={{ display: "flex", gap: 20 }}>
            {[["7+", "Products"], ["2", "Years"], ["4+", "Industries"]].map(([v, l]) => (
              <div key={l} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: FONT_DISPLAY, fontSize: 17, fontWeight: 700, color: "#6366f1", lineHeight: 1, letterSpacing: "-0.02em" }}>{v}</div>
                <div style={{ fontFamily: FONT_BODY, fontSize: 8, color: "hsl(var(--muted-foreground))", marginTop: 3, letterSpacing: "0.07em", textTransform: "uppercase" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Body grid */}
        <div className="about-body-grid" style={{ display: "grid", gridTemplateColumns: "1.05fr 1fr" }}>

          {/* Bio column */}
          <div style={{ padding: "20px 22px", borderRight: "1px solid hsl(var(--border))" }}>
            <p style={{ fontFamily: FONT_BODY, fontSize: 9, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "hsl(var(--muted-foreground))", marginBottom: 12 }}>
              Bio
            </p>

            {/* Inline highlighted prose — no em dashes */}
            <p style={{ fontFamily: FONT_BODY, fontSize: 13, lineHeight: 2.1, color: "hsl(var(--muted-foreground))", marginBottom: 12 }}>
              I work primarily in{" "}
              <span style={{ color: "#6366f1", fontWeight: 600, background: "rgba(99,102,241,0.08)", padding: "1px 6px", borderRadius: 4, border: "0.5px solid rgba(99,102,241,0.2)" }}>product design</span>,{" "}
              <span style={{ color: "#6366f1", fontWeight: 600, background: "rgba(99,102,241,0.08)", padding: "1px 6px", borderRadius: 4, border: "0.5px solid rgba(99,102,241,0.2)" }}>user research</span>, and{" "}
              <span style={{ color: "#6366f1", fontWeight: 600, background: "rgba(99,102,241,0.08)", padding: "1px 6px", borderRadius: 4, border: "0.5px solid rgba(99,102,241,0.2)" }}>design systems</span>,{" "}
              with growing depth in{" "}
              <span style={{ color: "#a855f7", fontWeight: 600, background: "rgba(168,85,247,0.08)", padding: "1px 6px", borderRadius: 4, border: "0.5px solid rgba(168,85,247,0.2)" }}>AI-assisted workflows</span>.{" "}
              I use{" "}
              <span style={{ color: "#0ea5e9", fontWeight: 500, background: "rgba(14,165,233,0.08)", padding: "1px 6px", borderRadius: 4, border: "0.5px solid rgba(14,165,233,0.2)" }}>Figma</span>,{" "}
              <span style={{ color: "#0ea5e9", fontWeight: 500, background: "rgba(14,165,233,0.08)", padding: "1px 6px", borderRadius: 4, border: "0.5px solid rgba(14,165,233,0.2)" }}>Midjourney</span>, and{" "}
              <span style={{ color: "#0ea5e9", fontWeight: 500, background: "rgba(14,165,233,0.08)", padding: "1px 6px", borderRadius: 4, border: "0.5px solid rgba(14,165,233,0.2)" }}>Claude</span>{" "}
              daily because they compress the gap between thinking and shipped.
            </p>

            <p style={{ fontFamily: FONT_BODY, fontSize: 11.5, fontStyle: "italic", color: "hsl(var(--muted-foreground))", opacity: 0.65, marginBottom: 16, lineHeight: 1.65 }}>
              "Design starts in conversations, not Figma."
            </p>

            {/* Social links — clearly navigation, not skill badges */}
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 6,
                    fontFamily: FONT_BODY, fontSize: 11, fontWeight: 500,
                    color: "hsl(var(--foreground))",
                    textDecoration: "none",
                    padding: "5px 12px",
                    borderRadius: 7,
                    border: "1px solid hsl(var(--border))",
                    background: "hsl(var(--background))",
                    transition: "border-color 0.2s, color 0.2s, background 0.2s",
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.borderColor = s.hoverColor;
                    el.style.color = s.hoverColor;
                    el.style.background = `${s.hoverColor}0d`;
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.borderColor = "hsl(var(--border))";
                    el.style.color = "hsl(var(--foreground))";
                    el.style.background = "hsl(var(--background))";
                  }}
                >
                  <s.icon size={11} style={{ flexShrink: 0 }} />
                  {s.label}
                  <span style={{ fontSize: 9, opacity: 0.4 }}>↗</span>
                </a>
              ))}
            </div>
          </div>

          {/* Skills column — outcomes anchored */}
          <div style={{ padding: "20px 22px", display: "flex", flexDirection: "column" }}>
            <p style={{ fontFamily: FONT_BODY, fontSize: 9, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "hsl(var(--muted-foreground))", marginBottom: 12 }}>
              Skills
            </p>

            <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
              {coreSkills.map((skill, i) => (
                <div
                  key={skill.label}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr auto",
                    alignItems: "start",
                    gap: 10,
                    padding: "9px 0",
                    borderBottom: i < coreSkills.length - 1 ? "0.5px solid hsl(var(--border))" : "none",
                  }}
                >
                  <div>
                    <div style={{ fontFamily: FONT_BODY, fontSize: 12, fontWeight: 600, color: "hsl(var(--foreground))", marginBottom: 3, lineHeight: 1.3 }}>
                      {skill.label}
                    </div>
                    <div style={{ fontFamily: FONT_BODY, fontSize: 10.5, color: "hsl(var(--muted-foreground))", lineHeight: 1.55 }}>
                      {skill.evidence}
                    </div>
                  </div>
                  <span style={{
                    fontFamily: FONT_BODY, fontSize: 9, fontWeight: 600,
                    padding: "2px 8px", borderRadius: 20,
                    background: skill.levelBg,
                    color: skill.levelColor,
                    border: `0.5px solid ${skill.levelBorder}`,
                    whiteSpace: "nowrap",
                    marginTop: 2,
                    flexShrink: 0,
                  }}>
                    {skill.level}
                  </span>
                </div>
              ))}
            </div>

            {/* Tool tags — neutral, visually distinct from skill badges */}
            <div style={{ borderTop: "0.5px solid hsl(var(--border))", paddingTop: 10, marginTop: 8, display: "flex", flexWrap: "wrap", gap: 5 }}>
              {toolTags.map((tool) => (
                <span key={tool} style={{ fontFamily: FONT_BODY, fontSize: 10, fontWeight: 400, padding: "2px 8px", borderRadius: 5, background: "hsl(var(--muted))", color: "hsl(var(--muted-foreground))", border: "0.5px solid hsl(var(--border))" }}>
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Photo strip — cards with rounded corners + gap, no labels, coming soon state */}
        <div style={{ borderTop: "1px solid hsl(var(--border))", overflow: "hidden", position: "relative", padding: "12px 0" }}>
          {/* Fade edges */}
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 40, zIndex: 2, background: "linear-gradient(to right, hsl(var(--card)) 0%, transparent 100%)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 40, zIndex: 2, background: "linear-gradient(to left, hsl(var(--card)) 0%, transparent 100%)", pointerEvents: "none" }} />

          <div
            className="about-photo-track"
            style={{ display: "flex", gap: 8, animation: "aboutPhotoScroll 50s linear infinite", width: "max-content", paddingLeft: 16 }}
          >
            {allPhotos.map((photo, i) => (
              <div
                key={i}
                style={{
                  width: 130,
                  height: 110,
                  flexShrink: 0,
                  borderRadius: 10,
                  overflow: "hidden",
                  border: "0.5px solid hsl(var(--border))",
                  background: "hsl(var(--muted))",
                  position: "relative",
                }}
              >
                {/* Real image */}
                <img
                  src={photo.src}
                  alt=""
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }}
                  onError={e => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                />
                {/* Coming soon overlay — shows when image src is missing or fails */}
                <div
                  className="photo-placeholder"
                  style={{
                    position: "absolute", inset: 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexDirection: "column", gap: 6,
                    background: `hsl(var(--muted))`,
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" opacity="0.3">
                    <rect x="1" y="4" width="18" height="13" rx="2" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5"/>
                    <circle cx="10" cy="10.5" r="3" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5"/>
                    <path d="M6 4V3a1 1 0 011-1h6a1 1 0 011 1v1" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5"/>
                  </svg>
                  <span style={{ fontFamily: FONT_BODY, fontSize: 9, color: "hsl(var(--muted-foreground))", opacity: 0.5, letterSpacing: "0.06em" }}>
                    Coming soon
                  </span>
                </div>
              </div>
            ))}
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
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 20, flexWrap: "wrap", gap: 8 }}>
          <div>
            <p style={{ fontFamily: FONT_BODY, fontSize: 11, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "hsl(var(--muted-foreground))", marginBottom: 8 }}>
              Experience
            </p>
            <h3 style={{ margin: 0, lineHeight: 1.15 }}>
              <span style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(18px,2.5vw,28px)", fontWeight: 700, color: "hsl(var(--foreground))", letterSpacing: "-0.03em" }}>Where I've </span>
              <span style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(18px,2.5vw,28px)", fontWeight: 700, color: "#6366f1",               letterSpacing: "-0.03em" }}>worked</span>
            </h3>
          </div>
          <span style={{ fontFamily: FONT_BODY, fontSize: 12, color: "hsl(var(--muted-foreground))" }}>
            4 roles · 2 years
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {experiences.map((exp, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                onClick={() => toggle(i)}
                style={{
                  borderRadius: 14, overflow: "hidden",
                  background: "hsl(var(--card))",
                  border: `1.5px solid ${isOpen ? "rgba(99,102,241,0.35)" : "hsl(var(--border))"}`,
                  cursor: "pointer",
                  transition: "border-color 0.25s, box-shadow 0.25s",
                  boxShadow: isOpen ? "0 0 0 3px rgba(99,102,241,0.08)" : "none",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", gap: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
                    <div style={{
                      width: 8, height: 8, borderRadius: "50%", flexShrink: 0,
                      background: isOpen ? "#6366f1" : exp.current ? "#22c55e" : "hsl(var(--border))",
                      boxShadow: isOpen ? "0 0 0 3px rgba(99,102,241,0.2)" : exp.current ? "0 0 0 3px rgba(34,197,94,0.2)" : "none",
                      transition: "all 0.25s",
                    }} />
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontFamily: FONT_BODY, fontSize: 14, fontWeight: 600, lineHeight: 1.4, color: isOpen ? "#818cf8" : "hsl(var(--foreground))", transition: "color 0.2s" }}>
                        {exp.company}
                      </div>
                      <div style={{ fontFamily: FONT_BODY, fontSize: 12, lineHeight: 1.5, color: "#818cf8", marginTop: 2 }}>
                        {exp.role}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                    <span style={{
                      fontFamily: FONT_BODY, fontSize: 11,
                      fontWeight: exp.current ? 600 : 400,
                      color: exp.current ? "#818cf8" : "hsl(var(--muted-foreground))",
                      padding: "3px 10px", borderRadius: 100,
                      background: exp.current ? "rgba(99,102,241,0.1)" : "transparent",
                      border: exp.current ? "1px solid rgba(99,102,241,0.2)" : "none",
                      display: "inline",
                    }}
                      className="exp-duration"
                    >
                      {exp.duration}
                    </span>
                    <span style={{ fontSize: 10, color: "hsl(var(--muted-foreground))", display: "inline-block", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s", flexShrink: 0 }}>
                      ▼
                    </span>
                  </div>
                </div>
                <div style={{ maxHeight: isOpen ? 400 : 0, overflow: "hidden", transition: "max-height 0.4s cubic-bezier(0.16,1,0.3,1)" }}>
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
        @keyframes aboutPulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.3; }
        }
        @keyframes aboutPhotoScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .about-photo-track:hover { animation-play-state: paused; }

        /* Hide coming-soon when real image loads */
        .about-photo-track img + .photo-placeholder { display: none; }
        .about-photo-track img[style*="display: none"] + .photo-placeholder { display: flex; }

        @media (max-width: 768px) {
          .about-id-strip               { grid-template-columns: auto 1fr !important; gap: 12px !important; padding: 14px 16px !important; }
          .about-stats                  { display: none !important; }
          .about-body-grid              { grid-template-columns: 1fr !important; }
          .about-body-grid > div:first-child {
            border-right: none !important;
            border-bottom: 1px solid hsl(var(--border));
          }
          .exp-duration                 { display: none !important; }
        }
      `}</style>
    </section>
  );
};

export default About;
