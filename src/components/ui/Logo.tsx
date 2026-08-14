"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "dark" | "light" | "auto";
  /** Header nav (170px desktop) or large footer wordmark */
  size?: "header" | "footer";
  className?: string;
  monogram?: boolean;
  showIndustries?: boolean;
}

const wordmarks = {
  /** Light backgrounds — black bold wordmark (true alpha) */
  dark: "/brand/rimanstech-wordmark-bold-light-transparent-clean.png",
  /** Dark backgrounds — white bold wordmark (true alpha) */
  light: "/brand/rimanstech-wordmark-bold-dark-transparent-clean.png",
} as const;

const headerWordmarkClass = "logo-header max-w-none";
const footerWordmarkClass = "logo-footer max-w-none";

const subscribeNoop = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export function Logo({
  variant = "auto",
  size = "header",
  className,
  monogram = false,
  showIndustries = false,
}: LogoProps) {
  const { resolvedTheme } = useTheme();
  const mounted = useSyncExternalStore(subscribeNoop, getClientSnapshot, getServerSnapshot);

  const effectiveVariant =
    variant === "auto"
      ? mounted && resolvedTheme === "dark"
        ? "light"
        : "dark"
      : variant;

  if (monogram) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src="/brand/archive/rimanstech-monogram.svg"
        alt=""
        className={cn("h-7 w-7 shrink-0 md:h-8 md:w-8", className)}
        aria-hidden="true"
      />
    );
  }

  const isFooter = size === "footer";

  return (
    <Link
      href="/"
      className={cn(
        "inline-flex w-fit max-w-full shrink-0",
        showIndustries ? "flex-col items-start gap-2 md:gap-2.5" : "items-center",
        className
      )}
      aria-label="RimansTech Industries home"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={wordmarks[effectiveVariant]}
        alt=""
        className={cn(isFooter ? footerWordmarkClass : headerWordmarkClass)}
        decoding="async"
        aria-hidden="true"
      />
      {showIndustries && (
        <span
          className={cn(
            "pl-[7%] font-medium tracking-[0.28em] uppercase",
            isFooter ? "text-[10px] sm:text-xs md:text-sm" : "text-[10px] sm:text-xs",
            effectiveVariant === "light" ? "text-footer-secondary" : "text-stone"
          )}
        >
          Industries
        </span>
      )}
    </Link>
  );
}
