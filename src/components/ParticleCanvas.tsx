import { useRef, useEffect, useCallback } from "react";

const DOT_COUNT = 80;

const ParticleCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animFrameRef = useRef<number>(0);

  const init = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0, h = 0;

    const resize = () => {
      const rect = canvas.parentElement!.getBoundingClientRect();
      const dpr = window.devicePixelRatio;
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    // Use Float32Array for positions: [ox, oy, x, y, phase] per dot
    const data = new Float32Array(DOT_COUNT * 5);
    const cols = 10;
    const rows = 8;
    for (let i = 0; i < DOT_COUNT; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols) % rows;
      const ox = (col + 0.5) * (w / cols) + (Math.random() - 0.5) * 30;
      const oy = (row + 0.5) * (h / rows) + (Math.random() - 0.5) * 30;
      const base = i * 5;
      data[base] = ox;     // ox
      data[base + 1] = oy; // oy
      data[base + 2] = ox; // x
      data[base + 3] = oy; // y
      data[base + 4] = Math.random() * Math.PI * 2; // phase
    }

    // Pre-create radial gradient image for cursor glow
    const glowCanvas = document.createElement("canvas");
    glowCanvas.width = 240;
    glowCanvas.height = 240;
    const glowCtx = glowCanvas.getContext("2d")!;
    const grad = glowCtx.createRadialGradient(120, 120, 0, 120, 120, 120);
    grad.addColorStop(0, "rgba(99,102,241,0.06)");
    grad.addColorStop(1, "transparent");
    glowCtx.fillStyle = grad;
    glowCtx.fillRect(0, 0, 240, 240);

    let time = 0;
    let lastTs = 0;

    const animate = (ts: number) => {
      const delta = ts - lastTs;
      // Skip if below 30fps to prevent lag spikes
      if (lastTs > 0 && delta > 33) {
        lastTs = ts;
        animFrameRef.current = requestAnimationFrame(animate);
        return;
      }
      lastTs = ts;
      time += 0.006;

      ctx.clearRect(0, 0, w, h);

      const mouse = mouseRef.current;

      // Update dot positions
      for (let i = 0; i < DOT_COUNT; i++) {
        const base = i * 5;
        const ox = data[base];
        const oy = data[base + 1];
        const phase = data[base + 4];

        const targetX = ox + Math.sin(time + phase) * 5;
        const targetY = oy + Math.cos(time * 0.7 + phase) * 3;

        const dx = data[base + 2] - mouse.x;
        const dy = data[base + 3] - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let fx = 0, fy = 0;
        if (dist < 100 && dist > 0) {
          const force = (100 - dist) / 100 * 50;
          fx = (dx / dist) * force;
          fy = (dy / dist) * force;
        }

        data[base + 2] += ((targetX + fx) - data[base + 2]) * 0.08;
        data[base + 3] += ((targetY + fy) - data[base + 3]) * 0.08;
      }

      // Draw cursor glow instead of lines
      if (mouse.x > 0 && mouse.y > 0) {
        ctx.drawImage(glowCanvas, mouse.x - 120, mouse.y - 120);
      }

      // Draw dots
      ctx.fillStyle = "hsl(var(--foreground) / 0.12)";
      for (let i = 0; i < DOT_COUNT; i++) {
        const base = i * 5;
        ctx.beginPath();
        ctx.arc(data[base + 2], data[base + 3], 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    const handleResize = () => {
      resize();
      const cols2 = 10;
      for (let i = 0; i < DOT_COUNT; i++) {
        const col = i % cols2;
        const row = Math.floor(i / cols2) % rows;
        const base = i * 5;
        data[base] = (col + 0.5) * (w / cols2) + (Math.random() - 0.5) * 30;
        data[base + 1] = (row + 0.5) * (h / rows) + (Math.random() - 0.5) * 30;
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
