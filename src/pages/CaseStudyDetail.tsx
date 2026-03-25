import { useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { caseStudies, CaseStudySection, ImagePlaceholder } from "@/data/caseStudies";

// ── Inline bold renderer ──────────────────────────────────────────────────────
function BoldText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={i} style={{ fontWeight: 700, color: "hsl(var(--foreground))" }}>
            {part.slice(2, -2)}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

// ── Rich body renderer ────────────────────────────────────────────────────────
function RichBody({ text }: { text: string }) {
  const paragraphs = text.split(/\n\n+/);
  return (
    <div>
      {paragraphs.map((para, pi) => {
        if (para.startsWith("> ")) {
          return (
            <blockquote key={pi} style={{
              borderLeft: "3px solid #6366f1",
              padding: "12px 20px",
              margin: "16px 0",
              color: "hsl(var(--muted-foreground))",
              fontStyle: "italic",
              fontSize: 15,
              lineHeight: 1.7,
              background: "rgba(99,102,241,0.04)",
              borderRadius: "0 8px 8px 0",
            }}>
              {para.slice(2)}
            </blockquote>
          );
        }
        if (para.split("\n").every((l) => l.startsWith("- ") || l.trim() === "")) {
          const items = para.split("\n").filter((l) => l.startsWith("- "));
          return (
            <ul key={pi} style={{ margin: "12px 0", paddingLeft: 20, display: "flex", flexDirection: "column", gap: 8 }}>
              {items.map((item, ii) => (
                <li key={ii} style={{ fontSize: 15, lineHeight: 1.7, color: "hsl(var(--text-body))", listStyle: "disc" }}>
                  <BoldText text={item.slice(2)} />
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p key={pi} style={{ fontSize: 16, lineHeight: 1.8, color: "hsl(var(--text-body))", marginBottom: 16 }}>
            <BoldText text={para} />
          </p>
        );
      })}
    </div>
  );
}

// ── Image placeholder ─────────────────────────────────────────────────────────
function ImageSlot({ img, index = 0 }: { img: ImagePlaceholder; index?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [w, h] = (img.aspectRatio ?? "16/9").split("/").map(Number);
  const paddingTop = `${(h / w) * 100}%`;

  return (
    <motion.figure
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      style={{ margin: "32px 0", width: "100%" }}
    >
      <div style={{ position: "relative", width: "100%", paddingTop, background: "hsl(var(--muted))", border: "2px dashed hsl(var(--border))", borderRadius: 16, overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, color: "hsl(var(--muted-foreground))" }}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="8" fill="currentColor" opacity="0.1" />
            <path d="M6 22l7-7 4 4 3-3 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
            <circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
          </svg>
          <p style={{ fontSize: 13, fontWeight: 600 }}>Image {img.id}</p>
          <p style={{ fontSize: 11, opacity: 0.7 }}>Upload your design screenshot here</p>
        </div>
      </div>
      <figcaption style={{ marginTop: 12, fontSize: 12, color: "hsl(var(--muted-foreground))", textAlign: "center", fontStyle: "italic", lineHeight: 1.5 }}>
        {img.caption}
      </figcaption>
    </motion.figure>
  );
}

// ── Fade wrapper ──────────────────────────────────────────────────────────────
function Fade({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </motion.div>
  );
}

// ── Stat grid ─────────────────────────────────────────────────────────────────
function StatGrid({ stats, cols }: { stats: { value: string; label: string }[]; cols?: number }) {
  const c = cols ?? Math.min(stats.length, 4);
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${c}, 1fr)`, gap: 1, background: "hsl(var(--border))", border: "1px solid hsl(var(--border))", borderRadius: 16, overflow: "hidden", margin: "32px 0" }}>
      {stats.map((s, i) => (
        <div key={i} style={{ background: "hsl(var(--card))", padding: "28px 24px" }}>
          <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(28px,4vw,44px)", fontStyle: "italic", color: "#6366f1", lineHeight: 1, marginBottom: 8 }}>{s.value}</div>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "hsl(var(--muted-foreground))" }}>{s.label}</div>
        </div>
      ))}
    </div>
  );
}

// ── Quote cards ───────────────────────────────────────────────────────────────
function Quotes({ quotes }: { quotes: string[] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, margin: "32px 0" }}>
      {quotes.map((q, i) => (
        <blockquote key={i} style={{ position: "relative", padding: "24px 24px 24px 52px", background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12, fontSize: 15, lineHeight: 1.75, color: "hsl(var(--foreground))", fontStyle: "italic" }}>
          <span style={{ position: "absolute", left: 20, top: 16, fontFamily: "'DM Serif Display', serif", fontSize: 48, color: "hsl(var(--quote-mark))", lineHeight: 1, fontStyle: "normal", userSelect: "none" }}>"</span>
          {q}
        </blockquote>
      ))}
    </div>
  );
}

// ── Pillars ───────────────────────────────────────────────────────────────────
function Pillars({ pillars }: { pillars: { icon: string; title: string; desc: string }[] }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, margin: "32px 0" }}>
      {pillars.map((p, i) => (
        <div key={i} style={{ padding: 24, background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12 }}>
          <span style={{ fontSize: 24, display: "block", marginBottom: 12 }}>{p.icon}</span>
          <h4 style={{ fontSize: 14, fontWeight: 700, color: "hsl(var(--foreground))", marginBottom: 8, lineHeight: 1.4 }}>{p.title}</h4>
          <p style={{ fontSize: 13, lineHeight: 1.65, color: "hsl(var(--muted-foreground))" }}>{p.desc}</p>
        </div>
      ))}
    </div>
  );
}

// ── Process steps ─────────────────────────────────────────────────────────────
function Steps({ steps }: { steps: { week: string; title: string; items: string[] }[] }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16, margin: "32px 0" }}>
      {steps.map((step, i) => (
        <div key={i} style={{ padding: 24, border: "1px solid hsl(var(--border))", borderRadius: 12, background: "hsl(var(--card))" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#6366f1", background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)", padding: "4px 10px", borderRadius: 100 }}>{step.week}</span>
            <h4 style={{ fontSize: 15, fontWeight: 600, color: "hsl(var(--foreground))" }}>{step.title}</h4>
          </div>
          <ul style={{ display: "flex", flexDirection: "column", gap: 8, paddingLeft: 16 }}>
            {step.items.map((item, ii) => (
              <li key={ii} style={{ fontSize: 13, lineHeight: 1.6, color: "hsl(var(--text-body))", listStyle: "disc" }}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

// ── Learnings ─────────────────────────────────────────────────────────────────
function Learnings({ learnings }: { learnings: { title: string; body: string }[] }) {
  return (
    <div style={{ display: "grid", gap: 16, margin: "32px 0" }}>
      {learnings.map((l, i) => (
        <div key={i} style={{ padding: "24px 28px", background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12, position: "relative" }}>
          <span style={{ position: "absolute", top: 12, right: 20, fontFamily: "'DM Serif Display', serif", fontSize: 40, fontStyle: "italic", color: "rgba(99,102,241,0.15)", lineHeight: 1, userSelect: "none" }}>0{i + 1}</span>
          <h4 style={{ fontSize: 15, fontWeight: 700, color: "hsl(var(--foreground))", marginBottom: 10, paddingRight: 40, lineHeight: 1.4 }}>{l.title}</h4>
          <p style={{ fontSize: 14, lineHeight: 1.7, color: "hsl(var(--text-body))" }}>{l.body}</p>
        </div>
      ))}
    </div>
  );
}

// ── Future list ───────────────────────────────────────────────────────────────
function FutureList({ items }: { items: string[] }) {
  return (
    <div style={{ marginTop: 40, padding: "28px 32px", background: "hsl(var(--muted))", borderRadius: 16, border: "1px solid hsl(var(--border))" }}>
      <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "hsl(var(--muted-foreground))", marginBottom: 16 }}>If I had more time</p>
      <ul style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {items.map((item, i) => (
          <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, fontSize: 14, lineHeight: 1.65, color: "hsl(var(--text-body))", listStyle: "none" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#6366f1", flexShrink: 0, marginTop: 9, display: "block" }} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ── Section block ─────────────────────────────────────────────────────────────
function SectionBlock({ section }: { section: CaseStudySection }) {
  const labels: Record<CaseStudySection["type"], string> = {
    overview: "Overview",
    insight: "Research & Insights",
    solution: "Design Solution",
    process: "Design Process",
    impact: "Impact & Results",
    reflection: "Reflection",
  };

  const isWide = section.type === "overview" || section.type === "impact";

  return (
    <article style={{ padding: "clamp(56px,8vw,96px) 0", borderBottom: "1px solid hsl(var(--border))" }}>
      <div style={{ maxWidth: isWide ? "100%" : 760 }}>
        <Fade>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#6366f1", marginBottom: 12 }}>{labels[section.type]}</p>
          <div style={{ marginBottom: 28 }}>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(24px,3.5vw,40px)", fontWeight: 400, lineHeight: 1.15, color: "hsl(var(--foreground))", marginBottom: 8 }}>{section.heading}</h2>
            {section.subheading && <p style={{ fontSize: 16, color: "hsl(var(--muted-foreground))", fontStyle: "italic", fontFamily: "'DM Serif Display', serif" }}>{section.subheading}</p>}
          </div>
        </Fade>

        {/* Stats top (overview only) */}
        {section.stats && section.type === "overview" && (
          <Fade delay={0.05}><StatGrid stats={section.stats} /></Fade>
        )}

        {/* Body */}
        {section.body && (
          <Fade delay={0.08}>
            <div style={{ maxWidth: 760 }}><RichBody text={section.body} /></div>
          </Fade>
        )}

        {/* Pillars */}
        {section.pillars && <Fade delay={0.1}><Pillars pillars={section.pillars} /></Fade>}

        {/* Steps */}
        {section.steps && <Fade delay={0.12}><Steps steps={section.steps} /></Fade>}

        {/* Quotes */}
        {section.quotes && <Fade delay={0.1}><Quotes quotes={section.quotes} /></Fade>}

        {/* Single image */}
        {section.image && <ImageSlot img={section.image} index={0} />}

        {/* Multi images */}
        {section.images && (
          <div style={{ display: "grid", gridTemplateColumns: section.images.length === 2 ? "1fr 1fr" : "1fr", gap: 20, margin: "32px 0" }}>
            {section.images.map((img, i) => (
              <div key={img.id} style={{ margin: 0 }}>
                <ImageSlot img={img} index={i} />
              </div>
            ))}
          </div>
        )}

        {/* Stats bottom (non-overview) */}
        {section.stats && section.type !== "overview" && (
          <Fade delay={0.12}><StatGrid stats={section.stats} /></Fade>
        )}

        {/* Learnings */}
        {section.learnings && <Fade delay={0.1}><Learnings learnings={section.learnings} /></Fade>}

        {/* Future */}
        {section.futureItems && <Fade delay={0.14}><FutureList items={section.futureItems} /></Fade>}
      </div>
    </article>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function CaseStudyDetail() {
  const { slug } = useParams<{ slug: string }>();
  const cs = caseStudies.find((c) => c.slug === slug);

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  if (!cs) {
    return (
      <div style={{ padding: "120px 40px", textAlign: "center", display: "flex", flexDirection: "column", gap: 16, alignItems: "center" }}>
        <p>Case study not found.</p>
        <Link to="/">← Back home</Link>
      </div>
    );
  }

  const currentIndex = caseStudies.findIndex((c) => c.slug === slug);
  const nextCs = caseStudies[(currentIndex + 1) % caseStudies.length];

  const px = "clamp(20px, 5vw, 80px)";

  return (
    <div style={{ minHeight: "100vh", background: "hsl(var(--background))", color: "hsl(var(--foreground))" }}>

      {/* ── Sticky nav ── */}
      <nav style={{ position: "sticky", top: 0, zIndex: 50, backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", background: "hsl(var(--background) / 0.88)", borderBottom: "1px solid hsl(var(--border))", padding: `0 ${px}` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link to="/#work" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 600, color: "hsl(var(--muted-foreground))", textDecoration: "none" }}
            onMouseEnter={e => (e.currentTarget.style.color = "hsl(var(--foreground))")}
            onMouseLeave={e => (e.currentTarget.style.color = "hsl(var(--muted-foreground))")}>
            <span style={{ width: 28, height: 28, borderRadius: "50%", border: "1.5px solid hsl(var(--border))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12 }}>←</span>
            All Work
          </Link>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "hsl(var(--muted-foreground))" }}>{cs.tag}</span>
        </div>
      </nav>

      {/* ── Hero ── */}
      <motion.header
        style={{ padding: `clamp(60px,10vw,120px) ${px} clamp(48px,8vw,80px)`, maxWidth: 1200, margin: "0 auto" }}
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      >
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#6366f1", marginBottom: 20 }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#6366f1", display: "block" }} />
          {cs.tag}
        </div>

        <h1
          style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(36px,6vw,72px)", fontWeight: 400, lineHeight: 1.08, color: "hsl(var(--foreground))", marginBottom: 20, maxWidth: 820 }}
          dangerouslySetInnerHTML={{ __html: cs.title.replace(/—(.+)$/, `— <em style="font-style:italic;color:#6366f1">$1</em>`) }}
        />

        <p style={{ fontSize: "clamp(16px,2vw,20px)", lineHeight: 1.6, color: "hsl(var(--muted-foreground))", maxWidth: 640, marginBottom: 48 }}>{cs.heroTagline}</p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "0", borderTop: "1px solid hsl(var(--border))", paddingTop: 28 }}>
          {[{ label: "Role", value: cs.role }, { label: "Timeline", value: cs.timeline }, { label: "Platform", value: cs.platform }, { label: "Year", value: cs.year }].map((item, i, arr) => (
            <div key={item.label} style={{ paddingRight: 28, marginRight: 28, borderRight: i < arr.length - 1 ? "1px solid hsl(var(--border))" : "none" }}>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "hsl(var(--muted-foreground))", marginBottom: 4 }}>{item.label}</div>
              <div style={{ fontSize: 14, fontWeight: 500, color: "hsl(var(--foreground))" }}>{item.value}</div>
            </div>
          ))}
        </div>
      </motion.header>

      {/* ── Outcome pills ── */}
      <motion.div
        style={{ padding: `20px ${px}`, background: "hsl(var(--muted))", borderTop: "1px solid hsl(var(--border))", borderBottom: "1px solid hsl(var(--border))" }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.3 }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "hsl(var(--muted-foreground))", marginRight: 8, flexShrink: 0 }}>Key outcomes</span>
          {cs.outcomes.map((o, i) => (
            <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 14px", borderRadius: 100, background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)", fontSize: 12, fontWeight: 600, color: "#4f46e5", whiteSpace: "nowrap" }}>
              <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 16, fontStyle: "italic", color: "#6366f1" }}>{o.metric}</span>
              {o.label}
            </span>
          ))}
        </div>
      </motion.div>

      {/* ── Sections ── */}
      <main style={{ maxWidth: 1200, margin: "0 auto", padding: `0 ${px}` }}>
        {cs.sections.map((section, i) => (
          <SectionBlock key={i} section={section} />
        ))}

        {/* Tools */}
        <div style={{ padding: "24px 0", marginTop: 40, borderTop: "1px solid hsl(var(--border))", display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "hsl(var(--muted-foreground))", flexShrink: 0 }}>Tools used</span>
          {(cs.slug === "zu-ai"
            ? ["Figma", "Photoshop", "Google Forms", "Zoom", "Microsoft Fluent 2"]
            : ["Figma", "Google Forms", "Zoom", "Poppins / Euclid Circular B"]
          ).map((t) => (
            <span key={t} style={{ display: "inline-flex", alignItems: "center", padding: "5px 12px", borderRadius: 100, border: "1px solid hsl(var(--border))", background: "hsl(var(--card))", fontSize: 12, fontWeight: 500, color: "hsl(var(--foreground))" }}>{t}</span>
          ))}
        </div>
      </main>

      {/* ── Next project ── */}
      <section style={{ padding: `clamp(60px,10vw,120px) ${px}`, background: "hsl(var(--muted))", borderTop: "1px solid hsl(var(--border))", textAlign: "center" }}>
        <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "hsl(var(--muted-foreground))", marginBottom: 20 }}>Next Project</p>
        <Link
          to={`/case-study/${nextCs.slug}`}
          style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 12, textDecoration: "none", color: "inherit" }}
        >
          <h3
            style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(28px,4vw,48px)", fontWeight: 400, color: "hsl(var(--foreground))", lineHeight: 1.2 }}
            dangerouslySetInnerHTML={{ __html: nextCs.title.replace(/—(.+)$/, `— <em style="font-style:italic;color:#6366f1">$1</em>`) }}
          />
          <span style={{ width: 48, height: 48, borderRadius: "50%", border: "1.5px solid hsl(var(--border))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, color: "hsl(var(--muted-foreground))" }}>→</span>
        </Link>
      </section>
    </div>
  );
}
