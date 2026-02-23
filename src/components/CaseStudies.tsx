import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { caseStudies } from "@/data/caseStudies";

const CaseStudyCard = ({ cs, index }: { cs: typeof caseStudies[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15 }}
    >
      <Link
        to={`/case-study/${cs.slug}`}
        className="group relative grid lg:grid-cols-[1fr_480px] gap-0 border border-border overflow-hidden cursor-pointer hover:border-terracotta/30 transition-all duration-500 block"
      >
        {/* Content */}
        <div className="p-8 lg:p-12 flex flex-col justify-between bg-cream group-hover:bg-surface transition-colors duration-300">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <span className="font-display text-6xl font-bold text-border/60 group-hover:text-terracotta/20 transition-colors duration-300">
                {cs.id}
              </span>
              <span className="font-body text-[10px] font-semibold tracking-[0.2em] uppercase text-terracotta border border-terracotta/30 px-3 py-1">
                {cs.tag}
              </span>
            </div>

            <h3 className="font-display text-2xl lg:text-3xl font-semibold text-charcoal mb-4 leading-tight group-hover:text-terracotta transition-colors duration-300">
              {cs.title}
            </h3>

            <p className="font-body text-sm text-warm-gray leading-relaxed max-w-md">
              {cs.description}
            </p>

            {/* Metric callout */}
            <div className="mt-6 inline-flex items-baseline gap-2 px-4 py-2 bg-charcoal/5 group-hover:bg-terracotta/10 transition-colors duration-300">
              <span className="font-display text-2xl font-bold text-charcoal group-hover:text-terracotta transition-colors duration-300">{cs.metric}</span>
              <span className="font-body text-xs text-warm-gray">{cs.metricLabel}</span>
            </div>
          </div>

          <div className="mt-8 flex items-end justify-between flex-wrap gap-4">
            <div className="flex flex-wrap gap-2">
              {cs.tools.slice(0, 3).map((tool) => (
                <span key={tool} className="font-body text-[11px] font-medium px-2.5 py-1 bg-muted text-warm-gray">
                  {tool}
                </span>
              ))}
            </div>
            <div className="font-body text-xs text-warm-gray">{cs.duration} · {cs.year}</div>
          </div>

          <div className="mt-6 flex items-center gap-2 text-sm font-body font-medium text-charcoal group-hover:text-terracotta transition-colors duration-300">
            <span>Read Case Study</span>
            <span className="transition-transform duration-300 group-hover:translate-x-2">→</span>
          </div>
        </div>

        {/* Image */}
        <div className="relative h-64 lg:h-auto overflow-hidden">
          <img
            src={cs.image}
            alt={cs.title}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-charcoal/10 group-hover:bg-charcoal/0 transition-colors duration-500" />
        </div>
      </Link>
    </motion.article>
  );
};

const CaseStudies = () => {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });

  return (
    <section id="work" className="py-24 lg:py-32 px-6 lg:px-12 max-w-7xl mx-auto">
      <motion.div
        ref={headerRef}
        initial={{ opacity: 0, y: 30 }}
        animate={headerInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="flex items-end justify-between mb-16 gap-4 flex-wrap"
      >
        <div>
          <span className="inline-flex items-center gap-3 font-body text-xs font-medium tracking-[0.25em] uppercase text-warm-gray mb-3">
            <span className="w-8 h-px bg-terracotta" />
            Selected Work
          </span>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-charcoal">
            Case Studies
          </h2>
        </div>
        <p className="font-body text-sm text-warm-gray max-w-xs text-right hidden sm:block">
          Each project is a story — of problems, people, and purposeful design.
        </p>
      </motion.div>

      <div className="space-y-8">
        {caseStudies.map((cs, i) => (
          <CaseStudyCard key={cs.id} cs={cs} index={i} />
        ))}
      </div>
    </section>
  );
};

export default CaseStudies;
