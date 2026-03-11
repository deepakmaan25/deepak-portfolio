const proofItems = [
  "5+ Case Studies",
  "3 Industries",
  "AI Workflows",
  "Research to Handoff",
];

const ProofBar = () => {
  return (
    <section className="bg-surface py-5 border-b border-border">
      <div className="max-w-site mx-auto px-6 grid grid-cols-2 gap-3 md:flex md:items-center md:justify-between">
        {proofItems.map((item, i) => (
          <span key={i} className="flex items-center gap-4 text-center md:text-left justify-center md:justify-start">
            {i > 0 && <span className="text-border max-md:hidden">·</span>}
            <span className="text-[13px] text-muted-foreground border-l-2 border-accent/30 pl-2 md:border-l-0 md:pl-0">{item}</span>
          </span>
        ))}
      </div>
    </section>
  );
};

export default ProofBar;
