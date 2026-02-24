import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const Testimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-[120px] max-md:py-16 border-t border-border">
      <div className="px-6 lg:px-8 max-w-site mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center"
        >
          {/* Quotation mark */}
          <div className="text-[64px] leading-none text-accent font-display mb-4">"</div>

          <blockquote className="type-h3 text-foreground italic mb-8" style={{ fontStyle: 'italic' }}>
            Deepak brings both structure and creativity to his work — rare in early-career designers.
          </blockquote>

          <footer>
            <div className="type-body font-medium text-foreground">Mentor Name</div>
            <div className="type-body text-muted-foreground">Senior Designer at Company</div>
          </footer>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
