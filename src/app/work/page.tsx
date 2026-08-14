import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Container, Section } from "@/components/layout/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProductMedia } from "@/components/ui/ProductMedia";
import { Button } from "@/components/ui/Button";
import { pageMetadata } from "@content/seo";
import { clientWork } from "@content/client-work";

export const metadata: Metadata = pageMetadata.work;

export default function WorkPage() {
  return (
    <>
      <Section spacing="compact" className="pt-28 md:pt-32">
        <Container>
          <SectionHeader
            titleAs="h1"
            serif
            eyebrow="SELECTED WORK"
            title="Technology built for ambitious ideas."
            description="From property platforms to creative digital experiences, RimansTech works with founders and businesses to turn ideas into functional digital products."
          />
        </Container>
      </Section>

      <Section spacing="compact">
        <Container>
          <div className="space-y-24">
            {clientWork.map((project, index) => (
              <article
                key={project.slug}
                className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full border border-border-light bg-page px-3 py-1 text-[10px] font-medium tracking-[0.12em] text-stone uppercase">
                      {project.statusLabel}
                    </span>
                    <p className="text-xs font-medium tracking-[0.12em] text-stone uppercase">
                      {project.category}
                    </p>
                  </div>
                  <h2 className="mt-3 text-3xl font-medium text-carbon md:text-4xl">
                    {project.projectName}
                  </h2>
                  <p className="mt-4 text-xl text-graphite">{project.description}</p>
                  <p className="mt-4 text-base leading-relaxed text-stone">
                    {project.summary}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-4">
                    <Link
                      href={`/work/${project.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-medium text-forest"
                    >
                      View project <ArrowRight className="h-4 w-4" />
                    </Link>
                    {project.externalUrl && project.status === "live" && (
                      <a
                        href={project.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-stone hover:text-graphite"
                      >
                        Visit site <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                </div>
                <ProductMedia
                  image={project.heroImage}
                  imageAlt={project.heroImageAlt}
                  previewUrl={project.previewUrl}
                  imageFit="cover"
                  imageBg="obsidian"
                  className={index % 2 === 1 ? "lg:order-1" : ""}
                  priority={index === 0}
                />
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section spacing="compact" bg="obsidian">
        <Container className="text-center">
          <h2 className="text-2xl font-medium text-ivory md:text-3xl">
            Have an idea like this?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-ivory/70">
            From early concept to working software — tell us what you want to build.
          </p>
          <Button href="/start-a-project" dark className="mt-6">
            Start a Project
          </Button>
        </Container>
      </Section>
    </>
  );
}
