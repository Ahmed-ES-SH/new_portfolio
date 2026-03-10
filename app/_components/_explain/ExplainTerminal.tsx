"use client";

import { useTranslation } from "@/app/hooks/useTranslation";
import { motion } from "framer-motion";
import { MonitorPlay, ShieldCheck } from "lucide-react";

export function ExplainTerminal() {
  const explainTrans = useTranslation("explain");
  const terminalTrans = explainTrans.terminal;

  return (
    <section className="container-section grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center z-10 w-full">
      {/* Left Column: Terminal Mockup */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="relative w-full rounded-xl overflow-hidden border border-slate-700/50 bg-[#0d1117] shadow-xl shadow-black/50"
      >
        {/* Terminal Header */}
        <div className="flex items-center gap-2 px-4 py-3 bg-[#161b22] border-b border-slate-700/50">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
          <div className="flex-1 text-center font-mono text-[10px] text-slate-500 tracking-widest">
            root@system:~
          </div>
        </div>
        
        {/* Terminal Body */}
        <div className="p-6 font-mono text-[11px] md:text-xs leading-loose text-slate-300">
          <div className="mb-4">
            <span className="text-green-400">root@system</span>
            <span className="text-primary">:</span>
            <span className="text-blue-400">~/project</span>
            <span className="text-slate-100 ml-2">$</span>
            <span className="ml-2">{"git commit -m 'feat: implement logic'"}</span>
          </div>
          
          <div className="text-slate-500 italic mb-2">
            Initializing Automated Code Review Pipeline...
          </div>
          
          <div className="border-l-2 border-primary/50 pl-4 py-2 my-4 bg-primary/5">
            <div className="text-primary font-bold">▶ Running CodeRabbit Analysis [OK]</div>
            <div className="text-slate-400 mt-2">
              <span className="text-yellow-400 font-bold">SUGGESTION:</span> Consider using a switch-case for better readability in line 42.
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-6">
            <span className="bg-green-500/10 text-green-400 px-2 py-0.5 border border-green-500/20 rounded-sm">LINT PASS</span>
            <span className="bg-blue-500/10 text-blue-400 px-2 py-0.5 border border-blue-500/20 rounded-sm">TYPES VALIDATED</span>
            <span className="bg-red-500/10 text-red-400 px-2 py-0.5 border border-red-500/20 rounded-sm">SECURITY AUDIT</span>
          </div>
          
          <div className="mt-4 flex items-center">
            <span className="text-green-400">root@system</span>
            <span className="text-slate-100 ml-2">$</span>
            <span className="ml-2 animate-pulse w-2 h-4 bg-slate-300 inline-block align-middle"></span>
          </div>
        </div>
      </motion.div>

      {/* Right Column: Content */}
      <motion.div 
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="flex flex-col gap-8"
      >
        <div className="flex flex-col gap-4">
          <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest flex items-center gap-4">
            <span className="text-primary neon-text">{terminalTrans?.sectionNum || "02"} {"//"}</span> 
            {terminalTrans?.sectionTitle || "TERMINAL-DRIVEN DEVELOPMENT"}
          </h2>
          <p className="text-slate-400 text-sm md:text-base font-medium leading-relaxed">
            {terminalTrans?.cli?.desc || "Run and manage the development cycle using AI tools dedicated to the CLI and work within the terminal..."}
          </p>
        </div>

        {/* Pipeline details */}
        <div className="bg-linear-to-r from-primary/10 to-transparent p-6 border-l-4 border-primary mt-4">
          <h3 className="text-lg font-black text-white italic tracking-widest uppercase mb-3 drop-shadow-md">
            {terminalTrans?.pipeline?.title || "CODE FLOW PIPELINE"}
          </h3>
          <p className="text-slate-300 text-sm md:text-sm font-medium leading-relaxed mb-6">
            {terminalTrans?.pipeline?.desc || "Continuous delivery of high-quality code through automated review hooks..."}
          </p>
          
          <ul className="flex flex-col gap-3">
            <li className="flex gap-3 items-center text-sm text-slate-200">
              <MonitorPlay className="w-4 h-4 text-primary" />
              <span className="tracking-wide">
                {terminalTrans?.pipeline?.points?.[0] || "Terminal-Driven AI Development"}
              </span>
            </li>
            <li className="flex gap-3 items-center text-sm text-slate-200">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <span className="tracking-wide">
                {terminalTrans?.pipeline?.points?.[1] || "Automated Code Review (Rabbit Engine)"}
              </span>
            </li>
          </ul>
        </div>
      </motion.div>
    </section>
  );
}
