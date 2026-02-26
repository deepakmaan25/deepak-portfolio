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

    const dots: { ox: number; oy: number; x: number; y: number; phase: number }[] = [];
    const cols = 18;
    const rows = 12;
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const ox = (i + 0.5) * (w() / cols) + (Math.random() - 0.5) * 20;
        const oy = (j + 0.5) * (h() / rows) + (Math.random() - 0.5) * 20;
        dots.push({ ox, oy, x: ox, y: oy, phase: Math.random() * Math.PI * 2 });
      }
    }

    let time = 0;
    const animate = () => {
      time += 0.006;
      const cw = w();
      const ch = h();
      ctx.clearRect(0, 0, cw, ch);

      const mouse = mouseRef.current;

      for (const dot of dots) {
        const targetX = dot.ox + Math.sin(time + dot.phase) * 5;
        const targetY = dot.oy + Math.cos(time * 0.7 + dot.phase) * 3;

        const dx = dot.x - mouse.x;
        const dy = dot.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let fx = 0, fy = 0;
        if (dist < 120 && dist > 0) {
          const force = (120 - dist) / 120 * 50;
          fx = (dx / dist) * force;
          fy = (dy / dist) * force;
        }

        dot.x += ((targetX + fx) - dot.x) * 0.08;
        dot.y += ((targetY + fy) - dot.y) * 0.08;
      }

      // Draw connections
      ctx.strokeStyle = "rgba(0,0,0,0.04)";
      ctx.lineWidth = 1;
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          if (dx * dx + dy * dy < 90 * 90) {
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw dots
      ctx.fillStyle = "rgba(0,0,0,0.12)";
      for (const dot of dots) {
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      resize();
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
      className="absolute inset-0 pointer-events-auto"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
};

export default ParticleCanvas;
