"use client";

import { useTranslation } from "@/app/hooks/useTranslation";

export function ModulesSidebar() {
  const aboutTranslations = useTranslation("about");

  const coreCompetencies = [
    {
      id: "NEURAL_UI_ARCH",
      desc: "Cognitive load optimization for mission-critical interfaces.",
    },
    {
      id: "KINETIC_SYSTEMS",
      desc: "Fluid state transitions and procedural motion design.",
    },
    {
      id: "VOID_RELIABILITY",
      desc: "Fault-tolerant frontend architectures in offline sectors.",
    },
    {
      id: "DATA_SYNTHESIS",
      desc: "Complex dataset visualization and pattern extraction.",
    },
  ];

  const techStack = ["NEXT", "REACT", "LARAVEL", "NEST", "EXPRESS", "NODE"];

  return (
    <aside className="hidden xl:flex flex-none w-80 flex-col z-20">
      <div className="border border-primary/30 bg-background-dark/80 backdrop-blur-sm h-full flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-primary/20">
          <h3 className="text-white text-xs font-bold tracking-[0.2em] uppercase">
            {aboutTranslations.sidebarRight?.specializedModules ||
              "Specialized_Modules"}
          </h3>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
          {/* Core Competencies */}
          <div className="space-y-4">
            <h4 className="text-primary text-[10px] font-bold tracking-widest uppercase border-l-2 border-primary pl-2">
              {aboutTranslations.coreCompetencies.title}
            </h4>
            <ul className="text-[11px] font-mono space-y-3 text-slate-300">
              {coreCompetencies.map((item, idx) => (
                <li key={idx} className="flex gap-2">
                  <span className="text-primary">&gt;</span>
                  <div>
                    <p className="font-bold">{item.id}</p>
                    <p className="text-[9px] text-slate-500 mt-1">
                      {item.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack Grid */}
          <div className="space-y-4 pt-2">
            <h4 className="text-primary text-[10px] font-bold tracking-widest uppercase border-l-2 border-primary pl-2">
              {aboutTranslations.techStack?.title || "Tech_Stack_V.2"}
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {techStack.map((tech) => (
                <div
                  key={tech}
                  className="border border-primary/20 bg-primary/5 p-3 text-center transition-colors hover:bg-primary/20 cursor-default"
                >
                  <span className="text-[10px] font-mono text-slate-100">
                    {tech}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Live Telemetry */}
          <div className="space-y-4 pt-2">
            <h4 className="text-primary text-[10px] font-bold tracking-widest uppercase border-l-2 border-primary pl-2">
              {aboutTranslations.sidebarRight?.liveTelemetry ||
                "Live_Telemetry"}
            </h4>
            <div className="space-y-2 font-mono">
              <div className="flex justify-between text-[9px] text-slate-500">
                <span>
                  {aboutTranslations.sidebarRight?.syncRate || "SYNC_RATE"}
                </span>
                <span className="text-primary">100%</span>
              </div>
              <div className="flex justify-between text-[9px] text-slate-500">
                <span>
                  {aboutTranslations.sidebarRight?.gridCoord || "GRID_COORD"}
                </span>
                <span className="text-primary">34.0522° N</span>
              </div>
              <div className="flex justify-between text-[9px] text-slate-500">
                <span>
                  {aboutTranslations.techStack?.encryption.split(":")[0] ||
                    "ENCRYPTION"}
                </span>
                <span className="text-primary">AES-256</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
