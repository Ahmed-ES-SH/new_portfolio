import { getProjects } from "@/app/lib/projects";
import ProjectsClientWrapper from "@/app/_components/_projects/ProjectsClientWrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ahmed Ismail | Projects Archive",
  description:
    "Central repository for high-priority experimental system modules. Execute with caution.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return <ProjectsClientWrapper initialProjects={projects} />;
}
