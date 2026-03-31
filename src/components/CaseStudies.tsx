import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { caseStudies } from "@/data/caseStudies";

const FONT_BODY = "'Aileron', sans-serif";
const FONT_DISPLAY = "'Unbounded', sans-serif";

const cardStyles = [
  { bg: "linear-gradient(145deg, #f0eeff, #e8e4fd)", tag: "rgba(79,70,229,0.45)", title: "#1e1b4b", accent: "#4f46e5", desc: "rgba(30,27,75,0.55)", lbl: "rgba(79,70,229,0.45)", watermark: "rgba(99,102,241,0.07)", pillBg: "rgba(99,102,241,0.10)", pillColor: "#4f46e5", pillBorder: "rgba(99,102,241,0.18)", border: "rgba(99,102,241,0.4)" },
  { bg: "linear-gradient(145deg, #eaf3ff, #d8eafe)", tag: "rgba(37,99,235,0.45)", title: "#1e3a5f", accent: "#1d4ed8", desc: "rgba(30,58,95,0.5)", lbl: "rgba(37,99,235,0.4)", watermark: "rgba(37,99,235,0.07)", pillBg: "rgba(37,99,235,0.10)", pillColor: "#1d4ed8", pillBorder: "rgba(37,99,235,0.18)", border: "rgba(37,99,235,0.35)" },
  { bg: "linear-gradient(145deg, #fff4ec, #ffe8d3)", tag: "rgba(180,83,9,0.45)", title: "#431407", accent: "#c2410c", desc: "rgba(67,20,7,0.5)", lbl: "rgba(180,83,9,0.4)", watermark: "rgba(234,88,12,0.07)", pillBg: "rgba(234,88,12,0.10)", pillColor: "#c2410c", pillBorder: "rgba(234,88,12,0.18)", border: "rgba(234,88,12,0.35)" },
];

