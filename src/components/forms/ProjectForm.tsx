"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input, Select, Textarea } from "@/components/ui/Input";
import {
  projectCategories,
  projectStages,
  budgetRanges,
  timelines,
  type ProjectFormValues,
} from "@/lib/validation/project-form";

interface ProjectFormProps {
  defaultChatSummary?: string;
  sourcePage?: string;
}

export function ProjectForm({ defaultChatSummary, sourcePage = "Website" }: ProjectFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Partial<Record<keyof ProjectFormValues, string>>>({});
  const [formData, setFormData] = useState<Partial<ProjectFormValues>>({
    chatSummary: defaultChatSummary,
    sourcePage,
  });

  const update = (field: keyof ProjectFormValues, value: string) => {
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
      body: JSON.stringify(formData),
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
      <div className="rounded-xl border border-border-light bg-porcelain p-8 md:p-12">
        <h2 className="text-2xl font-medium text-carbon">Thank you.</h2>
        <p className="mt-4 text-base leading-relaxed text-graphite">
          We&apos;ll review your project and get back to you.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div className="grid gap-6 md:grid-cols-2">
        <Input
          label="Your Name"
          name="name"
          required
          value={formData.name ?? ""}
          onChange={(e) => update("name", e.target.value)}
          error={errors.name}
        />
        <Input
          label="Work Email"
          name="email"
          type="email"
          required
          value={formData.email ?? ""}
          onChange={(e) => update("email", e.target.value)}
          error={errors.email}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Input
          label="Company / Organisation"
          name="company"
          value={formData.company ?? ""}
          onChange={(e) => update("company", e.target.value)}
        />
        <Input
          label="Phone"
          name="phone"
          type="tel"
          value={formData.phone ?? ""}
          onChange={(e) => update("phone", e.target.value)}
        />
      </div>

      <Select
        label="What would you like to build?"
        name="category"
        required
        options={projectCategories}
        placeholder="Select a category"
        value={formData.category ?? ""}
        onChange={(e) => update("category", e.target.value)}
        error={errors.category}
      />

      <Textarea
        label="Tell us about the project"
        name="description"
        required
        rows={5}
        value={formData.description ?? ""}
        onChange={(e) => update("description", e.target.value)}
        error={errors.description}
      />

      <Textarea
        label="What problem are you trying to solve?"
        name="problem"
        rows={3}
        value={formData.problem ?? ""}
        onChange={(e) => update("problem", e.target.value)}
      />

      <div className="grid gap-6 md:grid-cols-3">
        <Select
          label="What stage are you at?"
          name="stage"
          required
          options={projectStages}
          placeholder="Select stage"
          value={formData.stage ?? ""}
          onChange={(e) => update("stage", e.target.value)}
          error={errors.stage}
        />
        <Select
          label="Estimated budget"
          name="budget"
          required
          options={budgetRanges}
          placeholder="Select budget"
          value={formData.budget ?? ""}
          onChange={(e) => update("budget", e.target.value)}
          error={errors.budget}
        />
        <Select
          label="Target timeline"
          name="timeline"
          required
          options={timelines}
          placeholder="Select timeline"
          value={formData.timeline ?? ""}
          onChange={(e) => update("timeline", e.target.value)}
          error={errors.timeline}
        />
      </div>

      {status === "error" && !Object.keys(errors).length && (
        <p className="text-sm text-red-600">
          Something went wrong. Please try again or email support@rimanstech.com.
        </p>
      )}

      <Button type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Submitting…" : "Submit Project"}
      </Button>
    </form>
  );
}
