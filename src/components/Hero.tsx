import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 lg:px-8 grain overflow-hidden">
      <div className="relative z-10 text-center max-w-3xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="type-caption text-muted-foreground mb-8"
        >
          Product Designer · Based in India
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="type-display text-foreground mb-8"
        >
          Designing products that feel inevitable.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="type-body-lg text-muted-foreground max-w-[480px] mx-auto mb-10"
        >
          I'm Deepak Maan — I help teams shape complex ideas into clear, purposeful digital experiences.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#work"
            className="inline-flex items-center px-6 h-12 bg-foreground text-primary-foreground type-body font-medium rounded-md hover:scale-[1.02] transition-transform duration-150"
          >
            View My Work
          </a>
          <a
            href="#about"
            className="type-body text-muted-foreground hover:text-foreground transition-colors"
          >
            Read about me →
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex items-center justify-center gap-3 mt-16"
        >
          {["4+ Projects", "2+ Years Learning", "100% Process-Driven"].map((stat, i) => (
            <span key={stat} className="flex items-center gap-3">
              {i > 0 && <span className="text-border">·</span>}
              <span className="type-caption text-muted-foreground">{stat}</span>
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
