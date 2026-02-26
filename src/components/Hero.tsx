import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ParticleCanvas from "./ParticleCanvas";

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
    <section className="pt-32 pb-0 px-6 max-w-site mx-auto">
      <div className="grid lg:grid-cols-[55%_45%] gap-12 items-center">
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
            className="flex items-center gap-4 mb-0"
          >
            <a
              href="#work"
              className="inline-flex items-center px-7 py-3.5 bg-foreground text-primary-foreground text-[15px] font-medium rounded-full hover:bg-foreground/85 transition-colors"
            >
              View Work ↓
            </a>
            <a
              href="#contact"
              className="inline-flex items-center px-7 py-3 border-[1.5px] border-foreground text-foreground text-[15px] font-medium rounded-full hover:bg-foreground hover:text-primary-foreground transition-colors duration-200"
            >
              Get in Touch
            </a>
          </motion.div>
        </div>

        {/* Right interactive canvas — hidden on mobile */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="hidden lg:block"
        >
          <ParticleCanvas />
        </motion.div>
      </div>

      {/* Stats row */}
      <motion.div
        ref={statsRef}
        initial={{ opacity: 0 }}
        animate={statsInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="border-t border-b border-border/60 py-10 mt-16"
      >
        <div className="flex items-start justify-between max-md:grid max-md:grid-cols-2 max-md:gap-8">
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="text-[40px] font-bold text-foreground leading-none mb-1">{stat.value}</div>
              <div className="text-[13px] text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
