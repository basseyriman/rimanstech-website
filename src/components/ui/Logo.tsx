"use client";

import Image from "next/image";
import Link from "next/link";
import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "dark" | "light" | "auto";
  className?: string;
  monogram?: boolean;
  showIndustries?: boolean;
}

const WORDMARK_WIDTH = 1333;
const WORDMARK_HEIGHT = 182;

const subscribeNoop = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export function Logo({
  variant = "auto",
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
      <Image
        src="/brand/rimanstech-monogram-premium.png"
        alt=""
        width={40}
        height={40}
        className={cn("h-full w-full rounded-lg object-cover", className)}
        aria-hidden="true"
      />
    );
  }

  const wordmarkSrc =
    effectiveVariant === "light"
      ? "/brand/rimanstech-wordmark-editorial-accent-nav-light.png"
      : "/brand/rimanstech-wordmark-editorial-accent-nav-dark.png";

  return (
    <Link
      href="/"
      className={cn(
        "inline-flex shrink-0",
        showIndustries ? "flex-col items-end gap-1" : "items-center",
        className
      )}
      aria-label="RimansTech Industries home"
    >
      <Image
        src={wordmarkSrc}
        alt="RimansTech"
        width={WORDMARK_WIDTH}
        height={WORDMARK_HEIGHT}
        className="h-6 w-auto md:h-7"
        priority
        unoptimized
      />
      {showIndustries && (
        <span
          className={cn(
            "text-[8px] font-medium tracking-[0.26em] uppercase md:text-[9px]",
            effectiveVariant === "light" ? "text-footer-secondary" : "text-graphite"
          )}
        >
          Industries
        </span>
      )}
    </Link>
  );
}
