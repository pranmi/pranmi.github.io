import { useEffect, useRef, useState } from "react";
import "./Grid.css";

const SIZE = 20;

export default function Grid() {
  const [energy, setEnergy] = useState(
    Array(SIZE * SIZE).fill(0)
  );

  const energyRef = useRef(energy);
  energyRef.current = energy;

  // --- diffusion system (cascade propagation) ---
  useEffect(() => {
    const interval = setInterval(() => {
      setEnergy((prev) => {
        const next = [...prev];

        for (let i = 0; i < SIZE * SIZE; i++) {
          const x = i % SIZE;
          const y = Math.floor(i / SIZE);

          let sum = 0;
          let count = 0;

          const neighbors = [
            [x - 1, y],
            [x + 1, y],
            [x, y - 1],
            [x, y + 1],
          ];

          for (const [nx, ny] of neighbors) {
            if (nx >= 0 && nx < SIZE && ny >= 0 && ny < SIZE) {
              sum += energyRef.current[ny * SIZE + nx];
              count++;
            }
          }

          const avg = count ? sum / count : 0;

          // stable TRON cascade (decay + spread)
          next[i] = Math.min(1, next[i] * 0.92 + avg * 0.6);
        }

        return next;
      });
    }, 40);

    return () => clearInterval(interval);
  }, []);


  useEffect(() => {
  const gridEl = document.querySelector(".grid");

  const handleMove = (e) => {
    if (!gridEl) return;

    const rect = gridEl.getBoundingClientRect();

    const x = Math.floor(((e.clientX - rect.left) / rect.width) * SIZE);
    const y = Math.floor(((e.clientY - rect.top) / rect.height) * SIZE);

    if (x < 0 || x >= SIZE || y < 0 || y >= SIZE) return;

    setEnergy((prev) => {
      const next = [...prev];
      next[y * SIZE + x] = 2;
      return next;
    });
  };

  window.addEventListener("mousemove", handleMove);

  return () => window.removeEventListener("mousemove", handleMove);
}, []);

  return (
    <div className="grid">
      {energy.map((e, i) => (
        <div
          key={i}
          className="node"
          style={{
            opacity: Math.max(0.15, Math.pow(e, 0.5)),

            // stronger size response
            transform: `
                scale(${0.7 + e * 1.8})
            `,

            // brighter glow
            boxShadow: `
                0 0 ${10 + 40 * e}px #00f0ff,
                0 0 ${5 + 20 * e}px rgba(0, 240, 255, 0.5)
            `,

            backgroundColor: `
                rgba(0, 240, 255, ${0.2 + e})
            `,
        }}
        />
      ))}
    </div>
  );
}