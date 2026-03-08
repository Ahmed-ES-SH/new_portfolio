"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SkillCard } from "./SkillCard";

type Locale = "en" | "ar";

// Using the exact structure from the constants
interface SkillData {
  icon: string;
  title: Record<Locale, string>;
  desc: Record<Locale, string>;
}

interface SkillsTabsProps {
  locale: Locale;
  translations: {
    frontend: string;
    backend: string;
    tools: string;
  };
  data: {
    frontend: SkillData[];
    backend: SkillData[];
    tools: SkillData[];
  };
}

type TabKey = "frontend" | "backend" | "tools";

export const SkillsTabs = ({ locale, translations, data }: SkillsTabsProps) => {
  const [activeTab, setActiveTab] = useState<TabKey>("frontend");

  const tabs: { id: TabKey; label: string }[] = [
    { id: "frontend", label: translations.frontend },
    { id: "backend", label: translations.backend },
    { id: "tools", label: translations.tools },
  ];

  return (
    <div className="w-full">
      {/* Tabs Navigation */}
      <div className="flex flex-wrap items-center gap-4 md:gap-8 mb-12 border-b border-(--color-grid-blue,rgba(0,240,255,0.2)) pb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative text-lg md:text-2xl font-bold uppercase tracking-widest whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? "text-(--primary,#00f0ff) neon-text"
                : "text-slate-500 hover:text-slate-300"
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTabUnderline"
                className="absolute -bottom-[17px] left-0 right-0 h-[2px] bg-(--primary,#00f0ff) shadow-[0_0_12px_var(--primary,#00f0ff),0_0_20px_rgba(0,240,255,0.5)]"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        ))}
        {/* Decorative Glow Line extending the rest of the way */}
        <div className="grow h-[2px] bg-linear-to-r from-(--primary,#00f0ff) to-transparent opacity-20 hidden md:block" />
      </div>

      {/* Tab Content Grid */}
      <div className="min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6"
          >
            {data[activeTab].map((skill, idx) => (
              <motion.div
                key={`${skill.title.en}-${idx}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, delay: idx * 0.05 }}
                className="h-full"
              >
                <SkillCard skill={skill} locale={locale} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
