import React from "react";

interface SkillsHeroSectionProps {
  t: {
    title: string;
    description: string;
  };
}

export default function SkillsHeroSection({ t }: SkillsHeroSectionProps) {
  return (
    <div className="relative z-10 container-section flex flex-col">
      {/* Header Badges */}
      <div className="inline-flex items-center gap-3 border border-(--primary,#00f0ff)/50 bg-(--primary,#00f0ff)/5 px-4 py-1.5 mb-8 self-start">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-(--primary,#00f0ff) opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-(--primary,#00f0ff)"></span>
        </span>
        <span className="text-(--primary,#00f0ff) text-xs font-black tracking-[0.3em] uppercase">
          [SYSTEM_SKILLS_V2.0]
        </span>
      </div>

      {/* Title */}
      <div className="space-y-2 mb-6 max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-black text-slate-100 uppercase italic ibm-plex-mono-bold-italic">
          {t?.title?.split(" ")[0]} <br />
          <span className="text-(--primary,#00f0ff) neon-text">
            {t?.title?.split(" ").slice(1).join(" ")}
          </span>
        </h1>
      </div>

      {/* Description */}
      <div className="max-w-xl ltr:border-l-2 rtl:border-r-2 border-(--primary,#00f0ff)/30 ltr:pl-6 rtl:pr-6 py-2 mb-16">
        <p className="text-slate-400 text-lg md:text-xl font-medium leading-relaxed tracking-tight">
          {t?.description}
        </p>
      </div>

      {/* Decorative Separator Line */}
      <div className="flex gap-6 mb-16">
        <div className="h-[2px] w-24 bg-(--primary,#00f0ff)"></div>
        <div className="h-[2px] w-8 bg-(--primary,#00f0ff)/30"></div>
        <div className="h-[2px] w-4 bg-(--primary,#00f0ff)/10"></div>
      </div>
    </div>
  );
}
