import { useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { caseStudies, CaseStudySection, ImagePlaceholder } from "@/data/caseStudies";

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

function RichBody({ text }: { text: string }) {
  const paragraphs = text.split(/\n\n+/);
  return (
    <div>
      {paragraphs.map((para, pi) => {
        if (para.startsWith("> ")) {
          return (
            <blockquote key={pi} style={{
              borderLeft: "3px solid #6366f1",
              padding: "14px 20px",
              margin: "20px 0",
              color: "hsl(var(--muted-foreground))",
              fontStyle: "italic",
              fontSize: 15,
              lineHeight: 1.75,
              background: "rgba(99,102,241,0.06)",
              borderRadius: "0 10px 10px 0",
            }}>
              {para.slice(2)}
            </blockquote>
          );
        }
        if (para.split("\n").every((l) => l.startsWith("- ") || l.trim() === "")) {
          const items = para.split("\n").filter((l) => l.startsWith("- "));
          return (
            <ul key={pi} style={{ margin: "16px 0", paddingLeft: 0, display: "flex", flexDirection: "column", gap: 10, listStyle: "none" }}>
              {items.map((item, ii) => (
                <li key={ii} style={{ fontSize: 15, lineHeight: 1.75, color: "hsl(var(--text-body))", display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#6366f1", flexShrink: 0, marginTop: 9, display: "block" }} />
                  <BoldText text={item.slice(2)} />
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p key={pi} style={{ fontSize: 16, lineHeight: 1.85, color: "hsl(var(--text-body))", marginBottom: 18 }}>
            <BoldText text={para} />
          </p>
        );
      })}
    </div>
  );
}

function ImageSlot({ img, index = 0 }: { img: ImagePlaceholder; index?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [w, h] = (img.aspectRatio ?? "16/9").split("/").map(Number);
  const paddingTop = `${(h / w) * 100}%`;

  return (
    <motion.figure
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      style={{ margin: "28px 0", width: "100%" }}
    >
      <div style={{
        position: "relative", width: "100%", paddingTop,
        background: "hsl(var(--muted))",
        border: "1px solid hsl(var(--border))",
        borderRadius: 16, overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(99,102,241,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(99,102,241,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
          <p style={{ fontSize: 12, fontWeight: 600, color: "hsl(var(--muted-foreground))", opacity: 0.6 }}>Design screenshot</p>
        </div>
      </div>
      {img.caption && (
        <figcaption style={{ marginTop: 10, fontSize: 12, color: "hsl(var(--muted-foreground))", textAlign: "center", fontStyle: "italic", lineHeight: 1.5, opacity: 0.8 }}>
          {img.caption}
        </figcaption>
      )}
    </motion.figure>
  );
}

function Fade({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </motion.div>
  );
}

function StatGrid({ stats, cols }: { stats: { value: string; label: string }[]; cols?: number }) {
  const c = cols ?? Math.min(stats.length, 4);
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: `repeat(${c}, 1fr)`,
      gap: 0,
      border: "1px solid hsl(var(--border))",
      borderRadius: 16,
      overflow: "hidden",
      margin: "28px 0",
    }}>
      {stats.map((s, i) => (
        <div key={i} style={{
          background: "hsl(var(--card))",
          padding: "28px 24px",
          borderRight: i < stats.length - 1 ? "1px solid hsl(var(--border))" : "none",
        }}>
          <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(28px,4vw,44px)", fontStyle: "italic", color: "#6366f1", lineHeight: 1, marginBottom: 8 }}>{s.value}</div>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "hsl(var(--muted-foreground))" }}>{s.label}</div>
        </div>
      ))}
    </div>
  );
}

function Quotes({ quotes }: { quotes: string[] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, margin: "28px 0" }}>
      {quotes.map((q, i) => (
        <blockquote key={i} style={{
          position: "relative",
          padding: "20px 24px 20px 52px",
          background: "hsl(var(--card))",
          border: "1px solid hsl(var(--border))",
          borderLeft: "3px solid rgba(99,102,241,0.4)",
          borderRadius: "0 12px 12px 0",
          fontSize: 15, lineHeight: 1.75,
          color: "hsl(var(--foreground))",
          fontStyle: "italic",
        }}>
          <span style={{ position: "absolute", left: 16, top: 10, fontFamily: "'DM Serif Display', serif", fontSize: 40, color: "rgba(99,102,241,0.25)", lineHeight: 1, fontStyle: "normal", userSelect: "none" }}>"</span>
          {q}
        </blockquote>
      ))}
    </div>
  );
}

function Pillars({ pillars }: { pillars: { icon: string; title: string; desc: string }[] }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12, margin: "28px 0" }}>
      {pillars.map((p, i) => (
        <div key={i} style={{
          padding: "22px 20px",
          background: "hsl(var(--card))",
          border: "1px solid hsl(var(--border))",
          borderRadius: 14,
          transition: "border-color 0.2s, transform 0.2s",
        }}
          onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(99,102,241,0.3)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "hsl(var(--border))"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; }}
        >
          <span style={{ fontSize: 24, display: "block", marginBottom: 12 }}>{p.icon}</span>
          <h4 style={{ fontSize: 14, fontWeight: 700, color: "hsl(var(--foreground))", marginBottom: 8, lineHeight: 1.4 }}>{p.title}</h4>
          <p style={{ fontSize: 13, lineHeight: 1.65, color: "hsl(var(--muted-foreground))" }}>{p.desc}</p>
        </div>
      ))}
    </div>
  );
}

function Steps({ steps }: { steps: { week: string; title: string; items: string[] }[] }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 12, margin: "28px 0" }}>
      {steps.map((step, i) => (
        <div key={i} style={{ padding: "22px 20px", border: "1px solid hsl(var(--border))", borderRadius: 14, background: "hsl(var(--card))" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#6366f1", background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)", padding: "3px 10px", borderRadius: 100, flexShrink: 0 }}>{step.week}</span>
            <h4 style={{ fontSize: 14, fontWeight: 600, color: "hsl(var(--foreground))", lineHeight: 1.3 }}>{step.title}</h4>
          </div>
          <ul style={{ display: "flex", flexDirection: "column", gap: 8, paddingLeft: 0, listStyle: "none" }}>
            {step.items.map((item, ii) => (
              <li key={ii} style={{ fontSize: 13, lineHeight: 1.6, color: "hsl(var(--text-body))", display: "flex", gap: 8, alignItems: "flex-start" }}>
                <span style={{ width: 4, height: 4, borderRadius: "50%", background: "rgba(99,102,241,0.4)", flexShrink: 0, marginTop: 8 }} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function Learnings({ learnings }: { learnings: { title: string; body: string }[] }) {
  return (
    <div style={{ display: "grid", gap: 12, margin: "28px 0" }}>
      {learnings.map((l, i) => (
        <div key={i} style={{
          padding: "22px 24px",
          background: "hsl(var(--card))",
          border: "1px solid hsl(var(--border))",
          borderRadius: 14,
          position: "relative",
          borderLeft: "3px solid rgba(99,102,241,0.3)",
        }}>
          <span style={{ position: "absolute", top: 14, right: 20, fontFamily: "'DM Serif Display', serif", fontSize: 36, fontStyle: "italic", color: "rgba(99,102,241,0.12)", lineHeight: 1, userSelect: "none" }}>0{i + 1}</span>
          <h4 style={{ fontSize: 15, fontWeight: 700, color: "hsl(var(--foreground))", marginBottom: 8, paddingRight: 40, lineHeight: 1.4 }}>{l.title}</h4>
          <p style={{ fontSize: 14, lineHeight: 1.75, color: "hsl(var(--muted-foreground))" }}>{l.body}</p>
        </div>
      ))}
    </div>
  );
}

function FutureList({ items }: { items: string[] }) {
  return (
    <div style={{ marginTop: 32, padding: "24px 28px", background: "hsl(var(--card))", borderRadius: 16, border: "1px solid hsl(var(--border))" }}>
      <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#6366f1", marginBottom: 16 }}>If I had more time</p>
      <ul style={{ display: "flex", flexDirection: "column", gap: 10, listStyle: "none", padding: 0 }}>
        {items.map((item, i) => (
          <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, fontSize: 14, lineHeight: 1.7, color: "hsl(var(--text-body))" }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#6366f1", flexShrink: 0, marginTop: 9 }} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

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
    <article style={{ padding: "clamp(48px,7vw,80px) 0", borderBottom: "1px solid hsl(var(--border))" }}>
      <div style={{ maxWidth: isWide ? "100%" : 720 }}>
        <Fade>
          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#6366f1", marginBottom: 10 }}>{labels[section.type]}</p>
          <div style={{ marginBottom: 24 }}>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(24px,3.5vw,38px)", fontWeight: 400, lineHeight: 1.15, color: "hsl(var(--foreground))", marginBottom: 8 }}>{section.heading}</h2>
            {section.subheading && (
              <p style={{ fontSize: 16, color: "hsl(var(--muted-foreground))", fontStyle: "italic", fontFamily: "'DM Serif Display', serif", lineHeight: 1.5 }}>{section.subheading}</p>
            )}
          </div>
        </Fade>

        {section.stats && section.type === "overview" && (
          <Fade delay={0.05}><StatGrid stats={section.stats} /></Fade>
        )}

        {section.body && (
          <Fade delay={0.08}>
            <div style={{ maxWidth: 720 }}><RichBody text={section.body} /></div>
          </Fade>
        )}

        {section.pillars && <Fade delay={0.1}><Pillars pillars={section.pillars} /></Fade>}
        {section.steps && <Fade delay={0.12}><Steps steps={section.steps} /></Fade>}
        {section.quotes && <Fade delay={0.1}><Quotes quotes={section.quotes} /></Fade>}

        {section.image && <ImageSlot img={section.image} index={0} />}

        {section.images && (
          <div style={{ display: "grid", gridTemplateColumns: section.images.length === 2 ? "1fr 1fr" : "1fr", gap: 16, margin: "28px 0" }}>
            {section.images.map((img, i) => (
              <div key={img.id} style={{ margin: 0 }}>
                <ImageSlot img={img} index={i} />
              </div>
            ))}
          </div>
        )}

        {section.stats && section.type !== "overview" && (
          <Fade delay={0.12}><StatGrid stats={section.stats} /></Fade>
        )}

        {section.learnings && <Fade delay={0.1}><Learnings learnings={section.learnings} /></Fade>}
        {section.futureItems && <Fade delay={0.14}><FutureList items={section.futureItems} /></Fade>}
      </div>
    </article>
  );
}

export default function CaseStudyDetail() {
  const { slug } = useParams<{ slug: string }>();
  const cs = caseStudies.find((c) => c.slug === slug);

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  if (!cs) {
    return (
      <div style={{ padding: "120px 40px", textAlign: "center", display: "flex", flexDirection: "column", gap: 16, alignItems: "center" }}>
        <p style={{ color: "hsl(var(--muted-foreground))" }}>Case study not found.</p>
        <Link to="/" style={{ color: "#6366f1", textDecoration: "none", fontWeight: 600 }}>← Back home</Link>
      </div>
    );
  }

  const currentIndex = caseStudies.findIndex((c) => c.slug === slug);
  const nextCs = caseStudies[(currentIndex + 1) % caseStudies.length];
  const px = "clamp(16px, 5vw, 80px)";

  return (
    <div style={{ minHeight: "100vh", background: "hsl(var(--background))", color: "hsl(var(--foreground))" }}>

{/* Breadcrumb bar — sits below main nav, not a replacement */}
<div style={{
  position: "sticky", top: 64, zIndex: 40,
  backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
  background: "hsl(var(--background) / 0.95)",
  borderBottom: "1px solid hsl(var(--border))",
  padding: `0 ${px}`,
}}>
  <div style={{ maxWidth: 1200, margin: "0 auto", height: 44, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
    <Link
      to="/#work"
      style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600, color: "hsl(var(--muted-foreground))", textDecoration: "none", transition: "color 0.2s" }}
      onMouseEnter={e => (e.currentTarget.style.color = "#6366f1")}
      onMouseLeave={e => (e.currentTarget.style.color = "hsl(var(--muted-foreground))")}
    >
      <span style={{ fontSize: 11 }}>←</span>
      All Work
    </Link>
    <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "hsl(var(--muted-foreground))" }}>{cs.tag}</span>
  </div>
</div>

      {/* Hero */}
      <motion.header
          style={{ padding: `clamp(56px,9vw,100px) ${px} clamp(40px,6vw,64px)`, maxWidth: "min(1200px, 100%)", margin: "0 auto" }}
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Tag */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#6366f1", marginBottom: 18 }}>
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#6366f1" }} />
          {cs.tag}
        </div>

        {/* Title */}
        <h1
          style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(32px,5.5vw,68px)", fontWeight: 400, lineHeight: 1.1, color: "hsl(var(--foreground))", marginBottom: 18, maxWidth: 800 }}
          dangerouslySetInnerHTML={{ __html: cs.title.replace(/—(.+)$/, `— <em style="font-style:italic;color:#6366f1">$1</em>`) }}
        />

        {/* Tagline */}
        <p style={{ fontSize: "clamp(15px,1.8vw,18px)", lineHeight: 1.65, color: "hsl(var(--muted-foreground))", maxWidth: 600, marginBottom: 40 }}>
          {cs.heroTagline}
        </p>

        {/* Meta row */}
        <div className="flex flex-wrap gap-y-4" style={{ borderTop: "1px solid hsl(var(--border))", paddingTop: 24 }}>
          {[
            { label: "Role", value: cs.role },
            { label: "Timeline", value: cs.timeline },
            { label: "Platform", value: cs.platform },
            { label: "Year", value: cs.year },
          ].map((item, i, arr) => (
             <div key={item.label} className="flex-shrink-0" style={{
      paddingRight: "clamp(16px, 3vw, 28px)",
      marginRight: "clamp(16px, 3vw, 28px)",
      borderRight: i < arr.length - 1 ? "1px solid hsl(var(--border))" : "none",
      paddingTop: 4, paddingBottom: 4,
    }}>
               <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "hsl(var(--muted-foreground))", marginBottom: 5 }}>{item.label}</div>
              <div style={{ fontSize: 14, fontWeight: 500, color: "hsl(var(--foreground))", lineHeight: 1.3 }}>{item.value}</div>
            </div>
          ))}
        </div>
      </motion.header>

      {/* Outcome pills strip */}
      <motion.div
        style={{
          padding: `16px ${px}`,
          background: "hsl(var(--card))",
          borderTop: "1px solid hsl(var(--border))",
          borderBottom: "1px solid hsl(var(--border))",
        }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.25 }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "hsl(var(--muted-foreground))", marginRight: 6, flexShrink: 0 }}>Key outcomes</span>
          {cs.outcomes.map((o, i) => (
            <span key={i} style={{
              display: "inline-flex", alignItems: "center", gap: 5,
              padding: "5px 12px", borderRadius: 100,
              background: "rgba(99,102,241,0.08)",
              border: "1px solid rgba(99,102,241,0.18)",
              fontSize: 12, fontWeight: 600, color: "#818cf8", whiteSpace: "nowrap",
            }}>
              <em style={{ fontFamily: "'DM Serif Display', serif", fontSize: 14, fontStyle: "italic", color: "#6366f1" }}>{o.metric}</em>
              {o.label}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Sections */}
      <main style={{ maxWidth: "min(1200px, 100%)", margin: "0 auto", padding: `0 ${px}` }}>
        {cs.sections.map((section, i) => (
          <SectionBlock key={i} section={section} />
        ))}

        {/* Tools strip */}
        <div style={{ padding: "20px 0", marginTop: 8, borderTop: "1px solid hsl(var(--border))", display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "hsl(var(--muted-foreground))", flexShrink: 0 }}>Tools used</span>
          {(cs.slug === "zu-ai"
            ? ["Figma", "Photoshop", "Google Forms", "Zoom", "Microsoft Fluent 2"]
            : ["Figma", "Google Forms", "Zoom", "Poppins / Euclid Circular B"]
          ).map((t) => (
            <span key={t} style={{
              display: "inline-flex", alignItems: "center",
              padding: "4px 12px", borderRadius: 100,
              border: "1px solid hsl(var(--border))",
              background: "hsl(var(--card))",
              fontSize: 12, fontWeight: 500,
              color: "hsl(var(--muted-foreground))",
            }}>{t}</span>
          ))}
        </div>
      </main>

      {/* Next project */}
      <section style={{
        padding: `clamp(56px,8vw,96px) ${px}`,
        background: "hsl(var(--card))",
        borderTop: "1px solid hsl(var(--border))",
        textAlign: "center",
      }}>
        <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "hsl(var(--muted-foreground))", marginBottom: 16 }}>Next Project</p>
        <Link
          to={`/case-study/${nextCs.slug}`}
          style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 16, textDecoration: "none", color: "inherit" }}
        >
          <h3
            style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(26px,4vw,48px)", fontWeight: 400, color: "hsl(var(--foreground))", lineHeight: 1.15, transition: "opacity 0.2s" }}
            dangerouslySetInnerHTML={{ __html: nextCs.title.replace(/—(.+)$/, `— <em style="font-style:italic;color:#6366f1">$1</em>`) }}
          />
          <span style={{
            width: 44, height: 44, borderRadius: "50%",
            border: "1.5px solid hsl(var(--border))",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 16, color: "hsl(var(--muted-foreground))",
            transition: "all 0.2s",
          }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLSpanElement; el.style.background = "#6366f1"; el.style.color = "#fff"; el.style.borderColor = "#6366f1"; }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLSpanElement; el.style.background = "transparent"; el.style.color = "hsl(var(--muted-foreground))"; el.style.borderColor = "hsl(var(--border))"; }}
          >→</span>
        </Link>
      </section>
    </div>
  );
}
