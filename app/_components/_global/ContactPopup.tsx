"use client";
import useVariablesContext from "@/app/context/VariablesContext";
import { AnimatePresence, motion } from "framer-motion";
import { File, Mail, MessageSquare, ShieldCheck, X } from "lucide-react";
import { useMemo } from "react";
import { createPortal } from "react-dom";
import ContactSlide from "./_contactPopup/ContactSlide";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

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

            {/* Content Swiper */}
            <div className="relative group/swiper pt-8 px-1">
              <Swiper
                modules={[Autoplay, Pagination, Navigation]}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                spaceBetween={20}
                slidesPerView={1}
                breakpoints={{
                  768: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                  },
                  1200: {
                    slidesPerView: 3,
                    spaceBetween: 40,
                  },
                }}
                pagination={{
                  clickable: true,
                  dynamicBullets: true,
                }}
                navigation={{
                  prevEl: ".swiper-button-prev-custom",
                  nextEl: ".swiper-button-next-custom",
                }}
                className="p-8 md:p-12 !pb-16 relative z-10"
              >
                {contactOptions.map((opt) => (
                  <SwiperSlide key={opt.id}>
                    <ContactSlide
                      opt={opt}
                      onClick={() => setIsPopupOpen(false)}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Custom Navigation Buttons - Visible only when 1 slide is shown (mobile) */}
              <button className="swiper-button-prev-custom absolute left-2 top-1/2 -translate-y-1/2 z-20 size-10 flex items-center justify-center bg-black/50 border border-primary/30 text-primary hover:bg-primary/20 transition-all rounded-full md:hidden">
                <ChevronLeft className="size-6" />
              </button>
              <button className="swiper-button-next-custom absolute right-2 top-1/2 -translate-y-1/2 z-20 size-10 flex items-center justify-center bg-black/50 border border-primary/30 text-primary hover:bg-primary/20 transition-all rounded-full md:hidden">
                <ChevronRight className="size-6" />
              </button>
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
