/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { TypeAnimation } from "react-type-animation";

export default function AnimateText({ hero }: { hero: any }) {
  const sequence = [
    hero.titles?.[0] || hero.name,
    2000,
    hero.titles?.[1] || "Full Stack Developer",
    2000,
    hero.titles?.[2] || "Frontend Developer",
    2000,
    hero.titles?.[3] || "Backend Developer",
    2000,
  ];

  return (
    <h1 className="text-5xl sm:text-6xl md:text-7xl font-black leading-[1.1] md:leading-[0.9] tracking-tighter text-white neon-text uppercase min-h-[140px] md:min-h-[180px]">
      {hero.greeting} <br />
      <span className="text-(--color-accent-blue)">
        <TypeAnimation
          sequence={sequence}
          wrapper="span"
          speed={50}
          repeat={Infinity}
          cursor={true}
          className="inline-block"
        />
      </span>
    </h1>
  );
}
