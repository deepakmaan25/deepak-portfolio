import { useRef, useEffect, useState } from "react";

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

const experiences = [
  {
    company: "Freelance / Self-employed",
    role: "Product Designer",
    duration: "2023 — Present",
    points: [
      "End-to-end UX for 12+ client projects across fintech, health, and EdTech",
      "AI-assisted research synthesis cutting analysis time by 3x",
      "Built and maintained Figma design systems for 3 long-term clients",
    ],
  },
  {
    company: "Design Institute",
    role: "BSc Interaction Design",
    duration: "2020 — 2023",
    points: [
      "Final year project: Redesigned a government service portal, validated with 40+ users",
      "Coursework spanning HCI, visual design, and front-end prototyping",
      "Graduated with distinction",
    ],
  },
  {
    company: "Self-directed Learning",
    role: "AI for Designers / Google UX Certificate",
    duration: "2023 — 2024",
    points: [
      "Completed Google UX Design Certificate (Coursera)",
      "Explored AI-integrated design workflows using Claude, Midjourney, and ChatGPT",
      "Applied learnings immediately to active client projects",
    ],
  },
];

const About = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="about">

      {/* SUBSECTION 1 — Bio + Photo */}
      <div className="border-t border-border" />
      <div
        ref={ref}
        className="px-6 lg:px-8 max-w-site mx-auto py-16 md:py-24"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 500ms ease, transform 500ms ease',
        }}
      >
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left — Bio */}
          <div>
            <p className="type-label mb-4">ABOUT</p>
            <h2 className="type-h2 mb-8" style={{ fontSize: '40px' }}>
              A designer who{" "}
              <span className="relative inline-block">
                listens
                <svg className="absolute -bottom-1 left-0 w-full" height="6" viewBox="0 0 100 6" preserveAspectRatio="none" fill="none">
                  <path d="M0 3 Q 10 0, 20 3 T 40 3 T 60 3 T 80 3 T 100 3" stroke="#6366F1" strokeWidth="3" fill="none" strokeLinecap="round" />
                </svg>
              </span>
              {" "}first.
            </h2>

            <div className="space-y-5 type-body text-muted-foreground max-w-lg">
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
              <span className="text-[13px] font-medium px-4 py-1.5 rounded-full" style={{ background: '#DCFCE7', color: '#166534', border: '1px solid #BBF7D0' }}>
                Available for new opportunities
              </span>
            </div>

            {/* Currently card */}
            <div className="mt-6 bg-foreground rounded-xl p-5 max-w-xs">
              <p className="text-[10px] font-semibold tracking-[0.15em] uppercase mb-3" style={{ color: 'rgba(255,255,255,0.3)' }}>CURRENTLY</p>
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

          {/* Right — Photo with decorative rings */}
          <div className="flex items-center justify-center">
            <div className="relative">
              {/* Decorative full rotating rings */}
              <svg
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[440px] h-[440px]"
                viewBox="0 0 440 440"
                fill="none"
              >
                <circle
                  cx="220" cy="220" r="158"
                  stroke="rgba(99,102,241,0.15)"
                  strokeWidth="1.5"
                  strokeDasharray="6 4"
                  fill="none"
                  style={{ animation: 'ring-rotate 20s linear infinite', transformOrigin: '220px 220px' }}
                />
                <circle
                  cx="220" cy="220" r="188"
                  stroke="rgba(99,102,241,0.10)"
                  strokeWidth="1.5"
                  strokeDasharray="6 4"
                  fill="none"
                  style={{ animation: 'ring-rotate 30s linear reverse infinite', transformOrigin: '220px 220px' }}
                />
                <circle
                  cx="220" cy="220" r="214"
                  stroke="rgba(99,102,241,0.06)"
                  strokeWidth="1.5"
                  strokeDasharray="6 4"
                  fill="none"
                  style={{ animation: 'ring-rotate 45s linear infinite', transformOrigin: '220px 220px' }}
                />
              </svg>

              {/* Photo circle — DM initials */}
              <div
                className="w-[280px] h-[280px] rounded-full relative z-10 flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #c7d2fe, #818cf8, #6366f1)',
                  boxShadow: '0 0 0 6px white, 0 0 0 12px #e0e7ff, 0 0 0 18px rgba(99,102,241,0.1)',
                }}
              >
                <span className="text-[56px] font-bold text-white tracking-tight select-none">DM</span>
              </div>

              {/* Credential badge */}
              <div
                className="absolute -bottom-4 -right-5 z-20 bg-background border border-border rounded-xl px-4 py-2.5"
                style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}
              >
                <span className="text-[13px] font-bold text-foreground">⚡ 12+ Projects Shipped</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SUBSECTION 2 — Skills Strip */}
      <div className="py-8" style={{ background: 'hsl(var(--skills-strip-bg))' }}>
        <div className="px-6 lg:px-8 max-w-site mx-auto flex flex-col md:flex-row md:items-start gap-6 md:gap-0">
          {skillGroups.map((group, gi) => (
            <div
              key={group.label}
              className="flex-1 flex flex-col gap-3"
              style={{
                borderLeft: gi > 0 ? '1px solid hsl(var(--skills-strip-divider))' : undefined,
                paddingLeft: gi > 0 ? 24 : 0,
              }}
            >
              <span
                className="text-[10px] uppercase tracking-[0.15em] font-semibold"
                style={{ color: 'hsl(var(--skills-strip-label))' }}
              >
                {group.label}
              </span>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center px-3 py-1 rounded-full text-[12px] transition-colors duration-200 cursor-default"
                    style={{
                      background: 'hsl(var(--skills-strip-tag-bg))',
                      border: '1px solid hsl(var(--skills-strip-tag-border))',
                      color: 'hsl(var(--skills-strip-text))',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#6366f1';
                      e.currentTarget.style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'hsl(var(--skills-strip-tag-border))';
                      e.currentTarget.style.color = 'hsl(var(--skills-strip-text))';
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SUBSECTION 3 — Experience */}
      <div className="py-16 md:py-20">
        <div className="px-6 lg:px-8 max-w-site mx-auto">
          <p className="type-label mb-3">EXPERIENCE</p>
          <h2 className="type-h2 mb-12">Where I've worked</h2>
          <div>
            {experiences.map((exp, i) => (
              <div
                key={i}
                className="grid md:grid-cols-[25%_55%_20%] gap-4 md:gap-8 py-6 border-b border-border transition-colors duration-200 hover:bg-surface cursor-default px-4 -mx-4 rounded-lg"
              >
                <div>
                  <div className="text-[16px] font-bold text-foreground">{exp.company}</div>
                  <div className="text-[14px]" style={{ color: '#6366f1' }}>{exp.role}</div>
                </div>
                <div className="space-y-1">
                  {exp.points.map((p, j) => (
                    <p key={j} className="text-[14px] text-muted-foreground leading-[1.8]">— {p}</p>
                  ))}
                </div>
                <div className="text-[13px] text-muted-foreground md:text-right">{exp.duration}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
};

export default About;
