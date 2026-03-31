import { useEffect, useRef, useState } from "react";

const FONT_BODY = "'Aileron', sans-serif";
const FONT_DISPLAY = "'Unbounded', sans-serif";

const roles = ["UX Researcher", "Interaction Designer", "AI Workflow Builder", "Product Designer", "Systems Thinker"];

const toolsConfig = [
  { label: "Figma",             ring: 1, angle: 0   },
  { label: "User Interviews",   ring: 1, angle: 130 },
  { label: "Usability Testing", ring: 1, angle: 250 },
  { label: "AI Workflows",      ring: 2, angle: 20  },
  { label: "Design Systems",    ring: 2, angle: 110 },
  { label: "Journey Mapping",   ring: 2, angle: 200 },
  { label: "Affinity Mapping",  ring: 2, angle: 295 },
  { label: "Prototyping",       ring: 2, angle: 160 },
];

const radii: Record<number, number> = { 1: 68, 2: 118 };
const speeds: Record<number, number> = { 1: 0.003, 2: -0.002 };

const useCounter = (target: number, decimals: number, delay: number, active: boolean) => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    const timeout = setTimeout(() => {
      const duration = 1800;
      const start = performance.now();
      const animate = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setValue(parseFloat((target * eased).toFixed(decimals)));
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }, delay);
    return () => clearTimeout(timeout);
  }, [target, decimals, delay, active]);
  return value;
};

const OrbitCanvas = () => {
  const anglesRef  = useRef(toolsConfig.map(t => (t.angle * Math.PI) / 180));
  const rafRef     = useRef<number>(0);
  const tagRefsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const cx = 150; const cy = 150;

  useEffect(() => {
    const animate = () => {
      anglesRef.current = anglesRef.current.map((a, i) => a + speeds[toolsConfig[i].ring]);
      tagRefsRef.current.forEach((el, i) => {
        if (!el) return;
        const r = radii[toolsConfig[i].ring];
        const a = anglesRef.current[i];
        el.style.left = `${cx + r * Math.cos(a)}px`;
        el.style.top  = `${cy + r * Math.sin(a)}px`;
      });
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div className="relative flex-shrink-0" aria-hidden="true" style={{ width: 300, height: 300 }}>
      {[{ size: 136, opacity: 0.2 }, { size: 236, opacity: 0.2 }, { size: 298, opacity: 0.07 }].map((ring, i) => (
        <div key={i} className="absolute rounded-full" aria-hidden="true"
          style={{ width: ring.size, height: ring.size, top: cy - ring.size / 2, left: cx - ring.size / 2, border: `1px dashed rgba(99,102,241,${ring.opacity})`, pointerEvents: "none" }} />
      ))}
      <div className="absolute rounded-full overflow-hidden"
        style={{ width: 76, height: 76, top: cy - 38, left: cx - 38, boxShadow: "0 0 0 5px rgba(99,102,241,0.08), 0 6px 24px rgba(99,102,241,0.2)", zIndex: 10 }}>
        <img src="/deepak.png" alt="Deepak Maan" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
      </div>
      {toolsConfig.map((t, i) => {
        const r = radii[t.ring];
        const a = (t.angle * Math.PI) / 180;
        return (
          <span key={t.label} ref={el => { tagRefsRef.current[i] = el; }}
            className="orbit-tag absolute rounded-full whitespace-nowrap cursor-default"
            style={{ left: cx + r * Math.cos(a), top: cy + r * Math.sin(a), transform: "translate(-50%,-50%)", fontFamily: FONT_BODY, fontSize: 10, fontWeight: 400, padding: "4px 10px", background: "hsl(var(--background))", border: "1px solid hsl(var(--border))", color: "hsl(var(--muted-foreground))", boxShadow: "0 2px 6px rgba(0,0,0,0.05)", zIndex: 5, transition: "background 0.2s, color 0.2s, border-color 0.2s" }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLSpanElement; el.style.background = "#6366f1"; el.style.color = "#fff"; el.style.borderColor = "#6366f1"; }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLSpanElement; el.style.background = "hsl(var(--background))"; el.style.color = "hsl(var(--muted-foreground))"; el.style.borderColor = "hsl(var(--border))"; }}
          >{t.label}</span>
        );
      })}
    </div>
  );
};

