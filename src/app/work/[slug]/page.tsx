import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Container, Section } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { ProductMedia } from "@/components/ui/ProductMedia";
import { caseStudies, getCaseStudy } from "@content/case-studies";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  return {
    title: study.title,
    description: study.summary,
    openGraph: {
      title: study.title,
      description: study.summary,
      type: "article",
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  if (!study) notFound();

  const related = caseStudies.filter((cs) => cs.slug !== slug).slice(0, 2);

  return (
    <>
      <Section spacing="compact" className="pt-28 md:pt-32">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="text-xs font-medium tracking-[0.12em] text-stone uppercase">
                {study.category}
              </p>
              <h1 className="mt-4 text-4xl font-medium tracking-[-0.02em] text-carbon md:text-5xl">
                {study.title}
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-graphite">
                {study.summary}
              </p>
              {study.href && (
                <a
                  href={study.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-forest"
                >
                  Visit live project <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
            <ProductMedia
              image={study.image}
              imageAlt={study.imageAlt}
              video={study.video}
              imageFit={study.imageFit}
              aspect="video"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </Container>
      </Section>

      {study.gallery && study.gallery.length > 0 && (
        <Section spacing="compact">
          <Container>
            <div className="grid gap-6 sm:grid-cols-2">
              {study.gallery.map((item) => (
                <div
                  key={item.src}
                  className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border-light bg-porcelain"
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </div>
              ))}
            </div>
          </Container>
        </Section>
      )}

      <Section spacing="compact" bg="porcelain">
        <Container size="reading">
          <CaseBlock title="Challenge" content={study.challenge} />
          <CaseBlock title="What We Built" content={study.built} />
          <CaseBlock title="Approach" content={study.approach} />
          <div className="mt-10">
            <h2 className="text-xl font-medium text-carbon">Technology</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {study.technology.map((tech) => (
                <li
                  key={tech}
                  className="rounded-lg border border-border-light bg-page px-3 py-1.5 text-sm text-graphite"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>
          <CaseBlock title="Outcome" content={study.outcome} />
        </Container>
      </Section>

      {related.length > 0 && (
        <Section spacing="compact">
          <Container>
            <h2 className="text-xl font-medium text-carbon">Related work</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/work/${r.slug}`}
                  className="rounded-xl border border-border-light bg-porcelain p-6 transition-colors hover:border-sage/40"
                >
                  <p className="text-xs text-stone uppercase">{r.category}</p>
                  <p className="mt-2 font-medium text-carbon">{r.title}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm text-forest">
                    View <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              ))}
            </div>
          </Container>
        </Section>
      )}

      <Section spacing="compact" bg="obsidian">
        <Container className="text-center">
          <h2 className="text-2xl font-medium text-ivory md:text-3xl">
            Have a project in mind?
          </h2>
          <Button href="/start-a-project" dark className="mt-6">
            Start a Project
          </Button>
        </Container>
      </Section>
    </>
  );
}

function CaseBlock({ title, content }: { title: string; content: string }) {
  return (
    <div className="mt-10 first:mt-0">
      <h2 className="text-xl font-medium text-carbon">{title}</h2>
      <p className="mt-4 text-base leading-relaxed text-graphite">{content}</p>
    </div>
  );
}
