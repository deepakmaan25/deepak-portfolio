import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Github, Linkedin, Mail, ExternalLink } from "lucide-react";

const F = "'Aileron', sans-serif";
const FD = "'Unbounded', sans-serif";

const testimonials = [
  {
    name: "Chanderkant K.",
    handle: "CK",
    role: "Founder, Korzi",
    context: "Grull & Fino.club",
    text: "Deepak has a rare ability to translate ambiguous product goals into clear, considered design decisions. He gets to the core of a problem fast — and communicates his thinking to people who aren't designers.",
  },
  {
    name: "Tabish Nadeem",
    handle: "TN",
    role: "Team Lead, EVeez",
    context: "Product Design Internship",
    text: "Strong visual instincts and a genuine research mindset. He didn't just design what was asked — he consistently pushed back with user evidence when something wasn't right. That's hard to find in early-career designers.",
  },
  {
    name: "Vidushi Bhardwaj",
    handle: "VB",
    role: "Mentor, Tech Japan / Talendy",
    context: "UX Research Internship",
    text: "Deepak ran the research end-to-end — recruiting, synthesizing 9 pain points, presenting findings in a way that got things prioritized and shipped. The Save All flow and communication tool were both his ideas.",
  },
  {
    name: "Sourabh Choudhary",
    handle: "SC",
    role: "Founder, Buzztro",
    context: "0 to 1 eCommerce App",
    text: "We went from a rough idea to a fully designed product ready for development. Brand identity, component system, all major flows — the quality was well above what I expected, and he moved fast without cutting corners.",
  },
  {
    name: "Amaresh",
    handle: "AM",
    role: "Team, Trovex.ai",
    context: "AI Product Design",
    text: "What stood out was how seriously he took the trust problem. He wasn't just making things look good — he was thinking about what makes users feel confident enough to rely on the output. That framing made the whole product better.",
  },
];

const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/deepakmaan/", icon: Linkedin },
  { label: "GitHub", href: "https://github.com/deepakmaan25", icon: Github },
  { label: "Behance", href: "https://www.behance.net/deepakmaan1", icon: ExternalLink },
  { label: "Email", href: "mailto:dipumaan2002@gmail.com", icon: Mail },
];

