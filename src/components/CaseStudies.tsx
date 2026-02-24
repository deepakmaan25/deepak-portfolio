import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { caseStudies } from "@/data/caseStudies";

const CaseStudyCard = ({ cs, index }: { cs: typeof caseStudies[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        to={`/case-study/${cs.slug}`}
        className="group block"
      >
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-secondary mb-5">
          <img
            src={cs.image}
            alt={cs.title}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>

        {/* Content */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="type-label text-muted-foreground mb-2">{cs.tag}</div>
            <h3 className="type-headline text-foreground group-hover:opacity-70 transition-opacity mb-2">
              {cs.title}
            </h3>
            <p className="type-caption text-muted-foreground max-w-md">
              {cs.description}
            </p>
          </div>
          <div className="flex-shrink-0 mt-1">
            <div className="text-xl font-medium text-foreground">{cs.metric}</div>
            <div className="type-caption text-muted-foreground">{cs.metricLabel}</div>
          </div>
        </div>

        {/* Tools */}
        <div className="flex flex-wrap gap-2 mt-4">
          {cs.tools.slice(0, 4).map((tool) => (
            <span key={tool} className="text-xs px-2.5 py-1 rounded-full bg-secondary text-muted-foreground">
              {tool}
            </span>
          ))}
        </div>
      </Link>
    </motion.article>
  );
};

const CaseStudies = () => {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });

  return (
    <section id="work" className="py-24 lg:py-32 px-6 lg:px-8 max-w-6xl mx-auto">
      <motion.div
        ref={headerRef}
        initial={{ opacity: 0, y: 20 }}
        animate={headerInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="mb-16"
      >
        <p className="type-label text-muted-foreground mb-3">Selected Work</p>
        <h2 className="type-display text-foreground">Case Studies</h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
        {caseStudies.map((cs, i) => (
          <CaseStudyCard key={cs.id} cs={cs} index={i} />
        ))}
      </div>
    </section>
  );
};

export default CaseStudies;
