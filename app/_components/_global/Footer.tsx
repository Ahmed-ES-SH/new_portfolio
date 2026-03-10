"use client";

import React from "react";
import Link from "next/link";
import { useTranslation } from "@/app/hooks/useTranslation";

export function Footer() {
  const { footer } = useTranslation("global");

  return (
    <footer className="px-6 md:px-10 py-10 max-lg:pb-24 border-t-2 border-primary/30 bg-black backdrop-blur-lg relative z-50 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex gap-8 md:gap-12 flex-wrap justify-center">
          <Link
            className="text-[10px] uppercase tracking-[0.3em] text-primary/70 hover:text-(--color-primary) font-bold transition-colors"
            href="https://github.com/Ahmed-ES-SH"
            target="_blank"
          >
            {footer.github}
          </Link>
          <Link
            className="text-[10px] uppercase tracking-[0.3em] text-primary/70 hover:text-(--color-primary) font-bold transition-colors"
            href="https://www.linkedin.com/in/ahmed-ismail-9849b0294"
            target="_blank"
          >
            {footer.linkedin}
          </Link>
        </div>

        <div className="h-px flex-1 bg-primary/10 mx-8 hidden md:block"></div>

        <p className="text-[10px] uppercase tracking-[0.2em] text-primary/40 font-mono text-center md:text-right">
          {new Date().getFullYear()} {footer.copyright}
        </p>
      </div>
    </footer>
  );
}
