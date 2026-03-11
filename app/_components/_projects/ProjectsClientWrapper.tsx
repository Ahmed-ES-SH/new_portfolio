"use client";

import { useEffect, useState } from "react";
import { Project, ProjectCategory } from "@/app/lib/projects-data";
import ProjectsHero from "./ProjectsHero";
import ProjectsStats from "./ProjectsStats";
import ProjectsTabs from "./ProjectsTabs";
import ProjectsGrid from "./ProjectsGrid";

interface ProjectsClientWrapperProps {
  initialProjects: Project[];
}

export default function ProjectsClientWrapper({
  initialProjects,
}: ProjectsClientWrapperProps) {
  const [activeTab, setActiveTab] = useState<ProjectCategory | "all">("all");

  useEffect(() => {
    // Force scroll to top on mount to prevent the page from starting in the middle
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const filteredProjects =
    activeTab === "all"
      ? initialProjects
      : initialProjects.filter((p) => p.categories.includes(activeTab));

  return (
    <div className="relative py-8 min-h-screen w-full flex flex-col text-slate-100">
      {/* Background Grid - from original design */}
      <div
        className="fixed inset-0 pointer-events-none z-[-1]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(59, 130, 246, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(59, 130, 246, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1 container-section max-md:p-2 mt-20 z-10">
        <ProjectsHero />
        <ProjectsStats />
        <ProjectsTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <ProjectsGrid projects={filteredProjects} />
      </main>
    </div>
  );
}
