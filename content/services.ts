import type { Service } from "@/types/content";

export const services: Service[] = [
  {
    id: "ai-product-development",
    number: "01",
    title: "AI Product Development",
    description:
      "Custom AI-powered applications designed around real use cases — from concept and model selection through interface development and deployment.",
    capabilities: [
      "Generative AI applications",
      "AI agents",
      "NLP",
      "Computer vision",
      "Recommendation systems",
      "Predictive systems",
      "Intelligent search",
      "AI-powered workflows",
    ],
    cta: { label: "Discuss an AI Project", href: "/start-a-project" },
  },
  {
    id: "software-development",
    number: "02",
    title: "Software Development",
    description:
      "Custom digital products and platforms engineered for reliability, usability and growth.",
    capabilities: [
      "SaaS applications",
      "Web applications",
      "Internal platforms",
      "Dashboards",
      "Portals",
      "APIs",
      "Database-backed applications",
      "Full-stack development",
    ],
    cta: { label: "Build Your Product", href: "/start-a-project" },
  },
  {
    id: "ai-integration",
    number: "03",
    title: "AI Integration",
    description:
      "Bring intelligent functionality into an existing organisation, application or workflow.",
    capabilities: [
      "AI APIs",
      "Workflow intelligence",
      "Internal copilots",
      "Knowledge assistants",
      "Document intelligence",
      "AI-enhanced search",
      "Automated analysis",
    ],
    cta: { label: "Integrate AI", href: "/start-a-project" },
  },
  {
    id: "automation",
    number: "04",
    title: "Automation & Intelligent Workflows",
    description:
      "Reduce repetitive work and connect systems through intelligent automation.",
    capabilities: [
      "Workflow automation",
      "Business process automation",
      "Data pipelines",
      "Reporting automation",
      "Intelligent routing",
      "Operational tools",
    ],
  },
  {
    id: "machine-learning",
    number: "05",
    title: "Machine Learning & Computer Vision",
    description:
      "Applied machine learning and computer vision systems built for real-world data and decision-making.",
    capabilities: [
      "Classification",
      "Forecasting",
      "Image analysis",
      "Anomaly detection",
      "Model development",
      "Data pipelines",
      "Evaluation",
      "Explainable AI",
    ],
  },
  {
    id: "mvp-development",
    number: "06",
    title: "MVP & Prototype Development",
    headline: "Have an idea? Build the first version.",
    description:
      "We work with founders and teams to transform early concepts into functional products ready for testing, demonstration or investment.",
    capabilities: [
      "Product discovery",
      "UX/UI",
      "Rapid prototyping",
      "Proof of concept",
      "MVP engineering",
      "Technical architecture",
      "Deployment",
    ],
  },
  {
    id: "consulting",
    number: "07",
    title: "AI Strategy & Technical Consulting",
    description:
      "Helping organisations identify where AI can create practical value and how to deploy it responsibly.",
    capabilities: [
      "AI opportunity assessment",
      "Technical architecture review",
      "Model selection guidance",
      "Responsible AI planning",
      "Team enablement",
      "Roadmap development",
    ],
  },
];

export const technologies = [
  "Python",
  "TypeScript",
  "React",
  "Next.js",
  "PyTorch",
  "TensorFlow",
  "OpenAI",
  "PostgreSQL",
  "AWS",
  "Docker",
  "FastAPI",
  "Node.js",
];

export const serviceFaqs = [
  {
    question: "Do I need a full technical specification to start?",
    answer:
      "No. Many projects begin with an idea, a business problem or an early concept. We help you define scope, architecture and priorities as part of the engagement.",
  },
  {
    question: "Do you work with startups and founders?",
    answer:
      "Yes. We regularly work with founders and early-stage teams on MVPs, prototypes and product development.",
  },
  {
    question: "Can you integrate AI into an existing system?",
    answer:
      "Yes. AI integration is a core capability — from internal copilots and document intelligence to workflow automation and intelligent search.",
  },
  {
    question: "What industries do you work in?",
    answer:
      "We work across healthcare, education, professional services, startups, commerce and data-intensive organisations. See our Industries page for more detail.",
  },
];
