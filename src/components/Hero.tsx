import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ParticleCanvas from "./ParticleCanvas";
import LiquidGlass from "./LiquidGlass";

const Hero = () => {
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true });

  const stats = [
    { value: "12+", label: "Projects" },
    { value: "38%", label: "Avg. Improvement" },
    { value: "4.2/5", label: "Usability Score" },
    { value: "8+", label: "Research Methods" },
  ];

  return (
    <section className="relative pt-32 pb-0 px-6 max-w-site mx-auto overflow-visible">
      {/* Full-section particle background */}
      <div className="absolute inset-0 z-0 hidden lg:block overflow-hidden pointer-events-none">
        <ParticleCanvas />
      </div>

      <div className="relative z-10 grid lg:grid-cols-[55%_45%] gap-12 items-center">
        {/* Left text content */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="type-label mb-6"
          >
            PRODUCT DESIGNER
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="type-h1 mb-8"
          >
            I design products that are simple, useful, and respectful of people's time.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="type-body-lg text-muted-foreground max-w-xl mb-10"
          >
            Specializing in UX research, interaction design, and AI-powered workflows. I turn complex problems into clear, intuitive experiences — grounded in research, shaped by empathy.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.24 }}
            className="flex items-center gap-4 mb-0 max-md:flex-col max-md:items-stretch"
          >
            <a
              href="#work"
              className="inline-flex items-center justify-center px-7 py-3.5 bg-foreground text-primary-foreground text-[15px] font-medium rounded-full hover:opacity-85 transition-opacity"
            >
              View Work ↓
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-7 py-3 border-[1.5px] border-foreground text-foreground text-[15px] font-medium rounded-full hover:bg-foreground hover:text-primary-foreground transition-colors duration-200"
            >
              Get in Touch
            </a>
          </motion.div>
        </div>

        {/* Right — Liquid Glass UI Mockup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="hidden lg:flex items-center justify-center"
          style={{ position: 'relative', zIndex: 20 }}
        >
          <LiquidGlass />
        </motion.div>
      </div>

      {/* Stats row */}
      <motion.div
        ref={statsRef}
        initial={{ opacity: 0 }}
        animate={statsInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="relative z-10 border-t border-b border-border py-10 mt-16"
      >
        <div className="flex items-start justify-between max-md:grid max-md:grid-cols-2 max-md:gap-8 max-md:gap-y-8">
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="text-[40px] font-bold text-foreground leading-none mb-1">{stat.value}</div>
              <div className="text-[13px] text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
