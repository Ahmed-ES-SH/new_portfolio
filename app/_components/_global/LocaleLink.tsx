"use client";
import Link from "next/link";
import { useLocale } from "@/app/hooks/useLocale";
import { useSearchParams } from "next/navigation";
import { ReactNode, useCallback, Suspense } from "react";

interface LocaleLinkProps {
  children: ReactNode;
  className?: string;
  href: string;
  target?: string;
  onClick?: () => void;
}

function LocaleLinkInner({
  children,
  className,
  target,
  href,
  onClick,
}: LocaleLinkProps) {
  const locale = useLocale();
  const searchParams = useSearchParams();

  const getFormattedHref = useCallback(() => {
    const [pathname, queryString] = href.split("?");
    const newParams = new URLSearchParams(queryString || "");

    searchParams.forEach((value, key) => {
      if (!newParams.has(key)) {
        newParams.set(key, value);
      }
    });

    const localePath = `/${locale}/${pathname}`.replace(/\/+/g, "/");
    const finalQueryString = newParams.toString();

    return finalQueryString ? `${localePath}?${finalQueryString}` : localePath;
  }, [href, locale, searchParams]);

  const handleClick = () => {
    // Scroll to top when navigating to new page
    window.scrollTo({ top: 0, behavior: "instant" });
    onClick?.();
  };

  return (
    <Link
      href={getFormattedHref()}
      target={target}
      className={`${className} block outline-none`}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
}

export default function LocaleLink(props: LocaleLinkProps) {
  return (
    <Suspense
      fallback={
        <a
          href={props.href}
          className={`${props.className} block outline-none`}
          target={props.target}
          onClick={props.onClick}
        >
          {props.children}
        </a>
      }
    >
      <LocaleLinkInner {...props} />
    </Suspense>
  );
}
