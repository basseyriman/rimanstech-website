"use client";

import { useEffect, useState } from "react";

const WORDMARK = "/brand/rimanstech-wordmark-bold-dark-transparent-clean.png";

/** Letter bounds as % of wordmark width — measured from the bold logo */
const LETTERS = [
  { id: "R", left: 0, right: 14.6 },
  { id: "i", left: 14.6, right: 19.05 },
  { id: "m", left: 19.05, right: 34.3 },
  { id: "a", left: 34.3, right: 44.85 },
  { id: "n", left: 44.85, right: 54.72 },
  { id: "s", left: 54.72, right: 63.22 },
  { id: "T", left: 63.22, right: 72.1 },
  { id: "e", left: 72.1, right: 81.2 },
  { id: "c", left: 81.2, right: 91.0 },
  { id: "h", left: 91.0, right: 100 },
] as const;

const LETTER_MS = 1000;

export function FooterWordmark() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches) {
      setActiveIndex(-1);
      return;
    }

    let index = 0;
    const timer = window.setInterval(() => {
      index = (index + 1) % LETTERS.length;
      setActiveIndex(index);
    }, LETTER_MS);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div id="footer-wordmark" className="relative mb-14 md:mb-16 lg:mb-20">
      <div
        className="relative overflow-hidden"
        style={{ height: "clamp(5.5rem, 14vw, 10.5rem)" }}
        aria-hidden="true"
      >
        {/*
          Resend-style lockup: our bold wordmark, mostly hidden,
          bottom clipped, one letter continuously lit.
        */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 w-full translate-y-[20%]">
          {/* Dim base — same logo, barely visible */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={WORDMARK}
            alt=""
            className="block h-auto w-full select-none opacity-[0.12]"
            decoding="async"
            draggable={false}
          />

          {/* Bright letter slices clipped from the same logo */}
          {LETTERS.map((letter, index) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={letter.id}
              src={WORDMARK}
              alt=""
              className="absolute inset-0 block h-auto w-full select-none transition-[opacity,filter] duration-300 ease-out"
              style={{
                opacity: activeIndex === index ? 1 : 0,
                filter:
                  activeIndex === index
                    ? "drop-shadow(0 0 36px rgba(245,243,238,0.3))"
                    : "none",
                clipPath: `inset(0 ${100 - letter.right}% 0 ${letter.left}%)`,
              }}
              decoding="async"
              draggable={false}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
