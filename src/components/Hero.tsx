import { useEffect, useRef, useState } from "react";

const FONT_BODY = "'Aileron', sans-serif";
const FONT_DISPLAY = "'Unbounded', sans-serif";

const roles = ["UX Researcher", "Interaction Designer", "AI Workflow Builder", "Product Designer", "Systems Thinker"];

const toolsConfig = [
  { label: "Figma", ring: 1, angle: 0 },
  { label: "User Interviews", ring: 1, angle: 130 },
  { label: "Usability Testing", ring: 1, angle: 250 },
  { label: "AI Workflows", ring: 2, angle: 20 },
  { label: "Design Systems", ring: 2, angle: 110 },
  { label: "Journey Mapping", ring: 2, angle: 200 },
  { label: "Affinity Mapping", ring: 2, angle: 295 },
  { label: "Prototyping", ring: 2, angle: 160 },
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
  const anglesRef = useRef(toolsConfig.map(t => (t.angle * Math.PI) / 180));
  const rafRef = useRef<number>(0);
  const tagRefsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const cx = 150; const cy = 150;

  useEffect(() => {
    const animate = () => {
      anglesRef.current = anglesRef.current.map((angle, i) => angle + speeds[toolsConfig[i].ring]);
      tagRefsRef.current.forEach((el, i) => {
        if (!el) return;
        const r = radii[toolsConfig[i].ring];
        const angle = anglesRef.current[i];
        el.style.left = `${cx + r * Math.cos(angle)}px`;
        el.style.top = `${cy + r * Math.sin(angle)}px`;
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

// ── Stat card config — compact, role-supporting, not competing ────────────────
const statsMeta = [
  {
    target: 12, decimals: 0, delay: 0, suffix: "+",
    label: "Projects shipped",
    sub: "UX · Product · Branding",
    // indigo
    light:  { bg: "linear-gradient(135deg,#f5f4ff,#eceafd)", border: "rgba(99,102,241,0.16)", shadow: "0 2px 12px rgba(99,102,241,0.09)", hoverShadow: "0 6px 22px rgba(99,102,241,0.16)", hoverBorder: "rgba(99,102,241,0.32)", glow: "rgba(99,102,241,0.10)", icon: "#6366f1", num: "#3730a3", accent: "#6366f1", label: "#1e1b4b", sub: "rgba(30,27,75,0.48)" },
    dark:   { bg: "linear-gradient(135deg,rgba(99,102,241,0.09),rgba(79,70,229,0.04))", border: "rgba(99,102,241,0.16)", shadow: "0 2px 14px rgba(0,0,0,0.28)", hoverShadow: "0 6px 26px rgba(0,0,0,0.38)", hoverBorder: "rgba(99,102,241,0.36)", glow: "rgba(99,102,241,0.13)", icon: "#818cf8", num: "#c7d2fe", accent: "#818cf8", label: "#e0e7ff", sub: "rgba(199,210,254,0.46)" },
  },
  {
    target: 33, decimals: 0, delay: 100, suffix: "+",
    label: "Users researched",
    sub: "Interviews · Surveys · Tests",
    // violet
    light:  { bg: "linear-gradient(135deg,#fdf4ff,#f3e8ff)", border: "rgba(168,85,247,0.14)", shadow: "0 2px 12px rgba(168,85,247,0.08)", hoverShadow: "0 6px 22px rgba(168,85,247,0.15)", hoverBorder: "rgba(168,85,247,0.30)", glow: "rgba(168,85,247,0.10)", icon: "#a855f7", num: "#6b21a8", accent: "#a855f7", label: "#3b0764", sub: "rgba(59,7,100,0.44)" },
    dark:   { bg: "linear-gradient(135deg,rgba(168,85,247,0.09),rgba(147,51,234,0.04))", border: "rgba(168,85,247,0.16)", shadow: "0 2px 14px rgba(0,0,0,0.28)", hoverShadow: "0 6px 26px rgba(0,0,0,0.38)", hoverBorder: "rgba(168,85,247,0.34)", glow: "rgba(168,85,247,0.13)", icon: "#c084fc", num: "#e9d5ff", accent: "#c084fc", label: "#f3e8ff", sub: "rgba(233,213,255,0.46)" },
  },
  {
    target: 8, decimals: 0, delay: 200, suffix: "+",
    label: "Research methods",
    sub: "Contextual · Affinity · MoSCoW",
    // blue
    light:  { bg: "linear-gradient(135deg,#f0f9ff,#dbeafe)", border: "rgba(59,130,246,0.14)", shadow: "0 2px 12px rgba(59,130,246,0.08)", hoverShadow: "0 6px 22px rgba(59,130,246,0.15)", hoverBorder: "rgba(59,130,246,0.30)", glow: "rgba(59,130,246,0.10)", icon: "#3b82f6", num: "#1e3a8a", accent: "#3b82f6", label: "#1e3a8a", sub: "rgba(30,58,138,0.44)" },
    dark:   { bg: "linear-gradient(135deg,rgba(59,130,246,0.09),rgba(37,99,235,0.04))", border: "rgba(59,130,246,0.16)", shadow: "0 2px 14px rgba(0,0,0,0.28)", hoverShadow: "0 6px 26px rgba(0,0,0,0.38)", hoverBorder: "rgba(59,130,246,0.34)", glow: "rgba(59,130,246,0.13)", icon: "#60a5fa", num: "#bfdbfe", accent: "#60a5fa", label: "#dbeafe", sub: "rgba(191,219,254,0.46)" },
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
  const [roleIndex, setRoleIndex] = useState(0);
  const [roleVisible, setRoleVisible] = useState(true);
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
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsVisible(true); }, { threshold: 0.3 });
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  const v0 = useCounter(statsMeta[0].target, statsMeta[0].decimals, statsMeta[0].delay, statsVisible);
  const v1 = useCounter(statsMeta[1].target, statsMeta[1].decimals, statsMeta[1].delay, statsVisible);
  const v2 = useCounter(statsMeta[2].target, statsMeta[2].decimals, statsMeta[2].delay, statsVisible);
  const values = [v0, v1, v2];

  return (
    <section className="w-full" style={{ background: "hsl(var(--background))", paddingTop: "calc(48px + clamp(6px, 3vw, 28px))" }}>

      {/* ── Hero grid ── */}
      <div className="max-w-site mx-auto px-5 md:px-6 lg:px-8 border-b border-border">
        <div className="grid grid-cols-1 md:grid-cols-[65fr_35fr]">

          {/* LEFT */}
          <div className="flex flex-col justify-center pt-3 pb-5 md:py-14 md:pr-8">
            <div className="mb-4">
              <span className="block mb-2" style={{ fontFamily: FONT_BODY, fontSize: 12, fontWeight: 400, color: "hsl(var(--muted-foreground))" }}>
                I'm a
              </span>

              {/* Role — primary focus, largest element */}
              <span className="block" style={{
                fontFamily: FONT_DISPLAY,
                fontSize: "clamp(22px, 5.5vw, 48px)",
                fontWeight: 700,
                color: "#6366f1",
                lineHeight: 1.1,
                minHeight: "clamp(40px, 11vw, 66px)",
                letterSpacing: "-0.03em",
                opacity: roleVisible ? 1 : 0,
                transform: roleVisible ? "translateY(0)" : "translateY(-6px)",
                transition: "opacity 0.35s ease, transform 0.35s ease",
              }}>
                {roles[roleIndex]}
              </span>

              {/* Supporting line — secondary, clearly smaller */}
              <p style={{
                fontFamily: FONT_BODY,
                fontSize: "clamp(13px, 1.2vw, 15px)",
                fontWeight: 400,
                lineHeight: 1.6,
                color: "hsl(var(--foreground))",
                marginTop: 8,
                opacity: 0.75,
              }}>
                Designing products people actually want to come back to.
              </p>
            </div>

            <div style={{ width: 24, height: 1.5, background: "#6366f1", opacity: 0.3, borderRadius: 2, margin: "0 0 16px" }} />

            {/* Body copy — tertiary */}
            <p style={{
              fontFamily: FONT_BODY,
              fontSize: "clamp(12px, 1.1vw, 14px)",
              fontWeight: 400,
              lineHeight: 1.8,
              color: "hsl(var(--muted-foreground))",
              maxWidth: "88%",
              marginBottom: 20,
            }}>
              I research what's actually breaking, design what actually fixes it,
              and use AI to do it faster — without cutting corners on the thinking.
            </p>

            {/* CTAs */}
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

          {/* RIGHT — orbit, gets proper breathing room */}
          <div className="hidden md:flex items-center justify-end py-8">
            <OrbitCanvas />
          </div>
        </div>
      </div>

      {/* ── Stats strip — compact, supporting role, NOT hero ── */}
      <div
        ref={statsRef}
        className="max-w-site mx-auto border-b border-border"
        style={{ padding: "12px clamp(20px,5vw,32px)" }}
      >
        <div
          className="stats-grid"
          style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "clamp(6px,1.2vw,10px)" }}
        >
          {statsMeta.map((s, i) => {
            const p = isDark ? s.dark : s.light;
            return (
              <div
                key={s.label}
                style={{
                  padding: "12px 16px",
                  borderRadius: 12,
                  background: p.bg,
                  border: `1px solid ${p.border}`,
                  boxShadow: p.shadow,
                  transition: "border-color 0.22s, box-shadow 0.22s, transform 0.25s cubic-bezier(0.16,1,0.3,1)",
                  cursor: "default",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = p.hoverBorder;
                  el.style.boxShadow = p.hoverShadow;
                  el.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = p.border;
                  el.style.boxShadow = p.shadow;
                  el.style.transform = "translateY(0)";
                }}
              >
                {/* Glow blob — very subtle */}
                <div style={{
                  position: "absolute", bottom: -16, right: -16,
                  width: 60, height: 60, borderRadius: "50%",
                  background: p.glow, filter: "blur(16px)",
                  pointerEvents: "none",
                }} />

                {/* Accent dot */}
                <div style={{
                  position: "absolute", top: 11, right: 13,
                  width: 5, height: 5, borderRadius: "50%",
                  background: p.accent, opacity: 0.4,
                }} />

                {/* Number — compact, clear */}
                <div style={{
                  fontFamily: FONT_DISPLAY,
                  fontSize: "clamp(20px,2.4vw,28px)",
                  fontWeight: 300,
                  fontVariantNumeric: "tabular-nums",
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                  color: p.num,
                  marginBottom: 5,
                }}>
                  {values[i]}
                  <span style={{ fontSize: "0.45em", color: p.accent, marginLeft: 1, fontWeight: 700 }}>
                    {s.suffix}
                  </span>
                </div>

                {/* Label */}
                <div style={{
                  fontFamily: FONT_BODY, fontSize: 11, fontWeight: 600,
                  color: p.label, lineHeight: 1.3, marginBottom: 2,
                }}>
                  {s.label}
                </div>

                {/* Sub — smallest, purely contextual */}
                <div style={{
                  fontFamily: FONT_BODY, fontSize: 10, fontWeight: 400,
                  color: p.sub, lineHeight: 1.4,
                }}>
                  {s.sub}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Scroll cue */}
      <div className="flex flex-col items-center gap-[4px] py-1.5 max-w-site mx-auto">
        <div className="w-px h-5" style={{ background: "hsl(var(--border))", animation: "scrollGrow 2s ease-in-out infinite" }} />
        <span style={{ fontFamily: FONT_BODY, fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: "hsl(var(--muted-foreground))", opacity: 0.45 }}>
          Scroll to explore
        </span>
        <style>{`
          @keyframes scrollGrow {
            0%,100% { transform: scaleY(0.2); opacity: 0.3; }
            50%      { transform: scaleY(1);   opacity: 1;   }
          }
          @media (max-width: 480px) {
            .stats-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>

    </section>
  );
};

export default Hero;
