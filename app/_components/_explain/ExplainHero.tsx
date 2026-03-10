"use client";

import { useTranslation } from "@/app/hooks/useTranslation";
import { motion } from "framer-motion";

export function ExplainHero() {
  const explainTrans = useTranslation("explain");

  return (
    <section className="relative w-full pt-32 pb-16 flex flex-col z-10">
      {/* Cyan line accent on the left/right depending on locale */}
      <div className="absolute top-32 ltr:left-0 rtl:right-0 w-1 h-24 bg-primary shadow-[0_0_15px_#00f2ff]"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container-section flex flex-col gap-4"
      >
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white uppercase tracking-tighter italic">
          {explainTrans.hero?.title || "AUTOMATED ENGINEERING"}{" "}
          <span className="text-primary neon-text">
            {explainTrans.hero?.version || "V2.4"}
          </span>
        </h1>

        <p className="max-w-3xl text-slate-300 text-sm md:text-base font-mono leading-relaxed opacity-80 mt-2">
          {explainTrans.hero?.subtitle ||
            "Spec-driven execution & automated development pipelines. Bridging the gap between high-level rationale and binary precision."}
        </p>
      </motion.div>
    </section>
  );
}
