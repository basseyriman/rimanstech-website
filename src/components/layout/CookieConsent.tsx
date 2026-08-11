"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const CONSENT_KEY = "rimanstech-cookie-consent";

type ConsentState = "unknown" | "accepted" | "declined";

function getConsent(): ConsentState {
  if (typeof window === "undefined") return "unknown";
  const value = localStorage.getItem(CONSENT_KEY);
  if (value === "accepted" || value === "declined") return value;
  return "unknown";
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("rimanstech-consent-change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("rimanstech-consent-change", callback);
  };
}

function setConsent(value: "accepted" | "declined") {
  localStorage.setItem(CONSENT_KEY, value);
  window.dispatchEvent(new Event("rimanstech-consent-change"));
}

export function hasAnalyticsConsent(): boolean {
  return getConsent() === "accepted";
}

export function CookieConsent() {
  const consent = useSyncExternalStore(subscribe, getConsent, () => "unknown" as ConsentState);

  if (consent !== "unknown") return null;

  return (
    <div
      className={cn(
        "fixed bottom-4 left-4 z-[70] max-w-[min(100vw-2rem,24rem)] rounded-xl border border-border-light bg-page/95 p-4 shadow-xl backdrop-blur-sm",
        "md:bottom-6 md:left-6 md:max-w-md"
      )}
      role="dialog"
      aria-label="Cookie preferences"
      aria-modal="false"
    >
      <p className="text-sm leading-relaxed text-graphite">
        We use essential cookies for site functionality and optional analytics to
        improve the site. The AI Assistant stores conversation data in your browser
        session. See our{" "}
        <Link href="/privacy" className="text-forest underline">
          Privacy Policy
        </Link>
        .
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setConsent("accepted")}
          className="rounded-lg bg-forest px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-forest-hover"
        >
          Accept
        </button>
        <button
          type="button"
          onClick={() => setConsent("declined")}
          className="rounded-lg border border-border-light px-4 py-2 text-sm font-medium text-graphite transition-colors hover:border-sage"
        >
          Decline analytics
        </button>
      </div>
    </div>
  );
}
