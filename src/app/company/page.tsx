import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container, Section } from "@/components/layout/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { pageMetadata } from "@content/seo";
import { CONTACT_EMAIL } from "@/lib/utils";

export const metadata: Metadata = pageMetadata.company;

export default function CompanyPage() {
  return (
    <>
      <Section spacing="compact" className="pt-28 md:pt-32">
        <Container size="reading">
          <SectionHeader
            titleAs="h1"
            serif
            title="Built around useful technology."
            description="RimansTech Industries designs and develops AI applications, custom software and technology products — for clients and for ourselves."
          />
        </Container>
      </Section>

      <Section spacing="compact" bg="porcelain">
        <Container size="reading">
          <h2 className="text-2xl font-medium text-carbon">Mission</h2>
          <p className="mt-4 text-base leading-relaxed text-graphite">
            To design and engineer intelligent technology that solves real
            problems — transforming ideas, operational challenges and emerging
            opportunities into well-engineered software and AI products.
          </p>
        </Container>
      </Section>

      <Section spacing="compact" bg="porcelain">
        <Container size="reading">
          <h2 className="text-2xl font-medium text-carbon">Two Ways We Build</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <div className="rounded-xl border border-border-light bg-page p-8">
              <p className="text-xs font-medium tracking-[0.12em] text-stone uppercase">
                01 — Our Products
              </p>
              <p className="mt-4 text-base leading-relaxed text-graphite">
                We create and develop our own technology products across AI,
                healthcare, education and digital consumer experiences.
              </p>
              <ul className="mt-6 space-y-2 text-sm text-graphite">
                <li>AlzDetect</li>
                <li>VoiceDress</li>
                <li>Young AI Explorers</li>
                <li>AI Quest</li>
              </ul>
              <Link href="/products" className="mt-6 inline-block text-sm font-medium text-forest">
                Explore our products →
              </Link>
            </div>
            <div className="rounded-xl border border-border-light bg-page p-8">
              <p className="text-xs font-medium tracking-[0.12em] text-stone uppercase">
                02 — Client Engineering
              </p>
              <p className="mt-4 text-base leading-relaxed text-graphite">
                We work with founders, businesses and organisations to design,
                engineer and deploy their own digital products.
              </p>
              <ul className="mt-6 space-y-2 text-sm text-graphite">
                <li>Henco Homes</li>
                <li>Adrielle Studios</li>
                <li>Waffi Content Studio</li>
              </ul>
              <Link href="/work" className="mt-6 inline-block text-sm font-medium text-forest">
                View selected work →
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="compact">
        <Container size="reading">
          <h2 className="text-2xl font-medium text-carbon">What We Believe</h2>
          <ul className="mt-6 space-y-4">
            {[
              "Technology should be built around the problem, not the other way around.",
              "AI should be deployed responsibly, with transparency and explainability where it matters.",
              "Building our own products makes us better engineers for our clients.",
              "Founders and organisations deserve a credible engineering partner, not another outsourced dev shop.",
            ].map((belief) => (
              <li key={belief} className="flex gap-3 text-base leading-relaxed text-graphite">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-forest" />
                {belief}
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section spacing="compact" bg="porcelain">
        <Container size="reading">
          <h2 className="text-2xl font-medium text-carbon">How We Work</h2>
          <p className="mt-4 text-base leading-relaxed text-graphite">
            We follow a structured process from discovery through deployment and
            evolution — combining product thinking, AI expertise and full-stack
            engineering to deliver technology that works in real environments.
          </p>
        </Container>
      </Section>

      <Section id="founder" spacing="compact">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[280px_1fr] lg:gap-16">
            <div className="relative mx-auto aspect-[3/4] w-full max-w-[280px] overflow-hidden rounded-xl border border-border-light">
              <Image
                src="/images/founder/Bassey.png"
                alt="Bassey Riman"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-xs font-medium tracking-[0.12em] text-stone uppercase">
                Founder
              </p>
              <h2 className="mt-2 text-3xl font-medium text-carbon">Bassey Riman</h2>
              <div className="mt-3 space-y-1 text-sm text-graphite">
                <p>AI Engineer · Founder, RimansTech Industries</p>
                <p>MSc Artificial Intelligence</p>
                <p>Author and AI education advocate</p>
              </div>
              <p className="mt-6 max-w-[600px] text-base leading-relaxed text-graphite">
                Bassey Riman works across applied artificial intelligence,
                healthcare AI, explainable machine learning, software development
                and AI education. His work combines technical research with a
                focus on developing practical digital products.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section id="careers" spacing="compact" bg="porcelain">
        <Container size="reading">
          <h2 className="text-2xl font-medium text-carbon">Careers</h2>
          <p className="mt-4 text-base leading-relaxed text-graphite">
            RimansTech is a small, engineering-led organisation building AI products
            and custom software for clients who care about quality. We value clear
            thinking, ownership and the ability to turn complex problems into working
            systems.
          </p>
          <p className="mt-4 text-base leading-relaxed text-graphite">
            We don&apos;t have open roles listed right now, but we&apos;re always
            interested in hearing from strong engineers, researchers and product
            thinkers — especially in applied AI, full-stack development and technical
            education.
          </p>
          <ul className="mt-6 space-y-3">
            {[
              "Applied AI and machine learning engineering",
              "Full-stack product development (Next.js, Python, cloud)",
              "Technical writing and AI education content",
            ].map((area) => (
              <li key={area} className="flex gap-3 text-sm leading-relaxed text-graphite">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-forest" />
                {area}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-stone">
            Send your CV and a short note on what you&apos;d like to work on to{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-forest underline">
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </Container>
      </Section>

      <Section spacing="compact">
        <Container size="reading" className="text-center">
          <Button href="/start-a-project">Start a Project</Button>
        </Container>
      </Section>
    </>
  );
}
