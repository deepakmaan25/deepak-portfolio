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
        setText(
          final.split("").map((c, i) =>
            i < done ? c : CH[Math.floor(Math.random() * CH.length)]
          ).join("")
        );
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

// ── Counter ───────────────────────────────────────────────────────────────────
const useCounter = (target: number, decimals: number, delay: number, active: boolean) => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    const tid = setTimeout(() => {
      const duration = 1800, start = performance.now();
      const animate = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased    = 1 - Math.pow(1 - progress, 3);
        setValue(parseFloat((target * eased).toFixed(decimals)));
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }, delay);
    return () => clearTimeout(tid);
  }, [target, decimals, delay, active]);
  return value;
};

// ── 3D helpers ────────────────────────────────────────────────────────────────
const getT = (pos: number, lx: number, ly: number) => {
  if (pos === 0) return `translateZ(70px) rotateY(${-8 + lx * 15}deg) rotateX(${-ly * 10}deg)`;
  if (pos === 1) return `translateZ(25px) translateX(22px) translateY(18px) rotateY(${-5 + lx * 9}deg) rotateX(${-ly * 7}deg) rotateZ(-2deg)`;
  return `translateZ(-20px) translateX(44px) translateY(36px) rotateY(${-2 + lx * 4}deg) rotateX(${-ly * 3}deg) rotateZ(-4deg)`;
};

// ── Card data ─────────────────────────────────────────────────────────────────
const CARD_DATA = [
  { id:0, accent:"#6366f1", bg:"linear-gradient(145deg,#1a1a2e,#141418)", tag:"Product Design · Mobile",    metric:"40%",     metricSize:24, title:"Zu-AI — Chat Experience Redesign", sub:"Faster Scanning · 100K+ Students"   },
  { id:1, accent:"#03a552", bg:"linear-gradient(145deg,#0f1f1a,#141418)", tag:"UX Research · Web Platform", metric:"80%",     metricSize:24, title:"Tech Japan — Platform Redesign",   sub:"Improved Navigation · IIT Students" },
  { id:2, accent:"#f59e0b", bg:"linear-gradient(145deg,#1a1520,#141418)", tag:"Design Analytics · Data",    metric:"Power BI",metricSize:15, title:"JSW Steel — Data Design",           sub:"CMO Intelligence · Market Analysis" },
];

