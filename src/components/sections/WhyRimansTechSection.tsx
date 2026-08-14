import { Container, Section } from "@/components/layout/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { RevealOnScroll, RevealItem } from "@/components/motion/FadeIn";

const principles = [
  {
    title: "Product Thinking",
    description:
      "We think beyond code to the user, problem and outcome.",
  },
  {
    title: "AI + Software Engineering",
    description:
      "Machine-learning capability combined with full-stack product development.",
  },
  {
    title: "Builders Ourselves",
    description:
      "We understand product development because we create and launch our own technology.",
  },
];

export function WhyRimansTechSection() {
  return (
    <Section>
      <Container>
        <SectionHeader
          eyebrow="WHY RIMANSTECH"
          title="Not another outsourced development shop."
        />

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
