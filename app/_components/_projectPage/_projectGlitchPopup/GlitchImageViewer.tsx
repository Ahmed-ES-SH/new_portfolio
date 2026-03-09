"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Generate random particle fragments for the entrance glitch
function generateParticles(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    top: `${Math.random() * 90}%`,
    left: `${Math.random() * 90}%`,
    width: `${20 + Math.random() * 60}%`,
    height: `${3 + Math.random() * 12}%`,
    delay: i * 0.08,
    xShift: (Math.random() - 0.5) * 60,
  }));
}

interface GlitchImageViewerProps {
  images: string[];
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
}

export default function GlitchImageViewer({
  images,
  activeIndex,
  setActiveIndex,
}: GlitchImageViewerProps) {
  const [hasEntered, setHasEntered] = useState(false);
  const entranceParticles = useMemo(() => generateParticles(6), []);

  // Mark entrance as complete after the animation duration
  useEffect(() => {
    const timer = setTimeout(() => setHasEntered(true), 900);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex-1 relative flex flex-col items-center justify-center p-4 bg-black/40 group overflow-hidden">
      {/* Dots */}
      <div className="absolute top-4 left-6 flex gap-2 z-30">
        <div className="size-2 bg-primary neon-glow"></div>
        <div className="size-2 bg-primary/40"></div>
        <div className="size-2 bg-primary/20"></div>
      </div>

      <div className="relative w-full h-full flex items-center justify-center overflow-hidden neon-border">
        <div className="absolute inset-0 bg-primary/5 pointer-events-none"></div>

        {/* Entrance Particle Glitch Effect — only on first mount */}
        {!hasEntered && (
          <>
            {/* Black cover that fades out */}
            <motion.div
              className="absolute inset-0 bg-black z-30"
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            />

            {/* Particle fragments */}
            {entranceParticles.map((p) => (
              <motion.div
                key={`entrance-particle-${p.id}`}
                className="absolute bg-primary pointer-events-none z-30"
                style={{
                  top: p.top,
                  left: p.left,
                  width: p.width,
                  height: p.height,
                  mixBlendMode: "screen",
                }}
                initial={{ opacity: 0, x: p.xShift, scaleX: 1.5 }}
                animate={{
                  opacity: [0, 1, 0.8, 1, 0.6, 0],
                  x: [p.xShift, -p.xShift * 0.5, p.xShift * 0.3, 0],
                  scaleX: [1.5, 0.8, 1.2, 1],
                }}
                transition={{
                  duration: 0.4,
                  delay: p.delay,
                  ease: "linear",
                }}
              />
            ))}

            {/* Scanline wash on entrance */}
            <motion.div
              className="absolute inset-0 pointer-events-none z-30"
              style={{
                background:
                  "repeating-linear-gradient(0deg, transparent, transparent 2px, var(--color-primary) 2px, var(--color-primary) 3px)",
                mixBlendMode: "overlay",
              }}
              initial={{ opacity: 0.8 }}
              animate={{ opacity: [0.8, 0.4, 0.6, 0] }}
              transition={{ duration: 0.7, delay: 0.1, ease: "linear" }}
            />
          </>
        )}

        {images && images.length > 0 ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              className="absolute inset-0 z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: hasEntered ? 0.15 : 0.4,
                delay: hasEntered ? 0 : 0.5,
              }}
            >
              <Image
                src={images[activeIndex]}
                alt="Current Asset"
                fill
                className="object-contain p-2"
                priority
              />

              {/* Staggered Glitch Layers — 4 horizontal stripes (on image change) */}
              {[
                { top: "0%",   height: "25%", delay: 0,    xShift: [-20, 15, -8, 0] },
                { top: "25%",  height: "25%", delay: 0.1,  xShift: [15, -25, 12, 0] },
                { top: "50%",  height: "25%", delay: 0.2,  xShift: [-25, 10, -15, 0] },
                { top: "75%",  height: "25%", delay: 0.3,  xShift: [10, -20, 18, 0] },
              ].map((layer, i) => (
                <motion.div
                  key={`glitch-layer-${i}`}
                  className="absolute left-0 right-0 bg-primary pointer-events-none z-20"
                  style={{
                    top: layer.top,
                    height: layer.height,
                    mixBlendMode: "overlay",
                  }}
                  initial={{ opacity: 0, x: layer.xShift[0] }}
                  animate={{
                    opacity: [0, 0.9, 0.7, 0.85, 0],
                    x: layer.xShift,
                  }}
                  transition={{
                    duration: 0.35,
                    delay: layer.delay,
                    ease: "linear",
                  }}
                />
              ))}

              {/* Secondary scanline glitch flash */}
              <motion.div
                className="absolute inset-0 pointer-events-none z-20"
                style={{
                  background:
                    "repeating-linear-gradient(0deg, transparent, transparent 2px, var(--color-primary) 2px, var(--color-primary) 4px)",
                  mixBlendMode: "overlay",
                }}
                initial={{ opacity: 0.6 }}
                animate={{ opacity: [0.6, 0.3, 0.5, 0] }}
                transition={{ duration: 0.5, ease: "linear" }}
              />
            </motion.div>
          </AnimatePresence>
        ) : (
          <div className="text-primary/50 font-mono tracking-widest">
            NO_DATA_FOUND
          </div>
        )}

        {/* Navigation Arrows */}
        <button
          onClick={() =>
            setActiveIndex((prev) =>
              prev > 0 ? prev - 1 : images.length - 1,
            )
          }
          className="absolute left-4 top-1/2 -translate-y-1/2 size-12 flex items-center justify-center bg-black/60 border border-primary/40 text-primary hover:bg-primary hover:text-white transition-all z-20"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={() =>
            setActiveIndex((prev) =>
              prev < images.length - 1 ? prev + 1 : 0,
            )
          }
          className="absolute right-4 top-1/2 -translate-y-1/2 size-12 flex items-center justify-center bg-black/60 border border-primary/40 text-primary hover:bg-primary hover:text-white transition-all z-20"
        >
          <ChevronRight />
        </button>

        <div className="absolute bottom-4 right-4 bg-black/80 border border-primary/30 px-3 py-1 text-[10px] font-mono text-primary/80 uppercase tracking-tighter z-20 pointer-events-none">
          IMG_REF: CC-019-DELTA
        </div>
      </div>
    </div>
  );
}
