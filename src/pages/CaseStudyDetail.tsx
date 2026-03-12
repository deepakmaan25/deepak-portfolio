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
  const prevCs = currentIndex > 0 ? caseStudies[currentIndex - 1] : null;
  const nextCs = currentIndex < caseStudies.length - 1 ? caseStudies[currentIndex + 1] : null;

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  if (!cs) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="type-h2 mb-4">Case study not found</h1>
          <Link to="/#work" className="text-muted-foreground hover:text-foreground transition-colors">← Back to Work</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <ScrollProgress />
      <Navigation />

      {/* Back button */}
      <div className="mt-24 mb-0 px-6 max-w-site mx-auto">
        <Link to="/#work" className="inline-flex items-center gap-2 text-[14px] text-muted-foreground hover:text-foreground transition-colors">
          ← Back to Work
        </Link>
      </div>

      {/* Hero Band */}
      <section className="py-20 px-6" style={{ background: cs.heroColor || 'rgba(196,181,253,0.15)' }}>
        <div className="max-w-site mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <p className="type-label mb-4">{cs.tag}</p>
            <h1 className="text-[44px] md:text-[56px] font-bold text-foreground leading-[1.1] mb-4">{cs.title}</h1>
            <p className="text-[18px] text-muted-foreground max-w-2xl mt-4">{cs.description}</p>

            {/* Outcome chips */}
            <div className="flex flex-wrap gap-2 mt-6">
              {cs.outcomes.map((o, i) => (
                <span key={i} className="inline-flex items-center px-3 py-1 border border-border rounded-full text-[13px] bg-background text-foreground">
                  {o.metric} {o.label}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Area */}
      <div className="max-w-[720px] mx-auto px-6 py-20 space-y-20">

        {/* Section A — The Challenge */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
          <p className="type-label mb-3">THE CHALLENGE</p>
          <h2 className="text-[28px] font-bold text-foreground mb-4">What problem were we solving?</h2>
          <p className="type-body text-muted-foreground mb-4">
            This project began with a clear gap between what users needed and what the existing product offered. Through discovery research, we uncovered friction points that were causing significant drop-off and frustration.
          </p>
          <p className="type-body text-muted-foreground">
            The goal was to redesign the core experience to be simpler, faster, and more aligned with real user mental models.
          </p>
        </motion.div>

        {/* Section B — Research */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
          <p className="type-label mb-3">RESEARCH</p>
          <h2 className="text-[28px] font-bold text-foreground mb-6">Understanding the users</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { emoji: "🎤", title: "User Interviews", desc: "Conducted 1:1 sessions to uncover pain points and mental models" },
              { emoji: "🔍", title: "Competitive Analysis", desc: "Mapped competitor strengths and gaps to find opportunity areas" },
              { emoji: "📋", title: "Usability Audit", desc: "Evaluated existing flows against heuristics to identify friction" },
            ].map((m) => (
              <div key={m.title} className="bg-surface border border-border rounded-xl p-5">
                <div className="font-bold text-foreground">{m.emoji} {m.title}</div>
                <p className="text-[13px] text-muted-foreground mt-2">{m.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Section C — Key Insights */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
          <p className="type-label mb-3">KEY INSIGHTS</p>
          <h2 className="text-[28px] font-bold text-foreground mb-6">What we learned</h2>
          <div className="space-y-4">
            {[
              { num: "01", title: "Users prioritised speed over features", desc: "The majority of users wanted to complete tasks in under 30 seconds. Feature richness was secondary to frictionless flow." },
              { num: "02", title: "Onboarding was the biggest drop-off point", desc: "Over 60% of new users abandoned during the first-time setup, citing confusion and too many required fields." },
              { num: "03", title: "Trust signals were missing at critical moments", desc: "Users hesitated at payment and data-sharing steps because the product lacked reassuring microcopy and visual cues." },
            ].map((insight) => (
              <div key={insight.num} className="border border-border rounded-2xl p-6 bg-background">
                <div className="text-[36px] font-bold leading-none" style={{ color: '#6366f1', opacity: 0.4 }}>{insight.num}</div>
                <h3 className="text-[17px] font-semibold text-foreground mt-1">{insight.title}</h3>
                <p className="text-[14px] text-muted-foreground mt-2">{insight.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Section D — Design Process */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
          <p className="type-label mb-3">DESIGN PROCESS</p>
          <h2 className="text-[28px] font-bold text-foreground mb-6">From sketch to prototype</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {["Wireframes", "User Flow", "Hi-Fi Prototype"].map((label) => (
              <div key={label} className="aspect-video bg-muted rounded-2xl flex items-center justify-center">
                <span className="text-[12px] text-muted-foreground">{label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Section E — Outcomes */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
          <p className="type-label mb-3">OUTCOMES</p>
          <h2 className="text-[28px] font-bold text-foreground mb-6">Measured impact</h2>
          <div className="flex flex-wrap gap-3">
            {cs.outcomes.map((o, i) => (
              <span key={i} className="text-[14px] px-4 py-2 border border-border rounded-full bg-background text-foreground">
                {o.metric} {o.label}
              </span>
            ))}
          </div>
          <p className="type-body text-muted-foreground mt-6">
            These results were validated through a second round of usability testing with the same participant group, confirming that the redesign meaningfully improved the core user experience.
          </p>
        </motion.div>
      </div>

      {/* Bottom Navigation Bar */}
      <div style={{ background: '#0C0C0F' }} className="py-6 px-6">
        <div className="max-w-site mx-auto flex items-center justify-between">
          {prevCs ? (
            <Link to={`/case-study/${prevCs.slug}`} className="text-[14px] text-white/70 hover:text-white transition-colors">
              ← {prevCs.title.split('—')[0].trim()}
            </Link>
          ) : <div />}
          <Link to="/#work" className="text-[14px] text-white/50 hover:text-white transition-colors">
            All Case Studies
          </Link>
          {nextCs ? (
            <Link to={`/case-study/${nextCs.slug}`} className="text-[14px] text-white/70 hover:text-white transition-colors">
              {nextCs.title.split('—')[0].trim()} →
            </Link>
          ) : <div />}
        </div>
      </div>
    </div>
  );
};

export default CaseStudyDetail;
