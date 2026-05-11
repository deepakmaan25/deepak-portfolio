import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Github, Linkedin, Mail, ExternalLink, Calendar } from "lucide-react";

const F = "'Aileron', sans-serif";
const FD = "'Unbounded', sans-serif";

const testimonials = [
  {
    name: "Chanderkant Sharma",
    handle: "CK",
    role: "Founder, Korzi",
    context: "Product Design",
    photo: "",
    linkedin: "https://in.linkedin.com/in/chanderkantsharma/",
    text: "Deepak has a rare ability to translate ambiguous product goals into clear, considered design decisions. He gets to the core of a problem fast — and communicates his thinking to people who aren't designers.",
  },
  {
    name: "Tabish Nadeem",
    handle: "TN",
    role: "Team Lead, EVeez",
    context: "Product Design",
    photo: "",
    linkedin: "https://in.linkedin.com/in/tabish-nadeem-520719156/",
    text: "Strong visual instincts and a genuine research mindset. He didn't just design what was asked — he consistently pushed back with user evidence when something wasn't right. Hard to find in early-career designers.",
  },
  {
    name: "Vidushi Bhardwaj",
    handle: "VB",
    role: "UX Lead, Tech Japan",
    context: "UX Research",
    photo: "",
    linkedin: "https://in.linkedin.com/in/vidushibhardwaj/",
    text: "Deepak ran the research end-to-end — synthesizing 9 pain points, presenting findings in a way that got things shipped. The Save All flow and communication tool were both his.",
  },
  {
    name: "Sourabh Choudhary",
    handle: "SC",
    role: "Founder, Buzztro",
    context: "Product Design",
    photo: "",
    linkedin: "https://www.linkedin.com/posts/souravskc_we-are-live-after-months-of-building-activity-7263478457534156800-GDyV",
    text: "We went from a rough idea to a fully designed product ready for development. Brand identity, component system, all major flows — quality well above what I expected, and he moved fast without cutting corners.",
  },
  {
    name: "Krishan Dev Singh",
    handle: "KS",
    role: "Founder, EAL",
    context: "UI/UX Design",
    photo: "",
    linkedin: "https://in.linkedin.com/in/krishn-dev-singh-80085756/",
    text: "We hired Deepak to design the end to end user flow for our App, he understood the requirements and target users and made the user journey through the app seamless and we were able to ship the final UI within 3 months.",
  },
  {
    name: "Amaresh",
    handle: "AM",
    role: "Founder, Trovex.ai",
    context: "AI Product Design",
    photo: "",
    linkedin: "https://in.linkedin.com/in/amaresh-ojha",
    text: "What stood out was how seriously he took the trust problem. He wasn't just making things look good — he was thinking about what makes users feel confident enough to rely on the output.",
  },
];

const AVATAR_GRADIENTS = [
  "linear-gradient(135deg, #6366f1, #818cf8)",
  "linear-gradient(135deg, #0ea5e9, #38bdf8)",
  "linear-gradient(135deg, #a855f7, #c084fc)",
  "linear-gradient(135deg, #10b981, #34d399)",
  "linear-gradient(135deg, #f59e0b, #fbbf24)",
  "linear-gradient(135deg, #ec4899, #f472b6)",
];

const allCards = [...testimonials, ...testimonials];

