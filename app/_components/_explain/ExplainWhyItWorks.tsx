"use client";

import { useTranslation } from "@/app/hooks/useTranslation";
import { motion } from "framer-motion";
import { Zap, Shield, GitBranch, Brain, EyeOff, type LucideIcon } from "lucide-react";

interface WhyItWorksCard {
  icon: string;
  title: string;
  desc: string;
}

const iconLookup: Record<string, LucideIcon> = {
  Zap, Shield, GitBranch, Brain, EyeOff,
};

export function ExplainWhyItWorks() {
  const t = useTranslation("explain");
  const cards: WhyItWorksCard[] = t?.whyItWorks?.cards ?? [];

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
        <div className="flex items-start gap-4">
          <div className="w-1 h-full min-h-8 bg-primary/60 mt-1 shrink-0" />
          <div className="flex flex-col gap-1">
            <span className="text-[10px] text-primary/40 font-black tracking-[0.3em] uppercase">
              WHY IT WORKS
            </span>
            <span className="text-white font-black text-lg md:text-xl tracking-tight uppercase">
              {t?.whyItWorks?.title || "Why This Workflow Works"}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {cards.map((card, idx) => {
          const IconComponent = iconLookup[card.icon] || Zap;

          const cardContent = (() => {
            switch (card.icon) {
              case "Zap":
                return (
                  <>
                    <div className="flex items-center gap-4">
                      <span className="text-5xl md:text-6xl font-black text-primary leading-none tracking-tighter">
                        10x
                      </span>
                      <span className="text-[10px] font-black text-primary/60 tracking-[0.25em] uppercase">
                        Speed Multiplier
                      </span>
                    </div>
                    <h3 className="text-white font-black text-base tracking-tight uppercase">
                      {card.title}
                    </h3>
                    <p className="text-slate-400 text-xs leading-relaxed">
                      {card.desc}
                    </p>
                  </>
                );
              case "Shield":
                return (
                  <>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-primary text-lg">✓</span>
                      <h3 className="text-white font-black text-sm tracking-tight uppercase">
                        {card.title}
                      </h3>
                    </div>
                    <p className="text-slate-400 text-xs leading-relaxed">
                      {card.desc}
                    </p>
                  </>
                );
              case "Brain":
                return (
                  <>
                    <span className="text-5xl font-black text-primary/20 leading-none select-none">
                      &ldquo;
                    </span>
                    <p className="text-slate-200 text-sm leading-relaxed italic -mt-3">
                      {card.desc}
                    </p>
                    <div className="flex items-center gap-2 mt-auto">
                      <span className="w-2 h-2 bg-primary shadow-[0_0_6px_#00f0ff]" />
                      <span className="text-[10px] font-black text-primary/60 tracking-[0.25em] uppercase">
                        {card.title}
                      </span>
                    </div>
                  </>
                );
              case "GitBranch":
                return (
                  <div className="flex flex-col gap-0">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-px bg-primary/30" />
                      <span className="text-[10px] font-black text-primary/60 tracking-[0.2em] uppercase">
                        Iterative
                      </span>
                      <div className="flex-1 h-px bg-primary/30" />
                    </div>
                    <h3 className="text-white font-black text-sm tracking-tight uppercase mb-2">
                      {card.title}
                    </h3>
                    <p className="text-slate-400 text-xs leading-relaxed">
                      {card.desc}
                    </p>
                    <div className="flex items-center gap-1 mt-4">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <div
                          key={n}
                          className="flex-1 h-1 bg-primary/20"
                        >
                          <div
                            className={`h-full bg-primary/60 transition-all duration-500 ${n <= 3 ? "w-full" : "w-0"}`}
                          />
                        </div>
                      ))}
                    </div>
                    <span className="text-[8px] font-black text-primary/30 tracking-[0.2em] uppercase mt-1">
                      Context compounds with each cycle
                    </span>
                  </div>
                );
              case "EyeOff":
                return (
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                      <IconComponent className="w-4 h-4 text-slate-400" />
                      <span className="text-[10px] font-black text-slate-400 tracking-[0.25em] uppercase">
                        Non-Negotiable
                      </span>
                    </div>
                    <h3 className="text-white font-black text-sm tracking-tight uppercase">
                      {card.title}
                    </h3>
                    <p className="text-slate-400 text-xs leading-relaxed">
                      {card.desc}
                    </p>
                    <span className="text-[9px] font-black text-primary/50 tracking-[0.2em] uppercase inline-flex items-center gap-1.5 mt-auto">
                      <span className="w-1 h-1 bg-primary shadow-[0_0_4px_#00f0ff]" />
                      Ahmed Ismail — Author
                    </span>
                  </div>
                );
              default:
                return (
                  <>
                    <div className="w-10 h-10 flex items-center justify-center border border-primary/20 bg-primary/5 group-hover:bg-primary/10 transition-colors">
                      <IconComponent className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-white font-bold text-sm tracking-wider uppercase">
                      {card.title}
                    </h3>
                    <p className="text-slate-400 text-xs leading-relaxed">
                      {card.desc}
                    </p>
                  </>
                );
            }
          })();

          const cardStyle = (() => {
            switch (card.icon) {
              case "Zap":
                return "md:col-span-2 bg-black border border-primary/20 p-6 md:p-8";
              case "Shield":
                return "bg-black border border-primary/20 p-5";
              case "Brain":
                return "row-span-2 bg-black border border-primary/20 p-6 flex flex-col";
              case "GitBranch":
                return "md:col-span-2 bg-black border border-primary/10 p-6";
              case "EyeOff":
                return "bg-[#050a0f] border border-[#1a3a4a] p-5 flex flex-col";
              default:
                return "bg-black border border-primary/10 p-5";
            }
          })();

          return (
            <motion.div
              key={card.icon}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.5,
                delay: idx * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`${cardStyle} group hover:border-primary/30 transition-colors duration-300`}
            >
              {cardContent}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
