import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="min-h-[90vh] flex flex-col justify-center pt-16 px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="max-w-3xl">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="type-label text-muted-foreground mb-6"
        >
          Product Designer
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="type-display-large text-foreground mb-6"
        >
          I design products that are simple, useful, and respectful of people's time.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="type-body text-muted-foreground max-w-xl mb-10"
        >
          Specializing in UX research, interaction design, and AI-powered workflows. 
          I turn complex problems into clear, intuitive experiences — grounded in research, shaped by empathy.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap gap-3"
        >
          <a
            href="#work"
            className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background type-caption rounded-full hover:opacity-90 transition-opacity"
          >
            View Work
            <span className="text-xs">↓</span>
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground type-caption rounded-full hover:bg-secondary transition-colors"
          >
            Get in Touch
          </a>
        </motion.div>
      </div>

      {/* Minimal stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="flex flex-wrap gap-12 mt-24 pt-8 border-t border-border"
      >
        {[
          { number: "12+", label: "Projects" },
          { number: "38%", label: "Avg. Improvement" },
          { number: "4.2/5", label: "Usability Score" },
        ].map(({ number, label }) => (
          <div key={label}>
            <div className="text-2xl font-medium text-foreground tracking-tight">{number}</div>
            <div className="type-caption text-muted-foreground mt-0.5">{label}</div>
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default Hero;
