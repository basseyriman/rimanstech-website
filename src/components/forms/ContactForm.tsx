"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import type { ContactFormValues } from "@/lib/validation/project-form";
import { CONTACT_EMAIL } from "@/lib/utils";

interface ContactFormProps {
  sourcePage?: string;
}

export function ContactForm({ sourcePage = "/contact" }: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormValues, string>>>({});
  const [formData, setFormData] = useState<Partial<ContactFormValues>>({ sourcePage });

  const update = (field: keyof ContactFormValues, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrors({});

    const res = await fetch("/api/enquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "contact", ...formData }),
    });

    const data = await res.json();

    if (!res.ok) {
      setStatus("error");
      if (data.errors) setErrors(data.errors);
      return;
    }

    setStatus("success");
  };

  if (status === "success") {
    return (
      <div className="rounded-xl border border-border-light bg-porcelain p-8">
        <h2 className="text-xl font-medium text-carbon">Message sent.</h2>
        <p className="mt-3 text-sm leading-relaxed text-graphite">
          We&apos;ll get back to you as soon as we can.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="grid gap-5 md:grid-cols-2">
        <Input
          label="Your Name"
          name="name"
          required
          value={formData.name ?? ""}
          onChange={(e) => update("name", e.target.value)}
          error={errors.name}
        />
        <Input
          label="Email"
          name="email"
          type="email"
          required
          value={formData.email ?? ""}
          onChange={(e) => update("email", e.target.value)}
          error={errors.email}
        />
      </div>

      <Input
        label="Subject"
        name="subject"
        required
        value={formData.subject ?? ""}
        onChange={(e) => update("subject", e.target.value)}
        error={errors.subject}
      />

      <Textarea
        label="Message"
        name="message"
        required
        rows={5}
        value={formData.message ?? ""}
        onChange={(e) => update("message", e.target.value)}
        error={errors.message}
      />

      {status === "error" && !Object.keys(errors).length && (
        <p className="text-sm text-red-600">
          Something went wrong. Please try again or email {CONTACT_EMAIL}.
        </p>
      )}

      <Button type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Sending…" : "Send Message"}
      </Button>
    </form>
  );
}
