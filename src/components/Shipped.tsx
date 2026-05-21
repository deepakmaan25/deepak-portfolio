import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const FONT_BODY = "'Aileron', sans-serif";
const FONT_DISPLAY = "'Unbounded', sans-serif";

// ── Project data ─────────────────────────────────────────────────────────────

interface ShippedProject {
  id: string;
  title: string;
  problem: string;
  description: string;
  tech: string[];
  liveUrl: string;
  stats: { value: string; label: string }[];
  icon: "audio" | "type" | "grid";
}

const projects: ShippedProject[] = [
  {
    id: "music-animation-generator",
    title: "Music Animation Generator",
    problem: "Upload a track, pick a visual engine, get a beat-synced animation ready to post.",
    description:
      "Designed the full system in Figma first - color tokens, component library, light and dark theming. Derived both the marketing site and Studio UI from that single system, then built the upload, analyze, visualize, and export pipeline. Real-time frequency extraction drives multiple WebGL visual engines.",
    tech: ["React", "TypeScript", "Web Audio API", "WebGL", "Supabase"],
    liveUrl: "https://musictoanimate.vercel.app/",
    stats: [
      { value: "47", label: "visitors in 7 days" },
      { value: "IN + US", label: "organic reach" },
    ],
    icon: "audio",
  },
  {
    id: "typematch",
    title: "TypeMatch",
    problem: "Font selection is a decision, not a search. Most tools treat it as a search box.",
    description:
      "Typography recommendation tool built on a scoring system, not a filter. Established the design system foundation first - typography scale, spacing tokens, dark mode, component states. Prioritized accessibility and state honesty: unavailable weights stay discoverable, and loading, failure, and retry each have distinct states.",
    tech: ["React", "TypeScript", "Google Fonts API", "Vercel"],
    liveUrl: "https://typematch-mu.vercel.app/",
    stats: [
      { value: "73%", label: "US audience" },
      { value: "49", label: "visitors, 30 days" },
    ],
    icon: "type",
  },
  {
    id: "design-system-website",
    title: "Kairo Design System",
    problem: "A design system file sitting in Figma cannot prove it actually works. A live site can.",
    description:
      "Built a complete design system from scratch - color tokens, spacing rhythm, elevation, and a component library with variants and states. Then implemented it as an interactive website. Using implementation as a live audit exposed missing states, responsive gaps, and motion edge cases invisible in a static file.",
    tech: ["Figma", "React", "Vercel"],
    liveUrl: "https://grid-dizzy-54533031.figma.site/",
    stats: [
      { value: "0→1", label: "tokens to live site" },
      { value: "Full", label: "design + build" },
    ],
    icon: "grid",
  },
];

// ── SVG icons ─────────────────────────────────────────────────────────────────

const ProjectIcon = ({ type }: { type: ShippedProject["icon"] }) => {
  if (type === "audio")
    return (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="9" r="3.5" fill="#6366f1" />
        <circle cx="9" cy="9" r="6.5" stroke="#6366f1" strokeWidth="1" fill="none" opacity="0.45" />
        <circle cx="9" cy="9" r="8.5" stroke="#6366f1" strokeWidth="0.5" fill="none" opacity="0.2" />
      </svg>
    );
  if (type === "type")
    return (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="3" y="5" width="5" height="10" rx="1" fill="#6366f1" opacity="0.4" />
        <rect x="10" y="2" width="5" height="13" rx="1" fill="#6366f1" />
      </svg>
    );
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="2" y="2" width="6" height="6" rx="1" fill="#6366f1" />
      <rect x="10" y="2" width="6" height="6" rx="1" fill="#6366f1" opacity="0.5" />
      <rect x="2" y="10" width="6" height="6" rx="1" fill="#6366f1" opacity="0.5" />
      <rect x="10" y="10" width="6" height="6" rx="1" fill="#6366f1" opacity="0.2" />
    </svg>
  );
};

// ── Live pill ─────────────────────────────────────────────────────────────────

const LivePill = () => (
  <span
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 5,
      fontFamily: FONT_BODY,
      fontSize: 10,
      fontWeight: 600,
      padding: "3px 9px",
      borderRadius: 20,
      background: "rgba(99,102,241,0.08)",
      color: "#6366f1",
      border: "1px solid rgba(99,102,241,0.22)",
      flexShrink: 0,
    }}
  >
    <span
      style={{
        width: 5,
        height: 5,
        borderRadius: "50%",
        background: "#6366f1",
        animation: "shipped-pulse 1.8s ease-in-out infinite",
        flexShrink: 0,
      }}
    />
    Live
  </span>
);

// ── Card ──────────────────────────────────────────────────────────────────────

