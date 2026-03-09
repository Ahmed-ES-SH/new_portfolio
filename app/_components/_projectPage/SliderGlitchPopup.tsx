"use client";

import { useEffect, useState, useMemo } from "react";
import { createPortal } from "react-dom";

import GlitchHeader from "./_projectGlitchPopup/GlitchHeader";
import GlitchImageViewer from "./_projectGlitchPopup/GlitchImageViewer";
import GlitchBottomNav from "./_projectGlitchPopup/GlitchBottomNav";
import GlitchSidebar from "./_projectGlitchPopup/GlitchSidebar";
import GlitchFooter from "./_projectGlitchPopup/GlitchFooter";

interface SliderGlitchPopupProps {
  images: string[];
  isOpen: boolean;
  onClose: () => void;
}

export default function SliderGlitchPopup({
  images,
  isOpen,
  onClose,
}: SliderGlitchPopupProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Split images: first half → bottom nav, second half → sidebar
  const halfIndex = useMemo(
    () => Math.ceil(images.length / 2),
    [images.length],
  );
  const bottomImages = useMemo(
    () => images.slice(0, halfIndex),
    [images, halfIndex],
  );
  const sidebarImages = useMemo(
    () => images.slice(halfIndex),
    [images, halfIndex],
  );

  // Lock body scroll when open and scroll to top
  useEffect(() => {
    if (isOpen) {
      window.scrollTo(0, 0);
      document.body.style.overflow = "hidden";
      document.body.classList.add("hidden-scrollbar");
    } else {
      document.body.style.overflow = "auto";
      document.body.classList.remove("hidden-scrollbar");
    }
    return () => {
      document.body.style.overflow = "auto";
      document.body.classList.remove("hidden-scrollbar");
    };
  }, [isOpen]);

  if (!isOpen) return null;

  if (typeof window === "undefined") return null;
  const portalTarget = document.body;

  const content = (
    <div className="fixed w-full h-screen inset-0 z-9999 flex items-center justify-center p-4 sm:p-8 bg-black/95 grid-bg">
      <div className="relative w-full max-w-7xl flex flex-col h-full max-h-[90vh] border border-primary/50 bg-background-dark/90 backdrop-blur-md overflow-hidden neon-border">
        <div className="absolute inset-0 pointer-events-none scanline-overlay opacity-20 hidden md:block z-60"></div>

        <GlitchHeader onClose={onClose} />

        {/* Main Content Area: Image Viewer (left) + Sidebar (right) */}
        <main className="flex-1 flex flex-col lg:flex-row overflow-hidden relative z-40">
          {/* Left Column: Image Viewer + Bottom Thumbnails */}
          <div className="flex-1 flex flex-col overflow-hidden border-b lg:border-b-0 lg:border-r border-primary/20">
            <GlitchImageViewer
              images={images}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
            />
            <GlitchBottomNav
              bottomImages={bottomImages}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
            />
          </div>

          <GlitchSidebar
            sidebarImages={sidebarImages}
            totalImagesCount={images.length}
            halfIndex={halfIndex}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />
        </main>

        <GlitchFooter />
      </div>
    </div>
  );

  return createPortal(content, portalTarget);
}
