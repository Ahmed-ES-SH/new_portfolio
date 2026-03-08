"use client";

import { useState } from "react";
import { Project, ProjectCategory } from "@/app/lib/projects";
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

  const filteredProjects =
    activeTab === "all"
      ? initialProjects
      : initialProjects.filter((p) => p.categories.includes(activeTab));

  return (
    <div className="relative mt-8 min-h-screen w-full flex flex-col font-display text-slate-100 overflow-x-hidden">
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
      <main className="flex-1 container-section mt-20 z-10">
        <ProjectsHero />
        <ProjectsStats />
        <ProjectsTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <ProjectsGrid projects={filteredProjects} />
      </main>
    </div>
  );
}
