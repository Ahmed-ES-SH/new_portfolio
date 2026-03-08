"use client";

import { Terminal } from "lucide-react";
import { useTranslation } from "@/app/hooks/useTranslation";
import LanguageSwitcher from "./LanguageSwitcher";
import LocaleLink from "./LocaleLink";

export function Navbar() {
  const { navbar } = useTranslation("global");

  const links = [
    {
      label: navbar.links.home,
      href: "/",
    },
    {
      label: navbar.links.log,
      href: "/about",
    },
    {
      label: navbar.links.skills,
      href: "/skills",
    },
    {
      label: navbar.links.projects,
      href: "/projects",
    },
  ];

  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-primary/30 px-6 md:px-10 py-6 bg-black/90 backdrop-blur-md z-50 fixed top-0 w-full left-0 right-0">
      <LocaleLink href="/" className="flex items-center gap-4 text-primary">
        <div className="size-8 neon-border flex items-center justify-center bg-black">
          <Terminal size={16} className="text-primary" />
        </div>
        <h2 className="text-lg md:text-xl font-black leading-tight tracking-widest uppercase neon-text">
          {navbar.name}
        </h2>
      </LocaleLink>

      <div className="flex flex-1 justify-end gap-4 md:gap-8 items-center">
        <nav className="hidden lg:flex items-center gap-10">
          {links.map((link) => (
            <LocaleLink
              key={link.label}
              className="text-primary/80 hover:text-primary text-xs font-bold uppercase tracking-widest transition-colors"
              href={link.href}
            >
              {link.label}
            </LocaleLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button className="neon-border bg-transparent text-primary px-4 md:px-6 py-2 text-[10px] md:text-xs font-black uppercase tracking-widest hover:bg-primary hover:text-black transition-all duration-300">
            {navbar.cta}
          </button>

          {/* language switcher */}
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
