import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Container, Section } from "@/components/layout/Container";
import { Eyebrow } from "@/components/ui/SectionHeader";
import { FadeIn } from "@/components/motion/FadeIn";

export function FounderSection() {
  return (
    <Section spacing="compact">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[280px_1fr] lg:gap-16">
          <FadeIn>
            <div className="relative mx-auto aspect-[3/4] w-full max-w-[280px] overflow-hidden rounded-xl border border-border-light bg-porcelain">
              <Image
                src="/images/founder/placeholder.svg"
                alt="Bassey Riman, Founder of RimansTech Industries"
                fill
                className="object-cover"
                sizes="280px"
              />
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <Eyebrow>FOUNDER</Eyebrow>
            <h2 className="text-3xl font-medium tracking-[-0.02em] text-carbon md:text-4xl">
              Bassey Riman
            </h2>
            <div className="mt-3 space-y-1 text-sm text-graphite">
              <p>AI Engineer</p>
              <p>Founder, RimansTech Industries</p>
              <p>MSc Artificial Intelligence</p>
              <p>Author and AI education advocate</p>
            </div>
            <p className="mt-6 max-w-[600px] text-base leading-relaxed text-graphite">
              Bassey Riman works across applied artificial intelligence,
              healthcare AI, explainable machine learning, software development
              and AI education. His work combines technical research with a
              focus on developing practical digital products.
            </p>
            <Link
              href="/company#founder"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-forest transition-colors hover:text-forest-hover"
            >
              Meet the Founder
              <ArrowRight className="h-4 w-4" />
            </Link>
          </FadeIn>
        </div>
      </Container>
    </Section>
  );
}
