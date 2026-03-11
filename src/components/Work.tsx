import { useRef, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { caseStudies } from "@/data/caseStudies";

const cardColors = [
  "bg-card-lavender",
  "bg-card-blue",
  "bg-card-orange",
];

// EduPath dashboard wireframe placeholder
const EduPathPlaceholder = () => (
  <div className="w-full h-full flex rounded-xl overflow-hidden" style={{ background: "#F0F4FF" }}>
    <div className="w-[20%] h-full" style={{ background: "rgba(99,102,241,0.08)" }} />
    <div className="flex-1 p-4 flex flex-col gap-3">
      <div className="h-8 rounded-md w-full" style={{ background: "rgba(99,102,241,0.06)" }} />
      <div className="flex-1 grid grid-cols-3 gap-2.5">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-lg" style={{ background: "rgba(99,102,241,0.1)" }} />
        ))}
      </div>
    </div>
  </div>
);

const WorkCard = ({ cs, index }: { cs: typeof caseStudies[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [showCursor, setShowCursor] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    setCursorPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  const isEduPath = cs.slug === "edupath-learning-system";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: 0.05 }}
    >
      <Link
        to={`/case-study/${cs.slug}`}
        className="group block"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className={`${cardColors[index % 3]} rounded-2xl p-8 md:p-10 transition-all duration-[280ms]`}
          style={{
            boxShadow: isHovered
              ? "0 20px 60px rgba(0,0,0,0.12)"
              : "var(--shadow-card)",
            transform: isHovered ? "translateY(-6px)" : "translateY(0)",
          }}
        >
          <div className="grid md:grid-cols-[55%_45%] gap-8 items-center">
            {/* Left content */}
            <div>
              <div className="type-label mb-3">{cs.tag}</div>
              <h3 className="text-[28px] font-bold text-foreground leading-tight mb-3">{cs.title}</h3>
              <p className="type-body text-text-body mb-5 max-w-md">{cs.description}</p>

              {/* Outcome chips */}
              <div className="flex flex-wrap gap-2 mb-6">
                {cs.outcomes.slice(0, 4).map((o, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center px-3 py-1 bg-surface border border-border rounded-full text-[12px] text-foreground hover:bg-accent hover:border-ring transition-colors duration-200"
                  >
                    {o.metric} {o.label.toLowerCase()}
                  </span>
                ))}
              </div>

              <span
                className="text-[15px] font-medium text-foreground underline-offset-4 transition-colors duration-200"
                style={{ color: isHovered ? "#6366F1" : undefined }}
              >
                View Case Study →
              </span>
            </div>

            {/* Right image area */}
            <div
              ref={imageRef}
              className="relative aspect-[4/3] bg-muted rounded-xl flex items-center justify-center overflow-hidden cursor-none"
              onMouseEnter={() => setShowCursor(true)}
              onMouseLeave={() => setShowCursor(false)}
              onMouseMove={handleMouseMove}
            >
              {isEduPath ? (
                <EduPathPlaceholder />
              ) : cs.image ? (
                <img src={cs.image} alt={cs.title} loading="lazy" className="w-full h-full object-cover rounded-xl" />
              ) : (
                <span className="text-[13px] text-muted-foreground">Project Mockup</span>
              )}

              {showCursor && (
                <div
                  className="absolute pointer-events-none z-10 bg-foreground text-primary-foreground text-[12px] font-medium px-4 py-2 rounded-full transition-transform duration-75"
                  style={{ left: cursorPos.x - 30, top: cursorPos.y - 16 }}
                >
                  View →
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const Work = () => {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });

  return (
    <section id="work" className="py-24 md:py-[96px] px-6 max-w-site mx-auto">
      <motion.div
        ref={headerRef}
        initial={{ opacity: 0, y: 16 }}
        animate={headerInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4 }}
        className="flex items-baseline justify-between mb-12"
      >
        <div>
          <p className="type-label mb-3">WORK</p>
          <h2 className="type-h2">Selected Case Studies</h2>
        </div>
        <span className="text-[14px] text-muted-foreground hidden md:block">({String(caseStudies.length).padStart(2, "0")})</span>
      </motion.div>

      <div className="space-y-8">
        {caseStudies.map((cs, i) => (
          <WorkCard key={cs.id} cs={cs} index={i} />
        ))}
      </div>
    </section>
  );
};

export default Work;
