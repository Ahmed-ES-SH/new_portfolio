"use client";

import { useTranslation } from "@/app/hooks/useTranslation";
import { Project } from "@/app/lib/projects-data";

interface ProjectTechStackProps {
  project: Project;
}

export default function ProjectTechStack({ project }: ProjectTechStackProps) {
  const t = useTranslation("projectDetail");

  // Filter or limit to 4-5 skills for the visual box, or render all if requested
  const displaySkills = project.skills.slice(0, 5);

  return (
    <div className="terminal-module">
      <div className="bg-terminal-border px-4 py-1">
        <h3 className="font-mono text-xs font-bold text-primary uppercase">
          {t.sections.techStack}
        </h3>
      </div>
      <div className="p-6 flex flex-col gap-4">
        {displaySkills.map((skill, idx) => {
          // Generate a pseudo-random width block based on index for the cyber aesthetic
          const widthPercent = 60 + (idx * 15) % 40;
          return (
            <div key={idx} className="flex justify-between items-center group">
              <span className="font-mono text-xs text-slate-400 group-hover:text-primary transition-colors truncate pr-4 uppercase">
                {skill.replace(" ", "_")}
              </span>
              <div className="h-1 w-24 bg-slate-800 relative shrink-0">
                <div
                  className="absolute left-0 top-0 h-full bg-primary neon-glow"
                  style={{ width: `${widthPercent}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
