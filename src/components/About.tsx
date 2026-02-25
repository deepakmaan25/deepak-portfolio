import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const skillGroups = [
  {
    label: "RESEARCH",
    skills: ["User Interviews", "Usability Testing", "Affinity Mapping", "Journey Mapping"],
  },
  {
    label: "DESIGN",
    skills: ["Figma", "Wireframing", "Prototyping", "Design Systems", "Interaction Design"],
  },
  {
    label: "AI & TOOLS",
    skills: ["ChatGPT", "Claude", "Midjourney", "Photoshop", "Illustrator"],
  },
];

const background = [
  { title: "BSc Interaction Design", detail: "Design Institute, 2023" },
  { title: "Google UX Design Certificate", detail: "Coursera, 2023" },
  { title: "AI for Designers", detail: "Self-directed, 2024" },
];

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="about" className="py-24 md:py-[96px] border-t border-border">
      <div className="px-6 max-w-site mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="grid lg:grid-cols-2 gap-16 lg:gap-24"
        >
          {/* Left column */}
          <div>
            <p className="type-label mb-4">ABOUT</p>
            <h2 className="type-h2 mb-8">A designer who listens first.</h2>

            <div className="space-y-5 type-body text-text-body max-w-lg">
              <p>
                I'm Deepak — a product designer crafting digital experiences that balance user needs with business goals. I work at the intersection of UX research, interface design, and AI-powered creative workflows.
              </p>
              <p>
                Great design starts before the first wireframe — in conversations, in empathy, and in genuine curiosity about how people think. I leverage AI tools as force multipliers for research synthesis, ideation, and visual exploration.
              </p>
            </div>

            <div className="flex items-center gap-2 mt-8">
              <span className="w-2.5 h-2.5 bg-green-500 rounded-full" />
              <span className="text-[14px] font-medium text-foreground">Available for new opportunities</span>
            </div>

            {/* Currently card */}
            <div className="mt-6 border border-border rounded-lg p-4 bg-background max-w-xs">
              <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-muted-foreground mb-3">CURRENTLY</p>
              <div className="space-y-1.5 text-[14px] text-text-body">
                <p>📖 Reading: The Design of Everyday Things</p>
                <p>🛠 Building: AI-assisted UX research toolkit</p>
                <p>🌍 Based in: India, open to remote</p>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div>
            {/* Skill tag groups */}
            {skillGroups.map((group) => (
              <div key={group.label} className="mb-8">
                <p className="type-label border-b border-border pb-2 mb-4">{group.label}</p>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span key={skill} className="inline-flex items-center px-3.5 py-1.5 border border-tag-border rounded-full text-[13px] text-text-body bg-background hover:bg-muted transition-colors">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}

            {/* Background */}
            <div>
              <p className="type-label border-b border-border pb-2 mb-4">BACKGROUND</p>
              <div className="space-y-4">
                {background.map((item) => (
                  <div key={item.title}>
                    <div className="text-[15px] font-semibold text-foreground">{item.title}</div>
                    <div className="text-[14px] text-muted-foreground">{item.detail}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
