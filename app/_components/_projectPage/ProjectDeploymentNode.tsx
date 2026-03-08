"use client";

import { useTranslation } from "@/app/hooks/useTranslation";
import Image from "next/image";

export default function ProjectDeploymentNode() {
  const t = useTranslation("projectDetail");

  return (
    <div className="terminal-module">
      <div className="bg-terminal-border px-4 py-1">
        <h3 className="font-mono text-xs font-bold text-primary uppercase">
          {t.sections.deploymentNode}
        </h3>
      </div>
      <div className="relative h-48 w-full bg-background-dark overflow-hidden">
        <Image
          src="/map-satlaid.webp" // Assuming a generic map or abstract cyber background
          alt="Satellite Map View"
          fill
          className="absolute inset-0 object-cover opacity-40 mix-blend-screen"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="size-24 rounded-full border border-primary/30 flex items-center justify-center animate-pulse">
            <div className="size-4 bg-primary rounded-full shadow-[0_0_15px_rgba(0,242,255,0.8)]"></div>
          </div>
        </div>
        <div className="absolute bottom-2 left-2 bg-background-dark/80 px-2 py-1 border border-primary/20">
          <p className="font-mono text-[9px] text-primary">
            REGION: GLOBAL_NODE
          </p>
        </div>
      </div>
      <div className="p-4 space-y-2 font-mono text-[10px]">
        <div className="flex justify-between border-b border-terminal-border/30 pb-1">
          <span className="text-slate-500 uppercase">
            {t.deployment.coordinations}
          </span>
          <span className="text-white">ENCRYPTED_LOC</span>
        </div>
        <div className="flex justify-between border-b border-terminal-border/30 pb-1">
          <span className="text-slate-500 uppercase">
            {t.deployment.deploymentDate}
          </span>
          <span className="text-white">ACTIVE_STATE</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500 uppercase">
            {t.deployment.encryption}
          </span>
          <span className="text-primary font-bold uppercase">
            AES-4096_VALID
          </span>
        </div>
      </div>
    </div>
  );
}
