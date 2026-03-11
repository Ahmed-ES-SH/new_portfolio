"use client";
import useVariablesContext from "@/app/context/VariablesContext";
import { AnimatePresence, motion } from "framer-motion";
import {
  ExternalLink,
  File,
  Mail,
  MessageSquare,
  ShieldCheck,
  X,
} from "lucide-react";
import Image from "next/image";
import { useMemo } from "react";
import { createPortal } from "react-dom";

// Glitch particle generator for entrance
function generateGlitchParticles(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    top: `${Math.random() * 80 + 10}%`,
    left: `${Math.random() * 80 + 10}%`,
    width: `${30 + Math.random() * 10}%`,
    height: `${2 + Math.random() * 10}%`,
    delay: i * 0.05,
    xShift: (Math.random() - 0.5) * 40,
  }));
}

export default function ContactPopup() {
  const { isPopupOpen, setIsPopupOpen } = useVariablesContext();

  const particles = useMemo(() => generateGlitchParticles(20), []);

  const contactOptions = [
    {
      id: "whatsapp",
      label: "WHATSAPP_COMMS",
      subLabel: "DIRECT_ENCRYPTED_LINE",
      icon: <MessageSquare className="size-5" />,
      image: "/whatsapp.webp",
      color: "var(--color-primary)",
      link: "https://wa.me/+201017539419",
      shadow: "shadow-[0_0_20px_rgba(0,245,228,0.3)]",
    },
    {
      id: "gmail",
      label: "SECURE_MAIL",
      subLabel: "BUSINESS_INQUIRIES",
      icon: <Mail className="size-5" />,
      image: "/gmail.webp",
      color: "#ff4d4d",
      link: "mailto:ahmedismaildev6@gmail.com",
      shadow: "shadow-[0_0_20px_rgba(255,77,77,0.3)]",
    },
    {
      id: "cv",
      label: "DOWNLOAD_CV",
      subLabel: "MY_RESUME",
      icon: <File className="size-5" />,
      image: "/cv_icon.webp",
      color: "#00f0ff",
      link: "/Ahmed-Ismail-Resume.pdf",
      shadow: "shadow-[0_0_20px_rgba(0,240,255,0.3)]",
    },
  ];

  if (typeof window === "undefined") return null;

  const portalTarget = document.body;

  const content = (
    <AnimatePresence>
      {isPopupOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed w-full h-screen z-99999999 inset-0 flex items-center justify-center p-4"
        >
          {/* Localized Grid Transition Effect */}

          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setIsPopupOpen(false);
            }}
            className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Container */}

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative  w-full max-w-4xl bg-[#050a0f] border border-primary/30 p-1 overflow-hidden"
          >
            {/* Corner Accents */}
            <div className="absolute top-0 left-0 size-8 border-t-2 border-l-2 border-primary"></div>
            <div className="absolute bottom-0 right-0 size-8 border-b-2 border-r-2 border-primary"></div>

            {/* Entrance Glitch Wash */}
            <motion.div
              initial={{ opacity: 0.8 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="absolute inset-0 bg-primary/20 pointer-events-none z-50 mix-blend-overlay"
              style={{
                background:
                  "repeating-linear-gradient(0deg, transparent, transparent 2px, var(--color-primary) 2px, var(--color-primary) 3px)",
              }}
            />

            {/* Glitch Particles */}
            {particles.map((p) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, x: p.xShift }}
                animate={{
                  opacity: [0, 1, 0],
                  x: [p.xShift, -p.xShift, 0],
                  scaleX: [1.5, 0.8, 1],
                }}
                transition={{ duration: 0.4, delay: p.delay }}
                className="absolute bg-primary/40 pointer-events-none z-50"
                style={{
                  top: p.top,
                  left: p.left,
                  width: p.width,
                  height: p.height,
                }}
              />
            ))}

            {/* Header */}
            <div className="bg-primary/10 p-4 border-b border-primary/20 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <ShieldCheck className="size-4 text-primary animate-pulse" />
                <span className="md:text-[10px] text-[8px] uppercase  tracking-widest text-primary/80">
                  SECURE_COMMUNICATION_LINK // ESTABLISHED
                </span>
              </div>
              <button
                onClick={() => {
                  setIsPopupOpen(false);
                }}
                className="text-primary/60 hover:text-primary transition-colors cursor-pointer"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-8 max-h-[70vh] overflow-y-auto hidden-scrollbar md:p-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 relative z-10">
              {contactOptions.map((opt) => (
                <motion.a
                  key={opt.id}
                  href={opt.link}
                  target="_blank"
                  onClick={() => {
                    setIsPopupOpen(false);
                  }}
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
              ))}
            </div>

            {/* Footer Decoration */}
            <div className="p-2 bg-primary/5 border-t border-white/5 flex justify-center">
              <div className="text-[8px]  text-white/20 tracking-[0.5em] uppercase">
                Ahmed Ismail // Digital Presence // 2024
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(content, portalTarget);
}
