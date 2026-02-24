import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { caseStudies } from "@/data/caseStudies";
import Navigation from "@/components/Navigation";
import Contact from "@/components/Contact";
import { useEffect } from "react";

const CaseStudyDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const cs = caseStudies.find((c) => c.slug === slug);
  const currentIndex = caseStudies.findIndex((c) => c.slug === slug);
  const nextCs = caseStudies[(currentIndex + 1) % caseStudies.length];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!cs) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="type-display text-foreground mb-4">Case study not found</h1>
          <Link to="/" className="type-caption text-muted-foreground hover:text-foreground transition-colors">← Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="pt-28 pb-16 px-6 lg:px-8 max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <Link to="/#work" className="inline-flex items-center gap-2 type-caption text-muted-foreground hover:text-foreground transition-colors mb-10">
            ← All Work
          </Link>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.05 }}>
          <p className="type-label text-muted-foreground mb-4">{cs.tag}</p>
          <h1 className="type-display-large text-foreground mb-6 max-w-3xl">{cs.title}</h1>
          <p className="type-body text-muted-foreground max-w-2xl mb-8">{cs.description}</p>
        </motion.div>

        {/* Meta */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="flex flex-wrap gap-8 mb-12"
        >
          {[
            { label: "Duration", value: cs.duration },
            { label: "Year", value: cs.year },
            { label: "Key Metric", value: `${cs.metric} ${cs.metricLabel}` },
          ].map(({ label, value }) => (
            <div key={label}>
              <div className="type-label text-muted-foreground mb-1">{label}</div>
              <div className="type-body font-medium text-foreground">{value}</div>
            </div>
          ))}
        </motion.div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full aspect-[16/9] overflow-hidden rounded-lg bg-secondary"
        >
          <img src={cs.image} alt={cs.title} className="w-full h-full object-cover" />
        </motion.div>

        {/* Tools */}
        <div className="flex flex-wrap gap-2 mt-6">
          {cs.tools.map((tool) => (
            <span key={tool} className="text-xs px-3 py-1.5 rounded-full bg-secondary text-muted-foreground">
              {tool}
            </span>
          ))}
        </div>
      </section>

      {/* Overview & Challenge */}
      <section className="py-16 lg:py-24 px-6 lg:px-8 max-w-6xl mx-auto border-t border-border">
        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <h2 className="type-headline text-foreground mb-4">Overview</h2>
            <p className="type-body text-muted-foreground">{cs.overview}</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.05 }}>
            <h2 className="type-headline text-foreground mb-4">The Challenge</h2>
            <p className="type-body text-muted-foreground">{cs.challenge}</p>
          </motion.div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 lg:py-24 px-6 lg:px-8 max-w-6xl mx-auto border-t border-border">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="type-headline text-foreground mb-12"
        >
          Design Process
        </motion.h2>

        <div className="space-y-0">
          {cs.process.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="grid lg:grid-cols-[60px_1fr] gap-4 py-8 border-b border-border"
            >
              <div className="text-2xl font-medium text-border">{String(i + 1).padStart(2, "0")}</div>
              <div>
                <h3 className="type-title text-foreground mb-2">{step.title}</h3>
                <p className="type-body text-muted-foreground max-w-2xl">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Outcomes */}
      <section className="py-16 lg:py-24 bg-foreground">
        <div className="px-6 lg:px-8 max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="type-headline text-background mb-12"
          >
            Results & Impact
          </motion.h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {cs.outcomes.map((outcome, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <div className="text-3xl lg:text-4xl font-medium text-background mb-1">{outcome.metric}</div>
                <div className="type-caption text-background/50">{outcome.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Insights */}
      <section className="py-16 lg:py-24 px-6 lg:px-8 max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="type-headline text-foreground mb-12"
        >
          Key Insights
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6">
          {cs.keyInsights.map((insight, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="p-6 rounded-lg bg-secondary"
            >
              <div className="text-xl font-medium text-border mb-3">{String(i + 1).padStart(2, "0")}</div>
              <p className="type-body text-muted-foreground">{insight}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Next Case Study */}
      {nextCs && (
        <section className="border-t border-border">
          <Link
            to={`/case-study/${nextCs.slug}`}
            className="group block px-6 lg:px-8 py-16 max-w-6xl mx-auto"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="type-label text-muted-foreground mb-2">Next Project</p>
                <h3 className="type-headline text-foreground group-hover:opacity-60 transition-opacity">
                  {nextCs.title}
                </h3>
              </div>
              <span className="text-2xl text-foreground group-hover:translate-x-2 transition-transform duration-300">→</span>
            </div>
          </Link>
        </section>
      )}

      <Contact />
    </div>
  );
};

export default CaseStudyDetail;
