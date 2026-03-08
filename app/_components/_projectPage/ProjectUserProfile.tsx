"use client";

import { Check } from "lucide-react";
import Image from "next/image";

export default function ProjectUserProfile() {
  return (
    <div className="terminal-module border-t-2 border-primary/40">
      <div className="p-4 flex items-center gap-4">
        <div className="size-12 relative overflow-hidden border border-primary p-0.5">
          <div className="absolute inset-0 bg-primary/10 animate-pulse"></div>
          <Image
            src="/root_user.webp" // Replace with real avatar path if available
            alt="Root User"
            width={48}
            height={48}
            className="object-cover relative z-10 grayscale hover:grayscale-0 transition-all"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-mono text-xs font-bold text-white uppercase truncate">
            ROOT_USER // AHMED_ISMAIL
          </h4>
          <p className="font-mono text-[9px] text-primary/70 uppercase tracking-tighter">
            System Architect & Lead Developer
          </p>
        </div>
        <div className="size-6 border border-primary/30 flex items-center justify-center">
          <span className="material-symbols-outlined text-primary text-xs">
            <Check />
          </span>
        </div>
      </div>
      <div className="bg-primary/5 px-4 py-2 border-t border-terminal-border/30 flex justify-between items-center">
        <span className="font-mono text-[9px] text-slate-500 uppercase">
          Clearance_Level
        </span>
        <span className="font-mono text-[9px] text-primary">
          Level_01_Admin
        </span>
      </div>
    </div>
  );
}
