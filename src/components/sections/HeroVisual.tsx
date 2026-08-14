"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ENTRANCE_EASE } from "@/components/motion/FadeIn";

const BACKDROP = "/images/hero/hero-studio-backdrop.png";
const BLOOM = "/images/hero/hero-light-bloom.png";
const GRAIN = "/images/hero/hero-material-grain.png";
const MONOGRAM = "/brand/rimanstech-monogram-hero-clean.png";

export function HeroVisual() {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <div className="hero-visual relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-border-light bg-obsidian sm:aspect-[16/10] lg:aspect-[4/3]">
        <Image
          src={BACKDROP}
          alt=""
          fill
          className="object-cover"
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(12,13,12,0.55)_100%)]" />
        <div className="absolute inset-0 flex items-center justify-center p-8 sm:p-10 md:p-12">
          <Image
            src={MONOGRAM}
            alt=""
            width={607}
            height={557}
            className="h-full w-full max-h-[78%] object-contain drop-shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
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
          transition: { delayChildren: 0.28, staggerChildren: 0.16 },
        },
      }}
      className="w-full"
    >
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 28 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: ENTRANCE_EASE },
          },
        }}
        className="hero-visual relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-border-light bg-obsidian sm:aspect-[16/10] lg:aspect-[4/3]"
      >
        {/* Studio cove — slow cinematic drift */}
        <motion.div
          className="absolute inset-[-8%] will-change-transform"
          animate={{ scale: [1, 1.06, 1], x: [0, 8, 0], y: [0, -6, 0] }}
          transition={{ duration: 22, ease: "easeInOut", repeat: Infinity }}
        >
          <Image
            src={BACKDROP}
            alt=""
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            aria-hidden="true"
          />
        </motion.div>

        {/* Brushed material depth */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.22] mix-blend-soft-light"
          style={{ backgroundImage: `url(${GRAIN})`, backgroundSize: "cover" }}
          aria-hidden="true"
        />

        {/* Specular bloom — breathing light */}
        <motion.div
          className="pointer-events-none absolute inset-[-10%] will-change-transform"
          animate={{
            opacity: [0.22, 0.48, 0.28, 0.5, 0.22],
            x: [0, 12, -8, 4, 0],
            y: [0, -10, 6, -4, 0],
          }}
          transition={{ duration: 14, ease: "easeInOut", repeat: Infinity }}
        >
          <Image
            src={BLOOM}
            alt=""
            fill
            className="object-cover mix-blend-screen"
            sizes="(max-width: 1024px) 100vw, 50vw"
            aria-hidden="true"
          />
        </motion.div>

        {/* Depth vignette */}
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_28%,rgba(12,13,12,0.35)_72%,rgba(12,13,12,0.72)_100%)]"
          aria-hidden="true"
        />

        {/* Chrome monogram — entrance, float, specular sweep */}
        <div className="absolute inset-0 flex items-center justify-center p-8 sm:p-10 md:p-12">
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.94 },
              visible: {
                opacity: 1,
                scale: 1,
                transition: { duration: 1, ease: ENTRANCE_EASE },
              },
            }}
            className="relative h-full w-full max-h-[78%]"
          >
            <motion.div
              className="hero-monogram relative h-full w-full"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 7.5, ease: "easeInOut", repeat: Infinity }}
            >
              <Image
                src={MONOGRAM}
                alt=""
                width={607}
                height={557}
                className="h-full w-full object-contain drop-shadow-[0_24px_70px_rgba(0,0,0,0.55)]"
                priority
                unoptimized
                aria-hidden="true"
              />
              <span className="hero-monogram-sheen" aria-hidden="true" />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
