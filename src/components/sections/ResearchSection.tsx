import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Container, Section } from "@/components/layout/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { FadeIn, RevealOnScroll, RevealItem } from "@/components/motion/FadeIn";
import { researchTopics } from "@content/process";

export function ResearchSection() {
  return (
    <Section bg="obsidian">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <FadeIn>
              <SectionHeader
                eyebrow="RIMANSTECH LABS"
                title="Research translated into working systems."
                description="Our work explores how advances in machine learning, computer vision and explainable AI can move from experimentation into useful products."
                dark
              />
            </FadeIn>
            <FadeIn delay={0.2}>
              <Button href="/research" dark className="mt-8">
                Explore Research
              </Button>
            </FadeIn>
          </div>

          <RevealOnScroll className="grid grid-cols-2 gap-3">
            {researchTopics.map((topic) => (
              <RevealItem key={topic}>
                <div className="rounded-lg border border-border-dark px-5 py-4 text-sm text-ivory/80">
                  {topic}
                </div>
              </RevealItem>
            ))}
          </RevealOnScroll>
        </div>

        <FadeIn delay={0.3}>
          <div className="mt-16 grid overflow-hidden rounded-xl border border-border-dark bg-charcoal lg:grid-cols-[1fr_280px]">
            <div className="p-8 md:p-10">
              <p className="text-xs font-medium tracking-[0.12em] text-sage uppercase">
                Featured Research
              </p>
              <h3 className="mt-3 text-2xl font-medium text-ivory">AlzDetect</h3>
              <p className="mt-3 max-w-[600px] text-base leading-relaxed text-footer-secondary">
                Exploring Vision Transformers and explainable AI for AI-assisted brain
                MRI analysis — a research platform for decision-support, not clinical
                diagnosis.
              </p>
              <Link
                href="/products/alzdetect"
                className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-sage transition-colors hover:text-ivory"
              >
                View AlzDetect research
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="relative aspect-[4/3] w-full border-t border-border-dark bg-obsidian lg:aspect-auto lg:min-h-full lg:border-t-0 lg:border-l">
              <Image
                src="/images/products/master_alz_analysis.png"
                alt="AlzDetect MRI analysis interface"
                fill
                className="object-contain p-4"
                sizes="280px"
              />
            </div>
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}
