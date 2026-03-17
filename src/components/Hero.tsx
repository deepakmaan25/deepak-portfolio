import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const roles = ["UX Researcher", "Interaction Designer", "AI Workflow Builder", "Product Designer", "Systems Thinker"];

const tools = [
  { label: "Figma", ring: 1, angle: 0 },
  { label: "User Interviews", ring: 1, angle: 130 },
  { label: "Usability Testing", ring: 1, angle: 250 },
  { label: "AI Workflows", ring: 2, angle: 20 },
  { label: "Design Systems", ring: 2, angle: 110 },
  { label: "Journey Mapping", ring: 2, angle: 200 },
  { label: "Affinity Mapping", ring: 2, angle: 295 },
  { label: "Prototyping", ring: 2, angle: 160 },
];

const radii: Record<number, number> = { 1: 55, 2: 94 };

const useCounter = (target: number, decimals: number, delay: number) => {
  const [value, setValue] = useState(0);
  useEffect(() => {
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
  }, [target, decimals, delay]);
  return value;
};

const OrbitCanvas = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={wrapRef}
      className="relative flex items-center justify-center flex-shrink-0"
      style={{ width: 240, height: 240 }}
    >
      {/* Rings */}
      {[
        { size: 110, duration: "10s", direction: "normal" },
        { size: 188, duration: "17s", direction: "reverse" },
        { size: 238, duration: "28s", direction: "normal" },
      ].map((ring, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: ring.size,
            height: ring.size,
            border: "1px dashed rgba(99,102,241,0.2)",
            animation: `spin ${ring.duration} linear ${ring.direction} infinite`,
          }}
        />
      ))}

      {/* Center */}
      <div
        className="relative z-10 flex items-center justify-center rounded-full flex-shrink-0"
        style={{
          width: 70, height: 70,
          background: "linear-gradient(135deg,#c7d2fe,#818cf8,#6366f1)",
          boxShadow: "0 0 0 5px rgba(99,102,241,0.08), 0 6px 24px rgba(99,102,241,0.2)",
          fontFamily: "'DM Serif Display', serif",
          fontSize: 18, fontStyle: "italic", color: "#fff",
        }}
      >
        DM
      </div>

      {/* Tool tags */}
      {tools.map((t) => {
        const r = radii[t.ring];
        const rad = (t.angle * Math.PI) / 180;
        const x = 120 + r * Math.cos(rad);
        const y = 120 + r * Math.sin(rad);
        return (
          <span
            key={t.label}
            className="absolute text-[9.5px] font-medium px-[10px] py-[4px] rounded-full bg-background border border-border text-muted-foreground whitespace-nowrap z-[5] cursor-default transition-all duration-250 hover:bg-primary hover:text-primary-foreground hover:border-primary hover:scale-105"
            style={{
              left: x, top: y,
              transform: "translate(-50%,-50%)",
              boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
            }}
          >
            {t.label}
          </span>
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

  // Role morphing
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleVisible(false);
      setTimeout(() => {
        setRoleIndex((i) => (i + 1) % roles.length);
        setRoleVisible(true);
      }, 380);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  // Stats counter trigger
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsVisible(true); }, { threshold: 0.3 });
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  const s1 = useCounter(statsVisible ? 12 : 0, 0, 0);
  const s2 = useCounter(statsVisible ? 38 : 0, 0, 100);
  const s3 = useCounter(statsVisible ? 4.2 : 0, 1, 200);
  const s4 = useCounter(statsVisible ? 8 : 0, 0, 300);

  const stats = [
    { value: s1, suffix: "+", label: "Projects shipped" },
    { value: s2, suffix: "%", label: "Avg. improvement" },
    { value: s3, suffix: "/5", label: "Usability score" },
    { value: s4, suffix: "+", label: "Research methods" },
  ];

  return (
    <section className="w-full pt-24">

      {/* Hero grid — 65/35 */}
      <div className="grid border-b border-border" style={{ gridTemplateColumns: "65fr 35fr", minHeight: 400 }}>

        {/* LEFT */}
        <div className="flex flex-col justify-center px-12 py-11">
          {/* Role group */}
          <div className="mb-4">
            <span className="block text-[13px] text-muted-foreground font-normal mb-[10px]">I'm a</span>
            <span
              className="block font-normal"
              style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: "clamp(44px, 4.8vw, 68px)",
                fontStyle: "italic",
                color: "var(--role-color)",
                lineHeight: 1.05,
                whiteSpace: "nowrap",
                minHeight: 74,
                opacity: roleVisible ? 1 : 0,
                transform: roleVisible ? "translateY(0)" : "translateY(-6px)",
                transition: "opacity 0.35s ease, transform 0.35s ease",
              }}
            >
              {roles[roleIndex]}
            </span>
            <p className="font-medium text-foreground mt-[4px]" style={{ fontSize: "clamp(14px, 1.4vw, 17px)", lineHeight: 1.35 }}>
              Designing products people actually finish using.
            </p>
          </div>

          {/* Divider */}
          <div style={{ width: 28, height: 2, background: "var(--role-color)", opacity: 0.35, borderRadius: 2, margin: "16px 0" }} />

          {/* Description */}
          <p className="text-[14px] text-muted-foreground leading-[1.7] mb-6 max-w-[520px]">
            UX research, interaction design, and AI-powered workflows — turning complex problems into intuitive experiences backed by real user insight.
          </p>

          {/* Buttons */}
          <div className="flex items-center gap-3">
            <a href="#work" className="inline-flex items-center justify-center px-6 py-3 bg-foreground text-primary-foreground text-[13px] font-medium rounded-full hover:opacity-80 transition-all hover:-translate-y-[1px]">
              View Work ↓
            </a>
            <a href="#contact" className="inline-flex items-center justify-center px-6 py-3 text-[13px] font-medium rounded-full border-[1.5px] border-foreground/20 text-foreground hover:bg-foreground hover:text-primary-foreground transition-all duration-200">
              Get in Touch
            </a>
          </div>
        </div>

        {/* RIGHT — orbit right-aligned */}
        <div className="flex items-center justify-end pr-12 py-8">
          <OrbitCanvas />
        </div>
      </div>

      {/* Stats row */}
      <div ref={statsRef} className="grid grid-cols-4 px-12 py-5 border-b border-border">
        {stats.map((s, i) => (
          <div key={s.label} className={`${i > 0 ? "pl-6 border-l border-border" : ""} ${i < 3 ? "pr-6" : ""}`}>
            <div className="leading-none mb-1 font-normal" style={{ fontFamily: "'DM Serif Display', serif", fontSize: 34 }}>
              {s.value}<em className="not-italic" style={{ color: "var(--role-color)" }}>{s.suffix}</em>
            </div>
            <div className="text-[11px] text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Scroll cue */}
      <div className="flex flex-col items-center gap-[5px] py-3">
        <div className="w-px h-6 bg-foreground/10" style={{ animation: "scrollGrow 2s ease-in-out infinite" }} />
        <span className="text-[10px] tracking-[0.12em] uppercase text-muted-foreground/50">Scroll to explore</span>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes scrollGrow {
          0%, 100% { transform: scaleY(0.2); opacity: 0.3; }
          50% { transform: scaleY(1); opacity: 1; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
