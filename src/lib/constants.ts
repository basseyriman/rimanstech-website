export const NAV_LINKS = [
  { label: "Services", href: "/services" },
  { label: "Products", href: "/products" },
  { label: "Work", href: "/work" },
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
  { label: "AlzDetect", href: "/products/alzdetect" },
  { label: "VoiceDress", href: "/products/voicedress" },
  { label: "Young AI Explorers", href: "/products/young-ai-explorers" },
  { label: "AI Quest", href: "/products/ai-quest" },
] as const;

export const FOOTER_WORK = [
  { label: "Henco Homes", href: "/work/henco-homes" },
  { label: "Adrielle Studios", href: "/work/adrielle-studios" },
  { label: "Waffi Content Studio", href: "/work/waffi-content-studio" },
  { label: "View All Work", href: "/work" },
] as const;

export const FOOTER_COMPANY = [
  { label: "About", href: "/company" },
  { label: "Research", href: "/research" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
] as const;

/** Animated nav dropdown menus (click to open) */
export const NAV_DROPDOWNS = {
  Services: {
    items: [
      { label: "AI Product Development", href: "/services#ai-product-development" },
      { label: "Software Development", href: "/services#software-development" },
      { label: "AI Integration", href: "/services#ai-integration" },
      { label: "Automation & Workflows", href: "/services#automation" },
      { label: "Machine Learning", href: "/services#machine-learning" },
      { label: "MVP & Prototype Development", href: "/services#mvp-development" },
      { label: "AI Strategy & Consulting", href: "/services#consulting" },
    ],
    viewAllHref: "/services",
    viewAllLabel: "View all services",
  },
  Products: {
    items: [
      { label: "AlzDetect", href: "/products/alzdetect" },
      { label: "VoiceDress", href: "/products/voicedress" },
      { label: "Young AI Explorers", href: "/products/young-ai-explorers" },
      { label: "AI Quest", href: "/products/ai-quest" },
    ],
    viewAllHref: "/products",
    viewAllLabel: "View all products",
  },
  Work: {
    items: [
      { label: "Henco Homes", href: "/work/henco-homes" },
      { label: "Adrielle Studios", href: "/work/adrielle-studios" },
      { label: "Waffi Content Studio", href: "/work/waffi-content-studio" },
    ],
    viewAllHref: "/work",
    viewAllLabel: "View all work",
  },
  Industries: {
    items: [
      { label: "Healthcare", href: "/industries/healthcare" },
      { label: "Education", href: "/industries/education" },
      { label: "Professional Services", href: "/industries/professional-services" },
      { label: "Startups", href: "/industries/startups" },
      { label: "Retail & Commerce", href: "/industries/commerce" },
      { label: "Data-Intensive Organisations", href: "/industries/data-operations" },
    ],
    viewAllHref: "/industries",
    viewAllLabel: "View all industries",
  },
  Company: {
    items: [
      { label: "About", href: "/company" },
      { label: "Research", href: "/research" },
      { label: "Insights", href: "/insights" },
      { label: "Contact", href: "/contact" },
    ],
    viewAllHref: "/company",
    viewAllLabel: "About RimansTech",
  },
} as const;

export type NavDropdownKey = keyof typeof NAV_DROPDOWNS;

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
