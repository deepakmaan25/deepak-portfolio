const proofItems = [
  "5+ Case Studies",
  "3 Industries",
  "AI-Integrated Workflows",
  "Research to Handoff",
];

const ProofBar = () => {
  return (
    <section className="bg-surface py-5 border-b border-border">
      <div className="max-w-site mx-auto px-6 flex items-center justify-between max-md:flex-wrap max-md:gap-3 max-md:justify-center">
        {proofItems.map((item, i) => (
          <span key={i} className="flex items-center gap-4">
            {i > 0 && <span className="text-border max-md:hidden">·</span>}
            <span className="text-[13px] text-muted-foreground">{item}</span>
          </span>
        ))}
      </div>
    </section>
  );
};

export default ProofBar;
