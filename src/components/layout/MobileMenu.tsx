"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
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
          "absolute top-0 right-0 h-full w-full max-w-sm bg-page shadow-xl transition-transform duration-300 ease-out",
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
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="rounded-lg px-4 py-3.5 text-base font-medium text-carbon transition-colors hover:bg-accent-subtle"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={onClose}
            className="rounded-lg px-4 py-3.5 text-base font-medium text-carbon transition-colors hover:bg-accent-subtle"
          >
            Contact
          </Link>
        </nav>
        <div className="border-t border-border-light p-5">
          <Button href="/start-a-project" className="w-full" onClick={onClose}>
            Start a Project
          </Button>
        </div>
      </div>
    </div>
  );
}
