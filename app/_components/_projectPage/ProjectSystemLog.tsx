"use client";

import { useTranslation } from "@/app/hooks/useTranslation";
import { useEffect, useState } from "react";

export default function ProjectSystemLog() {
  const t = useTranslation("projectDetail");
  const [logs, setLogs] = useState<string[]>([
    "[12:04:22] AUTH_SUCCESS: USER_ROOT_404",
    "[12:04:25] PULLING ASSETS FROM SECTOR_7...",
  ]);

  useEffect(() => {
    const sequence = [
      { delay: 1000, msg: "[12:05:01] CACHE_HIT: NEON_VALKYRIE_V8" },
      { delay: 2500, msg: "WARNING: PACKET LOSS IN SUB-GRID B", warn: true },
      { delay: 4000, msg: "[12:06:12] RE-ESTABLISHING NEURAL LINK..." },
      { delay: 5000, msg: "[12:06:15] LINK_STABLE. PROCEED." },
    ];

    const timeouts: NodeJS.Timeout[] = [];

    sequence.forEach((item) => {
      const timeout = setTimeout(() => {
        setLogs((prev) => [
          ...prev,
          item.warn ? `[WARN] ${item.msg}` : item.msg,
        ]);
      }, item.delay);
      timeouts.push(timeout);
    });

    return () => timeouts.forEach(clearTimeout);
  }, []);

  return (
    <div className="terminal-module flex-1">
      <div className="bg-terminal-border px-4 py-1">
        <h3 className=" text-xs font-bold text-primary uppercase">
          {t.sections.systemLog}
        </h3>
      </div>
      <div className="p-4  text-[10px] text-slate-500 overflow-y-auto max-h-64 space-y-2">
        {logs.map((log, idx) => (
          <p key={idx}>
            {log.includes("[WARN]") ? (
              <span className="text-red-500/80">{log}</span>
            ) : (
              <>
                <span className="text-primary/50">{log.split(" ")[0]} </span>
                {log.substring(log.indexOf(" ") + 1)}
              </>
            )}
          </p>
        ))}
        <div className="w-1 h-3 bg-primary animate-pulse inline-block mt-2"></div>
      </div>
    </div>
  );
}
