import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container, Section } from "@/components/layout/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { pageMetadata } from "@content/seo";
import { services, technologies, serviceFaqs } from "@content/services";

export const metadata: Metadata = pageMetadata.services;

export default function ServicesPage() {
  return (
    <>
      <Section spacing="compact" className="pt-28 md:pt-32">
        <Container>
          <SectionHeader
            titleAs="h1"
            serif
            title="Engineering ideas into intelligent products."
            description="From AI product development to custom software, integration and MVP engineering — technology built around the problem."
          />
        </Container>
      </Section>

      <Section spacing="compact">
        <Container>
          <div className="space-y-6">
            {services.map((service) => (
              <article
                key={service.id}
                id={service.id}
                className="scroll-mt-28 rounded-xl border border-border-light bg-porcelain p-8 md:p-10"
              >
                <span className="text-xs font-medium tracking-[0.12em] text-stone uppercase">
                  Service {service.number}
                </span>
                <h2 className="mt-2 text-2xl font-medium text-carbon md:text-3xl">
                  {service.headline ?? service.title}
                </h2>
                <p className="mt-4 max-w-[640px] text-base leading-relaxed text-graphite">
                  {service.description}
                </p>
                <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                  {service.capabilities.map((cap) => (
                    <li key={cap} className="flex items-center gap-2 text-sm text-graphite">
                      <span className="h-1 w-1 rounded-full bg-sage" />
                      {cap}
                    </li>
                  ))}
                </ul>
                {service.cta && (
                  <Link
                    href={service.cta.href}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-forest"
                  >
                    {service.cta.label} <ArrowRight className="h-4 w-4" />
                  </Link>
                )}
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section bg="porcelain" spacing="compact">
        <Container>
          <SectionHeader eyebrow="TECHNOLOGIES" title="Tools we work with." />
          <div className="mt-8 flex flex-wrap gap-3">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-lg border border-border-light bg-page px-4 py-2 text-sm text-graphite"
              >
                {tech}
              </span>
            ))}
          </div>
        </Container>
      </Section>

      <ProcessSection />

      <Section spacing="compact">
        <Container size="reading">
          <SectionHeader title="Frequently asked questions." />
          <dl className="mt-8 space-y-6">
            {serviceFaqs.map((faq) => (
              <div key={faq.question}>
                <dt className="text-base font-medium text-carbon">{faq.question}</dt>
                <dd className="mt-2 text-base leading-relaxed text-graphite">
                  {faq.answer}
                </dd>
              </div>
            ))}
          </dl>
          <Button href="/start-a-project" className="mt-10">
            Start a Project
          </Button>
        </Container>
      </Section>
    </>
  );
}
