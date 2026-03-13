import { useRef, useEffect, useState } from "react";
import { Search, Target, PenTool, CheckCircle } from "lucide-react";

const steps = [
  {
    num: "01",
    icon: Search,
    title: "Discover & Listen",
    description:
      "Every project starts with curiosity. I conduct user interviews, competitive audits, and stakeholder workshops — using AI tools like Claude to synthesize patterns from raw transcripts 3x faster than manual analysis.",
    tags: ["User Interviews", "AI Synthesis"],
  },
  {
    num: "02",
    icon: Target,
    title: "Define the Real Problem",
    description:
      "Most design fails because it solves the wrong thing. I use affinity mapping and Jobs-to-be-Done frameworks to reframe vague briefs into precise, testable problem statements — validated with stakeholders before a single wireframe.",
    tags: ["HMW Statements", "Journey Maps"],
  },
  {
    num: "03",
    icon: PenTool,
    title: "Design with Intention",
    description:
      "From rough sketches to high-fidelity Figma prototypes — every decision is traceable to a research insight. I use Midjourney for early visual mood exploration and component-driven design systems for scalable delivery.",
    tags: ["Figma Systems", "AI-Assisted Ideation"],
  },
  {
    num: "04",
    icon: CheckCircle,
    title: "Deliver & Measure",
    description:
      "Design doesn't end at handoff. I conduct usability testing with Maze, annotate developer specs, and track post-launch metrics to close the feedback loop and quantify impact.",
    tags: ["Usability Testing", "Impact Metrics"],
  },
];

const ResearchWall = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  const colors = ['rgba(253,224,71,0.2)', 'rgba(196,181,253,0.2)'];
  const highlights = [2, 7, 14];
  return (
    <div ref={ref} className="hidden md:flex items-center justify-center opacity-85">
      <div className="grid grid-cols-5 gap-2 w-[280px]">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="w-12 h-12 rounded-md transition-all duration-300"
            style={{
              background: colors[i % 2],
              border: '1px solid rgba(0,0,0,0.06)',
              opacity: visible ? 1 : 0,
              transform: visible ? 'scale(1)' : 'scale(0.95)',
              transitionDelay: `${i * 30}ms`,
              borderTop: highlights.includes(i) ? '3px solid rgba(99,102,241,0.4)' : undefined,
            }}
          />
        ))}
      </div>
    </div>
  );
};

