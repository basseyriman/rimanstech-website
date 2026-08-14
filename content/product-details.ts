import type { ProductDetail } from "@/types/content";

export const productDetails: ProductDetail[] = [
  {
    slug: "alzdetect",
    title: "AlzDetect",
    category: "Healthcare AI",
    brandLabel: "A RIMANSTECH PRODUCT",
    headline: "AI-assisted brain MRI analysis with explainability built in.",
    summary:
      "An AI-powered brain MRI analysis platform exploring Alzheimer's disease stage classification using Vision Transformers and explainable AI.",
    challenge:
      "Alzheimer's disease diagnosis from brain MRI requires specialist expertise and careful interpretation. There is a need for research tools that can assist with classification while maintaining transparency in how decisions are made.",
    approach:
      "We developed AlzDetect as a research-led platform using Vision Transformers for MRI analysis, combined with explainable AI techniques to surface the reasoning behind model outputs.",
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
      "AlzDetect demonstrates how advanced computer vision and explainable AI can be combined in a decision-support research platform. It is available at alzdetect.live for research exploration — not as an independent clinical diagnostic tool.",
    image: "/images/products/master_alz_analysis.png",
    imageAlt: "AlzDetect platform interface showing MRI analysis results",
    imageFit: "cover",
    imageBg: "obsidian",
    externalUrl: "https://www.alzdetect.live/",
  },
  {
    slug: "voicedress",
    title: "VoiceDress",
    category: "Fashion Technology / AI Consumer Product",
    brandLabel: "A RIMANSTECH PRODUCT",
    headline: "Your wardrobe, intelligently styled.",
    summary:
      "VoiceDress is an AI-powered fashion platform that helps users discover outfit combinations from their own wardrobe based on the occasion, context and personal style.",
    challenge:
      "Getting dressed for an occasion often means decision fatigue — searching through a wardrobe, guessing what works together and wondering how an outfit will actually look.",
    approach:
      "VoiceDress applies conversational AI and visual try-on to everyday styling — letting users describe where they are going, receive a confident outfit suggestion from their own wardrobe and see it styled onto their photo.",
    built:
      "An AI fashion platform with wardrobe upload, voice-driven styling, weather-aware recommendations, visual outfit try-on and conversational piece swapping.",
    technology: [
      "Generative AI",
      "Computer vision",
      "Voice interfaces",
      "Next.js",
      "Personal styling AI",
    ],
    outcome:
      "VoiceDress shows how RimansTech applies AI to an everyday consumer experience — turning wardrobe data into practical, visual outfit decisions.",
    image: "/images/products/voicedress-home.png",
    imageAlt: "VoiceDress — AI fashion styling platform demo",
    video: "/images/products/20260811-1945-02.5206643.mp4",
    imageFit: "cover",
    imageBg: "obsidian",
    aspect: "video",
    externalUrl: "https://www.voicedress.com/",
    features: [
      "AI outfit suggestions",
      "Personal wardrobe",
      "Occasion-based recommendations",
      "Digital styling",
      "Visual outfit experience",
    ],
  },
  {
    slug: "young-ai-explorers",
    title: "Young AI Explorers",
    category: "AI Education",
    brandLabel: "A RIMANSTECH PRODUCT",
    headline: "Making artificial intelligence understandable for younger learners.",
    summary:
      "An AI education initiative designed to make artificial intelligence understandable, practical and engaging for younger learners.",
    challenge:
      "Artificial intelligence is increasingly central to modern life, yet accessible educational resources for younger learners remain limited. There is a need for content that explains AI concepts clearly without oversimplifying.",
    approach:
      "We created a multi-format educational ecosystem combining a digital learning platform, a published book and hands-on STEM resources designed for schools, families and outreach programmes.",
    built:
      "The Young AI Explorers digital platform, the Young AI Explorers book, and educational outreach materials for workshops and STEM environments.",
    technology: [
      "Next.js",
      "Content management",
      "Interactive learning modules",
      "Print publishing",
    ],
    outcome:
      "Young AI Explorers provides a structured pathway for younger learners to understand AI concepts, supporting classroom learning, independent study and educational outreach.",
    image: "/images/products/young-ai-explorers-book.png",
    imageAlt: "Young AI Explorers book cover",
    imageFit: "cover",
    imageBg: "obsidian",
    externalUrl: "https://www.youngaiexplorers.net/",
    bookTitle: "Young AI Explorers: A Guide to the Future",
    amazonUrl:
      "https://www.amazon.co.uk/Young-AI-Explorers-Guide-Future/dp/B0H4KGNW3B/",
    formats: [
      {
        title: "Digital Learning Platform",
        subtitle: "Interactive educational content and AI-learning experiences.",
        description:
          "The Young AI Explorers platform delivers interactive educational content and AI-learning experiences designed for younger learners, schools and outreach programmes.",
        image: "/images/products/young-ai-explorers-book.png",
        imageAlt: "Young AI Explorers digital learning platform",
        cta: {
          label: "Explore Young AI Explorers",
          href: "https://www.youngaiexplorers.net/",
          external: true,
        },
        imageFit: "cover",
        imageBg: "obsidian",
      },
      {
        title: "Book",
        subtitle: "Young AI Explorers: A Guide to the Future",
        description:
          "A published guide making AI concepts accessible and engaging for younger readers — supported by educational outreach, STEM engagement and AI literacy resources.",
        image: "/images/products/young-ai-explorers-book.png",
        imageAlt: "Young AI Explorers book cover",
        cta: {
          label: "View the Book on Amazon",
          href: "https://www.amazon.co.uk/Young-AI-Explorers-Guide-Future/dp/B0H4KGNW3B/",
          external: true,
        },
        imageFit: "cover",
        imageBg: "obsidian",
      },
    ],
  },
  {
    slug: "ai-quest",
    title: "AI Quest",
    category: "AI Education / Interactive Technology",
    brandLabel: "A RIMANSTECH PRODUCT",
    headline: "Build. Train. Deploy. Play.",
    summary:
      "AI Quest transforms concepts from the artificial intelligence development lifecycle into an interactive strategy experience.",
    challenge:
      "Understanding how AI systems are built, trained and deployed requires more than reading — it benefits from experiential learning that makes abstract concepts tangible.",
    approach:
      "We designed AI Quest as a product family spanning physical and digital formats — where players navigate data collection, model training, algorithm upgrades, ethical decisions and deployment.",
    built:
      "A premium physical strategy card game with illustrated cards, wooden resource tokens and rulebook, alongside a digital edition that brings the AI Quest experience into an interactive software environment.",
    technology: [
      "Game design",
      "Educational content design",
      "Print production",
      "Interactive software",
    ],
    outcome:
      "AI Quest transforms complex AI lifecycle concepts into engaging gameplay and interactive learning, suitable for workshops, classrooms and informal learning environments.",
    image: "/images/products/premium_game_box.png",
    imageAlt: "AI Quest premium game box",
    video: "/images/products/ai-quest-demo.mp4",
    imageFit: "cover",
    externalUrl: "https://www.aiquestgame.com/",
    gallery: [
      {
        src: "/images/products/ai-quest-wood-cubes.jpeg",
        alt: "AI Quest wooden resource cubes used in gameplay",
      },
    ],
    formats: [
      {
        title: "Physical Edition",
        subtitle: "A physical strategy card game with cards, objectives and competitive gameplay.",
        description:
          "The physical AI Quest edition includes premium product photography-worthy components — illustrated cards, wooden cubes, objectives and competitive gameplay designed for workshops, family play and AI literacy events.",
        image: "/images/products/premium_game_box.png",
        imageAlt: "AI Quest premium physical game box",
        video: "/images/products/ai-quest-demo.mp4",
        cta: {
          label: "Discover the Physical Game",
          href: "https://www.aiquestgame.com/",
          external: true,
        },
        imageFit: "cover",
        imageBg: "obsidian",
      },
      {
        title: "Digital Edition",
        subtitle: "An interactive software version of the AI Quest experience.",
        description:
          "The digital edition brings AI Quest into an interactive software environment — extending the strategy experience beyond the tabletop.",
        image: "/images/products/premium_game_box.png",
        imageAlt: "AI Quest digital edition",
        cta: {
          label: "Play / Explore Digital AI Quest",
          href: "https://www.aiquestgame.com/",
          external: true,
        },
        imageFit: "cover",
        imageBg: "obsidian",
      },
    ],
  },
];

export function getProductDetail(slug: string): ProductDetail | undefined {
  return productDetails.find((product) => product.slug === slug);
}
