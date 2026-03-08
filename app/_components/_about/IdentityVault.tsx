"use client";

import { useTranslation } from "@/app/hooks/useTranslation";
import { useEffect, useState } from "react";

export function IdentityVault() {
  const about = useTranslation("about");
  const [uptime, setUptime] = useState("0000:00:00:00");

  useEffect(() => {
    const startObj = new Date("2024-01-01T00:00:00").getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = now - startObj;
      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
        .toString()
        .padStart(4, "0");
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      )
        .toString()
        .padStart(2, "0");
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
        .toString()
        .padStart(2, "0");
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)
        .toString()
        .padStart(2, "0");
      setUptime(`${days}:${hours}:${minutes}:${seconds}`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col h-full space-y-8 font-mono text-[10px] sm:text-xs tracking-[0.2em] text-[#6B7280]">
      <h3 className="text-white font-bold uppercase inline-block mb-4 tracking-widest">
        ## {about.identityVault}
      </h3>

      <ul className="space-y-6 uppercase flex flex-col items-start w-full">
        {["root", "projects", "aboutMe", "contact"].map((key) => {
          const label = (about.nav as Record<string, string>)[key] || key;
          return (
            <li key={key} className="w-full">
              <a
                href={key === "root" ? "/" : `#${key}`}
                className="inline-block hover:text-[#00FFCC] transition-colors cursor-crosshair w-fit"
              >
                <span className="text-[#00FFCC] opacity-50 mr-2">_</span>
                {label}
              </a>
            </li>
          );
        })}
      </ul>

      <div className="absolute bottom-0 left-0 flex items-center text-[#6B7280]">
        <span className="text-[#00FFCC] animate-pulse inline-block mr-2 text-[8px]">
          *
        </span>
        {about.uptime.replace("{time}", uptime)}
      </div>
    </div>
  );
}
