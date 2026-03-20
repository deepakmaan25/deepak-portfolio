{/* Panel */}
      <motion.div
        className="rounded-2xl overflow-hidden bg-background relative"
        style={{ border: "1px solid hsl(var(--border))", boxShadow: "0 2px 24px rgba(0,0,0,0.06)" }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl" style={{ background: "linear-gradient(90deg, #6366f1, #818cf8)" }} />
        <div className="grid" style={{ gridTemplateColumns: "65fr 35fr", minHeight: 280 }}>
          <div className="flex flex-col justify-center p-10"
            style={{
              borderRight: "1px solid hsl(var(--border))",
              opacity: animating ? 0 : 1,
              transform: animating ? "translateY(6px)" : "translateY(0)",
              transition: "opacity 0.22s ease, transform 0.22s ease",
            }}>
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] mb-2.5" style={{ color: "hsl(var(--muted-foreground))" }}>
              {step.tag}
            </p>
            <h3 className="font-normal mb-3" style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(22px, 2.5vw, 30px)", lineHeight: 1.2, color: "hsl(var(--foreground))" }}>
              {step.title}{" "}
              <em style={{ fontStyle: "italic", color: "#6366f1" }}>{step.titleEm}</em>
            </h3>
            <p className="mb-5 max-w-[400px]" style={{ fontSize: 13, lineHeight: 1.75, color: "hsl(var(--muted-foreground))" }}>
              {step.desc}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {step.pills.map((pill) => (
                <span key={pill} className="text-[10px] font-medium px-3 py-1 rounded-full"
                  style={{ background: "rgba(99,102,241,0.06)", color: "#6366f1", border: "1px solid rgba(99,102,241,0.14)" }}>
                  {pill}
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center p-8"
            style={{
              opacity: animating ? 0 : 1,
              transform: animating ? "translateY(6px)" : "translateY(0)",
              transition: "opacity 0.22s ease, transform 0.22s ease",
            }}>
            <IllusComponent />
          </div>
        </div>
      </motion.div>

    </section>
  );
};

export default Process;
