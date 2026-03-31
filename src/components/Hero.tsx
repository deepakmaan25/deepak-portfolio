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

// ── Stat card config ──────────────────────────────────────────────────────────
const statsMeta = [
  {
    target: 12, decimals: 0, delay: 0, suffix: "+",
    label: "Projects shipped",
    sub: "Across UX, product & branding",
    icon: "◈",
    light: {
      bg: "linear-gradient(135deg, #f5f4ff 0%, #eceafd 100%)",
      border: "rgba(99,102,241,0.18)",
      shadow: "0 4px 24px rgba(99,102,241,0.10), 0 1px 4px rgba(99,102,241,0.06)",
      hoverShadow: "0 10px 36px rgba(99,102,241,0.18), 0 2px 8px rgba(99,102,241,0.10)",
      hoverBorder: "rgba(99,102,241,0.38)",
      glowColor: "rgba(99,102,241,0.12)",
      iconColor: "#6366f1",
      numberColor: "#3730a3",
      accentColor: "#6366f1",
      labelColor: "#1e1b4b",
      subColor: "rgba(30,27,75,0.48)",
    },
    dark: {
      bg: "linear-gradient(135deg, rgba(99,102,241,0.10) 0%, rgba(79,70,229,0.05) 100%)",
      border: "rgba(99,102,241,0.18)",
      shadow: "0 4px 28px rgba(0,0,0,0.30), 0 1px 4px rgba(99,102,241,0.14)",
      hoverShadow: "0 10px 40px rgba(0,0,0,0.40), 0 2px 10px rgba(99,102,241,0.22)",
      hoverBorder: "rgba(99,102,241,0.40)",
      glowColor: "rgba(99,102,241,0.15)",
      iconColor: "#818cf8",
      numberColor: "#c7d2fe",
      accentColor: "#818cf8",
      labelColor: "#e0e7ff",
      subColor: "rgba(199,210,254,0.48)",
    },
  },
  {
    target: 33, decimals: 0, delay: 100, suffix: "+",
    label: "Users researched",
    sub: "Interviews, surveys & usability tests",
    icon: "◎",
    light: {
      bg: "linear-gradient(135deg, #fdf4ff 0%, #f3e8ff 100%)",
      border: "rgba(168,85,247,0.16)",
      shadow: "0 4px 24px rgba(168,85,247,0.09), 0 1px 4px rgba(168,85,247,0.06)",
      hoverShadow: "0 10px 36px rgba(168,85,247,0.17), 0 2px 8px rgba(168,85,247,0.10)",
      hoverBorder: "rgba(168,85,247,0.34)",
      glowColor: "rgba(168,85,247,0.12)",
      iconColor: "#a855f7",
      numberColor: "#6b21a8",
      accentColor: "#a855f7",
      labelColor: "#3b0764",
      subColor: "rgba(59,7,100,0.44)",
    },
    dark: {
      bg: "linear-gradient(135deg, rgba(168,85,247,0.10) 0%, rgba(147,51,234,0.05) 100%)",
      border: "rgba(168,85,247,0.18)",
      shadow: "0 4px 28px rgba(0,0,0,0.30), 0 1px 4px rgba(168,85,247,0.14)",
      hoverShadow: "0 10px 40px rgba(0,0,0,0.40), 0 2px 10px rgba(168,85,247,0.22)",
      hoverBorder: "rgba(168,85,247,0.40)",
      glowColor: "rgba(168,85,247,0.15)",
      iconColor: "#c084fc",
      numberColor: "#e9d5ff",
      accentColor: "#c084fc",
      labelColor: "#f3e8ff",
      subColor: "rgba(233,213,255,0.48)",
    },
  },
  {
    target: 8, decimals: 0, delay: 200, suffix: "+",
    label: "Research methods",
    sub: "From contextual inquiry to MoSCoW",
    icon: "◇",
    light: {
      bg: "linear-gradient(135deg, #f0f9ff 0%, #dbeafe 100%)",
      border: "rgba(59,130,246,0.16)",
      shadow: "0 4px 24px rgba(59,130,246,0.09), 0 1px 4px rgba(59,130,246,0.06)",
      hoverShadow: "0 10px 36px rgba(59,130,246,0.17), 0 2px 8px rgba(59,130,246,0.10)",
      hoverBorder: "rgba(59,130,246,0.34)",
      glowColor: "rgba(59,130,246,0.12)",
      iconColor: "#3b82f6",
      numberColor: "#1e3a8a",
      accentColor: "#3b82f6",
      labelColor: "#1e3a8a",
      subColor: "rgba(30,58,138,0.44)",
    },
    dark: {
      bg: "linear-gradient(135deg, rgba(59,130,246,0.10) 0%, rgba(37,99,235,0.05) 100%)",
      border: "rgba(59,130,246,0.18)",
      shadow: "0 4px 28px rgba(0,0,0,0.30), 0 1px 4px rgba(59,130,246,0.14)",
      hoverShadow: "0 10px 40px rgba(0,0,0,0.40), 0 2px 10px rgba(59,130,246,0.22)",
      hoverBorder: "rgba(59,130,246,0.40)",
      glowColor: "rgba(59,130,246,0.15)",
      iconColor: "#60a5fa",
      numberColor: "#bfdbfe",
      accentColor: "#60a5fa",
      labelColor: "#dbeafe",
      subColor: "rgba(191,219,254,0.48)",
    },
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

      {/* Hero grid */}
      <div className="max-w-site mx-auto px-5 md:px-6 lg:px-8 border-b border-border">
        <div className="grid grid-cols-1 md:grid-cols-[65fr_35fr]">

          {/* LEFT */}
          <div className="flex flex-col justify-center pt-3 pb-5 md:py-14 md:pr-8">
            <div className="mb-5">
              <span className="block mb-3" style={{ fontFamily: FONT_BODY, fontSize: 13, fontWeight: 400, color: "hsl(var(--muted-foreground))" }}>I'm a</span>
              <span className="block" style={{
                fontFamily: FONT_DISPLAY, fontSize: "clamp(24px, 6vw, 52px)", fontWeight: 700,
                color: "#6366f1", lineHeight: 1.1, minHeight: "clamp(48px, 12vw, 72px)",
                letterSpacing: "-0.03em", opacity: roleVisible ? 1 : 0,
                transform: roleVisible ? "translateY(0)" : "translateY(-6px)",
                transition: "opacity 0.35s ease, transform 0.35s ease",
              }}>{roles[roleIndex]}</span>
              <p style={{ fontFamily: FONT_BODY, fontSize: "clamp(14px, 1.4vw, 16px)", fontWeight: 400, lineHeight: 1.6, color: "hsl(var(--foreground))", marginTop: 10 }}>
                Designing products people actually want to come back to.
              </p>
            </div>

            <div style={{ width: 28, height: 2, background: "#6366f1", opacity: 0.35, borderRadius: 2, margin: "0 0 20px" }} />

            <p style={{ fontFamily: FONT_BODY, fontSize: "clamp(13px, 1.2vw, 15px)", fontWeight: 400, lineHeight: 1.8, color: "hsl(var(--muted-foreground))", maxWidth: "90%", marginBottom: 20 }}>
              I research what's actually breaking, design what actually fixes it, and use AI to do it faster — without cutting corners on the thinking.
            </p>

            <div className="flex flex-wrap items-center gap-2.5">
              <a href="#work" className="inline-flex items-center justify-center px-6 py-3 rounded-full transition-all hover:-translate-y-[1px]"
                style={{ fontFamily: FONT_BODY, fontSize: 13, fontWeight: 500, background: "hsl(var(--foreground))", color: "hsl(var(--primary-foreground))", textDecoration: "none" }}>
                View Work ↓
              </a>
              <a href="#contact" className="inline-flex items-center justify-center px-6 py-3 rounded-full transition-all duration-200"
                style={{ fontFamily: FONT_BODY, fontSize: 13, fontWeight: 500, border: "1.5px solid hsl(var(--border))", color: "hsl(var(--foreground))", background: "transparent", textDecoration: "none" }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "hsl(var(--foreground))"; el.style.color = "hsl(var(--primary-foreground))"; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "transparent"; el.style.color = "hsl(var(--foreground))"; }}>
                Let's Talk
              </a>
            </div>
          </div>

          {/* RIGHT — orbit desktop only */}
          <div className="hidden md:flex items-center justify-end py-8">
            <OrbitCanvas />
          </div>
        </div>
      </div>

      {/* ── Stats row ── */}
      <div
        ref={statsRef}
        className="max-w-site mx-auto border-b border-border"
        style={{ padding: "clamp(16px, 2.5vw, 24px) clamp(20px, 5vw, 32px)" }}
      >
        <div
          className="stats-grid"
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "clamp(8px, 1.5vw, 14px)" }}
        >
          {statsMeta.map((s, i) => {
            const p = isDark ? s.dark : s.light;
            return (
              <div
                key={s.label}
                style={{
                  padding: "clamp(16px, 2vw, 22px) clamp(18px, 2.5vw, 26px)",
                  borderRadius: 16,
                  background: p.bg,
                  border: `1px solid ${p.border}`,
                  boxShadow: p.shadow,
                  transition: "border-color 0.25s, box-shadow 0.25s, transform 0.28s cubic-bezier(0.16,1,0.3,1)",
                  cursor: "default",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = p.hoverBorder;
                  el.style.boxShadow = p.hoverShadow;
                  el.style.transform = "translateY(-3px)";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = p.border;
                  el.style.boxShadow = p.shadow;
                  el.style.transform = "translateY(0)";
                }}
              >
                {/* Bottom-right radial glow blob */}
                <div style={{
                  position: "absolute", bottom: -24, right: -24,
                  width: 90, height: 90, borderRadius: "50%",
                  background: p.glowColor,
                  filter: "blur(22px)",
                  pointerEvents: "none",
                }} />

                {/* Top-left accent dot */}
                <div style={{
                  position: "absolute", top: 14, right: 18,
                  width: 6, height: 6, borderRadius: "50%",
                  background: p.accentColor,
                  opacity: 0.5,
                }} />

                {/* Icon */}
                <span style={{
                  display: "block", fontFamily: FONT_DISPLAY, fontSize: 13,
                  color: p.iconColor, marginBottom: 12, lineHeight: 1, opacity: 0.7,
                }}>
                  {s.icon}
                </span>

                {/* Number */}
                <div style={{
                  fontFamily: FONT_DISPLAY,
                  fontSize: "clamp(28px, 3.5vw, 40px)",
                  fontWeight: 300,
                  fontVariantNumeric: "tabular-nums",
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                  color: p.numberColor,
                  marginBottom: 8,
                }}>
                  {values[i]}
                  <span style={{
                    fontFamily: FONT_DISPLAY, fontSize: "0.45em",
                    color: p.accentColor, marginLeft: 2, fontWeight: 700,
                  }}>
                    {s.suffix}
                  </span>
                </div>

                {/* Label */}
                <div style={{
                  fontFamily: FONT_BODY, fontSize: "clamp(12px, 1.1vw, 13px)",
                  fontWeight: 600, color: p.labelColor, marginBottom: 3, lineHeight: 1.3,
                }}>
                  {s.label}
                </div>

                {/* Sub */}
                <div style={{
                  fontFamily: FONT_BODY, fontSize: 11, fontWeight: 400,
                  color: p.subColor, lineHeight: 1.55,
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
        <div className="w-px h-6" style={{ background: "hsl(var(--border))", animation: "scrollGrow 2s ease-in-out infinite" }} />
        <span style={{ fontFamily: FONT_BODY, fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "hsl(var(--muted-foreground))", opacity: 0.5 }}>
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
