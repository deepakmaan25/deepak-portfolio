import { useState } from "react";
import { motion } from "framer-motion";

const FONT_BODY = "'Aileron', sans-serif";
const FONT_DISPLAY = "'Unbounded', sans-serif";

const skills = [
  "User Research", "Figma", "FigJam", "Figma Make",
  "Prototyping", "Design Systems", "A/B Testing", "User Interviews",
  "Usability Testing", "Claude / AI Tools", "Midjourney", "Prompt Writing",
  "Adobe Photoshop", "Adobe Illustrator", "Notion", "Miro",
];

const experiences = [
  { company: "JSW Steel", role: "Design Analyst", duration: "Aug 2025 — Present", current: true, points: ["Designing end-to-end monthly steel market intelligence reports, structuring complex data into Power BI–driven insight narratives for the CMO", "Mapped district-wise sales potential using historical demand analysis, improving regional sales projections and opportunity sizing", "Researched the Global/Indian data center market to predict steel consumption trends across regions and steel categories"] },
  { company: "Tech Japan (Talendy)", role: "UX Research Intern", duration: "Sep – Nov 2024 · 2 months", current: false, points: ["Sole researcher on a job platform used by IIT students to find roles in Japan — ran 10 1:1 interviews across 6 IITs", "Documented 9 platform pain points; multiple fixes shipped to production including job description layout, dark mode accessibility, and a built-in communication tool", "Reframing the WhatsApp finding as a visibility problem got it onto the priority list"] },
  { company: "EVeez", role: "Product Designer", duration: "Oct 2023 – Apr 2024 · 8 months", current: false, points: ["Led design of multiple high-impact landing pages and the homepage, improving usability, visual hierarchy, and conversion-focused user flows", "Resulted in a 12% increase in user conversion rate through research-backed design iterations", "Collaborated closely with developers and product managers to ensure smooth implementation"] },
  { company: "CyberLabs, IIT ISM Dhanbad", role: "Head of Design", duration: "May 2023 – Apr 2025 · 2 years", current: false, points: ["Led the UI/UX division of CyberLabs — the tech society of IIT ISM Dhanbad", "Organised design workshops and mentored 50+ students across the institute", "Drove creative direction for campus digital products and internal design initiatives"] },
];

