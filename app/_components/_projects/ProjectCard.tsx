"use client";

import { useLocale } from "@/app/hooks/useLocale";
import { useTranslation } from "@/app/hooks/useTranslation";
import { Project } from "@/app/lib/projects-data";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import LocaleLink from "../_global/LocaleLink";
import { formatTitle } from "@/app/helpers/formatTitle";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const locale = useLocale();
  const t = useTranslation("projects");
  const [isHovered, setIsHovered] = useState(false);

  // We assign a "threat level" or mapping based on the skills length just for the cyber aesthetic
  const isHighPriority = project.skills.length > 5;
  const threatLevelClass = isHighPriority
    ? "text-amber-500 pixel-flicker"
    : "text-primary pixel-flicker";
  const threatLevelText = isHighPriority ? "LEVEL_04" : "LEVEL_02";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`bg-black border-2 transition-all duration-300 flex flex-col h-full ${
        isHovered
          ? "border-primary neon-border"
          : "border-primary/40 shadow-none text-shadow-none"
      }`}
    >
      {/* Header */}
      <div
        className={`bg-primary/20 p-4 border-b-2 border-primary/40 flex justify-between items-center transition-colors ${
          isHovered ? "bg-primary/30" : ""
        }`}
      >
        <h3
          className={`font-black tracking-tighter text-xl text-primary truncate pl-2 pr-4 ${
            isHovered ? "text-glow" : ""
          }`}
          title={project.title[locale]}
        >
          {project.title[locale]}
        </h3>
        <span className="text-xs bg-primary text-gray-800 px-2 py-0.5 font-bold shrink-0">
          {project.slug === "pulse-net-observer" // Just a dummy mapping to keep the latest badge if needed, or we use a condition based on data
            ? t.card.latest
            : "V_1.0"}
        </span>
      </div>

      {/* Body */}
      <div className="p-6 flex flex-col flex-1 gap-6">
        <div className="flex flex-col sm:flex-row gap-4 h-full">
          {/* Image Thumbnail */}
          <div className="w-full sm:w-32 h-32 border border-primary/30 bg-slate-900 shrink-0 relative overflow-hidden group/image">
            <div className="absolute inset-0 bg-linear-to-br from-primary/20 to-transparent z-10 pointer-events-none"></div>
            <Image
              src={project.projectCover}
              alt={project.title[locale]}
              fill
              className={`object-cover opacity-50 transition-opacity duration-500 ${
                isHovered ? "opacity-80" : ""
              }`}
              sizes="(max-width: 640px) 100vw, 128px"
            />
          </div>

          {/* Description & Skills */}
          <div className="flex flex-col gap-2 flex-1">
            <p className="text-slate-300 text-sm leading-relaxed line-clamp-3">
              {project.description[locale]}
            </p>
            <div className="flex flex-wrap gap-2 mt-auto pt-2">
              {project.skills.slice(0, 4).map((skill, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-slate-900 border border-primary/20 text-[10px] text-primary font-bold whitespace-nowrap uppercase"
                >
                  {skill}
                </span>
              ))}
              {project.skills.length > 4 && (
                <span className="px-2 py-1 bg-slate-900 border border-primary/20 text-[10px] text-primary font-bold whitespace-nowrap">
                  +{project.skills.length - 4}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Cyber Stats */}
        <div className="bg-slate-900/80 p-4 border-l-2 border-primary  text-xs flex flex-col gap-2 mt-auto">
          <div className="flex justify-between items-center gap-2">
            <span className="text-slate-500 truncate">{t.card.techStack}</span>
            <span className="text-primary font-bold uppercase shrink-0">
              {project.categories.join(" / ")}
            </span>
          </div>
          <div className="flex justify-between items-center gap-2">
            <span className="text-slate-500 truncate">THREAT_LVL:</span>
            <span className={`shrink-0 ${threatLevelClass}`}>
              {threatLevelText}
            </span>
          </div>
          <div className="flex justify-between items-center gap-2">
            <span className="text-slate-500 truncate">{t.card.accessLvl}</span>
            <span
              className={`font-bold uppercase shrink-0 ${
                project.isPrivate ? "text-amber-500" : "text-emerald-500"
              }`}
            >
              {project.isPrivate ? t.card.private : t.card.public}
            </span>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center flex-col md:flex-row gap-2 w-full justify-between">
          <LocaleLink
            href={`/projects/${formatTitle(project.title[locale])}`}
            className="mt-auto block w-full"
          >
            <button className="w-full py-3 border border-primary/50 bg-transparent text-primary font-black hover:bg-primary hover:text-black transition-all tracking-widest uppercase text-sm">
              {t.card.executeModule}
            </button>
          </LocaleLink>
          <Link
            href={project.projectLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto block w-full"
          >
            <button className="w-full py-3 border border-primary/50 bg-transparent text-primary font-black hover:bg-primary hover:text-black transition-all tracking-widest uppercase text-sm">
              {t.card.liveDemo}
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
