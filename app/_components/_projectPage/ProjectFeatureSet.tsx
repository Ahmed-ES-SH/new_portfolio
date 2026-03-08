"use client";

import { useTranslation } from "@/app/hooks/useTranslation";
import { Shield, Zap, Network, EyeOff } from "lucide-react";

export default function ProjectFeatureSet() {
  const t = useTranslation("projectDetail");

  const features = [
    {
      icon: <Shield className="text-primary size-5" />,
      title: "Encrypted Core",
      desc: "AES-512 bit neural encryption for all data transit.",
    },
    {
      icon: <Zap className="text-primary size-5" />,
      title: "Overclock Capability",
      desc: "Bypass hardware limits for emergency computations.",
    },
    {
      icon: <Network className="text-primary size-5" />,
      title: "Mesh Sync",
      desc: "Autonomous synchronization with local network nodes.",
    },
    {
      icon: <EyeOff className="text-primary size-5" />,
      title: "Ghost Mode",
      desc: "Deep-packet stealth masking for undetected ops.",
    },
  ];

  return (
    <div className="terminal-module">
      <div className="bg-terminal-border px-4 py-1">
        <h3 className="font-mono text-xs font-bold text-primary uppercase">
          {t.sections.featureSet}
        </h3>
      </div>
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feat, idx) => (
          <div key={idx} className="flex gap-3">
            <div className="shrink-0 pt-0.5">{feat.icon}</div>
            <div>
              <h4 className="font-mono text-sm font-bold text-white uppercase">
                {feat.title}
              </h4>
              <p className="text-xs text-slate-400 mt-1">{feat.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
