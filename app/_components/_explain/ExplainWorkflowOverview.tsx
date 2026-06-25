"use client";

import { useTranslation } from "@/app/hooks/useTranslation";
import { motion } from "framer-motion";

export function ExplainWorkflowOverview() {
  const t = useTranslation("explain");
  const steps: Array<{ number: string; label: string; summary: string }> =
    t?.overview?.steps ?? [];

  return (
    <section className="relative w-full py-20 z-10">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col gap-6 mb-16"
      >
        <div className="flex items-center gap-3">
          <span className="text-primary/30 font-mono text-xs ltr:block rtl:hidden">╭──</span>
          <span className="text-primary/30 font-mono text-xs ltr:hidden rtl:block">──╮</span>
          <span className="text-[10px] text-primary font-black tracking-[0.4em] uppercase border border-primary/30 bg-primary/5 px-3 py-1">
            {t?.overview?.title || "THE WORKFLOW"}
          </span>
          <span className="text-primary/30 font-mono text-xs ltr:block rtl:hidden">──╯</span>
          <span className="text-primary/30 font-mono text-xs ltr:hidden rtl:block">╰──</span>
        </div>
        <p className="text-slate-400 text-sm md:text-base max-w-2xl leading-relaxed">
          {t?.overview?.subtitle ||
            "Five distinct stages that transform a requirement into production-quality code."}
        </p>
      </motion.div>

      {/* Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-4">
        {steps.map((step, idx) => {
          return (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.5,
                delay: idx * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative flex flex-col items-center text-center group"
            >
              {/* Connector line (between cards on desktop) */}
              {idx < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 ltr:left-[calc(50%+28px)] rtl:right-[calc(50%+28px)] w-[calc(100%-56px)] h-px bg-primary/20">
                  <div className="absolute ltr:right-0 rtl:left-0 top-1/2 -translate-y-1/2 w-2 h-2 border-t border-r border-primary/40 ltr:rotate-45 rtl:-rotate-135" />
                </div>
              )}

              {/* Number Circle */}
              <div className="w-14 h-14 rounded-full border-2 border-primary/40 bg-black flex items-center justify-center mb-4 group-hover:border-primary group-hover:shadow-[0_0_12px_rgba(0,240,255,0.3)] transition-all duration-300">
                <span className="text-primary font-black text-sm">
                  {step.number}
                </span>
              </div>

              {/* Label */}
              <h3 className="text-white font-bold text-xs tracking-[0.15em] uppercase mb-2">
                {step.label}
              </h3>

              {/* Summary */}
              <p className="text-slate-500 text-[11px] leading-relaxed max-w-[220px]">
                {step.summary}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
