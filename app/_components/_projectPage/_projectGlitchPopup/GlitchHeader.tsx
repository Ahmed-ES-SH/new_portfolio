"use client";

import React from "react";
import { X } from "lucide-react";

interface GlitchHeaderProps {
  onClose: () => void;
}

export default function GlitchHeader({ onClose }: GlitchHeaderProps) {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-primary/30 bg-primary/5 relative z-40 shrink-0">
      <div className="flex items-center gap-3">
        <span className=" text-primary neon-text tracking-widest text-sm hidden sm:block">
          terminal
        </span>
        <h2 className="text-primary font-bold tracking-widest text-[10px] md:text-lg lg:text-xl uppercase neon-text">
          PROJECT_DECRYPT // IMAGE_VAULT
        </h2>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-xs text-primary/60  hidden sm:block tracking-widest uppercase">
          ID: X-992-G_RECOVERY
        </span>
        <button
          onClick={onClose}
          className="flex items-center justify-center size-10 bg-primary/20 hover:bg-primary text-primary hover:text-white transition-all border border-primary/40"
        >
          <X />
        </button>
      </div>
    </header>
  );
}