const ShippedCard = ({
  project,
  delay,
}: {
  project: ShippedProject;
  delay: number;
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        borderRadius: 14,
        overflow: "hidden",
        border: `1px solid ${hovered ? "rgba(99,102,241,0.4)" : "hsl(var(--border))"}`,
        background: "hsl(var(--card))",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        transition: "border-color 0.2s, transform 0.25s, box-shadow 0.25s",
        boxShadow: hovered ? "0 8px 32px rgba(99,102,241,0.10)" : "none",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Top accent bar */}
      <div
        style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: 2,
          background: "linear-gradient(90deg, #6366f1, #818cf8)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.2s",
        }}
      />

      {/* Card body */}
      <div style={{ padding: "20px 20px 0", flex: 1, display: "flex", flexDirection: "column" }}>

        {/* Icon + Live pill row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
          <div
            style={{
              width: 36, height: 36, borderRadius: 8,
              background: "rgba(99,102,241,0.1)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <ProjectIcon type={project.icon} />
          </div>
          <LivePill />
        </div>

        {/* Title */}
        <p
          style={{
            fontFamily: FONT_DISPLAY,
            fontSize: 13,
            fontWeight: 700,
            lineHeight: 1.35,
            color: "hsl(var(--foreground))",
            margin: "0 0 10px",
            letterSpacing: "-0.01em",
          }}
        >
          {project.title}
        </p>

        {/* Problem statement - the hook */}
        <div
          style={{
            borderLeft: "2px solid rgba(99,102,241,0.45)",
            paddingLeft: 10,
            marginBottom: 12,
          }}
        >
          <p
            style={{
              fontFamily: FONT_BODY,
              fontSize: 12,
              lineHeight: 1.65,
              color: "#818cf8",
              margin: 0,
              fontStyle: "italic",
            }}
          >
            {project.problem}
          </p>
        </div>

        {/* Description - clipped */}
        <p
          style={{
            fontFamily: FONT_BODY,
            fontSize: 12,
            lineHeight: 1.65,
            color: "hsl(var(--muted-foreground))",
            margin: "0 0 14px",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            flex: 1,
          } as React.CSSProperties}
        >
          {project.description}
        </p>

        {/* Stats row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 8,
            marginBottom: 14,
            padding: "12px 14px",
            borderRadius: 10,
            background: "rgba(99,102,241,0.04)",
            border: "1px solid rgba(99,102,241,0.1)",
          }}
        >
          {project.stats.map((stat, i) => (
            <div key={i}>
              <div
                style={{
                  fontFamily: FONT_DISPLAY,
                  fontSize: 15,
                  fontWeight: 700,
                  color: "#6366f1",
                  lineHeight: 1,
                  marginBottom: 3,
                  letterSpacing: "-0.02em",
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: 9,
                  fontWeight: 600,
                  color: "hsl(var(--muted-foreground))",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  lineHeight: 1.3,
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Tech tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 16 }}>
          {project.tech.slice(0, 3).map((t) => (
            <span
              key={t}
              style={{
                fontFamily: FONT_BODY,
                fontSize: 10,
                fontWeight: 400,
                padding: "2px 7px",
                borderRadius: 4,
                background: "hsl(var(--muted))",
                color: "hsl(var(--muted-foreground))",
                border: "1px solid hsl(var(--border))",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Footer CTA - full-width, separated */}
      <a
        href={project.liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
          margin: "0 20px 20px",
          padding: "10px 0",
          borderRadius: 8,
          background: hovered ? "#6366f1" : "rgba(99,102,241,0.07)",
          border: `1px solid ${hovered ? "#6366f1" : "rgba(99,102,241,0.2)"}`,
          color: hovered ? "#fff" : "#6366f1",
          fontFamily: FONT_BODY,
          fontSize: 12,
          fontWeight: 600,
          textDecoration: "none",
          transition: "background 0.2s, border-color 0.2s, color 0.2s",
          flexShrink: 0,
        }}
      >
        View live project
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path
            d="M2 8L8 2M8 2H4M8 2V6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </a>
    </motion.div>
  );
};

// ── Main section ──────────────────────────────────────────────────────────────

const Shipped = () => {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });

  return (
    <>
      <style>{`
        @keyframes shipped-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.25; }
        }
      `}</style>

      <section
        id="shipped"
        className="pt-16 pb-16 max-md:pt-10 max-md:pb-10 px-6 lg:px-8 max-w-site mx-auto"
      >
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10"
        >
          <p
            style={{
              fontFamily: FONT_BODY,
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "hsl(var(--muted-foreground))",
              marginBottom: 12,
            }}
          >
            Built end to end
          </p>
          <h2 style={{ margin: 0, lineHeight: 1.15 }}>
            <span
              style={{
                fontFamily: FONT_BODY,
                fontSize: "clamp(22px, 3.5vw, 36px)",
                fontWeight: 500,
                color: "hsl(var(--foreground))",
                letterSpacing: "-0.01em",
              }}
            >
              Shipped{" "}
            </span>
            <span
              style={{
                fontFamily: FONT_DISPLAY,
                fontSize: "clamp(22px, 3.5vw, 36px)",
                fontWeight: 700,
                color: "#6366f1",
                letterSpacing: "-0.03em",
              }}
            >
              Projects
            </span>
          </h2>
          <p
            style={{
              fontFamily: FONT_BODY,
              fontSize: 14,
              lineHeight: 1.7,
              color: "hsl(var(--muted-foreground))",
              margin: "10px 0 0",
              maxWidth: 480,
            }}
          >
            Designed, built, and deployed end to end. AI as a collaborative partner throughout, from spec to production.
          </p>
        </motion.div>

        {/* Card grid */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 md:grid-cols-3 gap-3"
          style={{ alignItems: "start" }}
        >
          {projects.map((project, i) => (
            <ShippedCard
              key={project.id}
              project={project}
              delay={i * 0.06}
            />
          ))}
        </motion.div>
      </section>
    </>
  );
};

export default Shipped;
