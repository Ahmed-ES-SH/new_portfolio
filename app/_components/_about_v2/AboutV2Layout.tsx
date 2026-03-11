"use client";

import { ReactNode } from "react";

export function AboutV2Layout({ children }: { children: ReactNode }) {
  return (
    <div className="relative mt-8 min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#050a0f] text-slate-100 ">
      {/* Grid Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, #102a43 1px, transparent 1px),
            linear-gradient(to bottom, #102a43 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* CRT Overlay */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: `
            linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), 
            linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))
          `,
          backgroundSize: "100% 2px, 3px 100%",
        }}
      />

      <main className="relative z-20   h-full flex flex-col lg:flex-row gap-8 items-stretch pt-24 pb-20  lg:px-10">
        {children}
      </main>
    </div>
  );
}
