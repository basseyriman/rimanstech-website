import Link from "next/link";
import { Container, Section } from "@/components/layout/Container";
import { CTA } from "@/components/ui/Button";
import { FadeIn } from "@/components/motion/FadeIn";

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
              Whether you have an early idea, an existing system or a business
              problem that technology could solve, tell us about it.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4">
              <CTA
                dark
                primary={{ label: "Start a Project", href: "/start-a-project" }}
              />
              <Link
                href="mailto:support@rimanstech.com"
                className="text-sm text-footer-secondary transition-colors hover:text-ivory"
              >
                support@rimanstech.com
              </Link>
            </div>
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}
