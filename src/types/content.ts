export interface Service {
  id: string;
  number: string;
  title: string;
  description: string;
  capabilities: string[];
  cta?: { label: string; href: string };
  headline?: string;
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
}

export interface Industry {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  capabilities: string[];
}

export interface CaseStudy {
  slug: string;
  title: string;
  category: string;
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
  cardImageFit?: "cover" | "contain";
  cardImageBg?: "porcelain" | "obsidian" | "page";
  video?: string;
  gallery?: { src: string; alt: string }[];
  href?: string;
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
