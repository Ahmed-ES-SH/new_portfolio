import { directionMap } from "@/constants/global";

interface ExplainPageShellProps {
  locale: "en" | "ar";
  children: React.ReactNode;
}

/**
 * Server component wrapper for the Explain page.
 *
 * Provides the grid background, locale-aware text direction (`dir`),
 * and consistent horizontal padding via the `container-section` utility.
 * This component intentionally avoids `"use client"` — no animations,
 * no translation hooks, no interactivity.
 */
export function ExplainPageShell({ locale, children }: ExplainPageShellProps) {
  return (
    <main
      dir={directionMap[locale] || "ltr"}
      className="relative min-h-screen flex flex-col text-slate-100 overflow-hidden"
    >
      {/* Subtle Grid Background */}
      <div
        className="absolute inset-0 z-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 242, 255, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 242, 255, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Content Wrapper */}
      <div className="relative container-section max-md:w-full max-md:p-1 px-6 z-10 flex flex-col gap-0 pb-32">
        {children}
      </div>
    </main>
  );
}
