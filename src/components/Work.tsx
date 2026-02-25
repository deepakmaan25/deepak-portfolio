import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { caseStudies } from "@/data/caseStudies";

const cardColors = [
  "bg-card-lavender",
  "bg-card-blue",
  "bg-card-orange",
];

const WorkCard = ({ cs, index }: { cs: typeof caseStudies[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [showCursor, setShowCursor] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    setCursorPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: 0.05 }}
    >
      <Link to={`/case-study/${cs.slug}`} className="group block">
        <div className={`${cardColors[index % 3]} rounded-2xl shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-200 p-8 md:p-10`}>
          <div className="grid md:grid-cols-[55%_45%] gap-8 items-center">
            {/* Left content */}
            <div>
              <div className="type-label mb-3">{cs.tag}</div>
              <h3 className="text-[28px] font-bold text-foreground leading-tight mb-3">{cs.title}</h3>
              <p className="type-body text-text-body mb-5 max-w-md">{cs.description}</p>

              {/* Outcome chips */}
              <div className="flex flex-wrap gap-2 mb-6">
                {cs.outcomes.slice(0, 4).map((o, i) => (
                  <span key={i} className="inline-flex items-center px-3 py-1.5 bg-background border border-tag-border rounded-full text-[13px] text-text-body">
                    {o.metric} {o.label.toLowerCase()}
                  </span>
                ))}
              </div>

              <span className="text-[15px] font-medium text-foreground group-hover:underline underline-offset-4 transition-all">
                View Case Study →
              </span>
            </div>

            {/* Right image placeholder */}
            <div
              ref={imageRef}
              className="relative aspect-[4/3] bg-muted rounded-xl flex items-center justify-center overflow-hidden cursor-none"
              onMouseEnter={() => setShowCursor(true)}
              onMouseLeave={() => setShowCursor(false)}
              onMouseMove={handleMouseMove}
            >
              {cs.image ? (
                <img src={cs.image} alt={cs.title} loading="lazy" className="w-full h-full object-cover rounded-xl" />
              ) : (
                <span className="text-[13px] text-muted-foreground">Project Mockup</span>
              )}

              {/* Custom cursor label */}
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