const CaseStudies = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });

  return (
    <section id="work" className="pt-20 pb-20 max-md:pt-14 max-md:pb-14 px-6 lg:px-8 max-w-site mx-auto">

      <motion.div ref={headerRef} initial={{ opacity: 0, y: 20 }} animate={headerInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} className="mb-10">
        <p style={{ fontFamily: FONT_BODY, fontSize: 11, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "hsl(var(--muted-foreground))", marginBottom: 12 }}>Selected Work</p>
        <h2 style={{ margin: 0, lineHeight: 1.15 }}>
          <span style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(22px, 3.5vw, 36px)", fontWeight: 700, color: "hsl(var(--foreground))", letterSpacing: "-0.03em" }}>Projects I'm </span>
          <span style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(22px, 3.5vw, 36px)", fontWeight: 700, color: "#6366f1", letterSpacing: "-0.03em" }}>proud of</span>
        </h2>
      </motion.div>

      {/* Desktop filmstrip */}
      <motion.div initial={{ opacity: 0, y: 24 }} animate={headerInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }} className="hidden md:flex gap-2" style={{ height: 400 }}>
        {caseStudies.map((cs, i) => {
          const style = cardStyles[i] ?? cardStyles[0];
          const isActive = activeIndex === i;
          const heroOutcome = cs.outcomes?.[0];
          return (
            <Link key={cs.slug} to={`/case-study/${cs.slug}`}
              className="relative rounded-2xl overflow-hidden flex flex-col justify-between cursor-pointer no-underline"
              style={{ flex: isActive ? 3.2 : 1, minWidth: 72, padding: "28px 24px", background: style.bg, borderLeft: `3px solid ${isActive ? style.border : "transparent"}`, transition: "flex 0.5s cubic-bezier(0.16,1,0.3,1), border-left-color 0.3s" }}
              onMouseEnter={() => setActiveIndex(i)}>

              {/* Watermark */}
              <span className="absolute pointer-events-none select-none" style={{ fontFamily: FONT_DISPLAY, fontSize: 110, fontWeight: 800, lineHeight: 1, bottom: -16, right: -8, color: style.watermark, transform: isActive ? "scale(1.08) translate(-4px,-8px)" : "none", transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)", opacity: isActive ? 0.5 : 1, letterSpacing: "-0.04em" }}>
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="flex flex-col" style={{ gap: 6 }}>
                <p style={{ fontFamily: FONT_BODY, fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: style.tag, margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{cs.tag}</p>
                <h3 style={{ margin: 0, lineHeight: 1.25 }}>
                  <span style={{ fontFamily: FONT_DISPLAY, fontSize: isActive ? 16 : 12, fontWeight: 700, color: style.title, letterSpacing: "-0.02em", transition: "font-size 0.4s cubic-bezier(0.16,1,0.3,1)" }}>{cs.title}{cs.subtitle && " — "}</span>
                  {cs.subtitle && <span style={{ fontFamily: FONT_DISPLAY, fontSize: isActive ? 16 : 12, fontWeight: 700, color: style.accent, letterSpacing: "-0.02em", transition: "font-size 0.4s cubic-bezier(0.16,1,0.3,1)" }}>{cs.subtitle}</span>}
                </h3>
                <p style={{ fontFamily: FONT_BODY, fontSize: 13, lineHeight: 1.7, color: style.desc, margin: 0, opacity: isActive ? 1 : 0, maxHeight: isActive ? 80 : 0, overflow: "hidden", marginTop: isActive ? 8 : 0, transition: "opacity 0.3s 0.15s, max-height 0.4s, margin-top 0.3s" }}>{cs.tagline}</p>
              </div>

              <div className="relative flex flex-col" style={{ gap: 4, zIndex: 2 }}>
                {heroOutcome && (
                  <>
                    <div style={{ lineHeight: 1.1 }}>
                      <span style={{ fontFamily: FONT_DISPLAY, fontSize: 28, fontWeight: 600, color: style.title, letterSpacing: "-0.03em" }}>{heroOutcome.value}</span>
                      <span style={{ fontFamily: FONT_BODY, fontWeight: 600, color: style.accent, fontSize: 14, marginLeft: 4 }}>{heroOutcome.label.split(" ")[0]}</span>
                    </div>
                    <div style={{ fontFamily: FONT_BODY, fontSize: 11, lineHeight: 1.4, color: style.lbl }}>{heroOutcome.label.split(" ").slice(1).join(" ")}</div>
                  </>
                )}
                <div className="flex flex-wrap" style={{ gap: 5, opacity: isActive ? 1 : 0, maxHeight: isActive ? 60 : 0, overflow: "hidden", marginTop: isActive ? 10 : 0, transition: "opacity 0.3s 0.2s, max-height 0.4s, margin-top 0.3s" }}>
                  {(cs.outcomes ?? []).slice(0, 3).map((o) => (
                    <span key={o.label} style={{ fontFamily: FONT_BODY, fontSize: 10, fontWeight: 600, padding: "4px 10px", borderRadius: 100, background: style.pillBg, color: style.pillColor, border: `1px solid ${style.pillBorder}`, whiteSpace: "nowrap" }}>{o.value} {o.label}</span>
                  ))}
                </div>
                <div className="inline-flex items-center" style={{ gap: 8, fontFamily: FONT_BODY, fontSize: 12, fontWeight: 600, color: style.accent, opacity: isActive ? 1 : 0, marginTop: isActive ? 12 : 0, transition: "opacity 0.3s 0.25s, margin-top 0.3s", width: "fit-content" }}>
                  <span className="flex items-center justify-center rounded-full flex-shrink-0" style={{ width: 24, height: 24, border: `1.5px solid ${style.accent}`, color: style.accent, fontSize: 11, transition: "background 0.25s, color 0.25s" }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLSpanElement; el.style.background = style.accent; el.style.color = "#fff"; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLSpanElement; el.style.background = "transparent"; el.style.color = style.accent; }}>→</span>
                  View case study
                </div>
              </div>
            </Link>
          );
        })}
      </motion.div>

      {/* Mobile stacked */}
      <motion.div initial={{ opacity: 0, y: 24 }} animate={headerInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }} className="flex md:hidden flex-col gap-4">
        {caseStudies.map((cs, i) => {
          const style = cardStyles[i] ?? cardStyles[0];
          const heroOutcome = cs.outcomes?.[0];
          return (
            <Link key={cs.slug} to={`/case-study/${cs.slug}`} className="relative rounded-2xl overflow-hidden no-underline block"
              style={{ background: style.bg, borderLeft: `3px solid ${style.border}`, padding: "24px 20px" }}>
              <span className="absolute pointer-events-none select-none" style={{ fontFamily: FONT_DISPLAY, fontSize: 70, fontWeight: 800, bottom: -8, right: -4, color: style.watermark, lineHeight: 1, opacity: 0.6, letterSpacing: "-0.04em" }}>{String(i + 1).padStart(2, "0")}</span>
              <div className="relative z-10">
                <p style={{ fontFamily: FONT_BODY, fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: style.tag, margin: "0 0 8px" }}>{cs.tag}</p>
                <h3 style={{ margin: "0 0 8px", lineHeight: 1.25 }}>
                  <span style={{ fontFamily: FONT_DISPLAY, fontSize: 16, fontWeight: 700, color: style.title, letterSpacing: "-0.02em" }}>{cs.title}{cs.subtitle && " — "}</span>
                  {cs.subtitle && <span style={{ fontFamily: FONT_DISPLAY, fontSize: 16, fontWeight: 700, color: style.accent, letterSpacing: "-0.02em" }}>{cs.subtitle}</span>}
                </h3>
                <p style={{ fontFamily: FONT_BODY, fontSize: 13, lineHeight: 1.75, color: style.desc, margin: "0 0 16px" }}>{cs.tagline}</p>
                {heroOutcome && (
                  <>
                    <div style={{ lineHeight: 1.1, marginBottom: 4 }}>
                      <span style={{ fontFamily: FONT_DISPLAY, fontSize: 24, fontWeight: 600, color: style.title, letterSpacing: "-0.03em" }}>{heroOutcome.value}</span>
                      <span style={{ fontFamily: FONT_BODY, fontWeight: 600, color: style.accent, fontSize: 13, marginLeft: 4 }}>{heroOutcome.label.split(" ")[0]}</span>
                    </div>
                    <div style={{ fontFamily: FONT_BODY, fontSize: 11, lineHeight: 1.5, color: style.lbl, marginBottom: 14 }}>{heroOutcome.label.split(" ").slice(1).join(" ")}</div>
                  </>
                )}
                <div className="flex flex-wrap" style={{ gap: 5, marginBottom: 14 }}>
                  {(cs.outcomes ?? []).slice(0, 3).map((o) => (
                    <span key={o.label} style={{ fontFamily: FONT_BODY, fontSize: 10, fontWeight: 600, padding: "4px 10px", borderRadius: 100, background: style.pillBg, color: style.pillColor, border: `1px solid ${style.pillBorder}` }}>{o.value} {o.label}</span>
                  ))}
                </div>
                <div className="inline-flex items-center gap-2" style={{ fontFamily: FONT_BODY, fontSize: 12, fontWeight: 600, color: style.accent }}>
                  <span style={{ width: 22, height: 22, borderRadius: "50%", border: `1.5px solid ${style.accent}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10 }}>→</span>
                  View case study
                </div>
              </div>
            </Link>
          );
        })}
      </motion.div>
    </section>
  );
};

export default CaseStudies;
