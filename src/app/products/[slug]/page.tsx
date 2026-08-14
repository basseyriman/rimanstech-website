import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Container, Section } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { ProductMedia } from "@/components/ui/ProductMedia";
import { ProductFormats } from "@/components/ui/ProductFormats";
import { productDetails, getProductDetail } from "@content/product-details";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return productDetails.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductDetail(slug);
  if (!product) return {};
  return {
    title: product.title,
    description: product.summary,
    openGraph: {
      title: product.title,
      description: product.summary,
      type: "article",
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductDetail(slug);

  if (!product) notFound();

  const related = productDetails.filter((item) => item.slug !== slug).slice(0, 2);
  const externalUrl = product.externalUrl ?? product.href;

  return (
    <>
      <Section spacing="compact" className="pt-28 md:pt-32">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              {product.brandLabel && (
                <p className="text-[10px] font-medium tracking-[0.14em] text-sage uppercase">
                  {product.brandLabel}
                </p>
              )}
              <p className="mt-3 text-xs font-medium tracking-[0.12em] text-stone uppercase">
                {product.category}
              </p>
              <h1 className="mt-4 text-4xl font-medium tracking-[-0.02em] text-carbon md:text-5xl">
                {product.title}
              </h1>
              {product.headline && (
                <p className="mt-4 text-xl text-graphite">{product.headline}</p>
              )}
              <p className="mt-6 text-lg leading-relaxed text-graphite">
                {product.summary}
              </p>
              {product.features && product.features.length > 0 && (
                <ul className="mt-6 flex flex-wrap gap-2">
                  {product.features.map((feature) => (
                    <li
                      key={feature}
                      className="rounded-lg border border-border-light bg-page px-3 py-1.5 text-sm text-graphite"
                    >
                      {feature}
                    </li>
                  ))}
                </ul>
              )}
              {externalUrl && (
                <a
                  href={externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-forest"
                >
                  Explore {product.title} <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
            <ProductMedia
              image={product.image}
              imageAlt={product.imageAlt}
              previewUrl={product.previewUrl}
              video={product.video}
              imageFit={product.imageFit}
              imageBg={product.imageBg}
              aspect={product.aspect ?? "video"}
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </Container>
      </Section>

      {product.formats && product.formats.length > 0 && (
        <ProductFormats formats={product.formats} />
      )}

      {product.gallery && product.gallery.length > 0 && (
        <Section spacing="compact">
          <Container>
            <div className="grid gap-6 sm:grid-cols-2">
              {product.gallery.map((item) => (
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
          <CaseBlock title="Challenge" content={product.challenge} />
          <CaseBlock title="What We Built" content={product.built} />
          <CaseBlock title="Approach" content={product.approach} />
          <div className="mt-10">
            <h2 className="text-xl font-medium text-carbon">Technology</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {product.technology.map((tech) => (
                <li
                  key={tech}
                  className="rounded-lg border border-border-light bg-page px-3 py-1.5 text-sm text-graphite"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>
          <CaseBlock title="Outcome" content={product.outcome} />
        </Container>
      </Section>

      {related.length > 0 && (
        <Section spacing="compact">
          <Container>
            <h2 className="text-xl font-medium text-carbon">More RimansTech products</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={`/products/${item.slug}`}
                  className="rounded-xl border border-border-light bg-porcelain p-6 transition-colors hover:border-sage/40"
                >
                  <p className="text-xs text-stone uppercase">{item.category}</p>
                  <p className="mt-2 font-medium text-carbon">{item.title}</p>
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
