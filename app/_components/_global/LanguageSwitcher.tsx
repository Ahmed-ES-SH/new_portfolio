"use client";
import { useLocale } from "@/app/hooks/useLocale";
import { Terminal } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const toggleLanguage = () => {
    const nextLocale = locale === "en" ? "ar" : "en";
    if (!pathname) return;

    let newPathname = pathname;
    if (pathname.startsWith(`/${locale}/`)) {
      newPathname = pathname.replace(`/${locale}/`, `/${nextLocale}/`);
    } else if (pathname === `/${locale}`) {
      newPathname = `/${nextLocale}`;
    }
    router.push(newPathname, { scroll: false });
  };
  return (
    <button
      onClick={toggleLanguage}
      className="neon-border flex items-center gap-1 bg-transparent text-primary px-4 md:px-6 py-2 text-[10px] md:text-xs font-black uppercase tracking-widest hover:bg-primary hover:text-black transition-all duration-300"
    >
      <Terminal className="w-4 h-4" />
      {locale === "en" ? "AR" : "EN"}
    </button>
  );
}
