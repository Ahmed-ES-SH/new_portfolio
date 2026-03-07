/* eslint-disable @typescript-eslint/no-explicit-any */
import { directionMap } from "@/constants/global";
import React, { ReactNode } from "react";

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
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
