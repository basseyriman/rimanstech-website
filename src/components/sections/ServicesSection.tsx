import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container, Section } from "@/components/layout/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { RevealOnScroll, RevealItem } from "@/components/motion/FadeIn";
import { ServiceProof } from "@/components/ui/ServiceProof";
import { services } from "@content/services";

export function ServicesSection() {
  return (
    <Section id="services">
      <Container>
        <SectionHeader
          eyebrow="CAPABILITIES"
          title="Technology built around the problem."
        />

        <RevealOnScroll className="mt-16 space-y-6 lg:mt-20">
          {services.map((service) => (
            <RevealItem key={service.id}>
              <article
                id={service.id}
                className="group rounded-xl border border-border-light bg-porcelain p-8 transition-colors hover:border-sage/40 md:p-10 lg:p-12"
              >
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
                  <div className="flex-1">
                    <span className="text-xs font-medium tracking-[0.12em] text-stone uppercase">
                      Service {service.number}
                    </span>
                    <h3 className="mt-2 text-2xl font-medium tracking-[-0.02em] text-carbon md:text-3xl">
                      {service.headline ?? service.title}
                    </h3>
                    <p className="mt-4 max-w-[640px] text-base leading-relaxed text-graphite">
                      {service.description}
                    </p>
                    {service.cta && (
                      <Link
                        href={service.cta.href}
                        className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-forest transition-colors hover:text-forest-hover"
                      >
                        {service.cta.label}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    )}
                    {service.examples && (
                      <ServiceProof label={service.examples.label} items={service.examples.items} />
                    )}
                  </div>
                  <ul className="grid flex-1 grid-cols-1 gap-2 sm:grid-cols-2">
                    {service.capabilities.map((cap) => (
                      <li
                        key={cap}
                        className="flex items-center gap-2 text-sm text-graphite"
                      >
                        <span className="h-1 w-1 shrink-0 rounded-full bg-sage" />
                        {cap}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </RevealItem>
          ))}
        </RevealOnScroll>

        <div className="mt-10 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-medium text-forest transition-colors hover:text-forest-hover"
          >
            View all services
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Container>
    </Section>
  );
}
