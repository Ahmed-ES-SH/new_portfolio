"use client";

import React, { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import GridTransition from "./_transationLayout/GridTransition";
import useVariablesContext from "@/app/context/VariablesContext";

export default function PixelTransitionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { displayState, setDisplayState } = useVariablesContext();
  const pathname = usePathname();

  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayKey, setDisplayKey] = useState(pathname);

  useEffect(() => {
    const handleIsTransitioning = (value: boolean) => {
      setIsTransitioning(value);
    };

    if (pathname !== displayKey) {
      handleIsTransitioning(true);
      setDisplayState(false);
    }
  }, [pathname, displayKey, setDisplayState]);

  const handleComplete = useCallback(() => {
    setIsTransitioning(false);
    setDisplayKey(pathname);

    setTimeout(() => {
      setDisplayState(true);
    }, 1);
  }, [pathname, setDisplayState]);

  return (
    <>
      <GridTransition active={isTransitioning} onComplete={handleComplete} />

      <AnimatePresence mode="wait">
        <motion.div
          key={displayKey}
          initial={{ opacity: 0, filter: "blur(20px)" }}
          animate={{
            opacity: displayState ? 1 : 0,
            filter: displayState ? "blur(0px)" : "blur(20px)",
          }}
          exit={{ opacity: 0, filter: "blur(20px)" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <div className="w-full min-h-screen">{displayState && children}</div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
