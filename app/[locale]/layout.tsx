/* eslint-disable @typescript-eslint/no-explicit-any */
import { directionMap } from "@/constants/global";
import { ReactNode } from "react";
import { Navbar } from "@/app/_components/_global/Navbar";
import { Footer } from "@/app/_components/_global/Footer";
import { CustomCursor } from "@/app/_components/_global/CustomCursor";
import PixelTransitionLayout from "../_components/_global/LayoutTransition";
import { VariablesProvider } from "../context/VariablesContext";
interface RootLayoutProps {
  children: ReactNode;
  params: any;
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
      <body className={`antialiased`}>
        <CustomCursor />
        <Navbar />
        <VariablesProvider>
          <PixelTransitionLayout>{children}</PixelTransitionLayout>
        </VariablesProvider>
        <Footer />
      </body>
    </html>
  );
}
