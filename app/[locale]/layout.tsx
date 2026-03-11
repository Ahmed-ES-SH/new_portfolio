/* eslint-disable @typescript-eslint/no-explicit-any */
import { directionMap } from "@/constants/global";
import { ReactNode } from "react";
import { Navbar } from "@/app/_components/_global/Navbar";
import { Footer } from "@/app/_components/_global/Footer";
import { CustomCursor } from "@/app/_components/_global/CustomCursor";
import PixelTransitionLayout from "../_components/_global/LayoutTransition";
import { VariablesProvider } from "../context/VariablesContext";
import TerminalBox from "../_components/_global/TerminalBox";
import MobileMenu from "../_components/_global/MobileMenu";
import { getServerTranslation } from "../helpers/serverTranslation";
import { getSharedMetadata } from "../helpers/SharedMetadata";

interface RootLayoutProps {
  children: ReactNode;
  params: any;
}

export async function generateMetadata({ params }: any) {
  const { locale } = await params;
  const t = getServerTranslation(locale, "metaHomePage");

  const sharedMetadata = getSharedMetadata(t.title, t.description);

  return {
    title: t.title,
    description: t.description,
    ...sharedMetadata,
  };
}

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const { locale = "en" } = await params;
  return (
    <html lang={locale} dir={directionMap[locale]}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@200..1000&family=IBM+Plex+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`antialiased overflow-hidden`}>
        <VariablesProvider>
          <CustomCursor />
          <Navbar />
          <MobileMenu />
          <PixelTransitionLayout>{children}</PixelTransitionLayout>
          <TerminalBox />
          <Footer />
        </VariablesProvider>
      </body>
    </html>
  );
}
