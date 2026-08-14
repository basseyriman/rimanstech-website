import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Container, Section } from "@/components/layout/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProductMedia } from "@/components/ui/ProductMedia";
import { pageMetadata } from "@content/seo";
import { products } from "@content/products";

export const metadata: Metadata = pageMetadata.products;

export default function ProductsPage() {
  return (
    <>
      <Section spacing="compact" className="pt-28 md:pt-32">
        <Container>
          <SectionHeader
            titleAs="h1"
            serif
            title="Technology we build for ourselves."
            description="Our own products allow RimansTech to explore how artificial intelligence, software and digital experiences can solve problems, expand access and create new ways of interacting with technology."
          />
        </Container>
      </Section>

      <Section spacing="compact">
        <Container>
          <div className="space-y-24">
            {products.map((product, index) => (
              <article
                key={product.id}
                className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  {product.brandLabel && (
                    <p className="text-[10px] font-medium tracking-[0.14em] text-sage uppercase">
                      {product.brandLabel}
                    </p>
                  )}
                  <p className="mt-2 text-xs font-medium tracking-[0.12em] text-stone uppercase">
                    {product.category}
                  </p>
                  <h2 className="mt-2 text-3xl font-medium text-carbon md:text-4xl">
                    {product.title}
                  </h2>
                  <p className="mt-4 text-xl text-graphite">{product.headline}</p>
                  <p className="mt-4 text-base leading-relaxed text-stone">
                    {product.description}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-4">
                    <Link
                      href={product.cta.href}
                      className="inline-flex items-center gap-2 text-sm font-medium text-forest"
                    >
                      {product.cta.label} <ArrowRight className="h-4 w-4" />
                    </Link>
                    {product.externalUrl && (
                      <a
                        href={product.externalUrl}
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
                  image={product.image}
                  imageAlt={product.imageAlt}
                  previewUrl={product.previewUrl}
                  video={product.video}
                  imageFit={product.imageFit}
                  imageBg={product.imageBg}
                  aspect={product.aspect}
                  className={index % 2 === 1 ? "lg:order-1" : ""}
                  priority={index === 0}
                />
              </article>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
