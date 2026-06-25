"use client";

import { useTranslation } from "@/app/hooks/useTranslation";
import { motion } from "framer-motion";

interface ExampleStage {
  stage: string;
  action: string;
}

export function ExplainExampleFlow() {
  const t = useTranslation("explain");
  const stages: ExampleStage[] = t?.exampleFlow?.stages ?? [];

  if (!t?.exampleFlow?.title) {
    return null;
  }

  return (
    <section className="relative w-full py-20 z-10">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col gap-4 mb-12"
      >
        <div className="w-8 h-px bg-primary/40 mb-1" />
        <span className="text-white font-black text-lg md:text-xl tracking-tight uppercase">
          {t?.exampleFlow?.title || "Example Flow"}
        </span>
      </motion.div>

      {/* Task description */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="mb-10 p-5 border border-primary/20 bg-primary/[0.02]"
      >
        <span className="text-[10px] font-black text-primary tracking-[0.25em] uppercase block mb-2">
          {t?.exampleFlow?.taskLabel || "TASK"}
        </span>
        <p className="text-slate-200 text-sm leading-relaxed">
          {t?.exampleFlow?.task || ""}
        </p>
      </motion.div>

      {/* Vertical Timeline */}
      <div className="relative ltr:pl-8 rtl:pr-8">
        {/* Vertical line */}
        <div className="absolute top-0 bottom-0 ltr:left-3 rtl:right-3 w-px bg-primary/20" />

        {stages.map((item, idx) => (
          <motion.div
            key={item.stage}
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              duration: 0.4,
              delay: idx * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative pb-10 last:pb-0"
          >
            {/* Timeline dot */}
            <div className="absolute ltr:-left-[21px] rtl:-right-[21px] top-1 w-3 h-3 rounded-full border-2 border-primary bg-black" />

            {/* Content */}
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-black text-primary tracking-[0.25em] uppercase">
                {item.stage}
              </span>
              <p className="text-slate-400 text-xs leading-relaxed">
                {item.action}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
