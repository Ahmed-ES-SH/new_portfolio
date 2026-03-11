"use client";

import Image from "next/image";
import { useTranslation } from "@/app/hooks/useTranslation";
import useVariablesContext from "@/app/context/VariablesContext";

export function AboutHero() {
  const { setIsPopupOpen } = useVariablesContext();
  const aboutTranslations = useTranslation("about");

  return (
    <section className="flex-1 flex flex-col items-center justify-center z-20">
      <div className="relative max-md:w-full z-10 flex flex-col items-center">
        {/* Profile Image Frame */}
        <div className="relative p-2 border border-primary/30 shadow-[0_0_50px_rgba(0,242,255,0.15)] group">
          {/* Corner Brackets */}
          <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-primary"></div>
          <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-primary"></div>
          <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-primary"></div>
          <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-primary"></div>

          <div className="overflow-hidden w-[280px] sm:w-[350px] md:w-[400px] h-[340px] sm:h-[420px] md:h-[480px] bg-slate-900 border border-primary/50 relative group">
            <Image
              src="/about.webp"
              alt="Profile of Ahmed Ismail"
              fill
              className="object-cover grayscale brightness-75 contrast-125 transition-all duration-700 group-hover:grayscale-0 group-hover:brightness-100 group-hover:contrast-100"
            />
            {/* Glitch/Overlay FX */}
            <div className="absolute inset-0 bg-primary/10 mix-blend-overlay pointer-events-none"></div>
            <div className="scanline absolute w-full h-[2px] bg-primary/50 shadow-[0_0_10px_#00f2ff] top-0 left-0 pointer-events-none animate-[scanline_4s_linear_infinite]"></div>

            <div className="absolute bottom-4 right-4  text-[10px] bg-background-dark/80 px-2 py-1 border border-primary/40 text-primary">
              {aboutTranslations.hero?.subId || "SUB_ID: ALEX_REED_01"}
            </div>
          </div>
        </div>

        {/* Text Details */}
        <div className="mt-10 max-w-3xl text-center px-4">
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase mb-2">
            {aboutTranslations.bio.name}
          </h1>
          <div className="inline-block bg-primary/50 backdrop-blur-sm text-background-dark px-4 py-1 text-[10px] md:text-xs font-black uppercase tracking-[0.3em] md:tracking-[0.4em] mb-8">
            {aboutTranslations.hero?.role || "Full Stack Developer"}
          </div>

          <p className="text-slate-300 text-sm md:text-base  leading-relaxed mb-10 px-4">
            {aboutTranslations.bio.description}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
            <button
              onClick={() => setIsPopupOpen(true)}
              className="bg-primary/50 border border-primary/80 hover:bg-primary hover:text-black backdrop-blur-2xl text-background-dark px-8 md:px-10 py-3 md:py-4 text-xs font-black uppercase tracking-[0.2em] hover:brightness-110 transition-all shadow-[0_0_15px_rgba(0,242,255,0.4)] hover:shadow-[0_0_25px_rgba(0,242,255,0.6)]"
            >
              {aboutTranslations.hero?.reconMission || "[RECON_MISSION]"}
            </button>
            {/* <button className="bg-primary/50 border border-primary/80 hover:bg-primary hover:text-black backdrop-blur-2xl text-background-dark px-8 md:px-10 py-3 md:py-4 text-xs font-black uppercase tracking-[0.2em] hover:brightness-110 transition-all shadow-[0_0_15px_rgba(0,242,255,0.4)] hover:shadow-[0_0_25px_rgba(0,242,255,0.6)]">
              {aboutTranslations.hero?.establishLink || "ESTABLISH_LINK"}
            </button> */}
          </div>
        </div>
      </div>
    </section>
  );
}
