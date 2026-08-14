import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/utils";
import { industries } from "@content/industries";
import { productDetails } from "@content/product-details";
import { clientWork } from "@content/client-work";
import { insights } from "@content/insights";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/services",
    "/products",
    "/work",
    "/industries",
    "/company",
    "/contact",
    "/research",
    "/insights",
    "/start-a-project",
    "/privacy",
    "/terms",
  ];

  return [
    ...staticPages.map((path) => ({
      url: `${SITE_URL}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.8,
    })),
    ...industries.map((i) => ({
      url: `${SITE_URL}/industries/${i.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...productDetails.map((product) => ({
      url: `${SITE_URL}/products/${product.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...clientWork.map((project) => ({
      url: `${SITE_URL}/work/${project.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...insights.map((item) => ({
      url: `${SITE_URL}/insights/${item.slug}`,
      lastModified: new Date(item.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
