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
    <section className="py-24 lg:py-32 bg-foreground">
      <div className="px-6 lg:px-8 max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <p className="type-label text-background/40 mb-3">Testimonials</p>
          <h2 className="type-display text-background">What collaborators say</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.blockquote
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col justify-between"
            >
              <p className="type-body text-background/70 mb-6">
                "{t.quote}"
              </p>
              <footer>
                <div className="type-body font-medium text-background">{t.name}</div>
                <div className="type-caption text-background/40">{t.role}</div>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
