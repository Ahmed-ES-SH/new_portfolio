"use client";

import { useTranslation } from "@/app/hooks/useTranslation";
import LanguageSwitcher from "./LanguageSwitcher";
import LocaleLink from "./LocaleLink";
import ContactButton from "./ContactButton";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLocale } from "@/app/hooks/useLocale";

export function Navbar() {
  const { navbar } = useTranslation("global");
  const pathname = usePathname();
  const locale = useLocale();

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
    <header className="flex max-h-[70px]  items-center bg-primary/10 backdrop-blur-md justify-between whitespace-nowrap border-b border-primary/30 px-6 md:px-10 py-2 lg:py-6 z-50 fixed top-0 w-full left-0 right-0">
      <LocaleLink href="/" className="flex items-center gap-4 text-primary">
        <Image
          src={"/logo.png"}
          className="w-16"
          alt="logo"
          width={1024}
          height={1980}
        />

        <h2 className="hidden md:block text-lg md:text-xl font-black leading-tight tracking-widest uppercase neon-text">
          {navbar.name}
        </h2>
      </LocaleLink>

      <div className="flex flex-1 justify-end gap-4 md:gap-8 items-center">
        <nav className="hidden lg:flex items-center gap-10 text-sm tracking-widest text-primary/80">
          {links.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === `/${locale}` || pathname === "/"
                : pathname.startsWith(`/${locale}${link.href}`) ||
                  pathname.startsWith(link.href);

            return (
              <LocaleLink
                key={link.label}
                href={link.href}
                className={`hover:text-primary hover:border-primary py-1 transition-colors ${
                  isActive
                    ? "border-b border-primary text-primary"
                    : "border-b border-transparent"
                }`}
              >
                {link.label}
              </LocaleLink>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ContactButton text={navbar.cta} />

          {/* language switcher */}
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