// ── Card Scene ────────────────────────────────────────────────────────────────
const CardScene = () => {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const orderRef = useRef([0, 1, 2]);
  const animRef  = useRef(false);
  const mouseRef = useRef({ tx: 0, ty: 0, lx: 0, ly: 0 });
  const rafRef   = useRef(0);
  const [topIdx,  setTopIdx]  = useState(0);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 60);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current.tx = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouseRef.current.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove);
    const raf = () => {
      const m = mouseRef.current;
      m.lx += (m.tx - m.lx) * 0.07;
      m.ly += (m.ty - m.ly) * 0.07;
      if (!animRef.current) {
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
  }, []);

  const flipToFront = (targetIdx: number) => {
    if (animRef.current) return;
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
        { transform: `translateZ(170px) translateX(-8px) translateY(-18px) rotateY(180deg)`, offset: 0.35 },
        { transform: `translateZ(165px) translateX(-4px) translateY(-10px) rotateY(360deg)`, offset: 0.72 },
        { transform: getT(0, lx, ly) },
      ],
      { duration: 1500, fill: "forwards", easing: "cubic-bezier(0.25,0.8,0.25,1)" }
    );

    const others = orderRef.current.filter(ci => ci !== targetIdx);
    setTimeout(() => {
      others.forEach(ci => {
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

  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:16 }}>
      <div style={{ width:290, height:370, position:"relative", perspective:1200, transformStyle:"preserve-3d" }}>
        {CARD_DATA.map((card, idx) => {
          const delay = [0.9, 1.05, 1.18][idx];
          return (
            <div key={card.id} ref={el => { cardRefs.current[idx] = el; }} onClick={() => flipToFront(idx)}
              style={{ position:"absolute", width:270, height:348, borderRadius:20, border:"1px solid rgba(99,102,241,0.28)", overflow:"hidden", cursor: orderRef.current.indexOf(idx) > 0 ? "pointer" : "default", willChange:"transform", opacity: entered ? 1 : 0, transform: entered ? getT(idx, 0, 0) : "translateZ(0) translateY(60px)", transition: entered ? `opacity 0.8s ease ${delay}s, transform 0.9s cubic-bezier(0.34,1.4,0.64,1) ${delay}s` : "none" }}>
              {/* Front */}
              <div style={{ position:"absolute", inset:0, borderRadius:20, background:card.bg, backfaceVisibility:"hidden", WebkitBackfaceVisibility:"hidden", boxShadow: idx === 0 ? "-22px 22px 56px rgba(0,0,0,0.75),0 0 50px rgba(99,102,241,0.1)" : "-14px 14px 36px rgba(0,0,0,0.65)", padding:22, display:"flex", flexDirection:"column", justifyContent:"space-between" }}>
                <div>
                  <div style={{ fontSize:8, fontWeight:700, letterSpacing:"0.13em", textTransform:"uppercase", color:card.accent, display:"flex", alignItems:"center", gap:5, fontFamily:FONT_BODY }}>
                    <span style={{ width:5, height:5, background:card.accent, borderRadius:"50%", display:"inline-block" }} />{card.tag}
                  </div>
                  <div style={{ width:"100%", height:116, borderRadius:10, background:`${card.accent}0f`, border:`1px solid ${card.accent}22`, marginTop:12, overflow:"hidden", padding:11 }}>
                    {card.id === 0 && (
                      <div style={{ display:"flex", flexDirection:"column", gap:7 }}>
                        <div style={{ borderRadius:"9px 9px 9px 2px", padding:"6px 10px", fontSize:8, maxWidth:"85%", background:"rgba(99,102,241,0.18)", color:"rgba(139,142,255,0.9)", fontFamily:FONT_BODY }}>Hey! Let me break this into 3 key points...</div>
                        <div style={{ borderRadius:"9px 9px 2px 9px", padding:"6px 10px", fontSize:8, background:"rgba(255,255,255,0.06)", color:"rgba(255,255,255,0.4)", marginLeft:"auto", fontFamily:FONT_BODY }}>Can you simplify?</div>
                        <div style={{ display:"flex", gap:3 }}>
                          {["Explain more","Example"].map(t => <span key={t} style={{ border:"1px solid rgba(99,102,241,0.3)", borderRadius:100, padding:"2px 7px", fontSize:7, color:"rgba(99,102,241,0.65)", fontFamily:FONT_BODY }}>{t}</span>)}
                        </div>
                      </div>
                    )}
                    {card.id === 1 && (
                      <div style={{ display:"flex", flexDirection:"column", gap:9 }}>
                        {[["68%","rgba(3,165,82,0.8)"],["50%","rgba(255,255,255,0.12)"],["82%","rgba(255,255,255,0.12)"],["44%","rgba(3,165,82,0.5)"]].map(([w,c],i) => (
                          <div key={i} style={{ display:"flex", alignItems:"center", gap:7 }}>
                            <div style={{ width:6,height:6,borderRadius:"50%",background:c,flexShrink:0 }} />
                            <div style={{ height:6,borderRadius:3,background:"rgba(255,255,255,0.1)",width:w }} />
                          </div>
                        ))}
                      </div>
                    )}
                    {card.id === 2 && (
                      <div>
                        <div style={{ display:"flex", alignItems:"flex-end", gap:5, height:70, paddingBottom:4 }}>
                          {[45,62,80,95,70,100].map((h,i) => <div key={i} style={{ flex:1, background:`rgba(245,158,11,${0.1+i*0.08})`, borderRadius:"3px 3px 0 0", height:`${h}%` }} />)}
                        </div>
                        <div style={{ fontSize:7, color:"rgba(245,158,11,0.5)", letterSpacing:"0.08em", fontFamily:FONT_BODY, marginTop:4 }}>STEEL MARKET INTELLIGENCE</div>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize:13, fontWeight:700, lineHeight:1.35, color:"#fff", fontFamily:FONT_DISPLAY }}>{card.title}</div>
                  <div style={{ fontSize:card.metricSize, fontWeight:800, color:card.accent, lineHeight:1, marginTop:7, fontFamily:FONT_DISPLAY }}>{card.metric}</div>
                  <div style={{ fontSize:8, fontWeight:400, color:"rgba(255,255,255,0.42)", marginTop:3, fontFamily:FONT_BODY }}>{card.sub}</div>
                </div>
              </div>
              {/* Back */}
              <div style={{ position:"absolute", inset:0, borderRadius:20, background:"linear-gradient(145deg,#111120,#0c0c15)", backfaceVisibility:"hidden", WebkitBackfaceVisibility:"hidden", transform:"rotateY(180deg)", display:"flex", alignItems:"center", justifyContent:"center", border:"1px solid rgba(99,102,241,0.15)" }}>
                <span style={{ fontSize:28, fontWeight:900, letterSpacing:"-0.03em", color:"rgba(99,102,241,0.25)", fontFamily:FONT_DISPLAY }}>DM</span>
              </div>
            </div>
          );
        })}
      </div>
      {/* Dot nav */}
      <div style={{ display:"flex", alignItems:"center", gap:8, opacity: entered ? 1 : 0, transition:"opacity 0.6s ease 2.4s" }}>
        <div style={{ display:"flex", gap:5 }}>
          {CARD_DATA.map((_, i) => (
            <div key={i} onClick={() => flipToFront(i)} style={{ width:7, height:7, borderRadius:"50%", background: topIdx === i ? "#6366f1" : "rgba(99,102,241,0.25)", border:"1px solid rgba(99,102,241,0.4)", cursor:"pointer", transition:"background 0.3s" }} />
          ))}
        </div>
        <span style={{ fontSize:8, letterSpacing:"0.15em", textTransform:"uppercase", color:"rgba(255,255,255,0.2)", fontFamily:FONT_BODY }}>click to explore</span>
      </div>
    </div>
  );
};

