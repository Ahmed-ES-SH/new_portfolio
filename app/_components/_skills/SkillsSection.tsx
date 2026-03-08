import React from "react";
import {
  skills,
  frontendSkills,
  backendSkills,
  toolsSkills,
} from "@/constants/skillsContent";
import { SkillsTabs } from "./SkillsTabs";
import { getServerTranslation } from "@/app/helpers/serverTranslation";
import SkillsHeroSection from "./SkillsHeroSection";

type Locale = "en" | "ar";

export const SkillsSection = async ({ locale }: { locale: Locale }) => {
  const dictionary = await getServerTranslation(locale, "home");
  const t = dictionary.skills;

  // Combine the explicit string arrays with the detailed skills objects
  const mapSkillData = (skillNames: string[]) => {
    return skillNames
      .map((name) => skills.find((s) => s.title.en === name))
      .filter((s): s is (typeof skills)[0] => s !== undefined);
  };

  const skillsData = {
    frontend: mapSkillData(frontendSkills),
    backend: mapSkillData(backendSkills),
    tools: mapSkillData(toolsSkills),
  };

  return (
    <section className="relative min-h-[60vh] flex flex-col justify-center border-b border-(--primary,#00f0ff)/20 mb-20 overflow-hidden">
      {/* Background Grids and Overlays (Tech Grid from Stitch) */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0, 240, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 240, 255, 0.05) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="absolute inset-0 bg-linear-to-t from-(--bg-base,#0d0f10) via-transparent to-transparent z-0" />
      <div className="absolute inset-0 scanline-overlay z-0" />

      <SkillsHeroSection t={t} />

      <div className="container-section">
        {/* Interactive Tabs */}
        {t?.tabs && (
          <SkillsTabs
            locale={locale}
            translations={{
              frontend: t.tabs.frontend,
              backend: t.tabs.backend,
              tools: t.tabs.tools,
            }}
            data={skillsData}
          />
        )}
      </div>
    </section>
  );
};
