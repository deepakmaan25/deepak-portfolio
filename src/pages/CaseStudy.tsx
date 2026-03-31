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

      {/* Hero band — fixed: cs.color instead of cs.heroColor, o.value instead of o.metric */}
      <div className="w-full px-6 py-20" style={{ background: cs.color || 'rgba(196,181,253,0.15)' }}>
        <div className="max-w-site mx-auto">
          <p className="type-label mb-4">{cs.tag}</p>
          <h1 className="text-[44px] md:text-[56px] font-bold text-foreground leading-tight mb-4 max-w-3xl">
            {cs.title} — {cs.subtitle}
          </h1>
          <p className="text-[18px] text-muted-foreground max-w-2xl mb-6">{cs.tagline}</p>
          <div className="flex flex-wrap gap-2">
            {(cs.outcomes ?? []).map((o, i) => (
              <span key={i} className="inline-flex items-center px-3 py-1.5 bg-background border border-border rounded-full text-[13px] text-foreground">
                {o.value} {o.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[720px] mx-auto px-6 py-20 space-y-20">

        {/* Overview */}
        <div>
          <p className="type-label mb-3">OVERVIEW</p>
          <h2 className="text-[28px] font-bold text-foreground mb-4">The Problem</h2>
          {cs.overview?.problem && (
            <p className="type-body text-muted-foreground mb-4">{cs.overview.problem}</p>
          )}
          {cs.overview?.description && (
            <p className="type-body text-muted-foreground mb-4">{cs.overview.description}</p>
          )}
          {cs.overview?.contribution && (
            <p className="type-body text-muted-foreground">{cs.overview.contribution}</p>
          )}
        </div>

        {/* Research */}
        {cs.research && (
          <div>
            <p className="type-label mb-3">RESEARCH</p>
            <h2 className="text-[28px] font-bold text-foreground mb-6">{cs.research.heading}</h2>
            {cs.research.body && (
              <p className="type-body text-muted-foreground mb-6">
                {cs.research.body.split("\n\n")[0]}
              </p>
            )}
            {(cs.research.quotes ?? []).map((q, i) => (
              <blockquote key={i} className="border-l-2 border-indigo-400 pl-4 mb-4 text-[15px] italic text-muted-foreground">
                {q.text}
              </blockquote>
            ))}
          </div>
        )}

        {/* Process */}
        {cs.process && (
          <div>
            <p className="type-label mb-3">DESIGN PROCESS</p>
            <h2 className="text-[28px] font-bold text-foreground mb-4">{cs.process.heading}</h2>
            {cs.process.intro && (
              <p className="type-body text-muted-foreground mb-6">
                {cs.process.intro.split("\n\n")[0]}
              </p>
            )}
            <div className="grid md:grid-cols-3 gap-4">
              {(cs.process.pillars ?? []).map((p) => (
                <div key={p.title} className="bg-card border border-border rounded-xl p-5">
                  <div className="text-[24px] mb-3">{p.icon}</div>
                  <div className="text-[15px] font-semibold text-foreground mb-2">{p.title}</div>
                  <p className="text-[13px] text-muted-foreground leading-relaxed">{p.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

       {/* Solutions */}
{(cs.solutions ?? []).map((sol, i) => {
  // Hero=0, Research=1, Process=2, Solutions start at index 3
  const solImage = cs.images?.[i + 3];
  return (
    <div key={i}>
      <p className="type-label mb-3">SOLUTION {i + 1}</p>
      <h2 className="text-[28px] font-bold text-foreground mb-2">{sol.title}</h2>
      <p className="text-[16px] italic text-muted-foreground mb-4">{sol.subtitle}</p>
      {sol.problem && (
        <p className="type-body text-muted-foreground mb-4">{sol.problem}</p>
      )}
      {(sol.body ?? []).map((para, pi) => (
        <p key={pi} className="type-body text-muted-foreground mb-3">{para}</p>
      ))}
      <div className="flex flex-wrap gap-2 mt-3">
        {(sol.metrics ?? []).map((m, mi) => (
          <span key={mi} className="inline-flex items-center px-4 py-2 bg-card border border-border rounded-full text-[14px] text-foreground font-medium">
            {m.value} {m.label}
          </span>
        ))}
      </div>

      {/* Image after each solution */}
      {solImage && (
        <div className="mt-8 rounded-2xl overflow-hidden border border-border">
          <img
            src={solImage.src}
            alt={solImage.caption ?? `Solution ${i + 1} visual`}
            className="w-full h-auto block"
          />
          {solImage.caption && (
            <p className="px-4 py-3 text-[13px] text-muted-foreground border-t border-border bg-card">
              {solImage.caption}
            </p>
          )}
        </div>
      )}
    </div>
  );
})}

       {/* Impact */}
{cs.impact && (
  <div>
    <p className="type-label mb-3">IMPACT & RESULTS</p>
    <h2 className="text-[28px] font-bold text-foreground mb-6">{cs.impact.heading}</h2>
    <div className="flex flex-wrap gap-3 mb-6">
      {(cs.impact.metrics ?? []).map((m, i) => (
        <span key={i} className="inline-flex items-center px-4 py-2 bg-card border border-border rounded-full text-[14px] text-foreground font-medium">
          {m.value} {m.label}
        </span>
      ))}
    </div>
    {cs.impact.body && (
      <p className="type-body text-muted-foreground">
        {cs.impact.body.split("\n\n")[0]}
      </p>
    )}

    {/* Rebranding survey image — attached to impact/results */}
    {cs.images && cs.images[cs.images.length - 1] && (
      <div className="mt-8 rounded-2xl overflow-hidden border border-border">
        <img
          src={cs.images[cs.images.length - 1].src}
          alt={cs.images[cs.images.length - 1].caption ?? "Impact analysis"}
          className="w-full h-auto block"
        />
        {cs.images[cs.images.length - 1].caption && (
          <p className="px-4 py-3 text-[13px] text-muted-foreground border-t border-border bg-card">
            {cs.images[cs.images.length - 1].caption}
          </p>
        )}
      </div>
    )}
  </div>
)}

        {/* Reflection */}
        {cs.reflection && (
          <div>
            <p className="type-label mb-3">REFLECTION</p>
            <h2 className="text-[28px] font-bold text-foreground mb-4">{cs.reflection.heading}</h2>
            {cs.reflection.body && (
              <p className="type-body text-muted-foreground mb-6">
                {cs.reflection.body.split("\n\n")[0]}
              </p>
            )}
            <div className="space-y-4">
              {(cs.reflection.learnings ?? []).map((l, i) => (
                <div key={i} className="border border-border rounded-2xl p-6 bg-background">
                  <div className="text-[36px] font-bold leading-none mb-2" style={{ color: 'rgba(99,102,241,0.35)' }}>
                    0{i + 1}
                  </div>
                  <div className="text-[17px] font-semibold text-foreground mb-2">{l.title}</div>
                  <p className="text-[14px] text-muted-foreground leading-relaxed">{l.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Bottom nav */}
      <div style={{ background: '#0C0C0F' }} className="py-6 px-6">
        <div className="max-w-site mx-auto flex items-center justify-between">
          <div>
            {prevCs && (
              <Link to={`/case-study/${prevCs.slug}`} className="text-[14px] transition-colors"
                style={{ color: 'rgba(255,255,255,0.5)' }}
                onMouseEnter={e => e.currentTarget.style.color = 'white'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}>
                ← {prevCs.title}
              </Link>
            )}
          </div>
          <Link to="/#work" className="text-[14px] transition-colors"
            style={{ color: 'rgba(255,255,255,0.5)' }}
            onMouseEnter={e => e.currentTarget.style.color = 'white'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}>
            All Case Studies
          </Link>
          <div>
            {nextCs && (
              <Link to={`/case-study/${nextCs.slug}`} className="text-[14px] transition-colors"
                style={{ color: 'rgba(255,255,255,0.5)' }}
                onMouseEnter={e => e.currentTarget.style.color = 'white'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}>
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
