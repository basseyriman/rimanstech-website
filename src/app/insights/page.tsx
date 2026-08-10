import type { Metadata } from "next";
import { Container, Section } from "@/components/layout/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { pageMetadata } from "@content/seo";
import { insights } from "@content/insights";

export const metadata: Metadata = pageMetadata.insights;

export default function InsightsPage() {
  return (
    <Section spacing="compact" className="pt-28 md:pt-32">
      <Container>
        <SectionHeader
          titleAs="h1"
          title="From RimansTech."
          description="Research, product announcements, engineering articles and company news."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {insights.map((item) => (
            <article
              key={item.slug}
              className="rounded-xl border border-border-light bg-porcelain p-6 md:p-8"
            >
              <p className="text-xs font-medium tracking-[0.12em] text-stone uppercase">
                {item.category}
              </p>
              <h2 className="mt-3 text-lg font-medium text-carbon">{item.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-graphite">
                {item.excerpt}
              </p>
              <time className="mt-4 block text-xs text-stone">
                {new Date(item.date).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </time>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
