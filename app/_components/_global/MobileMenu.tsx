"use client";

import { LayoutGrid, Cpu, User2, TableProperties } from "lucide-react";
import { usePathname } from "next/navigation";
import { useLocale } from "@/app/hooks/useLocale";
import LocaleLink from "./LocaleLink";
import { motion } from "framer-motion";

export default function MobileMenu() {
  const pathname = usePathname();
  const locale = useLocale();

  // Helper to check if a path is active
  const isActive = (href: string) => {
    if (
      href === "/" &&
      (pathname === `/${locale}` || pathname === `/${locale}/`)
    )
      return true;
    return pathname.includes(href) && href !== "/";
  };

  // Navigation items mapping
  const navItems = [
    {
      icon: <LayoutGrid className="size-6" />,
      href: "/",
      label: "Home",
      type: "link",
    },
    {
      icon: <User2 className="size-6" />,
      href: "/about",
      label: "About",
      type: "link",
    },
    {
      icon: <Cpu className="size-6" />,
      href: "/skills",
      label: "Skills",
      type: "link",
    },
    {
      icon: <TableProperties className="size-6" />,
      href: "/projects",
      label: "Projects",
      type: "link",
    },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-99999 pointer-events-none">
      <motion.nav
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="w-full bg-black/80 backdrop-blur-xl border-t-2 border-x-2 border-primary/30  flex items-center justify-around p-2 shadow-[0_-10px_30px_rgba(0,245,228,0.15)] pointer-events-auto"
      >
        {navItems.map((item, index) => {
          if (item.type === "link" && item.href) {
            const active = isActive(item.href);
            return (
              <LocaleLink
                key={item.href}
                href={item.href}
                className="relative flex flex-col items-center justify-center group"
              >
                <div
                  className={`p-2 transition-all duration-300 ${
                    active
                      ? "text-primary scale-110 drop-shadow-[0_0_8px_rgba(0,245,228,0.8)]"
                      : "text-primary/40 group-hover:text-primary/70"
                  }`}
                >
                  {item.icon}
                </div>
                {active && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -top-4 w-12 h-1 bg-primary neon-glow rounded-full"
                  />
                )}
              </LocaleLink>
            );
          }

          return (
            <button
              key={index}
              className="relative flex flex-col items-center justify-center group p-2 text-primary/40 hover:text-primary/70 transition-all duration-300 active:scale-95"
            >
              <div className="flex flex-col items-center gap-1">
                {item.icon}
                <span className="text-[8px] font-bold uppercase">
                  {locale === "en" ? "AR" : "EN"}
                </span>
              </div>
            </button>
          );
        })}
      </motion.nav>
    </div>
  );
}
