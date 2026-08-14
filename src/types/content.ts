export interface Service {
  id: string;
  number: string;
  title: string;
  description: string;
  capabilities: string[];
  cta?: { label: string; href: string };
  headline?: string;
  examples?: {
    label: string;
    items: { name: string; href: string }[];
  };
}

export interface Product {
  id: string;
  slug: string;
  category: string;
  title: string;
  headline: string;
  description: string;
  cta: { label: string; href: string };
  externalUrl?: string;
  image: string;
  imageAlt: string;
  video?: string;
  imageFit?: "cover" | "contain";
  imageBg?: "porcelain" | "obsidian" | "page";
  brandLabel?: string;
  previewUrl?: string;
  aspect?: "video" | "standard";
}

export interface ProductFormat {
  title: string;
  subtitle?: string;
  description: string;
  image: string;
  imageAlt: string;
  video?: string;
  cta: { label: string; href: string; external?: boolean };
  previewUrl?: string;
  imageFit?: "cover" | "contain";
  imageBg?: "porcelain" | "obsidian" | "page";
}

export interface ProductDetail {
  slug: string;
  title: string;
  category: string;
  headline?: string;
  summary: string;
  challenge: string;
  approach: string;
  built: string;
  technology: string[];
  outcome: string;
  image: string;
  imageAlt: string;
  imageFit?: "cover" | "contain";
  imageBg?: "porcelain" | "obsidian" | "page";
  aspect?: "video" | "standard";
  video?: string;
  gallery?: { src: string; alt: string }[];
  href?: string;
  externalUrl?: string;
  previewUrl?: string;
  brandLabel?: string;
  features?: string[];
  formats?: ProductFormat[];
  amazonUrl?: string;
  bookTitle?: string;
}

export type ClientWorkStatus = "live" | "in-development" | "case-study";

export interface ClientWork {
  slug: string;
  projectName: string;
  clientName: string;
  category: string;
  description: string;
  summary: string;
  status: ClientWorkStatus;
  statusLabel: string;
  year?: string;
  services?: string[];
  technologies?: string[];
  heroImage: string;
  heroImageAlt: string;
  screenshots?: { src: string; alt: string }[];
  externalUrl?: string;
  featured: boolean;
  previewUrl?: string;
  challenge?: string;
  approach?: string;
  built?: string;
  outcome?: string;
}

export interface Industry {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  capabilities: string[];
}

export interface Insight {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  date: string;
}

export interface InsightArticle extends Insight {
  body: string[];
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}
