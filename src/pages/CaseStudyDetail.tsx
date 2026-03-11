import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { caseStudies } from "@/data/caseStudies";
import Navigation from "@/components/Navigation";
import ScrollProgress from "@/components/ScrollProgress";
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
      <ScrollProgress />
      <Navigation />

      {/* Hero */}
      <section className="pt-28 pb-16 px-6" style={{ background: cs.heroColor }}>
        <div className="max-w-site mx-auto">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <Link to="/#work" className="text-[14px] text-muted-foreground hover:text-foreground transition-colors mb-10 inline-block">
              ← Back to Work
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.05 }}>
            <p className="type-label mb-4">{cs.tag}</p>
            <h1 className="type-h1 mb-6 max-w-3xl">{cs.title}</h1>
            <p className="type-body-lg text-text-body max-w-2xl mb-8">{cs.description}</p>

            {/* Outcome chips */}
            <div className="flex flex-wrap gap-2">
              {cs.outcomes.map((o, i) => (
                <span key={i} className="inline-flex items-center px-3 py-1.5 bg-background border border-border rounded-full text-[12px] text-foreground">
                  {o.metric} {o.label}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Meta */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.12 }} className="flex flex-wrap gap-10 mt-10">
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
        </div>
      </section>

      {/* Hero Image */}
      <section className="px-6 max-w-site mx-auto -mt-0 pt-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }} className="w-full aspect-[16/9] overflow-hidden rounded-xl bg-muted">
          <img src={cs.image} alt={cs.title} loading="lazy" className="w-full h-full object-cover" />
        </motion.div>
        <div className="flex flex-wrap gap-2 mt-6">
          {cs.tools.map((tool) => (
            <span key={tool} className="px-3.5 py-1.5 border border-tag-border rounded-full text-[13px] text-text-body bg-background">{tool}</span>
          ))}
        </div>
      </section>

      {/* The Problem */}
      <section className="py-16 lg:py-24 px-6 max-w-[720px] mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
          <p className="type-label mb-3">THE PROBLEM</p>
          <h2 className="type-h2 mb-6">The Challenge</h2>
          <p className="type-body text-text-body mb-4">{cs.challenge}</p>
          <p className="type-body text-text-body">{cs.overview}</p>
        </motion.div>
      </section>

      {/* Research & Discovery */}
      <section className="py-16 lg:py-24 px-6 max-w-[720px] mx-auto border-t border-border">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
          <p className="type-label mb-3">RESEARCH & DISCOVERY</p>
          <h2 className="type-h2 mb-8">Methods Used</h2>
          <ul className="space-y-3">
            {cs.tools.map((tool, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2.5 flex-shrink-0" style={{ background: '#6366f1' }} />
                <span className="type-body text-text-body">{tool}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </section>

      {/* Key Insights */}
      <section className="py-16 lg:py-24 px-6 max-w-[720px] mx-auto border-t border-border">
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="type-label mb-3">KEY INSIGHTS</p>
          <h2 className="type-h2 mb-10">What We Learned</h2>
        </motion.div>
        <div className="space-y-4">
          {cs.keyInsights.map((insight, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="p-6 rounded-xl bg-surface border border-border">
              <div className="text-xl font-bold text-border mb-3">{String(i + 1).padStart(2, "0")}</div>
              <p className="type-body text-text-body">{insight}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Design Process */}
      <section className="py-16 lg:py-24 px-6 max-w-[720px] mx-auto border-t border-border">
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="type-label mb-3">DESIGN PROCESS</p>
          <h2 className="type-h2 mb-10">How We Got There</h2>
        </motion.div>

        {/* Placeholder process images */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {[1, 2, 3].map((n) => (
            <div key={n} className="aspect-[3/4] rounded-xl bg-muted" />
          ))}
        </div>

        <div className="space-y-0">
          {cs.process.map((step, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }} className="grid grid-cols-[60px_1fr] gap-4 py-8 border-b border-border">
              <div className="text-2xl font-bold text-border">{String(i + 1).padStart(2, "0")}</div>
              <div>
                <h3 className="text-[18px] font-bold text-foreground mb-2">{step.title}</h3>
                <p className="type-body text-text-body">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Outcomes & Impact */}
      <section className="py-16 lg:py-24" style={{ background: 'hsl(var(--quote-block-bg))' }}>
        <div className="px-6 max-w-[720px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="type-label mb-3" style={{ color: 'hsl(var(--quote-block-text) / 0.4)' }}>OUTCOMES & IMPACT</p>
            <h2 className="type-h2 mb-10" style={{ color: 'hsl(var(--quote-block-text))' }}>Results</h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            {cs.outcomes.map((outcome, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
                <div className="text-3xl lg:text-4xl font-bold mb-1" style={{ color: 'hsl(var(--quote-block-text))' }}>{outcome.metric}</div>
                <div className="type-label" style={{ color: 'hsl(var(--quote-block-text) / 0.5)' }}>{outcome.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Outcome chips */}
          <div className="flex flex-wrap gap-2">
            {cs.outcomes.map((o, i) => (
              <span key={i} className="inline-flex items-center px-3 py-1.5 rounded-full text-[12px] font-medium" style={{ background: 'rgba(99,102,241,0.15)', color: '#818cf8' }}>
                {o.metric} {o.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Next Case Study */}
      {nextCs && (
        <section className="border-t border-border">
          <div className="px-6 max-w-site mx-auto">
            <Link to={`/case-study/${nextCs.slug}`} className="group block py-16">
              <div className="flex items-center justify-between">
                <div>
                  <p className="type-label mb-2">Next Project</p>
                  <h3 className="type-h2 group-hover:opacity-60 transition-opacity">{nextCs.title}</h3>
                </div>
                <span className="text-2xl text-foreground group-hover:translate-x-2 transition-transform duration-200">→</span>
              </div>
            </Link>
            <div className="border-t border-border py-4">
              <Link to="/#work" className="text-[14px] text-muted-foreground hover:text-foreground transition-colors">
                ← View All Work
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer style={{ background: '#0C0C0F' }} className="py-12">
        <div className="px-6 max-w-site mx-auto text-center">
          <span className="text-[12px]" style={{ color: '#444444' }}>Designed & built by Deepak Maan · 2025</span>
        </div>
      </footer>
    </div>
  );
};

export default CaseStudyDetail;
