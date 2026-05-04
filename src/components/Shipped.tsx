import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const FONT_BODY = "'Aileron', sans-serif";
const FONT_DISPLAY = "'Unbounded', sans-serif";

// ── Project data ────────────────────────────────────────────────────────────

interface ShippedProject {
  id: string;
  title: string;
  problem: string;
  description: string;
  tech: string[];
  liveUrl: string;
  videoUrl?: string; // drop in a Loom/mp4 URL when ready
  icon: "audio" | "type" | "grid";
}

const projects: ShippedProject[] = [
  {
    id: "music-animation-generator",
    title: "Music Animation Generator",
    problem: "Upload a track, pick a visual engine, get a beat-synced animation ready to post.",
    description:
      "A web tool that turns any uploaded track into customizable motion visuals for social video. Designed the full system in Figma first: color tokens, component library, light and dark theming. Derived both the marketing site and Studio UI from that single system, then built the full upload, analyze, visualize, and export pipeline. Real-time frequency extraction drives multiple WebGL visual engines. Users can switch engines, tweak motion and color parameters, and export in vertical, square, or horizontal formats.",
    tech: ["React", "TypeScript", "Web Audio API", "WebGL", "Supabase"],
    liveUrl: "https://suite-quake-51108117.figma.site/",
  },
  {
    id: "typematch",
    title: "TypeMatch",
    problem: "Font selection is a decision, not a search. Most tools treat it as a search box.",
    description:
      "Typography recommendation tool built on a scoring system, not a filter. Established the design system foundation first: typography scale, spacing tokens, dark mode, component states. Prioritized accessibility and state honesty throughout: unavailable weights stay discoverable, and loading, failure, and retry each have distinct states so the interface never misleads the user.",
    tech: ["React", "TypeScript", "Google Fonts API", "Vercel"],
    liveUrl: "https://typematch-mu.vercel.app/",
  },
  {
    id: "design-system-website",
    title: "Kairo - Design System",
    problem: "Built an live website transforming my Design System into an live website for non-designers to actuallly go through and explore the componenets.",
    description:
      "Built a complete design system from scratch: color tokens, spacing rhythm, elevation, and a component library with variants and states. Then implemented it as an interactive website. Using implementation as a live audit exposed missing states, responsive gaps, and motion edge cases that would have stayed invisible in a static file.",
    tech: ["Figma", "Figma Make"],
    liveUrl: "https://grid-dizzy-54533031.figma.site/",
  },
];

// ── SVG icons ────────────────────────────────────────────────────────────────

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

// ── Live pulse pill ───────────────────────────────────────────────────────────

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

// ── Modal ─────────────────────────────────────────────────────────────────────

