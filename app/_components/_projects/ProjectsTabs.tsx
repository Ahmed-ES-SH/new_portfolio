"use client";

import { useTranslation } from "@/app/hooks/useTranslation";
import { ProjectCategory } from "@/app/lib/projects-data";
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
    <div className="flex border-b border-primary/30 mb-8 hidden-scrollbar overflow-x-auto whitespace-nowrap scrollbar-hide select-none cursor-grab active:cursor-grabbing"
      onPointerDown={(e) => {
        const el = e.currentTarget;
        el.setPointerCapture(e.pointerId);
        const startX = e.clientX;
        const startScroll = el.scrollLeft;
        let dragged = false;

        const onMove = (ev: PointerEvent) => {
          const dx = ev.clientX - startX;
          if (Math.abs(dx) > 4) dragged = true;
          el.scrollLeft = startScroll - dx;
        };

        const onUp = () => {
          el.removeEventListener("pointermove", onMove);
          el.removeEventListener("pointerup", onUp);
          // Store drag flag so click handlers can ignore it
          (el as HTMLElement & { _wasDragged?: boolean })._wasDragged = dragged;
          setTimeout(() => {
            (el as HTMLElement & { _wasDragged?: boolean })._wasDragged = false;
          }, 200);
        };

        el.addEventListener("pointermove", onMove);
        el.addEventListener("pointerup", onUp);
      }}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={(e) => {
              const parent = e.currentTarget.parentElement as HTMLElement & { _wasDragged?: boolean };
              if (parent?._wasDragged) return;
              setActiveTab(tab.id);
            }}
            className={`px-8 py-4 border-b-2 font-black tracking-tighter text-sm transition-colors relative shrink-0 ${
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
