import React from "react";
import { AboutSection } from "@/app/_components/_about/AboutSection";

export default function AboutPage() {
  return (
    <main className="min-h-screen relative mt-20 bg-[#030303]">
      <div className="absolute inset-0 scanline-overlay z-0" />
      <AboutSection />
    </main>
  );
}
