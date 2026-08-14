import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Container, Section } from "@/components/layout/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProductMedia } from "@/components/ui/ProductMedia";
import { FadeIn } from "@/components/motion/FadeIn";
import { products } from "@content/products";

export function ProductsSection() {
  return (
    <Section id="products" bg="porcelain">
      <Container>
        <SectionHeader
          eyebrow="OUR PRODUCTS"
          title="We build our own technology too."
          description="Alongside the technology we build for clients, RimansTech develops its own products across artificial intelligence, healthcare, education, consumer technology and interactive learning."
        />

        <div className="mt-16 space-y-20 lg:mt-24">
          {products.map((product, index) => (
            <FadeIn key={product.id} delay={index * 0.1}>
              <article className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  {product.brandLabel && (
                    <p className="text-[10px] font-medium tracking-[0.14em] text-sage uppercase">
                      {product.brandLabel}
                    </p>
                  )}
                  <p className="mt-2 text-xs font-medium tracking-[0.12em] text-stone uppercase">
                    {product.category}
                  </p>
                  <h3 className="mt-2 text-3xl font-medium tracking-[-0.02em] text-carbon md:text-4xl">
                    {product.title}
                  </h3>
                  <p className="mt-4 text-xl leading-snug text-graphite">
                    {product.headline}
                  </p>
                  <p className="mt-4 text-base leading-relaxed text-stone">
                    {product.description}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-4">
                    <Link
                      href={product.cta.href}
                      className="inline-flex items-center gap-2 text-sm font-medium text-forest transition-colors hover:text-forest-hover"
                    >
                      {product.cta.label}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    {product.externalUrl && (
                      <a
                        href={product.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-medium text-stone transition-colors hover:text-graphite"
                      >
                        Visit site
                        <ExternalLink className="h-3.5 w-3.5" />
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
            </FadeIn>
          ))}
        </div>

        <div className="mt-16 text-center lg:mt-20">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm font-medium text-forest transition-colors hover:text-forest-hover"
          >
            Explore All Products
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Container>
    </Section>
  );
}
