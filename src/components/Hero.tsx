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
    <section className="relative pt-32 pb-0 px-6 max-w-site mx-auto overflow-hidden">
      {/* Full-section particle background */}
      <div className="absolute inset-0 z-0 hidden lg:block">
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

        {/* Right — 3D Illustrated Design Showcase */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="hidden lg:flex items-center justify-center"
        >
          <div className="relative w-full max-w-[440px] h-[420px]">
            {/* Isometric design workspace */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden" style={{ background: "#0A0A0A" }}>
              {/* Floating layers */}
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Back layer — wireframe grid */}
                <div className="absolute animate-float-card" style={{ top: "30px", left: "30px", animationDelay: "0.5s" }}>
                  <div className="w-[180px] rounded-xl p-4" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <div className="h-12 rounded-lg" style={{ background: "rgba(255,255,255,0.06)" }} />
                      <div className="h-12 rounded-lg" style={{ background: "rgba(255,255,255,0.06)" }} />
                    </div>
                    <div className="space-y-1.5">
                      <div className="h-2 rounded-full w-full" style={{ background: "rgba(255,255,255,0.08)" }} />
                      <div className="h-2 rounded-full w-3/4" style={{ background: "rgba(255,255,255,0.06)" }} />
                    </div>
                  </div>
                </div>

                {/* Middle layer — main app card */}
                <div className="relative z-10 animate-float-card w-[240px] rounded-2xl p-6" style={{
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  backdropFilter: "blur(20px)",
                  boxShadow: "0 25px 50px rgba(0,0,0,0.4)",
                }}>
                  {/* Header with avatar */}
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-full" style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.8), rgba(139,92,246,0.8))" }} />
                    <div className="flex-1 space-y-1.5">
                      <div className="h-2.5 rounded-full w-3/4" style={{ background: "rgba(255,255,255,0.25)" }} />
                      <div className="h-2 rounded-full w-1/2" style={{ background: "rgba(255,255,255,0.12)" }} />
                    </div>
                  </div>
                  {/* Content bars */}
                  <div className="space-y-2.5 mb-5">
                    <div className="h-2.5 rounded-full w-full" style={{ background: "rgba(255,255,255,0.15)" }} />
                    <div className="h-2.5 rounded-full w-5/6" style={{ background: "rgba(255,255,255,0.1)" }} />
                    <div className="h-2.5 rounded-full w-2/3" style={{ background: "rgba(255,255,255,0.08)" }} />
                  </div>
                  {/* Stats row */}
                  <div className="flex gap-2 mb-4">
                    <div className="flex-1 rounded-lg p-2 text-center" style={{ background: "rgba(99,102,241,0.2)" }}>
                      <div className="h-4 rounded" style={{ background: "rgba(99,102,241,0.4)" }} />
                    </div>
                    <div className="flex-1 rounded-lg p-2 text-center" style={{ background: "rgba(16,185,129,0.2)" }}>
                      <div className="h-4 rounded" style={{ background: "rgba(16,185,129,0.4)" }} />
                    </div>
                  </div>
                  {/* CTA button */}
                  <div className="h-9 rounded-lg" style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.7), rgba(139,92,246,0.7))" }} />
                </div>

                {/* Top right — notification card */}
                <div className="absolute animate-float-card" style={{ top: "20px", right: "20px", animationDelay: "1s" }}>
                  <div className="w-[140px] rounded-xl p-3" style={{
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-5 h-5 rounded-full" style={{ background: "rgba(16,185,129,0.5)" }} />
                      <div className="h-2 rounded-full flex-1" style={{ background: "rgba(255,255,255,0.2)" }} />
                    </div>
                    <div className="h-2 rounded-full w-4/5" style={{ background: "rgba(255,255,255,0.1)" }} />
                  </div>
                </div>

                {/* Bottom right — chart widget */}
                <div className="absolute animate-float-card" style={{ bottom: "40px", right: "30px", animationDelay: "1.5s" }}>
                  <div className="w-[150px] rounded-xl p-3" style={{
                    background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}>
                    <div className="h-2 rounded-full w-1/2 mb-3" style={{ background: "rgba(255,255,255,0.15)" }} />
                    <div className="flex items-end gap-1.5 h-[40px]">
                      {[40, 65, 45, 80, 55, 70, 90].map((h, i) => (
                        <div key={i} className="flex-1 rounded-t" style={{
                          height: `${h}%`,
                          background: `rgba(99,102,241,${0.3 + i * 0.08})`,
                        }} />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom left — color palette */}
                <div className="absolute animate-float-card" style={{ bottom: "30px", left: "25px", animationDelay: "2s" }}>
                  <div className="flex gap-1.5 p-2 rounded-lg" style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}>
                    {["#6366F1", "#8B5CF6", "#EC4899", "#F59E0B", "#10B981"].map((c) => (
                      <div key={c} className="w-5 h-5 rounded-full" style={{ background: c, opacity: 0.7 }} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Ambient glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full" style={{
                background: "radial-gradient(circle, rgba(99,102,241,0.15), transparent 70%)",
              }} />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Stats row */}
      <motion.div
        ref={statsRef}
        initial={{ opacity: 0 }}
        animate={statsInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="relative z-10 border-t border-b border-border/60 py-10 mt-16"
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
