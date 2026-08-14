import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container, Section } from "@/components/layout/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProductMedia } from "@/components/ui/ProductMedia";
import { RevealOnScroll, RevealItem } from "@/components/motion/FadeIn";
import { getFeaturedClientWork } from "@content/client-work";

export function ClientWorkSection() {
  const projects = getFeaturedClientWork();

  return (
    <Section id="selected-work">
      <Container>
        <SectionHeader
          eyebrow="SELECTED WORK"
          title="Ideas engineered into working products."
          description="We partner with founders and organisations to design and develop software around real business ideas and opportunities."
        />

        <RevealOnScroll className="mt-16 grid gap-8 lg:grid-cols-3 lg:gap-6">
          {projects.map((project) => (
            <RevealItem key={project.slug}>
              <Link
                href={`/work/${project.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-xl border border-border-light bg-porcelain transition-colors hover:border-sage/40"
              >
                <ProductMedia
                  image={project.heroImage}
                  imageAlt={project.heroImageAlt}
                  previewUrl={project.previewUrl}
                  imageFit="cover"
                  imageBg="obsidian"
                  aspect="video"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="rounded-none border-0 border-b border-border-light"
                />
                <div className="flex flex-1 flex-col p-6 md:p-8">
                  <span className="inline-flex w-fit rounded-full border border-border-light px-3 py-1 text-[10px] font-medium tracking-[0.12em] text-stone uppercase">
                    {project.statusLabel}
                  </span>
                  <p className="mt-3 text-xs font-medium tracking-[0.12em] text-stone uppercase">
                    {project.category}
                  </p>
                  <h3 className="mt-2 text-xl font-medium text-carbon">
                    {project.projectName}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-graphite">
                    {project.summary}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-forest">
                    View project <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            </RevealItem>
          ))}
        </RevealOnScroll>

        <div className="mt-10 text-center">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-sm font-medium text-forest transition-colors hover:text-forest-hover"
          >
            View Selected Work
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Container>
    </Section>
  );
}
