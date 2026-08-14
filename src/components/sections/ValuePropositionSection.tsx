import { Container, Section } from "@/components/layout/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { RevealOnScroll, RevealItem } from "@/components/motion/FadeIn";

const pillars = [
  {
    title: "Build",
    description:
      "AI applications, software platforms, SaaS products and MVPs.",
  },
  {
    title: "Integrate",
    description:
      "AI, automation and intelligent workflows for existing businesses.",
  },
  {
    title: "Innovate",
    description:
      "Our own AI products, research and experimental technology.",
  },
];

const capabilities = [
  "AI Product Development",
  "Software Engineering",
  "AI Integration",
  "Automation",
  "Machine Learning",
  "MVP Development",
];

export function ValuePropositionSection() {
  return (
    <Section id="what-we-do" bg="porcelain">
      <Container>
        <SectionHeader
          eyebrow="WHAT WE DO"
          title="From idea to intelligent product."
          description="RimansTech works with founders and organisations to transform ideas, operational challenges and emerging opportunities into well-engineered software."
        />

        <RevealOnScroll className="mt-16 grid gap-8 md:grid-cols-3 md:gap-10 lg:mt-20">
          {pillars.map((pillar) => (
            <RevealItem key={pillar.title}>
              <div className="border-t border-border-light pt-8">
                <h3 className="text-sm font-semibold tracking-[0.14em] text-forest uppercase">
                  {pillar.title}
                </h3>
                <p className="mt-4 text-xl leading-snug font-medium text-carbon md:text-2xl">
                  {pillar.description}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealOnScroll>

        <p className="mt-12 text-center text-xs leading-relaxed tracking-[0.08em] text-stone md:mt-16 md:text-sm">
          {capabilities.join(" · ")}
        </p>
      </Container>
    </Section>
  );
}