// ── Inline SVG icons — each themed to card content ────────────────────────────
// Rendered at 36×36, stroked not filled, so they adapt to any bg
const IconShipped = ({ color }: { color: string }) => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Rocket body */}
    <path d="M18 4 C18 4 26 8 26 18 L18 30 L10 18 C10 8 18 4 18 4Z" stroke={color} strokeWidth="1.4" strokeLinejoin="round" fill="none" opacity="0.9"/>
    {/* Rocket window */}
    <circle cx="18" cy="16" r="2.5" stroke={color} strokeWidth="1.3" fill="none" opacity="0.7"/>
    {/* Left fin */}
    <path d="M10 20 L6 26 L12 24" stroke={color} strokeWidth="1.2" strokeLinejoin="round" fill="none" opacity="0.6"/>
    {/* Right fin */}
    <path d="M26 20 L30 26 L24 24" stroke={color} strokeWidth="1.2" strokeLinejoin="round" fill="none" opacity="0.6"/>
    {/* Exhaust */}
    <path d="M16 30 Q18 34 20 30" stroke={color} strokeWidth="1.1" strokeLinecap="round" fill="none" opacity="0.5"/>
  </svg>
);

const IconUsers = ({ color }: { color: string }) => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Primary user head */}
    <circle cx="18" cy="11" r="4.5" stroke={color} strokeWidth="1.4" fill="none" opacity="0.9"/>
    {/* Primary user body */}
    <path d="M9 28 C9 22 27 22 27 28" stroke={color} strokeWidth="1.4" strokeLinecap="round" fill="none" opacity="0.9"/>
    {/* Secondary user head — left */}
    <circle cx="9" cy="13" r="3" stroke={color} strokeWidth="1.2" fill="none" opacity="0.5"/>
    {/* Secondary user body — left */}
    <path d="M3 27 C3 23 15 23 15 27" stroke={color} strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.45"/>
    {/* Secondary user head — right */}
    <circle cx="27" cy="13" r="3" stroke={color} strokeWidth="1.2" fill="none" opacity="0.5"/>
    {/* Secondary user body — right */}
    <path d="M21 27 C21 23 33 23 33 27" stroke={color} strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.45"/>
  </svg>
);

const IconMethods = ({ color }: { color: string }) => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Central node */}
    <circle cx="18" cy="18" r="3" stroke={color} strokeWidth="1.4" fill="none" opacity="0.9"/>
    {/* Spoke nodes */}
    <circle cx="18" cy="7"  r="2" stroke={color} strokeWidth="1.2" fill="none" opacity="0.7"/>
    <circle cx="18" cy="29" r="2" stroke={color} strokeWidth="1.2" fill="none" opacity="0.7"/>
    <circle cx="7"  cy="18" r="2" stroke={color} strokeWidth="1.2" fill="none" opacity="0.7"/>
    <circle cx="29" cy="18" r="2" stroke={color} strokeWidth="1.2" fill="none" opacity="0.7"/>
    <circle cx="10" cy="10" r="1.8" stroke={color} strokeWidth="1.1" fill="none" opacity="0.5"/>
    <circle cx="26" cy="10" r="1.8" stroke={color} strokeWidth="1.1" fill="none" opacity="0.5"/>
    <circle cx="10" cy="26" r="1.8" stroke={color} strokeWidth="1.1" fill="none" opacity="0.5"/>
    <circle cx="26" cy="26" r="1.8" stroke={color} strokeWidth="1.1" fill="none" opacity="0.5"/>
    {/* Connector lines */}
    <line x1="18" y1="15" x2="18" y2="9"   stroke={color} strokeWidth="1.1" opacity="0.4"/>
    <line x1="18" y1="21" x2="18" y2="27"  stroke={color} strokeWidth="1.1" opacity="0.4"/>
    <line x1="15" y1="18" x2="9"  y2="18"  stroke={color} strokeWidth="1.1" opacity="0.4"/>
    <line x1="21" y1="18" x2="27" y2="18"  stroke={color} strokeWidth="1.1" opacity="0.4"/>
    <line x1="15.8" y1="15.8" x2="11.5" y2="11.5" stroke={color} strokeWidth="1"  opacity="0.35"/>
    <line x1="20.2" y1="15.8" x2="24.5" y2="11.5" stroke={color} strokeWidth="1"  opacity="0.35"/>
    <line x1="15.8" y1="20.2" x2="11.5" y2="24.5" stroke={color} strokeWidth="1"  opacity="0.35"/>
    <line x1="20.2" y1="20.2" x2="24.5" y2="24.5" stroke={color} strokeWidth="1"  opacity="0.35"/>
  </svg>
);

