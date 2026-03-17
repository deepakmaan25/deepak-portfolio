import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";

const STATS = [
  { value: 12, suffix: "+", label: "Projects" },
  { value: 38, suffix: "%", label: "Avg. Improvement" },
  { value: 4.2, suffix: "/5", label: "Usability Score", isDecimal: true },
  { value: 8, suffix: "+", label: "Research Methods" },
];

const SKILLS = [
  "User Research",
  "Interaction Design",
  "AI Workflows",
  "Figma Systems",
  "Usability Testing",
  "Design Systems",
];

const HEADLINE = "Designing products people actually finish using.";

function useCountUp(target: number, inView: boolean, isDecimal = false) {
  const [val, setVal] = useState(0);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!inView || hasRun.current) return;
    hasRun.current = true;
    const duration = 1200;
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(isDecimal ? parseFloat((eased * target).toFixed(1)) : Math.round(eased * target));
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target, isDecimal]);

  return val;
}

function MagneticButton({ href, children, variant }: { href: string; children: React.ReactNode; variant: "primary" | "outline" }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMove = useCallback((e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
    setOffset({ x, y });
  }, []);

  const handleLeave = useCallback(() => setOffset({ x: 0, y: 0 }), []);

  const base = "inline-flex items-center justify-center px-7 py-3.5 text-[15px] font-medium rounded-full transition-all duration-200";
  const styles = variant === "primary"
    ? `${base} bg-foreground text-primary-foreground hover:opacity-85`
    : `${base} border-[1.5px] border-foreground text-foreground hover:bg-foreground hover:text-primary-foreground`;

  return (
    <a
      ref={ref}
      href={href}
      className={styles}
      style={{ transform: `translate(${offset.x}px, ${offset.y}px)`, transition: "transform 0.2s cubic-bezier(0.33,1,0.68,1)" }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </a>
  );
}

const Hero = () => {
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true });

  const words = HEADLINE.split(" ");

  return (
    <section className="relative pt-32 pb-0 px-6 max-w-site mx-auto overflow-visible">
      {/* Subtle radial gradient background */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 20% 50%, rgba(99,102,241,0.06), transparent 60%)" }}
      />

      <div className="relative z-10">
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="type-label mb-6"
        >
          PRODUCT DESIGNER
        </motion.p>

        {/* Top divider */}
        <div className="border-t border-border mb-10" />

        {/* Giant name */}
        <div className="mb-6">
          {["Deepak", "Maan"].map((word, i) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block mr-[0.3em]"
              style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: "clamp(64px, 8vw, 120px)",
                fontWeight: 400,
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                color: "hsl(var(--foreground))",
              }}
            >
              {word}
            </motion.span>
          ))}
        </div>

        {/* Headline — word by word */}
        <p className="max-w-2xl mb-10" style={{ fontSize: "clamp(28px, 3.5vw, 48px)", fontWeight: 700, lineHeight: 1.2, letterSpacing: "-0.01em", color: "hsl(var(--foreground))" }}>
          {words.map((w, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block mr-[0.3em]"
            >
              {w}
            </motion.span>
          ))}
        </p>

        {/* Bottom divider */}
        <div className="border-b border-border mb-10" />

        {/* Two-column row: description + buttons | skill tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="grid md:grid-cols-2 gap-10 mb-16"
        >
          {/* Left */}
          <div>
            <p className="type-body-lg text-muted-foreground max-w-md mb-8">
              Specializing in UX research, interaction design, and AI-powered workflows. I help build scalable products with user-backed research and insights.
            </p>
            <div className="flex items-center gap-4 max-md:flex-col max-md:items-stretch">
              <MagneticButton href="#work" variant="primary">View Work ↓</MagneticButton>
              <MagneticButton href="#contact" variant="outline">Get in Touch</MagneticButton>
            </div>
          </div>

          {/* Right — skill tags */}
          <div className="grid grid-cols-3 gap-3 content-start">
            {SKILLS.map((skill, i) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.8 + i * 0.07 }}
                className="inline-flex items-center justify-center px-3 py-2 rounded-full border border-border text-[13px] font-medium text-foreground whitespace-nowrap"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Stats row */}
        <motion.div
          ref={statsRef}
          initial={{ opacity: 0 }}
          animate={statsInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="border-t border-border py-10"
        >
          <div className="flex items-start justify-between max-md:grid max-md:grid-cols-2 max-md:gap-8">
            {STATS.map((stat) => (
              <StatItem key={stat.label} stat={stat} inView={statsInView} />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="w-8 h-12 rounded-full border-2 border-border flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" />
        </div>
      </div>
    </section>
  );
};

function StatItem({ stat, inView }: { stat: typeof STATS[number]; inView: boolean }) {
  const count = useCountUp(stat.value, inView, stat.isDecimal);
  return (
    <div>
      <div className="text-[40px] font-bold text-foreground leading-none mb-1">
        {stat.isDecimal ? count.toFixed(1) : count}{stat.suffix}
      </div>
      <div className="text-[13px] text-muted-foreground mt-1">{stat.label}</div>
    </div>
  );
}

export default Hero;
