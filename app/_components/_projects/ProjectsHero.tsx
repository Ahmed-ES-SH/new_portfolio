"use client";

import { useTranslation } from "@/app/hooks/useTranslation";

export default function ProjectsHero() {
  const t = useTranslation("projects");

  return (
    <div className="flex flex-wrap justify-between items-end gap-6 mb-12 border-l-4 border-primary pl-6 py-2 bg-primary/5">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-primary font-bold text-[8px] md:text-xs tracking-[0.3em]">
          <span className="pixel-flicker">●</span> {t.hero.status}
        </div>
        <h1 className="xl:text-5xl text-2xl font-black leading-none tracking-tighter text-glow uppercase">
          {t.hero.title}
        </h1>
        <p className="text-slate-400 xl:text-lg text-sm max-w-xl">
          {t.hero.subtitle}
        </p>
      </div>
    </div>
  );
}
