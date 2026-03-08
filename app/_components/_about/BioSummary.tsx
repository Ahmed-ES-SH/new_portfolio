"use client";

import { useTranslation } from "@/app/hooks/useTranslation";

export function BioSummary() {
  const about = useTranslation("about");

  return (
    <div className="flex flex-col gap-y-6 justify-start ltr:text-left rtl:text-right w-full">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-widest text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] relative font-sans">
        {/* Fake RGB split / Glitch effect approximation for the text if desired */}
        <span className="relative z-10">{about.bio.name}</span>
      </h1>

      <div className="w-12 h-[2px] bg-[#00FFCC]" />

      <p className="text-[13px] sm:text-sm md:text-[15px] font-mono text-[#6B7280] font-light leading-relaxed max-w-xl text-justify tracking-wide">
        {about.bio.description}
      </p>
    </div>
  );
}
