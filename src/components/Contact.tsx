import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="contact" className="py-24 lg:py-32 border-t border-border">
      <div className="px-6 lg:px-8 max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <p className="type-label text-muted-foreground mb-3">Contact</p>
          <h2 className="type-display text-foreground mb-6">
            Let's work together.
          </h2>
          <p className="type-body text-muted-foreground mb-10 max-w-lg">
            Whether you're a startup looking for a founding designer, or a team that needs a thoughtful UX collaborator — I'd love to hear what you're building.
          </p>

          <div className="space-y-4 mb-10">
            {[
              { label: "Email", value: "deepak.maan@email.com", href: "mailto:deepak.maan@email.com" },
              { label: "LinkedIn", value: "linkedin.com/in/deepakmaan", href: "#" },
              { label: "Dribbble", value: "dribbble.com/deepakmaan", href: "#" },
            ].map(({ label, value, href }) => (
              <a key={label} href={href} className="flex items-center gap-6 group">
                <span className="type-label text-muted-foreground w-16 flex-shrink-0">{label}</span>
                <span className="type-body text-foreground group-hover:opacity-60 transition-opacity border-b border-transparent group-hover:border-foreground/20 pb-0.5">
                  {value}
                </span>
              </a>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href="mailto:deepak.maan@email.com"
              className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background type-caption rounded-full hover:opacity-90 transition-opacity"
            >
              Send Email
              <span className="text-xs">→</span>
            </a>
            <a
              href="#"
              className="inline-flex items-center px-6 py-3 border border-border text-foreground type-caption rounded-full hover:bg-secondary transition-colors"
            >
              Download Resume
            </a>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="px-6 lg:px-8 max-w-6xl mx-auto mt-24 pt-8 border-t border-border flex items-center justify-between flex-wrap gap-4">
        <span className="type-caption text-muted-foreground">
          © 2024 Deepak Maan
        </span>
        <span className="type-caption text-muted-foreground">
          Product Designer
        </span>
      </div>
    </section>
  );
};

export default Contact;
