"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ENTRANCE_EASE } from "@/components/motion/FadeIn";

export function HeroMonogramVisual() {
  const prefersReducedMotion = useReducedMotion();

  const panel = (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-border-light bg-obsidian sm:aspect-[16/10] lg:aspect-[4/3]">
      <div className="absolute inset-0 flex items-center justify-center p-6 sm:p-8 md:p-10">
        <Image
          src="/brand/rimanstech-monogram-hero-clean.png"
          alt=""
          width={607}
          height={557}
          className="h-full w-full object-contain"
          priority
          unoptimized
          aria-hidden="true"
        />
      </div>
    </div>
  );

  if (prefersReducedMotion) {
    return <div className="w-full">{panel}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.36, ease: ENTRANCE_EASE }}
      className="w-full"
    >
      {panel}
    </motion.div>
  );
}