const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/deepakmaan/",  icon: Linkedin },
  { label: "GitHub",   href: "https://github.com/deepakmaan25",           icon: Github },
  { label: "Behance",  href: "https://www.behance.net/deepakmaan1",       icon: ExternalLink },
  { label: "Email",    href: "mailto:dipumaan2002@gmail.com",             icon: Mail },
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
      <section style={{
        background: "hsl(var(--background))",
        borderTop: "1px solid hsl(var(--border))",
        padding: "clamp(32px,5vw,64px) 0",
        overflow: "hidden",
      }}>

        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 16 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          style={{
            maxWidth: 1200, margin: "0 auto",
            paddingLeft: "clamp(20px,5vw,32px)",
            paddingRight: "clamp(20px,5vw,32px)",
            marginBottom: 32,
          }}
        >
          <p style={{ fontFamily: F, fontSize: 11, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "hsl(var(--muted-foreground))", margin: "0 0 10px" }}>
            Testimonials
          </p>
          <h2 style={{ margin: 0, lineHeight: 1.1 }}>
            <span style={{ fontFamily: FD, fontSize: "clamp(18px,2.5vw,28px)", fontWeight: 700, color: "hsl(var(--foreground))", letterSpacing: "-0.02em" }}>
              What It's Like to{" "}
            </span>
            <span style={{ fontFamily: FD, fontSize: "clamp(18px,2.5vw,28px)", fontWeight: 800, color: "#6366f1", letterSpacing: "-0.02em" }}>
              Work With Me
            </span>
          </h2>
        </motion.div>

        <div style={{ maxWidth: 1200, margin: "0 auto", paddingLeft: "clamp(20px,5vw,32px)", paddingRight: "clamp(20px,5vw,80px)", position: "relative" }}>
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "clamp(20px,5vw,32px)", zIndex: 2, background: "linear-gradient(to right, hsl(var(--background)) 0%, transparent 100%)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "clamp(20px,5vw,32px)", zIndex: 2, background: "linear-gradient(to left, hsl(var(--background)) 0%, transparent 100%)", pointerEvents: "none" }} />

          {/* paddingBottom prevents card borders and shadows being clipped by overflow:hidden */}
          <div style={{ overflow: "hidden", paddingBottom: 8 }}>
            <div
              className="testimonial-marquee"
              style={{ display: "flex", gap: GAP, width: "max-content", animation: `testimonialScroll ${testimonials.length * 5}s linear infinite` }}
            >
              {allCards.map((t, i) => {
                const gradientIndex = testimonials.findIndex(x => x.name === t.name) % AVATAR_GRADIENTS.length;
                return (
                  <div
                    key={i}
                    style={{
                      width: CARD_W, flexShrink: 0,
                      background: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: 16, padding: "18px 20px",
                      display: "flex", flexDirection: "column",
                      justifyContent: "space-between", gap: 14,
                      transition: "border-color 0.2s", cursor: "default",
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(99,102,241,0.3)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "hsl(var(--border))"; }}
                  >
                    <p style={{
                      fontFamily: F, fontSize: 13, lineHeight: 1.75,
                      color: "hsl(var(--muted-foreground))", margin: 0,
                      display: "-webkit-box",
                      WebkitLineClamp: 4,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    } as React.CSSProperties}>
                      "{t.text}"
                    </p>

                    <div style={{ display: "flex", alignItems: "center", gap: 10, paddingTop: 12, borderTop: "1px solid hsl(var(--border))", flexWrap: "nowrap", minWidth: 0 }}>
                      <div style={{
                        width: 32, height: 32, borderRadius: "50%",
                        flexShrink: 0, overflow: "hidden",
                        background: t.photo ? "transparent" : AVATAR_GRADIENTS[gradientIndex],
                        border: "1px solid rgba(99,102,241,0.2)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        {t.photo ? (
                          <img
                            src={t.photo}
                            alt={t.name}
                            style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }}
                            onError={e => {
                              e.currentTarget.style.display = "none";
                              const parent = e.currentTarget.parentElement as HTMLDivElement;
                              parent.style.background = AVATAR_GRADIENTS[gradientIndex];
                              const span = document.createElement("span");
                              span.textContent = t.handle;
                              span.style.cssText = `font-family: ${FD}; font-size: 9px; font-weight: 700; color: #fff;`;
                              parent.appendChild(span);
                            }}
                          />
                        ) : (
                          <span style={{ fontFamily: FD, fontSize: 9, fontWeight: 700, color: "#fff" }}>{t.handle}</span>
                        )}
                      </div>

                      <div style={{ flexShrink: 0, minWidth: 0 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                          <div style={{ fontFamily: F, fontSize: 10, fontWeight: 600, color: "hsl(var(--foreground))", lineHeight: 1.25, whiteSpace: "nowrap" }}>
                            {t.name}
                          </div>
                          {t.linkedin && (
                            <a
                              href={t.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={e => e.stopPropagation()}
                              style={{ display: "inline-flex", flexShrink: 0, color: "#0077b5", transition: "opacity 0.2s", lineHeight: 1 }}
                              onMouseEnter={e => (e.currentTarget.style.opacity = "0.7")}
                              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                              title={`${t.name} on LinkedIn`}
                            >
                              <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                              </svg>
                            </a>
                          )}
                        </div>
                        <div style={{ fontFamily: F, fontSize: 11, color: "hsl(var(--muted-foreground))", marginTop: 1, whiteSpace: "nowrap" }}>
                          {t.role}
                        </div>
                      </div>

                      <span style={{
                        fontFamily: F, fontSize: 9, fontWeight: 600,
                        letterSpacing: "0.06em", textTransform: "uppercase",
                        color: "rgba(99,102,241,0.7)",
                        background: "rgba(99,102,241,0.07)",
                        border: "1px solid rgba(99,102,241,0.15)",
                        padding: "3px 8px", borderRadius: 100,
                        marginLeft: "auto", flexShrink: 1,
                        minWidth: 0, overflow: "hidden",
                        textOverflow: "ellipsis", whiteSpace: "nowrap",
                      }}>
                        {t.context}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <style>{`
          @keyframes testimonialScroll {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-${totalWidth}px); }
          }
          .testimonial-marquee:hover { animation-play-state: paused; }
        `}</style>
      </section>

      <footer id="contact" style={{ background: "#0C0C0F" }}>
        <div style={{
          maxWidth: 1200, margin: "0 auto",
          paddingLeft: "clamp(20px,5vw,32px)",
          paddingRight: "clamp(20px,5vw,32px)",
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
              <p style={{ fontFamily: F, fontSize: 14, color: "#555555", lineHeight: 1.75, maxWidth: 400, marginBottom: 0 }}>
                Open to full-time roles, freelance projects, and interesting collaborations. If you're building something worth caring about — let's talk.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <a
                  href="mailto:dipumaan2002@gmail.com?subject=Let's Work Together&body=Hi Deepak,"
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontFamily: F, fontSize: 13, fontWeight: 600, background: "#6366f1", color: "white", padding: "14px 0", borderRadius: 14, textDecoration: "none", transition: "background 0.2s, transform 0.2s" }}
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
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontFamily: F, fontSize: 13, fontWeight: 500, background: "rgba(99,102,241,0.08)", color: "#c7d2fe", padding: "14px 0", borderRadius: 14, border: "1px solid rgba(99,102,241,0.3)", textDecoration: "none", transition: "color 0.2s, border-color 0.2s, background 0.2s, transform 0.2s" }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.color = "white"; el.style.borderColor = "rgba(99,102,241,0.6)"; el.style.background = "rgba(99,102,241,0.18)"; el.style.transform = "translateY(-1px)"; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.color = "#c7d2fe"; el.style.borderColor = "rgba(99,102,241,0.3)"; el.style.background = "rgba(99,102,241,0.08)"; el.style.transform = "translateY(0)"; }}
                >
                  <Calendar size={13} />
                  Schedule a call
                </a>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: F, fontSize: 13, fontWeight: 500, color: "#aaaaaa", textDecoration: "none", padding: "14px 18px", borderRadius: 14, border: "1px solid #2E2E2E", background: "#161616", transition: "color 0.2s, border-color 0.2s, background 0.2s, transform 0.2s" }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.color = "white"; el.style.borderColor = "#444444"; el.style.background = "#222222"; el.style.transform = "translateY(-2px)"; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.color = "#aaaaaa"; el.style.borderColor = "#2E2E2E"; el.style.background = "#161616"; el.style.transform = "translateY(0)"; }}
                  >
                    <s.icon size={15} style={{ flexShrink: 0, color: "#6366f1" }} />
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

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
