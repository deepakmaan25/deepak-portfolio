import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <>
      <section id="contact" className="py-[120px] max-md:py-16 bg-foreground">
        <div className="px-6 lg:px-8 max-w-site mx-auto">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <p className="type-caption text-accent mb-4">Get in Touch</p>
            <h2 className="type-h2 text-primary-foreground mb-4">
              Let's build something great together.
            </h2>
            <p className="type-body-lg text-primary-foreground/60 mb-10 max-w-lg mx-auto">
              Open to full-time roles, freelance projects, and design conversations.
            </p>

            <a
              href="mailto:deepak.maan@email.com"
              className="type-body-lg text-primary-foreground hover:opacity-70 transition-opacity"
            >
              Send me an email →
            </a>

            <div className="flex items-center justify-center gap-2 mt-8 type-body text-primary-foreground/60">
              <a href="#" className="hover:text-primary-foreground transition-colors">LinkedIn</a>
              <span>·</span>
              <a href="#" className="hover:text-primary-foreground transition-colors">Dribbble</a>
              <span>·</span>
              <a href="#" className="hover:text-primary-foreground transition-colors">Behance</a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground border-t border-primary-foreground/10 py-6">
        <div className="px-6 lg:px-8 max-w-site mx-auto flex items-center justify-between">
          <span className="text-[13px] text-primary-foreground/40">© 2025 Deepak Maan</span>
          <span className="text-[13px] text-primary-foreground/40">Designed & built with intention</span>
        </div>
      </footer>
    </>
  );
};

export default Contact;
