import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Container, Section } from "@/components/layout/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { pageMetadata } from "@content/seo";
import { researchTopics } from "@content/process";

export const metadata: Metadata = pageMetadata.research;

export default function ResearchPage() {
  return (
    <>
      <Section spacing="compact" className="pt-28 md:pt-32">
        <Container>
          <SectionHeader
            titleAs="h1"
            eyebrow="RIMANSTECH LABS"
            title="Research translated into working systems."
            description="Our work explores how advances in machine learning, computer vision and explainable AI can move from experimentation into useful products."
          />
        </Container>
      </Section>

      <Section spacing="compact" bg="porcelain">
        <Container>
          <h2 className="text-xl font-medium text-carbon">Research Areas</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {researchTopics.map((topic) => (
              <div
                key={topic}
                className="rounded-lg border border-border-light bg-page px-5 py-4 text-sm text-graphite"
              >
                {topic}
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section spacing="compact">
        <Container>
          <div className="grid items-center gap-8 overflow-hidden rounded-xl border border-border-light bg-porcelain lg:grid-cols-[1fr_320px]">
            <div className="p-8 md:p-10">
              <p className="text-xs font-medium tracking-[0.12em] text-stone uppercase">
                Featured Research
              </p>
              <h2 className="mt-3 text-2xl font-medium text-carbon">AlzDetect</h2>
              <p className="mt-4 max-w-[640px] text-base leading-relaxed text-graphite">
                Exploring Vision Transformers and explainable AI for AI-assisted brain
                MRI analysis. AlzDetect is a research and decision-support platform —
                not a clinical diagnostic tool.
              </p>
              <Link
                href="/products/alzdetect"
                className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-forest"
              >
                View AlzDetect case study <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="relative mx-auto aspect-[4/3] w-full max-w-md border-t border-border-light bg-page lg:mx-0 lg:max-w-none lg:border-t-0 lg:border-l">
              <Image
                src="/images/products/master_alz_analysis.png"
                alt="AlzDetect MRI analysis interface"
                fill
                className="object-contain p-4"
                sizes="320px"
              />
            </div>
          </div>
          <Button href="/start-a-project" className="mt-10">
            Discuss a Research Collaboration
          </Button>
        </Container>
      </Section>
    </>
  );
}
