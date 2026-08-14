import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Container, Section } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { ProductMedia } from "@/components/ui/ProductMedia";
import { clientWork, getClientWork } from "@content/client-work";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return clientWork.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getClientWork(slug);
  if (!project) return {};
  return {
    title: project.projectName,
    description: project.description,
    openGraph: {
      title: project.projectName,
      description: project.description,
      type: "article",
    },
  };
}

export default async function ClientWorkPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getClientWork(slug);

  if (!project) notFound();

  const related = clientWork.filter((item) => item.slug !== slug).slice(0, 2);

  return (
    <>
      <Section spacing="compact" className="pt-28 md:pt-32">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-border-light bg-page px-3 py-1 text-[10px] font-medium tracking-[0.12em] text-stone uppercase">
                  {project.statusLabel}
                </span>
                <p className="text-xs font-medium tracking-[0.12em] text-stone uppercase">
                  {project.category}
                </p>
              </div>
              <p className="mt-4 text-xs font-medium tracking-[0.12em] text-stone uppercase">
                Client
              </p>
              <h1 className="mt-2 text-4xl font-medium tracking-[-0.02em] text-carbon md:text-5xl">
                {project.projectName}
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-graphite">
                {project.description}
              </p>
              {project.externalUrl && project.status === "live" && (
                <a
                  href={project.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-forest"
                >
                  View live project <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
            <ProductMedia
              image={project.heroImage}
              imageAlt={project.heroImageAlt}
              previewUrl={project.previewUrl}
              aspect="video"
              imageFit="cover"
              imageBg="obsidian"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </Container>
      </Section>

      {project.screenshots && project.screenshots.length > 0 && (
        <Section spacing="compact">
          <Container>
            <div className="grid gap-6 sm:grid-cols-2">
              {project.screenshots.map((item) => (
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

      {project.challenge && (
        <Section spacing="compact" bg="porcelain">
          <Container size="reading">
            <CaseBlock title="The Challenge" content={project.challenge} />
            {project.approach && (
              <CaseBlock title="The Approach" content={project.approach} />
            )}
            {project.built && <CaseBlock title="What We Built" content={project.built} />}
            {project.technologies && project.technologies.length > 0 && (
              <div className="mt-10">
                <h2 className="text-xl font-medium text-carbon">Technology</h2>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-lg border border-border-light bg-page px-3 py-1.5 text-sm text-graphite"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {project.outcome && <CaseBlock title="Outcome" content={project.outcome} />}
          </Container>
        </Section>
      )}

      {related.length > 0 && (
        <Section spacing="compact">
          <Container>
            <h2 className="text-xl font-medium text-carbon">More selected work</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={`/work/${item.slug}`}
                  className="rounded-xl border border-border-light bg-porcelain p-6 transition-colors hover:border-sage/40"
                >
                  <p className="text-xs text-stone uppercase">{item.statusLabel}</p>
                  <p className="mt-2 font-medium text-carbon">{item.projectName}</p>
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
            Have an idea like this?
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
