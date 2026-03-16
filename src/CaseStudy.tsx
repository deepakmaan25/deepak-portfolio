import { useParams, Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { caseStudies } from "@/data/caseStudies";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] as const },
});

const RevealSection = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] as const }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default function CaseStudy() {
  const { slug } = useParams();
  const cs = caseStudies.find((c) => c.slug === slug);

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  if (!cs) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-6">
        <p className="type-h2 text-foreground">Case study not found.</p>
        <Link to="/" className="type-body text-muted-foreground hover:text-foreground transition-colors">
          ← Back to home
        </Link>
      </div>
    );
  }

  const currentIndex = caseStudies.findIndex((c) => c.slug === slug);
  const prev = caseStudies[currentIndex - 1] ?? null;
  const next = caseStudies[currentIndex + 1] ?? null;

  return (
    <main className="min-h-screen bg-background text-foreground">

      {/* ── Back nav ── */}
      <div className="px-6 lg:px-8 max-w-site mx-auto pt-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 type-caption text-muted-foreground hover:text-foreground transition-colors"
        >
          ← All Projects
        </Link>
      </div>

      {/* ── Hero Band ── */}
      <section
        className="px-6 lg:px-8 max-w-site mx-auto mt-8 rounded-2xl py-20 lg:py-28"
        style={{ backgroundColor: cs.heroColor }}
      >
        <motion.div {...fadeUp(0)}>
          <p className="type-caption text-muted-foreground mb-4">{cs.tag}</p>
          <h1 className="type-h1 text-foreground mb-6 max-w-3xl">{cs.title}</h1>
          <p className="type-body-lg text-muted-foreground max-w-2xl mb-10">{cs.overview}</p>
        </motion.div>

        {/* Meta row */}
        <motion.div {...fadeUp(0.1)} className="flex flex-wrap gap-8 pt-8 border-t border-border">
          <div>
            <p className="type-caption text-muted-foreground mb-1">Duration</p>
            <p className="type-body text-foreground font-medium">{cs.duration}</p>
          </div>
          <div>
            <p className="type-caption text-muted-foreground mb-1">Year</p>
            <p className="type-body text-foreground font-medium">{cs.year}</p>
          </div>
          <div>
            <p className="type-caption text-muted-foreground mb-1">Key Result</p>
            <p className="type-body text-foreground font-medium">{cs.metric} {cs.metricLabel}</p>
          </div>
          <div>
            <p className="type-caption text-muted-foreground mb-1">Tools & Methods</p>
            <p className="type-body text-foreground font-medium">{cs.tools.join(" · ")}</p>
          </div>
        </motion.div>
      </section>

      {/* ── Outcomes Strip ── */}
      <RevealSection className="px-6 lg:px-8 max-w-site mx-auto mt-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {cs.outcomes.map((o) => (
            <div key={o.label} className="bg-secondary rounded-xl p-6">
              <p className="type-h2 text-foreground mb-1">{o.metric}</p>
              <p className="type-caption text-muted-foreground">{o.label}</p>
            </div>
          ))}
        </div>
      </RevealSection>

      {/* ── The Challenge ── */}
      <RevealSection className="px-6 lg:px-8 max-w-site mx-auto mt-24">
        <p className="type-caption text-muted-foreground mb-3">The Challenge</p>
        <h2 className="type-h2 text-foreground mb-6 max-w-2xl">What we were up against</h2>
        <p className="type-body text-muted-foreground max-w-2xl leading-relaxed">{cs.challenge}</p>
      </RevealSection>

      {/* ── Design Process ── */}
      <RevealSection className="px-6 lg:px-8 max-w-site mx-auto mt-24">
        <p className="type-caption text-muted-foreground mb-3">Design Process</p>
        <h2 className="type-h2 text-foreground mb-12 max-w-2xl">How we got there</h2>
        <div className="space-y-0">
          {cs.process.map((step, i) => (
            <div key={step.title} className="grid lg:grid-cols-[200px_1fr] gap-6 lg:gap-16 py-8 border-t border-border last:border-b">
              <div className="flex items-start gap-4">
                <span className="type-caption text-muted-foreground tabular-nums mt-0.5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="type-body text-foreground font-medium">{step.title}</p>
              </div>
              <p className="type-body text-muted-foreground leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </RevealSection>

      {/* ── Key Insights ── */}
      <RevealSection className="px-6 lg:px-8 max-w-site mx-auto mt-24">
        <p className="type-caption text-muted-foreground mb-3">Key Insights</p>
        <h2 className="type-h2 text-foreground mb-12 max-w-2xl">What the research revealed</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {cs.keyInsights.map((insight, i) => (
            <div key={i} className="bg-secondary rounded-xl p-6 flex gap-4">
              <span className="type-caption text-muted-foreground tabular-nums shrink-0 mt-0.5">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="type-body text-foreground leading-relaxed">{insight}</p>
            </div>
          ))}
        </div>
      </RevealSection>

      {/* ── Prev / Next ── */}
      <section className="px-6 lg:px-8 max-w-site mx-auto mt-24 pt-12 border-t border-border mb-24">
        <div className="flex justify-between items-center gap-6">
          {prev ? (
            <Link to={`/case-study/${prev.slug}`} className="group flex flex-col gap-1">
              <span className="type-caption text-muted-foreground group-hover:text-foreground transition-colors">← Previous</span>
              <span className="type-body text-foreground font-medium group-hover:opacity-70 transition-opacity">{prev.title}</span>
            </Link>
          ) : <div />}
          {next ? (
            <Link to={`/case-study/${next.slug}`} className="group flex flex-col gap-1 text-right">
              <span className="type-caption text-muted-foreground group-hover:text-foreground transition-colors">Next →</span>
              <span className="type-body text-foreground font-medium group-hover:opacity-70 transition-opacity">{next.title}</span>
            </Link>
          ) : <div />}
        </div>
      </section>

    </main>
  );
}
