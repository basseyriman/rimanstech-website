export type ProjectCategory =
  | "AI Application"
  | "Web Application"
  | "SaaS Platform"
  | "Business Automation"
  | "AI Integration"
  | "Machine Learning Solution"
  | "MVP / Prototype"
  | "Mobile Application"
  | "Data Platform"
  | "Other";

export type ProjectStage =
  | "Idea"
  | "Research / Planning"
  | "Prototype"
  | "Existing Product"
  | "Ready to Build";

export type BudgetRange =
  | "Under £5k"
  | "£5k–£15k"
  | "£15k–£30k"
  | "£30k–£75k"
  | "£75k+"
  | "Not Sure Yet";

export type Timeline =
  | "ASAP"
  | "1–3 months"
  | "3–6 months"
  | "6+ months"
  | "Flexible";

export interface ProjectFormData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  category: ProjectCategory;
  description: string;
  problem?: string;
  stage: ProjectStage;
  budget: BudgetRange;
  timeline: Timeline;
  chatSummary?: string;
  sourcePage?: string;
}
