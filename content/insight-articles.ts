import type { InsightArticle } from "@/types/content";
import { insights } from "./insights";

export const insightArticles: InsightArticle[] = [
  {
    slug: "explainable-ai-healthcare",
    title: "Explainable AI in Healthcare Research",
    category: "Research",
    excerpt:
      "How explainability techniques like Grad-CAM can support transparent decision-support systems in medical imaging research.",
    date: "2026-01-15",
    body: [
      "Medical imaging AI has advanced rapidly, but adoption in clinical research depends on more than accuracy. Researchers need to understand why a model reached a particular classification — especially when exploring conditions like Alzheimer's disease where interpretability supports trust and auditability.",
      "At RimansTech, our AlzDetect research platform combines Vision Transformers with explainability techniques such as Grad-CAM to highlight the regions of an MRI scan that most influenced a model's output. This does not replace clinical judgement, but it gives researchers a starting point for discussion and validation.",
      "We see explainability as a design requirement, not an optional overlay. When building decision-support tools in healthcare, transparency should be planned from the architecture stage — including what the model can and cannot claim, how outputs are presented, and what human oversight remains in the loop.",
    ],
  },
  {
    slug: "ai-quest-launch",
    title: "Introducing AI Quest: Learning AI Through Play",
    category: "Product",
    excerpt:
      "AI Quest is now available — a strategy card game that teaches the lifecycle of artificial intelligence through competitive gameplay.",
    date: "2025-11-20",
    body: [
      "Understanding how AI systems are built, trained and deployed is easier when learners can experience the lifecycle rather than only read about it. AI Quest was designed around that principle.",
      "Players collect data, train models, navigate ethical trade-offs and deploy systems — mirroring real AI development stages in a competitive tabletop format. The game is suited to workshops, classrooms and informal learning environments where engagement matters as much as accuracy.",
      "AI Quest joins our broader education work alongside Young AI Explorers, reflecting our belief that AI literacy should be accessible, practical and memorable.",
    ],
  },
  {
    slug: "young-ai-explorers-book",
    title: "Young AI Explorers: A New Approach to AI Literacy",
    category: "Education",
    excerpt:
      "Our new book and digital platform help younger learners understand artificial intelligence through accessible, engaging content.",
    date: "2025-09-10",
    body: [
      "Artificial intelligence is shaping how young people learn, work and interact with technology. Yet much AI education material is either too technical or too simplified to be useful.",
      "Young AI Explorers combines a published book, digital learning modules and outreach materials designed for schools, families and STEM programmes. The goal is clarity without condescension — explaining concepts like training data, pattern recognition and responsible use in language learners can actually apply.",
      "We built this programme because we believe the next generation deserves better AI education than hype-driven summaries. Useful technology starts with useful understanding.",
    ],
  },
  {
    slug: "alzdetect-research-update",
    title: "AlzDetect: Vision Transformers for MRI Analysis",
    category: "Research",
    excerpt:
      "An update on our research exploring Vision Transformer architectures for Alzheimer's disease stage classification from brain MRI.",
    date: "2025-07-22",
    body: [
      "AlzDetect continues to explore how modern computer vision architectures can support Alzheimer's disease research from brain MRI data. Our recent work focuses on Vision Transformers and their ability to capture spatial relationships in medical imaging.",
      "The platform remains research-oriented: it is designed for exploration and validation, not clinical diagnosis. That boundary is intentional. Decision-support research tools must be clear about scope, limitations and the need for expert oversight.",
      "We are iterating on model performance, explainability visualisations and the researcher workflow — balancing technical depth with an interface that supports focused analysis rather than overwhelming users with raw model output.",
    ],
  },
  {
    slug: "building-mvps-with-ai",
    title: "Building MVPs with AI: A Practical Guide for Founders",
    category: "Engineering",
    excerpt:
      "Practical considerations for founders looking to integrate AI into their first product version.",
    date: "2025-05-08",
    body: [
      "Founders often ask whether AI should be central to an MVP or added later. The answer depends on whether AI is the product's core value proposition or an enhancement to an existing workflow.",
      "When AI is core, start narrow: one well-defined problem, one measurable outcome and a clear fallback when the model is uncertain. When AI is supplementary, ship the workflow first and add intelligence where it reduces friction or cost.",
      "At RimansTech we help founders scope MVPs around real constraints — data availability, integration complexity, regulatory context and time to validation — rather than chasing feature lists that look impressive in pitch decks but fail in production.",
    ],
  },
  {
    slug: "responsible-ai-deployment",
    title: "Responsible AI Deployment: Principles and Practice",
    category: "Research",
    excerpt:
      "How we approach responsible AI deployment across our products and client projects.",
    date: "2025-03-14",
    body: [
      "Responsible AI is often discussed in abstract terms. In practice it means making explicit choices about data, model behaviour, human oversight and failure modes before deployment — not after something goes wrong.",
      "Our principles include proportionate scope (systems should not claim more than they can support), transparency where decisions affect people, privacy by design and continuous evaluation as real-world usage reveals edge cases.",
      "These principles apply equally to our own products — AlzDetect, Young AI Explorers, AI Quest — and to client work. Useful technology is technology you can stand behind.",
    ],
  },
];

export function getInsightArticle(slug: string): InsightArticle | undefined {
  return insightArticles.find((a) => a.slug === slug);
}

export function getAllInsightSlugs(): string[] {
  return insights.map((i) => i.slug);
}
