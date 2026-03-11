"use client";

import React from "react";

export default function GlitchFooter() {
  return (
    <footer className="h-10 border-t border-primary/30 flex max-md:flex-col max-md:items-start  shrink-0 items-center justify-between px-6 bg-black text-[10px]  text-primary/60 relative z-40">
      <div className="flex items-center  gap-6">
        <span className="flex items-center pt-2 gap-2">
          <span className="size-1.5 rounded-full bg-green-500 animate-pulse"></span>{" "}
          SYSTEM_ONLINE
        </span>
        <span className="hidden md:inline">BUFF_STREAM: ACTIVE</span>
        <span className="hidden md:inline">LATENCY: 14MS</span>
      </div>
      <div className="flex items-center gap-4">
        <div className="w-32 h-1.5 bg-primary/10 overflow-hidden border border-primary/20">
          <div className="h-full bg-primary" style={{ width: "65%" }}></div>
        </div>
        <span className="text-primary whitespace-nowrap neon-text tracking-widest">
          DECRYPTING... 65%
        </span>
      </div>
    </footer>
  );
}
