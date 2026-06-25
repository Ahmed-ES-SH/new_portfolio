"use client";

import { useTranslation } from "@/app/hooks/useTranslation";
import { motion } from "framer-motion";

interface HumanVsAIRow {
  phase: string;
  human: string;
  ai: string;
}

export function ExplainHumanVsAI() {
  const t = useTranslation("explain");
  const rows: HumanVsAIRow[] = t?.humanVsAI?.rows ?? [];

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
        <div className="flex items-center gap-3">
          <span className="w-1 h-6 bg-primary shadow-[0_0_8px_#00f0ff]" />
          <span className="text-white font-black text-lg md:text-xl tracking-tight uppercase">
            {t?.humanVsAI?.title || "Human vs AI Responsibility"}
          </span>
        </div>
      </motion.div>

      {/* Comparison Table */}
      <div className="w-full overflow-x-auto">
        <motion.table
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full border-collapse"
        >
          {/* Header Row */}
          <thead>
            <tr className="border-b border-primary/20">
              <th className="text-left py-4 px-4 text-[10px] font-black text-slate-500 tracking-[0.25em] uppercase w-[15%]">
                {t?.humanVsAI?.phaseLabel || "PHASE"}
              </th>
              <th className="text-left py-4 px-4 text-[10px] font-black text-primary tracking-[0.25em] uppercase w-[42.5%] bg-primary/5">
                {t?.humanVsAI?.humanTitle || "MY RESPONSIBILITY"}
              </th>
              <th className="text-left py-4 px-4 text-[10px] font-black text-slate-400 tracking-[0.25em] uppercase w-[42.5%] bg-[#050a0f]">
                {t?.humanVsAI?.aiTitle || "AI'S ROLE"}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <motion.tr
                key={row.phase}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.4,
                  delay: idx * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="border-b border-slate-800/50 group hover:bg-white/[0.02] transition-colors"
              >
                {/* Phase label */}
                <td className="py-4 px-4">
                  <span className="text-xs font-bold text-white tracking-wider uppercase">
                    {row.phase}
                  </span>
                </td>

                {/* Human side — cyan tint */}
                <td className="py-4 px-4 bg-primary/[0.02] group-hover:bg-primary/[0.04] transition-colors">
                  <p className="text-xs text-slate-200 leading-relaxed">
                    {row.human}
                  </p>
                </td>

                {/* AI side — neutral tint */}
                <td className="py-4 px-4 bg-[#050a0f] group-hover:bg-white/[0.02] transition-colors">
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {row.ai}
                  </p>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </motion.table>
      </div>
    </section>
  );
}
