import type { Metadata } from "next";
import { SITE_URL } from "@/lib/utils";

const defaultDescription =
  "RimansTech Industries designs and develops AI applications, software platforms, intelligent systems and digital products for businesses, organisations and founders.";

export const defaultMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "RimansTech Industries | AI & Software Development",
    template: "%s | RimansTech Industries",
  },
  description: defaultDescription,
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "RimansTech Industries",
    title: "RimansTech Industries | AI & Software Development",
    description: defaultDescription,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "RimansTech Industries — We build intelligent technology.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RimansTech Industries | AI & Software Development",
    description: defaultDescription,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const pageMetadata = {
  home: defaultMetadata,
  services: {
    title: "Services",
    description:
      "AI product development, custom software, AI integration, automation, machine learning and MVP development — engineered around your problem.",
  },
  products: {
    title: "Products",
    description:
      "Technology we build for ourselves — AlzDetect, Young AI Explorers and AI Quest.",
  },
  industries: {
    title: "Industries",
    description:
      "Technology designed for healthcare, education, professional services, startups, commerce and data-intensive organisations.",
  },
  company: {
    title: "Company",
    description:
      "Built around useful technology. Learn about RimansTech Industries, our mission and how we work.",
  },
  contact: {
    title: "Contact",
    description: "Talk to RimansTech. Start a project or get in touch.",
  },
  startProject: {
    title: "Start a Project",
    description:
      "Tell us what you want to build. Start with the idea or problem — no full specification required.",
  },
  research: {
    title: "Research",
    description:
      "RimansTech Labs — research translated into working systems. Vision Transformers, explainable AI and applied machine learning.",
  },
  insights: {
    title: "Insights",
    description:
      "Research, product announcements, engineering articles and company news from RimansTech Industries.",
  },
  privacy: {
    title: "Privacy Policy",
    description: "Privacy policy for RimansTech Industries website and AI assistant.",
  },
  terms: {
    title: "Terms of Use",
    description: "Terms of use for RimansTech Industries website.",
  },
} as const;
