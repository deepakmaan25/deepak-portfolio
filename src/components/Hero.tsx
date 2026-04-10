import { useEffect, useRef, useState } from "react";

const FONT_BODY    = "'Aileron', sans-serif";
const FONT_DISPLAY = "'Unbounded', sans-serif";

// ── Scramble ──────────────────────────────────────────────────────────────────
const CH = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$!?";
const useScramble = (final: string, delay: number) => {
  const [text, setText] = useState(() =>
    Array.from({ length: final.length }, () => CH[Math.floor(Math.random() * CH.length)]).join("")
  );
  useEffect(() => {
    const dur = 950, step = 14; let t = 0;
    const tid = setTimeout(() => {
      const iv = setInterval(() => {
        t += step;
        const p    = Math.min(t / dur, 1);
        const done = Math.floor(p * final.length * 1.15);
        setText(final.split("").map((c, i) => i < done ? c : CH[Math.floor(Math.random() * CH.length)]).join(""));
        if (p >= 1) { setText(final); clearInterval(iv); }
      }, step);
    }, delay);
    return () => clearTimeout(tid);
  }, [final, delay]);
  return text;
};

// ── Dark mode ─────────────────────────────────────────────────────────────────
const useDarkMode = () => {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const check = () => setDark(document.documentElement.classList.contains("dark"));
    check();
    const obs = new MutationObserver(check);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);
  return dark;
};

// ── 3D helpers ────────────────────────────────────────────────────────────────
const getT = (pos: number, lx: number, ly: number) => {
  if (pos === 0) return `translateZ(70px) rotateY(${-8 + lx * 15}deg) rotateX(${-ly * 10}deg)`;
  if (pos === 1) return `translateZ(25px) translateX(24px) translateY(20px) rotateY(${-5 + lx * 9}deg) rotateX(${-ly * 7}deg) rotateZ(-2deg)`;
  return `translateZ(-20px) translateX(48px) translateY(40px) rotateY(${-2 + lx * 4}deg) rotateX(${-ly * 3}deg) rotateZ(-4deg)`;
};

// ── Card data ─────────────────────────────────────────────────────────────────
const CARD_DATA = [
  {
    id:0, accent:"#6366f1", tag:"Product Design · Mobile", metric:"40%", metricSize:26,
    title:"Zu-AI — Chat Experience Redesign", sub:"Faster Scanning · 100K+ Students",
    bgDark:"linear-gradient(145deg,#1a1a2e,#141418)",
    bgLight:"linear-gradient(145deg,#2a2a48,#1c1c30)",
  },
  {
    id:1, accent:"#03a552", tag:"UX Research · Web Platform", metric:"80%", metricSize:26,
    title:"Tech Japan — Platform Redesign", sub:"Improved Navigation · IIT Students",
    bgDark:"linear-gradient(145deg,#0f1f1a,#141418)",
    bgLight:"linear-gradient(145deg,#163326,#1a2820)",
  },
  {
    id:2, accent:"#f59e0b", tag:"Design Analytics · Data", metric:"Power BI", metricSize:15,
    title:"JSW Steel — Data Design", sub:"CMO Intelligence · Market Analysis",
    bgDark:"linear-gradient(145deg,#1a1520,#141418)",
    bgLight:"linear-gradient(145deg,#2c2010,#201808)",
  },
];

