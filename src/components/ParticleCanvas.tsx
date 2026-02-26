import { useRef, useEffect, useCallback } from "react";

const ParticleCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animFrameRef = useRef<number>(0);

  const init = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.parentElement!.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      canvas.style.width = rect.width + "px";
      canvas.style.height = rect.height + "px";
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();

    const w = () => canvas.width / window.devicePixelRatio;
    const h = () => canvas.height / window.devicePixelRatio;

    // Create dots in loose grid
    const dots: { ox: number; oy: number; x: number; y: number; vx: number; vy: number; phase: number }[] = [];
    const cols = 12;
    const rows = 10;
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const ox = (i + 0.5) * (w() / cols) + (Math.random() - 0.5) * 20;
        const oy = (j + 0.5) * (h() / rows) + (Math.random() - 0.5) * 20;
        dots.push({ ox, oy, x: ox, y: oy, vx: 0, vy: 0, phase: Math.random() * Math.PI * 2 });
      }
    }

    let time = 0;
    const animate = () => {
      time += 0.008;
      const cw = w();
      const ch = h();
      ctx.clearRect(0, 0, cw, ch);

      const mouse = mouseRef.current;

      // Update dots
      for (const dot of dots) {
        // Sine drift
        const targetX = dot.ox + Math.sin(time + dot.phase) * 6;
        const targetY = dot.oy + Math.cos(time * 0.7 + dot.phase) * 4;

        // Mouse repulsion
        const dx = dot.x - mouse.x;
        const dy = dot.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let fx = 0, fy = 0;
        if (dist < 100 && dist > 0) {
          const force = (100 - dist) / 100 * 40;
          fx = (dx / dist) * force;
          fy = (dy / dist) * force;
        }

        dot.x += ((targetX + fx) - dot.x) * 0.08;
        dot.y += ((targetY + fy) - dot.y) * 0.08;
      }

      // Draw connections
      ctx.strokeStyle = "rgba(255,255,255,0.06)";
      ctx.lineWidth = 1;
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          if (dx * dx + dy * dy < 80 * 80) {
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw dots
      ctx.fillStyle = "rgba(255,255,255,0.4)";
      for (const dot of dots) {
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, 2, 0, Math.PI * 2);
        ctx.fill();
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      resize();
      // Recalculate dot origins
      const newW = w();
      const newH = h();
      let idx = 0;
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          if (idx < dots.length) {
            dots[idx].ox = (i + 0.5) * (newW / cols) + (Math.random() - 0.5) * 20;
            dots[idx].oy = (j + 0.5) * (newH / rows) + (Math.random() - 0.5) * 20;
            idx++;
          }
        }
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  useEffect(() => {
    const cleanup = init();
    return cleanup;
  }, [init]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const handleMouseLeave = () => {
    mouseRef.current = { x: -1000, y: -1000 };
  };

  return (
    <div
      className="relative w-full h-[480px] rounded-[20px] overflow-hidden"
      style={{ background: "#0A0A0A" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <canvas ref={canvasRef} className="absolute inset-0" />
      {/* Floating UI mockup card */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="animate-float-card w-[220px] rounded-xl p-5"
          style={{
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.15)",
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full" style={{ background: "rgba(255,255,255,0.2)" }} />
            <div className="flex-1 space-y-1.5">
              <div className="h-2 rounded-full w-3/4" style={{ background: "rgba(255,255,255,0.2)" }} />
              <div className="h-2 rounded-full w-1/2" style={{ background: "rgba(255,255,255,0.12)" }} />
            </div>
          </div>
          <div className="space-y-2 mb-4">
            <div className="h-2 rounded-full w-full" style={{ background: "rgba(255,255,255,0.2)" }} />
            <div className="h-2 rounded-full w-5/6" style={{ background: "rgba(255,255,255,0.15)" }} />
          </div>
          <div className="h-7 rounded-md w-24" style={{ background: "rgba(99,102,241,0.6)" }} />
        </div>
      </div>
    </div>
  );
};

export default ParticleCanvas;
