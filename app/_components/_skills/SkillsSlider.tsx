"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { skills } from "@/constants/skillsContent";
import { useLocale } from "@/app/hooks/useLocale";

export default function SkillsSlider() {
  const locale = useLocale();
  const isArabic = locale === "ar";
  return (
    <section className="relative opacity-80 overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-r from-black via-transparent to-black z-10 pointer-events-none" />
      <motion.div
        dir="ltr"
        animate={{ x: isArabic ? ["0%", "50%"] : ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="flex gap-8 whitespace-nowrap"
      >
        {[...skills, ...skills].map((skill, i) => (
          <div
            key={i}
            className="flex items-center gap-3 px-6 py-3 rounded-full"
          >
            <Image
              src={skill.icon}
              alt={skill.title[locale as "en" | "ar"]}
              className="w-8 h-8 object-contain"
              width={1024}
              height={1980}
            />
            <span className="text-white font-medium">
              {skill.title[locale as "en" | "ar"]}
            </span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
