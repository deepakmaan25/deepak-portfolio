import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { caseStudies } from "@/data/caseStudies";
import Navigation from "@/components/Navigation";
import Contact from "@/components/Contact";

const CaseStudyDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const cs = caseStudies.find((c) => c.slug === slug);
  const currentIndex = caseStudies.findIndex((c) => c.slug === slug);
  const nextCs = caseStudies[(currentIndex + 1) % caseStudies.length];

  if (!cs) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-4xl font-bold text-charcoal mb-4">Case study not found</h1>
          <Link to="/" className="font-body text-sm text-terracotta hover:underline">← Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="pt-28 pb-16 px-6 lg:px-12 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Link to="/#work" className="inline-flex items-center gap-2 font-body text-sm text-warm-gray hover:text-charcoal transition-colors mb-8">
            <span>←</span> Back to Work
          </Link>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-end mb-12">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
            <span className="inline-flex items-center gap-3 font-body text-[10px] font-semibold tracking-[0.2em] uppercase text-terracotta border border-terracotta/30 px-3 py-1 mb-6">
              {cs.tag}
            </span>
            <h1 className="font-display text-3xl lg:text-5xl xl:text-6xl font-bold text-charcoal leading-tight mb-6">
              {cs.title}
            </h1>
            <p className="font-body text-base lg:text-lg text-warm-gray leading-relaxed max-w-2xl">
              {cs.description}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap gap-6 lg:gap-8"
          >
            <div>
              <div className="font-body text-[10px] tracking-[0.2em] uppercase text-warm-gray mb-1">Duration</div>
              <div className="font-display text-lg font-semibold text-charcoal">{cs.duration}</div>
            </div>
            <div>
              <div className="font-body text-[10px] tracking-[0.2em] uppercase text-warm-gray mb-1">Year</div>
              <div className="font-display text-lg font-semibold text-charcoal">{cs.year}</div>
            </div>
            <div>
              <div className="font-body text-[10px] tracking-[0.2em] uppercase text-warm-gray mb-1">Key Metric</div>
              <div className="font-display text-lg font-semibold text-terracotta">{cs.metric} <span className="text-sm font-normal text-warm-gray">{cs.metricLabel}</span></div>
            </div>
          </motion.div>
        </div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="w-full aspect-[16/9] overflow-hidden border border-border"
        >
          <img src={cs.image} alt={cs.title} className="w-full h-full object-cover" />
        </motion.div>

        {/* Tools */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap gap-2 mt-6"
        >
          {cs.tools.map((tool) => (
            <span key={tool} className="font-body text-[11px] font-medium px-3 py-1.5 bg-muted text-warm-gray">
              {tool}
            </span>
          ))}
        </motion.div>
      </section>

      {/* Overview & Challenge */}
      <section className="py-16 lg:py-24 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="font-display text-2xl lg:text-3xl font-bold text-charcoal mb-6">Overview</h2>
            <p className="font-body text-sm lg:text-base text-warm-gray leading-relaxed">{cs.overview}</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
            <h2 className="font-display text-2xl lg:text-3xl font-bold text-charcoal mb-6">The Challenge</h2>
            <p className="font-body text-sm lg:text-base text-warm-gray leading-relaxed">{cs.challenge}</p>
          </motion.div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16 lg:py-24 px-6 lg:px-12 max-w-7xl mx-auto border-t border-border">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-2xl lg:text-3xl font-bold text-charcoal mb-16"
        >
          Design Process
        </motion.h2>

        <div className="space-y-0">
          {cs.process.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="grid lg:grid-cols-[80px_1fr] gap-6 py-10 border-b border-border group"
            >
              <div className="font-display text-4xl font-bold text-border group-hover:text-terracotta/40 transition-colors">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold text-charcoal mb-3">{step.title}</h3>
                <p className="font-body text-sm text-warm-gray leading-relaxed max-w-2xl">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Outcomes */}
      <section className="py-16 lg:py-24 bg-charcoal">
        <div className="px-6 lg:px-12 max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-2xl lg:text-3xl font-bold text-cream mb-12"
          >
            Results & Impact
          </motion.h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-cream/10">
            {cs.outcomes.map((outcome, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-charcoal p-8 text-center"
              >
                <div className="font-display text-4xl lg:text-5xl font-bold text-terracotta mb-2">{outcome.metric}</div>
                <div className="font-body text-xs text-cream/60 tracking-wide">{outcome.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Insights */}
      <section className="py-16 lg:py-24 px-6 lg:px-12 max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-2xl lg:text-3xl font-bold text-charcoal mb-12"
        >
          Key Insights
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6">
          {cs.keyInsights.map((insight, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="p-6 border border-border hover:border-terracotta/30 transition-colors group"
            >
              <div className="font-display text-3xl font-bold text-border group-hover:text-terracotta/30 transition-colors mb-4">
                {String(i + 1).padStart(2, "0")}
              </div>
              <p className="font-body text-sm text-warm-gray leading-relaxed">{insight}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Next Case Study */}
      {nextCs && (
        <section className="border-t border-border">
          <Link
            to={`/case-study/${nextCs.slug}`}
            className="block group px-6 lg:px-12 py-16 max-w-7xl mx-auto"
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="font-body text-xs text-warm-gray tracking-[0.2em] uppercase mb-2 block">Next Case Study</span>
                <h3 className="font-display text-2xl lg:text-3xl font-bold text-charcoal group-hover:text-terracotta transition-colors">
                  {nextCs.title}
                </h3>
              </div>
              <span className="text-3xl text-charcoal group-hover:text-terracotta group-hover:translate-x-2 transition-all duration-300">→</span>
            </div>
          </Link>
        </section>
      )}

      <Contact />
    </div>
  );
};

export default CaseStudyDetail;