// ── Stat card config ──────────────────────────────────────────────────────────
const statsMeta = [
  {
    target: 12, decimals: 0, delay: 0, suffix: "+",
    label: "Projects shipped",
    sub: "UX · Product · Branding",
    Icon: IconShipped,
    accentLight: "#6366f1", accentDark: "#818cf8",
    bgLight: "rgba(99,102,241,0.03)", bgDark: "rgba(99,102,241,0.05)",
    borderLight: "rgba(0,0,0,0.07)", borderDark: "rgba(255,255,255,0.07)",
  },
  {
    target: 33, decimals: 0, delay: 100, suffix: "+",
    label: "Users researched",
    sub: "Interviews · Surveys · Tests",
    Icon: IconUsers,
    accentLight: "#a855f7", accentDark: "#c084fc",
    bgLight: "rgba(168,85,247,0.03)", bgDark: "rgba(168,85,247,0.05)",
    borderLight: "rgba(0,0,0,0.07)", borderDark: "rgba(255,255,255,0.07)",
  },
  {
    target: 8, decimals: 0, delay: 200, suffix: "+",
    label: "Research methods",
    sub: "Contextual · Affinity · MoSCoW",
    Icon: IconMethods,
    accentLight: "#0ea5e9", accentDark: "#38bdf8",
    bgLight: "rgba(14,165,233,0.03)", bgDark: "rgba(14,165,233,0.05)",
    borderLight: "rgba(0,0,0,0.07)", borderDark: "rgba(255,255,255,0.07)",
  },
];

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

