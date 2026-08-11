import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Container, Section } from "@/components/layout/Container";
import { getAllInsightSlugs, getInsightArticle } from "@content/insight-articles";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllInsightSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getInsightArticle(slug);
  if (!article) return {};
  return { title: article.title, description: article.excerpt };
}

export default async function InsightArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getInsightArticle(slug);

  if (!article) notFound();

  return (
    <Section spacing="compact" className="pt-28 md:pt-32">
      <Container size="reading">
        <Link
          href="/insights"
          className="inline-flex items-center gap-2 text-sm font-medium text-forest transition-colors hover:text-forest-hover"
        >
          <ArrowLeft className="h-4 w-4" />
          All insights
        </Link>

        <p className="mt-8 text-xs font-medium tracking-[0.12em] text-stone uppercase">
          {article.category}
        </p>
        <h1 className="mt-4 text-4xl font-medium tracking-[-0.02em] text-carbon md:text-5xl">
          {article.title}
        </h1>
        <time className="mt-4 block text-sm text-stone">
          {new Date(article.date).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </time>

        <div className="mt-10 space-y-6 text-base leading-relaxed text-graphite">
          {article.body.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </div>
      </Container>
    </Section>
  );
}
