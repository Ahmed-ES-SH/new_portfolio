"use client";
import { useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { skills } from "@/constants/skillsContent";
import { useLocale } from "@/app/hooks/useLocale";

export default function SkillsBackGround() {
  const locale = useLocale();
  const rows = useMemo(() => Array.from({ length: 12 }), []);

  return (
    <div className="fixed inset-0 z-0 flex flex-col justify-around overflow-hidden opacity-20 pointer-events-none select-none">
      {rows.map((_, rowIndex) => {
        const isReverse = rowIndex % 2 !== 0;
        const duration = 60 + (rowIndex % 4) * 15;

        return (
          <div key={rowIndex} className="w-full -rotate-[4deg] scale-[1.1]">
            <motion.div
              initial={{ x: isReverse ? "-20%" : "0%" }}
              animate={{ x: isReverse ? "0%" : "-20%" }}
              transition={{ duration, repeat: Infinity, ease: "linear" }}
              className="flex gap-12 md:gap-20 whitespace-nowrap will-change-transform w-max"
            >
              {skills.map((skill, i) => (
                <div key={i} className="flex items-center gap-4">
                  <Image
                    src={skill.icon}
                    alt={skill.title[locale]}
                    className="w-12 h-12 md:w-16 md:h-16 object-contain grayscale opacity-50"
                    width={64}
                    height={64}
                  />
                  <span className="text-white text-3xl md:text-5xl font-black uppercase opacity-30">
                    {skill.title[locale]}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
