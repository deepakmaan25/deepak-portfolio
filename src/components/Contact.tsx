import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Github, Linkedin, Mail, ExternalLink, Calendar } from "lucide-react";

const F = "'Aileron', sans-serif";
const FD = "'Unbounded', sans-serif";

// ── Testimonials ─────────────────────────────────────────────────────────────
const testimonials = [
  {
    name: "Chanderkant Sharma",
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
    text: "Strong visual instincts and a genuine research mindset. He didn't just design what was asked — he consistently pushed back with user evidence when something wasn't right. Hard to find in early-career designers.",
  },
  {
    name: "Vidushi Bhardwaj",
    handle: "VB",
    role: "Mentor, Tech Japan",
    context: "UX Research Internship",
    text: "Deepak ran the research end-to-end — synthesizing 9 pain points, presenting findings in a way that got things shipped. The Save All flow and communication tool were both his.",
  },
  {
    name: "Sourabh Choudhary",
    handle: "SC",
    role: "Founder, Buzztro",
    context: "0→1 eCommerce App",
    text: "We went from a rough idea to a fully designed product ready for development. Brand identity, component system, all major flows — quality well above what I expected, and he moved fast without cutting corners.",
  },
  {
    name: "Amaresh",
    handle: "AM",
    role: "Team, Trovex.ai",
    context: "AI Product Design",
    text: "What stood out was how seriously he took the trust problem. He wasn't just making things look good — he was thinking about what makes users feel confident enough to rely on the output.",
  },
];

const allCards = [...testimonials, ...testimonials];

// ── Socials ───────────────────────────────────────────────────────────────────
const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/deepakmaan/", icon: Linkedin },
  { label: "GitHub", href: "https://github.com/deepakmaan25", icon: Github },
  { label: "Behance", href: "https://www.behance.net/deepakmaan1", icon: ExternalLink },
  { label: "Email", href: "mailto:dipumaan2002@gmail.com", icon: Mail },
];

