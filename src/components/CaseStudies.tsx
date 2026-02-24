import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { caseStudies } from "@/data/caseStudies";

const CaseStudyCard = ({ cs, index }: { cs: typeof caseStudies[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const isEven = index % 2 === 1;

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <Link
        to={`/case-study/${cs.slug}`}
        className="group block"
      >
        <div className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${isEven ? "lg:direction-rtl" : ""}`}>
          {/* Image */}
          <div className={`relative aspect-[4/3] overflow-hidden rounded-md bg-secondary ${isEven ? "lg:order-2" : ""}`}>
            <div className="absolute inset-0 bg-gradient-to-br from-secondary to-border opacity-60" />
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
                backgroundSize: '48px 48px',
              }}
            />
            <img
              src={cs.image}
              alt={cs.title}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </div>

          {/* Content */}
          <div className={`${isEven ? "lg:order-1" : ""}`}>
            <div className="type-number text-border mb-4">{cs.id}</div>
            <h3 className="type-h1 text-foreground mb-3 group-hover:opacity-70 transition-opacity">
              {cs.title}
            </h3>
            <p className="type-body text-muted-foreground mb-6 max-w-md">
              {cs.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {cs.tools.slice(0, 3).map((tool) => (
                <span
                  key={tool}
                  className="type-caption text-muted-foreground px-3 py-1 rounded-full border border-border text-[11px]"
                >
                  {tool}
                </span>
              ))}
            </div>

            <span className="type-body text-foreground font-medium group-hover:opacity-70 transition-opacity">
              View Case Study →
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
};

const CaseStudies = () => {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });

  return (
    <section id="work" className="py-[120px] max-md:py-16 px-6 lg:px-8 max-w-site mx-auto">
      <motion.div
        ref={headerRef}
        initial={{ opacity: 0, y: 20 }}
        animate={headerInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="mb-16"
      >
        <p className="type-caption text-muted-foreground mb-3">Selected Work</p>
        <h2 className="type-h2 text-foreground">Projects I'm proud of</h2>
      </motion.div>

      <div className="space-y-24 lg:space-y-32">
        {caseStudies.map((cs, i) => (
          <CaseStudyCard key={cs.id} cs={cs} index={i} />
        ))}
      </div>
    </section>
  );
};

export default CaseStudies;
