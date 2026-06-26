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
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    STAGES.forEach((_, idx) => {
      const el = document.querySelector(`[data-stage="${idx}"]`);
      if (!el) return;

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

  const scrollTo = (idx: number) => {
    document
      .querySelector(`[data-stage="${idx}"]`)
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed ltr:right-6 rtl:left-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-start gap-2 rounded-2xl border border-primary/10 bg-slate-900/70 backdrop-blur-xl px-4 py-5 shadow-2xl shadow-primary/5"
    >
      <span className="text-[8px] font-black text-primary/40 tracking-[0.3em] uppercase mb-1 self-center">
        Stages
      </span>
      {STAGES.map((stage, idx) => (
        <button
          key={stage.number}
          onClick={() => scrollTo(idx)}
          className="relative flex items-center gap-3 group w-full text-left"
        >
          <div
            className={`w-2 h-2 rounded-full border transition-all duration-300 shrink-0 ${
              idx === activeIndex
                ? "bg-primary border-primary shadow-[0_0_6px_#00f0ff] scale-125"
                : "bg-transparent border-primary/30 group-hover:border-primary/60"
            }`}
          />
          <span
            className={`text-[10px] font-bold uppercase tracking-wider transition-all duration-300 whitespace-nowrap ${
              idx === activeIndex
                ? "text-primary"
                : "text-slate-400 group-hover:text-slate-200"
            }`}
          >
            {stage.label}
          </span>
        </button>
      ))}
    </motion.nav>
  );
}
