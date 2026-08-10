import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container, Section } from "@/components/layout/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { pageMetadata } from "@content/seo";
import { industries } from "@content/industries";

export const metadata: Metadata = pageMetadata.industries;

export default function IndustriesPage() {
  return (
    <>
      <Section spacing="compact" className="pt-28 md:pt-32">
        <Container>
          <SectionHeader
            titleAs="h1"
            title="Technology designed for real environments."
            description="We design and engineer software and AI for organisations across healthcare, education, professional services, startups and more."
          />
        </Container>
      </Section>

      <Section spacing="compact">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry) => (
              <Link
                key={industry.id}
                href={`/industries/${industry.slug}`}
                className="group rounded-xl border border-border-light bg-porcelain p-8 transition-colors hover:border-sage/40"
              >
                <h2 className="text-xl font-medium text-carbon">{industry.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-graphite">
                  {industry.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-forest">
                  Explore <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
