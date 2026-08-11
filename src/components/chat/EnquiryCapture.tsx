"use client";

import { useState } from "react";
import type { ChatMessage } from "@/types/chat";
import { buildConversationSummary } from "@/lib/chat/system-prompt";
import { useChat } from "./ChatProvider";
import { trackEvent } from "@/lib/analytics";
import { CONTACT_EMAIL } from "@/lib/utils";

interface EnquiryCaptureProps {
  messages: ChatMessage[];
}

export function EnquiryCapture({ messages }: EnquiryCaptureProps) {
  const { setShowEnquiry } = useChat();
  const [step, setStep] = useState<"consent" | "form" | "success">("consent");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "", phone: "" });
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    const res = await fetch("/api/enquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        company: form.company,
        phone: form.phone,
        category: "Other",
        description: "Project enquiry submitted via AI Assistant chat.",
        stage: "Idea",
        budget: "Not Sure Yet",
        timeline: "Flexible",
        chatSummary: buildConversationSummary(messages),
        sourcePage: "AI Assistant",
      }),
    });

    if (!res.ok) {
      setError(`Unable to send. Please email ${CONTACT_EMAIL}.`);
      setLoading(false);
      return;
    }

    trackEvent("project_enquiry_submitted");
    setStep("success");
    setLoading(false);
  };

  if (step === "success") {
    return (
      <div className="mt-4 rounded-xl border border-border-light bg-page p-4">
        <p className="text-sm font-medium text-carbon">Enquiry sent.</p>
        <p className="mt-2 text-sm text-graphite">
          Thank you. We&apos;ll review your conversation and get back to you.
        </p>
      </div>
    );
  }

  if (step === "consent") {
    return (
      <div className="mt-4 rounded-xl border border-border-light bg-page p-4">
        <p className="text-sm text-graphite">
          I can send a summary of this conversation to the RimansTech team so they
          can follow up with you.
        </p>
        <div className="mt-3 flex gap-2">
          <button
            type="button"
            onClick={() => setStep("form")}
            className="rounded-lg bg-forest px-4 py-2 text-sm font-medium text-white hover:bg-forest-hover"
          >
            Send to RimansTech
          </button>
          <button
            type="button"
            onClick={() => setShowEnquiry(false)}
            className="rounded-lg border border-border-light px-4 py-2 text-sm text-graphite hover:bg-porcelain"
          >
            Not Yet
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 space-y-3 rounded-xl border border-border-light bg-page p-4">
      <input
        type="text"
        placeholder="Your name *"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="w-full rounded-lg border border-border-light px-3 py-2.5 text-sm focus:border-forest focus:outline-none"
      />
      <input
        type="email"
        placeholder="Email *"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="w-full rounded-lg border border-border-light px-3 py-2.5 text-sm focus:border-forest focus:outline-none"
      />
      <input
        type="text"
        placeholder="Company / Organisation"
        value={form.company}
        onChange={(e) => setForm({ ...form, company: e.target.value })}
        className="w-full rounded-lg border border-border-light px-3 py-2.5 text-sm focus:border-forest focus:outline-none"
      />
      <input
        type="tel"
        placeholder="Phone (optional)"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
        className="w-full rounded-lg border border-border-light px-3 py-2.5 text-sm focus:border-forest focus:outline-none"
      />
      {error && <p className="text-xs text-red-600">{error}</p>}
      <button
        type="button"
        onClick={handleSubmit}
        disabled={!form.name || !form.email || loading}
        className="w-full rounded-lg bg-forest py-2.5 text-sm font-medium text-white hover:bg-forest-hover disabled:opacity-40"
      >
        {loading ? "Sending…" : "Submit Enquiry"}
      </button>
    </div>
  );
}
