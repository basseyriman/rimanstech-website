export const NAV_LINKS = [
  { label: "What We Do", href: "/#what-we-do" },
  { label: "Services", href: "/services" },
  { label: "Products", href: "/products" },
  { label: "Industries", href: "/industries" },
  { label: "Research", href: "/research" },
  { label: "Company", href: "/company" },
] as const;

export const FOOTER_SERVICES = [
  { label: "AI Product Development", href: "/services#ai-product-development" },
  { label: "Software Development", href: "/services#software-development" },
  { label: "AI Integration", href: "/services#ai-integration" },
  { label: "Automation", href: "/services#automation" },
  { label: "Machine Learning", href: "/services#machine-learning" },
  { label: "MVP Development", href: "/services#mvp-development" },
] as const;

export const FOOTER_PRODUCTS = [
  { label: "AlzDetect", href: "/work/alzdetect" },
  { label: "Young AI Explorers", href: "/work/young-ai-explorers" },
  { label: "AI Quest", href: "/work/ai-quest" },
] as const;

export const FOOTER_COMPANY = [
  { label: "About", href: "/company" },
  { label: "Founder", href: "/company#founder" },
  { label: "Research", href: "/research" },
  { label: "Insights", href: "/insights" },
  { label: "Careers", href: "/company#careers" },
  { label: "Contact", href: "/contact" },
] as const;

export const SOCIAL_LINKS = [
  {
    label: "LinkedIn",
    href:
      process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN ??
      "https://www.linkedin.com/in/basseyriman",
  },
  {
    label: "GitHub",
    href:
      process.env.NEXT_PUBLIC_SOCIAL_GITHUB ?? "https://github.com/basseyriman",
  },
  ...(process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM
    ? [
        {
          label: "Instagram",
          href: process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM,
        },
      ]
    : []),
] as const;
