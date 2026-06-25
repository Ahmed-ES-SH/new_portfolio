"use client";

import { useTranslation } from "@/app/hooks/useTranslation";
import { motion } from "framer-motion";
import { StageData } from "@/constants/workflowStages";

interface ExplainStageDetailProps {
  stage: StageData;
  index: number;
}

export function ExplainStageDetail({ stage, index }: ExplainStageDetailProps) {
  const t = useTranslation("explain");
  const s = t?.stages?.[stage.slug];
  const l = t?.labels;

  const isEven = index % 2 === 1;

  if (!s) {
    return null;
  }

  return (
    <motion.section
      id={`stage-${stage.slug}`}
      data-stage={index}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`relative w-full py-12 ${isEven ? "md:ml-8 md:mr-0 rtl:md:mr-8 rtl:md:ml-0" : "md:ml-0 md:mr-8 rtl:md:ml-8 rtl:md:mr-0"}`}
    >
      {/* Card */}
      <div className="relative bg-black border border-primary/10 p-8 md:p-10 overflow-hidden">
        {/* Large background stage number */}
        <div className={`absolute -top-6 ltr:right-4 rtl:left-4 font-black text-primary/5 select-none pointer-events-none leading-none ${isEven ? "text-[8rem] md:text-[12rem]" : "text-[10rem] md:text-[14rem]"}`}>
          {stage.number}
        </div>

        <div className="relative z-10 flex flex-col gap-8">
          {/* Header */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className={`w-1 h-4 ${isEven ? "bg-primary/40" : "bg-slate-600"}`} />
              <span className="text-[10px] font-black text-primary/50 tracking-[0.3em] uppercase">
                {l?.stage || "STAGE"}_{stage.number}
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter">
              {s.title || stage.slug}
            </h2>
          </div>

          {/* Purpose */}
          <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-3xl">
            {s.purpose}
          </p>

          {/* My Role / AI Role Split */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {isEven ? (
              <>
                {/* AI Role first on even sections */}
                <div className="border border-slate-700/50 bg-[#050a0f] p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-2 h-2 bg-slate-400" />
                    <span className="text-[10px] font-black text-slate-400 tracking-[0.25em] uppercase">
                      {l?.aiRole || "AI ROLE"}
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
                    {s.aiRole}
                  </p>
                </div>
                {/* Human Role second */}
                <div className="border border-primary/20 bg-primary/5 p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-2 h-2 bg-primary shadow-[0_0_6px_#00f0ff]" />
                    <span className="text-[10px] font-black text-primary tracking-[0.25em] uppercase">
                      {l?.myRole || "MY ROLE"}
                    </span>
                  </div>
                  <p className="text-slate-300 text-xs md:text-sm leading-relaxed">
                    {s.humanRole}
                  </p>
                </div>
              </>
            ) : (
              <>
                {/* Human Role first on odd sections (default) */}
                <div className="border border-primary/20 bg-primary/5 p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-2 h-2 bg-primary shadow-[0_0_6px_#00f0ff]" />
                    <span className="text-[10px] font-black text-primary tracking-[0.25em] uppercase">
                      {l?.myRole || "MY ROLE"}
                    </span>
                  </div>
                  <p className="text-slate-300 text-xs md:text-sm leading-relaxed">
                    {s.humanRole}
                  </p>
                </div>
                {/* AI Role second */}
                <div className="border border-slate-700/50 bg-[#050a0f] p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-2 h-2 bg-slate-400" />
                    <span className="text-[10px] font-black text-slate-400 tracking-[0.25em] uppercase">
                      {l?.aiRole || "AI ROLE"}
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
                    {s.aiRole}
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Compact Lists Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Inputs */}
            <div>
              <span className="text-[9px] font-black text-slate-500 tracking-[0.2em] uppercase block mb-2">
                {l?.inputs || "INPUTS"}
              </span>
              <ul className="flex flex-col gap-1.5">
                {(s.inputs ?? []).map((item: string, i: number) => (
                  <li
                    key={i}
                    className="text-[11px] text-slate-400 flex items-start gap-1.5"
                  >
                    <span className="text-primary/60 mt-0.5 shrink-0">▸</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Outputs */}
            <div>
              <span className="text-[9px] font-black text-slate-500 tracking-[0.2em] uppercase block mb-2">
                {l?.outputs || "OUTPUTS"}
              </span>
              <ul className="flex flex-col gap-1.5">
                {(s.outputs ?? []).map((item: string, i: number) => (
                  <li
                    key={i}
                    className="text-[11px] text-slate-400 flex items-start gap-1.5"
                  >
                    <span className="text-primary/60 mt-0.5 shrink-0">▸</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Decisions */}
            <div>
              <span className="text-[9px] font-black text-slate-500 tracking-[0.2em] uppercase block mb-2">
                {l?.decisions || "DECISIONS"}
              </span>
              <ul className="flex flex-col gap-1.5">
                {(s.decisions ?? []).map((item: string, i: number) => (
                  <li
                    key={i}
                    className="text-[11px] text-slate-400 flex items-start gap-1.5"
                  >
                    <span className="text-primary/60 mt-0.5 shrink-0">▸</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Prevents */}
            <div>
              <span className="text-[9px] font-black text-slate-500 tracking-[0.2em] uppercase block mb-2">
                {l?.prevents || "PREVENTS"}
              </span>
              <ul className="flex flex-col gap-1.5">
                {(s.prevents ?? []).map((item: string, i: number) => (
                  <li
                    key={i}
                    className="text-[11px] text-slate-400 flex items-start gap-1.5"
                  >
                    <span className="text-primary/60 mt-0.5 shrink-0">▸</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Why It Matters Callout */}
          <div className={`${isEven ? "border-l-2" : "border-t"} border-primary/30 bg-primary/[0.03] p-5`}>
            <span className="text-[10px] font-black text-primary tracking-[0.25em] uppercase block mb-2">
              {l?.whyMatters || "WHY IT MATTERS"}
            </span>
            <p className="text-slate-300 text-xs md:text-sm leading-relaxed italic">
              {s.whyMatters}
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
