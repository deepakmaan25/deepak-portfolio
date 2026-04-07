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

     {/* ── Identity card — equal columns layout ── */}
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
  <div
    style={{
      position: "absolute",
      top: -30,
      right: -30,
      width: 130,
      height: 130,
      borderRadius: "50%",
      background: "radial-gradient(circle, rgba(165,180,252,0.28), transparent 70%)",
      pointerEvents: "none",
    }}
  />
  <div
    style={{
      position: "absolute",
      bottom: -30,
      left: -20,
      width: 100,
      height: 100,
      borderRadius: "50%",
      background: "radial-gradient(circle, rgba(99,102,241,0.18), transparent 70%)",
      pointerEvents: "none",
    }}
  />
  <div
    style={{
      position: "absolute",
      bottom: -8,
      right: 12,
      fontFamily: FONT_DISPLAY,
      fontSize: 68,
      fontWeight: 800,
      color: "rgba(255,255,255,0.04)",
      lineHeight: 1,
      pointerEvents: "none",
      userSelect: "none",
      letterSpacing: "-0.04em",
    }}
  >
    DM
  </div>

  {/* desktop */}
  <div
    className="id-desktop"
    style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      alignItems: "stretch",
      gap: 12,
      padding: 24,
      minHeight: 280,
      height: "100%",
      position: "relative",
      zIndex: 2,
    }}
  >
    {/* left column */}
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minWidth: 0,
        height: "100%",
      }}
    >
      <div>
        <p
          style={{
            fontFamily: FONT_BODY,
            fontSize: 9,
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.3)",
            marginBottom: 10,
          }}
        >
          About
        </p>

        <div style={{ lineHeight: 1.08, marginBottom: 8 }}>
          <span
            style={{
              fontFamily: FONT_DISPLAY,
              fontSize: "clamp(20px, 2vw, 28px)",
              fontWeight: 700,
              color: "#fff",
              letterSpacing: "-0.03em",
              display: "block",
            }}
          >
            Deepak
          </span>
          <span
            style={{
              fontFamily: FONT_DISPLAY,
              fontSize: "clamp(20px, 2vw, 28px)",
              fontWeight: 700,
              color: "#a5b4fc",
              display: "block",
              letterSpacing: "-0.03em",
            }}
          >
            Maan.
          </span>
        </div>

        <p
          style={{
            fontFamily: FONT_BODY,
            fontSize: 11,
            lineHeight: 1.5,
            color: "rgba(255,255,255,0.42)",
            marginBottom: 16,
          }}
        >
          Product Designer · India · Open to remote
        </p>

        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {cardSocials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
                fontFamily: FONT_BODY,
                fontSize: 10,
                fontWeight: 500,
                color: "rgba(255,255,255,0.68)",
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.12)",
                padding: "5px 10px",
                borderRadius: 999,
                textDecoration: "none",
                whiteSpace: "nowrap",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = "rgba(255,255,255,0.16)";
                el.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = "rgba(255,255,255,0.08)";
                el.style.color = "rgba(255,255,255,0.68)";
              }}
            >
              <s.icon size={9} style={{ flexShrink: 0 }} />
              {s.label} ↗
            </a>
          ))}
        </div>
      </div>

      <p
        style={{
          fontFamily: FONT_BODY,
          fontSize: 11,
          fontStyle: "italic",
          color: "rgba(255,255,255,0.28)",
          lineHeight: 1.65,
          margin: 0,
        }}
      >
        "Design starts in conversations, not Figma."
      </p>
    </div>

    {/* right column */}
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
        }}
      >
        <div
          style={{
            width: "clamp(86px, 10vw, 112px)",
            height: "clamp(104px, 12vw, 136px)",
            borderRadius: 12,
            overflow: "hidden",
            border: "1.5px solid rgba(165,180,252,0.24)",
            background: "rgba(255,255,255,0.04)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.18)",
            flexShrink: 0,
          }}
        >
          <img
            src="/deepak.png"
            alt="Deepak Maan"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "top center",
              display: "block",
              filter: "brightness(0.94) saturate(0.9)",
            }}
            onError={(e) => {
              (e.currentTarget.parentElement as HTMLDivElement).style.display = "none";
            }}
          />
        </div>

        <span
          style={{
            fontFamily: FONT_BODY,
            fontSize: 10,
            color: "rgba(255,255,255,0.3)",
            lineHeight: 1.4,
            textAlign: "center",
          }}
        >
          Product Designer
        </span>
      </div>
    </div>
  </div>

  {/* mobile */}
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
    <div style={{ width: "100%" }}>
      <p
        style={{
          fontFamily: FONT_BODY,
          fontSize: 9,
          fontWeight: 600,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.3)",
          marginBottom: 8,
        }}
      >
        About
      </p>

      <div style={{ lineHeight: 1.08, marginBottom: 6 }}>
        <span
          style={{
            fontFamily: FONT_DISPLAY,
            fontSize: 22,
            fontWeight: 700,
            color: "#fff",
            letterSpacing: "-0.03em",
            display: "block",
          }}
        >
          Deepak
        </span>
        <span
          style={{
            fontFamily: FONT_DISPLAY,
            fontSize: 22,
            fontWeight: 700,
            color: "#a5b4fc",
            letterSpacing: "-0.03em",
            display: "block",
          }}
        >
          Maan.
        </span>
      </div>

      <p
        style={{
          fontFamily: FONT_BODY,
          fontSize: 11,
          color: "rgba(255,255,255,0.42)",
          lineHeight: 1.5,
        }}
      >
        Product Designer · India · Open to remote
      </p>
    </div>

    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
      }}
    >
      <div
        style={{
          width: 98,
          height: 118,
          borderRadius: 12,
          overflow: "hidden",
          border: "1.5px solid rgba(165,180,252,0.24)",
          background: "rgba(255,255,255,0.04)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.18)",
        }}
      >
        <img
          src="/deepak.png"
          alt="Deepak Maan"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "top center",
            display: "block",
            filter: "brightness(0.94) saturate(0.9)",
          }}
          onError={(e) => {
            (e.currentTarget.parentElement as HTMLDivElement).style.display = "none";
          }}
        />
      </div>

      <span
        style={{
          fontFamily: FONT_BODY,
          fontSize: 10,
          color: "rgba(255,255,255,0.3)",
          lineHeight: 1.4,
          textAlign: "center",
        }}
      >
        Product Designer
      </span>
    </div>

    <div
      style={{
        display: "flex",
        gap: 6,
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {cardSocials.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            fontFamily: FONT_BODY,
            fontSize: 10,
            fontWeight: 500,
            color: "rgba(255,255,255,0.68)",
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.12)",
            padding: "5px 10px",
            borderRadius: 999,
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}
        >
          <s.icon size={9} style={{ flexShrink: 0 }} />
          {s.label} ↗
        </a>
      ))}
    </div>

    <p
      style={{
        fontFamily: FONT_BODY,
        fontSize: 11,
        fontStyle: "italic",
        color: "rgba(255,255,255,0.26)",
        lineHeight: 1.65,
        margin: 0,
        textAlign: "center",
      }}
    >
      "Design starts in conversations, not Figma."
    </p>
  </div>
</div>
