"use client";

import { useTranslation } from "@/app/hooks/useTranslation";
import { motion } from "framer-motion";
import { CheckSquare, GitBranch, Terminal } from "lucide-react";

export function ExplainRationale() {
  const explainTrans = useTranslation("explain");
  const rationaleTrans = explainTrans.rationale;

  const cards = [
    {
      icon: <CheckSquare className="w-5 h-5 text-primary" />,
      title: rationaleTrans?.items?.planning?.title,
      description: rationaleTrans?.items?.planning?.desc,
    },
    {
      icon: <GitBranch className="w-5 h-5 text-primary" />,
      title: rationaleTrans?.items?.execution?.title,
      description: rationaleTrans?.items?.execution?.desc,
    },
    {
      icon: <Terminal className="w-5 h-5 text-primary" />,
      title: rationaleTrans?.items?.agentSetup?.title,
      description: rationaleTrans?.items?.agentSetup?.desc,
    },
  ];

  return (
    <section className="container-section grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-stretch z-10 w-full">
      {/* Left Column: Content */}
      <motion.div 
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="flex flex-col gap-8"
      >
        {/* Section Header */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest flex items-center gap-4">
            <span className="text-primary neon-text">{rationaleTrans?.sectionNum || "01"} {"//"}</span> 
            {rationaleTrans?.sectionTitle || "RATIONALE & PLANNING"}
          </h2>
          <p className="text-slate-400 text-sm md:text-base font-medium max-w-lg leading-relaxed">
            {rationaleTrans?.sectionSubtitle || "Groups the preparatory work that defines scope, success criteria, and the agent's role."}
          </p>
        </div>

        {/* Action Cards */}
        <div className="flex flex-col gap-4">
          {cards.map((card, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group p-5 bg-primary/5 border border-primary/20 hover:border-primary/50 ltr:border-l-2 rtl:border-r-2 ltr:hover:border-l-primary rtl:hover:border-r-primary transition-all duration-300"
            >
              <div className="flex gap-4 items-start">
                <div className="mt-1 opacity-80 group-hover:opacity-100 transition-opacity">
                  {card.icon}
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-white font-bold text-sm tracking-wide uppercase">
                    {card.title || "TITLE"}
                  </h3>
                  <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
                    {card.description || "Description"}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Right Column: Blueprint Graphic */}
      <motion.div 
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="relative w-full min-h-[400px] h-full bg-[#03060a] border border-primary/20 p-6 flex flex-col gap-8"
      >
        {/* Mock Top bar */}
        <div className="flex justify-between items-center border-b border-primary/20 pb-4">
          <div className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">
            BLUEPRINT VIEW
          </div>
          <div className="flex gap-1.5">
            <div className="w-2 h-2 rounded-full bg-red-500/80"></div>
            <div className="w-2 h-2 rounded-full bg-yellow-500/80"></div>
            <div className="w-2 h-2 rounded-full bg-green-500/80"></div>
          </div>
        </div>

        {/* Mock Content */}
        <div className="flex flex-col gap-2">
          <div className="h-2 w-1/3 bg-primary/20"></div>
          <div className="h-2 w-1/2 bg-primary/10"></div>
        </div>

        {/* Flowchart Mock */}
        <div className="flex items-center justify-between gap-2 mt-4">
          <div className="flex-1 h-16 border border-primary/30 bg-primary/5 flex items-center justify-center">
            <CheckSquare className="w-4 h-4 text-primary/60" />
          </div>
          <div className="w-8 h-px bg-primary/50 relative">
            <div className="absolute ltr:right-0 rtl:left-0 top-1/2 -translate-y-1/2 w-2 h-2 border-t border-r border-primary/50 ltr:rotate-45 rtl:-rotate-135"></div>
          </div>
          <div className="flex-1 h-16 border border-primary text-primary bg-primary/10 flex items-center justify-center shadow-[0_0_15px_rgba(0,242,255,0.15)]">
            <GitBranch className="w-5 h-5" />
          </div>
          <div className="w-8 h-px bg-primary/50 relative">
            <div className="absolute ltr:right-0 rtl:left-0 top-1/2 -translate-y-1/2 w-2 h-2 border-t border-r border-primary/50 ltr:rotate-45 rtl:-rotate-135"></div>
          </div>
          <div className="flex-1 h-16 border border-primary/30 bg-primary/5 flex items-center justify-center">
            <Terminal className="w-4 h-4 text-primary/60" />
          </div>
        </div>

        {/* Target Box Mock */}
        <div className="mt-auto border border-primary p-4 bg-primary/10">
          <div className="flex justify-between items-center border-b border-primary/30 pb-2 mb-2">
            <span className="text-[10px] font-bold text-primary tracking-widest uppercase">AGENT_ARCHITECT_01</span>
            <span className="text-[9px] text-primary/60 bg-primary/10 px-2 py-0.5">ACTIVE</span>
          </div>
          <div className="flex gap-4">
            <div className="text-[9px] text-slate-400"><span className="text-primary">▸</span> Parse</div>
            <div className="text-[9px] text-slate-400"><span className="text-primary">▸</span> Analyze</div>
            <div className="text-[9px] text-slate-400"><span className="text-primary">▸</span> Execute Code</div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
