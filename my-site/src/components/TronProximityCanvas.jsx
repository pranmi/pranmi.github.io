import { useEffect, useRef } from "react";

const GRID = 60; // density of dots

export default function TronProximityCanvas() {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    // track mouse globally
    const handleMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    window.addEventListener("mousemove", handleMove);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const spacing = 30; // pixel-perfect uniform grid size

      const cols = Math.floor(canvas.width / spacing);
      const rows = Math.floor(canvas.height / spacing);   

      for (let y = 0; y < GRID; y++) {
        for (let x = 0; x < GRID; x++) {
          const px = x * spacing + spacing / 2;
          const py = y * spacing + spacing / 2;

          const dx = px - mouse.current.x;
          const dy = py - mouse.current.y;

          const dist = Math.sqrt(dx * dx + dy * dy);

          // influence radius (tweak this)
          const influence = Math.max(0, 1 - dist / 250);

          const scale = 0.8 + influence * 5;
          const alpha = 0.15 + influence * 0.85;
          const glow = influence * 25;

          // dot style
          ctx.beginPath();
          ctx.arc(px, py, 2.2 * scale, 0, Math.PI * 2);

          ctx.fillStyle = `rgba(0, 240, 255, ${alpha})`;

          ctx.shadowBlur = glow;
          ctx.shadowColor = "#00f0ff";

          ctx.fill();
        }
      }

      requestAnimationFrame(draw);
    };

    requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        background: "#05070d",
        zIndex: 0,
      }}
    />
  );
}