const Hero = () => {
  const [roleIndex,    setRoleIndex]    = useState(0);
  const [roleVisible,  setRoleVisible]  = useState(true);
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);
  const isDark = useDarkMode();

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleVisible(false);
      setTimeout(() => { setRoleIndex(i => (i + 1) % roles.length); setRoleVisible(true); }, 380);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsVisible(true); }, { threshold: 0.2 });
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  const v0 = useCounter(statsMeta[0].target, statsMeta[0].decimals, statsMeta[0].delay, statsVisible);
  const v1 = useCounter(statsMeta[1].target, statsMeta[1].decimals, statsMeta[1].delay, statsVisible);
  const v2 = useCounter(statsMeta[2].target, statsMeta[2].decimals, statsMeta[2].delay, statsVisible);
  const values = [v0, v1, v2];

  return (
    <section className="w-full" style={{ background: "hsl(var(--background))", paddingTop: "calc(48px + clamp(6px,3vw,28px))" }}>

      {/* ── Hero grid ── */}
      <div className="max-w-site mx-auto px-5 md:px-6 lg:px-8 border-b border-border">
        <div className="grid grid-cols-1 md:grid-cols-[65fr_35fr]">

          {/* LEFT */}
          <div className="flex flex-col justify-center pt-3 pb-5 md:py-14 md:pr-8">
            <div className="mb-4">
              <span className="block mb-2" style={{ fontFamily: FONT_BODY, fontSize: 12, fontWeight: 400, color: "hsl(var(--muted-foreground))" }}>
                I'm a
              </span>
              <span className="block" style={{
                fontFamily: FONT_DISPLAY, fontSize: "clamp(22px,5.5vw,48px)", fontWeight: 700,
                color: "#6366f1", lineHeight: 1.1, minHeight: "clamp(40px,11vw,66px)",
                letterSpacing: "-0.03em",
                opacity: roleVisible ? 1 : 0,
                transform: roleVisible ? "translateY(0)" : "translateY(-6px)",
                transition: "opacity 0.35s ease, transform 0.35s ease",
              }}>
                {roles[roleIndex]}
              </span>
              <p style={{ fontFamily: FONT_BODY, fontSize: "clamp(13px,1.2vw,15px)", fontWeight: 400, lineHeight: 1.6, color: "hsl(var(--foreground))", marginTop: 8, opacity: 0.75 }}>
                Designing products people actually want to come back to.
              </p>
            </div>

            <div style={{ width: 24, height: 1.5, background: "#6366f1", opacity: 0.28, borderRadius: 2, margin: "0 0 16px" }} />

            <p style={{ fontFamily: FONT_BODY, fontSize: "clamp(12px,1.1vw,14px)", fontWeight: 400, lineHeight: 1.8, color: "hsl(var(--muted-foreground))", maxWidth: "88%", marginBottom: 20 }}>
              I research what's actually breaking, design what actually fixes it,
              and use AI to do it faster — without cutting corners on the thinking.
            </p>

            <div className="flex flex-wrap items-center gap-2.5">
              <a href="#work"
                className="inline-flex items-center justify-center rounded-full transition-all hover:-translate-y-[1px]"
                style={{ fontFamily: FONT_BODY, fontSize: 12, fontWeight: 500, padding: "10px 22px", background: "hsl(var(--foreground))", color: "hsl(var(--primary-foreground))", textDecoration: "none" }}>
                View Work ↓
              </a>
              <a href="#contact"
                className="inline-flex items-center justify-center rounded-full transition-all duration-200"
                style={{ fontFamily: FONT_BODY, fontSize: 12, fontWeight: 500, padding: "10px 22px", border: "1.5px solid hsl(var(--border))", color: "hsl(var(--foreground))", background: "transparent", textDecoration: "none" }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "hsl(var(--foreground))"; el.style.color = "hsl(var(--primary-foreground))"; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "transparent"; el.style.color = "hsl(var(--foreground))"; }}>
                Let's Talk
              </a>
            </div>
          </div>

          {/* RIGHT — orbit, desktop only */}
          <div className="hidden md:flex items-center justify-end py-8">
            <OrbitCanvas />
          </div>
        </div>
      </div>

      {/* ── Stats strip ── */}
      <div
        ref={statsRef}
        className="max-w-site mx-auto border-b border-border"
        style={{ padding: "12px clamp(20px,5vw,32px)" }}
      >
        <div
          className="stats-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: "clamp(6px,1vw,10px)",
          }}
        >
          {statsMeta.map((s, i) => {
            const accent = isDark ? s.accentDark  : s.accentLight;
            const bg     = isDark ? s.bgDark      : s.bgLight;
            const border = isDark ? s.borderDark  : s.borderLight;

            return (
              <div
                key={s.label}
                style={{
                  padding: "14px 16px",
                  borderRadius: 12,
                  background: bg,
                  border: `1px solid ${border}`,
                  boxShadow: isDark
                    ? "0 1px 4px rgba(0,0,0,0.30)"
                    : "0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)",
                  transition: "border-color 0.2s, box-shadow 0.2s, transform 0.22s cubic-bezier(0.16,1,0.3,1)",
                  cursor: "default",
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = isDark ? "rgba(255,255,255,0.14)" : "rgba(0,0,0,0.13)";
                  el.style.boxShadow = isDark
                    ? "0 2px 10px rgba(0,0,0,0.40)"
                    : "0 2px 8px rgba(0,0,0,0.08), 0 6px 20px rgba(0,0,0,0.05)";
                  el.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = border;
                  el.style.boxShadow = isDark
                    ? "0 1px 4px rgba(0,0,0,0.30)"
                    : "0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)";
                  el.style.transform = "translateY(0)";
                }}
              >
                {/* Icon — left column, sized down so it supports, not dominates */}
                <div style={{
                  flexShrink: 0,
                  width: 36, height: 36,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  // Faint tinted circle behind icon
                  background: isDark ? `rgba(255,255,255,0.04)` : `rgba(0,0,0,0.03)`,
                  borderRadius: 10,
                  border: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`,
                }}>
                  <s.Icon color={accent} />
                </div>

                {/* Thin vertical divider */}
                <div style={{
                  width: 1, alignSelf: "stretch",
                  background: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)",
                  flexShrink: 0,
                }} />

                {/* Number + label stacked */}
                <div style={{ minWidth: 0, flex: 1 }}>
                  {/* Number */}
                  <div style={{
                    fontFamily: FONT_DISPLAY,
                    fontSize: "clamp(18px,2vw,24px)",
                    fontWeight: 300,
                    fontVariantNumeric: "tabular-nums",
                    letterSpacing: "-0.04em",
                    lineHeight: 1,
                    color: "hsl(var(--foreground))",
                    marginBottom: 4,
                  }}>
                    {values[i]}
                    <span style={{ fontSize: "0.44em", fontWeight: 700, color: accent, marginLeft: 1 }}>
                      {s.suffix}
                    </span>
                  </div>

                  {/* Label */}
                  <div style={{
                    fontFamily: FONT_BODY, fontSize: 11, fontWeight: 600,
                    color: "hsl(var(--foreground))", lineHeight: 1.3, marginBottom: 2,
                    whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                  }}>
                    {s.label}
                  </div>

                  {/* Sub */}
                  <div style={{
                    fontFamily: FONT_BODY, fontSize: 9.5, fontWeight: 400,
                    color: "hsl(var(--muted-foreground))", lineHeight: 1.4,
                    whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                  }}>
                    {s.sub}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Scroll cue */}
      <div className="flex flex-col items-center gap-[4px] py-1.5 max-w-site mx-auto">
        <div className="w-px h-5" style={{ background: "hsl(var(--border))", animation: "scrollGrow 2s ease-in-out infinite" }} />
        <span style={{ fontFamily: FONT_BODY, fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: "hsl(var(--muted-foreground))", opacity: 0.4 }}>
          Scroll to explore
        </span>

        <style>{`
          @keyframes scrollGrow {
            0%,100% { transform: scaleY(0.2); opacity: 0.3; }
            50%      { transform: scaleY(1);   opacity: 1;   }
          }

          /* Tablet + mobile — 2×2 but with taller cards so icon has room */
          @media (max-width: 768px) {
            .stats-grid {
              grid-template-columns: repeat(2, 1fr) !important;
            }
          }

          /* Small mobile — single column if very narrow */
          @media (max-width: 360px) {
            .stats-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </div>

    </section>
  );
};

export default Hero;
