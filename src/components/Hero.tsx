import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const Hero = () => {
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true });

  const stats = [
    { value: "12+", label: "Projects" },
    { value: "38%", label: "Avg. Improvement" },
    { value: "4.2/5", label: "Usability Score" },
  ];

  return (
    <section className="pt-32 pb-0 px-6 max-w-site mx-auto">
      <div className="max-w-3xl">
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
          className="flex items-center gap-4 mb-16"
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

      {/* Stats row */}
      <motion.div
        ref={statsRef}
        initial={{ opacity: 0 }}
        animate={statsInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="border-t border-border pt-10 pb-10"
      >
        <div className="flex items-start gap-16 max-md:gap-10">
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="text-3xl font-bold text-foreground leading-none mb-1">{stat.value}</div>
              <div className="text-[14px] text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
