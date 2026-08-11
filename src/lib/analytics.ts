import type { AnalyticsEvent } from "@/types/chat";

declare global {
  interface Window {
    va?: (event: "event", name: string, data?: Record<string, string>) => void;
  }
}

export function trackEvent(event: AnalyticsEvent, metadata?: Record<string, string>) {
  if (typeof window === "undefined") return;

  if (process.env.NODE_ENV === "development") {
    console.debug("[analytics]", event, metadata);
  }

  if (typeof window.va === "function") {
    window.va("event", event, metadata);
  }
}