// ── Icons ─────────────────────────────────────────────────────────────────────
const IconShipped = ({ color }: { color: string }) => (
  <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
    <path d="M18 4 C18 4 26 8 26 18 L18 30 L10 18 C10 8 18 4 18 4Z" stroke={color} strokeWidth="1.4" strokeLinejoin="round" fill="none" opacity="0.9"/>
    <circle cx="18" cy="16" r="2.5" stroke={color} strokeWidth="1.3" fill="none" opacity="0.7"/>
    <path d="M10 20 L6 26 L12 24" stroke={color} strokeWidth="1.2" strokeLinejoin="round" fill="none" opacity="0.6"/>
    <path d="M26 20 L30 26 L24 24" stroke={color} strokeWidth="1.2" strokeLinejoin="round" fill="none" opacity="0.6"/>
    <path d="M16 30 Q18 34 20 30" stroke={color} strokeWidth="1.1" strokeLinecap="round" fill="none" opacity="0.5"/>
  </svg>
);
const IconUsers = ({ color }: { color: string }) => (
  <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
    <circle cx="18" cy="11" r="4.5" stroke={color} strokeWidth="1.4" fill="none" opacity="0.9"/>
    <path d="M9 28 C9 22 27 22 27 28" stroke={color} strokeWidth="1.4" strokeLinecap="round" fill="none" opacity="0.9"/>
    <circle cx="9" cy="13" r="3" stroke={color} strokeWidth="1.2" fill="none" opacity="0.5"/>
    <path d="M3 27 C3 23 15 23 15 27" stroke={color} strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.45"/>
    <circle cx="27" cy="13" r="3" stroke={color} strokeWidth="1.2" fill="none" opacity="0.5"/>
    <path d="M21 27 C21 23 33 23 33 27" stroke={color} strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.45"/>
  </svg>
);
const IconMethods = ({ color }: { color: string }) => (
  <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
    <circle cx="18" cy="18" r="3" stroke={color} strokeWidth="1.4" fill="none" opacity="0.9"/>
    <circle cx="18" cy="7"  r="2" stroke={color} strokeWidth="1.2" fill="none" opacity="0.7"/>
    <circle cx="18" cy="29" r="2" stroke={color} strokeWidth="1.2" fill="none" opacity="0.7"/>
    <circle cx="7"  cy="18" r="2" stroke={color} strokeWidth="1.2" fill="none" opacity="0.7"/>
    <circle cx="29" cy="18" r="2" stroke={color} strokeWidth="1.2" fill="none" opacity="0.7"/>
    <circle cx="10" cy="10" r="1.8" stroke={color} strokeWidth="1.1" fill="none" opacity="0.5"/>
    <circle cx="26" cy="10" r="1.8" stroke={color} strokeWidth="1.1" fill="none" opacity="0.5"/>
    <circle cx="10" cy="26" r="1.8" stroke={color} strokeWidth="1.1" fill="none" opacity="0.5"/>
    <circle cx="26" cy="26" r="1.8" stroke={color} strokeWidth="1.1" fill="none" opacity="0.5"/>
    <line x1="18" y1="15" x2="18" y2="9"  stroke={color} strokeWidth="1.1" opacity="0.4"/>
    <line x1="18" y1="21" x2="18" y2="27" stroke={color} strokeWidth="1.1" opacity="0.4"/>
    <line x1="15" y1="18" x2="9"  y2="18" stroke={color} strokeWidth="1.1" opacity="0.4"/>
    <line x1="21" y1="18" x2="27" y2="18" stroke={color} strokeWidth="1.1" opacity="0.4"/>
    <line x1="15.8" y1="15.8" x2="11.5" y2="11.5" stroke={color} strokeWidth="1" opacity="0.35"/>
    <line x1="20.2" y1="15.8" x2="24.5" y2="11.5" stroke={color} strokeWidth="1" opacity="0.35"/>
    <line x1="15.8" y1="20.2" x2="11.5" y2="24.5" stroke={color} strokeWidth="1" opacity="0.35"/>
    <line x1="20.2" y1="20.2" x2="24.5" y2="24.5" stroke={color} strokeWidth="1" opacity="0.35"/>
  </svg>
);