const Contact = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const contactRef = useRef(null);
  const contactInView = useInView(contactRef, { once: true, margin: "-60px" });
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-60px" });

  const CARD_W = 340;
  const GAP = 12;
  const totalWidth = testimonials.length * (CARD_W + GAP);

  return (
    <>
      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section style={{
        background: "hsl(var(--background))",
        borderTop: "1px solid hsl(var(--border))",
        padding: "clamp(40px,5vw,64px) 0",
        overflow: "hidden",
      }}>

        {/* Heading — left-aligned, matches section pattern */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 16 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            paddingLeft: "clamp(20px,5vw,80px)",
            paddingRight: "clamp(20px,5vw,80px)",
            marginBottom: 32,
          }}
        >
          {/* Small label — same pattern as About / Experience */}
          <p style={{
            fontFamily: F,
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "hsl(var(--muted-foreground))",
            marginBottom: 10,
            margin: "0 0 10px",
          }}>
            Testimonials
          </p>

          {/* Main heading — same size/weight pattern as "Where I've worked" */}
          <h2 style={{ margin: 0, lineHeight: 1.1 }}>
            <span style={{
              fontFamily: FD,
              fontSize: "clamp(18px,2.5vw,28px)",
              fontWeight: 700,
              color: "hsl(var(--foreground))",
              letterSpacing: "-0.02em",
            }}>
              What It's Like to{" "}
            </span>
            <span style={{
              fontFamily: FD,
              fontSize: "clamp(18px,2.5vw,28px)",
              fontWeight: 800,
              color: "#6366f1",
              letterSpacing: "-0.02em",
            }}>
              Work With Me
            </span>
          </h2>
        </motion.div>

        {/* Marquee */}
        <div style={{ position: "relative" }}>

          {/* Left fade */}
          <div style={{
            position: "absolute", left: 0, top: 0, bottom: 0,
            width: "clamp(20px, 5vw, 80px)",
            zIndex: 2,
            background: "linear-gradient(to right, hsl(var(--background)) 0%, transparent 100%)",
            pointerEvents: "none",
          }} />

          {/* Right fade */}
          <div style={{
            position: "absolute", right: 0, top: 0, bottom: 0,
            width: "clamp(20px, 5vw, 80px)",
            zIndex: 2,
            background: "linear-gradient(to left, hsl(var(--background)) 0%, transparent 100%)",
            pointerEvents: "none",
          }} />

          <div style={{ overflow: "hidden" }}>
            <div
              className="testimonial-marquee"
              style={{
                display: "flex",
                gap: GAP,
                width: "max-content",
                paddingLeft: "clamp(20px, 5vw, 80px)",
                animation: `testimonialScroll ${testimonials.length * 5}s linear infinite`,
              }}
            >
              {allCards.map((t, i) => (
                <div
                  key={i}
                  style={{
                    width: CARD_W,
                    flexShrink: 0,
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: 16,
                    padding: "18px 20px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    gap: 14,
                    transition: "border-color 0.2s",
                    cursor: "default",
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(99,102,241,0.3)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "hsl(var(--border))"; }}
                >
                  {/* Quote */}
                  <p style={{
                    fontFamily: F, fontSize: 13, lineHeight: 1.75,
                    color: "hsl(var(--muted-foreground))",
                    margin: 0,
                    display: "-webkit-box",
                    WebkitLineClamp: 4,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  } as React.CSSProperties}>
                    "{t.text}"
                  </p>

                  {/* Author row */}
                  <div style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 10,
                    paddingTop: 12,
                    borderTop: "1px solid hsl(var(--border))",
                    flexWrap: "wrap",
                  }}>
                    {/* Avatar */}
                    <div style={{
                      width: 30, height: 30, borderRadius: "50%",
                      background: "rgba(99,102,241,0.1)",
                      border: "1px solid rgba(99,102,241,0.2)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontFamily: FD, fontSize: 9, fontWeight: 700,
                      color: "#6366f1", flexShrink: 0,
                    }}>
                      {t.handle}
                    </div>

                    {/* Name + role */}
                    <div style={{ flex: 1, minWidth: 120 }}>
                      <div style={{
                        fontFamily: F, fontSize: 12, fontWeight: 600,
                        color: "hsl(var(--foreground))", lineHeight: 1.25,
                      }}>
                        {t.name}
                      </div>
                      <div style={{
                        fontFamily: F, fontSize: 11,
                        color: "hsl(var(--muted-foreground))", marginTop: 1,
                      }}>
                        {t.role}
                      </div>
                    </div>

                    {/* Context pill */}
                    <span style={{
                      fontFamily: F, fontSize: 9, fontWeight: 600,
                      letterSpacing: "0.06em", textTransform: "uppercase",
                      color: "rgba(99,102,241,0.7)",
                      background: "rgba(99,102,241,0.07)",
                      border: "1px solid rgba(99,102,241,0.15)",
                      padding: "3px 8px", borderRadius: 100,
                      flexShrink: 0,
                      alignSelf: "flex-end",
                      marginLeft: "auto",
                    }}>
                      {t.context}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <style>{`
          @keyframes testimonialScroll {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-${totalWidth}px); }
          }
          .testimonial-marquee:hover {
            animation-play-state: paused;
          }
        `}</style>
      </section>

      {/* ── CONTACT + FOOTER ─────────────────────────────────────────────── */}
      <footer id="contact" style={{ background: "#0C0C0F" }}>

        <div style={{
          maxWidth: 1200, margin: "0 auto",
          paddingLeft: "clamp(20px,5vw,80px)",
          paddingRight: "clamp(20px,5vw,80px)",
          paddingTop: "clamp(48px,7vw,88px)",
          paddingBottom: "clamp(40px,6vw,72px)",
          borderBottom: "1px solid #1A1A1A",
        }}>
          <motion.div
            ref={contactRef}
            initial={{ opacity: 0, y: 16 }}
            animate={contactInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "center" }}
            className="contact-grid"
          >
            {/* Left */}
            <div>
              <p style={{ fontFamily: F, fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#6366f1", marginBottom: 14 }}>
                Get in touch
              </p>
              <h2 style={{ fontFamily: FD, fontSize: "clamp(24px,4vw,48px)", fontWeight: 700, color: "white", letterSpacing: "-0.025em", lineHeight: 1.05, margin: "0 0 6px" }}>
                Have a project
              </h2>
              <h2 style={{ fontFamily: FD, fontSize: "clamp(24px,4vw,48px)", fontWeight: 800, color: "#6366f1", letterSpacing: "-0.025em", lineHeight: 1.05, margin: "0 0 20px" }}>
                in mind?
              </h2>
              <p style={{ fontFamily: F, fontSize: 14, color: "#555555", lineHeight: 1.75, maxWidth: 400, marginBottom: 32 }}>
                Open to full-time roles, freelance projects, and interesting collaborations. If you're building something worth caring about — let's talk.
              </p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <a
                  href="mailto:dipumaan2002@gmail.com?subject=Let's Work Together&body=Hi Deepak,"
                  style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: F, fontSize: 13, fontWeight: 600, background: "#6366f1", color: "white", padding: "12px 22px", borderRadius: 100, textDecoration: "none", transition: "background 0.2s, transform 0.2s" }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "#818cf8"; el.style.transform = "translateY(-1px)"; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "#6366f1"; el.style.transform = "translateY(0)"; }}
                >
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#a5f3fc", display: "inline-block", flexShrink: 0 }} />
                  Open to work
                </a>
                <a
                  href="https://cal.com/deepakmaan"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: F, fontSize: 13, fontWeight: 500, background: "transparent", color: "#666666", padding: "12px 22px", borderRadius: 100, border: "1px solid #2A2A2A", textDecoration: "none", transition: "color 0.2s, border-color 0.2s" }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.color = "white"; el.style.borderColor = "#444"; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.color = "#666666"; el.style.borderColor = "#2A2A2A"; }}
                >
                  <Calendar size={13} />
                  Schedule a call
                </a>
              </div>
            </div>

            {/* Right — 2×2 social grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: F, fontSize: 13, fontWeight: 500, color: "#888888", textDecoration: "none", padding: "14px 18px", borderRadius: 14, border: "1px solid #252525", background: "#111111", transition: "color 0.2s, border-color 0.2s, background 0.2s, transform 0.2s" }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.color = "white"; el.style.borderColor = "#333333"; el.style.background = "#1A1A1A"; el.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.color = "#888888"; el.style.borderColor = "#252525"; el.style.background = "#111111"; el.style.transform = "translateY(0)"; }}
                >
                  <s.icon size={15} style={{ flexShrink: 0, color: "#6366f1" }} />
                  {s.label}
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div style={{ maxWidth: 1200, margin: "0 auto", paddingLeft: "clamp(20px,5vw,80px)", paddingRight: "clamp(20px,5vw,80px)", paddingTop: 18, paddingBottom: 22, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{ fontFamily: FD, fontSize: 12, fontWeight: 600, color: "#2E2E2E", letterSpacing: "-0.01em" }}>Deepak Maan</span>
            <span style={{ width: 3, height: 3, borderRadius: "50%", background: "#222", display: "block" }} />
            <span style={{ fontFamily: F, fontSize: 11, color: "#2E2E2E" }}>Product Designer · {new Date().getFullYear()}</span>
          </div>
          <button
            onClick={scrollToTop}
            style={{ fontFamily: F, fontSize: 11, color: "#333333", background: "transparent", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 5, transition: "color 0.2s", padding: 0 }}
            onMouseEnter={e => (e.currentTarget.style.color = "white")}
            onMouseLeave={e => (e.currentTarget.style.color = "#333333")}
          >
            ↑ Back to top
          </button>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .contact-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </footer>
    </>
  );
};

export default Contact;
