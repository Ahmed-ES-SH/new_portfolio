"use client";

import { TechStackStats } from "./TechStackStats";
import { BioSummary } from "./BioSummary";
import { CoreCompetencies } from "./CoreCompetencies";
import { IdentityVault } from "./IdentityVault";
import Image from "next/image";

export function AboutSection() {
  return (
    <section
      id="ABOUT_ME"
      className="relative w-full bg-[#050B14] text-white overflow-hidden py-16 sm:py-24 selection:bg-[#00FFCC]/30 selection:text-white border-t border-[#00FFCC]/20"
    >
      {/* Dark cyan grid background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 255, 204, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 255, 204, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Subtle radial glow */}
      <div className="absolute top-0 right-[20%] w-[600px] h-[600px] bg-[#00FFCC]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10 max-w-[1600px]">
        {/* CSS Grid Layout - matching the 3-column split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-[70vh] items-start">
          {/* Left Column: Identity Vault */}
          <div className="lg:col-span-3 flex flex-col py-8 relative h-full">
            <IdentityVault />
          </div>

          {/* Center Column: Bio, Image, and Tech Stack */}
          <div className="lg:col-span-6 flex flex-col justify-start items-center text-center py-8 lg:px-8 relative">
            <BioSummary />

            {/* Central Image Integration */}
            <div className="my-16 relative w-full max-w-lg mx-auto aspect-square group">
              {/* Decorative brackets for image */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[#00FFCC]/50 transition-all duration-500 group-hover:w-12 group-hover:h-12 group-hover:border-[#00FFCC]" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-[#00FFCC]/50 transition-all duration-500 group-hover:w-12 group-hover:h-12 group-hover:border-[#00FFCC]" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-[#00FFCC]/50 transition-all duration-500 group-hover:w-12 group-hover:h-12 group-hover:border-[#00FFCC]" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-[#00FFCC]/50 transition-all duration-500 group-hover:w-12 group-hover:h-12 group-hover:border-[#00FFCC]" />

              <Image
                src="/about.png"
                alt="Ahmed Ismail"
                fill
                sizes="(max-width: 768px) 100vw, 500px"
                className="object-cover grayscale opacity-80 mix-blend-luminosity hover:grayscale-0 hover:opacity-100 hover:mix-blend-normal transition-all duration-700 p-4"
              />
            </div>

            <div className="w-full max-w-2xl text-left">
              <TechStackStats />
            </div>
          </div>

          {/* Right Column: Core Competencies */}
          <div className="lg:col-span-3 flex flex-col py-8 relative h-full justify-between">
            <CoreCompetencies />
          </div>
        </div>
      </div>
    </section>
  );
}