const ProjectModal = ({
  project,
  onClose,
}: {
  project: ShippedProject;
  onClose: () => void;
}) => {
  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.5)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          zIndex: 50,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          padding: "0 0 0 0",
        }}
      >
        <motion.div
          key="modal"
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 60, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          style={{
            background: "hsl(var(--background))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "20px 20px 0 0",
            width: "100%",
            maxWidth: 720,
            padding: "32px 32px 40px",
            maxHeight: "90vh",
            overflowY: "auto",
          }}
        >
          {/* Close */}
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              position: "absolute",
              top: 20,
              right: 24,
              width: 32,
              height: 32,
              borderRadius: "50%",
              border: "1px solid hsl(var(--border))",
              background: "hsl(var(--muted))",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "hsl(var(--muted-foreground))",
              fontSize: 16,
            }}
          >
            ×
          </button>

          {/* Header */}
          <div style={{ marginBottom: 24 }}>
            <p
              style={{
                fontFamily: FONT_BODY,
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#6366f1",
                margin: "0 0 8px",
              }}
            >
              Shipped project
            </p>
            <h3
              style={{
                fontFamily: FONT_DISPLAY,
                fontSize: "clamp(18px, 2.5vw, 24px)",
                fontWeight: 700,
                color: "hsl(var(--foreground))",
                letterSpacing: "-0.02em",
                margin: "0 0 12px",
                lineHeight: 1.2,
                paddingRight: 40,
              }}
            >
              {project.title}
            </h3>
            {/* Problem statement */}
            <div
              style={{
                borderLeft: "2px solid #6366f1",
                paddingLeft: 14,
                marginBottom: 0,
              }}
            >
              <p
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: 14,
                  lineHeight: 1.65,
                  color: "hsl(var(--muted-foreground))",
                  margin: 0,
                  fontStyle: "italic",
                }}
              >
                {project.problem}
              </p>
            </div>
          </div>

          {/* Description */}
          <p
            style={{
              fontFamily: FONT_BODY,
              fontSize: 14,
              lineHeight: 1.75,
              color: "hsl(var(--text-body))",
              margin: "0 0 24px",
            }}
          >
            {project.description}
          </p>

          {/* Tech stack + CTA inline row */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
              <p
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "hsl(var(--muted-foreground))",
                  margin: 0,
                }}
              >
                Built with
              </p>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  fontFamily: FONT_BODY,
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#fff",
                  background: "#6366f1",
                  padding: "7px 14px",
                  borderRadius: 7,
                  textDecoration: "none",
                  transition: "background 0.2s, transform 0.15s",
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "#4f46e5";
                  (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "#6366f1";
                  (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
                }}
              >
                Visit live project
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M2 8L8 2M8 2H4M8 2V6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </a>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {project.tech.map((t) => (
                <span
                  key={t}
                  style={{
                    fontFamily: FONT_BODY,
                    fontSize: 11,
                    fontWeight: 500,
                    padding: "4px 10px",
                    borderRadius: 6,
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

          {/* Video slot */}
          <div
            style={{
              borderRadius: 12,
              overflow: "hidden",
              marginBottom: 28,
              border: "1px solid hsl(var(--border))",
              background: "hsl(var(--muted))",
              aspectRatio: "16/9",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: 8,
            }}
          >
            {project.videoUrl ? (
              <video
                src={project.videoUrl}
                controls
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            ) : (
              <>
                {/* Placeholder — replace videoUrl in the project data when ready */}
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" opacity="0.3">
                  <circle cx="18" cy="18" r="17" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" />
                  <polygon points="14,11 28,18 14,25" fill="hsl(var(--muted-foreground))" />
                </svg>
                <p
                  style={{
                    fontFamily: FONT_BODY,
                    fontSize: 12,
                    color: "hsl(var(--muted-foreground))",
                    margin: 0,
                    opacity: 0.5,
                  }}
                >
                  Product walkthrough, coming soon
                </p>
              </>
            )}
          </div>

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// ── Main section ──────────────────────────────────────────────────────────────

const iconTypes: ShippedProject["icon"][] = ["audio", "type", "grid"];

const Shipped = () => {
  const [activeProject, setActiveProject] = useState<ShippedProject | null>(null);
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });

  return (
    <>
      {/* Keyframe for live dot pulse */}
      <style>{`
        @keyframes shipped-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.25; }
        }
      `}</style>

      <section
        id="shipped"
        className="pt-20 pb-20 max-md:pt-14 max-md:pb-14 px-6 lg:px-8 max-w-site mx-auto"
      >
        {/* Section header — mirrors CaseStudies pattern exactly */}
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
        >
          {projects.map((project, i) => (
            <ShippedCard
              key={project.id}
              project={project}
              iconType={iconTypes[i]}
              delay={i * 0.06}
              onClick={() => setActiveProject(project)}
            />
          ))}
        </motion.div>
      </section>

      {/* Modal */}
      {activeProject && (
        <ProjectModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      )}
    </>
  );
};

// ── Card ──────────────────────────────────────────────────────────────────────

const ShippedCard = ({
  project,
  iconType,
  delay,
  onClick,
}: {
  project: ShippedProject;
  iconType: ShippedProject["icon"];
  delay: number;
  onClick: () => void;
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        borderRadius: 12,
        padding: "1.25rem",
        cursor: "pointer",
        overflow: "hidden",
        border: `1px solid ${hovered ? "rgba(99,102,241,0.4)" : "hsl(var(--border))"}`,
        background: "hsl(var(--card))",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        transition: "border-color 0.2s, transform 0.2s, box-shadow 0.2s",
        boxShadow: hovered ? "var(--shadow-card-hover, 0 4px 24px rgba(99,102,241,0.08))" : "none",
      }}
    >
      {/* Indigo top bar — appears on hover */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: "#6366f1",
          borderRadius: "1px",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.2s",
        }}
      />

      {/* Icon */}
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 8,
          background: "rgba(99,102,241,0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "0.875rem",
        }}
      >
        <ProjectIcon type={iconType} />
      </div>

      {/* Title */}
      <p
        style={{
          fontFamily: FONT_DISPLAY,
          fontSize: 12,
          fontWeight: 600,
          lineHeight: 1.4,
          color: "hsl(var(--foreground))",
          margin: "0 0 0.5rem",
        }}
      >
        {project.title}
      </p>

      {/* Description */}
      <p
        style={{
          fontFamily: FONT_BODY,
          fontSize: 12,
          lineHeight: 1.6,
          color: "hsl(var(--muted-foreground))",
          margin: "0 0 1rem",
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        } as React.CSSProperties}
      >
        {project.description}
      </p>

      {/* Tech tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: "1rem" }}>
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

      {/* Footer row */}
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <LivePill />
        <span style={{ flex: 1 }} />
        <span
          style={{
            fontFamily: FONT_BODY,
            fontSize: 11,
            fontWeight: 600,
            color: "#6366f1",
          }}
        >
          View
        </span>
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M2 8L8 2M8 2H4M8 2V6" stroke="#6366f1" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </div>
    </motion.div>
  );
};

export default Shipped;
