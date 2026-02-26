import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const skillGroups = [
  {
    label: "RESEARCH",
    dotColor: "bg-blue-500",
    skills: ["User Interviews", "Usability Testing", "Affinity Mapping", "Journey Mapping"],
  },
  {
    label: "DESIGN",
    dotColor: "bg-indigo-500",
    skills: ["Figma", "Wireframing", "Prototyping", "Design Systems", "Interaction Design"],
  },
  {
    label: "AI & TOOLS",
    dotColor: "bg-green-500",
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
    <section id="about" className="py-24 md:py-[96px]">
      {/* Thin top rule */}
      <div className="border-t border-border" />
      <div className="px-6 max-w-site mx-auto pt-24 md:pt-[96px]">
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
            <h2 className="type-h2 mb-8 text-[40px]">
              A designer who{" "}
              <span className="relative inline-block">
                listens
                <svg
                  className="absolute -bottom-1 left-0 w-full"
                  height="6"
                  viewBox="0 0 100 6"
                  preserveAspectRatio="none"
                  fill="none"
                >
                  <path
                    d="M0 3 Q 10 0, 20 3 T 40 3 T 60 3 T 80 3 T 100 3"
                    stroke="#6366F1"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              {" "}first.
            </h2>

            <div className="space-y-5 type-body text-text-body max-w-lg">
              <p>
                I'm Deepak — a product designer crafting digital experiences that balance user needs with business goals. I work at the intersection of UX research, interface design, and AI-powered creative workflows.
              </p>
              <p>
                Great design starts before the first wireframe — in conversations, in empathy, and in genuine curiosity about how people think. I leverage AI tools as force multipliers for research synthesis, ideation, and visual exploration.
              </p>
            </div>

            {/* Available badge */}
            <div className="flex items-center gap-2.5 mt-8">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping-dot absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
              </span>
              <span
                className="text-[13px] font-medium px-4 py-1.5 rounded-full"
                style={{
                  background: "#DCFCE7",
                  color: "#166534",
                  border: "1px solid #BBF7D0",
                }}
              >
                Available for new opportunities
              </span>
            </div>

            {/* Currently card — dark */}
            <div className="mt-6 bg-foreground rounded-xl p-5 max-w-xs">
              <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-muted-foreground/50 mb-3">
                CURRENTLY
              </p>
              <div className="space-y-1 text-[14px] text-primary-foreground leading-[2]">
                <p>📖 Reading: The Design of Everyday Things</p>
                <p>🛠 Building: AI-assisted UX research toolkit</p>
                <p className="flex items-center gap-2">
                  🌍 Based in: India, open to remote
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping-dot absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div>
            {/* Skill tag groups */}
            {skillGroups.map((group) => (
              <div key={group.label} className="mb-8">
                <div className="border-t border-border/50 mb-4" />
                <p className="type-label pb-2 mb-4 flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${group.dotColor}`} />
                  {group.label}
                </p>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center px-3.5 py-1.5 border border-tag-border rounded-full text-[13px] text-text-body bg-background hover:bg-foreground hover:text-primary-foreground hover:border-foreground transition-all duration-200 cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}

            {/* Background */}
            <div>
              <div className="border-t border-border/50 mb-4" />
              <p className="type-label pb-2 mb-4">BACKGROUND</p>
              <div className="space-y-2">
                {background.map((item) => (
                  <div
                    key={item.title}
                    className="flex items-center justify-between p-3 px-4 bg-surface rounded-lg hover:bg-background hover:shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition-all duration-200"
                  >
                    <div className="text-[15px] font-semibold text-foreground">{item.title}</div>
                    <div
                      className="text-[12px] text-muted-foreground px-2 py-0.5 rounded"
                      style={{ background: "hsl(var(--muted))" }}
                    >
                      {item.detail}
                    </div>
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
