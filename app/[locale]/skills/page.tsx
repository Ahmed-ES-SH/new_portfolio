/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  skills,
  frontendSkills,
  backendSkills,
  toolsSkills,
  aiSkills,
} from "@/constants/skillsContent";
import { SkillCard } from "../../_components/_skills/SkillCard";
import { getServerTranslation } from "@/app/helpers/serverTranslation";
import { directionMap } from "@/constants/global";
import SkillsHeroSection from "../../_components/_skills/SkillsHeroSection";
import SkillsSlider from "@/app/_components/_skills/SkillsSlider";
import SkillsBackGround from "@/app/_components/_skills/SkillsBackGround";
import { getSharedMetadata } from "@/app/helpers/SharedMetadata";

type Locale = "en" | "ar";

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: any) {
  const { locale } = await params;
  const t = getServerTranslation(locale, "metaSkillsPage");

  const sharedMetadata = getSharedMetadata(t.title, t.description);

  return {
    title: t.title,
    description: t.description,
    ...sharedMetadata,
  };
}

export default async function SkillsPage({ params }: PageProps) {
  const { locale } = await params;
  const dictionary = await getServerTranslation(locale, "home");
  const t = dictionary.skills;

  // Helper to map skill names to skill objects
  const mapSkillData = (skillNames: string[]) => {
    return skillNames
      .map((name) => skills.find((s) => s.title.en === name))
      .filter((s): s is (typeof skills)[0] => s !== undefined);
  };

  const categories = [
    {
      id: "frontend",
      label: t?.tabs?.frontend || "Frontend",
      data: mapSkillData(frontendSkills),
    },
    {
      id: "backend",
      label: t?.tabs?.backend || "Backend & Infrastructure",
      data: mapSkillData(backendSkills),
    },
    {
      id: "ai",
      label: t?.tabs?.ai || "AI-Powered Development",
      data: mapSkillData(aiSkills),
    },
    {
      id: "tools",
      label: t?.tabs?.tools || "Tools & Architecture",
      data: mapSkillData(toolsSkills),
    },
  ];

  return (
    <main
      dir={directionMap[locale]}
      className="relative min-h-screen  flex flex-col bg-black/70 overflow-hidden"
    >
      <SkillsBackGround />
      {/* Background Grids and Overlays (Consistent with SkillsSection) */}
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

      {/* Hero Section */}
      <div className="pt-32 pb-8">
        <SkillsHeroSection t={t} />
      </div>

      {/* Content Sections */}
      <div className="container-section pb-32 relative z-10 flex flex-col gap-24">
        {categories.map((category) => (
          <section key={category.id} className="flex flex-col gap-12">
            {/* Category Header with Decorative Line */}
            <div className="flex items-center gap-6">
              <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-widest text-(--primary,#00f0ff) border-l-4 border-(--primary,#00f0ff) pl-6 neon-text">
                {category.label}
              </h2>
              <div
                className="grow h-[2px] bg-linear-to-r from-(--primary,#00f0ff) to-transparent"
                style={{
                  boxShadow:
                    "0 0 12px var(--primary,#00f0ff), 0 0 20px rgba(0, 240, 255, 0.5)",
                }}
              />
            </div>

            {/* Skills Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
              {category.data.map((skill, idx) => (
                <div
                  key={`${category.id}-${skill.title.en}-${idx}`}
                  className="h-full"
                >
                  <SkillCard skill={skill} locale={locale} />
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
      <SkillsSlider />
    </main>
  );
}
