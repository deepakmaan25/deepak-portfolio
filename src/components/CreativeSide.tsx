import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const F = "'Aileron', sans-serif";
const FD = "'Unbounded', sans-serif";

// ─────────────────────────────────────────────────────────────────────────────
// ADD YOUR ARTWORK HERE
// Each entry needs:
//   src      → path to image in /public/ e.g. "/art/poster-01.jpg"
//   title    → artwork title
//   category → tag shown on the card e.g. "Poster Design" | "Photo Manipulation" | "Illustration"
//   year     → optional year string
// ─────────────────────────────────────────────────────────────────────────────
const artworks = [
  { src: "/visual/art-virat.png",       title: "Virat",        category: "Photo Manipulation", year: "2024" },
  { src: "/visual/art-sidhu.png",       title: "Sidhu",        category: "Illustration", year: "2024" },
  { src: "/visual/art-samurai.png",     title: "Samurai",      category: "Illustration",       year: "2024" },
  { src: "/visual/art-15aug.png",       title: "15 August",    category: "Poster Design",      year: "2024" },
  { src: "/visual/art-dancer.png",      title: "Dancer",       category: "Illustration",       year: "2024" },
  { src: "/visual/art-mothers-day.jpg", title: "Mother's Day", category: "Illustration",      year: "2024" },
  { src: "/visual/art-no1-team.jpg",    title: "No. 1 Team",   category: "Photo Manipulation",      year: "2024" },
  { src: "/visual/art-rs45.png",        title: "RS 45",        category: "Poster Design",      year: "2024" },
  { src: "/visual/art-icw.png",         title: "ICW",          category: "Poster Design",      year: "2024" },
];

// Duplicate for seamless loop
const allArtworks = [...artworks, ...artworks];

const CARD_W = 260;
const CARD_H = 340;
const GAP = 14;
const totalWidth = artworks.length * (CARD_W + GAP);

// Category → accent color mapping
const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  "Poster Design":       { bg: "rgba(99,102,241,0.10)",  text: "#818cf8", border: "rgba(99,102,241,0.20)" },
  "Photo Manipulation":  { bg: "rgba(236,72,153,0.10)",  text: "#f472b6", border: "rgba(236,72,153,0.20)" },
  "Illustration":        { bg: "rgba(34,211,238,0.10)",  text: "#22d3ee", border: "rgba(34,211,238,0.20)" },
};

const fallbackColor = { bg: "rgba(99,102,241,0.10)", text: "#818cf8", border: "rgba(99,102,241,0.20)" };

