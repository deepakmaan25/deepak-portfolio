import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="contact" className="py-24 lg:py-32 bg-charcoal">
      <div className="px-6 lg:px-12 max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          {/* Left */}
          <div>
            <span className="inline-flex items-center gap-3 font-body text-xs font-medium tracking-[0.25em] uppercase text-cream/40 mb-4">
              <span className="w-8 h-px bg-terracotta" />
              Let's Talk
            </span>
            <h2 className="font-display text-4xl lg:text-6xl font-bold text-cream leading-tight mb-6">
              Open to great
              <br />
              <em className="text-terracotta not-italic">opportunities.</em>
            </h2>
            <p className="font-body text-base text-cream/60 leading-relaxed max-w-md">
              Whether you're a startup looking for a founding designer, or a team that needs a thoughtful UX collaborator — I'd love to hear what you're building.
            </p>

            <div className="mt-10 space-y-4">
              {[
                { label: "Email", value: "deepak.maan@email.com", href: "mailto:deepak.maan@email.com" },
                { label: "LinkedIn", value: "linkedin.com/in/deepakmaan", href: "#" },
                { label: "Dribbble", value: "dribbble.com/deepakmaan", href: "#" },
              ].map(({ label, value, href }) => (
                <a key={label} href={href} className="flex items-center gap-4 group">
                  <span className="font-body text-xs tracking-widest uppercase text-cream/40 w-20 flex-shrink-0">{label}</span>
                  <span className="font-body text-sm text-cream/80 group-hover:text-terracotta transition-colors duration-200 border-b border-cream/10 group-hover:border-terracotta/40 pb-0.5">
                    {value}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Right: CTA card */}
          <div className="bg-cream/5 border border-cream/10 p-10">
            <div className="font-display text-2xl font-semibold text-cream mb-2">
              Ready to work together?
            </div>
            <p className="font-body text-sm text-cream/50 mb-8">
              I'm currently available for full-time roles and select freelance projects.
            </p>

            <div className="space-y-4">
              <a
                href="mailto:deepak.maan@email.com"
                className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-terracotta text-cream font-body font-medium text-sm hover:bg-terracotta/90 transition-all duration-300 group"
              >
                Send me an email
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
              <a
                href="#"
                className="w-full flex items-center justify-center gap-3 px-8 py-4 border border-cream/20 text-cream font-body font-medium text-sm hover:border-terracotta hover:text-terracotta transition-all duration-300"
              >
                Download Resume
              </a>
            </div>

            <div className="mt-10 pt-8 border-t border-cream/10">
              <div className="font-body text-xs text-cream/30 text-center">
                Usually responds within 24 hours
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="px-6 lg:px-12 max-w-7xl mx-auto mt-20 pt-8 border-t border-cream/10 flex items-center justify-between flex-wrap gap-4">
        <span className="font-body text-xs text-cream/30">
          © 2024 Deepak Maan. All rights reserved.
        </span>
        <span className="font-display text-sm font-medium text-cream/20">
          AI-First Product Designer
        </span>
      </div>
    </section>
  );
};

export default Contact;
