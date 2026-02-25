import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { caseStudies } from "@/data/caseStudies";
import Navigation from "@/components/Navigation";
import { useEffect } from "react";

const CaseStudyDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const cs = caseStudies.find((c) => c.slug === slug);
  const currentIndex = caseStudies.findIndex((c) => c.slug === slug);
  const nextCs = caseStudies[(currentIndex + 1) % caseStudies.length];

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  if (!cs) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="type-h2 mb-4">Case study not found</h1>
          <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">← Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="pt-28 pb-16 px-6 max-w-site mx-auto">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <Link to="/#work" className="text-[14px] text-muted-foreground hover:text-foreground transition-colors mb-10 inline-block">
            ← All Work
          </Link>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.05 }}>
          <p className="type-label mb-4">{cs.tag}</p>
          <h1 className="type-h1 mb-6 max-w-3xl">{cs.title}</h1>
          <p className="type-body-lg text-text-body max-w-2xl mb-10">{cs.description}</p>
        </motion.div>

        {/* Meta */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.12 }} className="flex flex-wrap gap-10 mb-12">
          {[
            { label: "Duration", value: cs.duration },
            { label: "Year", value: cs.year },
            { label: "Key Metric", value: `${cs.metric} ${cs.metricLabel}` },
          ].map(({ label, value }) => (
            <div key={label}>
              <div className="type-label mb-1">{label}</div>
              <div className="text-[15px] font-semibold text-foreground">{value}</div>
            </div>
          ))}
        </motion.div>

        {/* Hero Image */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }} className="w-full aspect-[16/9] overflow-hidden rounded-xl bg-muted">
          <img src={cs.image} alt={cs.title} loading="lazy" className="w-full h-full object-cover" />
        </motion.div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-6">
          {cs.tools.map((tool) => (
            <span key={tool} className="px-3.5 py-1.5 border border-tag-border rounded-full text-[13px] text-text-body bg-background">{tool}</span>
          ))}
        </div>
      </section>

      {/* Overview & Challenge */}
      <section className="py-16 lg:py-24 px-6 max-w-site mx-auto border-t border-border">
        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
            <h2 className="type-h3 text-foreground mb-4">Overview</h2>
            <p className="type-body text-text-body">{cs.overview}</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.05 }}>
            <h2 className="type-h3 text-foreground mb-4">The Challenge</h2>
            <p className="type-body text-text-body">{cs.challenge}</p>
          </motion.div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 lg:py-24 px-6 max-w-site mx-auto border-t border-border">
        <motion.h2 initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="type-h3 text-foreground mb-12">
          Design Process
        </motion.h2>
        <div className="space-y-0">
          {cs.process.map((step, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }} className="grid lg:grid-cols-[60px_1fr] gap-4 py-8 border-b border-border">
              <div className="text-2xl font-bold text-border">{String(i + 1).padStart(2, "0")}</div>
              <div>
                <h3 className="text-[18px] font-bold text-foreground mb-2">{step.title}</h3>
                <p className="type-body text-text-body max-w-2xl">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Outcomes */}
      <section className="py-16 lg:py-24 bg-foreground">
        <div className="px-6 max-w-site mx-auto">
          <motion.h2 initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="type-h3 text-primary-foreground mb-12">
            Results & Impact
          </motion.h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {cs.outcomes.map((outcome, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
                <div className="text-3xl lg:text-4xl font-bold text-primary-foreground mb-1">{outcome.metric}</div>
                <div className="type-label text-primary-foreground/50">{outcome.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Insights */}
      <section className="py-16 lg:py-24 px-6 max-w-site mx-auto">
        <motion.h2 initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="type-h3 text-foreground mb-12">
          Key Insights
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-6">
          {cs.keyInsights.map((insight, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="p-6 rounded-xl bg-surface">
              <div className="text-xl font-bold text-border mb-3">{String(i + 1).padStart(2, "0")}</div>
              <p className="type-body text-text-body">{insight}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Next Case Study */}
      {nextCs && (
        <section className="border-t border-border">
          <Link to={`/case-study/${nextCs.slug}`} className="group block px-6 py-16 max-w-site mx-auto">
            <div className="flex items-center justify-between">
              <div>
                <p className="type-label mb-2">Next Project</p>
                <h3 className="type-h2 group-hover:opacity-60 transition-opacity">{nextCs.title}</h3>
              </div>
              <span className="text-2xl text-foreground group-hover:translate-x-2 transition-transform duration-200">→</span>
            </div>
          </Link>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-foreground py-12">
        <div className="px-6 max-w-site mx-auto text-center">
          <span className="text-[12px] text-primary-foreground/30">Designed & built by Deepak Maan · 2025</span>
        </div>
      </footer>
    </div>
  );
};

export default CaseStudyDetail;