function TestimonialCard({ t, index }: { t: typeof testimonials[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      style={{
        background: "hsl(var(--card))",
        border: "1px solid hsl(var(--border))",
        borderRadius: 16,
        padding: "22px 24px",
        display: "flex",
        flexDirection: "column",
        gap: 14,
        transition: "border-color 0.2s",
        breakInside: "avoid" as const,
        marginBottom: 14,
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(99,102,241,0.25)"; }}
      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "hsl(var(--border))"; }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{
          width: 38, height: 38, borderRadius: "50%",
          background: "hsl(var(--secondary))",
          border: "1px solid hsl(var(--border))",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: FD, fontSize: 9, fontWeight: 700,
          color: "hsl(var(--muted-foreground))",
          flexShrink: 0, letterSpacing: "0.02em",
        }}>
          {t.handle}
        </div>
        <div>
          <div style={{ fontFamily: F, fontSize: 14, fontWeight: 600, color: "hsl(var(--foreground))", lineHeight: 1.3 }}>{t.name}</div>
          <div style={{ fontFamily: F, fontSize: 11, color: "hsl(var(--muted-foreground))", marginTop: 2 }}>{t.role}</div>
        </div>
      </div>
      <p style={{ fontFamily: F, fontSize: 13, lineHeight: 1.8, color: "hsl(var(--muted-foreground))", margin: 0 }}>
        "{t.text}"
      </p>
      <span style={{
        alignSelf: "flex-start",
        fontFamily: F, fontSize: 10, fontWeight: 500,
        color: "rgba(99,102,241,0.65)",
        background: "rgba(99,102,241,0.06)",
        border: "1px solid rgba(99,102,241,0.1)",
        padding: "3px 10px", borderRadius: 100,
      }}>
        {t.context}
      </span>
    </motion.div>
  );
}

const Contact = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <>
      <section style={{ background: "hsl(var(--background))", padding: "clamp(56px,8vw,96px) 0", borderTop: "1px solid hsl(var(--border))" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", paddingLeft: "clamp(20px,5vw,80px)", paddingRight: "clamp(20px,5vw,80px)" }}>
          <motion.div
            ref={sectionRef}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ marginBottom: 36 }}
          >
            <p style={{ fontFamily: F, fontSize: 11, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "#6366f1", marginBottom: 10 }}>Testimonials</p>
            <h2 style={{ margin: 0, fontFamily: FD, fontSize: "clamp(20px,3vw,32px)", fontWeight: 700, color: "hsl(var(--foreground))", letterSpacing: "-0.02em", lineHeight: 1.15 }}>
              Kind words from{" "}
              <span style={{ color: "#6366f1", fontWeight: 800 }}>people I've worked with</span>
            </h2>
          </motion.div>
          <div style={{ columns: "3 280px", columnGap: 14 }}>
            {testimonials.map((t, i) => (
              <TestimonialCard key={t.name} t={t} index={i} />
            ))}
          </div>
        </div>
      </section>

      <footer id="contact" style={{ background: "#0C0C0F" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", paddingLeft: "clamp(20px,5vw,80px)", paddingRight: "clamp(20px,5vw,80px)", paddingTop: "clamp(56px,8vw,96px)", paddingBottom: "clamp(48px,7vw,80px)", borderBottom: "1px solid #1A1A1A" }}>
          <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 40, alignItems: "end" }}>
            <div>
              <p style={{ fontFamily: F, fontSize: 11, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "#6366f1", marginBottom: 16 }}>Let's Connect</p>
              <h2 style={{ fontFamily: FD, fontSize: "clamp(26px,4vw,52px)", fontWeight: 700, color: "white", letterSpacing: "-0.025em", lineHeight: 1.05, margin: "0 0 6px" }}>Have a project</h2>
              <h2 style={{ fontFamily: FD, fontSize: "clamp(26px,4vw,52px)", fontWeight: 800, color: "#6366f1", letterSpacing: "-0.025em", lineHeight: 1.05, margin: "0 0 24px" }}>in mind?</h2>
              <p style={{ fontFamily: F, fontSize: 14, color: "#666666", lineHeight: 1.8, maxWidth: 400, marginBottom: 32 }}>
                Open to full-time roles, freelance projects, and interesting collaborations. If you're building something worth caring about — let's talk.
              </p>
              <a
                href="mailto:dipumaan2002@gmail.com"
                style={{ display: "inline-flex", alignItems: "center", gap: 10, fontFamily: F, fontSize: 14, fontWeight: 600, background: "#6366f1", color: "white", padding: "13px 26px", borderRadius: 100, textDecoration: "none", transition: "background 0.2s, transform 0.2s" }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "#818cf8"; el.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "#6366f1"; el.style.transform = "translateY(0)"; }}
              >
                <Mail size={14} />
                dipumaan2002@gmail.com
              </a>
            </div>
            <div className="social-links-col" style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-end" }}>
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  style={{ display: "inline-flex", alignItems: "center", gap: 10, fontFamily: F, fontSize: 13, fontWeight: 500, color: "#555555", textDecoration: "none", padding: "9px 18px", borderRadius: 100, border: "1px solid #222222", transition: "color 0.2s, border-color 0.2s, background 0.2s", whiteSpace: "nowrap" }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.color = "white"; el.style.borderColor = "#333333"; el.style.background = "#141414"; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.color = "#555555"; el.style.borderColor = "#222222"; el.style.background = "transparent"; }}
                >
                  <s.icon size={13} />
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div style={{ maxWidth: 1200, margin: "0 auto", paddingLeft: "clamp(20px,5vw,80px)", paddingRight: "clamp(20px,5vw,80px)", paddingTop: 20, paddingBottom: 24, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{ fontFamily: FD, fontSize: 12, fontWeight: 600, color: "#2E2E2E", letterSpacing: "-0.01em" }}>Deepak Maan</span>
            <span style={{ width: 3, height: 3, borderRadius: "50%", background: "#2A2A2A", display: "block" }} />
            <span style={{ fontFamily: F, fontSize: 11, color: "#2E2E2E" }}>Product Designer · {new Date().getFullYear()}</span>
          </div>
          <button
            onClick={scrollToTop}
            style={{ fontFamily: F, fontSize: 11, color: "#333333", background: "transparent", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, transition: "color 0.2s", padding: 0 }}
            onMouseEnter={e => (e.currentTarget.style.color = "white")}
            onMouseLeave={e => (e.currentTarget.style.color = "#333333")}
          >
            ↑ Back to top
          </button>
        </div>

        <style>{`
          @media (max-width: 640px) {
            .contact-grid { grid-template-columns: 1fr !important; }
            .social-links-col { align-items: flex-start !important; flex-direction: row !important; flex-wrap: wrap !important; }
          }
        `}</style>
      </footer>
    </>
  );
};

export default Contact;
