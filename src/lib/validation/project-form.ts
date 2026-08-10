import { z } from "zod";

export const projectCategories = [
  "AI Application",
  "Web Application",
  "SaaS Platform",
  "Business Automation",
  "AI Integration",
  "Machine Learning Solution",
  "MVP / Prototype",
  "Mobile Application",
  "Data Platform",
  "Other",
] as const;

export const projectStages = [
  "Idea",
  "Research / Planning",
  "Prototype",
  "Existing Product",
  "Ready to Build",
] as const;

export const budgetRanges = [
  "Under £5k",
  "£5k–£15k",
  "£15k–£30k",
  "£30k–£75k",
  "£75k+",
  "Not Sure Yet",
] as const;

export const timelines = [
  "ASAP",
  "1–3 months",
  "3–6 months",
  "6+ months",
  "Flexible",
] as const;

export const projectFormSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Please enter a valid email"),
  company: z.string().optional(),
  phone: z.string().optional(),
  category: z.enum(projectCategories, { message: "Please select a category" }),
  description: z.string().min(20, "Please provide more detail about your project"),
  problem: z.string().optional(),
  stage: z.enum(projectStages, { message: "Please select a stage" }),
  budget: z.enum(budgetRanges, { message: "Please select a budget range" }),
  timeline: z.enum(timelines, { message: "Please select a timeline" }),
  chatSummary: z.string().optional(),
  sourcePage: z.string().optional(),
});

export const chatEnquirySchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().optional(),
  phone: z.string().optional(),
  chatSummary: z.string().min(10),
  consent: z.literal(true, { message: "Consent is required" }),
});

export const chatMessageSchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().max(2000),
      })
    )
    .min(1)
    .max(50),
});

export type ProjectFormValues = z.infer<typeof projectFormSchema>;
