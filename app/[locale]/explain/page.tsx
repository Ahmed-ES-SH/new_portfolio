/* eslint-disable @typescript-eslint/no-explicit-any */
import { getServerTranslation } from "@/app/helpers/serverTranslation";
import { ExplainHero } from "@/app/_components/_explain/ExplainHero";
import { ExplainRationale } from "@/app/_components/_explain/ExplainRationale";
import { ExplainTerminal } from "@/app/_components/_explain/ExplainTerminal";
import { ExplainHuman } from "@/app/_components/_explain/ExplainHuman";
import { directionMap } from "@/constants/global";
import { getSharedMetadata } from "@/app/helpers/SharedMetadata";

export async function generateMetadata({ params }: any) {
  const { locale } = await params;
  const t = getServerTranslation(locale, "metaExplainPage");

  const sharedMetadata = getSharedMetadata(t.title, t.description);

  return {
    title: t.title,
    description: t.description,
    ...sharedMetadata,
  };
}

export default async function ExplainPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <main
      dir={directionMap[locale]}
      className="relative min-h-screen  flex flex-col  text-slate-100 overflow-hidden "
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
        <ExplainHero />

        {/* Section 01 */}
        <div className="container-section">
          <div className="flex items-center gap-4 mb-16">
            <div className="h-px flex-1 bg-linear-to-r from-primary/60 to-transparent" />
            <span className="text-[10px] text-primary/60 font-black tracking-[0.4em] uppercase">
              SECTION_01
            </span>
          </div>
        </div>
        <ExplainRationale />

        {/* Section 02 */}
        <div className="container-section mt-24">
          <div className="flex items-center gap-4 mb-16">
            <div className="h-px flex-1 bg-linear-to-r from-primary/60 to-transparent" />
            <span className="text-[10px] text-primary/60 font-black tracking-[0.4em] uppercase">
              SECTION_02
            </span>
          </div>
        </div>
        <ExplainTerminal />

        {/* Section 03 */}
        <div className="container-section mt-24">
          <div className="flex items-center gap-4 mb-16">
            <div className="h-px flex-1 bg-linear-to-r from-primary/60 to-transparent" />
            <span className="text-[10px] text-primary/60 font-black tracking-[0.4em] uppercase">
              SECTION_03
            </span>
          </div>
        </div>
        <ExplainHuman />
      </div>
    </main>
  );
}
