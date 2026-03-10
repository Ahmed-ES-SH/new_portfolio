"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { mulberry32 } from "./mulberry32";
import { shuffleArray } from "./shuffleArray";
import { drawPixelBurst } from "./drawPixelBurst";

interface IGridTransitionProps {
  active: boolean;
  onComplete: () => void;
}

export default function GridTransition({
  active,
  onComplete,
}: IGridTransitionProps) {
  const tileRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const [grid, setGrid] = useState({ cols: 0, rows: 0, total: 0 });
  const tilePx = 64;

  useLayoutEffect(() => {
    const compute = () => {
      const c = Math.ceil(window.innerWidth / tilePx);
      const r = Math.ceil(window.innerHeight / tilePx);
      setGrid({ cols: c, rows: r, total: c * r });
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  useEffect(() => {
    if (!active || grid.total === 0) return;
    const rand = mulberry32(Date.now());
    const indices = shuffleArray(
      Array.from({ length: grid.total }, (_, i) => i),
      rand,
    );
    let completed = 0;

    indices.forEach((idx, i) => {
      setTimeout(
        () => {
          const el = tileRefs.current.get(idx);
          const canvas = el?.querySelector("canvas");
          if (el && canvas) {
            drawPixelBurst(canvas, tilePx, "#00f5e4", "burst");
            el.style.opacity = "1";
            el.style.transform = "scale(1)";

            setTimeout(() => {
              drawPixelBurst(canvas, tilePx, "#00f5e4", "solid");
              setTimeout(() => {
                el.style.opacity = "0";
                completed++;
                if (completed >= grid.total) onComplete();
              }, 100); // decreased from 160
            }, 110); // decreased from 130
          }
        },
        (i / 25) * 40,
      ); // Slower stagger logic (decreased from 40/20)
    });
  }, [active, grid.total, onComplete]);

  if (!active) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        pointerEvents: "none",
        display: "grid",
        gridTemplateColumns: `repeat(${grid.cols}, ${tilePx}px)`,
        overflow: "hidden",
      }}
      className="z-9999999 pointer-events-none w-full h-screen"
    >
      {Array.from({ length: grid.total }).map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) tileRefs.current.set(i, el);
          }}
          style={{
            width: tilePx,
            height: tilePx,
            opacity: 0,
            transition: "opacity 0.2s, transform 0.2s",
          }}
        >
          <canvas />
        </div>
      ))}
    </div>
  );
}

// ── Helpers: Logic for Pixel Burst ──
