import { Container, Section } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/motion/FadeIn";

export function AudienceSplitSection() {
  return (
    <Section bg="porcelain">
      <Container>
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          <FadeIn>
            <div className="flex h-full flex-col rounded-xl border border-border-light bg-page p-8 md:p-10 lg:p-12">
              <p className="text-xs font-medium tracking-[0.12em] text-stone uppercase">
                For Founders
              </p>
              <h3 className="mt-4 text-2xl font-medium tracking-[-0.02em] text-carbon md:text-3xl">
                Turn your idea into a product.
              </h3>
              <p className="mt-4 flex-1 text-base leading-relaxed text-graphite">
                From first prototype to production-ready MVP, we help ambitious
                founders design and build technology they can test, demonstrate
                and grow.
              </p>
              <Button href="/start-a-project" className="mt-8 w-fit">
                Build My Idea
              </Button>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="flex h-full flex-col rounded-xl border border-border-light bg-page p-8 md:p-10 lg:p-12">
              <p className="text-xs font-medium tracking-[0.12em] text-stone uppercase">
                For Businesses
              </p>
              <h3 className="mt-4 text-2xl font-medium tracking-[-0.02em] text-carbon md:text-3xl">
                Bring AI into your business.
              </h3>
              <p className="mt-4 flex-1 text-base leading-relaxed text-graphite">
                We identify practical opportunities for AI, software and
                automation to improve workflows, customer experiences and
                decision-making.
              </p>
              <Button href="/start-a-project" className="mt-8 w-fit">
                Discuss Your Business
              </Button>
            </div>
          </FadeIn>
        </div>
      </Container>
    </Section>
  );
}
