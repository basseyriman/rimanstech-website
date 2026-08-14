"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { motion } from "framer-motion";
import { ENTRANCE_EASE } from "@/components/motion/FadeIn";
import { ProductMedia } from "@/components/ui/ProductMedia";
import { products } from "@content/products";
import type { Product } from "@/types/content";

const showcaseProducts = products.slice(0, 4);

/** Grid slots: 0 = top-left, 1 = top-right, 2 = bottom-left, 3 = bottom-right */
const NEXT_SLOT: Record<number, number> = {
  0: 2,
  2: 3,
  3: 1,
  1: 0,
};

const ROTATION_MS = 4200;
const ROTATION_EASE = [0.32, 0.72, 0, 1] as const;

type SlotMap = Record<string, number>;

function getInitialSlots(): SlotMap {
  return Object.fromEntries(
    showcaseProducts.map((product, index) => [product.id, index])
  );
}

function rotateSlots(slots: SlotMap): SlotMap {
  const next: SlotMap = {};
  for (const product of showcaseProducts) {
    next[product.id] = NEXT_SLOT[slots[product.id]];
  }
  return next;
}

function slotToPosition(slot: number) {
  const col = slot % 2;
  const row = Math.floor(slot / 2);
  return {
    left: col === 0 ? "0%" : "calc(50% + 0.25rem)",
    top: row === 0 ? "0%" : "calc(50% + 0.25rem)",
  };
}

function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={product.cta.href}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-border-dark bg-charcoal transition-colors hover:border-sage/40"
    >
      <ProductMedia
        image={product.image}
        imageAlt={product.imageAlt}
        previewUrl={product.previewUrl}
        video={product.video}
        imageFit={product.imageFit}
        imageBg={product.imageBg ?? "obsidian"}
        aspect="video"
        className="rounded-none border-0"
        sizes="(max-width: 1024px) 50vw, 25vw"
      />
      <div className="border-t border-border-dark px-3 py-2.5">
        <p className="text-[10px] text-stone uppercase">{product.category}</p>
        <p className="mt-0.5 text-sm font-medium text-ivory group-hover:text-sage">
          {product.title}
        </p>
      </div>
    </Link>
  );
}

function ShowcaseGrid({
  slots,
  animated,
}: {
  slots: SlotMap;
  animated: boolean;
}) {
  if (!animated) {
    return (
      <div className="grid grid-cols-2 gap-2 md:gap-3">
        {showcaseProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    );
  }

  return (
    <div className="relative w-full">
      <div
        className="grid grid-cols-2 gap-2 opacity-0 pointer-events-none md:gap-3"
        aria-hidden="true"
      >
        {showcaseProducts.map((product) => (
          <div
            key={`size-${product.id}`}
            className="overflow-hidden rounded-xl border border-transparent"
          >
            <div className="aspect-video" />
            <div className="h-[52px]" />
          </div>
        ))}
      </div>

      <div className="absolute inset-0">
        {showcaseProducts.map((product) => {
          const slot = slots[product.id];
          const position = slotToPosition(slot);

          return (
            <motion.div
              key={product.id}
              className="absolute w-[calc(50%-0.25rem)] md:w-[calc(50%-0.375rem)]"
              animate={position}
              transition={{ duration: 0.75, ease: ROTATION_EASE }}
            >
              <ProductCard product={product} />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export function ProductShowcasePanel({
  animateEntrance = false,
}: {
  animateEntrance?: boolean;
}) {
  const prefersReducedMotion = useReducedMotion();
  const [slots, setSlots] = useState<SlotMap>(getInitialSlots);
  const [paused, setPaused] = useState(false);

  const step = useCallback(() => {
    setSlots((current) => rotateSlots(current));
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || paused) return;

    const id = window.setInterval(step, ROTATION_MS);
    return () => window.clearInterval(id);
  }, [prefersReducedMotion, paused, step]);

  const panel = (
    <div
      className="relative overflow-hidden rounded-2xl border border-border-light bg-obsidian p-3 shadow-[0_24px_80px_rgba(0,0,0,0.18)] md:p-4"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
    >
      <div className="mb-3 flex items-center justify-between border-b border-border-dark px-2 pb-3">
        <p className="text-[10px] font-medium tracking-[0.16em] text-stone uppercase">
          RimansTech Products
        </p>
        <Link
          href="/products"
          className="text-[10px] font-medium tracking-[0.12em] text-sage uppercase transition-colors hover:text-ivory"
        >
          View all
        </Link>
      </div>
      <ShowcaseGrid slots={slots} animated={!prefersReducedMotion} />
    </div>
  );

  if (!animateEntrance || prefersReducedMotion) {
    return <div className="w-full">{panel}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: ENTRANCE_EASE }}
      className="w-full"
    >
      {panel}
    </motion.div>
  );
}
