"use client";

import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { motion } from "framer-motion";
import { ENTRANCE_EASE } from "@/components/motion/FadeIn";

export function HeroVisual() {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
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
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: { delayChildren: 0.36, staggerChildren: 0.22 },
        },
      }}
    >
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 24 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.7, ease: ENTRANCE_EASE },
          },
        }}
        className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-border-light bg-obsidian sm:aspect-[16/10] lg:aspect-[4/3]"
      >
        <div className="absolute inset-0 flex items-center justify-center p-6 sm:p-8 md:p-10">
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.98 },
              visible: {
                opacity: 1,
                scale: 1,
                transition: { duration: 0.85, ease: ENTRANCE_EASE },
              },
            }}
            className="h-full w-full"
          >
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
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
