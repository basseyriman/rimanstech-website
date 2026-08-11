import type { Product } from "@/types/content";

export const products: Product[] = [
  {
    id: "alzdetect",
    slug: "alzdetect",
    category: "Healthcare AI",
    title: "AlzDetect",
    headline: "AI-assisted brain MRI analysis with explainability built in.",
    description:
      "AlzDetect is an AI-powered platform exploring the classification of Alzheimer's disease stages from brain MRI imagery using Vision Transformers and explainable AI techniques.",
    cta: { label: "Explore AlzDetect", href: "/work/alzdetect" },
    externalUrl: "https://alzdetect.live",
    image: "/images/products/master_alz_analysis.png",
    imageAlt: "AlzDetect brain MRI analysis interface with classification results",
    imageFit: "contain",
  },
  {
    id: "young-ai-explorers",
    slug: "young-ai-explorers",
    category: "AI Education",
    title: "Young AI Explorers",
    headline: "Helping the next generation understand artificial intelligence.",
    description:
      "Young AI Explorers combines educational content, digital learning and hands-on resources to make AI understandable and engaging for younger learners — including the Young AI Explorers book, a digital platform and STEM outreach.",
    cta: { label: "Explore Young AI Explorers", href: "/work/young-ai-explorers" },
    externalUrl: "https://youngaiexplorers.net",
    image: "/images/products/young-ai-explorers-book-cutout.png",
    imageAlt: "Young AI Explorers book cover",
    imageFit: "contain",
  },
  {
    id: "ai-quest",
    slug: "ai-quest",
    category: "Interactive AI Learning",
    title: "AI Quest",
    headline: "Build. Train. Deploy. Play.",
    description:
      "AI Quest is a strategy card game inspired by the lifecycle of artificial intelligence systems, turning data, algorithms, upgrades, ethics and deployment into competitive gameplay.",
    cta: { label: "Discover AI Quest", href: "/work/ai-quest" },
    image: "/images/products/premium_game_box.png",
    imageAlt: "AI Quest premium game box",
    video: "/images/products/ai-quest-demo.mp4",
    imageFit: "cover",
  },
];
