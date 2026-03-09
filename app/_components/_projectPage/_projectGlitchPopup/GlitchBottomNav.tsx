"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";

const itemVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.85 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.3 },
  },
};

interface GlitchBottomNavProps {
  bottomImages: string[];
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
}

export default function GlitchBottomNav({
  bottomImages,
  activeIndex,
  setActiveIndex,
}: GlitchBottomNavProps) {
  return (
    <div className="w-full px-4 py-3 shrink-0 border-t border-primary/20">
      <Swiper
        modules={[FreeMode, Autoplay]}
        freeMode={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: true,
        }}
        slidesPerView="auto"
        spaceBetween={12}
        className="w-full"
      >
        {bottomImages.map((img, idx) => (
          <SwiperSlide key={`bottom-${idx}`} style={{ width: "auto" }}>
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              custom={idx}
              transition={{ delay: 0.2 + idx * 0.1 }}
              onClick={() => setActiveIndex(idx)}
              className={`w-24 aspect-video border cursor-pointer transition-all overflow-hidden relative ${
                activeIndex === idx
                  ? "border-2 border-primary shadow-[0_0_10px_var(--color-primary)]"
                  : "border-primary/30 opacity-60 hover:opacity-100 hover:border-primary/60"
              }`}
            >
              <Image
                src={img}
                alt={`Asset ${idx + 1}`}
                fill
                className="object-cover"
              />
              {activeIndex === idx && (
                <div className="absolute inset-0 bg-primary/20 pointer-events-none"></div>
              )}
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
