"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ENTRANCE_EASE } from "@/components/motion/FadeIn";

export type NavDropdownItem = {
  label: string;
  href: string;
};

interface NavDropdownProps {
  label: string;
  items: readonly NavDropdownItem[];
  viewAllHref: string;
  viewAllLabel: string;
}

export function NavDropdown({
  label,
  items,
  viewAllHref,
  viewAllLabel,
}: NavDropdownProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        className={cn(
          "inline-flex items-center gap-1 text-sm font-medium transition-colors",
          open ? "text-carbon" : "text-graphite hover:text-carbon"
        )}
        aria-expanded={open}
        aria-controls={menuId}
        aria-haspopup="menu"
        onClick={() => setOpen((value) => !value)}
      >
        {label}
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 transition-transform duration-300 ease-out",
            open && "rotate-180"
          )}
          aria-hidden="true"
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id={menuId}
            role="menu"
            aria-label={label}
            initial={
              prefersReducedMotion
                ? { opacity: 1 }
                : { opacity: 0, y: -8, scale: 0.98 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, y: -6, scale: 0.98 }
            }
            transition={{ duration: 0.22, ease: ENTRANCE_EASE }}
            className="absolute top-full left-1/2 z-50 mt-4 w-[300px] -translate-x-1/2 overflow-hidden rounded-xl border border-border-light bg-page shadow-[0_18px_50px_rgba(16,17,16,0.12)]"
          >
            <div className="p-2">
              {items.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={prefersReducedMotion ? false : { opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: prefersReducedMotion ? 0 : 0.03 + index * 0.03,
                    duration: 0.2,
                    ease: ENTRANCE_EASE,
                  }}
                >
                  <Link
                    href={item.href}
                    role="menuitem"
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3.5 py-2.5 text-sm font-medium text-graphite transition-colors hover:bg-accent-subtle hover:text-carbon"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>
            <div className="border-t border-border-light px-2 py-2">
              <Link
                href={viewAllHref}
                role="menuitem"
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3.5 py-2.5 text-sm font-medium text-forest transition-colors hover:bg-accent-subtle"
              >
                {viewAllLabel}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