// ── Card Scene ────────────────────────────────────────────────────────────────
const CardScene = ({ mobile = false, isDark = true }: { mobile?: boolean; isDark?: boolean }) => {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const orderRef = useRef([0, 1, 2]);
  const animRef  = useRef(false);
  const readyRef = useRef(false);
  const mouseRef = useRef({ tx: 0, ty: 0, lx: 0, ly: 0 });
  const rafRef   = useRef(0);
  const [topIdx, setTopIdx] = useState(0);
  const [dotsVisible, setDotsVisible] = useState(false);

  useEffect(() => {
    CARD_DATA.forEach((_, idx) => {
      const el = cardRefs.current[idx];
      if (!el) return;
      el.style.opacity   = "0";
      el.style.transform = `${getT(idx, 0, 0)} translateY(60px)`;
      el.style.transition = "none";
    });

    const delays = [900, 1050, 1180];
    const timers = CARD_DATA.map((_, idx) => {
      return setTimeout(() => {
        const el = cardRefs.current[idx];
        if (!el) return;
        el.style.transition = "opacity 0.75s ease, transform 1s cubic-bezier(0.34,1.4,0.64,1)";
        el.style.opacity   = "1";
        el.style.transform = getT(idx, 0, 0);
      }, delays[idx]);
    });

    const readyTimer = setTimeout(() => {
      CARD_DATA.forEach((_, idx) => {
        const el = cardRefs.current[idx];
        if (el) el.style.transition = "";
      });
      readyRef.current = true;
      setDotsVisible(true);
    }, 2450);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(readyTimer);
    };
  }, []); // eslint-disable-line

  useEffect(() => {
    if (mobile) return;
    const onMove = (e: MouseEvent) => {
      mouseRef.current.tx = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouseRef.current.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove);

    const raf = () => {
      const m = mouseRef.current;
      m.lx += (m.tx - m.lx) * 0.07;
      m.ly += (m.ty - m.ly) * 0.07;
      if (readyRef.current && !animRef.current) {
        orderRef.current.forEach((ci, pos) => {
          const el = cardRefs.current[ci];
          if (el) el.style.transform = getT(pos, m.lx, m.ly);
        });
      }
      rafRef.current = requestAnimationFrame(raf);
    };
    rafRef.current = requestAnimationFrame(raf);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [mobile]);

  const flipToFront = (targetIdx: number) => {
    if (animRef.current || !readyRef.current) return;
    const currentPos = orderRef.current.indexOf(targetIdx);
    if (currentPos === 0) return;
    animRef.current = true;
    const card = cardRefs.current[targetIdx];
    if (!card) return;
    const { lx, ly } = mouseRef.current;
    const newOrder = [...orderRef.current];
    newOrder.splice(currentPos, 1);
    newOrder.unshift(targetIdx);

    const anim = card.animate(
      [
        { transform: getT(currentPos, lx, ly) },
        { transform: `translateZ(200px) translateX(-8px) translateY(-20px) rotateY(180deg)`,  offset: 0.35 },
        { transform: `translateZ(195px) translateX(-4px) translateY(-10px) rotateY(360deg)`,  offset: 0.72 },
        { transform: getT(0, lx, ly) },
      ],
      { duration: 1500, fill: "forwards", easing: "cubic-bezier(0.25,0.8,0.25,1)" }
    );

    setTimeout(() => {
      orderRef.current.filter(ci => ci !== targetIdx).forEach(ci => {
        const c = cardRefs.current[ci];
        if (!c) return;
        c.style.transition = "transform 1.1s cubic-bezier(0.34,1.2,0.64,1)";
        c.style.transform  = getT(newOrder.indexOf(ci), lx, ly);
      });
    }, 260);

    anim.onfinish = () => {
      newOrder.forEach((ci, pos) => {
        const c = cardRefs.current[ci];
        if (!c) return;
        c.style.transition = "";
        c.style.transform  = getT(pos, lx, ly);
      });
      anim.cancel();
      orderRef.current = newOrder;
      setTopIdx(targetIdx);
      animRef.current = false;
    };
  };

  const W = mobile ? 272 : 300;
  const H = mobile ? 355 : 380;

  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:16 }}>
      <div style={{ width: W + 56, height: H + 48, position:"relative", perspective:1200, transformStyle:"preserve-3d" }}>
        {CARD_DATA.map((card, idx) => (
          <div
            key={card.id}
            ref={el => { cardRefs.current[idx] = el; }}
            onClick={() => flipToFront(idx)}
            style={{ position:"absolute", width:W, height:H, borderRadius:20, cursor:"pointer", willChange:"transform" }}
          >
            {/* Front */}
            <div style={{
              position:"absolute", inset:0, borderRadius:20,
              background: isDark ? card.bgDark : card.bgLight,
              backfaceVisibility:"hidden", WebkitBackfaceVisibility:"hidden",
              padding:24,
              display:"flex", flexDirection:"column", justifyContent:"space-between",
              border: isDark
                ? "1px solid rgba(99,102,241,0.22)"
                : `1px solid ${card.accent}55`,
              boxShadow: isDark
                ? "-18px 18px 48px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,0,0,0.2), 0 0 40px rgba(99,102,241,0.07)"
                : `-22px 24px 52px rgba(0,0,0,0.38), 0 0 0 1px rgba(0,0,0,0.1), 8px -4px 28px rgba(0,0,0,0.12), 0 0 44px ${card.accent}18`,
            }}>
              <div>
                <div style={{ fontSize:8, fontWeight:700, letterSpacing:"0.13em", textTransform:"uppercase", color:card.accent, display:"flex", alignItems:"center", gap:5, fontFamily:FONT_BODY }}>
                  <span style={{ width:5, height:5, background:card.accent, borderRadius:"50%", display:"inline-block", flexShrink:0 }} />
                  {card.tag}
                </div>
                <div style={{ width:"100%", height:130, borderRadius:12, background:`${card.accent}0f`, border:`1px solid ${card.accent}28`, marginTop:14, overflow:"hidden", padding:13 }}>
                  {card.id === 0 && (
                    <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                      <div style={{ borderRadius:"9px 9px 9px 2px", padding:"7px 11px", fontSize:8.5, maxWidth:"85%", background:"rgba(99,102,241,0.18)", color:"rgba(139,142,255,0.9)", fontFamily:FONT_BODY }}>Hey! Let me break this into 3 key points...</div>
                      <div style={{ borderRadius:"9px 9px 2px 9px", padding:"7px 11px", fontSize:8.5, background:"rgba(255,255,255,0.06)", color:"rgba(255,255,255,0.4)", marginLeft:"auto", fontFamily:FONT_BODY }}>Can you simplify?</div>
                      <div style={{ display:"flex", gap:4 }}>
                        {["Explain more","Example"].map(t => <span key={t} style={{ border:"1px solid rgba(99,102,241,0.3)", borderRadius:100, padding:"2px 8px", fontSize:7.5, color:"rgba(99,102,241,0.65)", fontFamily:FONT_BODY }}>{t}</span>)}
                      </div>
                    </div>
                  )}
                  {card.id === 1 && (
                    <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                      {[["68%","rgba(3,165,82,0.8)"],["50%","rgba(255,255,255,0.12)"],["82%","rgba(255,255,255,0.12)"],["44%","rgba(3,165,82,0.5)"]].map(([w,c],i) => (
                        <div key={i} style={{ display:"flex", alignItems:"center", gap:8 }}>
                          <div style={{ width:6, height:6, borderRadius:"50%", background:c, flexShrink:0 }} />
                          <div style={{ height:6, borderRadius:3, background:"rgba(255,255,255,0.1)", width:w }} />
                        </div>
                      ))}
                    </div>
                  )}
                  {card.id === 2 && (
                    <div>
                      <div style={{ display:"flex", alignItems:"flex-end", gap:5, height:80, paddingBottom:4 }}>
                        {[45,62,80,95,70,100].map((h,i) => <div key={i} style={{ flex:1, background:`rgba(245,158,11,${0.12+i*0.09})`, borderRadius:"3px 3px 0 0", height:`${h}%` }} />)}
                      </div>
                      <div style={{ fontSize:7, color:"rgba(245,158,11,0.5)", letterSpacing:"0.08em", fontFamily:FONT_BODY, marginTop:5 }}>STEEL MARKET INTELLIGENCE</div>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <div style={{ fontSize:13.5, fontWeight:700, lineHeight:1.35, color:"#fff", fontFamily:FONT_DISPLAY }}>{card.title}</div>
                <div style={{ fontSize:card.metricSize, fontWeight:800, color:card.accent, lineHeight:1, marginTop:9, fontFamily:FONT_DISPLAY }}>{card.metric}</div>
                <div style={{ fontSize:8.5, fontWeight:400, color:"rgba(255,255,255,0.42)", marginTop:4, fontFamily:FONT_BODY }}>{card.sub}</div>
              </div>
            </div>
            {/* Back */}
            <div style={{
              position:"absolute", inset:0, borderRadius:20,
              background:"linear-gradient(145deg,#111120,#0c0c15)",
              backfaceVisibility:"hidden", WebkitBackfaceVisibility:"hidden",
              transform:"rotateY(180deg)",
              display:"flex", alignItems:"center", justifyContent:"center",
              border:"1px solid rgba(99,102,241,0.18)",
            }}>
              <span style={{ fontSize:30, fontWeight:900, letterSpacing:"-0.03em", color:"rgba(99,102,241,0.28)", fontFamily:FONT_DISPLAY }}>DM</span>
            </div>
          </div>
        ))}
      </div>

      {/* Dot nav */}
      <div style={{ display:"flex", alignItems:"center", gap:8, opacity: dotsVisible ? 1 : 0, transition:"opacity 0.6s ease" }}>
        <div style={{ display:"flex", gap:6 }}>
          {CARD_DATA.map((_, i) => (
            <div key={i} onClick={() => flipToFront(i)} style={{ width:7, height:7, borderRadius:"50%", background: topIdx === i ? "#6366f1" : "rgba(99,102,241,0.25)", border:"1px solid rgba(99,102,241,0.45)", cursor:"pointer", transition:"background 0.3s" }} />
          ))}
        </div>
        <span style={{ fontSize:8, letterSpacing:"0.15em", textTransform:"uppercase", color:"rgba(255,255,255,0.22)", fontFamily:FONT_BODY }}>click to explore</span>
      </div>
    </div>
  );
};

