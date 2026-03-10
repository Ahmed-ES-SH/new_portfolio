"use client";

import { useTranslation } from "@/app/hooks/useTranslation";
import { motion } from "framer-motion";
import { User, Brain } from "lucide-react";

export function ExplainHuman() {
  const explainTrans = useTranslation("explain");
  const humanTrans = explainTrans.human;

  return (
    <section className="container-section grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center z-10 w-full">
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
            <span className="text-primary neon-text">
              {humanTrans?.sectionNum || "03"} {"//"}
            </span>
            {humanTrans?.sectionTitle || "HUMAN OVERSIGHT & IDENTITY"}
          </h2>
          <p className="text-slate-400 text-sm md:text-base font-medium max-w-lg leading-relaxed">
            {humanTrans?.sectionSubtitle ||
              "Emphasizes human judgment, domain expertise, and absolute ownership over the final output."}
          </p>
        </div>

        {/* Human Validation Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-4 p-6 border border-primary/30 ltr:border-l-4 rtl:border-r-4 ltr:border-l-primary rtl:border-r-primary bg-primary/5"
        >
          <div className="flex items-center gap-3">
            <User className="w-5 h-5 text-primary" />
            <h3 className="text-white font-bold text-sm tracking-widest uppercase">
              {humanTrans?.validation?.title ||
                "Human Validation & Problem Solving"}
            </h3>
          </div>
          <blockquote className="text-slate-300 text-sm italic leading-relaxed border-l-0 pl-0">
            {humanTrans?.validation?.quote ||
              "\"Reviewing logic isn't just about catching bugs; it's about ensuring the architectural vision remains cohesive...\""}
          </blockquote>
          <p className="text-slate-400 text-xs leading-relaxed">
            {humanTrans?.validation?.desc ||
              "Manually reviewing results, understanding code logic, addressing complex issues the AI agent might encounter..."}
          </p>
        </motion.div>

        {/* Who I Am Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col gap-4 p-6 border border-slate-700/50 bg-[#0d1117]"
        >
          <div className="flex items-center gap-3">
            <Brain className="w-5 h-5 text-primary" />
            <h3 className="text-white font-bold text-sm tracking-widest uppercase">
              {humanTrans?.whoiam?.title ||
                "Who I Am (Developer Behind the Workflow)"}
            </h3>
          </div>
          <p className="text-slate-400 text-xs leading-relaxed">
            {humanTrans?.whoiam?.desc ||
              "These tools are not a replacement for my programming skills, but rather a means to increase productivity..."}
          </p>
        </motion.div>
      </motion.div>

      {/* Right Column: Placeholder */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="relative w-full max-md:hidden min-h-[500px] bg-[#050a0f] border border-primary/20 overflow-hidden flex items-center justify-center"
      >
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0,242,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,242,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />

        {/* Corner decorators */}
        <div className="absolute top-3 ltr:left-3 rtl:right-3 w-4 h-4 border-t-2 ltr:border-l-2 rtl:border-r-2 border-primary" />
        <div className="absolute top-3 ltr:right-3 rtl:left-3 w-4 h-4 border-t-2 ltr:border-r-2 rtl:border-l-2 border-primary" />
        <div className="absolute bottom-3 ltr:left-3 rtl:right-3 w-4 h-4 border-b-2 ltr:border-l-2 rtl:border-r-2 border-primary" />
        <div className="absolute bottom-3 ltr:right-3 rtl:left-3 w-4 h-4 border-b-2 ltr:border-r-2 rtl:border-l-2 border-primary" />

        {/* Human silhouette placeholder */}
        <div className="relative flex flex-col items-center gap-6 opacity-40">
          <div className="w-24 h-24 rounded-full border-2 border-primary bg-primary/10 flex items-center justify-center">
            <User className="w-12 h-12 text-primary" />
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-48 h-2 bg-primary/30 rounded" />
            <div className="w-36 h-2 bg-primary/20 rounded" />
            <div className="w-24 h-2 bg-primary/10 rounded" />
          </div>
        </div>

        {/* Label */}
        <div className="absolute bottom-6 ltr:left-6 rtl:right-6 text-[9px] font-black text-primary/50 tracking-[0.3em] uppercase">
          DEVELOPER_PROFILE.JPG
        </div>
      </motion.div>
    </section>
  );
}
