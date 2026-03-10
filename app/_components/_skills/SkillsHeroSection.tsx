"use client";
import Image from "next/image";
import LocaleLink from "../_global/LocaleLink";
import { useState } from "react";

interface SkillsHeroSectionProps {
  t: {
    title: string;
    description: string;
    explain: string;
    readMore: string;
    readLess: string;
  };
}

export default function SkillsHeroSection({ t }: SkillsHeroSectionProps) {
  const [readMore, setReadMore] = useState(false);

  return (
    <div className="relative  z-10 container-section flex items-center justify-between max-lg:flex-col">
      {/* content side  */}
      <div className="flex-1">
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
        <div className="max-w-xl ltr:border-l-2  rtl:border-r-2 border-(--primary,#00f0ff)/30 ltr:pl-6 rtl:pr-6 py-2 mb-16">
          <div className="flex flex-col items-end">
            <p className="text-slate-400 max-md:text-sm font-medium leading-relaxed tracking-tight">
              {readMore ? t?.description : t?.description.slice(0, 300) + "..."}
            </p>
            <button
              onClick={() => setReadMore(!readMore)}
              className="text-(--primary,#00f0ff) text-xs hover:underline whitespace-nowrap font-black tracking-[0.3em] uppercase"
            >
              {readMore ? t.readLess : t.readMore}
            </button>
          </div>
        </div>

        <LocaleLink
          href="/explain"
          className="neon-border w-fit mb-8 bg-(--color-accent-blue) text-black px-6 sm:px-10 py-3 sm:py-4 text-xs sm:text-sm font-black uppercase tracking-widest hover:bg-transparent hover:text-(--color-accent-blue) transition-all duration-300"
        >
          [{t.explain}]
        </LocaleLink>

        {/* Decorative Separator Line */}
        <div className="flex gap-6 mb-16">
          <div className="h-[2px] w-24 bg-(--primary,#00f0ff)"></div>
          <div className="h-[2px] w-8 bg-(--primary,#00f0ff)/30"></div>
          <div className="h-[2px] w-4 bg-(--primary,#00f0ff)/10"></div>
        </div>
      </div>
      {/* image side  */}
      <div className="flex-1 max-md:hidden">
        <Image
          className="w-full h-full object-cover mask-x-from-90% mask-x-to-95% mask-b-from-50% mask-b-to-100%"
          src="/skills-image.webp"
          alt="skills"
          width={1200}
          height={1200}
        />
      </div>
    </div>
  );
}
