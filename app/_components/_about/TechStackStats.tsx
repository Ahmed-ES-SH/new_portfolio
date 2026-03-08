"use client";

import { useTranslation } from "@/app/hooks/useTranslation";

export function TechStackStats() {
  const about = useTranslation("about");

  return (
    <div className="bg-transparent border border-[#374151] p-8 font-mono text-[10px] sm:text-xs text-[#6B7280] uppercase relative w-full">
      {/* Decorative corners */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#6B7280]" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#6B7280]" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#6B7280]" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#6B7280]" />

      <div className="relative z-10 w-full">
        <h4 className="text-white font-bold mb-8 tracking-widest inline-block">
          #### {about.techStack.title}
        </h4>
        <div className="space-y-6">
          <div className="flex items-center justify-between tracking-[0.2em]">
            <span>{about.techStack.encryption.split(":")[0]}:</span>
            <span className="text-[#00FFCC]">
              {about.techStack.encryption.split(":")[1]?.trim() || ""}
            </span>
          </div>
          <div className="flex items-center justify-between tracking-[0.2em]">
            <span>{about.techStack.signature.split(":")[0]}:</span>
            <span className="text-[#00FFCC]">
              {about.techStack.signature.split(":")[1]?.trim() || ""}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
