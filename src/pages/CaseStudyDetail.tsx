import { useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { caseStudies } from "@/data/caseStudies";

const F = "'Aileron', sans-serif";
const FD = "'Unbounded', sans-serif";

function BoldText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={i} style={{ fontWeight: 700, color: "hsl(var(--foreground))" }}>{part.slice(2, -2)}</strong>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

function RichBody({ text }: { text: string }) {
  const paragraphs = text.split(/\n\n+/);
  return (
    <div>
      {paragraphs.map((para, pi) => {
        if (para.startsWith("> ")) {
          return (
            <blockquote key={pi} style={{ borderLeft: "3px solid #6366f1", padding: "14px 20px", margin: "20px 0", color: "hsl(var(--muted-foreground))", fontStyle: "italic", fontFamily: F, fontSize: 15, lineHeight: 1.8, background: "rgba(99,102,241,0.05)", borderRadius: "0 10px 10px 0" }}>
              {para.slice(2)}
            </blockquote>
          );
        }
        if (para.split("\n").every((l) => l.startsWith("- ") || l.trim() === "")) {
          const items = para.split("\n").filter((l) => l.startsWith("- "));
          return (
            <ul key={pi} style={{ margin: "16px 0", paddingLeft: 0, display: "flex", flexDirection: "column", gap: 10, listStyle: "none" }}>
              {items.map((item, ii) => (
                <li key={ii} style={{ fontFamily: F, fontSize: 15, lineHeight: 1.8, color: "hsl(var(--text-body))", display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#6366f1", flexShrink: 0, marginTop: 9, display: "block" }} />
                  <BoldText text={item.slice(2)} />
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p key={pi} style={{ fontFamily: F, fontSize: 16, lineHeight: 1.85, color: "hsl(var(--text-body))", marginBottom: 18 }}>
            <BoldText text={para} />
          </p>
        );
      })}
    </div>
  );
}

function ImageSlot({ caption, index = 0, src, ratio = 52 }: { caption?: string; index?: number; src?: string; ratio?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.figure ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      style={{ margin: "32px 0", width: "100%" }}
    >
      <div style={{ position: "relative", width: "100%", paddingTop: `${ratio}%`, background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 20, overflow: "hidden" }}>
        {src ? (
          <img
            src={src}
            alt={caption ?? "Case study image"}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", borderRadius: 20 }}
          />
        ) : (
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16 }}>
            <div style={{ position: "absolute", inset: 0, opacity: 0.04, backgroundImage: "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
            <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
              <div style={{ width: 56, height: 56, borderRadius: 16, background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(99,102,241,0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
                </svg>
              </div>
              <div style={{ textAlign: "center" }}>
                <p style={{ fontFamily: FD, fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(99,102,241,0.5)", marginBottom: 4 }}>Figma Screenshot</p>
                <p style={{ fontFamily: F, fontSize: 12, color: "hsl(var(--muted-foreground))", opacity: 0.5 }}>Coming soon</p>
              </div>
            </div>
          </div>
        )}
      </div>
      {caption && (
        <figcaption style={{ marginTop: 10, fontFamily: F, fontSize: 12, color: "hsl(var(--muted-foreground))", textAlign: "center", fontStyle: "italic", lineHeight: 1.5, opacity: 0.7 }}>
          {caption}
        </figcaption>
      )}
    </motion.figure>
  );
}

function Fade({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </motion.div>
  );
}

// ── StatGrid — last item spans full width when count is odd ──────────────────
function StatGrid({ stats }: { stats: { value: string; label: string }[] }) {
  const isOdd = stats.length % 2 !== 0;
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: 0,
      border: "1px solid hsl(var(--border))",
      borderRadius: 20,
      overflow: "hidden",
      margin: "32px 0",
    }}>
      {stats.map((s, i) => {
        const isLastAndAlone = isOdd && i === stats.length - 1;
        return (
          <div key={i} style={{
            background: "hsl(var(--card))",
            padding: "28px 28px",
            gridColumn: isLastAndAlone ? "1 / -1" : undefined,
            borderRight: !isLastAndAlone && i % 2 === 0 ? "1px solid hsl(var(--border))" : "none",
            borderBottom: i < stats.length - (isOdd ? 1 : 2) ? "1px solid hsl(var(--border))" : "none",
            position: "relative",
            overflow: "hidden",
          }}>
            {/* Subtle watermark */}
            <div style={{ position: "absolute", bottom: -8, right: 12, fontFamily: FD, fontSize: 64, fontWeight: 800, color: "rgba(99,102,241,0.04)", lineHeight: 1, userSelect: "none", pointerEvents: "none" }}>
              {s.value.replace(/[^0-9%x+×]/gi, "") || s.value.slice(0, 2)}
            </div>
            <div style={{ fontFamily: FD, fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 300, color: "#6366f1", lineHeight: 1, marginBottom: 10, letterSpacing: "-0.03em" }}>{s.value}</div>
            <div style={{ fontFamily: F, fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "hsl(var(--muted-foreground))" }}>{s.label}</div>
          </div>
        );
      })}
    </div>
  );
}

function Quotes({ quotes }: { quotes: { text: string }[] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, margin: "32px 0" }}>
      {quotes.map((q, i) => (
        <blockquote key={i} style={{
          position: "relative", padding: "22px 24px 22px 56px",
          background: "hsl(var(--card))", border: "1px solid hsl(var(--border))",
          borderLeft: "3px solid rgba(99,102,241,0.5)", borderRadius: "0 16px 16px 0",
          fontFamily: F, fontSize: 15, lineHeight: 1.8, color: "hsl(var(--foreground))", fontStyle: "italic",
        }}>
          <span style={{ position: "absolute", left: 16, top: 12, fontFamily: FD, fontSize: 32, fontWeight: 800, color: "rgba(99,102,241,0.2)", lineHeight: 1, fontStyle: "normal", userSelect: "none" }}>"</span>
          {q.text}
        </blockquote>
      ))}
    </div>
  );
}

function Pillars({ pillars }: { pillars: { icon: string; title: string; description: string }[] }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12, margin: "32px 0" }}>
      {pillars.map((p, i) => (
        <div key={i}
          style={{ padding: "24px 22px", background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 18, transition: "border-color 0.2s, transform 0.25s", cursor: "default", position: "relative", overflow: "hidden" }}
          onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = "rgba(99,102,241,0.35)"; el.style.transform = "translateY(-3px)"; }}
          onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = "hsl(var(--border))"; el.style.transform = "translateY(0)"; }}
        >
          <div style={{ position: "absolute", top: 10, right: 14, fontFamily: FD, fontSize: 28, fontWeight: 800, color: "rgba(99,102,241,0.06)", lineHeight: 1, userSelect: "none" }}>0{i + 1}</div>
          <span style={{ fontSize: 24, display: "block", marginBottom: 14 }}>{p.icon}</span>
          <h4 style={{ fontFamily: FD, fontSize: 13, fontWeight: 700, color: "hsl(var(--foreground))", marginBottom: 8, lineHeight: 1.3, letterSpacing: "-0.01em" }}>{p.title}</h4>
          <p style={{ fontFamily: F, fontSize: 13, lineHeight: 1.7, color: "hsl(var(--muted-foreground))" }}>{p.description}</p>
        </div>
      ))}
    </div>
  );
}

