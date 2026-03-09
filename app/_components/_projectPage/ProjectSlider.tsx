"use client";

import { useLocale } from "@/app/hooks/useLocale";
import { Project } from "@/app/lib/projects";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import Image from "next/image";
import SliderGlitchPopup from "./SliderGlitchPopup";
import { useState } from "react";

interface ProjectDetailHeroProps {
  project: Project;
}

export default function ProjectSlider({ project }: ProjectDetailHeroProps) {
  const locale = useLocale();

  const [isOpen, setIsOpen] = useState(false);

  // If the project has images, use them. Otherwise fallback to the cover image.
  const images = project.images?.length
    ? project.images
    : [project.projectCover];

  return (
    <>
      <section
        onClick={() => setIsOpen(true)}
        className="terminal-module hover:shadow-xl shadow-primary duration-300 hover:-translate-y-4 cursor-pointer p-1 relative overflow-hidden mb-2 border border-terminal-border bg-background-dark/80 backdrop-blur-sm"
      >
        <div className="h-[400px] md:h-[500px] w-full bg-slate-900 relative group overflow-hidden">
          <Swiper
            modules={[Autoplay]}
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
          <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent z-10"></div>
        </div>
      </section>

      {/* slider glitch popup */}
      <SliderGlitchPopup
        images={project.images ?? []}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}
