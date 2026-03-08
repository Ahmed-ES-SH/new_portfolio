"use client";

import { useTranslation } from "@/app/hooks/useTranslation";
import { useLocale } from "@/app/hooks/useLocale";
import { Project } from "@/app/lib/projects";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import Image from "next/image";

interface ProjectDetailHeroProps {
  project: Project;
}

export default function ProjectDetailHero({ project }: ProjectDetailHeroProps) {
  const t = useTranslation("projectDetail");
  const locale = useLocale();

  // If the project has images, use them. Otherwise fallback to the cover image.
  const images = project.images?.length
    ? project.images
    : [project.projectCover];

  return (
    <section className="terminal-module p-1 relative overflow-hidden mb-8 border border-terminal-border bg-background-dark/80 backdrop-blur-sm">
      <div className="h-[400px] md:h-[500px] w-full bg-slate-900 relative group overflow-hidden">
        <Swiper
          modules={[Autoplay, EffectFade, Pagination]}
          effect="fade"
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop={true}
          className="w-full h-full"
        >
          {images.map((img, idx) => (
            <SwiperSlide key={idx}>
              <div className="absolute inset-0">
                <Image
                  src={img}
                  alt={`${project.title[locale]} screenshot ${idx + 1}`}
                  fill
                  className="object-cover opacity-60"
                  priority={idx === 0}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Cyberpunk overlays */}
        <div className="scanline-overlay absolute inset-0 z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>

        <div className="absolute bottom-6 left-6 flex flex-col gap-4 z-20">
          <div>
            <h1 className="font-mono text-3xl md:text-5xl font-bold text-white tracking-tighter drop-shadow-md">
              <span className="text-primary mr-2">&gt;</span>
              {project.title[locale].toUpperCase()}
            </h1>
            <p className="font-mono text-primary/70 text-sm md:text-base mt-2 uppercase tracking-widest">
              {project.categories.join(" // ")}
            </p>
          </div>

          <div className="flex flex-wrap gap-4 mt-2">
            {project.projectLink && (
              <a
                href={project.projectLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 bg-primary text-background-dark font-mono font-bold text-sm neon-glow hover:bg-white transition-all uppercase flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-sm">
                  play_arrow
                </span>
                {t.actions.activateDemo}
              </a>
            )}

            {project.linkSourceCode && (
              <a
                href={project.linkSourceCode}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 border-2 border-primary text-primary font-mono font-bold text-sm hover:bg-primary/20 transition-all uppercase flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-sm">code</span>
                {t.actions.accessSource}
              </a>
            )}
          </div>
        </div>

        <div className="absolute top-4 right-4 flex gap-2 z-20">
          <span className="px-2 py-1 bg-red-600 text-white font-mono text-xs font-bold uppercase">
            {t.badges.critical}
          </span>
          <span className="px-2 py-1 bg-primary text-background-dark font-mono text-xs font-bold uppercase">
            {t.badges.online}
          </span>
        </div>
      </div>
    </section>
  );
}
