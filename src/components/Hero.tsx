const Hero = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center pt-16 px-6 lg:px-12 max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left: Text */}
        <div className="animate-fade-up">
          <span className="inline-block font-body text-xs font-medium tracking-[0.2em] uppercase text-terracotta mb-6 animate-fade-in">
            Product Designer · UX Researcher
          </span>

          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-charcoal leading-[1.05] mb-6 text-balance">
            Designing
            <br />
            <em className="text-terracotta not-italic">experiences</em>
            <br />
            that matter.
          </h1>

          <p className="font-body text-base lg:text-lg text-warm-gray leading-relaxed mb-10 max-w-md">
            1 year of turning complex problems into intuitive, user-centred designs — from deep UX research to polished interfaces and creative visuals.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#work"
              className="inline-flex items-center gap-3 px-7 py-3.5 bg-charcoal text-cream font-body font-medium text-sm hover:bg-terracotta transition-all duration-300 group"
            >
              View My Work
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-3 px-7 py-3.5 border border-charcoal text-charcoal font-body font-medium text-sm hover:border-terracotta hover:text-terracotta transition-all duration-300"
            >
              Get in Touch
            </a>
          </div>

          {/* Stats */}
          <div className="flex gap-10 mt-14 pt-10 border-t border-border">
            {[
              { number: "1+", label: "Year Experience" },
              { number: "12+", label: "Projects Done" },
              { number: "3", label: "Core Skills" },
            ].map(({ number, label }) => (
              <div key={label}>
                <div className="font-display text-3xl font-bold text-charcoal">{number}</div>
                <div className="font-body text-xs text-warm-gray mt-0.5 leading-tight">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Visual accent */}
        <div className="hidden lg:flex items-center justify-center relative">
          <div className="relative w-80 h-96">
            {/* Background shape */}
            <div className="absolute inset-0 bg-surface rounded-sm" />
            {/* Terracotta accent block */}
            <div className="absolute -top-4 -right-4 w-32 h-32 bg-terracotta rounded-sm opacity-90" />
            {/* Inner card */}
            <div className="absolute bottom-6 left-6 right-6 bg-cream p-6 shadow-card">
              <div className="font-body text-xs font-medium tracking-widest text-terracotta uppercase mb-2">Currently open to</div>
              <div className="font-display text-xl font-semibold text-charcoal">Full-time roles &amp; Freelance projects</div>
              <div className="mt-3 flex gap-2 flex-wrap">
                {["UX Design", "Research", "Illustration"].map((tag) => (
                  <span key={tag} className="text-xs font-body font-medium px-2 py-1 bg-muted text-warm-gray rounded-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            {/* Floating dots */}
            <div className="absolute top-8 left-8 w-3 h-3 rounded-full bg-terracotta" />
            <div className="absolute top-16 left-14 w-1.5 h-1.5 rounded-full bg-terracotta/40" />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="mt-20 flex items-center gap-3 text-warm-gray">
        <div className="flex flex-col gap-1 items-center">
          <div className="w-px h-12 bg-border animate-pulse" />
        </div>
        <span className="font-body text-xs tracking-widest uppercase">Scroll</span>
      </div>
    </section>
  );
};

export default Hero;
