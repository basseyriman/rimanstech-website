import { Container, Section } from "@/components/layout/Container";
import { RevealOnScroll, RevealItem } from "@/components/motion/FadeIn";

const principles = [
  {
    title: "PRODUCT THINKING",
    description:
      "We think beyond code to the product, user and outcome.",
  },
  {
    title: "AI + SOFTWARE",
    description:
      "Machine learning expertise combined with full-stack engineering.",
  },
  {
    title: "BUILDERS OURSELVES",
    description:
      "Our own products mean we understand what it takes to move from an idea to something people can actually use.",
  },
];

export function WhyRimansTechSection() {
  return (
    <Section>
      <Container>
        <h2 className="editorial-serif max-w-[900px] text-[32px] leading-[1.1] font-normal tracking-[-0.02em] text-carbon md:text-[44px] lg:text-[52px]">
          Not another outsourced development shop.
        </h2>

        <RevealOnScroll className="mt-16 grid gap-10 md:grid-cols-3 md:gap-8 lg:mt-20">
          {principles.map((principle) => (
            <RevealItem key={principle.title}>
              <div className="border-t border-border-light pt-8">
                <h3 className="text-sm font-semibold tracking-[0.14em] text-forest uppercase">
                  {principle.title}
                </h3>
                <p className="mt-4 text-lg leading-relaxed text-graphite md:text-xl">
                  {principle.description}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealOnScroll>
      </Container>
    </Section>
  );
}
