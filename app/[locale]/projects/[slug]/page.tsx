/* eslint-disable @typescript-eslint/no-explicit-any */

import { getServerTranslation } from "@/app/helpers/serverTranslation";
import { getSharedMetadata } from "@/app/helpers/SharedMetadata";
import { getProjects } from "@/app/lib/projects";
import ProjectDetailHero from "@/app/_components/_projectPage/ProjectDetailHero";
import ProjectModuleInfo from "@/app/_components/_projectPage/ProjectModuleInfo";
import ProjectFeatureSet from "@/app/_components/_projectPage/ProjectFeatureSet";
import ProjectTechStack from "@/app/_components/_projectPage/ProjectTechStack";
import ProjectSystemLog from "@/app/_components/_projectPage/ProjectSystemLog";
import ProjectDeploymentNode from "@/app/_components/_projectPage/ProjectDeploymentNode";
import ProjectUserProfile from "@/app/_components/_projectPage/ProjectUserProfile";
import ProjectCoverSection from "@/app/_components/_projectPage/ProjectCoverSection";

// Static params for build time
export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: any) {
  const { slug, locale } = await params;
  const projects = await getProjects();
  const project = projects.find((p) => p.slug === slug);
  const t = getServerTranslation(locale, "metaProjectPage");

  if (!project) return getSharedMetadata("", "");

  const loc = locale as "en" | "ar";
  return {
    title: `${t.title}${project.title[loc]}`,
    description: `${t.description}${project.description[loc]}`,
    ...getSharedMetadata(
      `${t.title}${project.title[loc]}`,
      `${t.description}${project.description[loc]}`,
    ),
  };
}

export default async function ProjectPage({ params }: any) {
  const { slug, locale } = await params;
  const projects = await getProjects();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="p-20 text-center text-primary font-mono border border-primary m-10">
        ERROR: MODULE_NOT_FOUND // {slug}
      </div>
    );
  }

  // Load detailed content from JSON
  let content = "";
  try {
    const projectContent = await import(`@/constants/projects/${slug}.json`);
    content = projectContent.default.content[locale];
  } catch {
    console.warn(`No detailed content found for ${slug}`);
  }

  return (
    <div className="relative min-h-screen container-section flex flex-col font-display text-slate-100 overflow-x-hidden mt-24 pb-12">
      {/* Background Grid */}
      <div className="fixed inset-0 grid-bg z-[-1]" />
      <div className="fixed inset-0 bg-background-dark/50 pointer-events-none z-[-1]"></div>

      <main className="flex-1 px-6 flex flex-col gap-8 z-10">
        {/*  project cover section + Actions buttons  */}
        <ProjectCoverSection project={project} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info Column */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            <ProjectModuleInfo project={project} content={content} />
            <ProjectDetailHero project={project} />
            <ProjectFeatureSet />
          </div>

          {/* Side Column Data */}
          <div className="flex flex-col gap-8">
            <ProjectTechStack project={project} />
            <ProjectSystemLog />
            <ProjectDeploymentNode />
            <ProjectUserProfile />
          </div>
        </div>
      </main>
    </div>
  );
}
