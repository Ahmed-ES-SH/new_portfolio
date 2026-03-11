import React from "react";
import Image from "next/image";

type Locale = "en" | "ar";

interface SkillData {
  icon: string;
  title: Record<Locale, string>;
  desc: Record<Locale, string>;
}

interface SkillCardProps {
  skill: SkillData;
  locale: Locale;
}

export const SkillCard = ({ skill, locale }: SkillCardProps) => {
  return (
    <div
      className="neon-border  bg-primary/20 p-8 flex flex-col items-center justify-center transition-all group h-full"
      data-purpose="skill-card"
    >
      <div className="w-16 h-16 mb-4 text-primary hover:scale-110 transition-transform relative flex items-center justify-center">
        {skill.icon ? (
          <Image
            src={skill.icon}
            alt={skill.title[locale]}
            width={48}
            height={48}
            className="object-contain"
          />
        ) : (
          <span className="text-2xl font-bold uppercase">
            {skill.title[locale].substring(0, 2)}
          </span>
        )}
      </div>
      <span className=" text-sm tracking-wider uppercase text-center min-h-[40px] flex items-center justify-center">
        {skill.title[locale]}
      </span>
      <div className="absolute inset-0 bg-(--brand-blue,#00d2ff)/5 opacity-0 hover:opacity-100 transition-opacity pointer-events-none" />
    </div>
  );
};
