import { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { caseStudies, CaseStudySection, ImagePlaceholder } from "@/data/caseStudies";

// ── All sub-components identical to your current file ──
// BoldText, RichBody, ImageSlot, Fade, StatGrid, Quotes,
// Pillars, Steps, Learnings, FutureList, SectionBlock
// — copy them exactly from your current CaseStudyDetail.tsx —

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
      <div style={{ position: "relative", width: "100%", paddingTop, background: "hsl(var(--muted))", border: "1px solid hsl(var(--border))", borderRadius: 16, overflow: "hidden" }}>
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

function StatGrid({ stats }: { stats: { value: string; label: string }[] }) {
  const c = Math.min(stats.length, 4);
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${c}, 1fr)`, gap: 0, border: "1px solid hsl(var(--border))", borderRadius: 16, overflow: "hidden", margin: "28px 0" }}>
      {stats.map((s, i) => (
        <div key={i} style={{ background: "hsl(var(--card))", padding: "28px 24px", borderRight: i < stats.length - 1 ? "1px solid hsl(var(--border))" : "none" }}>
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
        <blockquote key={i} style={{ position: "relative", padding: "20px 24px 20px 52px", background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderLeft: "3px solid rgba(99,102,241,0.4)", borderRadius: "0 12px 12px 0", fontSize: 15, lineHeight: 1.75, color: "hsl(var(--foreground))", fontStyle: "italic" }}>
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
        <div key={i} style={{ padding: "22px 20px", background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 14, transition: "border-color 0.2s, transform 0.2s" }}
          onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(99,102,241,0.3)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "hsl(var(--border))"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; }}>
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
        <div key={i} style={{ padding: "22px 24px", background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 14, position: "relative", borderLeft: "3px solid rgba(99,102,241,0.3)" }}>
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

function SectionBlock({ section, index }: { section: CaseStudySection; index: number }) {
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
    <article   id={`${section.type}-${index}`}   style={{ padding: "clamp(48px,7vw,80px) 0", borderBottom: "1px solid hsl(var(--border))" }}>
      <div style={{ maxWidth: isWide ? "100%" : 720 }}>
        <Fade>
          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#6366f1", marginBottom: 10 }}>{labels[section.type]}</p>
          <div style={{ marginBottom: 24 }}>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(24px,3.5vw,38px)", fontWeight: 400, lineHeight: 1.15, color: "hsl(var(--foreground))", marginBottom: 8 }}>{section.heading}</h2>
            {section.subheading && <p style={{ fontSize: 16, color: "hsl(var(--muted-foreground))", fontStyle: "italic", fontFamily: "'DM Serif Display', serif", lineHeight: 1.5 }}>{section.subheading}</p>}
          </div>
        </Fade>
        {section.stats && section.type === "overview" && <Fade delay={0.05}><StatGrid stats={section.stats} /></Fade>}
        {section.body && <Fade delay={0.08}><div style={{ maxWidth: 720 }}><RichBody text={section.body} /></div></Fade>}
        {section.pillars && <Fade delay={0.1}><Pillars pillars={section.pillars} /></Fade>}
        {section.steps && <Fade delay={0.12}><Steps steps={section.steps} /></Fade>}
        {section.quotes && <Fade delay={0.1}><Quotes quotes={section.quotes} /></Fade>}
        {section.image && <ImageSlot img={section.image} index={0} />}
        {section.images && (
          <div style={{ display: "grid", gridTemplateColumns: section.images.length === 2 ? "1fr 1fr" : "1fr", gap: 16, margin: "28px 0" }}>
            {section.images.map((img, i) => <div key={img.id} style={{ margin: 0 }}><ImageSlot img={img} index={i} /></div>)}
          </div>
        )}
        {section.stats && section.type !== "overview" && <Fade delay={0.12}><StatGrid stats={section.stats} /></Fade>}
        {section.learnings && <Fade delay={0.1}><Learnings learnings={section.learnings} /></Fade>}
        {section.futureItems && <Fade delay={0.14}><FutureList items={section.futureItems} /></Fade>}
      </div>
    </article>
  );
}

// // ── Main page ─────────────────────────────────────────────────────────────────
// export default function CaseStudyDetail() {
//   const { slug } = useParams<{ slug: string }>();
//   const [scrollProgress, setScrollProgress] = useState(0);  useEffect(() => {   const handleScroll = () => {     const totalHeight =       document.documentElement.scrollHeight - window.innerHeight;      const progress = window.scrollY / totalHeight;     setScrollProgress(progress);   };    window.addEventListener("scroll", handleScroll);   return () => window.removeEventListener("scroll", handleScroll); }, []);

//   useEffect(() => { window.scrollTo(0, 0); }, [slug]);

//   if (!cs) {
//     return (
//       <div style={{ paddingTop: 120, textAlign: "center", display: "flex", flexDirection: "column", gap: 16, alignItems: "center" }}>
//         <p style={{ color: "hsl(var(--muted-foreground))" }}>Case study not found.</p>
//         <Link to="/" style={{ color: "#6366f1", fontWeight: 600, textDecoration: "none" }}>← Back home</Link>
//       </div>
//     );
//   }

//   const sectionNav = [
//   { id: "overview-0", label: "Overview" },
//   { id: "insight-1", label: "Research" },
//   { id: "process-2", label: "Process" },
//   { id: "solution-3", label: "Solution" },
//   { id: "impact-6", label: "Impact" },
//   { id: "reflection-7", label: "Reflection" },
// ];
//   const nextCs = caseStudies[(currentIndex + 1) % caseStudies.length];

//   // Single padding value applied only to the centered inner container
//   const innerStyle = {
//     maxWidth: 1200,
//     margin: "0 auto",
//     paddingLeft: "clamp(20px, 5vw, 80px)",
//     paddingRight: "clamp(20px, 5vw, 80px)",
//   };

//   return (
//   <div style={{ minHeight: "100vh", background: "hsl(var(--background))", paddingTop: 64 }}>




   MAIN COMPONENT
========================= */

export default function CaseStudyDetail() {
  const { slug } = useParams<{ slug: string }>();

  /* ✅ FIX 1: REQUIRED DATA */
  const cs = caseStudies.find((c) => c.slug === slug);
  const currentIndex = caseStudies.findIndex((c) => c.slug === slug);

  /* ✅ FIX 2: STATE INSIDE COMPONENT */
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("overview-0");

  /* ✅ SECTION NAV */
  const sectionNav = [
    { id: "overview-0", label: "Overview" },
    { id: "insight-1", label: "Research" },
    { id: "process-2", label: "Process" },
    { id: "solution-3", label: "Solution" },
    { id: "impact-6", label: "Impact" },
    { id: "reflection-7", label: "Reflection" },
  ];

  /* ✅ FIX 3: SCROLL PROGRESS */
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = window.scrollY / totalHeight;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ✅ RESET SCROLL ON SLUG CHANGE */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  /* ✅ FIX 4: ACTIVE SECTION TRACK */
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 140;

      sectionNav.forEach((sec) => {
        const el = document.getElementById(sec.id);
        if (!el) return;

        if (
          scrollPos >= el.offsetTop &&
          scrollPos < el.offsetTop + el.offsetHeight
        ) {
          setActiveSection(sec.id);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ✅ FIX 5: SCROLL FUNCTION */
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    window.scrollTo({
      top: el.offsetTop - 110,
      behavior: "smooth",
    });
  };

  /* ✅ SAFE GUARD */
  if (!cs) {
    return (
      <div style={{ paddingTop: 120, textAlign: "center" }}>
        <p>Case study not found.</p>
        <Link to="/">← Back home</Link>
      </div>
    );
  }

  const nextCs = caseStudies[(currentIndex + 1) % caseStudies.length];

  const innerStyle = {
    maxWidth: 1200,
    margin: "0 auto",
    paddingLeft: "clamp(20px, 5vw, 80px)",
    paddingRight: "clamp(20px, 5vw, 80px)",
  };

  return (
    <div style={{ minHeight: "100vh", paddingTop: 64 }}>

      {/* Progress bar */}
      <div
        style={{
          position: "fixed",
          top: 64,
          left: 0,
          height: 3,
          width: `${scrollProgress * 100}%`,
          background: "#6366f1",
          zIndex: 100,
        }}
      />

      {/* Section nav */}
      <div style={{ position: "sticky", top: 108 }}>
        <div style={{ ...innerStyle, display: "flex", gap: 12 }}>
          {sectionNav.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              style={{
                padding: "6px 12px",
                borderRadius: 100,
                border: "1px solid",
                background:
                  activeSection === item.id ? "#6366f1" : "transparent",
                color: activeSection === item.id ? "#fff" : "#999",
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* HERO */}
      <div style={{ ...innerStyle, paddingTop: 80 }}>

        <h1
          dangerouslySetInnerHTML={{
            /* ✅ FIX 6: REGEX FIX */
            __html: cs.title.replace(
              /—(.+)$/,
              '— <em style="font-style:italic;color:#6366f1">$1</em>'
            ),
          }}
        />

        <p>{cs.heroTagline}</p>

        {/* outcomes */}
        {cs.outcomes.map((o, i) => (
          <div key={i}>
            <strong>{o.metric}</strong> {o.label}
          </div>
        ))}
      </div>

      {/* SECTIONS */}
      <div style={innerStyle}>
        {cs.sections.map((section, i) => (
          <div key={i} id={`${section.type}-${i}`}>
            <h2>{section.heading}</h2>
            <p>{section.body}</p>
          </div>
        ))}
      </div>

      {/* NEXT PROJECT */}
      <div style={{ textAlign: "center", marginTop: 80 }}>
        <Link to={`/case-study/${nextCs.slug}`}>
          <h3
            dangerouslySetInnerHTML={{
              /* ✅ FIX AGAIN HERE */
              __html: nextCs.title.replace(
                /—(.+)$/,
                '— <em style="font-style:italic;color:#6366f1">$1</em>'
              ),
            }}
          />
        </Link>
      </div>
    </div>
  );
}
