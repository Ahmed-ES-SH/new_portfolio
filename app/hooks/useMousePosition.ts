"use client";

import { useState, useEffect } from "react";

interface MousePosition {
  x: number | null;
  y: number | null;
  isHovering: boolean;
}

export function useMousePosition(): MousePosition {
  const [position, setPosition] = useState<MousePosition>({
    x: null,
    y: null,
    isHovering: false,
  });

  useEffect(() => {
    // Optimization: Use requestAnimationFrame to throttle state updates
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      animationFrameId = requestAnimationFrame(() => {
        setPosition((prev) => ({
          ...prev,
          x: e.clientX,
          y: e.clientY,
        }));
      });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable =
        window.getComputedStyle(target).cursor === "pointer" ||
        target.closest("a, button, input, textarea, select, [role='button']") !== null;

      setPosition((prev) => ({ ...prev, isHovering: isClickable }));
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return position;
}
