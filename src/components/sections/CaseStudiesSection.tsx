import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Container, Section } from "@/components/layout/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { RevealOnScroll, RevealItem } from "@/components/motion/FadeIn";
import { cn } from "@/lib/utils";
import { caseStudies } from "@content/case-studies";

const cardBgClass = {
  porcelain: "bg-porcelain",
  obsidian: "bg-obsidian",
  page: "bg-page",
} as const;

export function CaseStudiesSection() {
  return (
    <Section id="selected-work">
      <Container>
        <SectionHeader title="Selected work." />

        <RevealOnScroll className="mt-16 grid gap-8 lg:grid-cols-3 lg:gap-6">
          {caseStudies.map((study) => {
            const fit = study.cardImageFit ?? study.imageFit ?? "cover";
            const bg = study.cardImageBg ?? study.imageBg ?? "porcelain";
            const isContain = fit === "contain";

            return (
              <RevealItem key={study.slug}>
                <Link
                  href={`/work/${study.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-xl border border-border-light bg-porcelain transition-colors hover:border-sage/40"
                >
                  <div
                    className={cn(
                      "relative aspect-video overflow-hidden",
                      cardBgClass[bg]
                    )}
                  >
                    <Image
                      src={study.image}
                      alt={study.imageAlt}
                      fill
                      className={cn(
                        "transition-transform duration-500 group-hover:scale-[1.02]",
                        isContain
                          ? "object-contain p-4 md:p-5"
                          : "object-cover object-center"
                      )}
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6 md:p-8">
                    <p className="text-xs font-medium tracking-[0.12em] text-stone uppercase">
                      {study.category}
                    </p>
                    <h3 className="mt-2 text-xl font-medium text-carbon">{study.title}</h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-graphite">
                      {study.summary}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-forest">
                      View case study <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
              </RevealItem>
            );
          })}
        </RevealOnScroll>
      </Container>
    </Section>
  );
}
