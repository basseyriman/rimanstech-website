import type { CaseStudy } from "@/types/content";

export const caseStudies: CaseStudy[] = [
  {
    slug: "alzdetect",
    title: "AlzDetect",
    category: "Healthcare AI",
    summary:
      "AI-assisted brain MRI analysis platform exploring Alzheimer's disease stage classification.",
    challenge:
      "Alzheimer's disease diagnosis from brain MRI requires specialist expertise and careful interpretation. There is a need for research tools that can assist with classification while maintaining transparency in how decisions are made.",
    approach:
      "We developed AlzDetect as a research platform using Vision Transformers for MRI analysis, combined with explainable AI techniques to surface the reasoning behind model outputs.",
    built:
      "A web-based platform for uploading and analysing brain MRI scans, with classification results, explainability visualisations and a research-oriented interface designed for clinical researchers.",
    technology: [
      "Vision Transformers",
      "PyTorch",
      "Explainable AI (Grad-CAM)",
      "Next.js",
      "Python",
      "FastAPI",
    ],
    outcome:
      "AlzDetect demonstrates how advanced computer vision and explainable AI can be combined in a decision-support research platform. It is available at alzdetect.live for research exploration.",
    image: "/images/products/master_alz_analysis.png",
    imageAlt: "AlzDetect platform interface showing MRI analysis results",
    imageFit: "cover",
    imageBg: "obsidian",
    href: "https://alzdetect.live",
  },
  {
    slug: "young-ai-explorers",
    title: "Young AI Explorers",
    category: "AI Education",
    summary:
      "Educational programme making artificial intelligence accessible to younger learners.",
    challenge:
      "Artificial intelligence is increasingly central to modern life, yet accessible educational resources for younger learners remain limited. There is a need for content that explains AI concepts clearly without oversimplifying.",
    approach:
      "We created a multi-format educational programme combining a published book, digital learning platform and hands-on STEM resources designed for schools, families and outreach programmes.",
    built:
      "The Young AI Explorers book, a digital learning platform with interactive content, and educational outreach materials for workshops and STEM environments.",
    technology: [
      "Next.js",
      "Content management",
      "Interactive learning modules",
      "Print publishing",
    ],
    outcome:
      "Young AI Explorers provides a structured pathway for younger learners to understand AI concepts, supporting both classroom and independent learning.",
    image: "/images/products/young-ai-explorers-book.png",
    imageAlt: "Young AI Explorers book",
    imageFit: "cover",
    imageBg: "obsidian",
    href: "https://youngaiexplorers.net",
  },
  {
    slug: "ai-quest",
    title: "AI Quest",
    category: "Interactive AI Learning",
    summary:
      "Strategy card game teaching the lifecycle of artificial intelligence systems.",
    challenge:
      "Understanding how AI systems are built, trained and deployed requires more than reading — it benefits from experiential learning that makes abstract concepts tangible.",
    approach:
      "We designed AI Quest as a competitive strategy card game where players navigate data collection, model training, algorithm upgrades, ethical decisions and deployment — mirroring real AI development lifecycle.",
    built:
      "A premium tabletop card game with illustrated cards, wooden resource tokens and rulebook, designed for educational workshops, family play and AI literacy events.",
    technology: [
      "Game design",
      "Educational content design",
      "Print production",
    ],
    outcome:
      "AI Quest transforms complex AI lifecycle concepts into engaging gameplay, making it suitable for workshops, classrooms and informal learning environments.",
    image: "/images/products/premium_game_box.png",
    imageAlt: "AI Quest premium game box",
    video: "/images/products/ai-quest-demo.mp4",
    imageFit: "cover",
    gallery: [
      {
        src: "/images/products/ai-quest-wood-cubes.jpeg",
        alt: "AI Quest wooden resource cubes used in gameplay",
      },
    ],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}
