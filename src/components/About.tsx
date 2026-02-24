import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const skills = [
    { category: "Research", items: ["User Interviews", "Usability Testing", "Affinity Mapping", "Journey Mapping"] },
    { category: "Design", items: ["Figma", "Wireframing", "Prototyping", "Design Systems", "Interaction Design"] },
    { category: "AI & Tools", items: ["ChatGPT", "Claude", "Midjourney", "Photoshop", "Illustrator"] },
  ];

  return (
    <section id="about" className="py-24 lg:py-32 border-t border-border">
      <div className="px-6 lg:px-8 max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid lg:grid-cols-[1fr_1fr] gap-16 lg:gap-24"
        >
          {/* Left */}
          <div>
            <p className="type-label text-muted-foreground mb-3">About</p>
            <h2 className="type-display text-foreground mb-8">
              A designer who listens first.
            </h2>

            <div className="space-y-4 type-body text-muted-foreground">
              <p>
                I'm Deepak — a product designer crafting digital experiences that balance user needs with business goals. I work at the intersection of UX research, interface design, and AI-powered creative workflows.
              </p>
              <p>
                Great design starts before the first wireframe — in conversations, in empathy, and in genuine curiosity about how people think. I leverage AI tools as force multipliers for research synthesis, ideation, and visual exploration.
              </p>
            </div>

            {/* Availability */}
            <div className="mt-8 inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-secondary">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              <span className="type-caption text-foreground">Available for new opportunities</span>
            </div>
          </div>

          {/* Right: Skills */}
          <div className="space-y-8">
            {skills.map(({ category, items }, catIdx) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.1 + catIdx * 0.08 }}
              >
                <h3 className="type-label text-muted-foreground mb-3">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <span
                      key={skill}
                      className="type-caption px-3 py-1.5 rounded-full bg-secondary text-foreground"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}

            {/* Education */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <h3 className="type-label text-muted-foreground mb-3">Background</h3>
              <div className="space-y-3">
                {[
                  { title: "BSc Interaction Design", org: "Design Institute, 2023" },
                  { title: "Google UX Design Certificate", org: "Coursera, 2023" },
                  { title: "AI for Designers", org: "Self-directed, 2024" },
                ].map(({ title, org }) => (
                  <div key={title}>
                    <div className="type-body text-foreground font-medium">{title}</div>
                    <div className="type-caption text-muted-foreground">{org}</div>
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
