const processSteps = [
  {
    number: "01",
    title: "Discover",
    description:
      "I start every project with research — user interviews, competitor analysis, and stakeholder conversations — to deeply understand the problem before touching Figma.",
    icon: "🔍",
  },
  {
    number: "02",
    title: "Define",
    description:
      "Synthesising research into clear problem statements, personas, and opportunity areas. This is where confusion becomes clarity.",
    icon: "🎯",
  },
  {
    number: "03",
    title: "Design",
    description:
      "From rough sketches to high-fidelity prototypes, I iterate quickly, test often, and keep the user at the centre of every decision.",
    icon: "✏️",
  },
  {
    number: "04",
    title: "Deliver",
    description:
      "Polished handoff-ready designs with annotated specs, responsive behaviour, and close collaboration with engineering to ensure nothing is lost in translation.",
    icon: "🚀",
  },
];

const Process = () => {
  return (
    <section id="process" className="py-24 lg:py-32 px-6 lg:px-12 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <span className="font-body text-xs font-medium tracking-[0.2em] uppercase text-terracotta mb-3 block">
          How I Work
        </span>
        <h2 className="font-display text-4xl lg:text-5xl font-bold text-charcoal">
          My Design Process
        </h2>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
        {processSteps.map((step) => (
          <div
            key={step.number}
            className="bg-cream p-8 group hover:bg-charcoal transition-colors duration-400"
          >
            <div className="font-display text-5xl font-bold text-border group-hover:text-terracotta/40 transition-colors duration-300 mb-6">
              {step.number}
            </div>
            <div className="text-2xl mb-4">{step.icon}</div>
            <h3 className="font-display text-xl font-semibold text-charcoal group-hover:text-cream transition-colors duration-300 mb-3">
              {step.title}
            </h3>
            <p className="font-body text-sm text-warm-gray group-hover:text-cream/70 transition-colors duration-300 leading-relaxed">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Process;