const JourneyMap = () => (
  <div className="hidden md:flex items-center justify-center opacity-85">
    <div className="w-[300px]">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-3">
        User Journey
      </div>
      <div className="relative flex items-center justify-between">
        <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-border -translate-y-1/2" />
        {['#EF4444', '#F59E0B', '#F59E0B', '#10B981', '#10B981'].map((c, i) => (
          <div key={i} className="relative z-10 flex flex-col items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
            <div className="w-10 h-1.5 rounded bg-border" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ComponentLibrary = () => (
  <div className="hidden md:flex items-center justify-center opacity-85">
    <div className="w-[280px] p-6 rounded-xl" style={{ border: '1px dashed hsl(var(--border))' }}>
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-4">
        Design System Components
      </div>
      <div className="space-y-3">
        <div className="flex gap-2">
          <div
            className="px-3 py-1.5 rounded-md text-[10px] font-medium text-white"
            style={{ background: '#6366f1' }}
          >
            Button
          </div>
          <div className="px-3 py-1.5 rounded-md text-[10px] font-medium border border-border text-foreground">
            Outlined
          </div>
        </div>
        <div className="h-8 rounded-md border border-border flex items-center px-3">
          <div className="h-1.5 rounded-full w-2/3 bg-foreground/10" />
        </div>
        <div className="flex items-center gap-4">
          <div className="w-8 h-4 rounded-full bg-[#6366f1] relative">
            <div className="absolute right-0.5 top-0.5 w-3 h-3 rounded-full bg-white" />
          </div>
          <div className="w-4 h-4 rounded border-2 border-[#6366f1] flex items-center justify-center">
            <div className="w-2 h-2 rounded-sm bg-[#6366f1]" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

const MetricsDashboard = () => {
  const metrics = [
    { label: "Task Completion", value: "↑ 93%", color: "#6366f1" },
    { label: "Drop-off Rate", value: "↓ 60%", color: "#6366f1" },
    { label: "Usability Score", value: "4.2/5", color: "#6366f1" },
  ];
  return (
    <div className="hidden md:flex items-center justify-center opacity-85">
      <div className="w-[240px] space-y-2.5">
        {metrics.map((m) => (
          <div key={m.label} className="rounded-lg p-3 bg-surface border border-border">
            <div className="text-[10px] text-muted-foreground uppercase tracking-wider">
              {m.label}
            </div>
            <div className="text-[18px] font-bold mt-0.5" style={{ color: m.color }}>
              {m.value}
            </div>
          </div>
        ))}
        <svg width="240" height="40" viewBox="0 0 240 40" fill="none">
          <polyline
            points="0,35 30,28 60,30 90,20 120,22 150,14 180,10 210,6 240,3"
            stroke="#6366f1"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </div>
    </div>
  );
};

const oppositeVisuals = [ResearchWall, JourneyMap, ComponentLibrary, MetricsDashboard];

const StepCard = ({ step, index }: { step: typeof steps[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const isLeft = index % 2 === 0;

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const OppositeVisual = oppositeVisuals[index];

  const cardStyle = {
    boxShadow: '0 4px 24px rgba(0,0,0,0.05)',
    opacity: visible ? 1 : 0,
    transition: 'opacity 400ms cubic-bezier(0.16,1,0.3,1), transform 400ms cubic-bezier(0.16,1,0.3,1)',
  };

  return (
    <div ref={ref} className="relative">
      <div className="hidden md:block absolute left-1/2 top-10 -translate-x-1/2 w-2 h-2 rounded-full bg-foreground z-10" />

      <div className="md:grid md:grid-cols-2 gap-8 items-center">
        <div className={isLeft ? '' : 'md:order-2'}>
          {isLeft ? (
            <div
              className="w-full bg-background border border-border rounded-2xl overflow-hidden"
              style={{
                ...cardStyle,
                transform: visible ? 'translateX(0)' : 'translateX(-40px)',
              }}
            >
              <div className="p-8">
                <div
                  className="text-[48px] font-extrabold leading-none mb-3"
                  style={{ color: 'hsl(var(--border))' }}
                >
                  {step.num}
                </div>
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mb-4">
                  <step.icon size={18} className="text-foreground" />
                </div>
                <h3 className="text-[20px] font-bold text-foreground mb-3">{step.title}</h3>
                <p className="type-body text-muted-foreground mb-5">{step.description}</p>
                <div className="flex flex-wrap gap-2">
                  {step.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-3 py-1.5 border border-tag-border rounded-full text-[12px] text-muted-foreground bg-background"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(-40px)',
              transition: 'opacity 400ms cubic-bezier(0.16,1,0.3,1), transform 400ms cubic-bezier(0.16,1,0.3,1)',
            }}>
              <OppositeVisual />
            </div>
          )}
        </div>

        <div className={isLeft ? '' : 'md:order-1'}>
          {isLeft ? (
            <div style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(40px)',
              transition: 'opacity 400ms cubic-bezier(0.16,1,0.3,1), transform 400ms cubic-bezier(0.16,1,0.3,1)',
            }}>
              <OppositeVisual />
            </div>
          ) : (
            <div
              className="w-full bg-background border border-border rounded-2xl overflow-hidden"
              style={{
                ...cardStyle,
                transform: visible ? 'translateX(0)' : 'translateX(40px)',
              }}
            >
              <div className="p-8">
                <div
                  className="text-[48px] font-extrabold leading-none mb-3"
                  style={{ color: 'hsl(var(--border))' }}
                >
                  {step.num}
                </div>
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mb-4">
                  <step.icon size={18} className="text-foreground" />
                </div>
                <h3 className="text-[20px] font-bold text-foreground mb-3">{step.title}</h3>
                <p className="type-body text-muted-foreground mb-5">{step.description}</p>
                <div className="flex flex-wrap gap-2">
                  {step.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-3 py-1.5 border border-tag-border rounded-full text-[12px] text-muted-foreground bg-background"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Process = () => {
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
    <section id="process" className="py-24 md:py-[96px] bg-surface">
      <div className="px-6 max-w-site mx-auto">
        <div
          ref={ref}
          className="mb-16"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 400ms ease, transform 400ms ease',
          }}
        >
          <p className="type-label mb-3">PROCESS</p>
          <h2 className="type-h2">How I work</h2>
        </div>

        <div className="relative">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 border-l border-dashed border-border" />
          <div className="space-y-10 md:space-y-12">
            {steps.map((step, i) => (
              <StepCard key={step.num} step={step} index={i} />
            ))}
          </div>
        </div>

        {/* Quote block — dark mode safe */}
        <div
          className="mt-16 relative overflow-hidden rounded-2xl"
          style={{ background: 'hsl(var(--quote-block-bg, 0 0% 4%))' }}
        >
          <div
            className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.15), transparent 70%)' }}
          />
          <div
            className="absolute bottom-0 left-0 w-[200px] h-[200px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.1), transparent 70%)' }}
          />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />
          <div className="relative p-12 md:p-16">
            <div
              className="absolute top-6 left-10 text-[120px] leading-none font-serif"
              style={{ color: 'rgba(99,102,241,0.15)' }}
            >
              "
            </div>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mt-8">
              <div className="max-w-2xl">
                <p className="text-[26px] md:text-[30px] italic leading-relaxed text-white/90">
                  The best designers I know aren't the best at Figma. They're the best at asking the right questions.
                </p>
              </div>
              <div className="flex-shrink-0">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-[14px] font-bold text-white"
                    style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.6), rgba(139,92,246,0.6))' }}
                  >
                    DM
                  </div>
                  <div>
                    <div className="text-[14px] font-medium text-white/80">Deepak Maan</div>
                    <div className="text-[12px] text-white/35">Product Designer</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Process;