// ── Stat meta ─────────────────────────────────────────────────────────────────
const statsMeta = [
  { target:12, decimals:0, delay:0,   suffix:"+", label:"Projects shipped",  sub:"UX · Product · Branding",        Icon:IconShipped, accentLight:"#6366f1", accentDark:"#818cf8", bgLight:"rgba(99,102,241,0.025)",  bgDark:"rgba(99,102,241,0.06)",  borderLight:"rgba(0,0,0,0.055)",  borderDark:"rgba(255,255,255,0.07)" },
  { target:33, decimals:0, delay:100, suffix:"+", label:"Users researched",  sub:"Interviews · Surveys · Tests",   Icon:IconUsers,   accentLight:"#a855f7", accentDark:"#c084fc", bgLight:"rgba(168,85,247,0.025)", bgDark:"rgba(168,85,247,0.06)", borderLight:"rgba(0,0,0,0.055)",  borderDark:"rgba(255,255,255,0.07)" },
  { target:8,  decimals:0, delay:200, suffix:"+", label:"Research methods",  sub:"Contextual · Affinity · MoSCoW", Icon:IconMethods, accentLight:"#0ea5e9", accentDark:"#38bdf8", bgLight:"rgba(14,165,233,0.025)",  bgDark:"rgba(14,165,233,0.06)",  borderLight:"rgba(0,0,0,0.055)",  borderDark:"rgba(255,255,255,0.07)" },
];

