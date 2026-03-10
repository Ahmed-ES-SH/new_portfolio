"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";

const cardVariants = {
  hidden: { opacity: 0, x: 20, scale: 0.9 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.35 },
  },
};

interface GlitchSidebarProps {
  sidebarImages: string[];
  totalImagesCount: number;
  halfIndex: number;
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
}

export default function GlitchSidebar({
  sidebarImages,
  totalImagesCount,
  halfIndex,
  activeIndex,
  setActiveIndex,
}: GlitchSidebarProps) {
  return (
    <div className="w-full lg:w-72 max-lg:hidden bg-background-dark/50 flex flex-col shrink-0">
      {/* Sidebar Header */}
      <div className="p-4 border-b border-primary/20 flex justify-between items-center bg-primary/10 shrink-0">
        <span className="text-xs font-bold text-primary tracking-widest uppercase">
          Asset_Inventory
        </span>
        <span className="text-[10px] font-mono text-primary/60">
          {sidebarImages.length < 10
            ? `0${sidebarImages.length}`
            : sidebarImages.length}
          /{totalImagesCount < 10 ? `0${totalImagesCount}` : totalImagesCount}{" "}
          ITEMS
        </span>
      </div>

      {/* Sidebar Swiper (vertical on desktop, horizontal on mobile) */}
      <div className="flex-1 overflow-hidden p-4">
        <Swiper
          modules={[FreeMode, Autoplay]}
          freeMode={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: true,
          }}
          direction="vertical"
          slidesPerView="auto"
          spaceBetween={16}
          className="w-full h-full hidden-scrollbar"
          style={{ height: "100%" }}
        >
          {sidebarImages.map((img, sidebarIdx) => {
            const globalIdx = halfIndex + sidebarIdx;
            return (
              <SwiperSlide
                key={`sidebar-${sidebarIdx}`}
                style={{ height: "auto" }}
              >
                <motion.div
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.3 + sidebarIdx * 0.12 }}
                  onClick={() => setActiveIndex(globalIdx)}
                  className={`relative group cursor-pointer border p-1 bg-black/40 hover:border-primary transition-all ${
                    activeIndex === globalIdx
                      ? "border-primary/40"
                      : "border-primary/20"
                  }`}
                >
                  <div className="aspect-video bg-primary/20 overflow-hidden relative">
                    <Image
                      src={img}
                      alt={`Data Chip ${sidebarIdx + 1}`}
                      fill
                      className={`object-cover transition-all ${
                        activeIndex === globalIdx
                          ? "opacity-80 group-hover:opacity-100 group-hover:scale-105"
                          : "opacity-50 group-hover:opacity-100"
                      }`}
                    />
                    {activeIndex === globalIdx && (
                      <div className="absolute inset-0 border-2 border-primary scale-95 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all pointer-events-none"></div>
                    )}
                  </div>
                  <div className="mt-1 flex justify-between items-center px-1">
                    <span
                      className={`text-[9px] font-mono uppercase ${
                        activeIndex === globalIdx
                          ? "text-primary/70"
                          : "text-primary/40"
                      }`}
                    >
                      DATA_CHIP_0{sidebarIdx + 1}
                    </span>
                    {activeIndex === globalIdx && (
                      <span className="material-symbols-outlined text-[12px] text-primary">
                        check_circle
                      </span>
                    )}
                  </div>
                </motion.div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      {/* Download Button */}
      <div className="p-4 border-t border-primary/20 bg-primary/5 shrink-0">
        <button className="w-full py-2 bg-primary/20 border border-primary text-primary text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2">
          <span className="material-symbols-outlined text-sm">download</span>
          Download_All
        </button>
      </div>
    </div>
  );
}
