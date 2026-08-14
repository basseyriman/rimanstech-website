import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Container, Section } from "@/components/layout/Container";
import { ProductMedia } from "@/components/ui/ProductMedia";
import type { ProductFormat } from "@/types/content";

interface ProductFormatsProps {
  formats: ProductFormat[];
}

export function ProductFormats({ formats }: ProductFormatsProps) {
  return (
    <Section spacing="compact">
      <Container>
        <div className="space-y-16">
          {formats.map((format, index) => (
            <article
              key={format.title}
              className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
            >
              <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                <p className="text-xs font-medium tracking-[0.12em] text-stone uppercase">
                  {format.title}
                </p>
                {format.subtitle && (
                  <p className="mt-2 text-xl text-graphite">{format.subtitle}</p>
                )}
                <p className="mt-4 text-base leading-relaxed text-stone">
                  {format.description}
                </p>
                {format.cta.external ? (
                  <a
                    href={format.cta.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-forest"
                  >
                    {format.cta.label}
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                ) : (
                  <Link
                    href={format.cta.href}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-forest"
                  >
                    {format.cta.label}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                )}
              </div>
              <ProductMedia
                image={format.image}
                imageAlt={format.imageAlt}
                previewUrl={format.previewUrl}
                video={format.video}
                imageFit={format.imageFit}
                imageBg={format.imageBg}
                className={index % 2 === 1 ? "lg:order-1" : ""}
              />
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
