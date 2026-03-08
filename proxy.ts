// proxy.ts
import { NextResponse } from "next/server";
import type { NextFetchEvent, NextRequest } from "next/server";

const SUPPORTED_LOCALES = ["en", "ar"];
const DEFAULT_LOCALE = "en";

export function proxy(request: NextRequest, _event: NextFetchEvent) {
  const { pathname } = request.nextUrl;
  const segments = pathname.split("/");
  const locale = segments[1];

  // 🌍 Locale check
  if (!SUPPORTED_LOCALES.includes(locale)) {
    const newUrl = new URL(`/${DEFAULT_LOCALE}${pathname}`, request.url);
    return NextResponse.redirect(newUrl);
  }

  const response = NextResponse.next();
  response.headers.set("x-locale", locale);
  return response;
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
