import { useEffect, useRef, useState } from "react";

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
  const cx = 150;
  const cy = 150;

  useEffect(() => {
    const animate = () => {
      anglesRef.current = anglesRef.current.map((angle, i) => {
        return angle + speeds[toolsConfig[i].ring];
      });
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
    <div className="relative flex-shrink-0" style={{ width: 300, height: 300 }}>
      {[{ size: 136, opacity: 0.2 }, { size: 236, opacity: 0.2 }, { size: 298, opacity: 0.07 }].map((ring, i) => (
        <div key={i} className="absolute rounded-full" style={{
          width: ring.size, height: ring.size,
          top: cy - ring.size / 2, left: cx - ring.size / 2,
          border: `1px dashed rgba(99,102,241,${ring.opacity})`,
          pointerEvents: "none",
        }} />
      ))}
      <div className="absolute flex items-center justify-center rounded-full" style={{
        width: 76, height: 76, top: cy - 38, left: cx - 38,
        background: "linear-gradient(135deg,#c7d2fe,#818cf8,#6366f1)",
        boxShadow: "0 0 0 5px rgba(99,102,241,0.08), 0 6px 24px rgba(99,102,241,0.2)",
        fontFamily: "'DM Serif Display', serif", fontSize: 20, fontStyle: "italic", color: "#fff", zIndex: 10,
      }}>DM</div>
      {toolsConfig.map((t, i) => {
        const r = radii[t.ring];
        const a = (t.angle * Math.PI) / 180;
        return (
          <span key={t.label} ref={el => { tagRefsRef.current[i] = el; }}
            className="orbit-tag absolute text-[10px] font-medium px-[10px] py-[4px] rounded-full whitespace-nowrap cursor-default transition-colors duration-200"
            style={{
              left: cx + r * Math.cos(a), top: cy + r * Math.sin(a),
              transform: "translate(-50%,-50%)",
              background: "hsl(var(--background))",
              border: "1px solid hsl(var(--border))",
              color: "hsl(var(--muted-foreground))",
              boxShadow: "0 2px 6px rgba(0,0,0,0.05)", zIndex: 5,
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLSpanElement;
              el.style.background = "#6366f1";
              el.style.color = "#fff";
              el.style.borderColor = "#6366f1";
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLSpanElement;
              el.style.background = "hsl(var(--background))";
              el.style.color = "hsl(var(--muted-foreground))";
              el.style.borderColor = "hsl(var(--border))";
            }}
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
    { value: s2, suffix: "%", label: "Avg. improvement" },
    { value: s3, suffix: "/5", label: "Usability score" },
    { value: s4, suffix: "+", label: "Research methods" },
  ];

  return (
    <section className="w-full pt-16" style={{ background: "hsl(var(--background))" }}>
      {/* Accent bar */}
      <div style={{ height: 3, background: "linear-gradient(90deg,#6366f1,#818cf8)", width: "100%" }} />

      {/* Label row */}
      <div className="flex flex-wrap items-center justify-between px-6 lg:px-8 max-w-site mx-auto py-4 border-b border-border gap-2">
        <span className="type-label text-muted-foreground">Product Designer</span>
        <div className="flex items-center gap-2 text-[11px] font-medium px-3 py-1 rounded-full"
          style={{ background: "#DCFCE7", color: "#166534", border: "1px solid #BBF7D0" }}>
          <span className="relative flex h-[6px] w-[6px]">
            <span className="animate-ping-dot absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-[6px] w-[6px] bg-green-500" />
          </span>
          Available for opportunities
        </div>
        <span className="text-[12px] text-muted-foreground hidden sm:block">India · Open to remote</span>
      </div>

      {/* Hero grid — responsive */}
      <div className="max-w-site mx-auto px-6 lg:px-8 border-b border-border"
        style={{ display: "grid", gridTemplateColumns: "65fr 35fr", minHeight: 360 }}>

        {/* LEFT */}
        <div className="flex flex-col justify-center py-10 pr-4 lg:pr-8">
          <div className="mb-4">
            <span className="block text-[13px] text-muted-foreground font-normal mb-[10px]">I'm a</span>
            <span className="block font-normal" style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "clamp(32px, 4.8vw, 68px)",
              fontStyle: "italic",
              color: "var(--role-color, #6366f1)",
              lineHeight: 1.05,
              minHeight: 54,
              opacity: roleVisible ? 1 : 0,
              transform: roleVisible ? "translateY(0)" : "translateY(-6px)",
              transition: "opacity 0.35s ease, transform 0.35s ease",
            }}>{roles[roleIndex]}</span>
            <p className="font-medium text-foreground mt-[4px]"
              style={{ fontSize: "clamp(13px, 1.4vw, 17px)", lineHeight: 1.35 }}>
              Designing products people actually finish using.
            </p>
          </div>

          <div style={{ width: 28, height: 2, background: "#6366f1", opacity: 0.35, borderRadius: 2, margin: "16px 0" }} />

          <p className="text-muted-foreground leading-[1.7] mb-6 max-w-[520px]"
            style={{ fontSize: "clamp(13px, 1.2vw, 14px)" }}>
            UX research, interaction design, and AI-powered workflows — turning complex problems into intuitive experiences backed by real user insight.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <a href="#work"
              className="inline-flex items-center justify-center px-6 py-3 text-[13px] font-medium rounded-full transition-all hover:-translate-y-[1px]"
              style={{ background: "hsl(var(--foreground))", color: "hsl(var(--primary-foreground))" }}>
              View Work ↓
            </a>
            <a href="#contact"
              className="inline-flex items-center justify-center px-6 py-3 text-[13px] font-medium rounded-full transition-all duration-200"
              style={{
                border: "1.5px solid hsl(var(--border))",
                color: "hsl(var(--foreground))",
                background: "transparent",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = "hsl(var(--foreground))";
                el.style.color = "hsl(var(--primary-foreground))";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = "transparent";
                el.style.color = "hsl(var(--foreground))";
              }}>
              Get in Touch
            </a>
          </div>
        </div>

        {/* RIGHT — orbit, hidden on mobile */}
        <div className="hidden md:flex items-center justify-end py-8">
          <OrbitCanvas />
        </div>
      </div>

      {/* Stats row — 2 cols on mobile, 4 on desktop */}
      <div ref={statsRef}
        className="grid grid-cols-2 md:grid-cols-4 max-w-site mx-auto px-6 lg:px-8 py-5 border-b border-border gap-y-4">
        {stats.map((s, i) => (
          <div key={s.label} className={`${i % 2 !== 0 || i > 0 ? "md:pl-6 md:border-l md:border-border" : ""} ${i < 3 ? "md:pr-6" : ""} ${i === 1 ? "pl-6 border-l border-border" : ""}`}>
            <div className="leading-none mb-1 font-normal text-foreground"
              style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(26px, 3vw, 34px)" }}>
              {s.value}<em className="not-italic" style={{ color: "#6366f1" }}>{s.suffix}</em>
            </div>
            <div className="text-[11px] text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Scroll cue */}
      <div className="flex flex-col items-center gap-[5px] py-3 max-w-site mx-auto">
        <div className="w-px h-6" style={{ background: "hsl(var(--border))", animation: "scrollGrow 2s ease-in-out infinite" }} />
        <span className="text-[10px] tracking-[0.12em] uppercase text-muted-foreground/50">Scroll to explore</span>
        <style>{`@keyframes scrollGrow{0%,100%{transform:scaleY(0.2);opacity:0.3;}50%{transform:scaleY(1);opacity:1;}}`}</style>
      </div>
    </section>
  );
};

export default Hero;