const allStatsMobile = [...statsMeta, ...statsMeta];
const MOBILE_CARD_W  = 200;
const MOBILE_GAP     = 10;
const mobileTotalW   = statsMeta.length * (MOBILE_CARD_W + MOBILE_GAP);

// ── Hero ──────────────────────────────────────────────────────────────────────
const Hero = () => {
  const isDark = useDarkMode();
  const name1  = useScramble("DEEPAK", 80);
  const name2  = useScramble("MAAN.",  320);

  const [lineReveal, setLineReveal] = useState(false);
  const [roleReveal, setRoleReveal] = useState(false);

  const statsRef = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);

  const v0 = useCounter(statsMeta[0].target, statsMeta[0].decimals, statsMeta[0].delay, statsVisible);
  const v1 = useCounter(statsMeta[1].target, statsMeta[1].decimals, statsMeta[1].delay, statsVisible);
  const v2 = useCounter(statsMeta[2].target, statsMeta[2].decimals, statsMeta[2].delay, statsVisible);
  const values = [v0, v1, v2];

  useEffect(() => {
    const t1 = setTimeout(() => setLineReveal(true), 1600);
    const t2 = setTimeout(() => setRoleReveal(true), 1700);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsVisible(true); }, { threshold: 0.1 });
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  const renderStatCard = (s: typeof statsMeta[0], i: number, key: string | number) => {
    const accent = isDark ? s.accentDark : s.accentLight;
    const bg     = isDark ? s.bgDark     : s.bgLight;
    const border = isDark ? s.borderDark : s.borderLight;
    return (
      <div key={key}
        style={{ padding:"14px 16px", borderRadius:12, background:bg, border:`1px solid ${border}`, boxShadow: isDark ? "0 1px 4px rgba(0,0,0,0.25)" : "0 1px 3px rgba(0,0,0,0.05),0 3px 10px rgba(0,0,0,0.03)", transition:"border-color 0.2s,box-shadow 0.2s,transform 0.22s cubic-bezier(0.16,1,0.3,1)", cursor:"default", display:"flex", alignItems:"center", gap:12 }}
        onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.10)"; el.style.boxShadow = isDark ? "0 2px 10px rgba(0,0,0,0.38)" : "0 2px 8px rgba(0,0,0,0.07),0 6px 18px rgba(0,0,0,0.04)"; el.style.transform = "translateY(-2px)"; }}
        onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = border; el.style.boxShadow = isDark ? "0 1px 4px rgba(0,0,0,0.25)" : "0 1px 3px rgba(0,0,0,0.05),0 3px 10px rgba(0,0,0,0.03)"; el.style.transform = "translateY(0)"; }}
      >
        <div style={{ flexShrink:0, width:40, height:40, display:"flex", alignItems:"center", justifyContent:"center", background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.025)", borderRadius:10, border:`1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)"}` }}>
          <s.Icon color={accent} />
        </div>
        <div style={{ width:1, alignSelf:"stretch", background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)", flexShrink:0 }} />
        <div style={{ minWidth:0, flex:1 }}>
          <div style={{ fontFamily:FONT_DISPLAY, fontSize:"clamp(18px,2vw,24px)", fontWeight:300, fontVariantNumeric:"tabular-nums", letterSpacing:"-0.04em", lineHeight:1, color:"hsl(var(--foreground))", marginBottom:4 }}>
            {values[i]}<span style={{ fontSize:"0.44em", fontWeight:700, color:accent, marginLeft:1 }}>{s.suffix}</span>
          </div>
          <div style={{ fontFamily:FONT_BODY, fontSize:11, fontWeight:600, color:"hsl(var(--foreground))", lineHeight:1.3, marginBottom:2, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{s.label}</div>
          <div style={{ fontFamily:FONT_BODY, fontSize:9.5, fontWeight:400, color:"hsl(var(--muted-foreground))", lineHeight:1.4, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{s.sub}</div>
        </div>
      </div>
    );
  };

  return (
    <>
      <section className="w-full hero-section" style={{ background:"hsl(var(--background))" }}>

        <div className="max-w-site mx-auto px-5 md:px-6 lg:px-8 border-b border-border">
          <div className="grid grid-cols-1 md:grid-cols-[54fr_46fr]">

            {/* LEFT */}
            <div className="flex flex-col justify-center pt-0 pb-8 md:py-14 md:pr-8">
              <p style={{ fontFamily:FONT_BODY, fontSize:9, fontWeight:700, letterSpacing:"0.2em", textTransform:"uppercase", color:"#6366f1", marginBottom:18 }}>
                Available · India / Remote
              </p>
              <div style={{ marginBottom:10 }}>
                <span style={{ display:"block", fontFamily:FONT_DISPLAY, fontSize:"clamp(38px,5.5vw,72px)", fontWeight:800, letterSpacing:"-0.025em", lineHeight:1, color:"hsl(var(--foreground))" }}>{name1}</span>
                <span style={{ display:"block", fontFamily:FONT_DISPLAY, fontSize:"clamp(38px,5.5vw,72px)", fontWeight:800, letterSpacing:"-0.025em", lineHeight:1, color:"#6366f1" }}>{name2}</span>
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:22 }}>
                <div style={{ height:2, background:"#6366f1", borderRadius:2, flexShrink:0, width: lineReveal ? 60 : 0, transition:"width 0.7s cubic-bezier(0.16,1,0.3,1)" }} />
                <span style={{ fontFamily:FONT_BODY, fontSize:"clamp(11px,1.2vw,14px)", fontWeight:400, letterSpacing:"0.2em", textTransform:"uppercase", color:"hsl(var(--muted-foreground))", clipPath: roleReveal ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)", transition:"clip-path 0.9s cubic-bezier(0.16,1,0.3,1)", whiteSpace:"nowrap" }}>
                  Product Designer
                </span>
              </div>
              <p style={{ fontFamily:FONT_BODY, fontSize:"clamp(12px,1.1vw,13.5px)", fontWeight:400, lineHeight:1.85, color:"hsl(var(--muted-foreground))", maxWidth:"88%", marginBottom:28 }}>
                I research what's actually breaking, design what actually fixes it,
                and use AI to do it faster — without cutting corners on the thinking.
              </p>
              <div className="flex flex-wrap items-center gap-2.5">
                <a href="#work" className="inline-flex items-center justify-center rounded-full transition-all hover:-translate-y-[1px]"
                  style={{ fontFamily:FONT_BODY, fontSize:12, fontWeight:500, padding:"10px 22px", background:"hsl(var(--foreground))", color:"hsl(var(--primary-foreground))", textDecoration:"none" }}>
                  View Work ↓
                </a>
                <a href="#contact" className="inline-flex items-center justify-center rounded-full transition-all duration-200"
                  style={{ fontFamily:FONT_BODY, fontSize:12, fontWeight:500, padding:"10px 22px", border:"1.5px solid hsl(var(--border))", color:"hsl(var(--foreground))", background:"transparent", textDecoration:"none" }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background="hsl(var(--foreground))"; el.style.color="hsl(var(--primary-foreground))"; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background="transparent"; el.style.color="hsl(var(--foreground))"; }}>
                  Let's Talk
                </a>
              </div>
            </div>

            {/* RIGHT — desktop only */}
            <div className="hidden md:flex items-center justify-end py-8">
              <CardScene />
            </div>

          </div>
        </div>

        {/* Stats */}
        <div ref={statsRef}>
          <div className="hidden md:block max-w-site mx-auto" style={{ padding:"12px clamp(20px,5vw,32px)" }}>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10 }}>
              {statsMeta.map((s, i) => renderStatCard(s, i, s.label))}
            </div>
          </div>
          <div className="md:hidden" style={{ padding:"12px 0", overflow:"hidden", position:"relative" }}>
            <div style={{ position:"absolute", left:0, top:0, bottom:0, width:20, zIndex:2, background:"linear-gradient(to right,hsl(var(--background)) 0%,transparent 100%)", pointerEvents:"none" }} />
            <div style={{ position:"absolute", right:0, top:0, bottom:0, width:20, zIndex:2, background:"linear-gradient(to left,hsl(var(--background)) 0%,transparent 100%)", pointerEvents:"none" }} />
            <div className="stats-mobile-marquee" style={{ display:"flex", gap:MOBILE_GAP, width:"max-content", paddingLeft:20, animation:`statsMobileScroll ${statsMeta.length * 3.5}s linear infinite` }}>
              {allStatsMobile.map((s, i) => {
                const accent = isDark ? s.accentDark : s.accentLight;
                const bg     = isDark ? s.bgDark     : s.bgLight;
                const border = isDark ? s.borderDark : s.borderLight;
                const vi     = i % statsMeta.length;
                return (
                  <div key={i} style={{ width:MOBILE_CARD_W, flexShrink:0, padding:"12px 14px", borderRadius:12, background:bg, border:`1px solid ${border}`, boxShadow: isDark ? "0 1px 4px rgba(0,0,0,0.25)" : "0 1px 3px rgba(0,0,0,0.05)", display:"flex", alignItems:"center", gap:10 }}>
                    <div style={{ flexShrink:0, width:36, height:36, display:"flex", alignItems:"center", justifyContent:"center", background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.025)", borderRadius:9, border:`1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)"}` }}>
                      <s.Icon color={accent} />
                    </div>
                    <div style={{ width:1, alignSelf:"stretch", background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)", flexShrink:0 }} />
                    <div style={{ minWidth:0 }}>
                      <div style={{ fontFamily:FONT_DISPLAY, fontSize:20, fontWeight:300, fontVariantNumeric:"tabular-nums", letterSpacing:"-0.04em", lineHeight:1, color:"hsl(var(--foreground))", marginBottom:3 }}>
                        {values[vi]}<span style={{ fontSize:"0.44em", fontWeight:700, color:accent, marginLeft:1 }}>{s.suffix}</span>
                      </div>
                      <div style={{ fontFamily:FONT_BODY, fontSize:10, fontWeight:600, color:"hsl(var(--foreground))", lineHeight:1.3, marginBottom:1, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{s.label}</div>
                      <div style={{ fontFamily:FONT_BODY, fontSize:9, fontWeight:400, color:"hsl(var(--muted-foreground))", lineHeight:1.4, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{s.sub}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="flex flex-col items-center gap-[4px] py-1.5 max-w-site mx-auto">
          <div className="w-px h-5" style={{ background:"hsl(var(--border))", animation:"scrollGrow 2s ease-in-out infinite" }} />
          <span style={{ fontFamily:FONT_BODY, fontSize:9, letterSpacing:"0.12em", textTransform:"uppercase", color:"hsl(var(--muted-foreground))", opacity:0.4 }}>Scroll to explore</span>
        </div>

      </section>

      <style>{`
        .hero-section { padding-top: 48px; }
        @media (min-width: 768px) { .hero-section { padding-top: 72px; } }
        @keyframes statsMobileScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-${mobileTotalW + MOBILE_GAP}px); }
        }
        .stats-mobile-marquee:hover { animation-play-state: paused; }
        @keyframes scrollGrow {
          0%,100% { transform: scaleY(0.2); opacity: 0.3; }
          50%     { transform: scaleY(1);   opacity: 1;   }
        }
      `}</style>
    </>
  );
};

export default Hero;
