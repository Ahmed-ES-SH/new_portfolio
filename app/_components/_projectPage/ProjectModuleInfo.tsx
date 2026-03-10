"use client";

import { TypeAnimation } from "react-type-animation";
import { useTranslation } from "@/app/hooks/useTranslation";
import { useLocale } from "@/app/hooks/useLocale";
import { Project } from "@/app/lib/projects-data";

interface ProjectModuleInfoProps {
  project: Project;
  content?: string;
}

export default function ProjectModuleInfo({
  project,
  content,
}: ProjectModuleInfoProps) {
  const t = useTranslation("projectDetail");
  const locale = useLocale();

  const displayContent = content || project.description[locale];

  // Generate word-by-word sequence
  const sequence = displayContent
    ? displayContent.split(" ").reduce((acc: (string | number)[], word, i) => {
        const prev = i === 0 ? "" : (acc[acc.length - 2] as string) + " ";
        acc.push(prev + word);
        acc.push(20); // Delay between words in ms
        return acc;
      }, [])
    : [];

  return (
    <div className="terminal-module relative flex-1">
      <div className="bg-terminal-border px-4 py-1 flex justify-between items-center">
        <h3 className="font-mono text-xs font-bold text-primary uppercase">
          {t.sections.moduleInfo}
        </h3>
        <div className="flex gap-1">
          <div className="size-2 bg-primary/50"></div>
          <div className="size-2 bg-primary/30"></div>
        </div>
      </div>
      <div className="p-6">
        <div className="font-display text-slate-300 leading-relaxed whitespace-pre-line min-h-[160px]">
          <span className="text-primary font-mono mr-2 block mb-2 underline tracking-widest text-[10px]">
            INITIALIZING_DETAILED_RECON...
          </span>
          {sequence.length > 0 && (
            <TypeAnimation
              key={`${locale}-${displayContent.length}`}
              sequence={sequence}
              wrapper="span"
              cursor={true}
              repeat={0}
              className="inline-block"
            />
          )}
        </div>

        <div className="mt-8 border-t border-terminal-border/30 pt-6">
          <h4 className="font-mono text-[10px] text-primary uppercase mb-4 tracking-[0.2em]">
            {t.sections.systemDependencies}
          </h4>
          <div className="grid grid-cols-2 gap-y-2 gap-x-8 font-mono text-xs">
            {project.skills.slice(0, 8).map((skill, idx) => (
              <div
                key={idx}
                className="flex justify-between border-b border-terminal-border/20 pb-1"
              >
                <span className="text-slate-500 uppercase">
                  {`DEP_0${idx + 1}`}
                </span>
                <span
                  className="text-white truncate max-w-[120px]"
                  title={skill}
                >
                  {skill.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-4 border-t border-terminal-border pt-6">
          <div className="flex-1 min-w-[120px]">
            <p className="font-mono text-[10px] text-slate-500 uppercase">
              {t.metrics.version}
            </p>
            <p className="font-mono text-sm text-white">8.4.2-STABLE</p>
          </div>
          <div className="flex-1 min-w-[120px]">
            <p className="font-mono text-[10px] text-slate-500 uppercase">
              {t.metrics.latency}
            </p>
            <p className="font-mono text-sm text-white">0.04ms</p>
          </div>
          <div className="flex-1 min-w-[120px]">
            <p className="font-mono text-[10px] text-slate-500 uppercase">
              {t.metrics.uptime}
            </p>
            <p className="font-mono text-sm text-white">99.999%</p>
          </div>
        </div>
      </div>
    </div>
  );
}
