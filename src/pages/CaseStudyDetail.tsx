import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { caseStudies } from "@/data/caseStudies";
import Navigation from "@/components/Navigation";
import ScrollProgress from "@/components/ScrollProgress";
import { useEffect } from "react";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
};

const CaseStudyDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const cs = caseStudies.find((c) => c.slug === slug);
  const currentIndex = caseStudies.findIndex((c) => c.slug === slug);
  const prevCs = currentIndex > 0 ? caseStudies[currentIndex - 1] : null;
  const nextCs = currentIndex < caseStudies.length - 1 ? caseStudies[currentIndex + 1] : null;

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  if (!cs) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="type-h2 mb-4">Case study not found</h1>
          <Link to="/#work" className="text-muted-foreground hover:text-foreground transition-colors">
            ← Back to Work
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <ScrollProgress />
      <Navigation />

      {/* ── Back button ── */}
      <div className="pt-28 pb-0 px-6 lg:px-8 max-w-site mx-auto">
        <Link
          to="/#work"
          className="inline-flex items-center gap-2 type-caption text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Back to Work
        </Link>
      </div>

      {/* ── Hero Band ── */}
      <section
        className="mt-8 py-20 lg:py-28 px-6 lg:px-8"
        style={{ background: cs.heroColor || "hsl(260 100% 97%)" }}
      >
        <div className="max-w-site mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="type-label text-muted-foreground mb-4">{cs.tag}</p>
            <h1 className="type-h1 text-foreground mb-6 max-w-[900px]">{cs.title}</h1>
            <p className="type-body-lg text-muted-foreground max-w-[760px] mb-10">{cs.description}</p>

            {/* Meta row */}
            <div className="flex flex-wrap gap-x-12 gap-y-6 pt-8 border-t border-black/10">
              <div>
                <p className="type-caption text-muted-foreground mb-1">Duration</p>
                <p className="type-body font-medium text-foreground">{cs.duration}</p>
              </div>
              <div>
                <p className="type-caption text-muted-foreground mb-1">Year</p>
                <p className="type-body font-medium text-foreground">{cs.year}</p>
              </div>
              <div>
                <p className="type-caption text-muted-foreground mb-1">Key Result</p>
                <p className="type-body font-medium text-foreground">{cs.metric} {cs.metricLabel}</p>
              </div>
              <div>
                <p className="type-caption text-muted-foreground mb-1">Methods & Tools</p>
                <p className="type-body font-medium text-foreground">{cs.tools.join(" · ")}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Outcomes Strip ── */}
      <section className="px-6 lg:px-8 max-w-site mx-auto py-16">
        <motion.div {...fadeUp} className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {cs.outcomes.map((o) => (
            <div key={o.label} className="bg-secondary rounded-2xl p-6 lg:p-8">
              <p className="type-h2 text-foreground mb-1">{o.metric}</p>
              <p className="type-caption text-muted-foreground">{o.label}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ── Divider ── */}
      <div className="px-6 lg:px-8 max-w-site mx-auto"><div className="border-t border-border" /></div>

      {/* ── The Challenge ── */}
      <section className="px-6 lg:px-8 max-w-site mx-auto py-24">
        <motion.div {...fadeUp}>
          {/* Full-width header */}
          <div className="mb-10">
            <p className="type-label text-muted-foreground mb-3">The Challenge</p>
            <h2 className="type-h2 text-foreground">What we were up against</h2>
          </div>
          {/* Content — comfortable reading width */}
          <div className="max-w-[760px]">
            <p className="type-body-lg text-muted-foreground leading-relaxed">{cs.challenge}</p>
          </div>
        </motion.div>
      </section>

      {/* ── Divider ── */}
      <div className="px-6 lg:px-8 max-w-site mx-auto"><div className="border-t border-border" /></div>

      {/* ── Design Process ── */}
      <section className="px-6 lg:px-8 max-w-site mx-auto py-24">
        <motion.div {...fadeUp}>
          {/* Full-width header */}
          <div className="mb-12">
            <p className="type-label text-muted-foreground mb-3">Design Process</p>
            <h2 className="type-h2 text-foreground">How we got there</h2>
          </div>
        </motion.div>

        {/* Steps — constrained for readability */}
        <div className="max-w-[860px]">
          {cs.process.map((step, i) => (
            <motion.div
              key={step.title}
              {...fadeUp}
              className="py-8 border-t border-border last:border-b"
            >
              {/* Number + Title on same line */}
              <div className="flex items-baseline gap-4 mb-3">
                <span className="type-caption text-muted-foreground tabular-nums shrink-0 w-6">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="type-body font-semibold text-foreground">{step.title}</p>
              </div>
              {/* Description indented to align with title */}
              <div className="pl-10">
                <p className="type-body text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="px-6 lg:px-8 max-w-site mx-auto"><div className="border-t border-border" /></div>

      {/* ── Key Insights ── */}
      <section className="px-6 lg:px-8 max-w-site mx-auto py-24">
        <motion.div {...fadeUp}>
          {/* Full-width header */}
          <div className="mb-12">
            <p className="type-label text-muted-foreground mb-3">Key Insights</p>
            <h2 className="type-h2 text-foreground">What the research revealed</h2>
          </div>
        </motion.div>

        {/* Insight cards — 2 col grid, slightly inset */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 max-w-[1000px]">
          {cs.keyInsights.map((insight, i) => (
            <motion.div
              key={i}
              {...fadeUp}
              className="bg-secondary rounded-2xl p-6 lg:p-8 flex gap-5"
            >
              <span
                className="text-[40px] font-bold leading-none shrink-0 tabular-nums"
                style={{ color: "var(--role-color)", opacity: 0.3 }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="type-body text-foreground leading-relaxed">{insight}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="px-6 lg:px-8 max-w-site mx-auto"><div className="border-t border-border" /></div>

      {/* ── Artefacts (placeholder) ── */}
      <section className="px-6 lg:px-8 max-w-site mx-auto py-24">
        <motion.div {...fadeUp}>
          <div className="mb-12">
            <p className="type-label text-muted-foreground mb-3">Artefacts</p>
            <h2 className="type-h2 text-foreground">From sketch to prototype</h2>
          </div>
        </motion.div>

        <motion.div {...fadeUp} className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {["Wireframes", "User Flow", "Hi-Fi Prototype"].map((label) => (
            <div
              key={label}
              className="aspect-video bg-muted rounded-2xl flex items-center justify-center"
            >
              <span className="type-caption text-muted-foreground">{label}</span>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ── Divider ── */}
      <div className="px-6 lg:px-8 max-w-site mx-auto"><div className="border-t border-border" /></div>

      {/* ── Prev / Next ── */}
      <section className="px-6 lg:px-8 max-w-site mx-auto py-16">
        <div className="flex items-center justify-between">
          <div>
            {prevCs ? (
              <Link to={`/case-study/${prevCs.slug}`} className="group flex flex-col gap-2">
                <span className="type-caption text-muted-foreground group-hover:text-foreground transition-colors">
                  ← Previous
                </span>
                <span className="type-body font-semibold text-foreground group-hover:opacity-60 transition-opacity">
                  {prevCs.title.split("—")[0].trim()}
                </span>
              </Link>
            ) : <div />}
          </div>
          <div className="text-right">
            {nextCs ? (
              <Link to={`/case-study/${nextCs.slug}`} className="group flex flex-col gap-2 items-end">
                <span className="type-caption text-muted-foreground group-hover:text-foreground transition-colors">
                  Next →
                </span>
                <span className="type-body font-semibold text-foreground group-hover:opacity-60 transition-opacity">
                  {nextCs.title.split("—")[0].trim()}
                </span>
              </Link>
            ) : <div />}
          </div>
        </div>
      </section>

    </div>
  );
};

export default CaseStudyDetail;