const CreativeSide = () => {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });

  return (
    <section
      id="creative"
      style={{
        background: "hsl(var(--background))",
        borderTop: "1px solid hsl(var(--border))",
        padding: "clamp(48px,6vw,80px) 0",
        overflow: "hidden",
      }}
    >
      {/* ── Header ── */}
      <motion.div
        ref={headerRef}
        initial={{ opacity: 0, y: 16 }}
        animate={headerInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          paddingLeft: "clamp(20px,5vw,32px)",
          paddingRight: "clamp(20px,5vw,32px)",
          marginBottom: 36,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <div>
          <p
            style={{
              fontFamily: F,
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "hsl(var(--muted-foreground))",
              margin: "0 0 12px",
            }}
          >
            Creative Side
          </p>
          <h2 style={{ margin: 0, lineHeight: 1.15 }}>
            <span
              style={{
                fontFamily: FD,
                fontSize: "clamp(22px, 3.5vw, 36px)",
                fontWeight: 700,
                color: "hsl(var(--foreground))",
                letterSpacing: "-0.03em",
              }}
            >
              Beyond UX —{" "}
            </span>
            <span
              style={{
                fontFamily: FD,
                fontSize: "clamp(22px, 3.5vw, 36px)",
                fontWeight: 800,
                color: "#6366f1",
                letterSpacing: "-0.03em",
              }}
            >
              Visual Art
            </span>
          </h2>
        </div>

        {/* Behance link */}
        <a
          href="https://www.behance.net/deepakmaan1"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 7,
            fontFamily: F,
            fontSize: 12,
            fontWeight: 600,
            color: "#6366f1",
            textDecoration: "none",
            padding: "9px 18px",
            borderRadius: 100,
            border: "1px solid rgba(99,102,241,0.25)",
            background: "rgba(99,102,241,0.06)",
            transition: "background 0.2s, border-color 0.2s",
            flexShrink: 0,
          }}
          onMouseEnter={e => {
            const el = e.currentTarget as HTMLAnchorElement;
            el.style.background = "rgba(99,102,241,0.12)";
            el.style.borderColor = "rgba(99,102,241,0.45)";
          }}
          onMouseLeave={e => {
            const el = e.currentTarget as HTMLAnchorElement;
            el.style.background = "rgba(99,102,241,0.06)";
            el.style.borderColor = "rgba(99,102,241,0.25)";
          }}
        >
          View on Behance
          <span style={{ fontSize: 11 }}>↗</span>
        </a>
      </motion.div>

      {/* ── Marquee ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={headerInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.15 }}
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          paddingLeft: "clamp(20px,5vw,32px)",
          paddingRight: "clamp(20px,5vw,32px)",
          position: "relative",
        }}
      >
        {/* Fade edges */}
        <div
          style={{
            position: "absolute", left: 0, top: 0, bottom: 0,
            width: "clamp(20px,5vw,32px)", zIndex: 2,
            background: "linear-gradient(to right, hsl(var(--background)) 0%, transparent 100%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute", right: 0, top: 0, bottom: 0,
            width: "clamp(20px,5vw,32px)", zIndex: 2,
            background: "linear-gradient(to left, hsl(var(--background)) 0%, transparent 100%)",
            pointerEvents: "none",
          }}
        />

        <div style={{ overflow: "hidden" }}>
          <div
            className="creative-marquee"
            style={{
              display: "flex",
              gap: GAP,
              width: "max-content",
              animation: `creativeScroll ${artworks.length * 4}s linear infinite`,
            }}
          >
            {allArtworks.map((art, i) => {
              const color = categoryColors[art.category] ?? fallbackColor;
              return (
                <div
                  key={i}
                  style={{
                    width: CARD_W,
                    flexShrink: 0,
                    borderRadius: 16,
                    overflow: "hidden",
                    border: "1px solid hsl(var(--border))",
                    background: "hsl(var(--card))",
                    cursor: "default",
                    transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1), border-color 0.2s, box-shadow 0.35s",
                    position: "relative",
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.transform = "translateY(-6px)";
                    el.style.borderColor = "rgba(99,102,241,0.3)";
                    el.style.boxShadow = "0 16px 40px rgba(0,0,0,0.12)";
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.transform = "translateY(0)";
                    el.style.borderColor = "hsl(var(--border))";
                    el.style.boxShadow = "none";
                  }}
                >
                  {/* Image area */}
                  <div
                    style={{
                      width: "100%",
                      height: CARD_H,
                      background: "hsl(var(--muted))",
                      overflow: "hidden",
                      position: "relative",
                    }}
                  >
                    <img
                      src={art.src}
                      alt={art.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                        transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)",
                      }}
                      onError={e => {
                        // Graceful placeholder when image isn't uploaded yet
                        const img = e.currentTarget as HTMLImageElement;
                        img.style.display = "none";
                        const parent = img.parentElement;
                        if (parent && !parent.querySelector(".art-placeholder")) {
                          const ph = document.createElement("div");
                          ph.className = "art-placeholder";
                          ph.style.cssText = `
                            width:100%;height:100%;display:flex;align-items:center;
                            justify-content:center;flex-direction:column;gap:8px;
                            background:linear-gradient(135deg,hsl(var(--muted)) 0%,hsl(var(--card)) 100%);
                          `;
                          ph.innerHTML = `
                            <span style="font-size:28px;opacity:0.25">🎨</span>
                            <span style="font-family:'Aileron',sans-serif;font-size:10px;color:hsl(var(--muted-foreground));opacity:0.5;letter-spacing:0.08em;text-transform:uppercase">Image coming soon</span>
                          `;
                          parent.appendChild(ph);
                        }
                      }}
                    />
                  </div>

                  {/* Card footer */}
                  <div
                    style={{
                      padding: "14px 16px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 8,
                    }}
                  >
                    <div style={{ minWidth: 0 }}>
                      <p
                        style={{
                          fontFamily: F,
                          fontSize: 13,
                          fontWeight: 600,
                          color: "hsl(var(--foreground))",
                          margin: 0,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {art.title}
                      </p>
                      {art.year && (
                        <p
                          style={{
                            fontFamily: F,
                            fontSize: 11,
                            color: "hsl(var(--muted-foreground))",
                            margin: "2px 0 0",
                          }}
                        >
                          {art.year}
                        </p>
                      )}
                    </div>

                    <span
                      style={{
                        fontFamily: F,
                        fontSize: 9,
                        fontWeight: 600,
                        letterSpacing: "0.07em",
                        textTransform: "uppercase",
                        color: color.text,
                        background: color.bg,
                        border: `1px solid ${color.border}`,
                        padding: "3px 9px",
                        borderRadius: 100,
                        flexShrink: 0,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {art.category}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>

      <style>{`
        @keyframes creativeScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-${totalWidth + GAP}px); }
        }
        .creative-marquee:hover {
          animation-play-state: paused;
        }
        .creative-marquee div img:hover {
          transform: scale(1.04);
        }
      `}</style>
    </section>
  );
};

export default CreativeSide;
