"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const STAGES = [
  { number: "01", label: "Planning" },
  { number: "02", label: "Context Prep" },
  { number: "03", label: "Execution" },
  { number: "04", label: "Verification" },
  { number: "05", label: "Review" },
];

export function ExplainStageNav() {
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const elements: Element[] = [];

    STAGES.forEach((_, idx) => {
      const el = document.querySelector(`[data-stage="${idx}"]`);
      if (!el) return;
      elements.push(el);

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              setActiveIndex(idx);
            }
          }
        },
        { rootMargin: "-40% 0px -40% 0px" },
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((o) => o.disconnect());
    };
  }, []);

  if (activeIndex === -1) return null;

  return (
    <motion.nav
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed ltr:right-6 rtl:left-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-3"
    >
      <span className="text-[8px] font-black text-primary/30 tracking-[0.3em] uppercase mb-1">
        Stages
      </span>
      {STAGES.map((stage, idx) => (
        <button
          key={stage.number}
          onClick={() => {
            document
              .querySelector(`[data-stage="${idx}"]`)
              ?.scrollIntoView({ behavior: "smooth" });
          }}
          className="relative flex items-center gap-3 group"
        >
          <div
            className={`w-2 h-2 rounded-full border transition-all duration-300 ${
              idx === activeIndex
                ? "bg-primary border-primary shadow-[0_0_6px_#00f0ff] scale-125"
                : "bg-transparent border-primary/30 group-hover:border-primary/60"
            }`}
          />
          <span
            className={`text-[9px] font-black uppercase tracking-wider transition-all duration-300 absolute ltr:left-4 rtl:right-4 whitespace-nowrap ${
              idx === activeIndex
                ? "opacity-100 text-primary translate-x-0"
                : "opacity-0 text-slate-500 -translate-x-1 pointer-events-none"
            }`}
          >
            {stage.label}
          </span>
        </button>
      ))}
    </motion.nav>
  );
}
