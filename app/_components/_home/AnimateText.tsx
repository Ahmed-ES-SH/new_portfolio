"use client";
import { useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";

interface HeroData {
  greeting: string;
  name: string;
  titles: string[];
}

export default function AnimateText({ hero }: { hero: HeroData }) {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const sequence = [
    hero.titles?.[0] || hero.name,
    5000,
    hero.titles?.[1] || "Full Stack Developer",
    5000,
    hero.titles?.[2] || "Frontend Developer",
    5000,
    hero.titles?.[3] || "Backend Developer",
    5000,
  ];

  return (
    <h1 className="text-5xl min-h-[120px] sm:min-h-[140px] md:min-h-[180px] sm:text-6xl md:text-7xl font-black leading-[1.1] md:leading-[0.9] tracking-tighter text-white neon-text uppercase">
      {hero.greeting} <br />
      <span className="text-(--color-accent-blue)">
        {reducedMotion ? (
          hero.titles?.[0] || hero.name
        ) : (
          <TypeAnimation
            sequence={sequence}
            wrapper="span"
            speed={50}
            repeat={Infinity}
            cursor={true}
            className="inline-block"
          />
        )}
      </span>
    </h1>
  );
}
