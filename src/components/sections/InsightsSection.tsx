import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container, Section } from "@/components/layout/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { RevealOnScroll, RevealItem } from "@/components/motion/FadeIn";
import { insights } from "@content/insights";

export function InsightsSection() {
  return (
    <Section bg="porcelain">
      <Container>
        <SectionHeader title="From RimansTech." />

        <RevealOnScroll className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:mt-16">
          {insights.slice(0, 3).map((item) => (
            <RevealItem key={item.slug}>
              <Link
                href={`/insights/${item.slug}`}
                className="group block h-full rounded-xl border border-border-light bg-page p-6 transition-colors hover:border-sage/40 md:p-8"
              >
                <p className="text-xs font-medium tracking-[0.12em] text-stone uppercase">
                  {item.category}
                </p>
                <h3 className="mt-3 text-lg font-medium text-carbon group-hover:text-forest">
                  {item.title}
                </h3>
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
              </Link>
            </RevealItem>
          ))}
        </RevealOnScroll>

        <div className="mt-10 text-center">
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 text-sm font-medium text-forest transition-colors hover:text-forest-hover"
          >
            View all insights
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Container>
    </Section>
  );
}
