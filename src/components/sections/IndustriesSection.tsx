import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container, Section } from "@/components/layout/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { RevealOnScroll, RevealItem } from "@/components/motion/FadeIn";
import { industries } from "@content/industries";

export function IndustriesSection() {
  return (
    <Section id="industries">
      <Container>
        <SectionHeader
          eyebrow="WHERE WE WORK"
          title="Technology designed for real environments."
        />

        <RevealOnScroll className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {industries.map((industry) => (
            <RevealItem key={industry.id}>
              <Link
                href={`/industries/${industry.slug}`}
                className="group block rounded-xl border border-border-light bg-porcelain p-8 transition-colors hover:border-sage/40"
              >
                <h3 className="text-xl font-medium text-carbon">{industry.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-graphite">
                  {industry.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-forest opacity-0 transition-opacity group-hover:opacity-100">
                  Learn more <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            </RevealItem>
          ))}
        </RevealOnScroll>
      </Container>
    </Section>
  );
}
