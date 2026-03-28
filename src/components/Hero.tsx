import { motion } from "framer-motion";
import { ArrowDown, Download, Sparkles } from "lucide-react";

const Hero = () => {
  const handleScrollToWork = () => {
    document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-background"
    >
      {/* Subtle background grid */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, #6366f1 1px, transparent 1px), linear-gradient(to bottom, #6366f1 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Indigo glow blob — top right */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none opacity-[0.06] dark:opacity-[0.10]"
        style={{
          background:
            "radial-gradient(circle, #6366f1 0%, transparent 70%)",
          transform: "translate(30%, -30%)",
        }}
      />

      <div
        className="w-full"
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "clamp(80px, 12vw, 140px) clamp(20px, 5vw, 60px) clamp(60px, 8vw, 100px)",
        }}
      >
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* LEFT — Text */}
          <div>
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 mb-6"
            >
              <Sparkles size={14} className="text-indigo-500" />
              <span
                className="text-xs font-medium tracking-widest uppercase text-indigo-500 font-body"
              >
                AI Product Designer
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-heading text-foreground mb-3"
              style={{
                fontSize: "clamp(42px, 6vw, 72px)",
                lineHeight: 1.05,
                letterSpacing: "-0.01em",
              }}
            >
              Deepak Maan
            </motion.h1>

            {/* Tagline — italic serif accent */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-heading text-indigo-500 mb-6"
              style={{
                fontSize: "clamp(20px, 3vw, 30px)",
                lineHeight: 1.2,
                fontStyle: "italic",
              }}
            >
              Designing Purposeful Digital Interactions
            </motion.p>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="font-body text-muted-foreground mb-8 max-w-[480px]"
              style={{ fontSize: 16, fontWeight: 300, lineHeight: 1.7 }}
            >
              Product Designer with experience across AI, SaaS, and consumer
              products. IIT ISM Dhanbad · Google UX Certified. I bridge user
              research and high-fidelity design to ship things that actually work.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-3"
            >
              <button
                onClick={handleScrollToWork}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-indigo-500 text-white font-body font-medium text-sm hover:bg-indigo-600 transition-colors"
              >
                View Work
                <ArrowDown size={14} />
              </button>

              <a
                href="https://drive.google.com/file/d/1tWK-Bwp1GitmStoG1zW5VvXjg-2zU4-3/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border text-foreground font-body font-medium text-sm hover:bg-secondary transition-colors"
              >
                Resume
                <Download size={14} />
              </a>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex gap-8 mt-12 pt-8 border-t border-border"
            >
              {[
                { value: "1.5+", label: "Years Experience" },
                { value: "5+", label: "Products Shipped" },
                { value: "100K+", label: "Users Impacted" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div
                    className="font-heading text-foreground"
                    style={{ fontSize: 28, lineHeight: 1 }}
                  >
                    {stat.value}
                  </div>
                  <div
                    className="font-body text-muted-foreground mt-1"
                    style={{ fontSize: 12, fontWeight: 300 }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — Illustration (desktop only) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden md:flex items-center justify-center"
          >
            {/* Orbit illustration placeholder — replace with your actual animation */}
            <div className="relative w-[380px] h-[380px]">
              {/* Central circle */}
              <div
                className="absolute inset-0 m-auto w-32 h-32 rounded-full bg-indigo-50 dark:bg-indigo-950 border-2 border-indigo-200 dark:border-indigo-800 flex items-center justify-center"
                style={{ top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}
              >
                <Sparkles size={32} className="text-indigo-500" />
              </div>

              {/* Orbit ring */}
              <div
                className="absolute inset-0 rounded-full border border-dashed border-indigo-200 dark:border-indigo-800 opacity-50"
                style={{ margin: 30 }}
              />
              <div
                className="absolute inset-0 rounded-full border border-dashed border-indigo-200 dark:border-indigo-800 opacity-25"
                style={{ margin: 0 }}
              />

              {/* Orbit dots */}
              {[
                { label: "Research", angle: 0 },
                { label: "Figma", angle: 72 },
                { label: "Testing", angle: 144 },
                { label: "AI", angle: 216 },
                { label: "Strategy", angle: 288 },
              ].map(({ label, angle }) => {
                const r = 155;
                const rad = (angle - 90) * (Math.PI / 180);
                const x = 190 + r * Math.cos(rad);
                const y = 190 + r * Math.sin(rad);
                return (
                  <div
                    key={label}
                    className="absolute flex items-center justify-center"
                    style={{
                      left: x,
                      top: y,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <div className="w-9 h-9 rounded-full bg-background border border-border shadow-sm flex items-center justify-center">
                      <span
                        className="font-body text-indigo-500"
                        style={{ fontSize: 7, fontWeight: 500, whiteSpace: "nowrap" }}
                      >
                        {label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
