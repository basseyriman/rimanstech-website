import { Container, Section } from "@/components/layout/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { RevealOnScroll, RevealItem } from "@/components/motion/FadeIn";
import { processSteps } from "@content/process";

export function ProcessSection() {
  return (
    <Section bg="porcelain">
      <Container>
        <SectionHeader title="From idea to deployment." />

        <RevealOnScroll className="mt-16 lg:mt-20">
          <div className="relative">
            <div className="absolute top-0 bottom-0 left-[19px] hidden w-px bg-border-light md:block lg:left-[23px]" />
            <div className="space-y-8 md:space-y-0">
              {processSteps.map((step, index) => (
                <RevealItem key={step.number}>
                  <div className="relative flex gap-6 md:gap-10 md:pb-12 lg:gap-12">
                    <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border-light bg-ivory md:h-12 md:w-12">
                      <span className="text-xs font-medium text-forest">{step.number}</span>
                    </div>
                    <div className={`pb-8 md:flex-1 ${index === processSteps.length - 1 ? "md:pb-0" : ""}`}>
                      <h3 className="text-xl font-medium text-carbon md:text-2xl">
                        {step.title}
                      </h3>
                      <p className="mt-2 max-w-[480px] text-base text-graphite">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </RevealItem>
              ))}
            </div>
          </div>
        </RevealOnScroll>
      </Container>
    </Section>
  );
}
