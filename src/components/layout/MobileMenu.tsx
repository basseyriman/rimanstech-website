"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronDown, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { NAV_DROPDOWNS, NAV_LINKS, type NavDropdownKey } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { ENTRANCE_EASE } from "@/components/motion/FadeIn";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

function hasDropdown(label: string): label is NavDropdownKey {
  return label in NAV_DROPDOWNS;
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const [openSection, setOpenSection] = useState<NavDropdownKey | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!open) {
      setOpenSection(null);
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-[60] lg:hidden",
        open ? "pointer-events-auto" : "pointer-events-none"
      )}
      aria-hidden={!open}
    >
      <div
        className={cn(
          "absolute inset-0 bg-obsidian/40 transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0"
        )}
        onClick={onClose}
      />
      <div
        className={cn(
          "absolute top-0 right-0 h-full w-full max-w-sm overflow-y-auto bg-page shadow-xl transition-transform duration-300 ease-out",
          open ? "translate-x-0" : "translate-x-full"
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <div className="flex h-16 items-center justify-between border-b border-border-light px-5">
          <Logo variant="auto" />
          <button
            type="button"
            onClick={onClose}
            className="flex h-11 w-11 items-center justify-center rounded-lg border border-border-light"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="flex flex-col gap-1 p-5" aria-label="Mobile navigation">
          {NAV_LINKS.map((link) => {
            if (!hasDropdown(link.label)) {
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className="rounded-lg px-4 py-3.5 text-base font-medium text-carbon transition-colors hover:bg-accent-subtle"
                >
                  {link.label}
                </Link>
              );
            }

            const menu = NAV_DROPDOWNS[link.label];
            const isOpen = openSection === link.label;

            return (
              <div key={link.href} className="rounded-lg">
                <button
                  type="button"
                  onClick={() =>
                    setOpenSection((current) =>
                      current === link.label ? null : link.label
                    )
                  }
                  className="flex w-full items-center justify-between rounded-lg px-4 py-3.5 text-left text-base font-medium text-carbon transition-colors hover:bg-accent-subtle"
                  aria-expanded={isOpen}
                >
                  {link.label}
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 text-graphite transition-transform duration-300",
                      isOpen && "rotate-180"
                    )}
                    aria-hidden="true"
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={
                        prefersReducedMotion
                          ? { opacity: 1 }
                          : { height: 0, opacity: 0 }
                      }
                      animate={{ height: "auto", opacity: 1 }}
                      exit={
                        prefersReducedMotion
                          ? { opacity: 0 }
                          : { height: 0, opacity: 0 }
                      }
                      transition={{ duration: 0.28, ease: ENTRANCE_EASE }}
                      className="overflow-hidden"
                    >
                      <div className="flex flex-col gap-0.5 pb-2 pl-2">
                        {menu.items.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={onClose}
                            className="rounded-lg px-4 py-2.5 text-sm font-medium text-graphite transition-colors hover:bg-accent-subtle hover:text-carbon"
                          >
                            {item.label}
                          </Link>
                        ))}
                        <Link
                          href={menu.viewAllHref}
                          onClick={onClose}
                          className="rounded-lg px-4 py-2.5 text-sm font-medium text-forest transition-colors hover:bg-accent-subtle"
                        >
                          {menu.viewAllLabel}
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
          <Link
            href="/contact"
            onClick={onClose}
            className="rounded-lg px-4 py-3.5 text-base font-medium text-carbon transition-colors hover:bg-accent-subtle"
          >
            Contact
          </Link>
        </nav>
        <div className="border-t border-border-light p-5" onClick={onClose}>
          <Button href="/start-a-project" className="w-full">
            Start a Project
          </Button>
        </div>
      </div>
    </div>
  );
}
