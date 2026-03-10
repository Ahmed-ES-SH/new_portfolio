"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useMousePosition } from "@/app/hooks/useMousePosition";

export function CustomCursor() {
  const { x, y, isHovering } = useMousePosition();
  const [isVisible, setIsVisible] = useState(false);

  // Smooth visibility toggle
  useEffect(() => {
    if (x !== null && y !== null && !isVisible) {
      setIsVisible(true);
    }
  }, [x, y, isVisible]);

  if (!isVisible || x === null || y === null) return null;

  return (
    <>
      {/* The main solid dot */}
      <motion.div
        className="hidden md:block fixed top-0 left-0 w-2 h-2 rounded-full bg-primary pointer-events-none z-9999 mix-blend-exclusion"
        animate={{
          x: x - 4, // center the dot (w-2 is 8px, half is 4px)
          y: y - 4,
          scale: isHovering ? 0 : 1, // Shrink to nothing if hovering
        }}
        transition={{
          type: "tween",
          ease: "backOut",
          duration: 0.1,
        }}
      />

      {/* The trailing neon ring */}
      <motion.div
        className="hidden md:block fixed top-0 left-0 w-10 h-10 shadow-[0_0_15px_rgba(0,240,255,0.4)] border border-[var(--color-accent-blue)] rounded-full pointer-events-none z-[9998]"
        animate={{
          x: x - 20, // center the outer ring (w-10 is 40px, half is 20px)
          y: y - 20,
          scale: isHovering ? 1.5 : 1, // Expand when hovering
          backgroundColor: isHovering
            ? "rgba(0, 240, 255, 0.1)" // Slight fill when active
            : "rgba(255, 255, 255, 0)",
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
          mass: 0.5,
        }}
      />
    </>
  );
}
