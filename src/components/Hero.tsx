import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="min-h-screen flex flex-col justify-end pb-16 pt-24 px-6 lg:px-12 max-w-7xl mx-auto relative overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(hsl(var(--charcoal)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--charcoal)) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />

      <div className="relative z-10">
        {/* Overline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-3 font-body text-xs font-medium tracking-[0.25em] uppercase text-warm-gray">
            <span className="w-8 h-px bg-terracotta" />
            AI-First Product Designer
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="font-display text-[clamp(2.8rem,8vw,7.5rem)] font-bold text-charcoal leading-[0.92] mb-8 tracking-tight"
        >
          I design products
          <br />
          <span className="text-terracotta">people remember.</span>
        </motion.h1>

        {/* Subtitle + CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mt-6"
        >
          <p className="font-body text-base lg:text-lg text-warm-gray leading-relaxed max-w-lg">
            Product designer specializing in UX research, interaction design &amp; AI-powered workflows. 
            I turn ambiguous problems into clear, delightful experiences — backed by data, shaped by empathy.
          </p>

          <div className="flex flex-wrap gap-4 flex-shrink-0">
            <a
              href="#work"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-charcoal text-cream font-body font-medium text-sm tracking-wide hover:bg-terracotta transition-all duration-400"
            >
              View Selected Work
              <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-3 px-8 py-4 border border-charcoal/20 text-charcoal font-body font-medium text-sm tracking-wide hover:border-terracotta hover:text-terracotta transition-all duration-300"
            >
              Get in Touch
            </a>
          </div>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap gap-12 lg:gap-20 mt-20 pt-8 border-t border-border"
        >
          {[
            { number: "1+", label: "Year of Experience" },
            { number: "12+", label: "Projects Shipped" },
            { number: "38%", label: "Avg. Metric Improvement" },
            { number: "4.2/5", label: "Usability Score Avg." },
          ].map(({ number, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 + i * 0.1 }}
            >
              <div className="font-display text-3xl lg:text-4xl font-bold text-charcoal">{number}</div>
              <div className="font-body text-xs text-warm-gray mt-1 tracking-wide">{label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 right-6 lg:right-12 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-px h-12 bg-gradient-to-b from-terracotta to-transparent"
        />
        <span className="font-body text-[10px] tracking-[0.3em] uppercase text-warm-gray rotate-90 origin-center translate-y-4">Scroll</span>
      </motion.div>
    </section>
  );
};

export default Hero;
