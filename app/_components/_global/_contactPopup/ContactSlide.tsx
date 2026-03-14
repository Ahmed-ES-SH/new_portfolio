"use client";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Image from "next/image";

type opt = {
  id: string;
  label: string;
  subLabel: string;
  link: string;
  image: string;
  shadow: string;
};

interface ContactSlideProps {
  opt: opt;
  onClick: () => void;
}

export default function ContactSlide({ opt, onClick }: ContactSlideProps) {
  return (
    <motion.a
      key={opt.id}
      href={opt.link}
      target="_blank"
      onClick={onClick}
      download={opt.id === "cv" && "Ahmed-Ismail-Resume.pdf"}
      rel="noopener noreferrer"
      whileHover={{ scale: 1.02 }}
      className={`relative group bg-slate-900/50 border border-white/10 p-6 flex flex-col items-center text-center transition-all duration-300 hover:border-primary/50 ${opt.shadow}`}
    >
      {/* Hover Scanline */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity bg-linear-to-b from-primary transparent to-primary pointer-events-none"></div>

      <div className="mb-4 relative size-12 md:size-16 xl:size-24">
        <Image
          src={opt.image}
          alt={opt.id}
          fill
          className="object-contain drop-shadow-2xl brightness-90 group-hover:brightness-110 transition-all"
        />
      </div>

      <div className="space-y-1">
        <div className="text-[10px]  text-primary/40 tracking-tighter">
          {opt.subLabel}
        </div>
        <h3 className="text-sm md:text-base font-black tracking-widest text-white group-hover:text-primary transition-colors">
          {opt.label}
        </h3>
      </div>

      <div className="mt-6 flex items-center gap-2 text-[10px]  text-white/50 border-t border-white/5 pt-4 w-full justify-center">
        <ExternalLink className="size-3" />
        <span>INITIALIZE_SESSION</span>
      </div>
    </motion.a>
  );
}