function Steps({ steps }: { steps: { week: string; label: string; items: string[] }[] }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 12, margin: "32px 0" }}>
      {steps.map((step, i) => (
        <div key={i} style={{ padding: "24px 22px", border: "1px solid hsl(var(--border))", borderRadius: 18, background: "hsl(var(--card))", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, #6366f1, #818cf8)" }} />
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <span style={{ fontFamily: F, fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#6366f1", background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)", padding: "3px 10px", borderRadius: 100, flexShrink: 0 }}>{step.week}</span>
            <h4 style={{ fontFamily: FD, fontSize: 12, fontWeight: 700, color: "hsl(var(--foreground))", lineHeight: 1.3, letterSpacing: "-0.01em" }}>{step.label}</h4>
          </div>
          <ul style={{ display: "flex", flexDirection: "column", gap: 8, paddingLeft: 0, listStyle: "none" }}>
            {step.items.map((item, ii) => (
              <li key={ii} style={{ fontFamily: F, fontSize: 13, lineHeight: 1.65, color: "hsl(var(--text-body))", display: "flex", gap: 8, alignItems: "flex-start" }}>
                <span style={{ width: 4, height: 4, borderRadius: "50%", background: "rgba(99,102,241,0.5)", flexShrink: 0, marginTop: 8 }} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function Learnings({ learnings }: { learnings: { title: string; description: string }[] }) {
  return (
    <div style={{ display: "grid", gap: 10, margin: "32px 0" }}>
      {learnings.map((l, i) => (
        <div key={i}
          style={{ padding: "24px 28px", background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 18, borderLeft: "3px solid rgba(99,102,241,0.4)", position: "relative", overflow: "hidden", transition: "border-left-color 0.2s" }}
          onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.borderLeftColor = "#6366f1"}
          onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.borderLeftColor = "rgba(99,102,241,0.4)"}
        >
          <span style={{ position: "absolute", top: 16, right: 20, fontFamily: FD, fontSize: 28, fontWeight: 800, color: "rgba(99,102,241,0.08)", lineHeight: 1, userSelect: "none" }}>0{i + 1}</span>
          <h4 style={{ fontFamily: FD, fontSize: 13, fontWeight: 700, color: "hsl(var(--foreground))", marginBottom: 8, paddingRight: 48, lineHeight: 1.4, letterSpacing: "-0.01em" }}>{l.title}</h4>
          <p style={{ fontFamily: F, fontSize: 14, lineHeight: 1.8, color: "hsl(var(--muted-foreground))" }}>{l.description}</p>
        </div>
      ))}
    </div>
  );
}

function FutureList({ items }: { items: string[] }) {
  return (
    <div style={{ marginTop: 32, padding: "28px 32px", background: "hsl(var(--card))", borderRadius: 20, border: "1px solid hsl(var(--border))", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, #6366f1, #818cf8)" }} />
      <p style={{ fontFamily: F, fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#6366f1", marginBottom: 16 }}>If I had more time</p>
      <ul style={{ display: "flex", flexDirection: "column", gap: 10, listStyle: "none", padding: 0 }}>
        {items.map((item, i) => (
          <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, fontFamily: F, fontSize: 14, lineHeight: 1.75, color: "hsl(var(--text-body))" }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#6366f1", flexShrink: 0, marginTop: 9 }} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

const sectionLabel = {
  overview: "Overview",
  research: "Research & Insights",
  process: "Design Process",
  solution: "Design Solution",
  impact: "Impact & Results",
  reflection: "Reflection",
  parallel: "Parallel Work",
};

function Section({ type, heading, subheading, children }: {
  type: keyof typeof sectionLabel;
  heading: string;
  subheading?: string;
  children: React.ReactNode;
}) {
  return (
    <article style={{ padding: "clamp(48px,7vw,80px) 0", borderBottom: "1px solid hsl(var(--border))" }}>
      <Fade>
        <p style={{ fontFamily: F, fontSize: 11, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "#6366f1", marginBottom: 10 }}>
          {sectionLabel[type]}
        </p>
        <div style={{ marginBottom: 28 }}>
          <h2 style={{ margin: "0 0 8px", lineHeight: 1.15 }}>
            <span style={{ fontFamily: FD, fontSize: "clamp(20px, 3vw, 32px)", fontWeight: 700, color: "hsl(var(--foreground))", letterSpacing: "-0.02em" }}>{heading}</span>
          </h2>
          {subheading && (
            <p style={{ fontFamily: F, fontSize: 16, color: "hsl(var(--muted-foreground))", fontStyle: "italic", lineHeight: 1.6 }}>{subheading}</p>
          )}
        </div>
      </Fade>
      {children}
    </article>
  );
}

export default function CaseStudyDetail() {
  const { slug } = useParams<{ slug: string }>();
  const cs = caseStudies.find((c) => c.slug === slug);

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  if (!cs) {
    return (
      <div style={{ paddingTop: 120, textAlign: "center", display: "flex", flexDirection: "column", gap: 16, alignItems: "center" }}>
        <p style={{ fontFamily: F, color: "hsl(var(--muted-foreground))" }}>Case study not found.</p>
        <Link to="/" style={{ fontFamily: F, color: "#6366f1", fontWeight: 600, textDecoration: "none" }}>← Back home</Link>
      </div>
    );
  }

  const currentIndex = caseStudies.findIndex((c) => c.slug === slug);
  const nextCs = caseStudies[(currentIndex + 1) % caseStudies.length];

  const innerStyle = {
    maxWidth: 1200,
    margin: "0 auto",
    paddingLeft: "clamp(20px, 5vw, 80px)",
    paddingRight: "clamp(20px, 5vw, 80px)",
  };

  return (
    <div style={{ minHeight: "100vh", background: "hsl(var(--background))", paddingTop: 64 }}>

      {/* Breadcrumb */}
      <div style={{ position: "sticky", top: 64, zIndex: 40, backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", background: "hsl(var(--background) / 0.9)", borderBottom: "1px solid hsl(var(--border))" }}>
        <div style={{ ...innerStyle, height: 44, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link to="/#work" style={{ fontFamily: F, display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 500, color: "hsl(var(--muted-foreground))", textDecoration: "none", transition: "color 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#6366f1")}
            onMouseLeave={e => (e.currentTarget.style.color = "hsl(var(--muted-foreground))")}>
            ← All Work
          </Link>
          <span style={{ fontFamily: F, fontSize: 10, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "hsl(var(--muted-foreground))" }}>{cs.tag}</span>
        </div>
      </div>

      {/* Hero */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
        <div style={{ ...innerStyle, paddingTop: "clamp(32px,5vw,80px)", paddingBottom: "clamp(24px,4vw,52px)" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: F, fontSize: 10, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#6366f1", marginBottom: 20 }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#6366f1", display: "block" }} />
            {cs.tag}
          </div>
          <h1 style={{ margin: "0 0 20px", lineHeight: 1.05 }}>
            <span style={{ fontFamily: FD, fontSize: "clamp(26px, 5vw, 58px)", fontWeight: 700, color: "hsl(var(--foreground))", letterSpacing: "-0.02em" }}>{cs.title} — </span>
            <span style={{ fontFamily: FD, fontSize: "clamp(26px, 5vw, 58px)", fontWeight: 800, color: "#6366f1", letterSpacing: "-0.02em" }}>{cs.subtitle}</span>
          </h1>
          <p style={{ fontFamily: F, fontSize: "clamp(15px, 1.8vw, 18px)", lineHeight: 1.7, color: "hsl(var(--muted-foreground))", maxWidth: 640, marginBottom: 44, fontWeight: 400 }}>{cs.tagline}</p>

          {/* Meta — 4 col on desktop, 2×2 on mobile */}
          <div className="cs-meta-row" style={{ borderTop: "1px solid hsl(var(--border))", paddingTop: 28, display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
            {[
              { label: "Role", value: cs.role },
              { label: "Timeline", value: cs.timeline },
              { label: "Platform", value: cs.platform },
              { label: "Year", value: cs.year },
            ].map((item, i) => (
              <div key={item.label} style={{ paddingRight: 24, borderRight: i < 3 ? "1px solid hsl(var(--border))" : "none", paddingLeft: i > 0 ? 24 : 0 }}>
                <div style={{ fontFamily: F, fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "hsl(var(--muted-foreground))", marginBottom: 6 }}>{item.label}</div>
                <div style={{ fontFamily: FD, fontSize: 13, fontWeight: 700, color: "hsl(var(--foreground))", lineHeight: 1.3, letterSpacing: "-0.01em" }}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Outcome pills */}
      <motion.div style={{ borderTop: "1px solid hsl(var(--border))", borderBottom: "1px solid hsl(var(--border))", background: "hsl(var(--card))" }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.25 }}>
        <div style={{ ...innerStyle, paddingTop: 16, paddingBottom: 16, display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <span style={{ fontFamily: F, fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "hsl(var(--muted-foreground))", marginRight: 6, flexShrink: 0 }}>Key outcomes</span>
          {cs.outcomes.map((o, i) => (
            <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "5px 14px", borderRadius: 100, background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.2)", fontFamily: F, fontSize: 12, fontWeight: 500, color: "#818cf8", whiteSpace: "nowrap" }}>
              <span style={{ fontFamily: FD, fontSize: 12, fontWeight: 800, color: "#6366f1" }}>{o.value}</span>
              {o.label}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Sections */}
      <div style={innerStyle}>

        <Section type="overview" heading="The Problem">
          <Fade delay={0.05}><StatGrid stats={cs.stats ?? []} /></Fade>
          {cs.overview?.problem && <Fade delay={0.08}><RichBody text={cs.overview.problem} /></Fade>}
          {cs.overview?.description && <Fade delay={0.1}><RichBody text={cs.overview.description} /></Fade>}
          {cs.overview?.contribution && <Fade delay={0.12}><RichBody text={cs.overview.contribution} /></Fade>}
          <ImageSlot caption="Project overview" index={0} />
        </Section>

        <Section type="research" heading={cs.research?.heading ?? "Research & Insights"}>
          {cs.research?.body && <Fade delay={0.08}><RichBody text={cs.research.body} /></Fade>}
          {cs.research?.quotes?.length > 0 && <Fade delay={0.1}><Quotes quotes={cs.research.quotes} /></Fade>}
          <ImageSlot caption="Research findings and pain point map" index={0} />
        </Section>

        <Section type="process" heading={cs.process?.heading ?? "Design Process"} subheading={cs.process?.intro ? cs.process.intro.split("\n\n")[0] : undefined}>
          {cs.process?.intro && <Fade delay={0.08}><RichBody text={cs.process.intro} /></Fade>}
          {cs.process?.pillars?.length > 0 && <Fade delay={0.1}><Pillars pillars={cs.process.pillars} /></Fade>}
          {cs.process?.steps?.length > 0 && <Fade delay={0.12}><Steps steps={cs.process.steps} /></Fade>}
          <ImageSlot caption="Wireframe to high-fidelity progression" index={0} />
        </Section>

        {(cs.solutions ?? []).map((sol, i) => (
          <Section key={i} type="solution" heading={sol.title ?? `Solution ${i + 1}`} subheading={sol.subtitle}>
            {sol.problem && (
              <Fade delay={0.06}>
                <p style={{ fontFamily: F, fontSize: 15, lineHeight: 1.8, color: "hsl(var(--muted-foreground))", fontStyle: "italic", marginBottom: 24, paddingLeft: 18, borderLeft: "2px solid rgba(99,102,241,0.3)" }}>{sol.problem}</p>
              </Fade>
            )}
            <Fade delay={0.08}>
              {(sol.body ?? []).map((para, pi) => <RichBody key={pi} text={para} />)}
            </Fade>
            {sol.metrics?.length > 0 && <Fade delay={0.1}><StatGrid stats={sol.metrics} /></Fade>}
            <ImageSlot caption={`${sol.title ?? "Solution"} — design solution`} index={i} />
          </Section>
        ))}

        <Section type="impact" heading={cs.impact?.heading ?? "Impact & Results"}>
          {cs.impact?.body && <Fade delay={0.08}><RichBody text={cs.impact.body} /></Fade>}
          {cs.impact?.metrics?.length > 0 && <Fade delay={0.1}><StatGrid stats={cs.impact.metrics} /></Fade>}
          {cs.impact?.quotes?.length > 0 && <Fade delay={0.12}><Quotes quotes={cs.impact.quotes} /></Fade>}
          <ImageSlot caption="Impact metrics and results" index={0} />
        </Section>

        <Section type="reflection" heading={cs.reflection?.heading ?? "Reflection"}>
          {cs.reflection?.body && <Fade delay={0.08}><RichBody text={cs.reflection.body} /></Fade>}
          {cs.reflection?.learnings?.length > 0 && <Fade delay={0.1}><Learnings learnings={cs.reflection.learnings} /></Fade>}
          {cs.reflection?.futureList?.length > 0 && <Fade delay={0.12}><FutureList items={cs.reflection.futureList} /></Fade>}
        </Section>

        {/* Tools */}
        <div style={{ padding: "24px 0", borderTop: "1px solid hsl(var(--border))", display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <span style={{ fontFamily: F, fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "hsl(var(--muted-foreground))", flexShrink: 0 }}>Tools used</span>
          {cs.reflection.tools.map((t) => (
            <span key={t} style={{ fontFamily: F, display: "inline-flex", padding: "4px 14px", borderRadius: 100, border: "1px solid hsl(var(--border))", background: "hsl(var(--card))", fontSize: 12, fontWeight: 400, color: "hsl(var(--muted-foreground))" }}>{t}</span>
          ))}
        </div>
      </div>

      {/* Next project */}
      <section style={{ background: "hsl(var(--card))", borderTop: "1px solid hsl(var(--border))", textAlign: "center" }}>
        <div style={{ ...innerStyle, paddingTop: "clamp(56px,8vw,96px)", paddingBottom: "clamp(56px,8vw,96px)" }}>
          <p style={{ fontFamily: F, fontSize: 10, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "hsl(var(--muted-foreground))", marginBottom: 16 }}>Next Project</p>
          <Link to={`/case-study/${nextCs.slug}`} style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 20, textDecoration: "none", color: "inherit" }}>
            <h3 style={{ margin: 0, lineHeight: 1.1 }}>
              <span style={{ fontFamily: FD, fontSize: "clamp(22px, 4vw, 44px)", fontWeight: 700, color: "hsl(var(--foreground))", letterSpacing: "-0.02em" }}>{nextCs.title} — </span>
              <span style={{ fontFamily: FD, fontSize: "clamp(22px, 4vw, 44px)", fontWeight: 800, color: "#6366f1", letterSpacing: "-0.02em" }}>{nextCs.subtitle}</span>
            </h3>
            <span style={{ width: 44, height: 44, borderRadius: "50%", border: "1.5px solid hsl(var(--border))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, color: "hsl(var(--muted-foreground))", transition: "all 0.2s" }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLSpanElement; el.style.background = "#6366f1"; el.style.color = "#fff"; el.style.borderColor = "#6366f1"; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLSpanElement; el.style.background = "transparent"; el.style.color = "hsl(var(--muted-foreground))"; el.style.borderColor = "hsl(var(--border))"; }}>
              →
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
