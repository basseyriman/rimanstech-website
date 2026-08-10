import type { AnalyticsEvent } from "@/types/chat";

export function trackEvent(event: AnalyticsEvent, _metadata?: Record<string, string>) {
  if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
    console.debug("[analytics]", event, _metadata);
  }
}
