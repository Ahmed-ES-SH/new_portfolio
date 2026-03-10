import fs from "fs";
import path from "path";
import { projectsConfig, type Project, type ProjectCategory } from "./projects-data";
export type { Project, ProjectCategory };

export async function getProjects(): Promise<Project[]> {
  const projectsDir = path.join(process.cwd(), "public", "Projects");

  const projects = await Promise.all(
    projectsConfig.map(async (project) => {
      const dirPath = path.join(projectsDir, project.folderName);
      let images: string[] = [];

      try {
        if (fs.existsSync(dirPath)) {
          const files = await fs.promises.readdir(dirPath);
          images = files
            .filter((file) => /\.(png|jpg|jpeg|webp|gif)$/i.test(file))
            .map((file) => `/Projects/${project.folderName}/${file}`);
        }
      } catch (error) {
        console.error(`Error reading images for ${project.folderName}:`, error);
      }

      return {
        ...project,
        images,
      } as Project;
    }),
  );

  return projects;
}
