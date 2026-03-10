/* eslint-disable @typescript-eslint/no-explicit-any */
import { getServerTranslation } from "@/app/helpers/serverTranslation";
import { AboutV2Layout } from "@/app/_components/_about_v2/AboutV2Layout";
import { AboutFooter } from "@/app/_components/_about_v2/AboutFooter";
import { NetworkSidebar } from "@/app/_components/_about_v2/NetworkSidebar";
import { ModulesSidebar } from "@/app/_components/_about_v2/ModulesSidebar";
import { AboutHero } from "@/app/_components/_about_v2/AboutHero";
import { getSharedMetadata } from "@/app/helpers/SharedMetadata";

export async function generateMetadata({ params }: any) {
  const { locale } = await params;
  const t = getServerTranslation(locale, "metaAboutPage");

  const sharedMetadata = getSharedMetadata(t.title, t.description);

  return {
    title: t.title,
    description: t.description,
    ...sharedMetadata,
  };
}

export default async function AboutV2Page() {
  return (
    <AboutV2Layout>
      {/* Three-column layout for inner content */}
      <NetworkSidebar />
      <AboutHero />
      <ModulesSidebar />

      <AboutFooter />
    </AboutV2Layout>
  );
}
