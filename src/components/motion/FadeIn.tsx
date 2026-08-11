"use client";

import { useReducedMotion } from "framer-motion";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const ENTRANCE_EASE = [0.22, 1, 0.36, 1] as const;

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "none";
}

interface HeroEntranceProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
}

interface HeroHeadlineProps {
  phrases: string[];
  className?: string;
  delay?: number;
  stagger?: number;
}

export function HeroEntrance({
  children,
  className,
  delay = 0,
  y = 20,
  duration = 0.65,
}: HeroEntranceProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration,
        delay,
        ease: ENTRANCE_EASE,
      }}
    >
      {children}
    </motion.div>
  );
}

export function HeroHeadline({
  phrases,
  className,
  delay = 0.08,
  stagger = 0.1,
}: HeroHeadlineProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <h1 className={className}>{phrases.join(" ")}</h1>;
  }

  return (
    <motion.h1
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger, delayChildren: delay },
        },
      }}
    >
      {phrases.map((phrase, index) => (
        <motion.span
          key={phrase}
          className="inline-block"
          variants={{
            hidden: { opacity: 0, y: 22 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.75, ease: ENTRANCE_EASE },
            },
          }}
        >
          {phrase}
          {index < phrases.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </motion.h1>
  );
}

export function FadeIn({
  children,
  className,
  delay = 0,
  direction = "up",
}: FadeInProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: direction === "up" ? 24 : 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.65,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

export function HeroMonogramEntrance({
  children,
  className,
  delay = 0.52,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.85,
        delay,
        ease: ENTRANCE_EASE,
      }}
    >
      {children}
    </motion.div>
  );
}

interface RevealOnScrollProps {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
}

export function RevealOnScroll({
  children,
  className,
  stagger = 0.08,
}: RevealOnScrollProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
