/* eslint-disable @typescript-eslint/no-explicit-any */
import { getProjects } from "@/app/lib/projects";
import ProjectsClientWrapper from "@/app/_components/_projects/ProjectsClientWrapper";
import { getServerTranslation } from "@/app/helpers/serverTranslation";
import { getSharedMetadata } from "@/app/helpers/SharedMetadata";

export async function generateMetadata({ params }: any) {
  const { locale } = await params;
  const t = getServerTranslation(locale, "metaProjectsPage");

  const sharedMetadata = getSharedMetadata(t.title, t.description);

  return {
    title: t.title,
    description: t.description,
    ...sharedMetadata,
  };
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return <ProjectsClientWrapper initialProjects={projects} />;
}
