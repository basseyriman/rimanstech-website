import type { ClientWork } from "@/types/content";

export const clientWork: ClientWork[] = [
  {
    slug: "henco-homes",
    projectName: "Henco Homes",
    clientName: "Henco Homes",
    category: "Property Technology / Marketplace",
    description:
      "A digital property marketplace built to connect property professionals and customers through an online listing and discovery experience.",
    summary:
      "Nigeria's trusted property marketplace — connecting buyers and renters with premium listings across Lagos, Abuja and beyond.",
    status: "live",
    statusLabel: "CLIENT PROJECT",
    year: "2024",
    services: [
      "Software Development",
      "Platform Engineering",
      "Product Development",
    ],
    technologies: [
      "Next.js",
      "Web application",
      "Property listings",
      "User accounts",
      "Responsive design",
    ],
    heroImage: "/images/work/henco-homes.svg",
    heroImageAlt: "Henco Homes property marketplace",
    externalUrl: "https://www.hencohomes.com/",
    previewUrl: "https://www.hencohomes.com/",
    featured: true,
    challenge:
      "Henco Homes needed a digital platform to connect property professionals and customers through a premium online listing and discovery experience in Nigeria's property market.",
    approach:
      "RimansTech approached the project as a full product build — designing and engineering a responsive property marketplace with listing discovery, search and user-facing flows suited to a premium real estate audience.",
    built:
      "A responsive web application with property listing and discovery, location-based search, featured properties, user accounts, subscription functionality and administration tools.",
    outcome:
      "A live property marketplace platform enabling listing discovery, search and engagement for buyers and renters across Nigeria's major cities.",
  },
  {
    slug: "adrielle-studios",
    projectName: "Adrielle Studios",
    clientName: "Adrielle Studios",
    category: "Creative / Digital Experience",
    description:
      "A creative digital experience built to present Adrielle Studios' brand, services and portfolio through a refined online presence.",
    summary:
      "A creative studio website engineered to showcase brand identity, services and visual work through a polished digital experience.",
    status: "live",
    statusLabel: "CLIENT PROJECT",
    services: ["Software Development", "Web Design", "Digital Experience"],
    technologies: ["Next.js", "Responsive web application", "Content presentation"],
    heroImage: "/images/work/adrielle-studios.svg",
    heroImageAlt: "Adrielle Studios digital experience",
    externalUrl: "https://adrielle-eta.vercel.app/",
    previewUrl: "https://adrielle-eta.vercel.app/",
    featured: true,
    challenge:
      "Adrielle Studios needed a digital presence that reflected the quality and creativity of the studio — presenting services and work through a refined, modern web experience.",
    approach:
      "RimansTech designed and built a responsive website focused on visual presentation, clear service communication and a premium creative studio feel.",
    built:
      "A responsive web application presenting the Adrielle Studios brand, services and portfolio through a polished digital experience.",
    outcome:
      "A live creative studio website that supports brand presentation and client engagement online.",
  },
  {
    slug: "waffi-content-studio",
    projectName: "Waffi Content Studio",
    clientName: "Waffi Content Studio",
    category: "Creative Technology / Content Platform",
    description:
      "Digital platform currently being developed for Waffi Content Studio.",
    summary:
      "A content platform in active development — designed to support Waffi Content Studio's creative and digital operations.",
    status: "in-development",
    statusLabel: "IN DEVELOPMENT",
    services: ["Software Development", "Platform Engineering"],
    heroImage: "/images/work/waffi-content-studio.svg",
    heroImageAlt: "Waffi Content Studio platform in development",
    externalUrl: "https://www.wafficontentstudio.com/",
    previewUrl: "https://www.wafficontentstudio.com/",
    featured: true,
    challenge:
      "Waffi Content Studio required a digital platform to support content operations and client-facing presentation — currently in active development.",
    approach:
      "RimansTech is engineering the platform architecture and product experience in collaboration with the client, with production delivery underway.",
    built:
      "Platform architecture and product experience currently in development for Waffi Content Studio.",
    outcome:
      "Project in development — status will be updated once the platform is live.",
  },
];

export function getClientWork(slug: string): ClientWork | undefined {
  return clientWork.find((project) => project.slug === slug);
}

export function getFeaturedClientWork(): ClientWork[] {
  return clientWork.filter((project) => project.featured);
}
