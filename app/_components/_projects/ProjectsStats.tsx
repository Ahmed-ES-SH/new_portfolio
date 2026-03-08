"use client";

import { useTranslation } from "@/app/hooks/useTranslation";
import { Atom, Cpu, Database } from "lucide-react";

export default function ProjectsStats() {
  const t = useTranslation("projects");

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      {/* Active Nodes */}
      <div className="bg-slate-900/50 border border-primary/30 p-6 flex flex-col gap-1 relative overflow-hidden group hover:border-primary/60 transition-colors">
        <div className="absolute top-0 ltr:right-0 rtl:left-0 p-2 opacity-20 text-primary group-hover:opacity-100 transition-opacity">
          <span className="material-symbols-outlined">
            <Atom />
          </span>
        </div>
        <p className="text-slate-500 text-xs font-bold tracking-widest uppercase">
          {t.stats.activeNodes.label}
        </p>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-black text-slate-100">
            {t.stats.activeNodes.value}
          </span>
          <span className="text-emerald-500 text-xs font-bold">
            {t.stats.activeNodes.status}
          </span>
        </div>
        <div className="w-full bg-slate-800 h-1 mt-2">
          <div className="bg-primary h-full w-[85%]"></div>
        </div>
      </div>

      {/* System Load */}
      <div className="bg-slate-900/50 border border-primary/30 p-6 flex flex-col gap-1 relative overflow-hidden group hover:border-primary/60 transition-colors">
        <div className="absolute top-0 ltr:right-0 rtl:left-0 p-2 opacity-20 text-primary group-hover:opacity-100 transition-opacity">
          <Cpu />
        </div>
        <p className="text-slate-500 text-xs font-bold tracking-widest uppercase">
          {t.stats.systemLoad.label}
        </p>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-black text-slate-100">
            {t.stats.systemLoad.value}
          </span>
          <span className="text-amber-500 text-xs font-bold">
            {t.stats.systemLoad.status}
          </span>
        </div>
        <div className="w-full bg-slate-800 h-1 mt-2">
          <div className="bg-primary h-full w-[42%]"></div>
        </div>
      </div>

      {/* Uptime Metric */}
      <div className="bg-slate-900/50 border border-primary/30 p-6 flex flex-col gap-1 relative overflow-hidden group hover:border-primary/60 transition-colors">
        <div className="absolute top-0 ltr:right-0 rtl:left-0 p-2 opacity-20 text-primary group-hover:opacity-100 transition-opacity">
          <Database />
        </div>
        <p className="text-slate-500 text-xs font-bold tracking-widest uppercase">
          {t.stats.uptimeMetric.label}
        </p>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-black text-slate-100">
            {t.stats.uptimeMetric.value}
          </span>
          <span className="text-emerald-500 text-xs font-bold">
            {t.stats.uptimeMetric.status}
          </span>
        </div>
        <div className="w-full bg-slate-800 h-1 mt-2">
          <div className="bg-primary h-full w-[99%]"></div>
        </div>
      </div>
    </div>
  );
}
