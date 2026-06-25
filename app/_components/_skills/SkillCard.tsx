import React from "react";
import Image from "next/image";

type Locale = "en" | "ar";
export type CategoryId = "frontend" | "backend" | "ai-capabilities" | "ai-tools" | "tools";

interface SkillData {
  icon: string;
  title: Record<Locale, string>;
  desc: Record<Locale, string>;
}

interface SkillCardProps {
  skill: SkillData;
  locale: Locale;
  categoryId?: CategoryId;
}

const categoryStyles: Record<CategoryId, {
  layout: "centered" | "side";
  descMode: "visible" | "hover";
}> = {
  frontend: { layout: "centered", descMode: "visible" },
  backend: { layout: "side", descMode: "visible" },
  "ai-capabilities": { layout: "centered", descMode: "hover" },
  "ai-tools": { layout: "side", descMode: "hover" },
  tools: { layout: "centered", descMode: "visible" },
};

export const SkillCard = ({ skill, locale, categoryId }: SkillCardProps) => {
  const style = categoryId ? categoryStyles[categoryId] : categoryStyles.frontend;
  const isSide = style.layout === "side";

  return (
    <div
      className="neon-border bg-primary/10 p-4 md:p-6 flex transition-all group h-full relative overflow-hidden"
      data-purpose="skill-card"
      data-category={categoryId}
    >
      <div
        className={`flex gap-4 w-full h-full ${isSide ? "flex-row items-start" : "flex-col items-center justify-center text-center"}`}
      >
        <div className={`${isSide ? "w-10 h-10 shrink-0 mt-1" : "w-14 h-14 mb-2"} text-primary hover:scale-110 transition-transform relative flex items-center justify-center`}>
          {skill.icon ? (
            <Image
              src={skill.icon}
              alt={skill.title[locale]}
              width={isSide ? 36 : 44}
              height={isSide ? 36 : 44}
              className="object-contain"
            />
          ) : (
            <span className="text-xl font-bold uppercase">
              {skill.title[locale].substring(0, 2)}
            </span>
          )}
        </div>

        <div className={`flex flex-col ${isSide ? "flex-1 min-w-0" : "items-center"}`}>
          <span className="text-xs md:text-sm tracking-wider uppercase font-semibold text-slate-200">
            {skill.title[locale]}
          </span>

          <span
            className={`mt-1.5 text-[11px] md:text-xs leading-relaxed text-slate-500 ${style.descMode === "visible" ? "line-clamp-2" : "line-clamp-0 max-h-0 group-hover:max-h-20 opacity-0 group-hover:opacity-100 transition-all duration-300 overflow-hidden"}`}
          >
            {skill.desc[locale]}
          </span>
        </div>
      </div>

      <div className="absolute inset-0 bg-(--brand-blue,#00d2ff)/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </div>
  );
};
