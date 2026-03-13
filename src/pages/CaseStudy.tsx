import { useParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { caseStudies } from "@/data/caseStudies";

const CaseStudy = () => {
  const { slug } = useParams();
  const cs = caseStudies.find(c => c.slug === slug);
  const currentIndex = caseStudies.findIndex(c => c.slug === slug);
  const prevCs = currentIndex > 0 ? caseStudies[currentIndex - 1] : null;
  const nextCs = currentIndex < caseStudies.length - 1 ? caseStudies[currentIndex + 1] : null;

  if (!cs) return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
      <h1 className="text-[24px] font-bold text-foreground">Case study not found</h1>
      <Link to="/#work" className="text-[14px] text-muted-foreground hover:text-foreground transition-colors">← Back to Work</Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-24 px-6 max-w-site mx-auto">
        <Link to="/#work" className="inline-flex items-center gap-2 text-[14px] text-muted-foreground hover:text-foreground transition-colors mb-10">
          ← Back to Work
        </Link>
      </div>

      {/* Hero band */}
      <div className="w-full px-6 py-20" style={{ background: cs.heroColor || 'rgba(196,181,253,0.15)' }}>
        <div className="max-w-site mx-auto">
          <p className="type-label mb-4">{cs.tag}</p>
          <h1 className="text-[44px] md:text-[56px] font-bold text-foreground leading-tight mb-4 max-w-3xl">{cs.title}</h1>
          <p className="text-[18px] text-muted-foreground max-w-2xl mb-6">{cs.description}</p>
          <div className="flex flex-wrap gap-2">
            {cs.outcomes?.map((o, i) => (
              <span key={i} className="inline-flex items-center px-3 py-1.5 bg-background border border-border rounded-full text-[13px] text-foreground">
                {o.metric} {o.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[720px] mx-auto px-6 py-20 space-y-20">

        {/* The Challenge */}
        <div>
          <p className="type-label mb-3">THE CHALLENGE</p>
          <h2 className="text-[28px] font-bold text-foreground mb-4">What problem were we solving?</h2>
          <p className="type-body text-muted-foreground mb-4">This project began with a clear gap between what users needed and what the existing product offered. Through discovery research, we uncovered friction points that were causing significant drop-off and frustration.</p>
          <p className="type-body text-muted-foreground">The goal was to redesign the core experience to be simpler, faster, and more aligned with real user mental models — grounded in evidence, not assumptions.</p>
        </div>

        {/* Research */}
        <div>
          <p className="type-label mb-3">RESEARCH</p>
          <h2 className="text-[28px] font-bold text-foreground mb-6">Understanding the users</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { icon: '🎤', title: 'User Interviews', desc: 'Conducted 1:1 sessions to uncover pain points and real mental models' },
              { icon: '🔍', title: 'Competitive Analysis', desc: 'Mapped competitor strengths and gaps to find opportunity areas' },
              { icon: '📋', title: 'Usability Audit', desc: 'Evaluated existing flows against heuristics to identify friction points' },
            ].map((m) => (
              <div key={m.title} className="bg-surface border border-border rounded-xl p-5">
                <div className="text-[24px] mb-3">{m.icon}</div>
                <div className="text-[15px] font-semibold text-foreground mb-2">{m.title}</div>
                <p className="text-[13px] text-muted-foreground leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Key Insights */}
        <div>
          <p className="type-label mb-3">KEY INSIGHTS</p>
          <h2 className="text-[28px] font-bold text-foreground mb-6">What we learned</h2>
          <div className="space-y-4">
            {[
              { num: '01', title: 'Users prioritised speed over features', desc: 'The majority of users wanted to complete tasks in under 30 seconds. Feature richness was secondary to frictionless flow.' },
              { num: '02', title: 'Onboarding was the biggest drop-off point', desc: 'Over 60% of new users abandoned during first-time setup, citing confusion and too many required fields.' },
              { num: '03', title: 'Trust signals were missing at critical moments', desc: 'Users hesitated at payment and data-sharing steps because the product lacked reassuring microcopy and visual cues.' },
            ].map((insight) => (
              <div key={insight.num} className="border border-border rounded-2xl p-6 bg-background hover:bg-surface transition-colors duration-200">
                <div className="text-[36px] font-bold leading-none mb-2" style={{ color: 'rgba(99,102,241,0.35)' }}>{insight.num}</div>
                <div className="text-[17px] font-semibold text-foreground mb-2">{insight.title}</div>
                <p className="text-[14px] text-muted-foreground leading-relaxed">{insight.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Design Process */}
        <div>
          <p className="type-label mb-3">DESIGN PROCESS</p>
          <h2 className="text-[28px] font-bold text-foreground mb-6">From sketch to prototype</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {['Wireframes', 'User Flow', 'Hi-Fi Prototype'].map((label) => (
              <div key={label} className="aspect-video bg-muted rounded-2xl flex items-center justify-center">
                <span className="text-[12px] text-muted-foreground">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Outcomes */}
        <div>
          <p className="type-label mb-3">OUTCOMES</p>
          <h2 className="text-[28px] font-bold text-foreground mb-6">Measured impact</h2>
          <div className="flex flex-wrap gap-3 mb-6">
            {cs.outcomes?.map((o, i) => (
              <span key={i} className="inline-flex items-center px-4 py-2 bg-surface border border-border rounded-full text-[14px] text-foreground font-medium">
                {o.metric} {o.label}
              </span>
            ))}
          </div>
          <p className="type-body text-muted-foreground">These results were validated through a second round of usability testing with the same participant group, confirming that the redesign meaningfully improved the core user experience.</p>
        </div>

      </div>

      {/* Bottom nav */}
      <div style={{ background: '#0C0C0F' }} className="py-6 px-6">
        <div className="max-w-site mx-auto flex items-center justify-between">
          <div>
            {prevCs && (
              <Link to={`/case-study/${prevCs.slug}`} className="text-[14px] transition-colors" style={{ color: 'rgba(255,255,255,0.5)' }}
                onMouseEnter={e => e.currentTarget.style.color='white'} onMouseLeave={e => e.currentTarget.style.color='rgba(255,255,255,0.5)'}>
                ← {prevCs.title}
              </Link>
            )}
          </div>
          <Link to="/#work" className="text-[14px] transition-colors" style={{ color: 'rgba(255,255,255,0.5)' }}
            onMouseEnter={e => e.currentTarget.style.color='white'} onMouseLeave={e => e.currentTarget.style.color='rgba(255,255,255,0.5)'}>
            All Case Studies
          </Link>
          <div>
            {nextCs && (
              <Link to={`/case-study/${nextCs.slug}`} className="text-[14px] transition-colors" style={{ color: 'rgba(255,255,255,0.5)' }}
                onMouseEnter={e => e.currentTarget.style.color='white'} onMouseLeave={e => e.currentTarget.style.color='rgba(255,255,255,0.5)'}>
                {nextCs.title} →
              </Link>
            )}
          </div>
        </div>
      </div>

    </div>
  );
};

export default CaseStudy;