const About = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const toggle = (i: number) => setOpenIndex(openIndex === i ? -1 : i);
  const lift = (el: HTMLDivElement, up: boolean) => { el.style.transform = up ? "translateY(-3px)" : "translateY(0)"; };

  return (
    <section id="about" className="py-24 px-6 lg:px-8 max-w-site mx-auto">

      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} className="mb-10">
        <p style={{ fontFamily: FONT_BODY, fontSize: 11, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "hsl(var(--muted-foreground))", marginBottom: 12 }}>About</p>
        <h2 style={{ margin: 0, lineHeight: 1.15 }}>
          <span style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(20px, 3.5vw, 36px)", fontWeight: 700, color: "hsl(var(--foreground))", letterSpacing: "-0.03em" }}>A designer who </span>
          <span style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(20px, 3.5vw, 36px)", fontWeight: 700, color: "#6366f1", letterSpacing: "-0.03em" }}>listens</span>
          <span style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(20px, 3.5vw, 36px)", fontWeight: 700, color: "hsl(var(--foreground))", letterSpacing: "-0.03em" }}> first.</span>
        </h2>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="about-bento" style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 8, marginBottom: 56, alignItems: "stretch" }}>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div onMouseEnter={e => lift(e.currentTarget as HTMLDivElement, true)} onMouseLeave={e => lift(e.currentTarget as HTMLDivElement, false)}
            style={{ flex: 1, borderRadius: 20, padding: 28, background: "linear-gradient(145deg, #1e1b4b, #312e81, #4338ca)", display: "flex", flexDirection: "column", justifyContent: "space-between", position: "relative", overflow: "hidden", minHeight: 320, transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1)", cursor: "default" }}>
            <div style={{ position: "absolute", top: -40, right: -40, width: 150, height: 150, borderRadius: "50%", background: "radial-gradient(circle, rgba(165,180,252,0.35), transparent 70%)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: -40, left: -20, width: 120, height: 120, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.2), transparent 70%)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: -10, right: -5, fontFamily: FONT_DISPLAY, fontSize: 72, fontWeight: 800, color: "rgba(255,255,255,0.04)", lineHeight: 1, pointerEvents: "none", userSelect: "none", letterSpacing: "-0.04em" }}>DM</div>
            <div style={{ position: "relative", zIndex: 1 }}>
              <p style={{ fontFamily: FONT_BODY, fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 10 }}>About</p>
              <div style={{ lineHeight: 1.1 }}>
                <span style={{ fontFamily: FONT_DISPLAY, fontSize: 28, fontWeight: 700, color: "#fff", letterSpacing: "-0.03em", display: "block" }}>Deepak</span>
                <span style={{ fontFamily: FONT_DISPLAY, fontSize: 28, fontWeight: 700, color: "#a5b4fc", display: "block", letterSpacing: "-0.03em" }}>Maan</span>
              </div>
              <p style={{ fontFamily: FONT_BODY, fontSize: 12, lineHeight: 1.6, color: "rgba(255,255,255,0.4)", marginTop: 8 }}>Product Designer · India · Open to remote</p>
            </div>
            <p style={{ fontFamily: FONT_BODY, fontSize: 12, fontStyle: "italic", color: "rgba(255,255,255,0.28)", lineHeight: 1.7, position: "relative", zIndex: 1 }}>"Design starts in conversations, not Figma."</p>
          </div>

          <div onMouseEnter={e => lift(e.currentTarget as HTMLDivElement, true)} onMouseLeave={e => lift(e.currentTarget as HTMLDivElement, false)}
            style={{ borderRadius: 20, padding: "22px 24px", background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexShrink: 0, transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1)", cursor: "default" }}>
            <div>
              <p style={{ fontFamily: FONT_BODY, fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "hsl(var(--muted-foreground))", marginBottom: 6 }}>Status</p>
              <div style={{ lineHeight: 1.3, marginBottom: 10 }}>
                <span style={{ fontFamily: FONT_DISPLAY, fontSize: 12, fontWeight: 600, color: "hsl(var(--foreground))", letterSpacing: "-0.02em" }}>Open to new </span>
                <span style={{ fontFamily: FONT_DISPLAY, fontSize: 12, fontWeight: 700, color: "#6366f1", letterSpacing: "-0.02em" }}>opportunities</span>
              </div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: FONT_BODY, fontSize: 11, fontWeight: 500, padding: "4px 10px", borderRadius: 100, background: "rgba(34,197,94,0.12)", color: "#22c55e", border: "1px solid rgba(34,197,94,0.25)" }}>
                <span className="relative flex h-1.5 w-1.5"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" /><span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" /></span>
                Available now
              </div>
            </div>
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <div style={{ fontFamily: FONT_DISPLAY, fontSize: 28, fontWeight: 700, color: "#6366f1", lineHeight: 1, letterSpacing: "-0.03em" }}>5<span style={{ fontSize: 16 }}>+</span></div>
              <div style={{ fontFamily: FONT_BODY, fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "hsl(var(--muted-foreground))", marginTop: 3 }}>Products</div>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div onMouseEnter={e => lift(e.currentTarget as HTMLDivElement, true)} onMouseLeave={e => lift(e.currentTarget as HTMLDivElement, false)}
            style={{ flex: 1, borderRadius: 20, padding: 28, background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", boxShadow: "0 2px 16px rgba(0,0,0,0.04)", transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1)", cursor: "default" }}>
            <p style={{ fontFamily: FONT_BODY, fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "hsl(var(--muted-foreground))", marginBottom: 10 }}>Bio</p>
            <h3 style={{ margin: "0 0 14px", lineHeight: 1.3 }}>
              <span style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(13px, 1.6vw, 17px)", fontWeight: 700, color: "hsl(var(--foreground))", letterSpacing: "-0.02em" }}>I don't start in Figma. </span>
              <span style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(13px, 1.6vw, 17px)", fontWeight: 700, color: "#6366f1", letterSpacing: "-0.02em" }}>I start with the person who's struggling.</span>
            </h3>
            <p style={{ fontFamily: FONT_BODY, fontSize: 14, lineHeight: 1.8, color: "hsl(var(--muted-foreground))", marginBottom: 0 }}>I'm Deepak — a Product Designer from IIT ISM Dhanbad, based in India and open to remote. I've worked across AI, SaaS, job platforms, and consumer products — researching what's broken, designing what fixes it, and making sure it actually ships.</p>
            <div style={{ width: 28, height: 2, background: "#6366f1", opacity: 0.3, borderRadius: 2, margin: "16px 0" }} />
            <p style={{ fontFamily: FONT_BODY, fontSize: 14, lineHeight: 1.8, color: "hsl(var(--muted-foreground))", marginBottom: 12 }}>Google UX Certified. Led design at CyberLabs, IIT ISM — mentored 50+ students. Currently a Design Analyst at JSW Steel, where design meets data and business strategy.</p>
            <p style={{ fontFamily: FONT_BODY, fontSize: 13, lineHeight: 1.75, color: "hsl(var(--muted-foreground))", fontStyle: "italic" }}>"I use AI tools — Claude, Midjourney, Figma Make — to compress the repetitive parts of research and synthesis."</p>
          </div>

          <div onMouseEnter={e => lift(e.currentTarget as HTMLDivElement, true)} onMouseLeave={e => lift(e.currentTarget as HTMLDivElement, false)}
            style={{ borderRadius: 20, padding: 24, background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", flexShrink: 0, transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1)", cursor: "default" }}>
            <p style={{ fontFamily: FONT_BODY, fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "hsl(var(--muted-foreground))", marginBottom: 8 }}>Skills & Tools</p>
            <div style={{ marginBottom: 12, lineHeight: 1.3 }}>
              <span style={{ fontFamily: FONT_DISPLAY, fontSize: 13, fontWeight: 700, color: "hsl(var(--foreground))", letterSpacing: "-0.02em" }}>Research · Design · </span>
              <span style={{ fontFamily: FONT_DISPLAY, fontSize: 13, fontWeight: 700, color: "#6366f1", letterSpacing: "-0.02em" }}>AI</span>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
              {skills.map(skill => (
                <span key={skill} style={{ fontFamily: FONT_BODY, fontSize: 11, fontWeight: 400, padding: "4px 10px", borderRadius: 100, background: "rgba(99,102,241,0.1)", color: "#818cf8", border: "1px solid rgba(99,102,241,0.2)", cursor: "default", transition: "all 0.2s" }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLSpanElement; el.style.background = "#6366f1"; el.style.color = "#fff"; el.style.borderColor = "#6366f1"; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLSpanElement; el.style.background = "rgba(99,102,241,0.1)"; el.style.color = "#818cf8"; el.style.borderColor = "rgba(99,102,241,0.2)"; }}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 20 }}>
          <div>
            <p style={{ fontFamily: FONT_BODY, fontSize: 11, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "hsl(var(--muted-foreground))", marginBottom: 8 }}>Experience</p>
            <h3 style={{ margin: 0, lineHeight: 1.15 }}>
              <span style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(18px, 2.5vw, 28px)", fontWeight: 700, color: "hsl(var(--foreground))", letterSpacing: "-0.03em" }}>Where I've </span>
              <span style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(18px, 2.5vw, 28px)", fontWeight: 700, color: "#6366f1", letterSpacing: "-0.03em" }}>worked</span>
            </h3>
          </div>
          <span style={{ fontFamily: FONT_BODY, fontSize: 12, color: "hsl(var(--muted-foreground))" }}>4 roles · 1.5 years</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {experiences.map((exp, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i} onClick={() => toggle(i)}
                style={{ borderRadius: 14, overflow: "hidden", background: "hsl(var(--card))", border: `1.5px solid ${isOpen ? "rgba(99,102,241,0.35)" : "hsl(var(--border))"}`, cursor: "pointer", transition: "border-color 0.25s, box-shadow 0.25s", boxShadow: isOpen ? "0 0 0 3px rgba(99,102,241,0.08)" : "none" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 22px", gap: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", flexShrink: 0, background: isOpen ? "#6366f1" : exp.current ? "#22c55e" : "hsl(var(--border))", boxShadow: isOpen ? "0 0 0 3px rgba(99,102,241,0.2)" : exp.current ? "0 0 0 3px rgba(34,197,94,0.2)" : "none", transition: "all 0.25s" }} />
                    <div>
                      <div style={{ fontFamily: FONT_BODY, fontSize: 14, fontWeight: 600, lineHeight: 1.4, color: isOpen ? "#818cf8" : "hsl(var(--foreground))", transition: "color 0.2s" }}>{exp.company}</div>
                      <div style={{ fontFamily: FONT_BODY, fontSize: 12, lineHeight: 1.5, color: "#818cf8", marginTop: 2 }}>{exp.role}</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                    <span style={{ fontFamily: FONT_BODY, fontSize: 11, fontWeight: exp.current ? 600 : 400, color: exp.current ? "#818cf8" : "hsl(var(--muted-foreground))", padding: "3px 10px", borderRadius: 100, background: exp.current ? "rgba(99,102,241,0.1)" : "transparent", border: exp.current ? "1px solid rgba(99,102,241,0.2)" : "none" }}>{exp.duration}</span>
                    <span style={{ fontSize: 10, color: "hsl(var(--muted-foreground))", display: "inline-block", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s" }}>▼</span>
                  </div>
                </div>
                <div style={{ maxHeight: isOpen ? 240 : 0, overflow: "hidden", transition: "max-height 0.4s cubic-bezier(0.16,1,0.3,1)" }}>
                  <div style={{ padding: "0 22px 18px", borderTop: "1px solid hsl(var(--border))" }}>
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
    </section>
  );
};

export default About;
