"use client";

import { useTranslation } from "@/app/hooks/useTranslation";
import { motion } from "framer-motion";

export function ExplainWorkflowHero() {
  const t = useTranslation("explain");

  const trustSignals: string[] = t?.hero?.trustSignals ?? [];

  return (
    <section className="relative w-full pt-32 pb-16 flex flex-col z-10">
      {/* Cyan accent line */}
      <div className="absolute top-32 ltr:left-0 rtl:right-0 w-1 h-24 bg-primary shadow-[0_0_15px_#00f2ff]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col gap-6"
      >
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white uppercase tracking-tighter">
          {t?.hero?.headline || "AI-Assisted Development Workflow"}
        </h1>

        <p className="max-w-3xl text-slate-300 text-sm md:text-base leading-relaxed opacity-80">
          {t?.hero?.subHeadline ||
            "A structured 5-stage development cycle where AI accelerates execution while I retain full control over architecture, decisions, and quality."}
        </p>

        {/* Trust Signal Badges */}
        {trustSignals.length > 0 && (
          <div className="flex flex-wrap gap-3 mt-4">
            {trustSignals.map((signal, idx) => (
              <motion.span
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.3 + idx * 0.1 }}
                className="inline-flex items-center gap-2 px-4 py-2 text-[10px] font-black tracking-[0.2em] uppercase border border-primary/30 bg-primary/5 text-primary"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_6px_#00f0ff]" />
                {signal}
              </motion.span>
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
}
