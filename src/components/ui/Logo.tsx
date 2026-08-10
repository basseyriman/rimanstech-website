"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "dark" | "light";
  className?: string;
  monogram?: boolean;
}

export function Logo({ variant = "dark", className, monogram = false }: LogoProps) {
  const textColor = variant === "dark" ? "#101110" : "#F5F3EE";
  const subColor = variant === "dark" ? "#50534F" : "#9A9D98";
  const accentColor = variant === "dark" ? "#183C32" : "#8A9C8D";

  if (monogram) {
    return (
      <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("h-full w-full", className)}
        aria-hidden="true"
      >
        <rect width="40" height="40" rx="8" fill={variant === "dark" ? "#183C32" : "#F5F3EE"} />
        <text
          x="20"
          y="26"
          textAnchor="middle"
          fill={variant === "dark" ? "#F5F3EE" : "#183C32"}
          fontFamily="system-ui, sans-serif"
          fontSize="16"
          fontWeight="600"
          letterSpacing="-0.02em"
        >
          RT
        </text>
      </svg>
    );
  }

  return (
    <Link href="/" className={cn("inline-block", className)} aria-label="RimansTech Industries home">
      <svg
        viewBox="0 0 180 34"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-[30px] w-[160px] md:h-[32px] md:w-[170px] lg:h-[34px] lg:w-[180px]"
        aria-hidden="true"
      >
        <text
          x="0"
          y="14"
          fill={textColor}
          fontFamily="system-ui, sans-serif"
          fontSize="13.5"
          fontWeight="600"
          letterSpacing="0.18em"
        >
          RIMANS
        </text>
        <text
          x="0"
          y="28"
          fill={accentColor}
          fontFamily="system-ui, sans-serif"
          fontSize="13.5"
          fontWeight="600"
          letterSpacing="0.18em"
        >
          TECH
        </text>
        <line x1="88" y1="4" x2="88" y2="30" stroke={subColor} strokeWidth="0.5" opacity="0.4" />
        <text
          x="96"
          y="26"
          fill={subColor}
          fontFamily="system-ui, sans-serif"
          fontSize="7"
          fontWeight="500"
          letterSpacing="0.22em"
        >
          INDUSTRIES
        </text>
      </svg>
    </Link>
  );
}
