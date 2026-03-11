"use client";

import { useTranslation } from "@/app/hooks/useTranslation";
import { useMemo } from "react";

export function NetworkSidebar() {
  const aboutTranslations = useTranslation("about");

  const feedItems = useMemo(
    () => [
      {
        time: "09:42:12",
        action: "INITIALIZING_CORE_LINK...",
        desc: "Handshake established with regional node SF_HUB_01. Latency nominal at 12ms. All security protocols verified.",
        alert: false,
      },
      {
        time: "09:44:05",
        action: "DATA_PACKET_RECEIVED",
        desc: "Incoming architectural schematics for project 'NEURAL_INTERFACE_V2'. Synchronizing local cache with remote repository.",
        alert: false,
      },
      {
        time: "10:02:18",
        action: "SYSTEM_ALERT",
        desc: "Background process 'VOID_SCAN' has detected unauthorized query attempts on sub-sector 7G. Countermeasures deployed.",
        alert: true,
      },
      {
        time: "10:15:33",
        action: "COMPILING_MODULES...",
        desc: "Optimization of kinetic UI components complete. Resource allocation adjusted for high-load rendering tasks.",
        alert: false,
      },
      {
        time: "11:20:01",
        action: "UPTIME_VERIFICATION",
        desc: "Continuous operation cycle: 1042 hours. Thermal levels within threshold 0.45. Heartbeat signal: STEADY.",
        alert: false,
      },
    ],
    [],
  );

  return (
    <aside className="hidden lg:flex flex-none w-80 flex-col gap-4 z-20">
      <div className="border border-primary/30 bg-background-dark/80 backdrop-blur-sm p-4 h-full flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 border-b border-primary/20 pb-2">
          <span className="text-[10px] text-primary  font-bold tracking-[0.2em] uppercase">
            {aboutTranslations.sidebarLeft?.networkStatus ||
              "NETWORK_STATUS_FEED"}
          </span>
          <span className="material-symbols-outlined text-primary text-sm animate-pulse">
            sensors
          </span>
        </div>

        {/* Feed List */}
        <div className="flex-1 overflow-y-auto space-y-4  text-[10px] pr-2 custom-scrollbar">
          {feedItems.map((item, idx) => (
            <div
              key={idx}
              className={`space-y-1 ${item.alert ? "border-l border-primary/40 pl-2 bg-primary/5 py-1" : ""}`}
            >
              <p className="text-primary/40">
                [{item.time}] {item.action}
              </p>
              <p className={item.alert ? "text-primary" : "text-slate-400"}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Bandwidth Usage */}
        <div className="mt-4 pt-2 border-t border-primary/20">
          <div className="flex justify-between items-center text-[9px] text-primary/60 ">
            <span>
              {aboutTranslations.sidebarLeft?.bandwidthUsage ||
                "BANDWIDTH_USAGE"}
            </span>
            <span>84.2 GB/s</span>
          </div>
          <div className="h-1 bg-primary/10 mt-1 relative overflow-hidden">
            <div className="absolute top-0 left-0 h-full bg-primary/60 w-2/3 shadow-[0_0_5px_#00f2ff] animate-[pulse_2s_ease-in-out_infinite]"></div>
          </div>
        </div>
      </div>
    </aside>
  );
}