// ── Hero ──────────────────────────────────────────────────────────────────────
const Hero = () => {
  const isDark = useDarkMode();
  const name1  = useScramble("DEEPAK", 80);
  const name2  = useScramble("MAAN.",  320);

  const [lineReveal, setLineReveal] = useState(false);
  const [roleReveal, setRoleReveal] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setLineReveal(true), 1600);
    const t2 = setTimeout(() => setRoleReveal(true), 1700);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <>
      <section className="w-full hero-section" style={{ background:"hsl(var(--background))", position:"relative", overflow:"hidden" }}>

        <div className={`hero-dot-grid ${isDark ? "hero-dot-grid--dark" : "hero-dot-grid--light"}`} aria-hidden="true" />
        <div className={`hero-glow ${isDark ? "hero-glow--dark" : "hero-glow--light"}`} aria-hidden="true" />

        <div className="max-w-site mx-auto px-5 md:px-6 lg:px-8 border-b border-border" style={{ position:"relative", zIndex:1 }}>
          <div className="hero-grid">

            {/* LEFT */}
            <div className="hero-left flex flex-col justify-center pt-0 pb-8 md:py-14 md:pr-8">

              <p className="hero-eyebrow" style={{ fontFamily:FONT_BODY, fontSize:9, fontWeight:700, letterSpacing:"0.2em", textTransform:"uppercase", color:"#6366f1", marginBottom:18 }}>
                Available · India / Remote
              </p>

              <div style={{ marginBottom:12 }}>
                <span style={{ display:"block", fontFamily:FONT_DISPLAY, fontSize:"clamp(38px,5.5vw,76px)", fontWeight:800, letterSpacing:"-0.025em", lineHeight:1, color:"hsl(var(--foreground))" }}>
                  {name1}
                </span>
                <span style={{ display:"block", fontFamily:FONT_DISPLAY, fontSize:"clamp(38px,5.5vw,76px)", fontWeight:800, letterSpacing:"-0.025em", lineHeight:1, color:"#6366f1" }}>
                  {name2}
                </span>
              </div>

              <div className="hero-role-row" style={{ display:"flex", alignItems:"center", gap:14, marginBottom:24 }}>
                <div
                  className="hero-role-line"
                  style={{ height:2, background:"#6366f1", borderRadius:2, flexShrink:0, width: lineReveal ? 60 : 0, transition:"width 0.7s cubic-bezier(0.16,1,0.3,1)" }}
                />
                <span style={{
                  fontFamily:FONT_BODY, fontSize:"clamp(11px,1.2vw,14px)", fontWeight:400,
                  letterSpacing:"0.2em", textTransform:"uppercase",
                  color:"hsl(var(--muted-foreground))",
                  clipPath: roleReveal ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)",
                  transition:"clip-path 0.9s cubic-bezier(0.16,1,0.3,1)",
                  whiteSpace:"nowrap",
                }}>
                  Product Designer
                </span>
              </div>

              <p style={{ fontFamily:FONT_BODY, fontSize:"clamp(12px,1.1vw,13.5px)", fontWeight:400, lineHeight:1.9, color:"hsl(var(--muted-foreground))", maxWidth:"88%", marginBottom:30 }}>
                I research what's actually breaking, design what actually fixes it,
                and use AI to do it faster — without cutting corners on the thinking.
              </p>

              {/* ── CTA BUTTONS ── */}
              <div className="hero-btns flex flex-wrap items-center gap-2.5">

                {/* PRIMARY: solid indigo fill — unmissable */}
                <a
                  href="#work"
                  className="inline-flex items-center justify-center rounded-full transition-all"
                  style={{
                    fontFamily:FONT_BODY, fontSize:12, fontWeight:600,
                    padding:"11px 24px",
                    background:"#6366f1",
                    color:"#ffffff",
                    textDecoration:"none",
                    transition:"background 0.2s, transform 0.2s",
                  }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background="#4f46e5"; el.style.transform="translateY(-1px)"; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background="#6366f1"; el.style.transform="translateY(0)"; }}
                >
                  View Work ↓
                </a>

                {/* SECONDARY: indigo-tinted border — visible but clearly secondary */}
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-full transition-all duration-200"
                  style={{
                    fontFamily:FONT_BODY, fontSize:12, fontWeight:500,
                    padding:"11px 24px",
                    border:"1.5px solid rgba(99,102,241,0.45)",
                    color:"hsl(var(--foreground))",
                    background:"transparent",
                    textDecoration:"none",
                    transition:"background 0.2s, color 0.2s, border-color 0.2s",
                  }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background="#6366f1"; el.style.color="#ffffff"; el.style.borderColor="#6366f1"; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background="transparent"; el.style.color="hsl(var(--foreground))"; el.style.borderColor="rgba(99,102,241,0.45)"; }}
                >
                  Let's Talk
                </a>
              </div>
            </div>

            {/* RIGHT — desktop only */}
            <div className="hero-right-desktop" style={{ position:"relative", zIndex:1 }}>
              <CardScene isDark={isDark} />
            </div>

          </div>
        </div>

        {/* Mobile card scene */}
        <div className="hero-mobile-cards" style={{ position:"relative", zIndex:1 }}>
          <CardScene mobile isDark={isDark} />
        </div>

        {/* Scroll cue */}
        <div className="flex flex-col items-center gap-[4px] py-2 max-w-site mx-auto" style={{ position:"relative", zIndex:1 }}>
          <div className="w-px h-5" style={{ background:"hsl(var(--border))", animation:"scrollGrow 2s ease-in-out infinite" }} />
          <span style={{ fontFamily:FONT_BODY, fontSize:9, letterSpacing:"0.12em", textTransform:"uppercase", color:"hsl(var(--muted-foreground))", opacity:0.4 }}>
            Scroll to explore
          </span>
        </div>

      </section>

      <style>{`
        .hero-section { padding-top: 48px; }
        @media (min-width: 768px) { .hero-section { padding-top: 72px; } }

        .hero-grid { display: grid; grid-template-columns: 1fr; }
        @media (min-width: 768px) { .hero-grid { grid-template-columns: 54fr 46fr; } }

        .hero-right-desktop { display: none; }
        @media (min-width: 768px) {
          .hero-right-desktop {
            display: flex; align-items: center; justify-content: flex-end; padding: 40px 0;
          }
        }

        .hero-mobile-cards {
          display: flex; justify-content: center; align-items: center;
          padding: 20px 0 8px; overflow: visible;
        }
        @media (min-width: 768px) { .hero-mobile-cards { display: none !important; } }

        @media (max-width: 767px) {
          .hero-left { align-items: center; text-align: center; }
          .hero-eyebrow { text-align: center; }
          .hero-btns { justify-content: center; }
          .hero-role-row { justify-content: center; }
          .hero-role-line { display: none; }
        }

        .hero-dot-grid {
          position: absolute; inset: 0; pointer-events: none; z-index: 0;
          background-size: 36px 36px;
          -webkit-mask-image: radial-gradient(ellipse 78% 78% at 50% 45%, black 10%, transparent 72%);
          mask-image: radial-gradient(ellipse 78% 78% at 50% 45%, black 10%, transparent 72%);
        }
        .hero-dot-grid--dark  { background-image: radial-gradient(circle, rgba(99,102,241,0.22) 1px, transparent 1px); }
        .hero-dot-grid--light { background-image: radial-gradient(circle, rgba(99,102,241,0.14) 1px, transparent 1px); }

        .hero-glow {
          position: absolute; right: 4%; top: 8%;
          width: 460px; height: 460px; border-radius: 50%; pointer-events: none; z-index: 0;
        }
        .hero-glow--dark  { background: radial-gradient(circle, rgba(99,102,241,0.09) 0%, transparent 70%); }
        .hero-glow--light { background: radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 65%); }

        :root:not(.dark) .hero-card-front {
          box-shadow: -14px 18px 44px rgba(0,0,0,0.32), 0 0 0 1px rgba(0,0,0,0.16) !important;
          border-color: rgba(99,102,241,0.35) !important;
        }

        @keyframes scrollGrow {
          0%,100% { transform: scaleY(0.2); opacity: 0.3; }
          50%     { transform: scaleY(1);   opacity: 1; }
        }
      `}</style>
    </>
  );
};

export default Hero;
