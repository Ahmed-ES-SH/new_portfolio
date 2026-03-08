"use client";

import { useTranslation } from "@/app/hooks/useTranslation";
import { ProjectCategory } from "@/app/lib/projects";
import { motion } from "framer-motion";

interface ProjectsTabsProps {
  activeTab: ProjectCategory | "all";
  setActiveTab: (tab: ProjectCategory | "all") => void;
}

export default function ProjectsTabs({
  activeTab,
  setActiveTab,
}: ProjectsTabsProps) {
  const t = useTranslation("projects");

  const tabs: { id: ProjectCategory | "all"; label: string }[] = [
    { id: "all", label: t.tabs.all },
    { id: "frontend", label: t.tabs.frontend },
    { id: "backend", label: t.tabs.backend },
    { id: "fullstack", label: t.tabs.fullstack },
  ];

  return (
    <div className="flex border-b border-primary/30 mb-8 overflow-x-auto whitespace-nowrap scrollbar-hide">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-8 py-4 border-b-2 font-black tracking-tighter text-sm transition-colors relative ${
              isActive
                ? "border-primary bg-primary/10 text-primary"
                : "border-transparent text-slate-500 hover:text-primary"
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="activeTabIndicator"
                className="absolute bottom-[-2px] left-0 right-0 h-[2px] bg-primary"
                initial={false}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 30,
                }}
              />
            )}
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
