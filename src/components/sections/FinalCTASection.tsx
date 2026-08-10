import { Container, Section } from "@/components/layout/Container";
import { CTA } from "@/components/ui/Button";
import { FadeIn } from "@/components/motion/FadeIn";
import { CONTACT_EMAIL } from "@/lib/utils";

export function FinalCTASection() {
  return (
    <Section bg="obsidian" spacing="default">
      <Container>
        <FadeIn>
          <div className="mx-auto max-w-[720px] text-center">
            <h2 className="editorial-serif text-[36px] leading-[1.05] font-normal tracking-[-0.02em] text-ivory md:text-[48px] lg:text-[56px]">
              What are you building?
            </h2>
            <p className="mt-6 text-base leading-relaxed text-footer-secondary md:text-lg">
              Tell us about the product, problem or idea. We&apos;ll help you
              explore what technology can make possible.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <CTA
                dark
                primary={{ label: "Start a Project", href: "/start-a-project" }}
                secondary={{
                  label: CONTACT_EMAIL,
                  href: `mailto:${CONTACT_EMAIL}`,
                }}
              />
            </div>
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}
