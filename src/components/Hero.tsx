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
        <div key={i} className="absolute rounded-full" aria-hidden="true" style={{ width: ring.size, height: ring.size, top: cy - ring.size / 2, left: cx - ring.size / 2, border: `1px dashed rgba(99,102,241,${ring.opacity})`, pointerEvents: "none" }} />
      ))}
      <div className="absolute rounded-full overflow-hidden" style={{ width: 76, height: 76, top: cy - 38, left: cx - 38, boxShadow: "0 0 0 5px rgba(99,102,241,0.08), 0 6px 24px rgba(99,102,241,0.2)", zIndex: 10 }}>
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

const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [roleVisible, setRoleVisible] = useState(true);
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);

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

  const s1 = useCounter(12, 0, 0, statsVisible);
  const s2 = useCounter(38, 0, 100, statsVisible);
  const s3 = useCounter(4.2, 1, 200, statsVisible);
  const s4 = useCounter(8, 0, 300, statsVisible);

  const stats = [
    { value: s1, suffix: "+", label: "Projects shipped" },
    { value: s2, suffix: "%", label: "Avg. usability gain" },
    { value: s3, suffix: "/5", label: "Avg. user rating" },
    { value: s4, suffix: "+", label: "Research methods" },
  ];

  return (
    <section className="w-full" style={{ background: "hsl(var(--background))", paddingTop: "calc(48px + clamp(8px, 4vw, 32px))" }}>

      {/* Hero grid */}
      <div className="max-w-site mx-auto px-5 md:px-6 lg:px-8 border-b border-border">
        <div className="grid grid-cols-1 md:grid-cols-[65fr_35fr]">

          {/* LEFT */}
          <div className="flex flex-col justify-center pt-3 pb-5 md:py-14 md:pr-8">
            <div className="mb-5">
              <span className="block mb-3" style={{ fontFamily: FONT_BODY, fontSize: 13, fontWeight: 400, color: "hsl(var(--muted-foreground))" }}>I'm a</span>

              {/* Role — Unbounded italic colored */}
              <span className="block" style={{
                fontFamily: FONT_DISPLAY,
                fontSize: "clamp(24px, 6vw, 52px)",
                fontWeight: 700,
                color: "var(--role-color, #6366f1)",
                lineHeight: 1.1,
                minHeight: "clamp(32px, 6vw, 56px)",
                letterSpacing: "-0.03em",
                opacity: roleVisible ? 1 : 0,
                transform: roleVisible ? "translateY(0)" : "translateY(-6px)",
                transition: "opacity 0.35s ease, transform 0.35s ease",
              }}>{roles[roleIndex]}</span>

              <p style={{ fontFamily: FONT_BODY, fontSize: "clamp(14px, 1.4vw, 16px)", fontWeight: 400, lineHeight: 1.6, color: "hsl(var(--foreground))", marginTop: 10 }}>
                Designing products people actually want to come back to.
              </p>
            </div>

            <div style={{ width: 28, height: 2, background: "#6366f1", opacity: 0.35, borderRadius: 2, margin: "0 0 20px" }} />

            <p style={{ fontFamily: FONT_BODY, fontSize: "clamp(13px, 1.2vw, 15px)", fontWeight: 400, lineHeight: 1.8, color: "hsl(var(--muted-foreground))", maxWidth: 520, marginBottom: 20 }}>
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

      {/* Stats row — editorial grid */}
      <div ref={statsRef} className="max-w-site mx-auto border-b border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 border-border">
          {stats.map((s, i) => (
            <div key={s.label} style={{
              padding: "14px 14px",
            
            }}>
              <div style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 600, fontVariantNumeric: "tabular-nums", letterSpacing: "-0.03em", lineHeight: 1, color: "hsl(var(--foreground))", marginBottom: 8 }}>
                {s.value}
                <span style={{ fontFamily: FONT_DISPLAY, fontSize: "0.55em", color: "#6366f1", marginLeft: 2 }}>{s.suffix}</span>
              </div>
              <div style={{ fontFamily: FONT_BODY, fontSize: 11, fontWeight: 400, letterSpacing: "0.02em", lineHeight: 1.5, color: "hsl(var(--muted-foreground))" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div className="flex flex-col items-center gap-[4px] py-1.5 max-w-site mx-auto">
        <div className="w-px h-6" style={{ background: "hsl(var(--border))", animation: "scrollGrow 2s ease-in-out infinite" }} />
        <span style={{ fontFamily: FONT_BODY, fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "hsl(var(--muted-foreground))", opacity: 0.5 }}>Scroll to explore</span>
        <style>{`@keyframes scrollGrow{0%,100%{transform:scaleY(0.2);opacity:0.3;}50%{transform:scaleY(1);opacity:1;}}`}</style>
      </div>

    </section>
  );
};

export default Hero;
