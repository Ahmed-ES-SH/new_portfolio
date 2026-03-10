"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "@/app/hooks/useTranslation";

export function AboutFooter() {
  const aboutTranslations = useTranslation("about");

  // Client-side clock
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", { hour12: false }));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="fixed bottom-0 w-full flex items-center justify-between  bg-background-dark/90 px-4 lg:px-10 py-3 z-50 text-slate-100">

      {/* Left Data Section */}
      <div className="flex gap-4 lg:gap-10">
        <div className="flex flex-col">
          <span className="text-[9px] text-slate-500 uppercase tracking-widest font-mono">
            {aboutTranslations.footer?.currentSector || "Current_Sector"}
          </span>
          <span className="text-[10px] text-primary font-mono truncate">
            {aboutTranslations.footer?.sectorValue || "SAN_FRANCISCO_HUB_01"}
          </span>
        </div>

        <div className="flex flex-col border-l border-primary/20 pl-4 lg:pl-10">
          <span className="text-[9px] text-slate-500 uppercase tracking-widest font-mono">
            {aboutTranslations.footer?.kernelVersion || "Kernel_Version"}
          </span>
          <span className="text-[10px] text-primary font-mono tracking-widest truncate">
            {aboutTranslations.footer?.kernelValue || "OS_VER_8.1.1.0"}
          </span>
        </div>
      </div>



    </footer>
  );
}
