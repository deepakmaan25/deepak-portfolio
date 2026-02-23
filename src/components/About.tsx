import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const skills = [
    { category: "Research", items: ["User Interviews", "Usability Testing", "Affinity Mapping", "Journey Mapping", "Competitive Analysis"] },
    { category: "Design", items: ["Figma", "Wireframing", "Prototyping", "Design Systems", "Interaction Design"] },
    { category: "AI & Visual", items: ["ChatGPT / Claude", "Midjourney", "Photoshop", "Illustrator", "Procreate"] },
  ];

  return (
    <section id="about" className="py-24 lg:py-32 bg-surface">
      <div className="px-6 lg:px-12 max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start"
        >
          {/* Left */}
          <div>
            <span className="inline-flex items-center gap-3 font-body text-xs font-medium tracking-[0.25em] uppercase text-warm-gray mb-3">
              <span className="w-8 h-px bg-terracotta" />
              About Me
            </span>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-charcoal mb-8 leading-tight">
              A designer who{" "}
              <em className="text-terracotta not-italic">listens</em>{" "}
              first.
            </h2>

            <div className="space-y-4 font-body text-warm-gray text-base leading-relaxed">
              <p>
                I'm Deepak — a product designer with 1 year of professional experience crafting digital experiences that balance user needs with business goals. I work at the intersection of UX research, interface design, and AI-powered creative workflows.
              </p>
              <p>
                I believe great design starts before the first wireframe — in conversations, in empathy, and in genuine curiosity about how people think. I leverage AI tools not as shortcuts, but as force multipliers for research synthesis, ideation, and visual exploration.
              </p>
              <p>
                When I'm not designing interfaces, I'm experimenting with illustration, photo manipulation, and generative AI — because good design is also about knowing when to break the grid.
              </p>
            </div>

            {/* Availability badge */}
            <div className="mt-10 inline-flex items-center gap-3 px-5 py-3 bg-cream border border-border">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-terracotta opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-terracotta" />
              </span>
              <span className="font-body text-sm text-charcoal font-medium">
                Available for new opportunities
              </span>
            </div>
          </div>

          {/* Right: Skills */}
          <div className="space-y-8">
            {skills.map(({ category, items }, catIdx) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: catIdx * 0.1 }}
              >
                <h3 className="font-body text-[10px] font-semibold tracking-[0.2em] uppercase text-terracotta mb-4">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <span
                      key={skill}
                      className="font-body text-sm font-medium px-3 py-1.5 bg-cream border border-border text-charcoal hover:border-terracotta hover:text-terracotta transition-colors duration-200 cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}

            {/* Background */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-6 p-6 border border-border bg-cream"
            >
              <div className="font-body text-[10px] font-semibold tracking-[0.2em] uppercase text-warm-gray mb-4">Background</div>
              <div className="space-y-3">
                {[
                  { title: "BSc Interaction Design", org: "Design Institute, 2023" },
                  { title: "Google UX Design Certificate", org: "Coursera, 2023" },
                  { title: "AI for Designers Specialization", org: "Self-directed, 2024" },
                ].map(({ title, org }) => (
                  <div key={title} className="flex items-start gap-3">
                    <div className="w-1 h-1 rounded-full bg-terracotta mt-2 flex-shrink-0" />
                    <div>
                      <div className="font-body text-sm font-medium text-charcoal">{title}</div>
                      <div className="font-body text-xs text-warm-gray">{org}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
