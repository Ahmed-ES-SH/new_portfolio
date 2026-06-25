"use client";

import Image from "next/image";
import { useTranslation } from "@/app/hooks/useTranslation";
import AnimateText from "./AnimateText";
import LocaleLink from "../_global/LocaleLink";

export function HeroSection() {
  const { hero } = useTranslation("home");

  return (
    <section className="relative flex-1 flex items-center justify-center min-h-[90vh]  z-10 overflow-hidden    container-section py-20">
      {/* Background Decorators */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-30 pointer-events-none">
        <div className="absolute inset-0 bg-linear-to-l from-black via-transparent to-transparent z-10"></div>
        <div className="absolute top-20 right-20 w-[500px] h-[500px] bg-accent-blue/10 rounded-full blur-[150px]"></div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 w-full relative z-20">
        {/* Left Content Column */}
        <div className="lg:col-span-7 flex flex-col justify-center items-start space-y-10 order-2 lg:order-1">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-accent-blue/50 bg-accent-blue/5">
              <span className="size-2 bg-(--color-accent-blue) animate-pulse"></span>
              <span className="text-[10px] sm:text-xs font-bold text-(--color-accent-blue) tracking-tighter uppercase">
                {hero.status}
              </span>
            </div>

            <AnimateText hero={hero} />

            <p className="text-base sm:text-lg md:text-xl text-slate-400 max-w-xl font-light tracking-wide bg-(--color-accent-blue)/5 px-6 py-4 border border-(--color-accent-blue)/20">
              {hero.subtitlePrimary}{" "}
              <span className="text-white font-medium">
                {hero.subtitleHighlight}
              </span>
              {hero.subtitleSecondary}
            </p>
          </div>

          <div className="flex flex-wrap gap-4 sm:gap-6">
            <LocaleLink
              href="/skills"
              className="neon-border max-md:w-[80%] bg-(--color-accent-blue) text-black px-6 sm:px-10 py-3 sm:py-4 text-xs sm:text-sm font-black uppercase tracking-widest hover:bg-transparent hover:text-(--color-accent-blue) transition-all duration-300"
            >
              {hero.badge1}
            </LocaleLink>
            <LocaleLink
              href="/projects"
              className="neon-border max-md:w-[80%]  bg-transparent text-(--color-accent-blue) px-6 sm:px-10 py-3 sm:py-4 text-xs sm:text-sm font-black uppercase tracking-widest hover:bg-(--color-accent-blue)/10 transition-all duration-300"
            >
              {hero.badge2}
            </LocaleLink>
          </div>
        </div>

        {/* Right Illustration Column */}
        <div className="lg:col-span-5 relative flex items-center justify-center order-1 lg:order-2 w-full">
          <div className="relative w-full aspect-[3/4] sm:aspect-4/5 max-w-md group">
            <div className="relative w-full h-full overflow-hidden">
              {/* Back layered Image */}
              <div className="absolute inset-0 translate-x-4 opacity-40 mix-blend-screen overflow-hidden">
                <Image
                  src="/pixel-me.webp"
                  alt="Background effect"
                  fill
                  className="object-cover grayscale brightness-150"
                  unoptimized
                />
              </div>

              {/* Main Image */}
              <div className="relative z-10 w-full h-full border border-accent-blue/40 bg-black/20 backdrop-blur-sm p-1">
                <Image
                  src="/pixel-me.webp"
                  alt="Profile primary"
                  fill
                  className="object-cover"
                  unoptimized
                />
                <div className="scanline-overlay"></div>
              </div>
            </div>

            {/* Floating Statistic Boxes — side on desktop, row below on mobile */}
            <div className="lg:absolute -left-6 lg:-left-12 top-0 bottom-0 flex lg:flex-col max-lg:flex-row max-lg:mt-4 max-lg:gap-3 justify-between lg:py-12 z-40">
              <div className="p-3 sm:p-4 bg-black/80 border border-primary/40 backdrop-blur-xl w-32 sm:w-40 transition-transform hover:-translate-x-2 max-lg:flex-1">
                <div className="text-xl sm:text-2xl font-black text-white pixel-flicker">
                  {hero.stats.reliability.value}
                </div>
                <div className="text-[6px] sm:text-[8px] uppercase tracking-widest text-primary font-bold">
                  {hero.stats.reliability.label}
                </div>
                <div className="mt-2 h-0.5 w-full bg-primary/20">
                  <div className="h-full bg-primary w-[99.9%]"></div>
                </div>
              </div>

              <div className="p-3 sm:p-4 bg-black/80 border border-primary/40 backdrop-blur-xl w-32 sm:w-40 lg:translate-x-4 transition-transform lg:hover:translate-x-6 max-lg:flex-1">
                <div className="text-xl sm:text-2xl font-black text-white pixel-flicker">
                  {hero.stats.integrations.value}
                </div>
                <div className="text-[6px] sm:text-[8px] uppercase tracking-widest text-primary font-bold">
                  {hero.stats.integrations.label}
                </div>
                <div className="mt-2 h-0.5 w-full bg-primary/20">
                  <div className="h-full bg-primary w-[75%]"></div>
                </div>
              </div>

              <div className="p-3 sm:p-4 bg-black/80 border border-primary/40 backdrop-blur-xl w-32 sm:w-40 transition-transform hover:-translate-x-2 max-lg:flex-1">
                <div className="text-xl sm:text-2xl font-black text-white pixel-flicker">
                  {hero.stats.latency.value}
                </div>
                <div className="text-[6px] sm:text-[8px] uppercase tracking-widest text-primary font-bold">
                  {hero.stats.latency.label}
                </div>
                <div className="mt-2 h-0.5 w-full bg-primary/20">
                  <div className="h-full bg-primary w-full"></div>
                </div>
              </div>
            </div>

            {/* Corner Decorative Tech Info */}
            <div className="absolute top-0 right-0 p-2 sm:p-4 border-e-2 border-t-2 border-primary text-primary text-[8px] sm:text-[10px]  bg-black/60 z-20">
              {hero.systemInfo.id}
              <br />
              {hero.systemInfo.src}
              <br />
              {hero.systemInfo.ver}
            </div>

            <div className="absolute bottom-0 right-0 p-2 sm:p-4 border-s-2 border-b-2 border-primary text-primary text-[8px] sm:text-[10px]  bg-black/60 z-20">
              {hero.coordInfo.x}
              <br />
              {hero.coordInfo.y}
              <br />
              {hero.coordInfo.status}
            </div>

            {/* Decorative terminal node icon */}
            <div className="hidden sm:block absolute -bottom-16 -right-16 w-56 h-56 z-50 pointer-events-none animate-[float_6s_ease-in-out_infinite]">
              <svg viewBox="0 0 120 120" fill="none" className="w-full h-full drop-shadow-[0_0_20px_rgba(0,240,255,0.4)]">
                <circle cx="60" cy="60" r="28" stroke="var(--color-accent-blue)" strokeWidth="1.5" opacity="0.6"/>
                <circle cx="60" cy="60" r="14" stroke="var(--color-accent-blue)" strokeWidth="1" opacity="0.4"/>
                <circle cx="60" cy="60" r="3" fill="var(--color-accent-blue)" opacity="0.8"/>
                <line x1="60" y1="32" x2="60" y2="16" stroke="var(--color-accent-blue)" strokeWidth="1" opacity="0.5"/>
                <line x1="60" y1="88" x2="60" y2="104" stroke="var(--color-accent-blue)" strokeWidth="1" opacity="0.5"/>
                <line x1="32" y1="60" x2="16" y2="60" stroke="var(--color-accent-blue)" strokeWidth="1" opacity="0.5"/>
                <line x1="88" y1="60" x2="104" y2="60" stroke="var(--color-accent-blue)" strokeWidth="1" opacity="0.5"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
