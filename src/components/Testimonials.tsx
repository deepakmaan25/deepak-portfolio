import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const testimonials = [
  {
    quote: "Deepak doesn't just design screens — he thinks through the entire user journey. His research-first approach brought clarity to our product roadmap.",
    name: "Priya Kapoor",
    role: "Product Manager, FinEdge",
  },
  {
    quote: "One of the most thoughtful junior designers I've worked with. His ability to synthesize research into actionable design decisions is beyond his experience level.",
    name: "Arjun Mehta",
    role: "Design Lead, HealthSync",
  },
  {
    quote: "Deepak's illustration and visual work elevated our entire brand. He has a rare combination of UX thinking and artistic sensibility.",
    name: "Sara Chen",
    role: "Founder, Viva Studio",
  },
];

const Testimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 lg:py-32 bg-charcoal overflow-hidden">
      <div className="px-6 lg:px-12 max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="inline-flex items-center gap-3 font-body text-xs font-medium tracking-[0.25em] uppercase text-cream/40 mb-3">
            <span className="w-8 h-px bg-terracotta" />
            Kind Words
          </span>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-cream">
            What collaborators say
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-px bg-cream/10">
          {testimonials.map((t, i) => (
            <motion.blockquote
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="bg-charcoal p-8 lg:p-10 flex flex-col justify-between"
            >
              <p className="font-body text-sm text-cream/70 leading-relaxed mb-8 italic">
                "{t.quote}"
              </p>
              <footer>
                <div className="font-body text-sm font-medium text-cream">{t.name}</div>
                <div className="font-body text-xs text-cream/40 mt-0.5">{t.role}</div>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
