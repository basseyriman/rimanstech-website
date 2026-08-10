import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container, Section } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { industries } from "@content/industries";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const industry = industries.find((i) => i.slug === slug);
  if (!industry) return {};
  return {
    title: industry.title,
    description: industry.description,
  };
}

export default async function IndustryPage({ params }: PageProps) {
  const { slug } = await params;
  const industry = industries.find((i) => i.slug === slug);

  if (!industry) notFound();

  return (
    <>
      <Section spacing="compact" className="pt-28 md:pt-32">
        <Container size="reading">
          <p className="text-xs font-medium tracking-[0.12em] text-stone uppercase">
            Industries
          </p>
          <h1 className="mt-4 text-4xl font-medium tracking-[-0.02em] text-carbon md:text-5xl">
            {industry.title}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-graphite">
            {industry.longDescription}
          </p>
        </Container>
      </Section>

      <Section spacing="compact" bg="porcelain">
        <Container size="reading">
          <h2 className="text-xl font-medium text-carbon">Capabilities</h2>
          <ul className="mt-6 space-y-3">
            {industry.capabilities.map((cap) => (
              <li key={cap} className="flex items-center gap-3 text-base text-graphite">
                <span className="h-1.5 w-1.5 rounded-full bg-forest" />
                {cap}
              </li>
            ))}
          </ul>
          <Button href="/start-a-project" className="mt-10">
            Start a Project
          </Button>
        </Container>
      </Section>
    </>
  );
}
