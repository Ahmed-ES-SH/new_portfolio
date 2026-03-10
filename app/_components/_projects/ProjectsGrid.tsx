"use client";

import { Project } from "@/app/lib/projects-data";
import ProjectCard from "./ProjectCard";
import { AnimatePresence, motion } from "framer-motion";

interface ProjectsGridProps {
  projects: Project[];
}

export default function ProjectsGrid({ projects }: ProjectsGridProps) {
  return (
    <motion.div layout className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <AnimatePresence mode="popLayout">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
