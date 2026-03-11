"use client";

import { useTranslation } from "@/app/hooks/useTranslation";

export function CoreCompetencies() {
  const about = useTranslation("about");

  return (
    <div className="flex flex-col h-full  relative">
      <h3 className="text-white font-bold mb-12 text-[10px] sm:text-xs uppercase tracking-widest">
        #### {about.coreCompetencies.title}
      </h3>

      <ul className="space-y-8 text-[10px] sm:text-xs text-[#6B7280] tracking-[0.2em] uppercase flex-1">
        {about.coreCompetencies.items.map((comp: string, idx: number) => (
          <li
            key={idx}
            className="flex items-center gap-x-4 rtl:gap-x-reverse group"
          >
            <span className="text-[#6B7280] group-hover:text-[#00FFCC] transition-colors">
              &gt;
            </span>
            <span className="group-hover:text-white transition-colors cursor-crosshair">
              {comp}
            </span>
          </li>
        ))}
      </ul>

      <div className="absolute bottom-0 right-0 max-w-[200px] text-[8px] sm:text-[9px] text-[#6B7280] tracking-widest leading-loose">
        <p className="opacity-70">{about.statusScan}</p>
      </div>
    </div>
  );
}
