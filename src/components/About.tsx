import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const skills = [
  "User Research",
  "Figma",
  "FigJam",
  "Figma Make",
  "Prototyping",
  "Design Systems",
  "A/B Testing",
  "User Interviews",
  "Usability Testing",
  "Wireframing",
  "Adobe Photoshop",
  "Adobe Illustrator",
  "Prompt Writing",
  "Claude / AI Tools",
  "Midjourney",
  "Notion",
  "Miro",
  "Power BI",
];

const experience = [
  {
    role: "Design Analyst",
    company: "JSW Steel",
    period: "Aug 2025 – Present",
    type: "Full-time",
    desc: "Designing end-to-end monthly steel market intelligence reports, translating complex data into Power BI–driven insight narratives. Researching global data center market trends to predict steel consumption across regions.",
  },
  {
    role: "UX Researcher",
    company: "Tech Japan (Talendy)",
    period: "Sep 2024 – Nov 2024",
    type: "Internship",
    desc: "Ran 10 IIT student interviews, documented 9 platform pain points, and designed fixes that shipped to production — including job description layout, dark mode accessibility, and a built-in communication tool.",
  },
  {
    role: "Product Designer",
    company: "EVeez",
    period: "Oct 2023 – Apr 2024",
    type: "Internship",
    desc: "Led design of multiple landing pages and the homepage, improving visual hierarchy and conversion-focused flows, resulting in a 12% increase in user conversion rate.",
  },
  {
    role: "Head of Design",
    company: "CyberLabs, IIT ISM Dhanbad",
    period: "May 2023 – Apr 2025",
    type: "Campus",
    desc: "Led the UI/UX division, organised design workshops, and mentored 50+ students across the institute.",
  },
];

const About = () => {
  return (
    <section id="about" className="py-24 bg-background">
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 clamp(20px, 5vw, 60px)",
        }}
      >
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-body text-indigo-500 text-xs font-medium tracking-widest uppercase mb-4"
        >
          About
        </motion.p>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* LEFT — Bio + links */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-heading text-foreground mb-6"
              style={{ fontSize: "clamp(28px, 4vw, 40px)", lineHeight: 1.1 }}
            >
              Bridging research,{" "}
              <span className="font-heading italic text-indigo-500">design,</span>{" "}
              and impact
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="font-body text-muted-foreground space-y-4"
              style={{ fontSize: 15, fontWeight: 300, lineHeight: 1.75 }}
            >
              <p>
                I'm a Product Designer with hands-on experience across UI/UX design,
                UX research, and data-driven decision making — working on SaaS and
                consumer-facing products.
              </p>
              <p>
                My work combines qualitative user research with quantitative insights
                to deliver interfaces that improve usability, conversion, and business
                outcomes. I've led end-to-end design initiatives — from problem
                discovery and user interviews to wireframing, prototyping, and
                high-fidelity visual design.
              </p>
              <p>
                I'm particularly interested in roles where design, research, and data
                intersect, and where design decisions are tied to measurable outcomes.
              </p>
            </motion.div>

            {/* Education */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8 pt-8 border-t border-border"
            >
              <p className="font-body text-xs font-medium tracking-widest uppercase text-muted-foreground mb-4">
                Education
              </p>
              <div className="space-y-3">
                <div>
                  <p className="font-body font-medium text-foreground text-sm">
                    B.Tech, Environmental Engineering
                  </p>
                  <p className="font-body text-muted-foreground text-sm font-light">
                    IIT (ISM) Dhanbad · 2021 – 2025
                  </p>
                </div>
                <div>
                  <p className="font-body font-medium text-foreground text-sm">
                    Google UX Design Certificate
                  </p>
                  <p className="font-body text-muted-foreground text-sm font-light">
                    Coursera · 2022 – 2023
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Links */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-3 mt-8"
            >
              {[
                { label: "LinkedIn", href: "https://www.linkedin.com/in/deepakmaan/" },
                { label: "Behance", href: "https://www.behance.net/deepakmaan1" },
                { label: "GitHub", href: "https://github.com/deepakmaan25?tab=repositories" },
              ].map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-body font-medium text-indigo-500 hover:text-indigo-700 transition-colors"
                >
                  {l.label}
                  <ExternalLink size={12} />
                </a>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — Experience + Skills */}
          <div>
            {/* Experience */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p className="font-body text-xs font-medium tracking-widest uppercase text-muted-foreground mb-6">
                Experience
              </p>
              <div className="space-y-6">
                {experience.map((exp, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 * i }}
                    className="flex gap-4"
                  >
                    <div className="w-1 rounded-full bg-indigo-200 dark:bg-indigo-800 flex-shrink-0 mt-1" style={{ minHeight: 40 }} />
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-body font-medium text-foreground text-sm">
                          {exp.role}
                        </span>
                        <span className="font-body text-xs px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                          {exp.type}
                        </span>
                      </div>
                      <p className="font-body text-muted-foreground text-xs font-light mt-0.5 mb-2">
                        {exp.company} · {exp.period}
                      </p>
                      <p className="font-body text-muted-foreground text-sm font-light leading-relaxed">
                        {exp.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Skills */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-10"
            >
              <p className="font-body text-xs font-medium tracking-widest uppercase text-muted-foreground mb-4">
                Skills & Tools
              </p>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="font-body text-xs px-3 py-1.5 rounded-full border border-border text-muted-foreground hover:border-indigo-300 hover:text-indigo-600 transition-colors cursor-default"
                    style={{ fontWeight: 400 }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
